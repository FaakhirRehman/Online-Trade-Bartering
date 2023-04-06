import React, { useState } from 'react'
import { Container, Row, Col } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { addCategory, getAllCategory, updateCategories } from '../../actions';
import Layout from '../../components/Layouts';
import Input from '../../components/UI/Inputs/Index';
import Modal from '../../components/UI/Modal/Index';
import {
    IoIosCheckboxOutline,
    IoIosCheckbox,
    IoIosArrowDropdown,
    IoIosArrowDropright
} from 'react-icons/io';
import CheckboxTree from 'react-checkbox-tree';

import 'react-checkbox-tree/lib/react-checkbox-tree.css';

/**
* @author
* @function Category
**/

export const Category = (props) => {

    const dispatch = useDispatch();
    const [show, setShow] = useState(false);
    const category = useSelector(state => state.category);
    const [categoryName, setcategoryName] = useState('');
    const [parentCategoryId, setparentCategoryId] = useState('');
    const [categoryImage, setcategoryImage] = useState('');
    const [checked, setChecked] = useState([]);
    const [expanded, setExpanded] = useState([]);
    const [checkedArray, setCheckedArray] = useState([]);
    const [expandedArray, setExpandedArray] = useState([]);
    const [updateCategoryModal, setupdateCategoryModal] = useState(false);


    const handleClose = () => {

        const form = new FormData();

        form.append('name', categoryName);
        form.append('parentId', parentCategoryId);
        form.append('categoryImage', categoryImage);

        dispatch(addCategory(form));
        setcategoryName('');
        setparentCategoryId('');

        /*const cat = {
            categoryName,
            parentCategoryId,
            categoryImage
        }

        console.log(cat); */
        setShow(false);
    };
    const handleShow = () => setShow(true);

    const renderCategories = (categories) => {

        let myCategories = [];
        for (let category of categories) {
            myCategories.push(
                {
                    label: category.name,
                    value: category._id,
                    children: category.children.length > 0 && renderCategories(category.children)
                }
            );
        }

        return myCategories;
    }

    const createCategoryList = (categories, options = []) => {
        for (let category of categories) {
            options.push({ value: category._id, name: category.name, parentId: category.parentId })
            if (category.children.length > 0) {
                createCategoryList(category.children, options)
            }
        }

        return options;
    }

    const handleCategoryImage = (e) => {
        setcategoryImage(e.target.files[0]);
    }

    const updateCategory = () => {
        setupdateCategoryModal(true);
        const categories = createCategoryList(category.categories);
        const checkedArray = [];
        const expandedArray = [];
        checked.length > 0 && checked.forEach((categoryId, index) => {
            const category = categories.find((category, _index) => categoryId == category.value);
            category && checkedArray.push(category);
        })
        expanded.length > 0 && expanded.forEach((categoryId, index) => {
            const category = categories.find((category, _index) => categoryId == category.value);
            category && expandedArray.push(category);
        })

        setCheckedArray(checkedArray);
        setExpandedArray(expandedArray);

        console.log({ checked, expanded, categories, checkedArray, expandedArray });
    }

    const handleCategoryInput = (key, value, index, type) => {
        if (type == "checked") {
            const updateCheckedArray = checkedArray.map((item, _index) => index == _index ? { ...item, [key]: value } : item);
            setCheckedArray(updateCheckedArray);
        } else if (type == "expanded") {
            const updateExpandedArray = expandedArray.map((item, _index) => index == _index ? { ...item, [key]: value } : item);
            setExpandedArray(updateExpandedArray);
        }
    }

    const updateCategoriesForm = () => {
        const form = new FormData();
        expandedArray.forEach((item, index) => {
            form.append('_id', item.value);
            form.append('name', item.name);
            form.append('parentId', item.parentId ? item.parentId : "");
            form.append('type', item.type);
        });

        checkedArray.forEach((item, index) => {
            form.append('_id', item.value);
            form.append('name', item.name);
            form.append('parentId', item.parentId ? item.parentId : "");
            form.append('type', item.type);
        });
        dispatch(updateCategories(form))
        .then(result => {
            if(result) {
                dispatch(getAllCategory())
            }
        })

        setupdateCategoryModal(false);
    }

    const renderUpdateCategoriesModal = () => {
        return (
            <Modal
                show={updateCategoryModal}
                handleClose={updateCategoriesForm}
                ModalTitle={'Edit Category'}
                size="lg"
            >
                <Row>
                    <Col>
                        <h6>Expanded</h6>
                    </Col>
                </Row>
                {
                    expandedArray.length > 0 &&
                    expandedArray.map((item, index) =>
                        <Row key={index}>
                            <Col>
                                <Input
                                    value={item.name}
                                    placeholder={`Category Name`}
                                    onChange={(e) => handleCategoryInput('name', e.target.value, index, 'expanded')}
                                />
                            </Col>
                            <Col>
                                <select className='form-control'
                                    value={item.parentId}
                                    onChange={(e) => handleCategoryInput('parentId', e.target.value, index, 'expanded')}>
                                    <option>-Select Category-</option>
                                    {
                                        createCategoryList(category.categories).map(option =>
                                            <option key={option.value} value={option.value}>{option.name}</option>)
                                    }
                                </select>
                            </Col>
                            <Col>
                                <select className='form-control'>
                                    <option value="">-Select Type-</option>
                                    <option value="store">Store</option>
                                    <option value="product">Product</option>
                                    <option value="page">Page</option>
                                </select>
                            </Col>
                        </Row>)
                }
                <h6>Checked Categories</h6>
                {
                    checkedArray.length > 0 &&
                    checkedArray.map((item, index) =>
                        <Row key={index}>
                            <Col>
                                <Input
                                    value={item.name}
                                    placeholder={`Category Name`}
                                    onChange={(e) => handleCategoryInput('name', e.target.value, index, 'checked')}
                                />
                            </Col>
                            <Col>
                                <select className='form-control'
                                    value={item.parentId}
                                    onChange={(e) => handleCategoryInput('parentId', e.target.value, index, 'checked')}>
                                    <option>-Select Category-</option>
                                    {
                                        createCategoryList(category.categories).map(option =>
                                            <option key={option.value} value={option.value}>{option.name}</option>)
                                    }
                                </select>
                            </Col>
                            <Col>
                                <select className='form-control'>
                                    <option value="">-Select Type-</option>
                                    <option value="store">Store</option>
                                    <option value="product">Product</option>
                                    <option value="page">Page</option>
                                </select>
                            </Col>
                        </Row>)
                }


                {/*<input type='file' name='categoryImage' onChange={handleCategoryImage}></input>*/}

            </Modal>
        );
    }

    const renderAddCategoryModal = () => {
        return (
            <Modal
                show={show}
                handleClose={handleClose}
                ModalTitle={'Add New Category'}
            >
                <Input
                    value={categoryName}
                    placeholder={`Category Name`}
                    onChange={(e) => setcategoryName(e.target.value)}
                />

                <select className='form-control'
                    value={parentCategoryId}
                    onChange={(e) => setparentCategoryId(e.target.value)}>
                    <option>-Select Category-</option>
                    {
                        createCategoryList(category.categories).map(option =>
                            <option key={option.value} value={option.value}>{option.name}</option>)
                    }
                </select>

                <input type='file' name='categoryImage' onChange={handleCategoryImage}>
                </input>

            </Modal>
        );
    }

    return (
        <Layout sidebar>
            <Container>
                <Row>
                    <Col md={12}>
                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                            <h3>Category</h3>
                            <button onClick={handleShow}>Add</button>
                        </div>
                    </Col>
                </Row>
                <Row>
                    <Col md={12}>
                        {/*<ul>
                            {renderCategories(category.categories)}
                        </ul> */}
                        <CheckboxTree
                            nodes={renderCategories(category.categories)}
                            checked={checked}
                            expanded={expanded}
                            onCheck={checked => setChecked(checked)}
                            onExpand={expanded => setExpanded(expanded)}
                            icons={{
                                check: <IoIosCheckbox />,
                                uncheck: <IoIosCheckboxOutline />,
                                halfCheck: <IoIosCheckboxOutline />,
                                expandClose: <IoIosArrowDropright />,
                                expandOpen: <IoIosArrowDropdown />
                            }}
                        />
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <button>Delete</button>
                        <button onClick={updateCategory}>Edit</button>
                    </Col>
                </Row>
            </Container>

            {renderAddCategoryModal()}
            {renderUpdateCategoriesModal()}



        </Layout>
    )

}