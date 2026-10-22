import { createElement, type ComponentType, type ReactNode } from "react";
import type { MDXProps } from "mdx/types";
import serverRequestLifecycle, { lesson as lesson01 } from "@/content/lessons/server-request-lifecycle.mdx";
import serverAndClientComponents, { lesson as lesson02 } from "@/content/lessons/server-and-client-components.mdx";
import routeHandlersAndHttp, { lesson as lesson03 } from "@/content/lessons/route-handlers-and-http.mdx";
import serverDataFetching, { lesson as lesson04 } from "@/content/lessons/server-data-fetching.mdx";
import dynamicRouteParams, { lesson as lesson05 } from "@/content/lessons/dynamic-route-params.mdx";
import requestValidationWithZod, { lesson as lesson06 } from "@/content/lessons/request-validation-with-zod.mdx";
import errorsAndStatusCodes, { lesson as lesson07 } from "@/content/lessons/errors-and-status-codes.mdx";
import serviceLayerDesign, { lesson as lesson08 } from "@/content/lessons/service-layer-design.mdx";
import authenticationSessions, { lesson as lesson09 } from "@/content/lessons/authentication-sessions.mdx";
import authorizationAndOwnership, { lesson as lesson10 } from "@/content/lessons/authorization-and-ownership.mdx";
import secretsAndServerBoundaries, { lesson as lesson11 } from "@/content/lessons/secrets-and-server-boundaries.mdx";
import commonWebVulnerabilities, { lesson as lesson12 } from "@/content/lessons/common-web-vulnerabilities.mdx";
import proxyAndRequestProtection, { lesson as lesson13 } from "@/content/lessons/proxy-and-request-protection.mdx";
import jestTestingFundamentals, { lesson as lesson14 } from "@/content/lessons/jest-testing-fundamentals.mdx";
import unitTestBusinessLogic, { lesson as lesson15 } from "@/content/lessons/unit-test-business-logic.mdx";
import reactComponentTesting, { lesson as lesson16 } from "@/content/lessons/react-component-testing.mdx";
import routeHandlerTesting, { lesson as lesson17 } from "@/content/lessons/route-handler-testing.mdx";
import testingAccessControl, { lesson as lesson18 } from "@/content/lessons/testing-access-control.mdx";
import coverageAndCi, { lesson as lesson19 } from "@/content/lessons/coverage-and-ci.mdx";
import secureTaskApiCapstone, { lesson as lesson20 } from "@/content/lessons/secure-task-api-capstone.mdx";

export type LessonContent = {
  title: string;
  summary: string;
  debugTitle: string;
  debugScenario: string;
  debugTasks: string[];
  hint: string;
  expected: string;
  verify: string;
};

export type Lesson = LessonContent & {
  id: number;
  slug: string;
  module: string;
  duration: string;
  file: string;
  endpoint?: string;
};

type LessonDocument = {
  metadata: Omit<Lesson, keyof LessonContent>;
  content: LessonContent;
  Component: ComponentType<MDXProps>;
};

export const modules = [
  { title: "Server fundamentals", range: "01–04", description: "Trace requests and understand where Next.js code runs." },
  { title: "API design & validation", range: "05–08", description: "Build predictable endpoints with validated inputs and clear errors." },
  { title: "Application security", range: "09–13", description: "Protect identities, resources, secrets, and request boundaries." },
  { title: "Unit testing", range: "14–18", description: "Test business logic, components, endpoints, and access control." },
  { title: "Production readiness", range: "19–20", description: "Use coverage and CI checks to ship a secure capstone." },
];

const lessonDocuments: LessonDocument[] = [
  { metadata: { id: 1, slug: "server-request-lifecycle", module: "Server fundamentals", duration: "15 min", file: "app/api/hello/route.ts", endpoint: "/api/hello" }, content: lesson01, Component: serverRequestLifecycle },
  { metadata: { id: 2, slug: "server-and-client-components", module: "Server fundamentals", duration: "20 min", file: "app/component-boundaries/page.tsx" }, content: lesson02, Component: serverAndClientComponents },
  { metadata: { id: 3, slug: "route-handlers-and-http", module: "Server fundamentals", duration: "20 min", file: "app/route-handlers/route.ts", endpoint: "/api/tasks" }, content: lesson03, Component: routeHandlersAndHttp },
  { metadata: { id: 4, slug: "server-data-fetching", module: "Server fundamentals", duration: "20 min", file: "app/server-data-fetching/page.tsx" }, content: lesson04, Component: serverDataFetching },
  { metadata: { id: 5, slug: "dynamic-route-params", module: "API design & validation", duration: "20 min", file: "app/api/tasks/[id]/route.ts", endpoint: "/api/tasks/1" }, content: lesson05, Component: dynamicRouteParams },
  { metadata: { id: 6, slug: "request-validation-with-zod", module: "API design & validation", duration: "20 min", file: "lib/validation/task-schema.ts", endpoint: "/api/tasks" }, content: lesson06, Component: requestValidationWithZod },
  { metadata: { id: 7, slug: "errors-and-status-codes", module: "API design & validation", duration: "15 min", file: "app/api/debug/lesson-07/route.ts" }, content: lesson07, Component: errorsAndStatusCodes },
  { metadata: { id: 8, slug: "service-layer-design", module: "API design & validation", duration: "20 min", file: "lib/services/task-service.ts" }, content: lesson08, Component: serviceLayerDesign },
  { metadata: { id: 9, slug: "authentication-sessions", module: "Application security", duration: "25 min", file: "app/api/debug/lesson-09/route.ts", endpoint: "/authentication-sessions" }, content: lesson09, Component: authenticationSessions },
  { metadata: { id: 10, slug: "authorization-and-ownership", module: "Application security", duration: "25 min", file: "app/api/debug/lesson-10/route.ts", endpoint: "/authorization-and-ownership" }, content: lesson10, Component: authorizationAndOwnership },
  { metadata: { id: 11, slug: "secrets-and-server-boundaries", module: "Application security", duration: "20 min", file: "app/api/debug/lesson-11/route.ts", endpoint: "/api/debug/lesson-11" }, content: lesson11, Component: secretsAndServerBoundaries },
  { metadata: { id: 12, slug: "common-web-vulnerabilities", module: "Application security", duration: "30 min", file: "app/api/debug/lesson-12/route.ts", endpoint: "/api/debug/lesson-12" }, content: lesson12, Component: commonWebVulnerabilities },
  { metadata: { id: 13, slug: "proxy-and-request-protection", module: "Application security", duration: "20 min", file: "proxy.ts", endpoint: "/api/debug/lesson-13" }, content: lesson13, Component: proxyAndRequestProtection },
  { metadata: { id: 14, slug: "jest-testing-fundamentals", module: "Unit testing", duration: "20 min", file: "jest.config.ts" }, content: lesson14, Component: jestTestingFundamentals },
  { metadata: { id: 15, slug: "unit-test-business-logic", module: "Unit testing", duration: "25 min", file: "lib/task-rules.test.ts" }, content: lesson15, Component: unitTestBusinessLogic },
  { metadata: { id: 16, slug: "react-component-testing", module: "Unit testing", duration: "25 min", file: "components/TaskManager.tsx" }, content: lesson16, Component: reactComponentTesting },
  { metadata: { id: 17, slug: "route-handler-testing", module: "Unit testing", duration: "25 min", file: "app/api/tasks/route.ts", endpoint: "/api/tasks" }, content: lesson17, Component: routeHandlerTesting },
  { metadata: { id: 18, slug: "testing-access-control", module: "Unit testing", duration: "30 min", file: "lib/services/task-service.ts" }, content: lesson18, Component: testingAccessControl },
  { metadata: { id: 19, slug: "coverage-and-ci", module: "Production readiness", duration: "20 min", file: "package.json" }, content: lesson19, Component: coverageAndCi },
  { metadata: { id: 20, slug: "secure-task-api-capstone", module: "Production readiness", duration: "60–90 min", file: "app/api/tasks/[id]/route.ts" }, content: lesson20, Component: secureTaskApiCapstone },
];

export const lessons: Lesson[] = lessonDocuments.map(({ metadata, content }) => ({ ...metadata, ...content }));

export function getLessonBySlug(slug: string) {
  return lessons.find((lesson) => lesson.slug === slug);
}

export function getLessonContent(slug: string): ReactNode | undefined {
  const Component = lessonDocuments.find((lesson) => lesson.metadata.slug === slug)?.Component;
  return Component ? createElement(Component) : undefined;
}

export function getAdjacentLessons(id: number) {
  return {
    previous: lessons.find((lesson) => lesson.id === id - 1),
    next: lessons.find((lesson) => lesson.id === id + 1),
  };
}
