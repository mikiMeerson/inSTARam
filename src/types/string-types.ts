export type userRole = 'viewer' | 'editor' | 'admin';

export type orderType = 'desc' | 'asc';

export type mainComponents = 'stars' | 'events' | 'users' | 'home';

export const RAAM_STATIONS = [
  '8R', '8', '8L', 'RCFT', '5', 'LCFT', '2R', '2', '2L',
];
export type RaamStations= typeof RAAM_STATIONS[number];

export const BAZ_STATIONS = ['1', '2', '3', '4', '5', '6'];
export type BazStations= typeof BAZ_STATIONS[number];

export const RAAM_COMPUTERS = ['AAA', 'BBB', 'CCC', 'DDD'];
export type RaamComputers = typeof RAAM_COMPUTERS[number];

export const BAZ_COMPUTERS = ['EEE', 'FFF', 'GGG'];
export type BazComputers = typeof RAAM_COMPUTERS[number];
