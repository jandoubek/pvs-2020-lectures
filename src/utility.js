
//maximum value of credits appearing throughout the code
//TODO: automatically determine the maxcredits value from data
const maxcredits = 40;

const parseCredits = (creditsString) => {
    if (!creditsString) return [1, maxcredits];
    let re = new RegExp("([0-9]+)-([0-9]+)");
    let match = creditsString.match(re);
    return [match[1], match[2]].map(letter => parseInt(letter));
}

export {maxcredits, parseCredits}