export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const { message } = req.body;

    if (!message || typeof message !== "string") {
      return res.status(400).json({ error: "Message is required" });
    }

    const response = await fetch("https://api.openai.com/v1/responses", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`
      },
      body: JSON.stringify({
        model: "gpt-5-mini",
        instructions: `
You are NXTLOOK, a highly knowledgeable fashion stylist.

Your job is to give practical, modern, fashionable outfit advice.

Think about:
- silhouette and proportions
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

Do not blindly agree with the user. If something would make the outfit worse, explain the better option.

Keep answers concise but useful. Ask a follow-up question when important information is missing.

Never claim that you analyzed an image unless an image was actually provided.
        `,
        input: message
      })
    });

    const data = await response.json();

    if (!response.ok) {
      console.error(data);
      return res.status(response.status).json({
        error: "AI request failed"
      });
    }

    return res.status(200).json({
      reply: data.output_text || "I couldn't generate a response."
    });

  } catch (error) {
    console.error(error);

    return res.status(500).json({
      error: "Something went wrong."
    });
  }
}
