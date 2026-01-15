// Convert Unix timestamp to readable date
export const unixToDate = (timestamp) => {
  return new Date(timestamp * 1000);
};

// Get month name
export const getMonthName = (date) => {
  return new Intl.DateTimeFormat('en-US', { month: 'long' }).format(date);
};

// Get day name
export const getDayName = (date) => {
  return new Intl.DateTimeFormat('en-US', { weekday: 'short' }).format(date);
};

// Get all days in a month
export const getDaysInMonth = (year, month) => {
  return new Date(year, month + 1, 0).getDate();
};

// Format temperature
export const formatTemp = (temp) => {
  return Math.round(temp);
};
