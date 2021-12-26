import React, {useState, useContext, useEffect} from 'react';

import AlertContext from '../../context/alert/alertContext';
import AuthContext from '../../context/auth/authContext';


const LoginUser = (props) => {

    const {setAlert} = useContext(AlertContext);
    const {login, isAuthenticated, error, clearErrors} = useContext(AuthContext);

    const [user, setUser] = useState({email: '', password: ''});

    const {email, password} = user;

    useEffect(() => {
        if (isAuthenticated) {
            props.history.push('/');
        }

        if (error === 'Invalid Credentials') {
            setAlert(error, 'danger');
            clearErrors();
        }

        // eslint-disable-next-line
    }, [isAuthenticated, error]);

    const onChange = e => {
        setUser({
            ...user,
            [e.target.name]: e.target.value
        });
    }

    const onSubmit = e => {
        e.preventDefault();
        if (email.trim() === '' || password.trim() === '') {
            setAlert('Email or Password cannot be empty');
        }

        login({
            email,
            password
        });
    }

    return (<div className='form-container'>
        <h1>
            Account
            <span className='text-primary'> {' Login'}</span>
        </h1>
        <form onSubmit={onSubmit}>

            <div className="form-group">
                <label htmlFor="email">Email</label>
                <input type="text" name="email"
                    value={email}
                    onChange={onChange}/>
            </div>
            <div className="form-group">
                <label htmlFor="password">Password</label>
                <input type="password" name="password"
                    value={password}
                    onChange={onChange}/>
            </div>

            <button type="submit" className="btn btn-primary btn-block">Login User</button>
        </form>
    </div>);
}

export default LoginUser;
