const GAS_APP_URL = "https://script.google.com/macros/s/AKfycbw3o59B6r_rccj6TQnfIgK1DvlBrYTO-31Ka5jPCHWCRGVu4h8XMPaimLastvgnVgCE/exec";

let allDocuments = []; // Cache for filtering

// Standar Hierarki Instrumen PKKM MAN 1 Soppeng (Berdasarkan Instrumen.pdf)
const PKKM_INSTRUMEN = [
    {
        code: "1.",
        title: "1. Usaha Pengembangan Madrasah",
        theme: "emerald",
        badgeColor: "bg-emerald-100 text-emerald-800 border-emerald-200",
        indicators: [
            {
                name: "1.1. Mengembangkan madrasah sesuai dengan kebutuhan",
                subindicators: [
                    "a. Mampu mengembangkan struktur organisasi yang sesuai dengan kebutuhan program",
                    "b. Mampu menempatkan personalia yang sesuai dengan kebutuhan",
                    "c. Mampu mengembangkan pedoman dan prosedur kerja organisasi madrasah"
                ]
            },
            {
                name: "1.2. Mengelola perubahan dan pengembangan madrasah menuju organisasi pembelajar yang efektif",
                subindicators: [
                    "a. Mampu mengembangkan program baru untuk meningkatkan pencapaian target yang lebih tinggi",
                    "b. Mampu dan terampil dalam membangun tim kerja yang efektif untuk mendapatkan produk kinerja yang lebih unggul",
                    "c. Mampu menerapkan berbagai teknik kurikulum dan pembelajaran yang efektif",
                    "d. Mampu mengembangkan potensi dan meningkatkan prestasi madrasah"
                ]
            },
            {
                name: "1.3. Mengelola hubungan antara madrasah dan masyarakat dalam rangka pencarian dukungan ide, sumber belajar, dan pembiayaan",
                subindicators: [
                    "a. Merencanakan kerjasama dengan lembaga pemerintah, swasta dan masyarakat",
                    "b. Melakukan pendekatan-pendekatan dalam rangka mendapatkan dukungan dari lembaga pemerintah, swasta dan masyarakat",
                    "c. Memanfaatkan dan memelihara hubungan kerjasama dengan lembaga pemerintah, swasta dan masyarakat"
                ]
            },
            {
                name: "1.4. Mengelola proses pencapaian 8 SNP sesuai dengan arah dan tujuan Pendidikan Nasional",
                subindicators: [
                    "a. Mengaplikasikan pengembangan kurikulum yang mengacu kepada standar isi",
                    "b. Mengaplikasikan pengembangan proses pembelajaran yang mengacu kepada standar proses",
                    "c. Mengaplikasikan sistem penilaian pembelajaran yang mengacu kepada standar penilaian",
                    "d. Melaksanakan penjaminan mutu pencapaian standar kompetisi lulusan"
                ]
            },
            {
                name: "1.5. Mengelola unit layanan khusus madrasah dalam mendukung kegiatan pembelajaran dan kegiatan peserta didik madrasah",
                subindicators: [
                    "a. Mampu mengelola laboratorium madrasah agar dapat dimanfaatkan secara optimal untuk kepentingan pembelajaran peserta didik",
                    "b. Mampu mengelola perpustakaan madrasah dalam menyiapkan sumber belajar yang diperlukan oleh peserta didik",
                    "c. Mampu mengelola usaha madrasah untuk pembelajaran peserta didik dan pemasukan tambahan dana bagi madrasah",
                    "d. Mampu mengelola koperasi madrasah baik sebagai media praktik maupun sebagai sumber belajar bagi peserta didik"
                ]
            },
            {
                name: "1.6. Mengelola sistem informasi madrasah dalam mendukung penyusunan program dan pengambilan keputusan",
                subindicators: [
                    "a. Memanfaatkan teknologi informasi dan komunikasi dalam manajemen madrasah",
                    "b. Memanfaatkan teknologi informasi dan komunikasi dalam pembelajaran, baik sebagai sumber belajar maupun sebagai alat/media pembelajaran",
                    "c. Memanfaatkan teknologi informasi dan komunikasi dalam menjalin kerjasama dengan pihak lain",
                    "d. Memanfaatkan teknologi informasi dan komunikasi dalam promosi program madrasah dan prestasi yang telah dicapai"
                ]
            },
            {
                name: "1.7. Memanfaatkan kemajuan teknologi informasi bagi peningkatan pembelajaran dan manajemen madrasah",
                subindicators: [
                    "a. Mampu mengembangkan sistem administrasi pengelolaan secara efektif dengan dukungan penerapan teknologi informasi dan komunikasi",
                    "b. Mengelola administrasi pembelajaran secara efektif dengan dukungan penerapan teknologi informasi dan komunikasi",
                    "c. Mampu mengembangkan sistem pengelolaan perpustakaan secara efektif dengan dukungan penerapan teknologi informasi dan komunikasi"
                ]
            }
        ]
    },
    {
        code: "2.",
        title: "2. Pelaksanaan Tugas Manajerial",
        theme: "blue",
        badgeColor: "bg-blue-100 text-blue-800 border-blue-200",
        indicators: [
            {
                name: "2.1. Menyusun perencanaan madrasah untuk berbagai tingkatan perencanaan",
                subindicators: [
                    "a. Mampu mengembangkan RKJM, RKT/RKAM dengan program lainnya berdasarkan data hasil evaluasi dalam pemenuhan 8 SNP",
                    "b. Mampu merumuskan visi-misi sebagai arah pengembangan program RKJM, RKT/RKAS dan program lainnya",
                    "c. Mampu menentukan strategi pencapaian tujuan madrasah, dilengkapi dengan indikator pencapaian yang terukur",
                    "d. Mampu menyusun program dengan rencana evaluasi keterlaksanaan dan pencapaian program"
                ]
            },
            {
                name: "2.2. Memimpin madrasah dalam rangka pendayagunaan sumber daya madrasah secara optimal",
                subindicators: [
                    "a. Mampu memberi contoh berdisiplin; hadir tepat waktu, disiplin menggunakan waktu, dan tepat waktu mengakhiri pekerjaan",
                    "b. Mampu melaksanakan peraturan sesuai dengan ketentuan yang berlaku",
                    "c. Mampu menunjukkan keteladanan dalam memanfaatkan sumber daya secara efektif dan efisien",
                    "d. Mampu menunjukkan kedisiplinan sebagai insan pembelajar"
                ]
            },
            {
                name: "2.3. Menciptakan budaya dan iklim madrasah yang kondusif dan inovatif bagi pembelajaran peserta didik",
                subindicators: [
                    "a. Mampu menjadi contoh dan berbudaya mutu yang kompetitif dalam mendorong peningkatan prestasi akademik dan non akademik peserta didik",
                    "b. Mampu melengkapi sarana dan prasarana untuk menciptakan suasana belajar kondusif dan inovatif bagi peserta didik",
                    "c. Mampu memfasilitasi kegiatan-kegiatan untuk meningkatkan budaya baca dan budaya tulis peserta didik",
                    "d. Mampu memfasilitasi kegiatan-kegiatan lomba di bidang akademik dan non akademik bagi peserta didik"
                ]
            },
            {
                name: "2.4. Mengolah guru dan staf dalam rangka pendayagunaan sumber daya manusia secara optimal",
                subindicators: [
                    "a. Mampu menyusun perencanaan pengembangan pendidik dan tenaga kependidikan",
                    "b. Mampu melakukan pembinaan berkala untuk meningkatkan mutu SDM madrasah",
                    "c. Memfasilitasi guru dan staf administrasi untuk meningkatkan kegiatan pembinaan kompetensi",
                    "d. Memantau dan menilai penerapan hasil pelatihan dalam pekerjaan di madrasah"
                ]
            },
            {
                name: "2.5. Mengolah sarana dan prasarana madrasah dalam rangka pendayagunaan secara optimal",
                subindicators: [
                    "a. Mampu mengelola fasilitas prasarana perabot dan sarana madrasah (gedung bangunan dan lahan meja kursi lemari peralatan kantor dan alat kebersihan)",
                    "b. Mampu mengelola perpustakaan madrasah",
                    "c. Mampu mengelola laboratorium madrasah",
                    "d. Mampu mengelola fasilitas penunjang madrasah lainnya (bengkel toko koperasi kebun dsb)"
                ]
            },
            {
                name: "2.6. Mengelola peserta didik dalam rangka penerimaan peserta didik baru dan penempatan dan pengembangan kapasitas peserta didik",
                subindicators: [
                    "a. Menyusun perencanaan penerimaan pengelolaan dan pengembangan kompetisi peserta didik",
                    "b. Memiliki program pengembangan potensi diri dan prestasi peserta didik",
                    "c. Memfasilitasi kegiatan-kegiatan untuk meningkatkan pembiasaan melalui penanaman nilai-nilai",
                    "d. Memfasilitasi kegiatan pengembangan diri bagi peserta didik, pendidik, dan tenaga kependidikan lainnya secara optimal"
                ]
            },
            {
                name: "2.7. Mengelola pengembangan kurikulum dan kegiatan pembelajaran sesuai dengan arah dan tujuan pendidikan nasional",
                subindicators: [
                    "a. Mampu mengarahkan secara efektif dalam menerapkan prinsip-prinsip pengembangan KTSP dalam kegiatan IHT, Workshop, Rapat Koordinasi, dan kegiatan MGMP/KKG",
                    "b. Mampu mengendalikan pelaksanaan KTSP berlandaskan kalender pendidikan menerbitkan surat keputusan pembagian tugas mengajar dan menerapkan aturan akademik",
                    "c. Memfasilitasi efektivitas tim kerja guru dalam rangka meningkatkan mutu pembelajaran",
                    "d. Mampu mengembangkan pelayanan belajar yang inovatif melalui pengembangan perangkat dan sumber belajar yang terbarukan",
                    "e. Memfasilitasi peserta didik dalam mengembangkan kolaborasi dan kompetisi bidang akademik dan non akademik"
                ]
            },
            {
                name: "2.8. Mengelola keuangan madrasah sesuai dengan prinsip pengelolaan yang akuntabel, transparan, dan efisien",
                subindicators: [
                    "a. Mampu merencanakan kebutuhan keuangan madrasah sesuai dengan rencana pengembangan madrasah baik jangka pendek maupun jangka panjang",
                    "b. Mampu mengupayakan sumber-sumber keuangan terutama yang bersumber dari luar madrasah dan dari unit usaha madrasah",
                    "c. Mampu mengkoordinasikan pembelanjaan keuangan sesuai dengan peraturan dan perundang-undangan berdasarkan asas prioritas dan efisiensi",
                    "d. Mampu membuat laporan dan evaluasi pengelolaan keuangan madrasah sesuai dengan prinsip efisien, transparan, dan akuntabel"
                ]
            },
            {
                name: "2.9. Mengelola ketatausahaan madrasah dalam mendukung pencapaian tujuan madrasah",
                subindicators: [
                    "a. Mampu mengelola administrasi surat masuk dan surat keluar sesuai dengan pedoman persuratan yang berlaku",
                    "b. Mampu mengelola administrasi madrasah yang meliputi administrasi akademik, kesiswaan, sarana/prasarana, keuangan, dan hubungan sekolah masyarakat",
                    "c. Mampu mengelola administrasi kearsipan madrasah baik arsip dinamis maupun arsip lainnya",
                    "d. Mampu mengelola administrasi akreditasi madrasah sesuai dengan prinsip tersedianya dokumen pendukung dan bukti fisik"
                ]
            },
            {
                name: "2.10. Melakukan monitoring, evaluasi, dan pelaporan pelaksanaan program kegiatan madrasah dengan prosedur yang tepat",
                subindicators: [
                    "a. Menyusun standar kinerja program pendidikan yang dapat diukur dan dinilai",
                    "b. Melakukan monitoring dan evaluasi kinerja program pendidikan dengan menggunakan teknik yang sesuai",
                    "c. Menyusun laporan sesuai dengan standar pelaporan monitoring dan evaluasi",
                    "d. Merumuskan program tindak lanjut berdasarkan hasil evaluasi pelaksanaan program sebelumnya"
                ]
            }
        ]
    },
    {
        code: "3.",
        title: "3. Pengembangan Kewirausahaan",
        theme: "amber",
        badgeColor: "bg-amber-100 text-amber-800 border-amber-200",
        indicators: [
            {
                name: "3.1. Menciptakan inovasi yang bermanfaat dan tepat bagi pengembangan madrasah",
                subindicators: [
                    "a. Memahami dan menghayati arti dan tujuan perubahan (inovasi) madrasah",
                    "b. Menggunakan metode, teknik dan proses perubahan madrasah",
                    "c. Menumbuhkan iklim yang mendorong kebebasan berfikir untuk menciptakan kreativitas dan inovasi",
                    "d. Mendorong warga madrasah untuk melakukan prakarsa/keberanian moral untuk melakukan hal-hal baru"
                ]
            },
            {
                name: "3.2. Bekerja keras untuk mencapai keberhasilan madrasah sebagai organisasi pembelajar yang efektif",
                subindicators: [
                    "a. Mampu bertindak kreatif dan inovatif dalam melaksanakan pekerjaan melalui cara berfikir dan cara bertindak",
                    "b. Mampu memberdayakan potensi madrasah secara optimal kedalam berbagai kegiatan-kegiatan produktif yang menguntungkan madrasah",
                    "c. Mampu menumbuhkan jiwa kewirausahaan (kreatif, inovatif dan produktif) di kalangan warga madrasah",
                    "d. Mampu mencatat ide-ide baru, kemudian mengembangkannya"
                ]
            },
            {
                name: "3.3. Memiliki motivasi yang kuat untuk sukses dalam melaksanakan tugas pokok dan fungsinya sebagai pemimpin madrasah",
                subindicators: [
                    "a. Bersedia belajar dari orang lain",
                    "b. Ingin selalu melakukan yang terbaik",
                    "c. Menciptakan perubahan yang kuat"
                ]
            },
            {
                name: "3.4. Pantang menyerah dan selalu mencari solusi terbaik dalam menghadapi kendala yang dihadapi madrasah",
                subindicators: [
                    "a. Mampu melibatkan tokoh agama, masyarakat dan pemerintah dalam memecahkan masalah kelembagaan",
                    "b. Mampu bersikap obyektif/tidak memihak dalam mengatasi konflik internal madrasah",
                    "c. Mampu bersikap simpatik/tenggang rasa terhadap orang lain"
                ]
            },
            {
                name: "3.5. Memiliki naluri kewirausahaan dalam mengelola kegiatan produksi/jasa madrasah sebagai sumber pembelajaran peserta didik",
                subindicators: [
                    "a. Mampu merencanakan kegiatan produksi/jasa sesuai dengan potensi madrasah",
                    "b. Mampu membina kegiatan produksi/jasa sesuai dengan prinsip-prinsip pengelolaan yang profesional dan akuntabel",
                    "c. Mampu melaksanakan pengawasan kegiatan produksi/jasa dan menyusun laporan",
                    "d. Mampu mengembangkan kegiatan produksi/jasa dan pemasarannya"
                ]
            }
        ]
    },
    {
        code: "4.",
        title: "4. Supervisi kepada Guru & Tendik",
        theme: "purple",
        badgeColor: "bg-purple-100 text-purple-800 border-purple-200",
        indicators: [
            {
                name: "4.1. Menyusun program supervisi akademik dalam rangka peningkatan profesionalisme guru",
                subindicators: [
                    "a. Mengidentifikasi masalah yang guru hadapi dalam pelaksanaan pembelajaran",
                    "b. Mampu merumuskan tujuan yang dilengkapi dengan target pencapaian yang terukur",
                    "c. Mampu mengembangkan instrumen supervisi"
                ]
            },
            {
                name: "4.2. Melaksanakan supervisi akademik terhadap guru dengan menggunakan pendekatan dan teknik supervisi yang tepat",
                subindicators: [
                    "a. Mengadakan pertemuan awal untuk menjaring data rencana pembelajaran dan menetapkan fokus kegiatan supervisi",
                    "b. Melaksanakan kegiatan pemantauan pembelajaran dan membuat catatan yang objektif dan selektif sebagai bahan pemecahan masalah supervisi",
                    "c. Melakukan pertemuan refleksi, menganalisis catatan hasil observasi, dan menyimpulkan hasil observasi",
                    "d. Bersama guru menyusun laporan supervisi dan rekomendasi tindaklanjut perbaikan dalam bentuk kegiatan analisis butir soal, remedial, dan pengayaan"
                ]
            },
            {
                name: "4.3. Menilai dan menindaklanjuti kegiatan supervisi akademik dalam rangka peningkatan profesionalisme guru",
                subindicators: [
                    "a. Memfasilitasi guru dalam merencanakan tindak lanjut perbaikan sistem penilaian hasil belajar",
                    "b. Mengecek ulang keterlaksanaan rekomendasi oleh guru",
                    "c. Melaksanakan pembinaan dan pengembangan guru sebagai tindaklanjut kegiatan supervisi",
                    "d. Menggunakan data hasil supervisi untuk pemetaan ketercapaian program sebagai dasar perbaikan siklus berikutnya"
                ]
            }
        ]
    },
    {
        code: "5.",
        title: "5. Hasil Kinerja Kepala Madrasah",
        theme: "rose",
        badgeColor: "bg-rose-100 text-rose-800 border-rose-200",
        indicators: [
            {
                name: "5.1. Prestasi Peserta Didik",
                subindicators: [
                    "a. Prestasi akademik peserta didik",
                    "b. Prestasi non akademik peserta didik"
                ]
            },
            {
                name: "5.2. Prestasi Pendidik dan Tenaga Kependidikan",
                subindicators: [
                    "a. Prestasi akademik pendidik dan tenaga kependidikan",
                    "b. Prestasi non akademik pendidik dan tenaga kependidikan"
                ]
            },
            {
                name: "5.3. Prestasi Madrasah",
                subindicators: [
                    "a. Prestasi akademik pendidik dan tenaga kependidikan (Tingkat Kecamatan, Kabupaten, Provinsi, Nasional)",
                    "b. Penghargaan non akademik peserta didik yang diterima di madrasah",
                    "c. Prestasi akademik dan non akademik pendidik dan tenaga kependidikan"
                ]
            },
            {
                name: "5.4. Prestasi dan Kompetensi Kepala Madrasah",
                subindicators: [
                    "a. Ijazah yang dimiliki oleh kepala madrasah",
                    "b. Pendidikan dan pelatihan yang pernah diikuti oleh kepala madrasah",
                    "c. Penguasaan ICT kepala madrasah",
                    "d. Prestasi yang diraih oleh kepala madrasah",
                    "e. Kegiatan penelitian kependidikan yang telah dilakukan oleh kepala madrasah",
                    "f. Kegiatan pelibatan komite dalam mendukung program madrasah",
                    "g. Kegiatan kemitraan dengan stakeholder pendidikan dalam meningkatkan kompetensi guru madrasah"
                ]
            }
        ]
    }
];

function getIndName(ind) {
    if (!ind) return "";
    return typeof ind === 'string' ? ind : (ind.name || "");
}

function getIndSubindicators(ind) {
    if (!ind) return ["a. Bukti Kerja / Dokumen Pendukung Lengkap"];
    return typeof ind === 'string' ? ["a. Bukti Kerja / Dokumen Pendukung Lengkap"] : (ind.subindicators || ["a. Bukti Kerja / Dokumen Pendukung Lengkap"]);
}


// Helper untuk mengetahui Tugas Utama dari string kategori (Indikator atau Kategori Lama)
function getTugasUtamaObj(catString) {
    if (!catString) return PKKM_INSTRUMEN[0];
    for (const group of PKKM_INSTRUMEN) {
        if (catString.startsWith(group.code) || group.indicators.some(indObj => getIndName(indObj) === catString || catString.includes(group.title))) {
            return group;
        }
    }
    // Fallback jika tidak match awalan angka
    if (catString.toLowerCase().includes("manajerial")) return PKKM_INSTRUMEN[1];
    if (catString.toLowerCase().includes("kewirausahaan")) return PKKM_INSTRUMEN[2];
    if (catString.toLowerCase().includes("supervisi")) return PKKM_INSTRUMEN[3];
    if (catString.toLowerCase().includes("hasil") || catString.toLowerCase().includes("kinerja")) return PKKM_INSTRUMEN[4];
    return PKKM_INSTRUMEN[0];
}

function getDocCategory(doc) {
    if (!doc) return "";
    if (typeof doc === 'string') return doc;
    if (Array.isArray(doc)) return String(doc[4] || doc[3] || "");
    return String(doc.kategori || doc.category || doc.Kategori || doc.Category || doc.subkategori || doc.subcategory || doc.Subcategory || doc.tugas_utama || doc.kategori_dokumen || doc.type || "");
}

// --- LOAD DATA ADMIN ---
async function loadAdminData(filterType = 'all', filterValue = '') {
    const container = document.getElementById('indicatorAccordionsContainer');
    if (!container) return;

    container.innerHTML = '<div class="p-16 text-center"><i class="fas fa-circle-notch fa-spin text-emerald-600 text-4xl"></i><p class="mt-4 text-slate-500 font-bold text-xs uppercase tracking-wider">Memproses data bukti fisik instrumen dari database...</p></div>';

    try {
        const response = await fetch(GAS_APP_URL + "?action=getData");
        const result = await response.json();

        if (result.status === 'success') {
            allDocuments = result.data || [];
            localStorage.setItem('pkkm_total_docs', allDocuments.length);
            renderTable(filterType, filterValue);

            // Update Stats
            const totalEl = document.getElementById('totalDocs');
            if (totalEl) totalEl.innerText = allDocuments.length;
            
            if (allDocuments.length > 0) {
                const lastDoc = allDocuments[allDocuments.length - 1];
                const dateStr = String(lastDoc.tanggal || lastDoc.date || lastDoc.waktu || "").split('T')[0] || "-";
                const lastEl = document.getElementById('lastUpdate');
                if (lastEl) lastEl.innerText = dateStr;
                
                const cats = allDocuments.map(d => getTugasUtamaObj(getDocCategory(d)).title);
                const mode = cats.sort((a, b) => cats.filter(v => v === a).length - cats.filter(v => v === b).length).pop();
                const topEl = document.getElementById('topCategory');
                if (topEl) topEl.innerText = mode ? mode.split('.')[1] || mode : '-';
            } else {
                if (document.getElementById('lastUpdate')) document.getElementById('lastUpdate').innerText = '-';
                if (document.getElementById('topCategory')) document.getElementById('topCategory').innerText = '-';
            }
        }
    } catch (e) {
        console.error(e);
        const cont = document.getElementById('indicatorAccordionsContainer');
        if (cont) cont.innerHTML = '<div class="p-8 text-center text-red-500 font-semibold text-sm">Gagal memuat data dari Google Drive/Sheets. Periksa koneksi internet Anda.</div>';
    }
}

function getDocSubindicator(doc) {
    if (!doc) return "z. Subindikator Umum / Seluruh Bukti Kerja";
    const catVal = getDocCategory(doc);
    const parts = catVal.split(' --- ');
    return parts[1] || (catVal.includes('~') ? catVal.split('~')[1].trim() : (catVal.includes('|') ? catVal.split('|')[1].trim() : "z. Subindikator Umum / Seluruh Bukti Kerja"));
}

function getGroupThemeStyles(theme) {
    switch (theme) {
        case 'blue':
            return {
                borderBottom: 'border-b-2 border-blue-500/40',
                card: 'bg-white border-blue-200/80 shadow-sm',
                header: 'bg-blue-50/60 hover:bg-blue-100/60',
                hoverBorder: 'hover:border-blue-400',
                iconBox: 'bg-blue-500/10 text-blue-700 border-blue-500/20',
                docBadge: 'bg-blue-100 text-blue-800 border border-blue-200',
                docIcon: 'text-blue-600',
                chevronActive: 'text-blue-600',
                tableHead: 'bg-blue-50/80 text-blue-800 border-b border-blue-200/70',
                subIndBadge: 'bg-blue-50 text-blue-800 border-blue-200/80',
                rowHover: 'hover:!bg-blue-50/50 group-hover:text-blue-700'
            };
        case 'amber':
            return {
                borderBottom: 'border-b-2 border-amber-500/40',
                card: 'bg-white border-amber-200/80 shadow-sm',
                header: 'bg-amber-50/60 hover:bg-amber-100/60',
                hoverBorder: 'hover:border-amber-400',
                iconBox: 'bg-amber-500/10 text-amber-700 border-amber-500/20',
                docBadge: 'bg-amber-100 text-amber-800 border border-amber-200',
                docIcon: 'text-amber-600',
                chevronActive: 'text-amber-600',
                tableHead: 'bg-amber-50/80 text-amber-900 border-b border-amber-200/70',
                subIndBadge: 'bg-amber-50 text-amber-800 border-amber-200/80',
                rowHover: 'hover:!bg-amber-50/50 group-hover:text-amber-700'
            };
        case 'purple':
            return {
                borderBottom: 'border-b-2 border-purple-500/40',
                card: 'bg-white border-purple-200/80 shadow-sm',
                header: 'bg-purple-50/60 hover:bg-purple-100/60',
                hoverBorder: 'hover:border-purple-400',
                iconBox: 'bg-purple-500/10 text-purple-700 border-purple-500/20',
                docBadge: 'bg-purple-100 text-purple-800 border border-purple-200',
                docIcon: 'text-purple-600',
                chevronActive: 'text-purple-600',
                tableHead: 'bg-purple-50/80 text-purple-800 border-b border-purple-200/70',
                subIndBadge: 'bg-purple-50 text-purple-800 border-purple-200/80',
                rowHover: 'hover:!bg-purple-50/50 group-hover:text-purple-700'
            };
        case 'rose':
            return {
                borderBottom: 'border-b-2 border-rose-500/40',
                card: 'bg-white border-rose-200/80 shadow-sm',
                header: 'bg-rose-50/60 hover:bg-rose-100/60',
                hoverBorder: 'hover:border-rose-400',
                iconBox: 'bg-rose-500/10 text-rose-700 border-rose-500/20',
                docBadge: 'bg-rose-100 text-rose-800 border border-rose-200',
                docIcon: 'text-rose-600',
                chevronActive: 'text-rose-600',
                tableHead: 'bg-rose-50/80 text-rose-800 border-b border-rose-200/70',
                subIndBadge: 'bg-rose-50 text-rose-800 border-rose-200/80',
                rowHover: 'hover:!bg-rose-50/50 group-hover:text-rose-700'
            };
        case 'emerald':
        default:
            return {
                borderBottom: 'border-b-2 border-emerald-500/40',
                card: 'bg-white border-emerald-200/80 shadow-sm',
                header: 'bg-emerald-50/60 hover:bg-emerald-100/60',
                hoverBorder: 'hover:border-emerald-400',
                iconBox: 'bg-emerald-500/10 text-emerald-700 border-emerald-500/20',
                docBadge: 'bg-emerald-100 text-emerald-800 border border-emerald-200',
                docIcon: 'text-emerald-600',
                chevronActive: 'text-emerald-600',
                tableHead: 'bg-emerald-50/80 text-emerald-800 border-b border-emerald-200/70',
                subIndBadge: 'bg-emerald-50 text-emerald-800 border-emerald-200/80',
                rowHover: 'hover:!bg-emerald-50/50 group-hover:text-emerald-700'
            };
    }
}

function renderDocRowHtml(row, theme = 'emerald') {
    const subIndText = getDocSubindicator(row);
    const docName = row.nama_dokumen || row.filename || row.name || row.judul || row[3] || "Dokumen Tanpa Nama";
    const escapedName = String(docName).replace(/'/g, "\\'");
    const uploader = row.uploader || row.user || row.pengunggah || row[2] || "Anonim";
    const tanggal = String(row.tanggal || row.date || row.waktu || row[1] || "").split('T')[0] || "-";
    const link = row.link_file || row.url || row.link || row.file_url || row[5] || "#";
    const id = row.id || row[0] || "";

    const loggedUser = JSON.parse(localStorage.getItem('user')) || {};
    const isPenilai = loggedUser.role !== 'admin';
    const styles = getGroupThemeStyles(theme);

    return `
        <tr class="bg-white ${styles.rowHover.split(' ')[0]} transition group border-b border-slate-100 last:border-0">
            <td class="px-6 py-4">
                <div class="font-bold text-slate-800 ${styles.rowHover.split(' ')[1]} transition text-sm mb-1.5">${docName}</div>
                <div class="flex flex-wrap gap-1.5 items-center">
                    <span class="inline-block px-2.5 py-1 ${styles.subIndBadge} border text-[11px] font-bold rounded-lg leading-snug shadow-2xs">${subIndText}</span>
                </div>
            </td>
            ${!isPenilai ? `
            <td class="px-6 py-4 hidden md:table-cell">
                <div class="flex items-center space-x-2.5">
                    <div class="w-8 h-8 bg-slate-100 rounded-xl flex items-center justify-center text-slate-600 text-xs font-extrabold border border-slate-200/60">${uploader.charAt(0)}</div>
                    <span class="text-xs text-slate-700 font-bold">${uploader}</span>
                </div>
            </td>
            <td class="px-6 py-4 hidden sm:table-cell text-xs text-slate-500 font-semibold italic">${tanggal}</td>
            ` : ''}
            <td class="px-6 py-4 text-center">
                <div class="flex justify-center space-x-2">
                    <button onclick="previewFile('${link}', '${escapedName}')" class="w-9 h-9 bg-blue-50 text-blue-600 hover:bg-blue-600 hover:text-white rounded-xl transition flex items-center justify-center shadow-sm" title="Pratinjau / Lihat Bukti Fisik">
                        <i class="fas fa-eye text-xs"></i>
                    </button>
                    ${!isPenilai ? `
                    <button onclick="deleteDocument('${id}')" class="w-9 h-9 bg-red-50 text-red-600 hover:bg-red-600 hover:text-white rounded-xl transition flex items-center justify-center shadow-sm" title="Hapus Bukti Fisik">
                        <i class="fas fa-trash-can text-xs"></i>
                    </button>
                    ` : ''}
                </div>
            </td>
        </tr>
    `;
}

function toggleIndicatorAccordion(id) {
    const el = document.getElementById(id);
    const icon = document.getElementById(`icon-${id}`);
    if (!el) return;
    
    if (el.classList.contains('hidden')) {
        el.classList.remove('hidden');
        if (icon) icon.classList.add('rotate-180', 'text-emerald-600');
    } else {
        el.classList.add('hidden');
        if (icon) icon.classList.remove('rotate-180', 'text-emerald-600');
    }
}

function isDocInIndicator(doc, indName, group, iIdx) {
    if (!doc) return false;
    const rawCat = getDocCategory(doc).trim();
    const cat = rawCat.split(' --- ')[0].split('~')[0].split('|')[0].trim();
    
    // 1. Pencocokan string langsung atau substring
    if (cat === indName || (indName && indName.toLowerCase().includes(cat.toLowerCase()) && cat.length > 2) || (cat && cat.toLowerCase().includes(indName.toLowerCase()))) {
        return true;
    }
    
    // 2. Pencocokan berdasarkan nomor kode indikator (cth: "1.1", "1.1.", "1.1 Mengembangkan...")
    const matchInd = indName.match(/^(\d+\.\d+)/);
    const indCode = matchInd ? matchInd[1] : '';
    if (indCode) {
        if (cat === indCode || cat === indCode + "." || cat.startsWith(indCode + ".") || cat.startsWith(indCode + " ") || cat.startsWith(indCode + "-") || cat.startsWith(indCode + "_")) {
            return true;
        }
    }
    
    // 3. Smart Fallback: Jika dokumen disimpan dengan nama Tugas Utama (cth: "1. Usaha Pengembangan Madrasah") atau kategori lama yang tidak memiliki nomor "1.1", masukkan ke indikator pertama (iIdx === 0) agar tidak ada file yang hilang!
    if (iIdx === 0) {
        const docGroup = getTugasUtamaObj(cat);
        if (docGroup && docGroup.code === group.code) {
            const hasSpecificCode = group.indicators.some(otherIndObj => {
                const otherInd = getIndName(otherIndObj);
                const m = otherInd.match(/^(\d+\.\d+)/);
                const c = m ? m[1] : '';
                return c && (cat === c || cat === c + "." || cat.startsWith(c + ".") || cat.startsWith(c + " "));
            });
            if (!hasSpecificCode) return true;
        }
    }
    return false;
}

function renderTable(filterType = 'all', filterValue = '') {
    const container = document.getElementById('indicatorAccordionsContainer');
    const tableTitle = document.getElementById('tableTitle');
    if (!container || !tableTitle) return;

    let groupsToRender = [];
    if (filterType === 'tugas_utama') {
        const groupObj = PKKM_INSTRUMEN.find(g => g.title === filterValue || g.code === filterValue.substring(0, 2));
        if (groupObj) groupsToRender = [groupObj];
        tableTitle.innerText = `Tugas Utama: ${filterValue}`;
    } else if (filterType === 'indikator') {
        const groupObj = getTugasUtamaObj(filterValue);
        if (groupObj) {
            const matchedIndObj = groupObj.indicators.find(i => getIndName(i) === filterValue) || filterValue;
            groupsToRender = [{
                code: groupObj.code,
                title: groupObj.title,
                theme: groupObj.theme,
                badgeColor: groupObj.badgeColor,
                indicators: [matchedIndObj]
            }];
        }
        tableTitle.innerText = `Indikator: ${filterValue}`;
    } else {
        groupsToRender = PKKM_INSTRUMEN;
        tableTitle.innerText = 'Semua Bukti Fisik PKKM';
    }

    container.innerHTML = '';

    if (groupsToRender.length === 0) {
        container.innerHTML = '<div class="p-8 text-center text-slate-500 text-sm font-semibold">Data tidak ditemukan.</div>';
        return;
    }

    const loggedUser = JSON.parse(localStorage.getItem('user')) || {};
    const isPenilai = loggedUser.role !== 'admin';

    groupsToRender.forEach((group, gIdx) => {
        const groupSection = document.createElement('div');
        groupSection.className = "space-y-3 mb-8 last:mb-0";
        const theme = group.theme || 'emerald';
        const topStyles = getGroupThemeStyles(theme);
        
        groupSection.innerHTML = `
            <div class="flex items-center space-x-3 pb-2.5 ${topStyles.borderBottom}">
                <span class="px-3 py-1 rounded-lg text-xs font-extrabold uppercase tracking-wider ${group.badgeColor || 'bg-emerald-100 text-emerald-800'} shadow-sm">${group.code}</span>
                <h4 class="text-base sm:text-lg font-extrabold text-slate-800">${group.title}</h4>
            </div>
            <div class="space-y-3 pt-1">
                ${group.indicators.map((indObj, iIdx) => {
                    const ind = getIndName(indObj);
                    const accId = `acc-ind-${gIdx}-${iIdx}`;
                    const docsForInd = allDocuments.filter(d => isDocInIndicator(d, ind, group, iIdx));
                    docsForInd.sort((a, b) => {
                        const subA = getDocSubindicator(a).toLowerCase();
                        const subB = getDocSubindicator(b).toLowerCase();
                        return subA.localeCompare(subB, 'id', { numeric: true });
                    });
                    const hasDocs = docsForInd.length > 0;
                    const isAutoOpen = filterType === 'indikator' || (groupsToRender.length === 1 && groupsToRender[0].indicators.length === 1);

                    const styles = getGroupThemeStyles(theme);

                    return `
                        <div class="border rounded-2xl overflow-hidden transition ${styles.hoverBorder} ${styles.card}">
                            <button onclick="toggleIndicatorAccordion('${accId}')" class="w-full text-left p-4 sm:p-5 flex items-center justify-between gap-4 transition cursor-pointer ${styles.header}">
                                <div class="flex items-start gap-3.5 flex-1">
                                    <span class="inline-flex items-center justify-center w-8 h-8 rounded-xl ${styles.iconBox} font-bold text-xs shrink-0 mt-0.5 border shadow-sm">
                                        ${ind.split(' ')[0]}
                                    </span>
                                    <div>
                                        <h5 class="font-bold text-slate-800 text-sm sm:text-base leading-snug">${ind}</h5>
                                        <p class="text-xs text-slate-500 mt-0.5">${hasDocs ? 'Klik untuk melihat ' + docsForInd.length + ' file bukti fisik yang diunggah' : 'Belum ada bukti fisik diunggah pada indikator ini'}</p>
                                    </div>
                                </div>
                                <div class="flex items-center gap-3 shrink-0">
                                    <span class="px-3 py-1.5 rounded-full text-xs font-bold ${hasDocs ? styles.docBadge : 'bg-slate-100 text-slate-500 border border-slate-200'}">
                                        <i class="fas ${hasDocs ? 'fa-file-circle-check ' + styles.docIcon : 'fa-folder-open text-slate-400'} mr-1.5"></i>
                                        ${docsForInd.length} Dokumen
                                    </span>
                                    <i class="fas fa-chevron-down text-slate-400 transition-transform duration-300 ${isAutoOpen ? 'rotate-180 ' + styles.chevronActive : ''}" id="icon-${accId}"></i>
                                </div>
                            </button>
                            
                            <div id="${accId}" class="${isAutoOpen ? '' : 'hidden'} border-t border-slate-200/80 bg-white transition-all">
                                ${hasDocs ? `
                                    <div class="overflow-x-auto">
                                        <table class="w-full text-left text-sm">
                                            <thead class="${styles.tableHead} text-[11px] uppercase font-bold tracking-wider">
                                                <tr>
                                                    <th class="px-6 py-3.5">Nama Bukti Fisik & Tautan</th>
                                                    ${!isPenilai ? '<th class="px-6 py-3.5 hidden md:table-cell">Tim Pengupload</th><th class="px-6 py-3.5 hidden sm:table-cell">Tanggal Upload</th>' : ''}
                                                    <th class="px-6 py-3.5 text-center">Aksi / Verifikasi</th>
                                                </tr>
                                            </thead>
                                            <tbody class="divide-y divide-slate-100">
                                                ${docsForInd.map(doc => renderDocRowHtml(doc, theme)).join('')}
                                            </tbody>
                                        </table>
                                    </div>
                                ` : `
                                    <div class="p-8 text-center bg-slate-50/40 text-slate-500 text-xs flex flex-col items-center">
                                        <div class="w-12 h-12 rounded-2xl bg-slate-100 flex items-center justify-center text-slate-400 mb-2.5 shadow-sm">
                                            <i class="fas fa-folder-open text-xl"></i>
                                        </div>
                                        <span class="font-bold text-slate-700 text-sm">Belum Ada Bukti Fisik</span>
                                        <span class="text-slate-500 mt-1 max-w-sm">Tim penyusun belum mengunggah berkas untuk indikator ini. File yang diunggah akan otomatis muncul di sini.</span>
                                    </div>
                                `}
                            </div>
                        </div>
                    `;
                }).join('')}
            </div>
        `;
        container.appendChild(groupSection);
    });
}

function filterBySubmenu(filterType, filterValue = '') {
    // Reset active UI states
    document.querySelectorAll('#dynamicCategorySubmenu button, #sub-all').forEach(el => {
        el.classList.remove('bg-emerald-500/20', 'text-emerald-400', 'font-bold');
        el.classList.add('text-slate-300');
    });

    if (filterType === 'all') {
        const btnAll = document.getElementById('sub-all');
        if (btnAll) {
            btnAll.classList.add('bg-emerald-500/20', 'text-emerald-400', 'font-bold');
            btnAll.classList.remove('text-slate-300');
        }
    } else {
        const activeBtn = document.querySelector(`button[data-filter-val="${CSS.escape(filterValue)}"]`);
        if (activeBtn) {
            activeBtn.classList.add('bg-emerald-500/20', 'text-emerald-400', 'font-bold');
            activeBtn.classList.remove('text-slate-300');
        }
    }

    showSection('docs');
    renderTable(filterType, filterValue);
}

// --- GENERATE CATEGORY SIDEBAR ADMIN (JUDUL PENUH TANPA TRUNCATE & TANPA SUBMENU DI SIDEBAR) ---
function loadCategoriesForSidebar() {
    const container = document.getElementById('dynamicCategorySubmenu');
    if (!container) return;

    container.innerHTML = '';

    PKKM_INSTRUMEN.forEach((group, index) => {
        const btn = document.createElement('button');
        btn.onclick = () => filterBySubmenu('tugas_utama', group.title);
        btn.setAttribute('data-filter-val', group.title);
        btn.className = "w-full text-left py-3 px-3.5 rounded-xl hover:bg-slate-800/80 transition text-xs font-semibold text-slate-300 flex items-start space-x-3 mb-1 group";
        btn.innerHTML = `
            <i class="fas fa-folder text-emerald-500/80 mt-0.5 shrink-0"></i>
            <span class="whitespace-normal leading-tight font-bold group-hover:text-emerald-400 transition">${group.title}</span>
        `;
        container.appendChild(btn);
    });
}

// --- PREVIEW FILE ---
function previewFile(url, title) {
    const modal = document.getElementById('previewModal');
    const content = document.getElementById('modalContent');
    document.getElementById('modalTitle').innerText = title;

    let previewUrl = url;
    if (url && url.includes('drive.google.com')) {
        previewUrl = url.replace('/view?usp=sharing', '/preview').replace('/view', '/preview');
    }

    modal.classList.remove('hidden');
    content.innerHTML = `<iframe src="${previewUrl}" class="w-full h-full border-none rounded-b-3xl" allow="autoplay"></iframe>`;
}

// --- DELETE DOCUMENT ---
async function deleteDocument(id) {
    const loggedUser = JSON.parse(localStorage.getItem('user')) || {};
    if (loggedUser.role === 'penilai') {
        return Swal.fire({
            icon: 'error',
            title: 'Akses Ditolak',
            text: 'Peran Penilai / Asesor hanya dapat melihat dan memverifikasi bukti fisik, tidak memiliki izin untuk menghapus dokumen.',
            confirmButtonColor: '#059669',
            customClass: { popup: 'rounded-2xl' }
        });
    }

    const confirm = await Swal.fire({
        title: 'Hapus Bukti Fisik?',
        text: "Berlaku permanen. Berkas ini akan dihapus dari sistem pengarsipan PKKM.",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#ef4444',
        cancelButtonColor: '#64748b',
        confirmButtonText: 'Ya, Hapus Bukti!',
        cancelButtonText: 'Batal',
        customClass: { popup: 'rounded-2xl' }
    });

    if (confirm.isConfirmed) {
        Swal.fire({ title: 'Menghapus berkas...', allowOutsideClick: false, didOpen: () => { Swal.showLoading(); } });
        try {
            const response = await fetch(GAS_APP_URL, {
                method: 'POST',
                body: JSON.stringify({ action: 'deleteUpload', id: id })
            });
            const result = await response.json();
            if (result.status === 'success') {
                Swal.fire({ icon: 'success', title: 'Terhapus!', text: result.message, timer: 1500, showConfirmButton: false, customClass: { popup: 'rounded-2xl' } });
                loadAdminData();
            }
        } catch (e) { Swal.fire({ icon: 'error', title: 'Error', text: 'Gagal menghapus data dari server', customClass: { popup: 'rounded-2xl' } }); }
    }
}

// --- CRUD KOMPONEN PKKM (ADMIN KELOLA KATEGORI VIEW) ---
async function loadCategories() {
    const list = document.getElementById('categoryList');
    if (!list) return;

    list.innerHTML = '';
    PKKM_INSTRUMEN.forEach(group => {
        const div = document.createElement('div');
        div.className = "p-4 bg-slate-50 rounded-2xl border border-slate-200/80 space-y-3";
        div.innerHTML = `
            <div class="flex items-center justify-between border-b border-slate-200/60 pb-2.5">
                <span class="text-xs font-extrabold text-slate-800 uppercase tracking-wider">${group.title}</span>
                <span class="px-2 py-0.5 bg-emerald-100 text-emerald-800 text-[10px] font-bold rounded-md">${group.indicators.length} Indikator</span>
            </div>
            <div class="space-y-2 pl-1">
                ${group.indicators.map(indObj => {
                    const indName = getIndName(indObj);
                    const subs = getIndSubindicators(indObj);
                    return `
                    <div class="bg-white p-3.5 rounded-xl border border-slate-100 shadow-2xs space-y-2">
                        <div class="flex items-start space-x-2 text-xs font-bold text-slate-800">
                            <i class="fas fa-check-circle text-emerald-500 mt-0.5 shrink-0"></i>
                            <span>${indName}</span>
                        </div>
                        ${subs.length > 0 ? `
                        <div class="pl-6 space-y-1.5 pt-1 border-t border-slate-100/80">
                            ${subs.map(sub => `
                                <div class="text-[11px] text-slate-600 flex items-start space-x-1.5">
                                    <span class="text-emerald-500 font-bold">&bull;</span>
                                    <span>${sub}</span>
                                </div>
                            `).join('')}
                        </div>
                        ` : ''}
                    </div>
                    `;
                }).join('')}
            </div>
        `;
        list.appendChild(div);
    });

    loadCategoriesForSidebar(); 
}

const addCategoryForm = document.getElementById('addCategoryForm');
if (addCategoryForm) {
    addCategoryForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        Swal.fire({
            icon: 'info',
            title: 'Standar Terkunci',
            text: 'Daftar Kategori & Subkategori telah dibakukan sesuai dengan pedoman resmi Instrumen PKKM 4 Tahunan (Instrumen.pdf).',
            confirmButtonColor: '#059669',
            customClass: { popup: 'rounded-2xl' }
        });
    });
}

// --- USER DASHBOARD DYNAMIC CATEGORY SYNC ---
function loadCategoriesToSelect() {
    const catSelect = document.getElementById('docCategory');
    const subSelect = document.getElementById('docSubcategory');
    const subIndSelect = document.getElementById('docSubindicator');
    if (!catSelect || !subSelect) return;

    // Populate Kategori (Tugas Utama)
    catSelect.innerHTML = PKKM_INSTRUMEN.map(g => `<option value="${g.title}">${g.title}</option>`).join('');

    // Function to populate Subcategory
    function updateSubcategories() {
        const selectedTitle = catSelect.value;
        const groupObj = PKKM_INSTRUMEN.find(g => g.title === selectedTitle) || PKKM_INSTRUMEN[0];
        subSelect.innerHTML = groupObj.indicators.map(indObj => {
            const name = getIndName(indObj);
            return `<option value="${name}">${name}</option>`;
        }).join('');
        updateSubindicators();
    }

    // Function to populate Subindicator
    function updateSubindicators() {
        if (!subIndSelect) return;
        const selectedTitle = catSelect.value;
        const selectedSubName = subSelect.value;
        const groupObj = PKKM_INSTRUMEN.find(g => g.title === selectedTitle) || PKKM_INSTRUMEN[0];
        const indObj = groupObj.indicators.find(ind => getIndName(ind) === selectedSubName) || groupObj.indicators[0];
        const subs = getIndSubindicators(indObj);
        subIndSelect.innerHTML = subs.map(sub => `<option value="${sub}">${sub}</option>`).join('');
    }

    catSelect.addEventListener('change', updateSubcategories);
    subSelect.addEventListener('change', updateSubindicators);
    updateSubcategories(); // Initial load
}

// --- HANDLE UPLOAD FORM (TIM PENYUSUN BUKTI FISIK) ---
const uploadForm = document.getElementById('uploadForm');
if (uploadForm) {
    uploadForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        const user = JSON.parse(localStorage.getItem('user'));
        const docName = document.getElementById('docName').value;
        const subcategory = document.getElementById('docSubcategory').value;
        const fileInput = document.getElementById('docFile');
        const submitBtn = document.getElementById('submitBtn');
        const progressContainer = document.getElementById('progressContainer');
        const progressBar = document.getElementById('progressBar');

        if (fileInput.files.length === 0) {
            return Swal.fire({
                icon: 'warning',
                title: 'Berkas Belum Dipilih',
                text: 'Silakan pilih bukti fisik instrumen (PDF atau Gambar) terlebih dahulu.',
                confirmButtonColor: '#059669',
                customClass: { popup: 'rounded-2xl' }
            });
        }

        const file = fileInput.files[0];
        const reader = new FileReader();

        submitBtn.disabled = true;
        progressContainer.classList.remove('hidden');
        progressBar.style.width = '30%';

        reader.onload = async function () {
            const base64String = reader.result.split(',')[1];
            progressBar.style.width = '60%';

            // RENAME FILE standar PKKM: [Kode Indikator] - [Nama Bukti Fisik] - [Uploader].[ext]
            const extension = file.name.split('.').pop();
            const indCode = subcategory.split(' ')[0] || "PKKM";
            const newFilename = `${indCode} - ${docName} - ${user.name}.${extension}`;

            const subindicatorEl = document.getElementById('docSubindicator');
            const subindicator = subindicatorEl ? subindicatorEl.value : "";
            const combinedCategory = subindicator ? `${subcategory} --- ${subindicator}` : subcategory;

            const payload = {
                action: 'upload',
                filename: newFilename,
                mimeType: file.type,
                base64: base64String,
                docTitle: docName,
                category: combinedCategory, // Menyimpan seluruh string indikator dan subindikator di database
                uploader: user.name
            };

            try {
                const response = await fetch(GAS_APP_URL, {
                    method: 'POST',
                    body: JSON.stringify(payload)
                });
                const result = await response.json();

                progressBar.style.width = '100%';

                if (result.status === 'success') {
                    Swal.fire({
                        icon: 'success',
                        title: 'Bukti Fisik Diunggah!',
                        text: 'Berkas instrumen Anda telah dinamai standar dan aman disimpan di folder Google Drive PKKM sekolah.',
                        confirmButtonColor: '#059669',
                        customClass: { popup: 'rounded-2xl' }
                    });
                    uploadForm.reset();
                    document.getElementById('fileNameDisplay').classList.add('hidden');
                    if (typeof loadCategoriesToSelect === 'function') loadCategoriesToSelect();
                } else {
                    Swal.fire({
                        icon: 'error',
                        title: 'Gagal Mengunggah',
                        text: result.message,
                        confirmButtonColor: '#059669',
                        customClass: { popup: 'rounded-2xl' }
                    });
                }
            } catch (error) {
                console.error("Error:", error);
                Swal.fire({
                    icon: 'error',
                    title: 'Kesalahan Sistem',
                    text: 'Terjadi kegagalan saat mengirim bukti fisik ke Google Drive server.',
                    confirmButtonColor: '#059669',
                    customClass: { popup: 'rounded-2xl' }
                });
            } finally {
                submitBtn.disabled = false;
                progressContainer.classList.add('hidden');
                progressBar.style.width = '0%';
            }
        };

        reader.readAsDataURL(file);
    });
}

window.addEventListener('DOMContentLoaded', () => {
    if (document.getElementById('uploadForm')) {
        loadCategoriesToSelect();
    }
    if (document.getElementById('dynamicCategorySubmenu')) {
        loadCategoriesForSidebar();
    }
});