/* =========================================================
   NXTLOOK — MAIN APP
   Includes:
   - AI Stylist
   - Clothing image upload
   - Wardrobe
   - Saved looks
   - Generator support
   - Account creation
   - Login / logout
   - Account persistence with localStorage
   ========================================================= */


/* =========================================================
   GLOBAL STORAGE
   ========================================================= */

const NXTLOOK_STORAGE = {

  get(key, fallback = null) {

    try {

      const value = localStorage.getItem(key);

      return value !== null
        ? JSON.parse(value)
        : fallback;

    } catch (error) {

      console.error("NXTLOOK storage read error:", error);

      return fallback;

    }

  },


  set(key, value) {

    try {

      localStorage.setItem(
        key,
        JSON.stringify(value)
      );

      return true;

    } catch (error) {

      console.error("NXTLOOK storage write error:", error);

      return false;

    }

  },


  remove(key) {

    try {

      localStorage.removeItem(key);

      return true;

    } catch (error) {

      console.error("NXTLOOK storage remove error:", error);

      return false;

    }

  }

};


/* =========================================================
   ACCOUNT SYSTEM
   ========================================================= */

/*
   IMPORTANT:
   This is a FRONT-END account system.

   Accounts are stored in this browser's localStorage.
   It is NOT a real secure online authentication system.

   For a real production website, you would eventually
   connect this to Firebase, Supabase, Auth0, or your own
   backend.
*/


function getAccounts() {

  return NXTLOOK_STORAGE.get(
    "nxtlook_accounts",
    []
  );

}


function saveAccounts(accounts) {

  return NXTLOOK_STORAGE.set(
    "nxtlook_accounts",
    accounts
  );

}


function getCurrentUser() {

  return NXTLOOK_STORAGE.get(
    "nxtlook_current_user",
    null
  );

}


function setCurrentUser(user) {

  return NXTLOOK_STORAGE.set(
    "nxtlook_current_user",
    user
  );

}


function clearCurrentUser() {

  return NXTLOOK_STORAGE.remove(
    "nxtlook_current_user"
  );

}


/* ---------------------------------------------------------
   Create account
   --------------------------------------------------------- */

function createNXTLOOKAccount(username, email, password) {

  username =
    String(username || "")
      .trim();

  email =
    String(email || "")
      .trim()
      .toLowerCase();

  password =
    String(password || "");


  if (!username) {

    return {
      success: false,
      message: "Please enter a username."
    };

  }


  if (!email) {

    return {
      success: false,
      message: "Please enter your email."
    };

  }


  if (!password) {

    return {
      success: false,
      message: "Please enter a password."
    };

  }


  if (password.length < 6) {

    return {
      success: false,
      message: "Password must be at least 6 characters."
    };

  }


  const accounts =
    getAccounts();


  const usernameExists =
    accounts.some(
      account =>
        account.username.toLowerCase() ===
        username.toLowerCase()
    );


  if (usernameExists) {

    return {
      success: false,
      message: "That username is already taken."
    };

  }


  const emailExists =
    accounts.some(
      account =>
        account.email.toLowerCase() === email
    );


  if (emailExists) {

    return {
      success: false,
      message: "An account with that email already exists."
    };

  }


  const account = {

    id:
      "user_" +
      Date.now() +
      "_" +
      Math.random()
        .toString(36)
        .slice(2, 8),

    username,

    email,

    /*
      This is only suitable for a local demo.
      Never store plain-text passwords in a real production app.
    */
    password,

    plan:
      "FREE",

    createdAt:
      new Date().toISOString()

  };


  accounts.push(account);


  const saved =
    saveAccounts(accounts);


  if (!saved) {

    return {
      success: false,
      message: "Unable to create the account."
    };

  }


  setCurrentUser({

    id:
      account.id,

    username:
      account.username,

    email:
      account.email,

    plan:
      account.plan

  });


  return {

    success: true,

    message:
      "Account created successfully.",

    user:
      account

  };

}


/* ---------------------------------------------------------
   Login
   --------------------------------------------------------- */

function loginNXTLOOK(email, password) {

  email =
    String(email || "")
      .trim()
      .toLowerCase();

  password =
    String(password || "");


  if (!email || !password) {

    return {
      success: false,
      message: "Enter your email and password."
    };

  }


  const accounts =
    getAccounts();


  const account =
    accounts.find(
      user =>
        user.email.toLowerCase() === email &&
        user.password === password
    );


  if (!account) {

    return {
      success: false,
      message: "Incorrect email or password."
    };

  }


  const currentUser = {

    id:
      account.id,

    username:
      account.username,

    email:
      account.email,

    plan:
      account.plan || "FREE"

  };


  setCurrentUser(
    currentUser
  );


  return {

    success: true,

    message:
      "Logged in successfully.",

    user:
      currentUser

  };

}


/* ---------------------------------------------------------
   Logout
   --------------------------------------------------------- */

function logoutNXTLOOK() {

  clearCurrentUser();

  return true;

}


/* ---------------------------------------------------------
   Get account
   --------------------------------------------------------- */

function getAccount() {

  const currentUser =
    getCurrentUser();


  if (!currentUser) {

    return null;

  }


  const accounts =
    getAccounts();


  const account =
    accounts.find(
      user =>
        user.id === currentUser.id
    );


  if (!account) {

    clearCurrentUser();

    return null;

  }


  return {

    id:
      account.id,

    username:
      account.username,

    email:
      account.email,

    plan:
      account.plan || "FREE",

    createdAt:
      account.createdAt

  };

}


/* ---------------------------------------------------------
   Save account
   --------------------------------------------------------- */

function saveAccount(account) {

  if (!account || !account.id) {

    return false;

  }


  const accounts =
    getAccounts();


  const index =
    accounts.findIndex(
      user =>
        user.id === account.id
    );


  if (index === -1) {

    return false;

  }


  accounts[index] = {

    ...accounts[index],

    ...account

  };


  const saved =
    saveAccounts(accounts);


  if (saved) {

    setCurrentUser({

      id:
        accounts[index].id,

      username:
        accounts[index].username,

      email:
        accounts[index].email,

      plan:
        accounts[index].plan || "FREE"

    });

  }


  return saved;

}


/* ---------------------------------------------------------
   Set plan
   --------------------------------------------------------- */

function setNXTLOOKPlan(plan) {

  const account =
    getAccount();


  if (!account) {

    return null;

  }


  account.plan =
    String(plan || "FREE")
      .toUpperCase();


  saveAccount(account);


  return getAccount();

}


/* ---------------------------------------------------------
   Check login
   --------------------------------------------------------- */

function isNXTLOOKLoggedIn() {

  return !!getAccount();

}


/* =========================================================
   AI STYLIST
   ========================================================= */

let selectedClothingImage = null;


/* ---------------------------------------------------------
   Add chat message
   --------------------------------------------------------- */

function addChatMessage(type, text) {

  const messages =
    document.getElementById(
      "chatMessages"
    );


  if (!messages) return;


  const message =
    document.createElement(
      "div"
    );


  message.className =
    type === "user"
      ? "message user-message"
      : "message ai-message";


  const label =
    document.createElement(
      "strong"
    );


  label.textContent =
    type === "user"
      ? "YOU"
      : "NXTLOOK";


  const paragraph =
    document.createElement(
      "p"
    );


  paragraph.textContent =
    text;


  message.appendChild(label);

  message.appendChild(paragraph);

  messages.appendChild(message);


  messages.scrollTop =
    messages.scrollHeight;

}


/* ---------------------------------------------------------
   Typing indicator
   --------------------------------------------------------- */

function showTyping() {

  const messages =
    document.getElementById(
      "chatMessages"
    );


  if (!messages) return;


  const typing =
    document.createElement(
      "div"
    );


  typing.id =
    "nxtlookTyping";


  typing.className =
    "message ai-message";


  typing.innerHTML = `
    <strong>NXTLOOK</strong>
    <p>Thinking...</p>
  `;


  messages.appendChild(
    typing
  );


  messages.scrollTop =
    messages.scrollHeight;

}


/* ---------------------------------------------------------
   Remove typing indicator
   --------------------------------------------------------- */

function hideTyping() {

  const typing =
    document.getElementById(
      "nxtlookTyping"
    );


  if (typing) {

    typing.remove();

  }

}


/* ---------------------------------------------------------
   Generate AI response
   --------------------------------------------------------- */

function generateNXTLOOKResponse(message) {

  if (
    window.NXTLOOK_STYLE_BRAIN &&
    typeof window.NXTLOOK_STYLE_BRAIN.respond ===
      "function"
  ) {

    return window.NXTLOOK_STYLE_BRAIN.respond(
      message
    );

  }


  return `
I'm having trouble loading my styling brain right now.

Make sure fashion-brain.js is connected before app.js.
`;

}


/* ---------------------------------------------------------
   Send chat message
   --------------------------------------------------------- */

function sendMessage() {

  const input =
    document.getElementById(
      "chatInput"
    );


  if (!input) return;


  const message =
    input.value.trim();


  if (!message) return;


  addChatMessage(
    "user",
    message
  );


  input.value = "";


  showTyping();


  setTimeout(
    function () {

      hideTyping();


      let response;


      try {

        response =
          generateNXTLOOKResponse(
            message
          );

      } catch (error) {

        console.error(
          "NXTLOOK AI error:",
          error
        );


        response =
          "Something went wrong while building the fit. Try asking again.";

      }


      addChatMessage(
        "ai",
        response
      );

    },
    450
  );

}


/* ---------------------------------------------------------
   Enter key
   --------------------------------------------------------- */

function setupChatInput() {

  const input =
    document.getElementById(
      "chatInput"
    );


  if (!input) return;


  input.addEventListener(
    "keydown",
    function(event) {

      if (
        event.key === "Enter" &&
        !event.shiftKey
      ) {

        event.preventDefault();

        sendMessage();

      }

    }
  );

}


/* =========================================================
   IMAGE UPLOAD
   ========================================================= */

function setupImageUpload() {

  const input =
    document.getElementById(
      "clothesImage"
    );


  const preview =
    document.getElementById(
      "uploadPreview"
    );


  if (!input || !preview) return;


  input.addEventListener(
    "change",
    function() {

      const file =
        input.files &&
        input.files[0];


      if (!file) return;


      if (
        !file.type.startsWith(
          "image/"
        )
      ) {

        preview.textContent =
          "Please choose an image.";

        return;

      }


      selectedClothingImage =
        file;


      const reader =
        new FileReader();


      reader.onload =
        function(event) {

          preview.innerHTML = `
            <div class="nxtlook-uploaded-image">

              <img
                src="${event.target.result}"
                alt="Uploaded clothing"
                style="
                  max-width:120px;
                  max-height:120px;
                  object-fit:cover;
                  border-radius:10px;
                  display:block;
                "
              >

              <button
                type="button"
                onclick="clearClothingImage()"
                style="
                  margin-top:8px;
                  cursor:pointer;
                "
              >
                REMOVE
              </button>

            </div>
          `;

        };


      reader.readAsDataURL(file);

    }
  );

}


/* ---------------------------------------------------------
   Clear image
   --------------------------------------------------------- */

function clearClothingImage() {

  const input =
    document.getElementById(
      "clothesImage"
    );


  const preview =
    document.getElementById(
      "uploadPreview"
    );


  selectedClothingImage =
    null;


  if (input) {

    input.value = "";

  }


  if (preview) {

    preview.innerHTML = "";

  }

}


/* =========================================================
   WARDROBE
   ========================================================= */

function getWardrobe() {

  const account =
    getAccount();


  /*
   * Keep wardrobe separate per logged-in user.
   */

  const key =
    account
      ? "nxtlook_wardrobe_" + account.id
      : "nxtlook_wardrobe_guest";


  return NXTLOOK_STORAGE.get(
    key,
    []
  );

}


function saveWardrobe(items) {

  const account =
    getAccount();


  const key =
    account
      ? "nxtlook_wardrobe_" + account.id
      : "nxtlook_wardrobe_guest";


  return NXTLOOK_STORAGE.set(
    key,
    items
  );

}


function addWardrobeItem(item) {

  item =
    item || {};


  const wardrobe =
    getWardrobe();


  wardrobe.push({

    id:
      Date.now(),

    name:
      item.name ||
      "Untitled item",

    category:
      item.category ||
      "Other",

    brand:
      item.brand ||
      "",

    color:
      item.color ||
      "",

    image:
      item.image ||
      null

  });


  saveWardrobe(
    wardrobe
  );


  return wardrobe;

}


function removeWardrobeItem(id) {

  const wardrobe =
    getWardrobe()
      .filter(
        item =>
          item.id !== id
      );


  saveWardrobe(
    wardrobe
  );


  return wardrobe;

}


/* =========================================================
   SAVED LOOKS
   ========================================================= */

function getSavedLooks() {

  const account =
    getAccount();


  const key =
    account
      ? "nxtlook_saved_looks_" + account.id
      : "nxtlook_saved_looks_guest";


  return NXTLOOK_STORAGE.get(
    key,
    []
  );

}


function saveSavedLooks(looks) {

  const account =
    getAccount();


  const key =
    account
      ? "nxtlook_saved_looks_" + account.id
      : "nxtlook_saved_looks_guest";


  return NXTLOOK_STORAGE.set(
    key,
    looks
  );

}


function saveLook(look) {

  const looks =
    getSavedLooks();


  looks.push({

    id:
      Date.now(),

    createdAt:
      new Date().toISOString(),

    ...look

  });


  saveSavedLooks(
    looks
  );


  return looks;

}


function removeSavedLook(id) {

  const looks =
    getSavedLooks()
      .filter(
        look =>
          look.id !== id
      );


  saveSavedLooks(
    looks
  );


  return looks;

}


/* =========================================================
   GENERATOR
   ========================================================= */

function generateOutfit(style = "streetwear") {

  if (
    !window.NXTLOOK_STYLE_BRAIN
  ) {

    console.error(
      "fashion-brain.js is not loaded."
    );

    return null;

  }


  if (
    typeof window.NXTLOOK_STYLE_BRAIN.generateFit !==
      "function"
  ) {

    console.error(
      "generateFit() is missing."
    );

    return null;

  }


  return window.NXTLOOK_STYLE_BRAIN
    .generateFit(style);

}


function formatGeneratedOutfit(fit) {

  if (!fit) {

    return "Unable to generate outfit.";

  }


  let text =
`LOOK — ${String(
  fit.style || "STREETWEAR"
).toUpperCase()}

TOP: ${fit.top || "—"}

BOTTOM: ${fit.bottom || "—"}

SHOES: ${fit.shoes || "—"}`;


  if (fit.layer) {

    text +=
      `\n\nLAYER: ${fit.layer}`;

  }


  if (fit.accessory) {

    text +=
      `\n\nACCESSORIES: ${fit.accessory}`;

  }


  return text;

}


/* =========================================================
   UPGRADE
   ========================================================= */

function upgrade(plan) {

  const account =
    getAccount();


  if (!account) {

    alert(
      "Create an NXTLOOK account before upgrading."
    );


    window.location.href =
      "account.html";


    return;

  }


  alert(
    String(plan).toUpperCase() +
    " selected.\n\nPayments are not connected yet."
  );

}


/* =========================================================
   SHOP
   ========================================================= */

function shopAlert(event) {

  if (event) {

    event.preventDefault();

  }


  alert(
    "NXTLOOK Shop is coming soon."
  );

}


/* =========================================================
   MOBILE NAVIGATION
   ========================================================= */

function setupMobileNavigation() {

  const nav =
    document.querySelector(
      ".nav-links"
    );


  if (!nav) return;


  const existingButton =
    document.querySelector(
      ".mobile-menu-button"
    );


  if (existingButton) return;


  const button =
    document.createElement(
      "button"
    );


  button.className =
    "mobile-menu-button";


  button.type =
    "button";


  button.textContent =
    "☰";


  button.setAttribute(
    "aria-label",
    "Open navigation"
  );


  button.addEventListener(
    "click",
    function() {

      nav.classList.toggle(
        "mobile-open"
      );

    }
  );


  const navbar =
    document.querySelector(
      ".navbar, nav"
    );


  if (navbar) {

    navbar.appendChild(
      button
    );

  }

}


/* =========================================================
   ACCOUNT PAGE UI HELPER
   ========================================================= */

/*
   This automatically changes common account-page
   elements if they exist.

   It does NOT replace your account.html.
*/

function updateAccountPage() {

  const account =
    getAccount();


  const usernameElements =
    document.querySelectorAll(
      "[data-account-username]"
    );


  const planElements =
    document.querySelectorAll(
      "[data-account-plan]"
    );


  const emailElements =
    document.querySelectorAll(
      "[data-account-email]"
    );


  usernameElements.forEach(
    element => {

      element.textContent =
        account
          ? account.username
          : "GUEST";

    }
  );


  planElements.forEach(
    element => {

      element.textContent =
        account
          ? account.plan
          : "FREE";

    }
  );


  emailElements.forEach(
    element => {

      element.textContent =
        account
          ? account.email
          : "NOT LOGGED IN";

    }
  );


  const savedLooks =
    getSavedLooks();


  const wardrobe =
    getWardrobe();


  const savedCountElements =
    document.querySelectorAll(
      "[data-saved-looks-count]"
    );


  const wardrobeCountElements =
    document.querySelectorAll(
      "[data-wardrobe-count]"
    );


  savedCountElements.forEach(
    element => {

      element.textContent =
        savedLooks.length;

    }
  );


  wardrobeCountElements.forEach(
    element => {

      element.textContent =
        wardrobe.length;

    }
  );

}


/* =========================================================
   GLOBAL INITIALIZATION
   ========================================================= */

function initNXTLOOK() {

  setupChatInput();

  setupImageUpload();

  setupMobileNavigation();

  updateAccountPage();

}


/* =========================================================
   START APP
   ========================================================= */

if (
  document.readyState === "loading"
) {

  document.addEventListener(
    "DOMContentLoaded",
    initNXTLOOK
  );

} else {

  initNXTLOOK();

}
