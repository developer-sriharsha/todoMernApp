import React from "react";
import { Link } from "react-router-dom";

export const AdminCards = () => {
  return (
    <div class="row mt20">
      <div class="col-xl-3 col-md-6">
        <Link to="/dashboard">
          <div class="card bg-primary text-white mb-4">
            <div class="card-body">My Todo's</div>
            <div class="card-footer d-flex align-items-center justify-content-between">
              <a class="small text-white stretched-link" href="#">
                View Details
              </a>
                <div class="small text-white">
                <i class="fas fa-angle-right"></i>
              </div>
            </div>
          </div>
        </Link>
      </div>
      <div class="col-xl-3 col-md-6">
        <Link to="/admin-view-users-todos">
          <div class="card text-yellow text-white mb-4">
            <div class="card-body">Users Todo's</div>
            <div class="card-footer d-flex align-items-center justify-content-between">
              <a class="small text-white stretched-link" href="#">
                View Details
              </a>
              <div class="small text-white">
                <i class="fas fa-angle-right"></i>
              </div>
            </div>
          </div>
        </Link>
      </div>
      <div class="col-xl-3 col-md-6">
        <Link to="/admin-userManagement">
          <div class="card bg-success text-white mb-4">
            <div class="card-body">User Management</div>
            <div class="card-footer d-flex align-items-center justify-content-between">
              <a class="small text-white stretched-link" href="#">
                View Details
              </a>
              <div class="small text-white">
                <i class="fas fa-angle-right"></i>
              </div>
            </div>
          </div>
        </Link>
      </div>
      <div class="col-xl-3 col-md-6">
        <Link to="/admin-userLogs">
          <div class="card bg-danger text-white mb-4">
            <div class="card-body">View Logs</div>
            <div class="card-footer d-flex align-items-center justify-content-between">
              <a class="small text-white stretched-link" href="#">
                View Details
              </a>
              <div class="small text-white">
                <i class="fas fa-angle-right"></i>
              </div>
            </div>
          </div>
        </Link>
      </div>
    </div>
  );
};
