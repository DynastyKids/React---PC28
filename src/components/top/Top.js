import React from 'react';
import { useHistory } from 'react-router';
import '../../App.css';
import pc28logo from '../../img/logo.png';
import pcpic from '../../img/pic_pc.jpg';
import wappic from '../../img/pic_wap.jpg';

function Top(){

    const history = useHistory();

    const handleLogoClick = () =>{
        history.pushState('/')
    }

    return(
        <>
        <header className="header">
            <a href={handleLogoClick}><img src={pc28logo} class="logo" alt="" /></a>
            <div className="tips">PC28--极力打造精准宾果28、加拿大28人工计划网站</div>
        </header>
        <img src={pcpic} className="all_pic wap_hide" alt="" />
        <img src={wappic} className="all_pic wap_show" alt="" />
        </>
    )
}

export default Top;
