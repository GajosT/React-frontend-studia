import { useEffect, useState } from 'react';
import { Czytelnik } from '../../types/czytelnik/czytelnik';
import { Button as AntButton, Row, Col, Form, Input, Table, Collapse } from 'antd';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const { Panel } = Collapse;

export const Czytelnicy = () => {


    const { t } = useTranslation();
    const [listaCzytelnikow, setListaCzytelnikow] = useState<Czytelnik[]>([]);

    useEffect(() => {
        const listaCzytelnikowPobranaZAPI: Czytelnik[] = [
            {
                numerKartyBibliotecznej: "1111-1111-1111",
                imie: "Herbert",
                nazwisko: "West",
                dataRejestracji: "11.01.2021",
                numerTelefonu: "111111111",
                email: "west@email.com",
                liczbaWypozyczonychKsiazek: 1
            },
            {
                numerKartyBibliotecznej: "2222-2222-2222",
                imie: "Randolph",
                nazwisko: "Carter",
                dataRejestracji: "22.02.2022",
                numerTelefonu: "222222222",
                email: "r.carter@email.com",
                liczbaWypozyczonychKsiazek: 2
            },
            {
                numerKartyBibliotecznej: "3333-3333-3333",
                imie: "Gustaf",
                nazwisko: "Johansen",
                dataRejestracji: "13.02.2022",
                numerTelefonu: "333333333",
                email: "gus.johansen@email.com",
                liczbaWypozyczonychKsiazek: 3
            },
            {
                numerKartyBibliotecznej: "4444-4444-4444",
                imie: "Thomas",
                nazwisko: "Olney",
                dataRejestracji: "24.04.2024",
                numerTelefonu: "444444444",
                email: "ol.ney@email.com",
                liczbaWypozyczonychKsiazek: 4
            },
            {
                numerKartyBibliotecznej: "5555-5555-5555",
                imie: "Ward",
                nazwisko: "Philips",
                dataRejestracji: "15.05.2021",
                numerTelefonu: "555555555",
                email: "philips.w@email.com",
                liczbaWypozyczonychKsiazek: 5
            }
        ];
        setListaCzytelnikow(listaCzytelnikowPobranaZAPI);
    }, []);

    const columns = [
        {
            title: t('library_card_number'),
            dataIndex: 'numerKartyBibliotecznej',
            key: 'numerKartyBibliotecznej',
        },
        {
            title: t('first_name'),
            dataIndex: 'imie',
            key: 'imie',
        },
        {
            title: t('last_name'),
            dataIndex: 'nazwisko',
            key: 'nazwisko',
        },
        {
            title: t('registration_date'),
            dataIndex: 'dataRejestracji',
            key: 'dataRejestracji',
        },
        {
            title: t('phone_number'),
            dataIndex: 'numerTelefonu',
            key: 'numerTelefonu',
        },
        {
            title: t('email_address'),
            dataIndex: 'email',
            key: 'email',
        },
        {
            title: t('number_of_borrowed_books'),
            dataIndex: 'liczbaWypozyczonychKsiazek',
            key: 'liczbaWypozyczonychKsiazek',
        },
    ];

    return (
        <div className="py-3">
            <h4 className="text-center">{t('readers_list')}</h4>
            <Collapse accordion>
                <Panel key="filters" header={t('filters')}>
                    <Form>
                        <Row gutter={16}>
                            <Col span={6}>
                                <Form.Item label={t('search_by_card_number')}>
                                    <Input type="text" />
                                </Form.Item>
                            </Col>
                            <Col span={6}>
                                <Form.Item label={t('search_by_first_name')}>
                                    <Input type="text" />
                                </Form.Item>
                            </Col>
                            <Col span={6}>
                                <Form.Item label={t('search_by_last_name')}>
                                    <Input type="text" />
                                </Form.Item>
                            </Col>
                            <Col span={6}>
                                <Form.Item label={t('search_by_registration_date')}>
                                    <Input type="text" />
                                </Form.Item>
                            </Col>
                        </Row>
                        <Row gutter={16}>
                            <Col span={12}>
                                <Form.Item label={t('search_by_email')}>
                                    <Input type="text" />
                                </Form.Item>
                            </Col>
                            <Col span={12}>
                                <Form.Item label={t('search_by_borrowed_books')}>
                                    <Input type="text" />
                                </Form.Item>
                            </Col>
                        </Row>
                    </Form>
                </Panel>
            </Collapse>
            <Table bordered
                columns={columns}
                dataSource={listaCzytelnikow}
                rowKey="numerKartyBibliotecznej"
            />

            <Form>
                <Row>
                    <Col xs="auto" className="pb-2">
                        <AntButton type="primary" className="button">
                            <Link to="/czytelnik" className="d-block">{t('add_reader')}</Link>
                        </AntButton>{' '}
                    </Col>
                </Row>
            </Form>
        </div>
    );
};
