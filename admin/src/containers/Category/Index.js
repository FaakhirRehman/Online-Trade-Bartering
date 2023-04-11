import React, { useState } from 'react'
import { Container, Row, Col } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import {
    addCategory,
    getAllCategory,
    updateCategories,
    deleteCategories as deleteCategoriesAction
} from '../../actions';
import Layout from '../../components/Layouts';
import Modal from '../../components/UI/Modal/Index';
import {
    IoIosCheckboxOutline,
    IoIosCheckbox,
    IoIosArrowDropdown,
    IoIosArrowDropright,
    IoIosTrash,
    IoIosAdd,
    IoIosDocument
} from 'react-icons/io';
import CheckboxTree from 'react-checkbox-tree';
import 'react-checkbox-tree/lib/react-checkbox-tree.css';
import UpdateCategoriesModal from './compoenets/UpdateCategoriesModal';
import AddCategoryModal from './compoenets/AddCategoryModal';
import './style.css';

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
    const [deleteCategoryModal, setdeleteCategoryModal] = useState(false);


    const handleClose = () => {

        const form = new FormData();

        /*
        if(categoryName === "") {
            alert("Category Name is Required!");
        }
        */

        form.append('name', categoryName);
        form.append('parentId', parentCategoryId);
        form.append('categoryImage', categoryImage);

        dispatch(addCategory(form));
        setcategoryName('');
        setparentCategoryId('');
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

    const updateCheckedAndExpandedCategories = () => {
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
    }

    const updateCategory = () => {
        updateCheckedAndExpandedCategories();
        setupdateCategoryModal(true);

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
                if (result) {
                    dispatch(getAllCategory())
                }
            })

        setupdateCategoryModal(false);
    }

    const deleteCategory = () => {
        updateCheckedAndExpandedCategories();
        setdeleteCategoryModal(true);
    }

    const deleteCategories = () => {
        const checkedIdsArray = checkedArray.map((item, index) => ({ _id: item.value }));
        const expandedIdsArray = expandedArray.map((item, index) => ({ _id: item.value }));
        const idsArray = expandedIdsArray.concat(checkedIdsArray);

        if (checkedIdsArray.length > 0) {
            dispatch(deleteCategoriesAction(checkedIdsArray))
                .then(result => {
                    if (result) {
                        dispatch(getAllCategory())
                        setdeleteCategoryModal(false)
                    }
                })
        }
    }

    const renderDeleteCategoryModal = () => {
        return (
            <Modal
                ModalTitle="Confirm Deletion"
                show={deleteCategoryModal}
                handleClose={() => setdeleteCategoryModal(false)}
                buttons={[
                    {
                        label: 'NO',
                        color: 'primary',
                        onClick: () => {
                            alert('no');
                        }
                    },
                    {
                        label: 'YES',
                        color: 'danger',
                        onClick: deleteCategories
                    }
                ]}
            >

                <h5>Expanded</h5>
                {
                    expandedArray.map((item, index) => <span key={index}>{item.name}</span>)
                }
                <h5>Checked</h5>
                {
                    checkedArray.map((item, index) => <span key={index}>{item.name}</span>)
                }

            </Modal>
        );
    }

    const categoryList = createCategoryList(category.categories);

    return (
        <Layout sidebar>
            <Container>
                <Row>
                    <Col md={12}>
                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                            <h3>Category</h3>
                            <div className='actionBtnContainer'>
                                <span>Actions: </span>
                                <button onClick={handleShow}><IoIosAdd /><span>Add</span></button>
                                <button onClick={updateCategory}><IoIosDocument/><span>Edit</span></button>
                                <button onClick={deleteCategory}><IoIosTrash /><span>Delete</span></button>
                            </div>

                        </div>
                    </Col>
                </Row>
                <Row>
                    <Col md={12}>
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
            </Container>

            <AddCategoryModal
                show={show}
                handleClose={handleClose}
                ModalTitle={'Add Category'}
                categoryName={categoryName}
                setcategoryName={setcategoryName}
                parentCategoryId={parentCategoryId}
                setparentCategoryId={setparentCategoryId}
                categoryList={categoryList}
                handleCategoryImage={handleCategoryImage}
            />

            <UpdateCategoriesModal
                show={updateCategoryModal}
                handleClose={updateCategoriesForm}
                ModalTitle={'Edit Category'}
                size="lg"
                expandedArray={expandedArray}
                checkedArray={checkedArray}
                handleCategoryInput={handleCategoryInput}
                categoryList={categoryList}
            />

            {renderDeleteCategoryModal()}
        </Layout>
    )

}