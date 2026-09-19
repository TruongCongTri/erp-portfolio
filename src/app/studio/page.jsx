import "./studio.css";

import Nav from "@/components/Nav/Nav";
import Footer from "@/components/Footer/Footer";
import HowWeWork from "@/components/HowWeWork/HowWeWork";
import Spotlight from "@/components/Spotlight/Spotlight";
import CTAWindow from "@/components/CTAWindow/CTAWindow";
import Copy from "@/components/Copy/Copy";
import { pageMetadata } from "@/lib/site";

export const metadata = pageMetadata({
  title: "Giới thiệu",
  description:
    "Công ty Cổ phần Thiết kế Xây dựng Chính Nam thành lập ngày 22/11/2012 tại Đồng Nai. Sứ mệnh, tầm nhìn, giá trị cốt lõi Tín - Tinh - Tâm - Trung - Tiến và lịch sử phát triển.",
  path: "/studio",
});

const page = () => {
  return (
    <>
      <Nav />
      <div className="page studio">
        <section className="studio-hero">
          <div className="container">
            <div className="studio-hero-col">
              <Copy delay={0.85}>
                <p>
                  Chính Nam - Xây dựng ngôi nhà hạnh phúc Công ty Cổ phần Thiết
                  kế Xây dựng Chính Nam được thành lập{" "}
                  <span className="text-highlight">
                    ngày 22 tháng 11 năm 2012
                  </span>
                  , mang sứ mệnh phát triển các dự án xây dựng dân dụng ở TP.
                  Đồng Nai, đồng thời mở rộng thực hiện các dự án trên cả nước.
                  Và đến nay, Chính Nam đã sẵn sàng phục vụ cho Quý khách hàng
                  trên toàn quốc.
                </p>
              </Copy>
            </div>
            <div className="studio-hero-col">
              <div className="studio-hero-content">
                <Copy delay={0.85}>
                  <p>Sứ mệnh</p>
                </Copy>
                <Copy delay={0.9}>
                  <h3>
                    Trở thành một tổ chức thiết kế và xây dựng phát triển trường
                    tồn, ở đó là những con người sống, làm việc trong hạnh phúc
                    và lan tỏa tình yêu thương, hạnh phúc đến từng công trình và
                    khắp muôn nơi.
                  </h3>
                </Copy>
              </div>
              <div className="studio-hero-content">
                <Copy delay={0.85}>
                  <p>Tầm nhìn</p>
                </Copy>
                <Copy delay={0.9}>
                  <h2>Xây dựng ngôi nhà hạnh phúc</h2>
                  <h3>
                    Xây dựng ngôi nhà hạnh phúc – kiến tạo không gian sống an
                    lành, hạnh phúc, thịnh vượng và hiển vinh cho gia chủ.
                  </h3>
                </Copy>
              </div>
              <div className="studio-hero-hero-img">
                <img src="/studio/about-hero(1).png" alt="" />
              </div>
            </div>
          </div>
        </section>
        <section className="more-facts">
          <div className="container">
            <div className="more-facts-items">
              <div className="fact">
                <Copy delay={0.1}>
                  <h2>Tín</h2>
                  <p>Uy tín - Giữ chữ tín như giữ con ngươi</p>
                </Copy>
              </div>
              <div className="fact">
                <Copy delay={0.2}>
                  <h2>Tinh</h2>
                  <p>Con người tinh thông sản phẩm tinh hoa</p>
                </Copy>
              </div>
              <div className="fact">
                <Copy delay={0.3}>
                  <h2>Tâm</h2>
                  <p>Chữ tâm là nền móng cho mọi hành động và quyết định</p>
                </Copy>
              </div>
              <div className="fact">
                <Copy delay={0.4}>
                  <h2>Trung</h2>
                  <p>Trung thực, trung thành với tổ chức và khách hàng</p>
                </Copy>
              </div>
              <div className="fact">
                <Copy delay={0.5}>
                  <h2>Tiến</h2>
                  <p>
                    Cầu tiến, cải tiến, ứng dụng công nghệ tiên tiến. Tất cả
                    thành viên Chính Nam không ngừng tiến bộ mỗi ngày để trở
                    thành tổ chức tiên tiến.
                  </p>
                </Copy>
              </div>
            </div>
          </div>
        </section>
        <section className="how-we-work-container">
          <div className="container">
            <HowWeWork />
          </div>
        </section>
        <CTAWindow
          img="/studio/about-cta-window.jpg"
          header="The Archive"
          callout="Designs that speak through form"
          description="Each project tells a story of light, material, and rhythm. Explore how ideas take shape and grow into lasting environments."
        />
        <Spotlight />
      </div>
      <Footer />
    </>
  );
};

export default page;
