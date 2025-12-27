import { Presentation, Bot, FileText, ClipboardList, HelpCircle } from "lucide-react";
import { SessionType } from "@/data/types";

export type TabType = "slides" | "ai" | "quiz" | "resources" | "worksheet";

interface TabConfig {
  id: TabType;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
}

interface TabNavigationProps {
  activeTab: TabType;
  onTabChange: (tab: TabType) => void;
  sessionType?: SessionType;
  sessionId?: number;
  hasQuizzes?: boolean;
}

const getTabsForSessionType = (
  sessionType: SessionType = "theory",
  sessionId?: number,
  hasQuizzes?: boolean
): TabConfig[] => {
  const baseTabs: TabConfig[] = [
    { id: "slides", label: "슬라이드", icon: Presentation },
  ];

  switch (sessionType) {
    case "theory":
      // 이론 (1~5차시): 슬라이드 / AI 시연 / 퀴즈 / 자료
      const theoryTabs: TabConfig[] = [
        ...baseTabs,
        { id: "ai", label: "AI 시연", icon: Bot },
      ];
      // 1~5차시에만 퀴즈 탭 추가
      if (hasQuizzes || (sessionId && sessionId >= 1 && sessionId <= 5)) {
        theoryTabs.push({ id: "quiz", label: "퀴즈", icon: HelpCircle });
      }
      theoryTabs.push({ id: "resources", label: "자료", icon: FileText });
      return theoryTabs;

    case "practice":
      // 실습 (6~15차시): 슬라이드 / AI 실습 / 퀴즈 / 자료
      const practiceTabs: TabConfig[] = [
        ...baseTabs,
        { id: "ai", label: "AI 실습", icon: Bot },
      ];
      // 6~15차시에 퀴즈 탭 추가
      if (hasQuizzes || (sessionId && sessionId >= 6 && sessionId <= 15)) {
        practiceTabs.push({ id: "quiz", label: "퀴즈", icon: HelpCircle });
      }
      practiceTabs.push({ id: "resources", label: "자료", icon: FileText });
      return practiceTabs;

    case "assignment":
      // 과제: 슬라이드 / 과제 / 자료
      return [
        ...baseTabs,
        { id: "worksheet", label: "과제", icon: ClipboardList },
        { id: "resources", label: "자료", icon: FileText },
      ];

    default:
      return [
        ...baseTabs,
        { id: "ai", label: "AI 시연", icon: Bot },
        { id: "resources", label: "자료", icon: FileText },
      ];
  }
};

const TabNavigation = ({ activeTab, onTabChange, sessionType = "theory", sessionId, hasQuizzes }: TabNavigationProps) => {
  const tabs = getTabsForSessionType(sessionType, sessionId, hasQuizzes);

  return (
    <nav className="flex items-center gap-2 p-1.5 bg-muted/50 rounded-xl border border-border/50">
      {tabs.map((tab) => {
        const Icon = tab.icon;
        const isActive = activeTab === tab.id;

        return (
          <button
            key={tab.id}
            onClick={() => onTabChange(tab.id)}
            className={`
              flex items-center gap-2.5 px-6 py-3 rounded-lg font-medium text-base
              transition-all duration-200 ease-out
              ${isActive
                ? "tab-active"
                : "text-muted-foreground hover:text-foreground hover:bg-card"
              }
            `}
          >
            <Icon className={`w-5 h-5 ${isActive ? "text-primary-foreground" : ""}`} />
            <span>{tab.label}</span>
          </button>
        );
      })}
    </nav>
  );
};

export default TabNavigation;
