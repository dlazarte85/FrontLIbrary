import React, { useState } from 'react'
import {
  CAlert,
  CButton,
  CCard,
  CCardBody,
  CCol,
  CContainer,
  CForm,
  CFormInput,
  CInputGroup,
  CInputGroupText,
  CRow,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilLockLocked, cilUser } from '@coreui/icons'
import Api from 'src/services/Api'
import { Link } from 'react-router-dom'

const Register = () => {
  const [validated, setValidated] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState(false)
  const [errorMsg, setErrorMsg] = useState([])
  const [params, setParams] = useState({
    username: '',
    name: '',
    email: '',
    password: '',
    password_confirm: '',
  })

  const handleChange = (name, value) => {
    setParams((prevState) => ({
      ...prevState,
      [name]: value,
    }))
  }

  const handleSubmit = async (event) => {
    const form = event.currentTarget
    if (form.checkValidity() === false) {
      event.preventDefault()
      event.stopPropagation()
    }
    setValidated(true)
    try {
      const response = await Api.post('/users', params)
      if (response.status === 201) {
        setSuccess(true)
      }
    } catch (error) {
      setError(true)
      if (error.response.status === 422) {
        let errorMessage = []
        errorMessage = error.response.data.error.map((value) => {
          return value.loc[1] + ': ' + value.msg
        })
        setErrorMsg(errorMessage)
      } else {
        setErrorMsg((current) => [...current, error.response.data.error])
      }
    }
  }

  return (
    <div className="bg-light min-vh-100 d-flex flex-row align-items-center">
      <CContainer>
        <CRow className="justify-content-center">
          <CCol md={9} lg={7} xl={6}>
            <CCard className="mx-4">
              <CCardBody className="p-4">
                {success === true && <CAlert color="success"> User created successfully. </CAlert>}
                {error === true ? (
                  <CAlert color="danger">
                    {errorMsg.map((value, index) => {
                      return <p key={index}>{value}</p>
                    })}
                  </CAlert>
                ) : (
                  ''
                )}
                <CForm className="row g-3 needs-validation" noValidate validated={validated}>
                  <h1>Register</h1>
                  <p className="text-medium-emphasis">Create your account</p>
                  <CInputGroup className="mb-3">
                    <CInputGroupText>
                      <CIcon icon={cilUser} />
                    </CInputGroupText>
                    <CFormInput
                      placeholder="Username"
                      name="username"
                      autoComplete="username"
                      onChange={(e) => handleChange(e.target.name, e.target.value)}
                      required
                    />
                  </CInputGroup>
                  <CInputGroup className="mb-3">
                    <CInputGroupText>
                      <CIcon icon={cilUser} />
                    </CInputGroupText>
                    <CFormInput
                      placeholder="Name"
                      name="name"
                      autoComplete="name"
                      onChange={(e) => handleChange(e.target.name, e.target.value)}
                      required
                    />
                  </CInputGroup>
                  <CInputGroup className="mb-3">
                    <CInputGroupText>@</CInputGroupText>
                    <CFormInput
                      placeholder="Email"
                      name="email"
                      autoComplete="email"
                      onChange={(e) => handleChange(e.target.name, e.target.value)}
                      required
                    />
                  </CInputGroup>
                  <CInputGroup className="mb-3">
                    <CInputGroupText>
                      <CIcon icon={cilLockLocked} />
                    </CInputGroupText>
                    <CFormInput
                      type="password"
                      name="password"
                      placeholder="Password"
                      autoComplete="new-password"
                      onChange={(e) => handleChange(e.target.name, e.target.value)}
                      required
                    />
                  </CInputGroup>
                  <CInputGroup className="mb-4">
                    <CInputGroupText>
                      <CIcon icon={cilLockLocked} />
                    </CInputGroupText>
                    <CFormInput
                      type="password"
                      name="password_confirm"
                      placeholder="Repeat password"
                      autoComplete="new-password"
                      onChange={(e) => handleChange(e.target.name, e.target.value)}
                      required
                    />
                  </CInputGroup>
                  <div className="d-grid mb-4">
                    <CButton color="success" onClick={handleSubmit}>
                      Create Account
                    </CButton>
                  </div>
                </CForm>
                <CCard>
                  <CCardBody>
                    Already registered? <Link to="/login"> Sign in </Link>
                  </CCardBody>
                </CCard>
              </CCardBody>
            </CCard>
          </CCol>
        </CRow>
      </CContainer>
    </div>
  )
}

export default Register
