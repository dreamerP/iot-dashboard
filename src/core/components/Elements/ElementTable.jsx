import React, { useMemo, useRef } from "react";
import { AgGridReact } from "ag-grid-react";
import ActionButtons from "@/core/components/Shared/ActionButtons/ActionButtons";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";

const ElementTable = ({ elements, onEdit, onDelete, onSelectionChanged }) => {
  const gridRef = useRef();
  const columnDefs = useMemo(
    () => [
      { headerName: "Name", field: "name", checkboxSelection: true },
      { headerName: "Location", field: "location" },
      {
        headerName: "Sensors",
        field: "sensors",
        cellRenderer: (params) => (
          <span>
            {params.value.map((sensor, index) => (
              <span key={sensor.id}>
                {sensor.type} ({sensor.value})
                {index < params.value.length - 1 && ", "}
              </span>
            ))}
          </span>
        ),
        flex: 1,
      },
      {
        headerName: "Actions",
        field: "actions",
        cellRenderer: (params) => (
          <ActionButtons
            onEdit={() => onEdit(params.data)}
            onDelete={() => onDelete(params.data)}
          />
        ),
        cellStyle: { textAlign: "center" },
        flex: 1,
      },
    ],
    [onEdit, onDelete]
  );

  return (
    <div className="ag-theme-alpine" style={{ height: 400, width: "100%" }}>
      <AgGridReact
        ref={gridRef}
        rowData={elements}
        columnDefs={columnDefs}
        rowSelection={"multiple"}
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

export default ElementTable;
