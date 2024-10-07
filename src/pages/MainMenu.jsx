import React from 'react'
import "../styles/main_menu.css"
import { Link } from 'react-router-dom'

const MainMenu = () => {
  return (
    <div id='MainMenu' className='section'>
      <div className="header">
        <h1>Pruebas Estadisticas</h1>
      </div>

      <div className="content">
        <div className="tests">
          <div className="subheader">
            <h3>Pruebas de Uniformidad</h3>
          </div>
          <div className="test-options">
            <Link to="stadistic-test/1" className="option">
              <div className="h4">Prueba de los promedios</div>
            </Link>
            <Link to="stadistic-test/2" className="option">
              <div className="h4">Prueba de Chi cuadrado</div>
            </Link>
            <Link to="stadistic-test/3" className="option">
              <div className="h4">Prueba de Kolmogorov Smirnov</div>
            </Link>
          </div>
        </div>
        <div className="tests">
          <div className="subheader">
            <h3>Pruebas de Independencia</h3>
          </div>
          <div className="test-options">
            <Link to="stadistic-test/4" className="option">
              <div className="h4">Prueba de las series</div>
            </Link>        
          </div>
        </div>
      </div>
    </div>
  )
}

export default MainMenu
