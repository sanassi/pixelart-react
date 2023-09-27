import PropTypes from 'prop-types';
import './TabButton.css';

export default function TabButton({ tabKey, tabName, setActiveTab, isActive, onClose }) {
   return (
      <div className="tab-button">
         <button
            type="button"
            style={{borderColor : isActive ? '#535bf2' : '#00000000' }}
            key={`${tabKey}-button`}
            onClick={() => {
               setActiveTab(tabKey);
            }}
         >
            <span className="tab-button-name">{tabName}</span>
         </button>
         <button className="tab-close-button" type="button" onClick={() => {
             onClose(tabKey);
         }}>
            &times;
         </button>
      </div>
   );
}

TabButton.propTypes = {
    tabKey: PropTypes.string,
    onClose: PropTypes.func,
    tabName: PropTypes.string,
    setActiveTab: PropTypes.func,
};