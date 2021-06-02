import '@fontsource/roboto';
import { TextField } from "@material-ui/core";

const UserInput = ({ tabValue, inputState }) => {

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

    return (
        <div>
            {tabValue === 0 ?
                <form noValidate autoComplete="off">
                    <TextField id="outlined-basic" label="State" variant="outlined" onChange={onChangeState}/>
                    <TextField id="outlined-basic" label="County" variant="outlined" onChange={onChangeCounty}/>
                </form>
                :
                <form noValidate autoComplete="off">
                    <TextField id="outlined-basic" label="State" variant="outlined" onChange={onChangeState}/>
                </form>
            }
            
        </div>
    )
}

export default UserInput;
