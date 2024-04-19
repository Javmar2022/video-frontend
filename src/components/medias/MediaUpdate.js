import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom/cjs/react-router-dom.min'
import { obtenerMediaPorId, editarMedia } from '../../services/mediaService';
import { obtenerDirectores } from '../../services/directorService';
import { obtenerGeneros } from '../../services/generoService';
import { obtenerProductoras } from '../../services/productoraService';
import { obtenerTipos } from '../../services/tipoService';
import Swal from 'sweetalert2';

export const MediaUpdate = () => {

    const { mediaId = '' } = useParams();
    const [media, setMedia] = useState();
    const [generos, setGeneros] = useState([]);
    const [directores, setDirectores] = useState([]);
    const [productoras, setProductoras] = useState([]);
    const [tipos, setTipos] = useState([]);
    const [valoresForm, setValoresForm] = useState([]);
    const { serial = '', titulo = '', sinopsis = '', urlpel = '', foto = '', fechaCreacion = '', fechaActualizacion = '', anioestreno = '', genero, director, productora, tipo } = valoresForm;


    const listarGeneros = async () => {
        try {
            const { data } = await obtenerGeneros();
            setGeneros(data);
            // console.log(data);

        } catch (error) {
            console.log(error);

        }
    }
    useEffect(() => {
        listarGeneros();
    }, []);

    const listarDirectores = async () => {
        try {
            const { data } = await obtenerDirectores();
            setDirectores(data);
            // console.log(data);

        } catch (error) {
            console.log(error);
        }
    }
    useEffect(() => {
        listarDirectores();
    }, []);

    const listarProductoras = async () => {
        try {
            const { data } = await obtenerProductoras();
            setProductoras(data);
            // console.log(data);

        } catch (error) {
            console.log(error);

        }
    }

    useEffect(() => {
        listarProductoras();
    }, []);

    const listarTipos = async () => {
        try {
            const { data } = await obtenerTipos();
            setTipos(data);
            // console.log(data);

        } catch (error) {
            console.log(error);

        }
    }

    useEffect(() => {
        listarTipos();
    }, []);


    const obtenerMedia = async () => {
        try {

            Swal.fire({
                allowOutsideClick: false,
                text: 'cargando...'
            });
            Swal.showLoading();
            const { data } = await obtenerMediaPorId(mediaId);
            console.log(data);
            setMedia(data);
            Swal.close();

        } catch (error) {
            console.log(error);
            Swal.close();
        }
    }

    useEffect(() => {
        obtenerMedia();
    }, [mediaId]);

    useEffect(() => {
        if (media) {
            setValoresForm({
                serial: media.serial,
                titulo: media.titulo,
                sinopsis: media.sinopsis,
                urlpel: media.urlpel,
                foto: media.foto,
                fechaCreacion: media.fechaCreacion,
                fechaActualizacion: media.fechaActualizacion,
                anioestreno: media.anioestreno,
                genero: media.genero,
                director: media.director,
                productora: media.productora,
                tipo: media.tipo
            });
        }
    }, [media]);

    const handleOnChange = ({ target }) => {
        const { name, value } = target;
        setValoresForm({ ...valoresForm, [name]: value });
    }

    const handleOnSubmit = async (e) => {
        e.preventDefault();
        const media = {
            serial, titulo, sinopsis, urlpel, foto, fechaCreacion, fechaActualizacion, anioestreno,
            genero: {
                _id: genero
            },
            director: {
                _id: director
            },
            productora: {
                _id: productora
            },
            tipo: {
                _id: tipo
            }
        }
        console.log(media);

        try {
            Swal.fire({
                allowOutsideClick: false,
                text: 'cargando...'
            });
            Swal.showLoading();
            const { data } = await editarMedia(mediaId, media);
            Swal.close();
        } catch (error) {
            console.log(error);
            console.log(error.response.data);
            Swal.close();
            let mensaje;
            if (error && error.response & error.response.data) {
                mensaje = error.response.data;
            } else {
                mensaje = "Ocurrio un error, por favor intente de nuevo!!";
            }
            Swal.fire('Error', 'Ocurrio un Error, por favor verifique los datos', 'error');
        }
    }

    return (
        <div className='container-fluid mt-3 mb-2'>
            <div className="card">
                <div className='card-header'>
                    <h5 className='card-title'>Detalle Pelicula</h5>
                </div>

                <div className="card-body">
                    <div className='row'>
                        <div className='col-md-4'>
                            <img src={media?.foto} />
                        </div>

                        <div className='col-md-8'>

                            <form onSubmit={(e) => handleOnSubmit(e)}>
                                <div className='row'>
                                    <div className='col'>
                                        <div className="mb-3">
                                            <label className="form-label">Serial</label>
                                            <input type="text" name='serial'
                                                value={serial}
                                                onChange={(e) => handleOnChange(e)}
                                                required
                                                className='form-control'
                                            />

                                        </div>
                                    </div>

                                    <div className='col'>
                                        <div className="mb-3">
                                            <label className="form-label">Título</label>
                                            <input type="text" name='titulo'
                                                value={titulo}
                                                onChange={(e) => handleOnChange(e)}
                                                required
                                                className='form-control'
                                            />
                                        </div>
                                    </div>

                                    <div className='col'>
                                        <div className="mb-3">
                                            <label className="form-label">Sinópsis</label>
                                            <input type="text" name='sinopsis'
                                                value={sinopsis}
                                                onChange={(e) => handleOnChange(e)}
                                                required
                                                className='form-control'
                                            />

                                        </div>
                                    </div>
                                    <div className='col'>
                                        <div className="mb-3">
                                            <label className="form-label">Url película</label>
                                            <input type="text" name='urlpel'
                                                value={urlpel}
                                                onChange={(e) => handleOnChange(e)}
                                                required
                                                className='form-control'
                                            />
                                        </div>
                                    </div>
                                </div>

                                <div className='row'>
                                    <div className='col'>
                                        <div className="mb-3">
                                            <label className="form-label">Foto</label>
                                            <input type="url" name='foto'
                                                value={foto}
                                                onChange={(e) => handleOnChange(e)}
                                                required
                                                className='form-control'
                                            />

                                        </div>
                                    </div>

                                    <div className='col'>
                                        <div className="mb-3">
                                            <label className="form-label">Fecha Creación</label>
                                            <input type="date" name='fechaCreacion'
                                                value={fechaCreacion}
                                                onChange={(e) => handleOnChange(e)}
                                                required
                                                className='form-control'
                                            />
                                        </div>
                                    </div>

                                    <div className='col'>
                                        <div className="mb-3">
                                            <label className="form-label">Fecha Actualizacion</label>
                                            <input type="date" name='fechaActualizacion'
                                                value={fechaActualizacion}
                                                onChange={(e) => handleOnChange(e)}
                                                required
                                                className='form-control'
                                            />

                                        </div>
                                    </div>
                                    <div className='col'>
                                        <div className="mb-3">
                                            <label className="form-label">Año Estreno</label>
                                            <input type="text" name='anioestreno'
                                                value={anioestreno}
                                                onChange={(e) => handleOnChange(e)}
                                                required
                                                className='form-control'
                                            />

                                        </div>
                                    </div>

                                </div>

                                <div className='row'>
                                    <div className='col'>
                                        <div className="mb-3">
                                            <label className="form-label">Genero</label>
                                            <select className='form-select'
                                                name='genero'
                                                required
                                                value={genero}
                                                onChange={(e) => handleOnChange(e)}>
                                                <option value="">--SELECCIONE--</option>
                                                {
                                                    generos.map(({ _id, nombre }) => {
                                                        return <option key={_id} value={_id}>{nombre}</option>
                                                    })
                                                }
                                            </select>

                                        </div>
                                    </div>

                                    <div className='col'>
                                        <div className="mb-3">
                                            <label className="form-label">Director</label>
                                            <select className='form-select'
                                                name='director'
                                                required
                                                value={director}
                                                onChange={(e) => handleOnChange(e)}>

                                                <option value="">--SELECCIONE--</option>

                                                {
                                                    directores.map(({ _id, nombre }) => {
                                                        return <option key={_id} value={_id}>{nombre}</option>
                                                    })
                                                }
                                            </select>

                                        </div>
                                    </div>

                                    <div className='col'>
                                        <div className="mb-3">
                                            <label className="form-label">Productora</label>
                                            <select className='form-select'
                                                name='productora'
                                                required
                                                value={productora}
                                                onChange={(e) => handleOnChange(e)}>
                                                <option value="">--SELECCIONE--</option>
                                                {
                                                    productoras.map(({ _id, nombre }) => {
                                                        return <option key={_id} value={_id}>{nombre}</option>
                                                    })
                                                }
                                            </select>

                                        </div>
                                    </div>
                                    <div className='col'>
                                        <div className="mb-3">
                                            <label className="form-label">Tipo</label>
                                            <select className='form-select'
                                                name='tipo'
                                                required
                                                value={tipo}
                                                onChange={(e) => handleOnChange(e)}>
                                                <option value="">--SELECCIONE--</option>
                                                {
                                                    tipos.map(({ _id, nombre }) => {
                                                        return <option key={_id} value={_id}>{nombre}</option>
                                                    })
                                                }

                                            </select>

                                        </div>
                                    </div>
                                </div>

                                <div className='row'>
                                    <div className='col'>
                                        <button className="btn btn-primary">Guardar</button>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}


