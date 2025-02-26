import { useEffect, useState } from 'react'
import { LinkData, Task, TaskSave } from '../../util/types';
import Gantt from '../gantt/gantt';
import Toolbar from '../gantt/Toolbar';
import { TaskServices } from '../../services/taskServices';


export type zoomType = "Days" | "Hours" | 'Months';

function GanttApp() {
    const [stateZoom, setStateZoom] = useState<zoomType>("Days");
    const [tasksItems, setTasksItems] = useState<{
        data: TaskSave[],
        links: LinkData[];
    }>({
        data: [],
        links: []
    });

    // importacion de servicios
    const serviceTasks = new TaskServices();

    const getTasks = async() => {
        try {
            const tasks = await serviceTasks.getTask();
            setTasksItems({data: tasks.data, links: []})
            console.log("tasks", tasks.data)
        } catch (error) {
            console.log(error)
        }
    }
   
    useEffect(() => {
        getTasks()

    }, [])


    const handleZoomChange = (zoom: zoomType) => {
        setStateZoom(zoom);
    }

    const setCurrentTask = async (currentTask: any) => {
        if (currentTask.action === "create" && currentTask.entityType === "task") {
            setTasksItems({
                ...tasksItems,
                data: [...tasksItems.data, currentTask.item as TaskSave]
            });
             try {
                const res = await serviceTasks.createTask(currentTask.item)
                console.log("se guardaron los datos", res)
             } catch (error) {
                console.log(error)
                
             }
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
        </>
    )

}

export default GanttApp;