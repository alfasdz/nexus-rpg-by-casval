// NEXUS RPG - Core Game Client & Engine
(function() {
  'use strict';

  /* ============================================================
     GAME DATA DEFINITIONS
     ============================================================ */
  const AREAS = [
    { id: 'misty_forest', name: 'Misty Forest', emoji: '🌲', levelReq: 1, description: 'A foggy woodland teeming with critters' },
    { id: 'dark_caves', name: 'Dark Caves', emoji: '🕳️', levelReq: 5, description: 'Echoing caverns filled with danger' },
    { id: 'cursed_swamp', name: 'Cursed Swamp', emoji: '🌿', levelReq: 10, description: 'Toxic marshlands of the undead' },
    { id: 'frozen_peaks', name: 'Frozen Peaks', emoji: '🏔️', levelReq: 20, description: 'Ice-covered mountains with ancient beasts' },
    { id: 'volcanic_depths', name: 'Volcanic Depths', emoji: '🌋', levelReq: 30, description: 'Rivers of lava and fire demons' },
    { id: 'shadow_realm', name: 'Shadow Realm', emoji: '🌑', levelReq: 45, description: 'A dimension of pure darkness' },
    { id: 'celestial_tower', name: 'Celestial Tower', emoji: '🏛️', levelReq: 60, description: 'A tower reaching into the stars' },
    { id: 'the_nexus', name: 'The Nexus', emoji: '🌀', levelReq: 80, description: 'The convergence of all realities' }
  ];

  const MONSTERS = {
    misty_forest: [
      { name: 'Slime', emoji: '🟢', hp: 20, atk: 5, def: 2, xp: 12, gold: 8, drops: [{id: 'slime_gel', chance: 0.4}] },
      { name: 'Forest Wolf', emoji: '🐺', hp: 32, atk: 8, def: 3, xp: 18, gold: 12, drops: [{id: 'wolf_fang', chance: 0.35}] },
      { name: 'Goblin Scout', emoji: '👺', hp: 28, atk: 10, def: 4, xp: 22, gold: 15, drops: [{id: 'goblin_ear', chance: 0.3}] },
      { name: 'Forest Spirit', emoji: '🧚', hp: 35, atk: 7, def: 6, xp: 26, gold: 20, drops: [{id: 'spirit_essence', chance: 0.25}] }
    ],
    dark_caves: [
      { name: 'Cave Bat', emoji: '🦇', hp: 45, atk: 14, def: 6, xp: 32, gold: 25, drops: [{id: 'bat_wing', chance: 0.35}] },
      { name: 'Rock Golem', emoji: '🗿', hp: 85, atk: 13, def: 15, xp: 48, gold: 35, drops: [{id: 'hard_stone', chance: 0.4}] },
      { name: 'Dark Spider', emoji: '🕷️', hp: 55, atk: 18, def: 8, xp: 42, gold: 30, drops: [{id: 'spider_silk', chance: 0.3}] },
      { name: 'Mushroom Fiend', emoji: '🍄', hp: 50, atk: 16, def: 10, xp: 38, gold: 28, drops: [{id: 'toxic_spore', chance: 0.3}] }
    ],
    cursed_swamp: [
      { name: 'Swamp Zombie', emoji: '🧟', hp: 75, atk: 22, def: 10, xp: 55, gold: 45, drops: [{id: 'undead_bone', chance: 0.35}] },
      { name: 'Marsh Hydra', emoji: '🐍', hp: 110, atk: 26, def: 15, xp: 75, gold: 60, drops: [{id: 'hydra_scale', chance: 0.25}] },
      { name: 'Swamp Witch', emoji: '🧙', hp: 68, atk: 32, def: 9, xp: 68, gold: 55, drops: [{id: 'witch_hat', chance: 0.2}] },
      { name: 'Toxic Toad', emoji: '🐸', hp: 60, atk: 22, def: 12, xp: 50, gold: 40, drops: [{id: 'toad_venom', chance: 0.3}] }
    ],
    frozen_peaks: [
      { name: 'Ice Elemental', emoji: '❄️', hp: 130, atk: 36, def: 20, xp: 95, gold: 75, drops: [{id: 'ice_crystal', chance: 0.3}] },
      { name: 'Frost Giant', emoji: '🧊', hp: 190, atk: 42, def: 26, xp: 125, gold: 100, drops: [{id: 'giant_bone', chance: 0.25}] },
      { name: 'Snow Leopard', emoji: '🐆', hp: 115, atk: 46, def: 16, xp: 105, gold: 85, drops: [{id: 'frost_fur', chance: 0.3}] },
      { name: 'Wild Yeti', emoji: '🦍', hp: 160, atk: 40, def: 24, xp: 118, gold: 95, drops: [{id: 'yeti_claw', chance: 0.25}] }
    ],
    volcanic_depths: [
      { name: 'Fire Imp', emoji: '😈', hp: 150, atk: 52, def: 22, xp: 140, gold: 115, drops: [{id: 'fire_ember', chance: 0.3}] },
      { name: 'Lava Serpent', emoji: '🐉', hp: 210, atk: 58, def: 32, xp: 170, gold: 140, drops: [{id: 'lava_scale', chance: 0.22}] },
      { name: 'Magma Golem', emoji: '🔥', hp: 260, atk: 48, def: 42, xp: 185, gold: 150, drops: [{id: 'magma_core', chance: 0.2}] },
      { name: 'Flame Phoenix', emoji: '🦅', hp: 190, atk: 64, def: 28, xp: 200, gold: 170, drops: [{id: 'phoenix_feather', chance: 0.15}] }
    ],
    shadow_realm: [
      { name: 'Shadow Wraith', emoji: '👻', hp: 230, atk: 68, def: 32, xp: 240, gold: 190, drops: [{id: 'shadow_shard', chance: 0.22}] },
      { name: 'Dark Knight', emoji: '🖤', hp: 320, atk: 74, def: 48, xp: 280, gold: 230, drops: [{id: 'dark_steel', chance: 0.18}] },
      { name: 'Nightmare Beast', emoji: '🐴', hp: 270, atk: 78, def: 36, xp: 265, gold: 215, drops: [{id: 'nightmare_mane', chance: 0.18}] },
      { name: 'Void Walker', emoji: '🕳️', hp: 295, atk: 84, def: 42, xp: 300, gold: 245, drops: [{id: 'void_essence', chance: 0.14}] }
    ],
    celestial_tower: [
      { name: 'Celestial Guard', emoji: '⚔️', hp: 370, atk: 92, def: 52, xp: 370, gold: 300, drops: [{id: 'celestial_ore', chance: 0.18}] },
      { name: 'Star Dragon', emoji: '🐲', hp: 470, atk: 104, def: 62, xp: 450, gold: 360, drops: [{id: 'star_scale', chance: 0.14}] },
      { name: 'Seraph Warrior', emoji: '👼', hp: 400, atk: 98, def: 58, xp: 400, gold: 320, drops: [{id: 'angel_wing', chance: 0.16}] },
      { name: 'Astral Beast', emoji: '✨', hp: 420, atk: 88, def: 68, xp: 420, gold: 340, drops: [{id: 'astral_dust', chance: 0.16}] }
    ],
    the_nexus: [
      { name: 'Nexus Titan', emoji: '🗿', hp: 650, atk: 125, def: 85, xp: 550, gold: 460, drops: [{id: 'nexus_crystal', chance: 0.15}] },
      { name: 'Reality Bender', emoji: '🌀', hp: 550, atk: 145, def: 65, xp: 620, gold: 500, drops: [{id: 'reality_shard', chance: 0.12}] },
      { name: 'Cosmic Devourer', emoji: '🐙', hp: 750, atk: 135, def: 95, xp: 700, gold: 550, drops: [{id: 'cosmic_core', chance: 0.1}] },
      { name: 'Nexus Guardian', emoji: '👁️', hp: 850, atk: 155, def: 105, xp: 850, gold: 680, drops: [{id: 'nexus_heart', chance: 0.08}] }
    ]
  };

  const DUNGEON_BOSSES = {
    misty_forest: { name: 'Ancient Treant King', emoji: '🌳', hp: 130, atk: 18, def: 12, xp: 120, gold: 80, drops: [{id: 'treant_heart', chance: 0.7}] },
    dark_caves: { name: 'Crystal Wyrm Lord', emoji: '💎', hp: 240, atk: 32, def: 22, xp: 220, gold: 150, drops: [{id: 'dragon_gem', chance: 0.6}] },
    cursed_swamp: { name: 'Death Lich Sovereign', emoji: '💀', hp: 340, atk: 44, def: 28, xp: 360, gold: 260, drops: [{id: 'lich_crown', chance: 0.55}] },
    frozen_peaks: { name: 'Ancient Frost Wyrm', emoji: '🐲', hp: 490, atk: 60, def: 38, xp: 550, gold: 420, drops: [{id: 'wyrm_fang', chance: 0.5}] },
    volcanic_depths: { name: 'Inferno Overlord', emoji: '👹', hp: 650, atk: 76, def: 48, xp: 780, gold: 620, drops: [{id: 'inferno_gem', chance: 0.45}] },
    shadow_realm: { name: 'Abyssal Shadow Emperor', emoji: '👑', hp: 880, atk: 98, def: 64, xp: 1050, gold: 850, drops: [{id: 'emperor_cape', chance: 0.4}] },
    celestial_tower: { name: 'Archangel Prime', emoji: '😇', hp: 1150, atk: 120, def: 80, xp: 1450, gold: 1200, drops: [{id: 'divine_halo', chance: 0.35}] },
    the_nexus: { name: 'Nexus Eternal Overlord', emoji: '🌌', hp: 1800, atk: 175, def: 110, xp: 2200, gold: 1800, drops: [{id: 'nexus_crown', chance: 0.3}] }
  };

  const ITEMS = {
    // Materials
    slime_gel: { name: 'Slime Gel', emoji: '🟢', type: 'material', rarity: 'common', description: 'Sticky cosmic slime essence', sellPrice: 4 },
    wolf_fang: { name: 'Wolf Fang', emoji: '🦷', type: 'material', rarity: 'common', description: 'Razor sharp predator fang', sellPrice: 6 },
    goblin_ear: { name: 'Goblin Ear', emoji: '👂', type: 'material', rarity: 'common', description: 'Trophy from a sneaky goblin', sellPrice: 5 },
    spirit_essence: { name: 'Spirit Essence', emoji: '✨', type: 'material', rarity: 'uncommon', description: 'Whispering ethereal energy', sellPrice: 12 },
    bat_wing: { name: 'Bat Wing', emoji: '🦇', type: 'material', rarity: 'common', description: 'Leathery cave membrane', sellPrice: 9 },
    hard_stone: { name: 'Hard Stone', emoji: '🪨', type: 'material', rarity: 'common', description: 'Extremely dense cosmic ore rock', sellPrice: 12 },
    spider_silk: { name: 'Spider Silk', emoji: '🕸️', type: 'material', rarity: 'uncommon', description: 'Elastic unbreakable woven thread', sellPrice: 15 },
    toxic_spore: { name: 'Toxic Spore', emoji: '☠️', type: 'material', rarity: 'uncommon', description: 'Luminescent poison dust', sellPrice: 14 },
    undead_bone: { name: 'Undead Bone', emoji: '🦴', type: 'material', rarity: 'uncommon', description: 'Bone burning with cold netherflame', sellPrice: 18 },
    hydra_scale: { name: 'Hydra Scale', emoji: '🐍', type: 'material', rarity: 'rare', description: 'Imprenetrable serpentine scale', sellPrice: 30 },
    witch_hat: { name: 'Witch Hat', emoji: '🎩', type: 'material', rarity: 'rare', description: 'Brimming with chaotic arcana', sellPrice: 38 },
    toad_venom: { name: 'Toad Venom', emoji: '💧', type: 'material', rarity: 'uncommon', description: 'Highly acidic toxin extract', sellPrice: 20 },
    ice_crystal: { name: 'Ice Crystal', emoji: '💠', type: 'material', rarity: 'rare', description: 'Zero Kelvin everlasting crystal', sellPrice: 42 },
    giant_bone: { name: 'Giant Bone', emoji: '🦴', type: 'material', rarity: 'rare', description: 'Colossal primeval skeleton piece', sellPrice: 48 },
    frost_fur: { name: 'Frost Fur', emoji: '🧥', type: 'material', rarity: 'rare', description: 'Pelt insulated against cosmic freeze', sellPrice: 45 },
    yeti_claw: { name: 'Yeti Claw', emoji: '🐾', type: 'material', rarity: 'rare', description: 'Mountain-cleaving claw', sellPrice: 48 },
    fire_ember: { name: 'Fire Ember', emoji: '🔥', type: 'material', rarity: 'rare', description: 'Self-igniting volcanic spark', sellPrice: 60 },
    lava_scale: { name: 'Lava Scale', emoji: '🔴', type: 'material', rarity: 'epic', description: 'Forged within earth core fire', sellPrice: 85 },
    magma_core: { name: 'Magma Core', emoji: '🟠', type: 'material', rarity: 'epic', description: 'Pulsing core of living flame', sellPrice: 95 },
    phoenix_feather: { name: 'Phoenix Feather', emoji: '🪶', type: 'material', rarity: 'epic', description: 'Warm feather whispering resurrection', sellPrice: 120 },
    shadow_shard: { name: 'Shadow Shard', emoji: '🖤', type: 'material', rarity: 'epic', description: 'Condensed dark matter sliver', sellPrice: 110 },
    dark_steel: { name: 'Dark Steel', emoji: '⚫', type: 'material', rarity: 'epic', description: 'Alloy tempered in abyssal blood', sellPrice: 130 },
    nightmare_mane: { name: 'Nightmare Mane', emoji: '🌑', type: 'material', rarity: 'epic', description: 'Echoes with terrifying whispers', sellPrice: 125 },
    void_essence: { name: 'Void Essence', emoji: '🕳️', type: 'material', rarity: 'legendary', description: 'Torn fragment of empty cosmos', sellPrice: 190 },
    celestial_ore: { name: 'Celestial Ore', emoji: '⭐', type: 'material', rarity: 'legendary', description: 'Fallen starlight metal', sellPrice: 220 },
    star_scale: { name: 'Star Scale', emoji: '🌟', type: 'material', rarity: 'legendary', description: 'Armor of a celestial dragon', sellPrice: 250 },
    angel_wing: { name: 'Angel Wing', emoji: '🕊️', type: 'material', rarity: 'legendary', description: 'Radiant holy plumage', sellPrice: 230 },
    astral_dust: { name: 'Astral Dust', emoji: '💫', type: 'material', rarity: 'legendary', description: 'Powder of pulverized constellations', sellPrice: 210 },
    nexus_crystal: { name: 'Nexus Crystal', emoji: '💎', type: 'material', rarity: 'legendary', description: 'Focus of infinite timeline force', sellPrice: 320 },
    reality_shard: { name: 'Reality Shard', emoji: '🔮', type: 'material', rarity: 'legendary', description: 'Distorts space when touched', sellPrice: 360 },
    cosmic_core: { name: 'Cosmic Core', emoji: '🌌', type: 'material', rarity: 'legendary', description: 'Singularity encapsulated', sellPrice: 450 },
    nexus_heart: { name: 'Nexus Heart', emoji: '❤️‍🔥', type: 'material', rarity: 'legendary', description: 'The beating pulse of all worlds', sellPrice: 650 },

    // Boss Relics
    treant_heart: { name: 'Treant Heart', emoji: '💚', type: 'material', rarity: 'rare', description: 'Verdant core of living ancient wood', sellPrice: 60 },
    dragon_gem: { name: 'Dragon Gem', emoji: '💎', type: 'material', rarity: 'rare', description: 'Reflects rainbow light of dragons', sellPrice: 110 },
    lich_crown: { name: 'Lich Crown', emoji: '👑', type: 'material', rarity: 'epic', description: 'Cold diadem of death magic', sellPrice: 160 },
    wyrm_fang: { name: 'Wyrm Fang', emoji: '🐲', type: 'material', rarity: 'epic', description: 'Scythe-sized apex tooth', sellPrice: 230 },
    inferno_gem: { name: 'Inferno Gem', emoji: '🔴', type: 'material', rarity: 'epic', description: 'Blazes with subterranean wrath', sellPrice: 320 },
    emperor_cape: { name: 'Emperor Cape', emoji: '🧣', type: 'material', rarity: 'legendary', description: 'Woven with absolute shadow', sellPrice: 450 },
    divine_halo: { name: 'Divine Halo', emoji: '😇', type: 'material', rarity: 'legendary', description: 'Blinding circle of celestial blessing', sellPrice: 650 },
    nexus_crown: { name: 'Nexus Crown', emoji: '👑', type: 'material', rarity: 'legendary', description: 'Crown destined for the Nexus Lord', sellPrice: 1000 },

    // Consumables
    small_potion: { name: 'Small Potion', emoji: '🧪', type: 'consumable', rarity: 'common', description: 'Restores 35 HP instantly', effect: { type: 'heal', value: 35 }, buyPrice: 15, sellPrice: 8 },
    medium_potion: { name: 'Medium Potion', emoji: '🧪', type: 'consumable', rarity: 'uncommon', description: 'Restores 90 HP instantly', effect: { type: 'heal', value: 90 }, buyPrice: 40, sellPrice: 20 },
    large_potion: { name: 'Large Potion', emoji: '🧪', type: 'consumable', rarity: 'rare', description: 'Restores 220 HP instantly', effect: { type: 'heal', value: 220 }, buyPrice: 100, sellPrice: 50 },
    mega_potion: { name: 'Mega Potion', emoji: '🧪', type: 'consumable', rarity: 'epic', description: 'Fully restores health to 100%', effect: { type: 'heal_full', value: 9999 }, buyPrice: 300, sellPrice: 150 },
    power_elixir: { name: 'Power Elixir', emoji: '⚗️', type: 'consumable', rarity: 'rare', description: '+50% ATK boost for 3 battles', effect: { type: 'buff_atk', value: 1.5, battles: 3 }, buyPrice: 80, sellPrice: 40 },
    shield_elixir: { name: 'Shield Elixir', emoji: '⚗️', type: 'consumable', rarity: 'rare', description: '+50% DEF boost for 3 battles', effect: { type: 'buff_def', value: 1.5, battles: 3 }, buyPrice: 80, sellPrice: 40 },

    // Weapons
    wooden_sword: { name: 'Wooden Sword', emoji: '🗡️', type: 'weapon', rarity: 'common', description: 'A carved wooden training blade', stats: { atk: 5 }, buyPrice: 0, sellPrice: 5 },
    iron_sword: { name: 'Iron Sword', emoji: '⚔️', type: 'weapon', rarity: 'common', description: 'Sturdy forged blade with keen edge', stats: { atk: 14 }, buyPrice: 60, sellPrice: 30 },
    steel_blade: { name: 'Steel Blade', emoji: '⚔️', type: 'weapon', rarity: 'uncommon', description: 'Tempered warrior steel weapon', stats: { atk: 25 }, buyPrice: 160, sellPrice: 80 },
    enchanted_blade: { name: 'Enchanted Blade', emoji: '🔮', type: 'weapon', rarity: 'rare', description: 'Infused with shimmering magic', stats: { atk: 42 }, buyPrice: 420, sellPrice: 210 },
    crystal_sword: { name: 'Crystal Sword', emoji: '💎', type: 'weapon', rarity: 'rare', description: 'Honed from ancient dragon gem', stats: { atk: 62 }, craftRecipe: { dragon_gem: 1, hard_stone: 3 } },
    inferno_blade: { name: 'Inferno Blade', emoji: '🔥', type: 'weapon', rarity: 'epic', description: 'Leaves a trail of scorching fire', stats: { atk: 90 }, craftRecipe: { inferno_gem: 1, fire_ember: 3, lava_scale: 2 } },
    shadow_katana: { name: 'Shadow Katana', emoji: '🌑', type: 'weapon', rarity: 'epic', description: 'Phases straight through armor', stats: { atk: 115 }, craftRecipe: { dark_steel: 2, shadow_shard: 3, void_essence: 1 } },
    nexus_blade: { name: 'Nexus Blade', emoji: '🌀', type: 'weapon', rarity: 'legendary', description: 'The absolute edge of reality', stats: { atk: 180 }, craftRecipe: { nexus_heart: 1, nexus_crystal: 2, cosmic_core: 1, reality_shard: 2 } },

    // Armor
    cloth_armor: { name: 'Cloth Armor', emoji: '👕', type: 'armor', rarity: 'common', description: 'Simple traveler tunic', stats: { def: 3, maxHp: 0 }, buyPrice: 0, sellPrice: 3 },
    leather_armor: { name: 'Leather Armor', emoji: '🦺', type: 'armor', rarity: 'common', description: 'Hardened leather padding', stats: { def: 9, maxHp: 25 }, buyPrice: 50, sellPrice: 25 },
    chain_mail: { name: 'Chain Mail', emoji: '⛓️', type: 'armor', rarity: 'uncommon', description: 'Flexible interlocking iron rings', stats: { def: 18, maxHp: 60 }, buyPrice: 140, sellPrice: 70 },
    plate_armor: { name: 'Plate Armor', emoji: '🛡️', type: 'armor', rarity: 'rare', description: 'Solid plate mail against heavy blows', stats: { def: 32, maxHp: 120 }, buyPrice: 380, sellPrice: 190 },
    hydra_mail: { name: 'Hydra Mail', emoji: '🐍', type: 'armor', rarity: 'rare', description: 'Regenerative woven hydra scales', stats: { def: 46, maxHp: 180 }, craftRecipe: { hydra_scale: 3, spider_silk: 5 } },
    frost_plate: { name: 'Frost Plate', emoji: '❄️', type: 'armor', rarity: 'epic', description: 'Freezes incoming strikes', stats: { def: 68, maxHp: 280 }, craftRecipe: { giant_bone: 2, ice_crystal: 3, frost_fur: 2 } },
    shadow_cloak: { name: 'Shadow Cloak', emoji: '🧥', type: 'armor', rarity: 'epic', description: 'Blurs the wearer into darkness', stats: { def: 88, maxHp: 360 }, craftRecipe: { emperor_cape: 1, nightmare_mane: 3, shadow_shard: 2 } },
    nexus_armor: { name: 'Nexus Armor', emoji: '💠', type: 'armor', rarity: 'legendary', description: 'Indestructible mantle woven from starlight', stats: { def: 135, maxHp: 600 }, craftRecipe: { celestial_ore: 3, star_scale: 2, divine_halo: 1, nexus_crystal: 1 } },

    // Accessories
    wooden_ring: { name: 'Wooden Ring', emoji: '💍', type: 'accessory', rarity: 'common', description: 'A polished lucky band', stats: { crit: 3 }, buyPrice: 30, sellPrice: 15 },
    silver_ring: { name: 'Silver Ring', emoji: '💍', type: 'accessory', rarity: 'uncommon', description: 'Pure silver talisman', stats: { crit: 6, atk: 6 }, buyPrice: 110, sellPrice: 55 },
    mystic_amulet: { name: 'Mystic Amulet', emoji: '📿', type: 'accessory', rarity: 'rare', description: 'Channels ambient astral energy', stats: { crit: 10, atk: 12, def: 6 }, buyPrice: 320, sellPrice: 160 },
    phoenix_charm: { name: 'Phoenix Charm', emoji: '🔥', type: 'accessory', rarity: 'epic', description: 'Radiates life force and ferocity', stats: { crit: 15, atk: 18, maxHp: 120 }, craftRecipe: { phoenix_feather: 2, fire_ember: 3 } },
    nexus_ring: { name: 'Nexus Ring', emoji: '🌀', type: 'accessory', rarity: 'legendary', description: 'Omnipotent cosmic artifact band', stats: { crit: 25, atk: 35, def: 25, maxHp: 250 }, craftRecipe: { nexus_heart: 1, angel_wing: 2, astral_dust: 3 } }
  };

  const SKILLS = [
    { id: 'power_strike', name: 'Power Strike', emoji: '💪', description: 'Deal 150% damage strike', levelReq: 3, mult: 1.5 },
    { id: 'shield_block', name: 'Shield Block', emoji: '🛡️', description: 'Block 50% damage from hostile hit', levelReq: 5, defType: true },
    { id: 'heal_light', name: 'Heal Light', emoji: '💚', description: 'Auto-heals 25% max HP when critical', levelReq: 8, healType: true },
    { id: 'fire_slash', name: 'Fire Slash', emoji: '🔥', description: 'Ignite foe for 200% fire damage', levelReq: 12, mult: 2.0 },
    { id: 'thunder_strike', name: 'Thunder Strike', emoji: '⚡', description: 'Electrocute foe for 250% lightning damage', levelReq: 18, mult: 2.5 },
    { id: 'mystic_shield', name: 'Mystic Shield', emoji: '🔮', description: 'Completely absorbs 1 lethal blow per battle', levelReq: 25, absorbType: true },
    { id: 'dragon_fury', name: 'Dragon Fury', emoji: '🐉', description: 'Release dragon roar for 350% devastation', levelReq: 35, mult: 3.5 },
    { id: 'celestial_strike', name: 'Celestial Strike', emoji: '⭐', description: 'Call falling star for 500% holy damage', levelReq: 50, mult: 5.0 },
    { id: 'nexus_blast', name: 'Nexus Blast', emoji: '🌀', description: 'Unleash singularity for 800% omni damage', levelReq: 70, mult: 8.0 }
  ];

  const SHOP_ITEMS = [
    'small_potion', 'medium_potion', 'large_potion', 'mega_potion',
    'power_elixir', 'shield_elixir',
    'iron_sword', 'steel_blade', 'enchanted_blade',
    'leather_armor', 'chain_mail', 'plate_armor',
    'wooden_ring', 'silver_ring', 'mystic_amulet'
  ];

  /* ============================================================
     GAME STATE
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
    gold: 60,
    currentArea: 'misty_forest',
    inventory: {
      small_potion: 3
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
      totalDamageDealt: 0,
      deaths: 0,
      goldEarned: 60
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
      heal: 0
    }
  };

  let state = JSON.parse(JSON.stringify(DEFAULT_STATE));
  let isDirty = false;
  let activeTab = 'login';

  /* ============================================================
     COMPUTED STATS & MATH FORMULAS
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
      crit: Math.min(65, Math.max(5, crit))
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
      state.baseAtk += 3;
      state.baseDef += 2;
      state.maxHp += 20;
      state.baseCrit = Math.min(30, state.baseCrit + 0.3);

      const computed = getComputedStats();
      state.hp = computed.maxHp; // full heal on level up
      leveled = true;

      addLog(`✨ <strong>LEVEL UP!</strong> You reached <strong>Level ${state.level}</strong>! Attributes surged and HP restored!`, 'levelup');

      // Check skill unlock
      SKILLS.forEach(s => {
        if (state.level >= s.levelReq && !state.skills.includes(s.id)) {
          state.skills.push(s.id);
          addLog(`⭐ <strong>New Skill Mastered:</strong> ${s.emoji} <strong>${s.name}</strong> (${s.description})!`, 'system');
        }
      });

      // Check new area unlock
      const availableAreas = AREAS.filter(a => state.level >= a.levelReq);
      const latestArea = availableAreas[availableAreas.length - 1];
      if (latestArea && latestArea.id !== state.currentArea) {
        state.currentArea = latestArea.id;
        addLog(`🗺️ <strong>New Frontier Unlocked!</strong> You entered <strong>${latestArea.emoji} ${latestArea.name}</strong>!`, 'system');
      }
    }

    if (leveled) {
      isDirty = true;
      updateUI();
      saveGame(true);
    }
  }

  function calculateDamage(attackerAtk, defenderDef, isCrit) {
    const effectiveDef = Math.max(0, defenderDef);
    const baseDmg = Math.max(2, attackerAtk - effectiveDef * 0.45);
    const variance = 0.85 + Math.random() * 0.3; // 85% - 115%
    let dmg = Math.floor(baseDmg * variance);
    if (isCrit) {
      dmg = Math.floor(dmg * 1.85);
    }
    return Math.max(1, dmg);
  }

  /* ============================================================
     UI & DOM UPDATES
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
    saveBtn: document.getElementById('save-btn'),
    logoutBtn: document.getElementById('logout-btn'),
    modal: document.getElementById('modal'),
    modalTitle: document.getElementById('modal-title'),
    modalBody: document.getElementById('modal-body'),
    modalClose: document.getElementById('modal-close'),
    toast: document.getElementById('toast')
  };

  function updateUI() {
    const stats = getComputedStats();

    // HP Bar clamp
    if (state.hp > stats.maxHp) state.hp = stats.maxHp;
    const hpPct = Math.max(0, Math.min(100, (state.hp / stats.maxHp) * 100));
    const xpPct = Math.max(0, Math.min(100, (state.xp / state.xpToNext) * 100));

    el.charName.textContent = state.characterName || 'Hero';
    el.charLevel.textContent = state.level;
    el.goldDisplay.textContent = Number(state.gold).toLocaleString();

    el.hpBar.style.width = `${hpPct}%`;
    el.hpText.textContent = `${Math.max(0, state.hp)} / ${stats.maxHp}`;

    el.xpBar.style.width = `${xpPct}%`;
    el.xpText.textContent = `${state.xp} / ${state.xpToNext}`;

    el.statAtk.textContent = stats.atk;
    el.statDef.textContent = stats.def;
    el.statCrit.textContent = `${stats.crit.toFixed(1)}%`;

    const currentAreaObj = AREAS.find(a => a.id === state.currentArea) || AREAS[0];
    el.statArea.textContent = `${currentAreaObj.emoji} ${currentAreaObj.name}`;

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

    // Keep log count tidy
    while (el.gameLog.children.length > 80) {
      el.gameLog.removeChild(el.gameLog.lastChild);
    }
  }

  function showToast(msg) {
    el.toast.textContent = msg;
    el.toast.classList.add('show');
    clearTimeout(el.toast._timer);
    el.toast._timer = setTimeout(() => {
      el.toast.classList.remove('show');
    }, 2400);
  }

  function checkCooldown(actionKey, ms) {
    const now = Date.now();
    const readyAt = state.cooldowns[actionKey] || 0;
    if (now < readyAt) {
      const waitSec = Math.ceil((readyAt - now) / 1000);
      showToast(`⏳ ${actionKey.toUpperCase()} on cooldown: wait ${waitSec}s`);
      return false;
    }
    state.cooldowns[actionKey] = now + ms;
    return true;
  }

  /* ============================================================
     COMBAT ENGINE
     ============================================================ */
  function executeBattle(monster, isBoss = false) {
    const pStats = getComputedStats();
    let mHp = monster.hp;
    let pHp = state.hp;
    let round = 1;
    let battleLog = [];
    let absorbedHit = false;

    // Check unlocked skills
    const unlocked = state.skills.map(id => SKILLS.find(s => s.id === id)).filter(Boolean);
    const offensiveSkills = unlocked.filter(s => s.mult);
    const hasShieldBlock = state.skills.includes('shield_block');
    const hasHealLight = state.skills.includes('heal_light');
    const hasMysticShield = state.skills.includes('mystic_shield');

    battleLog.push(`⚔️ <strong>ENCOUNTER:</strong> You face <strong>${monster.emoji} ${monster.name}</strong> [HP: ${monster.hp} | ATK: ${monster.atk} | DEF: ${monster.def}]`);

    while (mHp > 0 && pHp > 0 && round <= 12) {
      // --- PLAYER TURN ---
      let skillUsed = null;
      let dmgMult = 1.0;
      if (offensiveSkills.length > 0 && Math.random() < 0.35) {
        skillUsed = offensiveSkills[Math.floor(Math.random() * offensiveSkills.length)];
        dmgMult = skillUsed.mult;
      }

      const isCrit = Math.random() * 100 < pStats.crit;
      let rawDmg = calculateDamage(pStats.atk, monster.def, isCrit);
      let pDmg = Math.floor(rawDmg * dmgMult);

      mHp -= pDmg;
      state.stats.totalDamageDealt += pDmg;

      if (skillUsed) {
        battleLog.push(`✨ <strong>${skillUsed.emoji} ${skillUsed.name}!</strong> You unleash extreme power for <strong>${pDmg}</strong> DMG!`);
      } else if (isCrit) {
        battleLog.push(`💥 <strong>CRITICAL BLOW!</strong> You slash ${monster.name} for <strong>${pDmg}</strong> DMG!`);
      } else {
        battleLog.push(`🗡️ You strike ${monster.name} for <strong>${pDmg}</strong> DMG.`);
      }

      if (mHp <= 0) break;

      // Emergency Light Heal if low HP
      if (hasHealLight && pHp < pStats.maxHp * 0.3 && Math.random() < 0.6) {
        const healAmt = Math.floor(pStats.maxHp * 0.25);
        pHp = Math.min(pStats.maxHp, pHp + healAmt);
        battleLog.push(`💚 <strong>Heal Light</strong> kicks in! Restored <strong>+${healAmt} HP</strong>.`);
      }

      // --- MONSTER TURN ---
      let mDmg = calculateDamage(monster.atk, pStats.def, false);

      if (hasMysticShield && !absorbedHit && Math.random() < 0.45) {
        absorbedHit = true;
        mDmg = 0;
        battleLog.push(`🔮 <strong>Mystic Shield</strong> completely absorbed ${monster.name}'s attack!`);
      } else if (hasShieldBlock && Math.random() < 0.4) {
        mDmg = Math.floor(mDmg * 0.5);
        battleLog.push(`🛡️ <strong>Shield Block</strong> deflected half the blow! Took <strong>${mDmg}</strong> DMG.`);
      } else {
        battleLog.push(`🩸 ${monster.name} retaliates and inflicts <strong>${mDmg}</strong> DMG to you.`);
      }

      pHp -= mDmg;
      round++;
    }

    // Battle Outcomes
    state.hp = Math.max(0, pHp);

    if (state.buffs && state.buffs.battlesLeft > 0) {
      state.buffs.battlesLeft -= 1;
      if (state.buffs.battlesLeft === 0) {
        state.buffs.atkMultiplier = 1;
        state.buffs.defMultiplier = 1;
        addLog(`⌛ Power buffs have expired.`, 'system');
      }
    }

    if (mHp <= 0) {
      // Victory!
      const earnedGold = Math.floor(monster.gold * (1 + Math.random() * 0.25));
      const earnedXp = monster.xp;
      state.gold += earnedGold;
      state.xp += earnedXp;
      state.stats.goldEarned += earnedGold;

      if (isBoss) {
        state.stats.bossesKilled += 1;
      } else {
        state.stats.monstersKilled += 1;
      }

      battleLog.push(`🏆 <strong>VICTORY!</strong> You defeated ${monster.emoji} ${monster.name}!`);
      battleLog.push(`🎁 <strong>Rewards:</strong> +${earnedXp} XP, +${earnedGold} 💰 Gold.`);

      // Loot drops check
      if (monster.drops && monster.drops.length > 0) {
        monster.drops.forEach(drop => {
          if (Math.random() < drop.chance) {
            state.inventory[drop.id] = (state.inventory[drop.id] || 0) + 1;
            const item = ITEMS[drop.id];
            battleLog.push(`💎 <strong>Loot Found:</strong> ${item ? `${item.emoji} ${item.name}` : drop.id} x1!`);
          }
        });
      }

      addLog(battleLog.join('<br>'), isBoss ? 'victory' : 'combat');
      checkLevelUp();
      return true;
    } else {
      // Defeat
      state.stats.deaths += 1;
      battleLog.push(`💀 <strong>DEFEAT!</strong> You fell in battle against ${monster.name}. Visit ❤️ Heal to resurrect!`);
      addLog(battleLog.join('<br>'), 'danger');
      return false;
    }
  }

  /* ============================================================
     ACTION HANDLERS
     ============================================================ */
  function handleHunt() {
    if (!checkCooldown('hunt', 2000)) return;

    if (state.hp <= 0) {
      showToast('💀 You are dead! Use ❤️ Heal to recover first.');
      addLog('💀 You are unconscious! Visit the sanctuary via ❤️ Heal to restore health.', 'danger');
      return;
    }

    const areaMonsters = MONSTERS[state.currentArea] || MONSTERS.misty_forest;
    const monster = areaMonsters[Math.floor(Math.random() * areaMonsters.length)];

    executeBattle(monster, false);
    isDirty = true;
    updateUI();
  }

  function handleAdventure() {
    if (!checkCooldown('adventure', 5000)) return;

    if (state.hp <= 0) {
      showToast('💀 You are dead! Use ❤️ Heal to recover first.');
      return;
    }

    // Modal to choose area
    openModal('🗺️ Choose Adventure Destination', () => {
      const available = AREAS.filter(a => state.level >= a.levelReq);
      return `
        <p style="margin-bottom: 14px; color: var(--text-secondary)">Embark on a perilous multi-stage exploration for +50% bonus rewards!</p>
        <div class="shop-grid">
          ${available.map(a => `
            <div class="item-card">
              <div class="item-name">${a.emoji} ${a.name}</div>
              <div class="item-desc">${a.description}</div>
              <div class="item-stats">Requires Lv.${a.levelReq}</div>
              <button class="btn-primary" style="margin-top:10px;" onclick="window.NexusRPG.startAdventure('${a.id}')">Start Expedition</button>
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

    const areaMonsters = MONSTERS[areaId] || MONSTERS.misty_forest;
    const stages = 3;
    let allWon = true;

    addLog(`🚀 <strong>EXPEDITION STARTED:</strong> Exploring ${area.emoji} <strong>${area.name}</strong> (3 Stages)...`, 'system');

    for (let i = 1; i <= stages; i++) {
      if (state.hp <= 0) {
        allWon = false;
        break;
      }
      const m = areaMonsters[Math.floor(Math.random() * areaMonsters.length)];
      addLog(`📍 <strong>Stage ${i}/${stages}:</strong> Entering deep ruins...`, 'system');
      const won = executeBattle(m, false);
      if (!won) {
        allWon = false;
        break;
      }
      // slight recovery between stages
      const pStats = getComputedStats();
      const restHeal = Math.floor(pStats.maxHp * 0.15);
      state.hp = Math.min(pStats.maxHp, state.hp + restHeal);
    }

    if (allWon) {
      const bonusGold = Math.floor(area.levelReq * 35 + 50);
      const bonusXp = Math.floor(area.levelReq * 45 + 60);
      state.gold += bonusGold;
      state.xp += bonusXp;
      addLog(`🎉 <strong>EXPEDITION CONQUERED!</strong> Full exploration completed in ${area.name}! Bonus Loot: <strong>+${bonusXp} XP</strong>, <strong>+${bonusGold} 💰</strong>.`, 'victory');
      checkLevelUp();
    }

    isDirty = true;
    updateUI();
  }

  function handleDungeon() {
    if (!checkCooldown('dungeon', 10000)) return;

    if (state.hp <= 0) {
      showToast('💀 You are dead! Use ❤️ Heal to recover first.');
      return;
    }

    const boss = DUNGEON_BOSSES[state.currentArea];
    if (!boss) {
      showToast('No boss lair discovered in this realm.');
      return;
    }

    addLog(`🏰 <strong>DUNGEON LAIR BREACHED!</strong> Awakening the guardian: <strong>${boss.emoji} ${boss.name}</strong>!`, 'combat');
    executeBattle(boss, true);
    isDirty = true;
    updateUI();
  }

  function handleHeal() {
    if (!checkCooldown('heal', 2000)) return;
    const stats = getComputedStats();

    if (state.hp >= stats.maxHp) {
      showToast('✨ You are already at peak health!');
      return;
    }

    const isDead = state.hp <= 0;
    const cost = isDead ? (35 + state.level * 4) : Math.max(10, Math.floor((stats.maxHp - state.hp) * 0.4));

    if (state.gold < cost) {
      showToast(`❌ Not enough gold! Need ${cost} 💰`);
      return;
    }

    state.gold -= cost;
    state.hp = stats.maxHp;
    showToast(`❤️ Full HP restored! (-${cost} 💰)`);
    addLog(`❤️ <strong>Divine Sanctuary:</strong> Blessed light restores you to full <strong>${stats.maxHp}/${stats.maxHp} HP</strong>! Paid ${cost} 💰.`, 'heal');

    isDirty = true;
    updateUI();
  }

  /* ============================================================
     MODALS: INVENTORY, SHOP, CRAFT, SKILLS
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
    openModal('🎒 Hero Inventory', () => {
      const keys = Object.keys(state.inventory).filter(k => state.inventory[k] > 0);
      if (keys.length === 0) {
        return `<p style="text-align:center; color: var(--text-secondary); padding: 30px;">Your cosmic satchel is completely empty. Defeat monsters to gather loot!</p>`;
      }

      return `
        <div class="inventory-grid">
          ${keys.map(itemId => {
            const item = ITEMS[itemId];
            if (!item) return '';
            const qty = state.inventory[itemId];
            let actionBtn = '';

            if (item.type === 'consumable') {
              actionBtn = `<button class="btn-primary" onclick="window.NexusRPG.useItem('${itemId}')">Use Item</button>`;
            } else if (item.type === 'weapon' || item.type === 'armor' || item.type === 'accessory') {
              actionBtn = `<button class="btn-primary" onclick="window.NexusRPG.equipItem('${itemId}')">Equip</button>`;
            } else {
              actionBtn = `<button style="border-color:var(--accent-gold); color:var(--accent-gold)" onclick="window.NexusRPG.sellItem('${itemId}', 1)">Sell for ${item.sellPrice} 💰</button>`;
            }

            return `
              <div class="item-card item-rarity-${item.rarity}">
                <div class="item-name">${item.emoji} ${item.name} <span style="font-size:12px; opacity:0.8;">(x${qty})</span></div>
                <div class="item-desc">${item.description}</div>
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
      showToast(`Restored +${item.effect.value} HP!`);
      addLog(`🧪 Used <strong>${item.name}</strong>: Restored <strong>+${item.effect.value} HP</strong>.`, 'heal');
    } else if (item.effect.type === 'heal_full') {
      state.hp = pStats.maxHp;
      showToast(`Full health restored!`);
      addLog(`🧪 Used <strong>${item.name}</strong>: Fully revitalized to max HP!`, 'heal');
    } else if (item.effect.type === 'buff_atk') {
      state.buffs.atkMultiplier = item.effect.value;
      state.buffs.battlesLeft = item.effect.battles || 3;
      showToast(`+50% ATK boosted for 3 battles!`);
      addLog(`⚗️ Drank <strong>${item.name}</strong>: Surging with +50% ATK for 3 battles!`, 'system');
    } else if (item.effect.type === 'buff_def') {
      state.buffs.defMultiplier = item.effect.value;
      state.buffs.battlesLeft = item.effect.battles || 3;
      showToast(`+50% DEF boosted for 3 battles!`);
      addLog(`⚗️ Drank <strong>${item.name}</strong>: Fortified with +50% DEF for 3 battles!`, 'system');
    }

    isDirty = true;
    updateUI();
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
    showToast(`Equipped ${item.name}!`);
    addLog(`🛡️ Equipped <strong>${item.emoji} ${item.name}</strong> into your active loadout.`, 'system');

    isDirty = true;
    updateUI();
    showInventory();
  }

  function sellItem(itemId, count = 1) {
    const item = ITEMS[itemId];
    if (!item || !state.inventory[itemId] || state.inventory[itemId] < count) return;

    state.inventory[itemId] -= count;
    if (state.inventory[itemId] <= 0) delete state.inventory[itemId];

    const gain = (item.sellPrice || 5) * count;
    state.gold += gain;
    showToast(`Sold for +${gain} 💰`);
    addLog(`💰 Sold ${item.emoji} ${item.name} for <strong>+${gain} 💰</strong>.`, 'loot');

    isDirty = true;
    updateUI();
    showInventory();
  }

  function showShop() {
    openModal('🛒 Cosmic Merchant', () => {
      return `
        <div class="shop-grid">
          ${SHOP_ITEMS.map(id => {
            const item = ITEMS[id];
            if (!item) return '';
            const canAfford = state.gold >= item.buyPrice;
            return `
              <div class="item-card item-rarity-${item.rarity}">
                <div class="item-name">${item.emoji} ${item.name}</div>
                <div class="item-desc">${item.description}</div>
                ${item.stats ? `<div class="item-stats">${formatStats(item.stats)}</div>` : ''}
                <div class="item-price">💰 ${item.buyPrice} Gold</div>
                <button ${canAfford ? '' : 'disabled'} class="btn-primary" onclick="window.NexusRPG.buyItem('${id}')">
                  ${canAfford ? 'Purchase' : 'Need more Gold'}
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
      showToast('❌ Insufficient funds!');
      return;
    }

    state.gold -= item.buyPrice;
    state.inventory[itemId] = (state.inventory[itemId] || 0) + 1;
    showToast(`Purchased ${item.name}!`);
    addLog(`🛒 Bought <strong>${item.emoji} ${item.name}</strong> for ${item.buyPrice} 💰.`, 'system');

    isDirty = true;
    updateUI();
    showShop();
  }

  function showCraft() {
    openModal('🔨 Mystic Forge', () => {
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
              <div class="item-card item-rarity-${item.rarity}">
                <div class="item-name">${item.emoji} ${item.name}</div>
                <div class="item-desc">${item.description}</div>
                <div class="item-stats">${formatStats(item.stats)}</div>
                <div style="font-size:12px; margin: 8px 0; background:rgba(0,0,0,0.3); padding:6px; border-radius:6px;">
                  ${ingredientsHtml}
                </div>
                <button ${canCraft ? '' : 'disabled'} class="btn-primary" onclick="window.NexusRPG.craftItem('${k}')">
                  ${canCraft ? '🔨 Forge Artifact' : 'Missing Materials'}
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

    // Verify
    for (const matId of Object.keys(item.craftRecipe)) {
      const needed = item.craftRecipe[matId];
      if ((state.inventory[matId] || 0) < needed) {
        showToast('Missing required materials!');
        return;
      }
    }

    // Deduct
    for (const matId of Object.keys(item.craftRecipe)) {
      state.inventory[matId] -= item.craftRecipe[matId];
      if (state.inventory[matId] <= 0) delete state.inventory[matId];
    }

    state.inventory[itemId] = (state.inventory[itemId] || 0) + 1;
    showToast(`✨ Forged ${item.name}!`);
    addLog(`🔨 <strong>FORGED:</strong> You hammered cosmic energy into <strong>${item.emoji} ${item.name}</strong>!`, 'victory');

    isDirty = true;
    updateUI();
    showCraft();
  }

  function showSkills() {
    openModal('⭐ Stellar Skills', () => {
      return `
        <div class="skill-grid">
          ${SKILLS.map(s => {
            const unlocked = state.level >= s.levelReq;
            return `
              <div class="item-card" style="opacity: ${unlocked ? 1 : 0.5}; border-color: ${unlocked ? 'var(--accent-purple)' : 'rgba(255,255,255,0.1)'}">
                <div class="item-name">${s.emoji} ${s.name} ${unlocked ? '✅' : '🔒'}</div>
                <div class="item-desc">${s.description}</div>
                <div class="item-stats" style="color: ${unlocked ? 'var(--accent-cyan)' : 'var(--accent-red)'}">
                  ${unlocked ? 'Mastered & Active in Battle' : `Unlocks at Level ${s.levelReq}`}
                </div>
              </div>
            `;
          }).join('')}
        </div>
      `;
    });
  }

  /* ============================================================
     CLOUD SAVE & AUTH APIS
     ============================================================ */
  async function saveGame(silent = false) {
    try {
      const res = await fetch('/api/save', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ gameState: state })
      });
      const data = await res.json();
      if (data.success) {
        isDirty = false;
        if (!silent) showToast('💾 Cloud Save Synced!');
      }
    } catch (err) {
      console.error('Failed to save game:', err);
    }
  }

  async function loadGame() {
    try {
      const res = await fetch('/api/load');
      const data = await res.json();
      if (data.success && data.gameState) {
        state = Object.assign(JSON.parse(JSON.stringify(DEFAULT_STATE)), data.gameState);
      }
      updateUI();
    } catch (err) {
      console.error('Failed to load save:', err);
    }
  }

  async function checkSession() {
    try {
      const res = await fetch('/api/session');
      const data = await res.json();
      if (data.loggedIn) {
        await loadGame();
        el.authScreen.style.display = 'none';
        el.gameScreen.style.display = 'flex';
        addLog(`🌌 Welcome back to the Nexus, <strong>${state.characterName || data.username}</strong>!`, 'system');
      } else {
        el.authScreen.style.display = 'flex';
        el.gameScreen.style.display = 'none';
      }
    } catch (err) {
      el.authScreen.style.display = 'flex';
      el.gameScreen.style.display = 'none';
    }
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
        await loadGame();
        el.authScreen.style.display = 'none';
        el.gameScreen.style.display = 'flex';
        addLog(`⚔️ Connected to Nexus realm as <strong>${state.characterName || u}</strong>.`, 'system');
      } else {
        el.loginError.textContent = data.error || 'Login failed';
      }
    } catch (err) {
      el.loginError.textContent = 'Network or server error';
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
        state = JSON.parse(JSON.stringify(DEFAULT_STATE));
        state.characterName = charName;
        await saveGame(true);
        el.authScreen.style.display = 'none';
        el.gameScreen.style.display = 'flex';
        updateUI();
        addLog(`✨ Welcome Hero <strong>${charName}</strong>! Your adventure begins in the Misty Forest.`, 'system');
      } else {
        el.registerError.textContent = data.error || 'Registration failed';
      }
    } catch (err) {
      el.registerError.textContent = 'Network or server error';
    }
  }

  async function handleLogout() {
    try {
      await saveGame(true);
      await fetch('/api/logout', { method: 'POST' });
      location.reload();
    } catch (err) {
      location.reload();
    }
  }

  /* ============================================================
     BACKGROUND PARTICLE CANVAS
     ============================================================ */
  function initParticles() {
    const canvas = document.createElement('canvas');
    const container = document.getElementById('particles');
    if (!container) return;
    container.appendChild(canvas);
    const ctx = canvas.getContext('2d');

    let w = (canvas.width = window.innerWidth);
    let h = (canvas.height = window.innerHeight);

    window.addEventListener('resize', () => {
      w = canvas.width = window.innerWidth;
      h = canvas.height = window.innerHeight;
    });

    const particles = [];
    const colors = ['#00ffcc', '#aa44ff', '#ffcc00', '#44aaff'];

    for (let i = 0; i < 50; i++) {
      particles.push({
        x: Math.random() * w,
        y: Math.random() * h,
        radius: Math.random() * 2 + 1,
        color: colors[Math.floor(Math.random() * colors.length)],
        vx: (Math.random() - 0.5) * 0.4,
        vy: -Math.random() * 0.6 - 0.2,
        alpha: Math.random() * 0.6 + 0.2
      });
    }

    function render() {
      ctx.clearRect(0, 0, w, h);
      for (const p of particles) {
        p.x += p.vx;
        p.y += p.vy;

        if (p.y < 0) {
          p.y = h;
          p.x = Math.random() * w;
        }
        if (p.x < 0) p.x = w;
        if (p.x > w) p.x = 0;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.globalAlpha = p.alpha;
        ctx.shadowBlur = 8;
        ctx.shadowColor = p.color;
        ctx.fill();
      }
      ctx.globalAlpha = 1;
      ctx.shadowBlur = 0;
      requestAnimationFrame(render);
    }
    render();
  }

  /* ============================================================
     EVENT LISTENERS & BINDINGS
     ============================================================ */
  function setupEvents() {
    // Tabs
    el.tabs.forEach(tab => {
      tab.addEventListener('click', () => {
        el.tabs.forEach(t => t.classList.remove('active'));
        tab.classList.add('active');
        activeTab = tab.dataset.tab;
        if (activeTab === 'login') {
          el.loginForm.style.display = 'block';
          el.registerForm.style.display = 'none';
        } else {
          el.loginForm.style.display = 'none';
          el.registerForm.style.display = 'block';
        }
      });
    });

    // Forms
    el.loginForm.addEventListener('submit', handleLogin);
    el.registerForm.addEventListener('submit', handleRegister);

    // Save & Logout
    el.saveBtn.addEventListener('click', () => saveGame(false));
    el.logoutBtn.addEventListener('click', handleLogout);

    // Modal close
    el.modalClose.addEventListener('click', closeModal);
    el.modal.querySelector('.modal-overlay').addEventListener('click', closeModal);

    // Action buttons
    document.querySelectorAll('.action-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const action = btn.dataset.action;
        switch (action) {
          case 'hunt': handleHunt(); break;
          case 'adventure': handleAdventure(); break;
          case 'dungeon': handleDungeon(); break;
          case 'heal': handleHeal(); break;
          case 'inventory': showInventory(); break;
          case 'shop': showShop(); break;
          case 'craft': showCraft(); break;
          case 'skills': showSkills(); break;
        }
      });
    });

    // Auto save periodic timer (every 45s if dirty)
    setInterval(() => {
      if (isDirty) saveGame(true);
    }, 45000);
  }

  // Expose global methods for modal onclick events
  window.NexusRPG = {
    startAdventure,
    useItem,
    equipItem,
    sellItem,
    buyItem,
    craftItem
  };

  // Init
  document.addEventListener('DOMContentLoaded', () => {
    initParticles();
    setupEvents();
    checkSession();
  });

})();
