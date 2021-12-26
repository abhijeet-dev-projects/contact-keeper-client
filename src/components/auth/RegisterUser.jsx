import React, {useState, useContext, useEffect} from 'react';
import AlertContext from '../../context/alert/alertContext';
import AuthContext from '../../context/auth/authContext';

const RegisterUser = (props) => {

    const alertContext = useContext(AlertContext);
    const authContext = useContext(AuthContext);

    const {register, error, clearErrors, isAuthenticated} = authContext;

    useEffect(() => {

        if (isAuthenticated) {
            props.history.push('/');
        }

        if (error === 'user already exists') {
            alertContext.setAlert(error, 'danger');
            clearErrors();
        }

        //eslint-disable-next-line

    }, [error, isAuthenticated]);

    const [user, setUser] = useState({name: '', email: '', password: '', password2: ''});

    const {name, email, password, password2} = user;

    const onChange = e => {
        setUser({
            ...user,
            [e.target.name]: e.target.value
        });
    }

    const onSubmit = e => {
        e.preventDefault();
        if (name === '' || email === '' || password === '' || password2 === '') {
            return alertContext.setAlert('Please fill all the fields', 'danger')
        }

        if (password !== password2) {
            return alertContext.setAlert('Passwords do not match', 'danger')
        }

        register({name, email, password});
    }

    return (<div className='form-container'>
        <h1>
            Account<span className='text-primary'> {' Register'}</span>
        </h1>
        <form onSubmit={onSubmit}>
            <div className="form-group">
                <label htmlFor="name">Name</label>
                <input type="text" name="name"
                    value={name}
                    onChange={onChange}
                    required/>
            </div>
            <div className="form-group">
                <label htmlFor="email">Email</label>
                <input type="text" name="email"
                    value={email}
                    onChange={onChange}
                    required/>
            </div>
            <div className="form-group">
                <label htmlFor="password">Password</label>
                <input type="password" name="password"
                    value={password}
                    onChange={onChange}
                    required
                    minLength='6'/>
            </div>
            <div className="form-group">
                <label htmlFor="password2">Confirm Password</label>
                <input type="password" name="password2"
                    value={password2}
                    onChange={onChange}
                    required
                    minLength='6'/>
            </div>
            <button type="submit" className="btn btn-primary btn-block">Register User</button>
        </form>
    </div>);
}

export default RegisterUser;
