import React, { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { useCurrentState } from '../providers/CurrentStateProvider';
import { useUserRepository } from '../providers/UserRepositoryProvider';

const LoginView = () => {
    const { register, handleSubmit, formState: { errors, isValid }, setError } = useForm();
    const [isLogging, setIsLogging] = useState(false);
    const navigate = useNavigate();
    const currentState = useCurrentState();
    const userRepository = useUserRepository();
    const forbiddenUsernames = ['root', 'bot'];

    const customLoginValidator = async (value: string) => {
        if (forbiddenUsernames.includes(value)) {
            setError('loginField', { type: 'manual', message: 'Login ma nie dozwoloną nazwę' });
        }
    };

    const onSubmit = async () => {
        setIsLogging(true);
        const login = document.getElementById('login') as HTMLInputElement;
        const password = document.getElementById('password') as HTMLInputElement;

        console.log(login);
        console.log(password);

        userRepository.getUser(login.value, password.value).then((user) => {
            console.log(user);
            if (user) {
                currentState.setCurrentUser(user);
                setIsLogging(false);
                navigate('/search');
            } else {
                alert('Niepoprawny login lub hasło');
                setIsLogging(false);
            }
        });

    };

    return (
        <div>
            <header>
                <h1>Logowanie</h1>
            </header>
            <form id="login-box" onSubmit={handleSubmit(onSubmit)}>
                <div>
                    <label>Login</label>
                    <input type="text" id="login" {...register('loginField', { required: true })} onBlur={(e) => customLoginValidator(e.target.value)} />
                    {errors.loginField && <div>Login ma nie dozwoloną nazwę</div>}
                </div>
                <div>
                    <label>Hasło</label>
                    <input type="password" id="password" {...register('passwordField', { required: true })} />
                </div>
                <button id="login-btn" disabled={!isValid || isLogging}>Zaloguj</button>
            </form>
        </div>
    );
};

export default LoginView;