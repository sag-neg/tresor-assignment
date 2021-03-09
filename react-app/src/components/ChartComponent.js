import React from "react";
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend
} from "recharts";
import "./style.css";

export default class ChartComponent extends React.Component {
    state = {
        input: [],
        output: [],
    };
    constructor(props) {
        super(props);
        this.filterMonth.bind(this);
        this.arryTransform.bind(this);
    }
   componentDidMount() {
        fetch('http://localhost:3099/').then( result => {
            return result.json();
        }).then(result => {
            this.setState({ input: result}, () => {
                // console.log('after api call: ', this.state.input);
                this.arryTransform();
            });
        });
    }
    // transform csv date to month e.g. jan
    filterMonth(input_date) {
        return new Date(input_date.split('/')[0], input_date.split('/')[1] - 1, input_date.split('/')[2]).toString().substring(4, 7);
    }
    // Transform array into feedable data for graph
    arryTransform() {
        let output = [];
        for (let i = 0; i < this.state.input.length; i++) {
            if(!output.length) {
                let object = {
                    count: 1,
                    month: this.filterMonth(this.state.input[i]['Date']),
                    data: [this.state.input[i]]
                };
                output.push(object);
            } else {
                if (output[output.length-1].month === this.filterMonth(this.state.input[i]['Date'])) {
                    output[output.length-1].count++;
                    output[output.length-1].data.push(this.state.input[i]);
                } else {
                    let object = {
                        count: 1,
                        month: this.filterMonth(this.state.input[i]['Date']),
                        data: [this.state.input[i]]
                    };
                    output.push(object);
                }
            }
        }
        // push final array to state
        this.setState({ output: output}, () => {
            // console.log('check check: ', this.state.output);
        });
    }
    render() {
        return (
            <>
                <BarChart class="chart"
                    width={900} height={400} data={this.state.output}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="count" fill="#799f0c" />
                </BarChart>
            </>
        );
    }
}
