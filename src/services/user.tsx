import { backApi } from "../util/config-api";
import { user } from "../util/types";


export class UserServices {

    /**
     * Crea un USUARIO.
     * @param data - Datos del USUARIO.
     * @returns Respuesta del backend con el usuario creado.
     */
    async createUser(data?: user) {
        try {
            const res = await backApi.post('/users', data);
            return res.data;
        } catch (error) {
            console.error('Error creating user', error);
            throw error;
        }
    }

    /**
     * Actualiza un USUARIO con nuevos valores.
     * @param id - Identificador del usuario.
     * @param data - Nuevos datos del usuario.
     * @returns Respuesta del backend con el usuario actualizado.
     */
    async updateUser(id: string, data: user) {
        try {
            const res = await backApi.put(`/users/${id}`, data);
            return res.data;
        } catch (error) {
            console.error('Error updating user', error);
            throw error;
        }
    }

    /**
     * Obtiene todos los USUARIOS.
     * @returns Respuesta del backend con la lista de usuarios.
     */
    async getUsers() {
        try {
            const res = await backApi.get('/users');
            return res.data;
        } catch (error) {
            console.error('Error getting users', error);
            throw error;
        }
    }

    /**
     * Obtiene un USUARIO por su ID.
     * @param id - Identificador del usuario.
     * @returns Respuesta del backend con el usuario.
     */
    async getUserById(id: string) {
        try {
            const res = await backApi.get(`/users/${id}`);
            return res.data;
        } catch (error) {
            console.error('Error getting user by ID', error);
            throw error;
        }
    }

    /**
     * Elimina un USUARIO.
     * @param id - Identificador del usuario.
     * @returns Respuesta del backend.
     */
    async deleteUser(id: string) {
        try {
            const res = await backApi.delete(`/users/${id}`);
            return res.data;
        } catch (error) {
            console.error('Error deleting user', error);
            throw error;
        }
    }
}