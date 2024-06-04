import React, { useMemo, useRef } from 'react';
import { AgGridReact } from 'ag-grid-react';
import ActionButtons from '@/core/components/Shared/ActionButtons/ActionButtons';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';

const SensorTable = ({ sensors, onEdit, onDelete, onSelectionChanged }) => {
  const gridRef = useRef();
  const columnDefs = useMemo(
    () => [
      { headerName: 'Type', field: 'type', checkboxSelection: true },
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
        ref={gridRef}
        rowData={sensors}
        columnDefs={columnDefs}
        rowSelection={'multiple'}
        checkboxSelection={true}
        pagination={true}
        paginationPageSize={20}
        onSelectionChanged={() =>
          onSelectionChanged(gridRef.current.api.getSelectedRows())
        }
        defaultColDef={{ sortable: true, filter: true }}
      />
    </div>
  );
};

export default SensorTable;
