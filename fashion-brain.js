const COMBOMODE = {
  name: "ComboMODE",
  version: "1.0.0"
};

const KEYS = {
  users: "combomode_users",
  currentUser: "combomode_current_user",
  wardrobe: "combomode_wardrobe",
  looks: "combomode_saved_looks",
  plan: "combomode_plan"
};

function readJSON(key, fallback = []) {
  try {
    return JSON.parse(localStorage.getItem(key)) ?? fallback;
  } catch {
    return fallback;
  }
}

function writeJSON(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}

function getUsers() {
  return readJSON(KEYS.users, []);
}

function getCurrentEmail() {
  return localStorage.getItem(KEYS.currentUser);
}

function getCurrentUser() {
  const email = getCurrentEmail();
  if (!email) return null;

  return getUsers().find(
    user => user.email === email
  ) || null;
}

function saveCurrentUser(user) {
  const users = getUsers();

  const index = users.findIndex(
    item => item.email === user.email
  );

  if (index >= 0) {
    users[index] = user;
  } else {
    users.push(user);
  }

  writeJSON(KEYS.users, users);
}

function setCurrentUser(email) {
  localStorage.setItem(KEYS.currentUser, email);
}

function logoutUser() {
  localStorage.removeItem(KEYS.currentUser);
}

function getWardrobe() {
  const user = getCurrentUser();
  const all = readJSON(KEYS.wardrobe, {});

  if (!user) return [];

  return all[user.email] || [];
}

function saveWardrobe(items) {
  const user = getCurrentUser();
  if (!user) return false;

  const all = readJSON(KEYS.wardrobe, {});
  all[user.email] = items;

  writeJSON(KEYS.wardrobe, all);
  return true;
}

function getSavedLooks() {
  const user = getCurrentUser();
  const all = readJSON(KEYS.looks, {});

  if (!user) return [];

  return all[user.email] || [];
}

function saveLooks(looks) {
  const user = getCurrentUser();
  if (!user) return false;

  const all = readJSON(KEYS.looks, {});
  all[user.email] = looks;

  writeJSON(KEYS.looks, all);
  return true;
}

function saveLook(look) {
  const looks = getSavedLooks();

  looks.unshift({
    ...look,
    id: Date.now(),
    savedAt: new Date().toISOString()
  });

  return saveLooks(looks);
}

function getUserPlan() {
  const user = getCurrentUser();
  return user?.plan || "FREE";
}

function setUserPlan(plan) {
  const user = getCurrentUser();

  if (!user) return false;

  user.plan = plan;
  saveCurrentUser(user);

  return true;
}

function requireLogin() {
  if (!getCurrentUser()) {
    window.location.href = "account.html";
    return false;
  }

  return true;
}

function escapeHTML(value) {
  return String(value ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

function makeFooter() {
  const footer = document.querySelector("[data-footer]");

  if (!footer) return;

  footer.innerHTML = `
    <div class="footer-grid">

      <div class="footer-brand">
        <a href="index.html" class="logo">
          Combo<span>MODE</span>
        </a>

        <p>
          Your next fit starts here.
          Build outfits around your vibe,
          wardrobe and style.
        </p>
      </div>

      <div class="footer-column">
        <h4>PRODUCT</h4>
        <a href="generator.html">Generator</a>
        <a href="wardrobe.html">Wardrobe</a>
        <a href="inspo.html">AI Stylist</a>
        <a href="shop.html">Shop</a>
        <a href="plans.html">Plans</a>
      </div>

      <div class="footer-column">
        <h4>DISCOVER</h4>
        <a href="inspo.html">Inspo</a>
        <a href="faq.html">FAQ</a>
        <a href="account.html">Account</a>
      </div>

      <div class="footer-column">
        <h4>ACCOUNT</h4>
        <a href="account.html">My Account</a>
        <a href="plans.html">Subscription</a>
        <a href="wardrobe.html">Saved Wardrobe</a>
      </div>

      <div class="footer-column">
        <h4>SOCIAL</h4>
        <a href="https://www.instagram.com/15k_roy/"
           target="_blank"
           rel="noopener noreferrer">
          Instagram ↗
        </a>
      </div>

      <div class="footer-column">
        <h4>LEGAL</h4>
        <a href="privacy.html">Privacy</a>
        <a href="terms.html">Terms</a>
        <a href="refunds.html">Refunds</a>
        <a href="mailto:hello@combomode.com">Contact</a>
      </div>

    </div>

    <div class="footer-bottom">
      <span>© 2026 ComboMODE.</span>
      <span>BUILT FOR BETTER FITS.</span>
    </div>
  `;
}

document.addEventListener("DOMContentLoaded", () => {
  makeFooter();
});
