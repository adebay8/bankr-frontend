// constants
export const USER_TOKEN = "bankr_token";
export const USER_DATA = "bankr_user_data";

export const primaryColor = "#4f39f6";

// functions
export const errorHandler = (err, defaulted = false) => {
  if (defaulted) {
    return "Oops!, an error occurred.";
  }

  let messageString = "";
  if (!err.response) {
    messageString += "Network error! check your network and try again";
  } else {
    let data = err.response.data.message;
    if (!err.response.data.message) {
      data = err.response.data;
      messageString = loopObj(data);
    } else {
      messageString = data;
    }
  }
  return messageString.replace(/{|}|'|\[|\]/g, "");
};

const loopObj = (obj) => {
  let agg = "";
  for (let key in obj) {
    if (obj.hasOwnProperty(key)) {
      agg += `<div>${key}: ${
        typeof obj[key] === "object" ? loopObj(obj[key]) : obj[key]
      }</div>`;
    }
  }
  return agg;
};

export const randomIDGenerator = (length) => {
  let text = "";
  let possible =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz1234567890";

  for (let i = 0; i < length; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }

  return text;
};

// function to check if an element has a class
export const hasClass = (el, className) => {
  if (!el) {
    return;
  }
  return el.classList.contains(className);
};

// function to add a class to an element
export const addClass = (el, className) => {
  if (!el) {
    return;
  }
  el.classList.add(className);
};

// function to remove a class from an element
export const removeClass = (ele, cls) => {
  if (!ele) {
    return;
  }
  if (hasClass(ele, cls)) {
    ele.classList.remove(cls);
  }
};

// get user token
export const getToken = (_) => {
  let tokenObj = localStorage.getItem(USER_TOKEN);
  if (tokenObj) {
    return tokenObj;
  }
  return null;
};
