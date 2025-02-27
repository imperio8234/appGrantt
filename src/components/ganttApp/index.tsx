import { useEffect, useState } from 'react'
import { LinkData, Task, TaskSave } from '../../util/types';
import Gantt from '../gantt/gantt';
import Toolbar from '../gantt/Toolbar';
import { TaskServices } from '../../services/taskServices';
import { LinkServices } from '../../services/linkServices';
import { LoadingOutlined } from '@ant-design/icons';
import { Flex, Spin } from 'antd';
import useNotification from '../../util/notify';
import { useUser } from '../../provider/userContex';
import LayoutGrantt from './components/layout';



export type zoomType = "Days" | "Hours" | 'Months';

function GanttApp() {
    const [stateZoom, setStateZoom] = useState<zoomType>("Days");
    const [loading, setLoading] = useState<boolean>(true);
    const [tasksItems, setTasksItems] = useState<{
        data: TaskSave[],
        links: LinkData[];
    }>({
        data: [],
        links: []
    });

    // notificaciones
    const { notify, contextHolder } = useNotification();

    // importacion de servicios
    const serviceTasks = new TaskServices();
    const serviceLinks = new LinkServices();
    const { user, logged } = useUser();

    useEffect(() => {
        if (!user?.token) {
          setTasksItems({links: [], data: []})
          return;        
      }
    }, [user])


    const getTasks = async () => {
        setLoading(true);
        try {

            const links = await serviceLinks.getLink(user?.idUser);
            const tasks = await serviceTasks.getTask(user?.idUser);


            setTasksItems({ data: tasks.data, links: links.data })
            setLoading(false)
        } catch (error) {
            console.log(error)
            setLoading(false);
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
            currentTask.item.user = {
                idUser: user?.idUser
            }
            try {
                const res = await serviceTasks.createTask(currentTask.item)
                notify("tarea generada", "success")
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
                notify("Datos eliminados", "info")
            } catch (error) {
                console.log(error)
            }

        } else if (currentTask.action === "create" && currentTask.entityType === "link") { // manejo de las relaciones o links
            setTasksItems({
                ...tasksItems,
                links: [...tasksItems.links, currentTask.item as LinkData]
            });
            // save database
            currentTask.item.user = {
                idUser: user?.idUser
            }

            currentTask.item.tasks = {
                id: currentTask?.item.source
            }
            currentTask.item.tasks2 = {
                id: currentTask?.item.target
            }

            
            try {
                const res = await serviceLinks.createLink(currentTask.item)
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
            } catch (error) {
                console.log(error)
            }
        }
    };

    if (loading) {
        return <Spin indicator={<LoadingOutlined spin />} size="large" />
    }

    return (
        <>
            {contextHolder}
            <LayoutGrantt />
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