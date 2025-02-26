import { backApi } from "../util/config-api";


export class childTaskServices {

    /**
   * Crea una subtarea.
   * @param data - Datos de la tarea.
   * @returns Respuesta del backend con la tarea creada.
   */
   async createchildTask(data: any) {
        try {
            const res = await backApi.post('/childtask', data);
            return res.data;
          } catch (error) {
            console.error('Error creating childTask', error);
            throw error;
          }
    }


    /**
   * actualiza la subtarea con nuevos valores.
   * @param data - nuevos datos.
   * @returns Respuesta del backend con actualizada.
   */
   async updatechildTask(data: any) {
        try {
            const res = await backApi.put('/childTask', data);
            return res.data;
          } catch (error) {
            console.error('Error during updating', error);
            throw error;
          }
    }

    /**
   * se optienen las tareas.
   * @param id - Datos de la tarea.
   * @returns Respuesta del backend con las tareas.
   */ 
   async getchildTask () {
        try {
            const res = await backApi.get(`/childTask/${id}`);
            return res.data;
          } catch (error) {
            console.error('Error geting childTask', error);
            throw error;
          }
    }

    /**
   * elimina la sub tarea.
   * @param id - Datos de la tarea.
   * @returns Respuesta del backend.
   */ 
   async deletechildTask (id: string) {
        try {
            const res = await backApi.post(`/childTask/${id}`);
            return res.data;
          } catch (error) {
            console.error('Error delete childTtask', error);
            throw error;
          }

    }
}