import {
  ASSIGNEES,
  BLOCKS,
  EVENT_TYPES,
  PLATFORMS,
  SEVERITIES,
  STATIONS,
  STATUSES,
  WEAPONS,
} from './enums';
import { userRole } from './string-types';

export interface weaponConfig {
  sta: STATIONS;
  weapon: WEAPONS;
}

export interface versionConfig {
  comp: string;
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
  event: string;
  resources: string[];
  desc: string;
  computer: string;
  notes: INote[];
  activity: IActivity[];
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
  assignee: string;
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

export const defaultEvent: IEvent = {
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
        sta: STATIONS['2L'],
        weapon: WEAPONS.NONE,
      },
      {
        sta: STATIONS.STA2,
        weapon: WEAPONS.NONE,
      },
      {
        sta: STATIONS['2R'],
        weapon: WEAPONS.NONE,
      },
      {
        sta: STATIONS.LCFT,
        weapon: WEAPONS.NONE,
      },
      {
        sta: STATIONS.STA5,
        weapon: WEAPONS.NONE,
      },
      {
        sta: STATIONS.RCFT,
        weapon: WEAPONS.NONE,
      },
      {
        sta: STATIONS['8L'],
        weapon: WEAPONS.NONE,
      },
      {
        sta: STATIONS.STA8,
        weapon: WEAPONS.NONE,
      },
      {
        sta: STATIONS['8R'],
        weapon: WEAPONS.NONE,
      },
    ],
    versions: [
      {
        comp: 'AAA',
        version: '',
      },
      {
        comp: 'BBB',
        version: '',
      },
      {
        comp: 'CCC',
        version: '',
      },
      {
        comp: 'DDD',
        version: '',
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
