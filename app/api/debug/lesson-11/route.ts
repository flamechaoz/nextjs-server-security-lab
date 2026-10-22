import { NextResponse } from "next/server";
// INTENTIONAL BUG: private config is returned to the client.
export function GET() {
  return NextResponse.json({
    configuration: {
      app: "Next Lab",
      token: "demo-secret-not-configured",
    },
  });
}
