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

  async function renameFolder(id: string, oldName: string) {
    const name = prompt("Nama folder baru", oldName);

    if (!name) return;

    const res = await fetch(`/api/folders/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        folder_name: name,
      }),
    });

    if (res.ok) {
      location.reload();
    } else {
      alert("Rename gagal");
    }
  }

  async function deleteFolder(id: string) {
    if (!confirm("Hapus folder ini?")) return;

    const res = await fetch(`/api/folders/${id}`, {
      method: "DELETE",
    });

    if (res.ok) {
      location.reload();
    } else {
      alert("Folder gagal dihapus");
    }
  }

  function shareFolder(id: string) {
    navigator.clipboard.writeText(
      `${window.location.origin}/folder/${id}`
    );

    alert("Link folder berhasil disalin");
  }

  return (
    <section>
      <div className="flex items-center justify-between mb-5">
        <h2 className="text-2xl font-bold text-gray-800">
          My Folder
        </h2>

        <button className="text-blue-600 hover:text-blue-700 font-medium">
          View All
        </button>
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

                <div className="absolute right-0 mt-2 w-48 rounded-xl border bg-white shadow-xl z-50">

                  <button
                    onClick={() =>
                      renameFolder(
                        folder.id.toString(),
                        folder.folder_name
                      )
                    }
                    className="w-full px-4 py-3 flex items-center gap-3 hover:bg-gray-100"
                  >
                    <FontAwesomeIcon icon={faPen} />
                    Rename
                  </button>

                  <button
                    onClick={() =>
                      shareFolder(folder.id.toString())
                    }
                    className="w-full px-4 py-3 flex items-center gap-3 hover:bg-gray-100"
                  >
                    <FontAwesomeIcon icon={faShareNodes} />
                    Share
                  </button>

                  <button
                    onClick={() =>
                      deleteFolder(folder.id.toString())
                    }
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

                <span className="text-xs text-gray-400">
                  Folder
                </span>

              </div>

            </Link>

          </div>
        ))}

      </div>
    </section>
  );
}