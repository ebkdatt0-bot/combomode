/* =========================================================
   NXTLOOK APP.JS
   Shared site functionality
   ========================================================= */

document.addEventListener("DOMContentLoaded", function () {

  /* =======================================================
     ACTIVE NAV LINK
     ======================================================= */

  const currentPage =
    window.location.pathname
      .split("/")
      .pop() || "index.html";

  document
    .querySelectorAll(".nav-links a")
    .forEach(function (link) {

      const href =
        link.getAttribute("href");

      if (
        href === currentPage
      ) {
        link.classList.add("active");
      }

    });


  /* =======================================================
     SAVED LOOK COUNT
     ======================================================= */

  updateSavedLookCount();


  /* =======================================================
     GLOBAL LOGOUT BUTTONS
     ======================================================= */

  document
    .querySelectorAll("[data-logout]")
    .forEach(function (button) {

      button.addEventListener(
        "click",
        function () {

          localStorage.removeItem(
            "nxtlook_current_user"
          );

          window.location.href =
            "account.html";

        }
      );

    });


  /* =======================================================
     SMOOTH INTERNAL LINKS
     ======================================================= */

  document
    .querySelectorAll('a[href^="#"]')
    .forEach(function (link) {

      link.addEventListener(
        "click",
        function (event) {

          const targetID =
            link.getAttribute("href");

          const target =
            document.querySelector(
              targetID
            );

          if (!target) {
            return;
          }

          event.preventDefault();

          target.scrollIntoView({
            behavior: "smooth",
            block: "start"
          });

        }
      );

    });


  /* =======================================================
     MOBILE NAV
     ======================================================= */

  const nav =
    document.querySelector(".navbar");

  if (nav) {

    const navLinks =
      document.querySelector(".nav-links");

    if (navLinks) {

      navLinks.addEventListener(
        "wheel",
        function (event) {

          if (
            window.innerWidth <= 650
          ) {

            event.preventDefault();

            navLinks.scrollLeft +=
              event.deltaY;

          }

        },
        { passive: false }
      );

    }

  }

});


/* =========================================================
   SAVED LOOK HELPERS
   ========================================================= */

function getSavedLooks() {

  try {

    return JSON.parse(
      localStorage.getItem(
        "nxtlook_saved_looks"
      ) || "[]"
    );

  } catch {

    return [];

  }

}


function saveLook(look) {

  const savedLooks =
    getSavedLooks();

  savedLooks.push({
    ...look,
    id:
      look.id ||
      Date.now(),
    savedAt:
      look.savedAt ||
      new Date().toISOString()
  });

  localStorage.setItem(
    "nxtlook_saved_looks",
    JSON.stringify(
      savedLooks
    )
  );

  updateSavedLookCount();

}


function deleteSavedLook(id) {

  const savedLooks =
    getSavedLooks()
      .filter(function (look) {

        return String(look.id) !==
          String(id);

      });

  localStorage.setItem(
    "nxtlook_saved_looks",
    JSON.stringify(
      savedLooks
    )
  );

  updateSavedLookCount();

}


function clearSavedLooks() {

  localStorage.removeItem(
    "nxtlook_saved_looks"
  );

  updateSavedLookCount();

}


function updateSavedLookCount() {

  const count =
    getSavedLooks().length;

  document
    .querySelectorAll(
      "[data-saved-look-count]"
    )
    .forEach(function (element) {

      element.textContent =
        count;

    });

}


/* =========================================================
   WARDROBE HELPERS
   ========================================================= */

function getWardrobe() {

  try {

    return JSON.parse(
      localStorage.getItem(
        "nxtlookWardrobe"
      ) || "[]"
    );

  } catch {

    return [];

  }

}


function saveWardrobe(items) {

  localStorage.setItem(
    "nxtlookWardrobe",
    JSON.stringify(
      items
    )
  );

}


function addWardrobeItem(item) {

  const wardrobe =
    getWardrobe();

  wardrobe.push({
    ...item,
    id:
      item.id ||
      Date.now(),
    addedAt:
      item.addedAt ||
      new Date().toISOString()
  });

  saveWardrobe(
    wardrobe
  );

}


function deleteWardrobeItem(id) {

  const wardrobe =
    getWardrobe()
      .filter(function (item) {

        return String(item.id) !==
          String(id);

      });

  saveWardrobe(
    wardrobe
  );

}


/* =========================================================
   CURRENT USER
   ========================================================= */

function getNXTLOOKCurrentUser() {

  const email =
    localStorage.getItem(
      "nxtlook_current_user"
    );

  if (!email) {
    return null;
  }

  try {

    const users =
      JSON.parse(
        localStorage.getItem(
          "nxtlook_users"
        ) || "[]"
      );

    return users.find(
      function (user) {

        return user.email ===
          email;

      }
    ) || null;

  } catch {

    return null;

  }

}


/* =========================================================
   UPDATE USER
   ========================================================= */

function updateNXTLOOKUser(updates) {

  const currentUser =
    getNXTLOOKCurrentUser();

  if (!currentUser) {
    return null;
  }

  try {

    const users =
      JSON.parse(
        localStorage.getItem(
          "nxtlook_users"
        ) || "[]"
      );

    const index =
      users.findIndex(
        function (user) {

          return user.email ===
            currentUser.email;

        }
      );

    if (index === -1) {
      return null;
    }

    users[index] = {
      ...users[index],
      ...updates
    };

    localStorage.setItem(
      "nxtlook_users",
      JSON.stringify(
        users
      )
    );

    return users[index];

  } catch {

    return null;

  }

}


/* =========================================================
   HTML ESCAPE
   ========================================================= */

function escapeNXTLOOKHTML(value) {

  return String(
    value || ""
  )
    .replace(
      /&/g,
      "&amp;"
    )
    .replace(
      /</g,
      "&lt;"
    )
    .replace(
      />/g,
      "&gt;"
    )
    .replace(
      /"/g,
      "&quot;"
    )
    .replace(
      /'/g,
      "&#039;"
    );

}


/* =========================================================
   FORMAT DATE
   ========================================================= */

function formatNXTLOOKDate(date) {

  try {

    return new Date(
      date
    ).toLocaleDateString(
      undefined,
      {
        year: "numeric",
        month: "short",
        day: "numeric"
      }
    );

  } catch {

    return "";

  }

}


/* =========================================================
   NXTLOOK NOTIFICATION
   ========================================================= */

function nxtlookNotify(
  message,
  type = "success"
) {

  const existing =
    document.querySelector(
      ".nxtlook-notification"
    );

  if (existing) {
    existing.remove();
  }

  const notification =
    document.createElement(
      "div"
    );

  notification.className =
    "nxtlook-notification";

  notification.textContent =
    message;

  notification.style.position =
    "fixed";

  notification.style.bottom =
    "25px";

  notification.style.right =
    "25px";

  notification.style.zIndex =
    "9999";

  notification.style.padding =
    "15px 20px";

  notification.style.border =
    "1px solid #333";

  notification.style.borderRadius =
    "10px";

  notification.style.background =
    "#0d0d0d";

  notification.style.color =
    type === "error"
      ? "#ff5555"
      : "#a8ff00";

  notification.style.fontSize =
    "13px";

  notification.style.fontWeight =
    "800";

  notification.style.boxShadow =
    "0 15px 40px rgba(0,0,0,.4)";

  document.body.appendChild(
    notification
  );

  setTimeout(
    function () {

      notification.style.opacity =
        "0";

      notification.style.transition =
        "opacity .25s ease";

      setTimeout(
        function () {

          notification.remove();

        },
        300
      );

    },
    2500
  );

}


/* =========================================================
   PROTECTED PAGE CHECK
   ========================================================= */

function requireNXTLOOKLogin() {

  const user =
    getNXTLOOKCurrentUser();

  if (!user) {

    window.location.href =
      "account.html";

    return false;

  }

  return true;

}


/* =========================================================
   PAGE TRANSITION
   ========================================================= */

document.addEventListener(
  "click",
  function (event) {

    const link =
      event.target.closest(
        "a"
      );

    if (!link) {
      return;
    }

    const href =
      link.getAttribute(
        "href"
      );

    if (
      !href ||
      href.startsWith("#") ||
      href.startsWith("http") ||
      href.startsWith("mailto:") ||
      link.target === "_blank"
    ) {
      return;
    }

    document.body.classList.add(
      "page-loading"
    );

  }
);


/* =========================================================
   GLOBAL ERROR PROTECTION
   ========================================================= */

window.addEventListener(
  "error",
  function (event) {

    console.error(
      "NXTLOOK Error:",
      event.error ||
      event.message
    );

  }
);
