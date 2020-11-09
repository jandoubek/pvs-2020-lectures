import { render, screen } from '@testing-library/react';
import CreditsSlider from "./CreditsSlider";
import '@testing-library/jest-dom'

/**Assigned to Dominik */
test('CreditsSlider renders text', () => {
  render(<CreditsSlider />);
  const linkElement = screen.getByText(/Zde bude slider/i);
  expect(linkElement).toBeVisible();
});
