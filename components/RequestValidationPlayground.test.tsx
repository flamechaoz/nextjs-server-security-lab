import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import RequestValidationPlayground from "@/components/RequestValidationPlayground";

describe("RequestValidationPlayground", () => {
  afterEach(() => {
    delete (globalThis as { fetch?: typeof fetch }).fetch;
  });

  it("submits whitespace-only input and identifies the accepted bug", async () => {
    const fetchMock = jest.fn().mockResolvedValue({
      status: 201,
      statusText: "Created",
      text: async () => JSON.stringify({ accepted: { title: "   " } }),
    });
    globalThis.fetch = fetchMock;
    render(<RequestValidationPlayground />);

    fireEvent.click(screen.getByRole("button", { name: "Submit title" }));

    await waitFor(() =>
      expect(screen.getByText("201 Created")).toBeInTheDocument(),
    );
    expect(fetchMock).toHaveBeenCalledWith("/api/debug/lesson-06", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title: "   " }),
    });
    expect(screen.getByText(/whitespace-only input was accepted/)).toBeInTheDocument();
  });

  it("recognizes the corrected HTTP 400 validation response", async () => {
    globalThis.fetch = jest.fn().mockResolvedValue({
      status: 400,
      statusText: "Bad Request",
      text: async () => JSON.stringify({ error: "Invalid input" }),
    });
    render(<RequestValidationPlayground />);

    fireEvent.click(screen.getByRole("button", { name: "Submit title" }));

    await waitFor(() =>
      expect(screen.getByText("400 Bad Request")).toBeInTheDocument(),
    );
    expect(screen.getByText(/route rejected the whitespace-only title/)).toBeInTheDocument();
  });
});
