import React from 'react'
import { AiFillGithub, AiFillLinkedin } from "react-icons/ai";
import "./styles/footer.css"

const Footer = () => {
    return (
      <div className="footer bg-dark ">
        <div className="description">
          <p>
            Creado por Huayllas Pinto Kevin -  © 2024 UMSS, Simulacion de sistemas
          </p>
          <p>
           
          </p>
        </div>
        <div className="social-media">
          <ul>
            <li>
              <a href="https://github.com/KevinOmega">
                <i>
                  <AiFillGithub />
                </i>
              </a>
            </li>
            <li>
              <a href="https://www.linkedin.com/in/kevin-omega-94a3a4226/">
                <i>
                  <AiFillLinkedin />
                </i>
              </a>
            </li>
          </ul>
        </div>
      </div>
    );
  };

export default Footer
