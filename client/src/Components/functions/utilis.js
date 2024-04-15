



export const handleChange = (e, key , setObject) => {
    const { value } = e.target;
    setObject(prev => ({ ...prev, [key]: value }));
  };

  export const getWeek = (date) => {
    const firstDayOfYear = new Date(date.getFullYear(), 0, 1);
    const daysFromFirstDay = Math.floor((date - firstDayOfYear) / 86400000);
    return Math.ceil((daysFromFirstDay + date.getDay() + 1) / 7);
  };

 


  


export const  generateWeeks = ()=> {
  const startDate = new Date('2024-01-01'); // Start from January 1st
  const weeks = [];
  for (let i = 0; i < 53; i++) {
    const currentDate = new Date(startDate.getTime());
    currentDate.setDate(startDate.getDate() + i * 7); // Move to the next week
    const month = currentDate.toLocaleString('default', { month: 'short' }); // Get short month name
    const date = `${currentDate.getDate()}/${currentDate.getMonth() + 1}`; // Format date as 'day/month'
    const week = `W${String(i + 1).padStart(2, '0')}`; // Format week number with leading zero
    weeks.push({ month, date, week });
  }
  return weeks;
}




