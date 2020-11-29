import React, {Component} from 'react'
import { Button, Input, Modal} from 'reactstrap'
import './writePerson.css'
import MiniBus from '../miniBus/miniBus'
import MaxBus from '../maxiBus/maxBus'

export default class WritePerson extends Component {
    state = {
        modalOpen: false
    }

    toggle = () => {
        this.setState({modalOpen: !this.state.modalOpen})
    }

    render(){
        const {personSelected} = this.props;
        const selectBus = this.props.busses.map((item)=>{
            if(item.countPlace === 25 && item.driveHome){
                return (<MiniBus key={item.busName}
                    busName={item.busName}
                    busId={item._id}
                    pers={this.props.pers}
                    writeOnBus={(place, busName, color)=>{
                        this.props.writeOnBus(place, busName, color);
                    }}
                    toggle = {this.toggle}
                                />)
            } else if(item.countPlace === 30 && item.driveHome){
                return (<MaxBus key={item.busName}
                                busName={item.busName}
                                busId={item._id}
                                pers={this.props.pers}
                                writeOnBus={(place, busName, color)=>{
                                    this.props.writeOnBus(place, busName, color);
                                }}
                                toggle = {this.toggle}/>)
            }
            return null;
        });
    const place = (personSelected.peopleBus && personSelected.peoplePlace) ? <div className="selectPlace">{`Автобус ${personSelected.peopleBus}: ${personSelected.peoplePlace} место, ${personSelected.peopleWhere}`}</div> : null;
    const choise = (!personSelected.peoplePlace) ? 
    <>
        <Button onClick={this.toggle}>Выбрать место</Button>
            <Input type="select" onChange={this.props.sendPeople}>
                <option value = "На берег">На берег</option>
                <option value = "С берега">С берега</option>
                <option value = "Без возврата">Без возврата</option>
            </Input>        
        <Modal isOpen={this.state.modalOpen} toggle={this.toggle}>    
            <div className="busContainer">
                <div className="busses">
                {selectBus}
                </div>
            </div>
            <div className="help">
                <span className="red">на берег</span>    
                <span className="blue">с берега</span>    
                <span className="gren">без возврата</span>
            </div>   
        </Modal>

    </> : null;
        return(
            <div className="flexInput">
                {choise}
                {place}
            </div>
        )
    }
}