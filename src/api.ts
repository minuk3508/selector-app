import axios from "axios";
const CLOUD_FUNC_ROOTURL = "https://us-central1-selector-f5702.cloudfunctions.net";
const rest = () => {
  return async (url: string, body?: object) => {
    try {
      const response = await axios.post(`${CLOUD_FUNC_ROOTURL}${url}`, body);

      const { data } = response;
      return data;
    } catch (err: any) {
      const { response } = err;

      return response.data;
    }
  };
};

const api = {
  post: rest(),
};

export default api;
