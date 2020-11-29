import React, {Component} from 'react'




export default class SelectPeople extends Component {

    render(){
        return(
            <>
                <div>Выберите людей которые поедут на берег:</div>
                {this.props.unit}

            </>
        )
    }
}
