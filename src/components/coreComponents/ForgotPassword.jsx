import React from 'react'
import {Link} from 'react-router-dom'
const ForgotPassword = () => {
    return (
        <div>
            <div className="welomePage">
          <div className="container">
        <div className="row justify-content-center">
          <div className="col-lg-5">
            <div className="card shadow-lg border-0 rounded-lg mt-5">
              <div className="card-header"><h3 className="text-center font-weight-light my-4">Password Recovery</h3></div>
              <div className="card-body">
                <div className="small mb-3 text-muted">Enter your email address and we will send you a link to reset your password.</div>
                <form>
                  <div className="form-group"><label className="small mb-1" htmlFor="inputEmailAddress">Email</label><input className="form-control py-4" id="inputEmailAddress" type="email" aria-describedby="emailHelp" placeholder="Enter email address" /></div>
                  <div className="form-group d-flex align-items-center justify-content-between mt-4 mb-0"><Link className="small" to='/'>Return to login</Link><a className="btn btn-primary" href="login.html">Reset Password</a></div>
                </form>
              </div>
              <div className="card-footer text-center">
              <div className="small"><Link className="" to='/'> Have an account? Go to login</Link></div>
              </div>
            </div>
          </div>
        </div>
      </div>
      </div>
       
        </div>
    )
}

export default ForgotPassword
