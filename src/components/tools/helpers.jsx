import axios from "axios";
import { createBrowserHistory } from "history";
import { decryptData, encryptData } from "./EncryptDecrypt";
import config from "./config";
import $ from "jquery";

const hostName = config.BASE_URL;
const SESSION_KEY_NAME = config.SESSION_KEY_NAME;
let headers = {};

export const history = createBrowserHistory();

// Get all getbased service calls.
export async function getServiceCALLS(serviceURI, dataObject = {}) {
  // Session validation
  const user = getCacheObject(config.SESSION_KEY_NAME);

  if (user) {
    headers = {
      "Content-Type": "application/json",
      authorization: `Bearer ${user.token}`,
      userId: user.userId,
    };
  }

  const prepareURL = hostName + serviceURI;
  var tempResponseObject = {};
  tempResponseObject = await axios({
    method: "GET",
    url: prepareURL,
    headers: headers,
    params: {
      format: "json",
    },
  }).then((response) => {
    if (
      response.data.message == "Auth failed" ||
      response.data.code == "USER_BLOCKED"
    ) {
      removeSession();
    }
    return response.data;
  });
  return tempResponseObject;
}

// Get all post based service calls.
export async function postServiceCALLS(serviceURI, dataObject = {}) {
  // Session validation
  const user = getCacheObject(SESSION_KEY_NAME);

  if (serviceURI != "/user/login" || serviceURI != "/register") {
    if (user) {
      headers = {
        "Content-Type": "application/json",
        authorization: `Bearer ${user.token}`,
        userId: user.userId,
      };
    }
  }
  const prepareURL = hostName + serviceURI;
  var tempResponseObject = {};

  tempResponseObject = await axios
    .post(prepareURL, dataObject, {
      headers: headers,
    })
    .then((response) => {
      if (
        response.data.message == "Auth failed" ||
        response.data.code == "USER_BLOCKED"
      ) {
        removeSession();
      }

      return response.data;
    });

  return tempResponseObject;
}

/**
 * @desciption
 * To check user athentication status for protected routes
 */
export function checkSession() {
  let user = getCacheObject(config.SESSION_KEY_NAME);
  if (user) {
    return true;
  } else {
    return false;
  }
}
/**
 * @description
 * to remove currest user session
 */
export function removeSession() {
  // localStorage.removeItem(SESSION_KEY_NAME);
  localStorage.clear();
  window.location.href = "/login";
}

/**
 * @set cache object
 */
export function setCacheObject(key_name, value) {
  localStorage.setItem(key_name, encryptData(value));
  return true;
}

/**
 * @get cache object
 */
export function getCacheObject(key_name) {
  let data = localStorage.getItem(key_name);
  data = data ? decryptData(data) : null;
  return data;
}



/**
 *  Global Search is useful to search string and numbers over all ARRAY of OBJECTS
 *  search string is not null
 */
export function globalSearch(data, searchString = "") {
  if (searchString != "" && data.length > 0) {
    let filtered = data.filter((entry) =>
      Object.values(entry).some(
        (val) =>
          (typeof val !== "string" && val !== null
            ? (val = val.toString())
            : val) && val.toLowerCase().includes(searchString.toLowerCase())
      )
    );
    return filtered;
  }
  return data;
}

/**
 * @param validationFileds{the fields to be validated} object
 * @param validationState{the state that validation should be performed on} object
 */
export function validateForm(validationState, validationFileds) {
  let formIsValid = true;
  let errors = {};
  for (var name in validationFileds) {
    if (!validationState[name]) {
      formIsValid = false;
      errors[name] = "This field i required";
    } else {
      errors[name] = "";
    }
  }
  return { formIsValid, errors };
}
export function JQuery() {

  //toggle sidebar
  $("#toggle-sidebar").click(function () {
    $(".page-wrapper").toggleClass("toggled");
  });
  $(document).ready(function(){
    $('.nav-icon1,#nav-icon2,#nav-icon3,#nav-icon4').click(function(){
      $(this).toggleClass('open');
    });
  });
  
  //toggle sidebar overlay
  $("#overlay").click(function () {
    $(".page-wrapper").toggleClass("toggled");
  });
}
