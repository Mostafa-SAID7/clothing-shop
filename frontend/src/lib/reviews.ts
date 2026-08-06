export interface Review {
  id: number;
  productSlug: string;
  author: string;
  initials: string;
  rating: number;
  date: string;
  title: string;
  body: string;
  verified: boolean;
  helpful: number;
}

export const reviews: Review[] = [
  /* ── classic-white-tee ── */
  { id: 1,  productSlug: "classic-white-tee", author: "Sophia R.", initials: "SR", rating: 5, date: "Mar 12, 2025", title: "Perfect everyday essential", body: "I ordered three of these. The cotton is incredibly soft and the fit is exactly what I wanted — not too fitted, not boxy. Washes beautifully without shrinking.", verified: true, helpful: 47 },
  { id: 2,  productSlug: "classic-white-tee", author: "James T.", initials: "JT", rating: 5, date: "Feb 28, 2025", title: "Best basic tee I've ever owned", body: "The quality is noticeably better than similar tees at double the price. The collar holds its shape and the fabric has a lovely weight to it.", verified: true, helpful: 38 },
  { id: 3,  productSlug: "classic-white-tee", author: "Layla M.", initials: "LM", rating: 4, date: "Feb 14, 2025", title: "Great quality, sizing runs slightly large", body: "Love the fabric and the cut. Just order a size down if you prefer a fitted look. Other than that, absolutely no complaints.", verified: true, helpful: 22 },

  /* ── oversized-black-tee ── */
  { id: 4,  productSlug: "oversized-black-tee", author: "Marcus D.", initials: "MD", rating: 5, date: "Apr 1, 2025", title: "The drape is incredible", body: "I've been looking for the perfect oversized black tee for months. This is it. The dropped shoulders are perfectly placed and the hem falls just right.", verified: true, helpful: 51 },
  { id: 5,  productSlug: "oversized-black-tee", author: "Priya K.", initials: "PK", rating: 5, date: "Mar 20, 2025", title: "Exactly what I wanted", body: "Heavy enough to not look cheap but still breathable. The charcoal colour is gorgeous — not just plain black, it has real depth.", verified: true, helpful: 33 },
  { id: 6,  productSlug: "oversized-black-tee", author: "Tyler W.", initials: "TW", rating: 4, date: "Mar 8, 2025", title: "Great oversized fit", body: "Really solid tee. The oversized fit is genuine without being ridiculous. Runs true to size for the oversized look they show in the photos.", verified: false, helpful: 19 },

  /* ── graphic-art-tee ── */
  { id: 7,  productSlug: "graphic-art-tee", author: "Elena V.", initials: "EV", rating: 5, date: "Mar 25, 2025", title: "The print is stunning", body: "Screen printing quality is outstanding — crisp edges, vibrant colour that hasn't faded after multiple washes. Gets compliments every time I wear it.", verified: true, helpful: 29 },
  { id: 8,  productSlug: "graphic-art-tee", author: "Noah B.", initials: "NB", rating: 4, date: "Feb 18, 2025", title: "Bold and unique", body: "Love the artwork — it's genuinely interesting, not just a logo slap. Cotton quality is top tier. Would buy more designs if they release them.", verified: true, helpful: 17 },
  { id: 9,  productSlug: "graphic-art-tee", author: "Amara J.", initials: "AJ", rating: 5, date: "Feb 5, 2025", title: "Statement piece", body: "Exactly as described and pictured. The cream colourway is my favourite — so versatile. Paired it with wide-leg jeans and it looked editorial.", verified: true, helpful: 24 },

  /* ── linen-henley-shirt ── */
  { id: 10, productSlug: "linen-henley-shirt", author: "Oliver H.", initials: "OH", rating: 5, date: "Apr 5, 2025", title: "Summer staple sorted", body: "Pure linen, excellent construction. It breathes so well in warm weather. The henley buttons are the perfect casual detail. Highly recommend.", verified: true, helpful: 41 },
  { id: 11, productSlug: "linen-henley-shirt", author: "Cleo S.", initials: "CS", rating: 4, date: "Mar 17, 2025", title: "Lovely fabric, needs ironing", body: "The linen quality is premium — you can tell it's the real thing. Wrinkles easily (as linen does) but a quick iron and it looks pristine.", verified: true, helpful: 26 },
  { id: 12, productSlug: "linen-henley-shirt", author: "Raj P.", initials: "RP", rating: 5, date: "Mar 2, 2025", title: "Worth every penny", body: "Bought this for a holiday and it's been perfect. Light, breezy and looks elevated. I got the sage colour and it's a beautiful, muted green tone.", verified: true, helpful: 18 },

  /* ── slim-fit-blue-jeans ── */
  { id: 13, productSlug: "slim-fit-blue-jeans", author: "Natalie C.", initials: "NC", rating: 5, date: "Apr 8, 2025", title: "Finally — jeans that actually fit", body: "I have a hard time finding slim jeans that aren't too tight in the thigh. These are perfect. The blue wash is rich and the denim has just the right amount of stretch.", verified: true, helpful: 62 },
  { id: 14, productSlug: "slim-fit-blue-jeans", author: "Felix A.", initials: "FA", rating: 5, date: "Mar 30, 2025", title: "Premium denim quality", body: "The stitching, the hardware, the wash — everything is top quality. They've held up excellently after months of regular wear.", verified: true, helpful: 48 },
  { id: 15, productSlug: "slim-fit-blue-jeans", author: "Yuki T.", initials: "YT", rating: 4, date: "Mar 12, 2025", title: "Great jeans, size up", body: "Beautiful quality but runs slightly small in the waist. Recommend sizing up one. Once I exchanged for the right size, they were perfect.", verified: true, helpful: 35 },

  /* ── black-skinny-jeans ── */
  { id: 16, productSlug: "black-skinny-jeans", author: "Grace Y.", initials: "GY", rating: 5, date: "Apr 3, 2025", title: "Sleek and flattering", body: "The high-stretch fabric is genuinely comfortable — no tight spots, no pulling. The jet black finish holds its colour brilliantly wash after wash.", verified: true, helpful: 44 },
  { id: 17, productSlug: "black-skinny-jeans", author: "Lucas M.", initials: "LM", rating: 5, date: "Mar 21, 2025", title: "My go-to jeans", body: "I rotate between three pairs of these. They hold their shape after washing, the dye doesn't fade, and the fit is consistently perfect.", verified: true, helpful: 37 },
  { id: 18, productSlug: "black-skinny-jeans", author: "Mei W.", initials: "MW", rating: 4, date: "Mar 9, 2025", title: "Classic skinny done right", body: "Clean lines, great stretch. The faded black colourway looks intentionally worn-in and is great for styling. Very happy with this purchase.", verified: false, helpful: 21 },

  /* ── relaxed-straight-jeans ── */
  { id: 19, productSlug: "relaxed-straight-jeans", author: "Thomas A.", initials: "TA", rating: 5, date: "Apr 6, 2025", title: "The weekend jean I always needed", body: "Perfect relaxed fit — not baggy, not tight. The light wash is super versatile. I've worn these every weekend since they arrived.", verified: true, helpful: 33 },
  { id: 20, productSlug: "relaxed-straight-jeans", author: "Isabelle F.", initials: "IF", rating: 4, date: "Mar 24, 2025", title: "Great comfort, classic style", body: "Really well constructed. The straight leg is perfectly proportioned and the medium wash photographs beautifully. Very satisfied.", verified: true, helpful: 25 },
  { id: 21, productSlug: "relaxed-straight-jeans", author: "Samuel O.", initials: "SO", rating: 5, date: "Mar 11, 2025", title: "Effortlessly cool", body: "These are the jeans I grab when I want to look put-together without trying. The relaxed fit pairs brilliantly with a tucked shirt or oversized tee.", verified: true, helpful: 19 },

  /* ── vintage-ripped-jeans ── */
  { id: 22, productSlug: "vintage-ripped-jeans", author: "Zara H.", initials: "ZH", rating: 5, date: "Apr 9, 2025", title: "Distressed in all the right places", body: "The rips are well-placed and the edges are finished so they don't fray excessively. The vintage blue wash is gorgeous — rich and warm-toned.", verified: true, helpful: 31 },
  { id: 23, productSlug: "vintage-ripped-jeans", author: "Diego A.", initials: "DA", rating: 4, date: "Mar 28, 2025", title: "Authentic vintage feel", body: "Good quality denim with a convincing hand-distressed finish. I was worried the rips would look cheap but they're actually well done.", verified: true, helpful: 22 },
  { id: 24, productSlug: "vintage-ripped-jeans", author: "Chloe P.", initials: "CP", rating: 5, date: "Mar 14, 2025", title: "Edgy and durable", body: "Reinforced around the distressed areas so they won't just fall apart. I love the stone wash colourway — it's subtle and works with everything.", verified: false, helpful: 15 },

  /* ── classic-grey-hoodie ── */
  { id: 25, productSlug: "classic-grey-hoodie", author: "Sara K.", initials: "SK", rating: 5, date: "Apr 12, 2025", title: "The warmest, softest hoodie I own", body: "I bought this in heather grey and it's become my daily wear. The fleece lining is exceptionally soft — not scratchy at all. The fit is generous but not sloppy.", verified: true, helpful: 73 },
  { id: 26, productSlug: "classic-grey-hoodie", author: "Ben O.", initials: "BO", rating: 5, date: "Apr 2, 2025", title: "Heavyweight and durable", body: "This is not a lightweight hoodie — it's substantial. Exactly what you want for autumn/winter. The kangaroo pocket is deep and functional.", verified: true, helpful: 58 },
  { id: 27, productSlug: "classic-grey-hoodie", author: "Mia N.", initials: "MN", rating: 5, date: "Mar 19, 2025", title: "Worth the price", body: "I've owned cheaper hoodies that pill after a month. This one looks brand new after regular washing for six months. The quality justifies the price completely.", verified: true, helpful: 44 },

  /* ── black-zip-up-hoodie ── */
  { id: 28, productSlug: "black-zip-up-hoodie", author: "Adam L.", initials: "AL", rating: 5, date: "Apr 7, 2025", title: "Sporty and versatile", body: "I wear this to the gym and then straight to coffee with friends. It's the perfect transitional layer. The YKK zip is smooth and it has a great clean silhouette.", verified: true, helpful: 39 },
  { id: 29, productSlug: "black-zip-up-hoodie", author: "Petra J.", initials: "PJ", rating: 4, date: "Mar 25, 2025", title: "Great fit, functional design", body: "Well-made and flattering. The cotton-poly blend is durable and the pockets are well-placed. Perfect for layering over a tee in cooler months.", verified: true, helpful: 28 },
  { id: 30, productSlug: "black-zip-up-hoodie", author: "Carlos B.", initials: "CB", rating: 5, date: "Mar 13, 2025", title: "Replaced my old favourite", body: "My previous zip-up finally wore out after years. This one is even better — the fabric weight is right and the forest green colour is beautiful.", verified: true, helpful: 19 },

  /* ── oversized-cream-hoodie ── */
  { id: 31, productSlug: "oversized-cream-hoodie", author: "Charlotte W.", initials: "CW", rating: 5, date: "Apr 11, 2025", title: "Cloud-soft and dreamy", body: "The cream colour is exactly as pictured — warm and beautiful. The oversized silhouette is done perfectly, not just a regular hoodie in a large size. Very impressed.", verified: true, helpful: 55 },
  { id: 32, productSlug: "oversized-cream-hoodie", author: "Ethan G.", initials: "EG", rating: 5, date: "Apr 1, 2025", title: "My most-worn piece this season", body: "I've had mine in sky blue and it's genuinely the softest hoodie I've owned. The dropped shoulders and boxy cut look intentional and stylish.", verified: true, helpful: 47 },
  { id: 33, productSlug: "oversized-cream-hoodie", author: "Nina R.", initials: "NR", rating: 4, date: "Mar 18, 2025", title: "Beautifully relaxed fit", body: "The dusty rose is absolutely gorgeous in person. Slightly more oversized than I expected (even having read the description) but I've come to love it.", verified: true, helpful: 30 },

  /* ── athletic-quarter-zip ── */
  { id: 34, productSlug: "athletic-quarter-zip", author: "Louis T.", initials: "LT", rating: 5, date: "Apr 14, 2025", title: "Performance and style in one", body: "The moisture-wicking fabric actually works — I've tested it on long runs and it stays comfortable. The thumbholes and slim athletic cut are a great bonus.", verified: true, helpful: 41 },
  { id: 35, productSlug: "athletic-quarter-zip", author: "Rosa M.", initials: "RM", rating: 4, date: "Apr 4, 2025", title: "Sleek and functional", body: "Looks great dressed up or down. The reflective logo is a nice safety touch for evening runs. Fit is slim but not restrictive.", verified: true, helpful: 28 },

  /* ── classic-denim-jacket ── */
  { id: 36, productSlug: "classic-denim-jacket", author: "Oliver H.", initials: "OH", rating: 5, date: "Apr 14, 2025", title: "The perfect layer", body: "Classic cut, great denim weight, beautiful wash. This jacket works over everything — tees, hoodies, dresses. A true wardrobe anchor.", verified: true, helpful: 58 },
  { id: 37, productSlug: "classic-denim-jacket", author: "Rosa M.", initials: "RM", rating: 5, date: "Apr 4, 2025", title: "Timeless and well-made", body: "The seams are reinforced, the buttons are solid brass-tone, and the chest pockets actually close properly. Sizing is perfect — fits true.", verified: true, helpful: 47 },
  { id: 38, productSlug: "classic-denim-jacket", author: "Kai S.", initials: "KS", rating: 4, date: "Mar 23, 2025", title: "Quality denim jacket", body: "Looks exactly like the photos. Slightly stiff at first (as denim jackets always are) but softens beautifully after a few wears.", verified: true, helpful: 33 },

  /* ── leather-biker-jacket ── */
  { id: 39, productSlug: "leather-biker-jacket", author: "Vivienne P.", initials: "VP", rating: 5, date: "Apr 15, 2025", title: "This jacket changed my wardrobe", body: "I've wanted a quality leather jacket for years and this is everything. The fit is structured and flattering. The leather is buttery and the hardware is substantial.", verified: true, helpful: 82 },
  { id: 40, productSlug: "leather-biker-jacket", author: "Damien C.", initials: "DC", rating: 5, date: "Apr 6, 2025", title: "Investment piece", body: "You're not buying a 'looks like leather' jacket here. This is real quality leather with proper construction. It'll only get better with age.", verified: true, helpful: 71 },
  { id: 41, productSlug: "leather-biker-jacket", author: "Amara J.", initials: "AJ", rating: 4, date: "Mar 27, 2025", title: "Stunning but runs small", body: "The jacket is absolutely stunning — the brown colourway is a warm, rich shade. It ran a size small on me so I'd recommend going one up, but the quality is undeniable.", verified: true, helpful: 44 },

  /* ── satin-bomber-jacket ── */
  { id: 42, productSlug: "satin-bomber-jacket", author: "Chloe W.", initials: "CW", rating: 5, date: "Apr 13, 2025", title: "Glamorous and wearable", body: "The emerald satin is even more beautiful in person — it catches the light perfectly. Lightweight enough for early autumn evenings. I've gotten so many compliments.", verified: true, helpful: 64 },
  { id: 43, productSlug: "satin-bomber-jacket", author: "Diego A.", initials: "DA", rating: 4, date: "Apr 3, 2025", title: "Bold style choice that pays off", body: "I went for the deep navy and it's incredibly versatile — dresses up a pair of jeans perfectly. The satin sheen is tasteful rather than over the top.", verified: true, helpful: 49 },

  /* ── packable-windbreaker ── */
  { id: 44, productSlug: "packable-windbreaker", author: "Alexandra K.", initials: "AK", rating: 5, date: "Apr 16, 2025", title: "The travel essential I didn't know I needed", body: "This packs into its own chest pocket and weighs almost nothing. The water resistance actually works — I got caught in a downpour and stayed dry.", verified: true, helpful: 61 },
  { id: 45, productSlug: "packable-windbreaker", author: "Robert F.", initials: "RF", rating: 5, date: "Apr 7, 2025", title: "Perfect lightweight layer", body: "I've been travelling with this for three weeks. The olive colour goes with everything and it takes up no space in my bag. The hidden hood is a genius detail.", verified: true, helpful: 53 },
  { id: 46, productSlug: "packable-windbreaker", author: "Valentina S.", initials: "VS", rating: 4, date: "Mar 29, 2025", title: "Great jacket, small pockets", body: "Excellent quality and function — the royal blue is vibrant and the windproofing is effective. Only minor complaint is the zippered pockets could be slightly larger.", verified: false, helpful: 36 },
];

/** Get reviews for a specific product slug */
export function getProductReviews(slug: string): Review[] {
  return reviews.filter((r) => r.productSlug === slug);
}

/** Compute rating breakdown percentages */
export function getRatingBreakdown(productReviews: Review[]): Record<number, number> {
  if (!productReviews.length) return { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 };
  const counts: Record<number, number> = { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 };
  productReviews.forEach((r) => {
    counts[r.rating] = (counts[r.rating] || 0) + 1;
  });
  const total = productReviews.length;
  return Object.fromEntries(
    Object.entries(counts).map(([k, v]) => [k, Math.round((v / total) * 100)])
  );
}
