import dbConnect from "./src/lib/db";
import User from "./src/models/User";
import Tour from "./src/models/Tour";
import Review from "./src/models/Review";
import BlogPost from "./src/models/BlogPost";
import NewsletterSubscriber from "./src/models/NewsletterSubscriber";
import bcrypt from "bcryptjs";

const categories = [
  "Adventure",
  "Beach",
  "Mountain",
  "Cultural",
  "Wildlife",
  "City",
];

const tourData = [
  {
    title: "Amalfi Coast Sailing Adventure",
    slug: "amalfi-coast-sailing-adventure",
    shortDescription: "Sail along the stunning Amalfi Coast with stops at picturesque villages and hidden coves.",
    fullDescription:
      "Embark on a breathtaking sailing journey along the Amalfi Coast, one of Italy's most beautiful coastlines. Cruise past colorful cliffside villages, swim in crystal-clear coves, and savor fresh Mediterranean cuisine on board. Visit the charming towns of Positano, Amalfi, and Ravello, each offering unique culture and stunning views. This tour combines relaxation, adventure, and authentic Italian experiences.",
    category: "Adventure",
    price: 1899,
    duration: "7 Days",
    groupSize: 10,
    difficulty: "easy",
    location: "Amalfi Coast, Italy",
    images: [
      "https://images.unsplash.com/photo-1542435503-956c469947f6?w=800",
      "https://images.unsplash.com/photo-1533104816931-20fa691ff6ca?w=800",
    ],
    itinerary: [
      { day: 1, title: "Arrival in Naples", description: "Arrive in Naples and transfer to the port. Welcome dinner on board." },
      { day: 2, title: "Positano Exploration", description: "Sail to Positano. Explore the colorful streets and boutique shops." },
      { day: 3, title: "Amalfi & Ravello", description: "Visit Amalfi Cathedral and the gardens of Villa Rufolo in Ravello." },
      { day: 4, title: "Hidden Coves", description: "Anchoring at secluded coves for swimming and snorkeling." },
      { day: 5, title: "Capri Day Trip", description: "Sail to the island of Capri. Visit the Blue Grotto." },
      { day: 6, title: "Sorrento", description: "Explore Sorrento and enjoy a limoncello tasting." },
      { day: 7, title: "Departure", description: "Breakfast on board and transfer to Naples airport." },
    ],
    inclusions: ["All accommodation on board", "Professional captain and crew", "Daily breakfast and lunch", "Snorkeling equipment", "Port fees"],
    exclusions: ["Flights to/from Naples", "Alcoholic beverages", "Travel insurance"],
    departureDate: "2026-06-15",
    featured: true,
  },
  {
    title: "Patagonia Trekking Expedition",
    slug: "patagonia-trekking-expedition",
    shortDescription: "Trek through the dramatic landscapes of Patagonia, from glaciers to towering peaks.",
    fullDescription:
      "Experience the raw beauty of Patagonia on this epic trekking expedition. Traverse through Torres del Paine National Park, hike alongside massive glaciers, and witness some of the most dramatic mountain scenery on Earth. Our expert guides lead you through challenging yet rewarding terrain, with comfortable camping under the stars.",
    category: "Adventure",
    price: 3499,
    duration: "12 Days",
    groupSize: 8,
    difficulty: "challenging",
    location: "Patagonia, Chile",
    images: [
      "https://images.unsplash.com/photo-1531366936337-7c912a4589a7?w=800",
      "https://images.unsplash.com/photo-1585409677983-0f6c41ca9c3b?w=800",
    ],
    itinerary: [
      { day: 1, title: "Arrival in Punta Arenas", description: "Arrive and transfer to Puerto Natales. Gear check." },
      { day: 2, title: "Torres del Paine Entrance", description: "Enter the park and begin the W Trek." },
      { day: 3, title: "Las Torres Base", description: "Hike to the base of the iconic Torres peaks." },
      { day: 4, title: "French Valley", description: "Trek through the French Valley with panoramic views." },
      { day: 5, title: "Grey Glacier", description: "Hike to Grey Glacier for a close-up view." },
      { day: 6, title: "Rest Day", description: "Rest and recover at the refugio." },
      { day: 7, title: "Paine Grande", description: "Trek to Lake Pehoé and Paine Grande." },
      { day: 8, title: "Exploration Day", description: "Optional kayaking or further hiking." },
      { day: 9, title: "Transfer to El Calafate", description: "Cross into Argentina and transfer to El Calafate." },
      { day: 10, title: "Perito Moreno Glacier", description: "Full day exploring Perito Moreno Glacier." },
      { day: 11, title: "Farewell Dinner", description: "Celebratory dinner in El Calafate." },
      { day: 12, title: "Departure", description: "Transfer to airport for departure." },
    ],
    inclusions: ["All camping equipment", "Professional bilingual guide", "All meals on trek", "Park entrance fees", "Emergency satellite phone"],
    exclusions: ["Flights", "Sleeping bag (rental available)", "Travel insurance", "Personal gear"],
    departureDate: "2026-11-02",
    featured: true,
  },
  {
    title: "Tokyo Night Food Tour",
    slug: "tokyo-night-food-tour",
    shortDescription: "Dive into Tokyo's legendary food scene after dark with a local guide.",
    fullDescription:
      "Explore Tokyo's vibrant nightlife and culinary scene on this guided food tour. Visit hidden izakayas, sizzling ramen shops, and bustling street food stalls in Shinjuku, Shibuya, and Golden Gai. Taste authentic yakitori, takoyaki, and fresh sushi while learning about Japanese food culture from your local guide.",
    category: "City",
    price: 1499,
    duration: "5 Days",
    groupSize: 6,
    difficulty: "easy",
    location: "Tokyo, Japan",
    images: [
      "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=800",
      "https://images.unsplash.com/photo-1717994042004-48d3e5f6a384?w=800",
    ],
    itinerary: [
      { day: 1, title: "Arrival & Shibuya", description: "Arrive in Tokyo. Evening stroll through Shibuya crossing and dinner." },
      { day: 2, title: "Shinjuku Food Walk", description: "Explore Shinjuku's hidden eateries and Omoide Yokocho." },
      { day: 3, title: "Tsukiji & Asakusa", description: "Morning at Tsukiji Outer Market. Afternoon in Asakusa." },
      { day: 4, title: "Golden Gai Evening", description: "Bar hop through the famous Golden Gai district." },
      { day: 5, title: "Departure", description: "Final Japanese breakfast and departure." },
    ],
    inclusions: ["4 nights accommodation", "All food tastings", "Local English-speaking guide", "Public transport pass", "Welcome dinner"],
    exclusions: ["Flights", "Alcoholic drinks", "Personal shopping", "Travel insurance"],
    departureDate: "2026-05-10",
    featured: true,
  },
  {
    title: "Serengeti Luxury Safari",
    slug: "serengeti-luxury-safari",
    shortDescription: "Witness the Great Migration and Africa's Big Five on a luxury safari adventure.",
    fullDescription:
      "Experience the ultimate African safari in the Serengeti. Stay in luxury tented camps and witness the Great Migration, where millions of wildebeest and zebras cross the plains. Spot the Big Five — lion, leopard, elephant, rhino, and buffalo — with expert guides. Enjoy gourmet meals under the stars and unforgettable sunsets over the savannah.",
    category: "Wildlife",
    price: 5499,
    duration: "10 Days",
    groupSize: 8,
    difficulty: "easy",
    location: "Serengeti, Tanzania",
    images: [
      "https://images.unsplash.com/photo-1516426122078-c23e76319801?w=800",
      "https://images.unsplash.com/photo-1504173010664-32509aeebb62?w=800",
    ],
    itinerary: [
      { day: 1, title: "Arrival in Arusha", description: "Arrive at Kilimanjaro Airport. Transfer to Arusha lodge." },
      { day: 2, title: "Lake Manyara", description: "Game drive at Lake Manyara National Park." },
      { day: 3, title: "Ngorongoro Crater", description: "Full day exploring the Ngorongoro Crater." },
      { day: 4, title: "Serengeti Central", description: "Drive to central Serengeti. Evening game drive." },
      { day: 5, title: "Full Day Safari", description: "Full day game drive following the migration." },
      { day: 6, title: "Northern Serengeti", description: "Move to northern Serengeti for river crossings." },
      { day: 7, title: "Mara River", description: "Witness dramatic river crossings." },
      { day: 8, title: "Balloon Safari", description: "Optional hot air balloon over the Serengeti." },
      { day: 9, title: "Departure Day", description: "Transfer back to Arusha." },
      { day: 10, title: "Departure", description: "Depart from Kilimanjaro International Airport." },
    ],
    inclusions: ["All accommodation (luxury tented camps)", "Professional guide and driver", "All meals on safari", "Park entrance fees", "4x4 safari vehicle", "Bottled water"],
    exclusions: ["Flights", "Hot air balloon ($500)", "Tips", "Travel insurance", "Visa fees"],
    departureDate: "2026-08-20",
    featured: true,
  },
  {
    title: "Wonders of Jordan",
    slug: "wonders-of-jordan",
    shortDescription: "Discover the ancient wonders of Jordan, from Petra to the Dead Sea.",
    fullDescription:
      "Journey through Jordan's most iconic landscapes and historical sites. Walk through the Siq to the Treasury in Petra, float in the buoyant waters of the Dead Sea, explore the Roman ruins of Jerash, and camp under the stars in Wadi Rum. This tour offers an unforgettable blend of history, culture, and natural beauty.",
    category: "Cultural",
    price: 2799,
    duration: "8 Days",
    groupSize: 12,
    difficulty: "moderate",
    location: "Jordan",
    images: [
      "https://images.unsplash.com/photo-1576487249402-0ea48e3e1a98?w=800",
      "https://images.unsplash.com/photo-1581974267369-3f2fe3b4545c?w=800",
    ],
    itinerary: [
      { day: 1, title: "Arrival in Amman", description: "Arrive in Amman and transfer to hotel." },
      { day: 2, title: "Jerash & Amman", description: "Visit Jerash ruins and explore Amman Citadel." },
      { day: 3, title: "Petra", description: "Full day exploring Petra." },
      { day: 4, title: "Petra Second Day", description: "Further exploration of Petra's hidden tombs." },
      { day: 5, title: "Wadi Rum", description: "Jeep tour and overnight in Bedouin camp." },
      { day: 6, title: "Dead Sea", description: "Float in the Dead Sea and visit a resort." },
      { day: 7, title: "Madaba & Mount Nebo", description: "Visit Madaba's mosaics and Mount Nebo." },
      { day: 8, title: "Departure", description: "Transfer to Amman airport for departure." },
    ],
    inclusions: ["7 nights accommodation", "All transport in private vehicle", "English-speaking guide", "Entrance fees to all sites", "Bedouin camp dinner", "Breakfast daily"],
    exclusions: ["Flights", "Lunch and dinner (except camp)", "Tips", "Travel insurance", "Visa"],
    departureDate: "2026-04-05",
    featured: false,
  },
  {
    title: "Iceland Northern Lights",
    slug: "iceland-northern-lights",
    shortDescription: "Chase the aurora borealis and explore Iceland's otherworldly landscapes.",
    fullDescription:
      "Embark on a magical winter journey through Iceland. Chase the Northern Lights across snowy landscapes, walk between tectonic plates at Thingvellir National Park, witness powerful waterfalls and geysers, and relax in geothermal hot springs. This tour combines natural wonders with cozy Nordic hospitality.",
    category: "Adventure",
    price: 3299,
    duration: "7 Days",
    groupSize: 10,
    difficulty: "moderate",
    location: "Iceland",
    images: [
      "https://images.unsplash.com/photo-1504214208698-ea1916a2195a?w=800",
      "https://images.unsplash.com/photo-1520769669658-f07657f5a307?w=800",
    ],
    itinerary: [
      { day: 1, title: "Arrival in Reykjavik", description: "Arrive and explore Reykjavik." },
      { day: 2, title: "Golden Circle", description: "Thingvellir, Geysir, and Gullfoss waterfall." },
      { day: 3, title: "South Coast", description: "Skogafoss, Seljalandsfoss, and Reynisfjara beach." },
      { day: 4, title: "Glacier Lagoon", description: "Jokulsarlon glacier lagoon and diamond beach." },
      { day: 5, title: "Northern Lights", description: "Evening Northern Lights hunting." },
      { day: 6, title: "Blue Lagoon", description: "Relax at the Blue Lagoon geothermal spa." },
      { day: 7, title: "Departure", description: "Depart from Keflavik Airport." },
    ],
    inclusions: ["6 nights accommodation", "Northern Lights tour", "Blue Lagoon entry", "All transport", "Breakfast daily"],
    exclusions: ["Flights", "Lunch and dinner", "Travel insurance", "Winter gear rental"],
    departureDate: "2026-12-10",
    featured: false,
  },
  {
    title: "Bali Retreat & Surf",
    slug: "bali-retreat-and-surf",
    shortDescription: "Surf world-class waves and unwind with yoga in tropical Bali.",
    fullDescription:
      "Find your balance in Bali with this perfect mix of adventure and wellness. Learn to surf at famous breaks like Uluwatu and Padang Padang, practice yoga overlooking rice terraces in Ubud, explore ancient temples, and indulge in Balinese spa treatments. This retreat is designed for both beginners and experienced surfers.",
    category: "Beach",
    price: 1899,
    duration: "10 Days",
    groupSize: 12,
    difficulty: "easy",
    location: "Bali, Indonesia",
    images: [
      "https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=800",
      "https://images.unsplash.com/photo-1555400038-63f5ba517a47?w=800",
    ],
    itinerary: [
      { day: 1, title: "Arrival in Bali", description: "Arrive at Ngurah Rai Airport. Transfer to Seminyak." },
      { day: 2, title: "Surf Lesson", description: "Beginner surf lesson at Legian Beach." },
      { day: 3, title: "Uluwatu Surf", description: "Surf at Uluwatu. Evening Kecak dance." },
      { day: 4, title: "Ubud Transfer", description: "Move to Ubud. Afternoon rice terrace walk." },
      { day: 5, title: "Yoga & Temples", description: "Morning yoga. Visit Tirta Empul temple." },
      { day: 6, title: "Mount Batur", description: "Optional sunrise trek at Mount Batur." },
      { day: 7, title: "Return to Coast", description: "Return to Canggu. Afternoon surf." },
      { day: 8, title: "Free Surf Day", description: "Free day to explore or surf." },
      { day: 9, title: "Spa & Farewell", description: "Spa treatments and farewell dinner." },
      { day: 10, title: "Departure", description: "Transfer to airport." },
    ],
    inclusions: ["9 nights accommodation", "Daily breakfast", "5 surf lessons", "3 yoga sessions", "Airport transfers"],
    exclusions: ["Flights", "Lunch and dinner", "Spa treatments", "Travel insurance"],
    departureDate: "2026-07-12",
    featured: false,
  },
  {
    title: "Swiss Alps Express",
    slug: "swiss-alps-express",
    shortDescription: "Ride the scenic train through the Swiss Alps and visit charming mountain villages.",
    fullDescription:
      "Board the legendary Swiss Alps Express for one of the world's most scenic train journeys. Wind through snow-capped peaks, cross viaducts, and spiral through tunnels as you travel from Zermatt to St. Moritz. Stop at charming Alpine villages, enjoy Swiss chocolate and cheese, and take in breathtaking views at every turn.",
    category: "Mountain",
    price: 4299,
    duration: "8 Days",
    groupSize: 14,
    difficulty: "easy",
    location: "Swiss Alps, Switzerland",
    images: [
      "https://images.unsplash.com/photo-1531366936337-7c912a4589a7?w=800",
      "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800",
    ],
    itinerary: [
      { day: 1, title: "Arrival in Zurich", description: "Arrive in Zurich. Explore the old town." },
      { day: 2, title: "Zurich to Lucerne", description: "Train to Lucerne. Visit Chapel Bridge." },
      { day: 3, title: "Mount Pilatus", description: "Golden round trip to Mount Pilatus." },
      { day: 4, title: "Interlaken", description: "Train to Interlaken. Free afternoon." },
      { day: 5, title: "Jungfraujoch", description: "Visit the Top of Europe — Jungfraujoch." },
      { day: 6, title: "Zermatt", description: "Train to Zermatt. View the Matterhorn." },
      { day: 7, title: "Glacier Express", description: "Board the Glacier Express to St. Moritz." },
      { day: 8, title: "Departure", description: "Transfer to Zurich airport." },
    ],
    inclusions: ["7 nights hotels", "Swiss Travel Pass (1st class)", "Glacier Express panoramic ticket", "Jungfraujoch ticket", "Breakfast daily"],
    exclusions: ["Flights", "Lunch and dinner", "Travel insurance", "Personal expenses"],
    departureDate: "2026-09-15",
    featured: false,
  },
  {
    title: "Marrakech Market Tour",
    slug: "marrakech-market-tour",
    shortDescription: "Get lost in the vibrant souks of Marrakech with a local guide.",
    fullDescription:
      "Immerse yourself in the colors, sounds, and flavors of Marrakech. Navigate the labyrinthine souks with a local guide, haggle for handicrafts, taste traditional Moroccan street food, and visit stunning palaces and gardens. This tour offers an authentic glimpse into Moroccan culture and hospitality.",
    category: "City",
    price: 1299,
    duration: "5 Days",
    groupSize: 8,
    difficulty: "easy",
    location: "Marrakech, Morocco",
    images: [
      "https://images.unsplash.com/photo-1597212618440-806262de4f6b?w=800",
      "https://images.unsplash.com/photo-1489749798305-4fea3ae63d43?w=800",
    ],
    itinerary: [
      { day: 1, title: "Arrival", description: "Arrive and transfer to riad in the medina." },
      { day: 2, title: "Souk Tour", description: "Guided tour of the souks and Bahia Palace." },
      { day: 3, title: "Cooking Class", description: "Moroccan cooking class and market visit." },
      { day: 4, title: "Majorelle Garden", description: "Visit Majorelle Garden and YSL Museum." },
      { day: 5, title: "Departure", description: "Depart from Marrakech." },
    ],
    inclusions: ["4 nights riad accommodation", "Daily breakfast", "Local English-speaking guide", "Cooking class", "Airport transfers"],
    exclusions: ["Flights", "Lunch and dinner", "Shopping", "Travel insurance"],
    departureDate: "2026-03-20",
    featured: false,
  },
  {
    title: "Great Barrier Reef Dive",
    slug: "great-barrier-reef-dive",
    shortDescription: "Dive the world's largest coral reef system in tropical Queensland.",
    fullDescription:
      "Explore the breathtaking Great Barrier Reef, one of the seven natural wonders of the world. Snorkel and dive among vibrant coral gardens, swim with sea turtles and colorful fish, and relax on pristine Whitehaven Beach. Stay on a liveaboard vessel for the ultimate reef experience with expert marine guides.",
    category: "Beach",
    price: 3999,
    duration: "7 Days",
    groupSize: 10,
    difficulty: "moderate",
    location: "Great Barrier Reef, Australia",
    images: [
      "https://images.unsplash.com/photo-1587139223877-04cb899fa3e8?w=800",
      "https://images.unsplash.com/photo-1559128010-7c1ad6e1b6a5?w=800",
    ],
    itinerary: [
      { day: 1, title: "Arrival in Cairns", description: "Arrive in Cairns. Evening at the marina." },
      { day: 2, title: "Liveaboard Boarding", description: "Board the liveaboard vessel and set sail." },
      { day: 3, title: "Outer Reef Dives", description: "Two guided dives at outer reef sites." },
      { day: 4, title: "Ribbon Reefs", description: "Explore the pristine Ribbon Reefs." },
      { day: 5, title: "Whitehaven Beach", description: "Visit Whitehaven Beach and Hill Inlet." },
      { day: 6, title: "Final Dives", description: "Morning dives. Return to Cairns." },
      { day: 7, title: "Departure", description: "Depart from Cairns Airport." },
    ],
    inclusions: ["6 nights (3 on liveaboard + 3 hotel)", "Up to 10 guided dives", "Snorkeling equipment", "All meals on liveaboard", "PADI-certified guide"],
    exclusions: ["Flights", "Dive certification (if needed)", "Travel insurance", "Alcoholic drinks", "Nitrox fills"],
    departureDate: "2026-10-05",
    featured: false,
  },
  {
    title: "Paris Gourmet Walk",
    slug: "paris-gourmet-walk",
    shortDescription: "Savor the best of Parisian cuisine on a curated gourmet walking tour.",
    fullDescription:
      "Indulge in the culinary delights of Paris on this curated gourmet walking tour. Visit artisan bakeries for fresh croissants, sample cheeses from fromageries, taste macarons from Ladurée, sip wine at hidden wine bars, and learn the secrets of French cuisine from local food experts.",
    category: "City",
    price: 1699,
    duration: "5 Days",
    groupSize: 8,
    difficulty: "easy",
    location: "Paris, France",
    images: [
      "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=800",
      "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=800",
    ],
    itinerary: [
      { day: 1, title: "Arrival", description: "Arrive in Paris. Evening Seine river cruise." },
      { day: 2, title: "Le Marais Food Walk", description: "Explore Le Marais district with food tastings." },
      { day: 3, title: "Montmartre & Sacre Coeur", description: "Montmartre food walk and view from Sacre Coeur." },
      { day: 4, title: "Wine & Cheese Tasting", description: "Wine and cheese pairing workshop." },
      { day: 5, title: "Departure", description: "Depart from Paris." },
    ],
    inclusions: ["4 nights boutique hotel", "Daily breakfast", "All food tastings", "Wine and cheese workshop", "Local food guide"],
    exclusions: ["Flights", "Lunch and dinner (except tastings)", "Museum entries", "Travel insurance"],
    departureDate: "2026-05-25",
    featured: false,
  },
  {
    title: "Machu Picchu & Sacred Valley",
    slug: "machu-picchu-sacred-valley",
    shortDescription: "Trek through the Sacred Valley to the lost city of the Incas.",
    fullDescription:
      "Follow in the footsteps of the Incas on this unforgettable journey to Machu Picchu. Trek through the Sacred Valley, visit ancient ruins and colorful markets, and finally arrive at the awe-inspiring lost city of Machu Picchu at sunrise. This tour combines moderate hiking with rich cultural experiences.",
    category: "Cultural",
    price: 2899,
    duration: "7 Days",
    groupSize: 10,
    difficulty: "moderate",
    location: "Cusco, Peru",
    images: [
      "https://images.unsplash.com/photo-1587595431973-160d0d94add1?w=800",
      "https://images.unsplash.com/photo-1526392060635-9d6019884377?w=800",
    ],
    itinerary: [
      { day: 1, title: "Arrival in Cusco", description: "Arrive in Cusco. Acclimatization and city tour." },
      { day: 2, title: "Sacred Valley", description: "Visit Pisac market and Ollantaytambo fortress." },
      { day: 3, title: "Start of Inca Trail", description: "Begin the classic Inca Trail trek." },
      { day: 4, title: "Dead Woman's Pass", description: "Cross the highest pass of the Inca Trail." },
      { day: 5, title: "Sun Gate Arrival", description: "Arrive at Machu Picchu via the Sun Gate." },
      { day: 6, title: "Machu Picchu Tour", description: "Full guided tour of Machu Picchu." },
      { day: 7, title: "Departure", description: "Return to Cusco and depart." },
    ],
    inclusions: ["6 nights accommodation", "Inca Trail permit", "Professional guide and porters", "All meals on trail", "Machu Picchu entrance", "Train tickets"],
    exclusions: ["Flights", "Sleeping bag rental", "Tips", "Travel insurance"],
    departureDate: "2026-06-01",
    featured: false,
  },
];

const blogPosts = [
  {
    title: "10 Essential Tips for First-Time Solo Travelers",
    slug: "solo-travel-tips",
    excerpt: "Embarking on your first solo trip? Here's everything you need to know to travel safely and confidently.",
    content:
      "Traveling alone for the first time can be both exhilarating and daunting. From choosing the right destination to staying safe, this guide covers the essential tips every solo traveler should know. Learn about packing light, using local transport, meeting fellow travelers, and embracing the freedom of solo adventures.\n\n## 1. Start with an Easy Destination\nChoose a country with good infrastructure, English-friendly locals, and a well-trodden tourist path.\n\n## 2. Pack Light\nA carry-on is your best friend. You'll move faster and feel less burdened.\n\n## 3. Stay in Social Accommodations\nHostels and guesthouses are perfect for meeting other travelers.\n\n## 4. Keep Digital Copies of Documents\nStore copies of your passport, visa, and insurance in the cloud.\n\n## 5. Trust Your Instincts\nIf something doesn't feel right, it probably isn't. Always listen to your gut.",
    coverImage: "https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=800",
    author: "Sarah Mitchell",
  },
  {
    title: "The Ultimate Guide to Budget Travel in Southeast Asia",
    slug: "budget-travel-southeast-asia",
    excerpt: "Explore Southeast Asia on a shoestring budget without missing out on the best experiences.",
    content:
      "Southeast Asia is a paradise for budget travelers. With affordable accommodation, street food for under $2, and stunning landscapes, you can travel for months without breaking the bank. This guide covers the best routes, money-saving tips, and must-visit destinations from Thailand to Vietnam.\n\n## Best Budget Destinations\n- Thailand: Chiang Mai, Pai, and the islands\n- Vietnam: Hanoi, Ha Long Bay, Hoi An\n- Indonesia: Bali, Yogyakarta, Lombok\n- Cambodia: Siem Reap, Phnom Penh\n\n## Daily Budget Breakdown\nExpect to spend $25-40 per day including accommodation, food, transport, and activities.",
    coverImage: "https://images.unsplash.com/photo-1552465011-b4e21bf6e79a?w=800",
    author: "James Rodriguez",
  },
  {
    title: "Wellness Retreats: Reconnect with Yourself in Nature",
    slug: "wellness-retreats-nature",
    excerpt: "Discover the best wellness retreats around the world for mindfulness, yoga, and rejuvenation.",
    content:
      "In our fast-paced world, wellness retreats offer a sanctuary to slow down and reconnect. From yoga in Bali to meditation in India, these retreats provide structured programs for physical and mental well-being.\n\n## Top Wellness Retreats\n- Ubud, Bali: Yoga and rice terrace meditation\n- Tulum, Mexico: Beachfront wellness with Mayan traditions\n- Rishikesh, India: The yoga capital of the world\n- Ibiza, Spain: Luxury wellness and detox\n\nEach retreat offers a unique approach to healing and self-discovery.",
    coverImage: "https://images.unsplash.com/photo-1545389336-cf090694435e?w=800",
    author: "Emma Chen",
  },
  {
    title: "Street Food Safari: Best Eats in Southeast Asia",
    slug: "street-food-southeast-asia",
    excerpt: "A food lover's guide to the best street food across Thailand, Vietnam, Malaysia, and beyond.",
    content:
      "Street food is the heart of Southeast Asian cuisine. From Bangkok's bustling night markets to Hanoi's noodle stalls, every corner offers a new flavor adventure. This guide takes you through the must-try dishes in each country.\n\n## Thailand\n- Pad Thai, Som Tam, Mango Sticky Rice\n\n## Vietnam\n- Pho, Banh Mi, Bun Cha\n\n## Malaysia\n- Nasi Lemak, Satay, Char Kway Teow\n\n## Singapore\n- Hainanese Chicken Rice, Laksa, Chili Crab",
    coverImage: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=800",
    author: "Sarah Mitchell",
  },
  {
    title: "Hiking 101: What You Need to Know Before Your First Trek",
    slug: "hiking-101-first-trek",
    excerpt: "Prepare for your first hiking adventure with this comprehensive beginner's guide.",
    content:
      "Whether you're planning a day hike or a multi-day trek, proper preparation is key. This guide covers essential gear, fitness preparation, navigation basics, and trail etiquette for beginners.\n\n## Essential Gear\n- Proper hiking boots\n- Layered clothing\n- Hydration system\n- Navigation tools\n- First aid kit\n\n## Fitness Preparation\nStart with shorter hikes and gradually increase difficulty. Include cardio and strength training in your routine.",
    coverImage: "https://images.unsplash.com/photo-1551632811-561732d1e306?w=800",
    author: "James Rodriguez",
  },
  {
    title: "Sustainable Travel: How to Explore Responsibly",
    slug: "sustainable-travel",
    excerpt: "Learn how to minimize your environmental impact while still enjoying incredible travel experiences.",
    content:
      "Sustainable travel is about making conscious choices that benefit the environment and local communities. From choosing eco-friendly accommodations to reducing plastic waste, every small action counts.\n\n## Tips for Sustainable Travel\n- Choose direct flights when possible\n- Stay in eco-certified accommodations\n- Support local businesses and artisans\n- Use reusable water bottles and bags\n- Respect wildlife and natural habitats\n\nBy traveling responsibly, we can ensure that future generations can enjoy the same wonders we do today.",
    coverImage: "https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?w=800",
    author: "Emma Chen",
  },
];

async function seed() {
  try {
    await dbConnect();
    console.log("Connected to MongoDB");

    // Clear existing data
    await Promise.all([
      User.deleteMany({}),
      Tour.deleteMany({}),
      Review.deleteMany({}),
      BlogPost.deleteMany({}),
      NewsletterSubscriber.deleteMany({}),
    ]);
    console.log("Cleared existing data");

    // Create users
    const hashedUserPassword = await bcrypt.hash("Demo@1234", 10);
    const hashedAdminPassword = await bcrypt.hash("Admin@1234", 10);

    const demoUser = new User({
      name: "Demo User",
      email: "demo.user@wanderly.app",
      password: hashedUserPassword,
      role: "user",
      avatarUrl: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200",
    });

    const demoAdmin = new User({
      name: "Admin User",
      email: "demo.admin@wanderly.app",
      password: hashedAdminPassword,
      role: "admin",
      avatarUrl: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200",
    });

    await demoUser.save();
    await demoAdmin.save();
    console.log("Created demo users");

    // Create tours
    const createdTours = [];
    for (const tour of tourData) {
      const newTour = new Tour({
        ...tour,
        createdBy: demoAdmin._id,
      });
      await newTour.save();
      createdTours.push(newTour);
    }
    console.log(`Created ${createdTours.length} tours`);

    // Create reviews
    const reviewTexts = [
      "Absolutely incredible experience! The guides were knowledgeable and the scenery was breathtaking.",
      "A well-organized tour with amazing attention to detail. Would highly recommend to anyone.",
      "This was the highlight of my year! Every moment was carefully planned and executed.",
      "Beautiful destinations and wonderful company. The local experiences were authentic and memorable.",
      "Exceeded all expectations. The accommodation was comfortable and the food was delicious.",
    ];

    const reviewNames = [
      "Alice Johnson",
      "Bob Smith",
      "Carol Williams",
      "David Brown",
      "Eva Martinez",
    ];

    for (const tour of createdTours) {
      const numReviews = Math.floor(Math.random() * 3) + 3;
      const reviewsForTour = [];
      for (let i = 0; i < numReviews; i++) {
        const rating = Math.floor(Math.random() * 2) + 4;
        reviewsForTour.push({
          tourId: tour._id,
          userId: demoUser._id,
          userName: reviewNames[i % reviewNames.length],
          rating,
          comment: reviewTexts[i % reviewTexts.length],
        });
      }
      await Review.insertMany(reviewsForTour);

      const stats = await Review.aggregate([
        { $match: { tourId: tour._id } },
        { $group: { _id: null, avgRating: { $avg: "$rating" }, count: { $sum: 1 } } },
      ]);

      if (stats.length > 0) {
        tour.averageRating = Math.round(stats[0].avgRating * 10) / 10;
        tour.reviewCount = stats[0].count;
        await tour.save();
      }
    }
    console.log("Created reviews and updated ratings");

    // Create blog posts
    for (const post of blogPosts) {
      const blogPost = new BlogPost(post);
      await blogPost.save();
    }
    console.log(`Created ${blogPosts.length} blog posts`);

    console.log("\n✅ Seed complete!");
    console.log("   Demo User:  demo.user@wanderly.app / Demo@1234");
    console.log("   Demo Admin: demo.admin@wanderly.app / Admin@1234");

    process.exit(0);
  } catch (error) {
    console.error("❌ Seed failed:", error);
    process.exit(1);
  }
}

seed();
