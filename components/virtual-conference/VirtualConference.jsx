import React, { useState, useEffect } from 'react';
// import './VirtualConference.css';

// Mock data for conferences
const conferencesData = [
  {
    id: 1,
    title: 'AI in Healthcare',
    description: 'A deep dive into AI technologies used in healthcare.',
    liveStreamUrl: 'https://www.youtube.com/embed/live_stream_1',
    recordedSessionUrl: 'https://www.youtube.com/watch?v=recorded_session_1',
  },
  {
    id: 2,
    title: 'Sustainable Energy',
    description: 'Exploring sustainable energy technologies and policies.',
    liveStreamUrl: 'https://www.youtube.com/embed/live_stream_2',
    recordedSessionUrl: 'https://www.youtube.com/watch?v=recorded_session_2',
  },
];

const VirtualConference = () => {
  const [currentConference, setCurrentConference] = useState(null);

  const handleConferenceSelect = (id) => {
    const selectedConference = conferencesData.find(conf => conf.id === id);
    setCurrentConference(selectedConference);
  };

  return (
    <div className="virtual-conference-container">
      <h2>Virtual Conferences</h2>
      <section className="reviewer-assignment">
        
        <p>
          Select your subject from a variety of conferences
        </p>
        <div className="assignment-details">
          <strong>Live: </strong>
          <span>See schedule on the schedule page</span>
        </div>
        <div className="assignment-details">
          <strong>Recorded sessions: </strong>
          <span>FOMO will never hit. We have pre-recorded sessions available on our youtube channel</span>
        </div>
      </section>


      {/* Conference Selection */}
      <div className="conference-selection">
        <h3>Select a Conference</h3>
        <ul>
          {conferencesData.map((conference) => (
            <li key={conference.id}>
              <button onClick={() => handleConferenceSelect(conference.id)}>
                {conference.title}
              </button>
            </li>
          ))}
        </ul>
      </div>

      {/* Conference Details */}
      {currentConference && (
        <div className="conference-details">
          <h3>{currentConference.title}</h3>
          <p>{currentConference.description}</p>

          {/* Live Streaming */}
          <div className="live-stream">
            <h4>Live Streaming</h4>
            <iframe
              width="560"
              height="315"
              src={currentConference.liveStreamUrl}
              title={currentConference.title}
              frameBorder="0"
              allowFullScreen
            ></iframe>
          </div>

          {/* Recorded Session */}
          <div className="recorded-session">
            <h4>Recorded Session</h4>
            <a href={currentConference.recordedSessionUrl} target="_blank" rel="noopener noreferrer">
              Watch Recorded Session
            </a>
          </div>

          {/* Interactive Q&A and Chat (Placeholder) */}
          <div className="interactive-qa-chat">
            <h4>Interactive Q&A and Chat</h4>
            <div className="chat-placeholder">
              <p>Live chat and Q&A features will be displayed here.</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default VirtualConference;
