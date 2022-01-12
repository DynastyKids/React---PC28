import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import icon_yes from '../../img/icon_yes.png';
import icon_no from '../../img/icon_no.png';

import './../../App.css';

export default function ResultTable(props) {
  const [predict_data, setPredictData] = React.useState({ Data: [] });
  const [history_data, setHistoryData] = React.useState({ Data: [] });
  const [modified_data, setModifiedData]=React.useState({Data:[]});
  const [isReady, setReady] = React.useState(false)
  const [isLoaded, setLoaded] = React.useState(false)

  React.useEffect(() => {
    setPredictData(props.preddata);
    setHistoryData(props.histdata);
    setLoaded(true);
}, []);

  if(isReady && isLoaded){
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
          {predict_data.Data.map((row) => (
            <TableRow
              key={row.draw}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row" align="center">{row.draw}</TableCell>
              <TableCell align="center">{row.history}</TableCell>
              <TableCell align="center">{row.size===1 ? "大 | " : "小 | "}{row.odd === 1 ? "奇" : "偶"}</TableCell>
              <TableCell align="center">{row.match!==undefined ? (row.match===1? <img src={icon_yes}/>:<img src={icon_no}/>) : ""}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
  } else if (isLoaded){
    var valueset=predict_data.Data
    for (let index = 0; index < predict_data.Data.length; index++) {
      for (let indexj = 0; indexj < history_data.Data.length; indexj++) {
        if(predict_data.Data[index].draw === history_data.Data[indexj].draw){
          valueset[index].history=history_data.Data[indexj].calc + " = "+history_data.Data[indexj].result
          valueset[index].value=history_data.Data[indexj].result
          
            if(valueset[index].value >=14 && valueset[index].size===1 || valueset[index].value<14 && valueset[index].size===0 || valueset[index].value%2 == valueset[index].odd){
              valueset[index].match = 1
            } else{
              valueset[index].match = 0
            }
          break;
        }
      }
    }
    setPredictData({Data:valueset})
    setReady(true);
    return(<></>);
  } else {
    return(<></>);
  }
}