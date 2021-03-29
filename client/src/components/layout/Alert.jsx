import React from 'react'
import {connect} from "react-redux"
import PropTypes from 'prop-types'

const Alert = ({ alerts }) =>
  alerts.map((alert) => (
    <div key={alert.id} className={`alert alert-${alert.alertType}`}>
      {alert.msg}
    </div>
  ));

Alert.propTypes = {
   alerts: PropTypes.array.isRequired, 
}

const mapStatetProps = state => ({
   alerts: state.alert
})

export default connect(mapStatetProps)(Alert);
