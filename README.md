# 📁 MyStorage - Clone Google Drive

MyStorage merupakan aplikasi penyimpanan file berbasis web yang terinspirasi dari Google Drive. Project ini dikembangkan menggunakan Next.js, Prisma ORM, MySQL, MinIO, dan Docker sebagai tugas UAS Mata Kuliah Cloud Technology & Human Computer Interaction (HCI).

---

## Tim Pengembang

| Nama | NIM | Peran |
|------|-----|-------|
| I Made Agus Arya Primahesa Putra | XXXXXXXX | PERAN |
| Made Dwiki Premananda Ariyadnya | XXXXXXXX | PERAN |
| Wisnu Bagus Indrayani | XXXXXXXX | UI/UX PERAN |
| I Komang Yoga Dinanta | 2415323030 | PERAN |
| Gede Satya Budi Dharma Wiguna | XXXXXXXX | PERAN |

---

## 🌐 Deployment

**Status:** ✅ Sudah di-deploy pada AWS EC2

- Website : http://52.200.204.33:3000/
- MinIO : http://52.200.204.33:9001/

---

## 🚀 Teknologi

- Next.js 16
- React 19
- TypeScript
- Tailwind CSS
- Prisma ORM
- MySQL
- MinIO
- Docker & Docker Compose

---

## ✨ Fitur

### Folder
- Create Folder
- Rename Folder
- Delete Folder

### File
- Upload File
- Preview File
- Download File
- Rename File
- Delete File
- Share Link

### Dashboard
- Storage Summary
- Total Folder
- Total File
- Recent Files

### Lainnya
- Search Folder & File
- Responsive UI
- Loading Upload
- Toast Notification

---

## 🗄 Database

Database menggunakan **MySQL** dengan **Prisma ORM**.

Tabel utama:

- users
- folders
- files
- storage_usage
- activity_logs
- file_shares

---

## ☁ Object Storage

Object Storage menggunakan **MinIO**.

Contoh struktur:

```
mystorage/
└── folder/
    └── {folderId}/
        └── filename.ext
```

---

## ⚙ Instalasi

```bash
git clone https://github.com/username/mystorage.git

cd mystorage

npm install
```

Buat file `.env`

```env
DATABASE_URL="mysql://root:@localhost:3306/mystorage"

MINIO_ENDPOINT=localhost
MINIO_PORT=9000
MINIO_USE_SSL=false

MINIO_ACCESS_KEY=minioadmin
MINIO_SECRET_KEY=minioadmin
```

Generate Prisma

```bash
npx prisma generate
```

Jalankan MinIO

```bash
docker compose up -d
```

Jalankan aplikasi

```bash
npm run dev
```

---

## 📷 Screenshot

Tambahkan screenshot aplikasi pada folder:

```
screenshots/
```

Contoh:

- Dashboard
- Folder
- Upload
- Preview
- Share

---

## 📄 Lisensi

Project ini dibuat untuk keperluan akademik sebagai tugas UAS Mata Kuliah Cloud Technology & HCI, Politeknik Negeri Bali (2026).