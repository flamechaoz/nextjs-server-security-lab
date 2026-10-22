"use client";

import { useState, type ReactNode } from "react";

type Props = {
  initialCount: number;
  children: ReactNode;
};

export default function BoundaryCounter({ initialCount, children }: Props) {
  const [count, setCount] = useState(initialCount);

  return (
    <section className="card boundary-demo-client">
      <div className="boundary-demo-label">CLIENT COMPONENT</div>
      <h2>Interactive counter</h2>
      <p>{children}</p>
      <p aria-live="polite" className="boundary-counter-value">
        Clicked {count} times
      </p>
      <button className="button" onClick={() => setCount((value) => value + 1)}>
        Increment counter
      </button>
    </section>
  );
}
