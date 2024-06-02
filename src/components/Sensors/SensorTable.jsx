import React, { useMemo, useState } from 'react';
import { AgGridReact } from 'ag-grid-react';
import ActionButtons from '@/components/Shared/ActionButtons/ActionButtons';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import ConfirmationModal from '@/components/Shared/ConfirmationForm/ConfirmationForm';

const SensorTable = ({ sensors, onEdit, onDelete }) => {
  const columnDefs = useMemo(
    () => [
      { headerName: 'Type', field: 'type' },
      { headerName: 'Driver', field: 'driver' },
      {
        headerName: 'Status',
        field: 'status',
        cellRenderer: ({ value }) => (value ? 'Active' : 'Inactive'),
        cellStyle: { textAlign: 'center' },
      },
      { headerName: 'Value', field: 'value', cellStyle: { textAlign: 'center' } },
      {
        headerName: 'Actions',
        field: 'actions',
        cellRenderer: (params) => (
          <ActionButtons
            onEdit={() => onEdit(params.data)}
            onDelete={() => onDelete(params.data)}
          />
        ),
        cellStyle: { textAlign: 'center' },
        flex: 1,
      },
    ],
    [onEdit, onDelete]
  );

  return (
    <div className="ag-theme-alpine" style={{ height: 400, width: '100%' }}>
      <AgGridReact
        rowData={sensors}
        columnDefs={columnDefs}
        rowSelection={'multiple'}
        checkboxSelection={true}
        pagination={true}
        paginationPageSize={20}
        defaultColDef={{ sortable: true, filter: true }}
      />
    </div>
  );
};

export default SensorTable;
