import { buses, peoples } from "./dataConst";

export default class UseServer {
    constructor(){
        this._apibase = 'http://localhost:5000';
    }
    async getBusInfo() {
        const storage = JSON.parse(localStorage.getItem('bus-state'));
        if(!storage) {
            return buses.map((bus) => {
                return {
                    _id: bus.id,
                    busName: bus.name,
                    countPlace: bus.places,
                    driveHome: bus.driveHome
                }
            });
        }
        return storage.map((bus) => {
            return bus;
        });
    }
    async getAllPeople(){
        const result = peoples;
        const localResult = JSON.parse(localStorage.getItem('people-state'));
        if(!localResult) {
            return result.map((item)=>{
                return {
                    peopleId: item['people_id'],
                    peopleName: item['people_name'],
                    peopleUnit: item['people_unit'],
                    peopleBus: item['people_bus'],
                    peoplePlace: item['people_place'],
                    peopleWhere: item['people_where'],
                }
            });
        }
        return localResult.map(item => item);

    }

    async setBusInfo(data) {
        localStorage.setItem('bus-state', JSON.stringify(data));
        const serverData = data.filter(bus => bus.driveHome)
        console.log(serverData)
        const response = await fetch(`${this._apibase}/bus/set-bus`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify(serverData)
        })
        const result = await response.json();
        console.log(result.message);
    }
    async setPeopleInfo(data) {
        localStorage.setItem('people-state', JSON.stringify(data));
        const serverData = data.filter(person => person.peopleWhere)
        console.log(serverData)
        const response = await fetch(`${this._apibase}/people/set-people`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify(serverData)
        })
        const result = await response.json();
        console.log(result.message)
    }
    deletePerson(Data) {
        localStorage.setItem('people-state', JSON.stringify(Data));
    }
    addPerson(Data) {
        localStorage.setItem('people-state', JSON.stringify(Data));
    }
    async getPeopleFromServer() {
        let response = await fetch(`${this._apibase}/people/get-people`)
        if (response.ok) {
            const result = await response.json()
            return result
        } else {
            console.error(`Error from ${this._apibase}/people/get-people`);
        }
    }
    async getBusesFromServer() {
        let response = await fetch(`${this._apibase}/bus/get-bus`)
        if (response.ok) {
            const result = await response.json()
            return result

        } else {
            console.error(`Error from ${this._apibase}/bus/get-bus`);
        }
    }
}