import React, { BaseSyntheticEvent, useState } from 'react';
import { SubmitHandler, Validate, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { useCurrentState } from '../providers/CurrentStateProvider';
import { useUserRepository } from '../providers/UserRepositoryProvider';
import TitleComponent from '../components/TitleComponent';

type LoginFormFields = {
    loginField: string,
    passwordField: string
}

const LoginView = () => {
    const { register, handleSubmit, formState: { errors, isValid }, setError, clearErrors } = useForm<LoginFormFields>();
    const [isLogging, setIsLogging] = useState(false);
    const navigate = useNavigate();
    const currentState = useCurrentState();
    const userRepository = useUserRepository();
    const forbiddenUsernames = ['root', 'bot'];

    const onSubmit: SubmitHandler<LoginFormFields> = async (data: LoginFormFields, event?: BaseSyntheticEvent<object, any, any>) => {
        event?.preventDefault()
        setIsLogging(true);
        const login = document.getElementById('login') as HTMLInputElement;
        const password = document.getElementById('password') as HTMLInputElement;

        if (!isValid) return;

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
            <style>
                {`
                    body {
                        font-family: 'Arial', sans-serif;
                        background-color: #f4f4f4;
                        margin: 0;
                    }
                    
                    #login-box {
                        max-width: 400px;
                        margin: 50px auto;
                        background-color: #fff;
                        padding: 20px;
                        border-radius: 5px;
                        box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
                    }
                    
                    header {
                        text-align: center;
                    }
                    
                    input {
                        width: 100%;
                        padding: 8px;
                        box-sizing: border-box;
                    }
                    
                    button {
                        background-color: #4caf50;
                        color: #fff;
                        padding: 10px;
                        border: none;
                        border-radius: 3px;
                        cursor: pointer;
                        width: 100%;
                        margin-top: 20px;
                    }
                    
                    button:hover {
                        background-color: #45a049;
                    }
                `}
            </style>
            <header>
                <TitleComponent title='Logowanie' />
            </header>
            <form id="login-box" onSubmit={handleSubmit(onSubmit)}>
                <div>
                    <label>Login</label>
                    <input type="text" id="login" {...register('loginField', {
                        required: "Login jest wymagany",
                        minLength: { value: 3, message: "Minimalna długość to 3 znaki" },
                        maxLength: { value: 20, message: "Maksymalna długość to 20 znaków" },
                        validate: (value: string) => !forbiddenUsernames.includes(value) || "Login ma niedozwoloną nazwę"
                    })} />
                    {errors.loginField && <span>{errors.loginField?.message}</span>}
                </div>
                <div>
                    <label>Hasło</label>
                    <input type="password" id="password" {...register('passwordField', {
                        required: "Hasło jest wymagane",
                        minLength: { value: 3, message: "Minimalna długość to 3 znaki" },
                        maxLength: { value: 20, message: "Maksymalna długość to 20 znaków" }
                    })} />
                    {errors.passwordField && <span>{errors.passwordField?.message}</span>}
                </div>
                <button id="login-btn" disabled={isLogging}>Zaloguj</button>
                {(errors.loginField || errors.passwordField) && <span>Nie spełnia wymagań</span>}
            </form>
        </div >
    );
};

export default LoginView;