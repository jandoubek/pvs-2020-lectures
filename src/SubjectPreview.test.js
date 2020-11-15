import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom'
import SubjectPreview from "./SubjectPreview";

/** Assigned to Jan */
/** TODO je tady nějaký záhadný error v PropTypes, mám tušení, že je to kvůli SubjectDialog, mát ho asi takhle jako
 * child SubjectPreview je pravděpodobně dost hroznej antipattern a bude se muset pořádně vyřešit
 */

test('SubjectPreview renders code', () => {
  const testSubject = {
    length: "2",
    day: 0,
    lecturer: "Doubek",
    code: "PVS",
  }
  render(<SubjectPreview subject={testSubject} />);

  let linkElement = screen.getByText(/PVS/i);
  expect(linkElement).toBeVisible();

  linkElement = screen.getByText(/Doubek/i);
  expect(linkElement).toBeVisible();

  linkElement = screen.getByText(/pondělí/i);
  expect(linkElement).toBeVisible();
});
