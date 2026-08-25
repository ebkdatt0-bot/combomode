/* =========================================================
   NXTLOOK — MAIN APP
   Handles:
   - AI Stylist chat
   - Clothing image upload preview
   - Navigation helpers
   - Basic saved wardrobe
   - Saved looks
   - Generator support
   ========================================================= */


/* =========================================================
   GLOBAL STORAGE
   ========================================================= */

const NXTLOOK_STORAGE = {

  get(key, fallback = []) {

    try {

      const value = localStorage.getItem(key);

      return value
        ? JSON.parse(value)
        : fallback;

    } catch (error) {

      console.error("Storage read error:", error);

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

      console.error("Storage write error:", error);

      return false;

    }

  }

};


/* =========================================================
   AI STYLIST
   ========================================================= */

let selectedClothingImage = null;


/* ---------------------------------------------------------
   Add message to chat
   --------------------------------------------------------- */

function addChatMessage(type, text) {

  const messages =
    document.getElementById("chatMessages");

  if (!messages) return;


  const message =
    document.createElement("div");

  message.className =
    type === "user"
      ? "message user-message"
      : "message ai-message";


  const label =
    document.createElement("strong");

  label.textContent =
    type === "user"
      ? "YOU"
      : "NXTLOOK";


  const paragraph =
    document.createElement("p");

  paragraph.textContent = text;


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
    document.getElementById("chatMessages");

  if (!messages) return;


  const typing =
    document.createElement("div");

  typing.id = "nxtlookTyping";

  typing.className =
    "message ai-message";


  typing.innerHTML = `
    <strong>NXTLOOK</strong>
    <p>Thinking...</p>
  `;


  messages.appendChild(typing);

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

  /*
   * fashion-brain.js must be loaded before app.js
   * on pages using the AI Stylist.
   */

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
I’m having trouble loading my styling brain right now.

Make sure fashion-brain.js is connected before app.js.
`;

}


/* ---------------------------------------------------------
   Send chat message
   --------------------------------------------------------- */

function sendMessage() {

  const input =
    document.getElementById("chatInput");

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


  /*
   * Small delay makes the interaction feel
   * like an actual AI assistant.
   */

  setTimeout(() => {

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


  }, 450);

}


/* ---------------------------------------------------------
   Enter key sends message
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


/* ---------------------------------------------------------
   Image upload
   --------------------------------------------------------- */

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
   Clear uploaded image
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


/* ---------------------------------------------------------
   Get wardrobe
   --------------------------------------------------------- */

function getWardrobe() {

  return NXTLOOK_STORAGE.get(
    "nxtlook_wardrobe",
    []
  );

}


/* ---------------------------------------------------------
   Save wardrobe
   --------------------------------------------------------- */

function saveWardrobe(items) {

  return NXTLOOK_STORAGE.set(
    "nxtlook_wardrobe",
    items
  );

}


/* ---------------------------------------------------------
   Add wardrobe item
   --------------------------------------------------------- */

function addWardrobeItem(item) {

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


/* ---------------------------------------------------------
   Remove wardrobe item
   --------------------------------------------------------- */

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

  return NXTLOOK_STORAGE.get(
    "nxtlook_saved_looks",
    []
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


function saveSavedLooks(looks) {

  return NXTLOOK_STORAGE.set(
    "nxtlook_saved_looks",
    looks
  );

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


  const fit =
    window.NXTLOOK_STYLE_BRAIN
      .generateFit(style);


  return fit;

}


/* ---------------------------------------------------------
   Format generated outfit
   --------------------------------------------------------- */

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
   ACCOUNT HELPERS
   ========================================================= */

function getAccount() {

  return NXTLOOK_STORAGE.get(
    "nxtlook_account",
    {

      username:
        "NXTLOOK USER",

      plan:
        "FREE"

    }
  );

}


function saveAccount(account) {

  return NXTLOOK_STORAGE.set(
    "nxtlook_account",
    account
  );

}


/* ---------------------------------------------------------
   Set plan
   --------------------------------------------------------- */

function setNXTLOOKPlan(plan) {

  const account =
    getAccount();


  account.plan =
    plan;


  saveAccount(
    account
  );


  return account;

}


/* =========================================================
   GLOBAL UPGRADE HANDLER
   ========================================================= */

function upgrade(plan) {

  alert(
    plan +
    " selected.\n\n" +
    "Payments are not connected yet."
  );

}


/* =========================================================
   SHOP PLACEHOLDER HANDLER
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


  /*
   * Only add a mobile button if the
   * existing website doesn't already
   * have one.
   */

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
    () => {

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
   PAGE INITIALIZATION
   ========================================================= */

function initNXTLOOK() {

  setupChatInput();

  setupImageUpload();

  setupMobileNavigation();

}


/* =========================================================
   START
   ========================================================= */

if (
  document.readyState ===
  "loading"
) {

  document.addEventListener(
    "DOMContentLoaded",
    initNXTLOOK
  );

} else {

  initNXTLOOK();

}
