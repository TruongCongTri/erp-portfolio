// Marks Vietnamese data (projects, jobs, reviews) as translatable. On English
// pages everything else is translate="no", so only these regions are
// machine-translated. Harmless on Vietnamese pages.
export default function DataText({ as: Tag = "span", children, ...props }) {
  return (
    <Tag translate="yes" {...props}>
      {children}
    </Tag>
  );
}

// Spread onto a container element: <div {...translatable}>.
export const translatable = { translate: "yes" };

// Spread onto fixed (dictionary) text inside a translatable region.
export const fixedText = { translate: "no" };
