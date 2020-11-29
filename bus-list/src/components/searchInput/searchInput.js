import React, { Component } from 'react';
import { InputGroup, Input} from 'reactstrap';
import './searchInput.css'

export default class SearchInput extends Component{
    constructor(props){
        super(props);
        this.state = {
            term: ""
        };
    }
    onUpdateSearch = (e) => {
        const term = e.target.value;
        this.setState({term});
        this.props.onUpdateSearch(term);
    }
    render(){
        return(
            <div className="input-search">
                <label>Поиск сотрудников:</label>
                <InputGroup>

                    <Input placeholder="Введите фамилию..."
                           onChange={this.onUpdateSearch}
                           type="text"/>
                </InputGroup>
            </div>
        )
    }

}