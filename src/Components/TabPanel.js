import '@fontsource/roboto';
import React, {useEffect, useState, componentDidUpdate} from 'react';
import Chart from './Chart';
import UserInput from './UserInput';
import { Button, Container } from "@material-ui/core";
import covidBooger from "../assets/covidBooger.jpg";
import "../style.css";
import { StarRateTwoTone } from '@material-ui/icons';


const TabPanel = ({tabValue, index}) => {

    // url for vaccine hesitancy
    const hesitancyUrl = "https://data.cdc.gov/resource/q9mh-h2tw.json";
    const reportUrl = "https://corona.lmao.ninja/v2/states/";

    // states
    //const [showChart, setShowChart] = useState({hesitancy: false, report: false, vaccine: false});
    const [showHesitancyChart, setShowHesitancyChart] = useState(false);
    const [showReportChart, setShowReportChart] = useState(false);
    const [showVaccineChart, setShowVaccineChart] = useState(false);

    const [reportData, setReportData] = useState({todayCases: 0, todayDeaths: 0, totalCases: 0, totalDeaths: 0})
    const [userInput, setUserInput] = useState({location: {state: '', county: ''}})
    const [hesitancyData, setHesitancyData] = useState({estimated_hesitant: 0, estimated_hesitant_or_unsure: 0, estimated_strongly_hesitant: 0})
    const [vaccineData, setVaccineData] = useState({vaccinesCompleted: 0, vaccinesInitiated: 0, vaccinesAdministered: 0})
    const [data, setData] = useState({});
    const [errorCheck, setErrorCheck] = useState(false);

    // fetching the data
    function fetchHesitancyData(url) {
        try {
            fetch(url)
            .then(res => res.json())
            .then(
            (result) => {
                if (result.length > 0){
                    console.log(result)
                    setHesitancyData({estimated_hesitant: result[0].estimated_hesitant, estimated_hesitant_or_unsure: result[0].estimated_hesitant_or_unsure, estimated_strongly_hesitant: result[0].estimated_strongly_hesitant})
                    setErrorCheck(false);
                }
                else {
                    setErrorCheck(true);
                    setShowHesitancyChart(false);
                }
            })
        }
        catch(err) {
            // check county input
            setErrorCheck(true);
            setShowHesitancyChart(false);
        }
    }

    function fetchReportData(url) {
        var requestOptions = {
          method: 'GET',
          redirect: 'follow'
        };
        
        fetch(url, requestOptions)
          .then(res => res.json())
          .then(
            (result) => {
                setReportData({todayCases: result.todayCases, todayDeaths: result.todayDeaths, totalCases: result.cases, totalDeaths: result.deaths})
                setErrorCheck(false);
            },
            (error) => {
              console.log("error: ", error)
              setShowReportChart(false);
            }
        )
    }

    function fetchVaccineData(url) {
        console.log(url);
        try {
            fetch(url)
            .then(res => res.json())
            .then(
                (result) => {
                    setVaccineData({vaccinesCompleted: result.actuals.vaccinationsCompleted, vaccinesInitiated: result.actuals.vaccinationsInitiated, vaccinesAdministered: result.actuals.vaccinesAdministered})
                    setErrorCheck(false);
                },
                (error) => {
                    setErrorCheck(true);
                    setShowVaccineChart(false);
                }
            )
        }
        catch(err) {
            setErrorCheck(true);
            setShowVaccineChart(false);
        }
    }

    const onClickFetchData = () => {
        let state = userInput.location.state;
        let county = userInput.location.county;

        if (tabValue == 1){
            let url = `${hesitancyUrl}?state=${state.toUpperCase()}&county_name=${county}, ${state}`
            fetchHesitancyData(url);
        }
        else if (tabValue == 2){
            let url = `${reportUrl}${state}`;
            fetchReportData(url);
        }
        else if (tabValue == 3){
            let url = `https://api.covidactnow.org/v2/state/${state}.json?apiKey=0ece6282b96344e7898de1571def2c00`;
            fetchVaccineData(url);
        }
    }

    useEffect(() => {
        if (tabValue == 1){
            setData(hesitancyData);
            setShowHesitancyChart(true);
        }
        else if (tabValue == 2){
            setData(reportData);
            setShowReportChart(true);

        }
        else if (tabValue == 3){
            setData(vaccineData);
            setShowVaccineChart(true);
        }
    }, [hesitancyData, reportData, vaccineData])


    return (
        <div hidden = {tabValue !== index}>
            {tabValue !== 0 ?
            <div>
                <UserInput tabValue={tabValue} inputState = {{userInput, setUserInput} }></UserInput>
                {tabValue === 1 ? <p>County should be in this exact format. EX: Orange County</p> : null }
                <p hidden = {!errorCheck}>Could not fetch data. Input is not valid. Check your input.</p>
                <Button onClick = {onClickFetchData} variant="contained">Fetch Data</Button>
                {showHesitancyChart ? <Chart data={data} tabValue={tabValue} inputState={{userInput, setUserInput}}></Chart> : null }
                {showReportChart ? <Chart data={data} tabValue={tabValue} inputState={{userInput, setUserInput}}></Chart> : null }
                {showVaccineChart ? <Chart data={data} tabValue={tabValue} inputState={{userInput, setUserInput}}></Chart> : null }

            </div>
            :
            <div>
                <Container>
                    <h1 className="title">COVID-19 DASHBOARD</h1>
                    <p className="description">An application for COVID-19 data visualizations</p>
                    <p className="names">By Ashley Ahn, Andrew Hong, and Matthew Wuyan</p>
                    <img src={covidBooger} className="covidBooger"></img>
                </Container>
            </div>
            }
        </div>
    )
}

export default TabPanel;
