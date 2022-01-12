import * as React from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';


import Canada28 from './games/Canada28';
import Bj28 from './games/Bj28';
import Btc28 from './games/Btc28';
import jsonURL from './../datas/URL.json';
import devKey from './../datas/key.json';

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
                    <Typography  component={'div'}>{children}</Typography>
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

export default function BodyTab() {
    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
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
                    <Tab label="加拿大28" {...a11yProps(0)} />
                    <Tab label="北京28" {...a11yProps(1)} />
                    <Tab label="比特币28" {...a11yProps(2)} />
                </Tabs>
            </Box>
            <TabPanel value={value} index={0}>
                <Canada28 urls={jsonURL.datas.ca} keys={devKey} />
                {console.log(jsonURL.datas.ca)}
            </TabPanel>
            <TabPanel value={value} index={1}>
                <Bj28 urls={jsonURL.datas.bg} keys={devKey}/>
            </TabPanel>
            <TabPanel value={value} index={2}>
                <Btc28 urls={jsonURL.datas.btc} keys={devKey} />
            </TabPanel>
        </Box>
    );
}