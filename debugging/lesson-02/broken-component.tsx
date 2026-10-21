// Exercise snippet: this component calls a React hook but has no client boundary.
import { useState } from "react";
export default function ClickCounter() {
  const [count, setCount] = useState(0);
  return <button onClick={() => setCount(count + 1)}>Clicked {count} times</button>;
}
