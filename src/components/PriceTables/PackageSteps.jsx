import PinnedSteps from "../PinnedSteps/PinnedSteps";
import PackageContents from "./PackageContents";

// The same package cards on a PinnedSteps scene rather than the wheel: with
// only two packages a wheel puts one circle above the other, which reads as a
// line, not a wheel. The pills carry the package names instead.
const PackageSteps = ({ id, block, t, pillLabel }) => (
  <PinnedSteps
    id={id}
    className="package-steps-scene"
    label={block.tableLabel}
    intro={block.tableIntro}
    pillLabel={pillLabel}
    items={block.packages}
    itemKey={(name) => name}
    renderItem={(name, column) => (
      <PackageContents
        name={name}
        column={column}
        groups={block.groups}
        t={t}
      />
    )}
  />
);

export default PackageSteps;
