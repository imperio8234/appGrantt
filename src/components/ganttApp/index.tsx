import { useEffect, useState } from 'react'
import { LinkData, Task, TaskSave } from '../../util/types';
import Gantt from '../gantt/gantt';
import Toolbar from '../gantt/Toolbar';
import { TaskServices } from '../../services/taskServices';
import { LinkServices } from '../../services/linkServices';


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
    const serviceLinks = new LinkServices();

    const getTasks = async() => {
        try {

            const links = await serviceLinks.getLink();
            const tasks = await serviceTasks.getTask();
            
            setTasksItems({data: tasks.data, links:links.data})
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

            // save database
             try {
                const res = await serviceTasks.createTask(currentTask.item)
                console.log("se guardaron los datos", res)
             } catch (error) {
                console.log(error)
                
             }
             // update database
        } else if (currentTask.action === "update" && currentTask.entityType === "task") {
            const updatedData = tasksItems.data.map(task =>
                task.id === currentTask.item?.id ? (currentTask.item as TaskSave) : task
            );

            setTasksItems({
                ...tasksItems,
                data: updatedData
            });

            // update task database
               try {
                const res = await serviceTasks.updateTask(currentTask.id, currentTask.item)
                console.log("task update", res)
               } catch (error) {
                 console.log(error)
               }
            // delete database
        } else if (currentTask.action === "delete" && currentTask.entityType === "task") {
            const filteredData = tasksItems.data.filter(task => task.id !== currentTask.item?.id);
            setTasksItems({
                ...tasksItems,
                data: filteredData
            });

            try {
                const res = await serviceTasks.deleteTask(currentTask.id)
                console.log("task delete", res)
            } catch (error) {
                console.log(error)
            }

        } else if (currentTask.action === "create" && currentTask.entityType === "link") { // manejo de las relaciones o links
            setTasksItems({
                ...tasksItems,
                links: [...tasksItems.links, currentTask.item as LinkData]
            });
             console.log("llego el link", currentTask)
             // save database
            try {
                const res = await serviceLinks.createLink(currentTask.item)
                console.log("link creado", res)
            } catch (error) {
                console.log(error)
            }

            // update link database
        } else if (currentTask.action === "update" && currentTask.entityType === "link") {
            const updatedLinks = tasksItems.links.map(link =>
                link.id === currentTask.item?.id ? (currentTask.item as LinkData) : link
            );

            setTasksItems({
                ...tasksItems,
                links: updatedLinks
            });

            // update link database
            try {
                const res = await serviceLinks.updatelink(currentTask.id, currentTask.item)
                console.log("link update", res)
            } catch (error) {
                console.log(error)
            }
        } else if (currentTask.action === "delete" && currentTask.entityType === "link") {
            const filteredLinks = tasksItems.links.filter(link => link.id !== currentTask.item?.id);
            setTasksItems({
                ...tasksItems,
                links: filteredLinks
            });

            // delete link tatabase
            try {
                const res = await serviceLinks.deleteLink(currentTask.id)
                console.log("link delete", res)
            } catch (error) {
             console.log(error)   
            }
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