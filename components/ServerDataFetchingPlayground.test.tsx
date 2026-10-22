import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import ServerDataFetchingPlayground from "@/components/ServerDataFetchingPlayground";

describe("ServerDataFetchingPlayground", () => {
  afterEach(() => {
    delete (globalThis as { fetch?: typeof fetch }).fetch;
  });

  it("requests the practice route and identifies an exposed token field", async () => {
    const fetchMock = jest.fn().mockResolvedValue({
      status: 200,
      statusText: "OK",
      text: async () =>
        JSON.stringify({ app: "Next Lab", token: "demo-secret-not-configured" }),
    });
    globalThis.fetch = fetchMock;
    render(<ServerDataFetchingPlayground />);

    fireEvent.click(screen.getByRole("button", { name: "Fetch server data" }));

    await waitFor(() =>
      expect(
        screen.getByText(/response exposes a token-like field/),
      ).toBeInTheDocument(),
    );
    expect(fetchMock).toHaveBeenCalledWith("/api/debug/lesson-04", {
      cache: "no-store",
    });
    expect(screen.getByText(/"token"/)).toBeInTheDocument();
  });

  it("recognizes a response without a token field", async () => {
    globalThis.fetch = jest.fn().mockResolvedValue({
      status: 200,
      statusText: "OK",
      text: async () => JSON.stringify({ app: "Next Lab" }),
    });
    render(<ServerDataFetchingPlayground />);

    fireEvent.click(screen.getByRole("button", { name: "Fetch server data" }));

    await waitFor(() =>
      expect(
        screen.getByText(/No token field is present in this response/),
      ).toBeInTheDocument(),
    );
  });
});
