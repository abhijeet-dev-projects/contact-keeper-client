import React, {useContext, Fragment, useEffect} from 'react';
import {TransitionGroup, CSSTransition} from 'react-transition-group';

import ContactItem from './ContactItem';

import ContactContext from '../../context/contact/contactContext';

const Contacts = () => {

    const contactContext = useContext(ContactContext);
    const {contacts, filtered, getContacts, loading} = contactContext;

    useEffect(() => {
      getContacts();
        //eslint-disable-next-line
    }, []);

    if (contacts!== null && contacts.length === 0 && !loading) {
        return <h4>Please add a contact</h4>
    }

    return (
        <Fragment>
            {
                contacts ? (<TransitionGroup> {
                    filtered ? (filtered.map((contact) => {
                        return <CSSTransition key={
                                contact._id
                            }
                            timeout={500}
                            classNames="item">
                            <ContactItem contact={contact}/>
                        </CSSTransition>
    
    
                })) : (contacts.map((contact) => {
                    return <CSSTransition key={
                            contact._id
                        }
                        timeout={500}
                        classNames="item">
                        <ContactItem contact={contact}/>
                    </CSSTransition>
            }))
                } </TransitionGroup>) : 'Loading Contacts...' 
            }
        </Fragment>
    );
}

export default Contacts;
