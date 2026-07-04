// App State
let state = {
  activeTab: "dashboard",
  checkedTasks: {}, // taskId: boolean
  checkedRoadmap: {}, // roadmapItemId: boolean
  selectedCategoryId: "dart-advanced",
  quiz: {
    currentIndex: 0,
    answers: {} // questionId: { selectedIndex: number, isCorrect: boolean }
  },
  interview: {
    selectedScenarioId: "",
    currentQuestionIndex: 0,
    history: {} // scenarioId: [ { sender: 'bot'|'user', text: string, analysis?: object } ]
  }
};

// Initializer
document.addEventListener("DOMContentLoaded", () => {
  loadState();
  initSidebar();
  initTabs();
  initCoreSkills();
  initRoadmap();
  initQuiz();
  initInterview();
  initCVBooster();

  // Draw initial progress metrics
  updateAllProgress();

  // Initialize Lucide Icons
  if (typeof lucide !== "undefined") {
    lucide.createIcons();
  }
});

// Load state from LocalStorage
function loadState() {
  const savedState = localStorage.getItem("seniorify_state");
  if (savedState) {
    try {
      const parsed = JSON.parse(savedState);
      state = { ...state, ...parsed };
    } catch (e) {
      console.error("Failed to parse local storage state", e);
    }
  }
}

// Save state to LocalStorage
function saveState() {
  localStorage.setItem("seniorify_state", JSON.stringify(state));
}

// Update all progress and re-render progress dependent elements
function updateAllProgress() {
  // 1. Calculate Core Skills Progress
  let totalTasks = 0;
  let completedTasks = 0;
  const categoryProgressMap = {};

  SENIORITY_DATA.categories.forEach(cat => {
    let catTotal = cat.tasks.length;
    let catCompleted = 0;
    
    cat.tasks.forEach(task => {
      totalTasks++;
      if (state.checkedTasks[task.id]) {
        catCompleted++;
        completedTasks++;
      }
    });

    categoryProgressMap[cat.id] = catTotal > 0 ? Math.round((catCompleted / catTotal) * 100) : 0;
  });

  // 2. Calculate Quiz Score
  let totalQuizzes = SENIORITY_DATA.quizzes.length;
  let solvedQuizzes = Object.keys(state.quiz.answers).length;
  let correctQuizzes = Object.values(state.quiz.answers).filter(ans => ans.isCorrect).length;
  let quizCorrectRate = solvedQuizzes > 0 ? Math.round((correctQuizzes / solvedQuizzes) * 100) : 0;

  // 3. Calculate Interview Completion
  let completedInterviews = 0;
  SENIORITY_DATA.interviews.forEach(scenario => {
    const history = state.interview.history[scenario.id] || [];
    // If we finished all questions in a scenario, count it as completed
    const isCompleted = history.length > 0 && history[history.length - 1].isFinished;
    if (isCompleted) {
      completedInterviews++;
    }
  });
  let interviewCompletionRate = SENIORITY_DATA.interviews.length > 0 
    ? Math.round((completedInterviews / SENIORITY_DATA.interviews.length) * 100) 
    : 0;

  // 4. Overall Weighted Score Calculation
  // 70% Core Skills + 15% Quizzes accuracy + 15% Mock Interview completions
  const skillsRate = totalTasks > 0 ? (completedTasks / totalTasks) : 0;
  const quizRate = totalQuizzes > 0 ? (correctQuizzes / totalQuizzes) : 0;
  const interviewRate = completedInterviews > 0 ? (completedInterviews / SENIORITY_DATA.interviews.length) : 0;
  
  const overallPercentage = Math.round(
    (skillsRate * 70) + (quizRate * 15) + (interviewRate * 15)
  );

  // Update Header UI Elements
  document.getElementById("overall-percentage").innerText = `${overallPercentage}%`;
  document.getElementById("overall-bar").style.width = `${overallPercentage}%`;
  
  // Grade evaluation based on overall score
  let readinessGrade = "Mid-Level";
  if (overallPercentage >= 85) readinessGrade = "Senior Engineer";
  else if (overallPercentage >= 55) readinessGrade = "Mid-Senior Eng";
  else if (overallPercentage >= 25) readinessGrade = "Strong Mid-Level";
  
  document.getElementById("readiness-grade").innerText = readinessGrade;

  // Update Dashboard Tab elements
  document.getElementById("completed-tasks-count").innerText = `${completedTasks}/${totalTasks}`;
  document.getElementById("quiz-correct-rate").innerText = `${quizCorrectRate}%`;

  // Render Category Progress on Dashboard
  renderDashboardProgress(categoryProgressMap);

  // Update Priority Gaps on Dashboard
  const gaps = ["flutter-internals", "dart-advanced", "performance", "native-dev", "system-design"];
  gaps.forEach(gapId => {
    const pct = categoryProgressMap[gapId] || 0;
    const pctLabel = document.getElementById(`gap-pct-${gapId}`);
    const fillBar = document.getElementById(`gap-fill-${gapId}`);
    if (pctLabel) pctLabel.innerText = `${pct}%`;
    if (fillBar) fillBar.style.width = `${pct}%`;
  });

  // Re-run Lucide
  if (typeof lucide !== "undefined") {
    lucide.createIcons();
  }
}

// Tabs Switching
function initTabs() {
  const navItems = document.querySelectorAll(".nav-item");
  navItems.forEach(item => {
    item.addEventListener("click", (e) => {
      e.preventDefault();
      
      // Deactivate current
      navItems.forEach(nav => nav.classList.remove("active"));
      document.querySelectorAll(".tab-panel").forEach(panel => panel.classList.remove("active"));
      
      // Activate new
      item.classList.add("active");
      const tabId = item.getAttribute("data-tab");
      state.activeTab = tabId;
      document.getElementById(`tab-${tabId}`).classList.add("active");
      
      // Update page titles
      const pageTitle = document.getElementById("page-title");
      const pageSubtitle = document.getElementById("page-subtitle");

      if (tabId === "dashboard") {
        pageTitle.innerText = "Seniority Dashboard";
        pageSubtitle.innerText = "Track your progress and bridge the senior gaps.";
        updateAllProgress();
      } else if (tabId === "skills") {
        pageTitle.innerText = "Core Senior Skills";
        pageSubtitle.innerText = "Detailed requirements for Senior Flutter Engineers. Check items off as you learn them.";
        renderCoreSkills();
      } else if (tabId === "roadmap") {
        pageTitle.innerText = "6-Month Progression Roadmap";
        pageSubtitle.innerText = "Focus targets for each phase to optimize study time.";
        renderRoadmap();
      } else if (tabId === "quizzes") {
        pageTitle.innerText = "Practice Quizzes";
        pageSubtitle.innerText = "Test your knowledge of Dart, internals, and architecture.";
        renderQuizQuestion();
      } else if (tabId === "interview") {
        pageTitle.innerText = "Mock Interview Room";
        pageSubtitle.innerText = "Simulate mock interview questions and compare your answers with senior templates.";
        renderInterview();
      } else if (tabId === "cv-booster") {
        pageTitle.innerText = "Resume & CV Booster";
        pageSubtitle.innerText = "Boost your bullet points to reflect high impact and system design expertise.";
      }
      
      saveState();
      
      if (typeof lucide !== "undefined") {
        lucide.createIcons();
      }
    });
  });
}

function initSidebar() {
  // Allows gap clicking in priority list to jump to core skills tab and open that specific category
  document.querySelectorAll(".gap-item").forEach(item => {
    item.addEventListener("click", () => {
      const catId = item.getAttribute("data-category");
      state.selectedCategoryId = catId;
      document.querySelector('[data-tab="skills"]').click();
    });
  });
}

// -------------------------------------------------------------
// DASHBOARD TAB RENDERING
// -------------------------------------------------------------
function renderDashboardProgress(progressMap) {
  const container = document.getElementById("categories-grid-progress");
  if (!container) return;

  container.innerHTML = "";
  SENIORITY_DATA.categories.forEach(cat => {
    const pct = progressMap[cat.id] || 0;
    
    const card = document.createElement("div");
    card.className = "cat-progress-item";
    card.innerHTML = `
      <div class="cat-progress-icon">
        <i data-lucide="${cat.icon}"></i>
      </div>
      <div class="cat-progress-details">
        <span class="cat-progress-name">${cat.title}</span>
        <div class="cat-progress-subbar">
          <div class="cat-progress-subfill" style="width: ${pct}%"></div>
        </div>
      </div>
      <span class="cat-progress-pct">${pct}%</span>
    `;

    card.addEventListener("click", () => {
      state.selectedCategoryId = cat.id;
      document.querySelector('[data-tab="skills"]').click();
    });

    container.appendChild(card);
  });
}


// -------------------------------------------------------------
// CORE SKILLS TAB RENDERING
// -------------------------------------------------------------
function initCoreSkills() {
  // This is handled by renderCoreSkills, called during tab switch
}

function renderCoreSkills() {
  const menuContainer = document.getElementById("skills-menu-list");
  const detailContainer = document.getElementById("skills-detail-container");
  if (!menuContainer || !detailContainer) return;

  // 1. Calculate percentages
  const percentages = {};
  SENIORITY_DATA.categories.forEach(cat => {
    let total = cat.tasks.length;
    let completed = 0;
    cat.tasks.forEach(task => {
      if (state.checkedTasks[task.id]) completed++;
    });
    percentages[cat.id] = total > 0 ? Math.round((completed / total) * 100) : 0;
  });

  // 2. Render Left Menu
  menuContainer.innerHTML = "";
  SENIORITY_DATA.categories.forEach(cat => {
    const activeClass = state.selectedCategoryId === cat.id ? "active" : "";
    const pct = percentages[cat.id] || 0;

    const btn = document.createElement("button");
    btn.className = `skills-menu-btn ${activeClass}`;
    btn.innerHTML = `
      <div class="skills-menu-btn-content">
        <i data-lucide="${cat.icon}"></i>
        <span class="skills-menu-btn-text">${cat.title}</span>
      </div>
      <span class="skills-menu-btn-pct">${pct}%</span>
    `;

    btn.addEventListener("click", () => {
      state.selectedCategoryId = cat.id;
      renderCoreSkills();
      saveState();
    });

    menuContainer.appendChild(btn);
  });

  // 3. Render Right Detail Checklist
  const activeCategory = SENIORITY_DATA.categories.find(c => c.id === state.selectedCategoryId);
  if (!activeCategory) return;

  const pct = percentages[activeCategory.id] || 0;
  
  detailContainer.innerHTML = `
    <div class="skills-detail-header">
      <div class="skills-detail-header-text">
        <h2>${activeCategory.title}</h2>
        <p>${activeCategory.description}</p>
      </div>
      <div class="skills-detail-progress">
        <span>Progress</span>
        <div class="skills-detail-progress-bar">
          <div class="skills-detail-progress-fill" style="width: ${pct}%"></div>
        </div>
        <span>${pct}%</span>
      </div>
    </div>
    
    <div class="skills-detail-body">
      <div class="checklist-nodes">
        ${activeCategory.tasks.map(task => {
          const isChecked = state.checkedTasks[task.id] ? "checked" : "";
          return `
            <div class="node-item">
              <label class="checkbox-container">
                <input type="checkbox" id="chk-${task.id}" ${isChecked} data-task-id="${task.id}">
                <span class="checkmark"></span>
              </label>
              <div class="node-content">
                <span class="node-title">${task.text}</span>
                <p class="node-desc">${task.desc}</p>
              </div>
            </div>
          `;
        }).join("")}
      </div>

      <div class="resources-section">
        <h3>📚 Recommended Study Resources</h3>
        <div class="resources-list">
          ${activeCategory.resources.map(res => `
            <a href="${res.url}" target="_blank" class="resource-link">
              <span>${res.title}</span>
              <i data-lucide="external-link"></i>
            </a>
          `).join("")}
        </div>
      </div>
    </div>
  `;

  // Attach event listeners to checkboxes
  detailContainer.querySelectorAll('input[type="checkbox"]').forEach(chk => {
    chk.addEventListener("change", (e) => {
      const taskId = e.target.getAttribute("data-task-id");
      state.checkedTasks[taskId] = e.target.checked;
      
      // Update current screen percentage directly
      saveState();
      renderCoreSkills();
      updateAllProgress();
    });
  });

  if (typeof lucide !== "undefined") {
    lucide.createIcons();
  }
}

// -------------------------------------------------------------
// ROADMAP TAB RENDERING
// -------------------------------------------------------------
function initRoadmap() {
  // Handled during renderRoadmap
}

function renderRoadmap() {
  const container = document.getElementById("roadmap-timeline-container");
  if (!container) return;

  container.innerHTML = "";
  SENIORITY_DATA.roadmap.forEach((stage, idx) => {
    const roadmapCard = document.createElement("div");
    roadmapCard.className = "roadmap-card card";
    
    // Check if user completed items
    const itemsHTML = stage.items.map((item, itemIdx) => {
      const itemId = `road-${idx}-${itemIdx}`;
      const isChecked = state.checkedRoadmap[itemId] ? "checked" : "";
      return `
        <div class="roadmap-item">
          <label class="checkbox-container">
            <input type="checkbox" id="${itemId}" ${isChecked} data-roadmap-item-id="${itemId}">
            <span class="checkmark"></span>
          </label>
          <span class="roadmap-item-text text-muted">${item}</span>
        </div>
      `;
    }).join("");

    roadmapCard.innerHTML = `
      <div class="roadmap-header">
        <div class="roadmap-month-title">
          <h3>${stage.month}: ${stage.title}</h3>
        </div>
        <span class="roadmap-duration">${stage.duration}</span>
      </div>
      <p class="roadmap-focus">${stage.focus}</p>
      <div class="roadmap-items-grid">
        ${itemsHTML}
      </div>
    `;

    // Hook listeners
    roadmapCard.querySelectorAll('input[type="checkbox"]').forEach(chk => {
      chk.addEventListener("change", (e) => {
        const itemId = e.target.getAttribute("data-roadmap-item-id");
        state.checkedRoadmap[itemId] = e.target.checked;
        
        // Toggle text styling
        const labelText = e.target.closest(".roadmap-item").querySelector(".roadmap-item-text");
        if (e.target.checked) {
          labelText.style.textDecoration = "line-through";
          labelText.style.color = "var(--text-muted)";
        } else {
          labelText.style.textDecoration = "none";
          labelText.style.color = "var(--text-main)";
        }

        saveState();
        updateRoadmapHighlight();
      });
    });

    container.appendChild(roadmapCard);
  });

  updateRoadmapHighlight();

  if (typeof lucide !== "undefined") {
    lucide.createIcons();
  }
}

// Dynamic Month focus update on Dashboard based on roadmap checkboxes
function updateRoadmapHighlight() {
  let focusMonth = "Month 1";
  
  // Look for the first month which is not fully checked
  for (let i = 0; i < SENIORITY_DATA.roadmap.length; i++) {
    const stage = SENIORITY_DATA.roadmap[i];
    let allChecked = true;
    for (let j = 0; j < stage.items.length; j++) {
      const itemId = `road-${i}-${j}`;
      if (!state.checkedRoadmap[itemId]) {
        allChecked = false;
        break;
      }
    }
    
    // Toggle visual line-through style on render time
    const cardEl = document.querySelectorAll(".roadmap-card")[i];
    if (cardEl) {
      cardEl.querySelectorAll(".roadmap-item").forEach(itemEl => {
        const chk = itemEl.querySelector('input[type="checkbox"]');
        const text = itemEl.querySelector('.roadmap-item-text');
        if (chk && chk.checked && text) {
          text.style.textDecoration = "line-through";
          text.style.color = "var(--text-muted)";
        } else if (text) {
          text.style.textDecoration = "none";
          text.style.color = "var(--text-main)";
        }
      });
    }

    if (!allChecked) {
      focusMonth = stage.month;
      break;
    }
    // If all months are checked, set to Capstone finished
    if (i === SENIORITY_DATA.roadmap.length - 1 && allChecked) {
      focusMonth = "Roadmap Completed! 🎉";
    }
  }

  const dashboardLabel = document.getElementById("current-month-roadmap");
  if (dashboardLabel) dashboardLabel.innerText = focusMonth;
}

// -------------------------------------------------------------
// PRACTICE QUIZZES TAB RENDERING
// -------------------------------------------------------------
let selectedQuizOptIndex = null;

function initQuiz() {
  document.getElementById("quiz-prev-btn").addEventListener("click", () => {
    if (state.quiz.currentIndex > 0) {
      state.quiz.currentIndex--;
      selectedQuizOptIndex = null;
      renderQuizQuestion();
      saveState();
    }
  });

  document.getElementById("quiz-next-btn").addEventListener("click", () => {
    const q = SENIORITY_DATA.quizzes[state.quiz.currentIndex];
    const isAnswered = state.quiz.answers[q.id] !== undefined;

    if (!isAnswered) {
      // Check Answer phase
      if (selectedQuizOptIndex === null) {
        alert("Please select an option first!");
        return;
      }
      const isCorrect = selectedQuizOptIndex === q.answerIndex;
      state.quiz.answers[q.id] = {
        selectedIndex: selectedQuizOptIndex,
        isCorrect: isCorrect
      };
      
      saveState();
      renderQuizQuestion();
      updateAllProgress();
    } else {
      // Move to Next Question
      if (state.quiz.currentIndex < SENIORITY_DATA.quizzes.length - 1) {
        state.quiz.currentIndex++;
        selectedQuizOptIndex = null;
        renderQuizQuestion();
        saveState();
      }
    }
  });

  document.getElementById("quiz-reset-btn").addEventListener("click", () => {
    if (confirm("Are you sure you want to reset your quiz statistics?")) {
      state.quiz.answers = {};
      state.quiz.currentIndex = 0;
      selectedQuizOptIndex = null;
      saveState();
      renderQuizQuestion();
      updateAllProgress();
    }
  });
}

function renderQuizQuestion() {
  const totalQuestions = SENIORITY_DATA.quizzes.length;
  if (totalQuestions === 0) return;

  const currentQ = SENIORITY_DATA.quizzes[state.quiz.currentIndex];
  
  // Update Question Header
  document.getElementById("quiz-question-number").innerText = `Question ${state.quiz.currentIndex + 1} of ${totalQuestions}`;
  
  // Category Badge mapping
  const categoryDetails = SENIORITY_DATA.categories.find(c => c.id === currentQ.category);
  const catBadge = document.getElementById("quiz-category-badge");
  catBadge.innerText = categoryDetails ? categoryDetails.title : "Flutter";

  // Question Text
  document.getElementById("quiz-question-text").innerText = currentQ.question;

  // Options
  const optionsContainer = document.getElementById("quiz-options");
  optionsContainer.innerHTML = "";
  
  const savedAnswer = state.quiz.answers[currentQ.id];
  const isAnswered = savedAnswer !== undefined;

  currentQ.options.forEach((opt, idx) => {
    const btn = document.createElement("button");
    btn.className = "quiz-opt-btn";
    
    // Visual indicators
    const isSelected = selectedQuizOptIndex === idx || (isAnswered && savedAnswer.selectedIndex === idx);
    if (isSelected) btn.classList.add("selected");
    
    if (isAnswered) {
      if (idx === currentQ.answerIndex) {
        btn.classList.add("correct");
      } else if (savedAnswer.selectedIndex === idx) {
        btn.classList.add("wrong");
      }
      btn.disabled = true; // Disable clicking after submission
    }

    btn.innerHTML = `
      <div class="quiz-opt-indicator">${String.fromCharCode(65 + idx)}</div>
      <span>${opt}</span>
    `;

    if (!isAnswered) {
      btn.addEventListener("click", () => {
        // Toggle selected option
        selectedQuizOptIndex = idx;
        document.querySelectorAll(".quiz-opt-btn").forEach(b => b.classList.remove("selected"));
        btn.classList.add("selected");
      });
    }

    optionsContainer.appendChild(btn);
  });

  // Navigation Buttons labels
  const prevBtn = document.getElementById("quiz-prev-btn");
  const nextBtn = document.getElementById("quiz-next-btn");

  prevBtn.disabled = state.quiz.currentIndex === 0;

  if (isAnswered) {
    nextBtn.innerText = state.quiz.currentIndex === totalQuestions - 1 ? "Finished" : "Next Question";
    nextBtn.disabled = state.quiz.currentIndex === totalQuestions - 1;
  } else {
    nextBtn.innerText = "Check Answer";
    nextBtn.disabled = false;
  }

  // Explanation Box
  const feedbackBox = document.getElementById("quiz-feedback");
  if (isAnswered) {
    feedbackBox.classList.remove("hidden");
    const titleEl = document.getElementById("feedback-title");
    const explanationEl = document.getElementById("feedback-explanation");
    const iconEl = document.getElementById("feedback-icon");
    
    if (savedAnswer.isCorrect) {
      feedbackBox.className = "quiz-feedback-box correct";
      titleEl.innerText = "Correct Answer!";
      iconEl.setAttribute("data-lucide", "check-circle");
    } else {
      feedbackBox.className = "quiz-feedback-box wrong";
      titleEl.innerText = "Incorrect Answer";
      iconEl.setAttribute("data-lucide", "alert-circle");
    }
    explanationEl.innerText = currentQ.explanation;
  } else {
    feedbackBox.classList.add("hidden");
  }

  // Render question dots / pagination panel
  renderQuizNavPanel();

  if (typeof lucide !== "undefined") {
    lucide.createIcons();
  }
}

function renderQuizNavPanel() {
  const container = document.getElementById("quiz-dots-container");
  if (!container) return;

  container.innerHTML = "";
  SENIORITY_DATA.quizzes.forEach((q, idx) => {
    const dot = document.createElement("div");
    dot.className = "q-dot";
    dot.innerText = idx + 1;

    // Check states
    const ans = state.quiz.answers[q.id];
    if (ans) {
      if (ans.isCorrect) dot.classList.add("solved-correct");
      else dot.classList.add("solved-wrong");
    }

    if (idx === state.quiz.currentIndex) {
      dot.classList.add("active");
    }

    dot.addEventListener("click", () => {
      state.quiz.currentIndex = idx;
      selectedQuizOptIndex = null;
      renderQuizQuestion();
      saveState();
    });

    container.appendChild(dot);
  });

  // Score circular progress ring math
  const total = SENIORITY_DATA.quizzes.length;
  let correct = 0;
  let solved = 0;
  
  SENIORITY_DATA.quizzes.forEach(q => {
    const ans = state.quiz.answers[q.id];
    if (ans) {
      solved++;
      if (ans.isCorrect) correct++;
    }
  });

  const ratioLabel = document.getElementById("quiz-score-ratio");
  const pctLabel = document.getElementById("quiz-score-pct");
  const ring = document.getElementById("quiz-ring");

  ratioLabel.innerText = `${solved}/${total} solved`;
  const pct = total > 0 ? Math.round((correct / total) * 100) : 0;
  pctLabel.innerText = `${pct}%`;

  // SVG dash offset calculation (radius is 50, circumference is 314)
  const offset = 314 - (314 * (correct / total));
  ring.style.strokeDashoffset = offset;
}

// -------------------------------------------------------------
// MOCK INTERVIEW TAB RENDERING
// -------------------------------------------------------------
function initInterview() {
  document.getElementById("interview-submit-btn").addEventListener("click", submitInterviewAnswer);
  
  // Make textarea respond to CMD+Enter / Ctrl+Enter to submit
  document.getElementById("interview-input").addEventListener("keydown", (e) => {
    if ((e.metaKey || e.ctrlKey) && e.key === "Enter") {
      e.preventDefault();
      submitInterviewAnswer();
    }
  });
}

function renderInterview() {
  const scenariosList = document.getElementById("interview-scenarios-list");
  if (!scenariosList) return;

  scenariosList.innerHTML = "";
  SENIORITY_DATA.interviews.forEach(scenario => {
    const btn = document.createElement("button");
    const activeClass = state.interview.selectedScenarioId === scenario.id ? "active" : "";
    btn.className = `scenario-btn ${activeClass}`;
    
    // Check if finished
    const hist = state.interview.history[scenario.id] || [];
    const isFinished = hist.length > 0 && hist[hist.length - 1].isFinished;
    const statusText = isFinished ? "Completed ✅" : (hist.length > 0 ? "In Progress 💬" : "Not Started");
    
    btn.innerHTML = `
      <span class="scenario-title">${scenario.title}</span>
      <span class="scenario-desc">${statusText}</span>
    `;

    btn.addEventListener("click", () => {
      selectInterviewScenario(scenario.id);
    });

    scenariosList.appendChild(btn);
  });

  renderActiveConsole();
}

function selectInterviewScenario(scenarioId) {
  state.interview.selectedScenarioId = scenarioId;
  
  // Set up fresh scenario state if empty
  if (!state.interview.history[scenarioId]) {
    const scenario = SENIORITY_DATA.interviews.find(s => s.id === scenarioId);
    state.interview.history[scenarioId] = [
      {
        sender: "bot",
        text: `Welcome to the ${scenario.title} Mock Interview. I am your Senior Technical Lead interviewer. Let's begin. \n\n**Question 1:** ${scenario.questions[0].q}`
      }
    ];
    state.interview.currentQuestionIndex = 0;
  } else {
    // Determine current index from messages count
    const history = state.interview.history[scenarioId];
    const userMessagesCount = history.filter(h => h.sender === "user").length;
    state.interview.currentQuestionIndex = userMessagesCount;
  }

  renderInterview();
  saveState();
}

function renderActiveConsole() {
  const scenarioId = state.interview.selectedScenarioId;
  const area = document.getElementById("interview-active-area");
  const inputEl = document.getElementById("interview-input");
  const submitBtn = document.getElementById("interview-submit-btn");

  if (!scenarioId) {
    inputEl.disabled = true;
    submitBtn.disabled = true;
    return;
  }

  const scenario = SENIORITY_DATA.interviews.find(s => s.id === scenarioId);
  document.getElementById("interview-topic-title").innerText = scenario.title;
  document.getElementById("interview-difficulty").innerText = scenario.difficulty;

  // Render chat messages
  const chatContainer = document.getElementById("interview-chat-container");
  chatContainer.innerHTML = "";

  const history = state.interview.history[scenarioId] || [];
  history.forEach(msg => {
    const msgDiv = document.createElement("div");
    msgDiv.className = `chat-message ${msg.sender}`;
    
    let analysisHTML = "";
    if (msg.analysis) {
      analysisHTML = `
        <div class="analysis-card">
          <div class="analysis-header">
            <i data-lucide="shield-check"></i>
            <span>Interviewer Feedback</span>
          </div>
          <div class="analysis-body">
            <h4>Keyword Match Score: <strong style="color: var(--accent-indigo)">${msg.analysis.score}/10</strong></h4>
            <p><strong>Missed terms:</strong> ${msg.analysis.missed.join(", ") || "None! Dynamic coverage is great."}</p>
            <h4>Expected Senior Vocabulary:</h4>
            <p style="font-style: italic; background: rgba(255,255,255,0.02); padding: 8px; border-radius: 4px; font-family: var(--font-mono); font-size: 0.75rem;">${msg.analysis.modelAnswer}</p>
          </div>
        </div>
      `;
    }

    msgDiv.innerHTML = `
      <div class="chat-bubble">
        ${msg.text.replace(/\n/g, "<br>")}
        ${analysisHTML}
      </div>
    `;

    chatContainer.appendChild(msgDiv);
  });

  // Scroll to bottom
  chatContainer.scrollTop = chatContainer.scrollHeight;

  // Enable input only if the interview is not completed yet
  const lastMsg = history[history.length - 1];
  const isFinished = lastMsg && lastMsg.isFinished;

  if (isFinished) {
    inputEl.disabled = true;
    inputEl.placeholder = "Mock Interview Complete!";
    submitBtn.disabled = true;
  } else {
    inputEl.disabled = false;
    inputEl.placeholder = "Type your response here... (Write detailed explanations covering mechanics and architecture)";
    submitBtn.disabled = false;
  }

  if (typeof lucide !== "undefined") {
    lucide.createIcons();
  }
}

function submitInterviewAnswer() {
  const scenarioId = state.interview.selectedScenarioId;
  const inputEl = document.getElementById("interview-input");
  const text = inputEl.value.trim();

  if (!text) return;

  const scenario = SENIORITY_DATA.interviews.find(s => s.id === scenarioId);
  const currentQIndex = state.interview.currentQuestionIndex;
  const currentQuestion = scenario.questions[currentQIndex];

  // 1. Qualitative Evaluation logic
  const responseAnalysis = evaluateAnswerQualitatively(text, currentQuestion.modelAnswer);

  // 2. Add User Message
  state.interview.history[scenarioId].push({
    sender: "user",
    text: text,
    analysis: responseAnalysis
  });

  // Clean text input
  inputEl.value = "";

  // Disable temporarily to simulate thinking / delay
  inputEl.disabled = true;
  document.getElementById("interview-submit-btn").disabled = true;

  // Increment index
  const nextQIndex = currentQIndex + 1;
  state.interview.currentQuestionIndex = nextQIndex;

  saveState();
  renderActiveConsole();

  // Simulate typing response
  setTimeout(() => {
    const history = state.interview.history[scenarioId];
    
    if (nextQIndex < scenario.questions.length) {
      history.push({
        sender: "bot",
        text: `Thanks for that explanation. Let's move to the next item.\n\n**Question ${nextQIndex + 1}:** ${scenario.questions[nextQIndex].q}`
      });
    } else {
      // End Scenario
      history.push({
        sender: "bot",
        text: `Excellent. That concludes this mock session! You have completed all questions in the **${scenario.title}** module. I've stored your answers and marked this topic as complete. Check your updated overall Senior Score!`,
        isFinished: true
      });
    }
    
    saveState();
    renderInterview(); // Update menu badge count
    updateAllProgress(); // Update overall percentage
  }, 1200);
}

// Simple rule-based grading based on technical keywords matching the model answer
function evaluateAnswerQualitatively(userAnswer, modelAnswer) {
  const lowercaseUser = userAnswer.toLowerCase();
  const lowercaseModel = modelAnswer.toLowerCase();

  // Extract core keywords from model answer (words of length > 5, ignoring basic structure)
  const commonWords = ["explain", "difference", "between", "how", "does", "where", "what", "which", "actually", "the", "and", "that", "this", "from", "with", "using", "into", "their"];
  const modelTerms = lowercaseModel
    .replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g, "")
    .split(/\s+/)
    .filter(word => word.length > 3 && !commonWords.includes(word));
  
  // Unique target vocab words
  const uniqueTargets = [...new Set(modelTerms)];
  
  // Find matching words
  const matched = [];
  const missed = [];
  
  uniqueTargets.forEach(term => {
    if (lowercaseUser.includes(term)) {
      matched.push(term);
    } else {
      missed.push(term);
    }
  });

  // Calculate score out of 10
  const totalTermsCount = uniqueTargets.length;
  const matchedCount = matched.length;
  let score = totalTermsCount > 0 ? Math.round((matchedCount / totalTermsCount) * 10) : 10;
  
  // Add minimum length penalty
  if (userAnswer.length < 50) score = Math.max(1, score - 5);
  else if (userAnswer.length < 150) score = Math.max(1, score - 2);

  // Return limited missed array for UI display
  return {
    score: score,
    missed: missed.slice(0, 4),
    modelAnswer: modelAnswer
  };
}

// -------------------------------------------------------------
// CV BOOSTER TAB RENDERING
// -------------------------------------------------------------
function initCVBooster() {
  const container = document.getElementById("cv-items-container");
  if (!container) return;

  container.innerHTML = "";
  SENIORITY_DATA.cvTips.forEach(tip => {
    const card = document.createElement("div");
    card.className = "cv-item";
    card.innerHTML = `
      <div class="cv-category-title">${tip.role}</div>
      <div class="cv-comparison-card">
        <div class="cv-pane before">
          <div class="cv-label">Mid-Level / Generic Bullet</div>
          <p class="cv-text">"${tip.before}"</p>
        </div>
        <div class="cv-pane after">
          <div class="cv-label">Senior / High Impact Bullet</div>
          <p class="cv-text">"${tip.after}"</p>
          <div class="cv-highlight-bullet">💡 Formula: Action + Technical Architectural abstraction + Quantifiable Metric</div>
        </div>
      </div>
    `;

    container.appendChild(card);
  });
}
