import React, { useState, useEffect } from 'react'
import { obtenerProductoras, crearProductora } from '../../services/productoraService';
import Swal from 'sweetalert2';
const moment = require('moment');

export const ProductoraView = () => {
  const [valoresForm, setValoresForm] = useState([]);
  const [productoras, setProductoras] = useState([]);
  const { nombre = '', estado = '', slogan = '', descripcion = '' } = valoresForm;

  const listarProductoras = async () => {
    try {
      Swal.fire({
        allowOutsideClick: false,
        text: 'Cargando....'
      });
      const resp = await obtenerProductoras();
      setProductoras(resp.data);
      Swal.close();
    } catch (error) {
      console.log(error);
      Swal.close();
    }
  }

  useEffect(() => {
    listarProductoras();
  }, []);

  const handleOnChange = (e) => {
    setValoresForm({ ...valoresForm, [e.target.name]: e.target.value })
  }


  const handleCrearProductora = async (e) => {
    e.preventDefault();
    console.log(valoresForm);
    try {
      Swal.fire({
        allowOutsideClick: false,
        text: 'Cargando....'
      });
      Swal.showLoading();
      const resp = await crearProductora(valoresForm);
      setValoresForm({ nombre: '', estado: '', slogan: '', descripcion: '' });
      Swal.close();
    } catch (error) {
      console.log(error);
      Swal.close();
    }
  }

  return (

    <div className='container-fluid'>
      <form onSubmit={(e) => handleCrearProductora(e)}>
        <div className='row'>
          <div className='col-lg-4'>
            <div className="mb-3">
              <label className="form-label">Nombre</label>
              <input required name="nombre" type='text' value={nombre} className="form-control"
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

          <div className='col-lg-4'>
            <label className="form-label">Slogan</label>
            <input required name="slogan" type='text' value={slogan} className="form-control"
              onChange={(e) => handleOnChange(e)} />
          </div>
        </div>

        <div className='col-lg-4'>
          <label className="form-label">Descripcion</label>
          <input required name="descripcion" type='text' value={descripcion} className="form-control"
            onChange={(e) => handleOnChange(e)} />
        </div>
        <p> </p>

        <button className="btn btn-primary">Guardar</button>
        <p> </p>


      </form>

      <table className='table'>
        <thead>
          <tr>
            <th scope='row'>#</th>
            <th scope='col'>Nombre</th>
            <th scope='col'>Estado</th>
            <th scope='col'>Fecha Creacion</th>
            <th scope='col'>Fecha Actualizacion</th>
            <th scope='col'>Slogan</th>
            <th scope='col'>Descripcion</th>

          </tr>
        </thead>
        {
          productoras.length > 0 && productoras.map((productora, index) => {
            return <tr>
              <th scope='row'>{index + 1}</th>
              <td>{productora.nombre}</td>
              <td>{productora.estado}</td>
              <td>{moment(productora.fechaCreacion).format('DD-MM-YYYY HH:mm')} </td>
              <td>{moment(productora.fechaActualizacion).format('DD-MM-YYYY HH:mm')} </td>
              <td>{productora.slogan}</td>
              <td>{productora.descripcion}</td>
            </tr>
          })
        }

        <tbody>
        </tbody>
      </table>
    </div>

  )
}

