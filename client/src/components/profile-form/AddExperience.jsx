import React, {Fragment, useState} from 'react'
import PropTypes from 'prop-types'
import {connect} from "react-redux"
import {addExperience} from "../../actions/profile"
import {withRouter} from "react-router-dom"
import Navbar from "../layout/Navbar"

const AddExperience = ({addExperience,history}) => {
   const [formData, setFormData] =  useState({
      comapny:"",
      title:"",
      location:"",
      from:"",
      to:"",
      current: false,
      description:""
   })
   const [toDateDisabled, toggleDisabled] = useState(false);

   const {company, title, location, from,to,current,description} = formData

   const onChange = e => {
      setFormData({...formData, [e.target.name]:e.target.value})
   }
   const onSubmit = e => {
      e.preventDefault();
      addExperience(formData, history)
   }
   return (
      <Fragment>
        <Navbar/>
        <div className="create-container">
            <div className="create-form">
         <h1 className="large text-primary">
       Add An Experience
      </h1>
      <p className="lead">
        <i className="fas fa-code-branch"></i> Add any developer/programming
        positions that you have had in the past
      </p>
      <form className="form" onSubmit={onSubmit}>
     
        <div className="form-group">

        <i className="fas create-icon fa-graduation-cap"></i>
          <input type="text" placeholder="* Job Title" name="title" required value={title} onChange={onChange} />
        </div>
        <div className="form-group">
        <i className="fas create-icon fa-school"></i>
          <input type="text" placeholder="* Company" name="company" required value={company} onChange={onChange} />
        </div>
        <div className="form-group">
        <i className="fas create-icon fa-shield-alt"></i>
          <input type="text" placeholder="Location" name="location" value={location} onChange={onChange} />
        </div>
        <div className="form-group">
          <h4>From Date</h4>
          <input type="date" name="from" value={from} onChange={onChange} />
        </div>
         <div className="form-group">
          <p><input type="checkbox" name="current" checked={current} value={current} onChange={e=>{
                 setFormData({...formData, current:!current})
                 toggleDisabled(!toDateDisabled)
          }}/> Current Job</p>
        </div>
        <div className="form-group">
          {
            !toDateDisabled&&(
              <div>
                <h4>To Date</h4>
          <input type="date" name="to" value={to} onChange={onChange} />
              </div>
            )
          }
          
        </div>
        <div className="form-group">
        <i className="fas create-icon fa-question"></i>
          <textarea
            name="description"
            placeholder="Job Description"
            value={description} onChange={onChange}
          ></textarea>
        </div>
        <button type="submit" className="btn btn-primary my-1">Edit Experience</button>
      </form>
      </div>
      </div>
      </Fragment>
   )
}

AddExperience.propTypes = {
   addExperience: PropTypes.func.isRequired,
}

export default connect(null, {addExperience})(withRouter(AddExperience))
