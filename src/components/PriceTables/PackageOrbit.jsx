import Orbit from "../Orbit/Orbit";
import PackageContents from "./PackageContents";

// The design packages on an Orbit wheel: each package is a card listing every
// item in the file, ticked or not, and the wheel keeps all of them in view so
// you can jump between them while comparing.
const PackageOrbit = ({ id, section, t }) => (
  <Orbit
    id={id}
    label={section.packagesLabel}
    intro={section.packagesIntro}
    hint={t.packagesHint}
    hubLabel={t.packagesHub}
    footnote={t.note}
    items={section.packages}
    itemKey={(name) => name}
    nodeLabel={(name, index) => section.packageShorts[index]}
    renderItem={(name, column) => (
      <PackageContents
        name={name}
        column={column}
        groups={section.groups}
        t={t}
      />
    )}
  />
);

export default PackageOrbit;
