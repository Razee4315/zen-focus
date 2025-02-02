// web/script.js
document.addEventListener("DOMContentLoaded", () => {
    // Timer variables
    let timerInterval;
    const totalSeconds = 25 * 60;
    let remainingSeconds = totalSeconds;
    let isRunning = false;
    let timerStyle = "digital"; // "digital" or "analog"
  
    // DOM Elements for timer
    const digitalTimerEl = document.getElementById("digital-timer");
    const analogTimerEl = document.getElementById("analog-timer");
    const startBtn = document.getElementById("start-timer");
    const stopBtn = document.getElementById("stop-timer");
    const resetBtn = document.getElementById("reset-timer");
    const toggleTimerStyleBtn = document.getElementById("toggle-timer-style");
  
    // DOM Elements for task manager
    const addTaskBtn = document.getElementById("add-task");
    const newTaskInput = document.getElementById("new-task");
    const taskList = document.getElementById("task-list");
  
    // --- Timer functions ---
    function updateDigitalTimer() {
      let minutes = Math.floor(remainingSeconds / 60);
      let seconds = remainingSeconds % 60;
      digitalTimerEl.textContent = `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
    }
  
    function updateAnalogTimer() {
      const ctx = analogTimerEl.getContext("2d");
      const canvas = analogTimerEl;
      const cw = canvas.width;
      const ch = canvas.height;
      const cx = cw / 2;
      const cy = ch / 2;
      const radius = Math.min(cx, cy) - 10;
  
      ctx.clearRect(0, 0, cw, ch);
  
      // Draw clock background
      ctx.beginPath();
      ctx.arc(cx, cy, radius, 0, 2 * Math.PI);
      ctx.fillStyle = "rgba(229, 231, 235, 0.2)";
      ctx.fill();
      ctx.lineWidth = 8;
      ctx.strokeStyle = "#4caf50";
      ctx.stroke();
  
      // Draw progress arc
      const elapsed = totalSeconds - remainingSeconds;
      const progress = elapsed / totalSeconds;
      const startAngle = -Math.PI / 2;
      const endAngle = startAngle + progress * 2 * Math.PI;
  
      ctx.beginPath();
      ctx.arc(cx, cy, radius, startAngle, endAngle, false);
      ctx.lineWidth = 12;
      ctx.strokeStyle = "#43a047";
      ctx.stroke();
  
      // Draw time text in the center
      ctx.font = "bold 24px Poppins, sans-serif";
      ctx.fillStyle = "#fff";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      let minutes = Math.floor(remainingSeconds / 60);
      let seconds = remainingSeconds % 60;
      ctx.fillText(`${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`, cx, cy);
    }
  
    function updateTimerDisplay() {
      if (timerStyle === "digital") {
        updateDigitalTimer();
      } else {
        updateAnalogTimer();
      }
    }
  
    function startTimer() {
      if (isRunning) return;
      isRunning = true;
      timerInterval = setInterval(() => {
        if (remainingSeconds > 0) {
          remainingSeconds--;
          updateTimerDisplay();
        } else {
          clearInterval(timerInterval);
          isRunning = false;
          alert("Time's up!");
        }
      }, 1000);
    }
  
    function stopTimer() {
      clearInterval(timerInterval);
      isRunning = false;
    }
  
    function resetTimer() {
      stopTimer();
      remainingSeconds = totalSeconds;
      updateTimerDisplay();
    }
  
    toggleTimerStyleBtn.addEventListener("click", () => {
      if (timerStyle === "digital") {
        timerStyle = "analog";
        digitalTimerEl.classList.add("hidden");
        analogTimerEl.classList.remove("hidden");
      } else {
        timerStyle = "digital";
        analogTimerEl.classList.add("hidden");
        digitalTimerEl.classList.remove("hidden");
      }
      updateTimerDisplay();
    });
  
    startBtn.addEventListener("click", startTimer);
    stopBtn.addEventListener("click", stopTimer);
    resetBtn.addEventListener("click", resetTimer);
  
    // --- Task Manager Logic ---
    function refreshTaskList(tasks) {
      taskList.innerHTML = "";
      tasks.forEach((task, index) => {
        const li = document.createElement("li");
        li.className = "flex justify-between items-center";
        li.textContent = task;
        const delBtn = document.createElement("button");
        delBtn.textContent = "Delete";
        delBtn.className = "ml-4 text-sm px-3 py-1";
        delBtn.addEventListener("click", () => {
          eel.remove_task(index)(function(updatedTasks) {
            refreshTaskList(updatedTasks);
          });
        });
        li.appendChild(delBtn);
        taskList.appendChild(li);
      });
    }
  
    addTaskBtn.addEventListener("click", () => {
      let task = newTaskInput.value.trim();
      if (task) {
        eel.add_task(task)(function(updatedTasks) {
          refreshTaskList(updatedTasks);
          newTaskInput.value = "";
        });
      }
    });
  
    eel.get_tasks()(function(tasks) {
      refreshTaskList(tasks);
    });
  
    updateTimerDisplay();
  
    // --- Animation Theme Selector ---
    // Listen for changes on the animation selector and update the p5.js global variable.
    const animSelect = document.getElementById("animation-select");
    animSelect.addEventListener("change", function() {
      // Update the global variable used by p5.js (declared as window.currentTheme)
      window.currentTheme = this.value;
      if (typeof initTheme === "function") {
        initTheme();
      }
    });
  });
  