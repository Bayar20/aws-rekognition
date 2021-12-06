const axios = require("axios");

const api = axios.create({
  baseURL: "https://iz564sr7u2.execute-api.us-east-2.amazonaws.com/dev",
});

export const getUploadUrl = async (endpoint: string, data: any) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
      ...data
    },
  };

  const url = await api.get(endpoint, config);
  return url.data;
};

export const uploadFile = async (endpoint: string, file: any) => {
  await axios.put(endpoint, file, {
    headers: {
      "Content-Type": file.type,
    },
  });
};
