import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import AuthorizationOwnershipPlayground from "@/components/AuthorizationOwnershipPlayground";

describe("AuthorizationOwnershipPlayground", () => {
  afterEach(() => {
    delete (globalThis as { fetch?: typeof fetch }).fetch;
  });

  it("explains that the session is required before authorization", async () => {
    globalThis.fetch = jest.fn().mockResolvedValue({
      ok: false,
      status: 401,
      statusText: "Unauthorized",
      text: async () => JSON.stringify({ error: "Unauthorized" }),
    });
    render(<AuthorizationOwnershipPlayground />);

    fireEvent.click(screen.getByRole("button", { name: "Request task" }));

    await waitFor(() =>
      expect(screen.getByText(/No valid Module 9 session was found/)).toBeInTheDocument(),
    );
    expect(screen.getByRole("link", { name: /Module 9 login playground/ })).toHaveAttribute(
      "href",
      "/authentication-sessions",
    );
  });

  it("identifies a cross-owner task leaked to the authenticated user", async () => {
    globalThis.fetch = jest.fn().mockResolvedValue({
      ok: true,
      status: 200,
      statusText: "OK",
      text: async () =>
        JSON.stringify({
          task: {
            id: 2,
            title: "Another user's private task",
            ownerId: "demo-user-002",
          },
        }),
    });
    render(<AuthorizationOwnershipPlayground />);

    fireEvent.click(screen.getByRole("button", { name: "Request task" }));

    await waitFor(() =>
      expect(
        screen.getByText(/task belongs to a different user and was still returned/),
      ).toBeInTheDocument(),
    );
  });
});
