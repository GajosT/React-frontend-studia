import { useEffect, useState } from 'react';
import { Button as AntButton, Row, Col, Tabs, Form, Input, Table as AntTable } from 'antd';
import { Formik } from "formik";
import * as yup from "yup";
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { Ksiazka } from '../../types/ksiazka/ksiazka';
import { useTranslation } from 'react-i18next';
import { CountryDropdown, RegionDropdown } from 'react-country-region-selector';

const { TabPane } = Tabs;

export const Czytelnik = () => {
    const [country, setCountry] = useState('');
    const [region, setRegion] = useState('');

    const { t } = useTranslation();

    const DatePickerField = ({ name, value, onChange, isInvalid, isValid, errors }) => {
        return (
            <Form.Item validateStatus={isInvalid ? 'error' : ''} help={isInvalid && errors[name]}>
                <DatePicker
                    selected={value}
                    onChange={date => onChange(name, date)}
                    dateFormat="dd/MM/yyyy"
                    className={`form-control ${isInvalid ? 'is-invalid' : ''} ${isValid ? 'is-valid' : ''}`}
                    maxDate={new Date()}
                />
            </Form.Item>
        );
    };

    const [listaKsiazek, setListaKsiazek] = useState<Ksiazka[]>([]);

    useEffect(() => {
        const listaKsiazekPobranaZAPI: Ksiazka[] = [];
        setListaKsiazek(listaKsiazekPobranaZAPI);
    }, []);

    const schema = yup.object().shape({
        imie: yup.string()
            .min(2, t("first_name_min_length"))
            .matches(/^[A-Za-z ]*$/, t("first_name_invalid"))
            .required(t("first_name_required")),
        nazwisko: yup.string()
            .min(3, t("last_name_min_length"))
            .matches(/^[A-Za-z ]*$/, t("last_name_invalid"))
            .required(t("last_name_required")),
        dataUrodzenia: yup.date().nullable()
            .required(t("birth_date_required")),
        numerTelefonu: yup.string()
            .min(9, t("phone_number_min_length"))
            .required(t("phone_number_required"))
            .matches(/^[0-9]+$/, t("phone_number_invalid")),
        email: yup.string()
            .email(t("email_address_invalid"))
            .required(t("email_address_required")),
        numerKarty: yup.string()
            .required(t("library_card_number_required"))
            .min(7, t("library_card_number_min_length"))
            .max(15, t("library_card_number_max_length")),
        dataRejestracji: yup.date().nullable()
            .required(t("registration_date_required")),
        ulica: yup.string()
            .required(t("street_required")),
        numerDomu: yup.string()
            .required(t("house_number_required")),
        numerMieszkania: yup.string(),
        kodPocztowy: yup.string()
            .required(t("postal_code_required")),
        miejscowosc: yup.string()
            .min(4, t("city_min_length"))
            .matches(/^[A-Za-z ]*$/, t("city_invalid"))
            .required(t("city_required")),
        wojewodztwo: yup.string()
            .required(t("province_required")),
        kraj: yup.string()
            .required(t("country_required")),
    });

    const columns = [
        {
            title: t("title"),
            dataIndex: 'title',
            key: 'title',
        },
        {
            title: t("author"),
            dataIndex: 'author',
            key: 'author',
        },
        {
            title: t("isbn_number"),
            dataIndex: 'isbnNumber',
            key: 'isbnNumber',
        },
        {
            title: t("publisher"),
            dataIndex: 'publisher',
            key: 'publisher',
        },
        {
            title: t("publication_year"),
            dataIndex: 'publicationYear',
            key: 'publicationYear',
        },
        {
            title: t("genre"),
            dataIndex: 'genre',
            key: 'genre',
        },
        {
            title: t("borrowing_status"),
            dataIndex: 'borrowingStatus',
            key: 'borrowingStatus',
        },
        {
            title: t("borrow_date"),
            dataIndex: 'borrowDate',
            key: 'borrowDate',
        },
        {
            title: t("return_date"),
            dataIndex: 'returnDate',
            key: 'returnDate',
        },
    ];

    return (
        <div className="py-3">
            <Formik
                validationSchema={schema}
                onSubmit={(values) => {
                    try {
                        console.log(values);
                    } catch (error) {
                        console.error("Error submitting form:", error);
                    }
                }}
                initialValues={{
                    imie: "",
                    nazwisko: "",
                    dataUrodzenia: null,
                    numerTelefonu: "",
                    email: "",
                    numerKarty: "",
                    dataRejestracji: null,
                    ulica: "",
                    numerDomu: "",
                    numerMieszkania: "",
                    kodPocztowy: "",
                    miejscowosc: "",
                    wojewodztwo: "",
                    kraj: "",
                }}
            >
                {({ handleSubmit, handleChange, setFieldValue, values, touched, errors }) => (
                    <Form layout="vertical" onFinish={handleSubmit}>
                        <Row>
                            <Col>
                                <AntButton type="primary" htmlType="submit" className="button">{t("save")}</AntButton>{' '}
                                <AntButton type="primary" className="button">{t("cancel")}</AntButton>{' '}
                            </Col>
                        </Row>
                        <Row>
                            <Tabs defaultActiveKey="dane">
                                <TabPane key="dane" tab={t("basic_data")}>
                                    <Row gutter={16}>
                                        <Col span={5}>
                                            <Form.Item
                                                label={t("first_name")}
                                                validateStatus={touched.imie && errors.imie ? 'error' : ''}
                                                help={touched.imie && errors.imie}
                                                hasFeedback
                                            >
                                                <Input
                                                    type="text"
                                                    name="imie"
                                                    value={values.imie}
                                                    onChange={handleChange}

                                                />
                                            </Form.Item>
                                        </Col>
                                        <Col span={5}>
                                            <Form.Item
                                                label={t("last_name")}
                                                validateStatus={touched.nazwisko && errors.nazwisko ? 'error' : ''}
                                                help={touched.nazwisko && errors.nazwisko}
                                                hasFeedback
                                            >
                                                <Input
                                                    type="text"
                                                    name="nazwisko"
                                                    value={values.nazwisko}
                                                    onChange={handleChange}
                                                />
                                            </Form.Item>
                                        </Col>
                                        <Col span={4}>
                                            <Form.Item label={t("birth_date")}>
                                                <DatePickerField
                                                    name="dataUrodzenia"
                                                    value={values.dataUrodzenia}
                                                    onChange={setFieldValue}
                                                    isInvalid={touched.dataUrodzenia && !!errors.dataUrodzenia}
                                                    isValid={touched.dataUrodzenia && !errors.dataUrodzenia}
                                                    errors={errors}
                                                />
                                            </Form.Item>
                                        </Col>
                                        <Col span={5}>
                                            <Form.Item
                                                label={t("phone_number")}
                                                validateStatus={touched.numerTelefonu && errors.numerTelefonu ? 'error' : ''}
                                                help={touched.numerTelefonu && errors.numerTelefonu}
                                                hasFeedback
                                            >
                                                <Input
                                                    type="text"
                                                    name="numerTelefonu"
                                                    value={values.numerTelefonu}
                                                    onChange={handleChange}
                                                />
                                            </Form.Item>
                                        </Col>
                                        <Col span={5}>
                                            <Form.Item
                                                label={t("email_address")}
                                                validateStatus={touched.email && errors.email ? 'error' : ''}
                                                help={touched.email && errors.email}
                                                hasFeedback
                                            >
                                                <Input
                                                    type="email"
                                                    name="email"
                                                    value={values.email}
                                                    onChange={handleChange}
                                                />
                                            </Form.Item>
                                        </Col>
                                    </Row>
                                    <Row gutter={16}>
                                        <Col span={12}>
                                            <Form.Item
                                                label={t("library_card_number")}
                                                validateStatus={touched.numerKarty && errors.numerKarty ? 'error' : ''}
                                                help={touched.numerKarty && errors.numerKarty}
                                                hasFeedback
                                            >
                                                <Input
                                                    type="text"
                                                    name="numerKarty"
                                                    value={values.numerKarty}
                                                    onChange={handleChange}
                                                />
                                            </Form.Item>
                                        </Col>
                                        <Col span={12}>
                                            <Form.Item label={t("registration_date")}>
                                                <DatePickerField
                                                    name="dataRejestracji"
                                                    value={values.dataRejestracji}
                                                    onChange={setFieldValue}
                                                    isInvalid={touched.dataRejestracji && !!errors.dataRejestracji}
                                                    isValid={touched.dataRejestracji && !errors.dataRejestracji}
                                                    errors={errors}
                                                />
                                            </Form.Item>
                                        </Col>
                                    </Row>
                                </TabPane>
                                <TabPane key="adres" tab={t("residential_address")}>
                                    <Row gutter={250}>
                                        <Col span={8}>
                                            <Form.Item
                                                label={t("country")}
                                                validateStatus={touched.kraj && errors.kraj ? 'error' : ''}
                                                help={touched.kraj && errors.kraj}
                                            >
                                                <div className={touched.kraj && errors.kraj ? 'is-invalid' : ''}>
                                                    <CountryDropdown
                                                        value={country}
                                                        onChange={(val) => {
                                                            setCountry(val);
                                                            setFieldValue('kraj', val);
                                                        }}
                                                        className="country-dropdown"
                                                    />
                                                </div>
                                            </Form.Item>
                                        </Col>
                                        <Col span={8}>
                                            <Form.Item
                                                label={t("province")}
                                                validateStatus={touched.wojewodztwo && errors.wojewodztwo ? 'error' : ''}
                                                help={touched.wojewodztwo && errors.wojewodztwo}
                                            >
                                                <div className={touched.wojewodztwo && errors.wojewodztwo ? 'is-invalid' : ''}>
                                                    <RegionDropdown
                                                        country={country}
                                                        value={region}
                                                        onChange={(val) => {
                                                            setRegion(val);
                                                            setFieldValue('wojewodztwo', val);
                                                        }}
                                                        className="region-dropdown"
                                                    />
                                                </div>
                                            </Form.Item>
                                        </Col>
                                        <Col span={8}>
                                            <Form.Item
                                                label={t("city")}
                                                validateStatus={touched.miejscowosc && errors.miejscowosc ? 'error' : ''}
                                                help={touched.miejscowosc && errors.miejscowosc}
                                                hasFeedback
                                            >
                                                <Input
                                                    type="text"
                                                    name="miejscowosc"
                                                    value={values.miejscowosc}
                                                    onChange={handleChange}
                                                />
                                            </Form.Item>
                                        </Col>
                                    </Row>
                                    <Row gutter={16}>
                                        <Col span={6}>
                                            <Form.Item
                                                label={t("street")}
                                                validateStatus={touched.ulica && errors.ulica ? 'error' : ''}
                                                help={touched.ulica && errors.ulica}
                                                hasFeedback
                                            >
                                                <Input
                                                    type="text"
                                                    name="ulica"
                                                    value={values.ulica}
                                                    onChange={handleChange}
                                                />
                                            </Form.Item>
                                        </Col>
                                        <Col span={6}>
                                            <Form.Item
                                                label={t("house_number")}
                                                validateStatus={touched.numerDomu && errors.numerDomu ? 'error' : ''}
                                                help={touched.numerDomu && errors.numerDomu}
                                                hasFeedback
                                            >
                                                <Input
                                                    type="text"
                                                    name="numerDomu"
                                                    value={values.numerDomu}
                                                    onChange={handleChange}
                                                />
                                            </Form.Item>
                                        </Col>
                                        <Col span={6}>
                                            <Form.Item
                                                label={t("apartment_number")}
                                                validateStatus={touched.numerMieszkania && errors.numerMieszkania ? 'error' : ''}
                                                help={touched.numerMieszkania && errors.numerMieszkania}
                                                hasFeedback
                                            >
                                                <Input
                                                    type="text"
                                                    name="numerMieszkania"
                                                    value={values.numerMieszkania}
                                                    onChange={handleChange}
                                                />
                                            </Form.Item>
                                        </Col>
                                        <Col span={6}>
                                            <Form.Item
                                                label={t("postal_code")}
                                                validateStatus={touched.kodPocztowy && errors.kodPocztowy ? 'error' : ''}
                                                help={touched.kodPocztowy && errors.kodPocztowy}
                                                hasFeedback
                                            >
                                                <Input
                                                    type="text"
                                                    name="kodPocztowy"
                                                    value={values.kodPocztowy}
                                                    onChange={handleChange}
                                                />
                                            </Form.Item>
                                        </Col>

                                    </Row>
                                </TabPane>
                                <TabPane key="wypozyczenia" tab={t("borrowing_history")}>
                                    <Row gutter={[16, 24]}>
                                        <Col span={24}>
                                            <h5 className="text-center">{t("currently_borrowed_books")}</h5>
                                        </Col>
                                        <Col span={24} className="center-table">
                                            <AntTable
                                                columns={columns}
                                                dataSource={listaKsiazek}
                                                rowKey="isbnNumber"
                                            />
                                        </Col>
                                    </Row>
                                    <Row gutter={[16, 24]}>
                                        <Col span={24}>
                                            <h5 className="text-center">{t("previously_borrowed_books")}</h5>
                                        </Col>
                                        <Col span={24} className="center-table">
                                            <AntTable
                                                columns={columns}
                                                dataSource={listaKsiazek}
                                                rowKey="isbnNumber"
                                            />
                                        </Col>
                                    </Row>
                                </TabPane>
                            </Tabs>
                        </Row>
                    </Form>
                )}
            </Formik>
        </div>
    );
};
