import { useState } from "react";
import API from "../services/api";
import { useNavigate } from "react-router-dom";
import hero from "../assets/hero.jpg";

function CreateTrip() {

  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    source: "",
    destination: "",
    days: "",
    budgetType: "Medium",
    interests: ""
  });

  const handleSubmit = async (e) => {

    e.preventDefault();

    try {

      setLoading(true);

      const res = await API.post("/trips", {
        ...form,
        days: Number(form.days),
        interests: form.interests.split(",").map(i => i.trim())
      });

      navigate(`/trip/${res.data.trip._id}`);

    } catch (error) {
      console.error(error);
      alert("Failed to create trip");
    } finally {
      setLoading(false);
    }

  };

  return (

    <div className="max-w-xl mx-auto mt-12 bg-white p-8 rounded-xl shadow-lg" style={{ backgroundImage: `url(${hero})` }}>

      <h2 className="text-2xl font-bold mb-6 text-center">
        Create Your AI Trip ✈️
      </h2>

      <form onSubmit={handleSubmit} className="space-y-4">

        {/* Source */}
        <div>
          <label className="text-sm font-medium">From</label>
          <input
            className="w-full border rounded p-2 mt-1"
            placeholder="City you are travelling from"
            value={form.source}
            onChange={(e) =>
              setForm({ ...form, source: e.target.value })
            }
          />
        </div>

        {/* Destination */}
        <div>
          <label className="text-sm font-medium">Destination</label>
          <input
            className="w-full border rounded p-2 mt-1"
            placeholder="Where do you want to go?"
            value={form.destination}
            onChange={(e) =>
              setForm({ ...form, destination: e.target.value })
            }
          />
        </div>

        {/* Days */}
        <div>
          <label className="text-sm font-medium">Trip Duration</label>
          <input
            type="number"
            className="w-full border rounded p-2 mt-1"
            placeholder="Number of days"
            value={form.days}
            onChange={(e) =>
              setForm({ ...form, days: e.target.value })
            }
          />
        </div>

        {/* Budget */}
        <div>
          <label className="text-sm font-medium mb-2 block">
            Budget
          </label>

          <div className="flex gap-2">

            {["Low", "Medium", "High"].map((b) => (
              <button
                key={b}
                type="button"
                onClick={() => setForm({ ...form, budgetType: b })}
                className={`flex-1 border rounded p-2 ${
                  form.budgetType === b
                    ? "bg-blue-600 text-white"
                    : "bg-gray-100"
                }`}
              >
                {b}
              </button>
            ))}

          </div>
        </div>

        {/* Interests */}
        <div>
          <label className="text-sm font-medium">
            Interests
          </label>
          <input
            className="w-full border rounded p-2 mt-1"
            placeholder="Food, Adventure, Nature..."
            value={form.interests}
            onChange={(e) =>
              setForm({ ...form, interests: e.target.value })
            }
          />
        </div>

        {/* Submit */}
        <button
          disabled={loading}
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
        >
          {loading ? "Creating Trip..." : "Create Trip"}
        </button>

      </form>

    </div>

  );

}

export default CreateTrip;