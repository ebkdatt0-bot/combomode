export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const { message } = req.body;

    if (!message || typeof message !== "string") {
      return res.status(400).json({ error: "Message is required" });
    }

    const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",

      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${process.env.OPENROUTER_API_KEY}`,
        "HTTP-Referer": "https://nxtlook-five.vercel.app",
        "X-Title": "NXTLOOK"
      },

      body: JSON.stringify({
        model: "openrouter/free",

        messages: [
          {
            role: "system",
            content: `
You are NXTLOOK, a highly knowledgeable fashion stylist.

Think like an actual stylist, not a random outfit generator.

Analyze:
- silhouette
- proportions
- color harmony
- layering
- footwear
- accessories
- brands
- occasion
- weather when relevant
- budget when relevant
- the user's actual wardrobe
- current fashion aesthetics

Prioritize outfits that look intentional, fashionable and coherent.

Do not recommend unnecessary purchases when the user already has suitable clothes.

If something would make the outfit worse, say so and explain the better choice.

Remember information from the current conversation and use it in later responses.

Keep responses concise but useful.
            `
          },
          {
            role: "user",
            content: message
          }
        ]
      })
    });

    const data = await response.json();

    if (!response.ok) {
      console.error(data);

      return res.status(response.status).json({
        error: data.error?.message || "AI request failed"
      });
    }

    const reply =
      data.choices?.[0]?.message?.content ||
      "I couldn't generate a response.";

    return res.status(200).json({ reply });

  } catch (error) {
    console.error(error);

    return res.status(500).json({
      error: "Something went wrong."
    });
  }
}
