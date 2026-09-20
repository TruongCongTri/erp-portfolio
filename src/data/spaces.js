import { getDictionary, localizePath } from "@/i18n";
import { formatDate } from "@/lib/format";

// Projects: drives /du-an (list) and /du-an/[id] (detail). `detail` is
// optional; without it the detail page shows the hero built from list fields.

export const spaces = [
  {
    id: 1,
    categories: ["Kiến trúc nhà ở", "Nghỉ dưỡng & chăm sóc sức khỏe"],
    image: "/spaces/space-1.jpg",
    date: "2021",
    name: "VIL54: LAMHA’S Villa",
    location: "Lâm Đồng, Việt Nam",
    clientImage: "/spaces/client-1.jpeg",
    clientName: "Marina Li",
    detail: {
      heroImage: "/sample-space/hero.jpg",
      location: "Lâm Đồng",
      country: "Việt Nam",
      summary:
        "LAMHA’s Villa tại Lâm Đồng - biệt thự Tân cổ điển do Chính Nam thiết kế và thi công, hòa quyện giữa kiến trúc sang trọng và thiên nhiên cao nguyên.",
      intro: {
        text: "Nét đẹp đẳng cấp, vượt thời gian giữa thiên nhiên Lâm Đồng",
      },
      meta: [
        [
          { label: "Năm hoàn thành", values: ["2021"] },
          {
            label: "Loại hình",
            values: ["Kiến trúc nhà ở", "Nghỉ dưỡng & chăm sóc sức khỏe"],
          },
        ],
        [
          {
            label: "Đơn vị phối hợp",
            values: ["Atelier Forma", "LX Stoneworks", "Studio Maré"],
          },
          { label: "Nhiếp ảnh", values: ["Atelier Forma", "Inês Almeida"] },
        ],
      ],
      sections: [
        {
          blocks: [
            {
              label: "Câu chuyện kiến trúc",
              paragraphs: [
                "Giữa vùng đất Lâm Đồng trong lành, LAMHA’s Villa được ví như một bản hòa ca của kiến trúc và thiên nhiên. Bao quanh bởi cây xanh, nắng vàng và khí trời dịu mát, công trình mang lại cảm giác tĩnh tại, thư thái, nơi con người tìm thấy sự cân bằng sau những ngày bận rộn.",
                "Từ tổng thể đến từng chi tiết, biệt thự đều toát lên tinh thần sang trọng và chuẩn mực. Chính Nam đã khéo léo kiến tạo nên một không gian vừa mang dấu ấn thẩm mỹ châu Âu, vừa giữ được vẻ gần gũi, hòa hợp với cảnh quan vùng cao nguyên.",
              ],
              image: {
                src: "/sample-space/sample-space-1.jpg",
                alt: "LAMHA’s Villa giữa thiên nhiên Lâm Đồng",
              },
            },
          ],
        },
        {
          blocks: [
            {
              label:
                "Kiến trúc Tân cổ điển – tinh tế và bền vững cùng thời gian",
              meta: [
                [
                  {
                    label: "Không khí",
                    values: ["Tĩnh lặng", "Âm thanh dịu nhẹ", "Ánh sáng được lọc"],
                  },
                  {
                    label: "Dòng chảy",
                    values: ["Lối đi", "Chuyển động có định hướng", "Nhịp điệu"],
                  },
                ],
                [
                  {
                    label: "Vật liệu",
                    values: [
                      "Tường vữa vôi",
                      "Sàn đá địa phương",
                      "Chi tiết khảm gỗ",
                    ],
                  },
                  {
                    label: "Yếu tố tự nhiên",
                    values: [
                      "Cây xanh sân trong",
                      "Giếng trời",
                      "Thông gió chéo",
                    ],
                  },
                ],
              ],
              image: {
                src: "/sample-space/sample-space-2.jpg",
                alt: "Nội thất và ánh sáng tại LAMHA’s Villa",
              },
              closing:
                "Mọi lựa chọn trong ngôi nhà đều xuất phát từ trải nghiệm giác quan. Mục tiêu không chỉ là đóng khung những khung cảnh đẹp, mà còn định hình cách âm thanh, xúc giác và nhiệt độ được cảm nhận khi di chuyển trong ngôi nhà.",
            },
          ],
        },
      ],
    },
  },
  {
    id: 2,
    categories: ["Nhà ở", "Văn hóa"],
    image: "/spaces/space-2.jpg",
    date: "2021-05-15",
    name: "Hội trường Sanctum",
    location: "Marrakesh, Ma-rốc",
    clientImage: "/spaces/client-2.jpeg",
    clientName: "Alex Chen",
  },
  {
    id: 3,
    categories: ["Nhà ở", "Phòng trưng bày"],
    image: "/spaces/space-3.jpg",
    date: "2021-04-22",
    name: "Dinh thự Arcade",
    location: "Lisbon, Bồ Đào Nha",
    clientImage: "/spaces/client-3.jpeg",
    clientName: "Sophia Rodriguez",
  },
  {
    id: 4,
    categories: ["Phòng trưng bày", "Văn hóa"],
    image: "/spaces/space-4.jpg",
    date: "2021-03-08",
    name: "Phòng trưng bày Atrium",
    location: "Vienna, Áo",
    clientImage: "/spaces/client-4.jpeg",
    clientName: "David Kim",
  },
  {
    id: 5,
    categories: ["Nhà ở", "Nghỉ dưỡng"],
    image: "/spaces/space-5.jpg",
    date: "2021-02-14",
    name: "Khu nghỉ dưỡng trên núi",
    location: "Zurich, Thụy Sĩ",
    clientImage: "/spaces/client-5.jpeg",
    clientName: "Emma Wilson",
  },
  {
    id: 6,
    categories: ["Văn hóa", "Nhà ở"],
    image: "/spaces/space-6.jpg",
    date: "2021-01-30",
    name: "Đình Chân Trời",
    location: "Kyoto, Nhật Bản",
    clientImage: "/spaces/client-6.jpeg",
    clientName: "Aiko Tanaka",
  },
  {
    id: 7,
    categories: ["Chăm sóc sức khỏe", "Nghỉ dưỡng", "Phòng trưng bày"],
    image: "/spaces/space-7.jpg",
    date: "2020-12-12",
    name: "Khu spa Lumen",
    location: "Dubai, UAE",
    clientImage: "/spaces/client-7.jpeg",
    clientName: "Omar Rahman",
  },
];

export const spaceHref = (space, lang = "vi") =>
  localizePath(lang, `/du-an/${space.id}`);

export const getSpaceById = (id) =>
  spaces.find((space) => String(space.id) === String(id)) ?? null;

export const toSpaceListItem = (space, lang = "vi") => ({
  id: space.id,
  href: spaceHref(space, lang),
  image: space.image,
  date: formatDate(space.date),
  name: space.name,
  subtitle: space.location,
  meta: { image: space.clientImage, value: space.clientName },
});

export const toSpaceDetail = (space, lang = "vi") => {
  const t = getDictionary(lang).detail;
  const detail = space.detail ?? {};
  return {
    image: detail.heroImage ?? space.image,
    imageAlt: space.name,
    title: space.name,
    location: detail.location ?? space.location,
    country: detail.country,
    intro: detail.intro,
    // Fallback rows pair dictionary labels (fixed) with data values.
    meta: detail.meta ?? [
      [
        { label: t.completed, fixedLabel: true, values: [formatDate(space.date)] },
        { label: t.projectType, fixedLabel: true, values: space.categories },
      ],
      [{ label: t.client, fixedLabel: true, values: [space.clientName] }],
    ],
    sections: detail.sections ?? [],
    cta: detail.cta,
  };
};
