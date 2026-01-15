import { useState } from 'react';
import { getDaysInMonth, getMonthName, getDayName } from '../utils/dateHelpers';
import '../styles/pages/Calendar.css';

export function Calendar() {
  const today = new Date();
  const [currentDate, setCurrentDate] = useState(new Date(today.getFullYear(), today.getMonth()));

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();
  const daysInMonth = getDaysInMonth(year, month);
  const firstDay = new Date(year, month, 1).getDay();

  const days = [];
  for (let i = 0; i < firstDay; i++) {
    days.push(null);
  }
  for (let i = 1; i <= daysInMonth; i++) {
    days.push(i);
  }

  const handlePrevMonth = () => {
    setCurrentDate(new Date(year, month - 1));
  };

  const handleNextMonth = () => {
    setCurrentDate(new Date(year, month + 1));
  };

  return (
    <div className="calendar-page">
      <h1>Weather Calendar</h1>
      
      <div className="calendar-controls">
        <button onClick={handlePrevMonth}>← Previous</button>
        <h2>{getMonthName(currentDate)} {year}</h2>
        <button onClick={handleNextMonth}>Next →</button>
      </div>

      <div className="calendar-grid">
        <div className="weekday">Sun</div>
        <div className="weekday">Mon</div>
        <div className="weekday">Tue</div>
        <div className="weekday">Wed</div>
        <div className="weekday">Thu</div>
        <div className="weekday">Fri</div>
        <div className="weekday">Sat</div>

        {days.map((day, index) => (
          <div key={index} className={`day ${day ? 'active' : 'empty'}`}>
            {day}
          </div>
        ))}
      </div>
    </div>
  );
}
