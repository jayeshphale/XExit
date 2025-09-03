const axios = require("axios");

const checkHoliday = async (date) => {
  try {
    const res = await axios.get(`https://calendarific.com/api/v2/holidays?&api_key=${process.env.CALENDARIFIC_API_KEY}&country=IN&year=${new Date(date).getFullYear()}&month=${new Date(date).getMonth()+1}&day=${new Date(date).getDate()}`);
    return res.data.response.holidays.length > 0;
  } catch (err) {
    console.log(err);
    return false;
  }
};

module.exports = { checkHoliday };
