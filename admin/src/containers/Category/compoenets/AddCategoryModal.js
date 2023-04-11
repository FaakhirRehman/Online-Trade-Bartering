import React from "react";
import Input from '../../../components/UI/Inputs/Index';
import Modal from '../../../components/UI/Modal/Index';
import { Row, Col } from 'react-bootstrap';

const AddCategoryModal = (props) => {

    const {
        show, handleClose,
        ModalTitle, categoryName,
        setcategoryName, parentCategoryId,
        setparentCategoryId, categoryList,
        handleCategoryImage
    } = props;

    return (
        <Modal
            show={show}
            handleClose={handleClose}
            ModalTitle={ModalTitle}
        >
            <Row>
                <Col>
                    <Input
                        value={categoryName}
                        placeholder={`Category Name`}
                        onChange={(e) => setcategoryName(e.target.value)}
                        className="form-control-sm"
                    />
                </Col>
                <Col>
                    <select className='form-control form-control-sm'
                        value={parentCategoryId}
                        onChange={(e) => setparentCategoryId(e.target.value)}>
                        <option>-Select Category-</option>
                        {
                            categoryList.map(option =>
                                <option key={option.value} value={option.value}>{option.name}</option>)
                        }
                    </select>
                </Col>
            </Row>
            <Row>
                <Col>
                    <input type='file' name='categoryImage' onChange={handleCategoryImage}>
                    </input>
                </Col>
            </Row>






        </Modal>
    );
}

export default AddCategoryModal;