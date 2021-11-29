const axios = require("axios");
const baseURL = "https://kkf22vujvg.execute-api.us-east-2.amazonaws.com/test";

export const getAttendance =  (token: string) => {
  const response = axios.get(baseURL + "/attendances", {
    headers: {
      'Content-Type':'application/json',
      // 'tokenID': `${token}`
    }
  })
  return response
};
