import React from 'react';
import { FETCH_STATE } from '../const';

import Box from '@material-ui/core/Box';
import DataTable from './DataTable';
import TableControl from './TableControl';
import { format } from 'date-fns';
import { sortByDate, mapToTableData, uniqueBy } from './utils';

class DataLoader extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            sortDir: 'asc',
            errorMessage: '',
            fetchState: FETCH_STATE.INITIAL
        }
    }
    
    handleFetchData = async () => {
        try {
            this.setState({ ...this.state, fetchState: FETCH_STATE.PENDING });
            const result = await this.props.api();
            
            this.setState({
                ...this.state, fetchState: FETCH_STATE.SUCCESSFUL,
                data: uniqueBy([...this.state.data, ...result.data], 'timestamp')
            });
        }
        catch (error) {
            this.setState({ ...this.state, fetchState: FETCH_STATE.ERROR, errorMessage: error.message});
        }
    }

    toggleSortDir = async () => {
        this.setState({
            ...this.state,
            sortDir: this.state.sortDir === 'asc' ? 'desc' : 'asc'
        });
    }

    componentDidMount() {
        this.handleFetchData();
    }

    render() {
        const { sortDir, data, errorMessage, fetchState } = this.state;
        const sortFn = sortByDate(this.state.sortDir);
        const rows = mapToTableData(data)
            .sort(sortFn)
            .map(({ date, ...rest }) => ({ ...rest, date: format(date, 'yyyy-MM-dd') }));
    
        return (
            <Box data-test="app-box" m={2}>
                <DataTable
                    errorMessage={errorMessage}
                    fetchState={fetchState}
                    columns={['Date', 'User id', 'Old value', 'New value']}
                    sortBy={'Date'}
                    sortDirection={sortDir}
                    toggleSort={this.toggleSortDir}
                    rows={rows}
                    tableController={
                        <TableControl
                            data-test='table-controller'
                            fetchState={fetchState}
                            fetchData={this.handleFetchData} />
                    }
                />
            </Box>
        );
    }
}
export default DataLoader;