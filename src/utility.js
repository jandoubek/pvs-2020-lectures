import {maxcredits, maxlength, timeMarks} from "./constants";

const twoElementParser = (parsedString, maxvalue) => {
    if (!parsedString) return [1, maxvalue];
    let re = new RegExp("([0-9]+)-([0-9]+)");
    let match = parsedString.match(re);
    return [match[1], match[2]].map(letter => parseInt(letter));
}

const parseCredits = (creditsString) => {
    return twoElementParser(creditsString, maxcredits)
}

const parseLength = (lengthString) => {
    return twoElementParser(lengthString, maxlength)
}

//TODO refactor into twoElementParser
const parseTime = (timeString) => {
    if (!timeString) {
        const minvalue = timeMarks[0].value;
        const maxvalue = timeMarks[timeMarks.length - 1].value;
        return [minvalue, maxvalue];
    }
    return twoElementParser(timeString, null);
};

export {parseCredits, parseLength, parseTime}