import React from 'react';
import {
    NavLink
} from "react-router-dom";
export default function Cta(props) {
    // console.log(props);
    const {className, title, content, btn} = props.data;
    return (
        <div className={
            [
                'cta-box',
                (className) ? className : ''
            ].join(" ")
        }>       
            <div className="row align-items-center">
                <div className="col-lg-6 text-center text-lg-start">
                    {title && 
                        <h3 className="cta-title" dangerouslySetInnerHTML={{__html: title}}/>
                    }
                    {
                        content && 
                        <div className="cta-content" dangerouslySetInnerHTML={{__html: content}}/>
                    }
                </div>
                
                <div className="col-lg-6 text-center text-lg-end">
                    {
                        btn && btn.length && 
                        <div className="btn-group">
                            {btn.map((item, index) => {
                                return (item.target == '_blank')?
                                (
                                    <a 
                                    className={
                                        [
                                            'theme-button',
                                            (item.className) ? item.className : ''
                                        ].join(" ")
                                    }
                                    key={index} 
                                    href={item.url} 
                                    target="_blank">{item.title}</a>
                                ) : (
                                    <NavLink 
                                    className={
                                        [
                                            'theme-button',
                                            (item.className) ? item.className : ''
                                        ].join(" ")
                                    }
                                    key={index} 
                                    to={item.url} 
                                    >{item.title}</NavLink>
                                )
                                
                            })} 
                        </div>
                    }
                </div>
            </div>      

        </div> 
    )
}
