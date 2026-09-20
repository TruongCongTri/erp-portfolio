import Copy from "../Copy/Copy";
import Orbit from "../Orbit/Orbit";

// "3800000" -> "3.800.000" (vi) / "3,800,000" (en)
const group = (value, lang) =>
  String(value).replace(/\B(?=(\d{3})+(?!\d))/g, lang === "en" ? "," : ".");

// The material schedules on an Orbit wheel: one card per package, listing what
// that package actually uses, so the three-column spec table is read down
// rather than across. A spec is either the make used, `true` where the item is
// simply included, or null where the package does not carry it.
const MaterialOrbit = ({ id, section, t, lang }) => (
  <Orbit
    id={id}
    label={section.materialsLabel}
    intro={section.materialsIntro}
    hint={t.packagesHint}
    hubLabel={section.materialsHub}
    footnote={section.materialsNote}
    items={section.packages}
    itemKey={(name) => name}
    nodeLabel={(name, index) => section.packageShorts[index]}
    renderItem={(name, column) => (
      <>
        <Copy delay={0.1}>
          <h3>{name}</h3>
        </Copy>

        {section.packagePrices && (
          <p className="material-price">
            <span>{group(section.packagePrices[column], lang)}</span>
            <span className="mono material-price-unit">{t.unit}</span>
          </p>
        )}

        {section.materialGroups.map((materialGroup) => (
          <div className="material-group" key={materialGroup.title}>
            {materialGroup.title && (
              <p className="mono material-group-title">
                {materialGroup.title}
              </p>
            )}
            <dl>
              {materialGroup.items.map((item) => {
                const spec = item.specs[column];
                return (
                  <div
                    className={`material-row ${spec ? "" : "none"}`}
                    key={item.name}
                  >
                    <dt>
                      <p>{item.name}</p>
                      {item.note && (
                        <p className="material-note">{item.note}</p>
                      )}
                    </dt>
                    <dd>
                      {spec === true ? (
                        <span
                          role="img"
                          aria-label={t.yes}
                          className="price-tick yes"
                        >
                          ✔
                        </span>
                      ) : spec ? (
                        <p>{spec}</p>
                      ) : (
                        <span
                          role="img"
                          aria-label={t.no}
                          className="price-tick no"
                        >
                          ✖
                        </span>
                      )}
                    </dd>
                  </div>
                );
              })}
            </dl>
          </div>
        ))}
      </>
    )}
  />
);

export default MaterialOrbit;
