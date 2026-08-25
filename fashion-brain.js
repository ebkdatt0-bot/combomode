const NXTLOOK_STYLE_BRAIN = {

  brands: {

    stussy: {
      name: "Stüssy",
      styles: ["streetwear", "skate", "dark", "grunge"],
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
      shoes: [
        "Salomon XT-6",
        "Salomon ACS Pro",
        "Salomon XT-4"
      ]
    },

    vans: {
      name: "Vans",
      styles: ["skate", "streetwear", "grunge"],
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
      bottoms: [
        "Dickies 874 Work Pant",
        "Dickies loose-fit work pants",
        "Dickies carpenter pants"
      ]
    },

    levis: {
      name: "Levi's",
      styles: ["denim", "streetwear", "casual"],
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
      accessories: [
        "Oakley Factory Team shoes",
        "Oakley technical eyewear"
      ]
    },

    northFace: {
      name: "The North Face",
      styles: ["gorpcore", "technical", "streetwear"],
      layers: [
        "The North Face Nuptse",
        "The North Face Mountain Jacket",
        "The North Face shell jacket"
      ]
    },

    arcteryx: {
      name: "Arc'teryx",
      styles: ["technical", "gorpcore"],
      layers: [
        "Arc'teryx Beta Jacket",
        "Arc'teryx shell jacket",
        "Arc'teryx Atom Hoody"
      ]
    },

    ralphLauren: {
      name: "Ralph Lauren",
      styles: ["preppy", "classic", "streetwear"],
      tops: [
        "Polo Ralph Lauren Oxford Shirt",
        "Polo Ralph Lauren Polo",
        "Polo Ralph Lauren Rugby Shirt"
      ]
    },

    chromeHearts: {
      name: "Chrome Hearts",
      styles: ["dark", "luxury", "archive"],
      accessories: [
        "Chrome Hearts silver cross necklace",
        "Chrome Hearts ring",
        "Chrome Hearts bracelet"
      ]
    },

    galleryDept: {
      name: "Gallery Dept.",
      styles: ["archive", "streetwear", "grunge"],
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
      tops: [
        "BAPE Shark hoodie",
        "BAPE College tee",
        "BAPE graphic tee"
      ]
    },

    rickOwens: {
      name: "Rick Owens",
      styles: ["dark", "avant-garde", "archive"],
      shoes: [
        "Rick Owens DRKSHDW Ramones",
        "Rick Owens Geobasket",
        "Rick Owens Turbowpn"
      ]
    }

  },


  styleRules: {

    dark: {
      preferredColors: [
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
      preferredColors: [
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
      preferredColors: [
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
      preferredColors: [
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
      preferredColors: [
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
      preferredColors: [
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
      preferredColors: [
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


  shoeCompatibility: {

    "New Balance 990v6": [
      "wide-leg jeans",
      "baggy cargos",
      "relaxed trousers",
      "Carhartt WIP Double Knee"
    ],

    "New Balance 2002R": [
      "wide-leg jeans",
      "baggy denim",
      "cargo pants",
      "Dickies 874 Work Pant"
    ],

    "ASICS GEL-Kayano 14": [
      "wide-leg jeans",
      "technical pants",
      "cargo pants",
      "nylon trousers"
    ],

    "Salomon XT-6": [
      "technical pants",
      "cargo pants",
      "wide-leg trousers",
      "nylon pants"
    ],

    "Vans Old Skool": [
      "baggy jeans",
      "straight denim",
      "Dickies 874 Work Pant",
      "cargo pants"
    ],

    "Rick Owens DRKSHDW Ramones": [
      "wide-leg black denim",
      "baggy trousers",
      "flared denim",
      "Rick Owens-style wide trousers"
    ]

  },


  detectStyle(text) {

    const input = text.toLowerCase();

    if (
      input.includes("gorpcore") ||
      input.includes("gorp") ||
      input.includes("outdoor") ||
      input.includes("technical")
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
      input.includes("black") ||
      input.includes("hard")
    ) {
      return "dark";
    }

    return "streetwear";
  },


  random(array) {

    if (!array || array.length === 0) {
      return "";
    }

    return array[
      Math.floor(Math.random() * array.length)
    ];
  },


  getBrandsForStyle(style) {

    const rules =
      this.styleRules[style] ||
      this.styleRules.streetwear;

    return rules.brands
      .map(id => this.brands[id])
      .filter(Boolean);
  },


  generateFit(style = "streetwear") {

    const brands =
      this.getBrandsForStyle(style);

    const brand =
      this.random(brands);

    const possibleTops =
      brands.flatMap(b => b.tops || []);

    const possibleBottoms =
      brands.flatMap(b => b.bottoms || []);

    const possibleLayers =
      brands.flatMap(b => b.layers || []);

    const shoeBrands =
      Object.values(this.brands)
        .filter(b =>
          (b.styles || []).includes(style) &&
          b.shoes
        );

    const possibleShoes =
      shoeBrands.flatMap(b => b.shoes || []);

    const top =
      this.random(possibleTops) ||
      "oversized heavyweight tee";

    const bottom =
      this.random(possibleBottoms) ||
      "wide-leg denim";

    const shoes =
      this.random(possibleShoes) ||
      "New Balance 2002R";

    const layer =
      possibleLayers.length
        ? this.random(possibleLayers)
        : null;

    const accessories =
      brands
        .flatMap(b => b.accessories || []);

    return {
      style,
      brand: brand?.name || "NXTLOOK",
      top,
      bottom,
      shoes,
      layer,
      accessory:
        this.random(accessories) ||
        "silver chain"
    };
  },


  formatFit(fit) {

    let output =
`LOOK — ${fit.style.toUpperCase()}

TOP: ${fit.top}

BOTTOM: ${fit.bottom}

SHOES: ${fit.shoes}`;

    if (fit.layer) {
      output += `

LAYER: ${fit.layer}`;
    }

    output += `

ACCESSORIES: ${fit.accessory}

WHY: The silhouette is built around
proportion, texture and brand compatibility.
The pieces are intentionally matched instead
of randomly combined.

SCORE: 9/10`;

    return output;
  },


  respond(message) {

    const style =
      this.detectStyle(message);

    const fit =
      this.generateFit(style);

    return this.formatFit(fit);
  }

};


window.NXTLOOK_STYLE_BRAIN =
  NXTLOOK_STYLE_BRAIN;
