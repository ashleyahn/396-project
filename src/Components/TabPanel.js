import '@fontsource/roboto';
import React, {useEffect, useState} from 'react';
import Chart from './Chart';
import UserInput from './UserInput';
import { Button } from "@material-ui/core";


const TabPanel = ({tabValue, index}) => {

    // url for vaccine hesitancy
    const hesitancyUrl = "https://data.cdc.gov/resource/q9mh-h2tw.json";
    const reportUrl = "https://corona.lmao.ninja/v2/states/";

    // states
    const [showChart, setShowChart] = useState(false);
    const [reportData, setReportData] = useState({todayCases: 0, todayDeaths: 0, totalCases: 0, totalDeaths: 0})
    const [userInput, setUserInput] = useState({location: {state: '', county: ''}})
    const [hesitancyData, setHesitancyData] = useState({estimated_hesitant: 0, estimated_hesitant_or_unsure: 0, estimated_strongly_hesitant: 0})
    const [data, setData] = useState({});

    // fetching the data
    function fetchHesitancyData(url) {
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
                console.log(result)
            },
            (error) => {
              console.log("error: ", error)
            }
        )
    }

    const onClickFetchData = () => {
        let state = userInput.location.state;
        let county = userInput.location.county;

        if (tabValue == 0){
            let url = `${hesitancyUrl}?state=${state.toUpperCase()}&county_name=${county}, ${state}`
            fetchHesitancyData(url);
        }
        else if (tabValue == 1){
            let url = `${reportUrl}${state}`;
            fetchReportData(url);
        }
        setShowChart(true);
    }

    useEffect(() => {
        if (tabValue == 0){
            setData(hesitancyData);
        }
        else if (tabValue == 1){
            setData(reportData);
        }
    }, [hesitancyData, reportData])

    return (
        <div hidden = {tabValue !== index}>
            <UserInput tabValue={tabValue} inputState = {{userInput, setUserInput}}></UserInput>
            <Button onClick = {onClickFetchData} variant="contained">Fetch Data</Button>
            {showChart ? <Chart data={data} tabValue={tabValue} inputState={{userInput, setUserInput}}></Chart> : null }
        </div>
    )
}

export default TabPanel;
