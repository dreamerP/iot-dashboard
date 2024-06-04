import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom'; 
import ElementTable from '../ElementTable';

describe('ElementTable', () => {
  const elements = [
    {
      id: "1",
      name: "Element 1",
      location: "Location 1",
      sensors: [],
    },
    {
      id: "2",
      name: "Element 2",
      location: "Location 2",
      sensors: [],
    },
  ];

  it('renders with initial data', () => {
    render(
      <ElementTable
        sensors={elements}
        onEdit={() => {}}
        onDelete={() => {}}
        onSelectionChanged={() => {}}
      />
    );
    expect(screen.getByText('Name')).toBeInTheDocument();
    expect(screen.getByText('Location')).toBeInTheDocument();
  });
});
