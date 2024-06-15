import { useEffect, useState } from 'react';
import { Ksiazka } from '../../types/ksiazka/ksiazka';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import Select from 'react-select';
import { Table, Button as AntButton, Row, Col, Form, Input, Radio, Collapse } from 'antd';

const { Panel } = Collapse;

export const Ksiazki = () => {
    const { t } = useTranslation();

    const [listaKsiazek, setListaKsiazek] = useState<Ksiazka[]>([]);

    useEffect(() => {
        const listaKsiazekPobranaZAPI: Ksiazka[] = [
            {
                tytul: "Wiedźmin. Ostatnie życzenie",
                autor: "Andrzej Sapkowski",
                numerisbn: "978-83-7578-063-5",
                wydawnictwo: "Supernowa",
                rokWydania: 2014,
                gatunek: "Fantastyka",
                statusWypozyczenia: "Dostępna",
                dataWypozyczenia: "",
                dataOddania: ""
            },
            {
                tytul: "Zgroza w Dunwich i inne przerażające opowieści",
                autor: "Howard Philips Lovecraft",
                numerisbn: "9788377310984",
                wydawnictwo: "Vesper",
                rokWydania: 2012,
                gatunek: "Horror",
                statusWypozyczenia: "Dostępna",
                dataWypozyczenia: "",
                dataOddania: ""
            },
            {
                tytul: "Diuna. Dziedzic Kaladanu",
                autor: "Brian Herbert, Kevin J. Anderson",
                numerisbn: "978-83-8338-033-9",
                wydawnictwo: "Rebis",
                rokWydania: 2023,
                gatunek: "Sci-Fi",
                statusWypozyczenia: "Wypożyczona",
                dataWypozyczenia: "15.04.2024",
                dataOddania: "15.06.2024"
            },
            {
                tytul: "Władca Pierścieni. Trylogia",
                autor: "J. R. R. Tolkien",
                numerisbn: "9788328724624",
                wydawnictwo: "Muza",
                rokWydania: 2023,
                gatunek: "Fantastyka",
                statusWypozyczenia: "Dostępna",
                dataWypozyczenia: "",
                dataOddania: ""
            },
            {
                tytul: "Metro 2033",
                autor: "Dmitry Glukhovsky",
                numerisbn: "978-83-67323-47-5",
                wydawnictwo: "Insignis",
                rokWydania: 2022,
                gatunek: "Fantastyka",
                statusWypozyczenia: "Wypożyczona",
                dataWypozyczenia: "23.05.2024",
                dataOddania: "24.07.2024"
            }
        ];
        setListaKsiazek(listaKsiazekPobranaZAPI);
    }, []);

    const columns = [
        {
            title: t('title'),
            dataIndex: 'tytul',
            key: 'tytul',
        },
        {
            title: t('author'),
            dataIndex: 'autor',
            key: 'autor',
        },
        {
            title: t('isbn_number'),
            dataIndex: 'numerisbn',
            key: 'numerisbn',
        },
        {
            title: t('publisher'),
            dataIndex: 'wydawnictwo',
            key: 'wydawnictwo',
        },
        {
            title: t('publication_year'),
            dataIndex: 'rokWydania',
            key: 'rokWydania',
        },
        {
            title: t('genre'),
            dataIndex: 'gatunek',
            key: 'gatunek',
        },
        {
            title: t('borrow_status'),
            dataIndex: 'statusWypozyczenia',
            key: 'statusWypozyczenia',
        },
        {
            title: t('borrow_date'),
            dataIndex: 'dataWypozyczenia',
            key: 'dataWypozyczenia',
        },
        {
            title: t('return_date'),
            dataIndex: 'dataOddania',
            key: 'dataOddania',
        },
    ];

    return (
        <div className="py-3">
            <h4 className="text-center">{t('book_list')}</h4>
            <Collapse>
                <Panel header={t('filters')} key="filters">
                    <Form layout="vertical">
                        <Row gutter={16}>
                            <Col span={6}>
                                <Form.Item label={t('search_by_title')} name="title">
                                    <Input />
                                </Form.Item>
                            </Col>
                            <Col span={6}>
                                <Form.Item label={t('search_by_author')} name="author">
                                    <Input />
                                </Form.Item>
                            </Col>
                            <Col span={6}>
                                <Form.Item label={t('search_by_genre')} name="genre">
                                    <Select
                                        options={[
                                            { label: t('fantasy'), value: t('fantasy') },
                                            { label: t('sci-fi'), value: t('sci-fi') },
                                            { label: t('romance'), value: t('romance') },
                                            { label: t('historical_fiction'), value: t('historical_fiction') },
                                            { label: t('horror'), value: t('horror') },
                                            { label: t('crime'), value: t('crime') },
                                            { label: t('thriller'), value: t('thriller') },
                                            { label: t('biography'), value: t('biography') },
                                            { label: t('reportage'), value: t('reportage') },
                                            { label: t('young_adult_novel'), value: t('young_adult_novel') },
                                            { label: t('childrens_literature'), value: t('childrens_literature') },
                                        ]}
                                        isClearable
                                    />
                                </Form.Item>
                            </Col>
                            <Col span={6}>
                                <Form.Item label={t('search_by_borrow_status')} name="borrow_status">
                                    <Radio.Group>
                                        <Radio value="available">{t('available')}</Radio>
                                        <Radio value="borrowed">{t('borrowed')}</Radio>
                                    </Radio.Group>
                                </Form.Item>
                            </Col>
                        </Row>
                        <Row gutter={16}>
                            <Col span={8}>
                                <Form.Item label={t('search_by_isbn')} name="isbn">
                                    <Input />
                                </Form.Item>
                            </Col>
                            <Col span={8}>
                                <Form.Item label={t('search_by_publisher')} name="publisher">
                                    <Input />
                                </Form.Item>
                            </Col>
                            <Col span={8}>
                                <Form.Item label={t('search_by_publication_year')} name="publication_year">
                                    <Input />
                                </Form.Item>
                            </Col>
                        </Row>
                    </Form>
                </Panel>
            </Collapse>
            <Table
                columns={columns}
                dataSource={listaKsiazek}
                rowKey="numerisbn"
                bordered
            />
            <Form>
                <Row>
                    <Col>
                        <AntButton type="primary" className="button">
                            <Link to="/book" className="d-block">{t('add_book')}</Link>
                        </AntButton>
                    </Col>
                </Row>
            </Form>
        </div>
    );
};
