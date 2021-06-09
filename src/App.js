import React, {useState} from 'react';
import './App.css';
import '@fontsource/roboto';
import { AppBar} from "@material-ui/core";
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import TabPanel from './Components/TabPanel'

function App() {
  // tab stuff
  const [tabValue, setTabValue] = useState(0);
  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  }

  return (
    <div className="App">
      <AppBar position="static">
        <Tabs value={tabValue} onChange={handleTabChange}>
          <Tab label="Home"/>
          <Tab label="Vaccine Hesitancies"/>
          <Tab label="General COVID-19 Stats"/>
          <Tab label="Vaccine Stats"/>
        </Tabs>
      </AppBar>
      <TabPanel tabValue={tabValue} index={0}></TabPanel>
      <TabPanel tabValue={tabValue} index={1}></TabPanel>
      <TabPanel tabValue={tabValue} index={2}></TabPanel>
      <TabPanel tabValue={tabValue} index={3}></TabPanel>
    </div>
  )
}

export default App;

