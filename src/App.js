import { Component } from "react";
import Form from './components/Form';
import Weather from './components/Weather'
import './App.css'

const API_KEY = "1efe3eee87c446c64f9e41590d79ea1b"; 
class App extends Component {
  state = {
    tempreture:'',
    city:'',
    country:'',
    humidity:'',
    description:'',
    error:''
  }
  getWeather = async (e) => {
    e.preventDefault();
    const city = e.target.elements.city.value;
    const country = e.target.elements.country.value;
 
    const api = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}%2C${country}&appid=${API_KEY}`)
    const data = await api.json();
    // console.log(data)
    if (city && country) {
      this.setState({
        tempreture: data.main.temp,
        city: data.name,
        country: data.sys.country,
        humidity: data.main.humidity,
        description: data.weather[0].description,
        error: ''
      })
    } else {
      this.setState({
         tempreture:'',
          city:'',
          country:'',
          humidity:'',
          description:'',
          error:'Enter Data !!!'
      })
    }
  }
render() {
  return (
      <div className="wrapper">
        <div className="form-container">
          <Form getWeather={this.getWeather} />
          <Weather
            tempreture = {this.state.tempreture}
              city  = {this.state.city}
              country  = {this.state.country}
              humidity  = {this.state.humidity}
              description  = {this.state.description}
              error  = {this.state.error}/>
        </div>
      </div>
  );
}
}

export default App;
