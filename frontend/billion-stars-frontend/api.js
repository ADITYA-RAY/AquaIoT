import axios from "axios";

let baseURL = "https://billionstars.herokuapp.com/api/";

export default axios.create({
  baseURL,
});
