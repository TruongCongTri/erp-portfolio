import "./contact.css";

import Nav from "@/components/Nav/Nav";
import Footer from "@/components/Footer/Footer";
import Copy from "@/components/Copy/Copy";
import { pageMetadata } from "@/lib/site";

export const metadata = pageMetadata({
  title: "Liên hệ",
  description:
    "Liên hệ Chính Nam: email info@chinhnambkd.vn, hotline 0944 454 199. Trụ sở tại TP. Đồng Nai, văn phòng đại diện tại Đồng Nai và TP. Hồ Chí Minh.",
  path: "/connect",
  image: "/contact/contact-img.jpg",
});

const page = () => {
  return (
    <>
      <Nav />
      <div className="page contact">
        <section className="contact-hero">
          <div className="container">
            <div className="contact-col">
              <div className="contact-hero-header">
                <Copy delay={0.85}>
                  <h1>CHÍNH NAM</h1>
                  <h2>Xây Dựng Ngôi Nhà Hạnh Phúc</h2>
                </Copy>
              </div>
              <div className="contact-copy-year">
                <Copy delay={0.1}>
                  <h1>&copy;26</h1>
                </Copy>
              </div>
            </div>
            <div className="contact-col">
              <div className="contact-info">
                <div className="contact-info-block">
                  <Copy delay={0.85}>
                    <p>Email</p>
                    <p>info@chinhnambkd.vn</p>
                  </Copy>
                </div>
                <div className="contact-info-block">
                  <Copy delay={1}>
                    <p>Liên hệ</p>
                    <p>0944 454 199</p>
                  </Copy>
                </div>
                <div className="contact-info-block">
                  <Copy delay={1.15}>
                    <p>Trụ sở chính</p>
                    <p>255/56T Nguyễn Văn Tiên, </p>
                    <p>khu phố 11A, phường Tân Triều, TP. Đồng Nai.</p>
                  </Copy>
                </div>
                <div className="contact-info-block">
                  <Copy delay={1.15}>
                    <p>VPĐD TP. ĐỒNG NAI</p>
                    <p>C18,19,20 đường N4, </p>
                    <p>Khu phố Tân Lại, phường Trấn Biên, TP. Đồng Nai.</p>
                  </Copy>
                </div>
                <div className="contact-info-block">
                  <Copy delay={1.15}>
                    <p>VPĐD TP. HỒ CHÍ MINH</p>
                    <p>Số 109, đường N2,</p>
                    <p>phường Bình Trưng, TP. Hồ Chí Minh.</p>
                  </Copy>
                </div>
                <div className="contact-info-block">
                  <Copy delay={1.3}>
                    <p>Mã Số Thuế</p>
                    <p>3602976394</p>
                  </Copy>
                </div>
                <div className="contact-info-block">
                  <Copy delay={1.45}>
                    <p>Social</p>
                    <p>Instagram</p>
                    <p>LinkedIn</p>
                  </Copy>
                </div>
              </div>
              <div className="contact-img">
                <img
                  src="/contact/contact-img.jpg"
                  alt="Terrene studio workspace"
                />
              </div>
            </div>
          </div>
        </section>
      </div>
      <Footer />
    </>
  );
};

export default page;
