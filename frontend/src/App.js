import logo from './logo.svg';
import React from 'react';
import ReactDOM from 'react-dom'
import './App.css';

import productos from './models/productos';

class App extends React.Component {

  constructor(){
      super();
      this.state = {
          IDPRODUCTO: '',
          NOMBREPRODUCTO: '',
          PRECIO: '',
          IDSUCURSAL: '',
          IDCATEGORIA: '',
          IDPROVEEDOR: '',
          productos: [],
          _id: ''
      };
      this.handleChange = this.handleChange.bind(this);
      this.addProducto = this.addProducto.bind(this);
  }

  addProducto(e){
      if(this.state._id){
          fetch(`/api/producto/${this.state._id}`, {
              method: 'PUT',
              body: JSON.stringify(this.state),
              headers: {
                  'Accept': 'application/json',
                  'Content-Type': 'application/json'
              }
          })
          .then(res => res.json())
          .then(data => {
              console.log(data);
              // M.toast({html: 'Producto Actualizado'});
              this.setState({
                  NOMBREPRODUCTO: '',
                  PRECIO: '',
                  IDSUCURSAL: '',
                  IDCATEGORIA: '',
                  IDPROVEEDOR: ''
              });
              this.fetchProducto();
          });
      }else{
          fetch('/api/producto', {
              method: 'POST',
              body: JSON.stringify(this.state),
              headers: {
                  'Accept': 'application/json',
                  'Content-Type': 'application/json'
              }
          })
          .then(res => res.json())
          .then(data => {
              console.log(data);
              // M.toast({html: 'Poducto guardado'});
              this.setState({IDPRODUCTO: '',
              NOMBREPRODUCTO: '',
              PRECIO: '',
              IDSUCURSAL: '',
              IDCATEGORIA: '',
              IDPROVEEDOR: ''});
              this.fetchProducto();
          })
          .catch(err => console.error(err));
      }
      e.preventDefault();
  }

  componentDidMount(){
      this.fetchProducto();
  }

  fetchProducto(){
      fetch('/api/producto')
          .then(res => res.json())
          .then(data => {
              this.setState({productos: data});
              console.log(this.state.productos);
          });
  }

  deleteProducto(id){
      // if(confirm('¿Estas seguro de Eliminarlo?')){
          fetch(`/api/producto/${id}`, {
              method: 'DELETE',
              headers: {
                  'Accept': 'application/json',
                  'Content-Type': 'application/json'
              }
          })
          .then(res => res.json())
          .then(data => {
              console.log(data);
              // M.toast({html: 'Poducto eliminado'});
              this.fetchProducto();
          });
      // }
  }

  editProducto(id){
      fetch(`/api/producto/${id}`)
          .then(res => res.json())
          .then(data => {
              console.log(data)
              this.setState({
                  IDPRODUCTO: data.IDPRODUCTO,
                  NOMBREPRODUCTO: data.NOMBREPRODUCTO,
                  PRECIO: data.PRECIO,
                  IDSUCURSAL: data.IDSUCURSAL,
                  IDCATEGORIA: data.IDCATEGORIA,
                  IDPROVEEDOR: data.IDPROVEEDOR,
                  _id: data._id
              })
          });
  }

  handleChange(e){
      const { name, value } = e.target;
      this.setState({
          [name]: value
      });
  }

  render(){
      return(
          <div>
              {/* {Navigation} */}
              <nav className="light-blue dark-4">
                  <div className="container">
                      <a className="brand-logo" href="/">HISTORICO</a>
                  </div>
              </nav>
              <div className= "container">
                  <div className="row">
                      {/* <div className="col s5">
                          <div className="card">
                              <div className="card-content">
                                  <form onSubmit={this.addProducto}>
                                      <Input name={'IDPRODUCTO'} type={'number'} placeholder={'IDPRODUCTO'} action={this.handleChange} value={this.state.IDPRODUCTO}/>
                                      <Input name={'NOMBREPRODUCTO'} type={'text'} placeholder={'NOMBREPRODUCTO'} action={this.handleChange} value={this.state.NOMBREPRODUCTO}/>
                                      <Input name={'PRECIO'} type={'number'} placeholder={'PRECIO'} action={this.handleChange} value={this.state.PRECIO}/>
                                      <Input name={'IDSUCURSAL'} type={'number'} placeholder={'IDSUCURSAL'} action={this.handleChange} value={this.state.IDSUCURSAL}/>
                                      <Input name={'IDCATEGORIA'} type={'number'} placeholder={'IDCATEGORIA'} action={this.handleChange} value={this.state.IDCATEGORIA}/>
                                      <Input name={'IDPROVEEDOR'} type={'number'} placeholder={'IDPROVEEDOR'} action={this.handleChange} value={this.state.IDPROVEEDOR}/>
                                      <button type="submit" className="btn btn-light darken-4">
                                          Send
                                      </button>
                                  </form>
                              </div>
                          </div>
                      </div> */}
                      <div className="col s7">
                          <table>
                              <thead>
                                  <tr>
                                      <th>IDPRODUCTO</th>
                                      <th>NOMBREPRODUCTO</th>
                                      <th>PRECIO</th>
                                      <th>IDSUCURSAL</th>
                                      <th>IDCATEGORIA</th>
                                      <th>IDPROVEEDOR</th>
                                  </tr>
                              </thead>
                              <tbody>
                                  {
                                      this.state.productos.map(productos => {
                                          return(
                                              <tr key={productos._id}>
                                                  <td>{productos.IDPRODUCTO}</td>
                                                  <td>{productos.NOMBREPRODUCTO}</td>
                                                  <td>{productos.PRECIO}</td>
                                                  <td>{productos.IDSUCURSAL}</td>
                                                  <td>{productos.IDCATEGORIA}</td>
                                                  <td>{productos.IDPROVEEDOR}</td>
                                                  <td>
                                                      <button onClick={() => this.deleteProducto(productos._id)} className="btn light blue darken-4">
                                                          <i className="material-icons">delete</i>
                                                      </button>
                                                      <button onClick={() => this.editProducto(productos._id)} className="btn light blue darken-4" style={{marginTop: '4px'}}>
                                                          <i className="material-icons">edit</i>
                                                      </button>
                                                  </td>
                                              </tr>
                                          )
                                      })
                                  }
                              </tbody>
                          </table>
                      </div>
                  </div>

              </div>
          </div>
          
      )
  }
}

export default App;
