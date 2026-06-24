import dest1 from "@/assets/dest-1.jpg";
import dest2 from "@/assets/dest-2.jpg";
import dest3 from "@/assets/dest-3.jpg";
import dest4 from "@/assets/dest-4.jpg";
import dest5 from "@/assets/dest-5.jpg";
import dest6 from "@/assets/dest-6.jpg";

export type Destination = {
  id: string;
  name: string;
  location: string;
  country: string;
  image: string;
  match: number;
  cost: number;
  crowd: number; // 0-100, lower = quieter
  safety: number; // 0-100
  bookingProb: number;
  description: string;
  tags: string[];
  category: "beach" | "mountain" | "city" | "nature" | "heritage" | "desert";
  hidden?: boolean;
};

export const destinations: Destination[] = [
  {
    id: "varkala",
    name: "Varkala Cliffs",
    location: "Kerala",
    country: "India",
    image: dest1,
    match: 96,
    cost: 12400,
    crowd: 32,
    safety: 88,
    bookingProb: 0.82,
    description: "Dramatic red cliffs meeting the Arabian Sea — quieter than Goa, with cinematic sunsets.",
    tags: ["Beach", "Romantic", "Sunset", "Budget"],
    category: "beach",
  },
  {
    id: "spiti",
    name: "Spiti Valley",
    location: "Himachal Pradesh",
    country: "India",
    image: dest2,
    match: 91,
    cost: 22800,
    crowd: 18,
    safety: 76,
    bookingProb: 0.61,
    description: "High-altitude cold desert with monasteries, fossil villages, and surreal night skies.",
    tags: ["Mountain", "Adventure", "Solo", "Stargazing"],
    category: "mountain",
  },
  {
    id: "hampi",
    name: "Hampi Ruins",
    location: "Karnataka",
    country: "India",
    image: dest3,
    match: 88,
    cost: 9600,
    crowd: 45,
    safety: 84,
    bookingProb: 0.74,
    description: "A UNESCO heritage landscape of boulders, temples and timeworn bazaars.",
    tags: ["Heritage", "Photography", "Culture"],
    category: "heritage",
  },
  {
    id: "singapore",
    name: "Singapore",
    location: "Marina Bay",
    country: "Singapore",
    image: dest4,
    match: 84,
    cost: 78400,
    crowd: 72,
    safety: 96,
    bookingProb: 0.69,
    description: "Skyline, hawker streets and gardens engineered to delight — a polished urban escape.",
    tags: ["City", "Family", "Food", "Luxury"],
    category: "city",
  },
  {
    id: "agumbe",
    name: "Agumbe Rainforest",
    location: "Karnataka",
    country: "India",
    image: dest5,
    match: 93,
    cost: 7200,
    crowd: 12,
    safety: 78,
    bookingProb: 0.58,
    description: "Mist-wrapped Western Ghats hideaway with hidden waterfalls and king cobras.",
    tags: ["Nature", "Hidden Gem", "Monsoon"],
    category: "nature",
    hidden: true,
  },
  {
    id: "jaisalmer",
    name: "Jaisalmer Dunes",
    location: "Rajasthan",
    country: "India",
    image: dest6,
    match: 86,
    cost: 16500,
    crowd: 40,
    safety: 82,
    bookingProb: 0.71,
    description: "Golden fort city giving way to wind-sculpted dunes and candlelit camp dinners.",
    tags: ["Desert", "Heritage", "Romantic"],
    category: "desert",
  },
];

export const hiddenGems: Destination[] = [
  destinations[4],
  {
    ...destinations[1],
    id: "pin-valley",
    name: "Pin Valley",
    location: "Spiti, Himachal",
    match: 89,
    cost: 18900,
    crowd: 8,
    description: "A snow leopard refuge hidden behind Spiti — almost nobody goes here in October.",
    tags: ["Hidden Gem", "Wildlife", "Off-grid"],
    hidden: true,
  },
  {
    ...destinations[0],
    id: "kannur",
    name: "Kannur Beaches",
    location: "North Kerala",
    match: 87,
    cost: 8400,
    crowd: 15,
    description: "Empty palm-fringed coves where local fishermen still outnumber tourists.",
    tags: ["Beach", "Hidden Gem", "Local"],
    hidden: true,
  },
];

export const costTrend = [
  { month: "Jan", domestic: 9800, intl: 42000 },
  { month: "Feb", domestic: 10400, intl: 41200 },
  { month: "Mar", domestic: 11800, intl: 45600 },
  { month: "Apr", domestic: 13200, intl: 52000 },
  { month: "May", domestic: 14600, intl: 61000 },
  { month: "Jun", domestic: 12200, intl: 58400 },
  { month: "Jul", domestic: 11400, intl: 54200 },
  { month: "Aug", domestic: 12800, intl: 56600 },
  { month: "Sep", domestic: 11200, intl: 49800 },
  { month: "Oct", domestic: 13800, intl: 53400 },
  { month: "Nov", domestic: 15400, intl: 61200 },
  { month: "Dec", domestic: 18200, intl: 72400 },
];

export const segmentation = [
  { name: "Explorer", value: 34 },
  { name: "Luxury", value: 18 },
  { name: "Backpacker", value: 22 },
  { name: "Family", value: 16 },
  { name: "Business", value: 10 },
];

export const bookingProbabilityData = [
  { day: "Mon", prob: 0.42 },
  { day: "Tue", prob: 0.48 },
  { day: "Wed", prob: 0.55 },
  { day: "Thu", prob: 0.61 },
  { day: "Fri", prob: 0.74 },
  { day: "Sat", prob: 0.82 },
  { day: "Sun", prob: 0.69 },
];

export const popularity = destinations.slice(0, 6).map((d) => ({
  name: d.name.split(" ")[0],
  views: Math.round(d.match * 18 + Math.random() * 200),
}));

export const itineraryDays = [
  {
    day: 1,
    title: "Arrival & coastal sunset",
    items: [
      { time: "10:30", kind: "transport", title: "Flight to Trivandrum", cost: 4200 },
      { time: "13:00", kind: "hotel", title: "Check-in: Cliffside Boutique", cost: 3800 },
      { time: "17:00", kind: "activity", title: "Sunset walk on Varkala cliff", cost: 0 },
      { time: "20:00", kind: "food", title: "Dinner at Trattorias", cost: 900 },
    ],
  },
  {
    day: 2,
    title: "Hidden coves & ayurveda",
    items: [
      { time: "08:00", kind: "activity", title: "Kappil backwater kayak", cost: 1200 },
      { time: "13:00", kind: "food", title: "Local thali lunch", cost: 350 },
      { time: "16:00", kind: "activity", title: "Ayurvedic massage", cost: 2200 },
    ],
  },
  {
    day: 3,
    title: "Heritage & return",
    items: [
      { time: "09:00", kind: "activity", title: "Anjengo Fort tour", cost: 200 },
      { time: "14:00", kind: "transport", title: "Return flight", cost: 4200 },
    ],
  },
];

export const safetyAlerts = [
  { kind: "weather", level: "low", text: "Light coastal showers expected Saturday evening." },
  { kind: "crowd", level: "medium", text: "High footfall at North Cliff between 5–7pm." },
  { kind: "night", level: "low", text: "Well-lit promenade until 11pm. Standard precautions advised." },
];

export const emergencyContacts = [
  { label: "Tourist Police", number: "1363", type: "police" },
  { label: "Ambulance", number: "108", type: "medical" },
  { label: "Women Helpline", number: "1091", type: "support" },
  { label: "Local Embassy Desk", number: "+91 471 233 0103", type: "support" },
];
