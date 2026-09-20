import { getDictionary, localizePath } from "@/i18n";

// Client reviews: drives the home page ClientReviews slider, /danh-gia
// (list) and /danh-gia/[id] (detail).

export const reviews = [
  {
    id: 1,
    name: "Evelyn Hart",
    title: "D'S HOUSE",
    image: "/client-reviews/client-review-1(1).jpg",
    avatar: "/clients/client-1(1).jpg",
    review:
      "Thiết kế mang đậm dấu ấn riêng, như thể được sinh ra từ chính cách chúng tôi sống. Sự liên kết giữa các phòng, ánh sáng vào từng thời điểm trong ngày, mọi thứ đều được tính toán tỉ mỉ và rõ ràng.",
  },
  {
    id: 2,
    name: "Jonas Mercer",
    title: "Chủ khu nghỉ dưỡng",
    image: "/client-reviews/client-review-2.jpg",
    avatar: "/clients/client-2.jpg",
    review:
      "Chúng tôi mong đợi một điều đẹp đẽ, nhưng điều nhận được là một nơi đã thay đổi hoàn toàn cảm nhận của chúng tôi về sự thoải mái. Không gian rộng mở, thanh bình và hài hòa trọn vẹn.",
  },
  {
    id: 3,
    name: "Clara Voss",
    title: "Cư dân nhà phố",
    image: "/client-reviews/client-review-3.jpg",
    avatar: "/clients/client-3.jpg",
    review:
      "Mỗi vật liệu, mỗi tỷ lệ, mỗi chi tiết hoàn thiện đều có chủ đích. Không gian mang vẻ đẹp vượt thời gian khiến ngôi nhà trọn vẹn ngay từ khoảnh khắc chúng tôi bước vào.",
  },
  {
    id: 4,
    name: "Samuel Wright",
    title: "Chủ căn hộ",
    image: "/client-reviews/client-review-4.jpg",
    avatar: "/clients/client-4.jpg",
    review:
      "Từ buổi trao đổi đầu tiên đến ngày bàn giao, quy trình luôn chu đáo và chính xác. Mỗi giai đoạn đều mở ra một thiết kế vừa bất ngờ, vừa hoàn toàn phù hợp với cách chúng tôi muốn sống.",
  },
  {
    id: 5,
    name: "Isla Bennett",
    title: "Chủ dinh thự",
    image: "/client-reviews/client-review-5.jpg",
    avatar: "/clients/client-5.jpg",
    review:
      "Những gì chúng tôi có bây giờ không chỉ là một ngôi nhà. Nó mang vẻ thanh lịch trầm lắng đã thay đổi cuộc sống hằng ngày của chúng tôi. Mỗi chi tiết đều có mục đích, và toàn bộ không gian liền mạch, trọn vẹn.",
  },
];

export const reviewHref = (review, lang = "vi") =>
  localizePath(lang, `/danh-gia/${review.id}`);

export const getReviewById = (id) =>
  reviews.find((review) => String(review.id) === String(id)) ?? null;

const excerpt = (text, max = 90) =>
  text.length <= max ? text : `${text.slice(0, max).replace(/\s+\S*$/, "")}…`;

export const toReviewListItem = (review, lang = "vi") => ({
  id: review.id,
  href: reviewHref(review, lang),
  image: review.image,
  date: String(review.id).padStart(2, "0"),
  name: review.title,
  subtitle: `“${excerpt(review.review)}”`,
  meta: { image: review.avatar, value: review.name },
});

export const toReviewDetail = (review, lang = "vi") => {
  const t = getDictionary(lang).detail;
  return {
    image: review.image,
    imageAlt: review.title,
    title: review.title,
    location: review.name,
    intro: { label: t.reviewLabel, fixedLabel: true, text: `“${review.review}”` },
    meta: [
      [
        { label: t.reviewClient, fixedLabel: true, values: [review.name] },
        { label: t.reviewProject, fixedLabel: true, values: [review.title] },
      ],
    ],
    sections: [],
  };
};
