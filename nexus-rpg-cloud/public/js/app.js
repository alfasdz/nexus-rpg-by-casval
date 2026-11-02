// NEXUS RPG v3.0 - Ultimate Online Game Engine
// Features: Full EPIC RPG Database, Multiplayer Friends & Transfers, Gambling Casino, Responsive UI

(function() {
  'use strict';

  /* ============================================================
     0. I18N BILINGUAL SYSTEM (INDONESIAN & ENGLISH)
     ============================================================ */
  let currentLang = localStorage.getItem('nexus_lang') || 'id';

  const I18N = {
    id: {
      auth_tagline: 'EPIC MULTIPLAYER COSMIC REALM',
      btn_login_tab: 'LOGIN',
      btn_reg_tab: 'DAFTAR BARU',
      lbl_username: 'Username',
      lbl_password: 'Password',
      btn_login_submit: '⚔️ MASUK KE PERMAINAN',
      lbl_reg_username: 'Pilih Username',
      lbl_reg_password: 'Pilih Password',
      lbl_reg_char: 'Nama Gelar Hero',
      btn_reg_submit: '✨ BUAT KARAKTER',
      auth_vault_hint: '☁️ Auto-Save Cloud Aktif • Lintas HP & Desktop',

      tab_combat: '⚔️ Pertarungan',
      tab_farming: '🌲 Panen Kayu & Ikan',
      tab_gambling: '🎰 Kasino / Judi',
      tab_bag: '🎒 Tas & Pasar',
      tab_profile: '👤 Profil & Stats',

      m_nav_combat: 'Combat',
      m_nav_farming: 'Panen',
      m_nav_gambling: 'Judi',
      m_nav_bag: 'Tas/Toko',
      m_nav_profile: 'Profil',

      btn_hunt_title: 'Hunt',
      btn_hunt_desc: 'Lawan Monster Area',
      btn_adv_title: 'Adventure',
      btn_adv_desc: 'Ekspedisi 3 Ronde (+50%)',
      btn_dung_title: 'Dungeon',
      btn_dung_desc: 'Tantang Boss Area',
      btn_heal_title: 'Heal',
      btn_heal_desc: 'Pulihkan Darah Penuh',

      btn_chop_title: 'Chop Wood',
      btn_chop_desc: 'Tebang Kayu, Apel & Peti',
      btn_fish_title: 'Fish Net',
      btn_fish_desc: 'Pancing Ikan Emas & Ruby',

      btn_inv_title: 'Inventory',
      btn_inv_desc: 'Buka Tas & Pakai Item',
      btn_crate_title: 'Buka Lootbox',
      btn_crate_desc: 'Buka Peti Hadiah',
      btn_craft_title: 'Mystic Forge',
      btn_craft_desc: 'Tempa Senjata & Zirah',
      btn_shop_title: 'Cosmic Shop',
      btn_shop_desc: 'Toko Potion & Crate',
      btn_trade_market: '⚖️ Pasar Tukar Kayu / Ikan / Ruby',

      casino_title: '🎰 KASINO KOSMIK (JUDI KOIN)',
      casino_desc: 'Lipatgandakan koin Anda dengan keberuntungan! Hati-hati jangan sampai bangkrut!',
      coinflip_title: '🪙 COINFLIP (2X MULTIPLIER)',
      coinflip_info: 'Pilih Kepala atau Ekor (50% Chance menang 2x lipat)',
      btn_heads: 'Kepala',
      btn_tails: 'Ekor',
      slots_title: '🎰 COSMIC SLOTS (UP TO 10X)',
      slots_info: 'Putar 3 rel kosmik! 3 simbol sama = 10x, 2 simbol = 3x jackpot!',
      btn_spin_slot: '🎰 Putar Mesin Slot!',
      dice_title: '🎲 DADU DUEL (2.5X)',
      dice_info: 'Adu lempar dadu lawan bandar! Dadu Anda lebih tinggi = menang 2.5x!',
      btn_roll_dice: 'Lempar Dadu Duel!',

      prof_combat_stat: '⚔️ STATISTIK TEMPUR',
      prof_m_kills: 'Total Monster Dibunuh:',
      prof_b_kills: 'Boss Dungeon Dikalahkan:',
      prof_dmg: 'Total Damage Diberikan:',
      prof_deaths: 'Pernah Tumbang / Mati:',
      prof_farm_stat: '🌲 STATISTIK PANEN & PETI',
      prof_chops: 'Penebangan Kayu (Chop):',
      prof_fish: 'Menangkap Ikan (Fish):',
      prof_crates: 'Peti Hadiah Dibuka:',
      prof_earned: 'Total Gold Diperoleh:',
      prof_zone_info: '🗺️ INFORMASI ZONA TERKINI',
      prof_boss_guard: '🏰 Boss Penjaga Dungeon:',

      feed_header: '📜 COMBAT LOG & AKTIVITAS DUNIA'
    },
    en: {
      auth_tagline: 'EPIC MULTIPLAYER COSMIC REALM',
      btn_login_tab: 'LOGIN',
      btn_reg_tab: 'REGISTER',
      lbl_username: 'Username',
      lbl_password: 'Password',
      btn_login_submit: '⚔️ ENTER GAME',
      lbl_reg_username: 'Choose Username',
      lbl_reg_password: 'Choose Password',
      lbl_reg_char: 'Hero Title / Name',
      btn_reg_submit: '✨ CREATE CHARACTER',
      auth_vault_hint: '☁️ Cloud Auto-Save Active • Mobile & Desktop',

      tab_combat: '⚔️ Combat',
      tab_farming: '🌲 Wood & Fishing',
      tab_gambling: '🎰 Casino / Gamble',
      tab_bag: '🎒 Bag & Market',
      tab_profile: '👤 Profile & Stats',

      m_nav_combat: 'Combat',
      m_nav_farming: 'Farm',
      m_nav_gambling: 'Casino',
      m_nav_bag: 'Bag/Shop',
      m_nav_profile: 'Profile',

      btn_hunt_title: 'Hunt',
      btn_hunt_desc: 'Fight Area Monsters',
      btn_adv_title: 'Adventure',
      btn_adv_desc: '3-Round Expedition (+50%)',
      btn_dung_title: 'Dungeon',
      btn_dung_desc: 'Challenge Area Boss',
      btn_heal_title: 'Heal',
      btn_heal_desc: 'Restore Full Health',

      btn_chop_title: 'Chop Wood',
      btn_chop_desc: 'Chop Trees, Apples & Crates',
      btn_fish_title: 'Fish Net',
      btn_fish_desc: 'Catch Golden Fish & Rubies',

      btn_inv_title: 'Inventory',
      btn_inv_desc: 'Open Bag & Equip Gear',
      btn_crate_title: 'Open Lootbox',
      btn_crate_desc: 'Open Reward Crates',
      btn_craft_title: 'Mystic Forge',
      btn_craft_desc: 'Craft Weapons & Armor',
      btn_shop_title: 'Cosmic Shop',
      btn_shop_desc: 'Potions & Crates Store',
      btn_trade_market: '⚖️ Trade Market for Wood / Fish / Rubies',

      casino_title: '🎰 COSMIC CASINO (COIN GAMBLING)',
      casino_desc: 'Multiply your coins with luck! Beware of bankruptcy!',
      coinflip_title: '🪙 COINFLIP (2X MULTIPLIER)',
      coinflip_info: 'Pick Heads or Tails (50% Chance to win 2x)',
      btn_heads: 'Heads',
      btn_tails: 'Tails',
      slots_title: '🎰 COSMIC SLOTS (UP TO 10X)',
      slots_info: 'Spin 3 cosmic reels! 3 matching = 10x, 2 matching = 3x jackpot!',
      btn_spin_slot: '🎰 Spin Slot Machine!',
      dice_title: '🎲 DICE DUEL (2.5X)',
      dice_info: 'Duel roll against dealer! Higher roll = 2.5x win!',
      btn_roll_dice: 'Roll Dice Duel!',

      prof_combat_stat: '⚔️ COMBAT STATISTICS',
      prof_m_kills: 'Total Monsters Killed:',
      prof_b_kills: 'Dungeon Bosses Defeated:',
      prof_dmg: 'Total Damage Dealt:',
      prof_deaths: 'Times Fallen / Died:',
      prof_farm_stat: '🌲 GATHERING & CRATES STATS',
      prof_chops: 'Wood Chopped (Chop):',
      prof_fish: 'Fish Caught (Fish):',
      prof_crates: 'Reward Crates Opened:',
      prof_earned: 'Total Gold Earned:',
      prof_zone_info: '🗺️ CURRENT ZONE INTEL',
      prof_boss_guard: '🏰 Dungeon Guardian Boss:',

      feed_header: '📜 COMBAT LOG & REALM ACTIVITY'
    }
  };

  function applyLanguage(lang) {
    currentLang = lang;
    localStorage.setItem('nexus_lang', lang);
    const dict = I18N[lang] || I18N.id;

    // Update current lang indicators
    document.querySelectorAll('.lang-current').forEach(el => {
      el.textContent = lang.toUpperCase();
    });

    // Update data-i18n elements
    document.querySelectorAll('[data-i18n]').forEach(el => {
      const key = el.dataset.i18n;
      if (dict[key]) el.textContent = dict[key];
    });

    // Update Desktop Nav Tabs
    const tabKeys = {
      combat: dict.tab_combat,
      farming: dict.tab_farming,
      gambling: dict.tab_gambling,
      bag: dict.tab_bag,
      profile: dict.tab_profile
    };
    document.querySelectorAll('.d-tab').forEach(b => {
      const t = b.dataset.tab;
      if (tabKeys[t]) b.textContent = tabKeys[t];
    });

    // Update Mobile Bottom Bar Items
    const mKeys = {
      combat: dict.m_nav_combat,
      farming: dict.m_nav_farming,
      gambling: dict.m_nav_gambling,
      bag: dict.m_nav_bag,
      profile: dict.m_nav_profile
    };
    document.querySelectorAll('.m-nav-item').forEach(b => {
      const t = b.dataset.tab;
      const txt = b.querySelector('.m-text');
      if (txt && mKeys[t]) txt.textContent = mKeys[t];
    });

    // Update Game Action Buttons
    const gBtns = {
      hunt: { title: dict.btn_hunt_title, desc: dict.btn_hunt_desc },
      adventure: { title: dict.btn_adv_title, desc: dict.btn_adv_desc },
      dungeon: { title: dict.btn_dung_title, desc: dict.btn_dung_desc },
      heal: { title: dict.btn_heal_title, desc: dict.btn_heal_desc },
      chop: { title: dict.btn_chop_title, desc: dict.btn_chop_desc },
      fish: { title: dict.btn_fish_title, desc: dict.btn_fish_desc },
      inventory: { title: dict.btn_inv_title, desc: dict.btn_inv_desc },
      crate: { title: dict.btn_crate_title, desc: dict.btn_crate_desc },
      craft: { title: dict.btn_craft_title, desc: dict.btn_craft_desc },
      shop: { title: dict.btn_shop_title, desc: dict.btn_shop_desc },
      trade: { title: dict.btn_trade_market, desc: '' }
    };
    document.querySelectorAll('.game-btn').forEach(b => {
      const act = b.dataset.action;
      if (gBtns[act]) {
        const tEl = b.querySelector('.btn-title');
        if (tEl) tEl.textContent = gBtns[act].title;
        const dEl = b.querySelector('.btn-desc');
        if (dEl && gBtns[act].desc) dEl.textContent = gBtns[act].desc;
      }
    });

    // Update Profile Statistics Card Headers
    const pBoxes = document.querySelectorAll('.profile-sub-grid .p-box');
    if (pBoxes && pBoxes.length >= 2) {
      const hCombat = pBoxes[0].querySelector('h4');
      if (hCombat) hCombat.textContent = dict.prof_combat_stat;
      const hFarm = pBoxes[1].querySelector('h4');
      if (hFarm) hFarm.textContent = dict.prof_farm_stat;
    }
    const pArea = document.querySelector('.area-preview-box h4');
    if (pArea) pArea.textContent = dict.prof_zone_info;
  }

  function toggleLanguage() {
    const nextLang = currentLang === 'id' ? 'en' : 'id';
    applyLanguage(nextLang);
    showToast(nextLang === 'en' ? '🌐 Language switched to English!' : '🌐 Bahasa dialihkan ke Bahasa Indonesia!');
  }

  /* ============================================================
     1. COMPLETE EPIC RPG DATABASE
     ============================================================ */
  const AREAS = [
    { id: 'area_1', name: 'Area 1: Verdant Plains', emoji: '🌱', levelReq: 1, desc: 'Padang rumput pemula dengan serigala dan zombie pengembara' },
    { id: 'area_2', name: 'Area 2: Whispering Woods', emoji: '🌲', levelReq: 5, desc: 'Hutan lebat kuno penuh pohon tebang logging dan rubah gesit' },
    { id: 'area_3', name: 'Area 3: Echoing Caverns', emoji: '🕳️', levelReq: 10, desc: 'Gua berair bawah tanah habitat ogre batu dan kelelawar kristal' },
    { id: 'area_4', name: 'Area 4: Frostfall Summit', emoji: '🏔️', levelReq: 20, desc: 'Puncak gunung glasial yang dijaga naga es dan yeti raksasa' },
    { id: 'area_5', name: 'Area 5: Sunken Marsh', emoji: '🌿', levelReq: 30, desc: 'Rawa beracun tempat tinggal hydra berkepala banyak dan siren' },
    { id: 'area_6', name: 'Area 6: Obsidian Caldera', emoji: '🌋', levelReq: 45, desc: 'Kawah lahar mendidih dan iblis magma berapi' },
    { id: 'area_7', name: 'Area 7: Cyber Void', emoji: '🤖', levelReq: 60, desc: 'Reruntuhan masa depan yang dijaga robot mecha dan chip nano' },
    { id: 'area_8', name: 'Area 8: Celestial Sanctuary', emoji: '🏛️', levelReq: 75, desc: 'Kuil para dewa melayang bermandikan cahaya starlight' },
    { id: 'area_9', name: 'Area 9: Chrono Rift', emoji: '⏳', levelReq: 90, desc: 'Dimensi retakan ruang waktu dan pasir keabadian' },
    { id: 'area_10', name: 'Area 10: Nexus Multiverse', emoji: '🌀', levelReq: 100, desc: 'Pusat konvergensi singularitas seluruh realitas alam semesta' }
  ];

  const MONSTERS = {
    area_1: [
      { name: 'Plains Wolf', emoji: '🐺', hp: 22, atk: 6, def: 2, xp: 14, gold: 10, drops: [{id: 'wolf_pelt', chance: 0.5}, {id: 'crate_common', chance: 0.15}] },
      { name: 'Wild Goblin', emoji: '👺', hp: 26, atk: 8, def: 3, xp: 18, gold: 14, drops: [{id: 'goblin_ear', chance: 0.4}] },
      { name: 'Stray Zombie', emoji: '🧟', hp: 34, atk: 7, def: 4, xp: 22, gold: 18, drops: [{id: 'zombie_eye', chance: 0.35}] }
    ],
    area_2: [
      { name: 'Forest Ent', emoji: '🌳', hp: 45, atk: 12, def: 6, xp: 32, gold: 26, drops: [{id: 'wood_epic', chance: 0.35}, {id: 'apple', chance: 0.4}] },
      { name: 'Sneaky Fox', emoji: '🦊', hp: 38, atk: 15, def: 5, xp: 30, gold: 24, drops: [{id: 'fox_tail', chance: 0.35}] },
      { name: 'Giant Viper', emoji: '🐍', hp: 48, atk: 18, def: 7, xp: 36, gold: 30, drops: [{id: 'snake_fang', chance: 0.3}, {id: 'crate_uncommon', chance: 0.12}] }
    ],
    area_3: [
      { name: 'Cave Ogre', emoji: '👹', hp: 70, atk: 22, def: 12, xp: 52, gold: 44, drops: [{id: 'ogre_club_piece', chance: 0.35}] },
      { name: 'Crystal Bat', emoji: '🦇', hp: 55, atk: 25, def: 9, xp: 48, gold: 40, drops: [{id: 'bat_wing', chance: 0.4}, {id: 'ruby', chance: 0.15}] },
      { name: 'Deep Crawler', emoji: '🕷️', hp: 65, atk: 24, def: 11, xp: 50, gold: 42, drops: [{id: 'spider_silk', chance: 0.35}] }
    ],
    area_4: [
      { name: 'Snow Drake', emoji: '🐲', hp: 95, atk: 34, def: 18, xp: 78, gold: 65, drops: [{id: 'ice_scale', chance: 0.3}, {id: 'crate_rare', chance: 0.12}] },
      { name: 'Yeti Berserker', emoji: '🦍', hp: 125, atk: 38, def: 22, xp: 95, gold: 80, drops: [{id: 'yeti_horn', chance: 0.3}] },
      { name: 'Frost Elemental', emoji: '❄️', hp: 105, atk: 42, def: 16, xp: 88, gold: 74, drops: [{id: 'ice_crystal', chance: 0.35}] }
    ],
    area_5: [
      { name: 'Toxic Hydra', emoji: '🐍', hp: 140, atk: 48, def: 25, xp: 125, gold: 110, drops: [{id: 'hydra_scale', chance: 0.3}] },
      { name: 'Swamp Witch', emoji: '🧙', hp: 120, atk: 55, def: 20, xp: 118, gold: 105, drops: [{id: 'unicorn_horn', chance: 0.25}, {id: 'banana', chance: 0.4}] },
      { name: 'Corrupted Siren', emoji: '🧜', hp: 135, atk: 52, def: 22, xp: 122, gold: 108, drops: [{id: 'siren_hair', chance: 0.25}] }
    ],
    area_6: [
      { name: 'Fire Wyrm', emoji: '🐉', hp: 180, atk: 66, def: 32, xp: 170, gold: 155, drops: [{id: 'fire_scale', chance: 0.25}, {id: 'crate_epic', chance: 0.1}] },
      { name: 'Magma Golem', emoji: '🔥', hp: 220, atk: 60, def: 42, xp: 185, gold: 170, drops: [{id: 'magma_core', chance: 0.25}] },
      { name: 'Inferno Demon', emoji: '😈', hp: 190, atk: 72, def: 30, xp: 178, gold: 160, drops: [{id: 'demon_heart', chance: 0.2}] }
    ],
    area_7: [
      { name: 'Cyber Sentinel', emoji: '🤖', hp: 240, atk: 84, def: 44, xp: 235, gold: 215, drops: [{id: 'robot_chip', chance: 0.25}] },
      { name: 'Void Android', emoji: '🦾', hp: 260, atk: 88, def: 48, xp: 255, gold: 235, drops: [{id: 'cyber_alloy', chance: 0.22}] },
      { name: 'Nano Drone Swarm', emoji: '🛸', hp: 220, atk: 95, def: 38, xp: 240, gold: 220, drops: [{id: 'crate_edgy', chance: 0.1}] }
    ],
    area_8: [
      { name: 'Archon Guardian', emoji: '⚔️', hp: 320, atk: 105, def: 58, xp: 330, gold: 300, drops: [{id: 'celestial_feather', chance: 0.2}] },
      { name: 'Holy Seraphim', emoji: '👼', hp: 300, atk: 115, def: 52, xp: 340, gold: 310, drops: [{id: 'divine_starlight', chance: 0.18}] },
      { name: 'Astral Unicorn', emoji: '🦄', hp: 340, atk: 100, def: 64, xp: 350, gold: 320, drops: [{id: 'astral_horn', chance: 0.18}] }
    ],
    area_9: [
      { name: 'Time Weaver', emoji: '⏳', hp: 420, atk: 130, def: 72, xp: 460, gold: 420, drops: [{id: 'chrono_dust', chance: 0.18}, {id: 'crate_omega', chance: 0.08}] },
      { name: 'Quantum Voidwalker', emoji: '🕳️', hp: 450, atk: 135, def: 75, xp: 490, gold: 450, drops: [{id: 'void_matter', chance: 0.16}] },
      { name: 'Entropy Fiend', emoji: '👁️', hp: 480, atk: 140, def: 70, xp: 520, gold: 480, drops: [{id: 'entropy_shard', chance: 0.15}] }
    ],
    area_10: [
      { name: 'Nexus Titan Prime', emoji: '🌌', hp: 600, atk: 165, def: 95, xp: 750, gold: 700, drops: [{id: 'nexus_essence', chance: 0.15}] },
      { name: 'Dimensional Devourer', emoji: '🐙', hp: 650, atk: 175, def: 90, xp: 820, gold: 770, drops: [{id: 'reality_tear', chance: 0.12}] },
      { name: 'Nexus Sovereign', emoji: '👑', hp: 750, atk: 190, def: 105, xp: 950, gold: 900, drops: [{id: 'crate_godly', chance: 0.06}, {id: 'nexus_core', chance: 0.1}] }
    ]
  };

  const DUNGEON_BOSSES = {
    area_1: { name: 'Alpha Dire Wolf', emoji: '🐺', hp: 120, atk: 16, def: 8, xp: 100, gold: 75, drops: [{id: 'd1_relic', chance: 1.0}] },
    area_2: { name: 'Corrupted Treant Sovereign', emoji: '🌳', hp: 200, atk: 26, def: 16, xp: 190, gold: 140, drops: [{id: 'd2_relic', chance: 1.0}] },
    area_3: { name: 'Cave King Golem', emoji: '🗿', hp: 320, atk: 38, def: 24, xp: 320, gold: 240, drops: [{id: 'd3_relic', chance: 1.0}] },
    area_4: { name: 'Ancient Glacial Wyrm', emoji: '🐲', hp: 460, atk: 52, def: 34, xp: 480, gold: 380, drops: [{id: 'd4_relic', chance: 1.0}] },
    area_5: { name: 'Abyssal Hydra Queen', emoji: '🐍', hp: 620, atk: 68, def: 42, xp: 680, gold: 550, drops: [{id: 'd5_relic', chance: 1.0}] },
    area_6: { name: 'Infernus Molten Lord', emoji: '👹', hp: 800, atk: 86, def: 54, xp: 920, gold: 780, drops: [{id: 'd6_relic', chance: 1.0}] },
    area_7: { name: 'Omega Mecha Titan', emoji: '🤖', hp: 1050, atk: 108, def: 68, xp: 1250, gold: 1050, drops: [{id: 'd7_relic', chance: 1.0}] },
    area_8: { name: 'Fallen Archangel Prime', emoji: '👼', hp: 1350, atk: 130, def: 84, xp: 1650, gold: 1400, drops: [{id: 'd8_relic', chance: 1.0}] },
    area_9: { name: 'Chrono Time Overlord', emoji: '⏳', hp: 1750, atk: 160, def: 105, xp: 2200, gold: 1900, drops: [{id: 'd9_relic', chance: 1.0}] },
    area_10: { name: 'The Nexus Singularity Sovereign', emoji: '👑', hp: 2500, atk: 210, def: 135, xp: 3500, gold: 3000, drops: [{id: 'd10_relic', chance: 1.0}] }
  };

  const ITEMS = {
    wood_normie: { name: 'Normie Wood', emoji: '🪵', type: 'material', desc: 'Kayu pohon standar hasil logging', sellPrice: 2 },
    wood_epic: { name: 'Epic Wood', emoji: '🪵', type: 'material', desc: 'Kayu langka berkilau alami', sellPrice: 10 },
    wood_super: { name: 'Super Wood', emoji: '🪵', type: 'material', desc: 'Kayu bermuatan mana hutan purba', sellPrice: 40 },
    wood_mega: { name: 'Mega Wood', emoji: '🪵', type: 'material', desc: 'Kayu keras tak tertembus kapak', sellPrice: 150 },
    wood_hyper: { name: 'Hyper Wood', emoji: '🪵', type: 'material', desc: 'Kayu kosmik berdenyut starlight', sellPrice: 500 },

    fish_normie: { name: 'Normie Fish', emoji: '🐟', type: 'material', desc: 'Ikan sungai air tawar segar', sellPrice: 3 },
    fish_golden: { name: 'Golden Fish', emoji: '🐠', type: 'material', desc: 'Ikan emas berkilau langka', sellPrice: 15 },
    fish_epic: { name: 'Epic Fish', emoji: '🐡', type: 'material', desc: 'Ikan laut dalam sarat energi', sellPrice: 60 },
    fish_super: { name: 'Super Fish', emoji: '🦈', type: 'material', desc: 'Predator laut bersisik baja', sellPrice: 200 },

    apple: { name: 'Apple', emoji: '🍎', type: 'consumable', desc: 'Memulihkan 30 HP', effect: { type: 'heal', value: 30 }, sellPrice: 4, buyPrice: 8 },
    banana: { name: 'Banana', emoji: '🍌', type: 'consumable', desc: 'Memulihkan 75 HP', effect: { type: 'heal', value: 75 }, sellPrice: 12, buyPrice: 25 },
    ruby: { name: 'Ruby', emoji: '💎', type: 'material', desc: 'Permata merah untuk bahan elite', sellPrice: 100 },
    diamond: { name: 'Diamond', emoji: '💠', type: 'material', desc: 'Berlian murni legendaris', sellPrice: 350 },

    wolf_pelt: { name: 'Wolf Pelt', emoji: '🐺', type: 'material', desc: 'Kulit serigala tebal', sellPrice: 6 },
    goblin_ear: { name: 'Goblin Ear', emoji: '👂', type: 'material', desc: 'Telinga goblin pemburu', sellPrice: 5 },
    zombie_eye: { name: 'Zombie Eye', emoji: '👁️', type: 'material', desc: 'Mata mayat hidup beracun', sellPrice: 8 },
    fox_tail: { name: 'Fox Tail', emoji: '🦊', type: 'material', desc: 'Bulu ekor rubah halus', sellPrice: 14 },
    snake_fang: { name: 'Snake Fang', emoji: '🐍', type: 'material', desc: 'Taring ular berbisa', sellPrice: 16 },
    ogre_club_piece: { name: 'Ogre Club Fragment', emoji: '🦴', type: 'material', desc: 'Patahan gada tulang ogre', sellPrice: 22 },
    bat_wing: { name: 'Bat Wing', emoji: '🦇', type: 'material', desc: 'Sayap kelelawar gua', sellPrice: 12 },
    spider_silk: { name: 'Spider Silk', emoji: '🕸️', type: 'material', desc: 'Sutra laba-laba sekuat baja', sellPrice: 20 },
    ice_scale: { name: 'Ice Scale', emoji: '❄️', type: 'material', desc: 'Sisik naga es bersuhu minus', sellPrice: 35 },
    yeti_horn: { name: 'Yeti Horn', emoji: '🦏', type: 'material', desc: 'Tanduk yeti raksasa', sellPrice: 42 },
    ice_crystal: { name: 'Ice Crystal', emoji: '💠', type: 'material', desc: 'Kristal es abadi glasial', sellPrice: 40 },
    hydra_scale: { name: 'Hydra Scale', emoji: '🐍', type: 'material', desc: 'Sisik hydra dengan regenerasi', sellPrice: 50 },
    unicorn_horn: { name: 'Unicorn Horn', emoji: '🦄', type: 'material', desc: 'Tanduk suci unicorn pembawa berkah', sellPrice: 65 },
    siren_hair: { name: 'Siren Hair', emoji: '🧜', type: 'material', desc: 'Rambut siren pemikat samudra', sellPrice: 60 },
    fire_scale: { name: 'Fire Scale', emoji: '🔥', type: 'material', desc: 'Sisik berapi tahan magma', sellPrice: 85 },
    magma_core: { name: 'Magma Core', emoji: '🟠', type: 'material', desc: 'Inti api cair tanah kawah', sellPrice: 100 },
    demon_heart: { name: 'Demon Heart', emoji: '🖤', type: 'material', desc: 'Jantung iblis jurang api', sellPrice: 120 },
    robot_chip: { name: 'Cyber Chip', emoji: '💾', type: 'material', desc: 'Mikroprosesor quantum masa depan', sellPrice: 135 },
    cyber_alloy: { name: 'Cyber Alloy', emoji: '⚙️', type: 'material', desc: 'Baja komposit pelindung mecha', sellPrice: 150 },
    celestial_feather: { name: 'Celestial Feather', emoji: '🪶', type: 'material', desc: 'Bulu malaikat pelindung langit', sellPrice: 220 },
    divine_starlight: { name: 'Divine Starlight', emoji: '⭐', type: 'material', desc: 'Cahaya murni bintang galaksi', sellPrice: 250 },
    astral_horn: { name: 'Astral Horn', emoji: '✨', type: 'material', desc: 'Tanduk konstelasi rasi bintang', sellPrice: 280 },
    chrono_dust: { name: 'Chrono Dust', emoji: '⏳', type: 'material', desc: 'Debu pengatur putaran waktu', sellPrice: 350 },
    void_matter: { name: 'Void Matter', emoji: '🕳️', type: 'material', desc: 'Materi gelap ruang hampa', sellPrice: 400 },
    entropy_shard: { name: 'Entropy Shard', emoji: '🔮', type: 'material', desc: 'Pecahan singularitas waktu', sellPrice: 450 },
    nexus_essence: { name: 'Nexus Essence', emoji: '🌀', type: 'material', desc: 'Energi murni pembentuk multiverse', sellPrice: 600 },
    reality_tear: { name: 'Reality Tear', emoji: '🌌', type: 'material', desc: 'Serat pembungkus dimensi', sellPrice: 750 },
    nexus_core: { name: 'Nexus Heart', emoji: '❤️‍🔥', type: 'material', desc: 'Inti jantung dari seluruh realitas', sellPrice: 1000 },

    d1_relic: { name: 'Alpha Crest', emoji: '🐺', type: 'material', desc: 'Piala Boss Dungeon 1', sellPrice: 100 },
    d2_relic: { name: 'Treant Heartwood', emoji: '💚', type: 'material', desc: 'Piala Boss Dungeon 2', sellPrice: 200 },
    d3_relic: { name: 'Ogre Crown', emoji: '👑', type: 'material', desc: 'Piala Boss Dungeon 3', sellPrice: 350 },
    d4_relic: { name: 'Frost Drake Eye', emoji: '👁️', type: 'material', desc: 'Piala Boss Dungeon 4', sellPrice: 550 },
    d5_relic: { name: 'Siren Diadem', emoji: '🔱', type: 'material', desc: 'Piala Boss Dungeon 5', sellPrice: 800 },
    d6_relic: { name: 'Infernus Gem', emoji: '🔴', type: 'material', desc: 'Piala Boss Dungeon 6', sellPrice: 1150 },
    d7_relic: { name: 'Quantum Core', emoji: '💠', type: 'material', desc: 'Piala Boss Dungeon 7', sellPrice: 1600 },
    d8_relic: { name: 'Divine Halo', emoji: '😇', type: 'material', desc: 'Piala Boss Dungeon 8', sellPrice: 2200 },
    d9_relic: { name: 'Timeless Hourglass', emoji: '⌛', type: 'material', desc: 'Piala Boss Dungeon 9', sellPrice: 3000 },
    d10_relic: { name: 'Nexus Omnipotent Crown', emoji: '👑', type: 'material', desc: 'Piala Puncak Dungeon 10', sellPrice: 5000 },

    crate_common: { name: 'Common Crate', emoji: '📦', type: 'crate', desc: 'Berisi Kayu, Ikan, dan Gold', buyPrice: 40, sellPrice: 20 },
    crate_uncommon: { name: 'Uncommon Crate', emoji: '📦', type: 'crate', desc: 'Berisi Apel, Pelts, dan Ekstra Gold', buyPrice: 100, sellPrice: 50 },
    crate_rare: { name: 'Rare Crate', emoji: '🎁', type: 'crate', desc: 'Berisi Ruby, Super Wood, Golden Fish', buyPrice: 300, sellPrice: 150 },
    crate_epic: { name: 'Epic Crate', emoji: '🎁', type: 'crate', desc: 'Berisi Diamond, Mega Wood, Boss Relic', buyPrice: 800, sellPrice: 400 },
    crate_edgy: { name: 'EDGY Crate', emoji: '🧰', type: 'crate', desc: 'Peti elite berisi tumpukan material berharga', buyPrice: 2000, sellPrice: 1000 },
    crate_omega: { name: 'OMEGA Crate', emoji: '🧰', type: 'crate', desc: 'Peti mitos berisi Hyper Wood dan Void Matter', buyPrice: 5000, sellPrice: 2500 },
    crate_godly: { name: 'GODLY Crate', emoji: '✨', type: 'crate', desc: 'Peti ilahi berisi bahan senjata tertinggi', buyPrice: 12000, sellPrice: 6000 },

    potion_small: { name: 'Small Life Potion', emoji: '🧪', type: 'consumable', desc: 'Memulihkan 45 HP', effect: { type: 'heal', value: 45 }, buyPrice: 20, sellPrice: 10 },
    potion_medium: { name: 'Medium Life Potion', emoji: '🧪', type: 'consumable', desc: 'Memulihkan 140 HP', effect: { type: 'heal', value: 140 }, buyPrice: 60, sellPrice: 30 },
    potion_large: { name: 'Large Life Potion', emoji: '🧪', type: 'consumable', desc: 'Memulihkan 350 HP', effect: { type: 'heal', value: 350 }, buyPrice: 150, sellPrice: 75 },
    potion_mega: { name: 'Full Restore Elixir', emoji: '🧪', type: 'consumable', desc: 'Memulihkan HP hingga 100%', effect: { type: 'heal_full', value: 9999 }, buyPrice: 400, sellPrice: 200 },
    elixir_atk: { name: 'Dragon Might Elixir', emoji: '⚗️', type: 'consumable', desc: '+50% ATK untuk 4 ronde pertarungan', effect: { type: 'buff_atk', value: 1.5, battles: 4 }, buyPrice: 120, sellPrice: 60 },
    elixir_def: { name: 'Stone Skin Elixir', emoji: '⚗️', type: 'consumable', desc: '+50% DEF untuk 4 ronde pertarungan', effect: { type: 'buff_def', value: 1.5, battles: 4 }, buyPrice: 120, sellPrice: 60 },

    wooden_sword: { name: 'Wooden Sword', emoji: '🗡️', type: 'weapon', desc: 'Pedang latihan kayu standar', stats: { atk: 6 }, buyPrice: 0, sellPrice: 5 },
    fish_sword: { name: 'Fish Sword', emoji: '🐟', type: 'weapon', desc: 'Pedang ikan bau tapi tajam', stats: { atk: 14, crit: 2 }, craftRecipe: { fish_normie: 5, wood_normie: 5 } },
    iron_sword: { name: 'Iron Broadsword', emoji: '⚔️', type: 'weapon', desc: 'Pedang baja prajurit tangguh', stats: { atk: 22 }, buyPrice: 80, sellPrice: 40 },
    wolf_katana: { name: 'Wolf Katana', emoji: '🐺', type: 'weapon', desc: 'Katana berbalut taring serigala alfa', stats: { atk: 35, crit: 4 }, craftRecipe: { d1_relic: 1, wolf_pelt: 5, wood_epic: 3 } },
    enchanted_blade: { name: 'Enchanted Claymore', emoji: '🔮', type: 'weapon', desc: 'Pedang bercahaya rune kuno', stats: { atk: 55, crit: 6 }, craftRecipe: { d2_relic: 1, wood_super: 4, ruby: 2 } },
    frost_halberd: { name: 'Frost Halberd', emoji: '❄️', type: 'weapon', desc: 'Tombak pembeku armor lawan', stats: { atk: 80, crit: 8 }, craftRecipe: { d4_relic: 1, ice_crystal: 4, diamond: 1 } },
    edgy_blade: { name: 'EDGY Scythe', emoji: '🖤', type: 'weapon', desc: 'Sabit legendaris penembus kutukan', stats: { atk: 125, crit: 10 }, craftRecipe: { d5_relic: 1, siren_hair: 5, wood_mega: 4 } },
    ultra_edgy_blade: { name: 'ULTRA-EDGY Greatsword', emoji: '🔥', type: 'weapon', desc: 'Pedang raksasa pemotong api naga', stats: { atk: 180, crit: 12 }, craftRecipe: { d6_relic: 1, magma_core: 4, wood_mega: 8 } },
    omega_laser_blade: { name: 'OMEGA Cyber Blade', emoji: '⚡', type: 'weapon', desc: 'Pedang laser frekuensi tinggi', stats: { atk: 260, crit: 15 }, craftRecipe: { d7_relic: 1, robot_chip: 6, wood_hyper: 4 } },
    godly_celestial_blade: { name: 'GODLY Solar Edge', emoji: '⭐', type: 'weapon', desc: 'Senjata berkekuatan ledakan supernova', stats: { atk: 380, crit: 20 }, craftRecipe: { d8_relic: 1, divine_starlight: 5, wood_hyper: 8 } },
    nexus_prime_blade: { name: 'NEXUS OMNI SLICER', emoji: '🌀', type: 'weapon', desc: 'Senjata pemotong serat antar-dimensi', stats: { atk: 550, crit: 28 }, craftRecipe: { d10_relic: 1, nexus_core: 2, reality_tear: 3, wood_hyper: 15 } },

    cloth_armor: { name: 'Cloth Tunic', emoji: '👕', type: 'armor', desc: 'Pakaian kain pengelana', stats: { def: 4, maxHp: 0 }, buyPrice: 0, sellPrice: 3 },
    fish_armor: { name: 'Fish Scale Vest', emoji: '🐟', type: 'armor', desc: 'Rompi jahit sisik ikan sungai', stats: { def: 10, maxHp: 30 }, craftRecipe: { fish_normie: 6, wood_normie: 4 } },
    iron_plate: { name: 'Iron Plate Armor', emoji: '🛡️', type: 'armor', desc: 'Baju zirah pelat besi tempa', stats: { def: 18, maxHp: 65 }, buyPrice: 100, sellPrice: 50 },
    wolf_fur_mantle: { name: 'Alpha Fur Mantle', emoji: '🐺', type: 'armor', desc: 'Mantel bulu serigala pelindung dada', stats: { def: 30, maxHp: 120 }, craftRecipe: { d1_relic: 1, wolf_pelt: 6, fish_golden: 2 } },
    ogre_stone_plate: { name: 'Ogre Carved Plate', emoji: '🗿', type: 'armor', desc: 'Zirah batu kokoh tahan hantaman', stats: { def: 52, maxHp: 220 }, craftRecipe: { d3_relic: 1, ogre_club_piece: 4, fish_epic: 2 } },
    edgy_armor: { name: 'EDGY Cuirass', emoji: '🖤', type: 'armor', desc: 'Zirah hitam penahan racun mematikan', stats: { def: 85, maxHp: 380 }, craftRecipe: { d5_relic: 1, hydra_scale: 5, fish_super: 3 } },
    ultra_edgy_armor: { name: 'ULTRA-EDGY Aegis', emoji: '🔥', type: 'armor', desc: 'Perisai dada penangkal semburan lahar', stats: { def: 130, maxHp: 600 }, craftRecipe: { d6_relic: 1, fire_scale: 5, fish_super: 6 } },
    omega_force_armor: { name: 'OMEGA Energy Shield', emoji: '⚡', type: 'armor', desc: 'Zirah berbalut kubah energi pelindung', stats: { def: 195, maxHp: 950 }, craftRecipe: { d7_relic: 1, cyber_alloy: 6, fish_super: 10 } },
    godly_aegis: { name: 'GODLY Seraph Mantle', emoji: '⭐', type: 'armor', desc: 'Mantel suci diberkahi cahaya para malaikat', stats: { def: 280, maxHp: 1500 }, craftRecipe: { d8_relic: 1, celestial_feather: 6, diamond: 5 } },
    nexus_prime_armor: { name: 'NEXUS COSMIC MANTLE', emoji: '🌀', type: 'armor', desc: 'Baju zirah pelindung absolut multiverse', stats: { def: 420, maxHp: 2500 }, craftRecipe: { d10_relic: 1, nexus_essence: 3, reality_tear: 3, wood_hyper: 10 } },

    ring_wood: { name: 'Wooden Luck Ring', emoji: '💍', type: 'accessory', desc: 'Cincin kayu pembawa keberuntungan', stats: { crit: 2 }, buyPrice: 40, sellPrice: 20 },
    ring_ruby: { name: 'Ruby Power Ring', emoji: '💍', type: 'accessory', desc: 'Cincin permata penambah serangan', stats: { crit: 5, atk: 12 }, buyPrice: 250, sellPrice: 125 },
    talisman_siren: { name: 'Siren Pearl Talisman', emoji: '📿', type: 'accessory', desc: 'Jimat mutiara laut dalam', stats: { crit: 8, atk: 25, def: 15, maxHp: 150 }, craftRecipe: { d5_relic: 1, ruby: 3, fish_epic: 4 } },
    chrono_amulet: { name: 'Chrono Time Amulet', emoji: '⏳', type: 'accessory', desc: 'Jimat pembengkok waktu tempur', stats: { crit: 15, atk: 55, def: 35, maxHp: 400 }, craftRecipe: { d9_relic: 1, chrono_dust: 4, diamond: 3 } },
    nexus_infinity_ring: { name: 'NEXUS INFINITY ORB', emoji: '🌀', type: 'accessory', desc: 'Artefak mutlak penguasa realitas', stats: { crit: 25, atk: 100, def: 75, maxHp: 800 }, craftRecipe: { d10_relic: 1, nexus_core: 1, nexus_essence: 2 } }
  };

  const SKILLS = [
    { id: 'power_strike', name: 'Power Strike', emoji: '💪', desc: 'Menghasilkan 150% damage tebasan', levelReq: 3, mult: 1.5 },
    { id: 'shield_block', name: 'Shield Block', emoji: '🛡️', desc: 'Menangkis 50% serangan lawan', levelReq: 5, defType: true },
    { id: 'heal_light', name: 'Heal Light', emoji: '💚', desc: 'Otomatis pulihkan 25% HP saat kritis', levelReq: 8, healType: true },
    { id: 'fire_slash', name: 'Fire Slash', emoji: '🔥', desc: 'Serangan api 200% damage', levelReq: 12, mult: 2.0 },
    { id: 'thunder_strike', name: 'Thunder Strike', emoji: '⚡', desc: 'Tebasan petir 250% damage', levelReq: 20, mult: 2.5 },
    { id: 'mystic_shield', name: 'Mystic Shield', emoji: '🔮', desc: 'Kebal total dari 1 serangan musuh', levelReq: 30, absorbType: true },
    { id: 'dragon_fury', name: 'Dragon Fury', emoji: '🐉', desc: 'Auman naga 350% kehancuran', levelReq: 45, mult: 3.5 },
    { id: 'chrono_warp', name: 'Chrono Warp Strike', emoji: '⏳', desc: 'Tebasan beruntun waktu 500% damage', levelReq: 65, mult: 5.0 },
    { id: 'nexus_blast', name: 'Nexus Omni Blast', emoji: '🌀', desc: 'Ledakan singularitas 800% omni damage', levelReq: 85, mult: 8.0 }
  ];

  /* ============================================================
     2. STATE & DUAL-LAYER STORAGE
     ============================================================ */
  const DEFAULT_STATE = {
    characterName: '',
    level: 1,
    xp: 0,
    xpToNext: 100,
    hp: 100,
    maxHp: 100,
    baseAtk: 10,
    baseDef: 5,
    baseCrit: 5,
    gold: 150,
    currentArea: 'area_1',
    inventory: {
      wood_normie: 10,
      fish_normie: 10,
      apple: 5,
      crate_common: 2
    },
    equipment: {
      weapon: 'wooden_sword',
      armor: 'cloth_armor',
      accessory: null
    },
    enchants: {
      weapon: null,
      armor: null
    },
    rewards: {
      dailyClaimedAt: 0,
      weeklyClaimedAt: 0
    },
    skills: [],
    stats: {
      monstersKilled: 0,
      bossesKilled: 0,
      chopsCount: 0,
      fishCount: 0,
      cratesOpened: 0,
      totalDamageDealt: 0,
      deaths: 0,
      goldEarned: 150
    },
    buffs: {
      atkMultiplier: 1,
      defMultiplier: 1,
      battlesLeft: 0
    },
    cooldowns: {
      hunt: 0,
      adventure: 0,
      dungeon: 0,
      heal: 0,
      chop: 0,
      fish: 0
    }
  };

  let state = JSON.parse(JSON.stringify(DEFAULT_STATE));
  let authToken = localStorage.getItem('nexus_auth_token') || null;
  let activeUsername = localStorage.getItem('nexus_username') || null;

  /* ============================================================
     3. STATS & MATH
     ============================================================ */
  function getComputedStats() {
    let atk = state.baseAtk;
    let def = state.baseDef;
    let maxHp = state.maxHp;
    let crit = state.baseCrit;

    const eqW = ITEMS[state.equipment.weapon];
    const eqA = ITEMS[state.equipment.armor];
    const eqAcc = ITEMS[state.equipment.accessory];

    if (eqW && eqW.stats) {
      if (eqW.stats.atk) atk += eqW.stats.atk;
      if (eqW.stats.crit) crit += eqW.stats.crit;
    }
    if (eqA && eqA.stats) {
      if (eqA.stats.def) def += eqA.stats.def;
      if (eqA.stats.maxHp) maxHp += eqA.stats.maxHp;
    }
    if (eqAcc && eqAcc.stats) {
      if (eqAcc.stats.atk) atk += eqAcc.stats.atk;
      if (eqAcc.stats.def) def += eqAcc.stats.def;
      if (eqAcc.stats.maxHp) maxHp += eqAcc.stats.maxHp;
      if (eqAcc.stats.crit) crit += eqAcc.stats.crit;
    }

    // Apply Enchantment Multipliers & Perks
    if (state.enchants) {
      if (state.enchants.weapon) {
        const wEnc = state.enchants.weapon;
        atk = Math.floor(atk * (1 + (wEnc.bonus || 0) / 100));
        if (wEnc.flatAtk) atk += wEnc.flatAtk;
        if (wEnc.critBonus) crit += wEnc.critBonus;
      }
      if (state.enchants.armor) {
        const aEnc = state.enchants.armor;
        def = Math.floor(def * (1 + (aEnc.bonus || 0) / 100));
        if (aEnc.flatDef) def += aEnc.flatDef;
        if (aEnc.maxHpBonus) maxHp += aEnc.maxHpBonus;
      }
    }

    if (state.buffs && state.buffs.battlesLeft > 0) {
      atk = Math.floor(atk * (state.buffs.atkMultiplier || 1));
      def = Math.floor(def * (state.buffs.defMultiplier || 1));
    }

    return { atk, def, maxHp, crit: Math.min(75, Math.max(5, crit)) };
  }

  function getXpForLevel(lvl) {
    return Math.floor(100 * Math.pow(1.18, lvl - 1));
  }

  function checkLevelUp() {
    let leveled = false;
    while (state.xp >= state.xpToNext) {
      state.xp -= state.xpToNext;
      state.level += 1;
      state.xpToNext = getXpForLevel(state.level);
      state.baseAtk += 4;
      state.baseDef += 3;
      state.maxHp += 25;
      state.baseCrit = Math.min(35, state.baseCrit + 0.4);

      const computed = getComputedStats();
      state.hp = computed.maxHp;
      leveled = true;

      addLog(`✨ <strong>LEVEL UP!</strong> Anda mencapai <strong>Level ${state.level}</strong>! Status melonjak & HP pulih!`, 'levelup');

      SKILLS.forEach(s => {
        if (state.level >= s.levelReq && !state.skills.includes(s.id)) {
          state.skills.push(s.id);
          addLog(`⭐ <strong>Skill Baru:</strong> ${s.emoji} <strong>${s.name}</strong> (${s.desc})!`, 'system');
        }
      });

      const unlockedAreas = AREAS.filter(a => state.level >= a.levelReq);
      const latestArea = unlockedAreas[unlockedAreas.length - 1];
      if (latestArea && latestArea.id !== state.currentArea) {
        state.currentArea = latestArea.id;
        addLog(`🗺️ <strong>Zona Baru Terbuka:</strong> ${latestArea.emoji} <strong>${latestArea.name}</strong>!`, 'system');
      }
    }

    if (leveled) {
      updateUI();
      autoSaveInstant();
    }
  }

  function calculateDamage(attackerAtk, defenderDef, isCrit) {
    const baseDmg = Math.max(2, attackerAtk - Math.max(0, defenderDef) * 0.45);
    const variance = 0.85 + Math.random() * 0.3;
    let dmg = Math.floor(baseDmg * variance);
    if (isCrit) dmg = Math.floor(dmg * 1.85);
    return Math.max(1, dmg);
  }

  /* ============================================================
     4. UI RENDER & AUTO-SAVE INSTAN
     ============================================================ */
  function updateUI() {
    const stats = getComputedStats();
    if (state.hp > stats.maxHp) state.hp = stats.maxHp;
    const hpPct = Math.max(0, Math.min(100, (state.hp / stats.maxHp) * 100));
    const xpPct = Math.max(0, Math.min(100, (state.xp / state.xpToNext) * 100));

    const name = state.characterName || activeUsername || 'Hero';
    const areaObj = AREAS.find(a => a.id === state.currentArea) || AREAS[0];
    const bossObj = DUNGEON_BOSSES[state.currentArea] || { name: 'Unknown Boss', emoji: '👾' };

    // Header & Gold
    document.getElementById('char-name').textContent = name;
    document.getElementById('char-level').textContent = state.level;
    document.getElementById('gold-display').textContent = Number(state.gold).toLocaleString();

    // Desktop Sidebar Elements
    if (document.getElementById('side-char-name')) {
      document.getElementById('side-char-name').textContent = name;
      document.getElementById('side-area-name').textContent = areaObj.name.split(':')[0];
      document.getElementById('side-hp-text').textContent = `${Math.max(0, state.hp)}/${stats.maxHp}`;
      document.getElementById('side-hp-bar').style.width = `${hpPct}%`;
      document.getElementById('side-xp-text').textContent = `${state.xp}/${state.xpToNext}`;
      document.getElementById('side-xp-bar').style.width = `${xpPct}%`;
      document.getElementById('side-stat-atk').textContent = stats.atk;
      document.getElementById('side-stat-def').textContent = stats.def;
      document.getElementById('side-stat-crit').textContent = `${stats.crit.toFixed(1)}%`;
      document.getElementById('side-gold').textContent = Number(state.gold).toLocaleString();

      const wItem = ITEMS[state.equipment.weapon];
      const aItem = ITEMS[state.equipment.armor];
      const accItem = ITEMS[state.equipment.accessory];
      const wEnc = state.enchants?.weapon;
      const aEnc = state.enchants?.armor;
      document.getElementById('side-weapon').textContent = wItem ? `${wItem.emoji} ${wItem.name}${wEnc ? ` [${wEnc.tier} +${wEnc.bonus}%]` : ''}` : 'None';
      document.getElementById('side-armor').textContent = aItem ? `${aItem.emoji} ${aItem.name}${aEnc ? ` [${aEnc.tier} +${aEnc.bonus}%]` : ''}` : 'None';
      document.getElementById('side-accessory').textContent = accItem ? `${accItem.emoji} ${accItem.name}` : 'None';
    }

    // Mobile Mini Elements
    if (document.getElementById('mob-hp-text')) {
      document.getElementById('mob-hp-text').textContent = `${Math.max(0, state.hp)}/${stats.maxHp}`;
      document.getElementById('mob-hp-bar').style.width = `${hpPct}%`;
      document.getElementById('mob-xp-text').textContent = `${state.xp}/${state.xpToNext}`;
      document.getElementById('mob-xp-bar').style.width = `${xpPct}%`;
      document.getElementById('mob-atk').textContent = stats.atk;
      document.getElementById('mob-def').textContent = stats.def;
      document.getElementById('mob-area').textContent = areaObj.name.split(':')[0];
    }

    // Profile Tab Elements
    if (document.getElementById('prof-char-name')) {
      document.getElementById('prof-char-name').textContent = name;
      document.getElementById('prof-level').textContent = state.level;
      document.getElementById('prof-gold').textContent = Number(state.gold).toLocaleString();
      document.getElementById('prof-area').textContent = `${areaObj.emoji} ${areaObj.name}`;
      document.getElementById('prof-area-desc').textContent = areaObj.desc;
      document.getElementById('prof-boss-name').textContent = `${bossObj.emoji} ${bossObj.name}`;

      document.getElementById('stat-m-kills').textContent = state.stats.monstersKilled || 0;
      document.getElementById('stat-b-kills').textContent = state.stats.bossesKilled || 0;
      document.getElementById('stat-dmg').textContent = Number(state.stats.totalDamageDealt || 0).toLocaleString();
      document.getElementById('stat-deaths').textContent = state.stats.deaths || 0;
      document.getElementById('stat-chops').textContent = state.stats.chopsCount || 0;
      document.getElementById('stat-fish').textContent = state.stats.fishCount || 0;
      document.getElementById('stat-crates').textContent = state.stats.cratesOpened || 0;
      document.getElementById('stat-earned').textContent = Number(state.stats.goldEarned || 0).toLocaleString();
    }
  }

  function addLog(msg, type = 'system') {
    const div = document.createElement('div');
    div.className = `log-entry ${type}`;
    div.innerHTML = msg;
    const feed = document.getElementById('game-log');
    if (feed) {
      feed.insertBefore(div, feed.firstChild);
      while (feed.children.length > 70) {
        feed.removeChild(feed.lastChild);
      }
    }
  }

  function showToast(msg) {
    const t = document.getElementById('toast');
    if (!t) return;
    t.textContent = msg;
    t.classList.add('show');
    clearTimeout(t._timer);
    t._timer = setTimeout(() => t.classList.remove('show'), 2200);
  }

  function autoSaveInstant() {
    if (activeUsername) {
      localStorage.setItem(`nexus_save_${activeUsername}`, JSON.stringify(state));
    }
    if (authToken) {
      fetch('/api/save', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${authToken}`
        },
        body: JSON.stringify({ gameState: state })
      }).catch(() => {});
    }
  }

  function checkCooldown(actionKey, ms) {
    const now = Date.now();
    const readyAt = state.cooldowns[actionKey] || 0;
    if (now < readyAt) {
      const waitSec = Math.ceil((readyAt - now) / 1000);
      showToast(`⏳ Cooldown ${actionKey.toUpperCase()}: tunggu ${waitSec}s`);
      return false;
    }
    state.cooldowns[actionKey] = now + ms;
    return true;
  }

  /* ============================================================
     5. COMBAT & EXPEDITIONS (CARD-BASED VISUAL CLASH)
     ============================================================ */
  function executeBattle(monster, isBoss = false) {
    const pStats = getComputedStats();
    let mHp = monster.hp;
    let pHp = state.hp;
    let round = 1;
    let absorbedHit = false;
    let vampHealed = 0;

    const unlocked = state.skills.map(id => SKILLS.find(s => s.id === id)).filter(Boolean);
    const offensiveSkills = unlocked.filter(s => s.mult);
    const hasShieldBlock = state.skills.includes('shield_block');
    const hasHealLight = state.skills.includes('heal_light');
    const hasMysticShield = state.skills.includes('mystic_shield');

    while (mHp > 0 && pHp > 0 && round <= 14) {
      let skillUsed = null;
      let dmgMult = 1.0;
      if (offensiveSkills.length > 0 && Math.random() < 0.38) {
        skillUsed = offensiveSkills[Math.floor(Math.random() * offensiveSkills.length)];
        dmgMult = skillUsed.mult;
      }

      const isCrit = Math.random() * 100 < pStats.crit;
      let rawDmg = calculateDamage(pStats.atk, monster.def, isCrit);
      let pDmg = Math.floor(rawDmg * dmgMult);

      mHp -= pDmg;
      state.stats.totalDamageDealt += pDmg;

      // Lifesteal Perk from Enchant
      if (state.enchants?.weapon?.lifesteal) {
        const healAmt = Math.max(1, Math.floor(pDmg * state.enchants.weapon.lifesteal));
        vampHealed += healAmt;
        pHp = Math.min(pStats.maxHp, pHp + healAmt);
      }

      if (mHp <= 0) break;

      if (hasHealLight && pHp < pStats.maxHp * 0.3 && Math.random() < 0.6) {
        const healAmt = Math.floor(pStats.maxHp * 0.25);
        pHp = Math.min(pStats.maxHp, pHp + healAmt);
      }

      let mDmg = calculateDamage(monster.atk, pStats.def, false);
      if (state.enchants?.armor?.dodge && Math.random() < state.enchants.armor.dodge) {
        mDmg = 0;
      } else if (hasMysticShield && !absorbedHit && Math.random() < 0.45) {
        absorbedHit = true;
        mDmg = 0;
      } else if (hasShieldBlock && Math.random() < 0.4) {
        mDmg = Math.floor(mDmg * 0.5);
      }

      // Thorns Reflect from Armor Enchant
      if (state.enchants?.armor?.reflect && mDmg > 0) {
        mHp -= Math.max(1, Math.floor(mDmg * state.enchants.armor.reflect));
      }

      pHp -= mDmg;
      round++;
    }

    state.hp = Math.max(0, pHp);

    if (state.buffs && state.buffs.battlesLeft > 0) {
      state.buffs.battlesLeft -= 1;
      if (state.buffs.battlesLeft === 0) {
        state.buffs.atkMultiplier = 1;
        state.buffs.defMultiplier = 1;
      }
    }

    if (mHp <= 0) {
      let earnedGold = Math.floor(monster.gold * (1 + Math.random() * 0.3));
      if (state.enchants?.weapon?.goldBonus) {
        earnedGold = Math.floor(earnedGold * (1 + state.enchants.weapon.goldBonus));
      }
      const earnedXp = monster.xp;
      state.gold += earnedGold;
      state.xp += earnedXp;
      state.stats.goldEarned += earnedGold;

      if (isBoss) state.stats.bossesKilled += 1;
      else state.stats.monstersKilled += 1;

      let dropsEarned = [];
      if (monster.drops && monster.drops.length > 0) {
        monster.drops.forEach(drop => {
          if (Math.random() < drop.chance) {
            state.inventory[drop.id] = (state.inventory[drop.id] || 0) + 1;
            const item = ITEMS[drop.id];
            dropsEarned.push(item ? `${item.emoji} ${item.name}` : drop.id);
          }
        });
      }

      const dropPills = dropsEarned.map(d => `<span class="reward-tag drop">🎁 ${d}</span>`).join(' ');
      const vampPill = vampHealed > 0 ? `<span class="reward-tag perk">🩸 +${vampHealed} HP Lifesteal</span>` : '';

      const cardHtml = `
        <div class="combat-card-result victory">
          <div class="combat-card-header">
            <span class="combat-badge victory">${isBoss ? '👑 BOSS SLAIN' : '⚔️ VICTORY'}</span>
            <span class="combat-enemy-title">${monster.emoji} ${monster.name}</span>
          </div>
          <div class="combat-clash-row">
            <div class="clash-side">
              <div class="clash-icon">🧙‍♂️</div>
              <div class="clash-meta">
                <span class="clash-name">${state.characterName || 'Hero'}</span>
                <span class="clash-hp">❤️ ${pHp}/${pStats.maxHp} HP</span>
              </div>
            </div>
            <div class="clash-vs">VS</div>
            <div class="clash-side">
              <div class="clash-icon">${monster.emoji}</div>
              <div class="clash-meta">
                <span class="clash-name">${monster.name}</span>
                <span class="clash-hp" style="color:var(--text-sub)">☠️ KO</span>
              </div>
            </div>
          </div>
          <div class="combat-rewards-pill">
            <span class="reward-tag gold">💰 +${earnedGold} Gold</span>
            <span class="reward-tag exp">⭐ +${earnedXp} EXP</span>
            ${dropPills}
            ${vampPill}
          </div>
        </div>
      `;

      addLog(cardHtml, isBoss ? 'victory' : 'combat');
      checkLevelUp();
      return true;
    } else {
      state.stats.deaths += 1;
      const cardHtml = `
        <div class="combat-card-result defeat">
          <div class="combat-card-header">
            <span class="combat-badge defeat">💀 DEFEATED</span>
            <span class="combat-enemy-title">${monster.emoji} ${monster.name}</span>
          </div>
          <div class="combat-clash-row">
            <div class="clash-side">
              <div class="clash-icon">🧙‍♂️</div>
              <div class="clash-meta">
                <span class="clash-name">${state.characterName || 'Hero'}</span>
                <span class="clash-hp" style="color:var(--accent-red)">💀 0 HP</span>
              </div>
            </div>
            <div class="clash-vs">VS</div>
            <div class="clash-side">
              <div class="clash-icon">${monster.emoji}</div>
              <div class="clash-meta">
                <span class="clash-name">${monster.name}</span>
                <span class="clash-hp">❤️ ${Math.max(1, mHp)} HP</span>
              </div>
            </div>
          </div>
          <div class="combat-rewards-pill">
            <span class="reward-tag" style="background:rgba(255,71,109,0.2); color:var(--accent-red)">❤️ HP Habis - Gunakan Heal!</span>
          </div>
        </div>
      `;
      addLog(cardHtml, 'danger');
      return false;
    }
  }

  function handleHunt() {
    if (!checkCooldown('hunt', 2000)) return;
    if (state.hp <= 0) { showToast('💀 Anda pingsan! Gunakan ❤️ Heal terlebih dahulu.'); return; }

    const areaMonsters = MONSTERS[state.currentArea] || MONSTERS.area_1;
    const monster = areaMonsters[Math.floor(Math.random() * areaMonsters.length)];

    executeBattle(monster, false);
    updateUI();
    autoSaveInstant();
  }

  function handleAdventure() {
    if (!checkCooldown('adventure', 5000)) return;
    if (state.hp <= 0) { showToast('💀 Anda pingsan! Pulihkan diri dengan ❤️ Heal.'); return; }

    openModal('🗺️ Destinasi Ekspedisi Adventure', () => {
      const available = AREAS.filter(a => state.level >= a.levelReq);
      return `
        <p style="margin-bottom:12px; color:var(--text-sub); font-size:12px;">Ekspedisi 3 ronde pertempuran beruntun dengan bonus +50% EXP dan Gold!</p>
        <div class="shop-grid">
          ${available.map(a => `
            <div class="item-card">
              <div class="item-name">${a.emoji} ${a.name}</div>
              <div class="item-desc">${a.desc}</div>
              <div class="item-stats">Syarat: Lv.${a.levelReq}</div>
              <button class="glow-button" style="margin-top:8px; padding:8px;" onclick="window.NexusRPG.startAdventure('${a.id}')">Mulai Ekspedisi</button>
            </div>
          `).join('')}
        </div>
      `;
    });
  }

  function startAdventure(areaId) {
    closeModal();
    const area = AREAS.find(a => a.id === areaId);
    if (!area) return;

    const areaMonsters = MONSTERS[areaId] || MONSTERS.area_1;
    const stages = 3;
    let allWon = true;

    addLog(`🚀 <strong>EKSPEDISI DIMULAI:</strong> Menjelajahi ${area.emoji} <strong>${area.name}</strong> (3 Ronde)...`, 'system');

    for (let i = 1; i <= stages; i++) {
      if (state.hp <= 0) { allWon = false; break; }
      const m = areaMonsters[Math.floor(Math.random() * areaMonsters.length)];
      addLog(`📍 <strong>Ronde ${i}/${stages}:</strong> Pertempuran garis depan...`, 'system');
      const won = executeBattle(m, false);
      if (!won) { allWon = false; break; }
      const pStats = getComputedStats();
      const restHeal = Math.floor(pStats.maxHp * 0.15);
      state.hp = Math.min(pStats.maxHp, state.hp + restHeal);
    }

    if (allWon) {
      const bonusGold = Math.floor(area.levelReq * 40 + 60);
      const bonusXp = Math.floor(area.levelReq * 50 + 80);
      state.gold += bonusGold;
      state.xp += bonusXp;
      addLog(`🎉 <strong>EKSPEDISI DITAKLUKKAN!</strong> Sukses di ${area.name}! Bonus: <strong>+${bonusXp} EXP</strong>, <strong>+${bonusGold} 💰</strong>.`, 'victory');
      checkLevelUp();
    }

    updateUI();
    autoSaveInstant();
  }

  function handleDungeon() {
    if (!checkCooldown('dungeon', 8000)) return;
    if (state.hp <= 0) { showToast('💀 Anda pingsan! Pulihkan HP Anda.'); return; }

    const boss = DUNGEON_BOSSES[state.currentArea];
    if (!boss) { showToast('Tidak ada dungeon di area ini.'); return; }

    addLog(`🏰 <strong>DUNGEON LAIR DIBUKA!</strong> Membangkitkan: <strong>${boss.emoji} ${boss.name}</strong>!`, 'combat');
    executeBattle(boss, true);
    updateUI();
    autoSaveInstant();
  }

  function handleHeal() {
    if (!checkCooldown('heal', 2000)) return;
    const stats = getComputedStats();
    if (state.hp >= stats.maxHp) { showToast('✨ Darah Anda sudah penuh 100%!'); return; }

    const isDead = state.hp <= 0;
    const cost = isDead ? (35 + state.level * 4) : Math.max(10, Math.floor((stats.maxHp - state.hp) * 0.4));

    if (state.gold < cost) { showToast(`❌ Gold tidak cukup! Perlu ${cost} 💰`); return; }

    state.gold -= cost;
    state.hp = stats.maxHp;
    showToast(`❤️ Darah pulih maksimal! (-${cost} 💰)`);
    addLog(`❤️ <strong>Divine Sanctuary:</strong> Sinar suci memulihkan Anda ke <strong>${stats.maxHp}/${stats.maxHp} HP</strong>! Biaya: ${cost} 💰.`, 'heal');

    updateUI();
    autoSaveInstant();
  }

  function handleChop() {
    if (!checkCooldown('chop', 3000)) return;
    if (state.hp <= 0) { showToast('💀 Anda pingsan! Gunakan ❤️ Heal dulu.'); return; }

    state.stats.chopsCount += 1;
    const baseWood = Math.floor(Math.random() * 6) + 3;
    state.inventory.wood_normie = (state.inventory.wood_normie || 0) + baseWood;

    let bonusLog = [];
    if (Math.random() < 0.35) {
      state.inventory.wood_epic = (state.inventory.wood_epic || 0) + 1;
      bonusLog.push(`🪵 <strong>Epic Wood x1</strong>`);
    }
    if (Math.random() < 0.25) {
      state.inventory.apple = (state.inventory.apple || 0) + 1;
      bonusLog.push(`🍎 <strong>Apple x1</strong>`);
    }
    if (Math.random() < 0.1) {
      state.inventory.wood_super = (state.inventory.wood_super || 0) + 1;
      bonusLog.push(`🪵 <strong>Super Wood x1</strong>`);
    }
    if (Math.random() < 0.08) {
      state.inventory.crate_common = (state.inventory.crate_common || 0) + 1;
      bonusLog.push(`📦 <strong>Common Crate x1</strong>`);
    }

    const xpEarned = 12 + state.level * 2;
    state.xp += xpEarned;

    let msg = `🪓 <strong>LOGGING PANEN:</strong> Menebang kayu di hutan!<br>Hasil: 🪵 <strong>Normie Wood x${baseWood}</strong>, +${xpEarned} EXP.`;
    if (bonusLog.length > 0) msg += `<br>Hadiah Bonus: ${bonusLog.join(', ')}!`;

    addLog(msg, 'loot');
    checkLevelUp();
    updateUI();
    autoSaveInstant();
  }

  function handleFish() {
    if (!checkCooldown('fish', 3000)) return;
    if (state.hp <= 0) { showToast('💀 Anda pingsan! Gunakan ❤️ Heal dulu.'); return; }

    state.stats.fishCount += 1;
    const baseFish = Math.floor(Math.random() * 5) + 3;
    state.inventory.fish_normie = (state.inventory.fish_normie || 0) + baseFish;

    let bonusLog = [];
    if (Math.random() < 0.3) {
      state.inventory.fish_golden = (state.inventory.fish_golden || 0) + 1;
      bonusLog.push(`🐠 <strong>Golden Fish x1</strong>`);
    }
    if (Math.random() < 0.12) {
      state.inventory.fish_epic = (state.inventory.fish_epic || 0) + 1;
      bonusLog.push(`🐡 <strong>Epic Fish x1</strong>`);
    }
    if (Math.random() < 0.15) {
      state.inventory.ruby = (state.inventory.ruby || 0) + 1;
      bonusLog.push(`💎 <strong>Ruby x1</strong>`);
    }
    if (Math.random() < 0.08) {
      state.inventory.crate_common = (state.inventory.crate_common || 0) + 1;
      bonusLog.push(`📦 <strong>Common Crate x1</strong>`);
    }

    const xpEarned = 12 + state.level * 2;
    state.xp += xpEarned;

    let msg = `🎣 <strong>MEMANCING:</strong> Menjaring ikan di aliran sungai kosmik!<br>Tangkapan: 🐟 <strong>Normie Fish x${baseFish}</strong>, +${xpEarned} EXP.`;
    if (bonusLog.length > 0) msg += `<br>Ikan Langka: ${bonusLog.join(', ')}!`;

    addLog(msg, 'loot');
    checkLevelUp();
    updateUI();
    autoSaveInstant();
  }

  /* ============================================================
     6. GAMBLING CASINO (JUDI KOIN & FREE-TEXT BETTING)
     ============================================================ */
  function parseBet(rawStr) {
    if (!rawStr) return 0;
    let clean = String(rawStr).trim().toLowerCase().replace(/,/g, '').replace(/\s+/g, '');
    let mult = 1;
    if (clean.endsWith('k')) {
      mult = 1000;
      clean = clean.slice(0, -1);
    } else if (clean.endsWith('m')) {
      mult = 1000000;
      clean = clean.slice(0, -1);
    }
    const val = Number(clean);
    if (isNaN(val) || val <= 0) return 0;
    return Math.floor(val * mult);
  }

  function adjustBet(game, action) {
    const inputEl = document.getElementById(`bet-${game}`);
    if (!inputEl) return;
    let current = parseBet(inputEl.value) || 0;
    const maxGold = Math.max(0, state.gold);

    if (action === 'min') {
      current = Math.min(10, maxGold);
    } else if (action === '+50') {
      current = Math.min(current + 50, maxGold);
    } else if (action === '+100') {
      current = Math.min(current + 100, maxGold);
    } else if (action === '+500') {
      current = Math.min(current + 500, maxGold);
    } else if (action === 'half') {
      current = Math.max(10, Math.floor(current / 2));
    } else if (action === 'double') {
      current = Math.min(Math.max(10, current * 2), maxGold);
    } else if (action === 'max') {
      current = maxGold;
    }
    inputEl.value = current;
  }

  function playCoinflip(playerChoice) {
    const betInput = document.getElementById('bet-coinflip');
    const bet = parseBet(betInput ? betInput.value : 0);
    if (bet <= 0) {
      showToast(currentLang === 'en' ? 'Invalid bet amount!' : 'Jumlah taruhan tidak valid!');
      return;
    }
    if (state.gold < bet) {
      showToast(currentLang === 'en' ? '❌ Not enough gold!' : '❌ Gold tidak cukup!');
      return;
    }

    state.gold -= bet;
    const result = Math.random() < 0.5 ? 'heads' : 'tails';
    const isWin = playerChoice === result;
    const label = result === 'heads' 
      ? (currentLang === 'en' ? '🪙 Heads' : '🪙 Kepala')
      : (currentLang === 'en' ? '🪙 Tails' : '🪙 Ekor');

    if (isWin) {
      const winGain = bet * 2;
      state.gold += winGain;
      if (currentLang === 'en') {
        addLog(`🪙 <strong>COINFLIP VICTORY!</strong> Landed on ${label}! You won <strong>+${winGain} 💰</strong>!`, 'victory');
        showToast(`Won +${winGain} Gold!`);
      } else {
        addLog(`🪙 <strong>COINFLIP MENANG!</strong> Koin mendarat di ${label}! Anda menang <strong>+${winGain} 💰</strong>!`, 'victory');
        showToast(`Menang +${winGain} Gold!`);
      }
    } else {
      if (currentLang === 'en') {
        addLog(`🪙 <strong>COINFLIP LOSS:</strong> Landed on ${label}. You lost <strong>-${bet} 💰</strong>.`, 'danger');
        showToast(`Lost -${bet} Gold!`);
      } else {
        addLog(`🪙 <strong>COINFLIP KALAH!</strong> Koin mendarat di ${label}. Anda kehilangan <strong>-${bet} 💰</strong>.`, 'danger');
        showToast(`Kalah -${bet} Gold!`);
      }
    }

    updateUI();
    autoSaveInstant();
  }

  function playSlots() {
    const betInput = document.getElementById('bet-slot');
    const bet = parseBet(betInput ? betInput.value : 0);
    if (bet <= 0) {
      showToast(currentLang === 'en' ? 'Invalid bet amount!' : 'Jumlah taruhan tidak valid!');
      return;
    }
    if (state.gold < bet) {
      showToast(currentLang === 'en' ? '❌ Not enough gold!' : '❌ Gold tidak cukup!');
      return;
    }

    state.gold -= bet;
    const symbols = ['🍒', '💎', '🔔', '🍇', '⭐', '7️⃣'];
    const r1 = symbols[Math.floor(Math.random() * symbols.length)];
    const r2 = symbols[Math.floor(Math.random() * symbols.length)];
    const r3 = symbols[Math.floor(Math.random() * symbols.length)];

    const reelEl = document.getElementById('slot-reels');
    if (reelEl) reelEl.textContent = `${r1} | ${r2} | ${r3}`;

    if (r1 === r2 && r2 === r3) {
      // 3 of a kind = 10x jackpot
      const winGain = bet * 10;
      state.gold += winGain;
      if (currentLang === 'en') {
        addLog(`🎰 <strong>SUPER JACKPOT 10X!</strong> [ ${r1} | ${r2} | ${r3} ] Hit the jackpot <strong>+${winGain} 💰</strong>!`, 'victory');
        showToast(`🎉 JACKPOT 10X! +${winGain} Gold!`);
      } else {
        addLog(`🎰 <strong>JACKPOT SUPER 10X!</strong> [ ${r1} | ${r2} | ${r3} ] Menang telak <strong>+${winGain} 💰</strong>!`, 'victory');
        showToast(`🎉 JACKPOT 10X! +${winGain} Gold!`);
      }
    } else if (r1 === r2 || r2 === r3 || r1 === r3) {
      // 2 of a kind = 3x
      const winGain = bet * 3;
      state.gold += winGain;
      if (currentLang === 'en') {
        addLog(`🎰 <strong>SLOT 3X WIN!</strong> [ ${r1} | ${r2} | ${r3} ] Won <strong>+${winGain} 💰</strong>!`, 'victory');
        showToast(`Won 3x! +${winGain} Gold!`);
      } else {
        addLog(`🎰 <strong>SLOT MENANG 3X!</strong> [ ${r1} | ${r2} | ${r3} ] Menang <strong>+${winGain} 💰</strong>!`, 'victory');
        showToast(`Menang 3x! +${winGain} Gold!`);
      }
    } else {
      if (currentLang === 'en') {
        addLog(`🎰 <strong>SLOT LOSS:</strong> [ ${r1} | ${r2} | ${r3} ] Lost <strong>-${bet} 💰</strong>.`, 'danger');
        showToast(`Lost -${bet} Gold!`);
      } else {
        addLog(`🎰 <strong>SLOT GAGAL:</strong> [ ${r1} | ${r2} | ${r3} ] Kehilangan <strong>-${bet} 💰</strong>.`, 'danger');
        showToast(`Kalah -${bet} Gold!`);
      }
    }

    updateUI();
    autoSaveInstant();
  }

  function playDice() {
    const betInput = document.getElementById('bet-dice');
    const bet = parseBet(betInput ? betInput.value : 0);
    if (bet <= 0) {
      showToast(currentLang === 'en' ? 'Invalid bet amount!' : 'Jumlah taruhan tidak valid!');
      return;
    }
    if (state.gold < bet) {
      showToast(currentLang === 'en' ? '❌ Not enough gold!' : '❌ Gold tidak cukup!');
      return;
    }

    state.gold -= bet;
    const playerDice = Math.floor(Math.random() * 6) + 1 + Math.floor(Math.random() * 6) + 1;
    const houseDice = Math.floor(Math.random() * 6) + 1 + Math.floor(Math.random() * 6) + 1;

    if (playerDice > houseDice) {
      const winGain = Math.floor(bet * 2.5);
      state.gold += winGain;
      if (currentLang === 'en') {
        addLog(`🎲 <strong>DICE VICTORY!</strong> You [${playerDice}] vs House [${houseDice}]. Won <strong>+${winGain} 💰</strong>!`, 'victory');
        showToast(`Won +${winGain} Gold!`);
      } else {
        addLog(`🎲 <strong>DADU MENANG!</strong> Anda [${playerDice}] vs Bandar [${houseDice}]. Menang <strong>+${winGain} 💰</strong>!`, 'victory');
        showToast(`Menang +${winGain} Gold!`);
      }
    } else if (playerDice === houseDice) {
      state.gold += bet; // Draw, refund
      if (currentLang === 'en') {
        addLog(`🎲 <strong>DICE DRAW!</strong> You [${playerDice}] vs House [${houseDice}]. Bet refunded.`, 'system');
        showToast(`Draw! Bet refunded.`);
      } else {
        addLog(`🎲 <strong>DADU IMBANG!</strong> Anda [${playerDice}] vs Bandar [${houseDice}]. Koin taruhan dikembalikan.`, 'system');
        showToast(`Imbang! Koin kembali.`);
      }
    } else {
      if (currentLang === 'en') {
        addLog(`🎲 <strong>DICE LOSS:</strong> You [${playerDice}] vs House [${houseDice}]. Lost <strong>-${bet} 💰</strong>.`, 'danger');
        showToast(`Lost -${bet} Gold!`);
      } else {
        addLog(`🎲 <strong>DADU KALAH!</strong> Anda [${playerDice}] vs Bandar [${houseDice}]. Kehilangan <strong>-${bet} 💰</strong>.`, 'danger');
        showToast(`Kalah -${bet} Gold!`);
      }
    }

    updateUI();
    autoSaveInstant();
  }

  /* ============================================================
     7. MULTIPLAYER SOCIAL (TEMAN, LEADERBOARD, TRANSFER KOIN)
     ============================================================ */
  function openSocialModal() {
    const modal = document.getElementById('social-modal');
    if (modal) modal.style.display = 'flex';
    loadSocialData();
  }

  function closeSocialModal() {
    const modal = document.getElementById('social-modal');
    if (modal) modal.style.display = 'none';
  }

  async function loadSocialData() {
    // 1. Leaderboard
    try {
      const res = await fetch('/api/players');
      const data = await res.json();
      const lbCont = document.getElementById('leaderboard-container');
      if (lbCont && data.success) {
        if (data.players.length === 0) {
          lbCont.innerHTML = `<p style="color:var(--text-sub); font-size:12px;">Belum ada pemain lain.</p>`;
        } else {
          lbCont.innerHTML = data.players.map((p, idx) => `
            <div class="player-row">
              <div class="player-info-left">
                <span class="player-rank">#${idx + 1}</span>
                <span>🧙‍♂️ <strong>${p.characterName || p.username}</strong> (@${p.username})</span>
                <span style="color:var(--accent-gold); font-size:11px;">Lv.${p.level}</span>
              </div>
              <div>
                <span style="color:var(--accent-gold); font-weight:bold; margin-right:8px;">${Number(p.gold).toLocaleString()} 💰</span>
                <button class="quick-send-btn" onclick="window.NexusRPG.quickFillTransfer('${p.username}')">Kirim Koin</button>
              </div>
            </div>
          `).join('');
        }
      }
    } catch {}

    // 2. Friends
    try {
      const fRes = await fetch('/api/friends', {
        headers: { 'Authorization': `Bearer ${authToken}` }
      });
      const fData = await fRes.json();
      const fCont = document.getElementById('friend-list-container');
      if (fCont && fData.success) {
        if (fData.friends.length === 0) {
          fCont.innerHTML = `<p style="color:var(--text-sub); font-size:12px;">Belum ada teman. Tambahkan teman menggunakan username di atas!</p>`;
        } else {
          fCont.innerHTML = fData.friends.map(f => `
            <div class="player-row">
              <div class="player-info-left">
                <span>🌟 <strong>${f.characterName || f.username}</strong> (@${f.username})</span>
                <span style="color:var(--accent-gold); font-size:11px;">Lv.${f.level}</span>
              </div>
              <div>
                <button class="quick-send-btn" onclick="window.NexusRPG.quickFillTransfer('${f.username}')">Transfer Koin 💰</button>
              </div>
            </div>
          `).join('');
        }
      }
    } catch {}
  }

  async function addFriend() {
    const input = document.getElementById('add-friend-input');
    const target = (input ? input.value : '').trim();
    if (!target) { showToast('Ketik username yang ingin ditambahkan!'); return; }

    try {
      const res = await fetch('/api/friends/add', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${authToken}`
        },
        body: JSON.stringify({ targetUsername: target })
      });
      const data = await res.json();
      if (data.success) {
        showToast(data.message);
        if (input) input.value = '';
        loadSocialData();
      } else {
        showToast(`❌ ${data.error}`);
      }
    } catch {
      showToast('Gagal menambahkan teman');
    }
  }

  function quickFillTransfer(targetUser) {
    const tInput = document.getElementById('transfer-target');
    if (tInput) tInput.value = targetUser;
    const aInput = document.getElementById('transfer-amount');
    if (aInput) aInput.focus();
  }

  async function sendCoin() {
    const targetInput = document.getElementById('transfer-target');
    const amountInput = document.getElementById('transfer-amount');
    const target = (targetInput ? targetInput.value : '').trim();
    const amount = Math.floor(Number(amountInput ? amountInput.value : 0));

    if (!target) { showToast('Masukkan username penerima!'); return; }
    if (isNaN(amount) || amount <= 0) { showToast('Jumlah koin tidak valid!'); return; }
    if (state.gold < amount) { showToast('❌ Saldo Gold Anda tidak cukup!'); return; }

    try {
      const res = await fetch('/api/transfer', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${authToken}`
        },
        body: JSON.stringify({ recipient: target, amount })
      });
      const data = await res.json();
      if (data.success) {
        state.gold = data.remainingGold;
        updateUI();
        autoSaveInstant();
        showToast(`Berhasil kirim ${amount} 💰 ke @${target}!`);
        addLog(`💸 <strong>TRANSFER KOIN:</strong> Mengirim <strong>${amount} 💰</strong> kepada <strong>@${target}</strong>.`, 'loot');
        if (targetInput) targetInput.value = '';
        if (amountInput) amountInput.value = '';
        loadSocialData();
      } else {
        showToast(`❌ ${data.error}`);
      }
    } catch {
      showToast('Gagal melakukan transfer koin');
    }
  }

  /* ============================================================
     8. CRATES, SHOP, CRAFT, TRADE MODALS
     ============================================================ */
  function openModal(title, renderFn) {
    const m = document.getElementById('modal');
    document.getElementById('modal-title').textContent = title;
    document.getElementById('modal-body').innerHTML = renderFn();
    m.style.display = 'flex';
  }

  function closeModal() {
    const m = document.getElementById('modal');
    if (m) m.style.display = 'none';
  }

  function showCratesModal() {
    openModal('📦 Buka Peti Hadiah (Lootbox)', () => {
      const crateKeys = ['crate_common', 'crate_uncommon', 'crate_rare', 'crate_epic', 'crate_edgy', 'crate_omega', 'crate_godly'];
      const myCrates = crateKeys.filter(k => state.inventory[k] > 0);

      if (myCrates.length === 0) {
        return `<p style="text-align:center; padding:20px; color:var(--text-sub); font-size:12px;">Tidak ada peti hadiah di tas Anda. Dapatkan dari berburu monster, panen kayu, atau beli di Toko!</p>`;
      }

      return `
        <div class="shop-grid">
          ${myCrates.map(id => {
            const item = ITEMS[id];
            const qty = state.inventory[id];
            return `
              <div class="item-card">
                <div class="item-name">${item.emoji} ${item.name} <span style="font-size:12px; opacity:0.8">(x${qty})</span></div>
                <div class="item-desc">${item.desc}</div>
                <button class="glow-button" style="margin-top:8px; padding:8px;" onclick="window.NexusRPG.openCrate('${id}')">🎁 Buka Peti Ini</button>
              </div>
            `;
          }).join('')}
        </div>
      `;
    });
  }

  function openCrate(crateId) {
    if (!state.inventory[crateId] || state.inventory[crateId] <= 0) return;
    state.inventory[crateId] -= 1;
    if (state.inventory[crateId] <= 0) delete state.inventory[crateId];

    state.stats.cratesOpened += 1;
    let gainedGold = 0;
    let gainedXp = 0;
    let itemsGained = [];

    if (crateId === 'crate_common') {
      gainedGold = Math.floor(Math.random() * 50) + 30;
      gainedXp = 40;
      state.inventory.wood_normie = (state.inventory.wood_normie || 0) + 8;
      state.inventory.fish_normie = (state.inventory.fish_normie || 0) + 8;
      itemsGained.push('🪵 Normie Wood x8', '🐟 Normie Fish x8');
    } else if (crateId === 'crate_uncommon') {
      gainedGold = Math.floor(Math.random() * 120) + 80;
      gainedXp = 100;
      state.inventory.wood_epic = (state.inventory.wood_epic || 0) + 3;
      state.inventory.apple = (state.inventory.apple || 0) + 4;
      itemsGained.push('🪵 Epic Wood x3', '🍎 Apple x4');
    } else if (crateId === 'crate_rare') {
      gainedGold = Math.floor(Math.random() * 300) + 200;
      gainedXp = 250;
      state.inventory.wood_super = (state.inventory.wood_super || 0) + 3;
      state.inventory.fish_golden = (state.inventory.fish_golden || 0) + 4;
      state.inventory.ruby = (state.inventory.ruby || 0) + 2;
      itemsGained.push('🪵 Super Wood x3', '🐠 Golden Fish x4', '💎 Ruby x2');
    } else if (crateId === 'crate_epic') {
      gainedGold = Math.floor(Math.random() * 800) + 500;
      gainedXp = 600;
      state.inventory.wood_mega = (state.inventory.wood_mega || 0) + 3;
      state.inventory.diamond = (state.inventory.diamond || 0) + 2;
      state.inventory.fish_super = (state.inventory.fish_super || 0) + 3;
      itemsGained.push('🪵 Mega Wood x3', '💠 Diamond x2', '🦈 Super Fish x3');
    } else if (crateId === 'crate_edgy') {
      gainedGold = Math.floor(Math.random() * 2500) + 1500;
      gainedXp = 1500;
      state.inventory.wood_mega = (state.inventory.wood_mega || 0) + 8;
      state.inventory.fish_super = (state.inventory.fish_super || 0) + 8;
      state.inventory.d5_relic = (state.inventory.d5_relic || 0) + 1;
      itemsGained.push('🪵 Mega Wood x8', '🦈 Super Fish x8', '🔱 Siren Diadem x1');
    } else if (crateId === 'crate_omega') {
      gainedGold = Math.floor(Math.random() * 6000) + 4000;
      gainedXp = 3500;
      state.inventory.wood_hyper = (state.inventory.wood_hyper || 0) + 4;
      state.inventory.void_matter = (state.inventory.void_matter || 0) + 3;
      itemsGained.push('🪵 Hyper Wood x4', '🕳️ Void Matter x3');
    } else if (crateId === 'crate_godly') {
      gainedGold = Math.floor(Math.random() * 15000) + 10000;
      gainedXp = 8000;
      state.inventory.wood_hyper = (state.inventory.wood_hyper || 0) + 10;
      state.inventory.nexus_essence = (state.inventory.nexus_essence || 0) + 3;
      state.inventory.d10_relic = (state.inventory.d10_relic || 0) + 1;
      itemsGained.push('🪵 Hyper Wood x10', '🌀 Nexus Essence x3', '👑 Nexus Crown x1');
    }

    state.gold += gainedGold;
    state.xp += gainedXp;

    addLog(`🎁 <strong>PETI TERBUKA:</strong> ${ITEMS[crateId].name}!<br>Gold: +${gainedGold} 💰 | EXP: +${gainedXp}<br>Hadiah: ${itemsGained.join(', ')}`, 'victory');
    showToast(`Membuka ${ITEMS[crateId].name}!`);

    checkLevelUp();
    updateUI();
    autoSaveInstant();
    showCratesModal();
  }

  function showInventory() {
    openModal('🎒 Tas Hero & Perlengkapan (Inventory & Jual)', () => {
      const keys = Object.keys(state.inventory).filter(k => state.inventory[k] > 0);
      if (keys.length === 0) return `<p style="text-align:center; padding:20px; color:var(--text-sub);">Tas Anda kosong melompong.</p>`;

      return `
        <div class="inventory-grid">
          ${keys.map(itemId => {
            const item = ITEMS[itemId];
            if (!item) return '';
            const qty = state.inventory[itemId];
            const sellVal = item.sellPrice || 10;
            let actionBtn = '';

            if (item.type === 'consumable') {
              actionBtn = `
                <div class="inv-actions-row">
                  <button class="glow-button" style="padding:6px 10px;" onclick="window.NexusRPG.useItem('${itemId}')">Gunakan</button>
                  <button class="sub-btn btn-sell-item" style="padding:6px 10px;" onclick="window.NexusRPG.sellItem('${itemId}', 1)">💰 Jual (+${sellVal} 💰)</button>
                </div>
              `;
            } else if (item.type === 'crate') {
              actionBtn = `
                <div class="inv-actions-row">
                  <button class="glow-button" style="padding:6px 10px;" onclick="window.NexusRPG.openCrate('${itemId}')">Buka</button>
                  <button class="sub-btn btn-sell-item" style="padding:6px 10px;" onclick="window.NexusRPG.sellItem('${itemId}', 1)">💰 Jual (+${sellVal} 💰)</button>
                  ${qty > 1 ? `<button class="sub-btn btn-sell-item" style="padding:6px 10px;" onclick="window.NexusRPG.sellItem('${itemId}', ${qty})">Semua (+${sellVal * qty} 💰)</button>` : ''}
                </div>
              `;
            } else if (item.type === 'weapon' || item.type === 'armor' || item.type === 'accessory') {
              actionBtn = `
                <div class="inv-actions-row">
                  <button class="glow-button" style="padding:6px 10px;" onclick="window.NexusRPG.equipItem('${itemId}')">⚔️ Pakai</button>
                  <button class="sub-btn btn-sell-item" style="padding:6px 10px;" onclick="window.NexusRPG.sellItem('${itemId}', 1)">💰 Jual (+${sellVal} 💰)</button>
                </div>
              `;
            } else {
              actionBtn = `
                <div class="inv-actions-row">
                  <button class="sub-btn btn-sell-item" style="padding:6px 10px;" onclick="window.NexusRPG.sellItem('${itemId}', 1)">💰 Jual 1 (+${sellVal} 💰)</button>
                  ${qty > 1 ? `<button class="sub-btn btn-sell-item" style="padding:6px 10px;" onclick="window.NexusRPG.sellItem('${itemId}', ${qty})">Jual Semua (+${sellVal * qty} 💰)</button>` : ''}
                </div>
              `;
            }

            return `
              <div class="item-card">
                <div class="item-name">${item.emoji} ${item.name} <span style="font-size:11px; opacity:0.8;">(x${qty})</span></div>
                <div class="item-desc">${item.desc}</div>
                ${item.stats ? `<div class="item-stats">${formatStats(item.stats)}</div>` : ''}
                ${actionBtn}
              </div>
            `;
          }).join('')}
        </div>
      `;
    });
  }

  function formatStats(st) {
    let out = [];
    if (st.atk) out.push(`+${st.atk} ATK`);
    if (st.def) out.push(`+${st.def} DEF`);
    if (st.maxHp) out.push(`+${st.maxHp} HP`);
    if (st.crit) out.push(`+${st.crit}% CRIT`);
    return out.join(' | ');
  }

  function useItem(itemId) {
    const item = ITEMS[itemId];
    if (!item || !state.inventory[itemId] || state.inventory[itemId] <= 0) return;

    state.inventory[itemId] -= 1;
    if (state.inventory[itemId] <= 0) delete state.inventory[itemId];

    const pStats = getComputedStats();
    if (item.effect.type === 'heal') {
      state.hp = Math.min(pStats.maxHp, state.hp + item.effect.value);
      showToast(`Pulih +${item.effect.value} HP!`);
      addLog(`🧪 Menggunakan <strong>${item.name}</strong>: +${item.effect.value} HP.`, 'heal');
    } else if (item.effect.type === 'heal_full') {
      state.hp = pStats.maxHp;
      showToast(`Darah pulih penuh 100%!`);
      addLog(`🧪 Menggunakan <strong>${item.name}</strong>: Vitalitas kembali 100%!`, 'heal');
    } else if (item.effect.type === 'buff_atk') {
      state.buffs.atkMultiplier = item.effect.value;
      state.buffs.battlesLeft = item.effect.battles || 4;
      showToast(`+50% Serangan selama 4 ronde!`);
      addLog(`⚗️ Meminum <strong>${item.name}</strong>: +50% ATK untuk 4 ronde!`, 'system');
    } else if (item.effect.type === 'buff_def') {
      state.buffs.defMultiplier = item.effect.value;
      state.buffs.battlesLeft = item.effect.battles || 4;
      showToast(`+50% Pertahanan selama 4 ronde!`);
      addLog(`⚗️ Meminum <strong>${item.name}</strong>: +50% DEF untuk 4 ronde!`, 'system');
    }

    updateUI();
    autoSaveInstant();
    showInventory();
  }

  function equipItem(itemId) {
    const item = ITEMS[itemId];
    if (!item) return;

    const oldEquip = state.equipment[item.type];
    if (oldEquip) {
      state.inventory[oldEquip] = (state.inventory[oldEquip] || 0) + 1;
    }

    state.inventory[itemId] -= 1;
    if (state.inventory[itemId] <= 0) delete state.inventory[itemId];

    state.equipment[item.type] = itemId;
    showToast(`Memakai ${item.name}!`);
    addLog(`🛡️ Memakai <strong>${item.emoji} ${item.name}</strong>.`, 'system');

    updateUI();
    autoSaveInstant();
    showInventory();
  }

  function sellItem(itemId, count = 1) {
    const item = ITEMS[itemId];
    if (!item || !state.inventory[itemId] || state.inventory[itemId] < count) return;

    state.inventory[itemId] -= count;
    if (state.inventory[itemId] <= 0) delete state.inventory[itemId];

    const gain = (item.sellPrice || 5) * count;
    state.gold += gain;
    showToast(`Terjual seharga +${gain} 💰`);
    addLog(`💰 Menjual ${item.emoji} ${item.name} seharga <strong>+${gain} 💰</strong>.`, 'loot');

    updateUI();
    autoSaveInstant();
    showInventory();
  }

  function showShop() {
    const shopList = [
      'potion_small', 'potion_medium', 'potion_large', 'potion_mega',
      'elixir_atk', 'elixir_def',
      'crate_common', 'crate_uncommon', 'crate_rare', 'crate_epic',
      'iron_sword', 'iron_plate', 'ring_ruby'
    ];

    openModal('🛒 Toko Pasar Kosmik', () => {
      return `
        <div class="shop-grid">
          ${shopList.map(id => {
            const item = ITEMS[id];
            if (!item) return '';
            const canAfford = state.gold >= item.buyPrice;
            return `
              <div class="item-card">
                <div class="item-name">${item.emoji} ${item.name}</div>
                <div class="item-desc">${item.desc}</div>
                ${item.stats ? `<div class="item-stats">${formatStats(item.stats)}</div>` : ''}
                <div class="item-price">💰 ${item.buyPrice} Gold</div>
                <button ${canAfford ? '' : 'disabled'} class="glow-button" style="padding:6px;" onclick="window.NexusRPG.buyItem('${id}')">
                  ${canAfford ? 'Beli Sekarang' : 'Gold Kurang'}
                </button>
              </div>
            `;
          }).join('')}
        </div>
      `;
    });
  }

  function buyItem(itemId) {
    const item = ITEMS[itemId];
    if (!item || state.gold < item.buyPrice) { showToast('❌ Gold tidak cukup!'); return; }
    state.gold -= item.buyPrice;
    state.inventory[itemId] = (state.inventory[itemId] || 0) + 1;
    showToast(`Membeli ${item.name}!`);
    addLog(`🛒 Membeli <strong>${item.emoji} ${item.name}</strong> seharga ${item.buyPrice} 💰.`, 'system');

    updateUI();
    autoSaveInstant();
    showShop();
  }

  function showCraft() {
    openModal('🔨 Mystic Forge (Tempa Senjata & Zirah)', () => {
      const craftableKeys = Object.keys(ITEMS).filter(k => ITEMS[k].craftRecipe);

      return `
        <div class="craft-grid">
          ${craftableKeys.map(k => {
            const item = ITEMS[k];
            const recipe = item.craftRecipe;
            let canCraft = true;

            const ingredientsHtml = Object.keys(recipe).map(matId => {
              const reqQty = recipe[matId];
              const curQty = state.inventory[matId] || 0;
              const hasEnough = curQty >= reqQty;
              if (!hasEnough) canCraft = false;
              const matItem = ITEMS[matId];
              return `<span style="color: ${hasEnough ? 'var(--accent-green)' : 'var(--accent-red)'}">
                ${matItem ? matItem.emoji : ''} ${matItem ? matItem.name : matId}: ${curQty}/${reqQty}
              </span>`;
            }).join(' • ');

            return `
              <div class="item-card">
                <div class="item-name">${item.emoji} ${item.name}</div>
                <div class="item-desc">${item.desc}</div>
                ${item.stats ? `<div class="item-stats">${formatStats(item.stats)}</div>` : ''}
                <div style="font-size:11px; margin: 6px 0; background:rgba(0,0,0,0.3); padding:6px; border-radius:6px;">
                  ${ingredientsHtml}
                </div>
                <button ${canCraft ? '' : 'disabled'} class="glow-button" style="padding:6px;" onclick="window.NexusRPG.craftItem('${k}')">
                  ${canCraft ? '🔨 Tempa Sekarang' : 'Bahan Belum Cukup'}
                </button>
              </div>
            `;
          }).join('')}
        </div>
      `;
    });
  }

  function craftItem(itemId) {
    const item = ITEMS[itemId];
    if (!item || !item.craftRecipe) return;

    for (const matId of Object.keys(item.craftRecipe)) {
      const needed = item.craftRecipe[matId];
      if ((state.inventory[matId] || 0) < needed) {
        showToast('Bahan belum mencukupi!');
        return;
      }
    }

    for (const matId of Object.keys(item.craftRecipe)) {
      state.inventory[matId] -= item.craftRecipe[matId];
      if (state.inventory[matId] <= 0) delete state.inventory[matId];
    }

    state.inventory[itemId] = (state.inventory[itemId] || 0) + 1;
    showToast(`✨ Berhasil menempa ${item.name}!`);
    addLog(`🔨 <strong>FORGED:</strong> Menempa perlengkapan baru: <strong>${item.emoji} ${item.name}</strong>!`, 'victory');

    updateUI();
    autoSaveInstant();
    showCraft();
  }

  function showTradeModal() {
    openModal('⚖️ Pasar Penukaran Sumber Daya', () => {
      return `
        <p style="margin-bottom:12px; color:var(--text-sub); font-size:12px;">Tukar hasil panen kayu, ikan, dan permata:</p>
        <div class="shop-grid">
          <div class="item-card">
            <div class="item-name">🪵 Kayu ➔ 🐟 Ikan</div>
            <div class="item-desc">Tukar 10 Normie Wood jadi 10 Normie Fish</div>
            <div class="item-stats">Kayu Anda: ${state.inventory.wood_normie || 0}</div>
            <button class="glow-button" style="padding:6px; margin-top:6px;" onclick="window.NexusRPG.trade('wood_to_fish')">Tukar (10 Kayu)</button>
          </div>
          <div class="item-card">
            <div class="item-name">🐟 Ikan ➔ 🪵 Kayu</div>
            <div class="item-desc">Tukar 10 Normie Fish jadi 10 Normie Wood</div>
            <div class="item-stats">Ikan Anda: ${state.inventory.fish_normie || 0}</div>
            <button class="glow-button" style="padding:6px; margin-top:6px;" onclick="window.NexusRPG.trade('fish_to_wood')">Tukar (10 Ikan)</button>
          </div>
          <div class="item-card">
            <div class="item-name">🪵 10 Normie Wood ➔ 🪵 1 Epic Wood</div>
            <div class="item-desc">Gabungkan kayu menjadi kayu langka</div>
            <div class="item-stats">Kayu Anda: ${state.inventory.wood_normie || 0}</div>
            <button class="glow-button" style="padding:6px; margin-top:6px;" onclick="window.NexusRPG.trade('compress_wood')">Gabungkan Kayu</button>
          </div>
          <div class="item-card">
            <div class="item-name">🐟 10 Normie Fish ➔ 🐠 1 Golden Fish</div>
            <div class="item-desc">Tukar tangkapan menjadi ikan emas</div>
            <div class="item-stats">Ikan Anda: ${state.inventory.fish_normie || 0}</div>
            <button class="glow-button" style="padding:6px; margin-top:6px;" onclick="window.NexusRPG.trade('compress_fish')">Tukar Ikan Emas</button>
          </div>
          <div class="item-card">
            <div class="item-name">💎 1 Ruby ➔ 💰 100 Gold</div>
            <div class="item-desc">Jual permata ruby untuk gold</div>
            <div class="item-stats">Ruby Anda: ${state.inventory.ruby || 0}</div>
            <button class="glow-button" style="padding:6px; margin-top:6px;" onclick="window.NexusRPG.trade('ruby_to_gold')">Jual Ruby (+100 💰)</button>
          </div>
          <div class="item-card">
            <div class="item-name">💰 150 Gold ➔ 💎 1 Ruby</div>
            <div class="item-desc">Beli permata ruby untuk menempa</div>
            <div class="item-stats">Gold Anda: ${state.gold}</div>
            <button class="glow-button" style="padding:6px; margin-top:6px;" onclick="window.NexusRPG.trade('gold_to_ruby')">Beli Ruby (-150 💰)</button>
          </div>
        </div>
      `;
    });
  }

  function handleTrade(tradeType) {
    if (tradeType === 'wood_to_fish') {
      if ((state.inventory.wood_normie || 0) < 10) { showToast('Kurang 10 Normie Wood!'); return; }
      state.inventory.wood_normie -= 10;
      state.inventory.fish_normie = (state.inventory.fish_normie || 0) + 10;
      showToast('Menukar 10 Kayu menjadi 10 Ikan!');
    } else if (tradeType === 'fish_to_wood') {
      if ((state.inventory.fish_normie || 0) < 10) { showToast('Kurang 10 Normie Fish!'); return; }
      state.inventory.fish_normie -= 10;
      state.inventory.wood_normie = (state.inventory.wood_normie || 0) + 10;
      showToast('Menukar 10 Ikan menjadi 10 Kayu!');
    } else if (tradeType === 'compress_wood') {
      if ((state.inventory.wood_normie || 0) < 10) { showToast('Kurang 10 Normie Wood!'); return; }
      state.inventory.wood_normie -= 10;
      state.inventory.wood_epic = (state.inventory.wood_epic || 0) + 1;
      showToast('Menggabungkan jadi 1 Epic Wood!');
    } else if (tradeType === 'compress_fish') {
      if ((state.inventory.fish_normie || 0) < 10) { showToast('Kurang 10 Normie Fish!'); return; }
      state.inventory.fish_normie -= 10;
      state.inventory.fish_golden = (state.inventory.fish_golden || 0) + 1;
      showToast('Menukar jadi 1 Golden Fish!');
    } else if (tradeType === 'ruby_to_gold') {
      if ((state.inventory.ruby || 0) < 1) { showToast('Tidak punya Ruby!'); return; }
      state.inventory.ruby -= 1;
      state.gold += 100;
      showToast('Menjual Ruby (+100 Gold)!');
    } else if (tradeType === 'gold_to_ruby') {
      if (state.gold < 150) { showToast('Butuh 150 Gold!'); return; }
      state.gold -= 150;
      state.inventory.ruby = (state.inventory.ruby || 0) + 1;
      showToast('Membeli 1 Ruby!');
    }

    updateUI();
    autoSaveInstant();
    showTradeModal();
  }

  /* ============================================================
     8.1. ENCHANTING ALTAR SYSTEM (EPIC RPG AREA 2+)
     ============================================================ */
  const ENCHANT_TIERS = [
    { name: 'Normie', bonus: 1, chance: 0.30, class: 'tier-Normie' },
    { name: 'Good', bonus: 3, chance: 0.23, class: 'tier-Good' },
    { name: 'Great', bonus: 6, chance: 0.17, class: 'tier-Great' },
    { name: 'Mega', bonus: 10, chance: 0.12, class: 'tier-Mega' },
    { name: 'Epic', bonus: 15, chance: 0.08, class: 'tier-Epic' },
    { name: 'Hyper', bonus: 21, chance: 0.045, class: 'tier-Hyper' },
    { name: 'Ultimate', bonus: 28, chance: 0.025, class: 'tier-Ultimate' },
    { name: 'Perfect', bonus: 36, chance: 0.015, class: 'tier-Perfect' },
    { name: 'EDGY', bonus: 45, chance: 0.008, class: 'tier-EDGY' },
    { name: 'ULTRA-EDGY', bonus: 55, chance: 0.005, class: 'tier-ULTRA-EDGY' },
    { name: 'OMEGA', bonus: 125, chance: 0.0015, class: 'tier-OMEGA' },
    { name: 'GODLY', bonus: 200, chance: 0.0005, class: 'tier-GODLY' }
  ];

  const WEAPON_ABILITIES = [
    { name: 'Sharpness', desc: '+10 Flat ATK', flatAtk: 10 },
    { name: 'Vampiric', desc: 'Pulihkan 8% HP dari serangan (Lifesteal)', lifesteal: 0.08 },
    { name: 'Thunderstrike', desc: '+6% Critical Chance', critBonus: 6 },
    { name: 'Greed', desc: '+20% Gold dari monster', goldBonus: 0.20 }
  ];

  const ARMOR_ABILITIES = [
    { name: 'Fortress', desc: '+8 Flat DEF', flatDef: 8 },
    { name: 'Vitality', desc: '+60 Max HP', maxHpBonus: 60 },
    { name: 'Thorns', desc: 'Memantulkan 15% damage musuh', reflect: 0.15 },
    { name: 'Aegis', desc: '10% peluang menangkis serangan', dodge: 0.10 }
  ];

  let selectedEnchantTarget = 'weapon';

  function showEnchantModal() {
    if (!state.enchants) state.enchants = { weapon: null, armor: null };
    const areaNum = parseInt((state.currentArea || 'area_1').replace('area_', '')) || 1;
    const costGold = Math.max(80, areaNum * 80);
    const hasRuby = (state.inventory.ruby || 0) >= 1;

    const wItem = ITEMS[state.equipment.weapon];
    const aItem = ITEMS[state.equipment.armor];
    const wEnc = state.enchants.weapon;
    const aEnc = state.enchants.armor;

    openModal('✨ Altar Enchant Kuno (Epic RPG)', () => {
      return `
        <div class="enchant-container">
          <p style="color:var(--text-sub); font-size:12px; margin-bottom:8px;">
            Tingkatkan kekuatan senjata atau zirah Anda dengan sihir rune kuno! Semakin tinggi tier enchant, semakin dahsyat bonus multiplier stat dan ability pasifnya.
          </p>

          <div class="enchant-target-grid">
            <div class="enchant-card-choice ${selectedEnchantTarget === 'weapon' ? 'active' : ''}" onclick="window.NexusRPG.selectEnchantTarget('weapon')">
              <div style="font-size:26px;">🗡️</div>
              <strong>${wItem ? wItem.name : 'Weapon'}</strong>
              <div>
                ${wEnc ? `<span class="enchant-badge-tier ${wEnc.tierClass}">[${wEnc.tier} +${wEnc.bonus}%]</span><div style="font-size:10px; color:#da9fff; margin-top:2px;">✨ ${wEnc.ability}</div>` : '<span style="font-size:11px; opacity:0.6;">Belum di-enchant</span>'}
              </div>
            </div>

            <div class="enchant-card-choice ${selectedEnchantTarget === 'armor' ? 'active' : ''}" onclick="window.NexusRPG.selectEnchantTarget('armor')">
              <div style="font-size:26px;">🛡️</div>
              <strong>${aItem ? aItem.name : 'Armor'}</strong>
              <div>
                ${aEnc ? `<span class="enchant-badge-tier ${aEnc.tierClass}">[${aEnc.tier} +${aEnc.bonus}%]</span><div style="font-size:10px; color:#da9fff; margin-top:2px;">✨ ${aEnc.ability}</div>` : '<span style="font-size:11px; opacity:0.6;">Belum di-enchant</span>'}
              </div>
            </div>
          </div>

          <div class="altar-rune-wheel">🔮 ⚡ 🌀 💎 ✨</div>

          <div class="enchant-cost-box">
            Biaya Enchant: <strong>${costGold} 💰 Gold</strong> + <strong>1 💎 Ruby</strong> (Ruby Anda: ${state.inventory.ruby || 0})
            ${!hasRuby ? '<br><span style="color:var(--accent-red); font-size:11px;">⚠️ Membutuhkan 1 Ruby (Bisa didapat dari pancing ikan, peti, atau berburu monster Area 3+)!</span>' : ''}
          </div>

          <button class="glow-button" style="padding:12px; font-size:14px; background:linear-gradient(135deg, #b055ff, #00ffcc);" onclick="window.NexusRPG.executeEnchant()">
            ✨ Enchant ${selectedEnchantTarget === 'weapon' ? 'Senjata' : 'Zirah'} Sekarang!
          </button>
        </div>
      `;
    });
  }

  function selectEnchantTarget(target) {
    selectedEnchantTarget = target;
    showEnchantModal();
  }

  function executeEnchant() {
    const areaNum = parseInt((state.currentArea || 'area_1').replace('area_', '')) || 1;
    const costGold = Math.max(80, areaNum * 80);
    if (state.gold < costGold) { showToast('❌ Gold tidak cukup untuk enchant!'); return; }
    if ((state.inventory.ruby || 0) < 1) { showToast('❌ Membutuhkan minimal 1 Ruby untuk bahan enchant!'); return; }

    state.gold -= costGold;
    state.inventory.ruby -= 1;
    if (state.inventory.ruby <= 0) delete state.inventory.ruby;

    // Roll tier with weighted probability
    const rand = Math.random();
    let cumulative = 0;
    let chosenTier = ENCHANT_TIERS[0];
    for (const t of ENCHANT_TIERS) {
      cumulative += t.chance;
      if (rand <= cumulative) {
        chosenTier = t;
        break;
      }
    }

    // Roll ability
    const pool = selectedEnchantTarget === 'weapon' ? WEAPON_ABILITIES : ARMOR_ABILITIES;
    const chosenPerk = pool[Math.floor(Math.random() * pool.length)];

    if (!state.enchants) state.enchants = { weapon: null, armor: null };
    state.enchants[selectedEnchantTarget] = {
      tier: chosenTier.name,
      bonus: chosenTier.bonus,
      tierClass: chosenTier.class,
      ability: chosenPerk.name,
      desc: chosenPerk.desc,
      ...chosenPerk
    };

    showToast(`🎉 Sukses! Mendapatkan [${chosenTier.name} +${chosenTier.bonus}%]!`);
    addLog(`✨ <strong>ENCHANT ALTAR:</strong> Menempa rune pada ${selectedEnchantTarget === 'weapon' ? 'Senjata' : 'Zirah'} ➔ <strong>[${chosenTier.name} +${chosenTier.bonus}%]</strong> dengan Ability: <strong>${chosenPerk.name}</strong> (${chosenPerk.desc})!`, 'victory');

    updateUI();
    autoSaveInstant();
    showEnchantModal();
  }

  /* ============================================================
     8.2. REWARDS, TRAINING & MINIBOSS
     ============================================================ */
  function showRewardsModal() {
    const now = Date.now();
    const lastDaily = state.rewards?.dailyClaimedAt || 0;
    const lastWeekly = state.rewards?.weeklyClaimedAt || 0;

    const dailyAvailable = now - lastDaily >= 24 * 60 * 60 * 1000;
    const weeklyAvailable = now - lastWeekly >= 7 * 24 * 60 * 60 * 1000;

    const dailyRemHours = Math.max(0, Math.ceil((24 * 60 * 60 * 1000 - (now - lastDaily)) / (60 * 60 * 1000)));
    const weeklyRemDays = Math.max(0, Math.ceil((7 * 24 * 60 * 60 * 1000 - (now - lastWeekly)) / (24 * 60 * 60 * 1000)));

    openModal('🎁 Hadiah Harian & Mingguan (Epic Rewards)', () => {
      return `
        <div class="shop-grid">
          <div class="item-card">
            <div class="item-name">☀️ Hadiah Harian (Daily)</div>
            <div class="item-desc">Klaim setiap 24 jam sekali: +500 💰 Gold, +2 📦 Common Crate, +1 💎 Ruby</div>
            <div class="item-stats">${dailyAvailable ? '🟢 Tersedia Sekarang!' : `⏳ Siap dalam ${dailyRemHours} jam`}</div>
            <button class="glow-button" style="margin-top:8px; padding:8px;" ${!dailyAvailable ? 'disabled style="opacity:0.5"' : ''} onclick="window.NexusRPG.claimReward('daily')">
              ${dailyAvailable ? '🎁 Klaim Hadiah Harian' : 'Telah Diklaim'}
            </button>
          </div>

          <div class="item-card">
            <div class="item-name">🌟 Hadiah Mingguan (Weekly)</div>
            <div class="item-desc">Klaim setiap 7 hari sekali: +2,500 💰 Gold, +1 🎁 Epic Crate, +3 💎 Ruby</div>
            <div class="item-stats">${weeklyAvailable ? '🟢 Tersedia Sekarang!' : `⏳ Siap dalam ${weeklyRemDays} hari`}</div>
            <button class="glow-button" style="margin-top:8px; padding:8px;" ${!weeklyAvailable ? 'disabled style="opacity:0.5"' : ''} onclick="window.NexusRPG.claimReward('weekly')">
              ${weeklyAvailable ? '👑 Klaim Hadiah Mingguan' : 'Telah Diklaim'}
            </button>
          </div>
        </div>
      `;
    });
  }

  function claimReward(type) {
    if (!state.rewards) state.rewards = { dailyClaimedAt: 0, weeklyClaimedAt: 0 };
    const now = Date.now();

    if (type === 'daily') {
      if (now - (state.rewards.dailyClaimedAt || 0) < 24 * 60 * 60 * 1000) {
        showToast('⏳ Hadiah harian belum siap!'); return;
      }
      state.rewards.dailyClaimedAt = now;
      state.gold += 500;
      state.inventory.crate_common = (state.inventory.crate_common || 0) + 2;
      state.inventory.ruby = (state.inventory.ruby || 0) + 1;
      showToast('🎁 Klaim Harian: +500 Gold, 2 Peti, 1 Ruby!');
      addLog(`🎁 <strong>KLAIM HARIAN:</strong> Menerima <strong>+500 💰 Gold</strong>, <strong>2x 📦 Common Crate</strong>, dan <strong>1x 💎 Ruby</strong>!`, 'loot');
    } else if (type === 'weekly') {
      if (now - (state.rewards.weeklyClaimedAt || 0) < 7 * 24 * 60 * 60 * 1000) {
        showToast('⏳ Hadiah mingguan belum siap!'); return;
      }
      state.rewards.weeklyClaimedAt = now;
      state.gold += 2500;
      state.inventory.crate_epic = (state.inventory.crate_epic || 0) + 1;
      state.inventory.ruby = (state.inventory.ruby || 0) + 3;
      showToast('👑 Klaim Mingguan: +2,500 Gold, 1 Epic Crate, 3 Ruby!');
      addLog(`👑 <strong>KLAIM MINGGUAN:</strong> Menerima <strong>+2,500 💰 Gold</strong>, <strong>1x 🎁 Epic Crate</strong>, dan <strong>3x 💎 Ruby</strong>!`, 'loot');
    }

    updateUI();
    autoSaveInstant();
    showRewardsModal();
  }

  function handleTraining() {
    if (!checkCooldown('training', 45000)) return; // 45s cooldown
    const isAtk = Math.random() < 0.5;
    const pStats = getComputedStats();
    const gainXp = Math.floor(pStats.atk * 3);
    state.xp += gainXp;

    if (isAtk) {
      state.baseAtk += 1;
      showToast(`🎯 Latihan Berhasil! +1 Base ATK & +${gainXp} EXP!`);
      addLog(`🎯 <strong>TRAINING SELESAI:</strong> Melatih ketajaman serangan! Mendapatkan <strong>+1 Base ATK</strong> dan <strong>+${gainXp} EXP</strong>.`, 'victory');
    } else {
      state.baseDef += 1;
      showToast(`🛡️ Latihan Berhasil! +1 Base DEF & +${gainXp} EXP!`);
      addLog(`🛡️ <strong>TRAINING SELESAI:</strong> Melatih pertahanan tubuh! Mendapatkan <strong>+1 Base DEF</strong> dan <strong>+${gainXp} EXP</strong>.`, 'victory');
    }
    checkLevelUp();
    updateUI();
    autoSaveInstant();
  }

  function handleMiniboss() {
    if (!checkCooldown('miniboss', 120000)) return; // 2 mins cooldown
    if (state.hp <= 0) { showToast('💀 Anda pingsan! Gunakan ❤️ Heal terlebih dahulu.'); return; }

    const areaMonsters = MONSTERS[state.currentArea] || MONSTERS.area_1;
    const baseMob = areaMonsters[Math.floor(Math.random() * areaMonsters.length)];
    const miniboss = {
      name: `Elite Corrupted ${baseMob.name}`,
      emoji: '👹',
      hp: Math.floor(baseMob.hp * 1.8),
      atk: Math.floor(baseMob.atk * 1.4),
      def: Math.floor(baseMob.def * 1.3),
      xp: baseMob.xp * 3,
      gold: baseMob.gold * 3,
      drops: [
        ...(baseMob.drops || []),
        { id: 'crate_rare', chance: 0.6 },
        { id: 'ruby', chance: 0.4 }
      ]
    };

    executeBattle(miniboss, true);
    updateUI();
    autoSaveInstant();
  }

  /* ============================================================
     8.3. COSMIC SPACE ANIMATION CANVAS
     ============================================================ */
  function initSpaceBackground() {
    const canvas = document.getElementById('space-canvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    window.addEventListener('resize', () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    });

    const STAR_COUNT = 90;
    const stars = [];
    const colors = ['#ffffff', '#00ffcc', '#b055ff', '#ffcc00', '#3a88fe'];

    for (let i = 0; i < STAR_COUNT; i++) {
      stars.push({
        x: Math.random() * width,
        y: Math.random() * height,
        radius: Math.random() * 1.6 + 0.4,
        color: colors[Math.floor(Math.random() * colors.length)],
        alpha: Math.random() * 0.8 + 0.2,
        speed: Math.random() * 0.35 + 0.05,
        twinkleSpeed: Math.random() * 0.02 + 0.005,
        twinkleDir: Math.random() < 0.5 ? 1 : -1
      });
    }

    let shootingStar = null;
    function maybeSpawnShootingStar() {
      if (!shootingStar && Math.random() < 0.015) {
        shootingStar = {
          x: Math.random() * width * 0.7,
          y: Math.random() * height * 0.4,
          length: Math.random() * 80 + 40,
          speed: Math.random() * 9 + 6,
          angle: Math.PI / 4,
          alpha: 1
        };
      }
    }

    function renderSpace() {
      ctx.clearRect(0, 0, width, height);

      // Render Stars
      for (let s of stars) {
        s.y -= s.speed;
        if (s.y < 0) {
          s.y = height;
          s.x = Math.random() * width;
        }

        s.alpha += s.twinkleSpeed * s.twinkleDir;
        if (s.alpha > 0.95) { s.alpha = 0.95; s.twinkleDir = -1; }
        else if (s.alpha < 0.2) { s.alpha = 0.2; s.twinkleDir = 1; }

        ctx.beginPath();
        ctx.arc(s.x, s.y, s.radius, 0, Math.PI * 2);
        ctx.fillStyle = s.color;
        ctx.globalAlpha = s.alpha;
        ctx.shadowBlur = 4;
        ctx.shadowColor = s.color;
        ctx.fill();
        ctx.shadowBlur = 0;
      }
      ctx.globalAlpha = 1;

      // Shooting Star
      maybeSpawnShootingStar();
      if (shootingStar) {
        ctx.beginPath();
        ctx.moveTo(shootingStar.x, shootingStar.y);
        const endX = shootingStar.x + Math.cos(shootingStar.angle) * shootingStar.length;
        const endY = shootingStar.y + Math.sin(shootingStar.angle) * shootingStar.length;
        const sGrad = ctx.createLinearGradient(shootingStar.x, shootingStar.y, endX, endY);
        sGrad.addColorStop(0, 'rgba(255, 255, 255, 0)');
        sGrad.addColorStop(1, `rgba(0, 255, 204, ${shootingStar.alpha})`);
        ctx.strokeStyle = sGrad;
        ctx.lineWidth = 2;
        ctx.lineTo(endX, endY);
        ctx.stroke();

        shootingStar.x += Math.cos(shootingStar.angle) * shootingStar.speed;
        shootingStar.y += Math.sin(shootingStar.angle) * shootingStar.speed;
        shootingStar.alpha -= 0.02;
        if (shootingStar.alpha <= 0 || shootingStar.x > width || shootingStar.y > height) {
          shootingStar = null;
        }
      }

      requestAnimationFrame(renderSpace);
    }

    renderSpace();
  }

  /* ============================================================
     9. AUTH & CLOUD INITIALIZATION
     ============================================================ */
  async function loadCloudSave() {
    if (!authToken) return false;
    try {
      const res = await fetch('/api/load', {
        headers: { 'Authorization': `Bearer ${authToken}` }
      });
      const data = await res.json();
      if (data.success && data.gameState) {
        state = Object.assign(JSON.parse(JSON.stringify(DEFAULT_STATE)), data.gameState);

        // Check if there are pending notifications (e.g. transfer koin dari teman)
        if (state.pendingNotifications && state.pendingNotifications.length > 0) {
          state.pendingNotifications.forEach(n => addLog(n, 'victory'));
          state.pendingNotifications = [];
        }

        if (activeUsername) {
          localStorage.setItem(`nexus_save_${activeUsername}`, JSON.stringify(state));
        }
        updateUI();
        return true;
      }
    } catch {}

    // Fallback localStorage jika offline
    if (activeUsername) {
      const local = localStorage.getItem(`nexus_save_${activeUsername}`);
      if (local) {
        try {
          state = Object.assign(JSON.parse(JSON.stringify(DEFAULT_STATE)), JSON.parse(local));
          updateUI();
          return true;
        } catch {}
      }
    }
    return false;
  }

  async function checkSession() {
    // 1. Coba verifikasi token yang tersimpan
    if (authToken && activeUsername) {
      try {
        const checkRes = await fetch('/api/session', {
          headers: { 'Authorization': `Bearer ${authToken}` }
        });
        const sess = await checkRes.json();
        if (sess && sess.loggedIn) {
          await loadCloudSave();
          document.getElementById('auth-screen').style.display = 'none';
          document.getElementById('game-screen').style.display = 'flex';
          addLog(`🌌 Selamat datang kembali, <strong>${state.characterName || activeUsername}</strong>! Sesi tersinkron.`, 'system');
          return;
        }
      } catch {}
    }

    // 2. Self-Healing: Jika server baru saja restart di Render dan token hangus,
    // gunakan vault lokal untuk memulihkan sesi secara otomatis tanpa input password lagi
    const storedVault = localStorage.getItem('nexus_vault');
    if (storedVault) {
      try {
        const vault = JSON.parse(storedVault);
        if (vault.username && vault.password) {
          const localSave = localStorage.getItem(`nexus_save_${vault.username}`);
          const res = await fetch('/api/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              username: vault.username,
              password: vault.password,
              fallbackVault: {
                password: vault.password,
                gameState: localSave ? JSON.parse(localSave) : null
              }
            })
          });
          const data = await res.json();
          if (data && data.success) {
            authToken = data.token;
            activeUsername = data.username;
            localStorage.setItem('nexus_auth_token', authToken);
            localStorage.setItem('nexus_username', activeUsername);
            await loadCloudSave();
            document.getElementById('auth-screen').style.display = 'none';
            document.getElementById('game-screen').style.display = 'flex';
            addLog(`✨ Akun & karakter Anda dipulihkan otomatis dari Cloud Vault setelah restart server!`, 'victory');
            return;
          }
        }
      } catch {}
    }

    document.getElementById('auth-screen').style.display = 'flex';
    document.getElementById('game-screen').style.display = 'none';
  }

  async function handleLogin(e) {
    e.preventDefault();
    document.getElementById('login-error').textContent = '';
    const u = document.getElementById('login-username').value.trim();
    const p = document.getElementById('login-password').value;

    // Ambil fallback data dari localStorage jika ada
    let localSave = null;
    const localSaveStr = localStorage.getItem(`nexus_save_${u}`);
    if (localSaveStr) {
      try { localSave = JSON.parse(localSaveStr); } catch {}
    }

    try {
      const res = await fetch('/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          username: u,
          password: p,
          fallbackVault: {
            password: p,
            gameState: localSave
          }
        })
      });
      const data = await res.json();
      if (data.success) {
        authToken = data.token;
        activeUsername = data.username;
        localStorage.setItem('nexus_auth_token', authToken);
        localStorage.setItem('nexus_username', activeUsername);
        localStorage.setItem('nexus_vault', JSON.stringify({ username: u, password: p }));

        await loadCloudSave();
        document.getElementById('auth-screen').style.display = 'none';
        document.getElementById('game-screen').style.display = 'flex';
        
        if (data.rehydrated) {
          addLog(`✨ Akun <strong>${u}</strong> berhasil dipulihkan dari Cloud Vault!`, 'victory');
          showToast('✨ Akun berhasil dipulihkan dari Cloud Vault!');
        } else {
          addLog(`⚔️ Berhasil masuk ke akun <strong>${state.characterName || u}</strong>.`, 'system');
        }
      } else {
        document.getElementById('login-error').textContent = data.error || 'Login gagal';
      }
    } catch {
      document.getElementById('login-error').textContent = 'Gagal menghubungi server';
    }
  }

  async function handleRegister(e) {
    e.preventDefault();
    document.getElementById('register-error').textContent = '';
    const u = document.getElementById('reg-username').value.trim();
    const p = document.getElementById('reg-password').value;
    const charName = document.getElementById('reg-character').value.trim();

    try {
      const res = await fetch('/api/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username: u, password: p, characterName: charName })
      });
      const data = await res.json();
      if (data.success) {
        authToken = data.token;
        activeUsername = data.username;
        localStorage.setItem('nexus_auth_token', authToken);
        localStorage.setItem('nexus_username', activeUsername);
        localStorage.setItem('nexus_vault', JSON.stringify({ username: u, password: p, characterName: charName }));

        state = JSON.parse(JSON.stringify(DEFAULT_STATE));
        state.characterName = charName;
        autoSaveInstant();

        document.getElementById('auth-screen').style.display = 'none';
        document.getElementById('game-screen').style.display = 'flex';
        updateUI();
        addLog(`✨ Selamat datang Hero <strong>${charName}</strong>! Petualangan dimulai di Area 1.`, 'system');
      } else {
        document.getElementById('register-error').textContent = data.error || 'Pendaftaran gagal';
      }
    } catch {
      document.getElementById('register-error').textContent = 'Gagal menghubungi server';
    }
  }

  function handleLogout() {
    autoSaveInstant();
    authToken = null;
    activeUsername = null;
    localStorage.removeItem('nexus_auth_token');
    localStorage.removeItem('nexus_username');
    localStorage.removeItem('nexus_vault');
    location.reload();
  }

  /* ============================================================
     10. TAB NAVIGATION & VIEW SWITCHING
     ============================================================ */
  function switchTab(tabKey) {
    // Desktop Tabs
    document.querySelectorAll('.d-tab').forEach(btn => {
      if (btn.dataset.tab === tabKey) btn.classList.add('active');
      else btn.classList.remove('active');
    });

    // Mobile Bottom Nav Items
    document.querySelectorAll('.m-nav-item').forEach(btn => {
      if (btn.dataset.tab === tabKey) btn.classList.add('active');
      else btn.classList.remove('active');
    });

    // Content Panels
    document.querySelectorAll('.tab-content').forEach(p => {
      if (p.id === `tab-${tabKey}`) p.style.display = 'block';
      else p.style.display = 'none';
    });
  }

  function setupEvents() {
    // Auth Tab toggle
    document.querySelectorAll('.toggle-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        document.querySelectorAll('.toggle-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        if (btn.dataset.tab === 'login') {
          document.getElementById('login-form').style.display = 'block';
          document.getElementById('register-form').style.display = 'none';
        } else {
          document.getElementById('login-form').style.display = 'none';
          document.getElementById('register-form').style.display = 'block';
        }
      });
    });

    document.getElementById('login-form').addEventListener('submit', handleLogin);
    document.getElementById('register-form').addEventListener('submit', handleRegister);
    document.getElementById('logout-btn').addEventListener('click', handleLogout);

    const socBtn = document.getElementById('social-btn');
    if (socBtn) socBtn.addEventListener('click', openSocialModal);

    const mClose = document.getElementById('modal-close');
    if (mClose) mClose.addEventListener('click', closeModal);
    const mOverlay = document.querySelector('#modal .modal-overlay');
    if (mOverlay) mOverlay.addEventListener('click', closeModal);

    // Desktop Nav Tab click
    document.querySelectorAll('.d-tab').forEach(b => {
      b.addEventListener('click', () => switchTab(b.dataset.tab));
    });

    // Mobile Bottom Bar click
    document.querySelectorAll('.m-nav-item').forEach(b => {
      b.addEventListener('click', () => switchTab(b.dataset.tab));
    });

    // Action button listeners
    document.querySelectorAll('.game-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const action = btn.dataset.action;
        switch (action) {
          case 'hunt': handleHunt(); break;
          case 'adventure': handleAdventure(); break;
          case 'dungeon': handleDungeon(); break;
          case 'heal': handleHeal(); break;
          case 'training': handleTraining(); break;
          case 'miniboss': handleMiniboss(); break;
          case 'chop': handleChop(); break;
          case 'fish': handleFish(); break;
          case 'crate': showCratesModal(); break;
          case 'trade': showTradeModal(); break;
          case 'inventory': showInventory(); break;
          case 'shop': showShop(); break;
          case 'craft': showCraft(); break;
          case 'enchant': showEnchantModal(); break;
          case 'rewards': showRewardsModal(); break;
        }
      });
    });
  }

  window.NexusRPG = {
    startAdventure,
    useItem,
    equipItem,
    sellItem,
    buyItem,
    craftItem,
    openCrate,
    trade: handleTrade,
    playCoinflip,
    playSlots,
    playDice,
    adjustBet,
    toggleLanguage,
    applyLanguage,
    showEnchantModal,
    selectEnchantTarget,
    executeEnchant,
    showRewardsModal,
    claimReward,
    handleTraining,
    handleMiniboss,
    openSocialModal,
    closeSocialModal,
    addFriend,
    sendCoin,
    quickFillTransfer
  };

  document.addEventListener('DOMContentLoaded', () => {
    initSpaceBackground();
    setupEvents();
    applyLanguage(currentLang);
    checkSession();
  });

})();
