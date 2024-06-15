import { Czytelnik } from "../../types/czytelnik/czytelnik"

type CzytelnikProps = {
    czytelnik: Czytelnik
}

export const CzytelnikItem = (props: CzytelnikProps) => {
    const { czytelnik } = props;
    return (
        <tr>
            <td>{czytelnik.numerKartyBibliotecznej}</td>
            <td>{czytelnik.imie}</td>
            <td>{czytelnik.nazwisko}</td>
            <td>{czytelnik.dataRejestracji}</td>
            <td>{czytelnik.numerTelefonu}</td>
            <td>{czytelnik.email}</td>
            <td>{czytelnik.liczbaWypozyczonychKsiazek}</td>
        </tr>
    )
}