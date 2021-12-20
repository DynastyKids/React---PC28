import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

function createData(drawno, numbers, predict,result) {
  return {drawno, numbers, predict,result };
}

const rows = [
    createData('110068807','2021-12-05 23:05:00','2 + 6 + 6 = 14',1),
    createData('110068806','2021-12-05 23:00:00','1 + 0 + 6 = 7',1),
    createData('110068805','2021-12-05 22:55:00','1 + 3 + 1 = 5',1),
    createData('110068804','2021-12-05 22:50:00','7 + 2 + 4 = 13',0),
    createData('110068803','2021-12-05 22:45:00','6 + 0 + 4 = 10',0),
    createData('110068802','2021-12-05 22:40:00','8 + 2 + 9 = 19',0),
    createData('110068801','2021-12-05 22:35:00','2 + 6 + 3 = 11'),
    createData('110068800','2021-12-05 22:30:00','8 + 0 + 4 = 12'),
    createData('110068799','2021-12-05 22:25:00','9 + 7 + 8 = 24'),
    createData('110068798','2021-12-05 22:20:00','9 + 1 + 0 = 10'),
    createData('110068797','2021-12-05 22:15:00','4 + 4 + 0 = 8'),
    createData('110068796','2021-12-05 22:10:00','1 + 9 + 4 = 14'),
    createData('110068795','2021-12-05 22:05:00','8 + 2 + 2 = 12'),
    createData('110068794','2021-12-05 22:00:00','0 + 1 + 3 = 4'),
    createData('110068793','2021-12-05 21:55:00','1 + 8 + 3 = 12'),
    createData('110068792','2021-12-05 21:50:00','9 + 4 + 1 = 14'),
    createData('110068791','2021-12-05 21:45:00','9 + 7 + 2 = 18'),
    createData('110068790','2021-12-05 21:40:00','3 + 1 + 3 = 7'),
    createData('110068789','2021-12-05 21:35:00','9 + 1 + 7 = 17'),
    createData('110068788','2021-12-05 21:30:00','3 + 1 + 1 = 5'),
    createData('110068787','2021-12-05 21:25:00','0 + 3 + 5 = 8'),
    createData('110068786','2021-12-05 21:20:00','6 + 9 + 7 = 22'),
    createData('110068785','2021-12-05 21:15:00','4 + 2 + 5 = 11'),
    createData('110068784','2021-12-05 21:10:00','4 + 3 + 4 = 11'),
    createData('110068783','2021-12-05 21:05:00','1 + 5 + 5 = 11'),
    createData('110068782','2021-12-05 21:00:00','1 + 6 + 2 = 9'),
    createData('110068781','2021-12-05 20:55:00','4 + 9 + 7 = 20'),
    createData('110068780','2021-12-05 20:50:00','2 + 7 + 2 = 11'),
    createData('110068779','2021-12-05 20:45:00','9 + 0 + 8 = 17'),
    createData('110068778','2021-12-05 20:40:00','3 + 9 + 4 = 16')
];

export default function ResultTable() {
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell align="center">期号</TableCell>
            <TableCell align="center">开奖</TableCell>
            <TableCell align="center">预测</TableCell>
            <TableCell align="center">结果</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow
              key={row.drawno}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row" align="center">{row.drawno}</TableCell>
              <TableCell align="center">{row.numbers}</TableCell>
              <TableCell align="center">{row.predict}</TableCell>
              <TableCell align="center">{row.result}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}