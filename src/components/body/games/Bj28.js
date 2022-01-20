import '../../../App.css';
import logo from '../../../img/china.png'

import * as React from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

import FormControl from '@mui/material/FormControl';
import NativeSelect from '@mui/material/NativeSelect'
import ResultTable from '../ResultTable';
import TrendTable from '../TrendTable';
import PredictTable from '../PredictTable';
import axios from 'axios';


class CountdownBG extends React.Component {
    constructor(props) {
        super(props);
        this.state = { time: {}, seconds: isNaN(props.time) ? 60 : Math.abs(props.time) };
        this.timer = 0;
        this.startTimer = this.startTimer.bind(this);
        this.countDown = this.countDown.bind(this);
        this.startTimer()
    }

    secondsToTime(secs) {
        let hours = Math.floor(secs / (60 * 60));
        let divisor_for_minutes = secs % (60 * 60);
        let minutes = Math.floor(divisor_for_minutes / 60);
        let divisor_for_seconds = divisor_for_minutes % 60;
        let seconds = Math.ceil(divisor_for_seconds);
        let obj = {
            "h": hours,
            "m": minutes,
            "s": seconds
        };
        return obj;
    }

    componentDidMount() {
        let timeLeftVar = this.secondsToTime(this.state.seconds);
        this.setState({ time: timeLeftVar });
    }

    startTimer() {
        if (this.timer === 0 && this.state.seconds > 0) {
            this.timer = setInterval(this.countDown, 1000);
        }
    }

    countDown() {
        // Remove one second, set state so a re-render happens.
        let seconds = this.state.seconds - 1;
        this.setState({
            time: this.secondsToTime(seconds),
            seconds: seconds,
        });

        // Check if we're at zero.
        if (seconds === 0) {
            clearInterval(this.timer);
        }
    }

    render() {
        if (this.state.time.m !== 0 || this.state.time.s !== 0) {
            return (
                <>
                    <dl>
                        <dd><em id="bjmin1">{Math.floor(this.state.time.m / 10)}</em></dd>
                        <dd><em id="bjmin2">{Math.floor(this.state.time.m % 10)}</em></dd>
                        <dt id="bjdivider">:</dt>
                        <dd><em id="bjsec1">{Math.floor(this.state.time.s / 10)}</em></dd>
                        <dd><em id="bjsec2">{Math.floor(this.state.time.s % 10)}</em></dd>
                    </dl>
                </>
            );
        } else {
            return (
                <>
                    <dl>
                        <dd><em id="bjmin1">开</em></dd>
                        <dd><em id="bjmin2">奖</em></dd>
                        <dt id="bjdivider"></dt>
                        <dd><em id="bjsec1">中</em></dd>
                        <dd><em id="bjsec2">…</em></dd>
                    </dl>
                </>
            );
        }
    }
}

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


function Bj28(props) {
    // const {addrObjs,key} = props
    const [data, setData] = React.useState({ Data: [] });
    const [dataLoaded, setDataLoaded] = React.useState(false)
    const [historyResults, setHisotryResults] = React.useState({ Data: [] });
    const [predictResults, setPredictResults] = React.useState({ Data: [] });
    const [countdownTime, setCountdownTime] = React.useState(0);

    React.useEffect(() => {
        const requestLatest = axios.get(props.urls.latest)
        const requestHistory = axios.get(props.urls.history + props.keys.key)
        const requestPredict = axios.get(props.urls.predict + props.keys.key)
        var arrdata
        axios.all([requestLatest, requestHistory, requestPredict]).then(axios.spread((...responses) => {
            setData(responses[0].data);
            setHisotryResults(responses[1].data);
            setPredictResults(responses[2].data);
            setDataLoaded(true);
            arrdata=responses[1].data
        }))
        
        const fetchDataAfterInterval = setInterval(() => {
            if((Date.parse(new Date(arrdata.Data[0].time)) / 1000 - 28800 + 300) < (Date.parse(new Date()) / 1000)){
                axios.get(props.urls.latest).then(response => {
                    if(response.data.Draw!==data.Draw){
                        setData(response.data)
                        setDataLoaded(false)
                        axios.get(props.urls.history + props.keys.key).then(response => {setHisotryResults(response.data);})
                        axios.get(props.urls.predict + props.keys.key).then(response => {setPredictResults(response.data);})
                        setDataLoaded(true)
                    }
                })
            }
        }, 5000);
        return () => clearInterval(fetchDataAfterInterval);
    }, []);

    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const optionrows = [];
    const num = [];
    if (dataLoaded) {
        var bg_timenow = Date.parse(new Date())/1000 + (new Date().getTimezoneOffset())*60
        var bg_lastdrawHrs = new Date(historyResults.Data[0].time).getUTCHours()
        var bg_lastdrawMis = new Date(historyResults.Data[0].time).getMinutes()
        var bg_nextdraw = Date.parse(data.Time)/1000-28800+300;
        if(bg_lastdrawHrs>=23 && bg_lastdrawMis>=51){
            bg_nextdraw = Date.parse(historyResults.Data[0].time)/1000-28800+32400
        }
        var countdown = bg_nextdraw - bg_timenow
        for (let i = 0; i < 50; i++) {
            optionrows.push(<option value={data.Draw - i}>{data.Draw - i}</option>)
        }

        num.push(<><dd>{data.calc.substr(0, 1)}</dd><dt>+</dt></>)
        num.push(<><dd>{data.calc.substr(4, 1)}</dd><dt>+</dt></>)
        num.push(<><dd>{data.calc.substr(8, 1)}</dd><dt>=</dt></>)
        const addednum = parseInt(data.calc.substr(0, 1)) + parseInt(data.calc.substr(4, 1)) + parseInt(data.calc.substr(8, 1))
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

    if (dataLoaded) {
        return (
            <>
                {/* Upper part */}
                <div id="">
                    <div className="flex_main">
                        <div className="info">
                            <div className="left"><img src={logo} alt="CA28icon" /></div>
                            <div className="right">
                                <div className="bt">最新：<span>{data === undefined ? 0 : data.Draw}</span>期</div>
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
                            <CountdownBG time={countdown>0 ? countdown : 0} />
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
                        {historyResults.Status==='00' ? <ResultTable data={historyResults} /> : (historyResults.Status==='01' ? "当前数据服务已过期，请联系服务商续期": "数据源连接出现了问题")}
                    </TabPanel>
                    <TabPanel value={value} index={1}>
                        {historyResults.Status==='00' ? <TrendTable data={historyResults} /> : (historyResults.Status==='01' ? "当前数据服务已过期，请联系服务商续期": "数据源连接出现了问题")}
                    </TabPanel>
                    <TabPanel value={value} index={2}>
                        {predictResults.Status==='00' ? <PredictTable preddata={predictResults} histdata={historyResults} /> : (historyResults.Status==='01' ? "当前数据服务已过期，请联系服务商续期": "数据源连接出现了问题")}
                    </TabPanel>
                </Box>
            </>
        );
    } else {
        return (<></>);
    }
}


export default Bj28;