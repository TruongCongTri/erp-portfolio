import "./BuildSchedule.css";

import Copy from "../Copy/Copy";
import Orbit from "../Orbit/Orbit";
import { getDictionary } from "@/i18n";

// The three construction stages on an Orbit wheel: scrolling walks through
// them, clicking a stage on the wheel jumps to its card.
const BuildSchedule = ({ lang = "vi" }) => {
  const t = getDictionary(lang).allInOne;

  return (
    <Orbit
      id="build-schedule"
      label={t.scheduleLabel}
      intro={t.scheduleIntro}
      hint={t.scheduleHint}
      hubLabel={t.scheduleHub}
      items={t.schedule}
      itemKey={(stage) => stage.title}
      nodeLabel={(stage) => stage.short}
      renderItem={(stage) => (
        <>
          <Copy delay={0.1}>
            <h3>{stage.title}</h3>
          </Copy>
          <Copy delay={0.15}>
            <p className="md">{stage.text}</p>
          </Copy>

          {stage.items.length > 0 && (
            <div className="schedule-items">
              {stage.itemsLabel && (
                <p className="mono schedule-items-label">{stage.itemsLabel}</p>
              )}
              <ul>
                {stage.items.map((item) => (
                  <li key={item}>
                    <p>{item}</p>
                  </li>
                ))}
              </ul>
            </div>
          )}

          <div className="schedule-timelines">
            {stage.groupsLabel && (
              <p className="mono schedule-timelines-label">
                {stage.groupsLabel}
              </p>
            )}
            <div className="schedule-timelines-grid">
              {stage.groups.map((group) => (
                <div className="schedule-timeline" key={group.title}>
                  <div className="schedule-timeline-head">
                    <p>{group.title}</p>
                    <h3>{group.total}</h3>
                  </div>
                  {group.rows.length > 0 && (
                    <dl className="schedule-timeline-rows">
                      {group.rows.map((row) => (
                        <div className="schedule-timeline-row" key={row.task}>
                          <dt>
                            <p>{row.task}</p>
                          </dt>
                          <dd>
                            <p className="mono">{row.duration}</p>
                          </dd>
                        </div>
                      ))}
                    </dl>
                  )}
                </div>
              ))}
            </div>
          </div>
        </>
      )}
    />
  );
};

export default BuildSchedule;
