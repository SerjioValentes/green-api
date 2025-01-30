import React from 'react';

const Message = ({ text, isMyMessage }: any) => {
  return (
    <div className={`message ${isMyMessage ? 'my-message' : 'other-message'}`}>
      {text}
    </div>
  );
};

export default Message;