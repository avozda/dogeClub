import React, {Fragment, useState} from 'react'
import PropTypes from 'prop-types'
import {connect} from "react-redux"
import {addEducation} from "../../actions/profile"
import {withRouter} from "react-router-dom"
import Navbar from "../layout/Navbar"

const AddEducation = ({addEducation,history}) => {
   const [formData, setFormData] =  useState({
      school:"",
      degree:"",
      fieldofstudy:"",
      from:"",
      to:"",
      current: false,
      description:""
   })
   const [toDateDisabled, toggleDisabled] = useState(false);

   const {school, degree, fieldofstudy, from,to,current,description} = formData

   const onChange = e => {
      setFormData({...formData, [e.target.name]:e.target.value})
   }
   const onSubmit = e => {
      e.preventDefault();
      addEducation(formData, history)
   }
   return (
      <Fragment>
        <Navbar/>
          <div className="create-container">
            <div className="create-form">
         <h1 className="large text-primary">
       Add An Education
      </h1>
      <p className="lead">
        <i className="fas fa-code-branch"></i> Add any school or bootcamp
        you have attended
      </p>
      <form className="form" onSubmit={onSubmit}>
        <div className="form-group">
        <i className="fas create-icon fa-graduation-cap"></i>
          <input type="text" placeholder="* Degree or Certificate" name="degree" required value={degree} onChange={onChange} />
        </div>
        <div className="form-group">
        <i className="fas create-icon fa-school"></i>
          <input type="text" placeholder="* School or Bootcamp" name="school" required value={school} onChange={onChange} />
        </div>
        <div className="form-group">
        <i className="fas create-icon fa-shield-alt"></i>
          <input type="text" placeholder="Field of study" name="fieldofstudy" value={fieldofstudy} onChange={onChange} />
        </div>
        <div className="form-group">
          <h4>From Date</h4>
          <input type="date" name="from" value={from} onChange={onChange} />
        </div>
         <div className="form-group">
          <p><input type="checkbox" name="current" checked={current} value={current} onChange={e=>{
                 setFormData({...formData, current:!current})
                 toggleDisabled(!toDateDisabled)
          }}/> Current Education</p>
        </div>
        {!toDateDisabled && ( <div className="form-group">
          <h4>To Date</h4>
          <input type="date" name="to" value={to} onChange={onChange} />
        </div>)}
       
        <div className="form-group">
        <i className="fas create-icon fa-question"></i>
          <textarea
            name="description"
            placeholder="Program Description"
            maxlength="200"
            value={description} onChange={onChange}
          ></textarea>
        </div>
   
        <button type="submit" className="btn btn-primary my-1">Add Education</button>
      </form>
      </div>
      </div>
      </Fragment>
   )
}

AddEducation.propTypes = {
   addEducation: PropTypes.func.isRequired,
}

export default connect(null, {addEducation})(withRouter(AddEducation))
