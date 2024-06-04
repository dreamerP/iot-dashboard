import React from "react";
import { render, fireEvent, waitFor } from "@testing-library/react";
import ElementForm from "../ElementForm";
import elementService from "@/services/elementService";
import "@testing-library/jest-dom";

jest.mock("@/services/elementService");

jest.mock("@/core/context/AuthContext", () => ({
  useAuth: () => ({
    showSnackbar: jest.fn(),
  }),
}));

describe("ElementForm", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test("renders form fields with default values", () => {
    const mockedSensors = [
      {
        id: 1,
        type: "Temperature",
        value: "25C",
        driver: "Driver1",
        status: true,
      },
      {
        id: 2,
        type: "Humidity",
        value: "60%",
        driver: "Driver2",
        status: false,
      },
    ];

    const { getByLabelText, getByText } = render(
      <ElementForm sensors={mockedSensors} />
    );

    expect(getByLabelText("Name:")).toBeInTheDocument();
    expect(getByLabelText("Location:")).toBeInTheDocument();
    expect(getByLabelText("Sensors:")).toBeInTheDocument();
    expect(getByText("Cancel")).toBeInTheDocument();
    expect(getByText("Save")).toBeInTheDocument();
  });

  test("submits the form with correct data", async () => {
    const onClose = jest.fn();

    // Mocked sensors for testing
    const mockedSensors = [
      {
        id: 1,
        type: "Temperature",
        value: "25C",
        driver: "Driver1",
        status: true,
      },
      {
        id: 2,
        type: "Humidity",
        value: "60%",
        driver: "Driver2",
        status: false,
      },
    ];

    const { getByLabelText, getByText } = render(
      <ElementForm sensors={mockedSensors} onClose={onClose} />
    );

    fireEvent.change(getByLabelText("Name:"), {
      target: { value: "Test Element" },
    });
    fireEvent.change(getByLabelText("Location:"), {
      target: { value: "Test Location" },
    });
    fireEvent.click(getByText("Save"));

    await waitFor(() => {
      expect(elementService.createElement).toHaveBeenCalledWith({
        name: "Test Element",
        location: "Test Location",
        sensors: [],
      });
      expect(onClose).toHaveBeenCalled();
    });
  });
});
