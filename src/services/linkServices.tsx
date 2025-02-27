import { backApi } from "../util/config-api";
import { LinkData, TaskSave } from "../util/types";

export class LinkServices {

    /**
   * Crea una link de referencia.
   * @param data - Datos del link.
   * @returns Respuesta del backend 
   */
   async createLink(data: any) {
        try {
            const res = await backApi.post('/link', data);
            return res.data;
          } catch (error) {
            console.error('Error creating link', error);
            throw error;
          }
    }


    /**
   * actualiza la tarea con nuevos valores.
   * @param id - identificacion.
   * @param data - nuevos datos.
   * @returns Respuesta del backend con actualizada.
   */
   async updatelink(id: number, data: LinkData) {
        try {
            const res = await backApi.put(`/link/${id}`, data);
            return res.data;
          } catch (error) {
            console.error('Error during updating', error);
            throw error;
          }
    }

    /**
   * optener los links.
   * @returns Respuesta del backend con los links.
   */ 
   async getLink () {
        try {
            const res = await backApi.get(`/link`);
            return res.data;
          } catch (error) {
            console.error('Error geting link', error);
            throw error;
          }
    }

    /**
   * elimina el link.
   * @param id - identificador del link .
   * @returns Respuesta del backend.
   */ 
   async deleteLink (id: string) {
        try {
            const res = await backApi.delete(`/link/${id}`);
            return res.data;
          } catch (error) {
            console.error('Error delete link', error);
            throw error;
          }

    }
}