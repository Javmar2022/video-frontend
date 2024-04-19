import React from 'react'
import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";
import { Header } from './components/ui/Header';
import { MediaView } from './components/medias/MediaView'
import { GeneroView } from './components/generos/GeneroView'
import { DirectorView } from './components/directores/DirectorView'
import { ProductoraView } from './components/productoras/ProductoraView'
import { TipoView } from './components/tipos/TipoView'
import { MediaUpdate } from './components/medias/MediaUpdate';



const App = () => {
  return <Router forceRefresh>
    <Header />
    <Switch>
      <Route exact path='/' component={ MediaView } />
      <Route exact path='/medias' component={ MediaView } />
      <Route exact path='/generos' component={ GeneroView } />
      <Route exact path='/directores' component={ DirectorView } />
      <Route exact path='/productoras' component={ ProductoraView } />
      <Route exact path='/tipos' component={ TipoView } />
      <Route exact path='/medias/edit/:mediaId' component={ MediaUpdate } />

      <Redirect to='/' />
    </Switch>
  </Router>

}

export {
  App,
} 
