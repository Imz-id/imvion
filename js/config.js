// ==============================================================
// WEBSITE CONFIGURATION
// ==============================================================
// Edit file ini untuk mengganti hampir seluruh isi website:
// nama situs, logo, background, warna, dan daftar tools.
// Setelah menyimpan, cukup refresh browser — tidak perlu ubah
// file HTML lain. Lihat README.md bagian "CUSTOMIZATION" untuk
// panduan lengkap.
// ==============================================================

// --------------------------------------------------------------
// 1. IDENTITAS SITUS
// --------------------------------------------------------------
const siteConfig = {
  siteName: "IMVION",
  tagline: "Dokumentasi | Pribadi",
  heroTitle: "IMVION",
  heroSubtitle: "Dokumentasi | Pribadi",
  description:
    "Portal pribadi berisi dokumentasi dan kumpulan tools/link yang sering digunakan sehari-hari.",
  year: 2026,

  // Ganti logo dengan mengganti file ini (disarankan format SVG/PNG persegi).
  // Jika file tidak ditemukan, website otomatis menampilkan teks "IMVION".
  logo: "assets/images/logo.svg",
  favicon: "assets/images/favicon.svg",

  // Ganti background dengan mengganti file gambar pada assets/images/
  // (boleh .jpg, .png, atau .svg — cukup update path di bawah ini).
  backgrounds: {
    home: "assets/images/hero-bg.svg",
    tools: "assets/images/tools-bg.svg",
    documentation: "assets/images/documentation-bg.svg",
  },

  // Tautan media sosial / kontak. Kosongkan value ("") untuk menyembunyikan.
  socials: [
    { label: "GitHub", url: "https://github.com/", icon: "github" },
    { label: "Instagram", url: "https://instagram.com/", icon: "instagram" },
    { label: "Email", url: "mailto:hello@example.com", icon: "mail" },
  ],

  about: {
    title: "Tentang IMVION",
    body:
      "IMVION adalah portal pribadi tempat saya menyimpan dokumentasi, catatan, dan kumpulan tools yang sering saya pakai sehari-hari — supaya semuanya mudah diakses dari satu tempat, kapan saja, dari perangkat apa saja.",
    meta: [
      { label: "Dibuat oleh", value: "IMVION" },
      { label: "Dibangun dengan", value: "HTML, CSS, JavaScript" },
      { label: "Hosting", value: "GitHub Pages" },
      { label: "Status", value: "Aktif dikembangkan" },
    ],
  },
};

// --------------------------------------------------------------
// 2. KATEGORI TOOLS (untuk filter chip di halaman Tools)
// --------------------------------------------------------------
// key harus sama persis dengan field "category" pada setiap tool di bawah.
const toolCategories = {
  download: "Download",
  audio: "Audio",
  social: "Sosial Media",
  image: "Gambar",
  ai: "AI",
  translate: "Translate",
  network: "Network",
  utility: "Utilitas",
  lainnya: "Lainnya",
};

// --------------------------------------------------------------
// 3. DAFTAR TOOLS
// --------------------------------------------------------------
// Cara menambah tool baru: tambahkan satu object baru ke array "tools".
// Cara menghapus tool: hapus object-nya dari array.
// Cara mengganti URL: ubah value "url" — tombol otomatis memakai URL baru.
// "target: _blank" berarti link dibuka di tab baru.
const tools = [
  { name: "NexDNS", description: "Layanan DNS custom untuk browsing lebih cepat dan aman.", url: "https://example.com", icon: "assets/icons/network.svg", category: "network", target: "_blank" },
  { name: "Downloader YT To Audio", description: "Unduh audio dari video YouTube.", url: "https://example.com", icon: "assets/icons/audio.svg", category: "audio", target: "_blank" },
  { name: "Cobalt.Tools", description: "Downloader video & audio multi-platform.", url: "https://example.com", icon: "assets/icons/download.svg", category: "download", target: "_blank" },
  { name: "Download Instagram V1", description: "Unduh foto & video dari Instagram (versi 1).", url: "https://example.com", icon: "assets/icons/social.svg", category: "social", target: "_blank" },
  { name: "Download Instagram V2", description: "Unduh foto & video dari Instagram (versi 2).", url: "https://example.com", icon: "assets/icons/social.svg", category: "social", target: "_blank" },
  { name: "Downloader Spotify", description: "Unduh lagu dari Spotify.", url: "https://example.com", icon: "assets/icons/audio.svg", category: "audio", target: "_blank" },
  { name: "Downloader Threads", description: "Unduh foto & video dari Threads.", url: "https://example.com", icon: "assets/icons/social.svg", category: "social", target: "_blank" },
  { name: "Menggabungkan File", description: "Gabungkan beberapa file menjadi satu.", url: "https://example.com", icon: "assets/icons/merge.svg", category: "utility", target: "_blank" },
  { name: "Downloader Terabox", description: "Unduh file dari Terabox.", url: "https://example.com", icon: "assets/icons/download.svg", category: "download", target: "_blank" },
  { name: "Downloader Terabox Server 2", description: "Server cadangan untuk unduh file Terabox.", url: "https://example.com", icon: "assets/icons/download.svg", category: "download", target: "_blank" },
  { name: "Remove Background", description: "Hapus background gambar secara otomatis.", url: "https://example.com", icon: "assets/icons/cutout.svg", category: "image", target: "_blank" },
  { name: "Generator Password", description: "Buat password acak yang kuat dan aman.", url: "https://example.com", icon: "assets/icons/lock.svg", category: "utility", target: "_blank" },
  { name: "Translate Jawa", description: "Terjemahan Bahasa Jawa.", url: "https://example.com", icon: "assets/icons/translate.svg", category: "translate", target: "_blank" },
  { name: "Translator DeepL", description: "Terjemahan teks berkualitas tinggi dengan DeepL.", url: "https://example.com", icon: "assets/icons/translate.svg", category: "translate", target: "_blank" },
  { name: "Stock Wallpaper", description: "Koleksi wallpaper resolusi tinggi.", url: "https://example.com", icon: "assets/icons/image.svg", category: "image", target: "_blank" },
  { name: "Video Converter", description: "Konversi format video secara online.", url: "https://example.com", icon: "assets/icons/convert.svg", category: "utility", target: "_blank" },
  { name: "Jadwal Kereta Api Indonesia", description: "Cek jadwal & tiket kereta api di Indonesia.", url: "https://example.com", icon: "assets/icons/train.svg", category: "lainnya", target: "_blank" },
  { name: "AI Generated Video", description: "Buat video menggunakan AI.", url: "https://example.com", icon: "assets/icons/ai.svg", category: "ai", target: "_blank" },
  { name: "Downloader Video YT HD++", description: "Unduh video YouTube kualitas tinggi.", url: "https://example.com", icon: "assets/icons/video.svg", category: "download", target: "_blank" },
  { name: "Downloader Video YT", description: "Unduh video YouTube standar.", url: "https://example.com", icon: "assets/icons/video.svg", category: "download", target: "_blank" },
  { name: "Kata Dieja dalam Citra Bumi", description: "Eksplorasi kata & lokasi lewat citra satelit bumi.", url: "https://example.com", icon: "assets/icons/globe.svg", category: "lainnya", target: "_blank" },
  { name: "Google Revanced", description: "Versi modifikasi aplikasi Android populer.", url: "https://example.com", icon: "assets/icons/app.svg", category: "lainnya", target: "_blank" },
  { name: "K-Pop Flac", description: "Unduh musik K-Pop kualitas FLAC lossless.", url: "https://example.com", icon: "assets/icons/audio.svg", category: "audio", target: "_blank" },
  { name: "Google Revanced (Mirror)", description: "Tautan alternatif untuk unduhan Google Revanced.", url: "https://example.com", icon: "assets/icons/app.svg", category: "lainnya", target: "_blank" },
  { name: "Proxy", description: "Layanan proxy untuk akses browsing.", url: "https://example.com", icon: "assets/icons/network.svg", category: "network", target: "_blank" },
  { name: "Free And Simple Video Hosting", description: "Hosting video gratis dan simpel.", url: "https://example.com", icon: "assets/icons/video.svg", category: "utility", target: "_blank" },
  { name: "Contoh Situs Crack", description: "Contoh tautan — ganti sesuai kebutuhan.", url: "https://example.com", icon: "assets/icons/link.svg", category: "lainnya", target: "_blank" },
  { name: "AI Pemeriksa Tata Bahasa", description: "Periksa tata bahasa & ejaan otomatis dengan AI.", url: "https://example.com", icon: "assets/icons/ai.svg", category: "ai", target: "_blank" },
  { name: "Pixelcut AI", description: "Hapus background & edit foto dengan AI.", url: "https://example.com", icon: "assets/icons/cutout.svg", category: "image", target: "_blank" },
];
