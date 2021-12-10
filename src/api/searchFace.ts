const axios = require("axios");

const api = axios.create({
  baseURL: "https://iwwz7agqb6.execute-api.us-east-2.amazonaws.com/test",
});

export const getMatchingFace = async (endpoint: string, data: any) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
      ...data
    },
  };

    const url = await api.get(endpoint, config);
    return url.data;

};

