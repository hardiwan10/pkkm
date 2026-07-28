# AGENTS.md - Panduan & Arsitektur Kode untuk AI Agents

Dokumen ini adalah referensi resmi dan sumber kebenaran (*single source of truth*) bagi AI Agents atau developer yang mengembangkan, merawat, dan memodifikasi basis kode **Aplikasi Web Manajemen & Penilaian PKKM (Penilaian Kinerja Kepala Madrasah) - MAN 1 Soppeng (MANESA)**.

---

## 1. Ikhtisar Proyek (Project Overview)
- **Nama Aplikasi:** Sistem Manajemen Bukti Fisik PKKM MAN 1 Soppeng (MANESA).
- **Arsitektur:** Hybrid Single Page Application (SPA) / Multi-page Static HTML menggunakan **Vanilla JavaScript (ES6)** dan **Tailwind CSS (via CDN)**.
- **Backend / Database:** Google Apps Script (GAS) yang terhubung ke Google Sheets (dapat dilihat di [Kode_GAS_PKKM.js](file:///C:/xampp/htdocs/deploy/Kode_GAS_PKKM.js)). Data sinkron secara lokal menggunakan `localStorage`.
- **Referensi Instrumen Resmi:** [Instrumen.pdf](file:///C:/xampp/htdocs/deploy/Instrumen.pdf).

---

## 2. Struktur File Utama & Fungsinya
- [index.html](file:///C:/xampp/htdocs/deploy/index.html): Halaman utama (Landing Page) dengan statistik berkas dinamis yang diambil dari database/localStorage, bagian Hero dengan logo MANESA dan foto Kepala Madrasah (`kamad.png`), serta ringkasan 5 Komponen/Tugas Utama PKKM.
- [admin.html](file:///C:/xampp/htdocs/deploy/admin.html): Halaman Daftar Bukti Fisik untuk admin dan penilai. Dilengkapi filter Tugas Utama, Indikator, pencarian berkas, dan pratinjau dokumen.
- [dashboard.html](file:///C:/xampp/htdocs/deploy/dashboard.html): Halaman Formulir Unggah Bukti Fisik dengan dropdown berjenjang (Tugas Utama -> Indikator -> Subindikator).
- [login.html](file:///C:/xampp/htdocs/deploy/login.html): Halaman autentikasi sistem.
- [assets/js/app.js](file:///C:/xampp/htdocs/deploy/assets/js/app.js): **Komponen Inti (Core Controller)**. Menampung seluruh struktur data instrumen PKKM (`PKKM_INSTRUMEN`), logika *rendering* tabel dan baris dokumen (`renderTable`, `renderDocRowHtml`), sinkronisasi data GAS, dan sistem tema warna.

---

## 3. Skema Data & Arsitektur Instrumen (`PKKM_INSTRUMEN`)
Di dalam [app.js](file:///C:/xampp/htdocs/deploy/assets/js/app.js), struktur instrumen dikelompokkan ke dalam **5 Tugas Utama**. Setiap Tugas Utama memiliki properti `theme` untuk konsistensi UI:

```javascript
const PKKM_INSTRUMEN = [
    {
        code: "1.",
        title: "1. Usaha Pengembangan Madrasah",
        theme: "emerald", // Nuansa Hijau Zamrud / Mint
        indicators: [ ... ]
    },
    {
        code: "2.",
        title: "2. Pelaksanaan Tugas Manajerial",
        theme: "blue", // Nuansa Biru Langit / Sky Blue
        indicators: [ ... ]
    },
    {
        code: "3.",
        title: "3. Pengembangan Kewirausahaan",
        theme: "amber", // Nuansa Krem / Amber Hangat
        indicators: [ ... ]
    },
    {
        code: "4.",
        title: "4. Supervisi kepada Guru & Tendik",
        theme: "purple", // Nuansa Ungu Lavender / Violet
        indicators: [ ... ]
    },
    {
        code: "5.",
        title: "5. Hasil Kinerja Kepala Madrasah",
        theme: "rose", // Nuansa Merah Muda / Rose
        indicators: [ ... ]
    }
];
```
- **Pengurutan:** Seluruh Subindikator (Bukti Hasil Kerja) wajib diurutkan berdasarkan abjad (a-z).

---

## 4. Sistem Peran Pengguna (Role-Based Access Control)
Terdapat 3 peran pengguna utama yang diatur melalui object `user` di `localStorage`:
1. **`admin`**: Memiliki akses penuh. Dapat mengunggah bukti, melihat daftar bukti fisik beserta keterangan **Tim Pengupload** dan **Tanggal Upload**, serta dapat menghapus dokumen (tombol ikon sampah merah).
2. **`penilai`**: Akses khusus untuk penguji/asesor (mode baca/pratinjau saja).
   - **Aksi:** Hanya dapat melihat dan membuka pratinjau dokumen (tombol ikon mata biru). **Tombol Hapus disembunyikan total**.
   - **Tabel:** Kolom keterangan **Tim Pengupload** dan **Tanggal Upload** disembunyikan agar tampilan lebih ringkas, fokus, dan objektif.
3. **`user` / Tim Pengunggah**: Dapat mengunggah bukti kerja sesuai indikator yang ditugaskan.

---

## 5. Konvensi UI/UX & Desain Estetika
Saat melakukan modifikasi tampilan, AI Agent wajib mematuhi aturan desain berikut:
- **Font Utama:** Open Sans.
- **Prinsip Warna ("Halus, tidak terlalu cerah, mudah dilihat"):** Gunakan warna pastel lembut dengan transparansi (contoh: `bg-blue-50/60`, `border-blue-200/80`). Hindari warna primer yang mencolok atau menyilaukan mata.
- **Keseragaman Warna Indikator:** Seluruh kotak indikator di dalam satu Tugas Utama wajib memiliki warna latar pastel yang **seragam** (sesuai tema kelompoknya). **Jangan** menggunakan efek warna selang-seling (*striped* / `isEven`/`odd:bg-slate-x`) pada kotak indikator maupun baris tabel dokumen.
- **Baris Tabel (`<tr>`):** Gunakan latar putih bersih (`bg-white`) dengan efek sorotan saat hover (`rowHover`) yang senada dengan warna tema dari Tugas Utama terkait (diatur dalam fungsi `getGroupThemeStyles()` di [app.js](file:///C:/xampp/htdocs/deploy/assets/js/app.js)).

---

## 6. Panduan Modifikasi & Ekspektasi Kode untuk AI
1. **Integritas Dokumentasi:** Jangan menghapus komentar atau docstrings yang sudah ada kecuali diminta oleh pengguna.
2. **Keamanan String HTML:** Saat merender nama dokumen ke dalam atribut `onclick` (seperti `previewFile(link, name)`), pastikan string di-escape dengan benar (contoh: `replace(/'/g, "\\'")`) untuk mencegah *syntax error*.
3. **Penambahan Fitur Baru:** Jika menambahkan halaman atau komponen baru yang menampilkan daftar berkas, pastikan selalu melakukan pengecekan `isPenilai` (`loggedUser.role === 'penilai'`) untuk menerapkan penyembunyian kolom dan pembatasan aksi penghapusan dokumen.
