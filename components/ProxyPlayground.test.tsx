import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import ProxyPlayground from "@/components/ProxyPlayground";

describe("ProxyPlayground", () => {
  afterEach(() => {
    delete (globalThis as { fetch?: typeof fetch }).fetch;
  });

  it("shows a signed-out request was blocked before the route handler", async () => {
    globalThis.fetch = jest.fn().mockResolvedValue({
      status: 401,
      statusText: "Unauthorized",
      url: "http://localhost/api/debug/lesson-13?action=continue",
      text: async () => JSON.stringify({ error: "Unauthorized" }),
    });
    render(<ProxyPlayground />);

    fireEvent.click(screen.getByRole("button", { name: "Send request" }));

    await waitFor(() =>
      expect(
        screen.getByText(/Proxy blocked this request before the Route Handler ran/),
      ).toBeInTheDocument(),
    );
    expect(
      screen.getByText("Proxy (handler not reached)"),
    ).toBeInTheDocument();
  });

  it("reports the handler reached by a rewrite", async () => {
    globalThis.fetch = jest.fn().mockResolvedValue({
      status: 200,
      statusText: "OK",
      url: "http://localhost/api/debug/lesson-13?action=rewrite",
      text: async () =>
        JSON.stringify({
          handledBy: "proxy-target-handler",
          proxyAction: "rewrite",
        }),
    });
    render(<ProxyPlayground />);

    fireEvent.change(screen.getByRole("combobox", { name: "Proxy action" }), {
      target: { value: "rewrite" },
    });
    fireEvent.click(screen.getByRole("button", { name: "Send request" }));

    await waitFor(() =>
      expect(
        screen.getByText(/Proxy rewrote the request internally/),
      ).toBeInTheDocument(),
    );
    expect(screen.getByText("proxy-target-handler")).toBeInTheDocument();
  });

  it("reports the original route handler for continue", async () => {
    globalThis.fetch = jest.fn().mockResolvedValue({
      status: 200,
      statusText: "OK",
      url: "http://localhost/api/debug/lesson-13?action=continue",
      text: async () =>
        JSON.stringify({
          handledBy: "lesson-13-route-handler",
          proxyAction: "continue",
        }),
    });
    render(<ProxyPlayground />);

    fireEvent.click(screen.getByRole("button", { name: "Send request" }));

    await waitFor(() =>
      expect(screen.getByText("lesson-13-route-handler")).toBeInTheDocument(),
    );
    expect(
      screen.getByText(/Proxy continued to the original handler/),
    ).toBeInTheDocument();
  });

  it("reports the target URL after a redirect", async () => {
    globalThis.fetch = jest.fn().mockResolvedValue({
      status: 200,
      statusText: "OK",
      url: "http://localhost/api/debug/lesson-13-target?via=redirect",
      text: async () =>
        JSON.stringify({
          handledBy: "proxy-target-handler",
          proxyAction: "redirect",
        }),
    });
    render(<ProxyPlayground />);

    fireEvent.change(screen.getByRole("combobox", { name: "Proxy action" }), {
      target: { value: "redirect" },
    });
    fireEvent.click(screen.getByRole("button", { name: "Send request" }));

    await waitFor(() =>
      expect(
        screen.getByText(/Proxy redirected the fetch to an internal target/),
      ).toBeInTheDocument(),
    );
    expect(
      screen.getByText("http://localhost/api/debug/lesson-13-target?via=redirect"),
    ).toBeInTheDocument();
  });
});
