import React, { useState,  useLayoutEffect, useRef } from 'react';
import './App.css';
import image from './assets/bot.png';

const App: React.FC = () => {
  const [messages, setMessages] = useState<{ text: string, type: 'user' | 'bot', profileImg: string }[]>([]);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useLayoutEffect(() => {
    scrollToBottom();
  }, [messages]);

  const getBotResponse = (userMessage: string) => {
    // You can add more sophisticated bot logic here
    return userMessage;
  };

  const speak = (text: string) => {
    const utterance = new SpeechSynthesisUtterance(text);
    speechSynthesis.speak(utterance);
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const input = document.getElementById("MSG") as HTMLInputElement;
    const message = input.value.trim();
    if (message) {
      const userMessage = { text: message, type: 'user' as const, profileImg: '' };
      const botMessage = { text: getBotResponse(message), type: 'bot' as const, profileImg: image };
      setMessages([...messages, userMessage, botMessage]);
      speak(botMessage.text); // Make the bot speak the reply
      input.value = '';
    }
  };

  return (
    <div className="chat">
      <div className="chat-title">
        <h1>Smart Bot</h1>
        <h2>I am a customer support chatbot</h2>
        <figure className="avatar">
          <img src={image} alt="Bot Avatar" />
        </figure>
      </div>
      <div className="messages">
        <div className="messages-content">
          {messages.map((msg, index) => (
            <div key={index} className={`message ${msg.type === 'user' ? 'message-personal' : ''}`}>
              {msg.type === 'bot' && <figure className="avatar"><img src={msg.profileImg} alt="Bot Avatar" /></figure>}
              {msg.text}
            </div>
          ))}
          <div ref={messagesEndRef}></div>
        </div>
        <div className="suggession"></div>
      </div>
      <form className="message-box" id="mymsg" onSubmit={handleFormSubmit}>
        <input type="text" id="MSG" name="MSG" className="message-input" placeholder="Type message..." />
        <i className="fas fa-microphone" id="start-record-btn"></i>
        <button type="submit" className="message-submit">Send</button>
      </form>
      <h3 className="no-browser-support" hidden>Sorry, Your Browser Doesn't Support the Web Speech API. Try Opening This Demo In Google Chrome.</h3>
    </div>
  );
};

export default App;
