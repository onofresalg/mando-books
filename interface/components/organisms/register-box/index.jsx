import React, { useState } from 'react'
import { css } from '@emotion/css'
import {
    Card,
    CardContent,
    Typography,
    CardActions,
    Button
} from '@material-ui/core'
import Alert from '@material-ui/lab/Alert'
import { Input } from '../../atoms/input';
import ApiClient from '../../../services/client/api';
import Auth from '../../../services/auth';
import { ReCaptcha } from '../../atoms/recaptcha';

const style = css `
    margin: 0 auto;
    padding: 20px 0;
    width: 400px;
    .card {
        width: 100%;
    }
    .form-control {
        margin: 10px 0;
    }

    .action {
        width: inherit;
        margin-left: auto;
    }
`;

const apiClient = new ApiClient();

export const RegisterBox = () => {
    const [name, setName] = useState(null);
    const [email, setEmail] = useState(null);
    const [password, setPassword] = useState(null);
    const [passwordConfirmation, setPasswordConfirmation] = useState(null);
    const [passwordError, setPasswordError] = useState(null);
    const [errorMessage, setErrorMessage] = useState(null);
    const onSubmitForm = async (event) => {
        event.preventDefault();
        if (password !== passwordConfirmation) {
            setPasswordError('As senhas não são iguais');
        }

        const result = await apiClient.register({
            name,
            email,
            password
        })
        if (result.error) {
            setErrorMessage(result.message)
            return;
        }

        Auth.login(result)
        window.location.href = '/'
    }
    return (
        <form className={style} onSubmit={onSubmitForm} id="register-form">
            <Card className="card">
                <CardContent>
                    <Typography variant="h5" component="h2">
                        Crie uma nova conta
                    </Typography>
                    <Input id="name" label="Nome" value={name} onChange={setName} />
                    <Input id="email" label="E-mail" value={email} type="email" onChange={setEmail} />
                    <Input
                        error={!!passwordError}
                        helperText={passwordError}
                        id="password"
                        label="Senha"
                        inputProps={{minLength:8}}
                        value={password}
                        type="password"
                        onChange={setPassword}
                    />
                    <Input
                        error={!!passwordError}
                        helperText={passwordError}
                        id="password-confirmation"
                        inputProps={{minLength:8}}
                        label="Confirme sua Senha"
                        value={passwordConfirmation}
                        type="password"
                        onChange={setPasswordConfirmation}
                    />
                    {errorMessage && <Alert severity="error">{errorMessage}</Alert>}
                    <ReCaptcha />
                    <CardActions>
                        <div className="action">
                            <Button href={`/login`} component="a" size="small" color="default">
                                Já tem conta? Faça seu login
                            </Button>
                            <Button color="primary" variant="contained" type="submit">
                                Registre
                            </Button>
                        </div>
                    </CardActions>
                </CardContent>
            </Card>
        </form>
    );
}
