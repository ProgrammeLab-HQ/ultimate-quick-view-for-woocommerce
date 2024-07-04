import { __ } from '@wordpress/i18n';
import React from "react";
import { Col, Container, Row } from 'react-bootstrap';
import data from '../data.json';
export default function Footer() {
    return (
        <section className="ultimate-quick-view-for-woocommerce-footer">
            <Container fluid="fluid">
                <Row className="align-items-center">
                    <Col className="col-lg-8 text-center text-lg-start mb-2 mb-lg-0 ">
                    <div  dangerouslySetInnerHTML={{__html: __('Enjoyed ', 'ultimate-quick-view-for-woocommerce') + ' <strong>"' + data.name + '"</strong>' + __('? Please leave us a rating. We really appreciate your support!', 'ultimate-quick-view-for-woocommerce')}} />
                    {}
                    </Col>
                    <Col className="col-lg-4 text-center text-lg-end"><strong>{__('Version', 'ultimate-quick-view-for-woocommerce')}</strong>:{data.version} </Col>
                </Row>
            </Container>
        </section>
    )
}
