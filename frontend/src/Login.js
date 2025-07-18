import React, { useState } from 'react';
import axios from 'axios';

const Login = () => {
    const [isRegistering, setIsRegistering] = useState(false);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        const url = isRegistering
            ? 'http://localhost:8000/api/register/'
            : 'http://localhost:8000/api/login/';

        try {
            const response = await axios.post(url, { username, password });
            
            if (isRegistering) {
                setMessage('Registro exitoso. Ahora puedes iniciar sesión.');
                setIsRegistering(false);
            } else {
                setMessage('Inicio de sesión exitoso.');
                console.log('Token recibido:', response.data);
                // Guardar el token en localStorage o context
                localStorage.setItem('access_token', response.data.access);
                localStorage.setItem('refresh_token', response.data.refresh);
            }
        } catch (error) {
            setMessage(error.response?.data?.error || 'Hubo un error. Verifica tus datos.');
        }
    };

    return (
        <div>
            <h1 className="cecylix-logo">CECYFLIX</h1>
            <h2>{isRegistering ? 'Crear cuenta' : 'Iniciar sesión'}</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Usuario"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
                <input
                    type="password"
                    placeholder="Contraseña"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <button type="submit">
                    {isRegistering ? 'Registrarse' : 'Ingresar'}
                </button>
            </form>
            <p>{message}</p>
            <p>
                {isRegistering ? '¿Ya tienes cuenta?' : '¿No tienes cuenta?'}{' '}
                <span
                    onClick={() => setIsRegistering(!isRegistering)}
                    style={{ color: '#E50914', cursor: 'pointer' }}
                >
                    {isRegistering ? 'Inicia sesión' : 'Regístrate'}
                </span>
            </p>
        </div>
    );
};

export default Login;