"use client";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHardDrive,
  faCloudArrowUp,
  faFolder,
  faFile,
} from "@fortawesome/free-solid-svg-icons";

interface StorageCardProps {
  storage: {
    usedStorage: number;
    totalStorage: number;
    totalFolders: number;
    totalFiles: number;
  };
}

export default function StorageCard({
  storage,
}: StorageCardProps) {
  const percentage =
    storage.totalStorage === 0
      ? 0
      : (storage.usedStorage / storage.totalStorage) * 100;

  return (
    <aside className="hidden xl:flex w-80 bg-white border-l border-gray-200 p-6 flex-col">

      {/* Title */}
      <div>
        <h2 className="text-2xl font-bold text-gray-800">
          Storage
        </h2>

        <p className="text-sm text-gray-500 mt-1">
          Monitor your cloud storage usage
        </p>
      </div>

      {/* Storage Card */}
      <div className="mt-8 bg-gradient-to-br from-blue-600 to-blue-500 rounded-3xl p-6 text-white shadow-xl">

        <div className="flex items-center justify-between">

          <div>
            <p className="text-sm opacity-90">
              Total Storage Used
            </p>

            <h2 className="text-4xl font-bold mt-2">
              {storage.usedStorage.toFixed(2)} GB
            </h2>

            <p className="opacity-80 mt-1">
              of {storage.totalStorage} GB
            </p>
          </div>

          <div className="w-16 h-16 rounded-2xl bg-white/20 flex items-center justify-center">
            <FontAwesomeIcon
              icon={faHardDrive}
              className="text-3xl"
            />
          </div>

        </div>


      </div>

      {/* Summary */}
      <div className="mt-8">

        <h3 className="font-semibold text-gray-700 mb-4">
          Storage Summary
        </h3>

        <div className="space-y-4">

          {/* Folder */}
          <div className="flex justify-between items-center bg-gray-50 rounded-2xl p-4">

            <div className="flex items-center gap-3">

              <div className="w-11 h-11 rounded-xl bg-yellow-100 flex items-center justify-center">

                <FontAwesomeIcon
                  icon={faFolder}
                  className="text-yellow-500"
                />

              </div>

              <div>

                <h4 className="font-semibold text-gray-800">
                  Folders
                </h4>

                <p className="text-xs text-gray-500">
                  Total folders
                </p>

              </div>

            </div>

            <span className="font-bold text-lg">
              {storage.totalFolders}
            </span>

          </div>

          {/* Files */}
          <div className="flex justify-between items-center bg-gray-50 rounded-2xl p-4">

            <div className="flex items-center gap-3">

              <div className="w-11 h-11 rounded-xl bg-blue-100 flex items-center justify-center">

                <FontAwesomeIcon
                  icon={faFile}
                  className="text-blue-600"
                />

              </div>

              <div>

                <h4 className="font-semibold text-gray-800">
                  Files
                </h4>

                <p className="text-xs text-gray-500">
                  Total files
                </p>

              </div>

            </div>

            <span className="font-bold text-lg">
              {storage.totalFiles}
            </span>

          </div>

        </div>

      </div>

      {/* Upgrade */}
      <div className="mt-auto">

        <div className="bg-blue-50 rounded-2xl p-5 border border-blue-100">

          <div className="flex items-center gap-3 mb-3">

            <FontAwesomeIcon
              icon={faCloudArrowUp}
              className="text-blue-600 text-2xl"
            />

            <div>

              <h4 className="font-semibold text-blue-700">
                Upgrade Storage
              </h4>

              <p className="text-xs text-blue-500">
                Increase your cloud capacity
              </p>

            </div>

          </div>

          <button
            className="
              w-full
              mt-2
              bg-blue-600
              hover:bg-blue-700
              transition
              text-white
              py-3
              rounded-xl
              font-semibold
            "
          >
            Upgrade Plan
          </button>

        </div>

      </div>

    </aside>
  );
}