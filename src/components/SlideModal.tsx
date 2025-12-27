import { X, ChevronLeft, ChevronRight, Eye, EyeOff } from 'lucide-react';
import { useState } from 'react';
import { Slide } from '@/data/types';

interface SlideModalProps {
  slides: Slide[];
  initialIndex: number;
  onClose: () => void;
}

const SlideModal = ({ slides, initialIndex, onClose }: SlideModalProps) => {
  const [currentIndex, setCurrentIndex] = useState(initialIndex);
  const [showScript, setShowScript] = useState(false);
  const currentSlide = slides[currentIndex];

  const goToPrevious = () => {
    setCurrentIndex((prev) => Math.max(0, prev - 1));
  };

  const goToNext = () => {
    setCurrentIndex((prev) => Math.min(slides.length - 1, prev + 1));
  };

  // Handle keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') onClose();
    if (e.key === 'ArrowLeft') goToPrevious();
    if (e.key === 'ArrowRight') goToNext();
  };

  if (!currentSlide) return null;

  const contentItems = Array.isArray(currentSlide.screenContent)
    ? currentSlide.screenContent
    : [currentSlide.screenContent];

  const phaseLabels: Record<string, string> = {
    intro: '도입',
    understand: '이해',
    practice: '실습',
    summary: '정리',
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm"
      onClick={onClose}
      onKeyDown={handleKeyDown}
      tabIndex={0}
    >
      <div
        className="relative w-full max-w-4xl mx-4 bg-white rounded-2xl shadow-2xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-3 border-b bg-gray-50">
          <div className="flex items-center gap-3">
            <span className="px-2.5 py-1 rounded-full bg-secondary text-secondary-foreground text-xs font-medium">
              {phaseLabels[currentSlide.phase] || currentSlide.phase}
            </span>
            <span className="text-sm text-muted-foreground">
              슬라이드 {currentIndex + 1} / {slides.length}
            </span>
          </div>
          <div className="flex items-center gap-2">
            {currentSlide.script && (
              <button
                onClick={() => setShowScript(!showScript)}
                className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                  showScript
                    ? 'bg-primary text-primary-foreground'
                    : 'hover:bg-muted/50 text-muted-foreground hover:text-foreground'
                }`}
              >
                {showScript ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                강사 멘트
              </button>
            )}
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg hover:bg-muted/50 text-muted-foreground hover:text-foreground transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Slide Content */}
        <div className="p-8 min-h-[400px] flex flex-col justify-center bg-gradient-to-br from-white to-secondary/20">
          <h2 className="text-3xl font-display font-bold text-foreground mb-5 leading-tight">
            {currentSlide.title}
          </h2>

          {contentItems.length === 1 ? (
            <p className="text-lg text-muted-foreground whitespace-pre-line">
              {contentItems[0]}
            </p>
          ) : (
            <ul className="space-y-3">
              {contentItems.map((item, index) => (
                <li
                  key={index}
                  className="flex items-start gap-3 text-base text-foreground"
                >
                  <span className="flex-shrink-0 w-2 h-2 mt-2 rounded-full bg-primary" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          )}

          {/* Script Panel */}
          {showScript && currentSlide.script && (
            <div className="mt-6 p-4 rounded-lg bg-muted/50 border border-border">
              <p className="text-xs font-medium text-muted-foreground mb-2">강사 멘트</p>
              <p className="text-sm text-foreground whitespace-pre-line leading-relaxed">
                {currentSlide.script}
              </p>
            </div>
          )}
        </div>

        {/* Navigation */}
        <div className="flex items-center justify-between px-6 py-3 border-t bg-gray-50">
          <button
            onClick={goToPrevious}
            disabled={currentIndex === 0}
            className={`flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
              currentIndex === 0
                ? 'text-muted-foreground cursor-not-allowed'
                : 'hover:bg-muted text-foreground'
            }`}
          >
            <ChevronLeft className="w-4 h-4" />
            이전
          </button>

          <div className="flex items-center gap-2">
            {slides.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-2 h-2 rounded-full transition-all ${
                  index === currentIndex
                    ? 'bg-primary w-6'
                    : 'bg-gray-300 hover:bg-gray-400'
                }`}
              />
            ))}
          </div>

          <button
            onClick={goToNext}
            disabled={currentIndex === slides.length - 1}
            className={`flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
              currentIndex === slides.length - 1
                ? 'text-muted-foreground cursor-not-allowed'
                : 'bg-primary text-primary-foreground hover:opacity-90'
            }`}
          >
            다음
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default SlideModal;
