// Projects: drives /spaces (list) and /spaces/[id] (detail). `detail` is
// optional; without it the detail page shows the hero built from list fields.

export const spacesListing = {
  title: "Timeless Spaces",
  filters: ["All", "Residential", "Commercial", "Hospitality"],
};

export const spaces = [
  {
    id: 1,
    categories: ["Residential Architecture", "Retreat Wellness"],
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
          { label: "Date Completed", values: ["2021"] },
          {
            label: "Project Type",
            values: ["Residential Architecture", "Retreat Wellness"],
          },
        ],
        [
          {
            label: "Collaborators",
            values: ["Atelier Forma", "LX Stoneworks", "Studio Maré"],
          },
          { label: "Photography", values: ["Atelier Forma", "Inês Almeida"] },
        ],
      ],
      sections: [
        {
          blocks: [
            {
              label: "Architectural Story",
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
                    label: "Atmosphere",
                    values: ["Calm", "Softened acoustics", "Filtered light"],
                  },
                  {
                    label: "Flow",
                    values: ["Passages", "Guided movement", "Rhythmic"],
                  },
                ],
                [
                  {
                    label: "Materials",
                    values: [
                      "Lime plaster walls",
                      "Local stone flooring",
                      "Timber inlays",
                    ],
                  },
                  {
                    label: "Natural Elements",
                    values: [
                      "Court planting",
                      "Daylight wells",
                      "Cross ventilation",
                    ],
                  },
                ],
              ],
              image: {
                src: "/sample-space/sample-space-2.jpg",
                alt: "Nội thất và ánh sáng tại LAMHA’s Villa",
              },
              closing:
                "Every choice within the residence was guided by sensory experience. The aim was not only to frame views but to shape how sound, touch, and temperature are felt as one moves through the home.",
            },
          ],
        },
      ],
    },
  },
  {
    id: 2,
    categories: ["Home", "Cultural"],
    image: "/spaces/space-2.jpg",
    date: "May 15, 2021",
    name: "Sanctum Hall",
    location: "Morocco, Marrakesh",
    clientImage: "/spaces/client-2.jpeg",
    clientName: "Alex Chen",
  },
  {
    id: 3,
    categories: ["Home", "Gallery"],
    image: "/spaces/space-3.jpg",
    date: "April 22, 2021",
    name: "Arcade Residence",
    location: "Portugal, Lisbon",
    clientImage: "/spaces/client-3.jpeg",
    clientName: "Sophia Rodriguez",
  },
  {
    id: 4,
    categories: ["Gallery", "Cultural"],
    image: "/spaces/space-4.jpg",
    date: "March 8, 2021",
    name: "Atrium Gallery",
    location: "Austria, Vienna",
    clientImage: "/spaces/client-4.jpeg",
    clientName: "David Kim",
  },
  {
    id: 5,
    categories: ["Home", "Retreat"],
    image: "/spaces/space-5.jpg",
    date: "February 14, 2021",
    name: "Mountain Retreat",
    location: "Switzerland, Zurich",
    clientImage: "/spaces/client-5.jpeg",
    clientName: "Emma Wilson",
  },
  {
    id: 6,
    categories: ["Cultural", "Home"],
    image: "/spaces/space-6.jpg",
    date: "January 30, 2021",
    name: "Horizon Pavilion",
    location: "Japan, Kyoto",
    clientImage: "/spaces/client-6.jpeg",
    clientName: "Aiko Tanaka",
  },
  {
    id: 7,
    categories: ["Wellness", "Retreat", "Gallery"],
    image: "/spaces/space-7.jpg",
    date: "December 12, 2020",
    name: "Lumen Spa",
    location: "UAE, Dubai",
    clientImage: "/spaces/client-7.jpeg",
    clientName: "Omar Rahman",
  },
];

export const spaceHref = (space) => `/spaces/${space.id}`;

export const getSpaceById = (id) =>
  spaces.find((space) => String(space.id) === String(id)) ?? null;

export const toSpaceListItem = (space) => ({
  id: space.id,
  href: spaceHref(space),
  image: space.image,
  date: space.date,
  name: space.name,
  subtitle: space.location,
  meta: { image: space.clientImage, value: space.clientName },
});

export const toSpaceDetail = (space) => {
  const detail = space.detail ?? {};
  return {
    image: detail.heroImage ?? space.image,
    imageAlt: space.name,
    title: space.name,
    location: detail.location ?? space.location,
    country: detail.country,
    intro: detail.intro,
    meta: detail.meta ?? [
      [
        { label: "Date Completed", values: [space.date] },
        { label: "Project Type", values: space.categories },
      ],
      [{ label: "Client", values: [space.clientName] }],
    ],
    sections: detail.sections ?? [],
    cta: detail.cta,
  };
};
