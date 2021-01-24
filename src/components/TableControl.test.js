import React from 'react';
import { shallow } from 'enzyme';
import TableControl from './TableControl';
import { FETCH_STATE } from '../const';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
import { Typography } from '@material-ui/core';


describe("TableControl", () => {
    describe("renders", () => {
        describe("when fetching", () => {
            it("should render", () => {
                const wrapper = shallow(<TableControl
                    fetchState={FETCH_STATE.PENDING}
                    fetchData={jest.fn()}
                />)
                expect(wrapper.getElement()).toMatchSnapshot()
            })
            it("should render spinner instead of Button", () => {
                const wrapper = shallow(<TableControl
                    fetchState={FETCH_STATE.PENDING}
                    fetchData={jest.fn()}
                />)
                expect(wrapper.exists(CircularProgress)).toBe(true);
                expect(wrapper.exists(Button)).toBe(false);

            })
        })
        describe("when fetch error", () => {
            it("should render", () => {
                const wrapper = shallow(<TableControl
                    fetchState={FETCH_STATE.ERROR}
                    fetchData={jest.fn()}
                />);
                expect(wrapper.getElement()).toMatchSnapshot();
            });
            it("should render error message and Button", () => {
                const wrapper = shallow(<TableControl
                    fetchState={FETCH_STATE.ERROR}
                    fetchData={jest.fn()}
                />)
                expect(wrapper.exists(Typography)).toBe(true);
                expect(wrapper.exists(Button)).toBe(true);
            })
        })
        describe("when under other fetch state", () => {
            it("should render only button", () => {
                const wrapper = shallow(<TableControl
                    fetchState={FETCH_STATE.SUCCESSFUL}
                    fetchData={jest.fn()}
                />)
                expect(wrapper.getElement()).toMatchSnapshot()
            })
        })
    })
})