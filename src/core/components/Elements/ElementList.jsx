import React, { useState } from "react";
import ElementTable from "@/core/components/Elements/ElementTable";
import ElementForm from "@/core/components/Elements/ElementForm";
import elementService from "@/services/elementService";
import ConfirmationModal from "@/core/components/Shared/ConfirmationForm/ConfirmationForm";
import useElements from "@/core/hooks/useElements";
import { useAuth } from "@/core/context/AuthContext";

const ElementList = () => {
  const { elements, fetchElements } = useElements();
  const [editingElement, setEditingElement] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [selectedElement, setSelectedElement] = useState(null);
  const [selectedElements, setSelectedElements] = useState([]);
  const { showSnackbar, setLoading } = useAuth();

  const handleSelectionChanged = (selectedRows) => {
    setSelectedElements(selectedRows.map((row) => row.id));
  };

  const handleMultipleDelete = async () => {
    setLoading(true);
    try {
      for (const elementId of selectedElements) {
        await elementService.deleteElement(elementId);
      }
      setSelectedElements([]);
      fetchElements();
      showSnackbar("Elements deleted successfully!", "success");
    } catch (error) {
      showSnackbar("Failed to delete elements " + error, "error");
    }
    setLoading(false);
  };

  const handleEdit = (element) => {
    setEditingElement(element);
    setShowForm(true);
  };

  const handleDelete = (element) => {
    setSelectedElement(element);
    setShowModal(true);
  };

  const handleConfirmDelete = async () => {
    setLoading(true);
    try {
      if (selectedElement) {
        await elementService.deleteElement(selectedElement.id);
        fetchElements();
        showSnackbar("Element deleted successfully!", "success");
      }

      setSelectedElement(null);
    } catch (error) {
      showSnackbar("Failed to delete element " + error, "error");
    }
    setShowModal(false);
    setLoading(false);
  };

  const handleCancelDelete = () => {
    setShowModal(false);
    setSelectedElement(null);
  };

  const handleCloseForm = () => {
    setEditingElement(null);
    setShowForm(false);
    fetchElements();
  };

  return (
    <div className="grid grid-cols-12 p-4 gap-6">
      <div className="col-span-12 flex justify-between p-3">
        <div className="flex text-2xl font-sans text-slate-600 p-3">
          <h3>Element List</h3>
        </div>
        <div className="flex justify-end p-3">
          <button
            className="bg-blue-500 text-white text-md p-1 w-32 rounded-md mr-4 flex items-center"
            onClick={() => setShowForm(true)}
          >
            <img src="plus_ico_white.svg" alt="Edit" className="w-6 h-5" />
            New Element
          </button>
          <button
            className="bg-red-500 text-white text-md p-1 w-32 rounded-md flex items-center"
            onClick={handleMultipleDelete}
            disabled={selectedElements.length === 0}
          >
            <img src="delete_ico_white.svg" alt="Edit" className="w-6 h-5" />
            Delete ({selectedElements.length})
          </button>
        </div>
      </div>
      <div className="col-span-12">
        <ElementTable
          elements={elements}
          onEdit={handleEdit}
          onDelete={handleDelete}
          onSelectionChanged={handleSelectionChanged}
        />
        {showForm && (
          <div className="modal">
            <ElementForm element={editingElement} onClose={handleCloseForm} />
          </div>
        )}
        {showModal && (
          <ConfirmationModal
            open={showModal}
            title="Confirm Deletion"
            message={`Are you sure you want to delete the element: ${selectedElement?.name}?`}
            onConfirm={handleConfirmDelete}
            onCancel={handleCancelDelete}
          />
        )}
      </div>
    </div>
  );
};

export default ElementList;
