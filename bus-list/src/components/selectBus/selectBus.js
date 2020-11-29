import React, {Component} from 'react';
import { ButtonGroup, Button } from 'reactstrap';




export default class SelectBus extends Component {

    render(){
        const {bus} = this.props;
        const content = bus.map((item) => {
                        return (
                        <Button key={item.busName} color="primary" 
                                onClick={()=>{this.props.selectBusClick(item._id)}}
                                active={item.driveHome}>{item.busName}</Button>
                        )
                        });
        return(
            <>
                <div>Выберите автобусы которые поедут на берег:</div>
                <ButtonGroup>
                    {content}
                </ButtonGroup>
            </>
        )
    }
}