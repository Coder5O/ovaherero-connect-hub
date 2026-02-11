export interface Chapter {
  name: string;
  slug: string;
  lat: number;
  lng: number;
  region: string;
  description: string;
}

export const chapters: Chapter[] = [
  { name: "Windhoek Central", slug: "windhoek-central", lat: -22.5609, lng: 17.0658, region: "Khomas Region", description: "The capital chapter serving as the administrative heart of OTA, coordinating national events and policy across all branches." },
  { name: "Okahandja", slug: "okahandja", lat: -21.9833, lng: 16.9167, region: "Otjozondjupa Region", description: "Historic seat of Ovaherero chiefs and the location of annual commemorations honouring ancestral leaders and heritage." },
  { name: "Okakarara", slug: "okakarara", lat: -20.5833, lng: 17.4333, region: "Otjozondjupa Region", description: "A vibrant rural chapter known for its strong community involvement in cultural preservation and livestock programmes." },
  { name: "Gobabis", slug: "gobabis", lat: -22.45, lng: 18.9667, region: "Omaheke Region", description: "Gateway to the Kalahari, this chapter supports farming communities and cross-border cultural exchanges." },
  { name: "Otjiwarongo", slug: "otjiwarongo", lat: -20.4636, lng: 16.6478, region: "Otjozondjupa Region", description: "A growing urban chapter that bridges traditional governance with modern community development initiatives." },
  { name: "Aminuis", slug: "aminuis", lat: -23.7333, lng: 19.1167, region: "Omaheke Region", description: "Located deep in the Omaheke, this chapter champions rural development and cultural education for youth." },
  { name: "Ovitoto", slug: "ovitoto", lat: -21.75, lng: 16.85, region: "Otjozondjupa Region", description: "One of the earliest Ovaherero settlements, preserving deep ancestral ties and traditional practices." },
  { name: "Otjinene", slug: "otjinene", lat: -21.45, lng: 18.85, region: "Omaheke Region", description: "A resilient chapter serving scattered pastoral communities with cultural outreach and social support." },
  { name: "Omaruru", slug: "omaruru", lat: -21.4333, lng: 15.9333, region: "Erongo Region", description: "Known for its rich history, this chapter actively participates in heritage festivals and art exhibitions." },
  { name: "Karibib", slug: "karibib", lat: -21.9333, lng: 15.85, region: "Erongo Region", description: "A mining-town chapter that supports community welfare and youth education programmes." },
  { name: "Outjo", slug: "outjo", lat: -20.1167, lng: 16.15, region: "Kunene Region", description: "Gateway to Etosha, this chapter promotes eco-tourism and environmental stewardship among members." },
  { name: "Kalkfeld", slug: "kalkfeld", lat: -20.8833, lng: 16.2, region: "Otjozondjupa Region", description: "A farming community chapter focused on livestock management and traditional land-use practices." },
  { name: "Grootfontein", slug: "grootfontein", lat: -19.5667, lng: 18.1167, region: "Otjozondjupa Region", description: "Northern hub chapter coordinating cultural events and community development across the region." },
  { name: "Tsumeb", slug: "tsumeb", lat: -19.2333, lng: 17.7167, region: "Oshikoto Region", description: "A mining-heritage chapter that supports education bursaries and skills training for youth." },
  { name: "Otavi", slug: "otavi", lat: -19.65, lng: 17.3333, region: "Otjozondjupa Region", description: "Agricultural heartland chapter promoting sustainable farming and community solidarity." },
  { name: "Waterberg", slug: "waterberg", lat: -20.5, lng: 17.25, region: "Otjozondjupa Region", description: "Located near the historic Waterberg plateau, this chapter preserves the memory of the 1904 battle and its significance." },
  { name: "Epukiro", slug: "epukiro", lat: -22.35, lng: 19.5, region: "Omaheke Region", description: "One of the largest communal areas, this chapter supports pastoral livelihoods and traditional governance." },
  { name: "Eiseb", slug: "eiseb", lat: -21.6, lng: 19.8, region: "Omaheke Region", description: "A remote chapter ensuring cultural continuity in one of the most isolated areas of eastern Namibia." },
  { name: "Tallismanus", slug: "tallismanus", lat: -23.25, lng: 19.05, region: "Omaheke Region", description: "Serving communities in the deep south-east, this chapter focuses on education and welfare." },
  { name: "Leonardville", slug: "leonardville", lat: -22.7, lng: 18.75, region: "Omaheke Region", description: "A chapter that brings together farming families for cultural events and mutual support." },
  { name: "Witvlei", slug: "witvlei", lat: -22.4, lng: 18.5, region: "Omaheke Region", description: "Crossroads chapter connecting communities along the Trans-Kalahari corridor." },
  { name: "Steinhausen", slug: "steinhausen", lat: -22.3, lng: 18.35, region: "Omaheke Region", description: "A tight-knit chapter known for strong community bonds and collective farming initiatives." },
  { name: "Hochfeld", slug: "hochfeld", lat: -21.1, lng: 16.7, region: "Otjozondjupa Region", description: "Agricultural chapter supporting emerging farmers and youth development programmes." },
  { name: "Wilhelmstal", slug: "wilhelmstal", lat: -22.05, lng: 16.95, region: "Otjozondjupa Region", description: "A scenic highland chapter preserving Ovaherero traditions in central Namibia." },
  { name: "Usakos", slug: "usakos", lat: -21.9833, lng: 15.6, region: "Erongo Region", description: "Railway-town chapter with a strong focus on heritage preservation and community welfare." },
  { name: "Swakopmund", slug: "swakopmund", lat: -22.6833, lng: 14.5333, region: "Erongo Region", description: "Coastal chapter that bridges urban life with traditional values, hosting cultural festivals by the sea." },
  { name: "Walvis Bay", slug: "walvis-bay", lat: -22.9575, lng: 14.5053, region: "Erongo Region", description: "Port-city chapter supporting the coastal Ovaherero community through social and cultural programmes." },
  { name: "Rehoboth", slug: "rehoboth", lat: -23.3167, lng: 17.0833, region: "Hardap Region", description: "Southern gateway chapter promoting inter-community dialogue and cultural understanding." },
  { name: "Mariental", slug: "mariental", lat: -24.6333, lng: 17.9667, region: "Hardap Region", description: "The southernmost chapter, serving Ovaherero families in the Hardap region with community programmes." },
  { name: "Opuwo", slug: "opuwo", lat: -18.0611, lng: 13.8389, region: "Kunene Region", description: "Far-north chapter connecting with Himba and Herero communities in the rugged Kunene landscape." },
  { name: "Kamanjab", slug: "kamanjab", lat: -19.6333, lng: 14.8333, region: "Kunene Region", description: "A chapter at the edge of Damaraland, supporting pastoral livelihoods and traditional ceremonies." },
  { name: "Khorixas", slug: "khorixas", lat: -20.3667, lng: 14.9667, region: "Kunene Region", description: "Heritage-rich chapter near ancient rock engravings, blending ancestral history with modern community life." },
  { name: "Fransfontein", slug: "fransfontein", lat: -20.1333, lng: 14.6, region: "Kunene Region", description: "A small but dedicated chapter preserving Ovaherero identity in western Namibia." },
  { name: "Sesfontein", slug: "sesfontein", lat: -19.1333, lng: 13.6167, region: "Kunene Region", description: "Remote north-western chapter maintaining cultural traditions in one of Namibia's most scenic areas." },
  { name: "Otjimbingwe", slug: "otjimbingwe", lat: -22.35, lng: 16.1333, region: "Erongo Region", description: "Historic mission station and former Ovaherero capital, rich with cultural and political significance." },
];

export function getChapterBySlug(slug: string): Chapter | undefined {
  return chapters.find((ch) => ch.slug === slug);
}
