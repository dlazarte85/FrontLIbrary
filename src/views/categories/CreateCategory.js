import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Api from './../../services/Api'
import {
  CButton,
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CForm,
  CFormInput,
  CFormFeedback,
  CFormLabel,
  CRow,
  CAlert,
} from '@coreui/react'

const CreateCategory = () => {
  const navigate = useNavigate()
  const [params, setParams] = useState({
    name: '',
  })
  const [validated, setValidated] = useState(false)
  const [error, setError] = useState(false)
  const [errorMsg, setErrorMsg] = useState([])

  const handleSubmit = async (event) => {
    const form = event.currentTarget
    if (form.checkValidity() === false) {
      event.preventDefault()
      event.stopPropagation()
    }
    setValidated(true)

    try {
      await Api.post('/categories', params)
      navigate('/categories')
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

  const handleChange = (name, value) => {
    setParams((prevState) => ({
      ...prevState,
      [name]: value,
    }))
  }

  return (
    <CRow>
      <CCol xs={12}>
        <CCard className="mb-4">
          <CCardHeader>
            <strong>Create Category</strong>
          </CCardHeader>
          <CCardBody>
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
              <CCol md={6}>
                <CFormLabel htmlFor="validationCustomName">Name</CFormLabel>
                <CFormInput
                  name="name"
                  type="text"
                  id="validationCustomName"
                  defaultValue=""
                  aria-describedby="inputGroupPrepend"
                  onChange={(e) => handleChange(e.target.name, e.target.value)}
                  required
                />
                <CFormFeedback invalid>Please choose a name.</CFormFeedback>
              </CCol>
              <CCol xs={12}>
                <CButton color="primary" onClick={handleSubmit}>
                  Submit form
                </CButton>
              </CCol>
            </CForm>
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  )
}

export default CreateCategory
