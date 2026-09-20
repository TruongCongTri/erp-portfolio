import "./Ecosystem.css";

import Copy from "../Copy/Copy";
import Orbit from "../Orbit/Orbit";
import { getDictionary } from "@/i18n";

// The member companies on an Orbit wheel: scrolling walks through them,
// clicking one on the wheel jumps to its card.
const Ecosystem = ({ lang = "vi" }) => {
  const t = getDictionary(lang).studioV2;

  return (
    <Orbit
      id="ecosystem"
      label={t.ecosystemLabel}
      intro={t.ecosystemIntro}
      hint={t.ecosystemHint}
      hubLabel={t.ecosystemHub}
      items={t.ecosystem}
      itemKey={(member) => member.name}
      nodeLabel={(member) => member.short}
      renderItem={(member) => (
        <>
          <Copy delay={0.1}>
            <h3>{member.name}</h3>
          </Copy>
          <Copy delay={0.15}>
            <p className="mono ecosystem-alt">{member.nameAlt}</p>
          </Copy>
          <Copy delay={0.2}>
            <p className="lg ecosystem-tagline">{member.tagline}</p>
          </Copy>
          <Copy delay={0.25}>
            <p className="md">{member.description}</p>
          </Copy>
        </>
      )}
    />
  );
};

export default Ecosystem;
