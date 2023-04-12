import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Row, Col, Container } from 'react-bootstrap';
import Layout from '../../components/Layouts';
import Modal from '../../components/UI/Modal/Index';
import Input from '../../components/UI/Inputs/Index';
import linearCategories from '../../helpers/linearCategories';
/**
* @author
* @function NewPage
**/

export const NewPage = (props) => {

    const [createModal, setCreateModal] = useState(false);
    const [title, setTitle] = useState('');
    const category = useSelector(state => state.category);
    const [categories, setCategories] = useState([]);
    const [categoryId, setcategoryId] = useState('');
    const [desc, setDesc] = useState('');
    const [banners, setBanners] = useState([]);
    const [products, setProducts] = useState([]);

    const handleBannerImages = (e) => {
        console.log(e);
    }

    const handleProductImages = (e) => {
        console.log(e);
    }

    useEffect(() => {
        setCategories(linearCategories(category.categories));
    }, [category]);

    const renderCreatePageModal = () => {
        return (
            <Modal
                show={createModal}
                ModalTitle={'Create New Page'}
                handleClose={() => setCreateModal(false)}
            >
                <Container>
                    <Row>
                        <Col>
                            <select
                                className='form-control form-control-sm'
                                value={categoryId}
                                onChange={(e) => setcategoryId(e.target.value)}
                            >
                                <option>-Select Category-</option>
                                {
                                    categories.map(cat =>
                                        <option key={cat._id} value={cat._id}>{cat.name}</option>
                                    )
                                }

                            </select>
                        </Col>
                    </Row>

                    <Row>
                        <Col>
                            <Input
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                placeholder={'Page Title'}
                                className='form-control-sm'
                            />
                        </Col>
                    </Row>

                    <Row>
                        <Col>
                            <Input
                                value={desc}
                                onChange={(e) => setDesc(e.target.value)}
                                placeholder={'Page Description'}
                                className='form-control-sm'
                            />
                        </Col>
                    </Row>

                    <Row>
                        <Col>
                            <input
                                type="file"
                                name="banners"
                                onChange={handleBannerImages}
                            ></input>
                        </Col>
                    </Row>

                    <Row>
                        <Col>
                            <input
                                className='form-control form-control-sm'
                                type="file"
                                name="products"
                                onChange={handleProductImages}
                            ></input>
                        </Col>
                    </Row>

                </Container>

            </Modal>
        );
    }

    return (
        <Layout sidebar>
            {renderCreatePageModal()}
            <button onClick={() => setCreateModal(true)}>Create</button>
        </Layout>
    )

}

export default NewPage;