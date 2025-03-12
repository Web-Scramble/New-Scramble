// utils/dateFormatter.ts
export const formatDate = (timestamp: number, formatType: 'short' | 'long'): string => {
    const date = new Date(timestamp * 1000); // Convert seconds to milliseconds
  
    // Extract date components
    const day = String(date.getDate()).padStart(2, '0');
    const month = date.toLocaleString('default', { month: 'long' }); // Full month name (e.g., "April")
    const shortMonth = String(date.getMonth() + 1).padStart(2, '0'); // Month as a number (e.g., "04")
    const year = date.getFullYear();
    const hours = date.getHours();
    const minutes = String(date.getMinutes()).padStart(2, '0');
  
    // Convert hours to 12-hour format and determine AM/PM
    const period = hours >= 12 ? 'PM' : 'AM';
    const formattedHours = hours % 12 || 12; // Convert 0 to 12 for 12-hour format
  
    // Return the date in the specified format
    if (formatType === 'short') {
      return `${day}/${shortMonth}/${year} - ${formattedHours}${period}`; // e.g., "15/02/2025 - 2PM"
    } else {
      return `${day} ${month} at ${formattedHours}:${minutes}`; // e.g., "12 April at 09:28"
    }
  };