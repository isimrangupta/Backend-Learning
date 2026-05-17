import { useState, useEffect } from "react";
import "./App.css";
import { io } from "socket.io-client";

export default function App() {
  const [socket, setSocket] = useState(null);
  const [messages, setMessages] = useState([
  ]);
  const [input, setInput] = useState("");

  useEffect(() => {
    let socketInstance = io("http://localhost:3000");
    setSocket(socketInstance);

    socketInstance.on("ai-message-response", (response) => {
      const botMessage = {
        id: Date.now() + 1,
        text: response,
        timestamp: new Date().toLocaleTimeString(),
        sender: "bot",
      };

      setMessages((prevMessages) => [...prevMessages, botMessage]);
    });

    return () => socketInstance.disconnect();
  }, []);

  const sendMessage = () => {
    if (!input.trim() || !socket) return;

    const userMessage = {
      id: Date.now(),
      text: input,
      sender: "user",
    };

    setMessages((prev) => [...prev, userMessage]);
    socket.emit("ai-message", input);
    setInput("");
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") sendMessage();
  };

  return (
    <div className="page">
      <div className="chatbox">
        <div className="header">
          <h2>Chat</h2>
        </div>

        <div className="messages">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={msg.sender === "user" ? "user-msg" : "bot-msg"}
            >
              {msg.text}
            </div>
          ))}
        </div>

        <div className="input-row">
          <input
            type="text"
            placeholder="Type a message..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
          />
          <button onClick={sendMessage}>Send</button>
        </div>
      </div>
    </div>
  );
}
