import { useState } from "react";
import API from "../services/api";

function ChatPanel({ tripId, onUpdate }) {

  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);

  const sendMessage = async () => {

    const res = await API.post(`/trips/${tripId}/chat`, {
      message
    });

    setMessages([
      ...messages,
      { role: "user", text: message },
      { role: "assistant", text: "Itinerary updated" }
    ]);

    onUpdate(res.data.itinerary);

    setMessage("");

  };

  return (

    <div className="chat-panel">

      <h3>AI Travel Assistant</h3>

      <div className="chat-messages">

        {messages.map((msg, i) => (

          <p key={i}>
            <strong>{msg.role}</strong>: {msg.text}
          </p>

        ))}

      </div>

      <input
        value={message}
        placeholder="Ask AI to modify itinerary..."
        onChange={(e) => setMessage(e.target.value)}
      />

      <button onClick={sendMessage}>
        Send
      </button>

    </div>

  );

}

export default ChatPanel;