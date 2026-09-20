import "./ConstructionSchedule.css";

import PinnedSteps from "../PinnedSteps/PinnedSteps";
import Copy from "../Copy/Copy";
import { getDictionary } from "@/i18n";

// The structural schedule on a PinnedSteps scene: one card per scale of
// project (townhouse, villa), each with its overall duration and the stages
// inside it. The rows come from the turnkey schedule, so the two pages can
// never drift apart.
const ConstructionSchedule = ({ lang = "vi" }) => {
  const dict = getDictionary(lang);
  const t = dict.construction;
  const rough = dict.allInOne.schedule.find((stage) => stage.key === "rough");

  return (
    <PinnedSteps
      id="construction-schedule"
      className="construction-schedule-scene"
      label={t.scheduleLabel}
      intro={t.scheduleIntro}
      pillLabel={t.scenarioLabel}
      items={rough.groups}
      itemKey={(group) => group.title}
      renderItem={(group) => (
        <>
          <Copy delay={0.1}>
            <h3>{group.title}</h3>
          </Copy>
          <p className="construction-total">{group.total}</p>
          <dl className="construction-rows">
            {group.rows.map((row, index) => (
              <div className="construction-row" key={row.task}>
                <dt>
                  <span className="mono construction-row-index">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <span>{row.task}</span>
                </dt>
                <dd>
                  <p className="mono">{row.duration}</p>
                </dd>
              </div>
            ))}
          </dl>
        </>
      )}
    />
  );
};

export default ConstructionSchedule;
