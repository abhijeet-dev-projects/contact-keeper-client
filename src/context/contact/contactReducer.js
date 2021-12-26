import {
    ADD_CONTACT,
    DELETE_CONTACT,
    SET_CURRENT,
    CLEAR_CURRENT,
    UPDATE_CONTACT,
    FILTER_CONTACTS,
    GET_CONTACTS,
    CLEAR_CONTACTS,
    CLEAR_FILTER
} from '../types';

const contactReducer = (state, action) => {

    switch (action.type) {
        case GET_CONTACTS:
            return {
                ...state,
                contacts: action.payload,
                loading: false
            };

        case CLEAR_CONTACTS:
            return {
                ...state,
                contacts: null,
                loading: true,
                filtered: null,
                current: null
            }    

        case ADD_CONTACT:
            return {
                ...state,
                contacts: [
                    action.payload,
                    ...state.contacts
                ],
                loading: false
            };

        case UPDATE_CONTACT:
            return {
                ...state,
                contacts: state.contacts.map(contact => {
                    return contact._id === action.payload._id ? action.payload : contact
                }),
                loading: false
            }

        case DELETE_CONTACT:
            {

                const newContactListAfterDelete = [...state.contacts].filter(contact => {
                    return contact._id !== action.payload;
                });

                return {
                    ...state,
                    contacts: newContactListAfterDelete,
                    loading: false
                }
            }

        case FILTER_CONTACTS: {
            const text = new RegExp(`${action.payload}`,'gi');

            return {
                ...state,
                filtered: state.contacts.filter(contact => {
                    return contact.name.match(text) || contact.email.match(text)
                })
            }
        }    

        case SET_CURRENT:
            return {
                ...state,
                current: action.payload
            }

        case CLEAR_CURRENT:
            return {
                ...state,
                current: null
            }

        default:
            return state;

    }

}

export default contactReducer;
