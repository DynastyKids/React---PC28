import React from 'react';
import '../../../App.css';
import bj28logo from '../../../img/china.png'

function Bj28(){
    return(
        <>
        <div id="qi_bj">
            <div className="flex_main">
                <div className="info">
                    <div className="left"><img src={bj28logo} alt="BJ28icon"/></div>
                    <div className="right"></div>
                </div>
            </div>
        </div>
        </>
    );
}

export default Bj28;