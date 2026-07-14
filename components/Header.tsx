"use client";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSearch,
  faBell,
  faMoon,
  faGear,
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
    
<header className="sticky top-0 bg-white border-b border-gray-200">

      <div className="flex items-center justify-between px-8 py-5">

        {/* Search */}
        <div className="w-full max-w-2xl">

          <div className="relative">

            <FontAwesomeIcon
              icon={faSearch}
              className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400"
            />

<input
  type="text"
  value={search}
  onChange={(e) => onSearchChange(e.target.value)}
  placeholder="Search files and folders..."
  className="
    w-full
    h-12
    rounded-full
    bg-gray-100
    pl-14
    pr-5
    outline-none
    border
    border-transparent
    focus:bg-white
    focus:border-blue-500
    transition text-gray-800
  "
/>

          </div>

        </div>

        {/* Right */}
        <div className="flex items-center gap-4 ml-8">

          <button className="w-11 h-11 rounded-full hover:bg-gray-100 transition">
            <FontAwesomeIcon
              icon={faMoon}
              className="text-gray-600"
            />
          </button>

         
         

          <div className="w-px h-8 bg-gray-300"/>

          <div className="flex items-center gap-3">

            <div className="w-11 h-11 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold">
              Y
            </div>

            <div>

              <h3 className="font-semibold text-sm text-gray-800">
                I Komang Yoga
              </h3>

              <p className="text-xs text-gray-500">
                Administrator
              </p>

            </div>

          </div>

        </div>

      </div>

    </header>
  );
}