// Importing the 'moment' library for date formatting
const moment = require("moment/moment");

// Function for formatting date in "DD/MM/YYYY" format
const formatDate = (date) => {
  // Using 'moment' library to format the date in the specified format
  return moment(date).format("DD/MM/YYYY");
};

// Exporting the formatDate function to be used in other modules
export default formatDate;
