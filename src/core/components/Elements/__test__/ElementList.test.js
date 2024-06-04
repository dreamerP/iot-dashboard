import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import ElementList from '../ElementList';
import '@testing-library/jest-dom';

const mockShowSnackbar = jest.fn();
jest.mock('@/core/context/AuthContext', () => ({
  useAuth: () => ({
    showSnackbar: mockShowSnackbar,
  }),
}));

describe('ElementList component', () => {
  it('renders without crashing', () => {
    render(<ElementList />);
  });

  it('opens form modal when "New Element" button is clicked', () => {
    const { getByText } = render(<ElementList />);
    const newSensorButton = getByText('New Element');
    fireEvent.click(newSensorButton);
    const sensorFormModal = getByText('Add New Element');
    expect(sensorFormModal).toBeInTheDocument();
  });


});
