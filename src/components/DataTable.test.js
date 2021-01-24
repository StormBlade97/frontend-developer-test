import React from 'react';
import { shallow } from 'enzyme';
import DataTable from './DataTable';
import TableSortLabel from '@material-ui/core/TableSortLabel';

describe("DataTable", () => {
    const rows = [{
        userid: '1',
        date: '2020-12-01',
        oldVal: 'old',
        newVal: 'new'
    }, {
        userid: '2',
        date: '2020-12-02',
        oldVal: 'old',
        newVal: 'new'
        }]
    const columns = ['a', 'b', 'c', 'd']
    describe("render", () => {
        it("renders", () => {
            const wrapper = shallow(<DataTable
                tableController={"Controller"}
                columns={columns}
                sortBy={'a'}
                sortDirection={'asc'}
                rows={rows}
            />)
            expect(wrapper.debug()).toMatchSnapshot()
        })
    })
    describe("sort feature", () => {
        it("renders desc sort arrow", () => {
            const wrapper = shallow(<DataTable
                tableController={"Controller"}
                columns={columns}
                sortBy={'a'}
                sortDirection={'desc'}
                rows={rows}
            />)
            expect(wrapper.find(TableSortLabel).debug()).toMatchSnapshot();
        })
        it("renders asc sort arrow", () => {
            const wrapper = shallow(<DataTable
                tableController={"Controller"}
                columns={columns}
                sortBy={'a'}
                sortDirection={'desc'}
                rows={rows}
            />);
            expect(wrapper.find(TableSortLabel).debug()).toMatchSnapshot();
        })
        it("pass toggleSort callback to underlying TableSortLabel", () => {
            const toggleSort = jest.fn()
            shallow(<DataTable
                tableController={"Controller"}
                columns={columns}
                sortBy={'a'}
                sortDirection={'desc'}
                rows={rows}
                toggleSort={toggleSort}
            />);
            expect(toggleSort.mock.calls).toMatchSnapshot();
        })
    })
})