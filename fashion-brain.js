/* =========================================================
   NXTLOOK — FASHION BRAIN
   Real-brand outfit matching engine
   ========================================================= */

const NXTLOOK_STYLE_BRAIN = {

  /* =======================================================
     REAL BRAND DATABASE
     ======================================================= */

  brands: {

    stussy: {
      name: "Stüssy",
      styles: ["streetwear", "skate", "dark", "grunge"],
      price: "premium",

      tops: [
        "Stüssy Stock Logo Tee",
        "Stüssy Basic Tee",
        "Stüssy oversized graphic tee",
        "Stüssy long-sleeve tee",
        "Stüssy heavyweight hoodie"
      ],

      layers: [
        "Stüssy Work Jacket",
        "Stüssy Sherpa Jacket",
        "Stüssy nylon utility jacket"
      ]
    },

    carhartt: {
      name: "Carhartt WIP",
      styles: ["workwear", "streetwear", "grunge"],
      price: "mid",

      tops: [
        "Carhartt WIP Pocket Tee",
        "Carhartt WIP Chase Tee",
        "Carhartt WIP long-sleeve tee"
      ],

      layers: [
        "Carhartt WIP Detroit Jacket",
        "Carhartt WIP Active Jacket",
        "Carhartt WIP chore jacket"
      ],

      bottoms: [
        "Carhartt WIP Double Knee",
        "Carhartt WIP Single Knee",
        "Carhartt WIP Cargo Pant"
      ]
    },

    stoneIsland: {
      name: "Stone Island",
      styles: ["technical", "streetwear", "dark"],
      price: "premium",

      tops: [
        "Stone Island Compass Patch Tee",
        "Stone Island long-sleeve tee",
        "Stone Island crewneck"
      ],

      layers: [
        "Stone Island Overshirt",
        "Stone Island Nylon Metal Jacket",
        "Stone Island utility jacket"
      ]
    },

    supreme: {
      name: "Supreme",
      styles: ["streetwear", "skate", "grunge"],
      price: "premium",

      tops: [
        "Supreme Box Logo Tee",
        "Supreme Small Box Tee",
        "Supreme graphic tee",
        "Supreme hoodie"
      ],

      layers: [
        "Supreme work jacket",
        "Supreme denim jacket"
      ]
    },

    ftp: {
      name: "FTP",
      styles: ["dark", "streetwear", "grunge"],
      price: "mid",

      tops: [
        "FTP Logo Tee",
        "FTP graphic tee",
        "FTP hoodie",
        "FTP long-sleeve tee"
      ]
    },

    essentials: {
      name: "Fear of God ESSENTIALS",
      styles: ["minimal", "streetwear", "oversized"],
      price: "premium",

      tops: [
        "ESSENTIALS oversized tee",
        "ESSENTIALS heavyweight hoodie",
        "ESSENTIALS crewneck"
      ],

      bottoms: [
        "ESSENTIALS relaxed sweatpants",
        "ESSENTIALS nylon shorts"
      ]
    },

    nike: {
      name: "Nike",
      styles: ["streetwear", "sport", "casual"],
      price: "mid",

      tops: [
        "Nike Sportswear oversized tee",
        "Nike Tech Fleece hoodie",
        "Nike ACG tee"
      ],

      shoes: [
        "Nike Air Force 1",
        "Nike Dunk Low",
        "Nike Air Max 95",
        "Nike Air Max 1",
        "Nike Shox"
      ]
    },

    newBalance: {
      name: "New Balance",
      styles: ["streetwear", "dadcore", "technical"],
      price: "mid",

      shoes: [
        "New Balance 990v6",
        "New Balance 990v5",
        "New Balance 2002R",
        "New Balance 9060",
        "New Balance 1906R"
      ]
    },

    asics: {
      name: "ASICS",
      styles: ["technical", "streetwear", "running"],
      price: "mid",

      shoes: [
        "ASICS GEL-Kayano 14",
        "ASICS GEL-NYC",
        "ASICS GEL-1130",
        "ASICS GT-2160"
      ]
    },

    salomon: {
      name: "Salomon",
      styles: ["technical", "gorpcore", "streetwear"],
      price: "mid",

      shoes: [
        "Salomon XT-6",
        "Salomon ACS Pro",
        "Salomon XT-4"
      ]
    },

    vans: {
      name: "Vans",
      styles: ["skate", "streetwear", "grunge"],
      price: "mid",

      shoes: [
        "Vans Old Skool",
        "Vans Knu Skool",
        "Vans Sk8-Hi",
        "Vans Authentic"
      ]
    },

    dickies: {
      name: "Dickies",
      styles: ["workwear", "skate", "streetwear"],
      price: "budget",

      bottoms: [
        "Dickies 874 Work Pant",
        "Dickies loose-fit work pants",
        "Dickies carpenter pants"
      ]
    },

    levis: {
      name: "Levi's",
      styles: ["denim", "streetwear", "casual"],
      price: "mid",

      bottoms: [
        "Levi's 501",
        "Levi's 505",
        "Levi's 550",
        "Levi's 568 Stay Loose"
      ]
    },

    oakley: {
      name: "Oakley",
      styles: ["technical", "y2k", "gorpcore"],
      price: "premium",

      accessories: [
        "Oakley Factory Team shoes",
        "Oakley technical eyewear"
      ]
    },

    northFace: {
      name: "The North Face",
      styles: ["gorpcore", "technical", "streetwear"],
      price: "mid",

      layers: [
        "The North Face Nuptse",
        "The North Face Mountain Jacket",
        "The North Face shell jacket"
      ]
    },

    arcteryx: {
      name: "Arc'teryx",
      styles: ["technical", "gorpcore"],
      price: "premium",

      layers: [
        "Arc'teryx Beta Jacket",
        "Arc'teryx shell jacket",
        "Arc'teryx Atom Hoody"
      ]
    },

    ralphLauren: {
      name: "Ralph Lauren",
      styles: ["preppy", "classic", "streetwear"],
      price: "premium",

      tops: [
        "Polo Ralph Lauren Oxford Shirt",
        "Polo Ralph Lauren Polo",
        "Polo Ralph Lauren Rugby Shirt"
      ]
    },

    chromeHearts: {
      name: "Chrome Hearts",
      styles: ["dark", "luxury", "archive"],
      price: "luxury",

      accessories: [
        "Chrome Hearts silver cross necklace",
        "Chrome Hearts ring",
        "Chrome Hearts bracelet"
      ]
    },

    galleryDept: {
      name: "Gallery Dept.",
      styles: ["archive", "streetwear", "grunge"],
      price: "luxury",

      tops: [
        "Gallery Dept. logo tee",
        "Gallery Dept. painted tee"
      ],

      bottoms: [
        "Gallery Dept. flared denim",
        "Gallery Dept. carpenter pants"
      ]
    },

    bape: {
      name: "BAPE",
      styles: ["streetwear", "y2k", "archive"],
      price: "premium",

      tops: [
        "BAPE Shark hoodie",
        "BAPE College tee",
        "BAPE graphic tee"
      ]
    },

    rickOwens: {
      name: "Rick Owens",
      styles: ["dark", "avant-garde", "archive"],
      price: "luxury",

      shoes: [
        "Rick Owens DRKSHDW Ramones",
        "Rick Owens Geobasket",
        "Rick Owens Turbowpn"
      ]
    }

  },


  /* =======================================================
     STYLE RULES
     ======================================================= */

  styleRules: {

    dark: {
      colors: [
        "black",
        "washed black",
        "charcoal",
        "dark grey",
        "dark brown"
      ],

      brands: [
        "stussy",
        "stoneIsland",
        "ftp",
        "chromeHearts",
        "rickOwens",
        "galleryDept"
      ]
    },

    streetwear: {
      colors: [
        "black",
        "grey",
        "white",
        "washed blue",
        "olive",
        "brown"
      ],

      brands: [
        "stussy",
        "supreme",
        "carhartt",
        "nike",
        "newBalance",
        "vans",
        "bape"
      ]
    },

    grunge: {
      colors: [
        "washed black",
        "grey",
        "dark blue",
        "brown",
        "faded red"
      ],

      brands: [
        "stussy",
        "ftp",
        "supreme",
        "carhartt",
        "galleryDept",
        "vans"
      ]
    },

    technical: {
      colors: [
        "black",
        "grey",
        "olive",
        "stone",
        "silver"
      ],

      brands: [
        "stoneIsland",
        "arcteryx",
        "salomon",
        "asics",
        "oakley",
        "newBalance"
      ]
    },

    gorpcore: {
      colors: [
        "black",
        "olive",
        "grey",
        "beige",
        "stone"
      ],

      brands: [
        "arcteryx",
        "salomon",
        "northFace",
        "asics",
        "oakley"
      ]
    },

    workwear: {
      colors: [
        "black",
        "brown",
        "olive",
        "navy",
        "beige"
      ],

      brands: [
        "carhartt",
        "dickies",
        "levis"
      ]
    },

    archive: {
      colors: [
        "black",
        "washed grey",
        "dark brown",
        "off-white"
      ],

      brands: [
        "rickOwens",
        "galleryDept",
        "chromeHearts",
        "bape"
      ]
    }

  },


  /* =======================================================
     SHOE COMPATIBILITY
     ======================================================= */

  shoeCompatibility: {

    "New Balance 990v6": [
      "wide-leg",
      "baggy",
      "cargo",
      "relaxed"
    ],

    "New Balance 2002R": [
      "wide-leg",
      "baggy",
      "cargo",
      "work"
    ],

    "New Balance 9060": [
      "wide-leg",
      "baggy",
      "straight",
      "cargo"
    ],

    "ASICS GEL-Kayano 14": [
      "wide-leg",
      "technical",
      "cargo",
      "nylon"
    ],

    "ASICS GEL-NYC": [
      "wide-leg",
      "baggy",
      "cargo",
      "technical"
    ],

    "Salomon XT-6": [
      "technical",
      "cargo",
      "wide-leg",
      "nylon"
    ],

    "Vans Old Skool": [
      "baggy",
      "straight",
      "work",
      "cargo"
    ],

    "Vans Knu Skool": [
      "baggy",
      "wide-leg",
      "skate"
    ],

    "Rick Owens DRKSHDW Ramones": [
      "wide-leg",
      "flared",
      "baggy",
      "black"
    ],

    "Nike Air Force 1": [
      "baggy",
      "wide-leg",
      "straight",
      "cargo"
    ],

    "Nike Dunk Low": [
      "baggy",
      "straight",
      "cargo",
      "denim"
    ]

  },


  /* =======================================================
     KEYWORD DETECTION
     ======================================================= */

  detectStyle(text) {

    const input =
      String(text || "").toLowerCase();


    if (
      input.includes("gorpcore") ||
      input.includes("gorp")
    ) {
      return "gorpcore";
    }


    if (
      input.includes("technical") ||
      input.includes("techwear") ||
      input.includes("outdoor")
    ) {
      return "technical";
    }


    if (
      input.includes("archive") ||
      input.includes("rick owens") ||
      input.includes("gallery dept") ||
      input.includes("chrome hearts")
    ) {
      return "archive";
    }


    if (
      input.includes("grunge") ||
      input.includes("punk") ||
      input.includes("distressed") ||
      input.includes("ripped")
    ) {
      return "grunge";
    }


    if (
      input.includes("workwear") ||
      input.includes("carhartt") ||
      input.includes("dickies")
    ) {
      return "workwear";
    }


    if (
      input.includes("dark") ||
      input.includes("opium") ||
      input.includes("all black") ||
      input.includes("black fit")
    ) {
      return "dark";
    }


    return "streetwear";

  },


  /* =======================================================
     REQUEST ANALYSIS
     ======================================================= */

  analyzeRequest(text) {

    const input =
      String(text || "").toLowerCase();


    return {

      style:
        this.detectStyle(input),

      dark:
        /dark|opium|black|all black/.test(input),

      summer:
        /summer|hot|heat|hot weather/.test(input),

      winter:
        /winter|cold|cold weather/.test(input),

      baggy:
        /baggy|oversized|loose|wide/.test(input),

      fitted:
        /fitted|slim|skinny/.test(input),

      simple:
        /simple|clean|minimal|basic/.test(input),

      expensive:
        /luxury|designer|expensive|premium/.test(input),

      affordable:
        /cheap|budget|affordable/.test(input),

      sneakers:
        /sneaker|shoes|kicks/.test(input)

    };

  },


  /* =======================================================
     RANDOM
     ======================================================= */

  random(array) {

    if (
      !Array.isArray(array) ||
      array.length === 0
    ) {
      return "";
    }


    return array[
      Math.floor(
        Math.random() * array.length
      )
    ];

  },


  /* =======================================================
     GET BRANDS
     ======================================================= */

  getBrandsForStyle(style) {

    const rule =
      this.styleRules[style] ||
      this.styleRules.streetwear;


    return rule.brands
      .map(
        id =>
          this.brands[id]
      )
      .filter(Boolean);

  },


  /* =======================================================
     COLLECT ITEMS
     ======================================================= */

  collectItems(brands, type) {

    return brands.flatMap(
      brand =>
        brand[type] || []
    );

  },


  /* =======================================================
     PICK SHOES
     ======================================================= */

  pickShoes(style, bottom, request) {

    const allBrands =
      Object.values(this.brands);


    let shoes = [];


    allBrands.forEach(
      brand => {

        if (
          brand.shoes &&
          (
            brand.styles || []
          ).includes(style)
        ) {

          shoes.push(
            ...brand.shoes
          );

        }

      }
    );


    if (
      request.expensive
    ) {

      const premiumBrands =
        allBrands.filter(
          brand =>
            brand.shoes &&
            (
              brand.price === "premium" ||
              brand.price === "luxury"
            )
        );


      const premiumShoes =
        premiumBrands.flatMap(
          brand =>
            brand.shoes || []
        );


      if (
        premiumShoes.length
      ) {

        shoes =
          premiumShoes;

      }

    }


    const compatible =
      shoes.filter(
        shoe => {

          const rules =
            this.shoeCompatibility[shoe];


          if (!rules) {
            return true;
          }


          const bottomText =
            String(
              bottom || ""
            ).toLowerCase();


          return rules.some(
            rule =>
              bottomText.includes(
                rule
              )
          );

        }
      );


    return this.random(
      compatible.length
        ? compatible
        : shoes
    ) || "Nike Air Force 1";

  },


  /* =======================================================
     PICK TOP
     ======================================================= */

  pickTop(brands, request) {

    let tops =
      this.collectItems(
        brands,
        "tops"
      );


    if (!tops.length) {

      tops = [

        "oversized heavyweight tee",
        "boxy graphic tee",
        "heavyweight crewneck"

      ];

    }


    if (
      request.simple
    ) {

      const clean =
        tops.filter(
          item =>
            !/graphic|logo|painted|shark/i.test(
              item
            )
        );


      if (clean.length) {

        tops =
          clean;

      }

    }


    return this.random(
      tops
    );

  },


  /* =======================================================
     PICK BOTTOM
     ======================================================= */

  pickBottom(brands, style, request) {

    let bottoms =
      this.collectItems(
        brands,
        "bottoms"
      );


    if (!bottoms.length) {

      const defaults = {

        dark:
          [
            "wide-leg black denim",
            "washed black baggy jeans",
            "black wide-leg trousers"
          ],

        streetwear:
          [
            "baggy washed denim",
            "wide-leg jeans",
            "relaxed cargo pants"
          ],

        grunge:
          [
            "washed black baggy jeans",
            "distressed wide-leg denim",
            "dark relaxed denim"
          ],

        technical:
          [
            "black technical cargo pants",
            "nylon utility trousers",
            "technical wide-leg pants"
          ],

        gorpcore:
          [
            "olive cargo pants",
            "technical hiking trousers",
            "relaxed utility pants"
          ],

        workwear:
          [
            "Dickies 874 Work Pant",
            "Carhartt WIP Double Knee",
            "loose carpenter pants"
          ],

        archive:
          [
            "wide-leg black trousers",
            "flared dark denim",
            "baggy black trousers"
          ]

      };


      bottoms =
        defaults[style] ||
        defaults.streetwear;

    }


    if (
      request.baggy
    ) {

      const baggy =
        bottoms.filter(
          item =>
            /baggy|wide|loose|relaxed|double knee|cargo/i.test(
              item
            )
        );


      if (baggy.length) {

        bottoms =
          baggy;

      }

    }


    if (
      request.fitted
    ) {

      const fitted =
        bottoms.filter(
          item =>
            /501|505|straight/i.test(
              item
            )
        );


      if (fitted.length) {

        bottoms =
          fitted;

      }

    }


    return this.random(
      bottoms
    );

  },


  /* =======================================================
     PICK LAYER
     ======================================================= */

  pickLayer(brands, request) {

    if (
      request.summer
    ) {

      return null;

    }


    const layers =
      this.collectItems(
        brands,
        "layers"
      );


    if (!layers.length) {

      return null;

    }


    return this.random(
      layers
    );

  },


  /* =======================================================
     PICK ACCESSORY
     ======================================================= */

  pickAccessory(brands, request) {

    const accessories =
      this.collectItems(
        brands,
        "accessories"
      );


    if (
      accessories.length
    ) {

      return this.random(
        accessories
      );

    }


    if (
      request.dark
    ) {

      return "silver chain";

    }


    return "minimal watch";

  },


  /* =======================================================
     GENERATE FIT
     ======================================================= */

  generateFit(style = "streetwear", requestText = "") {

    const request =
      this.analyzeRequest(
        requestText
      );


    if (
      requestText
    ) {

      style =
        request.style ||
        style;

    }


    const brands =
      this.getBrandsForStyle(
        style
      );


    const brand =
      this.random(
        brands
      );


    const top =
      this.pickTop(
        brands,
        request
      );


    const bottom =
      this.pickBottom(
        brands,
        style,
        request
      );


    const shoes =
      this.pickShoes(
        style,
        bottom,
        request
      );


    const layer =
      this.pickLayer(
        brands,
        request
      );


    const accessory =
      this.pickAccessory(
        brands,
        request
      );


    return {

      style,

      brand:
        brand?.name ||
        "NXTLOOK",

      top,

      bottom,

      shoes,

      layer,

      accessory,

      request,

      score:
        this.calculateScore(
          style,
          top,
          bottom,
          shoes,
          layer
        )

    };

  },


  /* =======================================================
     SCORE FIT
     ======================================================= */

  calculateScore(
    style,
    top,
    bottom,
    shoes,
    layer
  ) {

    let score = 8.5;


    const bottomText =
      String(
        bottom || ""
      ).toLowerCase();


    const shoeRules =
      this.shoeCompatibility[
        shoes
      ];


    if (
      shoeRules &&
      shoeRules.some(
        rule =>
          bottomText.includes(
            rule
          )
      )
    ) {

      score += 0.5;

    }


    if (
      style === "dark" &&
      /black|dark|washed/i.test(
        `${top} ${bottom} ${shoes}`
      )
    ) {

      score += 0.3;

    }


    if (
      layer
    ) {

      score += 0.1;

    }


    return Math.min(
      10,
      Number(
        score.toFixed(1)
      )
    );

  },


  /* =======================================================
     FORMAT FIT
     ======================================================= */

  formatFit(fit) {

    if (!fit) {

      return "Unable to generate a fit.";

    }


    let output =
`LOOK — ${String(
  fit.style ||
  "STREETWEAR"
).toUpperCase()}

TOP
${fit.top}

BOTTOM
${fit.bottom}

SHOES
${fit.shoes}`;


    if (
      fit.layer
    ) {

      output +=
`

LAYER
${fit.layer}`;

    }


    if (
      fit.accessory
    ) {

      output +=
`

ACCESSORY
${fit.accessory}`;

    }


    output +=
`

STYLE SCORE
${fit.score || "9.0"}/10

BRAND DIRECTION
${fit.brand}

WHY IT WORKS
The silhouette balances the proportions,
the footwear works with the bottom shape,
and the pieces stay inside the requested
style direction.`;

    return output;

  },


  /* =======================================================
     AI STYLIST RESPONSE
     ======================================================= */

  respond(message) {

    const request =
      this.analyzeRequest(
        message
      );


    const fit =
      this.generateFit(
        request.style,
        message
      );


    return this.formatFit(
      fit
    );

  }

};


/* =========================================================
   GLOBAL EXPORT
   ========================================================= */

window.NXTLOOK_STYLE_BRAIN =
  NXTLOOK_STYLE_BRAIN;
