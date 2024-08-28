import React, { useEffect, useState } from 'react';

const Hours = () => {
  const [isOpen, setIsOpen] = useState(null);
  const [today, setToday] = useState('');
  const [hours, setHours] = useState({ open: 0, close: 0, display: '' });
  const [currentTime, setCurrentTime] = useState('');

  useEffect(() => {
    const todayIndex = new Date().getDay(); // 0: Sunday, 1: Monday, ..., 6: Saturday
    const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    setToday(daysOfWeek[todayIndex]);

    const todayHours = todayIndex === 0 || todayIndex === 6 
      ? { open: 9, close: 20, display: '9 a.m. - 8 p.m.' } // Saturday - Sunday
      : { open: 10, close: 16, display: '10 a.m. - 4 p.m.' }; // Monday -> Friday

    setHours(todayHours);

    const updateCurrentTime = () => {
      const now = new Date();
      const formattedTime = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
      setCurrentTime(formattedTime);

      // Actualizar el estado de si está abierto o cerrado
      const currentHour = now.getHours();
      setIsOpen(currentHour >= todayHours.open && currentHour < todayHours.close);
    };

    updateCurrentTime();
    const intervalId = setInterval(updateCurrentTime, 60000); // Actualizar cada minuto

    return () => clearInterval(intervalId); // Limpiar el intervalo cuando el componente se desmonte
  }, []); // Se ejecuta solo una vez en el cliente

  return (
    <div>
      <h2>Today's Hours</h2>
      <p>{today} {hours.display}</p>
      <p>Current Time: {currentTime}</p>
      {isOpen !== null && <p>{isOpen ? "Está abierto!" : "Está cerrado!"}</p>}
    </div>
  );
};

export default Hours;
