import React, {Component} from 'react';
import './app.css';
import SelectBus from '../selectBus/selectBus.js';
import SelectPeople from '../selectPeople/selectPeople';
import UseServer from '../../service/UseServer';
import WritePerson from '../../components/writePerson/writePerson'
import { Button, Container, Collapse, Alert, Input, Form, Spinner} from 'reactstrap';
import {BrowserRouter as Router, Route, Link} from 'react-router-dom';
import Printer from '../printer/printer';
import LoginUser from '../loginUser/loginUser';
import UserView from '../userView/userView';
import SearchInput from "../searchInput/searchInput";
import {units} from './appArrays';
import {debounce} from '../../utils'


export default class App extends Component{
  dataServer = new UseServer();
  state = {
    bus: [],
    people: [],
    openUnit: null,
    addPerson: false,
    logined: false
  }
  componentDidMount(){
    this.updateBusData();
    this.updatePeopleData();
  }

  updateBusData = () => {
    this.dataServer.getBusInfo()
    .then((bus)=>{
      this.setState({bus});
    })
    .catch((err) => {console.log(err);});
  }
  updatePeopleData = () => {
    this.dataServer.getAllPeople()
        .then((people)=>{
        this.setState({people});
    }).catch((err) => {console.log(err);});
  }
  btnSelectedClick = (id) => {
    this.setState(({bus})=>{
        const idx = bus.findIndex(elem => elem._id === id);
        const old = bus[idx];
        let newItem = {...old, driveHome: !old.driveHome};
        const newArr = [...bus.slice(0, idx), newItem, ...bus.slice(idx + 1)];
        return {
            bus: newArr
        }
    });
  }
  writerPerson = (item) => {
    this.setState({addPerson: false});
    this.setState(({people}) => {
        const idx = people.findIndex((el)=>el.peopleId === item.peopleId);
        const old = people[idx];
        const whereDrive = !old.peopleWhere ? 'На берег' : null;
        const newItem = {...old, peopleWhere: whereDrive, peopleBus: null, peoplePlace: null};
        const newArr = [...people.slice(0, idx), newItem, ...people.slice(idx + 1)];
        return {
            people: newArr
        }
    });
  }
  sendPeople = (e, id) => {
    const event = e.target.value.toString();
    this.setState(({people}) => {
      const idx = people.findIndex((el) => el.peopleId === id);
      const old = people[idx];
      const newItem = {...old, peopleWhere: event};
      const newArr = [...people.slice(0, idx), newItem, ...people.slice(idx + 1)];
      return {
        people: newArr
      }
    })
  }
  getUnitPeople = (unit) => {
    const unitGet = this.getUnit(unit);
    let open = false;
    if(this.state.openUnit === unit){
      open = !open;
    }
    return(
      <div key={unit} className="unitBtn">
        <Button onClick={()=>{
          if(!open){
            this.setState({openUnit: unit});
          } else {
            this.setState({openUnit: null});
          }

          }}>{unit}:</Button>
        <Collapse isOpen={open}>
           <Alert className="alertUnit">
               {unitGet}
           </Alert>
        </Collapse>
      </div>
    )
  }
  writeOnBus = (place, busName, item, color) => {
      if(!item.peoplePlace && item.peopleWhere === 'На берег' && color === 'secondary'){
        this.setState(({people}) => {
          const idx = people.findIndex((el) => el.peopleId === item.peopleId);
          const old = people[idx];
          const newItem = {...old, peopleBus: busName, peoplePlace: place};
          const newArr = [...people.slice(0, idx), newItem, ...people.slice(idx + 1)];
          return {
            people: newArr
          }
        });
      } else if(!item.peoplePlace && item.peopleWhere === 'С берега' && (color === 'secondary' || color === 'success')) {
        this.setState(({people}) => {
          const idx = people.findIndex((el) => el.peopleId === item.peopleId);
          const old = people[idx];
          const newItem = {...old, peopleBus: busName, peoplePlace: place};
          const newArr = [...people.slice(0, idx), newItem, ...people.slice(idx + 1)];
          return {
            people: newArr
          }
        });
      } else if(!item.peoplePlace && item.peopleWhere === 'Без возврата' && (color === 'secondary' || color === 'primary')) {
        this.setState(({people}) => {
          const idx = people.findIndex((el) => el.peopleId === item.peopleId);
          const old = people[idx];
          const newItem = {...old, peopleBus: busName, peoplePlace: place};
          const newArr = [...people.slice(0, idx), newItem, ...people.slice(idx + 1)];
          return {
            people: newArr
          }
        });
      } else {
        this.setState(({people}) => {
          const idx = people.findIndex((el) => el.peopleId === item.peopleId);
          const old = people[idx];
          const newItem = {...old, peopleBus: null, peoplePlace: null};
          const newArr = [...people.slice(0, idx), newItem, ...people.slice(idx + 1)];
          return {
            people: newArr
          }
        });
      }
  }
   deletePerson = async (id) => {
    await this.setState(({people})=>{
      const idx = people.findIndex((el) => el.peopleId === id);
      const newArr = [...people.slice(0, idx), ...people.slice(idx + 1)];
      return {
        people: newArr
      }
    });
    debounce(this.dataServer.deletePerson(this.state.people, {id}), 300);
  }
  getSearchPeople = (term) => {
      const people = this.state.people.filter((pers) => {
          return pers.peopleName.indexOf(term) > -1;
      })
      if(people.length){
          return people.map((item) => {
                  if(item.peopleWhere === null){
                      return (
                          <div key={item.peopleId}>
                              <Button className="unitControl" color="danger" onClick={() =>this.writerPerson(item)}>
                                  {item.peopleName}
                              </Button>
                              <button className="close" onClick={()=>{this.deletePerson(item.peopleId)}}>
                                  <span>×</span>
                              </button>
                          </div>
                      )
                  } else {
                      return (
                          <div key={item.peopleId} className="writePerson">
                              <Button className="unitControlBtn"  color="primary" onClick={() =>this.writerPerson(item)}>
                                  {item.peopleName}
                              </Button>
                              <WritePerson
                                  sendPeople={(e)=>{this.sendPeople(e, item.peopleId)}}
                                  busses={this.state.bus}
                                  pers={this.state.people}
                                  personSelected={item}
                                  writeOnBus={(place, busName, color)=>{
                                      this.writeOnBus(place, busName, item, color)
                                  }}/>
                          </div>)
                  }
          });
      }
  }
  getUnit = (unit) => {
    return this.state.people.map((item) => {
        if(item.peopleUnit === unit){
            if(item.peopleWhere === null){
                return (
                <div key={item.peopleId}>
                    <Button className="unitControl" color="danger" onClick={() =>this.writerPerson(item)}>
                            {item.peopleName}
                    </Button>
                    <button className="close" onClick={()=>{this.deletePerson(item.peopleId)}}>
                      <span>×</span>
                    </button>
                </div>
                        )
            } else {
                return (
                    <div key={item.peopleId} className="writePerson">
                        <Button className="unitControlBtn"  color="primary" onClick={() =>this.writerPerson(item)}>
                            {item.peopleName}
                        </Button>
                        <WritePerson
                                      sendPeople={(e)=>{this.sendPeople(e, item.peopleId)}}
                                      busses={this.state.bus}
                                      pers={this.state.people}
                                      personSelected={item}
                                      writeOnBus={(place, busName, color)=>{
                                        this.writeOnBus(place, busName, item, color)
                                        }}/>
                    </div>)
            }
        }
        return null;
    });
  }

  sendOnServer = () => {
    const people = this.state.people;
    const bus = this.state.bus;
    this.dataServer.setBusInfo(bus);
    this.dataServer.setPeopleInfo(people);
  }
   addPerson = async (e) => {
    e.preventDefault();
    const name = e.target.name.value;
    const value = e.target.unit.value;
    const randomId = `${Math.floor(Math.random() * 1000)}:${name}`;
    const person = {
      peopleId:randomId,
      peopleName: name,
      peopleUnit: value,
      peopleBus: null,
      peoplePlace: null,
      peopleWhere: null
    }
    await this.setState(({people})=>{
      const oldArr = [...people];
      const newArr = [...oldArr, person];
      return {
        people: newArr
      }
    });
    debounce(this.dataServer.addPerson(this.state.people, person), 300);
  }
  clearAll = () => {
    this.setState(({bus, people})=> {
      const newBus = bus.map((i) => {
        return {...i, driveHome: false}
      });
      const newPeople = people.map((i)=>{
        return {...i, peopleBus: null, peoplePlace: null, peopleWhere: null}
      });
      return {
        bus: newBus,
        people: newPeople
      }
    });
  }
  tryLogin = (e) => {
    e.preventDefault();
    if(e.target.login.value === 'ПДБ' && e.target.pass.value === '1111'){
      this.setState({logined: true});
    }
  }
  render(){
      //
      //
    const trem = this.state.trem;
    const unit371 = trem ? this.getSearchPeople(trem) : units.map(this.getUnitPeople);
    const opinionUnits = units.map(unit => {
      return <option key={unit} value={`${unit}`}>{unit}</option>
    })
    const logined = (!this.state.logined) ? (<LoginUser onLogin={this.tryLogin}/>):
    (
      <>

            <div>
              <Button className="clearAll" color="danger" onClick={()=>{this.clearAll()}}>Отчистить все данные</Button>
          <SelectBus selectBusClick={this.btnSelectedClick}
                      bus={this.state.bus}/>
            </div>
          <SearchInput onUpdateSearch={(trem) => this.setState({trem})}/>
          <SelectPeople unit={unit371}/>

          <div className="print">
            <Link to='/print'>
              <Button className="unitControlBtn" color="success" onClick={() => {this.sendOnServer()}}>Распечатать</Button>
            </Link>
          </div>

          <div className="addPerson">
            <Button className="unitControlBtn" color="warning" onClick={() => {this.sendOnServer()}}>Сохранить </Button><Spinner type='show'/>
            <Button color="danger" onClick={()=>{
              this.setState({addPerson: !this.state.addPerson});}}>Добавить пользователя</Button>
          </div>
          <Collapse isOpen={this.state.addPerson}>
           <Alert className="alertUnit">
            <Form method="POST" onSubmit={(e)=>{this.addPerson(e)}}>
             <Input name="name" placeholder="Имя сотрудника"/>
             <Input type="select" name="unit">
                    {opinionUnits}
             </Input>
             <Button type="submit">Сохранить</Button>
            </Form>
           </Alert>
          </Collapse>
      </>
    )

    return (
      <Router>
        <Container>
          <Route path='/' exact>
            <UserView />
          </Route>
          <Route path='/admin' exact>
            {logined}
          </Route>
          <Route path='/print' component={()=><Printer bus={this.state.bus} people={this.state.people}/>}/>
        </Container>

      </Router>
    );
  }
}

