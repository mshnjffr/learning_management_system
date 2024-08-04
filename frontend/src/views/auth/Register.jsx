import React from 'react'
import { useEffect, useState } from 'react'
import { register } from '../../utils/auth'
import apiInstance from '../../utils/axios'
import BaseHeader from '../partials/BaseHeader'
import BaseFooter from '../partials/BaseFooter'
import { Link, useNavigate } from 'react-router-dom'


function Register() {
  // fullname, current state, setfullname == update state 
  const [fullname, setFullname] =  useState("");
  const [username, setUsername] =  useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true)
    
    const { data, error, status } = await register(fullname, username, email, password, password2);
    if (error) {
      setErrors(error);
      setIsLoading(false);
      console.log(errors);
    } else {
      navigate('/')
      alert('Registration successful, youve been logged in');
      setIsLoading(false);
    }
  };

  return (
    <>
      <BaseHeader />

      <section className="container d-flex flex-column vh-100" style={{ marginTop: "150px" }}>
        <div className="row align-items-center justify-content-center g-0 h-lg-100 py-8">
          <div className="col-lg-5 col-md-8 py-8 py-xl-0">
            <div className="card shadow">
              <div className="card-body p-6">
                <div className="mb-4">
                  <h1 className="mb-1 fw-bold">Sign up</h1>
                  <span>
                    Already have an account?
                    <Link to="/login/" className="ms-1">
                      Sign In
                    </Link>
                  </span>
                </div>
                {/* Form */}
                <form className="needs-validation" 
                      noValidate="" 
                      onSubmit={handleSubmit}>
                  {/* Username */}
                  <div className="mb-3">
                    <label htmlFor="email" className="form-label">Full Name</label>
                    <input
                      type="text"
                      id="full_name"
                      className="form-control"
                      name="full_name"
                      placeholder="John Doe"
                      required=""
                      onChange={(event) => setFullname(event.target.value)}
                    />
                    {errors.full_name && errors.full_name.map((error, index) => (
                    <div key={index} style={{ color: 'red' }}>{error}</div>
                ))}
                  </div>
                  <div className="mb-3">
                    <label htmlFor="username" className="form-label">Username</label>
                    <input
                      type="text"
                      id="username"
                      className="form-control"
                      name="username"
                      placeholder="john_doe"
                      required=""
                      onChange={(event) => setUsername(event.target.value)}
                    />
                    {errors.username && errors.username.map((error, index) => (
                    <div key={index} style={{ color: 'red' }}>{error}</div>
                ))}
                  </div>
                  <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email Address</label>
                    <input
                      type="email"
                      id="email"
                      className="form-control"
                      name="email"
                      placeholder="johndoe@gmail.com"
                      required=""
                      onChange={(event) => setEmail(event.target.value)}
                    />
                    {errors.email && errors.email.map((error, index) => (
                    <div key={index} style={{ color: 'red' }}>{error}</div>
                ))}
                  </div>
                  
                  {/* Password */}
                  <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input
                      type="password"
                      id="password"
                      className="form-control"
                      name="password"
                      placeholder="**************"
                      required=""
                      onChange={(event) => setPassword(event.target.value)}
                    />
                    {errors.password && errors.password.map((error, index) => (
                    <div key={index} style={{ color: 'red' }}>{error}</div>
                ))}
                  </div>
                  <div className="mb-3">
                    <label htmlFor="password" className="form-label">Confirm Password</label>
                    <input
                      type="password"
                      id="password2"
                      className="form-control"
                      name="password"
                      placeholder="**************"
                      required=""
                      onChange={(event) => setPassword2(event.target.value)}
                    />
                    {errors.password2 && errors.password2.map((error, index) => (
                    <div key={index} style={{ color: 'red' }}>{error}</div>
                ))}
                  </div>
                  <div>
                    <div className="d-grid">
                      {isLoading === true && (
                        <button disabled type="submit" className="btn btn-primary">
                        Processing <i className='fas fa-spinner fa-spin'></i>
                      </button>
                      )}
                        {isLoading === false && (
                        <button type="submit" className="btn btn-primary">
                        Sign Up <i className='fas fa-user-plus'></i>
                      </button>
                      )}
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>

      <BaseFooter />
    </>
  )
}

export default Register