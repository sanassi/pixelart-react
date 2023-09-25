import Tab from "./Tab.jsx";
import './TabPanel.css';
import {useContext, useState} from "react";
import TabButton from "./TabButton.jsx";
import {AppContext} from "./App.jsx";
import PropTypes from "prop-types";

export default function TabPanel(props) {
   const appState = useContext(AppContext);

   const [activeTab, setActiveTab] = useState('Hello');

   const tabs = ['Hello', 'yooo', 'hola'].map(name => {
      return (
         <Tab hidden={activeTab !== name}
           drawingColor={props.drawingColor}
           tabName={name}/>
   )});

   const [paneHeader, setPaneHeader] = useState(
      tabs.map((tab) => (
         <TabButton tabName={tab.props.tabName} setActiveTab={setActiveTab} />
      ))
   );

   const newTabButton = (
      <button
         className="add-tab-button"
         type="button"
         onClick={() => {
            tabs.push(<Tab />);
            setPaneHeader([
               ...paneHeader,
               <TabButton tabName="untitled"
                          setActiveTab={setActiveTab} />,
            ]);
         }}
      >
         &#xFF0B;
      </button>
   );

   return (
      <div>
         <div className="pane-header">
            {paneHeader}
            {newTabButton}
         </div>
         {tabs}
      </div>
   );
}

TabPanel.propTypes = {
   drawingColor: PropTypes.string
}