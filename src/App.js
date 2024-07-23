import logo from './logo.svg';
import './App.css';
import { useEffect, useState } from 'react';

function App() {
  let [city, setCity] = useState('')
  let [wdetails, setWdetails] = useState()
  let [isLoading, setIsloading] = useState(false)
  let [counter, setcounter] = useState(1)
  let getData = (event) => {
    setIsloading(true)
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=751d66e130befad396405dc13796a57c&units=metric`)
    .then((res)=>res.json())
    .then((finalRes)=>{
      if(finalRes.cod == '404'){
        setWdetails(undefined)
      }
      else{
        console.log(finalRes)
        setWdetails(finalRes)
      }
      setIsloading(false)
    })
    event.preventDefault()
    setCity('')
  }
  let changeCounter = () => {
    setcounter(counter+1)
  }
  useEffect(()=>{
    console.log('WS')
  },[counter])
  return (
    <div className='outerDiv w-[100%] h-[100vh] bg-[#34aacb11]'>
      {/* {counter}
      <button onClick={changeCounter}>Count</button> */}
      <div className=' innerDiv max-w-[1320px] mx-auto'>
        <h1 className='text-[40px] font-bold py-[50px] text-white'>Simple Weather App</h1>
        <form onSubmit={getData}>
          <input type = 'text' className = 'w-[300px] h-[40px] pl-3' placeholder='City Name' value={city} onChange={(event)=>setCity(event.target.value)}/><button className='btn w-[100px] h-[40px]'><b>Submit</b></button>
        </form>
        <div className='w-[400px] mx-auto bg-white shadow-lg mt-[40px] p-[25px] relative'>

        <img src="https://media.tenor.com/PfFDd3eNE_gAAAAi/loading-load.gif" width={100} className={`absolute loading ${isLoading ? '' : 'hidden'}`} />
          {wdetails!== undefined?
          <>
            <h3 className='font-bold text-[30px]' > {wdetails.name} <span className='bg-[yellow]'> {wdetails.sys.country} </span></h3>
            <h2 className='font-bold text-[40px] '> {wdetails.main.temp}</h2>
            <img src={`http://openweathermap.org/img/w/${wdetails.weather[0].icon}.png`}/>
            <p><b>{wdetails.weather[0].description}</b></p>
          </>
          
          : "No Data"
          }
          
        </div>
      </div>
    </div>
  );
}

export default App;
