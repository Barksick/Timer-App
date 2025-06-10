import React from "react";
import { render, screen, fireEvent, act } from "@testing-library/react";
import TimerDisplay from "./TimerDisplay";

let playMock;

beforeEach(() => {
  jest.useFakeTimers();
  jest.spyOn(global, "setInterval");
  jest.spyOn(global, "clearInterval");

  playMock = jest.fn().mockResolvedValue();
  global.Audio = jest.fn(() => ({
    play: playMock,
  }));
});

afterEach(() => {
  jest.runOnlyPendingTimers();
  jest.useRealTimers();
  jest.restoreAllMocks();
});

describe("TimerDisplay component - extended tests", () => {
  test("counts down correctly and stops at zero", () => {
    render(<TimerDisplay />);
    
    fireEvent.change(screen.getByLabelText(/hours/i), { target: { value: "0" } });
    fireEvent.change(screen.getByLabelText(/minutes/i), { target: { value: "0" } });
    fireEvent.change(screen.getByLabelText(/seconds/i), { target: { value: "3" } });
    fireEvent.click(screen.getByText(/set timer/i));
    fireEvent.click(screen.getByText(/start/i));

    act(() => {
      jest.advanceTimersByTime(3000);
    });

    expect(screen.getByText("00:00:00")).toBeInTheDocument();
    expect(screen.getByText(/time is up/i)).toBeInTheDocument();
  });

  test("plays sound when time is up", () => {
    render(<TimerDisplay />);
    
    fireEvent.change(screen.getByLabelText(/seconds/i), { target: { value: "1" } });
    fireEvent.click(screen.getByText(/set timer/i));
    fireEvent.click(screen.getByText(/start/i));

    act(() => {
      jest.advanceTimersByTime(1000);
    });

    expect(playMock).toHaveBeenCalled();
  });

  test("does not start if invalid time is entered", () => {
    const alertMock = jest.spyOn(window, "alert").mockImplementation(() => {});

    render(<TimerDisplay />);
    fireEvent.change(screen.getByLabelText(/minutes/i), { target: { value: "65" } });
    fireEvent.click(screen.getByText(/set timer/i));

    expect(alertMock).toHaveBeenCalledWith(
      expect.stringMatching(/valid numbers/i)
    );

    alertMock.mockRestore();
  });

  test("shows 'Pause' after clicking 'Start'", () => {
    render(<TimerDisplay />);
    fireEvent.change(screen.getByLabelText(/seconds/i), { target: { value: "5" } });
    fireEvent.click(screen.getByText(/set timer/i));
    fireEvent.click(screen.getByText(/start/i));

    expect(screen.getByText(/pause/i)).toBeInTheDocument();
  });

  test("clears interval when paused", () => {
    render(<TimerDisplay />);
    fireEvent.change(screen.getByLabelText(/seconds/i), { target: { value: "10" } });
    fireEvent.click(screen.getByText(/set timer/i));
    fireEvent.click(screen.getByText(/start/i));
    fireEvent.click(screen.getByText(/pause/i));

    expect(clearInterval).toHaveBeenCalled();
  });

  test("reset stops timer and clears input", () => {
    render(<TimerDisplay />);
    fireEvent.change(screen.getByLabelText(/hours/i), { target: { value: "1" } });
    fireEvent.change(screen.getByLabelText(/minutes/i), { target: { value: "2" } });
    fireEvent.change(screen.getByLabelText(/seconds/i), { target: { value: "3" } });

    fireEvent.click(screen.getByText(/reset/i));

    expect(screen.getByLabelText(/hours/i)).toHaveValue(0);
    expect(screen.getByLabelText(/minutes/i)).toHaveValue(0);
    expect(screen.getByLabelText(/seconds/i)).toHaveValue(0);
    expect(screen.getByText("00:00:00")).toBeInTheDocument();
  });

  test("does not start timer if all time fields are zero", () => {
    const alertMock = jest.spyOn(window, "alert").mockImplementation(() => {});

    render(<TimerDisplay />);
    fireEvent.change(screen.getByLabelText(/hours/i), { target: { value: "0" } });
    fireEvent.change(screen.getByLabelText(/minutes/i), { target: { value: "0" } });
    fireEvent.change(screen.getByLabelText(/seconds/i), { target: { value: "0" } });

    fireEvent.click(screen.getByText(/set timer/i));

    expect(alertMock).toHaveBeenCalledWith("Please set a time greater than 0.");

    alertMock.mockRestore();
  });


  test("toggles between 'Pause' and 'Start' when clicked repeatedly", () => {
    render(<TimerDisplay />);
    fireEvent.change(screen.getByLabelText(/seconds/i), { target: { value: "10" } });
    fireEvent.click(screen.getByText(/set timer/i));
    fireEvent.click(screen.getByText(/start/i));

    expect(screen.getByText(/pause/i)).toBeInTheDocument();

    fireEvent.click(screen.getByText(/pause/i));
    expect(screen.getByText(/start/i)).toBeInTheDocument();
  });

  test("displays remaining time in HH:MM:SS format with leading zeros", () => {
    render(<TimerDisplay />);
    fireEvent.change(screen.getByLabelText(/seconds/i), { target: { value: "1" } });
    fireEvent.click(screen.getByText(/set timer/i));

    expect(screen.getByText("00:00:01")).toBeInTheDocument();
  });

  test("shows alert when non-numeric input is entered", () => {
    const alertMock = jest.spyOn(window, "alert").mockImplementation(() => {});

    render(<TimerDisplay />);
    fireEvent.change(screen.getByLabelText(/seconds/i), { target: { value: "abc" } });
    fireEvent.click(screen.getByText(/set timer/i));

    expect(alertMock).toHaveBeenCalled();

    alertMock.mockRestore();
  });
});
