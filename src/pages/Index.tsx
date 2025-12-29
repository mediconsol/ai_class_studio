import { useNavigate } from "react-router-dom";
import { BookOpen, ChevronRight, GraduationCap, Target, Users, UserCircle, Sparkles, CheckCircle2, ShieldCheck, LogOut } from "lucide-react";
import { MediConsolLogo } from "@/components/MediConsolLogo";
import { getAllSessions, courseMeta } from "@/data";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import { tokenStorage } from "@/lib/api";

const Index = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const sessions = getAllSessions();

  // 강사 여부 확인
  const isInstructor = tokenStorage.get() === 'authenticated'

  const handleLogout = () => {
    if (confirm("로그아웃 하시겠습니까?")) {
      if (isInstructor) {
        // 강사는 기존 방식으로 로그아웃
        localStorage.removeItem("auth_token");
        window.location.href = '/login';
      } else {
        // 학생/평가자는 AuthContext 사용
        logout();
      }
    }
  };

  // Group sessions by part (course.ts와 일치)
  const parts = [
    { title: "Part 1: 이론 - AI 이해와 기초", range: [1, 5] },
    { title: "Part 2: 실습 - 간호 실무 AI 활용", range: [6, 12] },
    { title: "Part 3: 실습 - 행정·트랙 확장", range: [13, 15] },
    { title: "Part 4: 과제 - 병원 적용 프로젝트", range: [16, 20] },
  ];

  const getSessionsForPart = (start: number, end: number) => {
    return sessions.filter(s => s.id >= start && s.id <= end);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-6 py-4">
          <div className="grid grid-cols-[1fr_auto_1fr] items-center gap-4">
            {/* Left: MediConsol Logo & Title */}
            <div className="flex items-center gap-4">
              <MediConsolLogo size="lg" />
              <div>
                <h1 className="text-xl font-display font-semibold text-foreground">
                  {courseMeta.title}
                </h1>
                <p className="text-sm text-muted-foreground">
                  총 {courseMeta.totalSessions}차시 교육 과정
                </p>
              </div>
            </div>

            {/* Center: Inno Solution Description */}
            <div className="text-center px-4">
              <p className="text-sm font-semibold text-foreground whitespace-nowrap">
                이노솔루션
              </p>
              <p className="text-xs text-muted-foreground whitespace-nowrap">
                "2026년 의료기관 AI 직무 융합훈련"
              </p>
              <p className="text-xs text-muted-foreground whitespace-nowrap">
                실습용 강의솔루션
              </p>
            </div>

            {/* Right: Inno Solution Logo & User Info & Logout */}
            <div className="flex items-center justify-end gap-4">
              <img
                src="/inno-solution-logo.png"
                alt="이노솔루션"
                className="h-10 object-contain"
              />
              {isInstructor && (
                <div className="text-right text-sm">
                  <p className="font-semibold text-foreground">교강사</p>
                  <p className="text-xs text-muted-foreground">전체 권한</p>
                </div>
              )}
              {user && !isInstructor && (
                <div className="text-right text-sm">
                  <p className="font-semibold text-foreground">{user.name || user.email}</p>
                  <p className="text-xs text-muted-foreground">
                    {user.role === 'student' && '학생'}
                    {user.role === 'reviewer' && '평가자'}
                    {user.role === 'instructor' && '강사'}
                  </p>
                </div>
              )}
              <Button
                variant="outline"
                size="sm"
                onClick={handleLogout}
                className="flex items-center gap-2"
              >
                <LogOut className="w-4 h-4" />
                로그아웃
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-6 py-8">
        {/* Course Info */}
        <div className="mb-12 p-8 rounded-2xl bg-gradient-to-br from-primary/10 to-accent/10 border border-primary/20">
          <h2 className="text-2xl font-display font-bold text-foreground mb-4">
            의료기관 종사자를 위한 AI 실무 교육
          </h2>
          <p className="text-muted-foreground mb-6 max-w-2xl">
            본 교육은 의료기관 종사자들이 AI를 활용하여 업무 효율성을 높이고,
            실무에 바로 적용할 수 있는 AI 활용 역량을 기르는 것을 목표로 합니다.
          </p>
          <button
            onClick={() => navigate("/session/1")}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-primary text-primary-foreground font-semibold hover:opacity-90 transition-opacity shadow-soft"
          >
            <BookOpen className="w-5 h-5" />
            1차시부터 시작하기
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>

        {/* Tabs Section */}
        <Tabs defaultValue="course-info" className="w-full">
          <TabsList className="grid w-full grid-cols-4 mb-8">
            <TabsTrigger value="course-info">과정정보</TabsTrigger>
            <TabsTrigger value="curriculum-simple">학습목차 (학습자용)</TabsTrigger>
            <TabsTrigger value="evaluation">평가 및 수료기준</TabsTrigger>
            <TabsTrigger value="curriculum" className="data-[state=active]:bg-orange-500 data-[state=active]:text-white text-orange-600 border-orange-300">
              🔧 검수용
            </TabsTrigger>
          </TabsList>

          {/* 탭1: 학습목차 (학습자용) */}
          <TabsContent value="curriculum-simple">
            <div className="space-y-6">
              {parts.map((part, partIndex) => (
                <div key={partIndex} className="rounded-xl bg-card border border-border overflow-hidden">
                  <div className="bg-secondary/50 px-6 py-4 border-b border-border">
                    <h3 className="text-lg font-semibold text-foreground flex items-center gap-2">
                      <span className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center text-sm font-bold text-primary">
                        {partIndex + 1}
                      </span>
                      {part.title}
                    </h3>
                  </div>
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b border-border bg-secondary/30">
                          <th className="text-left p-4 font-semibold text-foreground w-24">차시</th>
                          <th className="text-left p-4 font-semibold text-foreground">학습주제</th>
                          <th className="text-left p-4 font-semibold text-foreground w-32">구분</th>
                        </tr>
                      </thead>
                      <tbody>
                        {getSessionsForPart(part.range[0], part.range[1]).map((session) => (
                          <tr key={session.id} className="border-b border-border hover:bg-secondary/20 transition-colors">
                            <td className="p-4 font-semibold text-primary">{session.id}차시</td>
                            <td className="p-4 text-foreground">{session.title}</td>
                            <td className="p-4 text-muted-foreground text-sm">
                              {partIndex === 0 ? '이론' : partIndex === 3 ? '과제' : '실습'}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>

          {/* 탭2: 과정정보 */}
          <TabsContent value="course-info" className="space-y-6">
            {/* 교육소개 */}
            <div className="p-6 rounded-xl bg-card border border-border">
              <div className="flex items-start gap-4 mb-4">
                <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-gradient-to-br from-primary to-primary/70 flex items-center justify-center">
                  <GraduationCap className="w-6 h-6 text-primary-foreground" />
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-semibold text-foreground">교육소개</h3>
                  <p className="text-sm text-primary font-medium mt-1">의료기관 의료종사자 AI 융합과정 (현업 적용형)</p>
                </div>
              </div>

              <div className="space-y-4 text-muted-foreground">
                <div className="p-4 rounded-lg bg-gradient-to-r from-primary/5 to-accent/5 border-l-4 border-primary">
                  <div className="flex items-center gap-2 mb-2">
                    <Sparkles className="w-5 h-5 text-primary" />
                    <h4 className="font-semibold text-foreground">AI 융합 훈련</h4>
                  </div>
                  <p>
                    의료기관 의료종사자가 본인의 실제 업무를 AI로 더 쉽고, 빠르고, 정확하게
                    수행할 수 있도록 하는 <strong className="text-foreground">현업 적용형 AI융합 훈련과정</strong>입니다.
                  </p>
                </div>

                <p>
                  본 교육은 간호사, 행정직원, 의료진 등 의료 현장에서 근무하는 모든 분들이
                  AI를 실무에 즉시 활용할 수 있도록 설계된 실습형 교육 프로그램입니다.
                </p>

                {/* 과정 핵심 포인트 */}
                <div className="p-5 rounded-lg bg-gradient-to-br from-primary/5 via-accent/5 to-primary/5 border border-primary/20">
                  <h4 className="font-semibold text-foreground mb-4 text-center text-lg">과정 핵심 포인트</h4>
                  <div className="grid md:grid-cols-2 gap-3">
                    <div className="flex gap-3 items-start p-3 rounded-lg bg-card/80 backdrop-blur">
                      <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                      <div>
                        <div className="font-semibold text-foreground text-base">직무 연관성 명확</div>
                        <div className="text-sm text-muted-foreground mt-1">간호·행정·경영 등 부서별 실무 적용</div>
                      </div>
                    </div>
                    <div className="flex gap-3 items-start p-3 rounded-lg bg-card/80 backdrop-blur">
                      <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                      <div>
                        <div className="font-semibold text-foreground text-base">차시별 실습·산출물 명확</div>
                        <div className="text-sm text-muted-foreground mt-1">매 차시 실습 + 업무 개선 결과물</div>
                      </div>
                    </div>
                    <div className="flex gap-3 items-start p-3 rounded-lg bg-card/80 backdrop-blur">
                      <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                      <div>
                        <div className="font-semibold text-foreground text-base">현업 즉시 적용 가능</div>
                        <div className="text-sm text-muted-foreground mt-1">병원 업무에 바로 쓸 수 있는 AI 활용법</div>
                      </div>
                    </div>
                    <div className="flex gap-3 items-start p-3 rounded-lg bg-card/80 backdrop-blur">
                      <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                      <div>
                        <div className="font-semibold text-foreground text-base">의료기관 특화</div>
                        <div className="text-sm text-muted-foreground mt-1">의료기관 현장 맞춤형 콘텐츠</div>
                      </div>
                    </div>
                    <div className="flex gap-3 items-start p-3 rounded-lg bg-card/80 backdrop-blur">
                      <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                      <div>
                        <div className="font-semibold text-foreground text-base">AI 융합 과정</div>
                        <div className="text-sm text-muted-foreground mt-1">기초가 아닌 실무 융합 중심</div>
                      </div>
                    </div>
                    <div className="flex gap-3 items-start p-3 rounded-lg bg-card/80 backdrop-blur">
                      <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                      <div>
                        <div className="font-semibold text-foreground text-base">3단계 체계적 학습</div>
                        <div className="text-sm text-muted-foreground mt-1">이해 → 실습 → 적용</div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="p-5 rounded-lg bg-secondary/30">
                  <h4 className="font-semibold text-foreground mb-4 text-center text-lg">차시별 학습 구조</h4>

                  {/* Desktop: Horizontal Flow */}
                  <div className="hidden md:flex items-center justify-between gap-2">
                    <div className="flex-1 text-center p-4 rounded-lg bg-gradient-to-br from-primary/10 to-primary/5 border-2 border-primary/30">
                      <div className="text-3xl font-bold text-primary mb-2">1</div>
                      <div className="text-base font-semibold text-foreground">업무 시나리오</div>
                      <div className="text-xs text-muted-foreground mt-1">실무 문제 확인</div>
                    </div>
                    <ChevronRight className="w-6 h-6 text-primary flex-shrink-0" />
                    <div className="flex-1 text-center p-4 rounded-lg bg-gradient-to-br from-primary/10 to-primary/5 border-2 border-primary/30">
                      <div className="text-3xl font-bold text-primary mb-2">2</div>
                      <div className="text-base font-semibold text-foreground">AI 활용 방법</div>
                      <div className="text-xs text-muted-foreground mt-1">해결 방법 학습</div>
                    </div>
                    <ChevronRight className="w-6 h-6 text-primary flex-shrink-0" />
                    <div className="flex-1 text-center p-4 rounded-lg bg-gradient-to-br from-primary/10 to-primary/5 border-2 border-primary/30">
                      <div className="text-3xl font-bold text-primary mb-2">3</div>
                      <div className="text-base font-semibold text-foreground">즉시 적용 실습</div>
                      <div className="text-xs text-muted-foreground mt-1">직접 실습</div>
                    </div>
                    <ChevronRight className="w-6 h-6 text-primary flex-shrink-0" />
                    <div className="flex-1 text-center p-4 rounded-lg bg-gradient-to-br from-accent/10 to-accent/5 border-2 border-accent/40">
                      <div className="text-3xl font-bold text-accent mb-2">4</div>
                      <div className="text-base font-semibold text-foreground">업무 개선 결과물</div>
                      <div className="text-xs text-muted-foreground mt-1">실무 적용 완료</div>
                    </div>
                  </div>

                  {/* Mobile: Vertical Flow */}
                  <div className="md:hidden space-y-3">
                    <div className="text-center p-4 rounded-lg bg-gradient-to-br from-primary/10 to-primary/5 border-2 border-primary/30">
                      <div className="text-3xl font-bold text-primary mb-2">1</div>
                      <div className="text-base font-semibold text-foreground">업무 시나리오</div>
                      <div className="text-xs text-muted-foreground mt-1">실무 문제 확인</div>
                    </div>
                    <div className="flex justify-center">
                      <ChevronRight className="w-6 h-6 text-primary transform rotate-90" />
                    </div>
                    <div className="text-center p-4 rounded-lg bg-gradient-to-br from-primary/10 to-primary/5 border-2 border-primary/30">
                      <div className="text-3xl font-bold text-primary mb-2">2</div>
                      <div className="text-base font-semibold text-foreground">AI 활용 방법</div>
                      <div className="text-xs text-muted-foreground mt-1">해결 방법 학습</div>
                    </div>
                    <div className="flex justify-center">
                      <ChevronRight className="w-6 h-6 text-primary transform rotate-90" />
                    </div>
                    <div className="text-center p-4 rounded-lg bg-gradient-to-br from-primary/10 to-primary/5 border-2 border-primary/30">
                      <div className="text-3xl font-bold text-primary mb-2">3</div>
                      <div className="text-base font-semibold text-foreground">즉시 적용 실습</div>
                      <div className="text-xs text-muted-foreground mt-1">직접 실습</div>
                    </div>
                    <div className="flex justify-center">
                      <ChevronRight className="w-6 h-6 text-primary transform rotate-90" />
                    </div>
                    <div className="text-center p-4 rounded-lg bg-gradient-to-br from-accent/10 to-accent/5 border-2 border-accent/40">
                      <div className="text-3xl font-bold text-accent mb-2">4</div>
                      <div className="text-base font-semibold text-foreground">업무 개선 결과물</div>
                      <div className="text-xs text-muted-foreground mt-1">실무 적용 완료</div>
                    </div>
                  </div>
                </div>

                <p>
                  총 20차시로 구성된 본 과정은 AI의 기본 이론부터 실제 의료 업무에
                  적용 가능한 실습까지 단계적으로 학습하며, 각자의 업무 환경에 맞는
                  AI 활용 프로젝트를 수행하게 됩니다.
                </p>
              </div>
            </div>

            {/* 학습목표 */}
            <div className="p-6 rounded-xl bg-card border border-border">
              <div className="flex items-center gap-3 mb-4">
                <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-gradient-to-br from-primary to-primary/70 flex items-center justify-center">
                  <Target className="w-6 h-6 text-primary-foreground" />
                </div>
                <h3 className="text-xl font-semibold text-foreground">학습목표</h3>
              </div>
              <ul className="space-y-3 text-muted-foreground">
                <li className="flex gap-3">
                  <span className="flex-shrink-0 w-6 h-6 rounded-full bg-primary/10 text-primary flex items-center justify-center text-sm font-semibold">1</span>
                  <span>AI의 기본 개념과 작동 원리를 이해하고, 의료 분야에서의 AI 활용 사례를 파악한다.</span>
                </li>
                <li className="flex gap-3">
                  <span className="flex-shrink-0 w-6 h-6 rounded-full bg-primary/10 text-primary flex items-center justify-center text-sm font-semibold">2</span>
                  <span>프롬프트 엔지니어링 기법을 습득하여 AI 도구를 효과적으로 활용할 수 있다.</span>
                </li>
                <li className="flex gap-3">
                  <span className="flex-shrink-0 w-6 h-6 rounded-full bg-primary/10 text-primary flex items-center justify-center text-sm font-semibold">3</span>
                  <span>간호 실무(환자 교육, 간호 기록, 케어 플랜 등)에 AI를 적용하여 업무 효율성을 향상시킨다.</span>
                </li>
                <li className="flex gap-3">
                  <span className="flex-shrink-0 w-6 h-6 rounded-full bg-primary/10 text-primary flex items-center justify-center text-sm font-semibold">4</span>
                  <span>행정 업무(문서 작성, 데이터 분석, 환자 소통 등)에 AI를 활용하여 생산성을 높인다.</span>
                </li>
                <li className="flex gap-3">
                  <span className="flex-shrink-0 w-6 h-6 rounded-full bg-primary/10 text-primary flex items-center justify-center text-sm font-semibold">5</span>
                  <span>실제 병원 환경에 적용 가능한 AI 활용 프로젝트를 기획하고 실행할 수 있다.</span>
                </li>
              </ul>
            </div>

            {/* AI 윤리 및 보안 */}
            <div className="p-6 rounded-xl bg-card border border-border">
              <div className="flex items-center gap-3 mb-4">
                <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-gradient-to-br from-primary to-primary/70 flex items-center justify-center">
                  <ShieldCheck className="w-6 h-6 text-primary-foreground" />
                </div>
                <h3 className="text-xl font-semibold text-foreground">AI 윤리 및 보안 반영 내용</h3>
              </div>

              <div className="space-y-4">
                <p className="text-muted-foreground">
                  의료기관의 특성을 고려하여 본 콘텐츠는 AI 윤리 및 보안 요소를 필수적으로 포함합니다.
                </p>

                <div className="grid gap-3">
                  <div className="flex gap-3 items-start p-4 rounded-lg bg-gradient-to-r from-blue-50/50 to-blue-100/30 dark:from-blue-950/20 dark:to-blue-900/10 border border-blue-200/50 dark:border-blue-800/30">
                    <div className="flex-shrink-0 w-8 h-8 rounded-lg bg-blue-500/10 dark:bg-blue-400/10 flex items-center justify-center">
                      <span className="text-lg font-bold text-blue-600 dark:text-blue-400">1</span>
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold text-foreground mb-1">의료정보 및 개인정보 보호 원칙</h4>
                      <p className="text-sm text-muted-foreground">환자 정보와 개인정보를 안전하게 보호하는 AI 활용 원칙</p>
                    </div>
                  </div>

                  <div className="flex gap-3 items-start p-4 rounded-lg bg-gradient-to-r from-green-50/50 to-green-100/30 dark:from-green-950/20 dark:to-green-900/10 border border-green-200/50 dark:border-green-800/30">
                    <div className="flex-shrink-0 w-8 h-8 rounded-lg bg-green-500/10 dark:bg-green-400/10 flex items-center justify-center">
                      <span className="text-lg font-bold text-green-600 dark:text-green-400">2</span>
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold text-foreground mb-1">의료현장에서의 안전한 AI 활용 기준</h4>
                      <p className="text-sm text-muted-foreground">의료 환경에 적합한 AI 사용 가이드라인 및 안전 기준</p>
                    </div>
                  </div>

                  <div className="flex gap-3 items-start p-4 rounded-lg bg-gradient-to-r from-purple-50/50 to-purple-100/30 dark:from-purple-950/20 dark:to-purple-900/10 border border-purple-200/50 dark:border-purple-800/30">
                    <div className="flex-shrink-0 w-8 h-8 rounded-lg bg-purple-500/10 dark:bg-purple-400/10 flex items-center justify-center">
                      <span className="text-lg font-bold text-purple-600 dark:text-purple-400">3</span>
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold text-foreground mb-1">AI 사용 시 발생할 수 있는 윤리적 이슈 및 대응 방안</h4>
                      <p className="text-sm text-muted-foreground">AI 활용 과정에서의 윤리적 문제점과 올바른 대처 방법</p>
                    </div>
                  </div>
                </div>

                <div className="p-4 rounded-lg bg-primary/5 border-l-4 border-primary mt-4">
                  <p className="text-base text-foreground">
                    <strong className="text-primary">💡 핵심 가치:</strong> 이를 통해 학습자는 AI를 무분별하게 사용하는 것이 아닌,
                    <strong> 책임감 있게 활용하는 역량</strong>을 함께 습득하게 됩니다.
                  </p>
                </div>
              </div>
            </div>

            {/* 학습대상 */}
            <div className="p-6 rounded-xl bg-card border border-border">
              <div className="flex items-center gap-3 mb-4">
                <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-gradient-to-br from-primary to-primary/70 flex items-center justify-center">
                  <Users className="w-6 h-6 text-primary-foreground" />
                </div>
                <h3 className="text-xl font-semibold text-foreground">학습대상</h3>
              </div>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="p-4 rounded-lg bg-secondary/30">
                  <h4 className="font-semibold text-foreground mb-2">간호사</h4>
                  <p className="text-sm text-muted-foreground">
                    환자 케어, 간호 기록, 교육 자료 작성 등 간호 실무에 AI를 활용하고자 하는 간호사
                  </p>
                </div>
                <div className="p-4 rounded-lg bg-secondary/30">
                  <h4 className="font-semibold text-foreground mb-2">행정직원</h4>
                  <p className="text-sm text-muted-foreground">
                    문서 작성, 일정 관리, 데이터 분석 등 행정 업무의 효율화를 원하는 직원
                  </p>
                </div>
                <div className="p-4 rounded-lg bg-secondary/30">
                  <h4 className="font-semibold text-foreground mb-2">의료진</h4>
                  <p className="text-sm text-muted-foreground">
                    진료 기록, 환자 설명 자료, 의학 정보 검색 등에 AI를 활용하고자 하는 의료진
                  </p>
                </div>
                <div className="p-4 rounded-lg bg-secondary/30">
                  <h4 className="font-semibold text-foreground mb-2">관리자</h4>
                  <p className="text-sm text-muted-foreground">
                    병원 운영 혁신 및 디지털 전환을 추진하는 관리자 및 의사결정자
                  </p>
                </div>
              </div>
            </div>

            {/* 강사소개 */}
            <div className="p-6 rounded-xl bg-card border border-border">
              <div className="flex items-center gap-3 mb-6">
                <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-gradient-to-br from-primary to-primary/70 flex items-center justify-center">
                  <UserCircle className="w-6 h-6 text-primary-foreground" />
                </div>
                <h3 className="text-xl font-semibold text-foreground">강사소개</h3>
              </div>

              <div className="border-t border-border/50 mb-8"></div>

              <div className="grid md:grid-cols-2 gap-6">
                {/* 왼쪽: 기본 정보 */}
                <div className="space-y-4">
                  <div className="flex items-start gap-4 mb-10">
                    <div className="flex-shrink-0 w-28 h-28 rounded-full overflow-hidden border-2 border-primary/30 shadow-md bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-800 dark:to-slate-900">
                      <img
                        src="/instructor-profile.jpg"
                        alt="채원덕 강사 프로필"
                        className="w-full h-full object-cover object-center"
                      />
                    </div>
                    <div className="flex-1">
                      <h4 className="text-xl font-bold text-foreground mb-1">채원덕</h4>
                      <p className="text-sm font-medium text-primary">메디콘솔(MediConsol) 대표</p>
                      <p className="text-xs text-muted-foreground mt-1">내용전문가(SME) | 과정 설계·개발·품질 관리 총괄</p>
                    </div>
                  </div>

                  <div className="p-4 rounded-lg bg-secondary/30 space-y-2.5 text-sm">
                    <div className="flex items-center gap-2">
                      <span className="font-semibold text-foreground min-w-[60px]">이메일</span>
                      <span className="text-muted-foreground">admin@mediconsol.com</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="font-semibold text-foreground min-w-[60px]">연락처</span>
                      <span className="text-muted-foreground">010-2467-1332</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="font-semibold text-foreground min-w-[60px]">홈페이지</span>
                      <a href="https://mediconsol.co.kr" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
                        mediconsol.co.kr
                      </a>
                    </div>
                  </div>

                  <div className="p-4 rounded-lg bg-primary/5 border-l-4 border-primary">
                    <h5 className="font-semibold text-foreground mb-2 text-sm">전문분야</h5>
                    <ul className="space-y-1.5 text-sm text-muted-foreground">
                      <li>• AI기반 병원경영 솔루션 및 AX전환 전략</li>
                      <li>• 디지털전환(DX) 솔루션 개발</li>
                      <li>• 병원경영 전략기획 및 컨설팅</li>
                      <li>• 의료현장 AI 활용 전략 및 교육 과정 설계</li>
                    </ul>
                  </div>
                </div>

                {/* 오른쪽: 경력 및 활동 */}
                <div className="space-y-4">
                  <h5 className="font-semibold text-foreground text-base mb-3">주요 경력 및 활동</h5>

                  <div className="space-y-3">
                    <div className="p-4 rounded-lg bg-gradient-to-r from-blue-50/50 to-blue-100/30 dark:from-blue-950/20 dark:to-blue-900/10 border border-blue-200/50 dark:border-blue-800/30">
                      <h6 className="font-semibold text-foreground mb-2 flex items-center gap-2 text-sm">
                        <span className="w-6 h-6 rounded-full bg-blue-500/20 dark:bg-blue-400/20 flex items-center justify-center text-xs font-bold text-blue-600 dark:text-blue-400">1</span>
                        메디콘솔 대표 및 IT솔루션 구축
                      </h6>
                      <p className="text-xs text-blue-600 dark:text-blue-400 mb-2">2023.03 ~ 현재</p>
                      <ul className="space-y-1 text-sm text-muted-foreground">
                        <li>• AI기반 병원경영솔루션 개발</li>
                        <li>• 병원경영지원 IT솔루션 구축</li>
                        <li>• 재활·요양·한방병원 경영컨설팅 및 맞춤형 솔루션 내제화</li>
                      </ul>
                    </div>

                    <div className="p-4 rounded-lg bg-gradient-to-r from-green-50/50 to-green-100/30 dark:from-green-950/20 dark:to-green-900/10 border border-green-200/50 dark:border-green-800/30">
                      <h6 className="font-semibold text-foreground mb-2 flex items-center gap-2 text-sm">
                        <span className="w-6 h-6 rounded-full bg-green-500/20 dark:bg-green-400/20 flex items-center justify-center text-xs font-bold text-green-600 dark:text-green-400">2</span>
                        병원경영 컨설팅 및 연구소 운영
                      </h6>
                      <p className="text-xs text-green-600 dark:text-green-400 mb-2">2016 ~ 2023</p>
                      <ul className="space-y-1 text-sm text-muted-foreground">
                        <li>• 효사랑가족요양병원 부설연구소 소장 (2020~2023)</li>
                        <li>• 효사랑&가족사랑병원 경영지원시스템 구축 (2016~2019)</li>
                        <li>• 병원 경영컨설팅 기반 구축</li>
                      </ul>
                    </div>

                    <div className="p-4 rounded-lg bg-gradient-to-r from-amber-50/50 to-amber-100/30 dark:from-amber-950/20 dark:to-amber-900/10 border border-amber-200/50 dark:border-amber-800/30">
                      <h6 className="font-semibold text-foreground mb-2 flex items-center gap-2 text-sm">
                        <span className="w-6 h-6 rounded-full bg-amber-500/20 dark:bg-amber-400/20 flex items-center justify-center text-xs font-bold text-amber-600 dark:text-amber-400">3</span>
                        IT 솔루션 및 전략기획
                      </h6>
                      <p className="text-xs text-amber-600 dark:text-amber-400 mb-2">1999 ~ 2015</p>
                      <ul className="space-y-1 text-sm text-muted-foreground">
                        <li>• CJ오쇼핑 IT마케팅 솔루션 구축 및 부서장</li>
                        <li>• 레드캡투어 여행·렌터카 전략기획</li>
                        <li>• 현대백화점 H&S IT사업팀 팀장</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>

          {/* 탭3: 평가 및 수료기준 */}
          <TabsContent value="evaluation" className="space-y-6">
            {/* 평가기준 */}
            <div className="p-6 rounded-xl bg-card border border-border">
              <h3 className="text-xl font-semibold text-foreground mb-4">평가기준 (*기준안)</h3>
              <div className="space-y-4">
                <p className="text-muted-foreground">
                  사업주훈련은 학습 성취도 평가와 참여도 관리를 함께 진행합니다.
                </p>

                <div className="overflow-x-auto">
                  <table className="w-full border-collapse">
                    <thead>
                      <tr className="border-b border-border">
                        <th className="text-left p-3 font-semibold text-foreground bg-secondary/30">구분</th>
                        <th className="text-left p-3 font-semibold text-foreground bg-secondary/30">내용</th>
                      </tr>
                    </thead>
                    <tbody className="text-muted-foreground">
                      <tr className="border-b border-border">
                        <td className="p-3 font-medium">출결 평가</td>
                        <td className="p-3">훈련시간 이수 여부 (가장 핵심)</td>
                      </tr>
                      <tr className="border-b border-border">
                        <td className="p-3 font-medium">학습 평가</td>
                        <td className="p-3">시험, 과제, 실습 결과 등</td>
                      </tr>
                      <tr className="border-b border-border">
                        <td className="p-3 font-medium">참여도 평가</td>
                        <td className="p-3">토론, 실습 참여, 과제 제출 등</td>
                      </tr>
                      <tr className="border-b border-border">
                        <td className="p-3 font-medium">종합 평가</td>
                        <td className="p-3">위 항목을 종합해 수료 여부 판단</td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                <div className="p-4 rounded-lg bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800">
                  <p className="text-sm font-semibold text-amber-800 dark:text-amber-200">
                    ⚠️ 출결 미달 시 성적이 좋아도 수료 불가 (가장 중요한 포인트)
                  </p>
                </div>

                <div className="mt-6">
                  <h4 className="font-semibold text-foreground mb-3">평가 방식 예시 (원격·혼합훈련 기준)</h4>
                  <ul className="space-y-2 text-muted-foreground">
                    <li className="flex gap-2">
                      <span className="font-semibold">•</span>
                      <span><strong>시험 평가:</strong> 객관식 / 단답형 / 실무형 과제</span>
                    </li>
                    <li className="flex gap-2">
                      <span className="font-semibold">•</span>
                      <span><strong>과제 평가:</strong> 업무 적용 과제, 보고서, 결과물 제출</span>
                    </li>
                    <li className="flex gap-2">
                      <span className="font-semibold">•</span>
                      <span><strong>실습 평가:</strong> 프로그램 구현, 시나리오 작성, AI 결과물 산출 등</span>
                    </li>
                  </ul>
                  <p className="text-sm text-muted-foreground mt-3">
                    ※ 과정 성격에 따라 시험을 생략하고 과제·실습 중심 평가도 가능합니다.
                  </p>
                </div>
              </div>
            </div>

            {/* 수료기준 */}
            <div className="p-6 rounded-xl bg-card border border-border">
              <h3 className="text-xl font-semibold text-foreground mb-4">수료기준 (*기준안)</h3>
              <div className="space-y-4">
                <div className="p-4 rounded-lg bg-primary/10 border border-primary/20">
                  <p className="font-semibold text-foreground mb-2">
                    ✅ 수료 기준은 2가지를 동시에 충족해야 합니다
                  </p>
                </div>

                <div>
                  <h4 className="font-semibold text-foreground mb-3">① 출석률 기준</h4>
                  <div className="overflow-x-auto">
                    <table className="w-full border-collapse">
                      <thead>
                        <tr className="border-b border-border">
                          <th className="text-left p-3 font-semibold text-foreground bg-secondary/30">훈련 형태</th>
                          <th className="text-left p-3 font-semibold text-foreground bg-secondary/30">출석 기준</th>
                        </tr>
                      </thead>
                      <tbody className="text-muted-foreground">
                        <tr className="border-b border-border">
                          <td className="p-3 font-medium">집체훈련</td>
                          <td className="p-3">훈련시간의 80% 이상 출석</td>
                        </tr>
                        <tr className="border-b border-border">
                          <td className="p-3 font-medium">원격훈련</td>
                          <td className="p-3">훈련시간의 80% 이상 진도율 + 진행단계평가 응시</td>
                        </tr>
                        <tr className="border-b border-border">
                          <td className="p-3 font-medium">혼합훈련</td>
                          <td className="p-3">집체·원격 각각 80% 이상 충족</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold text-foreground mb-3">② 성적 기준</h4>
                  <div className="overflow-x-auto">
                    <table className="w-full border-collapse">
                      <thead>
                        <tr className="border-b border-border">
                          <th className="text-left p-3 font-semibold text-foreground bg-secondary/30">구분</th>
                          <th className="text-left p-3 font-semibold text-foreground bg-secondary/30">기준</th>
                        </tr>
                      </thead>
                      <tbody className="text-muted-foreground">
                        <tr className="border-b border-border">
                          <td className="p-3 font-medium">평가 점수</td>
                          <td className="p-3">60점 이상 (100점 만점 기준)</td>
                        </tr>
                        <tr className="border-b border-border">
                          <td className="p-3 font-medium">평가 항목</td>
                          <td className="p-3">시험, 과제, 실습, 참여도 등을 종합</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>

                <div className="p-4 rounded-lg bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800 mt-6">
                  <h4 className="font-semibold text-blue-800 dark:text-blue-200 mb-2">
                    📋 수료 기준 요약 (심사 대응용 문구)
                  </h4>
                  <p className="text-sm text-blue-700 dark:text-blue-300">
                    본 사업주훈련과정의 수료 기준은 훈련시간의 80% 이상 출석과
                    평가 점수 60점 이상 획득을 모두 충족한 경우에 한해 수료로 인정합니다.
                  </p>
                </div>
              </div>
            </div>
          </TabsContent>

          {/* 탭4: 검수용 (학습목차 링크포함) */}
          <TabsContent value="curriculum">
            <div className="p-4 rounded-lg bg-orange-50 dark:bg-orange-950/20 border-l-4 border-orange-500 mb-6">
              <p className="text-sm text-orange-800 dark:text-orange-200">
                <strong>🔧 검수용 탭:</strong> 이 탭은 개발 및 검수 과정에서 각 차시 페이지로 빠르게 이동하기 위한 임시 관리자 전용 탭입니다.
              </p>
            </div>
            <div className="space-y-10">
              {parts.map((part, partIndex) => (
                <div key={partIndex}>
                  <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
                    <span className="w-8 h-8 rounded-lg bg-orange-500/20 flex items-center justify-center text-sm font-bold text-orange-600">
                      {partIndex + 1}
                    </span>
                    {part.title}
                  </h3>
                  <div className="grid gap-3">
                    {getSessionsForPart(part.range[0], part.range[1]).map((session) => (
                      <button
                        key={session.id}
                        onClick={() => navigate(`/session/${session.id}`)}
                        className="flex items-center gap-4 p-4 rounded-xl bg-card border border-orange-200 dark:border-orange-800 hover:border-orange-500 hover:shadow-card transition-all text-left group"
                      >
                        <span className="flex-shrink-0 w-12 h-12 rounded-xl bg-orange-100 dark:bg-orange-900/30 flex items-center justify-center text-lg font-bold text-orange-600 group-hover:bg-orange-500 group-hover:text-white transition-colors">
                          {session.id}
                        </span>
                        <div className="flex-1 min-w-0">
                          <h4 className="font-semibold text-foreground group-hover:text-orange-600 transition-colors">
                            {session.title}
                          </h4>
                          {session.subtitle && (
                            <p className="text-sm text-muted-foreground truncate">
                              {session.subtitle}
                            </p>
                          )}
                        </div>
                        <ChevronRight className="w-5 h-5 text-muted-foreground group-hover:text-orange-600 transition-colors" />
                      </button>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default Index;
