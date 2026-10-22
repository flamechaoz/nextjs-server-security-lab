import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import TaskManager from "@/components/TaskManager";

const openTask = {
  id: 1,
  title: "Write an accessible test",
  completed: false,
  ownerId: "demo-user",
};

const completedTask = { ...openTask, completed: true };

function jsonResponse(body: unknown, status: number) {
  return {
    ok: status >= 200 && status < 300,
    status,
    json: async () => body,
  } as Response;
}

describe("TaskManager", () => {
  afterEach(() => {
    jest.restoreAllMocks();
  });

  it("completes a task through the user-facing control", async () => {
    const fetchMock = jest.fn()
      .mockResolvedValueOnce(
        jsonResponse({ data: [openTask], count: 1 }, 200),
      )
      .mockResolvedValueOnce(jsonResponse(null, 204))
      .mockResolvedValueOnce(
        jsonResponse({ data: [completedTask], count: 1 }, 200),
      );
    Object.defineProperty(globalThis, "fetch", {
      configurable: true,
      value: fetchMock,
      writable: true,
    });

    const user = userEvent.setup();
    const { container } = render(<TaskManager />);

    await screen.findByText("Write an accessible test");

    // INTENTIONAL BUG: this relies on a styling class instead of the UI contract.
    const completeButton = container.querySelector(".green-button");
    expect(completeButton).toBeInTheDocument();

    await user.click(completeButton as Element);

    await waitFor(() =>
      expect(screen.getByText("Completed")).toBeInTheDocument(),
    );
    expect(fetchMock).toHaveBeenCalledWith("/api/tasks/1", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ completed: true }),
    });
  });
});
