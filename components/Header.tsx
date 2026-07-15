"use client";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSearch,
  faCircleUser,
} from "@fortawesome/free-solid-svg-icons";

interface HeaderProps {
  search: string;
  onSearchChange: (value: string) => void;
}

export default function Header({
  search,
  onSearchChange,
}: HeaderProps) {
  return (
    
<header className="sticky z-[40] top-0 bg-white border-b border-gray-200">

      <div className="flex items-center justify-between px-8 py-5">

        {/* Search */}
        <div className="w-full max-w-3xl">

          <div className="relative">

            <FontAwesomeIcon
              icon={faSearch}
              className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400"
            />

            <input
              type="text"
              value={search}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder="Search files or folders..."
              className="
                w-full
                h-12
                rounded-xl
                bg-gray-100
                border
                border-gray-200
                pl-14
                pr-5
                text-gray-700
                outline-none
                focus:bg-white
                focus:border-blue-500
                focus:ring-4
                focus:ring-blue-100
                transition
              "
            />

          </div>

        </div>

        {/* User */}
        <div className="ml-8 flex items-center">

          <div
            className="
              flex
              items-center
              gap-3
              px-3
              py-2
              rounded-xl
              hover:bg-gray-100
              transition
              cursor-pointer
            "
          >

            <div
              className="
                w-12
                h-12
                rounded-full
                bg-gradient-to-br
                from-blue-600
                to-indigo-600
                text-white
                flex
                items-center
                justify-center
                font-bold
                text-lg
                shadow
              "
            >
              Y
            </div>

            <div className="hidden lg:block">

              <h3 className="font-semibold text-gray-800">
                I Komang Yoga
              </h3>

              <p className="text-sm text-gray-500">
                Administrator
              </p>

            </div>

          </div>

        </div>

      </div>

    </header>
  );
}