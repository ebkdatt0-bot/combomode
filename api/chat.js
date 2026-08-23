export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({
      error: "Method not allowed"
    });
  }

  try {
    const {
      message,
      history = [],
      mode = "chat",
      preferences = {},
      imageData = null,
      wardrobeImages = []
    } = req.body || {};

    if (!message || typeof message !== "string") {
      return res.status(400).json({
        error: "Message is required"
      });
    }

    const systemPrompt = `
You are NXTLOOK, an advanced AI fashion stylist.

Think like a real stylist, not a random outfit generator.

Analyze:
- silhouette
- proportions
- color harmony
- texture
- layering
- footwear
- accessories
- occasion
- weather
- budget
- actual wardrobe
- current fashion aesthetics

PRIORITY:
Use the user's actual wardrobe first.
Do not recommend unnecessary purchases.

AESTHETICS:
Understand dark streetwear, streetwear, skate, Y2K, grunge,
vintage, clean, minimal, sporty, preppy, workwear, techwear,
archive, avant-garde, luxury and hybrid aesthetics.

BRANDS:
Understand the general style language of major fashion and
streetwear brands.

IMPORTANT:
Never invent exact products, collaborations, collections,
colorways, prices, release names or availability.

If the user gives an exact product name, you may use it.
Otherwise describe products generally.

IMAGE RULE:
When an image is supplied, use it as the source of truth.

Only identify what is reasonably visible:
- garment category
- visible color
- silhouette
- visible texture
- obvious branding

Do not invent hidden details.
Do not claim an exact model unless it is actually identifiable.

WARDROBE RULE:
When multiple wardrobe images are supplied, build outfits
around those actual pieces.

Do not force every item into one outfit.
Choose the strongest combination.

STYLE:
Be concise and direct.

For an outfit use:

LOOK — NAME

TOP:
BOTTOM:
SHOES:
LAYER:
ACCESSORIES:

WHY:
1–3 useful sentences.

SCORE:
X/10

WEAK POINT:
One useful sentence.

For multiple looks, make them genuinely different.

Use conversation history for follow-ups such as:
"change the shoes"
"keep the pants"
"make it darker"
"make it harder"
"same fit but different"

Never judge the user's body.

CURRENT MODE:
${mode}

CURRENT PREFERENCES:
${JSON.stringify(preferences)}
`;

    const messages = [
      {
        role: "system",
        content: systemPrompt
      }
    ];

    if (Array.isArray(history)) {
      for (const item of history.slice(-10)) {
        messages.push({
          role: item.role === "assistant"
            ? "assistant"
            : "user",
          content: String(item.content || "")
        });
      }
    }

    const images = [];

    // Normal uploaded image
    if (
      typeof imageData === "string" &&
      imageData.startsWith("data:image/")
    ) {
      images.push(imageData);
    }

    // Saved wardrobe images
    if (Array.isArray(wardrobeImages)) {
      for (const image of wardrobeImages.slice(0, 8)) {
        if (
          typeof image === "string" &&
          image.startsWith("data:image/")
        ) {
          images.push(image);
        }
      }
    }

    // IMPORTANT:
    // OpenRouter vision requests use image_url content.
    if (images.length > 0) {
      messages.push({
        role: "user",
        content: [
          {
            type: "text",
            text: message
          },

          ...images.map((image) => ({
            type: "image_url",
            image_url: {
              url: image
            }
          }))
        ]
      });
    } else {
      messages.push({
        role: "user",
        content: message
      });
    }

    const response = await fetch(
      "https://openrouter.ai/api/v1/chat/completions",
      {
        method: "POST",

        headers: {
          "Content-Type": "application/json",

          "Authorization":
            `Bearer ${process.env.OPENROUTER_API_KEY}`,

          "HTTP-Referer":
            "https://nxtlook-five.vercel.app",

          "X-Title":
            "NXTLOOK"
        },

        body: JSON.stringify({
          model: "openrouter/free",

          messages,

          temperature: 0.65,

          max_tokens: 1000,

          provider: {
            allow_fallbacks: true
          }
        })
      }
    );

    const data = await response.json();

    // IMPORTANT:
    // Don't hide the real OpenRouter/provider error.
    if (!response.ok) {
      console.error(
        "FULL OPENROUTER ERROR:",
        JSON.stringify(data, null, 2)
      );

      return res.status(response.status).json({
        error:
          data?.error?.message ||
          data?.error?.code ||
          "AI provider request failed",

        details:
          data?.error || data
      });
    }

    const reply =
      data?.choices?.[0]?.message?.content ||
      "I couldn't generate a response.";

    return res.status(200).json({
      reply
    });

  } catch (error) {

    console.error(
      "NXTLOOK SERVER ERROR:",
      error
    );

    return res.status(500).json({
      error:
        error?.message ||
        "Something went wrong."
    });
  }
}
