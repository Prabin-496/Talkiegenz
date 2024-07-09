import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import './Chatbot.css';
import rotation from '../src/Rotation.png';

const Chatbot = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const messagesEndRef = useRef(null);
  const recognitionRef = useRef(null);
  const timeoutRef = useRef(null);
  const floatingButtonRef = useRef(null);

  const API_KEY = 'AIzaSyCGRLcKThysQP0CZWukM6b4_xFoBoUFnsg';
  const API_URL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent';

  const funnyGreetings = [
    "Yo, what's the buzz? I'm all ears!",
    "Hey there! Ready to chat up a storm?",
    "Sup! I'm your AI BFF. What's on your mind?",
    "Hiya! Let's gab about anything under the sun!",
    "Hey, cool cat! What shall we chat about today?"
  ];

  useEffect(() => {
    scrollToBottom();
    if (isOpen) {
      if (messages.length === 0) {
        const randomGreeting = funnyGreetings[Math.floor(Math.random() * funnyGreetings.length)];
        addMessage(randomGreeting, false);
        speakResponse(randomGreeting);
      } else {
        startListening();
      }
    } else {
      stopListening();
    }

    setupSpeechRecognition();

    return () => {
      stopListening();
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [messages, isOpen]);

  const setupSpeechRecognition = () => {
    if ('SpeechRecognition' in window || 'webkitSpeechRecognition' in window) {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      recognitionRef.current = new SpeechRecognition();
      recognitionRef.current.continuous = true;
      recognitionRef.current.interimResults = true;

      recognitionRef.current.onresult = (event) => {
        const transcript = Array.from(event.results)
          .map(result => result[0].transcript)
          .join('');
        setInput(transcript);

        if (timeoutRef.current) clearTimeout(timeoutRef.current);
        timeoutRef.current = setTimeout(() => {
          if (transcript.trim()) {
            handleSubmit({ preventDefault: () => {} });
          }
        }, 2000); // 2 seconds pause before sending
      };

      recognitionRef.current.onend = () => {
        if (!isSpeaking && isOpen) startListening();
      };
    }
  };

  const startListening = () => {
    if (recognitionRef.current && !isListening) {
      recognitionRef.current.start();
      setIsListening(true);
    }
  };

  const stopListening = () => {
    if (recognitionRef.current) {
      recognitionRef.current.stop();
      setIsListening(false);
    }
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const addMessage = (text, isUser) => {
    setMessages(prev => [...prev, { text, user: isUser }]);
  };

  const getResponse = async (userInput) => {
    setIsLoading(true);
    stopListening();
    const prompt = `You are a witty, fun-loving GenZ assistant with a great sense of humor. Respond to the following user input in a casual, engaging way: "${userInput}". Use trendy slang, pop culture references, and throw in some emojis. Keep it brief but entertaining!`;
    try {
      const response = await axios.post(
        `${API_URL}?key=${API_KEY}`,
        {
          contents: [{
            parts: [{ text: prompt }]
          }]
        },
        {
          headers: { 'Content-Type': 'application/json' }
        }
      );
      const aiResponse = response.data.candidates[0].content.parts[0].text;
      addMessage(aiResponse, false);
      speakResponse(aiResponse);
    } catch (error) {
      console.error('Error calling AI API:', error);
      addMessage("Oops, my brain had a hiccup! Mind repeating that? 🤪", false);
    }
    setIsLoading(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;
    addMessage(input, true);
    setInput('');
    await getResponse(input);
  };

  const speakResponse = (text) => {
    if ('speechSynthesis' in window) {
      setIsSpeaking(true);
      stopListening();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.onstart = () => {
        if (floatingButtonRef.current) {
          floatingButtonRef.current.classList.add('talking');
        }
      };
      utterance.onend = () => {
        setIsSpeaking(false);
        startListening();
        if (floatingButtonRef.current) {
          floatingButtonRef.current.classList.remove('talking');
        }
      };
      window.speechSynthesis.speak(utterance);
    }
  };

  const toggleChatbot = () => {
    setIsOpen(!isOpen);
    if (!isOpen) {
      startListening();
    } else {
      stopListening();
    }
  };

  return (
    <div className={`chatbot-wrapper ${isOpen ? 'open' : ''}`}>
      <button className="chatbot-toggle" onClick={toggleChatbot} ref={floatingButtonRef}>
        <img src={rotation} alt="Chat" />
      </button>
      {isOpen && (
        <div className="chatbot-container">
          <div className="chatbot-header">
            <h2>GenZ Buddy</h2>
          </div>
          <div className="chatbot-messages">
            {messages.map((message, index) => (
              <div key={index} className={`message ${message.user ? 'user' : 'ai'}`}>
                {message.text}
              </div>
            ))}
            {isLoading && <div className="message ai">Brewing up some coolness...</div>}
            <div ref={messagesEndRef} />
          </div>
          <div className="chatbot-input-form">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Spill the tea..."
              disabled={isLoading || isListening}
            />
            <button onClick={handleSubmit} disabled={isLoading || !input.trim()}>
              Send
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Chatbot;
