import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom'
import SubjectPreview from "./SubjectPreview";


test('SubjectPreview renders code', () => {
    const testSubject = {
        kod: "PVS",
        nazev: "Průmyslový vývoj software",
        anotace: "Super anotace.",

        kredity: 3,
        rozsah: "4+2",
        zpuszak: "Z,ZK",

        // vyucujici: "Doubek",
        // time: "11:30",
        // day: 0,
    }
    render(<SubjectPreview subject={testSubject} />);

    let element = screen.getByText(testSubject.kod);
    expect(element).toBeVisible();

    element = screen.getByText(testSubject.nazev);
    expect(element).toBeVisible();

    element = screen.getByText(testSubject.anotace);
    expect(element).toBeVisible();

    element = screen.getByText("3 kr");
    expect(element).toBeVisible();

    element = screen.getByText("4+2 h");
    expect(element).toBeVisible();

    element = screen.getByText("z zk");
    expect(element).toBeVisible();
});
