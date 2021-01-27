import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom'
import TimeSlider from "./TimeSlider";
import {parseTime} from "./utility";
import {timeMarks} from "./constants";

test('TimeSlider renders text', ()=>{
    const defaulttime = [timeMarks[0].value, timeMarks[timeMarks.length - 1].value];
    render(<TimeSlider defaultvalues={defaulttime}/>);
    const linkElement = screen.getByText("11:30");
    expect(linkElement).toBeVisible();
});

test('parseTime default behavior',()=>{
    const ans = parseTime();
    expect(ans).toEqual([timeMarks[0].value, timeMarks[timeMarks.length - 1].value]);
});

test("parseTime general behavior", ()=>{
    const testString = "17-231";
    const ans = parseTime(testString);
    expect(ans).toEqual([17,231]);
});