import Tab from "./Tab.jsx";
import './TabPanel.css';
import { useContext, useState } from "react";
import TabButton from "./TabButton.jsx";
import { AppContext } from "./App.jsx";
import PropTypes from "prop-types";

const uniqueId = () => parseInt(Date.now() * Math.random()).toString();

function initGrid(w, h, initColor) {
    return Array(h * w).fill(initColor);
}

function initTabs(w, h, initColor) {
    return {
        "tab1": { tabKey: "tab1", tabName: "Hello", grid: initGrid(w, h, initColor), canvasRef: null, strokes: []},
        "tab2": { tabKey: "tab2", tabName: "Yellow", grid: initGrid(w, h, initColor), canvasRef: null, strokes: [] },
    };
}

export default function TabPanel(props) {
    const appState = useContext(AppContext);

    const [tabs, setTabs] =
        useState(initTabs(appState.nbCellWidth, appState.nbCellHeight, appState.transparentColor));
    appState.tabs = tabs;
    const [activeTab, setActiveTab] = useState("tab1");

    appState.activeTabId = activeTab;

    const [untitledCount, setUntitledCount] = useState(0);

    const deleteTab = (tabId) => {
        const updatedTabs = { ...tabs };
        delete updatedTabs[tabId];
        setTabs(updatedTabs);

        const remainingTabs = Object.keys(updatedTabs);
        if (remainingTabs.length > 0) {
            setActiveTab(remainingTabs[0]);
        }
    }

    const newTabButton = (
        <button
            className="add-tab-button"
            type="button"
            onClick={() => {
                const tabId = `tab${uniqueId()}`;
                setTabs({
                    ...tabs,
                    [tabId]: {
                        tabKey: tabId,
                        tabName: `untitled (${untitledCount})`,
                        grid: initGrid(appState.nbCellWidth, appState.nbCellHeight, appState.transparentColor),
                        canvasRef: null,
                        strokes: []
                    }
                });
                setUntitledCount(untitledCount + 1);
                setActiveTab(tabId);
            }}
        >
            &#xFF0B;
        </button>
    );

    const tabComponents = (
        Object.keys(tabs).map(tabKey => {
            const tab = tabs[tabKey];
            return (
                <Tab key={`${tab.tabKey}-tab`}
                     grid={tab.grid}
                     tabName={tab.tabName}
                     tabKey={tab.tabKey}
                     hidden={activeTab !== tab.tabKey}
                     drawingColor={props.drawingColor}
                />)
        })
    );

    const paneHeader = (
        Object.keys(tabs).map(tabKey => {
            const tab = tabs[tabKey];
            return <TabButton key={`${tab.tabKey}-tab-button`}
                              tabName={tab.tabName}
                              tabKey={tab.tabKey}
                              setActiveTab={setActiveTab}
                              isActive={activeTab === tab.tabKey}
                              onClose={deleteTab} />
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
