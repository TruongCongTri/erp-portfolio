import "./DesignProcess.css";

import PinnedSteps from "../PinnedSteps/PinnedSteps";
import Copy from "../Copy/Copy";
import { getDictionary } from "@/i18n";

// The five design stages on a PinnedSteps scene: the numbered pills stay put
// on the left while each stage's card scrolls past on the right. A stage
// carries its own timeframe, and may add a second piece of work with one of
// its own.
const DesignProcess = ({ lang = "vi" }) => {
  const t = getDictionary(lang).designConsult;

  return (
    <PinnedSteps
      id="design-process"
      className="design-process-scene"
      label={t.processLabel}
      intro={t.processIntro}
      pillLabel={t.stageLabel}
      items={t.stages}
      itemKey={(stage) => stage.title}
      renderItem={(stage) => (
        <>
          <Copy delay={0.1}>
            <h3>{stage.title}</h3>
          </Copy>
          <Copy delay={0.15}>
            <p className="design-process-time">{stage.note}</p>
          </Copy>

          {stage.items.length > 0 && (
            <ul className="design-process-items">
              {stage.items.map((item) => (
                <li key={item.text}>
                  <Copy delay={0.15}>
                    <p className="md">{item.text}</p>
                  </Copy>
                  <Copy delay={0.2}>
                    <p className="design-process-time">{item.note}</p>
                  </Copy>
                </li>
              ))}
            </ul>
          )}
        </>
      )}
    />
  );
};

export default DesignProcess;
