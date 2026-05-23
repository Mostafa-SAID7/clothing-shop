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
  /* ── Classic White Tee ── */
  { id: 1, productSlug: "classic-white-tee", author: "Sophia R.", initials: "SR", rating: 5, date: "Mar 12, 2025", title: "Perfect everyday essential", body: "I ordered three of these. The cotton is incredibly soft and the fit is exactly what I wanted — not too fitted, not boxy. Washes beautifully without shrinking.", verified: true, helpful: 47 },
  { id: 2, productSlug: "classic-white-tee", author: "James T.", initials: "JT", rating: 5, date: "Feb 28, 2025", title: "Best basic tee I've ever owned", body: "The quality is noticeably better than similar tees at double the price. The collar holds its shape and the fabric has a lovely weight to it.", verified: true, helpful: 38 },
  { id: 3, productSlug: "classic-white-tee", author: "Layla M.", initials: "LM", rating: 4, date: "Feb 14, 2025", title: "Great quality, sizing runs slightly large", body: "Love the fabric and the cut. Just order a size down if you prefer a fitted look. Other than that, absolutely no complaints.", verified: true, helpful: 22 },

  /* ── Oversized Black Tee ── */
  { id: 4, productSlug: "oversized-black-tee", author: "Marcus D.", initials: "MD", rating: 5, date: "Apr 1, 2025", title: "The drape is incredible", body: "I've been looking for the perfect oversized black tee for months. This is it. The dropped shoulders are perfectly placed and the hem falls just right.", verified: true, helpful: 51 },
  { id: 5, productSlug: "oversized-black-tee", author: "Priya K.", initials: "PK", rating: 5, date: "Mar 20, 2025", title: "Exactly what I wanted", body: "Heavy enough to not look cheap but still breathable. The charcoal colour is gorgeous — not just plain black, it has real depth.", verified: true, helpful: 33 },
  { id: 6, productSlug: "oversized-black-tee", author: "Tyler W.", initials: "TW", rating: 4, date: "Mar 8, 2025", title: "Great oversized fit", body: "Really solid tee. The oversized fit is genuine without being ridiculous. Runs true to size for the oversized look they show in the photos.", verified: false, helpful: 19 },

  /* ── Graphic Art Tee ── */
  { id: 7, productSlug: "graphic-art-tee", author: "Elena V.", initials: "EV", rating: 5, date: "Mar 25, 2025", title: "The print is stunning", body: "Screen printing quality is outstanding — crisp edges, vibrant colour that hasn't faded after multiple washes. Gets compliments every time I wear it.", verified: true, helpful: 29 },
  { id: 8, productSlug: "graphic-art-tee", author: "Noah B.", initials: "NB", rating: 4, date: "Feb 18, 2025", title: "Bold and unique", body: "Love the artwork — it's genuinely interesting, not just a logo slap. Cotton quality is top tier. Would buy more designs if they release them.", verified: true, helpful: 17 },
  { id: 9, productSlug: "graphic-art-tee", author: "Amara J.", initials: "AJ", rating: 5, date: "Feb 5, 2025", title: "Statement piece", body: "Exactly as described and pictured. The cream colourway is my favourite — so versatile. Paired it with wide-leg jeans and it looked editorial.", verified: true, helpful: 24 },

  /* ── Linen Henley Shirt ── */
  { id: 10, productSlug: "linen-henley-shirt", author: "Oliver H.", initials: "OH", rating: 5, date: "Apr 5, 2025", title: "Summer staple sorted", body: "Pure linen, excellent construction. It breathes so well in warm weather. The henley buttons are the perfect casual detail. Highly recommend.", verified: true, helpful: 41 },
  { id: 11, productSlug: "linen-henley-shirt", author: "Cleo S.", initials: "CS", rating: 4, date: "Mar 17, 2025", title: "Lovely fabric, needs ironing", body: "The linen quality is premium — you can tell it's the real thing. Wrinkles easily (as linen does) but a quick iron and it looks pristine.", verified: true, helpful: 26 },
  { id: 12, productSlug: "linen-henley-shirt", author: "Raj P.", initials: "RP", rating: 5, date: "Mar 2, 2025", title: "Worth every penny", body: "Bought this for a holiday and it's been perfect. Light, breezy and looks elevated. I got the sage colour and it's a beautiful, muted green tone.", verified: true, helpful: 18 },

  /* ── Slim Fit Indigo Jeans ── */
  { id: 13, productSlug: "slim-fit-indigo-jeans", author: "Natalie C.", initials: "NC", rating: 5, date: "Apr 8, 2025", title: "Finally — jeans that actually fit", body: "I have a hard time finding slim jeans that aren't too tight in the thigh. These are perfect. The indigo wash is rich and the denim has just the right amount of stretch.", verified: true, helpful: 62 },
  { id: 14, productSlug: "slim-fit-indigo-jeans", author: "Felix A.", initials: "FA", rating: 5, date: "Mar 30, 2025", title: "Premium denim quality", body: "The stitching, the hardware, the wash — everything is top quality. They've held up excellently after months of regular wear.", verified: true, helpful: 48 },
  { id: 15, productSlug: "slim-fit-indigo-jeans", author: "Yuki T.", initials: "YT", rating: 4, date: "Mar 12, 2025", title: "Great jeans, size up", body: "Beautiful quality but runs slightly small in the waist. Recommend sizing up one. Once I exchanged for the right size, they were perfect.", verified: true, helpful: 35 },

  /* ── Wide Leg Cropped Jeans ── */
  { id: 16, productSlug: "wide-leg-cropped-jeans", author: "Isabelle F.", initials: "IF", rating: 5, date: "Apr 10, 2025", title: "Trendy and incredibly flattering", body: "These are exactly the 90s-inspired jeans I was looking for. The cropped length is perfect for showing off sneakers and the wide leg is genuinely wide — not just slightly flared.", verified: true, helpful: 54 },
  { id: 17, productSlug: "wide-leg-cropped-jeans", author: "Diana L.", initials: "DL", rating: 5, date: "Mar 28, 2025", title: "Effortlessly stylish", body: "I've received so many compliments since I started wearing these. They're comfortable and the fit is exactly as shown. The denim quality is excellent.", verified: true, helpful: 43 },
  { id: 18, productSlug: "wide-leg-cropped-jeans", author: "Hassan R.", initials: "HR", rating: 4, date: "Mar 15, 2025", title: "Great statement jeans", body: "Really well-made. The wash is accurate to the photos. Only minor gripe is they're slightly long on me (I'm 5'5) but the cropped length still works.", verified: false, helpful: 20 },

  /* ── Skinny Ankle Jeans ── */
  { id: 19, productSlug: "skinny-ankle-jeans", author: "Grace Y.", initials: "GY", rating: 4, date: "Apr 3, 2025", title: "Classic skinny done right", body: "Clean lines, good stretch, and the ankle length works perfectly with heeled boots. Not paper-thin like some budget skinnies — these feel substantial.", verified: true, helpful: 31 },
  { id: 20, productSlug: "skinny-ankle-jeans", author: "Lucas M.", initials: "LM", rating: 5, date: "Mar 21, 2025", title: "My go-to jeans", body: "I rotate between three pairs of these. They hold their shape after washing (zip up after drying), the dye doesn't fade, and the fit is consistently great.", verified: true, helpful: 27 },

  /* ── Classic Hoodie ── */
  { id: 21, productSlug: "classic-hoodie", author: "Sara K.", initials: "SK", rating: 5, date: "Apr 12, 2025", title: "The warmest, softest hoodie I own", body: "I bought this in heather grey and it's become my daily wear. The fleece lining is exceptionally soft — not scratchy at all. The fit is generous but not sloppy.", verified: true, helpful: 73 },
  { id: 22, productSlug: "classic-hoodie", author: "Ben O.", initials: "BO", rating: 5, date: "Apr 2, 2025", title: "Heavyweight and durable", body: "This is not a lightweight hoodie — it's substantial. Exactly what you want for autumn/winter. The kangaroo pocket is deep and functional.", verified: true, helpful: 58 },
  { id: 23, productSlug: "classic-hoodie", author: "Mia N.", initials: "MN", rating: 5, date: "Mar 19, 2025", title: "Worth the price", body: "I've owned cheaper hoodies that pill after a month. This one looks brand new after regular washing for six months. The quality justifies the price completely.", verified: true, helpful: 44 },

  /* ── Zip-Up Tech Fleece ── */
  { id: 24, productSlug: "zip-up-tech-fleece", author: "Adam L.", initials: "AL", rating: 5, date: "Apr 7, 2025", title: "Sporty and versatile", body: "I wear this to the gym and then straight to coffee with friends. It's the perfect transitional layer. The YKK zip is smooth and the thumbholes are a nice touch.", verified: true, helpful: 39 },
  { id: 25, productSlug: "zip-up-tech-fleece", author: "Petra J.", initials: "PJ", rating: 4, date: "Mar 25, 2025", title: "Great fit, functional design", body: "Well-made and flattering. The fabric has a slight technical sheen that elevates it beyond a basic fleece. Pockets are well-placed.", verified: true, helpful: 28 },

  /* ── Graphic Hoodie ── */
  { id: 26, productSlug: "graphic-hoodie", author: "Carlos B.", initials: "CB", rating: 5, date: "Apr 9, 2025", title: "The most comfortable hoodie I've owned", body: "The oversized fit is ideal and the graphic is tasteful — not garish. The cotton blend is softer than expected. Running true to size.", verified: true, helpful: 45 },
  { id: 27, productSlug: "graphic-hoodie", author: "Zara H.", initials: "ZH", rating: 5, date: "Mar 31, 2025", title: "Bold graphic, quality construction", body: "The print detail is exceptional — it's embossed, not just flat printed. Adds a premium texture. This hoodie will last.", verified: true, helpful: 36 },

  /* ── Merino Wool Pullover ── */
  { id: 28, productSlug: "merino-wool-pullover", author: "Charlotte W.", initials: "CW", rating: 5, date: "Apr 11, 2025", title: "Luxury you can wear every day", body: "I was hesitant about the price but the merino is silky and warm without the weight. It drapes beautifully and is genuinely non-itchy. Best purchase of the year.", verified: true, helpful: 67 },
  { id: 29, productSlug: "merino-wool-pullover", author: "Ethan G.", initials: "EG", rating: 5, date: "Apr 1, 2025", title: "Exceptional quality", body: "Hand-wash only is a minor inconvenience compared to how incredible this feels. The camel colour is a perfect neutral and goes with everything.", verified: true, helpful: 52 },
  { id: 30, productSlug: "merino-wool-pullover", author: "Nina R.", initials: "NR", rating: 4, date: "Mar 18, 2025", title: "Beautiful hoodie but care instructions are strict", body: "Stunning piece but requires careful washing. Follow the care label and it stays perfect. The navy is a gorgeous, rich shade.", verified: true, helpful: 30 },

  /* ── Classic Denim Jacket ── */
  { id: 31, productSlug: "classic-denim-jacket", author: "Louis T.", initials: "LT", rating: 5, date: "Apr 14, 2025", title: "The perfect layer", body: "Classic cut, great denim weight, beautiful wash. This jacket works over everything — tees, hoodies, dresses. A true wardrobe anchor.", verified: true, helpful: 58 },
  { id: 32, productSlug: "classic-denim-jacket", author: "Rosa M.", initials: "RM", rating: 5, date: "Apr 4, 2025", title: "Timeless and well-made", body: "The seams are reinforced, the buttons are solid brass-tone, and the chest pockets actually close properly. Sizing is perfect — fits true.", verified: true, helpful: 47 },
  { id: 33, productSlug: "classic-denim-jacket", author: "Kai S.", initials: "KS", rating: 4, date: "Mar 23, 2025", title: "Quality denim jacket", body: "Looks exactly like the photos. Slightly stiff at first (as denim jackets always are) but softens beautifully after a few wears.", verified: true, helpful: 33 },

  /* ── Leather Biker Jacket ── */
  { id: 34, productSlug: "leather-biker-jacket", author: "Vivienne P.", initials: "VP", rating: 5, date: "Apr 15, 2025", title: "This jacket changed my wardrobe", body: "I've wanted a quality leather jacket for years and this is everything. The fit is structured and flattering. The leather is buttery and the hardware is substantial.", verified: true, helpful: 82 },
  { id: 35, productSlug: "leather-biker-jacket", author: "Damien C.", initials: "DC", rating: 5, date: "Apr 6, 2025", title: "Investment piece", body: "You're not buying a 'looks like leather' jacket here. This is real quality leather with proper construction. It'll only get better with age.", verified: true, helpful: 71 },

  /* ── Satin Bomber Jacket ── */
  { id: 36, productSlug: "satin-bomber-jacket", author: "Chloe W.", initials: "CW", rating: 5, date: "Apr 13, 2025", title: "Glamorous and wearable", body: "The emerald satin is even more beautiful in person — it catches the light perfectly. Lightweight enough for early autumn evenings. I've gotten so many compliments.", verified: true, helpful: 64 },
  { id: 37, productSlug: "satin-bomber-jacket", author: "Diego A.", initials: "DA", rating: 4, date: "Apr 3, 2025", title: "Bold style choice that pays off", body: "I went for the emerald and it's a showstopper. Styling note: keep the rest of the outfit simple and let the jacket do the talking.", verified: true, helpful: 49 },

  /* ── Tailored Wool Overcoat ── */
  { id: 38, productSlug: "tailored-wool-overcoat", author: "Alexandra K.", initials: "AK", rating: 5, date: "Apr 16, 2025", title: "A truly exceptional coat", body: "The tailoring on this coat is impeccable. The shoulder line, the lapels, the half-belt at the back — every detail is considered. This is proper luxury.", verified: true, helpful: 94 },
  { id: 39, productSlug: "tailored-wool-overcoat", author: "Robert F.", initials: "RF", rating: 5, date: "Apr 7, 2025", title: "Best coat I've ever owned", body: "I wore this to a gallery opening and two people asked where I got it. The camel colour is warm and sophisticated. Worth every cent.", verified: true, helpful: 78 },
  { id: 40, productSlug: "tailored-wool-overcoat", author: "Valentina S.", initials: "VS", rating: 4, date: "Mar 29, 2025", title: "Near perfect coat", body: "The quality is genuinely exceptional — the wool is thick and luxurious. I docked one star only because the belt loops could be positioned slightly higher.", verified: false, helpful: 41 },
];

/** Get reviews for a specific product slug */
export function getProductReviews(slug: string): Review[] {
  return reviews.filter((r) => r.productSlug === slug);
}

/** Compute rating breakdown percentages */
export function getRatingBreakdown(productReviews: Review[]): Record<number, number> {
  if (!productReviews.length) return { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 };
  const counts = { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 };
  productReviews.forEach((r) => {
    counts[r.rating as keyof typeof counts] = (counts[r.rating as keyof typeof counts] || 0) + 1;
  });
  const total = productReviews.length;
  return Object.fromEntries(
    Object.entries(counts).map(([k, v]) => [k, Math.round((v / total) * 100)])
  );
}
