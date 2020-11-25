import {maxcredits, maxlength} from "./constants";

const parseCredits = (creditsString) => {
    if (!creditsString) return [1, maxcredits];
    let re = new RegExp("([0-9]+)-([0-9]+)");
    let match = creditsString.match(re);
    return [match[1], match[2]].map(letter => parseInt(letter));
}

//TODO: make this one function with parseCredits
const parseLength = (lengthString) => {
    if(!lengthString) return [1, maxlength];
    let re = new RegExp("([0-9]+)-([0-9]+)");
    let match = lengthString.match(re);
    return [match[1], match[2]].map(letter=>parseInt(letter));
}

export {parseCredits, parseLength}