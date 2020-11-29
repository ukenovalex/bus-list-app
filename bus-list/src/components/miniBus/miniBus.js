import React, {Component} from 'react';
import { Button, Tooltip} from 'reactstrap';
import './miniBus.css'

export default class MiniBus extends Component {
  state = {
    color: [],
    place: [],
  }
  componentDidMount(){
    let colors = [];
    for(let i = 0; i < 25; i++){
      colors.push('secondary');
    }
    this.setState({color: colors});
    this.updatePlaces();
  }
  componentDidUpdate(prevProps){
    if(this.props.pers !== prevProps.pers){
      this.updatePlaces();
    }
  }
  updatePlaces = () => {
    this.props.pers.forEach((item) => {
      if(item.peopleBus === this.props.busName){
        if(item.peopleWhere === 'На берег'){
          this.setState(({color}) => {
            const idx = (item.peoplePlace - 1);
            const colorChoise = (color[idx] !== 'danger') ? 'danger' : 'secondary';
            const newArr = [...color.slice(0, idx), colorChoise, ...color.slice(idx + 1)];
            return {
              color: newArr
            }              
          });
        } else if(item.peopleWhere === 'С берега'){
          this.setState(({color}) => {
            const idx = (item.peoplePlace - 1);
            if(color[idx] !== 'primary' && color[idx] !== 'success'){
              const newArr = [...color.slice(0, idx), 'primary', ...color.slice(idx + 1)];
              return {
                color: newArr
              }               
            } else if(color[idx] === 'success'){
              const newArr = [...color.slice(0, idx), 'danger', ...color.slice(idx + 1)];
              return {
                color: newArr
              }               
            } else {
              const newArr = [...color.slice(0, idx), 'secondary', ...color.slice(idx + 1)];
              return {
                color: newArr
              }
            }
             
          });
        } else if(item.peopleWhere === 'Без возврата' && item.peoplePlace){
          this.setState(({color}) => {
            const idx = (item.peoplePlace - 1);
            if(color[idx] !== 'success' && color[idx] !== 'primary') {
              const newArr = [...color.slice(0, idx), 'success', ...color.slice(idx + 1)];
              return {
                color: newArr
              }              
            } else if(color[idx] === 'primary'){
              const newArr = [...color.slice(0, idx), 'danger', ...color.slice(idx + 1)];
              return {
                color: newArr
              } 
            } else {
              const newArr = [...color.slice(0, idx), 'secondary', ...color.slice(idx + 1)];
              return {
                color: newArr
              }               
            }
          });
        }
      }
    });
  }

  sendData = (place, busName, color) => {
    this.props.writeOnBus(place, busName, color); 
    this.updatePlaces();
    this.props.toggle();
  }
  toggle = (place) => {
    if(this.state.place === undefined){
      this.setState({place: place});
    } else {
      this.setState({place: undefined});
    }
  }
    render(){
      const {busName, pers, busId} = this.props;
      const {color} = this.state;
      const titles = pers.map((item) => {
        if(item.peopleBus === busName){
          const plac = (item.peopleWhere === 'С берега') ? "bottom" : "top";
          return(
              <Tooltip key={item.peopleName} 
              placement={plac} 
              isOpen={this.state.place === item.peoplePlace} 
              autohide={false} 
              target={`p${item.peoplePlace}${busId}`} 
              toggle={()=>{
                this.toggle(item.peoplePlace);
                }}>
                {item.peopleName}
              </Tooltip>            
          )
        }
        return null;
      });
        return(
            
            <div className="bus676">
        <div className="busTitle">{this.props.busName}</div>
              <div className="firstFive">
                <Button id={`p1${busId}`} color={color[0]} onClick={()=>{this.sendData(1, busName, color[0]);}}>1</Button>
                <Button id={`p2${busId}`} color={color[1]} onClick={()=>{this.sendData(2, busName, color[1]);}}>2</Button>
                <Button id={`p3${busId}`} color={color[2]} onClick={()=>{this.sendData(3, busName, color[2]);}}>3</Button>
                <Button id={`p4${busId}`} color={color[3]} onClick={()=>{this.sendData(4, busName, color[3]);}}>4</Button>
                <Button id={`p5${busId}`} color={color[4]} onClick={()=>{this.sendData(5, busName, color[4]);}}>5</Button>              
              </div>
              <div className="sixSeven">
                <Button id={`p6${busId}`} color={color[5]} onClick={()=>{this.sendData(6, busName, color[5]);}}>6</Button>
                <Button id={`p7${busId}`} color={color[6]} onClick={()=>{this.sendData(7, busName, color[6]);}}>7</Button>              
              </div>
              <div className="eiNiTeEl">
                <div className="eightNight">
                  <Button id={`p8${busId}`} color={color[7]} onClick={()=>{this.sendData(8, busName, color[7]);}}>8</Button>
                  <Button id={`p9${busId}`} color={color[8]} onClick={()=>{this.sendData(9, busName, color[8]);}}>9</Button>              
                </div>
                <div className="tenElev">
                  <Button id={`p10${busId}`} color={color[9]} onClick={()=>{this.sendData(10, busName, color[9]);}}>10</Button>
                  <Button id={`p11${busId}`} color={color[10]} onClick={()=>{this.sendData(11, busName, color[10]);}}>11</Button>              
                </div>              
              </div>
              <div className="eiNiTeEl">
                <div className="eightNight">
                  <Button id={`p12${busId}`} color={color[11]} onClick={()=>{this.sendData(12, busName, color[11]);}}>12</Button>
                  <Button id={`p13${busId}`} color={color[12]} onClick={()=>{this.sendData(13, busName, color[12]);}}>13</Button>              
                </div>
                <div className="tenElev">
                  <Button id={`p14${busId}`} color={color[13]} onClick={()=>{this.sendData(14, busName, color[13]);}}>14</Button>
                  <Button id={`p15${busId}`} color={color[14]} onClick={()=>{this.sendData(15, busName, color[14]);}}>15</Button>              
                </div>              
              </div>
              <div className="sTsTeTnTtT">
                <div className="sTsT">
                    <Button id={`p16${busId}`} color={color[15]} onClick={()=>{this.sendData(16, busName, color[15]);}}>16</Button>              
                    <Button id={`p17${busId}`} color={color[16]} onClick={()=>{this.sendData(17, busName, color[16]);}}>17</Button>                            
                </div>
                <div className="eTnTtT">
                  <Button id={`p18${busId}`} color={color[17]} onClick={()=>{this.sendData(18, busName, color[17]);}}>18</Button>
                  <Button id={`p19${busId}`} color={color[18]} onClick={()=>{this.sendData(19, busName, color[18]);}}>19</Button>
                  <Button id={`p20${busId}`} color={color[19]} onClick={()=>{this.sendData(20, busName, color[19]);}}>20</Button>
                </div>
              </div>
              <div className="lastPlaces">
                <Button id={`p21${busId}`} color={color[20]} onClick={()=>{this.sendData(21, busName, color[20]);}}>21</Button>
                <Button id={`p22${busId}`} color={color[21]} onClick={()=>{this.sendData(22, busName, color[21]);}}>22</Button>
                <Button id={`p23${busId}`} color={color[22]} onClick={()=>{this.sendData(23, busName, color[22]);}}>23</Button>
                <Button id={`p24${busId}`} color={color[23]} onClick={()=>{this.sendData(24, busName, color[23]);}}>24</Button>
                <Button id={`p25${busId}`} color={color[24]} onClick={()=>{this.sendData(25, busName, color[24]);}}>25</Button>              
              </div>
  
              {titles}
            </div>
          
        )
    }
}