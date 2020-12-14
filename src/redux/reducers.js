import { combineReducers } from "redux";
import subjectsJSON from "../data/data.json";
import { TOGGLE_SUBJECT } from "./actions";

const subjects = (state = subjectsJSON, action) => {
    switch (action.type) {
        default:
            return state;
    }
};

export const selectedSubjects = (state = new Set(), action) => {
    switch (action.type) {
        case TOGGLE_SUBJECT:
            if (state.has(action.subjectId)){
                let newState = new Set ([...state]);
                newState.delete(action.subjectId);
                return newState;
            } else {
                return new Set([...state, action.subjectId]);
            }
        default:
            return state;
    }
};

export default combineReducers({ subjects, selectedSubjects });
