// NEXUS RPG v2.0 - Core Engine
// Features: Full EPIC RPG Database (Area 1-10), Auto-Save Instan, Persistent Auth Lintas Device

(function() {
  'use strict';

  /* ============================================================
     1. DATABASE DEFINISI LENGKAP DARI EPIC RPG WIKI
     ============================================================ */
  const AREAS = [
    { id: 'area_1', name: 'Area 1: Verdant Plains', emoji: '🌱', levelReq: 1, desc: 'Padang rumput damai tempat berkeliarannya serigala dan goblin' },
    { id: 'area_2', name: 'Area 2: Whispering Woods', emoji: '🌲', levelReq: 5, desc: 'Hutan lebat kuno penuh pohon logging dan rubah hutan' },
    { id: 'area_3', name: 'Area 3: Echoing Caverns', emoji: '🕳️', levelReq: 10, desc: 'Gua bawah tanah dengan mata air jernih dan ogre batu' },
    { id: 'area_4', name: 'Area 4: Frostfall Summit', emoji: '🏔️', levelReq: 20, desc: 'Puncak es abadi tempat tinggal frost drake dan yeti' },
    { id: 'area_5', name: 'Area 5: Sunken Marsh', emoji: '🌿', levelReq: 30, desc: 'Rawa beracun habitat hydra purba dan siren air' },
    { id: 'area_6', name: 'Area 6: Obsidian Caldera', emoji: '🌋', levelReq: 45, desc: 'Kawah lahar panas membara dan iblis magma' },
    { id: 'area_7', name: 'Area 7: Cyber Void', emoji: '🤖', levelReq: 60, desc: 'Reruntuhan peradaban mecha dengan chip nano canggih' },
    { id: 'area_8', name: 'Area 8: Celestial Sanctuary', emoji: '🏛️', levelReq: 75, desc: 'Kuil suci melayang bermandikan cahaya starlight' },
    { id: 'area_9', name: 'Area 9: Chrono Rift', emoji: '⏳', levelReq: 90, desc: 'Dimensi retakan ruang waktu dan pasir keabadian' },
    { id: 'area_10', name: 'Area 10: Nexus Multiverse', emoji: '🌀', levelReq: 100, desc: 'Puncak konvergensi realitas semesta' }
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
    wood_normie: { name: 'Normie Wood', emoji: '🪵', type: 'material', rarity: 'common', desc: 'Kayu pohon standar hasil tebang', sellPrice: 2 },
    wood_epic: { name: 'Epic Wood', emoji: '🪵', type: 'material', rarity: 'uncommon', desc: 'Kayu langka berkilau alami', sellPrice: 10 },
    wood_super: { name: 'Super Wood', emoji: '🪵', type: 'material', rarity: 'rare', desc: 'Batang kayu bermuatan mana alam', sellPrice: 40 },
    wood_mega: { name: 'Mega Wood', emoji: '🪵', type: 'material', rarity: 'epic', desc: 'Kayu keras purba tak terpatahkan', sellPrice: 150 },
    wood_hyper: { name: 'Hyper Wood', emoji: '🪵', type: 'material', rarity: 'legendary', desc: 'Kayu kosmik berdenyut starlight', sellPrice: 500 },

    fish_normie: { name: 'Normie Fish', emoji: '🐟', type: 'material', rarity: 'common', desc: 'Ikan sungai air tawar segar', sellPrice: 3 },
    fish_golden: { name: 'Golden Fish', emoji: '🐠', type: 'material', rarity: 'uncommon', desc: 'Ikan emas berkilau langka', sellPrice: 15 },
    fish_epic: { name: 'Epic Fish', emoji: '🐡', type: 'material', rarity: 'rare', desc: 'Ikan laut dalam sarat energi', sellPrice: 60 },
    fish_super: { name: 'Super Fish', emoji: '🦈', type: 'material', rarity: 'epic', desc: 'Ikan predator raksasa bersisik baja', sellPrice: 200 },

    apple: { name: 'Apple', emoji: '🍎', type: 'consumable', rarity: 'common', desc: 'Memulihkan 30 HP', effect: { type: 'heal', value: 30 }, sellPrice: 4, buyPrice: 8 },
    banana: { name: 'Banana', emoji: '🍌', type: 'consumable', rarity: 'uncommon', desc: 'Memulihkan 75 HP', effect: { type: 'heal', value: 75 }, sellPrice: 12, buyPrice: 25 },
    ruby: { name: 'Ruby', emoji: '💎', type: 'material', rarity: 'rare', desc: 'Permata merah untuk bahan elite', sellPrice: 100 },
    diamond: { name: 'Diamond', emoji: '💠', type: 'material', rarity: 'epic', desc: 'Berlian murni legendaris', sellPrice: 350 },

    wolf_pelt: { name: 'Wolf Pelt', emoji: '🐺', type: 'material', rarity: 'common', desc: 'Kulit serigala tebal', sellPrice: 6 },
    goblin_ear: { name: 'Goblin Ear', emoji: '👂', type: 'material', rarity: 'common', desc: 'Telinga goblin pemburu', sellPrice: 5 },
    zombie_eye: { name: 'Zombie Eye', emoji: '👁️', type: 'material', rarity: 'common', desc: 'Mata mayat hidup beracun', sellPrice: 8 },
    fox_tail: { name: 'Fox Tail', emoji: '🦊', type: 'material', rarity: 'uncommon', desc: 'Bulu ekor rubah halus', sellPrice: 14 },
    snake_fang: { name: 'Snake Fang', emoji: '🐍', type: 'material', rarity: 'uncommon', desc: 'Taring ular berbisa', sellPrice: 16 },
    ogre_club_piece: { name: 'Ogre Club Fragment', emoji: '🦴', type: 'material', rarity: 'uncommon', desc: 'Patahan gada tulang ogre', sellPrice: 22 },
    bat_wing: { name: 'Bat Wing', emoji: '🦇', type: 'material', rarity: 'common', desc: 'Sayap kelelawar gua', sellPrice: 12 },
    spider_silk: { name: 'Spider Silk', emoji: '🕸️', type: 'material', rarity: 'uncommon', desc: 'Sutra laba-laba sekuat baja', sellPrice: 20 },
    ice_scale: { name: 'Ice Scale', emoji: '❄️', type: 'material', rarity: 'rare', desc: 'Sisik naga es bersuhu minus', sellPrice: 35 },
    yeti_horn: { name: 'Yeti Horn', emoji: '🦏', type: 'material', rarity: 'rare', desc: 'Tanduk yeti raksasa', sellPrice: 42 },
    ice_crystal: { name: 'Ice Crystal', emoji: '💠', type: 'material', rarity: 'rare', desc: 'Kristal es abadi glasial', sellPrice: 40 },
    hydra_scale: { name: 'Hydra Scale', emoji: '🐍', type: 'material', rarity: 'rare', desc: 'Sisik hydra dengan regenerasi', sellPrice: 50 },
    unicorn_horn: { name: 'Unicorn Horn', emoji: '🦄', type: 'material', rarity: 'rare', desc: 'Tanduk suci unicorn pembawa berkah', sellPrice: 65 },
    siren_hair: { name: 'Siren Hair', emoji: '🧜', type: 'material', rarity: 'rare', desc: 'Rambut siren pemikat samudra', sellPrice: 60 },
    fire_scale: { name: 'Fire Scale', emoji: '🔥', type: 'material', rarity: 'epic', desc: 'Sisik berapi tahan magma', sellPrice: 85 },
    magma_core: { name: 'Magma Core', emoji: '🟠', type: 'material', rarity: 'epic', desc: 'Inti api cair tanah kawah', sellPrice: 100 },
    demon_heart: { name: 'Demon Heart', emoji: '🖤', type: 'material', rarity: 'epic', desc: 'Jantung iblis jurang api', sellPrice: 120 },
    robot_chip: { name: 'Cyber Chip', emoji: '💾', type: 'material', rarity: 'epic', desc: 'Mikroprosesor quantum masa depan', sellPrice: 135 },
    cyber_alloy: { name: 'Cyber Alloy', emoji: '⚙️', type: 'material', rarity: 'epic', desc: 'Baja komposit pelindung mecha', sellPrice: 150 },
    celestial_feather: { name: 'Celestial Feather', emoji: '🪶', type: 'material', rarity: 'legendary', desc: 'Bulu malaikat pelindung langit', sellPrice: 220 },
    divine_starlight: { name: 'Divine Starlight', emoji: '⭐', type: 'material', rarity: 'legendary', desc: 'Cahaya murni bintang galaksi', sellPrice: 250 },
    astral_horn: { name: 'Astral Horn', emoji: '✨', type: 'material', rarity: 'legendary', desc: 'Tanduk konstelasi rasi bintang', sellPrice: 280 },
    chrono_dust: { name: 'Chrono Dust', emoji: '⏳', type: 'material', rarity: 'legendary', desc: 'Debu pengatur putaran waktu', sellPrice: 350 },
    void_matter: { name: 'Void Matter', emoji: '🕳️', type: 'material', rarity: 'legendary', desc: 'Materi gelap ruang hampa', sellPrice: 400 },
    entropy_shard: { name: 'Entropy Shard', emoji: '🔮', type: 'material', rarity: 'legendary', desc: 'Pecahan singularitas waktu', sellPrice: 450 },
    nexus_essence: { name: 'Nexus Essence', emoji: '🌀', type: 'material', rarity: 'legendary', desc: 'Energi murni pembentuk multiverse', sellPrice: 600 },
    reality_tear: { name: 'Reality Tear', emoji: '🌌', type: 'material', rarity: 'legendary', desc: 'Serat pembungkus dimensi', sellPrice: 750 },
    nexus_core: { name: 'Nexus Heart', emoji: '❤️‍🔥', type: 'material', rarity: 'legendary', desc: 'Inti jantung dari seluruh realitas', sellPrice: 1000 },

    d1_relic: { name: 'Alpha Crest', emoji: '🐺', type: 'material', rarity: 'rare', desc: 'Piala Boss Dungeon 1', sellPrice: 100 },
    d2_relic: { name: 'Treant Heartwood', emoji: '💚', type: 'material', rarity: 'rare', desc: 'Piala Boss Dungeon 2', sellPrice: 200 },
    d3_relic: { name: 'Ogre Crown', emoji: '👑', type: 'material', rarity: 'rare', desc: 'Piala Boss Dungeon 3', sellPrice: 350 },
    d4_relic: { name: 'Frost Drake Eye', emoji: '👁️', type: 'material', rarity: 'epic', desc: 'Piala Boss Dungeon 4', sellPrice: 550 },
    d5_relic: { name: 'Siren Diadem', emoji: '🔱', type: 'material', rarity: 'epic', desc: 'Piala Boss Dungeon 5', sellPrice: 800 },
    d6_relic: { name: 'Infernus Gem', emoji: '🔴', type: 'material', rarity: 'epic', desc: 'Piala Boss Dungeon 6', sellPrice: 1150 },
    d7_relic: { name: 'Quantum Core', emoji: '💠', type: 'material', rarity: 'legendary', desc: 'Piala Boss Dungeon 7', sellPrice: 1600 },
    d8_relic: { name: 'Divine Halo', emoji: '😇', type: 'material', rarity: 'legendary', desc: 'Piala Boss Dungeon 8', sellPrice: 2200 },
    d9_relic: { name: 'Timeless Hourglass', emoji: '⌛', type: 'material', rarity: 'legendary', desc: 'Piala Boss Dungeon 9', sellPrice: 3000 },
    d10_relic: { name: 'Nexus Omnipotent Crown', emoji: '👑', type: 'material', rarity: 'legendary', desc: 'Piala Puncak Dungeon 10', sellPrice: 5000 },

    crate_common: { name: 'Common Crate', emoji: '📦', type: 'crate', rarity: 'common', desc: 'Berisi Kayu, Ikan, dan Gold', buyPrice: 40, sellPrice: 20 },
    crate_uncommon: { name: 'Uncommon Crate', emoji: '📦', type: 'crate', rarity: 'uncommon', desc: 'Berisi Apel, Pelts, dan Ekstra Gold', buyPrice: 100, sellPrice: 50 },
    crate_rare: { name: 'Rare Crate', emoji: '🎁', type: 'crate', rarity: 'rare', desc: 'Berisi Ruby, Super Wood, Golden Fish', buyPrice: 300, sellPrice: 150 },
    crate_epic: { name: 'Epic Crate', emoji: '🎁', type: 'crate', rarity: 'epic', desc: 'Berisi Diamond, Mega Wood, Boss Relic', buyPrice: 800, sellPrice: 400 },
    crate_edgy: { name: 'EDGY Crate', emoji: '🧰', type: 'crate', rarity: 'legendary', desc: 'Peti elite berisi tumpukan material berharga', buyPrice: 2000, sellPrice: 1000 },
    crate_omega: { name: 'OMEGA Crate', emoji: '🧰', type: 'crate', rarity: 'legendary', desc: 'Peti mitos berisi Hyper Wood dan Void Matter', buyPrice: 5000, sellPrice: 2500 },
    crate_godly: { name: 'GODLY Crate', emoji: '✨', type: 'crate', rarity: 'legendary', desc: 'Peti ilahi berisi bahan senjata tertinggi', buyPrice: 12000, sellPrice: 6000 },

    potion_small: { name: 'Small Life Potion', emoji: '🧪', type: 'consumable', rarity: 'common', desc: 'Memulihkan 45 HP', effect: { type: 'heal', value: 45 }, buyPrice: 20, sellPrice: 10 },
    potion_medium: { name: 'Medium Life Potion', emoji: '🧪', type: 'consumable', rarity: 'uncommon', desc: 'Memulihkan 140 HP', effect: { type: 'heal', value: 140 }, buyPrice: 60, sellPrice: 30 },
    potion_large: { name: 'Large Life Potion', emoji: '🧪', type: 'consumable', rarity: 'rare', desc: 'Memulihkan 350 HP', effect: { type: 'heal', value: 350 }, buyPrice: 150, sellPrice: 75 },
    potion_mega: { name: 'Full Restore Elixir', emoji: '🧪', type: 'consumable', rarity: 'epic', desc: 'Memulihkan HP hingga 100%', effect: { type: 'heal_full', value: 9999 }, buyPrice: 400, sellPrice: 200 },
    elixir_atk: { name: 'Dragon Might Elixir', emoji: '⚗️', type: 'consumable', rarity: 'rare', desc: '+50% ATK untuk 4 ronde pertarungan', effect: { type: 'buff_atk', value: 1.5, battles: 4 }, buyPrice: 120, sellPrice: 60 },
    elixir_def: { name: 'Stone Skin Elixir', emoji: '⚗️', type: 'consumable', rarity: 'rare', desc: '+50% DEF untuk 4 ronde pertarungan', effect: { type: 'buff_def', value: 1.5, battles: 4 }, buyPrice: 120, sellPrice: 60 },

    wooden_sword: { name: 'Wooden Sword', emoji: '🗡️', type: 'weapon', rarity: 'common', desc: 'Pedang latihan kayu standar', stats: { atk: 6 }, buyPrice: 0, sellPrice: 5 },
    fish_sword: { name: 'Fish Sword', emoji: '🐟', type: 'weapon', rarity: 'common', desc: 'Pedang ikan bau tapi tajam', stats: { atk: 14, crit: 2 }, craftRecipe: { fish_normie: 5, wood_normie: 5 } },
    iron_sword: { name: 'Iron Broadsword', emoji: '⚔️', type: 'weapon', rarity: 'common', desc: 'Pedang baja prajurit tangguh', stats: { atk: 22 }, buyPrice: 80, sellPrice: 40 },
    wolf_katana: { name: 'Wolf Katana', emoji: '🐺', type: 'weapon', rarity: 'uncommon', desc: 'Katana berbalut taring serigala alfa', stats: { atk: 35, crit: 4 }, craftRecipe: { d1_relic: 1, wolf_pelt: 5, wood_epic: 3 } },
    enchanted_blade: { name: 'Enchanted Claymore', emoji: '🔮', type: 'weapon', rarity: 'rare', desc: 'Pedang bercahaya rune kuno', stats: { atk: 55, crit: 6 }, craftRecipe: { d2_relic: 1, wood_super: 4, ruby: 2 } },
    frost_halberd: { name: 'Frost Halberd', emoji: '❄️', type: 'weapon', rarity: 'rare', desc: 'Tombak pembeku armor lawan', stats: { atk: 80, crit: 8 }, craftRecipe: { d4_relic: 1, ice_crystal: 4, diamond: 1 } },
    edgy_blade: { name: 'EDGY Scythe', emoji: '🖤', type: 'weapon', rarity: 'epic', desc: 'Sabit legendaris penembus kutukan', stats: { atk: 125, crit: 10 }, craftRecipe: { d5_relic: 1, siren_hair: 5, wood_mega: 4 } },
    ultra_edgy_blade: { name: 'ULTRA-EDGY Greatsword', emoji: '🔥', type: 'weapon', rarity: 'epic', desc: 'Pedang raksasa pemotong api naga', stats: { atk: 180, crit: 12 }, craftRecipe: { d6_relic: 1, magma_core: 4, wood_mega: 8 } },
    omega_laser_blade: { name: 'OMEGA Cyber Blade', emoji: '⚡', type: 'weapon', rarity: 'legendary', desc: 'Pedang laser frekuensi tinggi', stats: { atk: 260, crit: 15 }, craftRecipe: { d7_relic: 1, robot_chip: 6, wood_hyper: 4 } },
    godly_celestial_blade: { name: 'GODLY Solar Edge', emoji: '⭐', type: 'weapon', rarity: 'legendary', desc: 'Senjata berkekuatan ledakan supernova', stats: { atk: 380, crit: 20 }, craftRecipe: { d8_relic: 1, divine_starlight: 5, wood_hyper: 8 } },
    nexus_prime_blade: { name: 'NEXUS OMNI SLICER', emoji: '🌀', type: 'weapon', rarity: 'legendary', desc: 'Senjata pemotong serat antar-dimensi', stats: { atk: 550, crit: 28 }, craftRecipe: { d10_relic: 1, nexus_core: 2, reality_tear: 3, wood_hyper: 15 } },

    cloth_armor: { name: 'Cloth Tunic', emoji: '👕', type: 'armor', rarity: 'common', desc: 'Pakaian kain pengelana', stats: { def: 4, maxHp: 0 }, buyPrice: 0, sellPrice: 3 },
    fish_armor: { name: 'Fish Scale Vest', emoji: '🐟', type: 'armor', rarity: 'common', desc: 'Rompi jahit sisik ikan sungai', stats: { def: 10, maxHp: 30 }, craftRecipe: { fish_normie: 6, wood_normie: 4 } },
    iron_plate: { name: 'Iron Plate Armor', emoji: '🛡️', type: 'armor', rarity: 'common', desc: 'Baju zirah pelat besi tempa', stats: { def: 18, maxHp: 65 }, buyPrice: 100, sellPrice: 50 },
    wolf_fur_mantle: { name: 'Alpha Fur Mantle', emoji: '🐺', type: 'armor', rarity: 'uncommon', desc: 'Mantel bulu serigala pelindung dada', stats: { def: 30, maxHp: 120 }, craftRecipe: { d1_relic: 1, wolf_pelt: 6, fish_golden: 2 } },
    ogre_stone_plate: { name: 'Ogre Carved Plate', emoji: '🗿', type: 'armor', rarity: 'rare', desc: 'Zirah batu kokoh tahan hantaman', stats: { def: 52, maxHp: 220 }, craftRecipe: { d3_relic: 1, ogre_club_piece: 4, fish_epic: 2 } },
    edgy_armor: { name: 'EDGY Cuirass', emoji: '🖤', type: 'armor', rarity: 'epic', desc: 'Zirah hitam penahan racun mematikan', stats: { def: 85, maxHp: 380 }, craftRecipe: { d5_relic: 1, hydra_scale: 5, fish_super: 3 } },
    ultra_edgy_armor: { name: 'ULTRA-EDGY Aegis', emoji: '🔥', type: 'armor', rarity: 'epic', desc: 'Perisai dada penangkal semburan lahar', stats: { def: 130, maxHp: 600 }, craftRecipe: { d6_relic: 1, fire_scale: 5, fish_super: 6 } },
    omega_force_armor: { name: 'OMEGA Energy Shield', emoji: '⚡', type: 'armor', rarity: 'legendary', desc: 'Zirah berbalut kubah energi pelindung', stats: { def: 195, maxHp: 950 }, craftRecipe: { d7_relic: 1, cyber_alloy: 6, fish_super: 10 } },
    godly_aegis: { name: 'GODLY Seraph Mantle', emoji: '⭐', type: 'armor', rarity: 'legendary', desc: 'Mantel suci diberkahi cahaya para malaikat', stats: { def: 280, maxHp: 1500 }, craftRecipe: { d8_relic: 1, celestial_feather: 6, diamond: 5 } },
    nexus_prime_armor: { name: 'NEXUS COSMIC MANTLE', emoji: '🌀', type: 'armor', rarity: 'legendary', desc: 'Baju zirah pelindung absolut multiverse', stats: { def: 420, maxHp: 2500 }, craftRecipe: { d10_relic: 1, nexus_essence: 3, reality_tear: 3, wood_hyper: 10 } },

    ring_wood: { name: 'Wooden Luck Ring', emoji: '💍', type: 'accessory', rarity: 'common', desc: 'Cincin kayu pembawa keberuntungan', stats: { crit: 2 }, buyPrice: 40, sellPrice: 20 },
    ring_ruby: { name: 'Ruby Power Ring', emoji: '💍', type: 'accessory', rarity: 'rare', desc: 'Cincin permata penambah serangan', stats: { crit: 5, atk: 12 }, buyPrice: 250, sellPrice: 125 },
    talisman_siren: { name: 'Siren Pearl Talisman', emoji: '📿', type: 'accessory', rarity: 'epic', desc: 'Jimat mutiara laut dalam', stats: { crit: 8, atk: 25, def: 15, maxHp: 150 }, craftRecipe: { d5_relic: 1, ruby: 3, fish_epic: 4 } },
    chrono_amulet: { name: 'Chrono Time Amulet', emoji: '⏳', type: 'accessory', rarity: 'legendary', desc: 'Jimat pembengkok waktu tempur', stats: { crit: 15, atk: 55, def: 35, maxHp: 400 }, craftRecipe: { d9_relic: 1, chrono_dust: 4, diamond: 3 } },
    nexus_infinity_ring: { name: 'NEXUS INFINITY ORB', emoji: '🌀', type: 'accessory', rarity: 'legendary', desc: 'Artefak mutlak penguasa realitas', stats: { crit: 25, atk: 100, def: 75, maxHp: 800 }, craftRecipe: { d10_relic: 1, nexus_core: 1, nexus_essence: 2 } }
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
     2. DEFAULT STATE & CLIENT PERSISTENCE
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
    gold: 100,
    currentArea: 'area_1',
    inventory: {
      wood_normie: 5,
      fish_normie: 5,
      apple: 3,
      crate_common: 1
    },
    equipment: {
      weapon: 'wooden_sword',
      armor: 'cloth_armor',
      accessory: null
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
      goldEarned: 100
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
     3. STATS & FORMULAS
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

    if (state.buffs && state.buffs.battlesLeft > 0) {
      atk = Math.floor(atk * (state.buffs.atkMultiplier || 1));
      def = Math.floor(def * (state.buffs.defMultiplier || 1));
    }

    return {
      atk,
      def,
      maxHp,
      crit: Math.min(75, Math.max(5, crit))
    };
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

      addLog(`✨ <strong>LEVEL UP!</strong> Anda mencapai <strong>Level ${state.level}</strong>! Status meningkat dan darah pulih penuh!`, 'levelup');

      SKILLS.forEach(s => {
        if (state.level >= s.levelReq && !state.skills.includes(s.id)) {
          state.skills.push(s.id);
          addLog(`⭐ <strong>Skill Terbuka:</strong> ${s.emoji} <strong>${s.name}</strong> (${s.desc})!`, 'system');
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
  const el = {
    authScreen: document.getElementById('auth-screen'),
    gameScreen: document.getElementById('game-screen'),
    loginForm: document.getElementById('login-form'),
    registerForm: document.getElementById('register-form'),
    loginError: document.getElementById('login-error'),
    registerError: document.getElementById('register-error'),
    tabs: document.querySelectorAll('.auth-tabs .tab'),
    charName: document.getElementById('char-name'),
    charLevel: document.getElementById('char-level'),
    goldDisplay: document.getElementById('gold-display'),
    hpBar: document.getElementById('hp-bar'),
    hpText: document.getElementById('hp-text'),
    xpBar: document.getElementById('xp-bar'),
    xpText: document.getElementById('xp-text'),
    statAtk: document.getElementById('stat-atk'),
    statDef: document.getElementById('stat-def'),
    statCrit: document.getElementById('stat-crit'),
    statArea: document.getElementById('stat-area'),
    equipWeapon: document.getElementById('equip-weapon'),
    equipArmor: document.getElementById('equip-armor'),
    equipAccessory: document.getElementById('equip-accessory'),
    gameLog: document.getElementById('game-log'),
    logoutBtn: document.getElementById('logout-btn'),
    saveStatus: document.getElementById('save-status'),
    modal: document.getElementById('modal'),
    modalTitle: document.getElementById('modal-title'),
    modalBody: document.getElementById('modal-body'),
    modalClose: document.getElementById('modal-close'),
    toast: document.getElementById('toast'),
    viewTabs: document.querySelectorAll('.nav-tab-btn'),
    viewPanels: document.querySelectorAll('.view-panel')
  };

  function updateUI() {
    const stats = getComputedStats();
    if (state.hp > stats.maxHp) state.hp = stats.maxHp;
    const hpPct = Math.max(0, Math.min(100, (state.hp / stats.maxHp) * 100));
    const xpPct = Math.max(0, Math.min(100, (state.xp / state.xpToNext) * 100));

    el.charName.textContent = state.characterName || 'Hero';
    el.charLevel.textContent = state.level;
    el.goldDisplay.textContent = Number(state.gold).toLocaleString();

    el.hpBar.style.width = `${hpPct}%`;
    el.hpText.textContent = `${Math.max(0, state.hp)}/${stats.maxHp}`;

    el.xpBar.style.width = `${xpPct}%`;
    el.xpText.textContent = `${state.xp}/${state.xpToNext}`;

    el.statAtk.textContent = stats.atk;
    el.statDef.textContent = stats.def;
    el.statCrit.textContent = `${stats.crit.toFixed(1)}%`;

    const currentAreaObj = AREAS.find(a => a.id === state.currentArea) || AREAS[0];
    el.statArea.textContent = `${currentAreaObj.emoji} ${currentAreaObj.name.split(':')[0]}`;

    const wItem = ITEMS[state.equipment.weapon];
    const aItem = ITEMS[state.equipment.armor];
    const accItem = ITEMS[state.equipment.accessory];

    el.equipWeapon.textContent = wItem ? `${wItem.emoji} ${wItem.name}` : 'None';
    el.equipArmor.textContent = aItem ? `${aItem.emoji} ${aItem.name}` : 'None';
    el.equipAccessory.textContent = accItem ? `${accItem.emoji} ${accItem.name}` : 'None';
  }

  function addLog(msg, type = 'system') {
    const div = document.createElement('div');
    div.className = `log-entry ${type}`;
    div.innerHTML = msg;
    el.gameLog.insertBefore(div, el.gameLog.firstChild);
    while (el.gameLog.children.length > 70) {
      el.gameLog.removeChild(el.gameLog.lastChild);
    }
  }

  function showToast(msg) {
    el.toast.textContent = msg;
    el.toast.classList.add('show');
    clearTimeout(el.toast._timer);
    el.toast._timer = setTimeout(() => {
      el.toast.classList.remove('show');
    }, 2200);
  }

  // 100% AUTO-SAVE: Langsung simpan di localStorage (0 ms) & kirim ke Server Cloud
  function autoSaveInstant() {
    if (activeUsername) {
      localStorage.setItem(`nexus_save_${activeUsername}`, JSON.stringify(state));
    }

    if (el.saveStatus) {
      el.saveStatus.textContent = '💾 Menyimpan...';
      el.saveStatus.style.color = 'var(--accent-gold)';
    }

    if (authToken) {
      fetch('/api/save', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${authToken}`
        },
        body: JSON.stringify({ gameState: state })
      })
      .then(r => r.json())
      .then(d => {
        if (d.success && el.saveStatus) {
          el.saveStatus.textContent = '🟢 Cloud Tersinkron';
          el.saveStatus.style.color = 'var(--accent-green)';
        }
      })
      .catch(() => {
        if (el.saveStatus) {
          el.saveStatus.textContent = '📱 Tersimpan di HP/PC';
          el.saveStatus.style.color = 'var(--accent-cyan)';
        }
      });
    }
  }

  function checkCooldown(actionKey, ms) {
    const now = Date.now();
    const readyAt = state.cooldowns[actionKey] || 0;
    if (now < readyAt) {
      const waitSec = Math.ceil((readyAt - now) / 1000);
      showToast(`⏳ Cooldown ${actionKey.toUpperCase()}: tunggu ${waitSec} detik`);
      return false;
    }
    state.cooldowns[actionKey] = now + ms;
    return true;
  }

  /* ============================================================
     5. COMBAT ENGINE
     ============================================================ */
  function executeBattle(monster, isBoss = false) {
    const pStats = getComputedStats();
    let mHp = monster.hp;
    let pHp = state.hp;
    let round = 1;
    let battleLog = [];
    let absorbedHit = false;

    const unlocked = state.skills.map(id => SKILLS.find(s => s.id === id)).filter(Boolean);
    const offensiveSkills = unlocked.filter(s => s.mult);
    const hasShieldBlock = state.skills.includes('shield_block');
    const hasHealLight = state.skills.includes('heal_light');
    const hasMysticShield = state.skills.includes('mystic_shield');

    battleLog.push(`⚔️ <strong>PERTARUNGAN:</strong> Menghadapi <strong>${monster.emoji} ${monster.name}</strong> [HP: ${monster.hp} | ATK: ${monster.atk} | DEF: ${monster.def}]`);

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

      if (skillUsed) {
        battleLog.push(`✨ <strong>${skillUsed.emoji} ${skillUsed.name}!</strong> Jurus mengerahkan <strong>${pDmg}</strong> DMG!`);
      } else if (isCrit) {
        battleLog.push(`💥 <strong>CRITICAL HIT!</strong> Menghantam ${monster.name} sebesar <strong>${pDmg}</strong> DMG!`);
      } else {
        battleLog.push(`🗡️ Anda menebas ${monster.name} sebesar <strong>${pDmg}</strong> DMG.`);
      }

      if (mHp <= 0) break;

      if (hasHealLight && pHp < pStats.maxHp * 0.3 && Math.random() < 0.6) {
        const healAmt = Math.floor(pStats.maxHp * 0.25);
        pHp = Math.min(pStats.maxHp, pHp + healAmt);
        battleLog.push(`💚 <strong>Heal Light</strong> terpicu! Pulih <strong>+${healAmt} HP</strong>.`);
      }

      let mDmg = calculateDamage(monster.atk, pStats.def, false);
      if (hasMysticShield && !absorbedHit && Math.random() < 0.45) {
        absorbedHit = true;
        mDmg = 0;
        battleLog.push(`🔮 <strong>Mystic Shield</strong> menangkis mutlak serangan ${monster.name}!`);
      } else if (hasShieldBlock && Math.random() < 0.4) {
        mDmg = Math.floor(mDmg * 0.5);
        battleLog.push(`🛡️ <strong>Shield Block</strong> mengurangi separuh serangan! Terkena <strong>${mDmg}</strong> DMG.`);
      } else {
        battleLog.push(`🩸 ${monster.name} menyerang Anda sebesar <strong>${mDmg}</strong> DMG.`);
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
        addLog(`⌛ Efek ramuan kekuatan telah habis.`, 'system');
      }
    }

    if (mHp <= 0) {
      const earnedGold = Math.floor(monster.gold * (1 + Math.random() * 0.3));
      const earnedXp = monster.xp;
      state.gold += earnedGold;
      state.xp += earnedXp;
      state.stats.goldEarned += earnedGold;

      if (isBoss) state.stats.bossesKilled += 1;
      else state.stats.monstersKilled += 1;

      battleLog.push(`🏆 <strong>MENANG!</strong> Berhasil mengalahkan ${monster.emoji} ${monster.name}!`);
      battleLog.push(`🎁 <strong>Hadiah:</strong> +${earnedXp} EXP, +${earnedGold} 💰 Gold.`);

      if (monster.drops && monster.drops.length > 0) {
        monster.drops.forEach(drop => {
          if (Math.random() < drop.chance) {
            state.inventory[drop.id] = (state.inventory[drop.id] || 0) + 1;
            const item = ITEMS[drop.id];
            battleLog.push(`💎 <strong>Drop Didapat:</strong> ${item ? `${item.emoji} ${item.name}` : drop.id} x1!`);
          }
        });
      }

      addLog(battleLog.join('<br>'), isBoss ? 'victory' : 'combat');
      checkLevelUp();
      return true;
    } else {
      state.stats.deaths += 1;
      battleLog.push(`💀 <strong>TEWAS!</strong> Anda gugur melawan ${monster.name}. Gunakan ❤️ Heal untuk bangkit!`);
      addLog(battleLog.join('<br>'), 'danger');
      return false;
    }
  }

  /* ============================================================
     6. ACTIONS (COMBAT, CHOP, FISH, HEAL)
     ============================================================ */
  function handleHunt() {
    if (!checkCooldown('hunt', 2000)) return;
    if (state.hp <= 0) { showToast('💀 Anda tumbang! Gunakan ❤️ Heal untuk memulihkan diri.'); return; }

    const areaMonsters = MONSTERS[state.currentArea] || MONSTERS.area_1;
    const monster = areaMonsters[Math.floor(Math.random() * areaMonsters.length)];

    executeBattle(monster, false);
    updateUI();
    autoSaveInstant();
  }

  function handleAdventure() {
    if (!checkCooldown('adventure', 5000)) return;
    if (state.hp <= 0) { showToast('💀 Anda tumbang! Gunakan ❤️ Heal terlebih dahulu.'); return; }

    openModal('🗺️ Pilih Destinasi Ekspedisi', () => {
      const available = AREAS.filter(a => state.level >= a.levelReq);
      return `
        <p style="margin-bottom: 14px; color: var(--text-sub); font-size:13px;">Ekspedisi 3 ronde beruntun berbahaya dengan bonus +50% EXP dan Gold!</p>
        <div class="shop-grid">
          ${available.map(a => `
            <div class="item-card">
              <div class="item-name">${a.emoji} ${a.name}</div>
              <div class="item-desc">${a.desc}</div>
              <div class="item-stats">Syarat: Lv.${a.levelReq}</div>
              <button class="btn-primary" style="margin-top:10px;" onclick="window.NexusRPG.startAdventure('${a.id}')">🚀 Mulai Ekspedisi</button>
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
      addLog(`📍 <strong>Ronde ${i}/${stages}:</strong> Pertempuran di garis depan...`, 'system');
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
      addLog(`🎉 <strong>EKSPEDISI SELESAI!</strong> Seluruh ronde ditaklukkan! Bonus Ekstra: <strong>+${bonusXp} EXP</strong>, <strong>+${bonusGold} 💰</strong>.`, 'victory');
      checkLevelUp();
    }

    updateUI();
    autoSaveInstant();
  }

  function handleDungeon() {
    if (!checkCooldown('dungeon', 8000)) return;
    if (state.hp <= 0) { showToast('💀 Anda tumbang! Pulihkan HP Anda.'); return; }

    const boss = DUNGEON_BOSSES[state.currentArea];
    if (!boss) { showToast('Tidak ada dungeon di area ini.'); return; }

    addLog(`🏰 <strong>DUNGEON TERBUKA!</strong> Menantang Boss Penjaga: <strong>${boss.emoji} ${boss.name}</strong>!`, 'combat');
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
    if (state.hp <= 0) { showToast('💀 Anda tumbang! Gunakan ❤️ Heal dulu.'); return; }

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

    let msg = `🪓 <strong>LOGGING PANEN:</strong> Anda menebang kayu di hutan!<br>Hasil: 🪵 <strong>Normie Wood x${baseWood}</strong>, +${xpEarned} EXP.`;
    if (bonusLog.length > 0) msg += `<br>Hadiah Bonus: ${bonusLog.join(', ')}!`;

    addLog(msg, 'loot');
    checkLevelUp();
    updateUI();
    autoSaveInstant();
  }

  function handleFish() {
    if (!checkCooldown('fish', 3000)) return;
    if (state.hp <= 0) { showToast('💀 Anda tumbang! Gunakan ❤️ Heal dulu.'); return; }

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

    let msg = `🎣 <strong>MEMANCING:</strong> Anda menebar jaring di arus sungai kosmik!<br>Tangkapan: 🐟 <strong>Normie Fish x${baseFish}</strong>, +${xpEarned} EXP.`;
    if (bonusLog.length > 0) msg += `<br>Ikan Langka: ${bonusLog.join(', ')}!`;

    addLog(msg, 'loot');
    checkLevelUp();
    updateUI();
    autoSaveInstant();
  }

  /* ============================================================
     7. CRATES / LOOTBOXES
     ============================================================ */
  function showCratesModal() {
    openModal('📦 Buka Peti Hadiah (Lootbox)', () => {
      const crateKeys = ['crate_common', 'crate_uncommon', 'crate_rare', 'crate_epic', 'crate_edgy', 'crate_omega', 'crate_godly'];
      const myCrates = crateKeys.filter(k => state.inventory[k] > 0);

      if (myCrates.length === 0) {
        return `
          <div style="text-align:center; padding:25px; color:var(--text-sub)">
            <p>Saat ini tidak ada peti di tas Anda!</p>
            <p style="margin-top:10px; font-size:12px;">Dapatkan peti dari berburu monster, panen kayu, memancing, atau beli di 🛒 Toko.</p>
          </div>
        `;
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
                <button class="btn-primary" style="margin-top:10px;" onclick="window.NexusRPG.openCrate('${id}')">🎁 Buka Peti Ini</button>
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

    addLog(`🎁 <strong>PETI DIBUKA:</strong> ${ITEMS[crateId].name} terbuka!<br>Gold: +${gainedGold} 💰 | EXP: +${gainedXp}<br>Hadiah: ${itemsGained.join(', ')}`, 'victory');
    showToast(`Membuka ${ITEMS[crateId].name}!`);

    checkLevelUp();
    updateUI();
    autoSaveInstant();
    showCratesModal();
  }

  /* ============================================================
     8. TRADE MARKET
     ============================================================ */
  function showTradeModal() {
    openModal('⚖️ Pasar Penukaran Sumber Daya', () => {
      return `
        <p style="margin-bottom:14px; color:var(--text-sub); font-size:13px;">Tukar hasil panen kayu, ikan, dan permata langsung:</p>
        <div class="shop-grid">
          <div class="item-card">
            <div class="item-name">🪵 Kayu ➔ 🐟 Ikan</div>
            <div class="item-desc">Tukar 10 Normie Wood jadi 10 Normie Fish</div>
            <div class="item-stats">Kayu Anda: ${state.inventory.wood_normie || 0}</div>
            <button class="btn-primary" onclick="window.NexusRPG.trade('wood_to_fish')">Tukar (10 Kayu)</button>
          </div>
          <div class="item-card">
            <div class="item-name">🐟 Ikan ➔ 🪵 Kayu</div>
            <div class="item-desc">Tukar 10 Normie Fish jadi 10 Normie Wood</div>
            <div class="item-stats">Ikan Anda: ${state.inventory.fish_normie || 0}</div>
            <button class="btn-primary" onclick="window.NexusRPG.trade('fish_to_wood')">Tukar (10 Ikan)</button>
          </div>
          <div class="item-card">
            <div class="item-name">🪵 10 Normie Wood ➔ 🪵 1 Epic Wood</div>
            <div class="item-desc">Gabungkan kayu menjadi kayu langka</div>
            <div class="item-stats">Kayu Anda: ${state.inventory.wood_normie || 0}</div>
            <button class="btn-primary" onclick="window.NexusRPG.trade('compress_wood')">Gabungkan Kayu</button>
          </div>
          <div class="item-card">
            <div class="item-name">🐟 10 Normie Fish ➔ 🐠 1 Golden Fish</div>
            <div class="item-desc">Tukar tangkapan menjadi ikan emas</div>
            <div class="item-stats">Ikan Anda: ${state.inventory.fish_normie || 0}</div>
            <button class="btn-primary" onclick="window.NexusRPG.trade('compress_fish')">Tukar Ikan Emas</button>
          </div>
          <div class="item-card">
            <div class="item-name">💎 1 Ruby ➔ 💰 100 Gold</div>
            <div class="item-desc">Jual permata ruby untuk gold langsung</div>
            <div class="item-stats">Ruby Anda: ${state.inventory.ruby || 0}</div>
            <button class="btn-primary" onclick="window.NexusRPG.trade('ruby_to_gold')">Jual Ruby (+100 💰)</button>
          </div>
          <div class="item-card">
            <div class="item-name">💰 150 Gold ➔ 💎 1 Ruby</div>
            <div class="item-desc">Beli permata ruby untuk menempa senjata</div>
            <div class="item-stats">Gold Anda: ${state.gold}</div>
            <button class="btn-primary" onclick="window.NexusRPG.trade('gold_to_ruby')">Beli Ruby (-150 💰)</button>
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
     9. MODALS (INVENTORY, SHOP, CRAFT, SKILLS)
     ============================================================ */
  function openModal(title, renderFn) {
    el.modalTitle.textContent = title;
    el.modalBody.innerHTML = renderFn();
    el.modal.style.display = 'flex';
  }

  function closeModal() {
    el.modal.style.display = 'none';
  }

  function showInventory() {
    openModal('🎒 Tas Hero & Perlengkapan', () => {
      const keys = Object.keys(state.inventory).filter(k => state.inventory[k] > 0);
      if (keys.length === 0) {
        return `<p style="text-align:center; color: var(--text-sub); padding: 30px;">Tas Anda kosong melompong.</p>`;
      }

      return `
        <div class="inventory-grid">
          ${keys.map(itemId => {
            const item = ITEMS[itemId];
            if (!item) return '';
            const qty = state.inventory[itemId];
            let actionBtn = '';

            if (item.type === 'consumable') {
              actionBtn = `<button class="btn-primary" onclick="window.NexusRPG.useItem('${itemId}')">Gunakan Item</button>`;
            } else if (item.type === 'crate') {
              actionBtn = `<button class="btn-primary" onclick="window.NexusRPG.openCrate('${itemId}')">Buka Peti</button>`;
            } else if (item.type === 'weapon' || item.type === 'armor' || item.type === 'accessory') {
              actionBtn = `<button class="btn-primary" onclick="window.NexusRPG.equipItem('${itemId}')">Pakai (Equip)</button>`;
            } else {
              actionBtn = `<button class="btn-primary" style="background:transparent; border:1px solid var(--accent-gold); color:var(--accent-gold)" onclick="window.NexusRPG.sellItem('${itemId}', 1)">Jual (${item.sellPrice} 💰)</button>`;
            }

            return `
              <div class="item-card">
                <div class="item-name">${item.emoji} ${item.name} <span style="font-size:12px; opacity:0.8;">(x${qty})</span></div>
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
      addLog(`🧪 Menggunakan <strong>${item.name}</strong>: Memulihkan <strong>+${item.effect.value} HP</strong>.`, 'heal');
    } else if (item.effect.type === 'heal_full') {
      state.hp = pStats.maxHp;
      showToast(`Darah pulih penuh 100%!`);
      addLog(`🧪 Menggunakan <strong>${item.name}</strong>: Vitalitas kembali 100%!`, 'heal');
    } else if (item.effect.type === 'buff_atk') {
      state.buffs.atkMultiplier = item.effect.value;
      state.buffs.battlesLeft = item.effect.battles || 4;
      showToast(`+50% Serangan bertambah untuk 4 ronde!`);
      addLog(`⚗️ Meminum <strong>${item.name}</strong>: +50% ATK untuk 4 ronde!`, 'system');
    } else if (item.effect.type === 'buff_def') {
      state.buffs.defMultiplier = item.effect.value;
      state.buffs.battlesLeft = item.effect.battles || 4;
      showToast(`+50% Pertahanan bertambah untuk 4 ronde!`);
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
                <button ${canAfford ? '' : 'disabled'} class="btn-primary" onclick="window.NexusRPG.buyItem('${id}')">
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
    if (!item || state.gold < item.buyPrice) {
      showToast('❌ Gold tidak cukup!');
      return;
    }

    state.gold -= item.buyPrice;
    state.inventory[itemId] = (state.inventory[itemId] || 0) + 1;
    showToast(`Membeli ${item.name}!`);
    addLog(`🛒 Membeli <strong>${item.emoji} ${item.name}</strong> seharga ${item.buyPrice} 💰.`, 'system');

    updateUI();
    autoSaveInstant();
    showShop();
  }

  function showCraft() {
    openModal('🔨 Mystic Forge (Tempa Senjata & Armor)', () => {
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
                <div style="font-size:12px; margin: 8px 0; background:rgba(0,0,0,0.3); padding:8px; border-radius:6px;">
                  ${ingredientsHtml}
                </div>
                <button ${canCraft ? '' : 'disabled'} class="btn-primary" onclick="window.NexusRPG.craftItem('${k}')">
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

  function showSkills() {
    openModal('⭐ Pohon Keahlian Hero', () => {
      return `
        <div class="skill-grid">
          ${SKILLS.map(s => {
            const unlocked = state.level >= s.levelReq;
            return `
              <div class="item-card" style="opacity: ${unlocked ? 1 : 0.5};">
                <div class="item-name">${s.emoji} ${s.name} ${unlocked ? '✅ Aktif' : '🔒 Terkunci'}</div>
                <div class="item-desc">${s.desc}</div>
                <div class="item-stats" style="color: ${unlocked ? 'var(--accent-cyan)' : 'var(--accent-red)'}">
                  ${unlocked ? 'Keahlian aktif dalam pertarungan' : `Terbuka pada Level ${s.levelReq}`}
                </div>
              </div>
            `;
          }).join('')}
        </div>
      `;
    });
  }

  /* ============================================================
     10. AUTH & SINKRONISASI CLOUD LINTAS DEVICE
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
        if (activeUsername) {
          localStorage.setItem(`nexus_save_${activeUsername}`, JSON.stringify(state));
        }
        updateUI();
        return true;
      }
    } catch (e) {
      console.warn('Could not reach cloud load, using local cache');
    }

    // Fallback ke localStorage jika server sleep
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
    if (authToken && activeUsername) {
      await loadCloudSave();
      el.authScreen.style.display = 'none';
      el.gameScreen.style.display = 'flex';
      addLog(`🌌 Selamat datang kembali, <strong>${state.characterName || activeUsername}</strong>! Progres aktif.`, 'system');
      return;
    }

    el.authScreen.style.display = 'flex';
    el.gameScreen.style.display = 'none';
  }

  async function handleLogin(e) {
    e.preventDefault();
    el.loginError.textContent = '';
    const u = document.getElementById('login-username').value.trim();
    const p = document.getElementById('login-password').value;

    try {
      const res = await fetch('/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username: u, password: p })
      });
      const data = await res.json();
      if (data.success) {
        authToken = data.token;
        activeUsername = data.username;
        localStorage.setItem('nexus_auth_token', authToken);
        localStorage.setItem('nexus_username', activeUsername);

        await loadCloudSave();
        el.authScreen.style.display = 'none';
        el.gameScreen.style.display = 'flex';
        addLog(`⚔️ Berhasil terhubung ke akun <strong>${state.characterName || u}</strong>.`, 'system');
      } else {
        el.loginError.textContent = data.error || 'Login gagal';
      }
    } catch (err) {
      el.loginError.textContent = 'Gagal menghubungi server cloud';
    }
  }

  async function handleRegister(e) {
    e.preventDefault();
    el.registerError.textContent = '';
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

        state = JSON.parse(JSON.stringify(DEFAULT_STATE));
        state.characterName = charName;
        autoSaveInstant();

        el.authScreen.style.display = 'none';
        el.gameScreen.style.display = 'flex';
        updateUI();
        addLog(`✨ Selamat datang Hero <strong>${charName}</strong>! Petualangan dimulai di Area 1: Verdant Plains.`, 'system');
      } else {
        el.registerError.textContent = data.error || 'Pendaftaran gagal';
      }
    } catch (err) {
      el.registerError.textContent = 'Gagal menghubungi server cloud';
    }
  }

  function handleLogout() {
    autoSaveInstant();
    authToken = null;
    activeUsername = null;
    localStorage.removeItem('nexus_auth_token');
    localStorage.removeItem('nexus_username');
    location.reload();
  }

  /* ============================================================
     11. EVENT LISTENERS & SETUP
     ============================================================ */
  function setupEvents() {
    // Auth Tabs
    el.tabs.forEach(tab => {
      tab.addEventListener('click', () => {
        el.tabs.forEach(t => t.classList.remove('active'));
        tab.classList.add('active');
        if (tab.dataset.tab === 'login') {
          el.loginForm.style.display = 'block';
          el.registerForm.style.display = 'none';
        } else {
          el.loginForm.style.display = 'none';
          el.registerForm.style.display = 'block';
        }
      });
    });

    el.loginForm.addEventListener('submit', handleLogin);
    el.registerForm.addEventListener('submit', handleRegister);
    el.logoutBtn.addEventListener('click', handleLogout);

    el.modalClose.addEventListener('click', closeModal);
    el.modal.querySelector('.modal-overlay').addEventListener('click', closeModal);

    // Responsive View Switcher Tabs (Combat, Gathering, Bag, Forge)
    el.viewTabs.forEach(btn => {
      btn.addEventListener('click', () => {
        el.viewTabs.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        const viewId = btn.dataset.view;

        el.viewPanels.forEach(p => {
          if (p.id === `view-${viewId}`) {
            p.style.display = 'block';
          } else {
            p.style.display = 'none';
          }
        });
      });
    });

    // Action button listeners
    document.querySelectorAll('.action-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const action = btn.dataset.action;
        switch (action) {
          case 'hunt': handleHunt(); break;
          case 'adventure': handleAdventure(); break;
          case 'dungeon': handleDungeon(); break;
          case 'heal': handleHeal(); break;
          case 'chop': handleChop(); break;
          case 'fish': handleFish(); break;
          case 'crate': showCratesModal(); break;
          case 'trade': showTradeModal(); break;
          case 'inventory': showInventory(); break;
          case 'shop': showShop(); break;
          case 'craft': showCraft(); break;
          case 'skills': showSkills(); break;
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
    trade: handleTrade
  };

  document.addEventListener('DOMContentLoaded', () => {
    setupEvents();
    checkSession();
  });

})();
