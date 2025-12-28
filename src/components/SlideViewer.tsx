import { ChevronLeft, ChevronRight, Maximize2, Minimize2, Eye, EyeOff, List, ChevronDown } from "lucide-react";
import { useState, useEffect, useRef, useCallback } from "react";
import { Slide } from "@/data/types";

interface SlideViewerProps {
  slides: Slide[];
}

const SlideViewer = ({ slides }: SlideViewerProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showScript, setShowScript] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isTocCollapsed, setIsTocCollapsed] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // 2-column 모드: 현재 인덱스와 다음 슬라이드
  const leftSlide = slides[currentIndex];
  const rightSlide = slides[currentIndex + 1];

  const goToPrevious = useCallback(() => {
    setCurrentIndex((prev) => Math.max(0, prev - 2));
  }, []);

  const goToNext = useCallback(() => {
    setCurrentIndex((prev) => Math.min(slides.length - 1, prev + 2));
  }, [slides.length]);

  const toggleFullscreen = useCallback(async () => {
    if (!document.fullscreenElement) {
      await containerRef.current?.requestFullscreen();
      setIsFullscreen(true);
    } else {
      await document.exitFullscreen();
      setIsFullscreen(false);
    }
  }, []);

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) {
        return;
      }

      switch (e.key) {
        case 'ArrowLeft':
          e.preventDefault();
          goToPrevious();
          break;
        case 'ArrowRight':
        case ' ':
          e.preventDefault();
          goToNext();
          break;
        case 'f':
        case 'F':
          e.preventDefault();
          toggleFullscreen();
          break;
        case 's':
        case 'S':
          e.preventDefault();
          setShowScript((prev) => !prev);
          break;
        case 'Escape':
          if (isFullscreen) {
            setIsFullscreen(false);
          }
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [goToPrevious, goToNext, toggleFullscreen, isFullscreen]);

  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };

    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => document.removeEventListener('fullscreenchange', handleFullscreenChange);
  }, []);

  if (!leftSlide) {
    return (
      <div className="flex items-center justify-center h-64 text-muted-foreground">
        슬라이드가 없습니다.
      </div>
    );
  }

  const phaseLabels: Record<string, string> = {
    intro: '도입',
    understand: '이해',
    practice: '실습',
    summary: '정리',
  };

  const phaseColors: Record<string, string> = {
    intro: 'bg-blue-100 text-blue-700',
    understand: 'bg-amber-100 text-amber-700',
    practice: 'bg-green-100 text-green-700',
    summary: 'bg-purple-100 text-purple-700',
  };

  const slidesByPhase = slides.reduce((acc, slide, index) => {
    const phase = slide.phase;
    if (!acc[phase]) {
      acc[phase] = [];
    }
    acc[phase].push({ ...slide, index });
    return acc;
  }, {} as Record<string, (Slide & { index: number })[]>);

  const phaseOrder = ['intro', 'understand', 'practice', 'summary'];

  // 슬라이드 카드 렌더링 함수
  const renderSlideCard = (slide: Slide | undefined) => {
    if (!slide) {
      return (
        <div className="flex-1 rounded-xl border-2 border-dashed border-border bg-muted/30 flex items-center justify-center min-h-[400px]">
          <span className="text-muted-foreground text-sm">슬라이드 없음</span>
        </div>
      );
    }

    const contentItems = Array.isArray(slide.screenContent)
      ? slide.screenContent
      : [slide.screenContent];

    return (
      <div className="flex-1 bg-gradient-to-br from-card to-secondary/20 rounded-xl border border-border p-8 flex flex-col min-h-[400px]">
        {/* Slide Header */}
        <div className="flex items-center gap-2 mb-6">
          <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${phaseColors[slide.phase]}`}>
            {phaseLabels[slide.phase]}
          </span>
          <span className="px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-medium">
            {slide.id}
          </span>
        </div>

        {/* Slide Content */}
        <div className="flex-1 flex flex-col">
          <h2 className="font-display font-bold text-foreground mb-4 leading-tight text-3xl">
            {slide.title}
          </h2>

          {contentItems.length === 1 ? (
            <p className="text-muted-foreground whitespace-pre-line text-lg leading-relaxed">
              {contentItems[0]}
            </p>
          ) : (
            <ul className="space-y-3">
              {contentItems.map((item, index) => {
                // 블릿을 표시하지 않을 항목: 빈 줄, 제목(■), 대괄호 시작, 이미 기호가 있는 항목, 숫자로 시작
                const noBullet = !item.trim() ||
                                 item.startsWith('■') ||
                                 item.startsWith('[') ||
                                 item.startsWith('•') ||
                                 item.startsWith('→') ||
                                 item.startsWith('□') ||
                                 item.startsWith('✓') ||
                                 item.startsWith('❌') ||
                                 item.startsWith('⭕') ||
                                 item.startsWith('✅') ||
                                 item.startsWith('①') ||
                                 item.startsWith('②') ||
                                 item.startsWith('③') ||
                                 item.startsWith('④') ||
                                 item.startsWith('⑤') ||
                                 item.startsWith('⑥') ||
                                 item.startsWith('⑦') ||
                                 item.startsWith('⑧') ||
                                 item.startsWith('⑨') ||
                                 item.startsWith('⑩') ||
                                 /^\d+\./.test(item); // 숫자와 점으로 시작 (1., 2., 3. 등)

                return (
                  <li
                    key={index}
                    className={`flex items-start gap-2.5 text-foreground text-lg ${
                      noBullet ? '' : ''
                    }`}
                  >
                    {!noBullet && (
                      <span className="flex-shrink-0 w-2 h-2 mt-2 rounded-full bg-primary" />
                    )}
                    <span className={`leading-relaxed ${
                      item.startsWith('■') ? 'font-semibold' : ''
                    }`}>
                      {item}
                    </span>
                  </li>
                );
              })}
            </ul>
          )}

          {/* Code Block */}
          {slide.codeBlock && (
            <div className="mt-4 p-3 bg-slate-900 rounded-lg overflow-auto max-h-80">
              <pre className="text-slate-100 text-xs font-mono whitespace-pre leading-relaxed">
                {slide.codeBlock.content}
              </pre>
            </div>
          )}
        </div>

        {/* Script indicator */}
        {slide.script && showScript && (
          <div className="mt-4 pt-3 border-t border-border">
            <p className="text-xs font-medium text-amber-700 mb-1 flex items-center gap-1">
              <Eye className="w-3 h-3" />
              강사 멘트
            </p>
            <p className="text-xs text-amber-900 whitespace-pre-line leading-relaxed">
              {slide.script}
            </p>
          </div>
        )}
      </div>
    );
  };

  return (
    <div
      ref={containerRef}
      className={`flex flex-col gap-6 animate-fade-in ${isFullscreen ? 'bg-background p-6 h-screen' : ''}`}
    >
      {/* Main Content Area */}
      <div className={`flex gap-4 ${isFullscreen ? 'flex-1' : ''}`}>
        {/* TOC Panel - Collapsible */}
        {!isFullscreen && (
          <div className={`flex-shrink-0 bg-card rounded-xl border border-border overflow-hidden transition-all duration-300 ${
            isTocCollapsed ? 'w-12' : 'w-64'
          }`}>
            {isTocCollapsed ? (
              <button
                onClick={() => setIsTocCollapsed(false)}
                className="w-full h-full flex items-center justify-center hover:bg-muted transition-colors"
                title="목차 펼치기"
              >
                <List className="w-5 h-5 text-muted-foreground" />
              </button>
            ) : (
              <div className="p-4 overflow-auto max-h-[60vh]">
                <div className="flex items-center justify-between mb-4 pb-2 border-b border-border">
                  <div className="flex items-center gap-2">
                    <List className="w-4 h-4 text-primary" />
                    <span className="text-sm font-semibold text-foreground">목차</span>
                  </div>
                  <button
                    onClick={() => setIsTocCollapsed(true)}
                    className="p-1 hover:bg-muted rounded transition-colors"
                    title="목차 접기"
                  >
                    <ChevronDown className="w-4 h-4 text-muted-foreground rotate-90" />
                  </button>
                </div>
                <div className="space-y-3">
                  {phaseOrder.map((phase) => {
                    const phaseSlides = slidesByPhase[phase];
                    if (!phaseSlides || phaseSlides.length === 0) return null;
                    return (
                      <div key={phase}>
                        <div className={`text-xs font-semibold px-2 py-0.5 rounded mb-1.5 inline-block ${phaseColors[phase]}`}>
                          {phaseLabels[phase]}
                        </div>
                        <div className="space-y-0.5">
                          {phaseSlides.map((slide) => (
                            <button
                              key={slide.id}
                              onClick={() => setCurrentIndex(slide.index)}
                              className={`w-full text-left px-2 py-1.5 rounded text-xs transition-colors flex items-start gap-1 ${
                                currentIndex === slide.index || currentIndex + 1 === slide.index
                                  ? 'bg-primary/10 text-primary font-medium'
                                  : 'text-muted-foreground hover:bg-muted hover:text-foreground'
                              }`}
                            >
                              <span className="text-[10px] flex-shrink-0 mt-0.5">{slide.id}.</span>
                              <span className="truncate">{slide.title}</span>
                            </button>
                          ))}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        )}

        {/* 2-Column Slide Display */}
        <div className="flex-1 flex gap-4">
          {renderSlideCard(leftSlide)}
          {renderSlideCard(rightSlide)}
        </div>

        {/* Fullscreen toggle (right side) */}
        {!isFullscreen && (
          <div className="flex-shrink-0 w-12 flex items-start">
            <button
              onClick={toggleFullscreen}
              className="p-2.5 rounded-lg hover:bg-muted text-muted-foreground hover:text-foreground transition-colors"
              title="전체화면 (F)"
            >
              <Maximize2 className="w-5 h-5" />
            </button>
          </div>
        )}
      </div>

      {/* Navigation Controls */}
      <div className="flex items-center justify-between">
        <button
          onClick={goToPrevious}
          disabled={currentIndex === 0}
          className={`
            flex items-center gap-2 px-5 py-2.5 rounded-lg font-medium
            transition-all duration-200
            ${currentIndex === 0
              ? "bg-muted text-muted-foreground cursor-not-allowed"
              : "bg-card text-foreground hover:bg-secondary border border-border shadow-card"
            }
          `}
        >
          <ChevronLeft className="w-5 h-5" />
          이전
        </button>

        {/* Slide indicators (pair-based) */}
        <div className="flex items-center gap-2">
          {slides.map((_, index) => {
            if (index % 2 !== 0) return null; // 짝수 인덱스만 표시
            const isActive = currentIndex === index;
            return (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`
                  h-2.5 rounded-full transition-all duration-200
                  ${isActive
                    ? "bg-primary w-8"
                    : "bg-border hover:bg-muted-foreground w-2.5"
                  }
                `}
              />
            );
          })}
        </div>

        <div className="flex items-center gap-2">
          {(leftSlide?.script || rightSlide?.script) && (
            <button
              onClick={() => setShowScript(!showScript)}
              className={`p-2.5 rounded-lg transition-colors ${
                showScript
                  ? 'bg-amber-100 text-amber-700'
                  : 'bg-muted text-muted-foreground hover:text-foreground hover:bg-muted/80'
              }`}
              title={showScript ? '강사 멘트 숨기기 (S)' : '강사 멘트 보기 (S)'}
            >
              {showScript ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
            </button>
          )}
          {isFullscreen && (
            <button
              onClick={toggleFullscreen}
              className="p-2.5 rounded-lg hover:bg-muted text-muted-foreground hover:text-foreground transition-colors"
              title="전체화면 종료 (F / ESC)"
            >
              <Minimize2 className="w-5 h-5" />
            </button>
          )}
          <button
            onClick={goToNext}
            disabled={currentIndex >= slides.length - 1}
            className={`
              flex items-center gap-2 px-5 py-2.5 rounded-lg font-medium
              transition-all duration-200
              ${currentIndex >= slides.length - 1
                ? "bg-muted text-muted-foreground cursor-not-allowed"
                : "bg-primary text-primary-foreground hover:opacity-90 shadow-soft"
              }
            `}
          >
            다음
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Keyboard shortcuts hint (shown in fullscreen) */}
      {isFullscreen && (
        <div className="fixed bottom-4 left-4 text-xs text-muted-foreground bg-background/80 px-3 py-2 rounded-lg backdrop-blur-sm">
          <span className="font-medium">단축키:</span> ← → 이동 (2개씩) | Space 다음 | S 멘트 | F 전체화면 | ESC 종료
        </div>
      )}
    </div>
  );
};

export default SlideViewer;
