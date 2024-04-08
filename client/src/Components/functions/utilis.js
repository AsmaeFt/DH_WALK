



export const handleChange = (e, key , setObject) => {
    const { value } = e.target;
    setObject(prev => ({ ...prev, [key]: value }));
  };

  export const getWeek = (date) => {
    const firstDayOfYear = new Date(date.getFullYear(), 0, 1);
    const daysFromFirstDay = Math.floor((date - firstDayOfYear) / 86400000);
    return Math.ceil((daysFromFirstDay + date.getDay() + 1) / 7);
  };
