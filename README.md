
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

**Prasyarat:** Node.js `^20.19.4`, `^22.13.0`, atau `^24.3.0` (diuji dengan v24), npm, dan aplikasi **Expo Go** yang mendukung **Expo SDK 57** di HP (atau Android Emulator).

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

**Akun demo:** karena autentikasi belum diimplementasikan, isi email dengan format valid (mis. `demo@chacing.id`) dan kata sandi minimal 6 karakter (contoh: `rahasia`). Saat mendaftar, isi juga "Konfirmasi Sandi" dengan teks yang sama.

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

#### Cara Kerja React Native

React Native memungkinkan aplikasi ditulis dengan JavaScript/TypeScript dan React, tetapi hasilnya bukan halaman web di dalam WebView. Komponen seperti `<View>` dan `<Text>` diterjemahkan menjadi komponen native asli: `UIView` di iOS dan `android.view.View` di Android. Kode JavaScript dijalankan oleh mesin Hermes, lalu berkomunikasi dengan sisi native lewat JSI (JavaScript Interface) pada New Architecture, sehingga pemanggilan bisa langsung tanpa bridge JSON seperti arsitektur lama. Di Chacing, Metro bundler menggabungkan kode di `src/` menjadi satu bundle, sedangkan Expo menyediakan toolchain, modul native seperti `expo-symbols`, dan Expo Router untuk navigasi.

#### Keunggulan untuk Aplikasi Hybrid

1. **Satu codebase untuk Android dan iOS** — Halaman Login, Beranda, dan Detail Transaksi cukup ditulis sekali, sehingga waktu pengembangan prototipe Chacing lebih singkat.
2. **Tampilan dan performa native** — Karena dirender sebagai komponen native, daftar transaksi dan animasi terasa halus seperti aplikasi asli.
3. **Fast Refresh dan ekosistem luas** — Perubahan kode langsung terlihat di simulator tanpa build ulang, dan paket seperti NativeWind dan `react-native-svg` tinggal dipasang lewat npm.

#### Komponen & Props

Komponen adalah fungsi yang mengembalikan potongan UI sehingga bisa dipakai ulang. Props adalah data yang dikirim dari komponen induk ke komponen anak dan bersifat read-only. `TransactionRow` di bawah menerima `title`, `subtitle`, dan `amount` lewat props, jadi satu komponen cukup untuk semua baris transaksi di Beranda.

```tsx
type TransactionRowProps = {
  icon: SymbolViewProps["name"];
  title: string;
  subtitle: string;
  amount: string;
  time: string;
};

const TransactionRow = ({ icon, title, subtitle, amount, time }: TransactionRowProps) => (
  <Pressable className="flex-row items-center justify-between rounded-2xl p-3.5">
    ...
    <Text>{title}</Text>
    <Text>{amount}</Text>
  </Pressable>
);

<TransactionRow title="Kopi Kenangan" amount="-Rp 22.000" ... />
```

#### State (Hooks)

State adalah data milik sebuah komponen yang bisa berubah, disimpan dengan hook `useState`. Bedanya dengan props, state diubah oleh komponen itu sendiri, sedangkan props datang dari luar. Setiap kali fungsi setter dipanggil, React merender ulang komponen sehingga UI otomatis mengikuti data terbaru. Pada halaman login, `isRegister` menentukan teks tombol dan tautan, sedangkan `emailError` memunculkan pesan kesalahan.

```tsx
const [isRegister, setIsRegister] = useState(false);
const [emailError, setEmailError] = useState("");

<TextInput onChangeText={(text) => { setEmail(text); setEmailError(""); }} />
{emailError ? <Text>{emailError}</Text> : null}

<Pressable onPress={() => setIsRegister((value) => !value)}>
  <Text>{isRegister ? "Masuk" : "Daftar"}</Text>
</Pressable>
```

#### Navigasi

Expo Router memakai file-based routing: setiap file di `src/app/` otomatis menjadi layar, dan `_layout.tsx` mengatur `Stack` navigator-nya. `router.push` menambah layar baru di atas stack sehingga tombol back bisa kembali, sedangkan `router.replace` mengganti layar yang sedang tampil. Setelah login dipakai `replace` agar pengguna tidak bisa kembali ke layar login lewat tombol back. Parameter dapat dikirim lewat opsi `params` dan dibaca di layar tujuan dengan `useLocalSearchParams`.

```tsx
router.replace("/Home");

router.replace("/transaksi");
```

### Video Demo


TBC 


---

## 🤖 Penggunaan AI

Log penggunaan AI Menyusul

## 📄 Lisensi

Lihat berkas [LICENSE](LICENSE).
