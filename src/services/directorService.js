import { axiosInstance } from '../helper/axios-config';

const obtenerDirectores =() => {
    return axiosInstance.get('director', {
        headers: {
            'Content-Type': 'application/json'
        }
    });
} 

const crearDirector = (data) => {
    return axiosInstance.post('director', data, {
        headers:{
            'Content-Type': 'application/json'
        }
    });
}

const editarDirector = (directorId, data) => {
    return axiosInstance.put(`director/${directorId}`, data, {
        headers:{
            'Content-Type': 'application/json'
        }
    });
}

export{
    obtenerDirectores, crearDirector, editarDirector
}