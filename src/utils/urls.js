const developmentURL = "http://localhost:5000";
const liveURL = "https://bankr.herokuapp.com/";

const host = window.location.host;

export const ActiveURL = host === "localhost:3000" ? developmentURL : liveURL;
