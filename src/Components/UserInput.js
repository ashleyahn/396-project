import '@fontsource/roboto';
import { TextField } from "@material-ui/core";

const UserInput = ({ inputState }) => {

    const onChangeState = ev => {
        inputState.setUserInput(prevState => {
            let location = Object.assign({}, prevState.location);  // creating copy of state variable jasper
            location.state = ev.target.value;                     // update the name property, assign a new value                 
            return { location };                                 // return new object jasper object
        })
    }

    const onChangeCounty = ev => {
        inputState.setUserInput(prevState => {
            let location = Object.assign({}, prevState.location);  // creating copy of state variable jasper
            location.county = ev.target.value;                     // update the name property, assign a new value                 
            return { location };                                 // return new object jasper object
        })
    }

    return (
        <div>
            <form noValidate autoComplete="off">
                <TextField id="outlined-basic" label="State" variant="outlined" onChange={onChangeState}/>
                <TextField id="outlined-basic" label="County" variant="outlined" onChange={onChangeCounty}/>
            </form>
        </div>
    )
}

export default UserInput;
