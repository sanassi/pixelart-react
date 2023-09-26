import PropTypes from 'prop-types';
import './TabButton.css';

export default function TabButton({ tabKey, tabName, setActiveTab, onClose }) {
   return (
      <div className="tab-button">
         <button
            type="button"
            key={`${tabName}-button`}
            onClick={() => {
               setActiveTab(tabKey);
            }}
         >
            <span className="tab-button-name">{tabName}</span>
         </button>
         <button className="tab-close-button" type="button" onClick={() => {
             onClose(tabKey);
             console.log(tabName);
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