export type UserRole = 'viewer' | 'editor' | 'admin';

export type OrderType = 'desc' | 'asc';

export type MainComponents = 'stars' | 'events' | 'users' | 'home';

export const RAAM_STATIONS = [
  '8R', '8', '8L', 'RCFT', '5', 'LCFT', '2R', '2', '2L',
];
export type RaamStationType= typeof RAAM_STATIONS[number];

export const BAZ_STATIONS = ['1', '2', '3', '4', '5', '6'];
export type BazStationType= typeof BAZ_STATIONS[number];

export const RAAM_COMPUTERS = ['AAA', 'BBB', 'CCC', 'DDD'];
export type RaamComputerType = typeof RAAM_COMPUTERS[number];

export const BAZ_COMPUTERS = ['EEE', 'FFF', 'GGG'];
export type BazComputerType = typeof RAAM_COMPUTERS[number];

export const STATUSES = ['פתוח', 'בעבודה', 'ממתין לבדיקה', 'סגור'];
export type StatusType = typeof STATUSES[number];

export const ASSIGNEES = ['אינטגרציה', 'אמלח', 'לצד', 'מנט', 'מאב', 'תעשייה'];
export type AssigneeType = typeof ASSIGNEES[number];

export const SEVERITIES = [
  'חמור מאוד (1)',
  'חמור (2)',
  'בינוני (3)',
  'קל (4)',
  'במעקב (99)',
];
export type SeverityType = typeof SEVERITIES[number];

export const PLATFORMS = ['בז', 'רעם'];
export type PlatformType = typeof PLATFORMS[number];

export const BLOCKS = ['ד', 'ה', 'ו', 'ז'];
export type BlockType = typeof BLOCKS[number];

export const RESOURCES = ['STF', 'AIF', 'מודל UWI', 'מודל ASB', 'חימוש אמיתי'];
export type ResourceType = typeof RESOURCES[number];

export const EVENT_TYPES = [
  'גיחת טייסת',
  'גיחת מנט',
  'בדיקת אינטגרציה',
  'בדיקת פיתוח',
];
export type EventTypeType = typeof EVENT_TYPES[number];

export const WEAPONS = ['ללא', 'AA', 'BB', 'CC', 'DD', 'SS', 'PP'];
export type WeaponType = typeof WEAPONS[number];
