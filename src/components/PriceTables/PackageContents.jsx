import Copy from "../Copy/Copy";

// What a package adds over the one before it.
const additions = (groups, column) =>
  groups.flatMap((g) => g.items.filter((i) => i.in[column] && !i.in[column - 1]));

// One package's contents: the name, how much it carries, then every item in
// the file ticked or struck through. Shared by the wheel (PackageOrbit) and
// the pinned scene (PackageSteps) so both read the same way.
const PackageContents = ({ name, column, groups, t }) => {
  const adds = column === 0 ? [] : additions(groups, column);
  const included = groups.flatMap((g) => g.items.filter((i) => i.in[column]));

  return (
    <>
      <Copy delay={0.1}>
        <h3>{name}</h3>
      </Copy>
      <Copy delay={0.15}>
        <p className="mono package-count">
          {column === 0
            ? `${included.length} ${t.baseLabel}`
            : `+${adds.length} ${t.addsLabel}`}
        </p>
      </Copy>

      {groups.map((group) => (
        <div className="package-group" key={group.title}>
          <p className="mono package-group-title">
            {group.title} · {group.items.filter((i) => i.in[column]).length}/
            {group.items.length}
          </p>
          <ul>
            {group.items.map((item) => {
              const yes = item.in[column];
              return (
                <li className={yes ? "yes" : "no"} key={item.name}>
                  <span
                    role="img"
                    aria-label={yes ? t.yes : t.no}
                    className={`price-tick ${yes ? "yes" : "no"}`}
                  >
                    {yes ? "✔" : "✖"}
                  </span>
                  <p>{item.name}</p>
                </li>
              );
            })}
          </ul>
        </div>
      ))}
    </>
  );
};

export default PackageContents;
