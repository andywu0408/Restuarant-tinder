import React from 'react';
import { Select, Spin } from 'antd';
// import debounce from 'debounce';

const { Option } = Select;

class SearchControl extends React.Component {
    constructor(props) {
        super(props);
        this.fetchSuggestion = this.fetchSuggestion.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.state = {
            children: [<Option key="HI">a</Option>],
            finishedFetch: false
        };
    }
    componentDidMount() {
        this.fetchSuggestion();
        this.setState({ finishedFetch: true })
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
        })
            // fetch returns a Promise the resolves into the response object
            .then(response => { return response.json(); })
            // parse the JSON from the server; response.json also returns a Promise that
            // resolves into the JSON content
            .then(gList => {
                gList.categories.map(item => {

                    this.setState({
                        children: [...this.state.children, <Option key={item.alias}>{item.title}</Option>]
                    })


                    // children.push(<Option key={item.alias}>{item.title}</Option>)
                });
            });

    };



    render() {

        const { finishedFetch } = this.state;
        return (
            !finishedFetch ? null :
                <Select
                    mode="multiple"
                    style={{ width: 400, height: 400 }}
                    placeholder="Input a restaurant search keyword or location..."
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