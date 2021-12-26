import React, {useState, useContext, useEffect} from 'react';

import ContactContext from '../../context/contact/contactContext';

const ContactForm = () => {

    const contactContext = useContext(ContactContext);

    const {current} = contactContext;

    const [contact, setContact] = useState({name: '', email: '', phone: '', type: 'personal'});

    const {name, email, phone, type} = contact;

    useEffect(() => {
        if (current) {
            setContact(current);
        } else {}
    }, [contactContext, current]);

    const clearAll = e => {
        contactContext.clearCurrent();
        setContact({name: '', email: '', phone: '', type: 'personal'});
    }

    const onChange = e => {
        setContact({
            ...contact,
            [e.target.name]: e.target.value
        })
    }

    const onSubmit = e => {
        e.preventDefault();

        if (!current) {
            contactContext.addContact(contact);
        } else {
            contactContext.updateContact(contact);
        } 
        contactContext.clearCurrent();
        setContact({name: '', email: '', phone: '', type: 'personal'});
    }

    return (
        <form onSubmit={onSubmit}>
            <h2 className="text-primary">
                {
                current ? 'Edit Contact' : 'Add Contact'
            }</h2>
            <input type="text" name="name" placeholder="Name"
                value={name}
                onChange={onChange}/>
            <input type="text" name="email" placeholder="Email"
                value={email}
                onChange={onChange}/>
            <input type="text" name="phone" placeholder="Phone Number"
                value={phone}
                onChange={onChange}/>
            <h5>Contact Type</h5>
            <input type="radio" name="type" value="personal"
                checked={
                    type === 'personal'
                }
                onChange={onChange}/>{` Personal`}
            <span style={
                {marginRight: '20px'}
            }/>
            <input type="radio" name="type" value="professional"
                checked={
                    type === 'professional'
                }
                onChange={onChange}/>{' Professional'}
            <div>
                <input type="submit"
                    onChange={() => ''}
                    value={
                        current ? 'Update Contact' : 'Add Contact'
                    }
                    className="btn btn-primary btn-block"/>
            </div>
            {
            current && (
                <div>
                    <input style={
                            {textAlign: 'center'}
                        }
                        value="Clear"
                        className="btn btn-light btn-block"
                        onClick={clearAll}/>
                </div>
            )
        } </form>
    )

}

export default ContactForm;
