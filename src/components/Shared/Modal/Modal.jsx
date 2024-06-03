import React from 'react';

export default function Modal({ open, onClose, title, children }) {
  return (
    <div
      className="relative z-10"
      aria-labelledby="modal-title"
      role="dialog"
      aria-modal="true"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className={`fixed inset-0 z-999 flex justify-center items-center  ${open ? 'visible bg-black/20' : 'invisible'}`}
      >
        <div
          onClick={(e) => e.stopPropagation()}
          className={`bg-white rounded-xl  shadow   transition-all ${open ? 'scale-100 opacity-100' : 'scale-125 opacity-0'}`}
        >
          <div className="flex justify-between pb-4 bg-gray-50 text-md rounded-t-xl">
            <h2 className="p-4 text-lg font-sans">{title}</h2>

            <button
              onClick={onClose}
              className="p-4  rounded-xl text-gray-400 hover:bg-gray-50 hover:text-gray-600"
            >
              <img src="close_icon_blue.svg" alt="close" className="w-6 h-5 hover:bg-gray-200" />
            </button>
          </div>
          <div className="p-6">{children}</div>
        </div>
      </div>
    </div>
  );
}
