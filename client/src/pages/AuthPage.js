import React from "react"
import { useHttp } from './../hooks/http.hooks';

export const AuthPage = () => {
    const { loading, request } = useHttp()
    const [form, setForm] = React.useState({ email: '', password: '' })

    const changeHandler = e => {
        setForm({ ...form, [e.target.name]: e.target.value })
    }

    const registerHandler = async () => {
        try {
            const data = await request('api/auth/register', 'POST', { ...form })
            console.log('Data', data);
        } catch (e) { }
    }

    return (
        <div className="row">
            <div className="col s6 offset-s3">
                <h1>Скоротити силку</h1>
                <div className="card blue darken-1">
                    <div className="card-content white-text">
                        <span className="card-title">Авторизація</span>
                        <div>
                            <div className="input-field">
                                <input
                                    placeholder="Введіть email"
                                    id="email"
                                    type="text"
                                    name="email"
                                    className="yellow-input"
                                    onChange={changeHandler}
                                />
                                <label htmlFor="email">Email</label>
                            </div>

                            <div className="input-field">
                                <input
                                    placeholder="Введіть пароль"
                                    id="password"
                                    type="password"
                                    name="password"
                                    className="yellow-input"
                                    onChange={changeHandler}
                                />
                                <label htmlFor="password">Пароль</label>
                            </div>

                        </div>
                    </div>
                    <div className="card-action">
                        <button className="btn yellow darken-4" style={{ marginRight: '10px' }} disabled={loading}>Війти</button>
                        <button className="btn grey lighten-1 black-text" onClick={registerHandler} disabled={loading}>Зареєстуватися</button>
                    </div>
                </div>
            </div>
        </div>
    )
}