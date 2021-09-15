import React, { useState, useEffect } from 'react';
import './card.css';


const Card = ()=>{
    // state variable that will handle the state of input Box
    const [val, setVal] = useState('okara');
    // state variable that will contain the city name of which the weather to be displayed
    const [city, setCity] = useState('okara');
    // state variable that will contain the response object of API
    const [weather, setWeather] = useState('');
    // state variable that will contain the className of icon to be displaed with respective to weather condition
    const [iconClass, setIconClass] = useState('wi-day-sunny');

    // usseEffect hook that will fetch data from API when city state variable value changes
    useEffect(()=>{
        const call = async ()=>{
            try{
                const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid={Put your ApI Key Here}&units=metric`);
                if(!response.ok){
                    throw new Error(response.status);
                }
                const data = await response.json();
                setWeather(data);
            }catch(error){
                console.log(error);
            }
        }
        call();
        
    },[city]);

    // useEffect hook that will call icon function when response from API is received & save it into weather state variable
    useEffect(()=>{
        if(weather){
            icon();
        }
    });

    // variables that will hold system's current date & time
    let date = new Date().toLocaleDateString();
    let time = new Date().toLocaleTimeString();

    // Handler that will be called when input value changes & store it into val state variable
    const handleValue = (e)=>{
        setVal(e.target.value.trim());
    }

    // Handler that will be called when the user clicks on search button & set the city name to current input value
    function handleSearch(){
        setCity(val);
    }

    // Function that will set main icon className in iconClass state variable according to the weather 
    function icon(){
        let mosam = weather.weather[0].main;
        switch(mosam){
            case 'Clouds':
                setIconClass('wi-day-cloudy');
                break;
            case 'Haze':
                setIconClass('wi-fog');
                break;
            case 'Clear':
                setIconClass('wi-day-sunny');
                break;
            case 'Mist':
                setIconClass('wi-dust');
                break;
            default:
                setIconClass('wi-day-sunny');
                break;
        }
    }

    
    return(
        <>
            <div className='body'>
                {/* Input jsx starts here */}
                <div className='input-wrapper'>
                    <input type='text' className='inputBox' value={val} onChange={handleValue}/>
                    <button className='search-btn' onClick={handleSearch}>Search</button>
                </div>
                {/* Input jsx ends here */}

                {/* Card jsx starts here */}
                <div className='card-section'>
                    {/* Weather icon jsx */}
                    <div className='weather-icon-container'>
                        <i className={`wi ${iconClass}`}></i>
                    </div>
                    {/* Temp & Time section jsx */}
                    <div className='temp-time-wrapper'>
                        <div className='temp-wrapper'>
                            <div className='temp'>
                                <p>{weather===''?'':weather.main.temp.toFixed(2)}<span>o</span></p>
                            </div>
                            <div className='country-info'>
                                <h1>{weather===''?'':weather.weather[0].main}</h1>
                                <p>{weather===''?'':weather.name},{weather===''?'':weather.sys.country}</p>
                            </div>
                        </div>
                        <div className='time-wrapper'>
                            <h2>{date}</h2>
                            <h2>{time}</h2>
                        </div>
                    </div>
                    {/* Weather info jsx */}
                    <div className='weather-info'>
                        <div className='info-wrapper'>
                            <i className="wi wi-sunset"></i>
                            <div className='info'>
                                <p>{weather===''?'':new Date(weather.sys.sunset*1000).toLocaleTimeString()}<br></br>Sunset</p>
                            </div>
                        </div>
                        <div className='info-wrapper'>
                            <i className="wi wi-humidity"></i>
                            <div className='info'>
                                <p>{weather===''?'':weather.main.humidity}<br></br>Humidity</p>
                            </div>
                        </div>
                        <div className='info-wrapper'>
                            <i className="wi wi-rain"></i>
                            <div className='info'>
                                <p>Pressure<br></br>{weather===''?'':weather.main.pressure}MM</p>
                            </div>
                        </div>
                        <div className='info-wrapper'>
                            <i className="wi wi-strong-wind"></i>
                            <div className='info'>
                                <p>Wind<br></br>{weather===''?'':weather.wind.speed}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Card;