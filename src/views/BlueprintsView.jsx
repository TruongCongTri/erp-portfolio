import Nav from "@/components/Nav/Nav";
import Gallery from "@/components/Gallery/Gallery";
import { getDictionary } from "@/i18n";
import { pageMetadata } from "@/lib/site";

export function blueprintsMetadata(lang) {
  const t = getDictionary(lang).meta;
  return pageMetadata({
    lang,
    title: t.blueprintsTitle,
    description: t.blueprintsDescription,
    path: "/thu-vien",
  });
}

export default function BlueprintsView({ lang }) {
  const t = getDictionary(lang).blueprints;

  return (
    <>
      <Nav />
      <div className="page blueprints">
        {/* The gallery canvas is drawn client-side; give crawlers the page topic. */}
        <h1 className="sr-only">{t.srTitle}</h1>
        <p className="sr-only">{t.srText}</p>
        <Gallery />
      </div>
    </>
  );
}
