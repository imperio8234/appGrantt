import { backApi } from "../util/config-api";
import { TaskData, TaskSave } from "../util/types";

export class TaskServices {

    /**
   * Crea una una tarea.
   * @param data - Datos de la tarea.
   * @returns Respuesta del backend con la tarea creada.
   */
   async createTask(data?: TaskData) {
        try {
            const res = await backApi.post('/tasks', data);
            return res.data;
          } catch (error) {
            console.error('Error creating task', error);
            throw error;
          }
    }


    /**
   * actualiza la tarea con nuevos valores.
   * @param id - identificador.
   * @param data - nuevos datos.
   * @returns Respuesta del backend con actualizada.
   */
   async updateTask(id: string ,data: TaskSave) {
        try {
            const res = await backApi.put(`/tasks/${id}`, data);
            return res.data;
          } catch (error) {
            console.error('Error during updating', error);
            throw error;
          }
    }

    /**
   * optener las tareas.
   * @param id identificador del usuario 
   * @returns Respuesta del backend con las tareas.
   */ 
   async getTask (id?: string) {
        try {
            const res = await backApi.get(`/tasks/${id}`);
            return res.data;
          } catch (error) {
            console.error('Error geting task', error);
            throw error;
          }
    }

    /**
   * eliminar la tarea.
   * @param id - identificador.
   * @returns Respuesta del backend.
   */ 
   async deleteTask (id: string) {
        try {
            const res = await backApi.delete(`/tasks/${id}`);
            return res.data;
          } catch (error) {
            console.error('Error during delete task', error);
            throw error;
          }

    }
}