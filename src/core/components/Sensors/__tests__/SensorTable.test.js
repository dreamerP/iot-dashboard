import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom'; // Asegúrate de importar esta línea

import SensorTable from '../SensorTable';

describe('SensorTable', () => {
  const sensors = [
    { id: 1, type: 'Temperature', driver: 'Driver1', status: 1, value: 25 },
    { id: 2, type: 'Humidity', driver: 'Driver2', status: 0, value: 60 },
  ];

  it('renders with initial data', () => {
    render(
      <SensorTable
        sensors={sensors}
        onEdit={() => {}}
        onDelete={() => {}}
        onSelectionChanged={() => {}}
      />
    );
    expect(screen.getByText('Temperature')).toBeInTheDocument();
    expect(screen.getByText('Humidity')).toBeInTheDocument();
  });
});
