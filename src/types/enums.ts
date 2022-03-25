export enum STATUSES {
    OPEN = 'פתוח',
    IN_PROGRESS = 'בעבודה',
    TESTING = 'ממתין לבדיקה',
    CLOSED = 'סגור',
  }

export enum ASSIGNEES {
    AMLH = 'אמלח',
    LZD = 'לצד',
    MNT = 'מנט',
    INT = 'אינטגרציה',
    MAAV = 'מאב',
  }

export enum SEVERITIES {
    VERY_SERIOUS = 'חמור מאוד (1)',
    SERIOUS = 'חמור (2)',
    MEDIUM = 'בינוני (3)',
    SLIGHT = 'קל (99)',
  }

export enum PLATFORMS {
    BAZ = 'בז',
    RAAM = 'רעם'
  }

export enum BLOCKS {
    D = 'ד',
    E = 'ה',
    F = 'ו',
    G = 'ז'
  }

export enum RESOURCES {
    STF = 'STF',
    AIF = 'AIF',
    UWI_MODEL = 'מודל UWI',
    ASB_MODEL = 'מודל ASB',
    REAL_WEAPON = 'חימוש אמיתי',
  }

export enum COMPUTERS {
    AAA = 'AAA',
    BBB = 'BBB',
    CCC = 'CCC',
    DDD = 'DDD',
  }

export enum EVENT_TYPES {
    REG_FLIGHT = 'גיחת טייסת',
    MANAT_FLIGHT = 'גיחת מנט',
    INT_TEST = 'בדיקת אינטגרציה',
    DEV_TEST = 'בדיקת פיתוח',
  }

export enum WEAPONS {
    NONE = 'ללא',
    AA = 'AA',
    BB = 'BB',
    CC = 'CC',
    DD = 'DD',
    SS = 'SS',
    PP = 'PP',
  }

export enum STATIONS {
    '8R' = '8R',
    STA8 = '8',
    '8L' = '8L',
    RCFT = 'RCFT',
    STA5 = '5',
    LCFT = 'LCFT',
    '2R' = '2R',
    STA2 = '2',
    '2L' = '2L',
  }
