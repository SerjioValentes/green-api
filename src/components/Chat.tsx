import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Message from './Message';

const Chat = ({ idInstance, apiTokenInstance }: any) => {
  const [messages, setMessages] = useState<any>([]);
  const [newMessage, setNewMessage] = useState('');
  const [recipient, setRecipient] = useState('');

  const sendMessage = async () => {
    const url = `https://api.green-api.com/waInstance${idInstance}/SendMessage/${apiTokenInstance}`;
    const payload = {
      chatId: `${recipient}@c.us`,
      message: newMessage,
    };

    try {
      await axios.post(url, payload);
      setMessages([...messages, { text: newMessage, isMyMessage: true }]);
      setNewMessage('');
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };

  const receiveMessages = async () => {
    const url = `https://api.green-api.com/waInstance${idInstance}/ReceiveNotification/${apiTokenInstance}`;

    try {
      const response = await axios.get(url);
      if (response.data) {
        const message = response.data.body.messageData.textMessageData.textMessage;
        setMessages([...messages, { text: message, isMyMessage: false }]);
        await axios.delete(`https://api.green-api.com/waInstance${idInstance}/DeleteNotification/${apiTokenInstance}/${response.data.receiptId}`);
      }
    } catch (error) {
      console.error('Error receiving message:', error);
    }
  };

  useEffect(() => {
    const interval = setInterval(receiveMessages, 5000);
    return () => clearInterval(interval);
  }, [messages]);

  return (
    <div className="chat">
      <input
        type="text"
        placeholder="Recipient's phone number"
        value={recipient}
        onChange={(e) => setRecipient(e.target.value)}
      />
      <div className="messages">
        {messages.map((msg: any, index: number) => (
          <Message key={index} text={msg.text} isMyMessage={msg.isMyMessage} />
        ))}
      </div>
      <input
        type="text"
        placeholder="Type a message"
        value={newMessage}
        onChange={(e) => setNewMessage(e.target.value)}
      />
      <button onClick={sendMessage}>Send</button>
    </div>
  );
};

export default Chat;