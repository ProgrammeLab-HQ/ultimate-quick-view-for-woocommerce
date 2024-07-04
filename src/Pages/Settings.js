// import React, { useEffect, useState } from 'react';
// import { Card, Col, Container, Row } from 'react-bootstrap';
// const useEffect = wp.element.useState;
// const useState = wp.element.useState;
// import Logo from '../assets/images/logo.svg';
// import { Button, Notice, RadioControl } from '@wordpress/components';
import { Notice, RadioControl } from '@wordpress/components';
import { useEffect, useState } from '@wordpress/element';
import { __ } from '@wordpress/i18n';

import React from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import Select from 'react-select';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const nonce = document.getElementById('nonce-field');
export default function Settings(props) {

    // const [option1, setOption1] = useState('');
    const [options, setOptions] = useState({});
    const [categories, setCategories] = useState({});
    const [loading,setLoading] = useState(true);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [image, setImage] = useState(null);
    const [mediaId, setMediaId] = useState(null);


    useEffect(() => {
        /**
         * Initialize the options fields with the data received from the REST API
         * endpoint provided by the plugin.
         */
        wp.apiFetch({path: '/ultimate_quick_view_for_woocommerce/v1/options'}).
        then(data => {
                //Set the new values of the options in the state
                // setOption1(data['plugin_option_1'])
                // setOption2(data['plugin_option_2'])
                setOptions(data['programmelab_ultimate_quick_view_for_woocommerce'])
            },
        );
    }, []);

    useEffect(() => {
        /**
         * Initialize the options fields with the data received from the REST API
         * endpoint provided by the plugin.
         * http://site-url/wp-json/wc/v3/products/categories
         */
        wp.apiFetch({path: '/wc/v3/products/categories'}).
        then(cats => {
                let tempCategories = [];
                for (let index = 0; index < cats.length; index++) {
                    tempCategories.push({
                        value: cats[index]['id'],
                        label: cats[index]['name']
                    });
                    // tempCategories.id = cats[index]['id'];
                    // tempCategories.name = cats[index]['name'];
                }
                // console.log(tempCategories);
                setCategories(tempCategories)
            },
        );
    }, []);

    useEffect(() => {
        if (Object.keys(options).length) {
            setLoading(false);
        }
    }, [options]);
    // const notify = () => toast("Wow so easy!");
    const updateField = (path, value) => {
        const keys = path.split('.');
        let tempData = { ...options };

        keys.reduce((acc, key, index) => {
            if (index === keys.length - 1) {
                acc[key] = value;
            } else {
                if (!acc[key]) acc[key] = {};
                return acc[key];
            }
        }, tempData);

        setOptions(tempData);
        // console.log(tempData);

        wp.apiFetch({
            path: '/ultimate_quick_view_for_woocommerce/v1/options',
            method: 'POST',
            data: {
                'programmelab_ultimate_quick_view_for_woocommerce': tempData
            },
        }).then(data => {
            // alert('Options saved successfully!');            
            const toastId = 'uqvfw-toast-id';
            if (!toast.isActive(toastId)) {
                toast.success(__("Changes applied successfully.", 'ultimate-quick-view-for-woocommerce'), {
                    toastId,
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "colored",
                    // transition: Bounce,
                });
            }
        });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        // console.log(options);
        wp.apiFetch({
            path: '/ultimate_quick_view_for_woocommerce/v1/options',
            method: 'POST',
            data: {
                'programmelab_ultimate_quick_view_for_woocommerce': options
            },
        }).then(data => {
            // alert('Options saved successfully!');            
            const toastId = 'uqvfw-toast-id';
            if (!toast.isActive(toastId)) {
                toast.success(__("Changes applied successfully.", 'ultimate-quick-view-for-woocommerce'), {
                    toastId,
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "colored",
                    // transition: Bounce,
                });
            }
        });
    };
    const ALLOWED_MEDIA_TYPES = ['image'];
    const handleSelect = (path, media) => {
        //console.log('selected media:', media);
        // setMediaId(media.id);
        // setImage(media);
        updateField(path + '.url', media.url);
        updateField(path + '.thumbnail', media.sizes.thumbnail.url);
        updateField(path + '.id', media.id);
        // setImage('');
    };
    return (
        <section className="settings-page-wrap">
            <ToastContainer />
            <Container fluid="fluid">
                <div className="content-part">
                    <Row className="justify-content-lg-center">
                        <Col className="col-lg-8">
                            <div className="settings-box">
                                <div className="d-flex">
                                    <div className="nav-area">
                                        <ul className="options-menu d-flex flex-column">
                                            <li>
                                                <a href="#" className="ultimate-quick-view-for-woocommerce-nav-tab nav-tab-active">{__('Quick View', 'ultimate-quick-view-for-woocommerce')}</a>
                                            </li>
                                            <li>
                                                <a href="#" className="ultimate-quick-view-for-woocommerce-nav-tab">{__('Settings', 'ultimate-quick-view-for-woocommerce')}</a>
                                            </li>
                                        </ul>
                                    </div>
                                    <div className="options-area d-flex flex-column"> 
                                        {
                                        loading
                                        ?<div className="page-loader" />
                                        :<>
                                        <form onSubmit={handleSubmit}>
                                            <div className="options">
                                            
                                                {/* {console.log(options)} */}
                                                {error && (
                                                    <Notice status="error" onRemove={() => setError('')}>
                                                        {error}
                                                    </Notice>
                                                )}
                                                {success && (
                                                    <Notice status="success" onRemove={() => setSuccess('')}>
                                                        {success}
                                                    </Notice>
                                                )}
                                                <div className="ultimate-quick-view-for-woocommerce-setting-unit">
                                                    <div className="switch-setting-unit">
                                                        <div className="title-wrap">
                                                            <label>
                                                                <span>{__('Enable Cart Button', 'ultimate-quick-view-for-woocommerce')}</span>
                                                                <span className="hints-css hint--bottom" aria-label={__('Enable the cart option in the quick-view.', 'ultimate-quick-view-for-woocommerce')}><i className="dashicons dashicons-editor-help"></i></span>
                                                            </label>
                                                            <div className="description"><p>{__('Cart buttons allow you to seamlessly add products to your purchase.', 'ultimate-quick-view-for-woocommerce')}</p></div>
                                                        </div>
                                                        <div className="position-relative switcher">
                                                            <label htmlFor="quickview_enable_cart_button">
                                                                <input 
                                                                id="quickview_enable_cart_button"
                                                                type="checkbox" 
                                                                value="1"
                                                                checked={options?.quickview_enable_cart_button}
                                                                onChange = {(event) => updateField('quickview_enable_cart_button', event.target.checked)}
                                                                />
                                                                    <em data-on="on" data-off="off"></em>
                                                                    <span></span>
                                                            </label>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="ultimate-quick-view-for-woocommerce-setting-unit">
                                                    <div className="switch-setting-unit">
                                                        <div className="title-wrap">
                                                            <label>
                                                                <span>{__('Enable Quickview for Products', 'ultimate-quick-view-for-woocommerce')}</span>
                                                                <span className="hints-css hint--bottom" aria-label={__('Enable product details in the quick view.', 'ultimate-quick-view-for-woocommerce')}><i className="dashicons dashicons-editor-help"></i></span>
                                                            </label>
                                                            <div className="description"><p>{__('Get a quick look at product details with a click, saving you time while browsing.', 'ultimate-quick-view-for-woocommerce')}</p></div>
                                                        </div>
                                                        <div className="position-relative switcher">
                                                            <label htmlFor="quickview_enable_for_product">
                                                                <input 
                                                                id="quickview_enable_for_product"
                                                                type="checkbox" 
                                                                value="1"
                                                                checked={options?.quickview_enable_for_product}
                                                                onChange = {(event) => updateField('quickview_enable_for_product', event.target.checked)}
                                                                />
                                                                    <em data-on="on" data-off="off"></em>
                                                                    <span></span>
                                                            </label>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="ultimate-quick-view-for-woocommerce-setting-unit">
                                                    <div className="switch-setting-unit">
                                                        <div className="title-wrap">
                                                            <label>
                                                                <span>{__('Enable Full Details', 'ultimate-quick-view-for-woocommerce')}</span>
                                                                <span className="hints-css hint--bottom" aria-label={__('Enable full description in the quick view.', 'ultimate-quick-view-for-woocommerce')}><i className="dashicons dashicons-editor-help"></i></span>
                                                            </label>
                                                            <div className="description"><p>{__('Click to access the full product description with all the information you need.', 'ultimate-quick-view-for-woocommerce')}</p></div>
                                                        </div>
                                                        <div className="position-relative switcher">
                                                            <label htmlFor="quickview_enable_full_details">
                                                                <input 
                                                                id="quickview_enable_full_details"
                                                                type="checkbox" 
                                                                value="1"
                                                                checked={options?.quickview_enable_full_details}
                                                                onChange = {(event) => updateField('quickview_enable_full_details', event.target.checked)}
                                                                />
                                                                    <em data-on="on" data-off="off"></em>
                                                                    <span></span>
                                                            </label>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="ultimate-quick-view-for-woocommerce-setting-unit">
                                                    <div className="switch-setting-unit">
                                                        <div className="title-wrap">
                                                            <label>
                                                                <span>{__('Enable Zoom', 'ultimate-quick-view-for-woocommerce')}</span>
                                                                <span className="hints-css hint--bottom" aria-label={__('Enable image magnification in the quick view.', 'ultimate-quick-view-for-woocommerce')}><i className="dashicons dashicons-editor-help"></i></span>
                                                            </label>
                                                            <div className="description"><p>{__('Get a magnified view of the product, ensuring you don\'t miss a thing.', 'ultimate-quick-view-for-woocommerce')}</p></div>
                                                        </div>
                                                        <div className="position-relative switcher">
                                                            <label htmlFor="quickview_enable_zoom">
                                                                <input 
                                                                id="quickview_enable_zoom"
                                                                type="checkbox" 
                                                                value="1"
                                                                checked={options?.quickview_enable_zoom}
                                                                onChange = {(event) => updateField('quickview_enable_zoom', event.target.checked)}
                                                                />
                                                                    <em data-on="on" data-off="off"></em>
                                                                    <span></span>
                                                            </label>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="ultimate-quick-view-for-woocommerce-setting-unit">
                                                    <div className="switch-setting-unit">
                                                        <div className="title-wrap">
                                                            <label>
                                                                <span>{__('Show Quickview', 'ultimate-quick-view-for-woocommerce')}</span>
                                                                <span className="hints-css hint--bottom" aria-label={__('Set quick view for specific categories of products or all.', 'ultimate-quick-view-for-woocommerce')}><i className="dashicons dashicons-editor-help"></i></span>
                                                            </label>
                                                            <div className="description"><p>{__('Enable product details within a chosen category or allow all products.', 'ultimate-quick-view-for-woocommerce')}</p></div>
                                                        </div>
                                                        
                                                    </div>
                                                </div>
                                                <div className="ultimate-quick-view-for-woocommerce-setting-unit ultimate-quick-view-for-woocommerce-setting-sub-unit">
                                                    <div className="radio-setting-unit">
                                                        <div className="position-relative radio-unit radio-unit-inline">
                                                            <RadioControl
                                                                // label="User type"
                                                                // help="The type of the current user"
                                                                className="input-control"
                                                                selected={options?.quickview_category_for}
                                                                options={ [
                                                                    { label: __('All Product', 'ultimate-quick-view-for-woocommerce'), value: 'all' },
                                                                    { label: __('Specific Product', 'ultimate-quick-view-for-woocommerce'), value: 'specific' },
                                                                ] }
                                                                onChange={ ( value ) => updateField( 'quickview_category_for', value ) }        
                                                            />
                                                        </div>
                                                    </div>
                                                    {
                                                        options?.quickview_category_for == 'specific' &&
                                                        <div className="select-setting-unit mt-3">
                                                            <div className="position-relative select-unit">
                                                                <Select
                                                                    // id="my-select"
                                                                    // className="form-control"
                                                                    isMulti
                                                                    value={options?.quickview_categories}
                                                                    onChange={ ( value ) => updateField( 'quickview_categories', value ) }
                                                                    options={categories}
                                                                    placeholder={__('Select Categories', 'ultimate-quick-view-for-woocommerce')}
                                                                />
                                                            </div>
                                                        </div>

                                                    }
                                                    
                                                    
                                                </div>                                   
                                                
                                                
                                            </div>                                      
                                            
                                            {/* <div className="save-button mt-auto">
                                                <Button isPrimary type="submit" className="button button-primary">
                                                {__('Save settings', 'ultimate-quick-view-for-woocommerce')}
                                                </Button>
                                            </div> */}
                                        
                                        </form>
                                        </>
                                        }

                                        
                                    </div>
                                </div>
                            </div>
                        </Col>
                    </Row>
                </div>
            </Container>
        </section>
    )
}
