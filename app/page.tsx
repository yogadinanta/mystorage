"use client";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCloud, faFolder, faFile, faStar, faTrash, faClock, 
  faUpload, faSearch, faBell, faShareNodes, faEllipsisVertical, 
  faPlus, faLink, faDatabase
} from "@fortawesome/free-solid-svg-icons";

export default function Home() {
  const files = [
    { name: "Proposal PKM.pdf", size: "2.5 MB", date: "20 Jun 2026", owner: "Saya" },
    { name: "RAB Kegiatan.xlsx", size: "1.2 MB", date: "18 Jun 2026", owner: "Saya" },
    { name: "Dokumentasi.jpg", size: "5.1 MB", date: "17 Jun 2026", owner: "Saya" },
    { name: "Laporan.docx", size: "890 KB", date: "15 Jun 2026", owner: "Saya" },
  ];

  return (
    <div className="flex h-screen bg-[#f5f7fb] text-gray-800">
      {/* Sidebar Kiri */}
      <aside className="w-64 bg-white border-r p-6 flex flex-col justify-between">
        <div>
          <h1 className="text-2xl font-bold text-blue-600 mb-8"><FontAwesomeIcon icon={faCloud} className="mr-2"/> MyStorage</h1>
          <button className="w-full bg-blue-600 text-white py-3 rounded-xl hover:bg-blue-700 mb-6"><FontAwesomeIcon icon={faUpload} className="mr-2"/> Upload File</button>
          <nav className="space-y-2">
            {[{icon: faFolder, label: "File Saya"}, {icon: faClock, label: "Terbaru"}, {icon: faStar, label: "Berbintang"}, {icon: faShareNodes, label: "Dibagikan"}, {icon: faTrash, label: "Sampah"}].map((item, i) => (
              <div key={i} className={`p-3 rounded-xl cursor-pointer ${i === 0 ? "bg-blue-50 text-blue-600" : "hover:bg-gray-100"}`}>
                <FontAwesomeIcon icon={item.icon} className="mr-3" /> {item.label}
              </div>
            ))}
          </nav>
        </div>
        <div className="bg-gray-100 p-4 rounded-xl text-sm">
          <p className="mb-2">25 GB dari 100 GB digunakan</p>
          <div className="w-full bg-gray-300 h-2 rounded-full"><div className="bg-blue-600 h-2 rounded-full w-1/4"></div></div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8 overflow-auto">
        <header className="flex justify-between items-center mb-8">
          <div className="relative w-96"><FontAwesomeIcon icon={faSearch} className="absolute left-3 top-3.5 text-gray-400"/><input type="text" placeholder="Cari file..." className="w-full pl-10 pr-4 py-3 rounded-full bg-white border border-gray-200 outline-none"/></div>
          <div className="flex items-center gap-4"><FontAwesomeIcon icon={faBell} className="text-xl text-gray-500"/><div className="w-10 h-10 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold">Y</div></div>
        </header>

        {/* Statistik */}
        <div className="grid grid-cols-4 gap-6 mb-8">
          {[{l: "Total File", v: "124"}, {l: "Folder", v: "32"}, {l: "Storage", v: "25 GB"}, {l: "Dibagikan", v: "18"}].map((s, i) => (
            <div key={i} className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
              <p className="text-gray-500 text-sm">{s.l}</p><h2 className="text-2xl font-bold mt-1">{s.v}</h2>
            </div>
          ))}
        </div>

        {/* Folders */}
        <h2 className="font-bold mb-4">Folder Saya</h2>
        <div className="grid grid-cols-4 gap-6 mb-8">
          {['Project Kuliah', 'PKM', 'Minipul', 'Foto'].map((f) => (
            <div key={f} className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 flex items-center justify-between">
              <div className="flex items-center gap-3"><FontAwesomeIcon icon={faFolder} className="text-yellow-400 text-xl"/> {f}</div>
              <FontAwesomeIcon icon={faEllipsisVertical} className="text-gray-400"/>
            </div>
          ))}
        </div>

        {/* Table */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <table className="w-full text-left">
            <thead className="bg-gray-50 text-gray-500 text-sm"><tr><th className="p-4">Nama</th><th className="p-4">Pemilik</th><th className="p-4">Terakhir diubah</th><th className="p-4">Ukuran</th></tr></thead>
            <tbody>
              {files.map((f, i) => (
                <tr key={i} className="border-t hover:bg-gray-50">
                  <td className="p-4"><FontAwesomeIcon icon={faFile} className="mr-3 text-blue-500"/>{f.name}</td>
                  <td className="p-4 flex items-center gap-2"><div className="w-6 h-6 rounded-full bg-blue-600 text-white text-[10px] flex items-center justify-center">Y</div>{f.owner}</td>
                  <td className="p-4 text-gray-600">{f.date}</td>
                  <td className="p-4 text-gray-600">{f.size}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>

   
    </div>
  );
}