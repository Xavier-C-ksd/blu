const timeEl = document.getElementById("time");
const dateEl = document.getElementById("date");
const batteryEl = document.getElementById("battery");

// Time & Date
function updateTimeAndDate() {
  const now = new Date();
  const time = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  const date = now.toLocaleDateString();
  timeEl.textContent = time;
  dateEl.textContent = date;
}
setInterval(updateTimeAndDate, 1000);
updateTimeAndDate();

// Battery
if (navigator.getBattery) {
  navigator.getBattery().then(battery => {
    function updateBattery() {
      const level = Math.round(battery.level * 100);
      batteryEl.textContent = `🔋 ${level}%`;
    }

    updateBattery();

    battery.addEventListener('levelchange', updateBattery);
    battery.addEventListener('chargingchange', updateBattery);
  });
} else {
  batteryEl.textContent = "🔋 N/A";
}

// App launching
const apps = document.querySelectorAll(".app");
const container = document.getElementById("app-container");

apps.forEach(app => {
  app.addEventListener("click", () => {
    const appName = app.dataset.app;
    launchApp(appName);
  });
});

function launchApp(appName) {
  const iframe = document.createElement("iframe");
  iframe.src = `apps/${appName}/index.html`;
  iframe.classList.add("app-window");

  const closeBtn = document.createElement("button");
  closeBtn.className = "close-btn";
  closeBtn.textContent = "✕";
  closeBtn.onclick = () => {
    iframe.classList.remove("open");
    setTimeout(() => {
      container.innerHTML = "";
    }, 400);
  };

  container.innerHTML = "";
  container.appendChild(iframe);
  container.appendChild(closeBtn);

  // Trigger animation
  setTimeout(() => iframe.classList.add("open"), 10);
}