"use client";

import Link from "next/link";
import {
  useEffect,
  useState,
  useSyncExternalStore,
  type ReactNode,
} from "react";
import type { DebugExercise } from "@/lib/debugging";
import type { Lesson } from "@/lib/curriculum";

type Props = {
  lesson: Lesson;
  content: ReactNode;
  debugExercise: DebugExercise;
  previous?: Lesson;
  next?: Lesson;
};

function subscribeToMode(onChange: () => void) {
  window.addEventListener("popstate", onChange);
  window.addEventListener("next-lab-mode", onChange);
  return () => {
    window.removeEventListener("popstate", onChange);
    window.removeEventListener("next-lab-mode", onChange);
  };
}

function getModeFromUrl(): "learn" | "debug" {
  return new URLSearchParams(window.location.search).get("mode") === "debug"
    ? "debug"
    : "learn";
}

export default function LessonWorkspace({
  lesson,
  content,
  debugExercise,
  previous,
  next,
}: Props) {
  const mode = useSyncExternalStore(
    subscribeToMode,
    getModeFromUrl,
    () => "learn",
  );
  const [hintOpen, setHintOpen] = useState(false);
  const [checked, setChecked] = useState<string[]>([]);
  const [completed, setCompleted] = useState(false);

  useEffect(() => {
    const readProgress = () => {
      try {
        const done = JSON.parse(
          localStorage.getItem("next-lab-completed") || "[]",
        ) as number[];
        setCompleted(done.includes(lesson.id));
      } catch {
        setCompleted(false);
      }
    };
    readProgress();
    const raw = sessionStorage.getItem(`next-lab-checks-${lesson.id}`);
    if (raw) {
      try {
        setChecked(JSON.parse(raw) as string[]);
      } catch {
        setChecked([]);
      }
    }
  }, [lesson.id]);

  useEffect(() => {
    if (mode === "debug" && window.location.hash === "#debug") {
      document
        .getElementById("debug-panel")
        ?.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, [mode]);

  function selectMode(nextMode: "learn" | "debug") {
    const url = new URL(window.location.href);
    if (nextMode === "debug") {
      url.searchParams.set("mode", "debug");
      url.hash = "debug";
    } else {
      url.searchParams.delete("mode");
      url.hash = "learn";
    }
    window.history.replaceState(null, "", url);
    window.dispatchEvent(new Event("next-lab-mode"));
  }

  function toggleCheck(item: string) {
    const nextChecked = checked.includes(item)
      ? checked.filter((value) => value !== item)
      : [...checked, item];
    setChecked(nextChecked);
    sessionStorage.setItem(
      `next-lab-checks-${lesson.id}`,
      JSON.stringify(nextChecked),
    );
  }

  function toggleCompleted() {
    const done = JSON.parse(
      localStorage.getItem("next-lab-completed") || "[]",
    ) as number[];
    const updated = completed
      ? done.filter((id) => id !== lesson.id)
      : [...new Set([...done, lesson.id])];
    localStorage.setItem("next-lab-completed", JSON.stringify(updated));
    setCompleted(!completed);
    window.dispatchEvent(new Event("next-lab-progress"));
  }

  return (
    <div className="lesson-workspace">
      <div className="lesson-topline">
        <span>CHAPTER {String(lesson.id).padStart(2, "0")}</span>
        <span>{lesson.duration}</span>
      </div>
      <h1>{lesson.title}</h1>
      <p className="lesson-summary">{lesson.summary}</p>
      <div className="lesson-meta">
        <span className="module-chip">{lesson.module}</span>
        <span className="file-chip">
          File: <code>{lesson.file}</code>
        </span>
      </div>

      <div className="mode-tabs" role="tablist" aria-label="Lesson modes">
        <button
          id="learn"
          role="tab"
          aria-selected={mode === "learn"}
          className={mode === "learn" ? "mode-tab active" : "mode-tab"}
          onClick={() => selectMode("learn")}
        >
          <span className="tab-number">A</span>
          <span>
            <strong>Learn</strong>
            <small>Guided walkthrough</small>
          </span>
        </button>
        <button
          role="tab"
          aria-selected={mode === "debug"}
          className={
            mode === "debug"
              ? "mode-tab active debug-tab"
              : "mode-tab debug-tab"
          }
          onClick={() => selectMode("debug")}
        >
          <span className="tab-number">B</span>
          <span>
            <strong>Debug</strong>
            <small>Fix the broken behavior</small>
          </span>
        </button>
      </div>

      {mode === "learn" ? (
        <section id="learn-panel" className="lesson-panel">
          <div className="panel-kicker">PART A · CONCEPTS</div>
          <div className="lesson-content">{content}</div>
          {lesson.id === 2 && (
            <div className="try-endpoint">
              <div>
                <strong>Try the live Server/Client Component demo</strong>
                <p>
                  Click the counter and trace which component owns the
                  interaction.
                </p>
              </div>
              <Link className="button small" href="/component-boundaries">
                Open live demo ↗
              </Link>
            </div>
          )}
          {lesson.id === 3 && (
            <div className="try-endpoint">
              <div>
                <strong>Send a real POST request</strong>
                <p>
                  Submit JSON and inspect the status returned by the practice
                  handler.
                </p>
              </div>
              <Link className="button small" href="/route-handlers-http">
                Open POST playground ↗
              </Link>
            </div>
          )}
          {lesson.id === 4 && (
            <div className="try-endpoint">
              <div>
                <strong>Inspect a server API response</strong>
                <p>
                  See which server-side fields are delivered to the browser.
                </p>
              </div>
              <Link className="button small" href="/server-data-fetching">
                Open data playground ↗
              </Link>
            </div>
          )}
          {lesson.id === 6 && (
            <div className="try-endpoint">
              <div>
                <strong>Test whitespace-only input</strong>
                <p>
                  Submit the prefilled title and inspect how the validation
                  route responds.
                </p>
              </div>
              <Link
                className="button small"
                href="/request-validation-with-zod"
              >
                Open validation playground ↗
              </Link>
            </div>
          )}
          {lesson.id === 7 && (
            <div className="try-endpoint">
              <div>
                <strong>Compare existing and missing task IDs</strong>
                <p>
                  Request both IDs and inspect the status and response body.
                </p>
              </div>
              <Link className="button small" href="/errors-and-status-codes">
                Open error status playground ↗
              </Link>
            </div>
          )}
          {lesson.id === 8 && (
            <div className="try-endpoint">
              <div>
                <strong>Compare task-list API responses</strong>
                <p>
                  See how the practice route differs from the service-backed
                  task API.
                </p>
              </div>
              <Link className="button small" href="/service-layer-design">
                Open service layer playground ↗
              </Link>
            </div>
          )}
          {lesson.id === 9 && (
            <div className="try-endpoint">
              <div>
                <strong>Create and inspect a demo session</strong>
                <p>
                  Sign in with a username, inspect the cookie policy, and
                  revoke the session.
                </p>
              </div>
              <Link
                className="button small"
                href="/authentication-sessions"
              >
                Open session playground ↗
              </Link>
            </div>
          )}
          {lesson.id === 10 && (
            <div className="try-endpoint">
              <div>
                <strong>Use your Module 9 session to test access</strong>
                <p>
                  Sign in once, then check whether the session owner may read
                  each task.
                </p>
              </div>
              <Link
                className="button small"
                href="/authorization-and-ownership"
              >
                Open ownership playground ↗
              </Link>
            </div>
          )}
          {lesson.id === 11 && (
            <div className="try-endpoint">
              <div>
                <strong>Inspect a server route response</strong>
                <p>
                  See which configuration values are actually delivered to
                  the browser.
                </p>
              </div>
              <Link
                className="button small"
                href="/secrets-and-server-boundaries"
              >
                Open secrets playground ↗
              </Link>
            </div>
          )}
          {lesson.id === 12 && (
            <div className="try-endpoint">
              <div>
                <strong>Inspect redirect destinations safely</strong>
                <p>
                  Compare local, external, and protocol-relative URLs without
                  leaving the page.
                </p>
              </div>
              <Link
                className="button small"
                href="/common-web-vulnerabilities"
              >
                Open redirect playground ↗
              </Link>
            </div>
          )}
          {lesson.id === 13 && (
            <div className="try-endpoint">
              <div>
                <strong>Explore the Proxy request lifecycle</strong>
                <p>
                  Compare Proxy blocking, continuing, redirecting, and
                  rewriting a request.
                </p>
              </div>
              <Link
                className="button small"
                href="/proxy-and-request-protection"
              >
                Open Proxy playground ↗
              </Link>
            </div>
          )}
          <button
            className="start-debug-button"
            onClick={() => selectMode("debug")}
          >
            Ready to apply this? Start the debugging challenge <span>→</span>
          </button>
          {lesson.endpoint && (
            <div className="try-endpoint">
              <div>
                <strong>Try it in the running app</strong>
                <p>
                  Open the endpoint in another tab and compare the live response
                  to the code.
                </p>
              </div>
              <Link className="button small" href={lesson.endpoint}>
                Open endpoint ↗
              </Link>
            </div>
          )}
          <div className="checkpoint">
            <div className="checkpoint-icon">✓</div>
            <div>
              <strong>Checkpoint</strong>
              <p>
                Can you explain how the request reaches this file and how the
                response is created?
              </p>
            </div>
          </div>
        </section>
      ) : (
        <section id="debug-panel" className="lesson-panel debug-panel">
          <div className="panel-kicker">PART B · DEBUGGING CHALLENGE</div>
          <div className="challenge-title-row">
            <span className="bug-symbol">!</span>
            <div>
              <span className="challenge-label">BUG REPORT</span>
              <h2>{lesson.debugTitle}</h2>
            </div>
          </div>
          <p className="challenge-scenario">{lesson.debugScenario}</p>
          <div className="debug-target">
            <span className="target-label">
              EXERCISE FILE · OPEN IN YOUR EDITOR
            </span>
            <code>{debugExercise.file}</code>
            <Link
              href={debugExercise.endpoint}
              target={
                lesson.id === 2 ||
                lesson.id === 3 ||
                lesson.id === 4 ||
                lesson.id === 6 ||
                lesson.id === 7 ||
                lesson.id === 8 ||
                lesson.id === 9 ||
                lesson.id === 10 ||
                lesson.id === 11 ||
                lesson.id === 12 ||
                lesson.id === 13
                  ? undefined
                  : "_blank"
              }
              rel={
                lesson.id === 2 ||
                lesson.id === 3 ||
                lesson.id === 4 ||
                lesson.id === 6 ||
                lesson.id === 7 ||
                lesson.id === 8 ||
                lesson.id === 9 ||
                lesson.id === 10 ||
                lesson.id === 11 ||
                lesson.id === 12 ||
                lesson.id === 13
                  ? undefined
                  : "noreferrer"
              }
            >
              {lesson.id === 2
                ? "Open live demo ↗"
                : lesson.id === 3
                  ? "Open POST playground ↗"
                  : lesson.id === 4
                    ? "Open data playground ↗"
                    : lesson.id === 6
                      ? "Open validation playground ↗"
                      : lesson.id === 7
                        ? "Open error status playground ↗"
                        : lesson.id === 8
                          ? "Open service layer playground ↗"
                          : lesson.id === 9
                            ? "Open session playground ↗"
                            : lesson.id === 10
                              ? "Open ownership playground ↗"
                              : lesson.id === 11
                                ? "Open secrets playground ↗"
                                : lesson.id === 12
                                  ? "Open redirect playground ↗"
                                  : lesson.id === 13
                                    ? "Open Proxy playground ↗"
                  : `Reproduce via ${debugExercise.endpoint} ↗`}
            </Link>
          </div>
          <details className="debug-source" open>
            <summary>View the broken exercise source</summary>
            <pre>
              <code>{debugExercise.code}</code>
            </pre>
          </details>
          <h3>Your mission</h3>
          <div className="debug-checklist">
            {lesson.debugTasks.map((task) => (
              <label className="debug-check" key={task}>
                <input
                  type="checkbox"
                  checked={checked.includes(task)}
                  onChange={() => toggleCheck(task)}
                />
                <span>{task}</span>
              </label>
            ))}
          </div>
          <button
            className="hint-button"
            onClick={() => setHintOpen(!hintOpen)}
          >
            {hintOpen ? "Hide hint" : "Need a hint? Reveal a hint"}{" "}
            <span>{hintOpen ? "−" : "+"}</span>
          </button>
          {hintOpen && (
            <div className="hint-box">
              <strong>Hint</strong>
              <p>{lesson.hint}</p>
            </div>
          )}
          <div className="expected-box">
            <span className="expected-label">EXPECTED BEHAVIOR</span>
            <p>{lesson.expected}</p>
            <div className="verify-line">
              <strong>Verify:</strong> {lesson.verify}
            </div>
          </div>
          <p className="solution-note">
            Try to solve it before opening{" "}
            <code>
              solutions/lesson-{String(lesson.id).padStart(2, "0")}/SOLUTION.md
            </code>{" "}
            in your editor. The solution guide is intentionally not shown
            automatically here.
          </p>
        </section>
      )}

      <div className="lesson-footer">
        <button
          className={
            completed ? "complete-button completed" : "complete-button"
          }
          onClick={toggleCompleted}
        >
          {completed
            ? "✓ Completed — mark incomplete"
            : "Mark lesson complete →"}
        </button>
        <div className="lesson-pagination">
          {previous ? (
            <Link href={`/learn/${previous.slug}`} className="prev-link">
              ← Previous<span>{previous.title}</span>
            </Link>
          ) : (
            <span />
          )}
          {next ? (
            <Link href={`/learn/${next.slug}`} className="next-link">
              Next chapter →<span>{next.title}</span>
            </Link>
          ) : (
            <Link href="/" className="next-link">
              Back to curriculum<span>Review your progress</span>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}
