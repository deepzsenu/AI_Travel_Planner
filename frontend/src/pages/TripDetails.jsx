import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import API from "../services/api";
import TripChat from "../components/TripChat";
import ChatPanel from "../components/ChatPanel";

function TripDetails() {

  const { id } = useParams();

  const [trip, setTrip] = useState(null);
  const navigate = useNavigate();
  const [chatOpen, setChatOpen] = useState(false);
  const [chatInput, setChatInput] = useState("");
  const [chatMessages, setChatMessages] = useState([
    {
      role: "assistant",
      content: "Hi! Ask me anything about this trip ✈️"
    }
  ]);


  useEffect(() => {

    const fetchTrip = async () => {

      const res = await API.get(`/trips/${id}`);

      setTrip(res.data);

    };

    fetchTrip();

  }, [id]);

  const regenerateDay = async (day) => {

    try {

      await API.post(`/trips/${id}/regenerate`, { day });

      const res = await API.get(`/trips/${id}`);

      setTrip(res.data);

    } catch (err) {

      console.error(err);
      alert("Failed to regenerate day");

    }

  };

  if (!trip) return <p>Loading...</p>;

  const deleteTrip = async () => {

    if (!window.confirm("Delete this trip?")) return;

    try {

      await API.delete(`/trips/${id}`);

      navigate("/dashboard");

    } catch (err) {

      console.error(err);
      alert("Failed to delete trip");

    }

  };

  // Chat assistant state


  const sendChatMessage = async () => {

    if (!chatInput.trim()) return;

    const userMessage = {
      role: "user",
      content: chatInput
    };

    setChatMessages(prev => [...prev, userMessage]);

    const question = chatInput;
    setChatInput("");

    try {

      const res = await API.post(`/trips/${id}/chat`, {
        message: `
You are a helpful travel assistant for a user's trip.

Trip destination: ${trip.destination}

You can answer questions about:
- itinerary
- hotels
- attractions
- restaurants
- nearby places
- travel tips
- activities
- transportation
- budget

IMPORTANT RULES:
- Do NOT modify the itinerary
- Only answer questions
- You CAN suggest places near the destination
- Keep answers short and useful

User question: ${question}
`

      });

      const aiReply = {
        role: "assistant",
        content: res.data.reply || "I couldn't find that information."
      };

      setChatMessages(prev => [...prev, aiReply]);

    } catch (err) {

      console.error(err);

      setChatMessages(prev => [
        ...prev,
        { role: "assistant", content: "⚠️ Something went wrong." }
      ]);

    }

  };


  return (

    <div>

      <h2 className="text-3xl font-bold mb-6">
        {trip.destination}
      </h2>
      {/* BUDGET SECTION */}

      <h3 className="text-2xl font-bold mb-4">
        Estimated Budget
      </h3>

      <div className="grid md:grid-cols-5 gap-4 mb-10">

        <div className="bg-white p-4 rounded-lg shadow hover:shadow-lg transition text-center">
          <p className="text-gray-500">Flights ✈️</p>
          <p className="text-xl font-bold">${trip.estimatedBudget.flights}</p>
        </div>

        <div className="bg-white p-4 rounded-lg shadow hover:shadow-lg transition text-center">
          <p className="text-gray-500">Hotels 🏨</p>
          <p className="text-xl font-bold">${trip.estimatedBudget.accommodation}</p>
        </div>

        <div className="bg-white p-4 rounded-lg shadow hover:shadow-lg transition text-center">
          <p className="text-gray-500">Food 🍜</p>
          <p className="text-xl font-bold">${trip.estimatedBudget.food}</p>
        </div>

        <div className="bg-white p-4 rounded-lg shadow hover:shadow-lg transition text-center">
          <p className="text-gray-500">Activities 🎟️</p>
          <p className="text-xl font-bold">${trip.estimatedBudget.activities}</p>
        </div>

        <div className="bg-blue-600 text-white p-4 rounded-lg shadow text-center">
          <p>Total 💰</p>
          <p className="text-2xl font-bold">${trip.estimatedBudget.total}</p>
        </div>

      </div>

      <div className="bg-white p-6 rounded-lg shadow mb-10">

        <h4 className="text-lg font-bold mb-4">
          Budget Distribution
        </h4>

        <div className="space-y-3">

          <div>
            <p className="text-sm">Flights</p>
            <div className="w-full bg-gray-200 h-3 rounded">
              <div
                className="bg-blue-500 h-3 rounded"
                style={{ width: `${trip.estimatedBudget.flights / trip.estimatedBudget.total * 100}%` }}
              ></div>
            </div>
          </div>

          <div>
            <p className="text-sm">Hotels</p>
            <div className="w-full bg-gray-200 h-3 rounded">
              <div
                className="bg-green-500 h-3 rounded"
                style={{ width: `${trip.estimatedBudget.accommodation / trip.estimatedBudget.total * 100}%` }}
              ></div>
            </div>
          </div>

          <div>
            <p className="text-sm">Food</p>
            <div className="w-full bg-gray-200 h-3 rounded">
              <div
                className="bg-yellow-500 h-3 rounded"
                style={{ width: `${trip.estimatedBudget.food / trip.estimatedBudget.total * 100}%` }}
              ></div>
            </div>
          </div>

          <div>
            <p className="text-sm">Activities</p>
            <div className="w-full bg-gray-200 h-3 rounded">
              <div
                className="bg-purple-500 h-3 rounded"
                style={{ width: `${trip.estimatedBudget.activities / trip.estimatedBudget.total * 100}%` }}
              ></div>
            </div>
          </div>

        </div>

      </div>

      {/* ITINERARY */}

      {trip.itinerary.map(day => (

        <div
          key={day.day}
          className="bg-white p-6 rounded-lg shadow mb-6"
        >

          <div className="flex justify-between">

            <h3 className="text-xl font-bold">
              Day {day.day}
            </h3>

            <button
              onClick={() => regenerateDay(day.day)}
              className="text-sm bg-blue-600 text-white px-3 py-1 rounded"
            >
              Regenerate
            </button>

          </div>

          <div className="mt-4 space-y-2">

            {day.activities.map((activity, i) => (

              <div
                key={i}
                className="p-3 border rounded hover:bg-gray-50"
              >

                <p className="font-semibold">
                  {activity.time}
                </p>

                <p>{activity.title}</p>

                <p className="text-gray-500 text-sm">
                  {activity.description}
                </p>

              </div>

            ))}

          </div>

        </div>

      ))}

      {/* HOTELS */}

      <h3 className="text-2xl font-bold mt-8 mb-4">
        Recommended Hotels
      </h3>

      <div className="grid md:grid-cols-3 gap-4">

        {trip.hotels.map((hotel, i) => (

          <div
            key={i}
            className="bg-white p-4 rounded-lg shadow hover:shadow-lg transition"
          >

            <h4 className="font-bold">
              {hotel.name}
            </h4>

            <p className="text-gray-500">
              {hotel.type}
            </p>

          </div>

        ))}

      </div>
      <button
        onClick={deleteTrip}
        className="bg-red-500 text-white px-4 py-2 rounded mt-6 hover:bg-red-600"
      >
        Delete Trip
      </button>


      {/* <TripChat tripId={id} />
      <ChatPanel tripID={id}/> */}

      {/* Floating Chat Button */}

      <button
        onClick={() => setChatOpen(!chatOpen)}
        className="fixed bottom-6 right-6 bg-blue-600 text-white w-14 h-14 rounded-full shadow-lg text-xl"
      >
        💬
      </button>

      {/* Chat Window */}

      {chatOpen && (

        <div className="fixed bottom-24 right-6 w-80 bg-white rounded-xl shadow-2xl flex flex-col">

          <div className="bg-blue-600 text-white p-3 rounded-t-xl font-semibold">
            Trip Assistant
          </div>

          {/* Messages */}

          <div className="h-64 overflow-y-auto p-3 space-y-2">

            {chatMessages.map((msg, i) => (

              <div
                key={i}
                className={`p-2 rounded text-sm max-w-[80%] ${msg.role === "user"
                  ? "bg-blue-100 ml-auto text-right"
                  : "bg-gray-100"
                  }`}
              >
                {msg.content}
              </div>

            ))}

          </div>

          {/* Input */}

          <div className="flex border-t">

            <input
              value={chatInput}
              onChange={(e) => setChatInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") sendChatMessage();
              }}
              placeholder="Ask about this trip..."
              className="flex-1 p-2 text-sm"
            />

            <button
              onClick={sendChatMessage}
              className="px-4 text-blue-600"
            >
              Send
            </button>

          </div>

        </div>

      )}
      {/* <TripChat {} /> */}
    </div>

  );

}

export default TripDetails;