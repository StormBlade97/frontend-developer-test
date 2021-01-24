import React from 'react';
import { FETCH_STATE } from '../const';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import CircularProgress from '@material-ui/core/CircularProgress';


const TableControl = ({ fetchState, fetchData }) => {
    const isError = fetchState === FETCH_STATE.ERROR;
    const isLoading = fetchState === FETCH_STATE.PENDING;
    const buttonLabel = isError ? "Retry" : "Load more";

    return <Box p={1}>
        {isError &&
            <Box m={1}>
                <Typography color="error">We had problems fetching your data. Please try again</Typography>
            </Box>
        }
        {
            isLoading ? <CircularProgress ></CircularProgress> :
                <Button variant="contained" color="primary" onClick={fetchData}>
                    {buttonLabel}
                </Button>
        }
    </Box>
}

export default TableControl;