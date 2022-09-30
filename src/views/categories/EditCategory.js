import React, { useState, useEffect, useCallback } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
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

const EditCategory = () => {
  const navigate = useNavigate()
  const [params, setParams] = useState({
    name: '',
  })
  const [validated, setValidated] = useState(false)
  const [error, setError] = useState(false)
  const [errorMsg, setErrorMsg] = useState([])

  const data = useParams()
  const categoryId = data.id

  const getCategory = useCallback(async () => {
    try {
      const response = await Api.get('/categories/' + categoryId)
      if (response.status === 200) {
        setParams(response.data.data)
      }
    } catch (error) {
      console.log(error)
    }
  }, [categoryId])

  useEffect(() => {
    getCategory()
  }, [getCategory])

  const handleSubmit = async (event) => {
    const form = event.currentTarget
    if (form.checkValidity() === false) {
      event.preventDefault()
      event.stopPropagation()
    }
    setValidated(true)

    try {
      await Api.put('/categories/' + categoryId, params)
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
            <strong>Edit Category</strong>
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
                  value={params.name}
                  id="validationCustomName"
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

export default EditCategory
