import PropTypes from 'prop-types';
import './TabButton.css';

export default function TabButton({ tabName, setActiveTab }) {
   return (
      <div className="tab-button">
         <button
            type="button"
            key={`${tabName}-button`}
            onClick={() => {
               setActiveTab(tabName);
            }}
         >
            <span className="tab-button-name">{tabName}</span>
         </button>
         <button className="tab-close-button" type="button">
            &times;
         </button>
      </div>
   );
}

TabButton.propTypes = {
   tabName: PropTypes.string,
   setActiveTab: PropTypes.func,
};