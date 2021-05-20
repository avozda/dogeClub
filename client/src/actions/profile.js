import api from '../utils/api';
import { setAlert } from './alert';

import {
    GET_PROFILE,
    GET_PROFILES,
    PROFILE_ERROR,
    UPDATE_PROFILE,
    CLEAR_PROFILE,
    ACCOUNT_DELETED
} from './types';

// najít profil přihlášeného uživatele
export const getCurrentProfile = () => async(dispatch) => {
    try {
        dispatch({
            type: CLEAR_PROFILE
        });
        const res = await api.get('/profile/me');

        dispatch({
            type: GET_PROFILE,
            payload: res.data
        });
    } catch (error) {
        dispatch({
            type: PROFILE_ERROR,
            payload: { msg: error.response.statusText, status: error.response.status }
        });
    }
};

// najít všechny profily
export const getProfiles = (history, search) => async(dispatch) => {


    try {
        const res = await api.get('/profile');

        dispatch({
            type: GET_PROFILES,
            payload: { profiles: res.data, search }
        });
        history.push(`/profiles/${search}`)
    } catch (error) {
        dispatch({
            type: PROFILE_ERROR,
            payload: { msg: error.response.statusText, status: error.response.status }
        });
    }
};

// najít profil podle id
export const getProfileById = (userId) => async(dispatch) => {
    try {
        dispatch({
            type: CLEAR_PROFILE
        });
        const res = await api.get(`/profile/user/${userId}`);

        dispatch({
            type: GET_PROFILE,
            payload: res.data
        });
    } catch (error) {
        dispatch({
            type: PROFILE_ERROR,
            payload: { msg: error.response.statusText, status: error.response.status }
        });
    }
};

// upravit/vytvořit profil
export const createProfile = (formData, history, edit = false) => async(
    dispatch
) => {
    try {
        const res = await api.post('/profile', formData);

        dispatch({
            type: GET_PROFILE,
            payload: res.data
        });

        dispatch(setAlert(edit ? 'Profile Updated' : 'Profile Created', 'success'));


        history.push('/');

    } catch (error) {
        const errors = error.response.data.errors;

        if (errors) {
            errors.forEach((error) => dispatch(setAlert(error.msg, 'danger')));
        }

        dispatch({
            type: PROFILE_ERROR,
            payload: { msg: error.response.statusText, status: error.response.status }
        });
    }
};

// přidat zkušenost
export const addExperience = (formData, history) => async(dispatch) => {
    try {
        const res = await api.put('/profile/experience', formData);

        dispatch({
            type: UPDATE_PROFILE,
            payload: res.data
        });

        dispatch(setAlert('Experience Added', 'success'));

        history.push('/');
    } catch (error) {
        const errors = error.response.data.errors;

        if (errors) {
            errors.forEach((error) => dispatch(setAlert(error.msg, 'danger')));
        }

        dispatch({
            type: PROFILE_ERROR,
            payload: { msg: error.response.statusText, status: error.response.status }
        });
    }
};

// přidat studium
export const addEducation = (formData, history) => async(dispatch) => {
    try {
        const res = await api.put('/profile/education', formData);

        dispatch({
            type: UPDATE_PROFILE,
            payload: res.data
        });

        dispatch(setAlert('Education Added', 'success'));

        history.push('/');
    } catch (error) {
        const errors = error.response.data.errors;

        if (errors) {
            errors.forEach((error) => dispatch(setAlert(error.msg, 'danger')));
        }

        dispatch({
            type: PROFILE_ERROR,
            payload: { msg: error.response.statusText, status: error.response.status }
        });
    }
};

// smazat zkušenost
export const deleteExperience = (id) => async(dispatch) => {
    try {
        const res = await api.delete(`/profile/experience/${id}`);

        dispatch({
            type: UPDATE_PROFILE,
            payload: res.data
        });

        dispatch(setAlert('Experience Removed', 'success'));
    } catch (error) {
        dispatch({
            type: PROFILE_ERROR,
            payload: { msg: error.response.statusText, status: error.response.status }
        });
    }
};

// smazat studium
export const deleteEducation = (id) => async(dispatch) => {
    try {
        const res = await api.delete(`/profile/education/${id}`);

        dispatch({
            type: UPDATE_PROFILE,
            payload: res.data
        });

        dispatch(setAlert('Education Removed', 'success'));
    } catch (error) {
        dispatch({
            type: PROFILE_ERROR,
            payload: { msg: error.response.statusText, status: error.response.status }
        });
    }
};

// smazat účet
export const deleteAccount = () => async(dispatch) => {
    if (window.confirm('Are you sure? This can NOT be undone!')) {
        try {
            await api.delete('/profile');

            dispatch({ type: CLEAR_PROFILE });
            dispatch({ type: ACCOUNT_DELETED });

            dispatch(setAlert('Your account has been permanently deleted', "success"));
        } catch (error) {
            dispatch({
                type: PROFILE_ERROR,
                payload: { msg: error.response.statusText, status: error.response.status }
            });
        }
    }
};