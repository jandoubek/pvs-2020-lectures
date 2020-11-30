import { render, screen } from '@testing-library/react';
import CreditsSlider from "./CreditsSlider";
import '@testing-library/jest-dom'
import {parseCredits} from "./utility";
import {maxcredits} from "./constants";

test('CreditsSlider renders text', () => {
  render(<CreditsSlider />);
  const linkElement = screen.getByText("Počet kreditů:");
  expect(linkElement).toBeVisible();
});

test('parseCredits default', () => {
  const ans = parseCredits();
  expect(ans).toEqual([1, maxcredits]);
});

test('parseCredits general', ()=>{
  const testString = "13-243";
  const ans = parseCredits(testString);
  expect(ans).toEqual([13,243]);
});
