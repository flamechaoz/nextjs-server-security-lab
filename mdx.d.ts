declare module "*.mdx" {
  import type { ComponentType } from "react";
  import type { MDXProps } from "mdx/types";
  import type { LessonContent } from "@/lib/curriculum";

  export const lesson: LessonContent;
  const MDXContent: ComponentType<MDXProps>;
  export default MDXContent;
}
