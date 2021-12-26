import React, {Fragment, useContext, useEffect} from 'react';

import Contacts from '../contacts/Contacts';
import ContactForm from '../contacts/ContactForm';
import ContactFilter from '../contacts/ContactFilter';

import AuthContext from '../../context/auth/authContext';

import '../../App.css';

const Home = () => {

    const authContext = useContext(AuthContext);
    const {userLoaded} = authContext;

    useEffect(() => {
        userLoaded();

        // eslint-disable-next-line
    }, []);

    return (<div className='grid-2'>
        <div><ContactForm/></div>
        <div>
            <ContactFilter/>
            <Contacts/>
        </div>
    </div>);
}

export default Home;
