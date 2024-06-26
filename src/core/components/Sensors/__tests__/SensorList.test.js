import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import SensorList from '../SensorList';
import '@testing-library/jest-dom';

const mockShowSnackbar = jest.fn();
jest.mock('@/core/context/AuthContext', () => ({
  useAuth: () => ({
    showSnackbar: mockShowSnackbar,
  }),
}));

describe('SensorList component', () => {
  it('renders without crashing', () => {
    render(<SensorList />);
  });

  it('opens form modal when "New Sensor" button is clicked', () => {
    const { getByText } = render(<SensorList />);
    const newSensorButton = getByText('New Sensor');
    fireEvent.click(newSensorButton);
    const sensorFormModal = getByText('Add New Sensor');
    expect(sensorFormModal).toBeInTheDocument();
  });


});
