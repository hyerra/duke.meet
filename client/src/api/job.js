import axios from "axios";

// really no idea if this is necessary, but it's going in for now.

export default axios.create({
  baseURL: "http://localhost:5000/api/job",
});
