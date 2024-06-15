import { Ksiazka } from "../../types/ksiazka/ksiazka"

type KsiazkaProps = {
    ksiazka: Ksiazka
}

export const KsiazkaItem = (props: KsiazkaProps) => {
    const { ksiazka } = props;
    return (
        <tr>
            <td>{ksiazka.tytul}</td>
            <td>{ksiazka.autor}</td>
            <td>{ksiazka.numerisbn}</td>
            <td>{ksiazka.wydawnictwo}</td>
            <td>{ksiazka.rokWydania}</td>
            <td>{ksiazka.gatunek}</td>
            <td>{ksiazka.statusWypozyczenia}</td>
            <td>{ksiazka.dataWypozyczenia}</td>
            <td>{ksiazka.dataOddania}</td>
        </tr>
    )
}