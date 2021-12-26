import React, {useReducer} from 'react';

import AlertContext from './alertContext';
import alertReducer from './alertReducer';

import {SET_ALERT, REMOVE_ALERT} from '../types';

const AlertState = props => {

    const initialState = [];

    const [state, dispatch] = useReducer(alertReducer, initialState);

    const setAlert = (msg, type) => {

        const id = ((Math.random()) * 1000).toString();

        dispatch({
            type: SET_ALERT,
            payload: {
                id,
                msg,
                type
            }
        })

        setTimeout(() => dispatch({type: REMOVE_ALERT, payload: id}), 3000);
    }

    return (<AlertContext.Provider value={
        {
            alerts: state,
            setAlert
        }
    }> {
        props.children
    } </AlertContext.Provider>)

}

export default AlertState;
