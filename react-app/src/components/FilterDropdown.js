import "../styles.css";
import React from "react";
import Select from 'react-select';

export default class FilterDropdown extends React.Component {

    state = {
        selectedOption: null,
        options: [
            { value: 'A', label: 'a' },
            { value: 'B', label: 'b' },
            { value: 'C', label: 'c' },
            { value: 'D', label: 'd' },
        ],
    };

    handleChange = selectedOption => {
        this.setState({ selectedOption });
        console.log(`Option selected:`, selectedOption);
    };
    render() {
        const { selectedOption } = this.state;
        return (
            <>
                <Select
                    value={selectedOption}
                    onChange={this.handleChange}
                    options={this.state.options}
                />
            </>
        );
    }
}
