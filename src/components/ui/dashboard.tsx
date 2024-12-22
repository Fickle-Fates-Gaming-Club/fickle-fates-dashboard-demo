import ComplicationsWidget from "./complications-widget";
import DoomsdayClockWidget from "./doomsday-clock-widget";
import ObjectiveWidget from "./objective-widget";

function Dashboard() {
  return (
    <div className="dashboard-container">
      <div className="dashboard-widget objective-tracker shadow-sm">
        <ObjectiveWidget />
      </div>

      <div className="dashboard-widget complication-tracker shadow-sm">
        <ComplicationsWidget />
      </div>

      <div className="dashboard-widget doomsday-clock shadow-sm">
        <DoomsdayClockWidget />
      </div>
    </div>
  );
}

export default Dashboard;
