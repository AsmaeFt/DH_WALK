export const handleChange = (e, key, setObject) => {
  const { value } = e.target;
  setObject((prev) => ({ ...prev, [key]: value }));
};

export const getWeek = (date) => {
  const firstDayOfYear = new Date(date.getFullYear(), 0, 1);
  const daysFromFirstDay = Math.floor((date - firstDayOfYear) / 86400000);
  return Math.ceil((daysFromFirstDay + date.getDay() + 1) / 7);
};


export const generateWeeks = () => {
  const currentYear = new Date().getFullYear();
  const startDate = new Date(`${currentYear}-01-01`); // Start from January 1st
  const weeksInYear = getISOWeeks(currentYear); // Get the number of ISO weeks in the year
  const weeks = [];
  for (let i = 0; i < weeksInYear; i++) {
    const currentDate = new Date(startDate.getTime());
    currentDate.setDate(startDate.getDate() + i * 7); // Move to the next week
    const month = currentDate.toLocaleString("default", { month: "short" }); // Get short month name
    const firstWeekDate = `${currentDate.getDate()}/${currentDate.getMonth() + 1}`;
    
    const lastWeekDateObj = new Date(currentDate.getTime());
    lastWeekDateObj.setDate(currentDate.getDate() + 6); // Add 6 days to get the last date of the week
    const lastWeekDate = `${lastWeekDateObj.getDate()}/${lastWeekDateObj.getMonth() + 1}`;
    
    const weekMonth = lastWeekDateObj.getMonth() !== currentDate.getMonth() 
      ? lastWeekDateObj.toLocaleString("default", { month: "short" }) 
      : month; // Update month if lastWeekDate is in the next month
    
    const week = `W${String(i + 1).padStart(2, "0")}`; // Format week number with leading zero
    weeks.push({ month: weekMonth, firstWeekDate, lastWeekDate, week });
  }
  return weeks;
};

// Function to get the number of ISO weeks in a year
const getISOWeeks = (year) => {
  const endOfYear = new Date(year, 11, 31);
  const weekNumber =
    endOfYear.getDay() === 4 || (endOfYear.getDay() === 3 && isLeapYear(year))
      ? 53
      : 52;
  return weekNumber;
};

// Function to check if a year is a leap year
const isLeapYear = (year) => {
  return (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
};

export const getCurrentWeek = () => {
  const now = new Date();
  const startOfYear = new Date(now.getFullYear(), 0, 0);
  const diff = now - startOfYear;
  const oneWeek = 1000 * 60 * 60 * 24 * 7;
  const weekNumber = Math.floor(diff / oneWeek)+1;
  const dayOfWeek = now.getDay() || 7;
  const correctedWeekNumber = dayOfWeek === 1 ? weekNumber + 1 : weekNumber ;

  return (
    now.getFullYear() + "-W" + String(correctedWeekNumber).padStart(2, "0")
  );
};

export const GetWeeks =(date)=>{
  const firstDayOfYear = new Date(date.getFullYear(), 0, 1);
  const pastDaysOfYear = (date - firstDayOfYear) / 86400000;
  return `${date.getFullYear()}-W${Math.ceil((pastDaysOfYear + firstDayOfYear.getDay() + 1) / 7)}`;
}


export const CheckGap = (list, i) => {
  if (list[i] > 0) return "red";
  return "#0070C0";
};
