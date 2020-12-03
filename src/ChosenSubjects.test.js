import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom'
import {ChosenSubjects} from "./ChosenSubjects";
import React from "react";

/**Assigned to Hynek */
test('ChosenSubjects renders text', () => {
  render(<ChosenSubjects subjects={[{lecturer: 'Virius'}]} />);
  const linkElement = screen.getByText(/Virius/i);
  expect(linkElement).toBeVisible();
});
