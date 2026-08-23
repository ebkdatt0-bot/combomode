export default async function handler(req, res) {

  if(req.method !== "POST"){
    return res.status(405).json({
      error:"Method not allowed"
    });
  }

  try{

    const {
      message,
      history=[],
      mode="chat",
      preferences={},
      imageData=null,
      wardrobeImages=[]
    } = req.body || {};

    if(
      !message ||
      typeof message !== "string"
    ){
      return res.status(400).json({
        error:"Message is required"
      });
    }

    const systemPrompt=`

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

Understand:

dark streetwear,
streetwear,
skate,
Y2K,
grunge,
vintage,
clean,
minimal,
sporty,
preppy,
workwear,
techwear,
archive,
avant-garde,
luxury
and hybrid aesthetics.

BRANDS:

Understand the general style language of major brands.

Never invent exact products,
collaborations,
collections,
colorways,
prices,
release names
or availability.

If the user gives a specific product,
you may use it.

Otherwise describe it generally.

IMAGE RULE:

When clothing photos are supplied,
use the images as the source of truth.

Only identify what is actually visible.

Do not invent:

- hidden details
- exact model names
- exact materials
- logos that cannot be seen
- colors that cannot be seen

WARDROBE RULE:

When multiple wardrobe photos are supplied,
build the outfit around those actual pieces.

Do not force every piece into one outfit.

Choose the strongest combination.

STYLE:

Be direct and concise.

For outfits use:

LOOK — NAME

TOP:
BOTTOM:
SHOES:
LAYER:
ACCESSORIES:

WHY:
1–3 sentences.

SCORE:
X/10

WEAK POINT:
One sentence.

Do not automatically give 9/10 or 10/10.

Use conversation history for follow-ups like:

"change the shoes"

"keep the pants"

"make it darker"

"make it harder"

"same fit but different"

Never judge the user's body.

MODE:
${mode}

PREFERENCES:
${JSON.stringify(preferences)}

`;

    const messages=[

      {
        role:"system",
        content:systemPrompt
      },

      ...(Array.isArray(history)
        ? history
            .slice(-10)
            .map(item=>({

              role:
                item.role==="assistant"
                  ? "assistant"
                  : "user",

              content:
                String(item.content || "")

            }))
        : [])
    ];

    const images=[];

    if(
      typeof imageData==="string" &&
      imageData.startsWith("data:image/")
    ){
      images.push(imageData);
    }

    if(
      Array.isArray(wardrobeImages)
    ){

      for(
        const image
        of wardrobeImages.slice(0,8)
      ){

        if(
          typeof image==="string" &&
          image.startsWith("data:image/")
        ){

          images.push(image);
        }
      }
    }

    if(images.length){

      messages.push({

        role:"user",

        content:[

          {
            type:"text",
            text:message
          },

          ...images.map(image=>({

            type:"image_url",

            image_url:{
              url:image
            }

          }))

        ]

      });

    }else{

      messages.push({

        role:"user",
        content:message

      });
    }

    const response=
      await fetch(
        "https://openrouter.ai/api/v1/chat/completions",
        {

          method:"POST",

          headers:{

            "Content-Type":
              "application/json",

            "Authorization":
              `Bearer ${process.env.OPENROUTER_API_KEY}`,

            "HTTP-Referer":
              "https://nxtlook-five.vercel.app",

            "X-Title":
              "NXTLOOK"

          },

          body:JSON.stringify({

            model:"openrouter/free",

            messages,

            temperature:0.65,

            max_tokens:1000

          })
        }
      );

    const data=
      await response.json();

    if(!response.ok){

      console.error(
        "OpenRouter:",
        data
      );

      return res.status(
        response.status
      ).json({

        error:
          data?.error?.message ||
          "AI request failed"

      });
    }

    const reply=
      data?.choices?.[0]?.message?.content ||
      "I couldn't generate a response.";

    return res.status(200).json({
      reply
    });

  }catch(error){

    console.error(
      "NXTLOOK:",
      error
    );

    return res.status(500).json({

      error:
        error?.message ||
        "Something went wrong."

    });
  }
}
