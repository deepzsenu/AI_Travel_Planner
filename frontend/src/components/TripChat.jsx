import { useState } from "react";
import API from "../services/api";

function TripChat({ tripId }) {

    const [message, setMessage] = useState("");
    const [messages, setMessages] = useState([]);

    const sendMessage = async () => {

        if (!message.trim()) return;

        const userMessage = {
            role: "user",
            content: message
        };

        // Show user message immediately
        setMessages(prev => [...prev, userMessage]);

        const currentMessage = message;
        setMessage("");

        try {

            const res = await API.post(`/trips/${tripId}/chat`, {
                message: currentMessage
            });

            // Safe response handling
            const text =
                res?.data?.reply ||
                res?.data?.message ||
                "AI updated your trip.";

            const typingMessage = {
                role: "assistant",
                content: ""
            };

            // Add empty assistant message first
            setMessages(prev => [...prev, typingMessage]);

            let i = 0;

            const interval = setInterval(() => {

                if (i >= text.length) {
                    clearInterval(interval);
                    return;
                }

                typingMessage.content += text[i];

                setMessages(prev => [
                    ...prev.slice(0, -1),
                    { ...typingMessage }
                ]);

                i++;

            }, 20);

        } catch (error) {

            console.error("Chat error:", error);

            const errorMessage = {
                role: "assistant",
                content: "⚠️ Something went wrong. Please try again."
            };

            setMessages(prev => [...prev, errorMessage]);

        }

    };

    

    return (

        <div className="bg-white rounded-lg shadow p-4 mt-10 hover:shadow-xl transition">

            <h3 className="font-bold mb-3">
                AI Travel Assistant
            </h3>

            <div className="h-64 overflow-y-auto space-y-2 mb-4">

                {messages.map((msg, i) => (
                    <div
                        key={i}
                        className={`p-2 rounded text-sm max-w-[80%] ${
                            msg.role === "user"
                                ? "bg-blue-100 ml-auto text-right"
                                : "bg-gray-100"
                        }`}
                    >
                        {msg.content}
                    </div>
                ))}

            </div>

            <div className="flex gap-2">

                <input
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    onKeyDown={(e) => {
                        if (e.key === "Enter") {
                            sendMessage();
                        }
                    }}
                    placeholder="Ask AI to modify your trip..."
                    className="flex-1 border rounded p-2"
                />

                <button
                    onClick={sendMessage}
                    className="bg-blue-600 text-white px-4 rounded hover:bg-blue-700 transition"
                >
                    Send
                </button>

            </div>

        </div>

    );

}

export default TripChat;