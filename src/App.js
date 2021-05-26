import React, {useState, useEffect} from 'react';
import './App.css';
import '@fontsource/roboto';
import { AppBar, Toolbar, IconButton, Typography, Button } from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import UserInput from './Components/UserInput';

function App() {
  // url for vaccine hesitancy
  const hesitancyUrl = "https://data.cdc.gov/resource/q9mh-h2tw.json"

  // states
  const [userInput, setUserInput] = useState({location: {state: '', county: ''}})
  const [showChart, setShowChart] = useState(false);
  const [hesitancyData, setHesitancyData] = useState({estimated_hesitant: 0, estimated_hesitant_or_unsure: 0, estimated_strongly_hesitant: 0})
  const [options, setOptions] = useState({});

  // fetching the data
  function fetchData(url) {
    fetch(url)
    .then(res => res.json())
    .then(
      (result) => {
        setHesitancyData({estimated_hesitant: result[0].estimated_hesitant, estimated_hesitant_or_unsure: result[0].estimated_hesitant_or_unsure, estimated_strongly_hesitant: result[0].estimated_strongly_hesitant})
      },
      (error) => {
        console.log("error: ", error)
      }
    )
  }

  const onClickFetchData = () => {
    let state = userInput.location.state;
    let county = userInput.location.county;

    let url = `${hesitancyUrl}?state=${state.toUpperCase()}&county_name=${county}, ${state}`
    fetchData(url);
    setShowChart(true);
  }

  useEffect(() => {
    let hesitant = parseFloat(hesitancyData.estimated_hesitant)*100
    let unsure = parseFloat(hesitancyData.estimated_hesitant_or_unsure)*100
    let strong = parseFloat(hesitancyData.estimated_strongly_hesitant)*100;
    let tempOptions = {
      chart: {
        plotBackgroundColor: null,
        plotBorderWidth: null,
        plotShadow: false,
        type: 'pie'
      },
      title: {
        text: `Vaccine Hesitancy Rates in ${userInput.location.county}, ${userInput.location.state}`
      },
      series: [{
        //name: 'Brands',
        colorByPoint: true,
        data: [{
          name: 'Estimated Not Hesitant',
          y: 100 - hesitant - unsure - strong,
          selected: true,
          sliced: true
        }, {
          name: 'Estimated Hesitant',
          y: hesitant
        }, {
          name: 'Estimated Hesitant or Unsure',
          y: unsure
        }, {
          name: 'Estimated Strongly Hesitant',
          y: strong
        }]
      }]
    }
    setOptions(tempOptions)
  }, [hesitancyData])

  return (
    <div className="App">
      <AppBar position="static">
        <Toolbar>
          <IconButton edge="start" color="inherit" aria-label="menu"><MenuIcon /></IconButton>
          <Typography variant="h6">Home</Typography>
        </Toolbar>
      </AppBar>
      <UserInput inputState = {{userInput, setUserInput}}></UserInput>
      <Button onClick = {onClickFetchData} variant="contained">Fetch Data</Button>
      { showChart ? <HighchartsReact highcharts={Highcharts} options={options}/> : null }
    </div>
  )
}

export default App;
