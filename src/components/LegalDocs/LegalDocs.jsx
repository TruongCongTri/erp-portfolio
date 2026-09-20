import "./LegalDocs.css";

import PinnedSteps from "../PinnedSteps/PinnedSteps";
import Copy from "../Copy/Copy";
import { getDictionary } from "@/i18n";

const pad = (index) => String(index + 1).padStart(2, "0");

// The three sets of paperwork on a PinnedSteps scene: the group pills (A, B,
// C) stay put on the left while each set's card scrolls past on the right,
// every document with the number of copies and the note that goes with it.
const LegalDocs = ({ lang = "vi" }) => {
  const t = getDictionary(lang).legalSupport;

  // Running number across the whole file, the way an STT column reads.
  let running = 0;

  return (
    <PinnedSteps
      id="legal-docs"
      className="legal-docs-scene"
      label={t.docsLabel}
      intro={t.docsIntro}
      pillLabel={t.groupLabel}
      items={t.groups}
      itemKey={(group) => group.code}
      pillValue={(group) => group.code}
      renderItem={(group) => (
        <>
          <Copy delay={0.1}>
            <h3>{group.title}</h3>
          </Copy>
          <Copy delay={0.15}>
            <p className="legal-docs-stage">{group.stage}</p>
          </Copy>

          <dl className="legal-docs-list">
            {group.items.map((item) => {
              running += 1;
              return (
                <div className="legal-doc" key={item.name + running}>
                  <dt>
                    <span className="mono legal-doc-index">{pad(running - 1)}</span>
                    <span className="legal-doc-name">
                      <span>{item.name}</span>
                      {item.note && (
                        <span className="legal-doc-note">{item.note}</span>
                      )}
                    </span>
                  </dt>
                  <dd>
                    {item.quantity && (
                      <span className="mono legal-doc-quantity">
                        {item.quantity}
                      </span>
                    )}
                  </dd>
                </div>
              );
            })}
          </dl>
        </>
      )}
    />
  );
};

export default LegalDocs;
