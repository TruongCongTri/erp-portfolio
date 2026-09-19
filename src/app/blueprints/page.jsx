import Nav from "@/components/Nav/Nav";
import Gallery from "@/components/Gallery/Gallery";
import { pageMetadata } from "@/lib/site";

export const metadata = pageMetadata({
  title: "Thư viện dự án",
  description:
    "Thư viện hình ảnh các công trình kiến trúc, nội thất và cảnh quan do Chính Nam thiết kế và thi công.",
  path: "/blueprints",
});

const page = () => {
  return (
    <>
      <Nav />
      <div className="page blueprints">
        {/* The gallery canvas is drawn client-side; give crawlers the page topic. */}
        <h1 className="sr-only">Thư viện dự án Chính Nam</h1>
        <p className="sr-only">
          Hình ảnh các công trình kiến trúc, nội thất và cảnh quan do Chính Nam
          thiết kế và thi công. Kéo để khám phá, nhấn vào ảnh để xem chi tiết.
        </p>
        <Gallery />
      </div>
    </>
  );
};

export default page;
