import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom'
import SubjectPreview from "./SubjectPreview";


/** Assigned to Jan */
test('SubjectPreview renders code', () => {
  // TODO Add more things here as soon as SubjectPreview actually uses the data
  const testSubject = {
    code: "PVS",
    lecturer: "Doubek",

    time: "11:30",
    day: 0,
    credits: 2,
    len: "2",
  }
  render(<SubjectPreview subject={testSubject} />);

  let linkElement = screen.getByText(/PVS/i);
  expect(linkElement).toBeVisible();

  linkElement = screen.getByText(/Doubek/i);
  expect(linkElement).toBeVisible();

  linkElement = screen.getByText(/pondělí/i);
  expect(linkElement).toBeVisible();
});
