import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Slide from 'react-reveal/Slide';

const Alert = ({ alerts }) => {
return (
  
  
  <div className="alert-container">
    <Slide right cascade>
   <div>
  {alerts.map((alert) => (
     
    <div key={alert.id} className={`alert alert-${alert.alertType}`}>
      {alert.msg}
    </div>
 

  ))};
  </div>
  </Slide>
  </div>
  
)

}
  
Alert.propTypes = {
  alerts: PropTypes.array.isRequired
};

const mapStateToProps = (state) => ({
  alerts: state.alert
});


export default connect(mapStateToProps)(Alert);
