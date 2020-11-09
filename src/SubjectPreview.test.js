import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom'
import SubjectPreview from "./SubjectPreview";

/** Assigned to Jan */
/** TODO je tady nějaký záhadný error v PropTypes, mám tušení, že je to kvůli SubjectDialog, mát ho asi takhle jako
 * child SubjectPreview je pravděpodobně dost hroznej antipattern a bude se muset pořádně vyřešit
 */

test('SubjectPreview renders code', () => {
  render(<SubjectPreview subject={{code: "PVS"}} />);
  const linkElement = screen.getByText(/PVS/i);
  expect(linkElement).toBeVisible();
});
