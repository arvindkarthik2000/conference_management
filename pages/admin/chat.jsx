// pages/chat.js
import { useEffect, useState } from 'react';


const ChatPage = ({loggedInUser}) => {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [currentInterval,setCurrentInterval]=useState(null)

  const fetchUsers = async () => {
    const res = await fetch('/api/users');
    const data = await res.json();
    setUsers(data.filter((d)=>{
        
        return d.id != loggedInUser?.id;
    }));
  };

  useEffect(()=>{
    if(currentInterval){
      clearInterval(currentInterval)
    }
    const intervalId=setInterval(()=>{
      if(selectedUser){
        fetchMessages(selectedUser.id);
      }

    },2000)
    setCurrentInterval(intervalId)

  },[selectedUser])

  

  const fetchMessages = async (receiverId) => {
    
    const res = await fetch(`/api/chat/getMessages?senderId=${loggedInUser.id}&receiverId=${receiverId}`);
    const data = await res.json();
    setMessages(data);
  };

  const sendMessage = async () => {
    console.log(loggedInUser)
    await fetch('/api/chat/sendMessage', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        senderId: loggedInUser.id,
        receiverId: selectedUser.id,
        message: newMessage,
      }),
    });
    setNewMessage('');
    fetchMessages(selectedUser.id);
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div className="chat-container">
      <div className="user-list">
        <h3>Users</h3>
        <ul>
          {users.map((u) => (
            <li
              key={u.id}
              onClick={() => {
                setSelectedUser(u);
                fetchMessages(u.id);
              }}
              className={selectedUser?.id === u.id ? 'active' : ''}
            >
              {u.fullname}
            </li>
          ))}
        </ul>
      </div>

      <div className="chat-box">
        {selectedUser ? (
          <>
            <h3>Chat with {selectedUser.fullname}</h3>
            <div className="messages">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`message ${msg.sender_id === loggedInUser.id ? 'sent' : 'received'}`}
                >
                  {msg.message}
                </div>
              ))}
            </div>
            <div className="message-input">
              <input
                type="text"
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                placeholder="Type a message..."
              />
              <button onClick={sendMessage}>Send</button>
            </div>
          </>
        ) : (
          <p>Select a user to start chatting</p>
        )}
      </div>

      <style jsx>{`
        .chat-container {
          display: flex;
          height: 100vh;
        }
        .user-list {
          width: 30%;
          border-right: 1px solid #ccc;
          padding: 20px;
        }
        .user-list ul {
          list-style: none;
          padding: 0;
        }
        .user-list li {
          padding: 10px;
          cursor: pointer;
          border-bottom: 1px solid #ddd;
        }
        .user-list li.active {
          background-color: #f0f0f0;
        }
        .chat-box {
          flex: 1;
          display: flex;
          flex-direction: column;
          padding: 20px;
        }
        .messages {
          height:320px;
          overflow-y: auto;
          margin-bottom: 20px;
        }
        .message {
          margin: 5px 0;
        }
        .message.sent {
          text-align: right;
        }
        .message-input {
          height:100px;
        }
        .message-input input {
          flex: 1;
          padding: 10px;
          border: 1px solid #ccc;
        }
        .message-input button {
          padding: 10px;
          background-color: #007bff;
          color: white;
          border: none;
          cursor: pointer;
        }
      `}</style>
    </div>
  );
};

export default ChatPage;
