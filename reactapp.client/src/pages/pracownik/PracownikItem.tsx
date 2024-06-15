import { Pracownik } from "../../types/pracownik/pracownik"

type PracownikProps = {
    pracownik: Pracownik
}

export const PracownikItem = (props: PracownikProps) => {
    const { pracownik } = props;
    return (
        <tr>
            <td>{pracownik.imie}</td>
            <td>{pracownik.nazwisko}</td>
            <td>{pracownik.stanowisko}</td>
            <td>{pracownik.rodzajUmowy}</td>
            <td>{pracownik.numerTelefonu}</td>
            <td>{pracownik.email}</td>
        </tr>
    )
}