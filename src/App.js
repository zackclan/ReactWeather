import React, { Component } from 'react';
import sunny from './sunny.jpg';
import stormy from './stormy.jpg';
import './App.css';




class Weather extends Component {
  toF(temp){
    return Math.round((temp-273.15) * 9/5 + 32)
  }

  render(){
    return(
      this.props.weatherData.map((x) => {
        return(
          <div class="weather">
            <p class="name">{x.name}</p>
            <p>{this.toF(x.main.temp)}&deg;F</p>
            <p>{x.weather[0].main}</p>
          </div>
        )
      })        
    )
  }
}



class App extends Component {
  constructor(props){
    super(props)
    this.state = {
      weatherData : [],
      location: '',
      value : '',
      background : sunny
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleKeyPress = this.handleKeyPress.bind(this)
    this.getWeatherData = this.getWeatherData.bind(this)
  }

  handleKeyPress(e){
    if(e.key === "Enter"){
      let value = this.state.value
      this.setState({location:value})
      this.setState({value:''})
      this.getWeatherData();
    }
  }

  handleChange(e){
    this.setState({value:e.target.value})
  }

  getWeatherData(){
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${this.state.value}&APPID=54e5c316b975fbdbb506569977dee87e`)
      .then(response => response.json())
      .then(data => {
        let skies = data.weather[0].main
        if(skies === 'Clear'){
          this.setState({background: sunny})
        }else{
          this.setState({background:stormy})
        }        
        return this.setState({weatherData: [...this.state.weatherData,data] })
      }).catch(function(){
        alert('That city was not found')
      })
  }

  getBackground(){
    if (this.state.weatherData.length > 0){
    return this.state.weatherData[0].weather[0].main === 'clear' ? this.setState({background:sunny}) : this.setState({background:stormy})
    } else {return stormy}
  }


  render() {
    const divStyle = {
      backgroundImage: 'url(' + this.state.background + ')'
    }
    return(
    <div class='container' style={divStyle}>
      <div class='app'>
        <div class='inputField'>
          <input type='text' placeholder='Pick a city then press enter' value={this.state.value} onChange={this.handleChange} onKeyPress={this.handleKeyPress} />
        </div>
        <Weather
          weatherData={this.state.weatherData}
        />    
      </div>
    </div>
  )}
}

export default App;
