import axios from "axios";

const instance = axios.create();

const get = async (url: string) => {
  return await instance.get(url, {
    headers: { "Content-Type": "application/json" },
  });
};

const post = async (url: string, data: any) => {
  const reqHeaders = {
    "Content-Type": "application/json",
    "x-api-key": `${process.env.NEXT_PUBLIC_API_KEY}`,
  };

  return await instance.post(url, data, {
    headers: {
      "Content-Type": "application/json",
    },
  });
};

export default instance;
export { get, post };
