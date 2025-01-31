import React, { useState, useEffect } from 'react';

const VirtualConference = ({loggedInUser}) => {
  const [currentConference, setCurrentConference] = useState(null);
  const [conferencesData, setConferencesData] = useState([]);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [editingMessageId, setEditingMessageId] = useState(null);
  const [currentInterval,setCurrentInterval]=useState(null)

  // Fetch the list of conferences on initial load
  useEffect( () => {


     fetch('/api/conferences')
      .then((r) => r.json())
      .then((data) => setConferencesData(data));
  




   
    }, []);


    useEffect(()=>{
      if(currentInterval){
        clearInterval(currentInterval)
      }
      const intervalId=setInterval(()=>{
        if(currentConference){
          loadMessages(currentConference?.id)
        }

      },2000)
      setCurrentInterval(intervalId)

    },[currentConference])

    

  

  // Load messages for the selected conference
  const loadMessages = async (conferenceId) => {
    if(!conferenceId){
      return
    }
    const response = await fetch(`/api/messages?conference_id=${conferenceId}`);
    const data = await response.json();
    setMessages(data);
  };

  // Handle conference selection and load corresponding messages
  const handleConferenceSelect = (index) => {
    const selectedConference = conferencesData[index];
    setCurrentConference(selectedConference);
    loadMessages(selectedConference.id);
  };

  // Handle sending a new message
  const sendMessage = async () => {

    
    if (newMessage.trim()) {
      const response = await fetch('/api/messages', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          conference_id: currentConference.id,
          sender_name: loggedInUser.fullname, // Replace with actual user data
          message: newMessage,
        }),
      });
      if (response.ok) {
        setNewMessage("");
        loadMessages(currentConference.id);
      }
    }
  };

  // Handle editing a message
  const updateMessage = async () => {
    if (newMessage.trim()) {
      const response = await fetch('/api/messages', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          id: editingMessageId,
          message: newMessage,
        }),
      });
      if (response.ok) {
        setNewMessage("");
        setEditingMessageId(null);
        loadMessages(currentConference.id);
      }
    }
  };

  // Handle deleting a message
  const deleteMessage = async (id) => {
    const response = await fetch('/api/messages', {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id }),
    });
    if (response.ok) {
      loadMessages(currentConference.id);
    }
  };

  // Set message for editing
  const handleEditMessage = (id, message) => {
    setNewMessage(message);
    setEditingMessageId(id);
  };

  return (
    <div className="virtual-conference-container">
      <h2>Virtual Conferences</h2>
      {/* Conference Selection */}
      <div className="conference-selection">
        <h3>Select a Conference</h3>
        <ul style={{ listStyleType: 'none' }}>
          {conferencesData.map((conference, index) => (
            <li key={conference.id}>
              <button onClick={() => handleConferenceSelect(index)}>
                {conference.name}
              </button>
            </li>
          ))}
        </ul>
      </div>
      

           {/* Conference Details */}
           {currentConference && (
            <>
            
        <div className="conference-details">
          <h3>{currentConference.name}</h3>
          <p>{currentConference.description}</p>

          
          <div className="live-stream">
            <h4>Live Streaming</h4>
            <iframe width="560" height="315" src={currentConference.location} title={currentConference.name} frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
            
          </div>

          
          <div className="recorded-session">
            <h4>Recorded Session</h4>
            <a href={currentConference.recorded_link} target="_blank" rel="noopener noreferrer">
              Watch Recorded Session
            </a>
          </div>

          </div>
          </>
          )}

      {/* Conference Details */}
      {currentConference && (
        <div className="conference-details">
          <h3>{currentConference.name}</h3>
          <p>{currentConference.description}</p>

          {/* Interactive Chat */}
          <div className="interactive-qa-chat">
            <h4>Interactive Q&A and Chat</h4>
            <div className="chat-messages">
              {messages.map((msg) => (
                <div key={msg.id} className="message">
                  <strong>{msg.sender_name}</strong>: {msg.message}
                  <span className="timestamp">&nbsp;
                    ({new Date(msg.timestamp).toLocaleTimeString()})
                  </span>

                </div>
              ))}
            </div>

            {/* Message Input */}
            <br/>
            <input
              type="text"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              placeholder="Type your message"
            />
            <br/>
            <button onClick={editingMessageId ? updateMessage : sendMessage}>
              {editingMessageId ? "Update" : "Send"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default VirtualConference;
