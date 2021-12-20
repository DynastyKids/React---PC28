import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import axios from 'axios'
import { ArrowForwardIosTwoTone } from '@material-ui/icons';

import './../../App.css';

function createData(draw, date, result) {
    return { draw, date, result };
}

export default function ResultTable(props) {
    const [data, setData] = React.useState({ Data: [] });

    React.useEffect(() => {
        const fetchdata = async () => {
            const results = await axios(props.url,);
            setData(results.data)
        };
        fetchdata();
    }, []);

    return (
        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell align="center" className='th'>期号</TableCell>
                        <TableCell align="center" className='th'>时间</TableCell>
                        <TableCell align="center" className='th'>号码</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {data.Data.map((item) => (
                        <TableRow key={item.draw}
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                            <TableCell component="th" scope="row" align="center">{item.draw}</TableCell>
                            <TableCell align="center">{item.time.replace('T',' ')}</TableCell>
                            <TableCell align="center">{item.calc + " = " + item.result}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}