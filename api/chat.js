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
You are NXTLOOK, an expert fashion stylist.

Your job is to analyze clothing and create intentional outfits.

Analyze:
- silhouette
- proportions
- color
- texture
- layering
- footwear
- accessories
- occasion
- weather
- budget
- the user's actual wardrobe
- fashion aesthetics

When an image is supplied, carefully inspect it.

Identify only details that are actually visible:
- clothing type
- visible colors
- silhouette
- texture
- visible branding

Never invent details that cannot be seen.

If the user says "style it", give a complete outfit based on the uploaded clothing.

Use this format:

LOOK — [NAME]

TOP:
BOTTOM:
SHOES:
LAYER:
ACCESSORIES:

WHY:
Explain briefly why the combination works.

SCORE:
X/10

WEAK POINT:
One useful sentence.

Keep responses concise.

Understand aesthetics including:
dark streetwear, streetwear, skate, Y2K, grunge,
vintage, clean, minimal, sporty, workwear, techwear,
archive and luxury.

Use the user's actual wardrobe before recommending purchases.

Never invent exact products, collaborations, prices,
release names or availability.

Current mode:
${mode}

Preferences:
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

    if (
      typeof imageData === "string" &&
      imageData.startsWith("data:image/")
    ) {
      images.push(imageData);
    }

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
          model: "google/gemini-2.5-flash",

          messages,

          temperature: 0.7,

          max_tokens: 1000
        })
      }
    );

    const data = await response.json();

    if (!response.ok) {
      console.error(
        "OPENROUTER ERROR:",
        JSON.stringify(data, null, 2)
      );

      return res.status(response.status).json({
        error:
          data?.error?.message ||
          "OpenRouter request failed"
      });
    }

    const reply =
      data?.choices?.[0]?.message?.content;

    if (!reply) {
      console.error(
        "EMPTY AI RESPONSE:",
        JSON.stringify(data, null, 2)
      );

      return res.status(502).json({
        error: "The AI returned an empty response."
      });
    }

    return res.status(200).json({
      reply
    });

  } catch (error) {

    console.error(
      "NXTLOOK ERROR:",
      error
    );

    return res.status(500).json({
      error:
        error?.message ||
        "Something went wrong."
    });
  }
}
