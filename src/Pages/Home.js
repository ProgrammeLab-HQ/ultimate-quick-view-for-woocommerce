import { __ } from '@wordpress/i18n';
import React from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import Card from '../Molecules/Card';
import imageSupport from '../assets/images/get-5-star-support.svg';
import imageJoin from '../assets/images/join-the-community.svg';
import imageRate from '../assets/images/rate-us.svg';
import imageWelcomeFeature from '../assets/images/welcome-feature-image.svg';
import imageWelcomeHeader from '../assets/images/welcome-ultimate-quick-view-for-woocommerce.svg';

import data from '../data.json';

export default function Home() {
return (
      <section className="settings-page-wrap">
        <Container fluid="fluid">
        <div className="content-part">
                <Row>
                    <Col className="col-lg-8 left-content">
                    <Card
                        // className="custom-class"      
                        header = {{
                            imgBox: {
                                className: 'gap-4',
                                title: __('Welcome to ', 'ultimate-quick-view-for-woocommerce') + '<strong>' + data.name + '</strong>',
                                content: __('We designed', 'ultimate-quick-view-for-woocommerce') + ' <strong>"' + data.name + '"</strong> ' + __('to be intuitive but we recommend learning how it works by configuring the settings page to your requirements. Hope you enjoy our plugin, as much as we had making it!', 'ultimate-quick-view-for-woocommerce'),
                                img: imageWelcomeHeader
                            }
                        }}
                        body = {{
                            html: `<div class="text-center"><img class="img-fluid" src="${imageWelcomeFeature}" /></div>`
                        }}
                        footer = {{
                            cta: {
                                content: __('Enjoyed ', 'ultimate-quick-view-for-woocommerce') + data.name + __('? See our site for more similar products. Or head to the settings page.', 'ultimate-quick-view-for-woocommerce'),
                                btn: [
                                    {
                                        'url': '?page=ultimate-quick-view-for-woocommerce&path=settings',
                                        'title': __('Settings', 'ultimate-quick-view-for-woocommerce'),
                                        'className': 'theme-button-solid theme-button-solid-blue',
                                    },
                                    {
                                        'url': 'https://www.programmelab.com/',
                                        'title': __('Visit Our Website', 'ultimate-quick-view-for-woocommerce'),
                                        'target': '_blank'
                                    },
                                ]
                            }
                        }}
                        />
                    </Col>
                    <Col className="col-lg-4 right-content">
                        <Card
                        // className="custom-class"      
                        body = {{
                            imgBox: {
                                className: 'gap-3',
                                title: __('Get 5-star Support', 'ultimate-quick-view-for-woocommerce'),
                                content: __('Need some help? Our awesome support team is here to help you with any question you have.', 'ultimate-quick-view-for-woocommerce'),
                                img: imageSupport,
                                btn: [
                                    {
                                        'url': '#',
                                        'title': __('Get Support', 'ultimate-quick-view-for-woocommerce')
                                    }
                                ]
                            }
                        }}
                        />
                        <Card
                        // className="custom-class"      
                        body = {{
                            imgBox: {
                                className: 'gap-3',
                                title: __('Join the Community', 'ultimate-quick-view-for-woocommerce'),
                                content: __('Got a question about the plugin, want to share your awesome project or just say hi? Join our wonderful community!'),
                                img: imageJoin,
                                btn: [
                                    {
                                        'url': '#',
                                        'title': __('Get Support', 'ultimate-quick-view-for-woocommerce')
                                    }
                                ]
                            }
                        }}
                        />
                        <Card
                        // className="custom-class"      
                        body = {{
                            imgBox: {
                                className: 'gap-3',
                                title: __('Rate Us', 'ultimate-quick-view-for-woocommerce'),
                                content: __('We love to hear from you, we would appreciate your every single review.', 'ultimate-quick-view-for-woocommerce'),
                                img: imageRate,
                                btn: [
                                    {
                                        'url': '#',
                                        'title': __('Get Support', 'ultimate-quick-view-for-woocommerce')
                                    }
                                ]
                            }
                        }}
                        />
                        
                    </Col>
                </Row>
            </div>
            </Container>
      </section>
  )
};
