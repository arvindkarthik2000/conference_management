import React, { useEffect, useState } from 'react';

const ScheduleAgenda = () => {
  const [selectedSession, setSelectedSession] = useState(null);
  const [schedule, setSchedule] = useState([]);
  const [speakers, setSpeakers] = useState([]);

  useEffect(() => {
    fetch('/api/schedule')
      .then((res) => res.json())
      .then((r) => setSchedule(r));

    fetch('/api/sessions')
      .then((res) => res.json())
      .then((r) => {
        const uniqueItems = r.filter(
          (item, index, self) =>
            index === self.findIndex((obj) => obj.name === item.name)
        );
        setSpeakers(uniqueItems);
      });
  }, []);

  const handleExport = () => {
    // Convert schedule data to CSV format
    const header = ['Title', 'Speaker',  'Date','Time'];
    const rows = schedule.map((session) => [
      session.title,
      session.speaker,
      
      new Date(session.time).toLocaleString(),
      // session.description,
    ]);

    const csvContent = [
      header.join(','),
      ...rows.map((row) => row.join(',')),
    ].join('\n');

    // Create a Blob object from the CSV string
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });

    // Create a temporary link element
    const link = document.createElement('a');
    if (link.download !== undefined) {
      const url = URL.createObjectURL(blob);
      link.setAttribute('href', url);
      link.setAttribute('download', 'schedule.csv'); // Set the filename for the download
      link.style.visibility = 'hidden';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }

    // alert('Schedule exported as CSV!');
  };

  return (
    <div className="schedule-agenda-container">
      <h2>Conference Schedule & Agenda</h2>

      {/* Interactive Schedule */}
      <section className="interactive-schedule">
        <h3>Schedule</h3>
        <ul>
          {schedule.map((session, index) => (
            <li key={index}>
              <strong>{session.title}</strong> - {new Date(session.time).toLocaleString()}
              <br />
              <button onClick={() => setSelectedSession(session)}>
                View Details
              </button>
            </li>
          ))}
        </ul>

        {/* Session Details Modal */}
        {selectedSession && (
          <div className="session-details">
            <h4>{selectedSession.title}</h4>
            <p><strong>Speaker:</strong> {selectedSession.speaker}</p>
            <p><strong>Topic:</strong> {selectedSession.topic}</p>
            <p>{selectedSession.description}</p>
            <button onClick={() => setSelectedSession(null)}>Close</button>
          </div>
        )}
      </section>

      {/* Speaker Profiles */}
      <section className="speaker-profiles">
        <h3>Speakers</h3>
        <div className="speaker-list">
          {schedule.map((speaker, index) => (
            <div key={index} className="speaker-card">
              <h4>{speaker.speaker}</h4>
              <p>{speaker.title}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Export Button */}
      {schedule.length>0 ? <button onClick={handleExport}>Export Schedule</button>:''}
    </div>
  );
};

export default ScheduleAgenda;
