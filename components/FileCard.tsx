"use client";

import { useState } from "react";
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

interface FileCardProps {
  file: {
    id: number;
    original_name: string;
    storage_path: string;
  };
}

export default function FileCard({ file }: FileCardProps) {
  const [open, setOpen] = useState(false);

  const fileUrl = `${process.env.NEXT_PUBLIC_MINIO_URL}/${process.env.NEXT_PUBLIC_MINIO_BUCKET}/${file.storage_path}`;

  const ext =
    file.original_name.split(".").pop()?.toLowerCase() || "";

  function getFileIcon() {
    switch (ext) {
      case "pdf":
        return {
          icon: faFilePdf,
          bg: "bg-red-100",
          color: "text-red-600",
        };

      case "png":
      case "jpg":
      case "jpeg":
      case "gif":
      case "svg":
      case "webp":
        return {
          icon: faFileImage,
          bg: "bg-green-100",
          color: "text-green-600",
        };

      case "doc":
      case "docx":
        return {
          icon: faFileWord,
          bg: "bg-blue-100",
          color: "text-blue-700",
        };

      case "xls":
      case "xlsx":
      case "csv":
        return {
          icon: faFileExcel,
          bg: "bg-emerald-100",
          color: "text-emerald-700",
        };

      case "ppt":
      case "pptx":
        return {
          icon: faFilePowerpoint,
          bg: "bg-orange-100",
          color: "text-orange-600",
        };

      case "zip":
      case "rar":
      case "7z":
        return {
          icon: faFileArchive,
          bg: "bg-yellow-100",
          color: "text-yellow-700",
        };

      case "mp4":
      case "avi":
      case "mov":
      case "mkv":
        return {
          icon: faFileVideo,
          bg: "bg-purple-100",
          color: "text-purple-700",
        };

      case "mp3":
      case "wav":
      case "ogg":
        return {
          icon: faFileAudio,
          bg: "bg-pink-100",
          color: "text-pink-600",
        };

      case "html":
      case "css":
      case "js":
      case "ts":
      case "tsx":
      case "php":
      case "json":
      case "sql":
      case "xml":
        return {
          icon: faFileCode,
          bg: "bg-cyan-100",
          color: "text-cyan-700",
        };

      default:
        return {
          icon: faFileLines,
          bg: "bg-gray-100",
          color: "text-gray-600",
        };
    }
  }

  const fileType = getFileIcon();

  async function deleteFile() {
    if (!confirm("Hapus file ini?")) return;

    const res = await fetch(`/api/files/${file.id}`, {
      method: "DELETE",
    });

    if (res.ok) {
      location.reload();
    } else {
      alert("Gagal menghapus file");
    }
  }

  async function renameFile() {
    const name = prompt("Nama file baru", file.original_name);

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

  function shareFile() {
    navigator.clipboard.writeText(fileUrl);
    alert("Link berhasil disalin");
  }

  return (
    <div className="relative bg-white rounded-2xl border border-gray-200 p-5 hover:shadow-xl hover:-translate-y-1 transition duration-300">

      {/* MENU */}
      <div className="absolute top-4 right-4">

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

            <a
              href={fileUrl}
              target="_blank"
              download={file.original_name}
              className="text-gray-600 w-full px-4 py-3 flex items-center gap-3 hover:bg-gray-100"
            >
              <FontAwesomeIcon icon={faDownload} />
              Download
            </a>

            <button
              onClick={renameFile}
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
              onClick={deleteFile}
              className="w-full px-4 py-3 flex items-center gap-3 text-red-600 hover:bg-red-50"
            >
              <FontAwesomeIcon icon={faTrash} />
              Delete
            </button>

          </div>
        )}

      </div>

      {/* FILE */}
      <div
        onClick={previewFile}
        className="cursor-pointer"
      >

        <div
          className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-4 ${fileType.bg}`}
        >
          <FontAwesomeIcon
            icon={fileType.icon}
            className={`text-3xl ${fileType.color}`}
          />
        </div>

        <h3
          className="font-semibold text-gray-800 truncate"
          title={file.original_name}
        >
          {file.original_name}
        </h3>

        <p className="text-xs text-gray-500 mt-1 uppercase">
          {ext || "FILE"}
        </p>

      </div>

    </div>
  );
}