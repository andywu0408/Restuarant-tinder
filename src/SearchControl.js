import React from 'react';
import { Select, Spin } from 'antd';

const { Option } = Select;

class SearchControl extends React.Component {
    constructor(props) {
        super(props);
        this.fetchSuggestion = this.fetchSuggestion.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.state = {
            children: [],
            isLoading: true
        };
    }
    componentDidMount() {
        this.mounted = true;
        this.fetchSuggestion();
    }
    componentWillUnmount() {
        this.mounted = false;
    }

    handleChange = value => {
        console.log(`selected ${value}`);
    }

    fetchSuggestion = () => {

        console.log("FetchSuggestion()")

        let lurl = 'https://api.yelp.com/v3/categories?locale=en_US'
        let kek = "https://cors-anywhere.herokuapp.com/"

        let url = kek + lurl;

        fetch(url, {
            headers: {
                //TODO: hide API key with .env
                Authorization: 'Bearer GaS8MVZOoznvBJmkaZgAHxraTNOgmXnfQVffKpt-6WZZGNPSzL4MSzxFes2uD7V4Y-WqW0V_B_kLysY1TBHGShW9_n9O-vTkbSPqDabxNZPBdnFObQDAXes2UazHXnYx',
            }
        }).then(response => { return response.json(); })
            .then(gList => {
                console.log(gList)
                if (this.mounted) {
                    gList.categories.map(item => {
                        if (item.parent_aliases[0] == 'restaurants' || item.parent_aliases[0] == 'food') {
                            this.setState({
                                children: [...this.state.children, <Option key={item.alias}>{item.title}</Option>]
                            })
                        }
                    });
                    this.setState({ isLoading: false })
                }
            });


    };



    render() {

        return (
            <Select
                mode="multiple"
                style={{ width: 400, height: 400 }}
                placeholder="Input a restaurant search keyword or location..."
                notFoundContent={
                    this.state.isLoading ?
                        <div style={{ textAlign: "center" }}>
                            <Spin size="large" tip="loading options..." />
                        </div>
                        : null
                }
                // defaultValue={['a10', 'c12']}
                onChange={this.handleChange}
                size="large"
            >
                {this.state.children}
            </Select>
        );
    }
}

export default SearchControl;