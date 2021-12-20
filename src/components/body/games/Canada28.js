import '../../../App.css';
import ca28logo from '../../../img/canada.png'

import * as React from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

import FormControl from '@mui/material/FormControl';
import NativeSelect from '@mui/material/NativeSelect'
import ResultTable from '../ResultTable';
import rows from '../ResultTable'
import axios from 'axios'
import Countdown from '../Countdown';

function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box sx={{ p: 3 }}>
                    <Typography component={'div'}>{children}</Typography>
                </Box>
            )}
        </div>
    );
}

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
};

function a11yProps(index) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}


function Canada28(props) {
    // const {addrObjs,key} = props
    const [isLoading, setLoading] = React.useState(true)
    const [data, setData] = React.useState({ Data: [] });
    const [historyResults, setHisotryResults] = React.useState({ Data: [] });
    const [predictResults, setPredictResults] = React.useState({ Data: [] });
    

    React.useEffect(() => {
        // 获取当前期数据
        axios.get(props.urls.latest).then(response => {
            setData(response.data);
        })

        //获取历史数据
        axios.get(props.urls.history + props.keys.key).then(response => {
            setHisotryResults(response.historyResults);
        })

        //获取预测数据
        axios.get(props.urls.predict + props.keys.key).then(response =>{
            setPredictResults(response.predictResults);
        })
    }, []);

    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    // console.log(data)
    // console.log(historyResults)

    const optionrows = [];
    const num = [];
    if (data.Data !== undefined) {
        for (let i = 0; i < 50; i++) {
            optionrows.push(<option value={data.Data - i}>{data.Data - i}</option>)
        }
    }

    if (data.result !== undefined) {
        num.push(<><dd>{data.result.substr(0, 1)}</dd><dt>+</dt></>)
        num.push(<><dd>{data.result.substr(4, 1)}</dd><dt>+</dt></>)
        num.push(<><dd>{data.result.substr(8, 1)}</dd><dt>=</dt></>)
        const addednum = parseInt(data.result.substr(0, 1)) + parseInt(data.result.substr(4, 1)) + parseInt(data.result.substr(8, 1))
        num.push(<><dd className="zong">{addednum}</dd></>)
        if (addednum <= 14) {
            if (addednum % 2 === 0) {
                num.push(<dt>（ 小 ，双 ）</dt>)
            } else {
                num.push(<dt>（ 小 ，单 ）</dt>)
            }
        } else {
            if (addednum % 2 === 0) {
                num.push(<dt>（ 大 ，双 ）</dt>)
            } else {
                num.push(<dt>（ 大 ，单 ）</dt>)
            }
        }
    }

    var nextdraw = Date.parse(data.Time + ".000+08:00") + 210000;
    var nextdate = new Date(0)
    nextdate.setUTCMilliseconds(Date.parse(data.Time + ".000+08:00") + 210000)
    if (nextdate.getHours() === 20) {
        nextdate = nextdate + 3390000
    }


    const calculateTimeLeft = () => {
        // const difference = +new Date() - +new Date();
        const difference = +new Date(Date.parse(data.Time + ".000+08:00") + 210000) - +new Date();
        let timeLeft = {};
        if (difference > 0) {
            timeLeft = {
                hours: Math.floor((difference / (1000 * 60 * 60))),
                minutes: Math.floor((difference / 1000 / 60) % 60),
                seconds: Math.floor((difference / 1000) % 60),
            };
        } else{
            axios.get(props.urls.latest).then(response => {
                setData(response.data)
            })
        }
        return timeLeft;
    };

    const [timeLeft, setTimeLeft] = React.useState(calculateTimeLeft());
    
    React.useEffect(() => {
        setTimeout(() => {
            setTimeLeft(calculateTimeLeft());
        }, 1000);
        console.log(timeLeft)
    })

    return (
        <>
            {/* Upper part */}
            <div id="">
                <div className="flex_main">
                    <div className="info">
                        <div className="left"><img src={ca28logo} alt="CA28icon" /></div>
                        <div className="right">
                            <div className="bt">最新：<span>{data === undefined ? 0 : data.Data}</span>期</div>
                            <div className="qis_but">
                                <Box sx={{ minWidth: 120 }}>
                                    <FormControl fullWidth>
                                        <NativeSelect
                                            defaultValue={30}
                                            inputProps={{
                                                name: 'drawno',
                                                id: 'uncontrolled-native',
                                            }}
                                        >
                                            {optionrows}
                                        </NativeSelect>
                                    </FormControl>
                                </Box>
                                {/* <div className="prev"></div> */}
                                {/* <div className="t">123</div> */}
                                {/* <div className="next"></div> */}
                            </div>
                        </div>
                    </div>
                    <div className="line"></div>
                    <div className="date">下一期：
                        <Countdown date={nextdraw} />
                    </div>
                    <div className="line"></div>
                    <dl className="kai">
                        {num}
                    </dl>
                </div>
            </div>

            {/* Lower part */}

            <Box sx={{ width: '100%' }}>
                <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                    <Tabs
                        value={value}
                        onChange={handleChange}
                        aria-label="basic tabs example"
                        textColor="secondary"
                        indicatorColor="secondary"
                        variant="fullWidth"
                    >
                        <Tab label="结果" {...a11yProps(0)} />
                        <Tab label="走势" {...a11yProps(1)} />
                        <Tab label="预测" {...a11yProps(2)} />
                    </Tabs>
                </Box>
                <TabPanel value={value} index={0}>
                    <ResultTable url={props.urls.history + props.keys.key} />
                </TabPanel>
                <TabPanel value={value} index={1}>
                    走势
                </TabPanel>
                <TabPanel value={value} index={2}>
                    预测
                </TabPanel>
            </Box>
        </>
    );
}
export default Canada28;