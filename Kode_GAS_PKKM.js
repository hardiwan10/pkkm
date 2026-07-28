/**
 * ============================================================================
 * GOOGLE APPS SCRIPT - SISTEM INFORMASI & PENGARSIPAN PKKM MAN 1 SOPPENG
 * ============================================================================
 * Cara Penggunaan:
 * 1. Salin seluruh kode ini ke dalam editor Google Apps Script (Ekstensi > Apps Script di Google Sheets Anda).
 * 2. Masukkan ID Folder Google Drive PKKM sekolah Anda pada variabel FOLDER_ID di bawah ini.
 * 3. (Opsional) Jalankan fungsi `setupPKKM` satu kali dari editor Apps Script untuk otomatis membuat
 *    struktur tabel sheet (Uploads, Users, Categories) serta mengisi 29 Indikator PKKM.
 * 4. Deploy sebagai Web App (Terapkan > Deployment baru > Jenis: Aplikasi Web > Akses: Siapa saja).
 * 5. Salin URL Web App dan masukkan ke dalam variabel GAS_APP_URL / GAS_URL di file app.js dan auth.js.
 */

const FOLDER_ID = ""; // MASUKKAN ID FOLDER GOOGLE DRIVE UTAMA PKKM DI SINI
const SPREADSHEET_ID = SpreadsheetApp.getActiveSpreadsheet().getId();

function doPost(e) {
  let data;
  try {
    data = JSON.parse(e.postData.contents);
  } catch (err) {
    data = e.parameter;
  }
  const action = data.action;

  if (action === "register") return registerUser(data);
  if (action === "upload") return uploadFile(data);
  if (action === "deleteUpload") return deleteUpload(data.id);
  if (action === "addCategory") return addCategory(data.name);
  if (action === "deleteCategory") return deleteCategory(data.name);
}

function doGet(e) {
  const action = e.parameter.action;
  if (action === "login") return loginUser(e.parameter.user, e.parameter.pass);
  if (action === "getData") return getUploads();
  if (action === "getCategories") return getCategories();
}

/**
 * Helper: Mendapatkan atau Membuat Subfolder berdasarkan nama di dalam folder induk.
 * Berguna untuk menata arsip Google Drive secara hierarkis per Tugas Utama & Indikator.
 */
function getOrCreateSubfolder(parentFolder, folderName) {
  if (!folderName) return parentFolder;
  const folders = parentFolder.getFoldersByName(folderName);
  if (folders.hasNext()) {
    return folders.next();
  } else {
    return parentFolder.createFolder(folderName);
  }
}

/**
 * Helper: Menentukan Tugas Utama berdasarkan string Indikator
 */
function getTugasUtamaName(catString) {
  const cat = catString || "";
  if (cat.startsWith("1.")) return "1. Usaha Pengembangan Madrasah";
  if (cat.startsWith("2.")) return "2. Pelaksanaan Tugas Manajerial";
  if (cat.startsWith("3.")) return "3. Pengembangan Kewirausahaan";
  if (cat.startsWith("4.")) return "4. Supervisi kepada Guru & Tendik";
  if (cat.startsWith("5.")) return "5. Hasil Kinerja Kepala Madrasah";
  return "Umum / Lainnya";
}

// --- FUNGSI DOKUMEN & PENGARSIPAN OTOMATIS GOOGLE DRIVE ---
function uploadFile(data) {
  const mainFolder = DriveApp.getFolderById(FOLDER_ID);

  // 1. Buat/Cari Subfolder Tugas Utama (Contoh: "1. Usaha Pengembangan Madrasah")
  const tugasUtamaName = getTugasUtamaName(data.category);
  const tugasFolder = getOrCreateSubfolder(mainFolder, tugasUtamaName);

  // 2. Buat/Cari Subfolder Indikator (Contoh: "1.1. Mengembangkan madrasah...")
  const indikatorFolder = getOrCreateSubfolder(tugasFolder, data.category);

  // 3. Simpan berkas di dalam subfolder indikator
  const blob = Utilities.newBlob(Utilities.base64Decode(data.base64), data.mimeType, data.filename);
  const file = indikatorFolder.createFile(blob);
  file.setSharing(DriveApp.Access.ANYONE_WITH_LINK, DriveApp.Permission.VIEW);

  const link = file.getUrl();
  const fileId = file.getId(); // Menggunakan ID asli file Google Drive
  const sheet = SpreadsheetApp.openById(SPREADSHEET_ID).getSheetByName("Uploads");

  // Kolom 1 menyimpan File ID agar bisa dihapus dengan presisi
  sheet.appendRow([fileId, new Date(), data.uploader, data.docTitle, data.category, link]);
  return response("success", "Bukti fisik berhasil diunggah ke Google Drive dan tersimpan di folder indikator", { url: link });
}

function deleteUpload(id) {
  const sheet = SpreadsheetApp.openById(SPREADSHEET_ID).getSheetByName("Uploads");
  const data = sheet.getDataRange().getValues();

  for (let i = 1; i < data.length; i++) {
    if (data[i][0] === id) {
      // PROSES HAPUS FILE DI GOOGLE DRIVE (Pindah ke Trash)
      try {
        DriveApp.getFileById(id).setTrashed(true);
      } catch (e) {
        console.log("File tidak ditemukan di Drive, lanjut hapus baris di Sheet.");
      }

      // Hapus baris di Google Sheets
      sheet.deleteRow(i + 1);
      return response("success", "Dokumen dan file di Google Drive berhasil dihapus");
    }
  }
  return response("error", "Data bukti fisik tidak ditemukan");
}

function getUploads() {
  const sheet = SpreadsheetApp.openById(SPREADSHEET_ID).getSheetByName("Uploads");
  if (!sheet) return response("success", "Sheet Uploads belum ada", []);

  const values = sheet.getDataRange().getValues();
  const data = [];
  for (let i = 1; i < values.length; i++) {
    data.push({
      id: values[i][0],
      tanggal: values[i][1],
      uploader: values[i][2],
      nama_dokumen: values[i][3],
      kategori: values[i][4],
      link_file: values[i][5]
    });
  }
  return response("success", "Data berhasil diambil", data);
}

// --- FUNGSI KATEGORI ---
function getCategories() {
  const sheet = SpreadsheetApp.openById(SPREADSHEET_ID).getSheetByName("Categories");
  if (!sheet) return response("success", "Kategori kosong", []);

  const values = sheet.getDataRange().getValues();
  const data = values.slice(1).map(r => r[0]).filter(Boolean);
  return response("success", "Kategori berhasil diambil", data);
}

function addCategory(name) {
  const sheet = SpreadsheetApp.openById(SPREADSHEET_ID).getSheetByName("Categories");
  sheet.appendRow([name]);
  return response("success", "Kategori berhasil ditambah");
}

function deleteCategory(name) {
  const sheet = SpreadsheetApp.openById(SPREADSHEET_ID).getSheetByName("Categories");
  const data = sheet.getDataRange().getValues();
  for (let i = 1; i < data.length; i++) {
    if (data[i][0] === name) {
      sheet.deleteRow(i + 1);
      return response("success", "Kategori berhasil dihapus");
    }
  }
  return response("error", "Kategori tidak ditemukan");
}

// --- AUTH & UTIL ---
function registerUser(data) {
  const sheet = SpreadsheetApp.openById(SPREADSHEET_ID).getSheetByName("Users");
  sheet.appendRow([data.name, data.user, data.pass, data.role]);
  return response("success", "Registrasi Akun Tim Berhasil");
}

function loginUser(username, password) {
  const sheet = SpreadsheetApp.openById(SPREADSHEET_ID).getSheetByName("Users");
  if (!sheet) return response("error", "Database pengguna belum dikonfigurasi.");

  const users = sheet.getDataRange().getValues();
  for (let i = 1; i < users.length; i++) {
    if (users[i][1] === username && users[i][2] === password) {
      return response("success", "Login Berhasil", { name: users[i][0], role: users[i][3] });
    }
  }
  return response("error", "Username atau Password salah.");
}

function response(status, message, data = null) {
  return ContentService.createTextOutput(JSON.stringify({ status, message, data })).setMimeType(ContentService.MimeType.JSON);
}

/**
 * ============================================================================
 * FUNGSI SETUP OTOMATIS (JALANKAN SEKALI DARI EDITOR APPS SCRIPT)
 * ============================================================================
 * Pilih fungsi `setupPKKM` di dropdown fungsi atas editor Google Apps Script,
 * lalu klik tombol "Run" / "Jalankan". Fungsi ini otomatis membuat tabel Sheet
 * yang dibutuhkan dan mengisi 29 Indikator PKKM ke sheet Categories.
 */
function setupPKKM() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();

  // 1. Sheet Uploads
  let sheetUploads = ss.getSheetByName("Uploads");
  if (!sheetUploads) {
    sheetUploads = ss.insertSheet("Uploads");
    sheetUploads.appendRow(["File ID", "Tanggal", "Uploader", "Nama Dokumen", "Kategori / Indikator", "Link File"]);
  }

  // 2. Sheet Users
  let sheetUsers = ss.getSheetByName("Users");
  if (!sheetUsers) {
    sheetUsers = ss.insertSheet("Users");
    sheetUsers.appendRow(["Nama", "Username", "Password", "Role"]);
    sheetUsers.appendRow(["Administrator PKKM", "admin", "admin123", "admin"]);
    sheetUsers.appendRow(["Tim Penilai / Asesor", "penilai", "penilai123", "penilai"]);
    sheetUsers.appendRow(["Tim Penyusun 1", "tim1", "user123", "user"]);
  }

  // 3. Sheet Categories
  let sheetCategories = ss.getSheetByName("Categories");
  if (!sheetCategories) {
    sheetCategories = ss.insertSheet("Categories");
    sheetCategories.appendRow(["Nama Komponen / Indikator"]);
  } else {
    sheetCategories.clear();
    sheetCategories.appendRow(["Nama Komponen / Indikator"]);
  }

  const indikatorList = [
    "1.1. Mengembangkan madrasah sesuai dengan kebutuhan",
    "1.2. Mengelola perubahan dan pengembangan madrasah menuju organisasi pembelajar yang efektif",
    "1.3. Mengelola hubungan antara madrasah dan masyarakat dalam rangka pencarian dukungan ide, sumber belajar, dan pembiayaan",
    "1.4. Mengelola proses pencapaian 8 SNP sesuai dengan arah dan tujuan Pendidikan Nasional",
    "1.5. Mengelola unit layanan khusus madrasah dalam mendukung kegiatan pembelajaran dan kegiatan peserta didik madrasah",
    "1.6. Mengelola sistem informasi madrasah dalam mendukung penyusunan program dan pengambilan keputusan",
    "1.7. Memanfaatkan kemajuan teknologi informasi bagi peningkatan pembelajaran dan manajemen madrasah",
    "2.1. Menyusun perencanaan madrasah untuk berbagai tingkatan perencanaan",
    "2.2. Memimpin madrasah dalam rangka pendayagunaan sumber daya madrasah secara optimal",
    "2.3. Menciptakan budaya dan iklim madrasah yang kondusif dan inovatif bagi pembelajaran peserta didik",
    "2.4. Mengolah guru dan staf dalam rangka pendayagunaan sumber daya manusia secara optimal",
    "2.5. Mengolah sarana dan prasarana madrasah dalam rangka pendayagunaan secara optimal",
    "2.6. Mengelola peserta didik dalam rangka penerimaan peserta didik baru dan penempatan dan pengembangan kapasitas peserta didik",
    "2.7. Mengelola pengembangan kurikulum dan kegiatan pembelajaran sesuai dengan arah dan tujuan pendidikan nasional",
    "2.8. Mengelola keuangan madrasah sesuai dengan prinsip pengelolaan yang akuntabel, transparan, dan efisien",
    "2.9. Mengelola ketatausahaan madrasah dalam mendukung pencapaian tujuan madrasah",
    "2.10. Melakukan monitoring, evaluasi, dan pelaporan pelaksanaan program kegiatan madrasah dengan prosedur yang tepat",
    "3.1. Menciptakan inovasi yang bermanfaat dan tepat bagi pengembangan madrasah",
    "3.2. Bekerja keras untuk mencapai keberhasilan madrasah sebagai organisasi pembelajar yang efektif",
    "3.3. Memiliki motivasi yang kuat untuk sukses dalam melaksanakan tugas pokok dan fungsinya sebagai pemimpin madrasah",
    "3.4. Pantang menyerah dan selalu mencari solusi terbaik dalam menghadapi kendala yang dihadapi madrasah",
    "3.5. Memiliki naluri kewirausahaan dalam mengelola kegiatan produksi/jasa madrasah sebagai sumber pembelajaran peserta didik",
    "4.1. Menyusun program supervisi akademik dalam rangka peningkatan profesionalisme guru",
    "4.2. Melaksanakan supervisi akademik terhadap guru dengan menggunakan pendekatan dan teknik supervisi yang tepat",
    "4.3. Menilai dan menindaklanjuti kegiatan supervisi akademik dalam rangka peningkatan profesionalisme guru",
    "5.1. Prestasi Peserta Didik",
    "5.2. Prestasi Pendidik dan Tenaga Kependidikan",
    "5.3. Prestasi Madrasah",
    "5.4. Prestasi dan Kompetensi Kepala Madrasah"
  ];

  indikatorList.forEach(ind => {
    sheetCategories.appendRow([ind]);
  });

  Logger.log("Setup Database PKKM Berhasil!");
}
