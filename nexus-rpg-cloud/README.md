# ⚔️ NEXUS RPG (v4.0 Cosmic Minimalist Edition)

Game RPG online web-based terinspirasi dari mekanik **EPIC RPG Discord**, dibangun dengan antarmuka **Cosmic Minimalist berbasis Ikon**, fitur **Multiplayer Cloud Save**, **Sistem Bank Vault**, **Mount & Drone Companion**, serta sistem **Time Travel (Prestige)**.

---

## 🌟 Fitur Utama
- **⚔️ Pertarungan Lengkap**: Hunt, Hardmode (2x Hadiah), Adventure 3 Ronde, Dungeon Area 1-15, dan Training Stat permanen.
- **🪓 Profesi & Panen (Gathering)**: Chop Wood (7 tier kayu), Fish (4 tier ikan), Mine (Koin & Permata), Farm (Bibit, Wortel, Kentang), dan Pickup.
- **✨ Enchanting 15 Tingkat**: Dari *Normie (+0%)* hingga *EDGY (+100%)*, *OMEGA (+125%)*, *GODLY (+200%)*, dan *VOID (+300%)*. Dilengkapi perintah Refine (10x), Transmute (100x), dan Transcend (1000x).
- **🔨 Forge & Dismantle**: Tempa perlengkapan tempur atau bongkar gear lama menjadi bahan mentah.
- **⏳ Time Travel (Prestige Engine)**: Reset dimensi untuk mendapatkan Kapsul Waktu (🔮), membuka enchant tertinggi, dan meningkatkan multiplier EXP & Koin permanen (+20% per TT).
- **🏦 Bank Vault**: Simpan koin dengan aman agar tidak hilang saat Time Travel.
- **🐎 Mount & 🤖 Drone**: Cyber Steed untuk meningkatkan stat & enchant luck, serta Drone yang memanen bahan otomatis setiap 60 detik.
- **👥 Multiplayer Online**: Autentikasi akun, simpanan cloud database SQLite, daftar teman, dan transfer koin antar pemain.

---

## 🚀 Cara Deploy ke Render.com (Gratis)

1. **Upload ke GitHub**:
   - Buat repositori baru di GitHub (misal: `nexus-rpg`).
   - Upload semua file di folder ini ke repositori tersebut (bisa via tombol *Add file -> Upload files* atau lewat git commit).

2. **Deploy di Render.com**:
   - Buka [Render Dashboard](https://dashboard.render.com).
   - Klik **New +** $\rightarrow$ pilih **Web Service**.
   - Hubungkan ke repositori GitHub Anda.
   - Konfigurasi Service:
     - **Name**: `nexus-rpg` (atau nama pilihan Anda)
     - **Region**: Singapore / Oregon / Frankfurt
     - **Branch**: `main` (atau `master`)
     - **Runtime**: `Node`
     - **Build Command**: `echo "Ready for deployment"`
     - **Start Command**: `node server.js`
     - **Plan**: `Free`
   - Pada bagian **Environment Variables**, tambahkan:
     - `NODE_VERSION` = `22.12.0`
     - `NODE_ENV` = `production`
   - Klik **Create Web Service**.

3. **Selesai!**
   - Render akan membangun dan menjalankan game dalam 1-2 menit.
   - Kunjungi URL yang diberikan Render (misal: `https://nexus-rpg.onrender.com`).

---

## 💻 Menjalankan di Lokal (Offline)
Jalankan di terminal:
```powershell
agy-node server.js
```
*(atau klik ganda file `start.bat`)*, lalu buka `http://localhost:3000`.
