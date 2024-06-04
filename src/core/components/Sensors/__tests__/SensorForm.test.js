import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import SensorForm from "../SensorForm";
import sensorService from "@/services/sensorService";

jest.mock("@/services/sensorService");
const mockShowSnackbar = jest.fn();
jest.mock("@/core/context/AuthContext", () => ({
  useAuth: () => ({
    showSnackbar: mockShowSnackbar,
  }),
}));
describe("SensorForm", () => {
  const onCloseMock = jest.fn();

  afterEach(() => {
    jest.clearAllMocks();
  });

  test("renders the form with all fields", () => {
    render(<SensorForm onClose={onCloseMock} />);

    expect(screen.getByLabelText(/Type/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Driver/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Status/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Value/i)).toBeInTheDocument();
  });

  test("shows validation errors when required fields are empty", async () => {
    render(<SensorForm onClose={onCloseMock} />);

    fireEvent.submit(screen.getByRole("button", { name: /Save/i }));

    await waitFor(() => {
      expect(screen.getByText(/Type is required/i)).toBeInTheDocument();
      expect(screen.getByText(/Driver is required/i)).toBeInTheDocument();
      expect(screen.getByText(/Status is required/i)).toBeInTheDocument();
      expect(screen.getByText(/Value is required/i)).toBeInTheDocument();
    });
  });

  test("calls createSensor with correct data on form submission", async () => {
    sensorService.createSensor.mockResolvedValueOnce({});

    render(<SensorForm onClose={onCloseMock} />);

    fireEvent.change(screen.getByLabelText(/Type/i), {
      target: { value: "Temperature" },
    });
    fireEvent.change(screen.getByLabelText(/Driver/i), {
      target: { value: "Driver1" },
    });
    fireEvent.change(screen.getByLabelText(/Status/i), {
      target: { value: "1" },
    });
    fireEvent.change(screen.getByLabelText(/Value/i), {
      target: { value: "25.5" },
    });

    fireEvent.submit(screen.getByRole("button", { name: /Save/i }));

    await waitFor(() => {
      expect(sensorService.createSensor).toHaveBeenCalledWith({
        type: "Temperature",
        driver: "Driver1",
        status: "1",
        value: 25.5,
      });
    });
  });

  test("calls onClose when cancel button is clicked", () => {
    render(<SensorForm onClose={onCloseMock} />);

    fireEvent.click(screen.getByRole("button", { name: /Cancel/i }));

    expect(onCloseMock).toHaveBeenCalled();
  });
});
