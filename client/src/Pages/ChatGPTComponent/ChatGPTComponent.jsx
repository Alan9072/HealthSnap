import React, { useState } from 'react';
import axios from 'axios';
import styles from './ChatGPTComponent.module.css';

const ChatGPTComponent = () => {
  const [prompt, setPrompt] = useState('');
  const [response, setResponse] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      console.log('Sending request to backend:', prompt);
      // Sending the request to the backend
      const res = await axios.post('http://localhost:3000/chat', {
        prompt: prompt,
      });

      setResponse(res.data.reply);  // Get the response from backend
    } catch (error) {
      console.error('Error communicating with backend:', error);
      setResponse('Sorry, something went wrong.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.chatGPTBox}>
      <h1>Chat with ChatGPT</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Enter your question:
          <input
            type="text"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="e.g. What is yo?"
          />
        </label>
        <button type="submit" disabled={loading}>
          {loading ? 'Loading...' : 'Send'}
        </button>
      </form>
      {response && (
        <div>
          <h2>Response:</h2>
          <p>{response}</p>
        </div>
      )}
    </div>
  );
};

export default ChatGPTComponent;
