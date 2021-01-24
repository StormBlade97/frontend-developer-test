import * as React from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import Paper from '@material-ui/core/Paper';

const DataTable = ({ columns, rows, tableController, sortBy, sortDirection, toggleSort }) => {
    const hasData = rows && rows.length > 0;
    
    return <TableContainer component={Paper}>
        <Table aria-label="simple table">
            <TableHead>
                <TableRow>
                    {
                        columns.map(header =>
                            <TableCell component="th" key={header}>
                                <TableSortLabel
                                    active={sortBy === header}
                                    direction={sortDirection}
                                    onClick={toggleSort}
                                >
                                    {header}
                                </TableSortLabel>
                             </TableCell>)
                    }
                </TableRow>
            </TableHead>
            <TableBody>
                {hasData && rows.map((row, idx) => (
                    <TableRow key={idx}>
                        <TableCell>{row.date}</TableCell>
                        <TableCell>
                            {row.userid}
                        </TableCell>
                        <TableCell>{row.oldVal}</TableCell>
                        <TableCell>{row.newVal}</TableCell>
                    </TableRow>
                ))}
                <TableRow>
                    <TableCell align="center" colSpan={columns.length}>
                        {
                            tableController
                        }
                    </TableCell>
                </TableRow>
            </TableBody>
        </Table>
    </TableContainer>;
}

export default DataTable;