import React, { useEffect } from 'react'
import { Container, Row, Col } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { getAllCategory } from '../../actions';
import Layout from '../../components/Layouts';

/**
* @author
* @function Category
**/

export const Category = (props) => {

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getAllCategory())
    }, [])

    return (
        <Layout sidebar>
            <Container>
                <Row>
                    <Col md={12}>
                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                            <h3>Category</h3>
                            <button>Add</button>
                        </div>
                    </Col>
                </Row>
                <Row>
                    <Col md={12}>
                    </Col>
                </Row>
            </Container>
        </Layout>
    )

}