import type { Metadata } from "next";
import Link from "next/link";
import "./globals.css";
export const metadata: Metadata = {
  title: "Next Lab — Server, Security & Tests",
  description: "A chapter-based, hands-on Next.js curriculum with guided lessons and debugging challenges.",
};
export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body><header className="site-header"><div className="header-inner"><Link className="brand" href="/"><span className="brand-mark">N</span><span>NEXT <b>LAB</b><small>SERVER · SECURITY · TESTS</small></span></Link><nav className="nav"><Link href="/">Curriculum</Link><Link href="/learn/server-request-lifecycle">Start learning</Link><Link href="/tasks">Task demo</Link><a href="/api/hello">API playground ↗</a></nav></div></header>{children}</body></html>;
}
