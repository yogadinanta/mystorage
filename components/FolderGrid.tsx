"use client";

import Link from "next/link";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFolder,
  faEllipsisVertical,
  faPen,
  faTrash,
  faShareNodes,
} from "@fortawesome/free-solid-svg-icons";
import { createPortal } from "react-dom";
// 1. IMPORT KEDUA MODAL KUSTOM KAMU
import RenameModal from "./RenameModal";
import DeleteModal from "./DeleteModal";

interface Folder {
  id: bigint;
  folder_name: string;
  files: {
    id: bigint;
  }[];
}

interface FolderGridProps {
  folders: Folder[];
}

export default function FolderGrid({ folders }: FolderGridProps) {
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  
  // 2. TAMBAHKAN STATE UNTUK MODAL
  const [isRenameOpen, setIsRenameOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [showToast, setShowToast] = useState(false);
  
  // 3. TAMBAHKAN STATE UNTUK MELACAK FOLDER YANG DIPILIH
  const [selectedFolder, setSelectedFolder] = useState<{ id: string; name: string } | null>(null);

  // 4. UBAH FUNGSI RENAME (Hapus prompt)
  async function handleRenameFolder(newName: string) {
    if (!selectedFolder) return;

    const res = await fetch(`/api/folders/${selectedFolder.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        folder_name: newName,
      }),
    });

    if (res.ok) {
      location.reload();
    } else {
      alert("Rename gagal");
    }
  }

  // 5. UBAH FUNGSI DELETE (Hapus confirm)
  async function handleDeleteFolder() {
    if (!selectedFolder) return;

    const res = await fetch(`/api/folders/${selectedFolder.id}`, {
      method: "DELETE",
    });

    if (res.ok) {
      location.reload();
    } else {
      alert("Folder gagal dihapus");
    }
  }

  function shareFolder(id: string) {
    // 1. Salin link ke clipboard
    navigator.clipboard.writeText(
      `${window.location.origin}/folder/${id}`
    );
    
    // 2. Tampilkan notifikasi toast & tutup menu
    setShowToast(true);
    setOpenMenu(null); 

    // 3. Sembunyikan notifikasi setelah 2.5 detik
    setTimeout(() => {
      setShowToast(false);
    }, 2500);
  }

  return (
    <section>
      <div className="flex items-center justify-between mb-5">
        <h2 className="text-2xl font-bold text-gray-800">My Folder</h2>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {folders.map((folder) => (
          <div
            key={folder.id.toString()}
            className="relative bg-white rounded-2xl border border-gray-200 p-5 hover:shadow-xl hover:-translate-y-1 transition duration-300"
          >
            {/* Menu */}
            <div className="absolute top-4 right-4">
              <button
                onClick={() =>
                  setOpenMenu(
                    openMenu === folder.id.toString()
                      ? null
                      : folder.id.toString()
                  )
                }
                className="w-9 h-9 rounded-full hover:bg-gray-100"
              >
                <FontAwesomeIcon
                  icon={faEllipsisVertical}
                  className="text-gray-500"
                />
              </button>

              {openMenu === folder.id.toString() && (
                <div className="absolute right-0 mt-2 w-48 rounded-xl border bg-white shadow-xl z-50 overflow-hidden">
                  
                  {/* TOMBOL RENAME BARU */}
                  <button
                    onClick={() => {
                      setSelectedFolder({ id: folder.id.toString(), name: folder.folder_name });
                      setIsRenameOpen(true);
                      setOpenMenu(null);
                    }}
                    className="text-gray-600 w-full px-4 py-3 flex items-center gap-3 hover:bg-gray-100"
                  >
                    <FontAwesomeIcon icon={faPen} />
                    Rename
                  </button>

                  <button
                    onClick={() => shareFolder(folder.id.toString())}
                    className="text-gray-600 w-full px-4 py-3 flex items-center gap-3 hover:bg-gray-100"
                  >
                    <FontAwesomeIcon icon={faShareNodes} />
                    Share
                  </button>

                  {/* TOMBOL DELETE BARU */}
                  <button
                    onClick={() => {
                      setSelectedFolder({ id: folder.id.toString(), name: folder.folder_name });
                      setIsDeleteOpen(true);
                      setOpenMenu(null);
                    }}
                    className="w-full px-4 py-3 flex items-center gap-3 text-red-600 hover:bg-red-50"
                  >
                    <FontAwesomeIcon icon={faTrash} />
                    Delete
                  </button>
                </div>
              )}
            </div>

            {/* Link Folder */}
            <Link href={`/folder/${folder.id.toString()}`}>
              <div className="w-14 h-14 rounded-2xl bg-yellow-100 flex items-center justify-center mb-6">
                <FontAwesomeIcon
                  icon={faFolder}
                  className="text-3xl text-yellow-500"
                />
              </div>

              <h3 className="font-semibold text-lg text-gray-800 truncate">
                {folder.folder_name}
              </h3>

              <p className="text-sm text-gray-500 mt-1">
                {folder.files.length} Files
              </p>

              <div className="mt-6 flex justify-between">
                <span className="text-xs bg-blue-100 text-blue-600 px-3 py-1 rounded-full">
                  Active
                </span>
                <span className="text-xs text-gray-400">Folder</span>
              </div>
            </Link>
          </div>
        ))}
      </div>

      {/* 6. RENDER MODAL DI BAGIAN BAWAH */}
      <RenameModal
        isOpen={isRenameOpen}
        onClose={() => {
          setIsRenameOpen(false);
          setSelectedFolder(null); // Reset state saat ditutup
        }}
        currentName={selectedFolder?.name || ""}
        onRename={handleRenameFolder}
      />

      <DeleteModal
        isOpen={isDeleteOpen}
        onClose={() => {
          setIsDeleteOpen(false);
          setSelectedFolder(null); // Reset state saat ditutup
        }}
        fileName={selectedFolder?.name || ""}
        onConfirm={handleDeleteFolder}
      />

      {showToast && createPortal(
        <div className="fixed bottom-5 right-5 bg-gray-950 text-white px-4 py-3 rounded-xl shadow-2xl flex items-center gap-3 z-[9999] border border-gray-800 animate-in fade-in slide-in-from-bottom-4 duration-300">
          <div className="w-7 h-7 bg-blue-600/20 text-blue-400 rounded-full flex items-center justify-center">
            <FontAwesomeIcon icon={faShareNodes} className="text-xs" />
          </div>
          <span className="text-sm font-medium pr-2">Link folder berhasil disalin!</span>
        </div>,
        document.body
      )}
    </section>
  );
}