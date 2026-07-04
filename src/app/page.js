"use client";

import React, { useState, useEffect, useRef } from "react";
import { 
  LayoutDashboard, ShieldCheck, MapPin, HelpCircle, 
  MessageSquare, FileText, Award, Calendar, TrendingUp, 
  Code2, Layers, GitFork, Puzzle, Smartphone, Zap, 
  TestTube, Terminal, GitBranch, Binary, Users, Globe, ExternalLink,
  CheckCircle, AlertCircle, RefreshCw, Send, Sparkles
} from "lucide-react";
import { seniorityData } from "../data/seniorityData";

// Icon mapper helper
const IconMap = {
  Code2, Layers, GitFork, Puzzle, Smartphone, Zap, 
  TestTube, Terminal, GitBranch, Binary, Users, Globe,
  LayoutDashboard, ShieldCheck, MapPin, HelpCircle, MessageSquare, FileText
};

const renderIcon = (name, className = "") => {
  const IconComponent = IconMap[name] || ShieldCheck;
  return <IconComponent className={className} />;
};

export default function Home() {
  const [mounted, setMounted] = useState(false);
  const [activeTab, setActiveTab] = useState("dashboard");
  const [checkedTasks, setCheckedTasks] = useState({});
  const [checkedRoadmap, setCheckedRoadmap] = useState({});
  const [selectedCategoryId, setSelectedCategoryId] = useState("dart-advanced");
  
  // Quiz State
  const [quizIndex, setQuizIndex] = useState(0);
  const [quizAnswers, setQuizAnswers] = useState({}); // questionId: { selectedIndex, isCorrect }
  const [selectedQuizOptIndex, setSelectedQuizOptIndex] = useState(null);

  // Interview State
  const [selectedScenarioId, setSelectedScenarioId] = useState("");
  const [interviewHistory, setInterviewHistory] = useState({}); // scenarioId: [ messages ]
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [interviewInput, setInterviewInput] = useState("");
  const [isBotTyping, setIsBotTyping] = useState(false);

  const chatEndRef = useRef(null);

  // Hydration fix & LocalStorage load
  useEffect(() => {
    setMounted(true);
    const savedState = localStorage.getItem("seniorify_next_state");
    if (savedState) {
      try {
        const parsed = JSON.parse(savedState);
        if (parsed.checkedTasks) setCheckedTasks(parsed.checkedTasks);
        if (parsed.checkedRoadmap) setCheckedRoadmap(parsed.checkedRoadmap);
        if (parsed.selectedCategoryId) setSelectedCategoryId(parsed.selectedCategoryId);
        if (parsed.quizAnswers) setQuizAnswers(parsed.quizAnswers);
        if (parsed.quizIndex !== undefined) setQuizIndex(parsed.quizIndex);
        if (parsed.selectedScenarioId) setSelectedScenarioId(parsed.selectedScenarioId);
        if (parsed.interviewHistory) setInterviewHistory(parsed.interviewHistory);
        if (parsed.currentQuestionIndex !== undefined) setCurrentQuestionIndex(parsed.currentQuestionIndex);
      } catch (e) {
        console.error("Error loading localStorage state:", e);
      }
    }
  }, []);

  // Save state to LocalStorage when changed
  useEffect(() => {
    if (!mounted) return;
    const stateToSave = {
      checkedTasks,
      checkedRoadmap,
      selectedCategoryId,
      quizIndex,
      quizAnswers,
      selectedScenarioId,
      interviewHistory,
      currentQuestionIndex
    };
    localStorage.setItem("seniorify_next_state", JSON.stringify(stateToSave));
  }, [checkedTasks, checkedRoadmap, selectedCategoryId, quizIndex, quizAnswers, selectedScenarioId, interviewHistory, currentQuestionIndex, mounted]);

  // Scroll to bottom of chat when history changes
  useEffect(() => {
    if (chatEndRef.current) {
      chatEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [interviewHistory, selectedScenarioId, isBotTyping]);

  if (!mounted) {
    return (
      <div className="flex h-screen w-screen items-center justify-center bg-[#08080c] text-white">
        <div className="flex flex-col items-center gap-4">
          <RefreshCw className="animate-spin text-indigo-500" size={32} />
          <span className="text-sm font-semibold tracking-wider text-gray-400">Loading Dashboard...</span>
        </div>
      </div>
    );
  }

  // -------------------------------------------------------------
  // CALCULATE PROGRESS METRICS
  // -------------------------------------------------------------
  let totalTasks = 0;
  let completedTasks = 0;
  const categoryProgressMap = {};

  seniorityData.categories.forEach(cat => {
    let catTotal = cat.tasks.length;
    let catCompleted = 0;
    
    cat.tasks.forEach(task => {
      totalTasks++;
      if (checkedTasks[task.id]) {
        catCompleted++;
        completedTasks++;
      }
    });

    categoryProgressMap[cat.id] = catTotal > 0 ? Math.round((catCompleted / catTotal) * 100) : 0;
  });

  // Quiz details
  let totalQuizzes = seniorityData.quizzes.length;
  let solvedQuizzes = Object.keys(quizAnswers).length;
  let correctQuizzes = Object.values(quizAnswers).filter(ans => ans.isCorrect).length;
  let quizCorrectRate = solvedQuizzes > 0 ? Math.round((correctQuizzes / solvedQuizzes) * 100) : 0;

  // Interview details
  let completedInterviews = 0;
  seniorityData.interviews.forEach(scenario => {
    const history = interviewHistory[scenario.id] || [];
    const isCompleted = history.length > 0 && history[history.length - 1].isFinished;
    if (isCompleted) completedInterviews++;
  });
  
  // Overall score: 70% Skills, 15% Quizzes accuracy, 15% Interview completions
  const skillsRate = totalTasks > 0 ? (completedTasks / totalTasks) : 0;
  const quizRate = totalQuizzes > 0 ? (correctQuizzes / totalQuizzes) : 0;
  const interviewRate = seniorityData.interviews.length > 0 
    ? (completedInterviews / seniorityData.interviews.length) 
    : 0;

  const overallPercentage = Math.round(
    (skillsRate * 70) + (quizRate * 15) + (interviewRate * 15)
  );

  let readinessGrade = "Mid-Level";
  if (overallPercentage >= 85) readinessGrade = "Senior Engineer";
  else if (overallPercentage >= 55) readinessGrade = "Mid-Senior Eng";
  else if (overallPercentage >= 25) readinessGrade = "Strong Mid-Level";

  // Calculate current Month focus target based on roadmap checkboxes
  let currentMonthFocus = "Month 1";
  for (let i = 0; i < seniorityData.roadmap.length; i++) {
    const stage = seniorityData.roadmap[i];
    let allChecked = true;
    for (let j = 0; j < stage.items.length; j++) {
      const itemId = `road-${i}-${j}`;
      if (!checkedRoadmap[itemId]) {
        allChecked = false;
        break;
      }
    }
    if (!allChecked) {
      currentMonthFocus = stage.month;
      break;
    }
    if (i === seniorityData.roadmap.length - 1 && allChecked) {
      currentMonthFocus = "Roadmap Completed! 🎉";
    }
  }

  // -------------------------------------------------------------
  // MOCK INTERVIEW BOT ACTIONS
  // -------------------------------------------------------------
  const handleSelectScenario = (scenarioId) => {
    setSelectedScenarioId(scenarioId);
    if (!interviewHistory[scenarioId]) {
      const scenario = seniorityData.interviews.find(s => s.id === scenarioId);
      setInterviewHistory(prev => ({
        ...prev,
        [scenarioId]: [
          {
            sender: "bot",
            text: `Welcome to the ${scenario.title} Mock Interview. I am your Senior Technical Lead interviewer. Let's begin.\n\n**Question 1:** ${scenario.questions[0].q}`
          }
        ]
      }));
      setCurrentQuestionIndex(0);
    } else {
      const history = interviewHistory[scenarioId];
      const userMessages = history.filter(h => h.sender === "user");
      setCurrentQuestionIndex(userMessages.length);
    }
  };

  const handleKeyPress = (e) => {
    if ((e.metaKey || e.ctrlKey) && e.key === "Enter") {
      e.preventDefault();
      submitInterviewAnswer();
    }
  };

  const submitInterviewAnswer = () => {
    const text = interviewInput.trim();
    if (!text || isBotTyping) return;

    const scenario = seniorityData.interviews.find(s => s.id === selectedScenarioId);
    const currentQuestion = scenario.questions[currentQuestionIndex];

    // Qualitative analysis
    const analysis = evaluateUserResponse(text, currentQuestion.modelAnswer);

    // Save user message
    const updatedHistory = [
      ...(interviewHistory[selectedScenarioId] || []),
      { sender: "user", text, analysis }
    ];

    setInterviewHistory(prev => ({
      ...prev,
      [selectedScenarioId]: updatedHistory
    }));
    setInterviewInput("");
    setIsBotTyping(true);

    const nextIndex = currentQuestionIndex + 1;
    setCurrentQuestionIndex(nextIndex);

    // Simulated Bot Typing delay
    setTimeout(() => {
      setIsBotTyping(false);
      let botResponse = {};
      if (nextIndex < scenario.questions.length) {
        botResponse = {
          sender: "bot",
          text: `Thanks for that explanation. Let's move to the next item.\n\n**Question ${nextIndex + 1}:** ${scenario.questions[nextIndex].q}`
        };
      } else {
        botResponse = {
          sender: "bot",
          text: `Excellent. That concludes this mock session! You have completed all questions in the **${scenario.title}** module. I've stored your answers and marked this topic as complete. Check your updated overall Senior Score!`,
          isFinished: true
        };
      }

      setInterviewHistory(prev => ({
        ...prev,
        [selectedScenarioId]: [...updatedHistory, botResponse]
      }));
    }, 1500);
  };

  const evaluateUserResponse = (userAnswer, modelAnswer) => {
    const lowercaseUser = userAnswer.toLowerCase();
    const lowercaseModel = modelAnswer.toLowerCase();

    const commonWords = ["explain", "difference", "between", "how", "does", "where", "what", "which", "actually", "the", "and", "that", "this", "from", "with", "using", "into", "their"];
    const modelTerms = lowercaseModel
      .replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g, "")
      .split(/\s+/)
      .filter(word => word.length > 3 && !commonWords.includes(word));
    
    const uniqueTargets = [...new Set(modelTerms)];
    const matched = [];
    const missed = [];
    
    uniqueTargets.forEach(term => {
      if (lowercaseUser.includes(term)) {
        matched.push(term);
      } else {
        missed.push(term);
      }
    });

    let score = uniqueTargets.length > 0 ? Math.round((matched.length / uniqueTargets.length) * 10) : 10;
    
    // Length penalties
    if (userAnswer.length < 50) score = Math.max(1, score - 5);
    else if (userAnswer.length < 150) score = Math.max(1, score - 2);

    return {
      score,
      missed: missed.slice(0, 4),
      modelAnswer
    };
  };

  // -------------------------------------------------------------
  // TAB CONDITIONAL RENDERING FUNCTIONS
  // -------------------------------------------------------------
  const renderDashboardPanel = () => {
    const gaps = ["flutter-internals", "dart-advanced", "performance", "native-dev", "system-design"];
    return (
      <div className="tab-panel active">
        {/* Welcome banner */}
        <div className="alert-banner">
          <div className="banner-content">
            <h3>🚀 Welcome to your Senior Journey!</h3>
            <p>You have a strong Flutter production base. To achieve a <strong>Senior</strong> rank, focus on the gaps identified: <strong>Flutter Internals, Advanced Dart, Performance, Native Bridges, and Leadership/System Design</strong>.</p>
          </div>
          <button className="banner-btn" onClick={() => { setActiveTab("skills"); }}>Explore Skills</button>
        </div>

        {/* Stats Grid */}
        <div className="grid-3">
          <div className="card stat-card glow-card">
            <div className="card-icon-wrapper purple">
              <Award />
            </div>
            <div className="stat-content">
              <span className="stat-num">{completedTasks}/{totalTasks}</span>
              <span className="stat-title">Completed Skill Nodes</span>
            </div>
          </div>

          <div className="card stat-card">
            <div className="card-icon-wrapper blue">
              <Calendar />
            </div>
            <div className="stat-content">
              <span className="stat-num">{currentMonthFocus}</span>
              <span className="stat-title">Current Phase Focus</span>
            </div>
          </div>

          <div className="card stat-card">
            <div className="card-icon-wrapper green">
              <TrendingUp />
            </div>
            <div className="stat-content">
              <span className="stat-num">{quizCorrectRate}%</span>
              <span className="stat-title">Quiz Accuracy Rate</span>
            </div>
          </div>
        </div>

        {/* Gaps and Category grids */}
        <div className="grid-2 mt-4">
          {/* Priority Gaps */}
          <div className="card gap-highlight-card">
            <div className="card-header">
              <h2>⚠️ Priority Gap Analysis</h2>
              <span className="badge badge-warning">High Priority</span>
            </div>
            <div className="card-body">
              <p className="text-muted mb-4 font-normal text-sm">Focus on these 5 areas highlighted as your largest current gaps to push your seniority forward:</p>
              <div className="gap-list">
                {gaps.map(gapId => {
                  const cat = seniorityData.categories.find(c => c.id === gapId);
                  const pct = categoryProgressMap[gapId] || 0;
                  return (
                    <div className="gap-item" key={gapId} onClick={() => { setSelectedCategoryId(gapId); setActiveTab("skills"); }}>
                      <div className="gap-meta">
                        <span className="gap-name">{cat?.title}</span>
                        <span className="gap-pct">{pct}%</span>
                      </div>
                      <div className="gap-bar">
                        <div className="gap-fill" style={{ width: `${pct}%` }}></div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Grid Category progress */}
          <div className="card flex-card">
            <div className="card-header">
              <h2>📈 Category Progress</h2>
            </div>
            <div className="card-body">
              <div className="all-categories-progress">
                {seniorityData.categories.map(cat => {
                  const pct = categoryProgressMap[cat.id] || 0;
                  return (
                    <div className="cat-progress-item" key={cat.id} onClick={() => { setSelectedCategoryId(cat.id); setActiveTab("skills"); }}>
                      <div className="cat-progress-icon">
                        {renderIcon(cat.icon)}
                      </div>
                      <div className="cat-progress-details">
                        <span className="cat-progress-name">{cat.title}</span>
                        <div className="cat-progress-subbar">
                          <div className="cat-progress-subfill" style={{ width: `${pct}%` }}></div>
                        </div>
                      </div>
                      <span className="cat-progress-pct">{pct}%</span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const renderSkillsPanel = () => {
    const activeCategory = seniorityData.categories.find(c => c.id === selectedCategoryId) || seniorityData.categories[0];
    const activePct = categoryProgressMap[activeCategory.id] || 0;

    const handleCheckboxChange = (taskId, isChecked) => {
      setCheckedTasks(prev => ({
        ...prev,
        [taskId]: isChecked
      }));
    };

    return (
      <div className="skills-layout">
        {/* Left menu categories */}
        <div className="skills-menu">
          {seniorityData.categories.map(cat => {
            const isActive = selectedCategoryId === cat.id;
            const pct = categoryProgressMap[cat.id] || 0;
            return (
              <button 
                key={cat.id} 
                className={`skills-menu-btn ${isActive ? "active" : ""}`}
                onClick={() => { setSelectedCategoryId(cat.id); }}
              >
                <div className="skills-menu-btn-content">
                  {renderIcon(cat.icon)}
                  <span className="skills-menu-btn-text">{cat.title}</span>
                </div>
                <span className="skills-menu-btn-pct">{pct}%</span>
              </button>
            );
          })}
        </div>

        {/* Right detailed list */}
        <div className="skills-detail card">
          <div className="skills-detail-header">
            <div className="skills-detail-header-text">
              <h2>{activeCategory.title}</h2>
              <p>{activeCategory.description}</p>
            </div>
            <div className="skills-detail-progress">
              <span className="text-xs text-muted">Progress</span>
              <div className="skills-detail-progress-bar">
                <div className="skills-detail-progress-fill" style={{ width: `${activePct}%` }}></div>
              </div>
              <span className="text-xs">{activePct}%</span>
            </div>
          </div>

          <div className="skills-detail-body">
            <div className="checklist-nodes">
              {activeCategory.tasks.map(task => {
                const isChecked = !!checkedTasks[task.id];
                return (
                  <div className="node-item animate-fadeIn" key={task.id}>
                    <label className="checkbox-container">
                      <input 
                        type="checkbox" 
                        checked={isChecked}
                        onChange={(e) => handleCheckboxChange(task.id, e.target.checked)}
                      />
                      <span className="checkmark"></span>
                    </label>
                    <div className="node-content">
                      <span className="node-title font-semibold">{task.text}</span>
                      <p className="node-desc text-muted mt-1 text-sm">{task.desc}</p>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="resources-section">
              <h3>📚 Recommended Study Resources</h3>
              <div className="resources-list">
                {activeCategory.resources.map((res, i) => (
                  <a href={res.url} target="_blank" rel="noopener noreferrer" className="resource-link" key={i}>
                    <span>{res.title}</span>
                    <ExternalLink size={14} />
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const renderRoadmapPanel = () => {
    return (
      <div className="tab-panel active">
        <div className="roadmap-intro card">
          <h2>📍 3-Month Structured Study Roadmap</h2>
          <p className="text-muted">A timeline compressed based on your current background. Check off roadmap milestones as you progress through the months.</p>
        </div>

        <div className="roadmap-timeline">
          {seniorityData.roadmap.map((stage, idx) => (
            <div className="roadmap-card card" key={idx}>
              <div className="roadmap-header">
                <div className="roadmap-month-title">
                  <h3>{stage.month}: {stage.title}</h3>
                </div>
                <span className="roadmap-duration">{stage.duration}</span>
              </div>
              <p className="roadmap-focus text-sm text-muted">{stage.focus}</p>
              
              <div className="roadmap-items-grid">
                {stage.items.map((item, itemIdx) => {
                  const itemId = `road-${idx}-${itemIdx}`;
                  const isChecked = !!checkedRoadmap[itemId];
                  return (
                    <div className="roadmap-item" key={itemId}>
                      <label className="checkbox-container">
                        <input 
                          type="checkbox" 
                          checked={isChecked}
                          onChange={(e) => {
                            setCheckedRoadmap(prev => ({ ...prev, [itemId]: e.target.checked }));
                          }}
                        />
                        <span className="checkmark"></span>
                      </label>
                      <span 
                        className="roadmap-item-text text-muted text-sm"
                        style={{ textDecoration: isChecked ? "line-through" : "none", color: isChecked ? "var(--text-muted)" : "var(--text-main)" }}
                      >
                        {item}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  const renderQuizPanel = () => {
    const currentQ = seniorityData.quizzes[quizIndex];
    const catDetails = seniorityData.categories.find(c => c.id === currentQ.category);
    const savedAnswer = quizAnswers[currentQ.id];
    const isAnswered = savedAnswer !== undefined;

    const handleCheckAnswer = () => {
      if (selectedQuizOptIndex === null) {
        alert("Please select an option first!");
        return;
      }
      const isCorrect = selectedQuizOptIndex === currentQ.answerIndex;
      setQuizAnswers(prev => ({
        ...prev,
        [currentQ.id]: {
          selectedIndex: selectedQuizOptIndex,
          isCorrect
        }
      }));
    };

    const handleNextQuestion = () => {
      if (quizIndex < totalQuizzes - 1) {
        setQuizIndex(quizIndex + 1);
        setSelectedQuizOptIndex(null);
      }
    };

    const handlePrevQuestion = () => {
      if (quizIndex > 0) {
        setQuizIndex(quizIndex - 1);
        setSelectedQuizOptIndex(null);
      }
    };

    const handleResetQuizzes = () => {
      if (window.confirm("Are you sure you want to reset your quiz statistics?")) {
        setQuizAnswers({});
        setQuizIndex(0);
        setSelectedQuizOptIndex(null);
      }
    };

    // SVG dash offset calculation
    const solvedCount = Object.keys(quizAnswers).length;
    const correctCount = Object.values(quizAnswers).filter(ans => ans.isCorrect).length;
    const solvedPct = totalQuizzes > 0 ? Math.round((correctCount / totalQuizzes) * 100) : 0;
    const offset = 314 - (314 * (correctCount / totalQuizzes));

    return (
      <div className="grid-quiz-layout">
        {/* Left active question */}
        <div className="card quiz-card">
          <div className="card-header">
            <h2>Question {quizIndex + 1} of {totalQuizzes}</h2>
            <span className="badge badge-purple">{catDetails?.title || "Flutter"}</span>
          </div>

          <div className="card-body">
            <p className="quiz-question">{currentQ.question}</p>
            <div className="quiz-options-container">
              {currentQ.options.map((opt, idx) => {
                const isSelected = selectedQuizOptIndex === idx || (isAnswered && savedAnswer.selectedIndex === idx);
                let optClass = "quiz-opt-btn";
                if (isSelected) optClass += " selected";
                if (isAnswered) {
                  if (idx === currentQ.answerIndex) optClass += " correct";
                  else if (savedAnswer.selectedIndex === idx) optClass += " wrong";
                }
                return (
                  <button 
                    key={idx}
                    className={optClass}
                    disabled={isAnswered}
                    onClick={() => setSelectedQuizOptIndex(idx)}
                  >
                    <div className="quiz-opt-indicator">{String.fromCharCode(65 + idx)}</div>
                    <span>{opt}</span>
                  </button>
                );
              })}
            </div>

            {isAnswered && (
              <div className={`quiz-feedback-box ${savedAnswer.isCorrect ? "correct" : "wrong"}`}>
                <div className="feedback-status">
                  {savedAnswer.isCorrect ? <CheckCircle size={18} /> : <AlertCircle size={18} />}
                  <span>{savedAnswer.isCorrect ? "Correct Answer!" : "Incorrect Answer"}</span>
                </div>
                <p id="feedback-explanation">{currentQ.explanation}</p>
              </div>
            )}
          </div>

          <div className="card-footer">
            <button className="btn btn-secondary text-sm" disabled={quizIndex === 0} onClick={handlePrevQuestion}>Previous</button>
            {!isAnswered ? (
              <button className="btn btn-primary text-sm" onClick={handleCheckAnswer}>Check Answer</button>
            ) : (
              <button 
                className="btn btn-primary text-sm" 
                disabled={quizIndex === totalQuizzes - 1} 
                onClick={handleNextQuestion}
              >
                {quizIndex === totalQuizzes - 1 ? "Completed" : "Next Question"}
              </button>
            )}
          </div>
        </div>

        {/* Right side stats panel */}
        <div className="card quiz-stats-panel">
          <h2>Quiz Performance</h2>
          <div className="quiz-score-circle">
            <svg width="120" height="120">
              <circle cx="60" cy="60" r="50" className="ring-bg"></circle>
              <circle cx="60" cy="60" r="50" className="ring-fill" style={{ strokeDashoffset: offset }}></circle>
            </svg>
            <div className="score-text">
              <span className="score-percentage">{solvedPct}%</span>
              <span className="score-subtext">{solvedCount}/{totalQuizzes} solved</span>
            </div>
          </div>

          <div className="quiz-question-nav">
            <h3>All Questions</h3>
            <div className="question-dots">
              {seniorityData.quizzes.map((q, idx) => {
                const ans = quizAnswers[q.id];
                let dotClass = "q-dot";
                if (ans) {
                  dotClass += ans.isCorrect ? " solved-correct" : " solved-wrong";
                }
                if (idx === quizIndex) dotClass += " active";
                return (
                  <div 
                    key={q.id} 
                    className={dotClass}
                    onClick={() => { setQuizIndex(idx); setSelectedQuizOptIndex(null); }}
                  >
                    {idx + 1}
                  </div>
                );
              })}
            </div>
          </div>

          <button className="btn btn-outline-primary w-full mt-8 text-sm" onClick={handleResetQuizzes}>Reset All Quizzes</button>
        </div>
      </div>
    );
  };

  const renderInterviewPanel = () => {
    const history = interviewHistory[selectedScenarioId] || [];
    const lastMsg = history[history.length - 1];
    const isFinished = lastMsg && lastMsg.isFinished;

    return (
      <div className="grid-2-3">
        {/* Left Side: Scenario select list */}
        <div className="interview-sidebar">
          <div className="card">
            <h2>Select Topic</h2>
            <div className="scenario-list">
              {seniorityData.interviews.map(scenario => {
                const isActive = selectedScenarioId === scenario.id;
                const hist = interviewHistory[scenario.id] || [];
                const done = hist.length > 0 && hist[hist.length - 1].isFinished;
                const statusText = done ? "Completed ✅" : (hist.length > 0 ? "In Progress 💬" : "Not Started");
                return (
                  <button 
                    key={scenario.id} 
                    className={`scenario-btn ${isActive ? "active" : ""}`}
                    onClick={() => handleSelectScenario(scenario.id)}
                  >
                    <span className="scenario-title">{scenario.title}</span>
                    <span className="scenario-desc">{statusText}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Right Side: Active Console */}
        <div className="interview-console card">
          {selectedScenarioId ? (
            <div id="interview-active-area" className="flex flex-col h-full overflow-hidden">
              <div className="console-header flex-shrink-0">
                <div className="console-badge">
                  <span className="live-dot"></span>
                  <span>{seniorityData.interviews.find(s => s.id === selectedScenarioId)?.title}</span>
                </div>
                <span className="difficulty-tag">Senior</span>
              </div>

              <div className="console-chat flex-grow overflow-y-auto">
                {history.map((msg, i) => (
                  <div className={`chat-message ${msg.sender} animate-fadeIn`} key={i}>
                    <div className="chat-bubble">
                      <p style={{ whiteSpace: "pre-line" }}>{msg.text}</p>
                      
                      {msg.analysis && (
                        <div className="analysis-card mt-4">
                          <div className="analysis-header text-amber-500">
                            <Sparkles size={14} className="inline mr-1" />
                            <span>Interviewer Feedback</span>
                          </div>
                          <div className="analysis-body text-xs mt-2">
                            <h4>Keyword Match Score: <strong className="text-indigo-400">{msg.analysis.score}/10</strong></h4>
                            <p className="mt-1"><strong>Missed terms:</strong> {msg.analysis.missed.join(", ") || "None! Dynamic coverage is great."}</p>
                            <h4 className="mt-3 text-gray-300 font-semibold">Expected Senior Vocabulary:</h4>
                            <p className="mt-1 p-2 bg-black/40 rounded border border-white/5 font-mono text-[11px] leading-relaxed select-all">{msg.analysis.modelAnswer}</p>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                ))}

                {isBotTyping && (
                  <div className="chat-message bot animate-pulse">
                    <div className="chat-bubble">
                      <p className="text-sm text-muted">Interviewer is typing...</p>
                    </div>
                  </div>
                )}
                
                <div ref={chatEndRef} />
              </div>

              <div className="console-input-area flex-shrink-0">
                <textarea 
                  value={interviewInput}
                  onChange={(e) => setInterviewInput(e.target.value)}
                  onKeyDown={handleKeyPress}
                  placeholder={isFinished ? "Mock Interview Complete!" : "Type your response here... (Write detailed explanations covering mechanics and architecture)"}
                  rows={3}
                  disabled={!selectedScenarioId || isFinished || isBotTyping}
                />
                <div className="console-actions">
                  <span className="tip-text text-xs text-muted">Pro Tip: Answer using clean architecture terms, structural design patterns, and rendering details. (CMD+Enter to submit)</span>
                  <button 
                    className="btn btn-primary text-sm" 
                    onClick={submitInterviewAnswer}
                    disabled={!selectedScenarioId || !interviewInput.trim() || isFinished || isBotTyping}
                  >
                    <Send size={14} />
                    <span>Submit Answer</span>
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <div className="no-selection">
              <MessageSquare size={48} className="text-indigo-500/20 mb-4" />
              <h3>Select a topic to start</h3>
              <p>Simulate mock interview questions and compare your answers with senior templates.</p>
            </div>
          )}
        </div>
      </div>
    );
  };

  const renderCvBoosterPanel = () => {
    return (
      <div className="tab-panel active">
        <div className="card cv-intro">
          <h2>💡 Resume & CV Optimization Guide</h2>
          <p className="text-muted">Companies hiring Senior Engineers scan your CV for architectural decisions, performance benchmarks, DevOps setups, and leadership. Below is a tool to contrast typical mid-level CV lines against highly persuasive Senior statements.</p>
        </div>

        <div className="cv-grid">
          {seniorityData.cvTips.map((tip, i) => (
            <div className="cv-item animate-fadeIn" key={i}>
              <div className="cv-category-title">{tip.role}</div>
              <div className="cv-comparison-card">
                <div className="cv-pane before">
                  <div className="cv-label">Mid-Level / Generic Bullet</div>
                  <p className="cv-text">"{tip.before}"</p>
                </div>
                <div className="cv-pane after">
                  <div className="cv-label">Senior / High Impact Bullet</div>
                  <p className="cv-text">"{tip.after}"</p>
                  <div className="cv-highlight-bullet">💡 Formula: Action + Technical Architectural abstraction + Quantifiable Metric</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className="app-container">
      {/* Sidebar */}
      <aside className="sidebar">
        <div className="sidebar-header">
          <div className="logo-glow"></div>
          <span className="logo-text">Seniorify<span className="highlight">.flutter</span></span>
        </div>
        
        <nav className="sidebar-nav">
          <button className={`nav-item ${activeTab === "dashboard" ? "active" : ""}`} onClick={() => setActiveTab("dashboard")}>
            <LayoutDashboard />
            <span>Dashboard</span>
          </button>
          <button className={`nav-item ${activeTab === "skills" ? "active" : ""}`} onClick={() => setActiveTab("skills")}>
            <ShieldCheck />
            <span>Core Skills</span>
          </button>
          <button className={`nav-item ${activeTab === "roadmap" ? "active" : ""}`} onClick={() => setActiveTab("roadmap")}>
            <MapPin />
            <span>3-Month Roadmap</span>
          </button>
          <button className={`nav-item ${activeTab === "quizzes" ? "active" : ""}`} onClick={() => setActiveTab("quizzes")}>
            <HelpCircle />
            <span>Practice Quizzes</span>
          </button>
          <button className={`nav-item ${activeTab === "interview" ? "active" : ""}`} onClick={() => setActiveTab("interview")}>
            <MessageSquare />
            <span>Mock Interview</span>
          </button>
          <button className={`nav-item ${activeTab === "cv-booster" ? "active" : ""}`} onClick={() => setActiveTab("cv-booster")}>
            <FileText />
            <span>CV Booster</span>
          </button>
        </nav>

        <div className="sidebar-footer">
          <div className="profile-card">
            <div className="avatar-container">
              <div className="avatar-ring"></div>
              <div className="avatar-initials">ME</div>
            </div>
            <div className="profile-info">
              <span className="profile-name">Mid-Level Flutter Eng</span>
              <span className="profile-target">Target: Senior Level</span>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="main-content">
        <header className="content-header">
          <div className="header-title-area">
            <h1>
              {activeTab === "dashboard" && "Seniority Dashboard"}
              {activeTab === "skills" && "Core Senior Skills"}
              {activeTab === "roadmap" && "3-Month Progression Roadmap"}
              {activeTab === "quizzes" && "Practice Quizzes"}
              {activeTab === "interview" && "Mock Interview Room"}
              {activeTab === "cv-booster" && "Resume & CV Booster"}
            </h1>
            <p className="text-muted">
              {activeTab === "dashboard" && "Track your progress and bridge the senior gaps."}
              {activeTab === "skills" && "Detailed requirements for Senior Flutter Engineers. Check items off as you learn them."}
              {activeTab === "roadmap" && "Focus targets for each phase to optimize study time."}
              {activeTab === "quizzes" && "Test your knowledge of Dart, internals, and architecture."}
              {activeTab === "interview" && "Simulate mock interview questions and compare your answers with senior templates."}
              {activeTab === "cv-booster" && "Boost your bullet points to reflect high impact and system design expertise."}
            </p>
          </div>
          
          <div className="header-stats">
            <div className="stat-bubble">
              <span className="stat-label">Senior Readiness Score</span>
              <div className="readiness-progress-wrapper">
                <div className="readiness-text-container">
                  <span className="readiness-value">{overallPercentage}%</span>
                  <span className="readiness-level">{readinessGrade}</span>
                </div>
                <div className="readiness-bar-bg">
                  <div className="readiness-bar-fill" style={{ width: `${overallPercentage}%` }}></div>
                </div>
              </div>
            </div>
          </div>
        </header>

        <div className="panels-container">
          {activeTab === "dashboard" && renderDashboardPanel()}
          {activeTab === "skills" && renderSkillsPanel()}
          {activeTab === "roadmap" && renderRoadmapPanel()}
          {activeTab === "quizzes" && renderQuizPanel()}
          {activeTab === "interview" && renderInterviewPanel()}
          {activeTab === "cv-booster" && renderCvBoosterPanel()}
        </div>
      </main>
    </div>
  );
}
