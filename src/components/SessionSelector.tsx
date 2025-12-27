import { ChevronDown, BookOpen, Check } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getAllSessions } from "@/data";

interface SessionSelectorProps {
  currentSessionId: number;
}

const SessionSelector = ({ currentSessionId }: SessionSelectorProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  const sessions = getAllSessions();

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSelect = (sessionId: number) => {
    navigate(`/session/${sessionId}`);
    setIsOpen(false);
  };

  const currentSession = sessions.find(s => s.id === currentSessionId);

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-4 py-2 rounded-lg bg-secondary hover:bg-secondary/80 transition-colors"
      >
        <BookOpen className="w-4 h-4 text-primary" />
        <span className="text-sm font-medium">
          {currentSessionId}차시 / {sessions.length}차시
        </span>
        <ChevronDown className={`w-4 h-4 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <div className="absolute top-full left-0 mt-2 w-80 max-h-96 overflow-y-auto rounded-xl bg-card border border-border shadow-elevated z-50 animate-fade-in">
          <div className="p-2">
            <div className="px-3 py-2 text-xs font-medium text-muted-foreground uppercase tracking-wide">
              차시 선택
            </div>
            {sessions.map((session) => (
              <button
                key={session.id}
                onClick={() => handleSelect(session.id)}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-left transition-colors ${
                  session.id === currentSessionId
                    ? 'bg-primary/10 text-primary'
                    : 'hover:bg-muted text-foreground'
                }`}
              >
                <span className={`flex-shrink-0 w-8 h-8 rounded-lg flex items-center justify-center text-sm font-semibold ${
                  session.id === currentSessionId
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-secondary text-secondary-foreground'
                }`}>
                  {session.id}
                </span>
                <div className="flex-1 min-w-0">
                  <p className="font-medium truncate">{session.title}</p>
                  {session.subtitle && (
                    <p className="text-xs text-muted-foreground truncate">{session.subtitle}</p>
                  )}
                </div>
                {session.id === currentSessionId && (
                  <Check className="w-4 h-4 text-primary flex-shrink-0" />
                )}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default SessionSelector;
