import { useEffect, useState } from 'react';
import { Pracownik } from '../../types/pracownik/pracownik';
import { Link } from 'react-router-dom';
import { Button as AntButton, Row, Col, Collapse, Form, Input, Table } from 'antd';
import { useTranslation } from 'react-i18next';
import Select from 'react-select';

const { Panel } = Collapse;


export const Pracownicy = () => {
    const { t } = useTranslation();

    const [listaPracownikow, setListaPracownikow] = useState<Pracownik[]>([]);

    useEffect(() => {
        const listaPracownikowPobranaZAPI: Pracownik[] = [
            {
                imie: "Jan",
                nazwisko: "Kowalski",
                stanowisko: "Bibliotekarz",
                rodzajUmowy: "Umowa zlecenie",
                numerTelefonu: "111111111",
                email: "kowalski@email.pl"
            },
            {
                imie: "Andrzej",
                nazwisko: "Nowak",
                stanowisko: "Pracownik działu administracyjnego",
                rodzajUmowy: "Umowa na czas nieokreślony",
                numerTelefonu: "222222222",
                email: "andrzejnowak@email.pl"
            },
            {
                imie: "Mateusz",
                nazwisko: "Kowalski",
                stanowisko: "Bibliotekarz",
                rodzajUmowy: "Umowa na okres próbny",
                numerTelefonu: "333333333",
                email: "m.kowalski@email.pl"
            },
            {
                imie: "Maciej",
                nazwisko: "Klinika",
                stanowisko: "Konserwator",
                rodzajUmowy: "Umowa na czas określony",
                numerTelefonu: "444444444",
                email: "klinikamaciej@email.pl"
            },
            {
                imie: "Tom",
                nazwisko: "Brzoza",
                stanowisko: "Pracownik działu administracyjnego",
                rodzajUmowy: "Umowa zlecenie",
                numerTelefonu: "555555555",
                email: "brzoza.tom@email.pl"
            }
        ];
        setListaPracownikow(listaPracownikowPobranaZAPI);
    }, []);

    const columns = [
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
            title: t('position'),
            dataIndex: 'stanowisko',
            key: 'stanowisko',
        },
        {
            title: t('contract_type'),
            dataIndex: 'rodzajUmowy',
            key: 'rodzajUmowy',
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
    ];

    return (
        <div className="py-3">
            <h4 className="text-center">{t('employee_list')}</h4>
            <Collapse accordion>
                <Panel key="filters" header={t('filters')}>
                    <Form>
                        <Row gutter={16}>
                            <Col span={8}>
                                <Form.Item label={t('search_by_first_name')}>
                                    <Input type="text" />
                                </Form.Item>
                            </Col>
                            <Col span={8}>
                                <Form.Item label={t('search_by_last_name')}>
                                    <Input type="text" />
                                </Form.Item>
                            </Col>
                            <Col span={8}>
                                <Form.Item label={t('search_by_email')}>
                                    <Input type="text" />
                                </Form.Item>
                            </Col>
                        </Row>
                        <Row gutter={16}>
                            <Col span={12}>
                                <Form.Item label={t('search_by_position')}>
                                    <Select
                                        options={[
                                            { value: "", label: t("select") },
                                            { value: "1", label: t("director") },
                                            { value: "2", label: t("deputy_director") },
                                            { value: "3", label: t("librarian") },
                                            { value: "4", label: t("cataloging_specialist") },
                                            { value: "5", label: t("technical_department_employee") },
                                            { value: "6", label: t("promotion_marketing_specialist") },
                                            { value: "7", label: t("archivist") },
                                            { value: "8", label: t("administrative_department_employee") },
                                            { value: "9", label: t("conservator") }
                                        ]}
                                        isClearable
                                    />
                                </Form.Item>
                            </Col>
                            <Col span={12}>
                                <Form.Item label={t('search_by_contract_type')}>
                                    <Select
                                        options={[
                                            { value: "", label: t("select") },
                                            { value: "1", label: t("permanent_contract") },
                                            { value: "2", label: t("fixed_term_contract") },
                                            { value: "3", label: t("probationary_period_contract") },
                                            { value: "4", label: t("commissioned_contract") },
                                            { value: "5", label: t("work_contract") },
                                            { value: "6", label: t("agency_contract") },
                                            { value: "7", label: t("internship_contract") }
                                        ]}
                                        isClearable
                                    />
                                </Form.Item>
                            </Col>
                        </Row>
                    </Form>
                </Panel>
            </Collapse>
            <Table
                columns={columns}
                dataSource={listaPracownikow}
                rowKey="phoneNumber"
                bordered
            />

            <Form>
                <Row>
                    <Col xs="auto" className="pb-2">
                        <AntButton type="primary" className="button">
                            <Link to="/pracownik" className="d-block">{t('add_employee')}</Link>
                        </AntButton>{' '}
                    </Col>
                </Row>
            </Form>
        </div>
    );
};
