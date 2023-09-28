import Tab from "./Tab.jsx";
import './TabPanel.css';
import {useContext, useState} from "react";
import TabButton from "./TabButton.jsx";
import {AppContext} from "./App.jsx";
import PropTypes from "prop-types";

const uniqueId = () => parseInt(Date.now() * Math.random()).toString();

const initialTabs = [
    { tabKey: uniqueId(), tabName: "Hello" },
    { tabKey: uniqueId(), tabName: "Yellow" },
];

export default function TabPanel(props) {
   const appState = useContext(AppContext);

   const [activeTab, setActiveTab] = useState(initialTabs[0].tabKey);
   const [tabs, setTabs] = useState(initialTabs);

   const [untitledCount, setUntitledCount] = useState(0);

    const deleteTab = (tabId) => {
        const index = tabs.findIndex(t => t.tabKey === tabId);
        setTabs(tabs.filter(t => t.tabKey !== tabId));

        if (tabs.length > 1 && index > 0) {
            setActiveTab(tabs[index - 1].tabKey);
        }
        else if (index < tabs.length - 1) {
            setActiveTab(tabs[index + 1].tabKey);
        }
    }

   const newTabButton = (
      <button
         className="add-tab-button"
         type="button"
         onClick={() => {
             const tabId = uniqueId();
             setTabs([...tabs, { tabKey: tabId, tabName: `untitled (${untitledCount})` }]);
             setUntitledCount(untitledCount + 1);
             setActiveTab(tabId);
         }}
      >
         &#xFF0B;
      </button>
   );

    const tabComponents = (
        tabs.map(tab => {
            return (
                <Tab key={`${tab.tabKey}-tab`}
                     tabName={tab.tabName}
                     tabKey={tab.tabKey}
                     hidden={activeTab !== tab.tabKey}
                     drawingColor={props.drawingColor}
                />)
        })
    );

    const paneHeader = (
        tabs.map((tab) => {
            return <TabButton key={`${tab.tabKey}-tab-button`}
                              tabName={tab.tabName}
                              tabKey={tab.tabKey}
                              setActiveTab={setActiveTab}
                              isActive={activeTab === tab.tabKey}
                              onClose={deleteTab}/>
        })
    );

   return (
      <div className="tab-panel">
         <div className="pane-header">
            {paneHeader}
            {newTabButton}
         </div>
         {tabComponents}
      </div>
   );
}

TabPanel.propTypes = {
   drawingColor: PropTypes.string
}