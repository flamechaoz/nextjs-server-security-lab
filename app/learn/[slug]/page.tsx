import Link from "next/link";
import { notFound } from "next/navigation";
import LessonWorkspace from "@/components/LessonWorkspace";
import { getDebugExercise } from "@/lib/debugging";
import {
  getAdjacentLessons,
  getLessonBySlug,
  getLessonContent,
  lessons,
  modules,
} from "@/lib/curriculum";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return lessons.map((lesson) => ({ slug: lesson.slug }));
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const lesson = getLessonBySlug(slug);
  return {
    title: lesson
      ? `${lesson.title} · Next Lab`
      : "Lesson not found · Next Lab",
    description: lesson?.summary,
  };
}

export default async function LessonPage({ params }: Props) {
  const { slug } = await params;
  const lesson = getLessonBySlug(slug);
  if (!lesson) notFound();
  const content = getLessonContent(slug);
  if (!content) notFound();
  const debugExercise = await getDebugExercise(lesson.id);
  const { previous, next } = getAdjacentLessons(lesson.id);
  return (
    <div className="learn-shell">
      <aside className="learn-sidebar">
        <Link href="/" className="sidebar-back">
          ← All chapters
        </Link>
        <div className="sidebar-course">
          <div className="course-mark">N</div>
          <div>
            <strong>Next Lab</strong>
            <span>Server · Security · Tests</span>
          </div>
        </div>
        <div className="sidebar-progress-label">
          <span>YOUR LEARNING PATH</span>
          <span>{String(lesson.id).padStart(2, "0")}/{lessons.length}</span>
        </div>
        {modules.map((module) => {
          const group = lessons.filter((item) => item.module === module.title);
          return (
            <div className="sidebar-module" key={module.title}>
              <div className="sidebar-module-title">{module.title}</div>
              {group.map((item) => (
                <Link
                  key={item.id}
                  href={`/learn/${item.slug}`}
                  className={
                    item.id === lesson.id
                      ? "sidebar-lesson current"
                      : "sidebar-lesson"
                  }
                >
                  <span className="sidebar-lesson-num">
                    {String(item.id).padStart(2, "0")}
                  </span>
                  <span>{item.title}</span>
                  <span className="sidebar-chevron">
                    {item.id === lesson.id ? "●" : ""}
                  </span>
                </Link>
              ))}
            </div>
          );
        })}
        <div className="sidebar-help">
          <strong>Learning by debugging</strong>
          <p>
            Every chapter includes a guided lesson and a broken behavior to
            investigate.
          </p>
        </div>
      </aside>
      <main className="lesson-main">
        <div className="lesson-breadcrumb">
          <Link href="/">Curriculum</Link>
          <span>/</span>
          <span>{lesson.module}</span>
          <span>/</span>
          <span>Chapter {String(lesson.id).padStart(2, "0")}</span>
        </div>
        <LessonWorkspace
          lesson={lesson}
          content={content}
          debugExercise={debugExercise}
          previous={previous}
          next={next}
        />
      </main>
    </div>
  );
}
