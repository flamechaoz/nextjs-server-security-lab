import type { MDXComponents } from "mdx/types";

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    h2: (props) => <h2 {...props} className="mdx-section-heading" />,
    h3: (props) => <h3 {...props} className="mdx-subsection-heading" />,
    ul: (props) => <ul {...props} className="objective-list" />,
    pre: (props) => <div className="code-card"><pre {...props} /></div>,
    ...components,
  };
}
