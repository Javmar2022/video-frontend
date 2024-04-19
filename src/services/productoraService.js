import { axiosInstance } from '../helper/axios-config';

const obtenerProductoras =() => {
    return axiosInstance.get('productora', {
        headers: {
            'Content-Type': 'application/json'
        }
    });
} 

const crearProductora = (data) => {
    return axiosInstance.post('productora', data, {
        headers:{
            'Content-Type': 'application/json'
        }
    });
}

const editarProductora = (productoraId, data) => {
    return axiosInstance.put(`productora/${productoraId}`, data, {
        headers:{
            'Content-Type': 'application/json'
        }
    });
}

export{
    obtenerProductoras, crearProductora, editarProductora
}