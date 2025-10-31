export const initFacebookSdk = () => {
  return new Promise((resolve, reject) => {
    // Load the Facebook SDK asynchronously
    window.fbAsyncInit = () => {
      window.FB.init({
        appId: "1209927870022883",
        cookie: true,
        xfbml: true,
        version: "v20.0",
      });
      // Resolve the promise when the SDK is loaded
      resolve();
    };
  });
};

export const getFacebookLoginStatus = () => {
  return new Promise((resolve, reject) => {
    window.FB.getLoginStatus((response) => {
      resolve(response);
    });
  });
};

export const fbLogin = (config_id) => {
  return new Promise((resolve, reject) => {
    window.FB.login(
      (response) => {
        resolve(response);
      },
      {
        config_id: config_id,
        response_type: "code",
        override_default_response_type: true,
        extras: {
          setup: {},
          featureType: "",
          sessionInfoVersion: "3",
        },
      }
    );
  });
};

export const sessionInfoListener = (event, cb) => {
  if (event.origin == null) {
    return;
  }

  // Make sure the data is coming from facebook.com
  if (!event.origin.endsWith("facebook.com")) {
    return;
  }

  try {
    const data = JSON.parse(event.data);
    if (data.type === "WA_EMBEDDED_SIGNUP") {
      // if user finishes the Embedded Signup flow
      if (data.event === "FINISH") {
        console.log("complete data: " + data.data);
        const { phone_number_id, waba_id } = data.data;
        console.log(
          "Phone number ID ",
          phone_number_id,
          " WhatsApp business account ID ",
          waba_id
        );
        cb({ phone_number_id, waba_id });
      }
      // if user reports an error during the Embedded Signup flow
      else if (data.event === "ERROR") {
        const { error_message } = data.data;
        console.error("error ", error_message);
      }
      // if user cancels the Embedded Signup flow
      else {
        const { current_step } = data.data;
        console.warn("Cancel at ", current_step);
        cb({ reason: "CANCELLED" });
      }
    }
  } catch {
    // Don’t parse info that’s not a JSON
    console.log("Non JSON Response", event.data);
  }
};
