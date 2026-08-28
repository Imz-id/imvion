# IMVION

Website statis pribadi — dokumentasi & kumpulan tools — dibangun dengan HTML5, CSS3, dan JavaScript vanilla. Tanpa framework, tanpa backend, siap di-host gratis di GitHub Pages.

**Lisensi:** [MIT](LICENSE) — bebas dipakai, dimodifikasi, dan didistribusikan ulang, asal menyertakan notice lisensi aslinya.

## Struktur Proyek

```
/
├── index.html                 Halaman Home (hero)
├── documentation.html         Halaman Dokumentasi (search + filter kategori)
├── tools.html                 Halaman My Tools (search + filter kategori)
├── about.html                 Halaman About
│
├── css/
│   └── style.css              Semua styling (dark/light theme via CSS variables)
│
├── js/
│   ├── config.js              ⭐ Identitas situs + daftar tools — paling sering diedit
│   ├── documentation.js       ⭐ Daftar dokumentasi + logic render halaman Dokumentasi
│   ├── tools.js                Logic render + search/filter halaman Tools
│   └── main.js                 Navbar, dark/light toggle, scroll reveal (shared semua halaman)
│
├── documentation/
│   ├── example.html            Template — duplikat file ini untuk bikin artikel baru
│   └── *.html                  Contoh artikel dokumentasi
│
├── assets/
│   ├── images/                 Logo, background, thumbnail (semua file lokal, mudah diganti)
│   └── icons/                  Icon kategori tools (SVG)
│
└── README.md
```

## Menjalankan di Lokal

Karena tidak ada backend, cukup buka `index.html` langsung di browser, atau jalankan local server sederhana agar path relatif berjalan konsisten:

```bash
python3 -m http.server 8080
# lalu buka http://localhost:8080
```

## Publish ke GitHub Pages

1. Buat repository baru di GitHub, upload seluruh isi folder ini ke repository.
2. Buka repository → **Settings → Pages**.
3. Pada **Source**, pilih branch `main` dan folder `/ (root)`, lalu **Save**.
4. Tunggu beberapa menit — website akan tersedia di `https://username.github.io/nama-repository/`.

Seluruh path pada proyek ini sudah relatif (`css/style.css`, bukan `/css/style.css`), jadi akan langsung berfungsi meski di-hosting di subfolder seperti di atas. (Panduan lebih detail juga tersedia langsung di halaman Dokumentasi → *Cara Publish Website ke GitHub Pages*.)

---

## CUSTOMIZATION

Hampir semua perubahan dilakukan lewat **`js/config.js`** dan **`js/documentation.js`** — tidak perlu menyentuh file HTML.

### 1. Mengganti nama website

Buka `js/config.js`, ubah:

```js
siteName: "IMVION",
tagline: "Dokumentasi | Pribadi",
```

### 2. Mengganti logo

Ganti file `assets/images/logo.svg` dengan file logo kamu sendiri (boleh `.png`/`.svg`, persegi lebih aman). Jika ingin nama file berbeda, update juga:

```js
logo: "assets/images/logo.svg",
```

Jika file logo tidak ditemukan/rusak, website otomatis menampilkan teks "IMVION" sebagai fallback — website tidak akan pernah menampilkan gambar patah.

### 3. Mengganti background

Ganti file di `assets/images/hero-bg.svg`, `tools-bg.svg`, atau `documentation-bg.svg` dengan foto/gambar kamu (boleh `.jpg`/`.png`). Lalu update path-nya di `js/config.js`:

```js
backgrounds: {
  home: "assets/images/hero-bg.svg",
  tools: "assets/images/tools-bg.svg",
  documentation: "assets/images/documentation-bg.svg",
},
```

### 4. Mengganti warna

Buka `css/style.css`, cari bagian `:root` paling atas:

```css
--primary: #69d5f5;   /* warna aksen cyan */
--bg: #050505;         /* background dark mode */
--surface: #111111;
--text: #ffffff;
```

Ganti value hex-nya — seluruh tombol, link, dan aksen di website otomatis ikut berubah.

### 5. Menambah tools

Buka `js/config.js`, tambahkan satu object baru ke dalam array `tools`:

```js
{
  name: "Nama Tool",
  description: "Deskripsi singkat.",
  url: "https://example.com",
  icon: "assets/icons/download.svg",
  category: "download",
  target: "_blank"
},
```

`category` harus salah satu key yang ada di `toolCategories` (di atas array `tools`). Icon boleh memakai salah satu file di `assets/icons/`, atau tambahkan SVG icon baru sendiri.

### 6. Menghapus tools

Hapus saja object tool yang bersangkutan dari array `tools` di `js/config.js`.

### 7. Mengganti URL tombol

Cari tool yang dimaksud di array `tools`, ubah value `url: "..."`. Tombol otomatis memakai URL baru — tidak perlu ubah file lain.

### 8. Menambah halaman dokumentasi

1. Duplikat `documentation/example.html`, beri nama baru (contoh: `documentation/tips-motor.html`).
2. Ganti `<title>`, `<h1>`, dan isi `<div class="doc-article-body">` sesuai kontenmu.
3. Tambahkan satu object baru di array `documentation` pada `js/documentation.js`:

```js
{
  title: "Judul Dokumentasi",
  description: "Deskripsi singkat.",
  image: "assets/images/doc-placeholder.svg",
  url: "documentation/tips-motor.html",
  category: "tutorial",
},
```

Kartu baru otomatis muncul di halaman Dokumentasi.

### 9. Mengubah teks hero

Buka `js/config.js`:

```js
heroTitle: "IMVION",
heroSubtitle: "Dokumentasi | Pribadi",
```

### 10. Publish ke GitHub Pages

Lihat bagian **"Publish ke GitHub Pages"** di atas.

---

## Catatan Teknis

- **Tanpa backend** — search & filter berjalan sepenuhnya di browser (JavaScript vanilla), aman untuk GitHub Pages.
- **Dark/Light mode** — default dark, pilihan tersimpan di `localStorage` (tombol ☀/☾ di navbar).
- **Gambar** — semua gambar disimpan sebagai file lokal (tidak base64), memakai `loading="lazy"` di luar viewport pertama, dan `object-fit: cover` agar tetap rapi di berbagai ukuran layar.
- **Aksesibilitas** — semantic HTML, `alt` text, `aria-label` pada icon button, focus state terlihat, dan navigasi bisa memakai keyboard.
- **Ringan** — tidak ada library/framework eksternal; seluruh icon & background berupa SVG vektor kecil, bukan foto berukuran besar.
