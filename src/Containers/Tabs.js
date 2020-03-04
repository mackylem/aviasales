import React from 'react';
import './style.css';

class Tabs extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            checkCh:false,
            checkFt:false,
            example:this.props.data,
        };
        this.fromCheapToExp = this.fromCheapToExp.bind(this);
        this.fromQuickToLong = this.fromQuickToLong.bind(this);
        this.pickSort = this.pickSort.bind(this);

    }

    pickSort() {
        let mapped;
        const arr = this.state.example;
        if (this.state.checkCh) {
            mapped = arr.map((number, i) => {
                return { index: i, value: number.price};
            });
        }
        if (this.state.checkFt) {
            mapped = arr.map((number, i) => {
                return { index: i, value: number.segments[0].duration + number.segments[1].duration};
            });
        }
        this.props.sort(mapped);
    }

    fromCheapToExp() {
        this.setState({
            checkCh:true,
            checkFt:false,
        }, () => {
            this.pickSort();
        })
    }

    fromQuickToLong() {
        this.setState({
            checkFt:true,
            checkCh:false,
        }, () => {
            this.pickSort();
        })
    }

    render() {
        return(
            <div id="tabs">
                <div onClick={this.fromCheapToExp} className={this.state.checkCh ? "active" : ""} id="cheap">
                    <p>Самый дешевый</p>
                </div>
                <div onClick={this.fromQuickToLong} className={this.state.checkFt ? "active" : ""} id="speed">
                    <p>Самый быстрый</p>
                </div>
            </div>
        )
    }
}

export default Tabs
