import {selectedSubjects} from "./reducers";
import {TOGGLE_SUBJECT} from "./actions";


describe('selected subjects reducer', () => {
    it('should return the initial state', () => {
        expect(selectedSubjects(undefined, {})).toEqual(new Set());
    });

    it('should handle TOGGLE_SUBJECT', () => {
        expect(selectedSubjects(new Set (), {
                type: TOGGLE_SUBJECT,
                subjectId: 'PVS'})
        ).toEqual(new Set(['PVS']));

        expect(selectedSubjects(new Set(['PVS']),
                {
                    type: TOGGLE_SUBJECT,
                    subjectId: 'PVS'})
        ).toEqual(new Set([]));
    });
});
