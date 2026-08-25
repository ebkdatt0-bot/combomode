const chatInput = document.getElementById("chatInput");
const chatMessages = document.getElementById("chatMessages");
const clothesImage = document.getElementById("clothesImage");
const uploadPreview = document.getElementById("uploadPreview");

let selectedImage = null;


/* =========================
   IMAGE UPLOAD
========================= */

if (clothesImage) {

  clothesImage.addEventListener("change", function () {

    const file = this.files[0];

    if (!file) {
      selectedImage = null;

      if (uploadPreview) {
        uploadPreview.innerHTML = "";
      }

      return;
    }

    selectedImage = file;

    if (uploadPreview) {

      const reader = new FileReader();

      reader.onload = function (event) {

        uploadPreview.innerHTML = `
          <div class="image-preview">
            <img src="${event.target.result}" alt="Uploaded clothing">
            <button type="button" onclick="removeImage()">×</button>
          </div>
        `;

      };

      reader.readAsDataURL(file);
    }

  });

}


/* =========================
   REMOVE IMAGE
========================= */

function removeImage() {

  selectedImage = null;

  if (clothesImage) {
    clothesImage.value = "";
  }

  if (uploadPreview) {
    uploadPreview.innerHTML = "";
  }

}


/* =========================
   CHAT MESSAGE
========================= */

function addChatMessage(name, text, type) {

  if (!chatMessages) return null;

  const message = document.createElement("div");

  message.className =
    type === "user"
      ? "message user-message"
      : "message ai-message";

  message.innerHTML = `
    <strong>${escapeHTML(name)}</strong>
    <p>${escapeHTML(text)}</p>
  `;

  chatMessages.appendChild(message);

  chatMessages.scrollTop = chatMessages.scrollHeight;

  return message;
}


/* =========================
   SEND MESSAGE
========================= */

async function sendMessage() {

  if (!chatInput || !chatMessages) return;

  const text = chatInput.value.trim();

  if (!text && !selectedImage) return;


  /* USER MESSAGE */

  const displayText =
    text ||
    "Style this clothing photo.";

  addChatMessage(
    "YOU",
    displayText,
    "user"
  );

  chatInput.value = "";


  /* AI THINKING */

  const aiMessage = addChatMessage(
    "NXTLOOK",
    "Thinking... 👀",
    "ai"
  );


  try {

    let messageToSend = text;

    if (!messageToSend && selectedImage) {
      messageToSend =
        "Analyze this clothing photo and style the outfit.";
    }


    /*
      IMPORTANT:

      Your Vercel API is:

      /api/chat

      We send the user's message there.
    */

    const response = await fetch(
      "/api/chat",
      {
        method: "POST",

        headers: {
          "Content-Type": "application/json"
        },

        body: JSON.stringify({
          message: messageToSend
        })
      }
    );


    const data = await response.json();


    if (!response.ok) {

      throw new Error(
        data.error ||
        "AI request failed"
      );

    }


    const reply =
      data.reply ||
      "I couldn't generate a response.";


    if (aiMessage) {

      const paragraph =
        aiMessage.querySelector("p");

      if (paragraph) {
        paragraph.textContent = reply;
      }

    }


  } catch (error) {

    console.error(error);


    if (aiMessage) {

      const paragraph =
        aiMessage.querySelector("p");

      if (paragraph) {

        paragraph.textContent =
          "ERROR: " +
          error.message;

      }

    }

  }


  if (chatMessages) {
    chatMessages.scrollTop =
      chatMessages.scrollHeight;
  }

}


/* =========================
   ENTER TO SEND
========================= */

if (chatInput) {

  chatInput.addEventListener(
    "keydown",
    function (event) {

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


/* =========================
   HTML ESCAPE
========================= */

function escapeHTML(value) {

  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");

}


/* =========================
   GENERATOR
========================= */

const generatorForm =
  document.getElementById("generatorForm");

if (generatorForm) {

  generatorForm.addEventListener(
    "submit",
    async function (event) {

      event.preventDefault();


      const style =
        document.getElementById("style")?.value ||
        "streetwear";

      const color =
        document.getElementById("color")?.value ||
        "black";

      const occasion =
        document.getElementById("occasion")?.value ||
        "casual";

      const message =
        `Create a complete ${style} outfit.

Color preference: ${color}

Occasion: ${occasion}

Give me:
- top
- bottom
- shoes
- layering
- accessories
- why the outfit works
- a score out of 10

Keep it concise.`;


      const result =
        document.getElementById("generatorResult");


      if (result) {
        result.innerHTML =
          "<p>Building your fit... 👀</p>";
      }


      try {

        const response =
          await fetch(
            "/api/chat",
            {
              method: "POST",

              headers: {
                "Content-Type":
                  "application/json"
              },

              body: JSON.stringify({
                message
              })
            }
          );


        const data =
          await response.json();


        if (!response.ok) {
          throw new Error(
            data.error ||
            "Request failed"
          );
        }


        if (result) {

          result.innerHTML = `
            <h3>NXTLOOK</h3>
            <p>${escapeHTML(
              data.reply ||
              "Couldn't generate the fit."
            ).replace(/\n/g, "<br>")}</p>
          `;

        }


      } catch (error) {

        if (result) {

          result.innerHTML = `
            <p>
              ERROR: ${escapeHTML(
                error.message
              )}
            </p>
          `;

        }

      }

    }
  );

}
