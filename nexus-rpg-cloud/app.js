// NEXUS RPG v4.0 - Minimalist Cosmic RPG Engine
// Faithful Epic RPG Mechanics & Scaling with Cosmic Cyber Lore
// Features: Full Epic RPG Mechanics, Work/Gathering, Enchanting up to Void/Eternal,
// Hardmode, Training, Bank Vault, Mount & Drone, and Time Travel (Prestige) System!

(function() {
  'use strict';

  /* ============================================================
     0. I18N BILINGUAL SYSTEM (INDONESIAN & ENGLISH)
     ============================================================ */
  let currentLang = localStorage.getItem('nexus_lang') || 'id';

  const I18N = {
    id: {
      dock_combat: 'Tempur',
      dock_gather: 'Panen',
      dock_forge: 'Tempa',
      dock_bag: 'Tas',
      dock_tt: 'Waktu',
      dock_mount: 'Mount',
      dock_casino: 'Judi',
      dock_profile: 'Profil',
      ready: 'Siap'
    },
    en: {
      dock_combat: 'Combat',
      dock_gather: 'Gather',
      dock_forge: 'Forge',
      dock_bag: 'Bag',
      dock_tt: 'Chrono',
      dock_mount: 'Mount',
      dock_casino: 'Casino',
      dock_profile: 'Profile',
      ready: 'Ready'
    }
  };

  function toggleLanguage() {
    currentLang = currentLang === 'id' ? 'en' : 'id';
    localStorage.setItem('nexus_lang', currentLang);
    showToast(currentLang === 'en' ? '🌐 Language: English' : '🌐 Bahasa: Indonesia');
    updateUI();
  }

  /* ============================================================
     1. COMPLETE GAME DATA (15 AREAS, DROPS, BOSSES, ITEMS)
     ============================================================ */
  const AREAS = [
    { id: 'area_1', name: 'Area 1: Verdant Plains', emoji: '🌱', levelReq: 1, bossDung: 1 },
    { id: 'area_2', name: 'Area 2: Whispering Woods', emoji: '🌲', levelReq: 5, bossDung: 2 },
    { id: 'area_3', name: 'Area 3: Echoing Caverns', emoji: '🕳️', levelReq: 10, bossDung: 3 },
    { id: 'area_4', name: 'Area 4: Frostfall Summit', emoji: '🏔️', levelReq: 20, bossDung: 4 },
    { id: 'area_5', name: 'Area 5: Sunken Marsh', emoji: '🌿', levelReq: 30, bossDung: 5 },
    { id: 'area_6', name: 'Area 6: Obsidian Caldera', emoji: '🌋', levelReq: 45, bossDung: 6 },
    { id: 'area_7', name: 'Area 7: Cyber Void', emoji: '🤖', levelReq: 60, bossDung: 7 },
    { id: 'area_8', name: 'Area 8: Celestial Sanctuary', emoji: '🏛️', levelReq: 75, bossDung: 8 },
    { id: 'area_9', name: 'Area 9: Chrono Rift', emoji: '⏳', levelReq: 90, bossDung: 9 },
    { id: 'area_10', name: 'Area 10: Nexus Multiverse', emoji: '🌀', levelReq: 100, bossDung: 10 },
    { id: 'area_11', name: 'Area 11: Quantum Singularity', emoji: '🌌', levelReq: 110, bossDung: 11 },
    { id: 'area_12', name: 'Area 12: Void Horizon', emoji: '🕳️', levelReq: 130, bossDung: 12 },
    { id: 'area_13', name: 'Area 13: Astral Nexus', emoji: '⭐', levelReq: 150, bossDung: 13 },
    { id: 'area_14', name: 'Area 14: Omniversal Gate', emoji: '⛩️', levelReq: 180, bossDung: 14 },
    { id: 'area_15', name: 'Area 15: Absolute Infinity', emoji: '👑', levelReq: 220, bossDung: 15 }
  ];

  const MONSTERS = {
    area_1: [
      { name: 'Plains Wolf', emoji: '🐺', hp: 22, atk: 6, def: 2, xp: 14, gold: 12, drops: [{id: 'wolf_pelt', chance: 0.5}, {id: 'crate_common', chance: 0.15}] },
      { name: 'Wild Goblin', emoji: '👺', hp: 26, atk: 8, def: 3, xp: 18, gold: 15, drops: [{id: 'goblin_ear', chance: 0.4}] },
      { name: 'Stray Zombie', emoji: '🧟', hp: 34, atk: 7, def: 4, xp: 22, gold: 20, drops: [{id: 'zombie_eye', chance: 0.35}] }
    ],
    area_2: [
      { name: 'Forest Ent', emoji: '🌳', hp: 45, atk: 12, def: 6, xp: 32, gold: 28, drops: [{id: 'wood_epic', chance: 0.35}, {id: 'apple', chance: 0.4}] },
      { name: 'Sneaky Fox', emoji: '🦊', hp: 38, atk: 15, def: 5, xp: 30, gold: 25, drops: [{id: 'fox_tail', chance: 0.35}] },
      { name: 'Giant Viper', emoji: '🐍', hp: 48, atk: 18, def: 7, xp: 36, gold: 32, drops: [{id: 'snake_fang', chance: 0.3}, {id: 'crate_uncommon', chance: 0.12}] }
    ],
    area_3: [
      { name: 'Cave Ogre', emoji: '👹', hp: 70, atk: 22, def: 12, xp: 52, gold: 46, drops: [{id: 'ogre_club_piece', chance: 0.35}] },
      { name: 'Crystal Bat', emoji: '🦇', hp: 55, atk: 25, def: 9, xp: 48, gold: 42, drops: [{id: 'bat_wing', chance: 0.4}, {id: 'ruby', chance: 0.18}] },
      { name: 'Deep Crawler', emoji: '🕷️', hp: 65, atk: 24, def: 11, xp: 50, gold: 44, drops: [{id: 'spider_silk', chance: 0.35}] }
    ],
    area_4: [
      { name: 'Snow Drake', emoji: '🐲', hp: 95, atk: 34, def: 18, xp: 78, gold: 70, drops: [{id: 'ice_scale', chance: 0.3}, {id: 'crate_rare', chance: 0.12}] },
      { name: 'Yeti Berserker', emoji: '🦍', hp: 125, atk: 38, def: 22, xp: 95, gold: 85, drops: [{id: 'yeti_horn', chance: 0.3}] },
      { name: 'Frost Elemental', emoji: '❄️', hp: 105, atk: 42, def: 16, xp: 88, gold: 78, drops: [{id: 'ice_crystal', chance: 0.35}] }
    ],
    area_5: [
      { name: 'Toxic Hydra', emoji: '🐍', hp: 140, atk: 48, def: 25, xp: 125, gold: 115, drops: [{id: 'hydra_scale', chance: 0.3}] },
      { name: 'Swamp Witch', emoji: '🧙', hp: 120, atk: 55, def: 20, xp: 118, gold: 110, drops: [{id: 'banana', chance: 0.4}] },
      { name: 'Corrupted Siren', emoji: '🧜', hp: 135, atk: 52, def: 22, xp: 122, gold: 112, drops: [{id: 'siren_hair', chance: 0.25}] }
    ],
    area_6: [
      { name: 'Fire Wyrm', emoji: '🐉', hp: 180, atk: 66, def: 32, xp: 170, gold: 160, drops: [{id: 'fire_scale', chance: 0.25}, {id: 'crate_epic', chance: 0.1}] },
      { name: 'Magma Golem', emoji: '🔥', hp: 220, atk: 60, def: 42, xp: 185, gold: 175, drops: [{id: 'magma_core', chance: 0.25}] },
      { name: 'Inferno Demon', emoji: '😈', hp: 190, atk: 72, def: 30, xp: 178, gold: 165, drops: [{id: 'demon_heart', chance: 0.2}] }
    ],
    area_7: [
      { name: 'Cyber Sentinel', emoji: '🤖', hp: 240, atk: 84, def: 44, xp: 235, gold: 220, drops: [{id: 'robot_chip', chance: 0.25}] },
      { name: 'Void Android', emoji: '🦾', hp: 260, atk: 88, def: 48, xp: 255, gold: 240, drops: [{id: 'cyber_alloy', chance: 0.22}] },
      { name: 'Nano Drone Swarm', emoji: '🛸', hp: 220, atk: 95, def: 38, xp: 240, gold: 225, drops: [{id: 'crate_edgy', chance: 0.1}] }
    ],
    area_8: [
      { name: 'Archon Guardian', emoji: '⚔️', hp: 320, atk: 105, def: 58, xp: 330, gold: 310, drops: [{id: 'celestial_feather', chance: 0.2}] },
      { name: 'Holy Seraphim', emoji: '👼', hp: 300, atk: 115, def: 52, xp: 340, gold: 320, drops: [{id: 'divine_starlight', chance: 0.18}] },
      { name: 'Astral Unicorn', emoji: '🦄', hp: 340, atk: 100, def: 64, xp: 350, gold: 330, drops: [{id: 'astral_horn', chance: 0.18}] }
    ],
    area_9: [
      { name: 'Time Weaver', emoji: '⏳', hp: 420, atk: 130, def: 72, xp: 460, gold: 430, drops: [{id: 'chrono_dust', chance: 0.18}, {id: 'crate_omega', chance: 0.08}] },
      { name: 'Quantum Voidwalker', emoji: '🕳️', hp: 450, atk: 135, def: 75, xp: 490, gold: 460, drops: [{id: 'void_matter', chance: 0.16}] },
      { name: 'Entropy Fiend', emoji: '👁️', hp: 480, atk: 140, def: 70, xp: 520, gold: 490, drops: [{id: 'entropy_shard', chance: 0.15}] }
    ],
    area_10: [
      { name: 'Nexus Titan Prime', emoji: '🌌', hp: 600, atk: 165, def: 95, xp: 750, gold: 720, drops: [{id: 'nexus_essence', chance: 0.15}] },
      { name: 'Dimensional Devourer', emoji: '🐙', hp: 650, atk: 175, def: 90, xp: 820, gold: 790, drops: [{id: 'reality_tear', chance: 0.12}] },
      { name: 'Nexus Sovereign', emoji: '👑', hp: 750, atk: 190, def: 105, xp: 950, gold: 920, drops: [{id: 'crate_godly', chance: 0.06}, {id: 'nexus_core', chance: 0.1}] }
    ],
    area_11: [
      { name: 'Singularity Worm', emoji: '🐛', hp: 950, atk: 220, def: 125, xp: 1250, gold: 1200, drops: [{id: 'wood_ultra', chance: 0.2}] },
      { name: 'Chrono Dragon', emoji: '🐉', hp: 1100, atk: 240, def: 140, xp: 1450, gold: 1400, drops: [{id: 'crate_godly', chance: 0.08}] },
      { name: 'Paradox Entity', emoji: '🌀', hp: 1200, atk: 260, def: 135, xp: 1650, gold: 1600, drops: [{id: 'dark_energy', chance: 0.15}] }
    ],
    area_12: [
      { name: 'Void Leviathan', emoji: '🐋', hp: 1500, atk: 300, def: 170, xp: 2100, gold: 2000, drops: [{id: 'crate_void', chance: 0.06}] },
      { name: 'Eclipse Phantom', emoji: '👻', hp: 1650, atk: 320, def: 180, xp: 2350, gold: 2250, drops: [{id: 'wood_ultimate', chance: 0.15}] },
      { name: 'Cosmic Reaper', emoji: '☠️', hp: 1800, atk: 350, def: 190, xp: 2600, gold: 2500, drops: [{id: 'time_capsule', chance: 0.05}] }
    ]
  };

  const DUNGEON_BOSSES = {
    area_1: { name: 'Alpha Dire Wolf', emoji: '🐺', hp: 120, atk: 16, def: 8, xp: 120, gold: 90, relic: 'd1_relic' },
    area_2: { name: 'Corrupted Treant Sovereign', emoji: '🌳', hp: 200, atk: 26, def: 16, xp: 220, gold: 160, relic: 'd2_relic' },
    area_3: { name: 'Cave King Golem', emoji: '🗿', hp: 320, atk: 38, def: 24, xp: 350, gold: 260, relic: 'd3_relic' },
    area_4: { name: 'Ancient Glacial Wyrm', emoji: '🐲', hp: 460, atk: 52, def: 34, xp: 520, gold: 400, relic: 'd4_relic' },
    area_5: { name: 'Abyssal Hydra Queen', emoji: '🐍', hp: 620, atk: 68, def: 42, xp: 750, gold: 600, relic: 'd5_relic' },
    area_6: { name: 'Infernus Molten Lord', emoji: '👹', hp: 800, atk: 86, def: 54, xp: 1000, gold: 850, relic: 'd6_relic' },
    area_7: { name: 'Omega Mecha Titan', emoji: '🤖', hp: 1050, atk: 108, def: 68, xp: 1350, gold: 1150, relic: 'd7_relic' },
    area_8: { name: 'Fallen Archangel Prime', emoji: '👼', hp: 1350, atk: 130, def: 84, xp: 1800, gold: 1500, relic: 'd8_relic' },
    area_9: { name: 'Chrono Time Overlord', emoji: '⏳', hp: 1750, atk: 160, def: 105, xp: 2400, gold: 2000, relic: 'd9_relic' },
    area_10: { name: 'The Nexus Singularity Sovereign', emoji: '👑', hp: 2500, atk: 210, def: 135, xp: 3800, gold: 3200, relic: 'd10_relic' },
    area_11: { name: 'Quantum Paradox Sovereign', emoji: '🌌', hp: 3500, atk: 270, def: 170, xp: 5500, gold: 4500, relic: 'd11_relic' },
    area_12: { name: 'Void Eclipse Overlord', emoji: '🕳️', hp: 5000, atk: 360, def: 220, xp: 8000, gold: 6500, relic: 'd12_relic' }
  };

  const ITEMS = {
    // Woods
    wood_normie: { name: 'Normie Wood', emoji: '🪵', type: 'material', sellPrice: 2 },
    wood_epic: { name: 'Epic Wood', emoji: '🪵', type: 'material', sellPrice: 10 },
    wood_super: { name: 'Super Wood', emoji: '🪵', type: 'material', sellPrice: 40 },
    wood_mega: { name: 'Mega Wood', emoji: '🪵', type: 'material', sellPrice: 150 },
    wood_hyper: { name: 'Hyper Wood', emoji: '🪵', type: 'material', sellPrice: 500 },
    wood_ultra: { name: 'Ultra Wood', emoji: '🪵', type: 'material', sellPrice: 1500 },
    wood_ultimate: { name: 'Ultimate Wood', emoji: '🪵', type: 'material', sellPrice: 5000 },

    // Fishes
    fish_normie: { name: 'Normie Fish', emoji: '🐟', type: 'material', sellPrice: 3 },
    fish_golden: { name: 'Golden Fish', emoji: '🐠', type: 'material', sellPrice: 15 },
    fish_epic: { name: 'Epic Fish', emoji: '🐡', type: 'material', sellPrice: 60 },
    fish_super: { name: 'Super Fish', emoji: '🦈', type: 'material', sellPrice: 200 },

    // Farm & Food
    seed: { name: 'Energy Seed', emoji: '🌱', type: 'material', buyPrice: 10, sellPrice: 5 },
    carrot: { name: 'Carrot', emoji: '🥕', type: 'consumable', effect: { type: 'heal', value: 25 }, sellPrice: 6 },
    potato: { name: 'Potato', emoji: '🥔', type: 'consumable', effect: { type: 'heal', value: 40 }, sellPrice: 10 },
    bread: { name: 'Cosmic Bread', emoji: '🍞', type: 'consumable', effect: { type: 'heal', value: 120 }, sellPrice: 35 },
    apple: { name: 'Apple', emoji: '🍎', type: 'consumable', effect: { type: 'heal', value: 30 }, sellPrice: 4, buyPrice: 8 },
    banana: { name: 'Banana', emoji: '🍌', type: 'consumable', effect: { type: 'heal', value: 75 }, sellPrice: 12, buyPrice: 25 },

    // Minerals
    ruby: { name: 'Ruby', emoji: '💎', type: 'material', sellPrice: 100 },
    diamond: { name: 'Diamond', emoji: '💠', type: 'material', sellPrice: 350 },
    dark_energy: { name: 'Dark Energy', emoji: '🔮', type: 'material', sellPrice: 1200 },
    time_capsule: { name: 'Time Capsule', emoji: '🔮', type: 'special', desc: 'Memberikan +1 Kapsul Waktu Abadi!' },

    // Mob Drops
    wolf_pelt: { name: 'Wolf Pelt', emoji: '🐺', type: 'material', sellPrice: 6 },
    goblin_ear: { name: 'Goblin Ear', emoji: '👂', type: 'material', sellPrice: 5 },
    zombie_eye: { name: 'Zombie Eye', emoji: '👁️', type: 'material', sellPrice: 8 },
    fox_tail: { name: 'Fox Tail', emoji: '🦊', type: 'material', sellPrice: 14 },
    snake_fang: { name: 'Snake Fang', emoji: '🐍', type: 'material', sellPrice: 16 },
    ogre_club_piece: { name: 'Ogre Club', emoji: '🦴', type: 'material', sellPrice: 22 },
    bat_wing: { name: 'Bat Wing', emoji: '🦇', type: 'material', sellPrice: 12 },
    spider_silk: { name: 'Spider Silk', emoji: '🕸️', type: 'material', sellPrice: 20 },
    ice_scale: { name: 'Ice Scale', emoji: '❄️', type: 'material', sellPrice: 35 },
    yeti_horn: { name: 'Yeti Horn', emoji: '🦏', type: 'material', sellPrice: 42 },
    ice_crystal: { name: 'Ice Crystal', emoji: '💠', type: 'material', sellPrice: 40 },
    hydra_scale: { name: 'Hydra Scale', emoji: '🐍', type: 'material', sellPrice: 50 },
    siren_hair: { name: 'Siren Hair', emoji: '🧜', type: 'material', sellPrice: 60 },
    fire_scale: { name: 'Fire Scale', emoji: '🔥', type: 'material', sellPrice: 85 },
    magma_core: { name: 'Magma Core', emoji: '🟠', type: 'material', sellPrice: 100 },
    demon_heart: { name: 'Demon Heart', emoji: '🖤', type: 'material', sellPrice: 120 },
    robot_chip: { name: 'Cyber Chip', emoji: '💾', type: 'material', sellPrice: 135 },
    cyber_alloy: { name: 'Cyber Alloy', emoji: '⚙️', type: 'material', sellPrice: 150 },
    celestial_feather: { name: 'Celestial Feather', emoji: '🪶', type: 'material', sellPrice: 220 },
    divine_starlight: { name: 'Divine Starlight', emoji: '⭐', type: 'material', sellPrice: 250 },
    astral_horn: { name: 'Astral Horn', emoji: '✨', type: 'material', sellPrice: 280 },
    chrono_dust: { name: 'Chrono Dust', emoji: '⏳', type: 'material', sellPrice: 350 },
    void_matter: { name: 'Void Matter', emoji: '🕳️', type: 'material', sellPrice: 400 },
    entropy_shard: { name: 'Entropy Shard', emoji: '🔮', type: 'material', sellPrice: 450 },
    nexus_essence: { name: 'Nexus Essence', emoji: '🌀', type: 'material', sellPrice: 600 },
    reality_tear: { name: 'Reality Tear', emoji: '🌌', type: 'material', sellPrice: 750 },
    nexus_core: { name: 'Nexus Core', emoji: '❤️‍🔥', type: 'material', sellPrice: 1000 },

    // Boss Relics
    d1_relic: { name: 'Alpha Crest', emoji: '🐺', type: 'material', sellPrice: 100 },
    d2_relic: { name: 'Treant Heart', emoji: '💚', type: 'material', sellPrice: 200 },
    d3_relic: { name: 'Ogre Crown', emoji: '👑', type: 'material', sellPrice: 350 },
    d4_relic: { name: 'Glacial Eye', emoji: '👁️', type: 'material', sellPrice: 550 },
    d5_relic: { name: 'Hydra Diadem', emoji: '🔱', type: 'material', sellPrice: 800 },
    d6_relic: { name: 'Infernus Gem', emoji: '🔴', type: 'material', sellPrice: 1150 },
    d7_relic: { name: 'Quantum Core', emoji: '💠', type: 'material', sellPrice: 1600 },
    d8_relic: { name: 'Divine Halo', emoji: '😇', type: 'material', sellPrice: 2200 },
    d9_relic: { name: 'Timeless Glass', emoji: '⌛', type: 'material', sellPrice: 3000 },
    d10_relic: { name: 'Omni Crown', emoji: '👑', type: 'material', sellPrice: 5000 },
    d11_relic: { name: 'Paradox Heart', emoji: '🌌', type: 'material', sellPrice: 8000 },
    d12_relic: { name: 'Void Star', emoji: '🕳️', type: 'material', sellPrice: 12000 },

    // Crates / Lootboxes
    crate_common: { name: 'Common Crate', emoji: '📦', type: 'crate', buyPrice: 50, sellPrice: 25 },
    crate_uncommon: { name: 'Uncommon Crate', emoji: '📦', type: 'crate', buyPrice: 120, sellPrice: 60 },
    crate_rare: { name: 'Rare Crate', emoji: '🎁', type: 'crate', buyPrice: 350, sellPrice: 175 },
    crate_epic: { name: 'Epic Crate', emoji: '🎁', type: 'crate', buyPrice: 900, sellPrice: 450 },
    crate_edgy: { name: 'EDGY Crate', emoji: '🧰', type: 'crate', buyPrice: 2200, sellPrice: 1100 },
    crate_omega: { name: 'OMEGA Crate', emoji: '🧰', type: 'crate', buyPrice: 6000, sellPrice: 3000 },
    crate_godly: { name: 'GODLY Crate', emoji: '✨', type: 'crate', buyPrice: 15000, sellPrice: 7500 },
    crate_void: { name: 'VOID Crate', emoji: '🌌', type: 'crate', buyPrice: 40000, sellPrice: 20000 },

    // Potions & Buffs
    potion_small: { name: 'Small Potion', emoji: '🧪', type: 'consumable', effect: { type: 'heal', value: 45 }, buyPrice: 20, sellPrice: 10 },
    potion_medium: { name: 'Medium Potion', emoji: '🧪', type: 'consumable', effect: { type: 'heal', value: 140 }, buyPrice: 60, sellPrice: 30 },
    potion_large: { name: 'Large Potion', emoji: '🧪', type: 'consumable', effect: { type: 'heal', value: 350 }, buyPrice: 160, sellPrice: 80 },
    potion_mega: { name: 'Full Elixir', emoji: '🧪', type: 'consumable', effect: { type: 'heal_full', value: 99999 }, buyPrice: 450, sellPrice: 225 },
    elixir_atk: { name: 'Dragon Might', emoji: '⚗️', type: 'consumable', effect: { type: 'buff_atk', value: 1.5, battles: 5 }, buyPrice: 150, sellPrice: 75 },
    elixir_def: { name: 'Stone Skin', emoji: '⚗️', type: 'consumable', effect: { type: 'buff_def', value: 1.5, battles: 5 }, buyPrice: 150, sellPrice: 75 },

    // Weapons
    wooden_sword: { name: 'Wooden Sword', emoji: '🗡️', type: 'weapon', stats: { atk: 6 }, buyPrice: 0, sellPrice: 5 },
    fish_sword: { name: 'Fish Sword', emoji: '🐟', type: 'weapon', stats: { atk: 14, crit: 2 }, craftRecipe: { fish_normie: 6, wood_normie: 6 } },
    iron_sword: { name: 'Iron Broadsword', emoji: '⚔️', type: 'weapon', stats: { atk: 24 }, buyPrice: 90, sellPrice: 45 },
    wolf_katana: { name: 'Wolf Katana', emoji: '🐺', type: 'weapon', stats: { atk: 38, crit: 4 }, craftRecipe: { d1_relic: 1, wolf_pelt: 5, wood_epic: 3 } },
    enchanted_blade: { name: 'Enchanted Claymore', emoji: '🔮', type: 'weapon', stats: { atk: 60, crit: 6 }, craftRecipe: { d2_relic: 1, wood_super: 4, ruby: 2 } },
    frost_halberd: { name: 'Frost Halberd', emoji: '❄️', type: 'weapon', stats: { atk: 88, crit: 8 }, craftRecipe: { d4_relic: 1, ice_crystal: 4, diamond: 1 } },
    edgy_blade: { name: 'EDGY Scythe', emoji: '🖤', type: 'weapon', stats: { atk: 135, crit: 10 }, craftRecipe: { d5_relic: 1, siren_hair: 5, wood_mega: 4 } },
    ultra_edgy_blade: { name: 'ULTRA-EDGY Blade', emoji: '🔥', type: 'weapon', stats: { atk: 195, crit: 12 }, craftRecipe: { d6_relic: 1, magma_core: 4, wood_mega: 8 } },
    omega_laser_blade: { name: 'OMEGA Cyber Blade', emoji: '⚡', type: 'weapon', stats: { atk: 280, crit: 15 }, craftRecipe: { d7_relic: 1, robot_chip: 6, wood_hyper: 4 } },
    godly_blade: { name: 'GODLY Solar Edge', emoji: '⭐', type: 'weapon', stats: { atk: 400, crit: 20 }, craftRecipe: { d8_relic: 1, divine_starlight: 5, wood_hyper: 8 } },
    nexus_prime_blade: { name: 'NEXUS Omni Slicer', emoji: '🌀', type: 'weapon', stats: { atk: 580, crit: 28 }, craftRecipe: { d10_relic: 1, nexus_core: 2, reality_tear: 3, wood_hyper: 15 } },
    void_blade: { name: 'VOID Sovereign Blade', emoji: '🌌', type: 'weapon', stats: { atk: 850, crit: 35 }, craftRecipe: { d11_relic: 1, dark_energy: 4, wood_ultimate: 3 } },

    // Armors
    cloth_armor: { name: 'Cloth Tunic', emoji: '👕', type: 'armor', stats: { def: 4, maxHp: 0 }, buyPrice: 0, sellPrice: 3 },
    fish_armor: { name: 'Fish Vest', emoji: '🐟', type: 'armor', stats: { def: 10, maxHp: 30 }, craftRecipe: { fish_normie: 6, wood_normie: 4 } },
    iron_plate: { name: 'Iron Plate', emoji: '🛡️', type: 'armor', stats: { def: 20, maxHp: 70 }, buyPrice: 110, sellPrice: 55 },
    wolf_fur_mantle: { name: 'Alpha Mantle', emoji: '🐺', type: 'armor', stats: { def: 32, maxHp: 130 }, craftRecipe: { d1_relic: 1, wolf_pelt: 6, fish_golden: 2 } },
    ogre_stone_plate: { name: 'Ogre Plate', emoji: '🗿', type: 'armor', stats: { def: 55, maxHp: 240 }, craftRecipe: { d3_relic: 1, ogre_club_piece: 4, fish_epic: 2 } },
    edgy_armor: { name: 'EDGY Cuirass', emoji: '🖤', type: 'armor', stats: { def: 90, maxHp: 420 }, craftRecipe: { d5_relic: 1, hydra_scale: 5, fish_super: 3 } },
    ultra_edgy_armor: { name: 'ULTRA-EDGY Aegis', emoji: '🔥', type: 'armor', stats: { def: 140, maxHp: 680 }, craftRecipe: { d6_relic: 1, fire_scale: 5, fish_super: 6 } },
    omega_armor: { name: 'OMEGA Force Shield', emoji: '⚡', type: 'armor', stats: { def: 210, maxHp: 1050 }, craftRecipe: { d7_relic: 1, cyber_alloy: 6, fish_super: 10 } },
    godly_aegis: { name: 'GODLY Seraph Mantle', emoji: '⭐', type: 'armor', stats: { def: 310, maxHp: 1700 }, craftRecipe: { d8_relic: 1, celestial_feather: 6, diamond: 5 } },
    nexus_prime_armor: { name: 'NEXUS Cosmic Mantle', emoji: '🌀', type: 'armor', stats: { def: 460, maxHp: 2800 }, craftRecipe: { d10_relic: 1, nexus_essence: 3, reality_tear: 3, wood_hyper: 10 } },
    void_armor: { name: 'VOID Barrier Armor', emoji: '🌌', type: 'armor', stats: { def: 680, maxHp: 4500 }, craftRecipe: { d11_relic: 1, dark_energy: 4, fish_super: 15 } }
  };

  /* ============================================================
     2. ENCHANTMENT TIERS (EXACT EPIC RPG BALANCING)
     ============================================================ */
  const ENCHANT_TIERS = [
    { id: 'normie', name: 'Normie', bonus: 0, weight: 35, minTT: 0 },
    { id: 'good', name: 'Good', bonus: 5, weight: 25, minTT: 0 },
    { id: 'great', name: 'Great', bonus: 10, weight: 15, minTT: 0 },
    { id: 'mega', name: 'Mega', bonus: 15, weight: 10, minTT: 0 },
    { id: 'epic', name: 'Epic', bonus: 20, weight: 6, minTT: 0 },
    { id: 'hyper', name: 'Hyper', bonus: 35, weight: 4, minTT: 0 },
    { id: 'ultimate', name: 'Ultimate', bonus: 50, weight: 2.5, minTT: 0 },
    { id: 'perfect', name: 'Perfect', bonus: 75, weight: 1.5, minTT: 0 },
    { id: 'edgy', name: 'EDGY', bonus: 100, weight: 0.8, minTT: 0 },
    { id: 'ultra_edgy', name: 'ULTRA-EDGY', bonus: 110, weight: 0.4, minTT: 0 },
    { id: 'omega', name: 'OMEGA', bonus: 125, weight: 0.25, minTT: 1 },
    { id: 'ultra_omega', name: 'ULTRA-OMEGA', bonus: 150, weight: 0.12, minTT: 3 },
    { id: 'godly', name: 'GODLY', bonus: 200, weight: 0.05, minTT: 5 },
    { id: 'void', name: 'VOID', bonus: 300, weight: 0.02, minTT: 15 },
    { id: 'eternal', name: 'ETERNAL', bonus: 305, weight: 0.005, minTT: 150 }
  ];

  /* ============================================================
     3. DEFAULT STATE & DUAL-LAYER PERSISTENCE
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
    bank: 0,
    currentArea: 'area_1',
    maxAreaUnlocked: 'area_1',
    inventory: {
      wood_normie: 10,
      fish_normie: 10,
      apple: 5,
      crate_common: 2,
      seed: 5
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
    timeTravel: {
      count: 0,
      timeCapsules: 0,
      perks: {
        warp_haste: 0,
        quantum_might: 0,
        singularity_guard: 0,
        astral_fortune: 0,
        chrono_regen: 0
      }
    },
    mount: {
      tier: 1,
      xp: 0
    },
    drone: {
      tier: 1,
      lastGatherAt: Date.now()
    },
    dungeonsCleared: {},
    stats: {
      monstersKilled: 0,
      bossesKilled: 0,
      chopsCount: 0,
      fishCount: 0,
      minesCount: 0,
      farmsCount: 0,
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
    cooldowns: {}
  };

  let state = JSON.parse(JSON.stringify(DEFAULT_STATE));
  let activeUsername = null;
  let authToken = null;

  /* ============================================================
     4. STAT COMPUTATION & FORMULAS (EPIC RPG SCALING)
     ============================================================ */
  function getComputedStats() {
    let baseMaxHp = 100 + (state.level - 1) * 15;
    let baseAtk = state.baseAtk + (state.level - 1) * 2;
    let baseDef = state.baseDef + (state.level - 1) * 1.5;
    let baseCrit = state.baseCrit;

    // Equipment Base
    const wItem = ITEMS[state.equipment.weapon];
    const aItem = ITEMS[state.equipment.armor];
    const accItem = ITEMS[state.equipment.accessory];

    if (wItem?.stats?.atk) baseAtk += wItem.stats.atk;
    if (wItem?.stats?.crit) baseCrit += wItem.stats.crit;

    if (aItem?.stats?.def) baseDef += aItem.stats.def;
    if (aItem?.stats?.maxHp) baseMaxHp += aItem.stats.maxHp;

    if (accItem?.stats?.atk) baseAtk += accItem.stats.atk;
    if (accItem?.stats?.def) baseDef += accItem.stats.def;
    if (accItem?.stats?.crit) baseCrit += accItem.stats.crit;
    if (accItem?.stats?.maxHp) baseMaxHp += accItem.stats.maxHp;

    // Enchants
    const wEnc = state.enchants?.weapon;
    const aEnc = state.enchants?.armor;
    if (wEnc?.bonus) baseAtk = Math.floor(baseAtk * (1 + wEnc.bonus / 100));
    if (aEnc?.bonus) baseDef = Math.floor(baseDef * (1 + aEnc.bonus / 100));

    // Mount Boost (+5% stats per Tier)
    const mTier = state.mount?.tier || 1;
    const mountMult = 1 + (mTier - 1) * 0.05;
    baseAtk = Math.floor(baseAtk * mountMult);
    baseDef = Math.floor(baseDef * mountMult);

    // Time Travel Perks
    const ttPerks = state.timeTravel?.perks || {};
    if (ttPerks.quantum_might) baseAtk = Math.floor(baseAtk * (1 + ttPerks.quantum_might * 0.25));
    if (ttPerks.singularity_guard) baseDef = Math.floor(baseDef * (1 + ttPerks.singularity_guard * 0.25));

    // Active Buffs
    if (state.buffs && state.buffs.battlesLeft > 0) {
      baseAtk = Math.floor(baseAtk * (state.buffs.atkMultiplier || 1));
      baseDef = Math.floor(baseDef * (state.buffs.defMultiplier || 1));
    }

    return {
      maxHp: Math.floor(baseMaxHp),
      atk: Math.floor(baseAtk),
      def: Math.floor(baseDef),
      crit: Math.min(75, baseCrit)
    };
  }

  function getGlobalBonusMultiplier() {
    const ttCount = state.timeTravel?.count || 0;
    return 1 + ttCount * 0.20; // +20% per Time Travel
  }

  function calculateDamage(attackerAtk, defenderDef, isCrit) {
    const baseDmg = Math.max(2, attackerAtk - Math.max(0, defenderDef) * 0.45);
    const variance = 0.85 + Math.random() * 0.3;
    let dmg = Math.floor(baseDmg * variance);
    if (isCrit) dmg = Math.floor(dmg * 1.85);
    return Math.max(1, dmg);
  }

  function checkLevelUp() {
    let leveled = false;
    while (state.xp >= state.xpToNext) {
      state.xp -= state.xpToNext;
      state.level += 1;
      state.xpToNext = Math.floor(100 * Math.pow(1.22, state.level - 1));
      leveled = true;

      const pStats = getComputedStats();
      state.hp = pStats.maxHp;
      addLog(`✨ <strong>LEVEL UP!</strong> Anda mencapai <strong>Level ${state.level}</strong>! Darah dipulihkan penuh!`, 'victory');
    }

    if (leveled) {
      updateUI();
      autoSaveInstant();
    }
  }

  /* ============================================================
     5. COOLDOWNS & ACTION HELPERS
     ============================================================ */
  function checkCooldown(actionKey, baseMs) {
    const now = Date.now();
    const readyAt = state.cooldowns[actionKey] || 0;

    // Apply Time Travel Haste Perk
    const hasteRank = state.timeTravel?.perks?.warp_haste || 0;
    const effectiveMs = Math.floor(baseMs * (1 - hasteRank * 0.10));

    if (now < readyAt) {
      const waitSec = Math.ceil((readyAt - now) / 1000);
      showToast(`⏳ ${actionKey.toUpperCase()}: Tunggu ${waitSec}s`);
      return false;
    }
    state.cooldowns[actionKey] = now + effectiveMs;
    updateCooldownBadges();
    return true;
  }

  const UNLOCK_RULES = {
    // Combat
    hunt: { minLvl: 1 },
    hardmode: { minLvl: 10, label: 'Lv. 10' },
    adventure: { minLvl: 5, label: 'Lv. 5' },
    dungeon: { minLvl: 1 }, // Dynamic based on current area
    training: { minLvl: 3, label: 'Lv. 3' },
    heal: { minLvl: 1 },

    // Gathering
    chop: { minLvl: 1 },
    fish: { minLvl: 1 },
    pickup: { minLvl: 5, label: 'Lv. 5' },
    farm: { minLvl: 10, label: 'Lv. 10' },
    mine: { minLvl: 25, label: 'Lv. 25' },

    // Forge & Enchant
    enchant: { minLvl: 1 },
    refine: { minLvl: 20, label: 'Lv. 20' },
    transmute: { minLvl: 50, label: 'Lv. 50' },
    transcend: { minLvl: 90, label: 'Lv. 90' },
    craft: { minLvl: 1 },
    dismantle: { minLvl: 8, label: 'Lv. 8' },

    // Bag & Market
    inventory: { minLvl: 1 },
    crate: { minLvl: 1 },
    shop: { minLvl: 1 },
    bank: { minLvl: 5, label: 'Lv. 5' },
    trade: { minLvl: 15, label: 'Lv. 15' },

    // Special
    casino: { minLvl: 15, label: 'Lv. 15' },
    mount: { minLvl: 10, reqDung: 2, label: 'Lv. 10 & D2' },
    drone: { minLvl: 25, reqDung: 4, label: 'Lv. 25 & D4' }
  };

  function checkProgressionLock(actionKey) {
    const rule = UNLOCK_RULES[actionKey];
    if (!rule) return { locked: false };

    // Dynamic Dungeon requirement based on current area
    if (actionKey === 'dungeon') {
      const areaNum = getAreaNumber();
      const areaObj = AREAS.find(a => a.id === `area_${areaNum}`) || AREAS[0];
      if (state.level < areaObj.levelReq) {
        return {
          locked: true,
          reason: `Level Anda belum cukup! ${areaObj.name} butuh Level ${areaObj.levelReq}+.`,
          label: `🔒 Lv. ${areaObj.levelReq}`
        };
      }
      return { locked: false };
    }

    if (state.level < rule.minLvl) {
      return {
        locked: true,
        reason: `Fitur ini terkunci! Butuh Level ${rule.minLvl}+.`,
        label: `🔒 ${rule.label}`
      };
    }

    if (rule.reqDung) {
      const dungKey = `area_${rule.reqDung}`;
      if (!state.dungeonsCleared[dungKey]) {
        return {
          locked: true,
          reason: `Harus menaklukkan Boss Dungeon ${rule.reqDung} terlebih dahulu!`,
          label: `🔒 ${rule.label}`
        };
      }
    }

    return { locked: false };
  }

  function isAreaUnlocked(areaObj) {
    const idx = AREAS.findIndex(a => a.id === areaObj.id);
    if (idx <= 0) return { unlocked: true }; // Area 1 always unlocked

    if (state.level < areaObj.levelReq) {
      return {
        unlocked: false,
        reason: `Butuh Level ${areaObj.levelReq}+`
      };
    }

    const prevArea = AREAS[idx - 1];
    if (!state.dungeonsCleared[prevArea.id]) {
      return {
        unlocked: false,
        reason: `Kalahkan Boss Dungeon ${idx} terlebih dahulu!`
      };
    }

    if (idx >= 10 && (state.timeTravel?.count || 0) < 1) {
      return {
        unlocked: false,
        reason: `Zona Dimensi Tinggi! Harus Time Travel (TT 1+) terlebih dahulu!`
      };
    }

    return { unlocked: true };
  }

  function updateCooldownBadges() {
    const now = Date.now();
    const actions = [
      'hunt', 'hardmode', 'adventure', 'dungeon', 'training', 'heal',
      'chop', 'fish', 'mine', 'farm', 'pickup',
      'enchant', 'refine', 'transmute', 'transcend', 'craft', 'dismantle',
      'inventory', 'crate', 'shop', 'bank', 'trade'
    ];

    actions.forEach(act => {
      const el = document.getElementById(`cd-${act}`) || document.querySelector(`[data-action="${act}"] .tile-status`);
      const btn = document.querySelector(`[data-action="${act}"]`);
      if (!el || !btn) return;

      const lock = checkProgressionLock(act);
      if (lock.locked) {
        btn.classList.add('locked');
        btn.classList.remove('on-cooldown');
        el.textContent = lock.label;
        return;
      } else {
        btn.classList.remove('locked');
      }

      const readyAt = state.cooldowns[act] || 0;
      if (now < readyAt) {
        const sec = Math.ceil((readyAt - now) / 1000);
        el.textContent = `${sec}s`;
        btn.classList.add('on-cooldown');
      } else {
        btn.classList.remove('on-cooldown');
        if (act === 'hunt') el.textContent = 'Siap';
        else if (act === 'hardmode') el.textContent = '2x Hadiah';
        else if (act === 'adventure') el.textContent = '3 Ronde';
        else if (act === 'dungeon') el.textContent = 'Boss Area';
        else if (act === 'training') el.textContent = 'Latih Stat';
        else if (act === 'heal') {
          const stats = getComputedStats();
          const missing = stats.maxHp - state.hp;
          el.textContent = missing > 0 ? `${Math.max(10, Math.floor(missing * 0.5))} 💰` : '100% HP';
        }
        else if (act === 'chop') el.textContent = 'Kayu & Apel';
        else if (act === 'fish') el.textContent = 'Ikan & Ruby';
        else if (act === 'mine') el.textContent = 'Mineral & Koin';
        else if (act === 'farm') el.textContent = 'Bibit & Sayur';
        else if (act === 'pickup') el.textContent = 'Buah Kosmik';
        else if (act === 'enchant') el.textContent = '1x Roll';
        else if (act === 'refine') el.textContent = '10x Roll';
        else if (act === 'transmute') el.textContent = '100x Roll';
        else if (act === 'transcend') el.textContent = '1000x Roll';
        else if (act === 'craft') el.textContent = 'Tempa Gear';
        else if (act === 'dismantle') el.textContent = 'Bongkar';
        else if (act === 'inventory') el.textContent = 'Buka Tas';
        else if (act === 'crate') el.textContent = 'Buka Peti';
        else if (act === 'shop') el.textContent = 'Toko';
        else if (act === 'bank') el.textContent = 'Koin Aman';
        else if (act === 'trade') el.textContent = 'Tukar';
      }
    });
  }

  setInterval(updateCooldownBadges, 1000);

  /* ============================================================
     6. UI UPDATE & HUD RENDERING
     ============================================================ */
  function updateUI() {
    const stats = getComputedStats();
    if (state.hp > stats.maxHp) state.hp = stats.maxHp;

    const hpPct = Math.max(0, Math.min(100, (state.hp / stats.maxHp) * 100));
    const xpPct = Math.max(0, Math.min(100, (state.xp / state.xpToNext) * 100));
    const name = state.characterName || activeUsername || 'Hero';
    const areaObj = AREAS.find(a => a.id === state.currentArea) || AREAS[0];

    // HUD Elements
    document.getElementById('char-name').textContent = name;
    document.getElementById('char-level').textContent = state.level;
    document.getElementById('hud-hp-text').textContent = `${Math.max(0, state.hp)}/${stats.maxHp}`;
    document.getElementById('hud-hp-bar').style.width = `${hpPct}%`;
    document.getElementById('hud-xp-text').textContent = `${state.xp}/${state.xpToNext}`;
    document.getElementById('hud-xp-bar').style.width = `${xpPct}%`;
    document.getElementById('gold-display').textContent = Number(state.gold).toLocaleString();
    document.getElementById('bank-display').textContent = Number(state.bank || 0).toLocaleString();
    document.getElementById('tt-rank-display').textContent = `TT ${state.timeTravel?.count || 0}`;
    document.getElementById('capsule-display').textContent = state.timeTravel?.timeCapsules || 0;
    document.getElementById('area-display').textContent = areaObj.name.split(':')[0];

    // Heal Cost Badge
    const missingHp = stats.maxHp - state.hp;
    const healCost = Math.max(10, Math.floor(missingHp * 0.5));
    const healBadge = document.getElementById('heal-cost-badge');
    if (healBadge) healBadge.textContent = missingHp > 0 ? `${healCost} 💰` : '100% HP';

    // Profile Tab
    if (document.getElementById('prof-char-name')) {
      document.getElementById('prof-char-name').textContent = name;
      document.getElementById('prof-level').textContent = state.level;
      document.getElementById('prof-gold').textContent = Number(state.gold).toLocaleString();
      document.getElementById('prof-bank').textContent = Number(state.bank || 0).toLocaleString();
      document.getElementById('prof-tt').textContent = `TT ${state.timeTravel?.count || 0}`;
      document.getElementById('prof-area').textContent = `${areaObj.emoji} ${areaObj.name}`;

      document.getElementById('stat-m-kills').textContent = state.stats.monstersKilled || 0;
      document.getElementById('stat-b-kills').textContent = state.stats.bossesKilled || 0;
      document.getElementById('stat-chops').textContent = state.stats.chopsCount || 0;
      document.getElementById('stat-fish').textContent = state.stats.fishCount || 0;
      document.getElementById('stat-mines').textContent = state.stats.minesCount || 0;
      document.getElementById('stat-farms').textContent = state.stats.farmsCount || 0;
      document.getElementById('stat-crates').textContent = state.stats.cratesOpened || 0;
      document.getElementById('stat-deaths').textContent = state.stats.deaths || 0;
      document.getElementById('stat-dmg').textContent = Number(state.stats.totalDamageDealt || 0).toLocaleString();
      document.getElementById('stat-earned').textContent = Number(state.stats.goldEarned || 0).toLocaleString();

      const wItem = ITEMS[state.equipment.weapon];
      const aItem = ITEMS[state.equipment.armor];
      const accItem = ITEMS[state.equipment.accessory];
      const wEnc = state.enchants?.weapon;
      const aEnc = state.enchants?.armor;

      document.getElementById('prof-weapon').textContent = wItem ? `${wItem.emoji} ${wItem.name}${wEnc ? ` [${wEnc.name} +${wEnc.bonus}%]` : ''}` : 'None';
      document.getElementById('prof-armor').textContent = aItem ? `${aItem.emoji} ${aItem.name}${aEnc ? ` [${aEnc.name} +${aEnc.bonus}%]` : ''}` : 'None';
      document.getElementById('prof-acc').textContent = accItem ? `${accItem.emoji} ${accItem.name}` : 'None';
    }

    // Mount & Drone Progression Locks
    const mountLock = checkProgressionLock('mount');
    const btnTrainMount = document.getElementById('btn-train-mount');
    const mountTierDisp = document.getElementById('mount-tier-display');
    if (btnTrainMount) {
      if (mountLock.locked) {
        btnTrainMount.setAttribute('disabled', 'true');
        btnTrainMount.style.opacity = '0.5';
        btnTrainMount.style.cursor = 'not-allowed';
        btnTrainMount.textContent = `🔒 TERKUNCI (${mountLock.reason})`;
        if (mountTierDisp) mountTierDisp.textContent = '🔒 Belum Terbuka';
      } else {
        btnTrainMount.removeAttribute('disabled');
        btnTrainMount.style.opacity = '1';
        btnTrainMount.style.cursor = 'pointer';
        btnTrainMount.textContent = `🥕 LATIH MOUNT (${500 * (state.mount?.tier || 1)} 💰 & 5 🥕)`;
        if (mountTierDisp) mountTierDisp.textContent = `Tier ${state.mount?.tier || 1} • Novice`;
      }
    }

    const droneLock = checkProgressionLock('drone');
    const btnUpgradeDrone = document.getElementById('btn-upgrade-drone');
    const droneTierDisp = document.getElementById('drone-tier-display');
    if (btnUpgradeDrone) {
      if (droneLock.locked) {
        btnUpgradeDrone.setAttribute('disabled', 'true');
        btnUpgradeDrone.style.opacity = '0.5';
        btnUpgradeDrone.style.cursor = 'not-allowed';
        btnUpgradeDrone.textContent = `🔒 TERKUNCI (${droneLock.reason})`;
        if (droneTierDisp) droneTierDisp.textContent = '🔒 Belum Terbuka';
      } else {
        btnUpgradeDrone.removeAttribute('disabled');
        btnUpgradeDrone.style.opacity = '1';
        btnUpgradeDrone.style.cursor = 'pointer';
        btnUpgradeDrone.textContent = `⚙️ UPGRADE DRONE (${1000 * (state.drone?.tier || 1)} 💰 & 10 🪵)`;
        if (droneTierDisp) droneTierDisp.textContent = `Tier ${state.drone?.tier || 1} • Harvester`;
      }
    }

    // Casino Progression Lock
    const casinoLockedView = document.getElementById('casino-locked-view');
    const casinoUnlockedView = document.getElementById('casino-unlocked-view');
    const casinoLvlReq = document.getElementById('casino-lvl-req');
    if (casinoLockedView && casinoUnlockedView) {
      if (state.level < 15) {
        casinoLockedView.style.display = 'flex';
        casinoUnlockedView.style.display = 'none';
        if (casinoLvlReq) casinoLvlReq.textContent = `Level Anda: ${state.level} / 15`;
      } else {
        casinoLockedView.style.display = 'none';
        casinoUnlockedView.style.display = 'grid';
      }
    }

    // Right Hero Panel & Quick Slots
    const rpHeroName = document.getElementById('rp-hero-name');
    if (rpHeroName) {
      rpHeroName.textContent = name;
      const rpHeroLvl = document.getElementById('rp-hero-level');
      if (rpHeroLvl) rpHeroLvl.textContent = state.level;
      const rpHeroArea = document.getElementById('rp-hero-area');
      if (rpHeroArea) rpHeroArea.textContent = areaObj.name.split(':')[0];

      const rpHpVal = document.getElementById('rp-hp-val');
      if (rpHpVal) rpHpVal.textContent = `${Math.max(0, state.hp)}/${stats.maxHp}`;
      const rpHpFill = document.getElementById('rp-hp-fill');
      if (rpHpFill) rpHpFill.style.width = `${hpPct}%`;

      const rpXpVal = document.getElementById('rp-xp-val');
      if (rpXpVal) rpXpVal.textContent = `${state.xp}/${state.xpToNext}`;
      const rpXpFill = document.getElementById('rp-xp-fill');
      if (rpXpFill) rpXpFill.style.width = `${xpPct}%`;

      const rpStatAtk = document.getElementById('rp-stat-atk');
      if (rpStatAtk) rpStatAtk.textContent = stats.atk;
      const rpStatDef = document.getElementById('rp-stat-def');
      if (rpStatDef) rpStatDef.textContent = stats.def;
      const rpStatCrit = document.getElementById('rp-stat-crit');
      if (rpStatCrit) rpStatCrit.textContent = `${stats.crit}%`;
      const rpStatTt = document.getElementById('rp-stat-tt');
      if (rpStatTt) rpStatTt.textContent = `TT ${state.timeTravel?.count || 0}`;

      const wItem = ITEMS[state.equipment.weapon];
      const aItem = ITEMS[state.equipment.armor];
      const accItem = ITEMS[state.equipment.accessory];
      const wEnc = state.enchants?.weapon;
      const aEnc = state.enchants?.armor;

      const rpGearWep = document.getElementById('rp-gear-weapon');
      if (rpGearWep) rpGearWep.textContent = wItem ? `${wItem.emoji} ${wItem.name}` : 'None';
      const rpEncWep = document.getElementById('rp-enc-weapon');
      if (rpEncWep) rpEncWep.textContent = wEnc ? `${wEnc.name} (+${wEnc.bonus}%)` : 'Normie (+0%)';

      const rpGearArm = document.getElementById('rp-gear-armor');
      if (rpGearArm) rpGearArm.textContent = aItem ? `${aItem.emoji} ${aItem.name}` : 'None';
      const rpEncArm = document.getElementById('rp-enc-armor');
      if (rpEncArm) rpEncArm.textContent = aEnc ? `${aEnc.name} (+${aEnc.bonus}%)` : 'Normie (+0%)';

      const rpGearAcc = document.getElementById('rp-gear-acc');
      if (rpGearAcc) rpGearAcc.textContent = accItem ? `${accItem.emoji} ${accItem.name}` : 'None';

      const rpMountName = document.getElementById('rp-mount-name');
      if (rpMountName) rpMountName.textContent = 'Cyber Steed';
      const rpMountSub = document.getElementById('rp-mount-sub');
      if (rpMountSub) rpMountSub.textContent = `Tier ${state.mount?.tier || 1} • Novice`;

      const totalPotions = (state.inventory['potion_small'] || 0) +
                           (state.inventory['potion_medium'] || 0) +
                           (state.inventory['potion_large'] || 0) +
                           (state.inventory['potion_mega'] || 0);
      const rpCntPot = document.getElementById('rp-cnt-potion');
      if (rpCntPot) rpCntPot.textContent = totalPotions;

      const rpCntApp = document.getElementById('rp-cnt-apple');
      if (rpCntApp) rpCntApp.textContent = state.inventory['apple'] || 0;
    }

    // Refresh action tile statuses
    updateCooldownBadges();

    // Time Travel Altar
    updateTimeTravelTab();
  }

  function addLog(msg, type = 'system') {
    const div = document.createElement('div');
    div.className = `log-entry ${type}`;
    div.innerHTML = msg;
    const feed = document.getElementById('game-log');
    if (feed) {
      feed.insertBefore(div, feed.firstChild);
      while (feed.children.length > 50) {
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

  /* ============================================================
     7. COMBAT SYSTEM: HUNT, HARDMODE, ADV, DUNGEON, HEAL
     ============================================================ */
  function executeBattle(monster, isBoss = false, isHardmode = false) {
    const pStats = getComputedStats();
    let mHp = isHardmode ? Math.floor(monster.hp * 1.5) : monster.hp;
    let mAtk = isHardmode ? Math.floor(monster.atk * 1.4) : monster.atk;
    let mDef = isHardmode ? Math.floor(monster.def * 1.3) : monster.def;
    let pHp = state.hp;
    let round = 1;

    while (mHp > 0 && pHp > 0 && round <= 15) {
      const isCrit = Math.random() * 100 < pStats.crit;
      let pDmg = calculateDamage(pStats.atk, mDef, isCrit);
      mHp -= pDmg;
      state.stats.totalDamageDealt += pDmg;

      if (mHp <= 0) break;

      let mDmg = calculateDamage(mAtk, pStats.def, false);
      pHp -= mDmg;
      round++;
    }

    state.hp = Math.max(0, pHp);

    if (mHp <= 0) {
      const globalMult = getGlobalBonusMultiplier();
      let goldMult = isHardmode ? 2.0 : 1.0;
      let xpMult = isHardmode ? 2.0 : 1.0;

      let earnedGold = Math.floor(monster.gold * goldMult * globalMult * (1 + Math.random() * 0.2));
      let earnedXp = Math.floor(monster.xp * xpMult * globalMult);

      state.gold += earnedGold;
      state.xp += earnedXp;
      state.stats.goldEarned += earnedGold;

      if (isBoss) state.stats.bossesKilled += 1;
      else state.stats.monstersKilled += 1;

      // Drops
      let dropsEarned = [];
      const dropBonus = 1 + (state.timeTravel?.perks?.astral_fortune || 0) * 0.35;

      if (monster.drops) {
        monster.drops.forEach(d => {
          if (Math.random() < d.chance * dropBonus) {
            state.inventory[d.id] = (state.inventory[d.id] || 0) + 1;
            const it = ITEMS[d.id];
            dropsEarned.push(it ? `${it.emoji} ${it.name}` : d.id);
          }
        });
      }

      // Boss Relic
      if (isBoss && monster.relic) {
        state.inventory[monster.relic] = (state.inventory[monster.relic] || 0) + 1;
        state.dungeonsCleared[state.currentArea] = true;
        const it = ITEMS[monster.relic];
        dropsEarned.push(it ? `${it.emoji} ${it.name}` : monster.relic);
      }

      // Passive Chrono HP Regen perk
      const regenRank = state.timeTravel?.perks?.chrono_regen || 0;
      if (regenRank > 0) {
        const healBack = Math.floor(pStats.maxHp * regenRank * 0.15);
        state.hp = Math.min(pStats.maxHp, state.hp + healBack);
      }

      const dropStr = dropsEarned.length ? ` | 🎁 ${dropsEarned.join(', ')}` : '';
      const modeStr = isHardmode ? '⚡ [HARDMODE]' : (isBoss ? '👑 [BOSS]' : '⚔️ [HUNT]');
      addLog(`${modeStr} <strong>${monster.name}</strong> dikalahkan! ❤️ -${Math.max(0, pStats.maxHp - pHp)} HP | <span class="reward-pill gold">+${earnedGold} 💰</span> <span class="reward-pill xp">+${earnedXp} ⭐</span>${dropStr}`, isBoss ? 'victory' : 'combat');

      checkLevelUp();
      return true;
    } else {
      state.stats.deaths += 1;
      addLog(`💀 <strong>TUMBANG:</strong> ${monster.emoji} ${monster.name} menghabisi Anda! Gunakan ❤️ Heal.`, 'danger');
      return false;
    }
  }

  function handleHunt(isHardmode = false) {
    const actKey = isHardmode ? 'hardmode' : 'hunt';
    const cdMs = isHardmode ? 4000 : 2000;
    if (!checkCooldown(actKey, cdMs)) return;

    if (state.hp <= 0) {
      showToast('💀 Anda pingsan! Gunakan ❤️ Heal terlebih dahulu.');
      return;
    }

    const areaMonsters = MONSTERS[state.currentArea] || MONSTERS.area_1;
    const monster = areaMonsters[Math.floor(Math.random() * areaMonsters.length)];

    executeBattle(monster, false, isHardmode);
    updateUI();
    autoSaveInstant();
  }

  function handleAdventure() {
    if (!checkCooldown('adventure', 5000)) return;
    if (state.hp <= 0) { showToast('💀 Anda pingsan! Pulihkan diri.'); return; }

    const areaMonsters = MONSTERS[state.currentArea] || MONSTERS.area_1;
    addLog(`🗺️ <strong>ADVENTURE:</strong> Melakukan ekspedisi 3 gelombang monster di ${state.currentArea.toUpperCase()}!`, 'special');

    let wonAll = true;
    for (let i = 1; i <= 3; i++) {
      if (state.hp <= 0) { wonAll = false; break; }
      const m = areaMonsters[Math.floor(Math.random() * areaMonsters.length)];
      if (!executeBattle(m, false, false)) { wonAll = false; break; }
    }

    if (wonAll) {
      const bonusGold = 100 * (AREAS.findIndex(a => a.id === state.currentArea) + 1);
      state.gold += bonusGold;
      addLog(`🎉 <strong>EKSPEDISI SELESAI:</strong> Bonus keberhasilan ekspedisi <span class="reward-pill gold">+${bonusGold} 💰</span>!`, 'victory');
    }

    updateUI();
    autoSaveInstant();
  }

  function handleDungeon() {
    if (!checkCooldown('dungeon', 8000)) return;
    if (state.hp <= 0) { showToast('💀 Anda pingsan! Gunakan ❤️ Heal.'); return; }

    const boss = DUNGEON_BOSSES[state.currentArea];
    if (!boss) { showToast('Dungeon belum tersedia di area ini!'); return; }

    const ok = executeBattle(boss, true, false);
    if (ok) {
      // Unlock next area if not already
      const curIdx = AREAS.findIndex(a => a.id === state.currentArea);
      if (curIdx < AREAS.length - 1) {
        const nextArea = AREAS[curIdx + 1];
        state.maxAreaUnlocked = nextArea.id;
        state.currentArea = nextArea.id;
        addLog(`🚪 <strong>GERBANG TERBUKA:</strong> Anda menaklukkan dungeon dan melangkah ke ${nextArea.emoji} <strong>${nextArea.name}</strong>!`, 'victory');
      }
    }

    updateUI();
    autoSaveInstant();
  }

  function handleHeal() {
    const stats = getComputedStats();
    if (state.hp >= stats.maxHp) {
      showToast('❤️ Darah Anda sudah penuh 100%!');
      return;
    }
    const missing = stats.maxHp - state.hp;
    const cost = Math.max(10, Math.floor(missing * 0.5));
    if (state.gold < cost) {
      showToast(`Gold tidak cukup! Butuh ${cost} 💰.`);
      return;
    }

    state.gold -= cost;
    state.hp = stats.maxHp;
    showToast(`❤️ Darah dipulihkan 100% (-${cost} 💰)`);
    addLog(`❤️ <strong>SANCTUARY:</strong> Memulihkan diri penuh ke ${stats.maxHp} HP seharga ${cost} 💰.`, 'system');
    updateUI();
    autoSaveInstant();
  }

  function quickHeal() {
    handleHeal();
  }

  function quickPotion() {
    const potionTiers = ['potion_mega', 'potion_large', 'potion_medium', 'potion_small'];
    const availableKey = potionTiers.find(k => (state.inventory[k] || 0) > 0);
    if (!availableKey) {
      showToast('⚠️ Tidak ada potion di tas! Kunjungi Toko / Shop 🛒.');
      return;
    }
    const it = ITEMS[availableKey];
    const stats = getComputedStats();
    if (state.hp >= stats.maxHp) {
      showToast('❤️ HP Anda sudah penuh 100%!');
      return;
    }
    useItem(availableKey);
  }

  function quickApple() {
    const appleCount = state.inventory['apple'] || 0;
    if (appleCount <= 0) {
      showToast('⚠️ Tidak ada Apel di tas! Kumpulkan lewat Panen Chop 🪓 atau Pickup 🍎.');
      return;
    }
    const stats = getComputedStats();
    if (state.hp >= stats.maxHp) {
      showToast('❤️ HP Anda sudah penuh 100%!');
      return;
    }
    state.inventory['apple'] -= 1;
    state.hp = Math.min(stats.maxHp, state.hp + 30);
    showToast('🍎 Memakan Apel Kosmik (+30 HP)!');
    addLog('🍎 Anda memakan Apel Kosmik dan memulihkan 30 HP.', 'heal');
    updateUI();
    autoSaveInstant();
  }

  function handleTraining() {
    if (!checkCooldown('training', 4000)) return;

    const questions = [
      { q: 'Pilih rune keseimbangan kosmik:', opts: ['Alpha', 'Delta', 'Omega'], correct: 2 },
      { q: 'Berapa hasil kompresi kuantum 12 x 8?', opts: ['96', '84', '108'], correct: 0 },
      { q: 'Simbol material tertinggi pohon waktu:', opts: ['Hyper Wood', 'Ultimate Wood', 'Normie Wood'], correct: 1 }
    ];
    const item = questions[Math.floor(Math.random() * questions.length)];

    openModal('🎯 Sesi Latihan Stat (Training)', () => `
      <div style="text-align:center; padding:10px;">
        <p style="font-size:13px; font-weight:700; margin-bottom:12px;">${item.q}</p>
        <div style="display:flex; flex-direction:column; gap:8px;">
          ${item.opts.map((opt, idx) => `
            <button class="glow-button" onclick="window.NexusRPG.answerTraining(${idx}, ${item.correct})">${opt}</button>
          `).join('')}
        </div>
      </div>
    `);
  }

  function answerTraining(chosen, correct) {
    closeModal();
    if (chosen === correct) {
      const statChoice = Math.random() < 0.5 ? 'baseAtk' : 'baseDef';
      state[statChoice] += 1;
      const gainedGold = 50 * state.level;
      state.gold += gainedGold;
      showToast(`🎯 Latihan Berhasil! +1 ${statChoice === 'baseAtk' ? 'ATK' : 'DEF'} & +${gainedGold} 💰!`);
      addLog(`🎯 <strong>LATIHAN SEMPURNA:</strong> Jawaban tepat! Karakter mendapat <strong>+1 ${statChoice === 'baseAtk' ? 'ATK' : 'DEF'}</strong> dan <span class="reward-pill gold">+${gainedGold} 💰</span>!`, 'victory');
    } else {
      showToast('❌ Kurang tepat! Coba lagi saat cooldown selesai.');
      addLog(`🎯 <strong>LATIHAN:</strong> Jawaban kurang tepat, tidak mendapat peningkatan stat.`, 'system');
    }
    updateUI();
    autoSaveInstant();
  }

  /* ============================================================
     8. GATHERING SYSTEM (CHOP, FISH, MINE, FARM, PICKUP)
     ============================================================ */
  function handleChop() {
    if (!checkCooldown('chop', 3000)) return;
    state.stats.chopsCount += 1;

    let woodType = 'wood_normie';
    const roll = Math.random();
    if (roll < 0.05) woodType = 'wood_super';
    else if (roll < 0.25) woodType = 'wood_epic';

    const amt = 3 + Math.floor(Math.random() * 5);
    state.inventory[woodType] = (state.inventory[woodType] || 0) + amt;

    let extra = '';
    if (Math.random() < 0.35) {
      state.inventory.apple = (state.inventory.apple || 0) + 1;
      extra += ', +1 🍎 Apple';
    }
    if (Math.random() < 0.12) {
      state.inventory.crate_common = (state.inventory.crate_common || 0) + 1;
      extra += ', +1 📦 Common Crate';
    }

    addLog(`🪓 <strong>CHOP:</strong> Berhasil menebang +${amt} ${ITEMS[woodType].emoji} ${ITEMS[woodType].name}${extra}!`, 'system');
    updateUI();
    autoSaveInstant();
  }

  function handleFish() {
    if (!checkCooldown('fish', 3000)) return;
    state.stats.fishCount += 1;

    let fishType = 'fish_normie';
    const roll = Math.random();
    if (roll < 0.08) fishType = 'fish_epic';
    else if (roll < 0.28) fishType = 'fish_golden';

    const amt = 2 + Math.floor(Math.random() * 4);
    state.inventory[fishType] = (state.inventory[fishType] || 0) + amt;

    let extra = '';
    if (Math.random() < 0.15) {
      state.inventory.ruby = (state.inventory.ruby || 0) + 1;
      extra += ', +1 💎 Ruby';
    }

    addLog(`🎣 <strong>FISH:</strong> Memancing dan menangkap +${amt} ${ITEMS[fishType].emoji} ${ITEMS[fishType].name}${extra}!`, 'system');
    updateUI();
    autoSaveInstant();
  }

  function handleMine() {
    if (!checkCooldown('mine', 4000)) return;
    state.stats.minesCount += 1;

    const goldMined = 40 + Math.floor(Math.random() * 80);
    state.gold += goldMined;
    state.stats.goldEarned += goldMined;

    let extra = '';
    if (Math.random() < 0.25) {
      state.inventory.ruby = (state.inventory.ruby || 0) + 1;
      extra += ', +1 💎 Ruby';
    }
    if (Math.random() < 0.08) {
      state.inventory.diamond = (state.inventory.diamond || 0) + 1;
      extra += ', +1 💠 Diamond';
    }

    addLog(`⛏️ <strong>MINE:</strong> Menambang mineral dan memperoleh +${goldMined} 💰 Koin${extra}!`, 'system');
    updateUI();
    autoSaveInstant();
  }

  function handleFarm() {
    if (!checkCooldown('farm', 3500)) return;
    state.stats.farmsCount += 1;

    const carrotAmt = 2 + Math.floor(Math.random() * 4);
    const potatoAmt = 1 + Math.floor(Math.random() * 3);
    state.inventory.carrot = (state.inventory.carrot || 0) + carrotAmt;
    state.inventory.potato = (state.inventory.potato || 0) + potatoAmt;

    addLog(`🌾 <strong>FARM:</strong> Memanen hasil ladang: +${carrotAmt} 🥕 Carrot, +${potatoAmt} 🥔 Potato!`, 'system');
    updateUI();
    autoSaveInstant();
  }

  function handlePickup() {
    if (!checkCooldown('pickup', 2500)) return;

    let fruits = [];
    if (Math.random() < 0.6) {
      state.inventory.apple = (state.inventory.apple || 0) + 1;
      fruits.push('+1 🍎 Apple');
    }
    if (Math.random() < 0.4) {
      state.inventory.banana = (state.inventory.banana || 0) + 1;
      fruits.push('+1 🍌 Banana');
    }
    if (Math.random() < 0.5) {
      state.inventory.seed = (state.inventory.seed || 0) + 2;
      fruits.push('+2 🌱 Seed');
    }

    addLog(`🍎 <strong>PICKUP:</strong> Memungut bahan di sekitar: ${fruits.join(', ') || 'tidak menemukan apapun'}.`, 'system');
    updateUI();
    autoSaveInstant();
  }

  /* ============================================================
     9. FORGE & ENCHANTING (15 TIERS, REFINE, TRANSMUTE, TRANSCEND)
     ============================================================ */
  function getAreaNumber() {
    if (!state.currentArea) return 1;
    const match = String(state.currentArea).match(/\d+/);
    return match ? parseInt(match[0], 10) : 1;
  }

  function getAreaIndex() {
    const num = getAreaNumber();
    const idx = AREAS.findIndex(a => a.id === `area_${num}`);
    return idx >= 0 ? idx : 0;
  }

  function getEnchantCost(rolls = 1) {
    const areaNum = getAreaNumber();
    const baseCost = areaNum * 500; // 500 gold per roll per area level
    return Math.max(500, baseCost * rolls);
  }

  function rollSingleEnchant() {
    const curTT = state.timeTravel?.count || 0;
    const mountTier = state.mount?.tier || 1;
    const available = ENCHANT_TIERS.filter(t => curTT >= t.minTT);

    // Mount boosts top-tier weights
    let pool = [];
    available.forEach(t => {
      let w = t.weight;
      if (t.bonus >= 100) w *= (1 + (mountTier - 1) * 0.1);
      pool.push({ tier: t, w });
    });

    const totalWeight = pool.reduce((acc, p) => acc + p.w, 0);
    let rnd = Math.random() * totalWeight;

    for (let p of pool) {
      if (rnd < p.w) return p.tier;
      rnd -= p.w;
    }
    return available[0];
  }

  function executeEnchantBatch(type = 'weapon', rollsCount = 1) {
    const totalCost = getEnchantCost(rollsCount);
    const costFmt = Number(totalCost).toLocaleString();

    if (state.gold < totalCost) {
      showToast(`Gold tidak cukup! Butuh ${costFmt} 💰.`);
      return;
    }

    state.gold -= totalCost;

    let bestTier = null;
    for (let i = 0; i < rollsCount; i++) {
      const rolled = rollSingleEnchant();
      if (!bestTier || rolled.bonus > bestTier.bonus) {
        bestTier = rolled;
      }
    }

    state.enchants[type] = {
      id: bestTier.id,
      name: bestTier.name,
      bonus: bestTier.bonus
    };

    const targetName = type === 'weapon' ? 'Senjata' : 'Zirah';
    showToast(`✨ ${targetName} ter-enchant: [${bestTier.name} +${bestTier.bonus}%]!`);
    addLog(`✨ <strong>ENCHANT ALTAR:</strong> ${targetName} berhasil diperkuat menjadi <strong>[${bestTier.name} +${bestTier.bonus}%]</strong> seharga ${costFmt} 💰!`, 'victory');

    updateUI();
    autoSaveInstant();
    closeModal();
  }

  function openEnchantModal(rolls = 1, title = 'Enchant') {
    const cost = getEnchantCost(rolls);
    const costFmt = Number(cost).toLocaleString();

    openModal(`✨ ${title} (${rolls}x Roll - Biaya: ${costFmt} 💰)`, () => `
      <div style="text-align:center; padding:10px;">
        <p style="font-size:12px; color:var(--text-sub); margin-bottom:14px;">Pilih peralatan yang ingin ditingkatkan tingkat kekuatannya:</p>
        <div style="display:grid; grid-template-columns:1fr 1fr; gap:10px;">
          <button class="glow-button" onclick="window.NexusRPG.executeEnchantBatch('weapon', ${rolls})">🗡️ SENJATA (${costFmt} 💰)</button>
          <button class="glow-button register-btn" onclick="window.NexusRPG.executeEnchantBatch('armor', ${rolls})">🛡️ ZIRAH (${costFmt} 💰)</button>
        </div>
      </div>
    `);
  }

  function openCraftModal() {
    const recipes = [
      { id: 'fish_sword', name: 'Fish Sword', minLvl: 1, req: { fish_normie: 6, wood_normie: 6 } },
      { id: 'fish_armor', name: 'Fish Vest', minLvl: 1, req: { fish_normie: 6, wood_normie: 4 } },
      { id: 'wood_epic', name: 'Convert: 10 Normie -> 1 Epic Wood', minLvl: 1, req: { wood_normie: 10 } },
      { id: 'wolf_katana', name: 'Wolf Katana', minLvl: 5, reqDung: 1, req: { d1_relic: 1, wolf_pelt: 5, wood_epic: 3 } },
      { id: 'wolf_fur_mantle', name: 'Alpha Mantle', minLvl: 5, reqDung: 1, req: { d1_relic: 1, wolf_pelt: 6, fish_golden: 2 } },
      { id: 'wood_super', name: 'Convert: 10 Epic -> 1 Super Wood', minLvl: 10, req: { wood_epic: 10 } },
      { id: 'enchanted_blade', name: 'Enchanted Claymore', minLvl: 10, reqDung: 2, req: { d2_relic: 1, wood_super: 4, ruby: 2 } },
      { id: 'frost_halberd', name: 'Frost Halberd', minLvl: 20, reqDung: 4, req: { d4_relic: 1, ice_crystal: 4, diamond: 1 } },
      { id: 'edgy_blade', name: 'EDGY Scythe', minLvl: 30, reqDung: 5, req: { d5_relic: 1, siren_hair: 5, wood_mega: 4 } },
      { id: 'edgy_armor', name: 'EDGY Cuirass', minLvl: 30, reqDung: 5, req: { d5_relic: 1, hydra_scale: 5, fish_super: 3 } }
    ];

    openModal('🔨 Mystic Forge (Crafting & Tempa)', () => `
      <div style="display:flex; flex-direction:column; gap:8px;">
        ${recipes.map(r => {
          const it = ITEMS[r.id];
          const lvlOk = state.level >= (r.minLvl || 1);
          const dungOk = !r.reqDung || Boolean(state.dungeonsCleared[`area_${r.reqDung}`]);
          const isUnlocked = lvlOk && dungOk;

          const hasMats = isUnlocked && Object.entries(r.req).every(([matId, needed]) => (state.inventory[matId] || 0) >= needed);
          const reqStr = Object.entries(r.req).map(([matId, n]) => `${n}x ${ITEMS[matId]?.name || matId} (${state.inventory[matId] || 0}/${n})`).join(', ');
          const lockReason = !lvlOk ? `🔒 Butuh Level ${r.minLvl}+` : (!dungOk ? `🔒 Kalahkan Boss Dungeon ${r.reqDung}` : '');

          return `
            <div class="perk-card" style="${isUnlocked ? '' : 'opacity:0.4; filter:grayscale(0.8);'}">
              <div class="perk-meta">
                <span class="perk-name">${it?.emoji || '🔨'} ${r.name} ${isUnlocked ? '' : `<small style="color:#f87171; font-weight:700;">[${lockReason}]</small>`}</span>
                <span class="perk-desc">${isUnlocked ? reqStr : lockReason}</span>
              </div>
              <button class="perk-btn" ${hasMats ? '' : 'disabled style="opacity:0.4; cursor:not-allowed;"'} onclick="${isUnlocked ? `window.NexusRPG.craftItem('${r.id}')` : `alert('${lockReason}')`}">
                ${isUnlocked ? 'Tempa' : '🔒 Terkunci'}
              </button>
            </div>
          `;
        }).join('')}
      </div>
    `);
  }

  function craftItem(recipeId) {
    const it = ITEMS[recipeId];
    if (!it && !recipeId.startsWith('wood_')) return;

    let req = {};
    if (it?.craftRecipe) req = it.craftRecipe;
    else if (recipeId === 'wood_epic') req = { wood_normie: 10 };
    else if (recipeId === 'wood_super') req = { wood_epic: 10 };

    for (let [matId, needed] of Object.entries(req)) {
      if ((state.inventory[matId] || 0) < needed) {
        showToast('Bahan material tidak mencukupi!');
        return;
      }
    }

    for (let [matId, needed] of Object.entries(req)) {
      state.inventory[matId] -= needed;
    }

    state.inventory[recipeId] = (state.inventory[recipeId] || 0) + 1;
    showToast(`🔨 Berhasil menempa ${it ? it.name : recipeId}!`);
    addLog(`🔨 <strong>FORGE:</strong> Berhasil menempa <strong>${it ? it.name : recipeId}</strong>!`, 'victory');
    updateUI();
    autoSaveInstant();
    openCraftModal(); // Refresh modal
  }

  function openDismantleModal() {
    const gearKeys = ['wooden_sword', 'fish_sword', 'iron_sword', 'wolf_katana', 'enchanted_blade', 'cloth_armor', 'fish_armor', 'iron_plate', 'wolf_fur_mantle'];
    const itemsInInv = gearKeys.filter(k => (state.inventory[k] || 0) > 0);

    if (!itemsInInv.length) {
      openModal('♻️ Dismantle Altar', () => `<p style="text-align:center; color:var(--text-sub); padding:20px;">Tidak ada perlengkapan yang bisa dibongkar di tas!</p>`);
      return;
    }

    openModal('♻️ Bongkar Perlengkapan Menjadi Bahan', () => `
      <div style="display:flex; flex-direction:column; gap:8px;">
        ${itemsInInv.map(k => `
          <div class="perk-card">
            <div class="perk-meta">
              <span class="perk-name">${ITEMS[k].emoji} ${ITEMS[k].name} (Punya: ${state.inventory[k]})</span>
              <span class="perk-desc">Dapatkan kembali kayu/ikan/log acak</span>
            </div>
            <button class="perk-btn" onclick="window.NexusRPG.dismantleItem('${k}')">Bongkar</button>
          </div>
        `).join('')}
      </div>
    `);
  }

  function dismantleItem(itemId) {
    if ((state.inventory[itemId] || 0) <= 0) return;
    state.inventory[itemId] -= 1;

    state.inventory.wood_normie = (state.inventory.wood_normie || 0) + 4;
    state.inventory.fish_normie = (state.inventory.fish_normie || 0) + 3;

    showToast(`♻️ ${ITEMS[itemId].name} dibongkar! Dapat +4 Wood & +3 Fish.`);
    updateUI();
    autoSaveInstant();
    openDismantleModal();
  }

  /* ============================================================
     10. BAG, INVENTORY, CRATES, SHOP, & BANK VAULT
     ============================================================ */
  function openInventoryModal() {
    const invKeys = Object.keys(state.inventory).filter(k => (state.inventory[k] || 0) > 0);

    openModal('🎒 Tas Penyimpanan Hero', () => `
      <div class="item-icon-grid">
        ${invKeys.length ? invKeys.map(k => {
          const it = ITEMS[k] || { name: k, emoji: '📦', sellPrice: 1 };
          return `
            <div class="item-tile" onclick="window.NexusRPG.showItemAction('${k}')">
              <span class="item-badge-count">x${state.inventory[k]}</span>
              <span class="item-tile-icon">${it.emoji}</span>
              <span class="item-tile-name">${it.name}</span>
            </div>
          `;
        }).join('') : '<p style="grid-column:1/-1; text-align:center; color:var(--text-dim); padding:20px;">Tas Anda kosong!</p>'}
      </div>
    `);
  }

  function showItemAction(itemId) {
    const it = ITEMS[itemId];
    if (!it) return;

    let actionBtn = '';
    if (it.type === 'consumable') {
      actionBtn = `<button class="glow-button" onclick="window.NexusRPG.useItem('${itemId}')">Gunakan / Minum</button>`;
    } else if (it.type === 'weapon' || it.type === 'armor' || it.type === 'accessory') {
      actionBtn = `<button class="glow-button register-btn" onclick="window.NexusRPG.equipItem('${itemId}')">Pasang / Equip</button>`;
    } else if (it.type === 'crate') {
      actionBtn = `<button class="glow-button" onclick="window.NexusRPG.openCrateDirect('${itemId}')">Buka Peti</button>`;
    }

    const sellPrice = it.sellPrice || 1;
    openModal(`${it.emoji} ${it.name}`, () => `
      <div style="text-align:center; padding:10px;">
        <p style="font-size:12px; color:var(--text-sub); margin-bottom:12px;">Jumlah di tas: <strong>${state.inventory[itemId]}</strong></p>
        <div style="display:flex; flex-direction:column; gap:8px;">
          ${actionBtn}
          <button class="glow-gold-btn" onclick="window.NexusRPG.sellItem('${itemId}')">Jual 1x (+${sellPrice} 💰)</button>
        </div>
      </div>
    `);
  }

  function useItem(itemId) {
    const it = ITEMS[itemId];
    if (!it || (state.inventory[itemId] || 0) <= 0) return;

    const stats = getComputedStats();
    if (it.effect?.type === 'heal') {
      state.hp = Math.min(stats.maxHp, state.hp + it.effect.value);
      showToast(`❤️ HP pulih +${it.effect.value}!`);
    } else if (it.effect?.type === 'heal_full') {
      state.hp = stats.maxHp;
      showToast('❤️ HP pulih penuh 100%!');
    } else if (it.effect?.type === 'buff_atk') {
      state.buffs.atkMultiplier = it.effect.value;
      state.buffs.battlesLeft = it.effect.battles;
      showToast('⚔️ Dragon Might aktif (+50% ATK)!');
    } else if (it.effect?.type === 'buff_def') {
      state.buffs.defMultiplier = it.effect.value;
      state.buffs.battlesLeft = it.effect.battles;
      showToast('🛡️ Stone Skin aktif (+50% DEF)!');
    }

    state.inventory[itemId] -= 1;
    updateUI();
    autoSaveInstant();
    closeModal();
  }

  function equipItem(itemId) {
    const it = ITEMS[itemId];
    if (!it || (state.inventory[itemId] || 0) <= 0) return;

    const slot = it.type; // weapon, armor, accessory
    const oldItem = state.equipment[slot];

    state.inventory[itemId] -= 1;
    if (oldItem) {
      state.inventory[oldItem] = (state.inventory[oldItem] || 0) + 1;
    }
    state.equipment[slot] = itemId;

    showToast(`🛡️ ${it.name} berhasil dipasang!`);
    updateUI();
    autoSaveInstant();
    closeModal();
  }

  function sellItem(itemId) {
    const it = ITEMS[itemId];
    if (!it || (state.inventory[itemId] || 0) <= 0) return;

    const price = it.sellPrice || 1;
    state.inventory[itemId] -= 1;
    state.gold += price;
    state.stats.goldEarned += price;

    showToast(`💰 Terjual +${price} Koin!`);
    updateUI();
    autoSaveInstant();
    closeModal();
  }

  function openCrateModal() {
    const crateKeys = ['crate_common', 'crate_uncommon', 'crate_rare', 'crate_epic', 'crate_edgy', 'crate_omega', 'crate_godly', 'crate_void'];
    const myCrates = crateKeys.filter(k => (state.inventory[k] || 0) > 0);

    openModal('📦 Buka Lootbox & Crate', () => `
      <div style="display:flex; flex-direction:column; gap:8px;">
        ${myCrates.length ? myCrates.map(k => `
          <div class="perk-card">
            <div class="perk-meta">
              <span class="perk-name">${ITEMS[k].emoji} ${ITEMS[k].name} (Punya: ${state.inventory[k]})</span>
              <span class="perk-desc">${k === 'crate_godly' || k === 'crate_void' ? '✨ Berpeluang dapat Kapsul Waktu (🔮)!' : 'Berisi koin dan material langka'}</span>
            </div>
            <button class="perk-btn" onclick="window.NexusRPG.openCrateDirect('${k}')">Buka 1x</button>
          </div>
        `).join('') : '<p style="text-align:center; color:var(--text-sub); padding:20px;">Anda tidak memiliki lootbox saat ini!</p>'}
      </div>
    `);
  }

  function openCrateDirect(crateId) {
    if ((state.inventory[crateId] || 0) <= 0) return;
    state.inventory[crateId] -= 1;
    state.stats.cratesOpened += 1;

    let lootMsg = [];
    const roll = Math.random();

    if (crateId === 'crate_common') {
      const g = 30 + Math.floor(Math.random() * 40);
      state.gold += g;
      state.inventory.wood_normie = (state.inventory.wood_normie || 0) + 6;
      lootMsg = [`+${g} 💰`, `+6 🪵 Normie Wood`];
    } else if (crateId === 'crate_uncommon') {
      const g = 80 + Math.floor(Math.random() * 80);
      state.gold += g;
      state.inventory.wood_epic = (state.inventory.wood_epic || 0) + 3;
      state.inventory.apple = (state.inventory.apple || 0) + 2;
      lootMsg = [`+${g} 💰`, `+3 🪵 Epic Wood`, `+2 🍎 Apple`];
    } else if (crateId === 'crate_rare') {
      const g = 200 + Math.floor(Math.random() * 150);
      state.gold += g;
      state.inventory.ruby = (state.inventory.ruby || 0) + 1;
      lootMsg = [`+${g} 💰`, `+1 💎 Ruby`];
    } else if (crateId === 'crate_epic') {
      const g = 500 + Math.floor(Math.random() * 300);
      state.gold += g;
      state.inventory.diamond = (state.inventory.diamond || 0) + 1;
      state.inventory.wood_super = (state.inventory.wood_super || 0) + 2;
      lootMsg = [`+${g} 💰`, `+1 💠 Diamond`, `+2 🪵 Super Wood`];
    } else if (crateId === 'crate_godly' || crateId === 'crate_void') {
      const g = 3000 + Math.floor(Math.random() * 2000);
      state.gold += g;
      if (Math.random() < 0.4) {
        state.timeTravel.timeCapsules += 1;
        lootMsg.push('🔮 +1 TIME CAPSULE (Kapsul Waktu Abadi)!');
      }
      state.inventory.wood_ultra = (state.inventory.wood_ultra || 0) + 2;
      lootMsg.push(`+${g} 💰`, `+2 🪵 Ultra Wood`);
    }

    addLog(`📦 <strong>LOOTBOX:</strong> Membuka ${ITEMS[crateId].name} dan memperoleh: ${lootMsg.join(', ')}!`, 'special');
    showToast(`📦 Loot: ${lootMsg.join(', ')}`);

    updateUI();
    autoSaveInstant();
    openCrateModal();
  }

  function openShopModal() {
    const buyables = [
      'potion_small', 'potion_medium', 'potion_large', 'potion_mega',
      'elixir_atk', 'elixir_def', 'crate_common', 'crate_uncommon', 'seed'
    ];

    openModal('🛒 Cosmic Shop (Toko Potion & Peti)', () => `
      <div style="display:flex; flex-direction:column; gap:8px;">
        ${buyables.map(k => {
          const it = ITEMS[k];
          return `
            <div class="perk-card">
              <div class="perk-meta">
                <span class="perk-name">${it.emoji} ${it.name}</span>
                <span class="perk-desc">Harga: ${it.buyPrice} 💰</span>
              </div>
              <button class="perk-btn" onclick="window.NexusRPG.buyItem('${k}')">Beli</button>
            </div>
          `;
        }).join('')}
      </div>
    `);
  }

  function buyItem(itemId) {
    const it = ITEMS[itemId];
    if (!it || !it.buyPrice) return;

    if (state.gold < it.buyPrice) {
      showToast(`Gold tidak cukup! Butuh ${it.buyPrice} 💰.`);
      return;
    }

    state.gold -= it.buyPrice;
    state.inventory[itemId] = (state.inventory[itemId] || 0) + 1;
    showToast(`🛒 Membeli ${it.name}!`);
    updateUI();
    autoSaveInstant();
  }

  function openBankModal() {
    openModal('🏦 Bank Kosmik (Aman dari Reset Time Travel)', () => `
      <div class="bank-controls">
        <div class="bank-balance-box">
          <span style="font-size:11px; color:var(--text-sub);">Saldo Tersimpan di Vault:</span>
          <h2 style="color:var(--accent-blue); margin-top:4px;">${Number(state.bank || 0).toLocaleString()} 💰</h2>
        </div>
        <div class="bank-action-row">
          <input type="number" id="bank-amt" placeholder="Jumlah koin..." value="100" min="1">
          <button class="glow-button" onclick="window.NexusRPG.bankDeposit()">Setor</button>
          <button class="glow-gold-btn" onclick="window.NexusRPG.bankWithdraw()">Tarik</button>
        </div>
        <p style="font-size:10px; color:var(--text-dim);">💡 <em>Koin di Bank tidak akan hilang ketika Anda melakukan Time Travel (Prestige)!</em></p>
      </div>
    `);
  }

  function bankDeposit() {
    const inp = document.getElementById('bank-amt');
    const amt = Math.floor(Number(inp?.value || 0));
    if (amt <= 0 || isNaN(amt)) return;
    if (state.gold < amt) { showToast('Koin di kantong tidak cukup!'); return; }

    state.gold -= amt;
    state.bank = (state.bank || 0) + amt;
    showToast(`🏦 Disetor +${amt} 💰 ke Vault!`);
    updateUI();
    autoSaveInstant();
    openBankModal();
  }

  function bankWithdraw() {
    const inp = document.getElementById('bank-amt');
    const amt = Math.floor(Number(inp?.value || 0));
    if (amt <= 0 || isNaN(amt)) return;
    if ((state.bank || 0) < amt) { showToast('Saldo di bank tidak mencukupi!'); return; }

    state.bank -= amt;
    state.gold += amt;
    showToast(`🏦 Ditarik +${amt} 💰 ke kantong!`);
    updateUI();
    autoSaveInstant();
    openBankModal();
  }

  /* ============================================================
     11. TIME TRAVEL (PRESTIGE & PERK ENGINE)
     ============================================================ */
  function updateTimeTravelTab() {
    const curTT = state.timeTravel?.count || 0;
    const nextTT = curTT + 1;
    const capsules = state.timeTravel?.timeCapsules || 0;
    const bonusMult = Math.round((getGlobalBonusMultiplier() - 1) * 100);

    const cardLvl = document.getElementById('tt-card-level');
    if (cardLvl) cardLvl.textContent = `TT ${curTT}`;
    const cardCaps = document.getElementById('tt-card-capsules');
    if (cardCaps) cardCaps.textContent = `${capsules} 🔮`;
    const cardMult = document.getElementById('tt-card-mult');
    if (cardMult) cardMult.textContent = `+${bonusMult}% All`;

    const nextSpan = document.getElementById('tt-next-rank');
    if (nextSpan) nextSpan.textContent = `TT ${nextTT}`;

    // Requirements logic
    // TT 0 -> Clear D10 & Lv. 100
    // TT 1 -> Clear D11 & Lv. 110
    // TT 2 -> Clear D12 & Lv. 130
    const reqDungNum = Math.min(12, 10 + curTT);
    const reqAreaKey = `area_${reqDungNum}`;
    const reqLvl = 100 + curTT * 10;

    const dungCleared = Boolean(state.dungeonsCleared[reqAreaKey]);
    const lvlMet = state.level >= reqLvl;
    const canTT = dungCleared && lvlMet;

    const dungEl = document.getElementById('req-dungeon-status');
    if (dungEl) dungEl.innerHTML = `🏰 Taklukkan Boss Dungeon ${reqDungNum}: ${dungCleared ? '✅' : '❌'}`;

    const lvlEl = document.getElementById('req-level-status');
    if (lvlEl) lvlEl.innerHTML = `⭐ Capai Level ${reqLvl}: ${lvlMet ? '✅' : '❌'}`;

    const tagEl = document.getElementById('tt-ready-tag');
    const ttBtn = document.getElementById('btn-initiate-tt');
    if (tagEl && ttBtn) {
      if (canTT) {
        tagEl.textContent = 'SIAP PRESTIGE!';
        tagEl.className = 'req-tag ready';
        ttBtn.removeAttribute('disabled');
      } else {
        tagEl.textContent = 'BELUM SIAP';
        tagEl.className = 'req-tag locked';
        ttBtn.setAttribute('disabled', 'true');
      }
    }

    // Chrono Perks Grid
    renderChronoPerks();
  }

  const CHRONO_PERKS_DEF = [
    { id: 'warp_haste', name: '⚡ Warp Haste', desc: '-10% Cooldown semua aksi', maxRank: 3, costPerRank: 1 },
    { id: 'quantum_might', name: '💥 Quantum Might', desc: '+25% Permanen ATK', maxRank: 4, costPerRank: 1 },
    { id: 'singularity_guard', name: '🛡️ Singularity Guard', desc: '+25% Permanen DEF', maxRank: 4, costPerRank: 1 },
    { id: 'astral_fortune', name: '🍀 Astral Fortune', desc: '+35% Peluang Crate & Drop Langka', maxRank: 3, costPerRank: 2 },
    { id: 'chrono_regen', name: '🩸 Chrono Regeneration', desc: 'Regenerasi +15% HP sesudah tiap duel', maxRank: 2, costPerRank: 2 }
  ];

  function renderChronoPerks() {
    const grid = document.getElementById('chrono-perks-grid');
    if (!grid) return;

    const myPerks = state.timeTravel?.perks || {};
    const capsules = state.timeTravel?.timeCapsules || 0;

    grid.innerHTML = CHRONO_PERKS_DEF.map(p => {
      const curRank = myPerks[p.id] || 0;
      const isMax = curRank >= p.maxRank;
      const canAfford = capsules >= p.costPerRank;

      return `
        <div class="perk-card">
          <div class="perk-meta">
            <span class="perk-name">${p.name} (Rank ${curRank}/${p.maxRank})</span>
            <span class="perk-desc">${p.desc}</span>
          </div>
          <button class="perk-btn" ${isMax || !canAfford ? 'disabled style="opacity:0.4"' : ''} onclick="window.NexusRPG.upgradeChronoPerk('${p.id}')">
            ${isMax ? 'MAX' : `+1 (${p.costPerRank} 🔮)`}
          </button>
        </div>
      `;
    }).join('');
  }

  function upgradeChronoPerk(perkId) {
    const pDef = CHRONO_PERKS_DEF.find(p => p.id === perkId);
    if (!pDef) return;

    if (!state.timeTravel.perks) state.timeTravel.perks = {};
    const curRank = state.timeTravel.perks[perkId] || 0;
    if (curRank >= pDef.maxRank) return;

    if (state.timeTravel.timeCapsules < pDef.costPerRank) {
      showToast('Kapsul Waktu (🔮) tidak cukup!');
      return;
    }

    state.timeTravel.timeCapsules -= pDef.costPerRank;
    state.timeTravel.perks[perkId] = curRank + 1;

    showToast(`🔮 Perk ${pDef.name} naik ke Rank ${curRank + 1}!`);
    addLog(`🔮 <strong>CHRONO UPGRADE:</strong> Mengaktifkan ${pDef.name} (Rank ${curRank + 1})!`, 'special');

    updateUI();
    autoSaveInstant();
  }

  function triggerTimeTravel() {
    if (!confirm('⚠️ Anda akan memulai Time Travel (Prestige)!\n\nLevel dan perlengkapan dasar akan direset ke Lv. 1, namun Koin di Bank (🏦), Mount, Kapsul Waktu, dan Perk Abadi tetap UTUH.\n\nLanjutkan?')) {
      return;
    }

    const gainedCapsules = 3 + (state.timeTravel?.count || 0);
    state.timeTravel.count += 1;
    state.timeTravel.timeCapsules += gainedCapsules;

    // Reset Level & Areas
    state.level = 1;
    state.xp = 0;
    state.xpToNext = 100;
    state.hp = 100;
    state.currentArea = 'area_1';
    state.maxAreaUnlocked = 'area_1';

    // Reset standard equipment & basic materials
    state.equipment = {
      weapon: 'wooden_sword',
      armor: 'cloth_armor',
      accessory: null
    };
    state.enchants = {
      weapon: null,
      armor: null
    };
    state.inventory = {
      wood_normie: 20,
      fish_normie: 20,
      apple: 10,
      crate_common: 3,
      seed: 10
    };
    state.gold = 200;

    addLog(`🌀 <strong>TIME TRAVEL BERHASIL:</strong> Selamat datang di dimensi baru! Anda kini berada di <strong>TT ${state.timeTravel.count}</strong> dan memperoleh <strong>+${gainedCapsules} 🔮 Kapsul Waktu</strong>!`, 'victory');
    showToast(`🌀 TIME TRAVEL SELESAI! +${gainedCapsules} 🔮 Kapsul Waktu!`);

    updateUI();
    autoSaveInstant();
  }

  /* ============================================================
     12. MOUNT & DRONE COMPANIONS
     ============================================================ */
  function trainMount() {
    const lock = checkProgressionLock('mount');
    if (lock.locked) { showToast(`🔒 ${lock.reason}`); return; }

    const costGold = 500 * (state.mount?.tier || 1);
    const costCarrot = 5;

    if (state.gold < costGold) { showToast(`Butuh ${costGold} 💰!`); return; }
    if ((state.inventory.carrot || 0) < costCarrot) { showToast(`Butuh ${costCarrot} 🥕 Wortel! Lakukan Farm terlebih dahulu.`); return; }

    state.gold -= costGold;
    state.inventory.carrot -= costCarrot;
    state.mount.tier += 1;

    showToast(`🐎 Mount berhasil dilatih ke Tier ${state.mount.tier}!`);
    addLog(`🐎 <strong>MOUNT:</strong> Cyber Steed naik ke Tier ${state.mount.tier} (+${state.mount.tier * 5}% Stats & Enchant Luck)!`, 'special');

    const mTierEl = document.getElementById('mount-tier-display');
    if (mTierEl) mTierEl.textContent = `Tier ${state.mount.tier} • Expert`;
    const mPerkEl = document.getElementById('mount-perks-text');
    if (mPerkEl) mPerkEl.textContent = `+${state.mount.tier * 5}% Stats • +${state.mount.tier * 2}% Enchant Luck`;

    updateUI();
    autoSaveInstant();
  }

  function upgradeDrone() {
    const lock = checkProgressionLock('drone');
    if (lock.locked) { showToast(`🔒 ${lock.reason}`); return; }

    const costGold = 1000 * (state.drone?.tier || 1);
    const costWood = 10;

    if (state.gold < costGold) { showToast(`Butuh ${costGold} 💰!`); return; }
    if ((state.inventory.wood_normie || 0) < costWood) { showToast(`Butuh ${costWood} 🪵 Kayu!`); return; }

    state.gold -= costGold;
    state.inventory.wood_normie -= costWood;
    state.drone.tier += 1;

    showToast(`🤖 Drone berhasil diupgrade ke Tier ${state.drone.tier}!`);
    addLog(`🤖 <strong>DRONE:</strong> Gathering Drone naik ke Tier ${state.drone.tier}! Hasil panen otomatis meningkat!`, 'special');

    const dTierEl = document.getElementById('drone-tier-display');
    if (dTierEl) dTierEl.textContent = `Tier ${state.drone.tier} • Advanced`;
    const dPerkEl = document.getElementById('drone-perks-text');
    if (dPerkEl) dPerkEl.textContent = `Panen otomatis +${state.drone.tier * 5} Kayu & Ikan / menit`;

    updateUI();
    autoSaveInstant();
  }

  // Periodic Drone Background Collector (every 60s)
  setInterval(() => {
    if (!state.drone?.tier) return;
    const yieldAmt = state.drone.tier * 4;
    state.inventory.wood_normie = (state.inventory.wood_normie || 0) + yieldAmt;
    state.inventory.fish_normie = (state.inventory.fish_normie || 0) + yieldAmt;
    state.gold += yieldAmt * 2;
    addLog(`🤖 <strong>DRONE AUTO-HARVEST:</strong> Mengumpulkan +${yieldAmt} 🪵 Kayu, +${yieldAmt} 🐟 Ikan, +${yieldAmt * 2} 💰 Koin!`, 'system');
    updateUI();
  }, 60000);

  /* ============================================================
     13. CASINO (COINFLIP, SLOTS, DICE)
     ============================================================ */
  function adjustBet(game, op) {
    const inp = document.getElementById(`bet-${game}`);
    if (!inp) return;
    let val = Math.max(10, Math.floor(Number(inp.value) || 50));
    if (op === 'half') val = Math.max(10, Math.floor(val / 2));
    else if (op === 'double') val = Math.min(state.gold, val * 2);
    else if (op === 'max') val = Math.max(10, state.gold);
    inp.value = val;
  }

  function playCoinflip(side) {
    if (state.level < 15) { showToast('🔒 Kasino Kosmik terbuka di Level 15+!'); return; }
    const inp = document.getElementById('bet-coinflip');
    const bet = Math.floor(Number(inp?.value || 50));
    if (bet <= 0 || isNaN(bet)) return;
    if (state.gold < bet) { showToast('Koin tidak cukup!'); return; }

    state.gold -= bet;
    const win = Math.random() < 0.5;
    if (win) {
      const prize = bet * 2;
      state.gold += prize;
      showToast(`🪙 MENANG COINFLIP! +${prize} 💰!`);
      addLog(`🪙 <strong>COINFLIP:</strong> Menang tebakan ${side.toUpperCase()}! Memperoleh <span class="reward-pill gold">+${prize} 💰</span>!`, 'victory');
    } else {
      showToast(`🪙 Kalah coinflip (-${bet} 💰)`);
      addLog(`🪙 <strong>COINFLIP:</strong> Tebakan salah, kehilangan ${bet} 💰.`, 'danger');
    }
    updateUI();
    autoSaveInstant();
  }

  function playSlots() {
    if (state.level < 15) { showToast('🔒 Kasino Kosmik terbuka di Level 15+!'); return; }
    const inp = document.getElementById('bet-slot');
    const bet = Math.floor(Number(inp?.value || 100));
    if (bet <= 0 || isNaN(bet)) return;
    if (state.gold < bet) { showToast('Koin tidak cukup!'); return; }

    state.gold -= bet;
    const symbols = ['🍒', '🍋', '💎', '🔔', '⭐', '7️⃣'];
    const s1 = symbols[Math.floor(Math.random() * symbols.length)];
    const s2 = symbols[Math.floor(Math.random() * symbols.length)];
    const s3 = symbols[Math.floor(Math.random() * symbols.length)];

    const reelEl = document.getElementById('slot-reels');
    if (reelEl) reelEl.textContent = `${s1} | ${s2} | ${s3}`;

    if (s1 === s2 && s2 === s3) {
      const prize = bet * 10;
      state.gold += prize;
      showToast(`🎰 JACKPOT 10X! +${prize} 💰!`);
      addLog(`🎰 <strong>SLOTS JACKPOT:</strong> 3 simbol kembar! Menang <span class="reward-pill gold">+${prize} 💰</span>!`, 'victory');
    } else if (s1 === s2 || s2 === s3 || s1 === s3) {
      const prize = bet * 2.5;
      state.gold += prize;
      showToast(`🎰 Menang 2.5x! +${prize} 💰`);
      addLog(`🎰 <strong>SLOTS:</strong> 2 simbol kembar! Menang <span class="reward-pill gold">+${prize} 💰</span>!`, 'victory');
    } else {
      showToast(`🎰 Tidak beruntung (-${bet} 💰)`);
      addLog(`🎰 <strong>SLOTS:</strong> Putaran tidak cocok, -${bet} 💰.`, 'danger');
    }
    updateUI();
    autoSaveInstant();
  }

  function playDice() {
    if (state.level < 15) { showToast('🔒 Kasino Kosmik terbuka di Level 15+!'); return; }
    const inp = document.getElementById('bet-dice');
    const bet = Math.floor(Number(inp?.value || 50));
    if (bet <= 0 || isNaN(bet)) return;
    if (state.gold < bet) { showToast('Koin tidak cukup!'); return; }

    state.gold -= bet;
    const playerRoll = Math.floor(Math.random() * 6) + 1;
    const dealerRoll = Math.floor(Math.random() * 6) + 1;

    if (playerRoll > dealerRoll) {
      const prize = Math.floor(bet * 2.5);
      state.gold += prize;
      showToast(`🎲 Dadu Anda ${playerRoll} vs Bandar ${dealerRoll}! Menang +${prize} 💰!`);
      addLog(`🎲 <strong>DICE:</strong> Menang lemparan (${playerRoll} vs ${dealerRoll})! <span class="reward-pill gold">+${prize} 💰</span>!`, 'victory');
    } else {
      showToast(`🎲 Kalah! Dadu Anda ${playerRoll} vs Bandar ${dealerRoll} (-${bet} 💰)`);
      addLog(`🎲 <strong>DICE:</strong> Kalah (${playerRoll} vs ${dealerRoll}), kehilangan ${bet} 💰.`, 'danger');
    }
    updateUI();
    autoSaveInstant();
  }

  /* ============================================================
     14. SOCIAL MULTIPLAYER & COIN TRANSFERS
     ============================================================ */
  function openSocialModal() {
    const modal = document.getElementById('social-modal');
    if (!modal) return;
    modal.style.display = 'flex';
    fetchLeaderboard();
  }

  function closeSocialModal() {
    const modal = document.getElementById('social-modal');
    if (modal) modal.style.display = 'none';
  }

  function fetchLeaderboard() {
    fetch('/api/players')
      .then(r => r.json())
      .then(data => {
        const cont = document.getElementById('leaderboard-container');
        if (!cont || !data.players) return;
        cont.innerHTML = data.players.slice(0, 15).map((p, i) => `
          <div class="player-row">
            <span>#${i + 1} 🧙‍♂️ <strong>${p.characterName || p.username}</strong></span>
            <span>Lv. <strong>${p.level}</strong> • 💰 ${Number(p.gold).toLocaleString()}</span>
          </div>
        `).join('');
      }).catch(() => {});
  }

  function addFriend() {
    const inp = document.getElementById('add-friend-input');
    const target = inp?.value?.trim();
    if (!target) return;

    fetch('/api/friends/add', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${authToken}` },
      body: JSON.stringify({ targetUsername: target })
    })
    .then(r => r.json())
    .then(res => {
      showToast(res.message || res.error);
      if (res.success && inp) inp.value = '';
    });
  }

  function sendCoin() {
    const targetInp = document.getElementById('transfer-target');
    const amtInp = document.getElementById('transfer-amount');
    const recipient = targetInp?.value?.trim();
    const amount = Number(amtInp?.value || 0);

    if (!recipient || amount <= 0) { showToast('Data transfer tidak valid!'); return; }
    if (state.gold < amount) { showToast('Koin tidak cukup!'); return; }

    fetch('/api/transfer', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${authToken}` },
      body: JSON.stringify({ recipient, amount })
    })
    .then(r => r.json())
    .then(res => {
      if (res.success) {
        state.gold -= amount;
        showToast(`Berhasil mengirim +${amount} 💰 ke @${recipient}!`);
        updateUI();
        autoSaveInstant();
        if (targetInp) targetInp.value = '';
        if (amtInp) amtInp.value = '';
      } else {
        showToast(res.error || 'Gagal transfer');
      }
    });
  }

  /* ============================================================
     15. MODAL UTILITY
     ============================================================ */
  function openModal(title, bodyFn) {
    const m = document.getElementById('modal');
    const t = document.getElementById('modal-title');
    const b = document.getElementById('modal-body');
    if (!m || !t || !b) return;

    t.textContent = title;
    b.innerHTML = typeof bodyFn === 'function' ? bodyFn() : bodyFn;
    m.style.display = 'flex';
  }

  function closeModal() {
    const m = document.getElementById('modal');
    if (m) m.style.display = 'none';
  }

  /* ============================================================
     16. INITIALIZATION & AUTH HANDLING
     ============================================================ */
  function initAuthEvents() {
    document.querySelectorAll('.toggle-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        document.querySelectorAll('.toggle-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        const tab = btn.dataset.tab;
        document.getElementById('login-form').style.display = tab === 'login' ? 'block' : 'none';
        document.getElementById('register-form').style.display = tab === 'register' ? 'block' : 'none';
      });
    });

    // Login Form
    document.getElementById('login-form').addEventListener('submit', async e => {
      e.preventDefault();
      const u = document.getElementById('login-username').value.trim();
      const p = document.getElementById('login-password').value;
      const errEl = document.getElementById('login-error');
      errEl.textContent = '';

      const localKey = `nexus_save_${u.toLowerCase()}`;
      let localSave = null;
      try { localSave = JSON.parse(localStorage.getItem(localKey)); } catch {}

      try {
        const res = await fetch('/api/login', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ username: u, password: p, fallbackVault: { password: p, gameState: localSave } })
        });
        const data = await res.json();
        if (data.success) {
          activeUsername = data.username;
          authToken = data.token;
          await loadGameState();
          showGameScreen();
        } else {
          errEl.textContent = data.error || 'Login gagal';
        }
      } catch {
        errEl.textContent = 'Koneksi ke server gagal';
      }
    });

    // Register Form
    document.getElementById('register-form').addEventListener('submit', async e => {
      e.preventDefault();
      const u = document.getElementById('reg-username').value.trim();
      const p = document.getElementById('reg-password').value;
      const c = document.getElementById('reg-character').value.trim();
      const errEl = document.getElementById('register-error');
      errEl.textContent = '';

      try {
        const res = await fetch('/api/register', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ username: u, password: p, characterName: c })
        });
        const data = await res.json();
        if (data.success) {
          activeUsername = data.username;
          authToken = data.token;
          state = JSON.parse(JSON.stringify(DEFAULT_STATE));
          state.characterName = c || u;
          autoSaveInstant();
          showGameScreen();
        } else {
          errEl.textContent = data.error || 'Registrasi gagal';
        }
      } catch {
        errEl.textContent = 'Koneksi ke server gagal';
      }
    });

    // Logout
    document.getElementById('logout-btn')?.addEventListener('click', () => {
      fetch('/api/logout', { method: 'POST' }).finally(() => {
        location.reload();
      });
    });

    // Social Button
    document.getElementById('social-btn')?.addEventListener('click', openSocialModal);
  }

  async function loadGameState() {
    try {
      const res = await fetch('/api/load', {
        headers: { 'Authorization': `Bearer ${authToken}` }
      });
      const data = await res.json();
      if (data.success && data.gameState) {
        state = Object.assign({}, DEFAULT_STATE, data.gameState);
      } else {
        const local = localStorage.getItem(`nexus_save_${activeUsername}`);
        if (local) state = Object.assign({}, DEFAULT_STATE, JSON.parse(local));
      }
    } catch {
      const local = localStorage.getItem(`nexus_save_${activeUsername}`);
      if (local) state = Object.assign({}, DEFAULT_STATE, JSON.parse(local));
    }

    // Normalize area ID from legacy or cloud saves
    const areaNum = getAreaNumber();
    state.currentArea = `area_${areaNum}`;
    if (!state.maxAreaUnlocked) state.maxAreaUnlocked = state.currentArea;
  }

  function showGameScreen() {
    document.getElementById('auth-screen').style.display = 'none';
    document.getElementById('game-screen').style.display = 'flex';
    updateUI();
  }

  function initDockNavigation() {
    document.querySelectorAll('.dock-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        document.querySelectorAll('.dock-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        const tab = btn.dataset.tab;

        document.querySelectorAll('.tab-pane').forEach(p => p.style.display = 'none');
        const activePane = document.getElementById(`tab-${tab}`);
        if (activePane) activePane.style.display = 'block';

        if (tab === 'timetravel') updateTimeTravelTab();
      });
    });

    // Action button listeners
    document.addEventListener('click', e => {
      const tile = e.target.closest('.action-tile');
      if (!tile) return;
      const act = tile.dataset.action;

      const lock = checkProgressionLock(act);
      if (lock.locked) {
        showToast(lock.reason);
        return;
      }

      if (act === 'hunt') handleHunt(false);
      else if (act === 'hardmode') handleHunt(true);
      else if (act === 'adventure') handleAdventure();
      else if (act === 'dungeon') handleDungeon();
      else if (act === 'training') handleTraining();
      else if (act === 'heal') handleHeal();
      else if (act === 'chop') handleChop();
      else if (act === 'fish') handleFish();
      else if (act === 'mine') handleMine();
      else if (act === 'farm') handleFarm();
      else if (act === 'pickup') handlePickup();
      else if (act === 'enchant') openEnchantModal(1, 'Enchant');
      else if (act === 'refine') openEnchantModal(10, 'Refine');
      else if (act === 'transmute') openEnchantModal(100, 'Transmute');
      else if (act === 'transcend') openEnchantModal(1000, 'Transcend');
      else if (act === 'craft') openCraftModal();
      else if (act === 'dismantle') openDismantleModal();
      else if (act === 'inventory') openInventoryModal();
      else if (act === 'crate') openCrateModal();
      else if (act === 'shop') openShopModal();
      else if (act === 'bank') openBankModal();
      else if (act === 'trade') openCraftModal();
    });

    // Area chip click to switch explored areas
    document.getElementById('area-chip-btn')?.addEventListener('click', () => {
      openModal('📍 Pilih Zona Area Perjalanan', () => `
        <div style="display:flex; flex-direction:column; gap:6px;">
          ${AREAS.map(a => {
            const check = isAreaUnlocked(a);
            const isCurrent = a.id === state.currentArea;
            return `
              <div class="player-row" style="cursor:${check.unlocked ? 'pointer' : 'not-allowed'}; opacity:${check.unlocked ? '1' : '0.45'};" onclick="${check.unlocked ? `window.NexusRPG.switchArea('${a.id}')` : `alert('🔒 ${check.reason}')`}">
                <span>${a.emoji} <strong>${a.name}</strong> ${isCurrent ? '⭐ (Aktif)' : ''}</span>
                <span class="p-pill ${check.unlocked ? 'area' : 'locked'}" style="${check.unlocked ? '' : 'color:#f87171; background:rgba(239,68,68,0.15); border:1px solid rgba(239,68,68,0.3); font-weight:700;'}">
                  ${check.unlocked ? 'Terbuka' : `🔒 ${check.reason.split('!')[0]}`}
                </span>
              </div>
            `;
          }).join('')}
        </div>
      `);
    });
  }

  function switchArea(areaId) {
    const target = AREAS.find(a => a.id === areaId);
    if (!target) return;

    const check = isAreaUnlocked(target);
    if (!check.unlocked) {
      showToast(`🔒 Zona terkunci! ${check.reason}`);
      return;
    }

    state.currentArea = areaId;
    showToast(`📍 Berpindah ke ${target.name}!`);
    addLog(`📍 <strong>ZONA:</strong> Berpindah lokasi ke ${target.emoji} <strong>${target.name}</strong>.`, 'system');
    updateUI();
    autoSaveInstant();
    closeModal();
  }

  // Periodic Auto-save every 45s
  setInterval(autoSaveInstant, 45000);

  // Background Space Canvas Stars
  function initSpaceCanvas() {
    const canvas = document.getElementById('space-canvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let stars = [];

    function resize() {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      stars = [];
      for (let i = 0; i < 70; i++) {
        stars.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          radius: Math.random() * 1.5,
          alpha: Math.random(),
          speed: 0.005 + Math.random() * 0.015
        });
      }
    }
    window.addEventListener('resize', resize);
    resize();

    function render() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      stars.forEach(s => {
        s.alpha += s.speed;
        const a = (Math.sin(s.alpha) + 1) / 2;
        ctx.fillStyle = `rgba(0, 242, 255, ${a * 0.7})`;
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.radius, 0, Math.PI * 2);
        ctx.fill();
      });
      requestAnimationFrame(render);
    }
    render();
  }

  // Expose global API
  window.NexusRPG = {
    toggleLanguage,
    adjustBet,
    playCoinflip,
    playSlots,
    playDice,
    answerTraining,
    executeEnchantBatch,
    craftItem,
    dismantleItem,
    showItemAction,
    useItem,
    equipItem,
    sellItem,
    openCrateDirect,
    buyItem,
    bankDeposit,
    bankWithdraw,
    triggerTimeTravel,
    upgradeChronoPerk,
    trainMount,
    upgradeDrone,
    openSocialModal,
    closeSocialModal,
    addFriend,
    sendCoin,
    switchArea,
    closeModal,
    quickHeal,
    quickPotion,
    quickApple
  };

  // Check existing session
  fetch('/api/session')
    .then(r => r.json())
    .then(async data => {
      if (data.loggedIn && data.username) {
        activeUsername = data.username;
        await loadGameState();
        showGameScreen();
      }
    }).catch(() => {});

  initAuthEvents();
  initDockNavigation();
  initSpaceCanvas();

})();
