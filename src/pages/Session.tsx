import { useState, useEffect, useCallback } from "react";
import { useParams, useNavigate } from "react-router-dom";
import LectureHeader from "@/components/LectureHeader";
import TabNavigation, { TabType } from "@/components/TabNavigation";
import SlideViewer from "@/components/SlideViewer";
import AIPanel from "@/components/AIPanel";
import ResourcesPanel from "@/components/ResourcesPanel";
import WorksheetPanel from "@/components/WorksheetPanel";
import QuizPanel from "@/components/QuizPanel";
import SessionSidebar from "@/components/SessionSidebar";
import { getSession } from "@/data";

const Session = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<TabType>("slides");

  // Session Timer State
  const [timerSeconds, setTimerSeconds] = useState(0);
  const [isTimerRunning, setIsTimerRunning] = useState(false);

  const sessionId = parseInt(id || "1", 10);
  const session = getSession(sessionId);

  const toggleTimer = useCallback(() => {
    setIsTimerRunning((prev) => !prev);
  }, []);

  const resetTimer = useCallback(() => {
    setTimerSeconds(0);
    setIsTimerRunning(false);
  }, []);

  // Timer effect
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isTimerRunning) {
      interval = setInterval(() => {
        setTimerSeconds((prev) => prev + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isTimerRunning]);

  // Reset timer when session changes
  useEffect(() => {
    setTimerSeconds(0);
    setIsTimerRunning(false);
  }, [sessionId]);

  useEffect(() => {
    if (!session) {
      navigate("/");
    }
  }, [session, navigate]);

  // Reset to slides tab when session changes
  useEffect(() => {
    setActiveTab("slides");
  }, [sessionId]);

  if (!session) {
    return null;
  }

  const renderContent = () => {
    switch (activeTab) {
      case "slides":
        return <SlideViewer slides={session.slides} />;

      case "ai":
        // For practice sessions, pass dummyData, exercises, and practiceGuide
        return (
          <AIPanel
            promptTemplates={session.prompts}
            dummyData={session.dummyData}
            exercises={session.exercises}
            practiceGuide={session.practiceGuide}
          />
        );

      case "quiz":
        // For theory sessions with quizzes (1-5차시)
        if (session.quizzes && session.quizzes.length > 0) {
          return <QuizPanel quizzes={session.quizzes} />;
        }
        return (
          <div className="text-center py-12 text-muted-foreground">
            이 차시에는 퀴즈가 없습니다.
          </div>
        );

      case "worksheet":
        // For assignment sessions
        if (session.worksheets && session.worksheets.length > 0) {
          return <WorksheetPanel worksheets={session.worksheets} />;
        }
        return (
          <div className="text-center py-12 text-muted-foreground">
            이 차시에는 워크시트가 없습니다.
          </div>
        );

      case "resources":
        return <ResourcesPanel resources={session.resources} />;

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Fixed Header */}
      <LectureHeader
        sessionNumber={session.id}
        title={session.title}
        timerSeconds={timerSeconds}
        isTimerRunning={isTimerRunning}
        onToggleTimer={toggleTimer}
        onResetTimer={resetTimer}
      />

      {/* Left Sidebar */}
      <SessionSidebar session={session} />

      {/* Main Content */}
      <main className="pt-16 pb-12 px-6">
        <div className="max-w-[1400px] mx-auto">
          {/* Tab Navigation */}
          <div className="flex justify-center mb-6">
            <TabNavigation
              activeTab={activeTab}
              onTabChange={setActiveTab}
              sessionType={session.type}
              sessionId={session.id}
              hasQuizzes={!!(session.quizzes && session.quizzes.length > 0)}
            />
          </div>

          {/* Tab Content */}
          <div className="min-h-[calc(100vh-260px)]">
            {renderContent()}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Session;
