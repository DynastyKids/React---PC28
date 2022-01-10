import React from 'react';
// import logo from './img/logo.png';
import "./App.css";

import Top from './components/top/Top';
import BodyTab from './components/body/BodyTab';
import backgroundpic from './img/background.jpg'

function App() {

  const [value, setValue] = React.useState('1');

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const bodyStyle = {
    fontSize: "16px",
    color: "#000000",
    lineHeight: "normal",
    fontFamily: '"Microsoft Yahei", "Helvetica", "STHeitiSC-Light", "Arial", sans-serif',
    WebkitFontSmoothing: "antialiased",
    background: `#f0e6fb url(${backgroundpic}) center bottom no-repeat`
  }

  return (
    <>
    <div style={bodyStyle}>
      <div className="container">
        <Top/>
        <div className="jiang">
          <BodyTab />
        </div>

        <div className="tip">本站提供宾果28、加拿大28预测，仅供参考</div>
        <footer>Copyright©PC28网络科技有限公司</footer>
      </div>
    </div>
    </>
  );
}

export default App;
