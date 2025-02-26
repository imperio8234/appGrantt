import { useEffect, useState } from 'react'
import './App.css'
import Gantt from './components/gantt/gantt'
import Toolbar from './components/gantt/Toolbar'
import { LinkData, Task, TaskSave } from './util/types'

/*const tasks = {
  data: [
    { id: 1, text: "Task #1", start_date: "2025-02-25", duration: 3, progress: 0.6 },
    { id: 2, text: "Task #2", start_date: "2025-02-27", duration: 2, progress: 0.4 }
  ],
  
};*/

export type zoomType = "Days" | "Hours" | 'Months';

function App() {

  const [stateZoom, setStateZoom] = useState<zoomType>("Days");
  const [tasksItems, setTasksItems] = useState<{
    data: TaskSave[],
    links: LinkData[];
  }>({
    data: [],
    links: []
  });
    
  console.log(tasksItems)
  useEffect(() =>{
   // console.log(tasksItems)

  }, [tasksItems])

  const handleZoomChange = (zoom: zoomType) => {
    setStateZoom(zoom);
  }

  const setCurrentTask = (currentTask: Task) => {
    if (currentTask.action === "create" && currentTask.entityType === "task") {
      setTasksItems({
        ...tasksItems, 
        data: [...tasksItems.data, currentTask.item as TaskSave] 
      });
    } else if (currentTask.action === "update" && currentTask.entityType === "task") {
      const updatedData = tasksItems.data.map(task =>
        task.id === currentTask.item?.id ? (currentTask.item as TaskSave) : task
      );
  
      setTasksItems({
        ...tasksItems,
        data: updatedData
      });
    } else if (currentTask.action === "delete" && currentTask.entityType === "task") {
      const filteredData = tasksItems.data.filter(task => task.id !== currentTask.item?.id);
      setTasksItems({
        ...tasksItems,
        data: filteredData
      });
    } else if (currentTask.action === "create" && currentTask.entityType === "link") {
      setTasksItems({
        ...tasksItems, 
        links: [...tasksItems.links, currentTask.item as LinkData]
      });
    } else if (currentTask.action === "update" && currentTask.entityType === "link") {
      const updatedLinks = tasksItems.links.map(link =>
        link.id === currentTask.item?.id ? (currentTask.item as LinkData) : link
      );
  
      setTasksItems({
        ...tasksItems,
        links: updatedLinks
      });
    } else if (currentTask.action === "delete" && currentTask.entityType === "link") {
      const filteredLinks = tasksItems.links.filter(link => link.id !== currentTask.item?.id);
      setTasksItems({
        ...tasksItems,
        links: filteredLinks
      });
    }
  };

  return (
    <>
      <div className=' w-full h-full bg-indigo-500'>
        <div className="zoom-bar">
          <Toolbar
            zoom={stateZoom}
            onZoomChange={handleZoomChange}
          />
        </div>
        <div className="gantt-container">
          <Gantt
            tasks={tasksItems}
            zoom={stateZoom}
            TaskUpdate={setCurrentTask}
          />
        </div>
      </div>

    </>
  )
}

export default App
