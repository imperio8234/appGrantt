export interface LinkData {
    id: number;
    source: string;
    target: string;
    type: string;
  }
export interface Task {
    entityType: "task" | "link";
    action: "create" | "update" | "delete";
    id: string | number;
    item?: TaskData | LinkData
}
export interface TaskSave {
        data: TaskSave;
    
        id: string | number;
        text: string;
        start_date: string;
        duration: number;
        progress: number;
        end_date?: string;
        parent?: number;    
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