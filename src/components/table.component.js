import * as React from 'react';
import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import TableContainer from '@mui/material/TableContainer';
import Table from '@mui/material/Table';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableBody from '@mui/material/TableBody';
import Paper from '@mui/material/Paper';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: '#6F4E37',
      color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 14,
    },
  }));
  
const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    '&:last-child td, &:last-child th': {
      border: 0,
    },
  }));

const TableMui = ({ headers, data, handleEditRow, handleDeleteRow }) => {
  return (
    <TableContainer component={Paper}>
      <Table aria-label="simple table">
        <TableHead>
            <TableRow>
                {headers.map((header, index) => (
                    <StyledTableCell key={index} sx={{ width: '10%' }}>{header}</StyledTableCell>
                ))}
            </TableRow>
        </TableHead>
        <TableBody>
            {data.map((row, index) => (
            <StyledTableRow  key={index}>
                {row.map((cell, cellIndex) => (
                    <StyledTableCell key={cellIndex}>{cell}</StyledTableCell>
                ))}
                <StyledTableCell>
                    <Button variant="text" 
                        onClick={() => handleEditRow(index)}
                        >Edit</Button>
                    <Button variant="text" 
                        onClick={() => handleDeleteRow(index)}
                        >Delete</Button>
                </StyledTableCell>
            </StyledTableRow>
            ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default TableMui;