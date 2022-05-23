import * as React from 'react';
import {useState} from 'react';
import PropTypes from 'prop-types';
import {
    Box,
    CircularProgress,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TablePagination,
    TableRow,
    TableSortLabel,
} from "@material-ui/core";
import {Check, Close, Remove} from "@material-ui/icons";
import axios from "axios";
import {useSession} from "next-auth/client";

function createData(email, approve, disapprove) {
    return {
        email,
        approve,
        disapprove,
    };
}

const rows = []

function descendingComparator(a, b, orderBy) {
    if (b[orderBy] < a[orderBy]) {
        return -1;
    }
    if (b[orderBy] > a[orderBy]) {
        return 1;
    }
    return 0;
}

function getComparator(order, orderBy) {
    return order === 'desc'
        ? (a, b) => descendingComparator(a, b, orderBy)
        : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort(array, comparator) {
    const stabilizedThis = array.map((el, index) => [el, index]);
    stabilizedThis.sort((a, b) => {
        const order = comparator(a[0], b[0]);
        if (order !== 0) {
            return order;
        }
        return a[1] - b[1];
    });
    return stabilizedThis.map((el) => el[0]);
}

const headCells = [
    {
        id: 'email',
        numeric: false,
        disablePadding: true,
        label: 'E-mail',
    },
    {
        id: 'approve',
        numeric: true,
        disablePadding: false,
        label: 'Aprovar',
    },
    {
        id: 'disapprove',
        numeric: true,
        disablePadding: false,
        label: 'Reprovar',
    },
];

function EnhancedTableHead(props) {
    const {order, orderBy, rowCount, onRequestSort} =
        props;
    const createSortHandler = (property) => (event) => {
        onRequestSort(event, property);
    };

    return (
        <TableHead>
            <TableRow>
                {headCells.map((headCell) => (
                    <TableCell
                        key={headCell.id}
                        align={headCell.numeric ? 'right' : 'left'}
                        padding={headCell.disablePadding ? 'none' : 'normal'}
                        sortDirection={orderBy === headCell.id ? order : false}
                    >
                        <TableSortLabel
                            active={orderBy === headCell.id}
                            direction={orderBy === headCell.id ? order : 'asc'}
                            onClick={createSortHandler(headCell.id)}
                        >
                            {headCell.label}
                            {orderBy === headCell.id ? (
                                <Box component="span">
                                    {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                                </Box>
                            ) : null}
                        </TableSortLabel>
                    </TableCell>
                ))}
            </TableRow>
        </TableHead>
    );
}

EnhancedTableHead.propTypes = {
    onRequestSort: PropTypes.func.isRequired,
    order: PropTypes.oneOf(['asc', 'desc']).isRequired,
    orderBy: PropTypes.string.isRequired,
    rowCount: PropTypes.number.isRequired,
};

export default function Requests({requests}) {
    const [order, setOrder] = useState('asc');
    const [orderBy, setOrderBy] = useState('calories');
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [session, loading] = useSession()

    // TODO Auto refresh table, make better UI

    if (loading) {
        return <CircularProgress/>
    }

    requests.forEach(request => {
        const approve = request.status === 0 ?
            <Check className={request._id} onClick={() => handleApprove(request._id)} /> : <Remove />
        const disapprove = request.status === 0 ?
            <Close className={request._id} onClick={() => handleDisapprove(request._id)}/> : <Remove/>
        !rows.find((row) => row.email === request.email) && rows.push(createData(request.email, approve, disapprove))
    })

    const handleRequestSort = (event, property) => {
        const isAsc = orderBy === property && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(property);
    }

    const handleApprove = async (requestId) => {
        await axios.put(`/api/request/${requestId}`, {status: 1, email: session.user.email})
            .then((response) => console.log('Requisição aprovada com sucesso'))
    }

    const handleDisapprove = async (requestId) => {
        await axios.put(`/api/request/${requestId}`, {status: 2, email: session.user.email})
            .then((response) => console.log('Requisição reprovada com sucesso'))
    }

    const handleRevoke = async (requestId) => {
        await axios.put(`/api/request/${requestId}`, {status: 0, email: session.user.email})
            .then((response) => console.log('Requisição revogada com sucesso'))
    }

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

    if (!loading && !rows.length) {
        return (
            <Box sx={{width: '100%'}}>
                <Paper sx={{width: '100%', mb: 2}}>
                    <>
                        <h3>
                            <small>Não possui requisições</small>
                        </h3>
                    </>
                </Paper>
            </Box>
        )
    }

    return (
        <Box sx={{width: '100%'}}>
            <Paper sx={{width: '100%', mb: 2}}>
                <TableContainer>
                    <Table
                        sx={{minWidth: 750}}
                        aria-labelledby="tableTitle"
                        size={'medium'}
                    >
                        <EnhancedTableHead
                            order={order}
                            orderBy={orderBy}
                            onRequestSort={handleRequestSort}
                            rowCount={rows.length}
                        />
                        <TableBody>
                            {stableSort(rows, getComparator(order, orderBy))
                                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                .map((row, index) => {
                                    const labelId = `enhanced-table-${index}`;

                                    return (
                                        <TableRow
                                            hover
                                            tabIndex={-1}
                                            key={row.email}
                                        >
                                            <TableCell
                                                component="th"
                                                id={labelId}
                                                scope="row"
                                                padding="none"
                                            >
                                                {row.email}
                                            </TableCell>
                                            <TableCell align="right">{row.approve}</TableCell>
                                            <TableCell align="right">{row.disapprove}</TableCell>
                                        </TableRow>
                                    );
                                })}
                            {emptyRows > 0 && (
                                <TableRow
                                    style={{
                                        height: (53) * emptyRows,
                                    }}
                                >
                                    <TableCell colSpan={6}/>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </TableContainer>
                <TablePagination
                    rowsPerPageOptions={[5, 10, 25]}
                    component="div"
                    count={rows.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onChangePage={handleChangePage}
                    labelRowsPerPage="Linhas por página"
                />
            </Paper>
        </Box>
    );
}
