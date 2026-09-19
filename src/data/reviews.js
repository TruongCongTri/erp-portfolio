// Client reviews: drives the home page ClientReviews slider, /reviews (list)
// and /reviews/[id] (detail).

export const reviewsListing = {
  kicker: "Đánh giá của",
  title: "Khách hàng",
};

export const reviews = [
  {
    id: 1,
    name: "Evelyn Hart",
    title: "D'S HOUSE",
    image: "/client-reviews/client-review-1(1).jpg",
    avatar: "/clients/client-1(1).jpg",
    review:
      "The design feels deeply personal, as if it grew from the way we live. The flow of each room, the light at different hours, everything was thought through with remarkable care and clarity.",
  },
  {
    id: 2,
    name: "Jonas Mercer",
    title: "Retreat Host",
    image: "/client-reviews/client-review-2.jpg",
    avatar: "/clients/client-2.jpg",
    review:
      "We expected something beautiful, but what we received was a place that completely reshaped our sense of comfort. It feels open, serene, and in perfect conversation.",
  },
  {
    id: 3,
    name: "Clara Voss",
    title: "Townhouse Resident",
    image: "/client-reviews/client-review-3.jpg",
    avatar: "/clients/client-3.jpg",
    review:
      "Every material, every proportion, every finish feels intentional. The spaces carry a timeless quality that makes the home feel complete from the moment we stepped inside.",
  },
  {
    id: 4,
    name: "Samuel Wright",
    title: "Apartment Owner",
    image: "/client-reviews/client-review-4.jpg",
    avatar: "/clients/client-4.jpg",
    review:
      "From first conversation to final delivery, the process was thoughtful and exact. Each stage revealed a design that was both surprising and completely aligned with how we wanted to live.",
  },
  {
    id: 5,
    name: "Isla Bennett",
    title: "Estate Owner",
    image: "/client-reviews/client-review-5.jpg",
    avatar: "/clients/client-5.jpg",
    review:
      "What we have now feels more than just a home. It carries a quiet elegance that has transformed our daily life. Every detail has purpose, and the whole space feels seamless and resolved.",
  },
];

export const reviewHref = (review) => `/reviews/${review.id}`;

export const getReviewById = (id) =>
  reviews.find((review) => String(review.id) === String(id)) ?? null;

const excerpt = (text, max = 90) =>
  text.length <= max ? text : `${text.slice(0, max).replace(/\s+\S*$/, "")}…`;

export const toReviewListItem = (review) => ({
  id: review.id,
  href: reviewHref(review),
  image: review.image,
  date: String(review.id).padStart(2, "0"),
  name: review.title,
  subtitle: `“${excerpt(review.review)}”`,
  meta: { image: review.avatar, value: review.name },
});

export const toReviewDetail = (review) => ({
  image: review.image,
  imageAlt: review.title,
  title: review.title,
  location: review.name,
  intro: { label: "Đánh giá của khách hàng:", text: `“${review.review}”` },
  meta: [
    [
      { label: "Khách hàng", values: [review.name] },
      { label: "Công trình", values: [review.title] },
    ],
  ],
  sections: [],
});
