"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import type { Lesson } from "@/lib/curriculum";
import { lessons, modules } from "@/lib/curriculum";

function LessonActivityLinks({ lesson, completed, showModule = false }: Readonly<{ lesson: Lesson; completed: boolean; showModule?: boolean }>) {
  return (
    <div className="lesson-activity-links">
      <Link href={`/learn/${lesson.slug}`} className="lesson-row">
        <span className={completed ? "row-number done" : "row-number"}>
          {completed ? "✓" : String(lesson.id).padStart(2, "0")}
        </span>
        <span className="row-copy">
          <strong>{lesson.title}</strong>
          <small>{showModule ? `${lesson.module} · ` : ""}{lesson.summary}</small>
        </span>
        <span className="row-duration">{lesson.duration}</span>
        <span className="row-arrow">→</span>
      </Link>
      <Link
        href={`/learn/${lesson.slug}?mode=debug#debug`}
        className="lesson-debug-link"
        aria-label={`Start debugging: ${lesson.title}`}
      >
        Debug this chapter <span aria-hidden="true">↗</span>
      </Link>
    </div>
  );
}

export default function CurriculumDashboard() {
  const [completed, setCompleted] = useState<number[]>([]);
  const [query, setQuery] = useState("");
  useEffect(() => {
    const read = () => {
      try {
        const stored = JSON.parse(
          localStorage.getItem("next-lab-completed") || "[]",
        ) as number[];
        setCompleted(stored.filter((id) => lessons.some((lesson) => lesson.id === id)));
      } catch {
        setCompleted([]);
      }
    };
    read();
    window.addEventListener("storage", read);
    window.addEventListener("next-lab-progress", read);
    return () => {
      window.removeEventListener("storage", read);
      window.removeEventListener("next-lab-progress", read);
    };
  }, []);
  const filtered = useMemo(
    () =>
      lessons.filter((lesson) =>
        `${lesson.title} ${lesson.module} ${lesson.summary}`
          .toLowerCase()
          .includes(query.toLowerCase()),
      ),
    [query],
  );
  return (
    <main className="dashboard-main">
      <div className="hero-grid">
        <div className="hero-copy">
          <div className="eyebrow">
            <span className="eyebrow-dot" /> PROJECT-BASED LEARNING · 16
            CHAPTERS
          </div>
          <h1>
            Learn to trace it.
            <br />
            <em>Fix it. Test it.</em>
          </h1>
          <p className="hero-lead">
            A hands-on Next.js learning path built around a real application.
            Follow requests into their handlers, debug broken behavior, and
            prove your fixes with tests.
          </p>
          <div className="hero-actions">
            <Link className="button" href={`/learn/${lessons[0].slug}`}>
              Start learning <span>→</span>
            </Link>
            <Link className="text-link" href="/tasks">
              Explore the task demo ↗
            </Link>
          </div>
          <div className="hero-facts">
            <span>
              <strong>16</strong> guided chapters
            </span>
            <span>
              <strong>32</strong> lesson + debug activities
            </span>
            <span>
              <strong>1</strong> evolving project
            </span>
          </div>
        </div>
        <div className="hero-terminal">
          <div className="terminal-top">
            <div className="terminal-lights">
              <i />
              <i />
              <i />
            </div>
            <span>request-flow.ts</span>
            <span className="terminal-status">LIVE EXAMPLE</span>
          </div>
          <div className="terminal-body">
            <div className="terminal-line">
              <span className="line-no">01</span>
              <span className="syntax-muted">GET</span>{" "}
              <span className="syntax-green">/api/hello</span>
            </div>
            <div className="terminal-arrow">
              ↓ <span>Next.js App Router</span>
            </div>
            <div className="terminal-file">
              <span className="file-icon">TS</span>
              <div>
                <strong>route.ts</strong>
                <small>app/api/hello/</small>
              </div>
              <span className="file-check">✓</span>
            </div>
            <div className="terminal-arrow">
              ↓ <span>GET handler executes</span>
            </div>
            <div className="terminal-response">
              <span className="response-label">200 OK · application/json</span>
              <code>
                {'{ "message": "Hello from the Next.js server!", "lesson": 1 }'}
              </code>
            </div>
          </div>
          <div className="terminal-bottom">
            <span>TRACE A REQUEST</span>
            <Link href="/api/hello" target="_blank">Try endpoint ↗</Link>
          </div>
        </div>
      </div>

      <section className="progress-section">
        <div>
          <div className="section-kicker">YOUR PROGRESS</div>
          <h2>Keep the momentum</h2>
          <p>Completed lessons are saved in this browser.</p>
        </div>
        <div className="progress-count">
          <strong>
            {completed.length}
            <span>/20</span>
          </strong>
          <div className="progress-track">
            <div
              style={{ width: `${(completed.length / lessons.length) * 100}%` }}
            />
          </div>
          <small>
            {completed.length === 0
              ? "Ready when you are"
              : `${Math.round((completed.length / lessons.length) * 100)}% complete`}
          </small>
        </div>
      </section>

      <section className="path-section">
        <div className="section-heading">
          <div>
            <div className="section-kicker">THE LEARNING PATH</div>
            <h2>Build your server-side instincts</h2>
            <p>
              Four modules, from tracing your first request to testing a real
              component.
            </p>
          </div>
          <div className="search-wrap">
            <span>⌕</span>
            <input
              aria-label="Search lessons"
              placeholder="Search chapters..."
              value={query}
              onChange={(event) => setQuery(event.target.value)}
            />
            {query && (
              <button onClick={() => setQuery("")} aria-label="Clear search">
                ×
              </button>
            )}
          </div>
        </div>
        {query ? (
          <div className="search-results">
            <p className="results-count">
              {filtered.length} chapter{filtered.length === 1 ? "" : "s"} found
            </p>
            {filtered.map((lesson) => (
              <LessonActivityLinks
                key={lesson.id}
                lesson={lesson}
                completed={completed.includes(lesson.id)}
                showModule
              />
            ))}
          </div>
        ) : (
          <div className="module-list">
            {modules.map((module, index) => {
              const group = lessons.filter(
                (lesson) => lesson.module === module.title,
              );
              const done = group.filter((lesson) =>
                completed.includes(lesson.id),
              ).length;
              return (
                <section className="module-card" key={module.title}>
                  <div className="module-card-head">
                    <div className={`module-icon module-icon-${index + 1}`}>
                      {["⌘", "⇄", "◇", "✓", "↗"][index]}
                    </div>
                    <div className="module-heading">
                      <div className="module-overline">
                        MODULE {String(index + 1).padStart(2, "0")}{" "}
                        <span>·</span> CHAPTERS {module.range}
                      </div>
                      <h3>{module.title}</h3>
                      <p>{module.description}</p>
                    </div>
                    <div className="module-count">
                      {done}/{group.length}
                      <small>complete</small>
                    </div>
                  </div>
                  <div className="module-lessons">
                    {group.map((lesson) => (
                      <LessonActivityLinks
                        key={lesson.id}
                        lesson={lesson}
                        completed={completed.includes(lesson.id)}
                      />
                    ))}
                  </div>
                  <div className="module-card-foot">
                    <span>
                      <span className="mini-check">✓</span> Learn concepts, then
                      debug a real behavior
                    </span>
                    <span>{group.length * 2} activities</span>
                  </div>
                </section>
              );
            })}
          </div>
        )}
      </section>
      <section className="two-parts">
        <div className="section-kicker">HOW EACH CHAPTER WORKS</div>
        <h2>Read less. Investigate more.</h2>
        <div className="parts-grid">
          <article>
            <div className="part-icon learn-icon">A</div>
            <div>
              <span className="part-label">PART A</span>
              <h3>Learn by following the code</h3>
              <p>
                Read the concept, open the actual file, follow the steps, and
                inspect a live endpoint when available.
              </p>
            </div>
          </article>
          <article>
            <div className="part-icon debug-icon">B</div>
            <div>
              <span className="part-label">PART B</span>
              <h3>Debug like an engineer</h3>
              <p>
                Reproduce a bug, locate the responsible handler, use hints only
                when needed, then verify your fix.
              </p>
            </div>
          </article>
        </div>
      </section>
      <section className="start-banner">
        <div>
          <span className="section-kicker">READY TO BEGIN?</span>
          <h2>Your first request is waiting.</h2>
          <p>
            Start with the simplest possible route and learn how a URL becomes a
            response.
          </p>
        </div>
        <Link
          className="button light-button"
          href={`/learn/${lessons[0].slug}`}
        >
          Start Chapter 01 <span>→</span>
        </Link>
      </section>
      <footer className="dashboard-footer">
        <span>Next Lab</span>
        <span>Built for curious engineers · Next.js App Router</span>
        <Link href="/tasks">Task API demo ↗</Link>
      </footer>
    </main>
  );
}
