import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom'
import LengthSlider from "./LengthSlider";
import {parseLength} from "./utility";
import {maxlength} from "./constants";

test('LengthSlider renders text', ()=>{
    render(<LengthSlider />);
    const linkElement = screen.getByText("Délka:");
    expect(linkElement).toBeVisible();
});

test('parseLength default behavior',()=>{
    const ans = parseLength();
    expect(ans).toEqual([1, maxlength]);
});

test('parseLength general behavior',()=>{
    const testString = "15-241";
    const ans = parseLength(testString);
    expect(ans).toEqual([15,241]);
});