import React from "react";
import { AlertTriangle } from "lucide-react"; // optional icon
import { motion, AnimatePresence } from "framer-motion";

const ConfirmModal = ({ title, message, onConfirm, onCancel }) => {
  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
      >
        <motion.div
          initial={{ scale: 0.9 }}
          animate={{ scale: 1 }}
          exit={{ scale: 0.9 }}
          className="bg-white p-6 rounded-2xl shadow-xl max-w-sm w-full"
        >
          <div className="flex items-center gap-3 mb-4">
            <AlertTriangle className="text-yellow-500 w-6 h-6" />
            <h2 className="text-xl font-semibold text-gray-800">{title}</h2>
          </div>
          <p className="text-gray-700 mb-6 text-sm leading-relaxed">{message}</p>
          <div className="flex justify-end gap-3">
            <button
              onClick={onCancel}
              className="px-4 py-2 rounded-lg bg-gray-100 hover:bg-gray-200 text-sm font-medium text-gray-700"
            >
              Cancel
            </button>
            <button
              onClick={onConfirm}
              className="px-4 py-2 rounded-lg bg-red-500 hover:bg-red-600 text-white text-sm font-medium"
            >
              Confirm
            </button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default ConfirmModal;
