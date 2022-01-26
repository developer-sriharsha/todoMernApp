import React, { useState, useEffect } from "react";
import { Button } from "semantic-ui-react";
import Modal from "react-bootstrap/Modal";
import { useDispatch, useSelector } from "react-redux";
import {Link} from 'react-router-dom'
import { signUpUserPayload } from "../../Redux/userActions/user.action";

const RegisterSuccessModal = () => {

  const RegisterUser = useSelector((state) => state.user.RegisterUser);
    let dispatch=useDispatch()

  return (
    <Modal
      // {...props}
      show={RegisterUser}
      animation
    
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
         
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="col-md-12">
          <div className="flex">
            <div className="col-md-12">
              <h3 className="text-success">Registered Successfully..</h3>
              
            </div>
         
          </div>
        </div>
      
      </Modal.Body>
      <Modal.Footer>
          

      <Link onClick={()=>dispatch(signUpUserPayload(false))}  to='/'><button className="btn btn-primary"> Go to login </button></Link>
         
      </Modal.Footer>
    </Modal>
  );
};

export default RegisterSuccessModal ;
