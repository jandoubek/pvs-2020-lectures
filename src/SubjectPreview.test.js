import { fireEvent, render } from "@testing-library/react";
import "@testing-library/jest-dom";
import { SubjectPreview } from "./SubjectPreview";


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
};


test("SubjectPreview renders subject data", () => {
    const {getByText} = render(<SubjectPreview subject={testSubject} />);

    expect(getByText(testSubject.nazev)).toBeVisible();
    expect(getByText(testSubject.kod)).toBeVisible();
    expect(getByText(testSubject.anotace)).toBeVisible();

    expect(getByText("3 kr")).toBeVisible();
    expect(getByText("4+2 h")).toBeVisible();
    expect(getByText("z zk")).toBeVisible();
});


test("SubjectPreview triggers callbacks", () => {
    const props = {
        subject: testSubject,
        selected: false,
        onShowMore: jest.fn(),
        onToggleSelect: jest.fn(),
    };
    const {getByText, getByRole} = render(<SubjectPreview {...props} />);

    fireEvent.click(getByText(testSubject.nazev));
    expect(props.onShowMore).toHaveBeenCalled();

    fireEvent.click(getByRole("checkbox"));
    expect(props.onToggleSelect).toHaveBeenCalled();
});
