import React, { useEffect, useState } from 'react'
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
  CFormSelect,
} from '@coreui/react'

const CreateProduct = () => {
  const navigate = useNavigate()
  const [categories, setCategories] = useState([])
  const [params, setParams] = useState({
    name: '',
    price: '',
    stock: '',
    category_id: '',
  })
  const [validated, setValidated] = useState(false)

  const handleSubmit = async (event) => {
    const form = event.currentTarget
    if (form.checkValidity() === false) {
      event.preventDefault()
      event.stopPropagation()
    }
    setValidated(true)

    try {
      await Api.post('/products', params)
      navigate('/products')
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

  useEffect(() => {
    getCategory()
  }, [])

  const getCategory = async () => {
    try {
      const response = await Api.get('/categories')
      if (response.status === 200) {
        setCategories(response.data.data)
      }
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <CRow>
      <CCol xs={12}>
        <CCard className="mb-4">
          <CCardHeader>
            <strong>Create Product</strong>
          </CCardHeader>
          <CCardBody>
            <CForm
              className="row g-3 needs-validation"
              noValidate
              validated={validated}
              onSubmit={handleSubmit}
            >
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
              </CCol>
              <CCol md={6}>
                <CFormLabel htmlFor="validationCustomPrice">Price</CFormLabel>
                <CFormInput
                  name="price"
                  type="number"
                  step="0.01"
                  id="validationCustomPrice"
                  onChange={(e) => handleChange(e.target.name, e.target.value)}
                  required
                />
              </CCol>
              <CCol md={6}>
                <CFormLabel htmlFor="validationCustomStock">Stock</CFormLabel>
                <CFormInput
                  name="stock"
                  type="number"
                  id="validationCustomStock"
                  onChange={(e) => handleChange(e.target.name, e.target.value)}
                  required
                />
              </CCol>
              <CCol md={6}>
                <CFormLabel htmlFor="validationCustomCategory">Category</CFormLabel>
                <CFormSelect
                  id="validationCustomCategory"
                  name="category_id"
                  onChange={(e) => handleChange(e.target.name, e.target.value)}
                  required
                >
                  <option value="">Select category</option>
                  {categories.map((value, index) => {
                    return (
                      <option key={index} value={value.id}>
                        {value.name}
                      </option>
                    )
                  })}
                </CFormSelect>
                <CFormFeedback invalid>Please select a category.</CFormFeedback>
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

export default CreateProduct
