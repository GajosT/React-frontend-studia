import { Button as AntButton, Row, Col, Tabs, Form, Input, Upload, Radio } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import * as formik from "formik";
import * as yup from "yup";
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { useTranslation } from 'react-i18next';
import Select from 'react-select';

const { TabPane } = Tabs;
const { Formik } = formik;

export const Ksiazka = () => {
    const { t } = useTranslation();

    const DatePickerField = ({ name, value, onChange, isInvalid, isValid, errors }) => {
        return (
            <Form.Item
                validateStatus={isInvalid ? 'error' : 'success'}
                help={isInvalid ? errors[name] : null}
            >
                <DatePicker
                    selected={value}
                    onChange={date => onChange(name, date)}
                    dateFormat="dd/MM/yyyy"
                    className={`form-control ${isInvalid ? 'is-invalid' : ''} ${isValid ? 'is-valid' : ''}`}
                />
            </Form.Item>
        );
    };

    const schema = yup.object().shape({
        tytul: yup.string()
            .required(t("title_required")),
        autor: yup.string()
            .matches(/^[A-Za-z ]*$/, t("valid_author"))
            .required(t("author_required")),
        numerISBN: yup.string()
            .matches(/^\d{3}-?\d-?\d{3}-?\d{5}-?\d$/, t("invalid_isbn"))
            .min(10, t("invalid_isbn"))
            .required(t("isbn_required")),
        numerEgzemplarza: yup.number()
            .positive(t("positive_number"))
            .typeError(t("integer_number"))
            .integer(t("integer_number"))
            .required(t("copy_number_required")),
        opis: yup.string()
            .required(t("description_required")),
        rokWydania: yup.number()
            .positive(t("positive_number"))
            .typeError(t("integer_number"))
            .integer(t("integer_number"))
            .required(t("publication_year_required")),
        wydawnictwo: yup.string()
            .min(2, t("publisher_required"))
            .required(t("publisher_required")),
        liczbaStron: yup.number()
            .typeError(t("integer_number"))
            .integer(t("integer_number"))
            .positive(t("positive_number"))
            .required(t("pages_number_required")),
        gatunek: yup.string()
            .test('not-empty', t("genre_required"), value => value && value !== t("choose")),
        okladka: yup.mixed()
            .required(t("cover_required")),
        dataWypozyczenia: yup.date().nullable().required(t("borrow_date_required")),
        dataZwrotu: yup.date().nullable().required(t("return_date_required")),
    });

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
                    tytul: '',
                    autor: '',
                    numerISBN: '',
                    numerEgzemplarza: null,
                    opis: '',
                    gatunek: '',
                    rokWydania: null,
                    wydawnictwo: '',
                    liczbaStron: '',
                    wypozyczenie: "dostepna",
                    dataWypozyczenia: null,
                    dataZwrotu: null,
                    okladka: null,
                }}
            >
                {({ handleSubmit, handleChange, setFieldValue, values, touched, errors }) => (
                    <Form layout="vertical" onFinish={handleSubmit}>
                        <Row>
                            <Col xs="auto" className="pb-2">
                                <AntButton type="primary" htmlType="submit" className="button">{t('save')}</AntButton>{' '}
                                <AntButton type="primary" className="button">{t('cancel')}</AntButton>{' '}
                            </Col>
                        </Row>
                        <Tabs defaultActiveKey="dane">
                            <TabPane key="dane" tab={t('book_details')}>
                                <Row gutter={16}>
                                    <Col span={5}>
                                        <Form.Item
                                            label={t('cover')}
                                            validateStatus={touched.okladka && errors.okladka ? 'error' : ''}
                                            help={touched.okladka && errors.okladka}
                                        >
                                            <Upload
                                                name="okladka"
                                                beforeUpload={() => false}
                                                onChange={({ file }) => setFieldValue("okladka", file)}
                                            >
                                                <AntButton icon={<UploadOutlined />}>{t('upload')}</AntButton>
                                            </Upload>
                                        </Form.Item>
                                    </Col>
                                    <Col span={4}>
                                        <Form.Item
                                            label={t('title')}
                                            validateStatus={touched.tytul && errors.tytul ? 'error' : ''}
                                            help={touched.tytul && errors.tytul}
                                            hasFeedback
                                        >
                                            <Input
                                                type="text"
                                                name="tytul"
                                                value={values.tytul}
                                                onChange={handleChange}
                                            />
                                        </Form.Item>
                                    </Col>
                                    <Col span={5}>
                                        <Form.Item
                                            label={t('author')}
                                            validateStatus={touched.autor && errors.autor ? 'error' : ''}
                                            help={touched.autor && errors.autor}
                                            hasFeedback
                                        >
                                            <Input
                                                type="text"
                                                name="autor"
                                                value={values.autor}
                                                onChange={handleChange}
                                            />
                                        </Form.Item>
                                    </Col>
                                    <Col span={5}>
                                        <Form.Item
                                            label={t('isbn_number')}
                                            validateStatus={touched.numerISBN && errors.numerISBN ? 'error' : ''}
                                            help={touched.numerISBN && errors.numerISBN}
                                            hasFeedback
                                        >
                                            <Input
                                                type="text"
                                                name="numerISBN"
                                                value={values.numerISBN}
                                                onChange={handleChange}
                                            />
                                        </Form.Item>
                                    </Col>
                                    <Col span={5}>
                                        <Form.Item
                                            label={t('copy_number')}
                                            validateStatus={touched.numerEgzemplarza && errors.numerEgzemplarza ? 'error' : ''}
                                            help={touched.numerEgzemplarza && errors.numerEgzemplarza}
                                            hasFeedback
                                        >
                                            <Input
                                                type="number"
                                                name="numerEgzemplarza"
                                                value={values.numerEgzemplarza}
                                                onChange={handleChange}
                                            />
                                        </Form.Item>
                                    </Col>
                                </Row>
                                <Row gutter={16}>
                                    <Col span={20}>
                                        <Form.Item
                                            label={t('description')}
                                            validateStatus={touched.opis && errors.opis ? 'error' : ''}
                                            help={touched.opis && errors.opis}
                                            hasFeedback
                                        >
                                            <Input.TextArea
                                                rows={3}
                                                name="opis"
                                                value={values.opis}
                                                onChange={handleChange}
                                            />
                                        </Form.Item>
                                    </Col>
                                </Row>
                                <Row gutter={16}>
                                    <Col span={4}>
                                        <Form.Item
                                            label={t('publication_year')}
                                            validateStatus={touched.rokWydania && errors.rokWydania ? 'error' : ''}
                                            help={touched.rokWydania && errors.rokWydania}
                                            hasFeedback
                                        >
                                            <Input
                                                type="number"
                                                name="rokWydania"
                                                value={values.rokWydania}
                                                onChange={handleChange}
                                            />
                                        </Form.Item>
                                    </Col>
                                    <Col span={4}>
                                        <Form.Item
                                            label={t('publisher')}
                                            validateStatus={touched.wydawnictwo && errors.wydawnictwo ? 'error' : ''}
                                            help={touched.wydawnictwo && errors.wydawnictwo}
                                            hasFeedback
                                        >
                                            <Input
                                                type="text"
                                                name="wydawnictwo"
                                                value={values.wydawnictwo}
                                                onChange={handleChange}
                                            />
                                        </Form.Item>
                                    </Col>
                                    <Col span={4}>
                                        <Form.Item
                                            label={t('number_of_pages')}
                                            validateStatus={touched.liczbaStron && errors.liczbaStron ? 'error' : ''}
                                            help={touched.liczbaStron && errors.liczbaStron}
                                            hasFeedback
                                        >
                                            <Input
                                                type="number"
                                                name="liczbaStron"
                                                value={values.liczbaStron}
                                                onChange={handleChange}
                                            />
                                        </Form.Item>
                                    </Col>
                                    <Col span={4}>
                                        <Form.Item
                                            label={t('genre')}
                                            validateStatus={touched.gatunek && errors.gatunek ? 'error' : ''}
                                            help={errors.gatunek}
                                            hasFeedback
                                        >
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
                                                value={values.gatunek ? { label: values.gatunek, value: values.gatunek } : null}
                                                onChange={(selectedOption) => setFieldValue('gatunek', selectedOption ? selectedOption.value : '')}
                                                isClearable
                                                className={`react-select-container ${touched.gatunek && errors.gatunek ? 'is-invalid' : ''}`}
                                                classNamePrefix="react-select"
                                            />
                                        </Form.Item>
                                    </Col>
                                    <Col span={4}>
                                        <Form.Item
                                            label={t('borrow_status')}
                                        >
                                            <Radio.Group
                                                name="wypozyczenie"
                                                onChange={handleChange}
                                                value={values.wypozyczenie}
                                            >
                                                <Radio value="dostepna">{t('available')}</Radio>
                                                <Radio value="wypozyczona">{t('borrowed')}</Radio>
                                            </Radio.Group>
                                        </Form.Item>
                                    </Col>
                                </Row>
                                {values.wypozyczenie === 'wypozyczona' && (
                                    <Row gutter={16}>
                                        <Col span={4}>
                                            <Form.Item label={t('borrow_date')} >
                                                <DatePickerField
                                                    name="dataWypozyczenia"
                                                    value={values.dataWypozyczenia}
                                                    onChange={setFieldValue}
                                                    isInvalid={touched.dataWypozyczenia && !!errors.dataWypozyczenia}
                                                    isValid={touched.dataWypozyczenia && !errors.dataWypozyczenia}
                                                    errors={errors}
                                                />
                                            </Form.Item>
                                        </Col>
                                        <Col span={4}>
                                            <Form.Item
                                                label={t('return_date')}>
                                                <DatePickerField
                                                    name="dataZwrotu"
                                                    value={values.dataZwrotu}
                                                    onChange={setFieldValue}
                                                    isInvalid={touched.dataZwrotu && !!errors.dataZwrotu}
                                                    isValid={touched.dataZwrotu && !errors.dataZwrotu}
                                                    errors={errors}
                                                />
                                            </Form.Item>
                                        </Col>
                                    </Row>
                                )}
                            </TabPane>
                            <TabPane key="uwagi" tab="Uwagi">
                                <Row gutter={16}>
                                    <Col span={20}>
                                        <Form.Item label={t('additional_remarks')}>
                                            <Input.TextArea />
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
