import axios from "axios";

// axios gets the url and returns a response on success
const fetcher = (url: string) => axios.get(url).then(res => res.data)

export default fetcher