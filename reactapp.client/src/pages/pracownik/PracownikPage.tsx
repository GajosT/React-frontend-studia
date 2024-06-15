import { Button as AntButton, Row, Col, Tabs, Form, Input, Upload } from 'antd';
import * as formik from "formik";
import { UploadOutlined } from '@ant-design/icons';
import * as yup from "yup";
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { useTranslation } from 'react-i18next';
import { useState } from 'react';
import Select from 'react-select';
import { CountryDropdown, RegionDropdown} from 'react-country-region-selector';

const { TabPane } = Tabs;

export const Pracownik = () => {
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

    const { Formik } = formik;

    const schema = yup.object().shape({
        zdjecie: yup.mixed()
            .required(t("photo_required")),
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
        stanowisko: yup.string()
            .test('nie-wybierz', t('position_required'), value => value && value !== 'Select'),
        rodzajUmowy: yup.string()
            .test('nie-wybierz', t('contract_type_required'), value => value && value !== 'Select'),
        wynagrodzenie: yup.number()
            .positive(t("salary_positive"))
            .required(t("salary_required")),
        godzinyPracy: yup.string()
            .required(t("working_hours_required")),
        ulica: yup.string()
            .required(t("street_required")),
        numerDomu: yup.string()
            .required(t("house_number_required")),
        numerMieszkania: yup.string(),
        kodPocztowy: yup.string()
            .required(t("postal_code_required")),
        miejscowosc: yup.string()
            .min(4, t("city_min_length"))
            .required(t("city_required")),
        wojewodztwo: yup.string()
            .required(t("province_required")),
        kraj: yup.string()
            .required(t("country_required")),
        pesel: yup.string()
            .min(11, t("pesel_length"))
            .max(11, t("pesel_length"))
            .required(t("pesel_required")),
        numerKontaBankowego: yup.string()
            .min(6, t("bank_account_number_min_length"))
            .max(34, t("bank_account_number_max_length"))
            .required(t("bank_account_number_required")),
        informacjeOUbezpieczeniach: yup.string()
            .required(t("insurance_information_required")),
    });

    return (
        <div className="py-3">
            <Formik
                validationSchema={schema}
                onSubmit={(values) => {
                    try {
                        console.log(values);
                    } catch (error) {
                        console.error(t("form_submit_error"), error);
                    }
                }}
                initialValues={{
                    zdjecie: null,
                    imie: "",
                    nazwisko: "",
                    dataUrodzenia: null,
                    numerTelefonu: "",
                    email: "",
                    stanowisko: "",
                    rodzajUmowy: "",
                    wynagrodzenie: "",
                    godzinyPracy: "",
                    ulica: "",
                    numerDomu: "",
                    numerMieszkania: "",
                    kodPocztowy: "",
                    miejscowosc: "",
                    wojewodztwo: "",
                    kraj: "",
                    pesel: "",
                    numerKontaBankowego: "",
                    informacjeOUbezpieczeniach: "",
                }}
            >
                {({ handleSubmit, handleChange, setFieldValue, values, touched, errors }) => (
                    <Form layout="vertical" onFinish={handleSubmit}>
                        <Row>
                            <Col xs="auto" className="pb-2">
                                <AntButton htmlType="submit" type="primary" className="button">{t("save")}</AntButton>{' '}
                                <AntButton type="primary" className="button">{t("cancel")}</AntButton>{' '}
                            </Col>
                        </Row>
                        <Tabs defaultActiveKey="dane">
                            <TabPane key="dane" tab={t("basic_data")}>
                                <Row gutter={16}>
                                    <Col span={3}>
                                        <Form.Item
                                            label={t("photo")}
                                            validateStatus={touched.zdjecie && errors.zdjecie ? 'error' : ''}
                                            help={touched.zdjecie && errors.zdjecie}
                                        >
                                            <Upload
                                                name="zdjecie"
                                                beforeUpload={() => false}
                                                onChange={({ file }) => setFieldValue("zdjecie", file)}
                                            >
                                                <AntButton icon={<UploadOutlined />}>{t('upload')}</AntButton>
                                            </Upload>
                                        </Form.Item>
                                    </Col>
                                    <Col span={4}>
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
                                    <Col span={4}>
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
                                    <Col span={4}>
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
                                    <Col span={4}>
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
                                            label={t("position")}
                                            validateStatus={touched.stanowisko && errors.stanowisko ? 'error' : ''}
                                            help={errors.stanowisko}
                                            hasFeedback

                                        >
                                            <Select
                                                name="stanowisko"
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
                                                value={values.stanowisko ? { label: values.stanowisko, value: values.stanowisko } : null}
                                                onChange={(selectedOption) => setFieldValue('stanowisko', selectedOption ? selectedOption.value : '')}
                                                isClearable
                                                className={`react-select-container ${touched.stanowisko && errors.stanowisko ? 'is-invalid' : ''}`}
                                                classNamePrefix="react-select"
                                            />
                                        </Form.Item>
                                    </Col>
                                    <Col span={12}>
                                        <Form.Item
                                            label={t("contract_type")}
                                            validateStatus={touched.rodzajUmowy && errors.rodzajUmowy ? 'error' : ''}
                                            help={errors.rodzajUmowy}
                                            hasFeedback

                                        >
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
                                                value={values.rodzajUmowy ? { label: values.rodzajUmowy, value: values.rodzajUmowy } : null}
                                                onChange={(selectedOption) => setFieldValue('rodzajUmowy', selectedOption ? selectedOption.value : '')}
                                                isClearable
                                                className={`react-select-container ${touched.rodzajUmowy && errors.rodzajUmowy ? 'is-invalid' : ''}`}
                                                classNamePrefix="react-select"
                                            />
                                        </Form.Item>
                                    </Col>
                                </Row>
                                <Row gutter={16}>
                                    <Col span={8}>
                                        <Form.Item
                                            label={t("salary")}
                                            validateStatus={touched.wynagrodzenie && errors.wynagrodzenie ? 'error' : ''}
                                            help={touched.wynagrodzenie && errors.wynagrodzenie}
                                            hasFeedback

                                        >
                                            <Input
                                                type="number"
                                                name="wynagrodzenie"
                                                onChange={handleChange}
                                                value={values.wynagrodzenie}
                                            />
                                        </Form.Item>
                                    </Col>
                                    <Col span={16}>
                                        <Form.Item
                                            label={t("working_hours")}
                                            validateStatus={touched.godzinyPracy && errors.godzinyPracy ? 'error' : ''}
                                            help={touched.godzinyPracy && errors.godzinyPracy}
                                            hasFeedback

                                        >
                                            <Input
                                                type="text"
                                                name="godzinyPracy"
                                                onChange={handleChange}
                                                value={values.godzinyPracy}
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
                            <TabPane key="administracyjne" tab={t("administrative_data")}>
                                <Row gutter={16}>
                                    <Col span={6}>
                                        <Form.Item
                                            label={t("pesel_number")}
                                            validateStatus={touched.pesel && errors.pesel ? 'error' : ''}
                                            help={touched.pesel && errors.pesel}
                                            hasFeedback

                                        >
                                            <Input
                                                type="text"
                                                name="pesel"
                                                onChange={handleChange}
                                                value={values.pesel}
                                            />
                                        </Form.Item>
                                    </Col>
                                    <Col span={6}>
                                        <Form.Item
                                            label={t("bank_account_number")}
                                            validateStatus={touched.numerKontaBankowego && errors.numerKontaBankowego ? 'error' : ''}
                                            help={touched.numerKontaBankowego && errors.numerKontaBankowego}
                                            hasFeedback

                                        >
                                            <Input
                                                type="text"
                                                name="numerKontaBankowego"
                                                onChange={handleChange}
                                                value={values.numerKontaBankowego}
                                            />
                                        </Form.Item>
                                    </Col>
                                    <Col span={12}>
                                        <Form.Item
                                            label={t("insurance_information")}
                                            validateStatus={touched.informacjeOUbezpieczeniach && errors.informacjeOUbezpieczeniach ? 'error' : ''}
                                            help={touched.informacjeOUbezpieczeniach && errors.informacjeOUbezpieczeniach}
                                            hasFeedback

                                        >
                                            <Input
                                                as="textarea"
                                                name="informacjeOUbezpieczeniach"
                                                onChange={handleChange}
                                                value={values.informacjeOUbezpieczeniach}
                                            />
                                        </Form.Item>
                                    </Col>
                                </Row>
                            </TabPane>
                        </Tabs>
                    </Form>
                )}
            </Formik>
        </div>
    )
}