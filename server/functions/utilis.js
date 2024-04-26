exports.generateWeeks = () => {
    const currentYear = new Date().getFullYear();
    const startDate = new Date(`${currentYear}-01-01`); // Start from January 1st
    const weeksInYear = getISOWeeks(currentYear); // Get the number of ISO weeks in the year
    const weeks = [];
    for (let i = 0; i < weeksInYear; i++) {
      const currentDate = new Date(startDate.getTime());
      currentDate.setDate(startDate.getDate() + i * 7); // Move to the next week
      const month = currentDate.toLocaleString('default', { month: 'short' }); // Get short month name
      const date = `${currentDate.getDate()}/${currentDate.getMonth() + 1}`; // Format date as 'day/month'
      const week = `W${String(i + 1).padStart(2, '0')}`; // Format week number with leading zero
      weeks.push({ month, date, week });
    }
    return weeks;
  };
  
  // Function to get the number of ISO weeks in a year
  const getISOWeeks = (year) => {
    const endOfYear = new Date(year, 11, 31);
    const weekNumber = endOfYear.getDay() === 4 || (endOfYear.getDay() === 3 && isLeapYear(year)) ? 53 : 52;
    return weekNumber;
  };
  
  // Function to check if a year is a leap year
  const isLeapYear = (year) => {
    return (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
  };
  