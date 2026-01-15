import '../styles/pages/Settings.css';

export function Settings() {
  return (
    <div className="settings-page">
      <h1>Settings</h1>
      
      <div className="settings-section">
        <h2>Temperature Unit</h2>
        <div className="setting-option">
          <input type="radio" name="unit" value="celsius" defaultChecked />
          <label>Celsius (°C)</label>
        </div>
        <div className="setting-option">
          <input type="radio" name="unit" value="fahrenheit" />
          <label>Fahrenheit (°F)</label>
        </div>
      </div>

      <div className="settings-section">
        <h2>Notifications</h2>
        <div className="setting-option">
          <input type="checkbox" defaultChecked />
          <label>Enable weather alerts</label>
        </div>
      </div>
    </div>
  );
}
