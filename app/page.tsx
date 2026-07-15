import { prisma } from "@/lib/prisma";
import HomeClient from "./HomeClient";

export default async function Home() {
  // Ambil semua folder beserta file
  const folders = await prisma.folders.findMany({
    include: {
      files: true,
    },
    orderBy: {
      created_at: "desc",
    },
  });

  // Ambil 10 file terbaru
  const recentFiles = await prisma.files.findMany({
    orderBy: {
      created_at: "desc",
    },
    take: 10,
  });

  // Statistik
  const totalFolders = await prisma.folders.count();

  const totalFiles = await prisma.files.count();

  // Total ukuran file
  const storage = await prisma.files.aggregate({
    _sum: {
      file_size: true,
    },
  });

  // Konversi byte ke GB
  const usedStorage =
    Number(storage._sum.file_size ?? 0) / 1024 / 1024 / 1024;

  // Kapasitas maksimum storage (ubah sesuai kebutuhan)
  const totalStorage = 10; // GB

  return (
    <HomeClient
      folders={folders}
      recentFiles={recentFiles}
      storage={{
        totalFolders,
        totalFiles,
        usedStorage,
        totalStorage,
      }}
    />
  );
}