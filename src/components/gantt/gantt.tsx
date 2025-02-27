import { gantt } from "dhtmlx-gantt";
import "../../../node_modules/dhtmlx-gantt/codebase/dhtmlxgantt.css";
import "./gantt.css";
import  { Component } from "react";
import { Task, taskgantt } from "../../util/types";

interface GanttProps {
    tasks: any;
    zoom: string;
    TaskUpdate: (task: taskgantt) => void;
}

export default class Gantt extends Component<GanttProps> {
    ganttContainer: any;
    dataProcessor: any;
    constructor(props: GanttProps) {
        super(props);
        this.state = {
            updatedTasks: [] as Task[]
        };
    }

    componentDidMount() {
        gantt.config.date_format = "%Y-%m-%d-%H:%i";
        this.initZoom();
        this.initGanttDataProcessor();
        const { tasks, zoom } = this.props;

        if (this.ganttContainer) {
            gantt.init(this.ganttContainer);
            this.setZoom(zoom);
            if (tasks && tasks.data) {
                gantt.parse(tasks);
            } else {
                console.warn("No tasks data provided or tasks format is incorrect");
            }
        } else {
            console.error("Gantt container not found");
        }
    }

    shouldComponentUpdate(nextProps : any) {
        if (nextProps.tasks !== this.props.tasks) {
            if (this.ganttContainer) {
                gantt.clearAll();
                if (nextProps.tasks && nextProps.tasks.data) {
                    gantt.parse(nextProps.tasks);
                } else {
                    console.warn("No tasks data provided or tasks format is incorrect");
                }
            } else {
                console.error("Gantt container not found during update");
            }
        }
        if (nextProps.zoom !== this.props.zoom) {
            this.setZoom(nextProps.zoom);
        }
        return false;
    }

    initZoom() {
        gantt.ext.zoom.init({
            levels: [
                {
                    name: 'Hours',
                    scale_height: 60,
                    min_column_width: 30,
                    scales: [
                        { unit: 'day', step: 1, format: '%d %M' },
                        { unit: 'hour', step: 1, format: '%H' }
                    ]
                },
                {
                    name: 'Days',
                    scale_height: 60,
                    min_column_width: 70,
                    scales: [
                        { unit: 'week', step: 1, format: 'Week #%W' },
                        { unit: 'day', step: 1, format: '%d %M' }
                    ]
                },
                {
                    name: 'Months',
                    scale_height: 60,
                    min_column_width: 70,
                    scales: [
                        { unit: "month", step: 1, format: '%F' },
                        { unit: 'week', step: 1, format: '#%W' }
                    ]
                }
            ]
        });
    }

    setZoom(value: any) {
        if (!gantt.$initialized) {
            this.initZoom();
        }
        gantt.ext.zoom.setLevel(value);
    }

    initGanttDataProcessor() {
        this.dataProcessor = gantt.createDataProcessor((entityType, action, item, id) => {
            return new Promise<void>((resolve) => { // <- Aquí le decimos que es Promise<void>
                const updatedTask: any = { entityType, action, item, id };
                console.log("Task updated:", updatedTask);
                this.props.TaskUpdate(updatedTask);
                resolve(); // Ahora TypeScript ya no se quejará
            });
        });
    }
    

    componentWillUnmount() {
        if (this.dataProcessor) {
            this.dataProcessor.destructor();
            this.dataProcessor = null;
        }
    
        if (!this.ganttContainer) {
            this.ganttContainer.innerHTML = ''; // Limpiar el contenido del contenedor
        }
    
        // Desvincular eventos de Gantt si es necesario
        gantt.detachAllEvents();
    
        // Limpiar el estado interno de Gantt
        gantt.clearAll();
    }

    render() {
        return (
            <div
                ref={input => this.ganttContainer = input}
                style={{ width: '100%', height: '100%' }}
            ></div>
        );
    }
}