export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const {
      message,
      history = [],
      mode = "chat",
      preferences = {},
      imageData = null
    } = req.body || {};

    if (!message || typeof message !== "string") {
      return res.status(400).json({ error: "Message is required" });
    }

    const systemPrompt = `
You are NXTLOOK, an advanced personal fashion stylist.

You are NOT a generic outfit generator. Think like a real stylist with strong knowledge of streetwear, contemporary fashion, classic styling, silhouettes, proportions, color theory, layering, footwear, accessories, fabrics, brands, occasions and visual balance.

CORE RULES:
- Build intentional outfits, not random clothing lists.
- Prioritize pieces the user already owns.
- Never recommend buying something just to fill space.
- Respect the requested aesthetic instead of forcing your favorite style.
- Understand mixed aesthetics and make them coherent.
- Think through multiple combinations internally, then give the strongest one.
- If a user's idea weakens the fit, say so clearly and give a better alternative.
- Be specific about WHY something works.
- Do not judge the user's body or promote unhealthy appearance ideals.
- Do not claim to see clothing details that are not actually provided.

ANALYZE:
- silhouette and proportions
- top/bottom relationship
- color harmony and contrast
- texture and fabric weight
- layering
- footwear and its relationship to the silhouette
- accessories
- brand/aesthetic language
- occasion and dress code
- weather when provided
- budget when provided
- what the user already owns

STYLE KNOWLEDGE:
Understand aesthetics including dark streetwear, streetwear, skate, Y2K, archive-inspired, grunge, vintage, clean, minimal, sporty, preppy, workwear, techwear and hybrids.

Do not assume an aesthetic from one item alone.

OUTFIT FORMAT:
When the user asks for a complete outfit, use:

STYLE
TOP
BOTTOM
SHOES
OUTERWEAR (only if useful)
ACCESSORIES (only if useful)
COLOR ACCENT
WHY IT WORKS
SCORE: X/10

Do not force every heading when it is unnecessary.

FOLLOW-UPS:
Use the conversation history.

If the user says:
"change the shoes"
"keep the pants"
"make it darker"
"more expensive"
"less basic"

modify the previous outfit rather than starting from zero.

GENERATOR:
When mode is "generator", the user has supplied structured preferences.

Treat them as constraints, then make an expert recommendation.

Do not blindly repeat the selected options.

Improve weak combinations while staying close to the user's choices.

COLOR:
Use real color relationships.

Distinguish neutrals, analogous colors, complementary contrast and accent colors.

Avoid recommending five competing accent colors.

BRANDS:
Know the difference between a brand's aesthetic and simply naming a popular brand.

Do not invent collaborations or product names.

If uncertain about a current product, speak generally.

CHAT STYLE:
Be confident, concise, modern and useful.

No corporate filler.
No fake hype.
A little personality is fine.

Current user preferences:
${JSON.stringify(preferences)}

Your priority is to give the user the strongest outfit possible using good fashion reasoning.
`;

    const messages = [
      {
        role: "system",
        content: systemPrompt
      },

      ...(Array.isArray(history)
        ? history.slice(-10).map(m => ({
            role: m.role === "assistant" ? "assistant" : "user",
            content:
              typeof m.content === "string"
                ? m.content
                : String(m.content || "")
          }))
        : []),

      imageData
        ? {
            role: "user",
            content: [
              {
                type: "text",
                text: message
              },
              {
                type: "image_url",
                image_url: {
                  url: imageData
                }
              }
            ]
          }
        : {
            role: "user",
            content: message
          }
    ];

    const response = await fetch(
      "https://openrouter.ai/api/v1/chat/completions",
      {
        method: "POST",

        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${process.env.OPENROUTER_API_KEY}`,
          "HTTP-Referer": "https://nxtlook-five.vercel.app",
          "X-Title": "NXTLOOK"
        },

        body: JSON.stringify({
          model: "openrouter/free",
          messages,
          temperature: 0.75,
          max_tokens: 900
        })
      }
    );

    const data = await response.json();

    if (!response.ok) {
      console.error("OpenRouter error:", data);

      return res.status(response.status).json({
        error: data?.error?.message || "AI request failed"
      });
    }

    const reply =
      data?.choices?.[0]?.message?.content ||
      "I couldn't generate a response.";

    return res.status(200).json({
      reply,
      mode
    });

  } catch (error) {
    console.error("NXTLOOK API error:", error);

    return res.status(500).json({
      error: error?.message || "Something went wrong."
    });
  }
}
