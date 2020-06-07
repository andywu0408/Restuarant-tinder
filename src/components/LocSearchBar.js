import React from 'react';
import 'antd/dist/antd.css';
import { Select } from 'antd';
import { cities } from '../assets/usaCities';

const { Option } = Select;

class LocSearchBar extends React.Component {
    constructor(props) {
        super(props);
        this.onChange = this.onChange.bind(this);

        this.state = {
            key: 0,
            children: [<Option key="1" value="1">1</Option>]
        };
    }

    onChange = (value) => {
        console.log(`selected ${value}`);
        this.props.updateVal(value)
    }

    render() {

        return (
            <div style={{ margin: '20px 20px 80px' }}>
                <div style={{ color: 'white', fontSize: 24, marginBottom: 12 }}>
                    Filter by {this.props.type}:
            </div>
                <Select
                    showSearch
                    style={{ width: 200 }}
                    placeholder="Select a location!"
                    optionFilterProp="children"
                    onChange={this.onChange}
                    filterOption={(input, option) =>
                        option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                    }
                >
                    {cities.map(item => (
                        <Option
                            key={item.city + item.state}
                            value={`${item.city}, ${item.state}`}
                        >
                            {`${item.city}, ${item.state}`}
                        </Option>
                    ))}
                </Select>
            </div>
        )
    }
};

export default LocSearchBar;

