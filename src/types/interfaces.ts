import {
  ASSIGNEES,
  BLOCKS,
  EVENT_TYPES,
  PLATFORMS,
  SEVERITIES,
  STATUSES,
  WEAPONS,
} from './enums';
import {
  userRole,
  RaamStations,
  BazStations,
  RaamComputers,
  BazComputers,
} from './string-types';

export interface weaponConfig {
  sta: RaamStations | BazStations;
  weapon: WEAPONS;
}

export interface versionConfig {
  comp: RaamComputers | BazComputers;
  version: string;
}

export interface INote {
    _id: string;
    note: string;
    publisher: string;
    repliesTo?: string;
    createdAt?: string;
    updatedAt?: string;
}

export interface IActivity {
    _id: string;
    publisher: string;
    action: string;
    value?: string;
    createdAt?: string;
    updatedAt?: string;
}

export interface IStar {
  _id: string;
  priority: number;
  severity: SEVERITIES;
  name: string;
  status: STATUSES;
  assignee: ASSIGNEES;
  platform: PLATFORMS;
  block: BLOCKS;
  publisher: string;
  resources: string[];
  desc: string;
  computer: string;
  notes: INote[];
  activity: IActivity[];
  event?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface IUser {
  _id: string;
  username: string;
  password: string;
  name: string;
  unit: string;
  role: userRole;
  watchList?: string[];
  createdAt?: string;
  updatedAt?: string;
}

export interface IEvent {
  _id: string;
  name: string;
  publisher: string;
  type: EVENT_TYPES;
  assignee?: string;
  block: BLOCKS;
  platform: PLATFORMS;
  dates: Date[];
  reason?: string;
  team?: string;
  callSign?: string;
  areas?: string;
  duration?: string;
  generalSummary?: string[];
  goals?: string[];
  dataSources?: string[];
  configuration: {
    weapons: weaponConfig[];
    versions: versionConfig[];
  };
  description?: string[];
  findings?: string[];
  notes?: string[];
  conclusions?: string[];
}

export type IAlert = {
  isAlert: boolean
  content: string
  severity: 'success' | 'info' | 'warning' | 'error'
}

export const defaultRAAMEvent: IEvent = {
  _id: '0',
  name: '',
  assignee: '',
  block: BLOCKS.F,
  platform: PLATFORMS.RAAM,
  dates: [],
  publisher: '',
  type: EVENT_TYPES.REG_FLIGHT,
  areas: '',
  callSign: '',
  conclusions: [],
  configuration: {
    weapons: [
      {
        sta: '2L',
        weapon: WEAPONS.NONE,
      },
      {
        sta: '2',
        weapon: WEAPONS.NONE,
      },
      {
        sta: '2R',
        weapon: WEAPONS.NONE,
      },
      {
        sta: 'LCFT',
        weapon: WEAPONS.NONE,
      },
      {
        sta: '5',
        weapon: WEAPONS.NONE,
      },
      {
        sta: 'RCFT',
        weapon: WEAPONS.NONE,
      },
      {
        sta: '8L',
        weapon: WEAPONS.NONE,
      },
      {
        sta: '8',
        weapon: WEAPONS.NONE,
      },
      {
        sta: '8R',
        weapon: WEAPONS.NONE,
      },
    ],
    versions: [
      {
        comp: 'AAA',
        version: 'ללא',
      },
      {
        comp: 'BBB',
        version: 'ללא',
      },
      {
        comp: 'CCC',
        version: 'ללא',
      },
      {
        comp: 'DDD',
        version: 'ללא',
      },
    ],
  },
  dataSources: [],
  description: [],
  duration: '',
  findings: [],
  generalSummary: [],
  goals: [],
  notes: [],
  reason: '',
  team: '',
};

export const defaultBAZEvent: IEvent = {
  _id: '0',
  name: '',
  assignee: '',
  block: BLOCKS.D,
  platform: PLATFORMS.BAZ,
  dates: [],
  publisher: '',
  type: EVENT_TYPES.REG_FLIGHT,
  areas: '',
  callSign: '',
  conclusions: [],
  configuration: {
    weapons: [
      {
        sta: '1',
        weapon: WEAPONS.NONE,
      },
      {
        sta: '2',
        weapon: WEAPONS.NONE,
      },
      {
        sta: '3',
        weapon: WEAPONS.NONE,
      },
      {
        sta: '4',
        weapon: WEAPONS.NONE,
      },
      {
        sta: '5',
        weapon: WEAPONS.NONE,
      },
      {
        sta: '6',
        weapon: WEAPONS.NONE,
      },
    ],
    versions: [
      {
        comp: 'EEE',
        version: 'ללא',
      },
      {
        comp: 'FFF',
        version: 'ללא',
      },
      {
        comp: 'GGG',
        version: 'ללא',
      },
    ],
  },
  dataSources: [],
  description: [],
  duration: '',
  findings: [],
  generalSummary: [],
  goals: [],
  notes: [],
  reason: '',
  team: '',
};
