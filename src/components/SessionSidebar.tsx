import { useState } from 'react';
import { ChevronLeft, ChevronRight, Clock, Target, Wrench, MessageSquare, BookOpen, Lightbulb, Play } from 'lucide-react';
import { Session } from '@/data/types';
import SlideModal from './SlideModal';

interface SessionSidebarProps {
  session: Session;
}

const SessionSidebar = ({ session }: SessionSidebarProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [slideModalOpen, setSlideModalOpen] = useState(false);
  const [selectedSlideIndex, setSelectedSlideIndex] = useState(0);

  const openSlideModal = (index: number) => {
    setSelectedSlideIndex(index);
    setSlideModalOpen(true);
  };

  const getTypeBadge = () => {
    switch (session.type) {
      case 'theory':
        return { label: '이론', className: 'bg-blue-100 text-blue-700' };
      case 'practice':
        return { label: '실습', className: 'bg-green-100 text-green-700' };
      case 'assignment':
        return { label: '과제', className: 'bg-purple-100 text-purple-700' };
      default:
        return { label: '강의', className: 'bg-gray-100 text-gray-700' };
    }
  };

  const typeBadge = getTypeBadge();

  return (
    <>
      {/* Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed left-0 top-1/2 -translate-y-1/2 z-40 bg-primary text-primary-foreground p-2 rounded-r-lg shadow-lg hover:bg-primary/90 transition-all"
        aria-label={isOpen ? '사이드바 닫기' : '사이드바 열기'}
      >
        {isOpen ? <ChevronLeft className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
      </button>

      {/* Sidebar Panel */}
      <div
        className={`fixed left-0 top-12 bottom-0 z-30 w-72 bg-white border-r shadow-lg transform transition-transform duration-300 ease-in-out overflow-y-auto ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="p-4 space-y-5">
          {/* Session Type & Title */}
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${typeBadge.className}`}>
                {typeBadge.label}
              </span>
              <span className="text-xs text-muted-foreground">{session.duration}분</span>
            </div>
            <h2 className="font-semibold text-sm">{session.title}</h2>
            {session.subtitle && (
              <p className="text-xs text-muted-foreground">{session.subtitle}</p>
            )}
          </div>

          {/* Divider */}
          <hr className="border-gray-100" />

          {/* Key Message */}
          {session.keyMessage && (
            <div className="space-y-1.5">
              <div className="flex items-center gap-1.5 text-xs font-medium text-muted-foreground">
                <MessageSquare className="w-3.5 h-3.5" />
                <span>핵심 메시지</span>
              </div>
              <p className="text-sm italic text-primary">"{session.keyMessage}"</p>
            </div>
          )}

          {/* Objective */}
          <div className="space-y-1.5">
            <div className="flex items-center gap-1.5 text-xs font-medium text-muted-foreground">
              <Target className="w-3.5 h-3.5" />
              <span>학습 목표</span>
            </div>
            <p className="text-sm">{session.objective}</p>
          </div>

          {/* Tools */}
          {session.tools && session.tools.length > 0 && (
            <div className="space-y-1.5">
              <div className="flex items-center gap-1.5 text-xs font-medium text-muted-foreground">
                <Wrench className="w-3.5 h-3.5" />
                <span>사용 도구</span>
              </div>
              <div className="flex flex-wrap gap-1.5">
                {session.tools.map((tool, idx) => (
                  <span
                    key={idx}
                    className="px-2 py-0.5 text-xs bg-secondary rounded-full"
                  >
                    {tool}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Divider */}
          <hr className="border-gray-100" />

          {/* Learning Guide */}
          <div className="space-y-2">
            <div className="flex items-center gap-1.5 text-xs font-medium text-muted-foreground">
              <BookOpen className="w-3.5 h-3.5" />
              <span>학습 안내</span>
            </div>
            <div className="space-y-2 text-xs text-muted-foreground">
              {session.type === 'theory' && (
                <div className="space-y-1.5">
                  <p className="flex items-start gap-1.5">
                    <Lightbulb className="w-3.5 h-3.5 mt-0.5 text-amber-500 flex-shrink-0" />
                    <span>슬라이드를 순서대로 진행하며 개념을 익힙니다.</span>
                  </p>
                  <p className="flex items-start gap-1.5">
                    <Lightbulb className="w-3.5 h-3.5 mt-0.5 text-amber-500 flex-shrink-0" />
                    <span>AI 탭에서 프롬프트 예시를 확인해 보세요.</span>
                  </p>
                </div>
              )}
              {session.type === 'practice' && (
                <div className="space-y-1.5">
                  <p className="flex items-start gap-1.5">
                    <Lightbulb className="w-3.5 h-3.5 mt-0.5 text-green-500 flex-shrink-0" />
                    <span>실습 탭에서 단계별로 따라해 보세요.</span>
                  </p>
                  <p className="flex items-start gap-1.5">
                    <Lightbulb className="w-3.5 h-3.5 mt-0.5 text-green-500 flex-shrink-0" />
                    <span>예제데이터를 활용해 직접 입력해 봅니다.</span>
                  </p>
                  <p className="flex items-start gap-1.5">
                    <Lightbulb className="w-3.5 h-3.5 mt-0.5 text-green-500 flex-shrink-0" />
                    <span>실무 가이드 패널을 참고하세요.</span>
                  </p>
                </div>
              )}
              {session.type === 'assignment' && (
                <div className="space-y-1.5">
                  <p className="flex items-start gap-1.5">
                    <Lightbulb className="w-3.5 h-3.5 mt-0.5 text-purple-500 flex-shrink-0" />
                    <span>워크시트를 다운로드하여 작성합니다.</span>
                  </p>
                  <p className="flex items-start gap-1.5">
                    <Lightbulb className="w-3.5 h-3.5 mt-0.5 text-purple-500 flex-shrink-0" />
                    <span>AI 탭의 프롬프트를 참고해 과제를 수행하세요.</span>
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Slides Preview (Quick Navigation) */}
          {session.slides && session.slides.length > 0 && (
            <>
              <hr className="border-gray-100" />
              <div className="space-y-2">
                <div className="flex items-center gap-1.5 text-xs font-medium text-muted-foreground">
                  <span>슬라이드 구성</span>
                  <span className="text-[10px] text-muted-foreground/60">({session.slides.length})</span>
                </div>
                <div className="space-y-1">
                  {session.slides.map((slide, idx) => (
                    <button
                      key={slide.id}
                      onClick={() => openSlideModal(idx)}
                      className="w-full text-left text-xs py-1.5 px-2 rounded hover:bg-primary/10 group flex items-center gap-2 transition-colors"
                    >
                      <span className="text-muted-foreground w-4 group-hover:text-primary">{idx + 1}.</span>
                      <span className="truncate flex-1 group-hover:text-primary">{slide.title}</span>
                      <Play className="w-3 h-3 text-muted-foreground/0 group-hover:text-primary/70" />
                    </button>
                  ))}
                </div>
              </div>
            </>
          )}
        </div>
      </div>

      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/20 z-20"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Slide Modal */}
      {slideModalOpen && session.slides && (
        <SlideModal
          slides={session.slides}
          initialIndex={selectedSlideIndex}
          onClose={() => setSlideModalOpen(false)}
        />
      )}
    </>
  );
};

export default SessionSidebar;
