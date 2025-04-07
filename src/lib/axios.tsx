import _axios from "axios";

const axios = _axios.create({
  baseURL: "https://test-task-api.allfuneral.com/",
});

export default axios;
