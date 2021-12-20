import React from 'react';
import '../../../App.css';
import btc28logo from '../../../img/ctc.png'

function Btc28(){
    return(
        <>
        <div id="qi_xjp">
            <div className="flex_main">
                <div className="info">
                    <div className="left"><img src={btc28logo} alt="BTC28icon"/></div>
                    <div className="right"></div>
                </div>
            </div>
        </div>
        </>
    );
}

export default Btc28;