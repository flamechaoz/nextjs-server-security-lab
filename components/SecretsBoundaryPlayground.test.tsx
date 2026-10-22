import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import SecretsBoundaryPlayground from "@/components/SecretsBoundaryPlayground";

describe("SecretsBoundaryPlayground", () => {
  afterEach(() => {
    delete (globalThis as { fetch?: typeof fetch }).fetch;
  });

  it("identifies a token-like value in the API response", async () => {
    const fetchMock = jest.fn().mockResolvedValue({
      status: 200,
      statusText: "OK",
      text: async () =>
        JSON.stringify({
          configuration: { app: "Next Lab", token: "demo-only-fake-token" },
        }),
    });
    globalThis.fetch = fetchMock;
    render(<SecretsBoundaryPlayground />);

    fireEvent.click(
      screen.getByRole("button", { name: "Fetch server response" }),
    );

    await waitFor(() =>
      expect(screen.getByText(/Exposure reproduced/)).toBeInTheDocument(),
    );
    expect(fetchMock).toHaveBeenCalledWith("/api/debug/lesson-11", {
      cache: "no-store",
    });
    expect(screen.getByText(/API-response leak, not a browser-bundle leak/)).toBeInTheDocument();
  });

  it("recognizes a response without a token field", async () => {
    globalThis.fetch = jest.fn().mockResolvedValue({
      status: 200,
      statusText: "OK",
      text: async () => JSON.stringify({ configuration: { app: "Next Lab" } }),
    });
    render(<SecretsBoundaryPlayground />);

    fireEvent.click(
      screen.getByRole("button", { name: "Fetch server response" }),
    );

    await waitFor(() =>
      expect(screen.getByText(/No token field appears/)).toBeInTheDocument(),
    );
  });
});
