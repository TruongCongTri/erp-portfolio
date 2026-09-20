import "./globals.css";
import ClientLayout from "@/client-layout";
import TopBar from "@/components/TopBar/TopBar";
import MotionRuntime from "@/components/MotionRuntime/MotionRuntime";
import RouteProgress from "@/components/RouteProgress/RouteProgress";
import ScrollSync from "@/components/ScrollSync/ScrollSync";
import FloatingAction from "@/components/FloatingAction/FloatingAction";
import GoogleTranslate from "@/components/Language/GoogleTranslate";
import { LANG_BOOT_SCRIPT } from "@/lib/i18n";
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
  telephone: siteConfig.contact.phones,
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
        streetAddress: "C18,19,20, Khu phố Tân Lại, đường N4, phường Trấn Biên",
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
    // lang-en / skip-intro classes are added by the boot script before
    // hydration, hence suppressHydrationWarning.
    <html lang="vi" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: LANG_BOOT_SCRIPT }} />
      </head>
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(organizationJsonLd).replace(/</g, "\\u003c"),
          }}
        />
        <ClientLayout>
          <RouteProgress />
          <TopBar />
          {children}
          <FloatingAction />
          <MotionRuntime />
          <ScrollSync />
          <GoogleTranslate />
        </ClientLayout>
      </body>
    </html>
  );
}
