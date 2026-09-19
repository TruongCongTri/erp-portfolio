import "./globals.css";
import ClientLayout from "@/client-layout";
import TopBar from "@/components/TopBar/TopBar";
import MotionRuntime from "@/components/MotionRuntime/MotionRuntime";
import GoToTop from "@/components/GoToTop/GoToTop";
import { siteConfig } from "@/lib/site";

export const metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: `${siteConfig.name} - ${siteConfig.tagline}`,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  applicationName: siteConfig.name,
  alternates: { canonical: "/" },
  openGraph: {
    title: `${siteConfig.name} - ${siteConfig.tagline}`,
    description: siteConfig.description,
    url: "/",
    siteName: siteConfig.name,
    locale: siteConfig.locale,
    type: "website",
    images: [{ url: siteConfig.ogImage }],
  },
  twitter: {
    card: "summary_large_image",
    title: `${siteConfig.name} - ${siteConfig.tagline}`,
    description: siteConfig.description,
    images: [siteConfig.ogImage],
  },
  robots: { index: true, follow: true },
};

const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "GeneralContractor",
  name: siteConfig.legalName,
  alternateName: siteConfig.name,
  slogan: siteConfig.tagline,
  description: siteConfig.description,
  url: siteConfig.url,
  logo: `${siteConfig.url}${siteConfig.logo}`,
  image: `${siteConfig.url}${siteConfig.ogImage}`,
  email: siteConfig.email,
  telephone: siteConfig.phone,
  taxID: siteConfig.taxId,
  foundingDate: siteConfig.foundingDate,
  areaServed: "VN",
  address: {
    "@type": "PostalAddress",
    streetAddress: "255/56T Nguyễn Văn Tiên, khu phố 11A, phường Tân Triều",
    addressLocality: "Đồng Nai",
    addressCountry: "VN",
  },
  department: [
    {
      "@type": "GeneralContractor",
      name: "VPĐD TP. Đồng Nai",
      address: {
        "@type": "PostalAddress",
        streetAddress: "C18,19,20 đường N4, Khu phố Tân Lại, phường Trấn Biên",
        addressLocality: "Đồng Nai",
        addressCountry: "VN",
      },
    },
    {
      "@type": "GeneralContractor",
      name: "VPĐD TP. Hồ Chí Minh",
      address: {
        "@type": "PostalAddress",
        streetAddress: "Số 109, đường N2, phường Bình Trưng",
        addressLocality: "TP. Hồ Chí Minh",
        addressCountry: "VN",
      },
    },
  ],
};

export default function RootLayout({ children }) {
  return (
    <html lang="vi">
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(organizationJsonLd).replace(/</g, "\\u003c"),
          }}
        />
        <ClientLayout>
          <TopBar />
          {children}
          <GoToTop />
          <MotionRuntime />
        </ClientLayout>
      </body>
    </html>
  );
}
