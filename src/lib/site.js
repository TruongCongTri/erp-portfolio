import { localizePath } from "@/i18n";

export const siteConfig = {
  name: "Chính Nam",
  legalName: "Công ty Cổ phần Thiết kế Xây dựng Chính Nam",
  tagline: "Xây dựng ngôi nhà hạnh phúc",
  description:
    "Chính Nam - Công ty Cổ phần Thiết kế Xây dựng: thiết kế và thi công biệt thự, dinh thự, nhà phố, resort, nhà hàng, khách sạn, văn phòng tại Đồng Nai, TP. Hồ Chí Minh và toàn quốc.",
  url: (process.env.NEXT_PUBLIC_SITE_URL || "https://chinhnambkd.vn").replace(
    /\/$/,
    ""
  ),
  locale: "vi_VN",
  email: "info@chinhnambkd.vn",
  phone: "+84944454199",
  taxId: "3602976394",
  foundingDate: "2012-11-22",
  // Offices, phones and the map embed, shared by the footer, the menu and
  // the contact page. Addresses stay in Vietnamese in both languages.
  contact: {
    phones: ["0944 454 199", "(0251) 7 301 139"],
    email: "info@chinhnambkd.vn",
    taxId: "3602976394",
    offices: [
      {
        key: "headquarters",
        lines: [
          "255/56T Nguyễn Văn Tiên, khu phố 11A,",
          "phường Tân Triều, TP. Đồng Nai.",
        ],
      },
      {
        key: "dongNai",
        lines: [
          "C18,19,20, Khu phố Tân Lại, đường N4,",
          "phường Trấn Biên, TP. Đồng Nai.",
        ],
      },
      {
        key: "hcm",
        lines: ["Số 109, đường N2,", "phường Bình Trưng, TP. Hồ Chí Minh."],
      },
    ],
    mapEmbed:
      "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3917.090316054781!2d106.8029969!3d10.9565501!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3174d9005062b865%3A0x6010b0e70fa6bd2a!2zQ8OUTkcgVFkgWMOCWSBE4buwTkcgQ0jDjU5IIE5BTQ!5e0!3m2!1svi!2s!4v1789920138452!5m2!1svi!2s",
  },
  ogImage: "/home/hero(1).jpg",
  logo: "/logos/chinhnam-logo-symbol.png",
};

export const routes = [
  { path: "/", priority: 1 },
  { path: "/gioi-thieu", priority: 0.8 },
  { path: "/du-an", priority: 0.8 },
  { path: "/thu-vien", priority: 0.6 },
  { path: "/tuyen-dung", priority: 0.7 },
  { path: "/danh-gia", priority: 0.6 },
  { path: "/lien-he", priority: 0.8 },
];

// Builds per-page metadata so each route has its own title, description,
// canonical URL, language alternates (hreflang) and social preview.
// `path` is the language-neutral path ("/gioi-thieu").
export function pageMetadata({ lang = "vi", title, description, path, image }) {
  const ogImage = image || siteConfig.ogImage;
  const url = localizePath(lang, path);
  const fullTitle = title ? `${title} | ${siteConfig.name}` : siteConfig.name;
  return {
    title,
    description,
    alternates: {
      canonical: url,
      languages: {
        vi: localizePath("vi", path),
        en: localizePath("en", path),
        "x-default": localizePath("vi", path),
      },
    },
    openGraph: {
      title: fullTitle,
      description,
      url,
      siteName: siteConfig.name,
      locale: lang === "en" ? "en_US" : siteConfig.locale,
      type: "website",
      images: [{ url: ogImage }],
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
      images: [ogImage],
    },
  };
}
