# Reference solution — Lesson 02

If the component requires local state and click handlers, mark the component file with the client directive before imports:

```tsx
"use client";
import { useState } from "react";
export default function ClickCounter() {
  const [count, setCount] = useState(0);
  return <button onClick={() => setCount(count + 1)}>Clicked {count} times</button>;
}
```

Alternatively, keep the parent as a Server Component and extract only the interactive portion into a Client Component. Do not move database credentials or private server logic into the client component.
