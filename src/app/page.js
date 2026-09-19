import "./index.css";

import Nav from "@/components/Nav/Nav";
import Footer from "@/components/Footer/Footer";
import AnimatedButton from "@/components/AnimatedButton/AnimatedButton";
import FeaturedProjects from "@/components/FeaturedProjects/FeaturedProjects";
import ClientReviews from "@/components/ClientReviews/ClientReviews";
import CTAWindow from "@/components/CTAWindow/CTAWindow";
import Copy from "@/components/Copy/Copy";
import Preloader from "@/components/Preloader/Preloader";
import { pageMetadata, siteConfig } from "@/lib/site";

export const metadata = {
  ...pageMetadata({
    description: siteConfig.description,
    path: "/",
  }),
  // Root page uses the layout's default "Chính Nam - Xây dựng ngôi nhà hạnh phúc" title.
  title: { absolute: `${siteConfig.name} - ${siteConfig.tagline}` },
};

const whatWeDoTags = [
  "Biệt thự",
  "Dinh thự",
  "Nhà phố",
  "Resort",
  "Nhà hàng",
  "Khách sạn",
  "Văn phòng",
  "Khu dân cư",
  "+",
];

const heroStats = [
  { count: "225+", label: "Completed design studies" },
  { count: "36", label: "Ongoing spatial explorations" },
  { count: "12", label: "Cross-disciplinary collaborators" },
  { count: "98%", label: "Return rate across commissions" },
];

export default function Home() {
  return (
    <>
      <Preloader />
      <Nav />
      {/* hero Section */}
      <section className="hero">
        <div className="hero-bg">
          <img
            src="/home/hero(1).jpg"
            alt="Công trình kiến trúc do Chính Nam thiết kế và thi công"
            fetchPriority="high"
          />
        </div>
        <div className="hero-gradient"></div>
        <div className="container">
          <div className="hero-content">
            <div className="hero-header">
              <Copy animateOnScroll={false} delay={0.85} preloaderDelay={10}>
                <h1>XÂY DỰNG</h1>
                <h3 className="">tạo</h3>
                <h1>NIỀM TIN</h1>
              </Copy>
            </div>
            <div className="hero-tagline">
              <Copy animateOnScroll={false} delay={1} preloaderDelay={10.15}>
                <p>Chính Nam - Xây dựng ngôi nhà hạnh phúc</p>
              </Copy>
            </div>
            <AnimatedButton
              label="Discover More"
              route="/studio"
              animateOnScroll={false}
              delay={1.15}
              preloaderDelay={10.3}
            />
          </div>
        </div>
        <div className="hero-stats">
          <div className="container">
            {heroStats.map((stat, index) => (
              <div className="stat" key={stat.label}>
                <div className="stat-count">
                  <Copy delay={0.1 + index * 0.1}>
                    <h2>{stat.count}</h2>
                  </Copy>
                </div>
                <div className="stat-divider"></div>
                <div className="stat-info">
                  <Copy delay={0.15 + index * 0.1}>
                    <p>{stat.label}</p>
                  </Copy>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      {/* what-we-do Section */}
      <section className="what-we-do">
        <div className="container">
          <div className="what-we-do-header">
            <Copy delay={0.1}>
              <h1>
                <span className="spacer">&nbsp;</span>
                Chính Nam, nơi hội tụ những con người có cùng tư tưởng: sống và
                làm việc trong hạnh phúc, mang sứ mệnh đem “Ngôi nhà hạnh phúc”
                đến mỗi gia đình - Nơi góp phần tạo nên cuộc sống an lành, hạnh
                phúc và thịnh vượng cho gia chủ.
              </h1>
            </Copy>
          </div>
          <div className="what-we-do-content">
            <div className="what-we-do-col">
              <Copy delay={0.1}>
                <p>Lĩnh vực hoạt động chính</p>
              </Copy>

              <Copy delay={0.15}>
                <p className="lg">
                  Chính Nam đồng hành cùng Quý khách hàng mang đến các giải pháp
                  thiết kế, xây dựng công trình dân dụng:
                </p>
              </Copy>
            </div>
            <div className="what-we-do-col">
              <div className="what-we-do-tags" data-reveal=".what-we-do-tag">
                {whatWeDoTags.map((tag) => (
                  <div className="what-we-do-tag" key={tag}>
                    <h3>{tag}</h3>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* Featured projects Section */}
      <section className="featured-projects-container">
        <div className="container">
          <div className="featured-projects-header-callout">
            <Copy delay={0.1}>
              <p>Dự án Chính Nam</p>
            </Copy>
          </div>
          <div className="featured-projects-header">
            <Copy delay={0.15}>
              <h2>Danh sách những dự án gần đây được Chính Nam thiết kế và thi công</h2>
            </Copy>
          </div>
        </div>
        <FeaturedProjects />
      </section>
      {/* Client review Section */}
      <section className="client-reviews-container">
        <div className="container">
          <div className="client-reviews-header-callout">
            <p>Đánh giá của khách hàng</p>
          </div>
          <ClientReviews />
        </div>
      </section>
      <section className="gallery-callout">
        <div className="container">
          <div className="gallery-callout-col">
            <div className="gallery-callout-row">
              <div className="gallery-callout-img gallery-callout-img-1">
                <img
                  src="/gallery-callout/gallery-callout-1.jpg"
                  alt="Hình ảnh dự án Chính Nam"
                  loading="lazy"
                />
              </div>
              <div className="gallery-callout-img gallery-callout-img-2">
                <img
                  src="/gallery-callout/gallery-callout-2.jpg"
                  alt="Hình ảnh dự án Chính Nam"
                  loading="lazy"
                />
                <div className="gallery-callout-img-content">
                  <h3>800+</h3>
                  <p>Project Images</p>
                </div>
              </div>
            </div>
            <div className="gallery-callout-row">
              <div className="gallery-callout-img gallery-callout-img-3">
                <img
                  src="/gallery-callout/gallery-callout-3.jpg"
                  alt="Hình ảnh dự án Chính Nam"
                  loading="lazy"
                />
              </div>
              <div className="gallery-callout-img gallery-callout-img-4">
                <img
                  src="/gallery-callout/gallery-callout-4.jpg"
                  alt="Hình ảnh dự án Chính Nam"
                  loading="lazy"
                />
              </div>
            </div>
          </div>
          <div className="gallery-callout-col">
            <div className="gallery-callout-copy">
              <Copy delay={0.1}>
                <h3>
                  Take a closer look at the projects that define our practice.
                  From intimate interiors to expansive landscapes, each image
                  highlights a unique perspective that might spark your next big
                  idea.
                </h3>
              </Copy>
              <AnimatedButton label="Explore Gallery" route="/blueprints" />
            </div>
          </div>
        </div>
      </section>
      <CTAWindow
        img="/home/home-cta-window.jpg"
        header="Chính Nam"
        callout="Spaces that breathe with time"
        description="Our approach is guided by rhythm, proportion, and light, allowing every environment to grow more meaningful as it is lived in."
      />
      <Footer />
    </>
  );
}
