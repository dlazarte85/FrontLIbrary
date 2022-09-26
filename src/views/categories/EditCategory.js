import React, { useState, useEffect } from 'react'
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
} from '@coreui/react'

const EditCategory = () => {
  const navigate = useNavigate()
  const [validated, setValidated] = useState(false)
  const [params, setParams] = useState({
    name: '',
  })
  let data = useParams()
  let categoryId = data.id

  useEffect(() => {
    getCategory()
  }, [])

  const getCategory = async () => {
    try {
      const response = await Api.get('/categories/' + categoryId)
      if (response.status === 200) {
        setParams(response.data.data)
      }
    } catch (error) {
      console.log(error)
    }
  }

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
      console.log(error)
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
