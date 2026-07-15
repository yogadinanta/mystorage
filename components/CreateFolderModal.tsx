"use client";

import { useState } from "react";

interface Props {
  open: boolean;
  onClose: () => void;
}

export default function CreateFolderModal({
  open,
  onClose,
}: Props) {
  const [folderName, setFolderName] = useState("");

  if (!open) return null;

  async function createFolder() {
    await fetch("/api/folders", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        folder_name: folderName,
      }),
    });

    onClose();

    location.reload();
  }

  return (
    <div className="fixed inset-0 z-[999] bg-black/40 flex items-center justify-center">
    
    <div className="bg-white rounded-xl w-[400px] p-6 text-gray-900">

      <h2 className="text-xl font-bold mb-5">
        Create Folder
      </h2>

      
      <input
        className="w-full border border-gray-300 rounded-lg p-3 text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
        placeholder="Folder Name"
        value={folderName}
        onChange={(e) => setFolderName(e.target.value)}
      />

      <div className="flex justify-end gap-3 mt-6">

        
        <button
          type="button"
          onClick={onClose}
          className="px-4 py-2 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-50 transition"
        >
          Cancel
        </button>

        <button
          type="button"
          onClick={createFolder}
          className="px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition"
        >
          Create
        </button>

      </div>

    </div>
  </div>
  );
}