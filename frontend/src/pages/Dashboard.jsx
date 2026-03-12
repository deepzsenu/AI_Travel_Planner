import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";

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

    <div>

      <div className="flex justify-between mb-6">

        <h2 className="text-2xl font-bold">
          Your Trips
        </h2>

        <button
          onClick={() => navigate("/create-trip")}
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          Create Trip
        </button>

      </div>

      <div className="grid md:grid-cols-3 gap-4">

        {trips.map((trip) => (

                    <div
            key={trip._id}
            className="bg-white p-6 rounded-lg shadow hover:shadow-xl transition transform hover:-translate-y-1"
            >

            <h3 className="text-xl font-bold">
                {trip.destination}
            </h3>

            <p className="text-gray-600">
                {trip.days} days trip
            </p>

            <button
                className="mt-4 text-blue-600 font-semibold"
                onClick={() => navigate(`/trip/${trip._id}`)}
            >
                View Trip →
            </button>

            </div>

        ))}

      </div>

    </div>

  );

}

export default Dashboard;