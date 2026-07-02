export const BRANDS = [
  {
    name: "Muji",
    colour: "#8a8a82",
    q1: "We make everyday products stripped of everything unnecessary.",
    q2_f1: "Products are designed to impress in the shop, not to last in your home.",
    q2_f2: "I complain that everything needs a logo and a story. Objects should just be well made.",
    q2_f3: "People quietly accept that affordable means disposable. It doesn't have to.",
    q3: "Keiko is a minimalist who feels exhausted trying to find something made to last.",
  },
  {
    name: "Oatly",
    colour: "#c8b820",
    q1: "We make oat-based food for people who want milk without the cow.",
    q2_f1: "The food industry spends more energy marketing health than actually being healthy.",
    q2_f2: "I complain that 'natural' and 'sustainable' are now just labels for premium pricing.",
    q2_f3: "People put up with dairy alternatives that taste like compromise. They deserve actual pleasure.",
    q3: "Arjun cares about what he eats but every alternative tastes like compromise.",
  },
  {
    name: "ColorFlix",
    colour: "#e8205a",
    q1: "We make bold colour cosmetics for Gen Z women who refuse to blend in.",
    q2_f1: "Beauty brands tell Indian women their natural skin tone needs correcting.",
    q2_f2: "I complain that the beauty aisle is still designed for one kind of woman.",
    q2_f3: "Young women quietly buy shades that don't quite fit because nothing else is offered.",
    q3: "Zara is 19, experimental, broke, and the beauty aisle was never designed for her.",
  },
  {
    name: "Paper Boat",
    colour: "#d4521a",
    q1: "We make drinks that taste like the ones your grandmother made.",
    q2_f1: "Packaged drinks erased the taste of real Indian ingredients and called it progress.",
    q2_f2: "I complain that nostalgia is used to sell things with no actual memory in them.",
    q2_f3: "People quietly accept that they'll never taste their grandmother's aam panna again.",
    q3: "Vikram is 38 and misses the taste of his childhood. Nothing in a store comes close.",
  },
  {
    name: "Zepto",
    colour: "#6c3ce1",
    q1: "We deliver groceries in ten minutes so your day doesn't stop.",
    q2_f1: "Grocery shopping was designed around the store's convenience, not yours.",
    q2_f2: "I complain about apps that show 'in stock' until the delivery slot is full.",
    q2_f3: "People quietly plan their whole week around when the store is convenient for them.",
    q3: "Meera is a working mother at 7pm realising dinner needs one ingredient she doesn't have.",
  },
  {
    name: "Frida Kahlo",
    colour: "#c8254a",
    q1: "I paint my reality so the world cannot look away from what it refuses to see.",
    q2_f1: "The art world demanded women paint beauty. I refused to hide the pain.",
    q2_f2: "I complained that my suffering was considered private. I made it undeniably public.",
    q2_f3: "Women artists quietly soften their work to make it acceptable. Their truth disappears.",
    q3: "Carmen is a painter who feels erased every time she shows work honest about her body.",
  },
  {
    name: "Basquiat",
    colour: "#e8c830",
    q1: "I make art that puts Black identity where the establishment said it didn't belong.",
    q2_f1: "The art world wanted to own Black creativity without crediting the people it came from.",
    q2_f2: "I complained that the gatekeepers decided which voices were 'refined' enough to be art.",
    q2_f3: "Black artists quietly navigate spaces that celebrate their work but not their identity.",
    q3: "Marcus tags walls and feels invisible every time his work ends up in a gallery without his name.",
  },
  {
    name: "Niharika NM",
    colour: "#ff6b35",
    q1: "I make comedy that sounds like the voice every South Indian girl was told to keep quiet.",
    q2_f1: "Influencer culture rewards polish and aspiration. I built an audience by being the opposite.",
    q2_f2: "I complain that relatability is now a brand strategy. Most of it is curated.",
    q2_f3: "Women quietly edit themselves for the algorithm — they're funnier, stranger in real life.",
    q3: "Divya is funny. She posts a reel and gets twelve likes. The algorithm buries it.",
  },
];

// q2 field kept for backwards compat — defaults to framing 1
BRANDS.forEach((b) => { b.q2 = b.q2_f1; });

export const Q2_VARIANTS = [
  {
    l1: "What does your industry do",
    l2: "that's dishonest, lazy, or just plain wrong?",
    question: "What does your industry do that's dishonest, lazy, or just plain wrong?",
    answerKey: "q2_f1",
  },
  {
    l1: "What do you find yourself",
    l2: "complaining about most in your space?",
    question: "What do you find yourself complaining about most in your space?",
    answerKey: "q2_f2",
  },
  {
    l1: "What do your future customers",
    l2: "quietly put up with that they shouldn't?",
    question: "What do your future customers quietly put up with that they shouldn't?",
    answerKey: "q2_f3",
  },
];
