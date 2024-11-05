import React, { useState } from "react";
import axios from "axios";
import { FaPaperPlane } from "react-icons/fa";
import "./styles/ChatBot.css"; // Assuming you will create a separate CSS file for styling

const Chatbot = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSend = async () => {
    if (input.trim() === "") return;
  
    const newMessage = { text: input, sender: "user" };
    setMessages([...messages, newMessage]);
    setInput("");
    setLoading(true);
  
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000)); // 1-second delay
  
      // Make a POST request with the message in the request body
      const response = await axios.post(
        "http://localhost:5000/ask",
        { message: input },
        { headers: { "Content-Type": "application/json" } }
      );
  
      const aiMessage = { text: response.data.answer, sender: "ai" };
      setMessages((prevMessages) => [...prevMessages, aiMessage]);
    } catch (error) {
      console.error("Error fetching AI response", error);
    } finally {
      setLoading(false);
    }
  };
  

  const handleInputChange = (e) => setInput(e.target.value);

  const handleKeyPress = (e) => {
    if (e.key === "Enter") handleSend();
  };

  return (
    <div className="chatbot-container">
      <div className="chat-header">
        <img src="ChatBot.jpg" alt="Chatbot Logo" className="chat-logo" />
        <h1>Talk to AI</h1>
      </div>
      <div className="chatbox">
        {messages.map((message, index) => (
          <div key={index} className={`message-container ${message.sender}`}>
            <img
              src={message.sender === "user" ? "man.png" : "ai.png"}
              alt={`${message.sender} avatar`}
              className="avatar"
            />
            <div className={`message ${message.sender}`}>{message.text}</div>
          </div>
        ))}
        {loading && (
          <div className="message-container ai">
            <img src="ai.png" alt="AI avatar" className="avatar" />
            <div className="message ai">...</div>
          </div>
        )}
      </div>
      <div className="input-container">
        <input
          type="text"
          value={input}
          onChange={handleInputChange}
          onKeyPress={handleKeyPress}
          placeholder="Type your message..."
        />
        <button onClick={handleSend} className="send-button">
          <FaPaperPlane />
        </button>
      </div>
    </div>
  );
};

export default Chatbot;
