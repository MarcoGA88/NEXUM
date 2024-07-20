import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import '../App.css';
import googleIcon from '../imagenes/google.png';
import imglogo from '../imagenes/LOGO_NEXUM.2-02.png';

const LoginPage = () => {
  const [isToggled, setIsToggled] = useState(false);
  const [registerData, setRegisterData] = useState({
    nombre: '',
    email: '',
    password: '',
    fecha_nacimiento: ''
  });

  useEffect(() => {
    const container = document.querySelector(".container");
    if (isToggled) {
      container.classList.add("toggle");
    } else {
      container.classList.remove("toggle");
    }
  }, [isToggled]);

  const handleSignIn = () => {
    setIsToggled(false);
  };

  const handleSignUp = () => {
    setIsToggled(true);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setRegisterData({
      ...registerData,
      [name]: value
    });
  };

  const handleRegisterSubmit = async (e) => {
    e.preventDefault();
    const dataToSubmit = {
      nombre: registerData.nombre,
      email: registerData.email,
      password: registerData.password,
      fecha_nacimiento: registerData.fecha_nacimiento
    };
    try {
      const response = await axios.post('http://localhost:3000/auth/register', dataToSubmit);
      console.log(response.data);
      // Maneja el registro exitoso
    } catch (error) {
      if (error.response) {
        // El servidor respondió con un código de estado fuera del rango 2xx
        console.error('Error registering user:', error.response.data);
      } else if (error.request) {
        // La solicitud se hizo pero no se recibió respuesta
        console.error('Error registering user:', error.request);
      } else {
        // Algo pasó al configurar la solicitud
        console.error('Error registering user:', error.message);
      }
    }
  };

  return (
    <div className={`container ${isToggled ? 'toggle' : ''}`}>
      <div className="container-form sign-in-form">
        <form className="sign-in">
          <h2>Iniciar Sesión</h2>
          <div className="social-networks">
            <img src={googleIcon} alt="Google Icon" className='IconGoogle'/>
          </div>
          <span>Use su correo y contraseña</span>
          <div className="container-input">
            <ion-icon name="mail-outline" />
            <input type="text" placeholder="Email" />
          </div>
          <div className="container-input">
            <ion-icon name="lock-closed-outline" />
            <input type="password" placeholder="Password" />
          </div>
          <Link to="#" className='link'>¿Olvidaste tu contraseña?</Link>
          <button className="button">INICIAR SESIÓN</button>
        </form>
      </div>

      <div className="container-form sign-up-form">
        <form className="sign-up" onSubmit={handleRegisterSubmit}>
          <h2>Registrarse</h2>
          <div className="social-networks">
            <img src={googleIcon} alt="Google Icon" className='IconGoogle'/>
          </div>
          <span>Use su correo electrónico para registrarse</span>
          <div className="container-input">
            <ion-icon name="person-outline" />
            <input
              type="text"
              placeholder="Nombre Completo"
              name="nombre"
              value={registerData.nombre}
              onChange={handleInputChange}
            />
          </div>
          <div className="container-input">
            <ion-icon name="mail-outline" />
            <input
              type="text"
              placeholder="Email"
              name="email"
              value={registerData.email}
              onChange={handleInputChange}
            />
          </div>
          <div className="container-input">
            <ion-icon name="lock-closed-outline" />
            <input
              type="password"
              placeholder="Password"
              name="password"
              value={registerData.password}
              onChange={handleInputChange}
            />
          </div>
          <div className="container-input">
            <ion-icon name="calendar-outline" />
            <input
              type="date"
              placeholder="Fecha de Nacimiento"
              name="fecha_nacimiento"
              value={registerData.fecha_nacimiento}
              onChange={handleInputChange}
            />
          </div>
          <button className="button" type="submit">REGISTRARSE</button>
        </form>
      </div>

      <div className="container-welcome">
        <div className="welcome-sign-up welcome">
          <img src={imglogo} alt="Logotipo" className='imglogo' />
          <h3>¡Bienvenido!</h3>
          <p>Ingrese sus datos personales para usar todas las funciones del sitio</p>
          <button className="button" id="btn-sign-up" onClick={handleSignUp}>
            Registrarse
          </button>
        </div>
        <div className="welcome-sign-in welcome">
          <img src={imglogo} alt="Logotipo" className='imglogo' />
          <h3>¡Hola!</h3>
          <p>Regístrese con sus datos personales para usar todas las funciones del sitio</p>
          <button className="button" id="btn-sign-in" onClick={handleSignIn}>
            Iniciar Sesión
          </button>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;

