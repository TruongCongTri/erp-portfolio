import "./HowWeWork.css";

import Copy from "../Copy/Copy";
import HowWeWorkMotion from "./HowWeWorkMotion";

const milestoneYears = ["2012", "2015", "2016", "2017", "2019"];

// Server component; pinning and the active-year indicator are handled by
// HowWeWorkMotion, the steps' entrance by MotionRuntime (data-reveal).
const HowWeWork = () => {
  return (
    <>
      <div className="how-we-work">
        <div className="how-we-work-col how-we-work-header">
          <div className="container">
            <div className="how-we-work-header-content">
              <div className="how-we-work-header-callout">
                <Copy delay={0.1}>
                  <p>Lịch sử hình thành và phát triển</p>
                </Copy>
              </div>
              <Copy delay={0.15}>
                <h3>
                  Công ty TNHH Thiết kế Xây dựng Chính Nam được thành lập vào ngày
                  22 tháng 11 năm 2012 với hoạt động chính là thiết kế công trình.
                </h3>
              </Copy>
              <div
                className="how-we-work-steps"
                data-reveal=".how-we-work-step"
                data-reveal-start="top 75%"
                data-reveal-duration="0.3"
                data-reveal-stagger="-0.1"
                data-reveal-ease="none"
              >
                {milestoneYears.map((year, index) => (
                  <div
                    key={year}
                    className={`how-we-work-step ${index === 0 ? "active" : ""}`}
                  >
                    <p className="how-we-work-step-label">Năm</p>
                    <p className="how-we-work-step-index">{year}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
        <div className="how-we-work-col how-we-work-cards">
          <div className="how-we-work-card">
            <div className="how-we-work-card-img">
              <img loading="lazy" src="/how-we-work/process-1.jpg" alt="Chính Nam - hành trình phát triển" />
            </div>
            <div className="how-we-work-card-copy">
              <div className="how-we-work-card-index-label">
                <h3>Thiết kế/ Xây dựng</h3>
              </div>
              <p className="md">
                Công ty TNHH Thiết kế Xây dựng Chính Nam được thành lập vào ngày
                22 tháng 11 năm 2012 với hoạt động chính là thiết kế công trình.
              </p>
            </div>
          </div>
          <div className="how-we-work-card">
            <div className="how-we-work-card-img">
              <img loading="lazy" src="/how-we-work/process-2.jpg" alt="Chính Nam - hành trình phát triển" />
            </div>
            <div className="how-we-work-card-copy">
              <div className="how-we-work-card-index-label">
                <h3>Principles / Direction</h3>
              </div>
              <p className="md">
                Sau hơn 3 năm thành lập Công ty Chính Nam đã cơ bản hoàn thành bộ
                máy hoạt động cả hai lĩnh vực thiết kế và thi công xây dựng.
              </p>
            </div>
          </div>
          <div className="how-we-work-card">
            <div className="how-we-work-card-img">
              <img loading="lazy" src="/how-we-work/process-3.jpg" alt="Chính Nam - hành trình phát triển" />
            </div>
            <div className="how-we-work-card-copy">
              <div className="how-we-work-card-index-label">
                <h3>Detail / Coordination</h3>
              </div>
              <p className="md">
                Mang sứ mệnh phát triển các dự án xây dựng ở tỉnh Đồng Nai, đồng
                thời mở rộng thực hiện các dự án trên toàn quốc.
              </p>
            </div>
          </div>
          <div className="how-we-work-card">
            <div className="how-we-work-card-img">
              <img loading="lazy" src="/how-we-work/process-4.jpg" alt="Chính Nam - hành trình phát triển" />
            </div>
            <div className="how-we-work-card-copy">
              <div className="how-we-work-card-index-label">
                <h3>Build / Handover</h3>
              </div>
              <p className="md">
                Công ty đã có Văn phòng tại cả <span>3</span> tỉnh thành: Đồng
                Nai, TPHCM và Tây Ninh.
              </p>
            </div>
            <div className="how-we-work-card">
              <div className="how-we-work-card-img">
                <img loading="lazy" src="/how-we-work/process-4.jpg" alt="Chính Nam - hành trình phát triển" />
              </div>
              <div className="how-we-work-card-copy">
                <div className="how-we-work-card-index-label">
                  <h3>Build / Handover</h3>
                </div>
                <p className="md">
                  Công ty được cấp chứng chỉ Thiết kế, Giám sát và Thi công xây
                  dựng công trình dân dụng hạng II và công trình công nghiệp hạng
                  III.
                </p>
              </div>
            </div>
            {/* <div className="how-we-work-card">
              <div className="how-we-work-card-img">
                <img loading="lazy" src="/how-we-work/process-4.jpg" alt="Chính Nam - hành trình phát triển" />
              </div>
              <div className="how-we-work-card-copy">
                <div className="how-we-work-card-index-label">
                  <h3>Build / Handover</h3>
                </div>
                <p className="md">
                  Chuyển đổi từ Công ty TNHH thành Công ty cổ phần Thiết kế Xây
                  dựng Chính Nam, chuẩn hóa hệ thống điều hành, tổ chức (ISO 9000,
                  Quản lý chất lượng toàn diện...)
                </p>
              </div>
            </div>
            <div className="how-we-work-card">
              <div className="how-we-work-card-img">
                <img loading="lazy" src="/how-we-work/process-4.jpg" alt="Chính Nam - hành trình phát triển" />
              </div>
              <div className="how-we-work-card-copy">
                <div className="how-we-work-card-index-label">
                  <h3>Build / Handover</h3>
                </div>
                <p className="md">
                  Đánh dấu 10 năm hình thành và phát triển của Công ty cổ phần
                  Thiết kế Xây dựng Chính Nam
                </p>
              </div>
            </div> */}
          </div>
        </div>
      </div>
      <HowWeWorkMotion />
    </>
  );
};

export default HowWeWork;
