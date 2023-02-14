export interface Clickupapi {
    tasks?: ClickUpApiTaskResponse[];
}

export interface ClickUpApiTaskResponse {
    tasks?:           any;
    id?:              string;
    customID?:        null;
    name?:            string;
    textContent?:     null | string;
    description?:     null | string;
    status?:          Status;
    orderindex?:      string;
    dateCreated?:     string;
    dateUpdated?:     string;
    dateClosed?:      null;
    dateDone?:        null | string;
    archived?:        boolean;
    creator?:         Creator;
    assignees?:       Creator[];
    watchers?:        any[];
    checklists?:      any[];
    tags?:            Tag[];
    parent?:          null;
    priority?:        Priority | null;
    dueDate?:         null | string;
    startDate?:       null;
    points?:          null;
    timeEstimate?:    null;
    customFields?:    any[];
    dependencies?:    any[];
    linkedTasks?:     any[];
    teamID?:          string;
    url?:             string;
    permissionLevel?: string;
    list?:            Folder;
    project?:         Folder;
    folder?:          Folder;
    space?:           Space;
}

export interface Creator {
    id?:             number;
    username?:       Username;
    color?:          Color;
    initials?:       string;
    email?:          Email;
    profilePicture?: null;
}

export enum Color {
    The388D3C = "#388d3c",
}

export enum Email {
    MdelossantosSpacedevIo = "mdelossantos@spacedev.io",
}

export enum Username {
    MarioDeLosSantos = "Mario De Los Santos",
}

export interface Folder {
    id?:     string;
    name?:   Name;
    hidden?: boolean;
    access?: boolean;
}

export enum Name {
    Hidden = "hidden",
    TravelingInSpace = "Traveling in Space",
}

export interface Priority {
    color?:      string;
    id?:         string;
    orderindex?: string;
    priority?:   string;
}

export interface Space {
    id?: string;
}

export interface Status {
    status?:     string;
    color?:      string;
    type?:       string;
    orderindex?: number;
}

export interface Tag {
    name?:    string;
    tagFg?:   string;
    tagBg?:   string;
    creator?: number;
}
