import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import OpenRedirectPlayground from "@/components/OpenRedirectPlayground";

describe("OpenRedirectPlayground", () => {
  afterEach(() => {
    delete (globalThis as { fetch?: typeof fetch }).fetch;
  });

  it("submits an external destination and identifies the open redirect", async () => {
    const fetchMock = jest.fn().mockResolvedValue({
      status: 200,
      statusText: "OK",
      json: async () => ({ redirectTo: "https://example.test" }),
    });
    globalThis.fetch = fetchMock;
    render(<OpenRedirectPlayground />);

    fireEvent.click(screen.getByRole("button", { name: "External URL" }));
    fireEvent.click(
      screen.getByRole("button", { name: "Inspect destination" }),
    );

    await waitFor(() =>
      expect(screen.getByText(/server accepted an external destination/)).toBeInTheDocument(),
    );
    expect(fetchMock).toHaveBeenCalledWith(
      "/api/debug/lesson-12?returnTo=https%3A%2F%2Fexample.test",
      { cache: "no-store" },
    );
  });

  it("recognizes a safe local path", async () => {
    globalThis.fetch = jest.fn().mockResolvedValue({
      status: 200,
      statusText: "OK",
      json: async () => ({ redirectTo: "/dashboard" }),
    });
    render(<OpenRedirectPlayground />);

    fireEvent.click(
      screen.getByRole("button", { name: "Inspect destination" }),
    );

    await waitFor(() =>
      expect(screen.getByText("Local destination")).toBeInTheDocument(),
    );
    expect(
      screen.getByText("This destination stays on the current origin."),
    ).toBeInTheDocument();
  });

  it("classifies a protocol-relative destination as external", async () => {
    globalThis.fetch = jest.fn().mockResolvedValue({
      status: 200,
      statusText: "OK",
      json: async () => ({ redirectTo: "//example.test" }),
    });
    render(<OpenRedirectPlayground />);

    fireEvent.click(
      screen.getByRole("button", { name: "Protocol-relative" }),
    );
    fireEvent.click(
      screen.getByRole("button", { name: "Inspect destination" }),
    );

    await waitFor(() =>
      expect(screen.getByText(/External destination — unsafe/)).toBeInTheDocument(),
    );
    expect(globalThis.fetch).toHaveBeenCalledWith(
      "/api/debug/lesson-12?returnTo=%2F%2Fexample.test",
      { cache: "no-store" },
    );
  });
});
