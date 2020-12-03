import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom'
import ChosenSubjects from "./ChosenSubjects";

/**Assigned to Hynek */
test('ChosenSubjects renders text', () => {
  render(<ChosenSubjects />);
  const linkElement = screen.getByText(/Virius/i);
  expect(linkElement).toBeVisible();
});
