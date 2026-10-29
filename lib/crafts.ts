export type Craft = {
  slug: string;
  title: string;
  artisan: string;
  place: string;
  price: number;
  image: string;
  alt: string;
  description: string;
};

export const crafts: Craft[] = [
  {
    slug: "kaas-floral-paithani",
    title: "Kaas Floral Paithani",
    artisan: "Savitri Handlooms",
    place: "Yeola, Maharashtra",
    price: 8499,
    image: "https://images.unsplash.com/photo-1717586756136-d9a3eeb1fa6f?auto=format&fit=crop&w=1400&q=85",
    alt: "Close detail of a richly woven floral Indian textile",
    description: "A luminous handwoven Paithani inspired by the wildflower plateaus of Kaas. Each motif carries the rhythm and patience of Yeola's master weavers.",
  },
  {
    slug: "warli-terracotta-urli",
    title: "Warli Terracotta Urli",
    artisan: "Ramesh Mati Kala",
    place: "Nashik, Maharashtra",
    price: 1850,
    image: "https://images.unsplash.com/photo-1699371830139-cb02e94878f1?auto=format&fit=crop&w=900&q=85",
    alt: "Handmade terracotta vessels displayed in an artisan workshop",
    description: "A hand-shaped terracotta urli made with locally gathered clay, bringing the warmth and character of traditional pottery into your home.",
  },
  {
    slug: "kolhapuri-saaj-necklace",
    title: "Kolhapuri Saaj Necklace",
    artisan: "Anita Jewel Works",
    place: "Kolhapur, Maharashtra",
    price: 3299,
    image: "https://images.unsplash.com/photo-1620619767323-b95a89183081?auto=format&fit=crop&w=900&q=85",
    alt: "Colourful handcrafted beaded necklaces on a wooden display",
    description: "A statement necklace inspired by the traditional Kolhapuri saaj, assembled by hand with careful detailing by Anita Jewel Works.",
  },
  {
    slug: "sawantwadi-ganjifa-set",
    title: "Sawantwadi Ganjifa Set",
    artisan: "Naik Chitrashala",
    place: "Sawantwadi, Maharashtra",
    price: 2190,
    image: "https://images.unsplash.com/photo-1678082309214-3b2941e387f8?auto=format&fit=crop&w=900&q=85",
    alt: "Woman artisan hand painting a traditional craft",
    description: "A keepsake set celebrating Sawantwadi's hand-painted Ganjifa tradition, with each piece finished by an artisan at Naik Chitrashala.",
  },
  {
    slug: "hand-thrown-clay-surahi",
    title: "Hand-thrown Clay Surahi",
    artisan: "Kumbhar Studio",
    place: "Pune, Maharashtra",
    price: 1240,
    image: "https://images.unsplash.com/photo-1493106641515-6b5631de4bb9?auto=format&fit=crop&w=900&q=85",
    alt: "Potter shaping a clay vessel by hand",
    description: "A hand-thrown clay surahi shaped on the potter's wheel at Kumbhar Studio, with the subtle variations that make every piece unique.",
  },
  {
    slug: "bamboo-weave-lantern",
    title: "Bamboo Weave Lantern",
    artisan: "Tribal Craft Co.",
    place: "Gadchiroli, Maharashtra",
    price: 1299,
    image: "https://images.unsplash.com/photo-1764218057040-5427eb0f1f5a?auto=format&fit=crop&w=900&q=85",
    alt: "Colourful handmade lanterns and woven baskets",
    description: "A lightweight lantern woven from bamboo by Tribal Craft Co. in Gadchiroli, showcasing the region's skilled basketry tradition.",
  },
  {
    slug: "paithani-table-runner",
    title: "Paithani Table Runner",
    artisan: "Morya Weaves",
    place: "Aurangabad, Maharashtra",
    price: 2750,
    image: "https://images.unsplash.com/photo-1588140686379-1b76a52103dc?auto=format&fit=crop&w=900&q=85",
    alt: "Detailed red, white and blue handwoven textile",
    description: "A richly coloured Paithani-inspired table runner, woven by Morya Weaves to bring traditional textile motifs to the table.",
  },
  {
    slug: "carved-devrai-figurine",
    title: "Carved Devrai Figurine",
    artisan: "Shinde Woodcraft",
    place: "Sawantwadi, Maharashtra",
    price: 1680,
    image: "https://images.unsplash.com/photo-1712210332599-0cb76e647e43?auto=format&fit=crop&w=900&q=85",
    alt: "Artisan seated among handcrafted wooden sculptures",
    description: "A carefully carved wooden figurine from Shinde Woodcraft, inspired by the living traditions and natural forms of the Devrai.",
  },
  {
    slug: "tamba-serving-bowl",
    title: "Tamba Serving Bowl",
    artisan: "Tambat Ali Collective",
    place: "Pune, Maharashtra",
    price: 2450,
    image: "https://images.unsplash.com/photo-1678082310070-26bdadc06a34?auto=format&fit=crop&w=900&q=85",
    alt: "Artisan surrounded by rows of handcrafted bowls",
    description: "A hand-finished copper serving bowl made by the Tambat Ali Collective, carrying forward Pune's celebrated metalworking craft.",
  },
  {
    slug: "mor-bagh-silk-stole",
    title: "Mor Bagh Silk Stole",
    artisan: "Yeola Loom House",
    place: "Yeola, Maharashtra",
    price: 3890,
    image: "https://images.unsplash.com/photo-1717585679395-bbe39b5fb6bc?auto=format&fit=crop&w=900&q=85",
    alt: "A layered collection of colourful handwoven cloth",
    description: "A soft silk stole with colours and motifs inspired by Mor Bagh, woven by the artisans of Yeola Loom House.",
  },
  {
    slug: "rustic-matka-trio",
    title: "Rustic Matka Trio",
    artisan: "Pragati Pottery",
    place: "Pen, Maharashtra",
    price: 1490,
    image: "https://images.unsplash.com/photo-1699371829505-e9fdde74e869?auto=format&fit=crop&w=900&q=85",
    alt: "A collection of brown and white handmade vases",
    description: "Three rustic clay matkas shaped and finished by hand at Pragati Pottery in Pen, each with its own natural character.",
  },
  {
    slug: "mohan-mala-bracelet",
    title: "Mohan Mala Bracelet",
    artisan: "Suvarna Karigari",
    place: "Kolhapur, Maharashtra",
    price: 1899,
    image: "https://images.unsplash.com/photo-1616756141603-6d37d5cde2a2?auto=format&fit=crop&w=900&q=85",
    alt: "Gold and silver handcrafted beaded bracelet",
    description: "A handcrafted bracelet by Suvarna Karigari, blending traditional Kolhapuri jewellery details with an easy-to-wear form.",
  },
];

export function getCraftBySlug(slug: string) {
  return crafts.find((craft) => craft.slug === slug);
}
