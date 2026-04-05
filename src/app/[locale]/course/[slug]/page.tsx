"use client";

import { useState, useMemo, use } from "react";
import { notFound } from "next/navigation";
import { getCourseBySlug } from "@/data/mock/courses";
import { VideoPlayer } from "@/components/player/video-player";
import { CourseSidebar } from "@/components/player/course-sidebar";
import { ContentTabs } from "@/components/player/content-tabs";
import { PageTransition } from "@/components/shared/page-transition";
import type { Locale, Lesson } from "@/lib/types";
import type { Dictionary } from "@/data/mock/dictionaries/en";

import en from "@/data/mock/dictionaries/en";
import ar from "@/data/mock/dictionaries/ar";

const dicts: Record<string, Dictionary> = { en, ar };

export default function CoursePage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = use(params);
  const course = getCourseBySlug(slug);
  const dict = dicts[locale] ?? dicts.en;

  if (!course) {
    notFound();
  }

  const allLessons = useMemo(
    () => course.modules.flatMap((m) => m.lessons),
    [course]
  );

  const [activeLessonId, setActiveLessonId] = useState(allLessons[0]?.id ?? "");
  const [currentTime, setCurrentTime] = useState(0);

  const activeLesson: Lesson | undefined = allLessons.find((l) => l.id === activeLessonId);

  if (!activeLesson) {
    notFound();
  }

  return (
    <PageTransition>
      <div className="min-h-screen bg-slate-950">
        <div className="max-w-[1600px] mx-auto">
          {/* Theater layout */}
          <div className="flex flex-col lg:flex-row">
            {/* Video area */}
            <div className="flex-1 p-4 lg:p-6">
              <VideoPlayer
                url={activeLesson.videoUrl}
                onProgress={(playedSeconds) => setCurrentTime(playedSeconds)}
              />

              {/* Tabs below video */}
              <div className="mt-6">
                <ContentTabs
                  course={course}
                  locale={locale as Locale}
                  dict={dict}
                  transcript={activeLesson.transcript}
                  currentTime={currentTime}
                />
              </div>
            </div>

            {/* Sidebar */}
            <div className="lg:sticky lg:top-16 lg:h-[calc(100vh-4rem)] lg:overflow-y-auto">
              <CourseSidebar
                course={course}
                locale={locale as Locale}
                dict={dict}
                activeLessonId={activeLessonId}
                onLessonSelect={(id) => {
                  setActiveLessonId(id);
                  setCurrentTime(0);
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </PageTransition>
  );
}
