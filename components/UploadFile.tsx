"use client";

import { useState } from "react";

export default function UploadFile({ folderId }: { folderId: number }) {
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);

  async function upload() {
    if (!file) return;

    setLoading(true);

    const formData = new FormData();
    formData.append("file", file);
    formData.append("folderId", String(folderId));

    await fetch("/api/files", {
      method: "POST",
      body: formData,
    });

    setLoading(false);
    location.reload();
  }

  return (
    <div className="flex items-center gap-3">
      <input
        type="file"
        onChange={(e) => setFile(e.target.files?.[0] || null)}
        /* INI BAGIAN YANG DIUBAH: Tambahkan warna border, warna teks, dan styling tombol bawaan */
        className="border border-gray-400 bg-white text-gray-900 p-2 rounded-lg cursor-pointer file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-gray-100 file:text-gray-700 hover:file:bg-gray-200"
      />

      <button
        onClick={upload}
        disabled={!file || loading}
        className="bg-blue-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-blue-700 transition disabled:bg-blue-400"
      >
        {loading ? "Uploading..." : "Upload"}
      </button>
    </div>
  );
}