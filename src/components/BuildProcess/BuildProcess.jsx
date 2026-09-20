import "./BuildProcess.css";

import PinnedSteps from "../PinnedSteps/PinnedSteps";
import Copy from "../Copy/Copy";
import { getDictionary } from "@/i18n";

// The nine turnkey steps on a PinnedSteps scene: the numbered pills stay put
// on the left while each step's card scrolls past on the right.
const BuildProcess = ({ lang = "vi" }) => {
  const t = getDictionary(lang).allInOne;

  return (
    <PinnedSteps
      id="build-process"
      className="build-process-scene"
      label={t.processLabel}
      intro={t.processIntro}
      pillLabel={t.stepLabel}
      items={t.steps}
      itemKey={(step) => step.title}
      renderItem={(step) => (
        <>
          <Copy delay={0.1}>
            <h3>{step.title}</h3>
          </Copy>
          {step.note && (
            <Copy delay={0.15}>
              <p className="mono build-process-note">{step.note}</p>
            </Copy>
          )}
          <ul className="build-process-items">
            {step.items.map((item) => (
              <li key={item}>
                <Copy delay={0.15}>
                  <p className="md">{item}</p>
                </Copy>
              </li>
            ))}
          </ul>
        </>
      )}
    />
  );
};

export default BuildProcess;
