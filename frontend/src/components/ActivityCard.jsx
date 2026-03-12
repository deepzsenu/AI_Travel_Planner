function ActivityCard({ activity, onDelete }) {

  return (

    <div className="activity-card">

      <strong>{activity.time}</strong>

      <h4>{activity.title}</h4>

      <p>{activity.description}</p>

      <button onClick={() => onDelete(activity._id)}>
        Remove
      </button>

    </div>

  );

}

export default ActivityCard;