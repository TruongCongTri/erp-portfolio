import { getDictionary, localizePath } from "@/i18n";
import { formatDate } from "@/lib/format";

// Job openings: drives /tuyen-dung (list), /tuyen-dung/[id] (detail) and the
// application form. `detail` is optional; without it the detail page shows
// the hero built from the list fields plus the application form.

export const jobs = [
  {
    id: 1,
    categories: ["Kỹ Sư", "Xây Dựng"],
    image: "/spaces/space-1.jpg",
    date: "2026-06-10",
    name: "Kỹ Sư Xây Dựng",
    location: "TP. Đồng Nai",
    quantity: "05",
    validThrough: "2026-12-31",
    detail: {
      heroImage: "/sample-hiring/hero.png",
      location: "Thành phố Đồng Nai",
      country: "Việt Nam",
      summary:
        "Chính Nam tuyển 05 Kỹ sư Xây dựng tại TP. Đồng Nai: tốt nghiệp Đại học chuyên ngành xây dựng dân dụng, trên 1 năm kinh nghiệm. Hạn ứng tuyển 31/12/2026.",
      intro: {
        label: "Mô tả công việc:",
        text: "Làm việc trực tiếp tại các công trình; phối hợp với các phòng ban của công ty, các tổ đội thi công tại công trình thực hiện tổ chức thi công xây dựng công trình từ phần thô cho đến hoàn thiện theo Quy trình phối hợp, quy trình chi tiết kỹ thuật đã được công ty phê duyệt, ban hành. Báo cáo công việc hằng ngày, kiểm tra giao nhận vật tư trên công trường và các công việc khác theo các biểu mẫu đã được cty phê duyệt, ban hành. Thực hiện các yêu cầu khác theo sự phân công của cấp trên.",
      },
      meta: [
        [
          { label: "Thời hạn ứng tuyển:", values: ["31/12/2026"] },
          { label: "Số lượng:", values: ["05"] },
          {
            label: "Trình độ học vấn:",
            values: [
              "Tốt nghiệp Đại học",
              "Chuyên ngành Kỹ sư xây dựng dân dụng hoặc các chuyên ngành liên quan",
            ],
          },
        ],
        [
          { label: "Hình thức làm việc:", values: ["Nhân viên chính thức"] },
          { label: "Thời gian thử việc:", values: ["2 tháng"] },
        ],
      ],
      sections: [
        {
          blocks: [
            {
              label: "Yêu cầu:",
              paragraphs: [
                "Tốt nghiệp Đại học chuyên ngành kỹ sư xây dựng dân dụng, công nghiệp. Kinh nghiệm: trên 1 năm kinh nghiệm về xây dựng dân dụng, công nghiệp. Yêu thích nghề xây dựng, trung thực, cầu tiến, chịu học hỏi, nhiệt huyết; Đọc hiểu bản vẽ kỹ thuật công trình dân dụng và công nghiệp; Sử dụng các phần mềm cơ bản phục vụ cho công việc.",
              ],
              image: {
                src: "/sample-space/sample-space-1.jpg",
                alt: "Kỹ sư Chính Nam tại công trình",
              },
            },
            {
              label: "Quyền lợi:",
              paragraphs: [
                "Được đào tạo chuyên môn và các kỹ năng tổ chức, quản lý, phát triển cá nhân. Được thưởng lễ, tết & được nghỉ lễ, tết theo lịch nhà nước. Được hưởng đầy đủ BHXH, BHYT, BHTN. Môi trường làm việc kỷ luật, trách nhiệm, trung thực, đoàn kết và sáng tạo. Cơ hội thăng tiến trong công việc là không giới hạn và không phụ thuộc thời gian. Được làm việc cùng những người lãnh đạo yêu nghề, nhiều kinh nghiệm, quyết liệt, kỷ luật, trách nhiệm và luôn sẵn sàng chia sẻ kinh nghiệm, kiến thức, kỹ năng phát triển.",
              ],
              image: {
                src: "/sample-space/sample-space-1.jpg",
                alt: "Môi trường làm việc tại Chính Nam",
              },
            },
          ],
        },
        {
          blocks: [
            {
              label: "Văn phòng Công ty:",
              meta: [
                [
                  {
                    label: "Văn phòng Đồng Nai",
                    values: [
                      "C18,C19, C20, đường N4, khu phố Tân Lại, phường Trấn Biên, TP. Đồng Nai",
                    ],
                  },
                ],
              ],
            },
            {
              label: "Thông tin ứng tuyển:",
              meta: [
                [
                  { label: "Gửi CV qua email", values: ["talent@chinhnambkd.vn"] },
                  {
                    label: "Thông tin liên hệ",
                    values: ["0937 546 739 (BP Tuyển dụng)"],
                  },
                ],
              ],
              image: {
                src: "/sample-space/sample-space-2.jpg",
                alt: "Đội ngũ Chính Nam",
              },
              closing:
                "Hãy gia nhập Chính Nam để cùng kiến tạo những công trình chất lượng và bền vững!",
            },
          ],
        },
      ],
      cta: {
        img: "/sample-space/next-project.jpg",
        header: "Kiến Trúc Sư",
        callout: "Kiến tạo sự tĩnh tại và rõ ràng",
        description:
          "Một nghiên cứu về sự tiết chế và cộng hưởng, nơi vật liệu, ánh sáng và bố cục hòa quyện để mời gọi sự tĩnh lặng.",
      },
    },
  },
  {
    id: 2,
    categories: ["Nhà ở", "Văn hóa"],
    image: "/spaces/space-2.jpg",
    date: "2021-05-15",
    name: "Hội trường Sanctum",
    location: "Marrakesh, Ma-rốc",
    quantity: "05",
  },
  {
    id: 3,
    categories: ["Nhà ở", "Phòng trưng bày"],
    image: "/spaces/space-3.jpg",
    date: "2021-04-22",
    name: "Dinh thự Arcade",
    location: "Lisbon, Bồ Đào Nha",
    quantity: "05",
  },
  {
    id: 4,
    categories: ["Phòng trưng bày", "Văn hóa"],
    image: "/spaces/space-4.jpg",
    date: "2021-03-08",
    name: "Phòng trưng bày Atrium",
    location: "Vienna, Áo",
    quantity: "05",
  },
  {
    id: 5,
    categories: ["Nhà ở", "Nghỉ dưỡng"],
    image: "/spaces/space-5.jpg",
    date: "2021-02-14",
    name: "Khu nghỉ dưỡng trên núi",
    location: "Zurich, Thụy Sĩ",
    quantity: "05",
  },
  {
    id: 6,
    categories: ["Văn hóa", "Nhà ở"],
    image: "/spaces/space-6.jpg",
    date: "2021-01-30",
    name: "Đình Chân Trời",
    location: "Kyoto, Nhật Bản",
    quantity: "05",
  },
  {
    id: 7,
    categories: ["Chăm sóc sức khỏe", "Nghỉ dưỡng", "Phòng trưng bày"],
    image: "/spaces/space-7.jpg",
    date: "2020-12-12",
    name: "Khu spa Lumen",
    location: "Dubai, UAE",
    quantity: "05",
  },
];

export const jobHref = (job, lang = "vi") => localizePath(lang, `/tuyen-dung/${job.id}`);

export const getJobById = (id) =>
  jobs.find((job) => String(job.id) === String(id)) ?? null;

export const toJobListItem = (job, lang = "vi") => ({
  id: job.id,
  href: jobHref(job, lang),
  image: job.image,
  date: formatDate(job.date),
  name: job.name,
  subtitle: job.location,
  meta: { label: getDictionary(lang).listing.quantity, value: job.quantity },
});

export const toJobDetail = (job, lang = "vi") => {
  const t = getDictionary(lang).detail;
  const detail = job.detail ?? {};
  return {
    image: detail.heroImage ?? job.image,
    imageAlt: job.name,
    title: job.name,
    location: detail.location ?? job.location,
    country: detail.country,
    intro: detail.intro,
    // Fallback rows pair dictionary labels (fixed) with data values.
    meta: detail.meta ?? [
      [
        { label: t.quantity, fixedLabel: true, values: [job.quantity] },
        { label: t.posted, fixedLabel: true, values: [formatDate(job.date)] },
      ],
    ],
    sections: detail.sections ?? [],
    cta: detail.cta,
  };
};
