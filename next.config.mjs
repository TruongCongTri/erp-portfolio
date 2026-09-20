// /** @type {import('next').NextConfig} */
// const nextConfig = {
//   // The old single detail pages now live at per-item URLs.
//   async redirects() {
//     return [
//       { source: "/sample-space", destination: "/spaces/1", permanent: true },
//       { source: "/sample-hiring", destination: "/hiring/1", permanent: true },
//     ];
//   },
//   experimental: {
//     serverActions: {
//       // Job applications upload a CV (max 5 MB) alongside the form fields.
//       bodySizeLimit: "6mb",
//     },
//   },
// };

// export default nextConfig;
/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
  // The dev badge sits in the bottom-left corner, where SectionNav lives
  devIndicators: false,
  images: {
    unoptimized: true, // Prevents Next.js image optimization errors during static export
  },
};

export default nextConfig;
