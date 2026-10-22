import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import AuthenticationSessionPlayground from "@/components/AuthenticationSessionPlayground";

const activeSession = {
  authenticated: true,
  user: { userId: "demo-user-001", username: "learner", role: "learner" },
  cookie: {
    name: "next-lab-demo-session",
    present: true,
    httpOnly: true,
    secure: false,
    sameSite: "Lax",
    path: "/",
    expiresAt: "2026-10-22T00:00:00.000Z",
  },
};

const signedOutSession = {
  authenticated: false,
  user: null,
  cookie: {
    name: "next-lab-demo-session",
    present: false,
    httpOnly: true,
    secure: false,
    sameSite: "Lax",
    path: "/",
    expiresAt: null,
  },
};

describe("AuthenticationSessionPlayground", () => {
  afterEach(() => {
    delete (globalThis as { fetch?: typeof fetch }).fetch;
  });

  it("logs in, displays safe session and cookie details, then revokes the session", async () => {
    const fetchMock = jest
      .fn()
      .mockResolvedValueOnce({
        ok: true,
        json: async () => ({
          authenticated: true,
          user: activeSession.user,
        }),
      })
      .mockResolvedValueOnce({
        ok: true,
        json: async () => activeSession,
      })
      .mockResolvedValueOnce({
        ok: true,
        json: async () => ({ authenticated: false }),
      })
      .mockResolvedValueOnce({
        ok: true,
        json: async () => signedOutSession,
      });
    globalThis.fetch = fetchMock;
    render(<AuthenticationSessionPlayground />);

    fireEvent.change(screen.getByRole("textbox", { name: "Username" }), {
      target: { value: "learner" },
    });
    fireEvent.click(screen.getByRole("button", { name: "Sign in" }));

    await waitFor(() =>
      expect(screen.getByText("Signed in as learner.")).toBeInTheDocument(),
    );
    expect(screen.getByText("demo-user-001")).toBeInTheDocument();
    expect(screen.getByText("HttpOnly")).toBeInTheDocument();
    expect(screen.getByText("The cookie value is intentionally not returned to the page. Because it is HttpOnly, JavaScript cannot read it. To inspect the browser-stored cookie, use your browser's developer tools.")).toBeInTheDocument();
    expect(fetchMock).toHaveBeenNthCalledWith(
      1,
      "/api/debug/lesson-09",
      expect.objectContaining({
        method: "POST",
        body: JSON.stringify({ username: "learner" }),
      }),
    );

    fireEvent.click(screen.getByRole("button", { name: "Sign out" }));

    await waitFor(() =>
      expect(
        screen.getByText("Signed out. The server-side session was revoked."),
      ).toBeInTheDocument(),
    );
    expect(screen.getByText("No")).toBeInTheDocument();
    expect(fetchMock).toHaveBeenNthCalledWith(
      3,
      "/api/debug/lesson-09",
      { method: "DELETE" },
    );
  });
});
