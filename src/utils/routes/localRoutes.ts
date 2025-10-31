export const routes = {
  login: {
    home: "/login",
  },
  signUp: {
    home: "/signup",
  },
  blogs:{
    create: "/create-blogs"
  },
  baseprompts:{
    home:"/baseprompts",
    table:"/baseprompts/table",
    create:"/create-prompt"
  },
  inbox: {
    home: "/inbox",
  },
  automations: {
    home: "/automations",
    keywordActions: "/automations/keyword-actions",
    keywordActionsCreate: "/create-keyword-actions",
    flow: "/automations/flows",
    flowCreate: "/create-flow",
  },
  ctw: {
    home: "/ctw",
    create: "/create-ctw",
  },
  chatbot: {
    home: "/chatbot",
    create: "/create-chatbot",
  },
  broadcast: {
    home: "/broadcast",
    broadcastCreate: "/create-broadcast",
    templates: "/broadcast/templates",
    scheduled: "/broadcast/scheduled",
    history: "/broadcast/history",
    templateCreate: "/create-template",
    newsletters: "/broadcast/newsletters",
    newsletterCreate: "/create-newsletter",
    massMessageHistory: "/mass-message/history",
    massMessageScheduled: "/mass-message/scheduled",
  },
  massMessage: {
    home: "/mass-message",
    history: "/mass-message/history",
    scheduled: "/mass-message/scheduled",
    newsletters: "/mass-message/newsletters",
    newsletterCreate: "/create-newsletter",
    create: "/create-mass-message",
  },
  reports: {},
  users: {
    home: "/users",
    create: "/create-user",
  },
  contacts: {
    home: "/contacts",
    create: "/create-contact",
    sync: "/sync-contacts",
  },
  profile: {
    home: "/profile",
    settings: "/profile/settings",
    attributes: "/profile/attributes",
    billing: "/profile/billing",
    integrations: {
      home: "/profile/integrations",
      instagram: "/profile/integrations/instagram",
      fb: "/profile/integrations/facebook",
      waba: "/profile/integrations/waba",
    },
    plan: "/profile/plan",
    team: "/profile/team",
    ai: "profile/ai",
  },
  onboarding: {
    home: "/onboarding",
    paymentSuccess: "/onboarding/payment/success",
    paymentFailure: "/onboarding/payment/failure",
  },
  pipeline: {
    home: "/pipeline",
  },
  datasource: {
    home: "/datasources",
  },
  ai: {
    home: "/ai",
    create: "/create-ai",
  },
};

export const findBreadCrumbValue = (key) => {
  let values = {
    "keyword-actions": "Keyword Actions",
    blogs:"Blogs"
  };
  return values[key];
};

export const findKeyByRoute = (obj, route) => {
  for (const key in obj) {
    if (typeof obj[key] === "object") {
      for (const subKey in obj[key]) {
        if (obj[key][subKey] === route) {
          return key;
        }
      }
    }
  }
  return null;
};
