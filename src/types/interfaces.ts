import {
  UserRole,
  RaamStationType,
  BazStationType,
  RaamComputerType,
  BazComputerType,
  StatusType,
  AssigneeType,
  WeaponType,
  SeverityType,
  PlatformType,
  BlockType,
  EventTypeType,
  PhaseType,
} from './string-types';

export interface WeaponConfig {
  sta: RaamStationType | BazStationType;
  weapon: WeaponType;
}

export interface VersionConfig {
  comp: RaamComputerType | BazComputerType;
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
  severity: SeverityType;
  name: string;
  status: StatusType;
  assignee: AssigneeType;
  platform: PlatformType;
  block: BlockType;
  phase: PhaseType;
  publisher: string;
  contact: string;
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
  role: UserRole;
  watchList?: string[];
  createdAt?: string;
  updatedAt?: string;
}

export interface IEvent {
  _id: string;
  name: string;
  publisher: string;
  type: EventTypeType;
  assignee?: string;
  block: BlockType;
  platform: PlatformType;
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
    weapons: WeaponConfig[];
    versions: VersionConfig[];
  };
  description?: string[];
  findings?: string[];
  notes?: string[];
  conclusions?: string[];
}

export interface IAlert {
  isAlert: boolean;
  content: string;
  severity: 'success' | 'info' | 'warning' | 'error';
}

export const defaultRAAMEvent: IEvent = {
  _id: '0',
  name: '',
  assignee: '',
  block: 'ו',
  platform: 'רעם',
  dates: [],
  publisher: '',
  type: 'גיחת טייסת',
  areas: '',
  callSign: '',
  conclusions: [],
  configuration: {
    weapons: [
      {
        sta: '2L',
        weapon: 'ללא',
      },
      {
        sta: '2',
        weapon: 'ללא',
      },
      {
        sta: '2R',
        weapon: 'ללא',
      },
      {
        sta: 'LCFT',
        weapon: 'ללא',
      },
      {
        sta: '5',
        weapon: 'ללא',
      },
      {
        sta: 'RCFT',
        weapon: 'ללא',
      },
      {
        sta: '8L',
        weapon: 'ללא',
      },
      {
        sta: '8',
        weapon: 'ללא',
      },
      {
        sta: '8R',
        weapon: 'ללא',
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
  block: 'ו',
  platform: 'בז',
  dates: [],
  publisher: '',
  type: 'גיחת טייסת',
  areas: '',
  callSign: '',
  conclusions: [],
  configuration: {
    weapons: [
      {
        sta: '1',
        weapon: 'ללא',
      },
      {
        sta: '2',
        weapon: 'ללא',
      },
      {
        sta: '3',
        weapon: 'ללא',
      },
      {
        sta: '4',
        weapon: 'ללא',
      },
      {
        sta: '5',
        weapon: 'ללא',
      },
      {
        sta: '6',
        weapon: 'ללא',
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
