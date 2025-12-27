import { ChevronLeft, ChevronRight, Maximize2, Minimize2, Eye, EyeOff, List } from "lucide-react";
import { useState, useEffect, useRef, useCallback } from "react";
import { Slide } from "@/data/types";

interface SlideViewerProps {
  slides: Slide[];
}

const SlideViewer = ({ slides }: SlideViewerProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showScript, setShowScript] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const currentSlide = slides[currentIndex];

  const goToPrevious = useCallback(() => {
    setCurrentIndex((prev) => Math.max(0, prev - 1));
  }, []);

  const goToNext = useCallback(() => {
    setCurrentIndex((prev) => Math.min(slides.length - 1, prev + 1));
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
      // Ignore if typing in an input
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) {
        return;
      }

      switch (e.key) {
        case 'ArrowLeft':
          e.preventDefault();
          goToPrevious();
          break;
        case 'ArrowRight':
        case ' ': // Space
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

  // Fullscreen change listener
  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };

    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => document.removeEventListener('fullscreenchange', handleFullscreenChange);
  }, []);

  if (!currentSlide) {
    return (
      <div className="flex items-center justify-center h-64 text-muted-foreground">
        슬라이드가 없습니다.
      </div>
    );
  }

  const contentItems = Array.isArray(currentSlide.screenContent)
    ? currentSlide.screenContent
    : [currentSlide.screenContent];

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

  // Group slides by phase
  const slidesByPhase = slides.reduce((acc, slide, index) => {
    const phase = slide.phase;
    if (!acc[phase]) {
      acc[phase] = [];
    }
    acc[phase].push({ ...slide, index });
    return acc;
  }, {} as Record<string, (Slide & { index: number })[]>);

  const phaseOrder = ['intro', 'understand', 'practice', 'summary'];

  return (
    <div
      ref={containerRef}
      className={`flex flex-col gap-6 animate-fade-in ${isFullscreen ? 'bg-background p-6 h-screen' : ''}`}
    >
      {/* Main Content Area */}
      <div className={`flex gap-4 ${isFullscreen ? 'flex-1' : ''}`}>
        {/* TOC Panel - Hidden in fullscreen */}
        {!isFullscreen && (
          <div className="w-72 flex-shrink-0 bg-card rounded-xl border border-border p-4 overflow-auto max-h-[60vh]">
            <div className="flex items-center gap-2 mb-4 pb-2 border-b border-border">
              <List className="w-4 h-4 text-primary" />
              <span className="text-sm font-semibold text-foreground">슬라이드 목차</span>
            </div>
            <div className="space-y-4">
              {phaseOrder.map((phase) => {
                const phaseSlides = slidesByPhase[phase];
                if (!phaseSlides || phaseSlides.length === 0) return null;
                return (
                  <div key={phase}>
                    <div className={`text-xs font-semibold px-2.5 py-1 rounded mb-2 inline-block ${phaseColors[phase]}`}>
                      {phaseLabels[phase]}
                    </div>
                    <div className="space-y-1">
                      {phaseSlides.map((slide) => (
                        <button
                          key={slide.id}
                          onClick={() => setCurrentIndex(slide.index)}
                          className={`w-full text-left px-2.5 py-2 rounded-lg text-sm transition-colors flex items-start gap-1 ${
                            currentIndex === slide.index
                              ? 'bg-primary/10 text-primary font-medium'
                              : 'text-muted-foreground hover:bg-muted hover:text-foreground'
                          }`}
                        >
                          <span className="text-xs flex-shrink-0 mt-0.5">{slide.id}.</span>
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

        {/* Slide Display */}
        <div className={`slide-container flex-1 ${isFullscreen ? 'max-h-none' : ''}`}>
          <div className="h-full flex flex-col bg-gradient-to-br from-card to-secondary/30 p-12">
            {/* Slide Header */}
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center gap-3">
                <span className={`px-3 py-1 rounded-full text-xs font-medium ${phaseColors[currentSlide.phase] || 'bg-secondary text-secondary-foreground'}`}>
                  {phaseLabels[currentSlide.phase] || currentSlide.phase}
                </span>
                <span className="px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium">
                  슬라이드 {currentSlide.id}
                </span>
              </div>
              <button
                onClick={toggleFullscreen}
                className="p-2 rounded-lg hover:bg-muted/50 text-muted-foreground hover:text-foreground transition-colors"
                title={isFullscreen ? '전체화면 종료 (F)' : '전체화면 (F)'}
              >
                {isFullscreen ? <Minimize2 className="w-5 h-5" /> : <Maximize2 className="w-5 h-5" />}
              </button>
            </div>

            {/* Slide Content */}
            <div className="flex-1 flex flex-col justify-center">
              <h2 className={`font-display font-bold text-foreground mb-6 leading-tight ${isFullscreen ? 'text-5xl' : 'text-4xl'}`}>
                {currentSlide.title}
              </h2>

              {contentItems.length === 1 ? (
                <p className={`text-muted-foreground whitespace-pre-line ${isFullscreen ? 'text-2xl' : 'text-xl'}`}>
                  {contentItems[0]}
                </p>
              ) : (
                <ul className="space-y-4">
                  {contentItems.map((item, index) => (
                    <li
                      key={index}
                      className={`flex items-start gap-3 text-foreground ${isFullscreen ? 'text-xl' : 'text-lg'}`}
                      style={{ animationDelay: `${index * 100}ms` }}
                    >
                      <span className="flex-shrink-0 w-2 h-2 mt-2.5 rounded-full bg-primary" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        </div>
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

        {/* Slide indicators */}
        <div className="flex items-center gap-3">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`
                w-2.5 h-2.5 rounded-full transition-all duration-200
                ${index === currentIndex
                  ? "bg-primary w-8"
                  : "bg-border hover:bg-muted-foreground"
                }
              `}
            />
          ))}
        </div>

        <div className="flex items-center gap-2">
          {currentSlide.script && (
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
          <button
            onClick={goToNext}
            disabled={currentIndex === slides.length - 1}
            className={`
              flex items-center gap-2 px-5 py-2.5 rounded-lg font-medium
              transition-all duration-200
              ${currentIndex === slides.length - 1
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

      {/* Script Panel (below navigation) */}
      {showScript && currentSlide.script && (
        <div className="p-4 rounded-lg bg-amber-50 border border-amber-200">
          <p className="text-xs font-medium text-amber-700 mb-2 flex items-center gap-1.5">
            <Eye className="w-3.5 h-3.5" />
            강사 멘트
          </p>
          <p className="text-sm text-amber-900 whitespace-pre-line leading-relaxed">
            {currentSlide.script}
          </p>
        </div>
      )}

      {/* Keyboard shortcuts hint (shown in fullscreen) */}
      {isFullscreen && (
        <div className="fixed bottom-4 left-4 text-xs text-muted-foreground bg-background/80 px-3 py-2 rounded-lg backdrop-blur-sm">
          <span className="font-medium">단축키:</span> ← → 이동 | Space 다음 | S 멘트 | F 전체화면 | ESC 종료
        </div>
      )}
    </div>
  );
};

export default SlideViewer;
