import Tab from "./Tab.jsx";
import './TabPanel.css';
import {useContext, useId, useState} from "react";
import TabButton from "./TabButton.jsx";
import {AppContext} from "./App.jsx";
import PropTypes from "prop-types";

const uniqueId = () => parseInt(Date.now() * Math.random()).toString();

const initialTabs = [
    { tabKey: uniqueId(), tabName: "Hello" },
    { tabKey: uniqueId(), tabName: "Yellow" },
]

export default function TabPanel(props) {
   const appState = useContext(AppContext);

   const [activeTab, setActiveTab] = useState(initialTabs[0].tabKey);
   const [tabs, setTabs] = useState(initialTabs);

    const deleteTab = (tabId) => {
        setTabs(tabs.filter(t => t.tabKey !== tabId));
    }

   const newTabButton = (
      <button
         className="add-tab-button"
         type="button"
         onClick={() => {
             setTabs([...tabs, { tabKey: uniqueId(), tabName: "untitled" }])
         }}
      >
         &#xFF0B;
      </button>
   );

   return (
      <div className="tab-panel">
         <div className="pane-header">
            {
                tabs.map((tab) => {
                return <TabButton tabName={tab.tabName}
                                  tabKey={tab.tabKey}
                                  setActiveTab={setActiveTab}
                                  onClose={deleteTab}/>
            })}
            {newTabButton}
         </div>
         {
             tabs.map(tab => {
             return (
                 <Tab tabName={tab.tabName}
                          tabKey={tab.tabKey}
                          hidden={activeTab !== tab.tabKey}
                      drawingColor={props.drawingColor}
                 />)
         })}
      </div>
   );
}

TabPanel.propTypes = {
   drawingColor: PropTypes.string
}