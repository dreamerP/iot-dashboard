import React, { useMemo } from 'react';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';

const ElementTable = ({ sensors, onEdit, onDelete }) => {
  const columnDefs = useMemo(
    () => [
      { headerName: 'Type', field: 'type' },
      { headerName: 'Driver', field: 'driver' },
      {
        headerName: 'Status',
        field: 'status',
        cellRenderer: ({ value }) => (value ? 'Active' : 'Inactive'),
      },
      { headerName: 'Value', field: 'value' },
      {
        headerName: 'Actions',
        field: 'actions',
        cellRendererFramework: (params) => (
          <div>
            <button onClick={() => onEdit(params.data)}>Edit</button>
            <button onClick={() => onDelete(params.data)}>Delete</button>
          </div>
        ),
      },
    ],
    [onEdit, onDelete]
  );

  return (
    <div className="ag-theme-alpine" style={{ height: 400, width: '100%' }}>
      <AgGridReact
        rowData={sensors}
        columnDefs={columnDefs}
        defaultColDef={{ sortable: true, filter: true }}
      />
    </div>
  );
};

export default ElementTable;
