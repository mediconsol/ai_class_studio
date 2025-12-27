import { BookOpen, Clock, Play, Pause, RotateCcw, LogOut } from "lucide-react";
import SessionSelector from "./SessionSelector";
import { Button } from "@/components/ui/button";

interface LectureHeaderProps {
  sessionNumber: number;
  title: string;
  timerSeconds?: number;
  isTimerRunning?: boolean;
  onToggleTimer?: () => void;
  onResetTimer?: () => void;
}

const formatTime = (seconds: number) => {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
};

const LectureHeader = ({
  sessionNumber,
  title,
  timerSeconds = 0,
  isTimerRunning = false,
  onToggleTimer,
  onResetTimer,
}: LectureHeaderProps) => {
  const handleLogout = () => {
    if (confirm("로그아웃 하시겠습니까?")) {
      localStorage.removeItem("auth_token");
      window.location.href = "/";
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 glass-panel border-b">
      <div className="max-w-[1400px] mx-auto px-6 py-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-primary text-primary-foreground shadow-soft">
              <BookOpen className="w-4 h-4" />
            </div>
            <h1 className="text-base font-display font-semibold text-foreground">
              <span className="text-muted-foreground font-normal">제{sessionNumber}차시</span>
              <span className="mx-2 text-muted-foreground/50">|</span>
              {title}
            </h1>
          </div>
          <div className="flex items-center gap-3">
            <SessionSelector currentSessionId={sessionNumber} />

            {/* Status Badge */}
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-secondary text-secondary-foreground">
              <div className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse-soft" />
              <span className="text-xs font-medium">강의 진행 중</span>
            </div>

            {/* Timer */}
            <div className="flex items-center gap-1 px-2 py-1 rounded-lg bg-muted border border-border">
              <Clock className="w-3.5 h-3.5 text-muted-foreground" />
              <span className={`font-mono text-sm font-medium min-w-[3rem] text-center ${isTimerRunning ? 'text-primary' : 'text-muted-foreground'}`}>
                {formatTime(timerSeconds)}
              </span>
              <div className="flex items-center gap-0.5 ml-1 border-l border-border pl-1">
                <button
                  onClick={onToggleTimer}
                  className="p-1 rounded hover:bg-background/80 transition-colors"
                  title={isTimerRunning ? '일시정지' : '시작'}
                >
                  {isTimerRunning ? (
                    <Pause className="w-3.5 h-3.5 text-primary" />
                  ) : (
                    <Play className="w-3.5 h-3.5 text-muted-foreground hover:text-foreground" />
                  )}
                </button>
                <button
                  onClick={onResetTimer}
                  className="p-1 rounded hover:bg-background/80 transition-colors"
                  title="리셋"
                >
                  <RotateCcw className="w-3.5 h-3.5 text-muted-foreground hover:text-foreground" />
                </button>
              </div>
            </div>

            {/* Logout Button */}
            <Button
              variant="outline"
              size="sm"
              onClick={handleLogout}
              className="flex items-center gap-1.5 h-8 px-3"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span className="text-xs">로그아웃</span>
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default LectureHeader;
