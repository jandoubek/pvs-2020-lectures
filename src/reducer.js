import { combineReducers } from "redux";
import subjectsJSON from "./data/predmety.json";

const subjects = (state = subjectsJSON, action) => {
    switch (action.type) {
        default:
            return state;
    }
};

const selectedSubjects = (state = [], action) => {
    switch (action.type) {
        default:
            return state;
    }
};

export default combineReducers({ subjects, selectedSubjects });
