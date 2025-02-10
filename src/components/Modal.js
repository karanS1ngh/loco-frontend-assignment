import React from "react";
import { motion } from "framer-motion";

const Modal = ({ open, setOpen, selectedDay, eventText, setEventText, saveEvent }) => {
  if (!open) return null; // Don't render if modal is not open

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded shadow-lg w-80 relative">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3 }}
        >
          {/* Display selected date */}
          <h3 className="text-lg font-semibold text-gray-700">
            Edit Event for {selectedDay}
          </h3>
        </motion.div>

        {/* Close button for modal */}
        <button
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
          onClick={() => setOpen(false)}
        >
          ✖
        </button>

        {/* Input field for event description */}
        <input
          type="text"
          className="w-full mt-2 p-2 border rounded text-gray-700"
          placeholder="Event Description"
          value={eventText}
          onChange={(e) => setEventText(e.target.value)}
        />

        {/* Save button */}
        <button
          className="mt-4 px-4 py-2 bg-blue-500 text-white rounded w-full"
          onClick={saveEvent}
        >
          Save
        </button>
      </div>
    </div>
  );
};

export default Modal;
