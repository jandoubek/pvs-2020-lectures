import {TOGGLE_SUBJECT, toggleSubject} from "./actions";

describe('actions', () => {
    it('should create an action to toggle a subject selection', () => {
        const subjectId = 'PVS';
        const expectedAction = {
            type: TOGGLE_SUBJECT,
            subjectId
        };
        expect(toggleSubject(subjectId)).toEqual(expectedAction);
    });
});