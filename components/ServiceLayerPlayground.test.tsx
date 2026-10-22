import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import ServiceLayerPlayground from "@/components/ServiceLayerPlayground";

describe("ServiceLayerPlayground", () => {
  afterEach(() => {
    delete (globalThis as { fetch?: typeof fetch }).fetch;
  });

  it("compares both API responses and identifies the broken route contract", async () => {
    const fetchMock = jest
      .fn()
      .mockResolvedValueOnce({
        status: 200,
        text: async () => JSON.stringify({ tasks: [] }),
      })
      .mockResolvedValueOnce({
        status: 200,
        text: async () =>
          JSON.stringify({ data: [{ id: 1, title: "Task" }], count: 1 }),
      });
    globalThis.fetch = fetchMock;
    render(<ServiceLayerPlayground />);

    fireEvent.click(
      screen.getByRole("button", { name: "Compare API responses" }),
    );

    await waitFor(() =>
      expect(screen.getByText(/responses do not match/)).toBeInTheDocument(),
    );
    expect(fetchMock).toHaveBeenNthCalledWith(
      1,
      "/api/debug/lesson-08",
      { cache: "no-store" },
    );
    expect(fetchMock).toHaveBeenNthCalledWith(
      2,
      "/api/tasks",
      { cache: "no-store" },
    );
    expect(screen.getByText(/"tasks"/)).toBeInTheDocument();
  });

  it("recognizes matching service response data and count", async () => {
    const sharedResponse = JSON.stringify({
      data: [{ id: 1, title: "Task" }],
      count: 1,
    });
    globalThis.fetch = jest
      .fn()
      .mockResolvedValueOnce({ status: 200, text: async () => sharedResponse })
      .mockResolvedValueOnce({ status: 200, text: async () => sharedResponse });
    render(<ServiceLayerPlayground />);

    fireEvent.click(
      screen.getByRole("button", { name: "Compare API responses" }),
    );

    await waitFor(() =>
      expect(screen.getByText(/response data and count match/)).toBeInTheDocument(),
    );
  });
});
