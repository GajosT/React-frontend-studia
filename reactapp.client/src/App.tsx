import './App.css';
import { Input, Button as AntButton, Row, Col, Table} from 'antd';
import { Container, Form, Image } from 'react-bootstrap'; // Added Form and Image imports
import { useTranslation } from 'react-i18next';


function App() {
    const { t } = useTranslation();

    return (
        <Container fluid className="px-5 py-5">
            <Row className="pb-5 pt-3">
                <Col span={24}>
                    <div className="px-4 py-2 big-text centered-icon">
                        <Image src="/image/image1.png" className="ikona2" style={{ marginTop: "-30px" }} />
                        <div style={{ display: "inline-block", marginLeft: "5px" }}>
                            {t('online_catalog')}
                        </div>
                    </div>
                    <Form className="mb-5 d-flex centered-search">
                        <Input
                            placeholder={t('search')}
                            className="me-2"
                            aria-label={t('search')}
                        />
                        <AntButton type="primary" className="button">{t('search')}</AntButton>
                    </Form>
                </Col>
            </Row>
            <Row className="py-5">
                <Col span={12}>
                    <Table
                        bordered
                        pagination={false}
                        dataSource={[
                            { key: '1', name: t('book_1') },
                            { key: '2', name: t('book_2') },
                            { key: '3', name: t('book_3') },
                        ]}
                        columns={[
                            {
                                title: (
                                    <div>
                                        <Image src="/image/lupa.png" className="ikona1" style={{ marginTop: '-10px' }} />
                                        <span style={{ marginLeft: '5px' }}>{t('most_searched')}</span>
                                    </div>
                                ),
                                dataIndex: 'name',
                                key: 'name',
                            },
                        ]}
                    />
                </Col>
                <Col span={12}>
                    <Table
                        bordered
                        pagination={false}
                        dataSource={[
                            { key: '1', name: t('book_1') },
                            { key: '2', name: t('book_2') },
                            { key: '3', name: t('book_3') },
                        ]}
                        columns={[
                            {
                                title: (
                                    <div>
                                        <Image src="/image/gwiazda.png" className="ikona1" style={{ marginTop: '-10px' }} />
                                        <span style={{ marginLeft: '5px' }}>{t('most_borrowed')}</span>
                                    </div>
                                ),
                                dataIndex: 'name',
                                key: 'name',
                            },
                        ]}
                    />
                </Col>
            </Row>
        </Container>
    );
}

export default App;
