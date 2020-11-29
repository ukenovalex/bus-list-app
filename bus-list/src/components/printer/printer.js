import React, {Component} from 'react';
import './printer.css';

export default class Printer extends Component {

    getDataNow = () => {
        const date = new Date();
        const day = (date.getDate() < 10) ? `0${date.getDate()}` : date.getDate();
        const mounth = (date.getMonth() < 10) ? `0${date.getMonth()+1}` : date.getMonth()+1;
        const year = date.getFullYear();
        return `${day}.${mounth}.${year}`;
    }

    render(){
        document.body.addEventListener('dblclick', (e)=>{
            e.stopPropagation();
            window.print();
        });
        let inCity = [];
        let fromCity = [];
        this.props.people.forEach((pers) => {
            if(pers.peoplePlace){
                if(pers.peopleWhere === 'На берег' || pers.peopleWhere === 'Без возврата'){
                    inCity.push(pers);
                } else {
                    fromCity.push(pers)
                }
            }
        });
        const busMap = this.props.bus.map((item) => {
        let peopleReady = [];
            if(item.driveHome){
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
                        <table key={item.busName}>
                            <tbody>
                            <tr>
                                <th colSpan="3"><article contentEditable>{this.getDataNow()} {item.busName} 17:05</article></th>
                            </tr>
                            {peopleReady}
                            </tbody>
                        </table>
                )
            }
            return null
        });
        return(
            <>
                {busMap}
            </>
        )
    }
}