import React, {useReducer} from 'react';

import axios from 'axios';

import ContactContext from './contactContext';
import contactReducer from './contactReducer';
import {
    ADD_CONTACT,
    DELETE_CONTACT,
    SET_CURRENT,
    CLEAR_CURRENT,
    UPDATE_CONTACT,
    FILTER_CONTACTS,
    CONTACT_ERROR,
    GET_CONTACTS,
    CLEAR_CONTACTS,
    CLEAR_FILTER
} from '../types';

const ContactState = props => {

    const intitialState = {
        contacts: null,
        current: null,
        filtered: null,
        loading: true
    }

    const [state, dispatch] = useReducer(contactReducer, intitialState);

    const getContacts = async () => {
        try {
            const res = await axios.get('/api/contacts');
            dispatch({
                type: GET_CONTACTS,
                payload: res.data
            });
        } catch (err) {
            dispatch({
                type: CONTACT_ERROR,
                payload: err.response.data.msg
            });
        }
    }

    const clearContacts = () => dispatch({
        type: CLEAR_CONTACTS
    });

    const addContact = async contact => {
        const config = {
            headers:{
                'Content-Type': 'application/json'
            }
        }

        try {
            const res = await axios.post('/api/contacts', contact, config);
            dispatch({type: ADD_CONTACT, payload: res.data});
        } catch (err) {
            dispatch({type: CONTACT_ERROR, payload: err.response.data.msg});      
        }
    }

    const updateContact = async contact => {
        try {
            const config = {
                headers: {
                    'Content-Type': 'application/json'
                }
            }
            const res = await axios.put(`/api/contacts/${contact._id}`, contact, config);
             dispatch({type: UPDATE_CONTACT, payload: res.data});
        } catch (err) {
            dispatch({type: CONTACT_ERROR, payload: err.response.data.msg});
        }
        
    }

    const deleteContact = async id => {
        try {
            await axios.delete(`/api/contacts/${id}`)
            dispatch({type: DELETE_CONTACT, payload: id})
        } catch (err) {
            dispatch({type: CONTACT_ERROR, payload: err.response.data.msg});
        }
        
    }

    const setCurrent = contact => {
        dispatch({type: SET_CURRENT, payload: contact})
    }

    const clearCurrent = () => {
        dispatch({type: CLEAR_CURRENT})
    }

    const filterContacts = text => {
        dispatch({type: FILTER_CONTACTS, payload: text})
    }

    return (
        <ContactContext.Provider value={
            {
                contacts: state.contacts,
                current: state.current,
                filtered: state.filtered,
                addContact,
                deleteContact,
                setCurrent,
                clearCurrent,
                updateContact,
                filterContacts,
                getContacts,
                clearContacts
            }
        }>
            {
            props.children
        } </ContactContext.Provider>
    )
}

export default ContactState;
