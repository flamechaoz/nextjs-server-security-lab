"use client";

import Link from "next/link";
import { useEffect, useState, type ReactNode } from "react";
import type { Lesson } from "@/lib/curriculum";

type Props = { lesson: Lesson; content: ReactNode; previous?: Lesson; next?: Lesson };

function debugTarget(lesson: Lesson) {
  return lesson.id === 5
    ? { file: "app/api/debug/tasks/[id]/route.ts", endpoint: "/api/debug/tasks/2" }
    : { file: `app/api/debug/lesson-${String(lesson.id).padStart(2, "0")}/route.ts`, endpoint: `/api/debug/lesson-${String(lesson.id).padStart(2, "0")}` };
}

export default function LessonWorkspace({ lesson, content, previous, next }: Props) {
  const [mode, setMode] = useState<"learn" | "debug">("learn");
  const [hintOpen, setHintOpen] = useState(false);
  const [checked, setChecked] = useState<string[]>([]);
  const [completed, setCompleted] = useState(false);

  useEffect(() => {
    const readProgress = () => {
      try {
        const done = JSON.parse(localStorage.getItem("next-lab-completed") || "[]") as number[];
        setCompleted(done.includes(lesson.id));
      } catch { setCompleted(false); }
    };
    readProgress();
    const raw = sessionStorage.getItem(`next-lab-checks-${lesson.id}`);
    if (raw) {
      try { setChecked(JSON.parse(raw) as string[]); } catch { setChecked([]); }
    }
  }, [lesson.id]);

  function toggleCheck(item: string) {
    const nextChecked = checked.includes(item) ? checked.filter((value) => value !== item) : [...checked, item];
    setChecked(nextChecked);
    sessionStorage.setItem(`next-lab-checks-${lesson.id}`, JSON.stringify(nextChecked));
  }

  function toggleCompleted() {
    const done = JSON.parse(localStorage.getItem("next-lab-completed") || "[]") as number[];
    const updated = completed ? done.filter((id) => id !== lesson.id) : [...new Set([...done, lesson.id])];
    localStorage.setItem("next-lab-completed", JSON.stringify(updated));
    setCompleted(!completed);
    window.dispatchEvent(new Event("next-lab-progress"));
  }

  return (
    <div className="lesson-workspace">
      <div className="lesson-topline"><span>CHAPTER {String(lesson.id).padStart(2, "0")}</span><span>{lesson.duration}</span></div>
      <h1>{lesson.title}</h1>
      <p className="lesson-summary">{lesson.summary}</p>
      <div className="lesson-meta"><span className="module-chip">{lesson.module}</span><span className="file-chip">File: <code>{lesson.file}</code></span></div>

      <div className="mode-tabs" role="tablist" aria-label="Lesson modes">
        <button role="tab" aria-selected={mode === "learn"} className={mode === "learn" ? "mode-tab active" : "mode-tab"} onClick={() => setMode("learn")}><span className="tab-number">A</span><span><strong>Learn</strong><small>Guided walkthrough</small></span></button>
        <button role="tab" aria-selected={mode === "debug"} className={mode === "debug" ? "mode-tab active debug-tab" : "mode-tab debug-tab"} onClick={() => setMode("debug")}><span className="tab-number">B</span><span><strong>Debug</strong><small>Fix the broken behavior</small></span></button>
      </div>

      {mode === "learn" ? <section className="lesson-panel">
        <div className="panel-kicker">PART A · CONCEPTS</div>
        <div className="lesson-content">{content}</div>
        {lesson.endpoint && <div className="try-endpoint"><div><strong>Try it in the running app</strong><p>Open the endpoint in another tab and compare the live response to the code.</p></div><Link className="button small" href={lesson.endpoint}>Open endpoint ↗</Link></div>}
        <div className="checkpoint"><div className="checkpoint-icon">✓</div><div><strong>Checkpoint</strong><p>Can you explain how the request reaches this file and how the response is created?</p></div></div>
      </section> : <section className="lesson-panel debug-panel">
        <div className="panel-kicker">PART B · DEBUGGING CHALLENGE</div>
        <div className="challenge-title-row"><span className="bug-symbol">!</span><div><span className="challenge-label">BUG REPORT</span><h2>{lesson.debugTitle}</h2></div></div>
        <p className="challenge-scenario">{lesson.debugScenario}</p>
        <div className="debug-target"><span className="target-label">INTENTIONALLY BROKEN HANDLER · START HERE</span><code>{debugTarget(lesson).file}</code><Link href={debugTarget(lesson).endpoint}>Reproduce via {debugTarget(lesson).endpoint} ↗</Link></div>
        <h3>Your mission</h3>
        <div className="debug-checklist">{lesson.debugTasks.map((task) => <label className="debug-check" key={task}><input type="checkbox" checked={checked.includes(task)} onChange={() => toggleCheck(task)}/><span>{task}</span></label>)}</div>
        <button className="hint-button" onClick={() => setHintOpen(!hintOpen)}>{hintOpen ? "Hide hint" : "Need a hint? Reveal a hint"} <span>{hintOpen ? "−" : "+"}</span></button>
        {hintOpen && <div className="hint-box"><strong>Hint</strong><p>{lesson.hint}</p></div>}
        <div className="expected-box"><span className="expected-label">EXPECTED BEHAVIOR</span><p>{lesson.expected}</p><div className="verify-line"><strong>Verify:</strong> {lesson.verify}</div></div>
        <p className="solution-note">Try to solve it before opening <code>solutions/lesson-{String(lesson.id).padStart(2, "0")}/SOLUTION.md</code> in your editor. The solution guide is intentionally not shown automatically here.</p>
      </section>}

      <div className="lesson-footer"><button className={completed ? "complete-button completed" : "complete-button"} onClick={toggleCompleted}>{completed ? "✓ Completed — mark incomplete" : "Mark lesson complete →"}</button><div className="lesson-pagination">{previous ? <Link href={`/learn/${previous.slug}`} className="prev-link">← Previous<span>{previous.title}</span></Link> : <span/>}{next ? <Link href={`/learn/${next.slug}`} className="next-link">Next chapter →<span>{next.title}</span></Link> : <Link href="/" className="next-link">Back to curriculum<span>Review your progress</span></Link>}</div></div>
    </div>
  );
}
