import React, { useState } from 'react';
import { useForm } from 'react-hook-form';

const LoginView = () => {
    const { register, handleSubmit, formState: { errors, isValid }, setError } = useForm();
    const [isLogging, setIsLogging] = useState(false);

    const forbiddenUsernames = ['root', 'bot'];

    const customLoginValidator = async (value: string) => {
        if (forbiddenUsernames.includes(value)) {
            setError('loginField', { type: 'manual', message: 'Login ma nie dozwoloną nazwę' });
        }
    };

    const onSubmit = async () => {
        setIsLogging(true);

        setIsLogging(false);
    };

    return (
        <div>
            <header>
                <h1>Logowanie</h1>
            </header>
            <form id="login-box" onSubmit={handleSubmit(onSubmit)}>
                <div>
                    <label id="login">Login</label>
                    <input type="text" id="login" {...register('loginField', { required: true })} onBlur={(e) => customLoginValidator(e.target.value)} />
                    {errors.loginField && <div>Login ma nie dozwoloną nazwę</div>}
                </div>
                <div>
                    <label id="password">Hasło</label>
                    <input type="password" id="password" {...register('passwordField', { required: true })} />
                </div>
                <button id="login-btn" disabled={!isValid || isLogging}>Zaloguj</button>
            </form>
        </div>
    );
};

export default LoginView;