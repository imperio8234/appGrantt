
export interface Task {
    entityType: "task" | "link";
    action: "create" | "update" | "delete";
    id: string | number;
    item?: TaskData | LinkData
}



export interface LinkData {
  id:  string |number;
  source?: string;
  target?: string;
  type?: string;
}

export interface TaskSave {
  data: Task[];
  links: LinkData[];
}


export interface UserResponse {
  name: string;
  token: string;
  idUser: string;
}

export interface user {
  name: string;
  password: string;
}


export interface taskgantt {
  id: string;
  action: string;
  entityType:string;
  item:TaskData;
}
export interface TaskData {
  nativeeditor_status: string;
  $calculate_duration: boolean;
  $dataprocessor_class: string;
  $effective_calendar: string;
  $expanded_branch: boolean;
  $index: number;
  $level: number;
  $local_index: number;
  $no_end: boolean;
  $no_start: boolean;
  $open: boolean;
  $rendered_parent: number;
  $rendered_type: string;
  $resourceAssignments: any[];
  $source: any[];
  $target: any[];
  duration: number;
  end_date: Date;
  id: string | number;
  parent: number;
  progress: number;
  start_date: Date;
  text: string;
  source?: string;
  target?:string;
  type?: string;

  user?: {
    idUser?: string;
  };
  tasks?: {
    id?: string | number;
  };
  tasks2?: {
    id?: string | number;
  };
}
