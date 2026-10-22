import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import RouteHandlerPlayground from "@/components/RouteHandlerPlayground";

describe("RouteHandlerPlayground", () => {
  afterEach(() => {
    delete (globalThis as { fetch?: typeof fetch }).fetch;
  });

  it("sends the form as JSON to the practice handler and displays its HTTP response", async () => {
    const fetchMock = jest.fn().mockResolvedValue({
      status: 200,
      statusText: "OK",
      text: async () => JSON.stringify({ created: { title: "Trace a POST request" } }),
    });
    globalThis.fetch = fetchMock;
    const user = userEvent.setup();
    render(<RouteHandlerPlayground />);

    await user.click(screen.getByRole("button", { name: "Send POST request" }));

    await waitFor(() => expect(screen.getByText("200 OK")).toBeInTheDocument());
    expect(fetchMock).toHaveBeenCalledWith("/api/debug/lesson-03", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title: "Trace a POST request" }),
    });
    expect(screen.getByText(/"created"/)).toBeInTheDocument();
    expect(screen.getByText(/should return 201 Created/)).toBeInTheDocument();
  });

  it("recognizes the corrected 201 Created response", async () => {
    globalThis.fetch = jest.fn().mockResolvedValue({
      status: 201,
      statusText: "Created",
      text: async () => JSON.stringify({ created: { title: "Trace a POST request" } }),
    });
    render(<RouteHandlerPlayground />);

    fireEvent.click(screen.getByRole("button", { name: "Send POST request" }));

    await waitFor(() => expect(screen.getByText("201 Created")).toBeInTheDocument());
    expect(screen.getByText(/the handler returned 201 Created/)).toBeInTheDocument();
  });
});
