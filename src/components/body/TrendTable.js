import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

export default function ResultTable(props) {
    const [data, setData] = React.useState({ Data: [] });

    React.useEffect(() => {
        setData(props.data);
    }, []);

    return (
        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell align="center" className='th' colSpan={2}>期号</TableCell>
                        <TableCell align="center" className='th'>值</TableCell>
                        <TableCell align="center" className='th'>大</TableCell>
                        <TableCell align="center" className='th'>小</TableCell>
                        <TableCell align="center" className='th'>单</TableCell>
                        <TableCell align="center" className='th'>双</TableCell>
                        <TableCell align="center" className='th' colSpan={2}>大单</TableCell>
                        <TableCell align="center" className='th' colSpan={2}>大双</TableCell>
                        <TableCell align="center" className='th' colSpan={2}>小单</TableCell>
                        <TableCell align="center" className='th' colSpan={2}>小双</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {data.Data.map((item) => (
                        <TableRow key={item.draw}
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                            <TableCell component="th" scope="row" align="center" colSpan={2}>{item.draw}</TableCell>
                            <TableCell align="center">{item.result}</TableCell>
                            <TableCell align="center" sx={"width: '30px',height: '30px',lineHeight: '28px',textAlign: 'center',borderRadius: '30px', border: '1px solid #7f1ad5',boxShadow: '0 0 8px #7f1ad5 inset',display: 'inline-block'"}>{item.result >=14 ? <span className='icon'>大</span>: ""}</TableCell>
                            <TableCell align="center">{item.result >=14 ? "" : <span className='icon'>小</span>}</TableCell>
                            <TableCell align="center">{item.result%2===1 ? <span className='icon'>单</span> : ""}</TableCell>
                            <TableCell align="center">{item.result%2===1 ? "" : <span className='icon'>双</span>}</TableCell>
                            <TableCell align="center" colSpan={2}>{item.result >=14 && item.result%2===1 ? <span className='icon-wide'>大单</span> : ""}</TableCell>
                            <TableCell align="center" colSpan={2}>{item.result >=14 && item.result%2===0 ? <span className='icon-wide'>大双</span> : ""}</TableCell>
                            <TableCell align="center" colSpan={2}>{item.result <14 && item.result%2===1 ? <span className='icon-wide'>小单</span> : ""}</TableCell>
                            <TableCell align="center" colSpan={2}>{item.result <14 && item.result%2===0 ? <span className='icon-wide'>小双</span> : ""}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}