import React from 'react';
import { shallow, mount } from 'enzyme';
import DataLoader from './DataLoader';
import DataTable from './DataTable';
import TableControl from './TableControl';
import { act } from 'react-dom/test-utils';
import { usersDiff } from '../lib/api/data';
import * as utilsModule from './utils';

describe("DataLoader", () => {
    describe("data fetching", () => {
        it("has correct default state", async () => {
            const apiFn = jest.fn(() => Promise.resolve([{}]));
            const wrapper = shallow(<DataLoader api={apiFn}></DataLoader>);

            expect(wrapper.state()).toMatchSnapshot()
        });
        it("fetches and accumulates unique data entries", async () => {
            const [dataSet1, dataSet2, ...unused] = usersDiff;
            const apiFn = jest.fn()
                .mockReturnValueOnce(Promise.resolve({ data: [dataSet1] }))
                .mockReturnValueOnce(Promise.resolve({ data: [dataSet2] }))
                .mockReturnValueOnce(Promise.resolve({ data: [dataSet2] }));

            const wrapper = shallow(<DataLoader api={apiFn}></DataLoader>);
            const fetchData = wrapper.instance().handleFetchData;
                
            await fetchData();
            await fetchData();

            expect(apiFn.mock.calls.length).toBe(3);
            expect(wrapper.state()).toMatchSnapshot();
        });

        it("sorts newly fetched data", () => {
            const [dataSet1, dataSet2, ...unused] = usersDiff;
            const sortFnSpy = jest.spyOn(utilsModule, 'sortByDate');

            const apiFn = jest.fn()
                .mockReturnValueOnce(Promise.resolve([dataSet1]))
                .mockReturnValueOnce(Promise.resolve([dataSet2]));

            const wrapper = shallow(<DataLoader api={apiFn}></DataLoader>);
            const fetchData = wrapper.find(DataTable).props().tableController.props.fetchData;
                
            fetchData();
            fetchData();

            expect(sortFnSpy.mock.calls).toMatchSnapshot();
        })
    })
    describe("effects", () => {
        it("calls API on mount", () => {
            const apiFn = jest.fn()
            shallow(<DataLoader api={apiFn}></DataLoader>);

            expect(apiFn).toBeCalledTimes(1);
        })
    })
    describe("renders", () => {
        it("render DataTable", () => {
            const apiFn = jest.fn()
            expect(shallow(<DataLoader api={apiFn}></DataLoader>).debug()).toMatchSnapshot();
        });
        it("provides correct props to DataTable", () => {
            const apiFn = jest.fn()
            const wrapper = shallow(<DataLoader api={apiFn}></DataLoader>);
            expect(wrapper.find(DataTable).props()).toMatchSnapshot();
        });
        it("provides correct props to TableController", () => {});
    })
})