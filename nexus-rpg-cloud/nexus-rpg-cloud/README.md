# ⚔️ NEXUS RPG

Game RPG online web-based yang terinspirasi dari **EPIC RPG Discord**, dibangun dengan tema visual **Cosmic / Cyber-Neon** eksklusif serta fitur **Cloud Save** dan multi-area progression.

---

## 🌟 Fitur Utama

1. **Sistem Akun & Cloud Save Real-Time**
   - Registrasi & Login dengan enkripsi password (scrypt).
   - Auto-save ke database SQLite lokal setiap aksi penting (Level Up, Craft, Shopping, dan per 45 detik).
   - Game tersimpan aman di cloud database sehingga dapat dimainkan kapan saja tanpa kehilangan progres.

2. **Dunia & Zona Eksplorasi (Progression)**
   - 🌲 **Misty Forest** (Lv. 1+)
   - 🕳️ **Dark Caves** (Lv. 5+)
   - 🌿 **Cursed Swamp** (Lv. 10+)
   - 🏔️ **Frozen Peaks** (Lv. 20+)
   - 🌋 **Volcanic Depths** (Lv. 30+)
   - 🌑 **Shadow Realm** (Lv. 45+)
   - 🏛️ **Celestial Tower** (Lv. 60+)
   - 🌀 **The Nexus** (Lv. 80+)

3. **Mekanisme Permainan (Mirip EPIC RPG Discord)**
   - **⚔️ Hunt**: Bertarung melawan monster acak di area terkini untuk mendapatkan EXP, Gold, dan material drop.
   - **🗺️ Adventure**: Ekspedisi 3 tahap berbahaya dengan tantangan beruntun dan bonus reward +50%.
   - **🏰 Dungeon**: Boss lair mematikan di tiap zona untuk memperebutkan material legendaris (*Treant Heart, Dragon Gem, Lich Crown, dll.*).
   - **❤️ Heal**: Sanctuary pemulihan HP secara instan dengan biaya gold proporsional.
   - **🎒 Inventory**: Sistem tas untuk menggunakan potion, buffer elixir, melengkapi gear, dan menjual loot.
   - **🛒 Shop**: Membeli potion, elixir kekuatan/pertahanan, dan perlengkapan awal.
   - **🔨 Craft**: Menempa senjata & armor legendaris menggunakan material drop monster dan boss relic.
   - **⭐ Skills**: Pohon skill aktif & pasif (*Power Strike, Shield Block, Heal Light, Fire Slash, Mystic Shield, hingga Nexus Blast*).

4. **Tampilan Unik & Efek Visual**
   - Tema gelap kosmikal neon (Cyan, Purple, Gold) dengan partikel kosmik mengambang.
   - Combat feed real-time dengan status efek, critical hit, dan animasi bar HP/XP.

---

## 🚀 Cara Menjalankan

1. Buka folder game:
   ```powershell
   cd C:\Users\Lenovo\.gemini\antigravity\scratch\nexus-rpg
   ```
2. Jalankan server:
   ```powershell
   agy-node server.js
   ```
   *(Atau klik ganda file `start.bat`)*

3. Buka browser dan kunjungi:
   ```
   http://localhost:3000
   ```

4. Buat akun baru di tab **Register**, pilih nama hero Anda, dan mulailah berpetualang di Nexus!
