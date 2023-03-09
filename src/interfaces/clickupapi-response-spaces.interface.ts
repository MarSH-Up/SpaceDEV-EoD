export interface Welcome {
  spaces?: Space[];
}

export interface Space {
  tasks: any;
  folders: any;
  spaces: any;
  user: any;
  id?: string;
  name?: string;
  color?: null | string;
  private?: boolean;
  avatar?: null | string;
  adminCanManage?: boolean | null;
  statuses?: Status[];
  multipleAssignees?: boolean;
  features?: Features;
  archived?: boolean;
  members?: Member[];
}

export interface Features {
  dueDates?: DueDates;
  sprints?: CustomFields;
  points?: CustomFields;
  customItems?: CustomFields;
  checkUnresolved?: CheckUnresolved;
  zoom?: CustomFields;
  milestones?: CustomFields;
  remapDependencies?: CustomFields;
  emails?: CustomFields;
  timeTracking?: TimeTracking;
  priorities?: Priorities;
  tags?: CustomFields;
  customFields?: CustomFields;
  dependencyWarning?: CustomFields;
  multipleAssignees?: CustomFields;
  timeEstimates?: TimeEstimates;
  wipLimits?: CustomFields;
}

export interface CheckUnresolved {
  enabled?: boolean;
  subtasks?: boolean | null;
  checklists?: boolean | null;
  comments?: boolean | null;
}

export interface CustomFields {
  enabled?: boolean;
}

export interface DueDates {
  enabled?: boolean;
  startDate?: boolean;
  remapDueDates?: boolean;
  remapClosedDueDate?: boolean;
}

export interface Priorities {
  enabled?: boolean;
  priorities?: PriorityElement[];
}

export interface PriorityElement {
  color?: Color;
  id?: string;
  orderindex?: string;
  priority?: PriorityEnum;
}

export enum Color {
  D8D8D8 = "#d8d8d8",
  F50000 = "#f50000",
  Ffcc00 = "#ffcc00",
  The6Fddff = "#6fddff",
}

export enum PriorityEnum {
  High = "high",
  Low = "low",
  Normal = "normal",
  Urgent = "urgent",
}

export interface TimeEstimates {
  enabled?: boolean;
  rollup?: boolean;
  perAssignee?: boolean;
}

export interface TimeTracking {
  enabled?: boolean;
  harvest?: boolean;
  rollup?: boolean;
}

export interface Member {
  user?: User;
}

export interface User {
  id?: number;
  username?: string;
  color?: string;
  profilePicture?: null | string;
  initials?: string;
}

export interface Status {
  id?: string;
  status?: string;
  type?: Type;
  orderindex?: number;
  color?: string;
}

export enum Type {
  Closed = "closed",
  Custom = "custom",
  Done = "done",
  Open = "open",
}
