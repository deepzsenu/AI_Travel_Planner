import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";
import hero from "../assets/hero.jpg";
import tripcard from "../assets/trip.jpg";

function Dashboard() {

  const [trips, setTrips] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {

    const fetchTrips = async () => {

      const res = await API.get("/trips");

      setTrips(res.data);

    };

    fetchTrips();

  }, []);

  return (

    <div className="min-h-screen bg-gray-50">

      {/* HERO HEADER */}

      <div
        className="h-64 bg-cover bg-center flex items-center justify-center relative"
        style={{ backgroundImage: `url(${hero})` }}
      >

        <div className="absolute inset-0 bg-black/50"></div>

        <div className="relative text-center text-white">

          <h1 className="text-4xl font-bold mb-2">
            Your Travel Dashboard
          </h1>

          <p className="text-lg opacity-90">
            Plan, explore and manage your AI-powered trips
          </p>

        </div>

      </div>


      {/* MAIN CONTENT */}

      <div className="max-w-7xl mx-auto p-8">

        <div className="flex justify-between items-center mb-8">

          <h2 className="text-2xl font-bold text-gray-800">
            Your Trips
          </h2>

          <button
            onClick={() => navigate("/create-trip")}
            className="bg-blue-600 text-white px-5 py-2 rounded-full shadow hover:bg-blue-700 transition"
          >
            + Create Trip
          </button>

        </div>


        {/* TRIPS GRID */}

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">

          {trips.map((trip) => (

            <div
              key={trip._id}
              className="rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition transform hover:-translate-y-1 bg-white"
            >

              {/* IMAGE */}

              <div
                className="h-40 bg-cover bg-center relative"
                style={{ backgroundImage: `url(${tripcard})` }}
              >

                <div className="absolute inset-0 bg-black/40"></div>

                <div className="absolute bottom-3 left-4 text-white">

                  <h3 className="text-xl font-bold">
                    {trip.destination}
                  </h3>

                </div>

              </div>


              {/* CARD BODY */}

              <div className="p-5">

                <p className="text-gray-600">
                  {trip.days} days trip
                </p>

                <button
                  className="mt-4 text-blue-600 font-semibold hover:underline"
                  onClick={() => navigate(`/trip/${trip._id}`)}
                >
                  View Trip →
                </button>

              </div>

            </div>

          ))}

        </div>

      </div>

    </div>

  );

}

export default Dashboard;