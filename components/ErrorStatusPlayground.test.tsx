import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import ErrorStatusPlayground from "@/components/ErrorStatusPlayground";

describe("ErrorStatusPlayground", () => {
  afterEach(() => {
    delete (globalThis as { fetch?: typeof fetch }).fetch;
  });

  it("requests the prefilled missing task and reports the reproduced 500", async () => {
    const fetchMock = jest.fn().mockResolvedValue({
      status: 500,
      statusText: "Internal Server Error",
      text: async () => JSON.stringify({ error: "Task not found" }),
    });
    globalThis.fetch = fetchMock;
    render(<ErrorStatusPlayground />);

    fireEvent.click(screen.getByRole("button", { name: "Send GET request" }));

    await waitFor(() =>
      expect(screen.getByText("500 Internal Server Error")).toBeInTheDocument(),
    );
    expect(fetchMock).toHaveBeenCalledWith(
      "/api/debug/lesson-07?id=999",
      { cache: "no-store" },
    );
    expect(screen.getByText(/task is missing, but the route reports/)).toBeInTheDocument();
  });

  it("recognizes the corrected 404 not-found response", async () => {
    globalThis.fetch = jest.fn().mockResolvedValue({
      status: 404,
      statusText: "Not Found",
      text: async () => JSON.stringify({ error: "Task not found" }),
    });
    render(<ErrorStatusPlayground />);

    fireEvent.click(screen.getByRole("button", { name: "Send GET request" }));

    await waitFor(() =>
      expect(screen.getByText("404 Not Found")).toBeInTheDocument(),
    );
    expect(screen.getByText(/unknown task is reported with HTTP 404/)).toBeInTheDocument();
  });
});
