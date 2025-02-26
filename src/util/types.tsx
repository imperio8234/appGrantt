export interface LinkData {
    id: number;
    source: string;
    target: string;
    type: string;
    nativeeditor_status: string;
  }
export interface Task {
    entityType: "task" | "link";
    action: "create" | "update" | "delete";
    id: string | number;
    item?: TaskSave | LinkData
}
export interface TaskSave {
    
        id: string | number;
        text: string;
        start_date: string;
        duration: number;
        progress: number;
        end_date?: string;
        parent?: number;
        nativeeditor_status?: string;
    
}


  