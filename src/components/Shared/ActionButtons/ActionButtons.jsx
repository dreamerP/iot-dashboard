import React from 'react';

const ActionButtons = ({ onEdit, onDelete }) => {
  return (
    <div className="flex  py-1">
      <button className=" mr-4" onClick={onEdit}>
      <img src="edit_ico.svg" alt="Edit" className="w-6 h-5" />
      </button>
      <button onClick={onDelete}>
      <img src="delete_ico_red.svg" alt="Edit" className="w-6 h-5" />
      </button>
    </div>
  );
};

export default ActionButtons;
