import React, { useContext } from 'react';

import ContactContext from '../../context/contact/contactContext';

const ContactFilter = () => {

    const contactContext = useContext(ContactContext);

    const {filterContacts} = contactContext;

    const onChange = e => {
        filterContacts(e.target.value);
    }

    return (
        <div>
            <input type="text" placeholder="Filter contacts..." onChange={onChange}/>
        </div>
    );
}

export default ContactFilter;
