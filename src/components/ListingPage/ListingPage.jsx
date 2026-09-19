import "./ListingPage.css";

import Nav from "../Nav/Nav";
import Footer from "../Footer/Footer";
import Copy from "../Copy/Copy";
import TransitionLink from "../TransitionLink/TransitionLink";

/**
 * Shared list layout for projects, jobs and reviews.
 *
 * @param kicker   optional small heading above the title
 * @param title    page H1
 * @param filters  optional category labels (first one is highlighted)
 * @param items    [{ id, href, image, date, name, subtitle,
 *                   meta: { image?, label?, value } }]
 * @param children extra content after the list (e.g. an application form)
 */
const ListingPage = ({ kicker, title, filters = [], items, children }) => {
  return (
    <>
      <Nav />
      <div className="page listing">
        <section className="listing-header">
          <div className="container">
            <div className="listing-col"></div>
            <div className="listing-col">
              <Copy delay={1}>
                {kicker && <h2>{kicker}</h2>}
                <h1>{title}</h1>
              </Copy>
              {filters.length > 0 && (
                <div className="listing-filters">
                  {filters.map((filter, index) => (
                    <div
                      key={filter}
                      className={`filter ${index === 0 ? "default" : ""}`}
                    >
                      <Copy delay={Math.min(1 + index * 0.1, 1.3)}>
                        <p className="lg">{filter}</p>
                      </Copy>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </section>
        <section className="listing-list">
          <div className="container" data-reveal-cards=".listing-item">
            {items.map((item, index) => (
              <TransitionLink
                key={item.id}
                href={item.href}
                className="listing-item"
              >
                <div className="listing-item-img">
                  <img
                    src={item.image}
                    alt={item.name}
                    loading={index === 0 ? undefined : "lazy"}
                  />
                </div>
                <div className="listing-item-info">
                  <div className="listing-info-col">
                    <div className="listing-date">
                      <p>{item.date}</p>
                    </div>
                  </div>
                  <div className="listing-info-col">
                    <div className="listing-info-sub-col">
                      <div className="listing-name">
                        <h3>{item.name}</h3>
                        <p className="lg">{item.subtitle}</p>
                      </div>
                    </div>
                    <div className="listing-info-sub-col">
                      <div className="listing-client">
                        {item.meta.image && (
                          <div className="listing-client-img">
                            <img src={item.meta.image} alt="" loading="lazy" />
                          </div>
                        )}
                        <div className="listing-client-name">
                          <p>
                            {item.meta.label ? (
                              <>
                                {item.meta.label} <span>{item.meta.value}</span>
                              </>
                            ) : (
                              item.meta.value
                            )}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </TransitionLink>
            ))}
          </div>
        </section>
        {children}
      </div>
      <Footer />
    </>
  );
};

export default ListingPage;
