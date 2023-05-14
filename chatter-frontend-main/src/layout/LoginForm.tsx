import Field from '../components/Home/Field';
import React, { useState } from 'react';
import FormData from 'form-data';
import Link from 'next/link';
import { LoginData } from '../types/login';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { setLoginData } from '../redux/userSlice';

let ENDPOINT_LOGIN = 'http://localhost:8080/login';
function LoginForm() {
  const initialValues: LoginData = {
    email: '',
    password: ''
  };

  const [formData, setFormData] = useState<LoginData>(initialValues);
  const data = new FormData();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const dispatch = useDispatch();
  const handleLogin = () => {
    data.append('email', formData.email);
    data.append('password', formData.password);
    resetForm();
    axios
      .post(ENDPOINT_LOGIN, data)
      .then((response) => {
        dispatch(setLoginData({ authToken: response.data.token, userId: response.data.userId }));
      })
      .catch((error) => {
        console.log(error);
      });
  };

  interface FormDataExtended extends FormData {
    delete(name: string): void;
  }
  const dataextended = new FormData() as FormDataExtended;

  const resetForm = () => {
    dataextended.delete('email');
    dataextended.delete('password');
  };

  return (
    <div
      id="login"
      className="right-side d-flex flex-column justify-content-center w-50 bg-chatter-green h-100 py-5 fs-1 fw-bold"
    >
      <Field
        title="E-MAIL"
        type="email"
        name="email"
        placeholder="Ingresa tu correo electrónico"
        onChange={handleInputChange}
      />

      <Field
        title="CONTRASEÑA"
        type="password"
        name="password"
        placeholder="Ingresa tu contraseña"
        onChange={handleInputChange}
      />

      <div className="content d-flex flex-column mb-5 d-flex align-items-start" data-aos="fade">
        <Link href="/chat" passHref>
          <button type="submit" className="btn btn-primary" onClick={handleLogin}>
            Ingresar
          </button>
        </Link>
      </div>

      <div className="content text d-flex flex-row gap-2 mb-5 fs-6 fst-italic" data-aos="fade">
        <span>No tienes una cuenta?</span>
        <Link href="/register" className="text-chatter-blue">
          Registrate aquí
        </Link>
      </div>
    </div>
  );
}

export default LoginForm;
