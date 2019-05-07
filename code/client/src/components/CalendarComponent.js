import React, { Component } from 'react';
import { Calendar, Alert } from 'antd';
import moment from 'moment';

class CalendarCom extends Component{
    constructor(props){
        super(props);
        this.state = {
            value: moment(),
            selectedValue: moment(),
        }
        this.onSelect = this.onSelect.bind(this);
        this.onPanelChange = this.onPanelChange.bind(this);
    }

    onSelect = (value) => {
        this.setState({
            value,
            selectedValue: value,
        });
    }

    onPanelChange = (value) => {
        this.setState({ value });
    }

    render() {
        const { value, selectedValue } = this.state;
        return (
            <div className='container'>
                <Alert message={`Bạn đang chọn: ${selectedValue && selectedValue.format('DD-MM-YYYY')}`} />
                <Calendar value={value} onSelect={this.onSelect} onPanelChange={this.onPanelChange} />
            </div>
        );
    }
}
export default CalendarCom;
