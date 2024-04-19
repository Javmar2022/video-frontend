import React, { useState, useEffect } from 'react'
import { obtenerGeneros, crearGenero } from '../../services/generoService';
import Swal from 'sweetalert2';
const moment = require('moment');

export const GeneroView = () => {
  const [valoresForm, setValoresForm] = useState([]);
  const [generos, setGeneros] = useState([]);
  const { nombre = '', descripcion = '', estado = '' } = valoresForm;

  const listarGeneros = async () => {
    try {
      Swal.fire({
        allowOutsideClick: false,
        text: 'Cargando....'
      });
      const resp = await obtenerGeneros();
      setGeneros(resp.data);
      Swal.close();
    } catch (error) {
      console.log(error);
      Swal.close();
    }
  }

  useEffect(() => {
    listarGeneros();
  }, []);

  const handleOnChange = (e) => {
    setValoresForm({ ...valoresForm, [e.target.name]: e.target.value })
  }


  const handleCrearGenero = async (e) => {
    e.preventDefault();
    console.log(valoresForm);
    try {
      Swal.fire({
        allowOutsideClick: false,
        text: 'Cargando....'
      });
      Swal.showLoading();
      const resp =await crearGenero(valoresForm);
      setValoresForm({ nombre: '', descipcion:'', estado:'', });
      Swal.close();
    } catch (error) {
      console.log(error);
      Swal.close();
    }
  }

  return (
    <div className='container-fluid'>
      <form onSubmit={(e) => handleCrearGenero(e)}>
        <div className='row'>
          <div className='col-lg-4'>
            <label className="form-label">Nombre</label>
            <select className="form-select" value={nombre} required name='nombre'
              onChange={(e) => handleOnChange(e)}>
              <option selected>--SELECCIONE--</option>
              <option value="Accion">Accion</option>
              <option value="Aventura">Aventura</option>
              <option value="Drama">Drama</option>
              <option value="Ciencia Ficcion">Ciencia Ficcion</option>
              <option value="Terror">Terror</option>
            </select>
          </div>

          {/* <div className="mb-3">
              <label className="form-label">Nombre</label>
              <input required name='nombre' value={nombre} type="text" className="form-control"
                onChange={(e) => handleOnChange(e)} />
            </div>
          </div> */}

          <div className='col-lg-4'>
            <div className="mb-3">
              <label className="form-label">Descripcion</label>
              <input required name="descripcion" type='text' value={descripcion} className="form-control"
                onChange={(e) => handleOnChange(e)} />
            </div>
          </div>

          <div className='col-lg-4'>
            <label className="form-label">Estado</label>
            <select className="form-select" value={estado} required name='estado'
              onChange={(e) => handleOnChange(e)}>
              <option selected>--SELECCIONE--</option>
              <option value="Activo">Activo</option>
              <option value="Inactivo">Inactivo</option>
            </select>

          </div>

        </div >
        <button className="btn btn-primary">Guardar</button>
      </form>

      <table className='table'>
        <thead>
          <tr>
          <th scope='row'>#</th>
          <th scope='col'>Nombre</th>
          <th scope='col'>Descripcion</th>
          <th scope='col'>Estado</th>
          <th scope='col'>Fecha Creacion</th>
          <th scope='col'>Fecha Actualizacion</th>
          </tr>
        </thead>
        {
          generos.length > 0 && generos.map((genero, index) => {
            return <tr>
              <th scope='row'>{ index + 1 }</th>
              <td>{genero.nombre}</td>
              <td>{genero.descripcion}</td>
              <td>{genero.estado}</td>
              <td>{moment(genero.fechaCreacion).format('DD-MM-YYYY HH:mm')} </td>
              <td>{moment(genero.fechaActualizacion).format('DD-MM-YYYY HH:mm')} </td>
            {/*   <td>{genero.fechaCreacion}</td>
              <td>{genero.fechaActualizacion}</td> */}

            </tr>
          })
        }

        <tbody>


        </tbody>
      </table>
    </div>

  )
}


