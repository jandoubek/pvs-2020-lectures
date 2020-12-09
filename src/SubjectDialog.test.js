import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import SubjectDialog from "./SubjectDialog";


test('SubjectDialog renders and shows subject info', () => {
    const testSubject = {
        kod: "PVS",
        nazev: "Průmyslový vývoj software",

        anotace: "Super anotace.",
        osnova: "Super osnova.",
        osnova_cv: "Super osnova cvičení.",
        pozadavky: "Super požadavky.",
        cile: "Super cíle.",

        // katedra: "Tamta katedra",
        // vyucujici: "Doubek",
    }
    render(<SubjectDialog subject={testSubject} />);

    let element = screen.getByText(/PVS/);
    expect(element).toBeVisible();

    element = screen.getByText(/Průmyslový vývoj software/);
    expect(element).toBeVisible();

    element = screen.getByText(testSubject.anotace);
    expect(element).toBeVisible();

    element = screen.getByText(testSubject.osnova);
    expect(element).toBeVisible();

    element = screen.getByText(testSubject.osnova_cv);
    expect(element).toBeVisible();

    element = screen.getByText(testSubject.pozadavky);
    expect(element).toBeVisible();

    element = screen.getByText(testSubject.cile);
    expect(element).toBeVisible();
});
