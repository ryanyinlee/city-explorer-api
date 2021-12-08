import React, { Component } from 'react'
import axios from 'axios';

export default class App extends Component {

    constructor(props) {
        super(props);
        this.state = {
            christmasList: []
        }
    }

christmasListRequest = asynch() => {
    const gottenChristmasList = await axios.get(`${process.env.REACT_APP_URL}/christmaslist`);
    this.setState({ christmasList: gottenChristmasList.data })
}


render() {
    return (
        <div>

        </div>
    )
}
}
