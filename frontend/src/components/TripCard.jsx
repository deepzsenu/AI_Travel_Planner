import { useNavigate } from "react-router-dom";

function TripCard({ trip }) {

    const navigate = useNavigate();

    const deleteTrip = async () => {

        if (!window.confirm("Delete this trip?")) return;

        try {

            await API.delete(`/trips/${tripId}`);

            navigate("/");

        } catch (err) {

            console.error(err);
            alert("Failed to delete trip");

        }

    };

    return (

        <div className="trip-card">

            <h3>{trip.destination}</h3>

            <p>{trip.days} days trip</p>

            <p>Budget: {trip.budgetType}</p>

            <button onClick={() => navigate(`/trip/${trip._id}`)}>
                View Trip
            </button>
            <button
                onClick={deleteTrip}
                className="bg-red-500 text-white px-4 py-2 rounded mt-6 hover:bg-red-600"
            >
                Delete Trip
            </button>

        </div>

    );

}

export default TripCard;