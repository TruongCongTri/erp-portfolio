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
  ogImage: "/home/hero(1).jpg",
  logo: "/logos/chinhnam-logo-symbol.png",
};

export const routes = [
  { path: "/", priority: 1 },
  { path: "/studio", priority: 0.8 },
  { path: "/spaces", priority: 0.8 },
  { path: "/blueprints", priority: 0.6 },
  { path: "/hiring", priority: 0.7 },
  { path: "/reviews", priority: 0.6 },
  { path: "/connect", priority: 0.8 },
];

// Builds per-page metadata so each route has its own title, description,
// canonical URL and social preview.
export function pageMetadata({ title, description, path, image }) {
  const ogImage = image || siteConfig.ogImage;
  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: {
      title: title ? `${title} | ${siteConfig.name}` : siteConfig.name,
      description,
      url: path,
      siteName: siteConfig.name,
      locale: siteConfig.locale,
      type: "website",
      images: [{ url: ogImage }],
    },
    twitter: {
      card: "summary_large_image",
      title: title ? `${title} | ${siteConfig.name}` : siteConfig.name,
      description,
      images: [ogImage],
    },
  };
}
