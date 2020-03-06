import React from 'react';
import './style.css';
import {getTime, getTimeFromMins, allFromArr} from "../helper/times";

class Tickets extends React.Component {
    render() {
        const listPrices =
            <div key={this.props.key} className="ticket">
                <div className="top">
                    <p>{this.props.data.price + ' P'}</p>
                    <p>{this.props.data.carrier + ' Airlines'}</p>
                </div>
                <div className="string">
                    <div className="item">
                        <p className="secondaryText">MOW - HKT</p>
                        <p className="primaryText">{this.props.data.segments[0].date.slice(11, 16)
                        + ' - ' + getTimeFromMins(this.props.data.segments[0].date.slice(11, 16),
                            this.props.data.segments[0].duration)}</p>
                    </div>
                    <div className="item">
                        <p className="secondaryText">В пути</p>
                        <p className="primaryText">{getTime(this.props.data.segments[0].duration)}</p>
                    </div>
                    <div className="item">
                        <p className="secondaryText">Пересадки</p>
                        <p className="primaryText">{allFromArr(this.props.data.segments[0].stops)}</p>
                    </div>
                </div>
                <div className="string">
                    <div className="item">
                        <p className="secondaryText">HKT - MOW</p>
                        <p className="primaryText">{this.props.data.segments[1].date.slice(11, 16)
                        + ' - ' + getTimeFromMins(this.props.data.segments[1].date.slice(11, 16),
                            this.props.data.segments[1].duration)}</p>
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        </div>
                    <div className="item">
                        <p className="secondaryText">В пути</p>
                        <p className="primaryText">{getTime(this.props.data.segments[1].duration)}</p>
                    </div>
                    <div className="item">
                        <p className="secondaryText">Пересадки</p>
                        <p className="primaryText">{allFromArr(this.props.data.segments[1].stops)}</p>
                    </div>
                </div>
            </div>;
        return(
            <div className="ticketCont">
                {listPrices}
            </div>
        );
    }
}

export default Tickets;
