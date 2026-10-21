# Reference solution — Lesson 01

The URL `/api/hello` maps to `app/api/hello/route.ts`. Next.js calls the exported `GET` function for a GET request. The starter handler should return a successful JSON response.

```ts
import { NextResponse } from "next/server";
export function GET() {
  return NextResponse.json({ message: "Hello from the Next.js server!", lesson: 1 });
}
```

Verify with `curl -i http://localhost:3000/api/hello`. Expect HTTP 200 and a JSON body containing the message and lesson number. The isolated broken snippet lives in `debugging/lesson-01/broken-route.ts`; it is not imported by the app.
