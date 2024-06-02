export default function Modal({ open, onClose, title, children }) {
  return (
    <div
      onClick={onClose}
      className={`fixed inset-0 z-999 flex justify-center items-center transition-colors ${open ? 'visible bg-black/20' : 'invisible'}`}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className={`bg-white rounded-xl  shadow   transition-all ${open ? 'scale-100 opacity-100' : 'scale-125 opacity-0'}`}
      >
        <div className="flex justify-between pb-4 bg-gray-50 text-md">
          <h2 className="p-4 text-lg font-sans">{title}</h2>

          <button
            onClick={onClose}
            className="p-1 rounded-lg text-gray-400 hover:bg-gray-50 hover:text-gray-600"
          >
            <img src="close_icon_blue.svg" alt="close" className="w-6 h-5" />
          </button>
        </div>
        <div className="p-6">{children}</div>
      </div>
    </div>
  );
}
