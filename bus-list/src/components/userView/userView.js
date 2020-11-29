import React, {Component} from 'react';
import UseServer from '../../service/UseServer';
import './userView.css';
import SpinnerView from './spinner/spinner'

export default class UserView extends Component {
    server = new UseServer()
    state = {
        bus: [],
        people: [],
        loading: true
    }
    componentDidMount() {
        this.updateData()
    }

    updateData = () => {
        this.server.getBusesFromServer()
            .then(bus => this.setState({bus}))
        this.server.getPeopleFromServer()
            .then(people => this.setState({people, loading: false}))
    }

    render(){
        let inCity = [];
        let fromCity = [];
        this.state.people.forEach((pers) => {
            if(pers.peoplePlace){
                if(pers.peopleWhere === 'На берег' || pers.peopleWhere === 'Без возврата'){
                    inCity.push(pers);
                } else {
                    fromCity.push(pers)
                }
            }
        });
        const busMap = this.state.bus.map((item) => {
            let peopleReady = [];
            for(let i = 0; i <= item.countPlace - 1; i++){
                let persInCity = '';
                let persFromCity = '';
                inCity.forEach((inCit) => {
                    if(inCit.peopleBus === item.busName){
                        if(inCit.peoplePlace === (i+1)){
                            persInCity = inCit.peopleName;
                        }
                    }
                });
                fromCity.forEach((fromCit) => {
                    if(fromCit.peopleBus === item.busName){
                        if(fromCit.peoplePlace === (i+1)){
                            persFromCity = fromCit.peopleName;
                        }
                    }
                });
                peopleReady.push((
                    <tr key={i}>
                        <td>{i+1}</td>
                        <td>{persInCity}</td>
                        <td>{persFromCity}</td>
                    </tr>
                ));
            }
            return(
                    <table className="userTable" key={item.busName}>
                        <tbody>
                        <tr>
                            <th colSpan="3">
                                {item.busName} <br/>
                                {new Date(item.dateBus).toLocaleString(
                                    'ru-RU',
                                    {
                                        day: 'numeric',
                                        month: 'numeric',
                                        year: 'numeric'
                                    })}
                            </th>
                        </tr>
                        {peopleReady}
                        </tbody>
                    </table>
            )
        });
        const spinnerMap = this.state.loading ? <SpinnerView/> : busMap

        return(
            <div className='userView'>
                {spinnerMap}
            </div>
        )
    }
}

