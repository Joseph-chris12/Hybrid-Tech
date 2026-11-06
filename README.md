
<p align="center">
  <img src="assets/images/chacing_icon.png" alt="Logo Chacing" width="120" />
</p>

<h1 align="center">Chacing</h1>

<p align="center">
  <em>Catat jajan, budget aman.</em><br/>
  Prototipe aplikasi pencatat pengeluaran harian untuk mahasiswa, dibuat dengan React Native + Expo.
</p>

<p align="center">
  <img src="https://img.shields.io/badge/React_Native-0.86-61DAFB?logo=react&logoColor=white" alt="React Native" />
  <img src="https://img.shields.io/badge/Expo-SDK_57-000020?logo=expo&logoColor=white" alt="Expo" />
  <img src="https://img.shields.io/badge/TypeScript-strict-3178C6?logo=typescript&logoColor=white" alt="TypeScript" />
  <img src="https://img.shields.io/badge/NativeWind-v4-38BDF8?logo=tailwindcss&logoColor=white" alt="NativeWind" />
</p>

---

## 📑 Daftar Isi

- [Identitas](#-identitas)
- [Tema & Deskripsi](#-tema--deskripsi)
- [Cara Menjalankan](#-cara-menjalankan)
- [Struktur Proyek](#-struktur-proyek)
- [Analisis Kebutuhan](#-analisis-kebutuhan)
- [Penjelasan Konsep]()
- [Video Demo]()
- [Penggunaan AI](#-penggunaan-ai)

---

## 👤 Identitas

| | |
|---|---|
| **Nama** | Joseph Christian Kurniawan |
| **NIM** | 2802402306 |
| **Kelas** | LA95 |
| **Mata Kuliah** | COMP6923051 – Hybrid Application Development |
| **Ujian** | Mid Exam (Take Home), BINUS University Semarang |

## 🎯 Tema & Deskripsi

**Tema:** Finance

> ⚠️ Aplikasi ini adalah **prototipe**: seluruh data bersifat statis (disimpan di `src/data/`) dan autentikasi belum terhubung ke backend.

## 🚀 Cara Menjalankan

**Prasyarat:** Node.js LTS, npm, dan aplikasi **Expo Go** di HP (atau Android Emulator).

```bash
# 1. Clone repositori
git clone https://github.com/Joseph-chris12/Hybrid-Tech.git
cd Hybrid-Tech

# 2. Install dependency
npm install

# 3. Jalankan Metro bundler
npx expo start
```

Lalu scan QR code dengan Expo Go (Android) atau aplikasi Kamera (iOS).

**Akun demo:** karena autentikasi belum diimplementasikan, isi email dengan format valid (mis. `demo@chacing.id`) dan kata sandi minimal TODO karakter.

## 🗂️ Struktur Proyek

```
src/
├── app/                  # Layar (file-based routing Expo Router)
│   ├── _layout.tsx       # Stack navigator
│   ├── index.tsx         # Login & Register
│   ├── Home.tsx          # Beranda + daftar transaksi
│   ├── detail/[id].tsx   # Detail transaksi "menyusul"
│   └── budget.tsx        # Fitur pendukung "menyusul"
```


## Dasar Masalah

- **Self-control adalah faktor penentu.** Dari beberapa faktor yang diuji, hanya self-control yang berpengaruh signifikan terhadap pengelolaan keuangan mahasiswa ([Amalia & Yuliati, 2025](https://doi.org/10.31959/jm.v14i2.3102)).
  → Chacing dirancang untuk membantu pengendalian diri (budget mingguan, "aman dibelanjakan hari ini"), bukan sekadar mencatat.

- **Utang paylater jadi perhatian regulator.** OJK membatasi pengguna paylater karena khawatir generasi muda terjerat utang; lebih dari 50% penggunanya berusia 19–34 tahun ([Irawati, 2025](https://infobanknews.com/ojk-beberkan-alasan-batasi-usia-dan-penghasilan-pengguna-paylater)).
  → Fitur split bill mencatat siapa berutang ke siapa, supaya utang kecil tidak menumpuk tanpa disadari.


### Target Pengguna

Chacing ditujukan untuk **mahasiswa berusia 18 tahun ke atas** yang mulai mengelola uang sendiri, misalnya dari uang saku bulanan, beasiswa, atau penghasilan kerja paruh waktu.

Di usia ini, mahasiswa sudah punya akses penuh ke pembayaran digital dan layanan kredit seperti paylater, tetapi kebiasaan finansialnya masih terbentuk. Banyak yang sebenarnya tahu cara mengatur uang, namun kesulitan menerapkannya secara konsisten.

Chacing cocok untuk mahasiswa yang:
- sering kehabisan uang sebelum periode berikutnya tanpa tahu ke mana perginya
- ingin mencatat pengeluaran, tapi merasa mencatat manual terlalu merepotkan
- sering makan atau patungan bersama teman dan perlu membagi tagihan dengan adil
- ingin punya batas belanja yang jelas setiap minggu

### Penjelasan Konsep

TBC

### Video Demo


TBC 


---

## 🤖 Penggunaan AI

Log penggunaan AI Menyusul

## 📄 Lisensi

Lihat berkas [LICENSE](LICENSE).
