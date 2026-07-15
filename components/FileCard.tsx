"use client";

import { useState, useRef, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faDownload,
  faTrash,
  faPen,
  faShareNodes,
  faEllipsisVertical,
  faEye,
  faFilePdf,
  faFileImage,
  faFileWord,
  faFileExcel,
  faFilePowerpoint,
  faFileArchive,
  faFileVideo,
  faFileAudio,
  faFileCode,
  faFileLines,
} from "@fortawesome/free-solid-svg-icons";
import RenameModal from "./RenameModal";
import DeleteModal from "./DeleteModal"; // Pastikan komponen ini sudah kamu buat
import { createPortal } from "react-dom";

interface FileCardProps {
  file: {
    id: number;
    original_name: string;
    storage_path: string;
  };
}

export default function FileCard({ file }: FileCardProps) {
  const [open, setOpen] = useState(false);
  const [isRenameOpen, setIsRenameOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [showToast, setShowToast] = useState(false);
  
  // Ref untuk mendeteksi klik di luar menu
  const menuRef = useRef<HTMLDivElement>(null);

  // Efek untuk menutup menu saat klik di luar area titik tiga
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const fileUrl = `${process.env.NEXT_PUBLIC_MINIO_URL}/${process.env.NEXT_PUBLIC_MINIO_BUCKET}/${file.storage_path}`;

  const ext = file.original_name.split(".").pop()?.toLowerCase() || "";

  function getFileIcon() {
    switch (ext) {
      case "pdf": return { icon: faFilePdf, bg: "bg-red-100", color: "text-red-600" };
      case "png":
      case "jpg":
      case "jpeg":
      case "gif":
      case "svg":
      case "webp": return { icon: faFileImage, bg: "bg-green-100", color: "text-green-600" };
      case "doc":
      case "docx": return { icon: faFileWord, bg: "bg-blue-100", color: "text-blue-700" };
      case "xls":
      case "xlsx":
      case "csv": return { icon: faFileExcel, bg: "bg-emerald-100", color: "text-emerald-700" };
      case "ppt":
      case "pptx": return { icon: faFilePowerpoint, bg: "bg-orange-100", color: "text-orange-600" };
      case "zip":
      case "rar":
      case "7z": return { icon: faFileArchive, bg: "bg-yellow-100", color: "text-yellow-700" };
      case "mp4":
      case "avi":
      case "mov":
      case "mkv": return { icon: faFileVideo, bg: "bg-purple-100", color: "text-purple-700" };
      case "mp3":
      case "wav":
      case "ogg": return { icon: faFileAudio, bg: "bg-pink-100", color: "text-pink-600" };
      case "html":
      case "css":
      case "js":
      case "ts":
      case "tsx":
      case "php":
      case "json":
      case "sql":
      case "xml": return { icon: faFileCode, bg: "bg-cyan-100", color: "text-cyan-700" };
      default: return { icon: faFileLines, bg: "bg-gray-100", color: "text-gray-600" };
    }
  }

  const fileType = getFileIcon();

  // Fungsi delete yang dipanggil oleh modal
  async function executeDelete() {
    const res = await fetch(`/api/files/${file.id}`, {
      method: "DELETE",
    });

    if (res.ok) {
      location.reload();
    } else {
      alert("Gagal menghapus file");
    }
    setIsDeleteOpen(false);
  }

  async function renameFile(name: string) {
    if (!name) return;

    const res = await fetch(`/api/files/${file.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        original_name: name,
      }),
    });

    if (res.ok) {
      location.reload();
    } else {
      alert("Rename gagal");
    }
  }

  function previewFile() {
    window.open(fileUrl, "_blank");
  }

  async function downloadFile() {
    const res = await fetch(fileUrl);
    const blob = await res.blob();

    const url = window.URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = file.original_name;

    document.body.appendChild(a);
    a.click();
    a.remove();

    window.URL.revokeObjectURL(url);
  }

  function shareFile() {
    navigator.clipboard.writeText(fileUrl);
    setShowToast(true);
    setOpen(false);

    setTimeout(() => {
      setShowToast(false);
    }, 2500);
  }

  return (
    <div className="relative bg-white rounded-2xl border border-gray-200 p-5 hover:shadow-xl hover:-translate-y-1 transition duration-300">
      
      {/* MENU */}
      <div className="absolute top-4 right-4" ref={menuRef}>
        <button
          onClick={() => setOpen(!open)}
          className="text-gray-600 w-9 h-9 rounded-full hover:bg-gray-100"
        >
          <FontAwesomeIcon icon={faEllipsisVertical} />
        </button>

        {open && (
          <div className="absolute right-0 mt-2 w-48 rounded-xl bg-white border shadow-xl overflow-hidden z-50">
            <button
              onClick={previewFile}
              className="text-gray-600 w-full px-4 py-3 flex items-center gap-3 hover:bg-gray-100"
            >
              <FontAwesomeIcon icon={faEye} />
              Preview
            </button>

            <button
              onClick={downloadFile}
              className="text-gray-600 w-full px-4 py-3 flex items-center gap-3 hover:bg-gray-100"
            >
              <FontAwesomeIcon icon={faDownload} />
              Download
            </button>

            <button
              onClick={() => {
                setIsRenameOpen(true);
                setOpen(false);
              }}
              className="text-gray-600 w-full px-4 py-3 flex items-center gap-3 hover:bg-gray-100"
            >
              <FontAwesomeIcon icon={faPen} />
              Rename
            </button>

            <button
              onClick={shareFile}
              className="text-gray-600 w-full px-4 py-3 flex items-center gap-3 hover:bg-gray-100"
            >
              <FontAwesomeIcon icon={faShareNodes} />
              Share
            </button>

            <button
              onClick={() => {
                setIsDeleteOpen(true);
                setOpen(false);
              }}
              className="w-full px-4 py-3 flex items-center gap-3 text-red-600 hover:bg-red-50"
            >
              <FontAwesomeIcon icon={faTrash} />
              Delete
            </button>
          </div>
        )}
      </div>

      {/* FILE */}
      <div onClick={previewFile} className="cursor-pointer">
        <div className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-4 ${fileType.bg}`}>
          <FontAwesomeIcon icon={fileType.icon} className={`text-3xl ${fileType.color}`} />
        </div>

        <h3 className="font-semibold text-gray-800 truncate" title={file.original_name}>
          {file.original_name}
        </h3>

        <p className="text-xs text-gray-500 mt-1 uppercase">
          {ext || "FILE"}
        </p>
      </div>
      
      {/* MODALS */}
      <RenameModal
        isOpen={isRenameOpen}
        onClose={() => setIsRenameOpen(false)}
        currentName={file.original_name}
        onRename={renameFile}
      />

      <DeleteModal
        isOpen={isDeleteOpen}
        onClose={() => setIsDeleteOpen(false)}
        onConfirm={executeDelete}
        fileName={file.original_name}
      />

      {/* TOAST NOTIFICATION */}
      {showToast && createPortal(
        <div className="fixed bottom-5 right-5 bg-gray-950 text-white px-4 py-3 rounded-xl shadow-2xl flex items-center gap-3 z-[9999] border border-gray-800 animate-in fade-in slide-in-from-bottom-4 duration-300">
          <div className="w-7 h-7 bg-blue-600/20 text-blue-400 rounded-full flex items-center justify-center">
            <FontAwesomeIcon icon={faShareNodes} className="text-xs" />
          </div>
          <span className="text-sm font-medium pr-2">Link berhasil disalin!</span>
        </div>,
        document.body
      )}
    </div>
  );
}