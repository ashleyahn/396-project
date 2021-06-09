import '@fontsource/roboto';
import { TextField, FormControl, InputLabel, Select, MenuItem } from "@material-ui/core";
import React, {useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';


const UserInput = ({ data, tabValue, inputState }) => {

    const states = ["Alabama", "Alaska", "Arizona", "Arkansas", "California", "Colorado", "Connecticut", "Delaware", "Florida", "Georgia", "Guam", "Hawaii", "Idaho", "Illinois", "Indiana", "Iowa", "Kansas", "Kentucky", "Louisiana", "Maine", "Maryland", "Massachusetts", "Michigan", "Minnesota", "Mississippi", "Missouri", "Montana", "Nebraska", "Nevada", "New Hampshire", "New Jersey", "New Mexico", "New York", "North Carolina", "North Dakota", "Ohio", "Oklahoma", "Oregon", "Pennsylvania", "Rhode Island", "South Carolina", "South Dakota", "Tennessee", "Texas","Utah", "Vermont", "Virginia", "Washington", "West Virginia", "Wisconsin", "Wyoming"];
    const statesAbbr = ["AK", "AL", "AR", "AZ", "CA", "CO", "CT", "DC", "DE", "FL", "GA", "GU", "HI", "IA", "ID", "IL", "IN", "KS", "KY", "LA", "MA", "MD", "ME", "MI", "MN", "MO", "MP", "MS", "MT", "NC", "ND", "NE", "NH", "NJ", "NM", "NV", "NY", "OH", "OK", "OR", "PA", "RI", "SC", "SD", "TN", "TX", "UM", "UT", "VA", "VI", "VT", "WA", "WI", "WV", "WY"]

    const onChangeState = ev => {
        inputState.setUserInput(prevState => {
            let location = Object.assign({}, prevState.location);
            location.state = ev.target.value;                
            return { location };
        })
        
    }

    const onChangeCounty = ev => {
        inputState.setUserInput(prevState => {
            let location = Object.assign({}, prevState.location);
            location.county = ev.target.value;              
            return { location };
        })
    }

    const useStyles = makeStyles((theme) => ({
        formControl: {
          margin: theme.spacing(1),
          minWidth: 120,
          display: 'inline-block',
        },
        selectEmpty: {
          marginTop: theme.spacing(2),
        },
        form: {
            display: 'inline-block',
        }
      }));
    const classes = useStyles();

    if (tabValue === 1) {
        // vaccine hesitancies
        return (
            <div>
                <h1>Statistics on COVID-19 Vaccine Hesitancies in the United States</h1>
                <h2>e.g. Estimated hesitant, not hesitant, etc.</h2>
                <p>Select a State and Input a County</p>
                <FormControl className={classes.formControl}>
                    <InputLabel>State</InputLabel>
                    <Select
                        value={inputState.userInput.location.state}
                        onChange={onChangeState}
                    >
                        {states.map((state) => (
                            <MenuItem key={state} value={state}>{state}</MenuItem>
                        ))}
                    </Select>
                </FormControl>
                <form noValidate autoComplete="off" className={classes.form}>
                    <TextField label="County" onChange={onChangeCounty}/>
                </form>
                
            </div>
        )
    }
    else if (tabValue == 2) {
        // general covid stats
        return (
            <div>   
                <h1>General COVID-19 Statistics in the United States</h1>
                <h2>e.g. Deaths and Cases</h2>
                <p>Select a State</p>
                <FormControl className={classes.formControl}>
                    <InputLabel>State</InputLabel>
                    <Select
                        value={inputState.userInput.location.state}
                        onChange={onChangeState}
                    >
                        {states.map((state) => (
                            <MenuItem key={state} value={state}>{state}</MenuItem>
                        ))}
                    </Select>
                </FormControl>
            </div>
        )
        
    }
    else if (tabValue == 3) {
        return (
            <div>  
                <h1>General COVID-19 Vaccination Statistics in the United States</h1>
                <h2>e.g. Vaccinations Administered, Completed, Initiated</h2>
                <p>Select a State</p> 
                <FormControl className={classes.formControl}>
                    <InputLabel>State</InputLabel>
                    <Select
                        value={inputState.userInput.location.state}
                        onChange={onChangeState}
                    >
                        {statesAbbr.map((state) => (
                            <MenuItem key={state} value={state}>{state}</MenuItem>
                        ))}
                    </Select>
                </FormControl>
            </div>
        )
    }
}

export default UserInput;
