import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import CsrfPlayground from "@/components/CsrfPlayground";

describe("CsrfPlayground", () => {
  afterEach(() => {
    delete (globalThis as { fetch?: typeof fetch }).fetch;
  });

  it("reports an unauthenticated update accepted by the Promise check", async () => {
    const fetchMock = jest
      .fn()
      .mockResolvedValueOnce({
        ok: true,
        json: async () => ({ authenticated: false }),
      })
      .mockResolvedValueOnce({
        status: 200,
        statusText: "OK",
        json: async () => ({ updated: true }),
      })
      .mockResolvedValueOnce({
        ok: true,
        json: async () => ({ authenticated: false }),
      });
    globalThis.fetch = fetchMock;
    render(<CsrfPlayground trustedOrigin="http://localhost:3000" />);

    await screen.findByText("signed-out");
    fireEvent.click(screen.getByRole("button", { name: "Submit profile update" }));

    await waitFor(() =>
      expect(
        screen.getByText("Bug reproduced: an unauthenticated update was accepted"),
      ).toBeInTheDocument(),
    );
  });

  it("submits the simulated different-port origin and reports an accepted mismatch", async () => {
    const fetchMock = jest
      .fn()
      .mockResolvedValueOnce({
        ok: true,
        json: async () => ({ authenticated: true }),
      })
      .mockResolvedValueOnce({
        status: 200,
        statusText: "OK",
        json: async () => ({ updated: true }),
      })
      .mockResolvedValueOnce({
        ok: true,
        json: async () => ({ authenticated: true }),
      });
    globalThis.fetch = fetchMock;
    render(<CsrfPlayground trustedOrigin="http://localhost:3000" />);

    await screen.findByText("signed-in");
    fireEvent.click(screen.getByRole("button", { name: "Same host, different port" }));
    const simulatedOrigin = screen.getByRole("textbox", {
      name: "Origin to simulate",
    }) as HTMLInputElement;
    const submittedOrigin = simulatedOrigin.value;
    expect(submittedOrigin).not.toBe(window.location.origin);
    fireEvent.click(screen.getByRole("button", { name: "Submit profile update" }));

    await waitFor(() =>
      expect(
        screen.getByText("Bug reproduced: a different origin was accepted"),
      ).toBeInTheDocument(),
    );
    expect(fetchMock).toHaveBeenNthCalledWith(
      2,
      "/api/debug/lesson-12-csrf",
      expect.objectContaining({
        method: "POST",
        headers: { "X-CSRF-Lab-Origin": submittedOrigin },
      }),
    );
  });
});