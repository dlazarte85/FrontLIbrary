import React, { useCallback, useState, useEffect } from 'react'
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
  CFormSelect,
  CAlert,
} from '@coreui/react'

const EditProduct = () => {
  const navigate = useNavigate()
  const [params, setParams] = useState({
    name: '',
    price: '',
    stock: '',
  })
  const [categories, setCategories] = useState([])
  const [validated, setValidated] = useState(false)
  const [error, setError] = useState(false)
  const [errorMsg, setErrorMsg] = useState([])

  const data = useParams()
  const productId = data.id

  const getProduct = useCallback(async () => {
    try {
      const response = await Api.get('/products/' + productId)
      if (response.status === 200) {
        setParams(response.data.data)
      }
    } catch (error) {
      console.log(error)
    }
  }, [productId])

  useEffect(() => {
    getProduct()
    getCategory()
  }, [getProduct])

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

  const handleSubmit = async (event) => {
    const form = event.currentTarget
    if (form.checkValidity() === false) {
      event.preventDefault()
      event.stopPropagation()
    }
    setValidated(true)

    try {
      await Api.put('/products/' + productId, params)
      navigate('/products')
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

  const handleChange = (e) => {
    setParams((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }))
  }

  return (
    <CRow>
      <CCol xs={12}>
        <CCard className="mb-4">
          <CCardHeader>
            <strong>Edit Product</strong>
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
                  onChange={handleChange}
                  required
                />
                <CFormFeedback invalid>Please choose a name.</CFormFeedback>
              </CCol>
              <CCol md={6}>
                <CFormLabel htmlFor="validationCustomPrice">Price</CFormLabel>
                <CFormInput
                  name="price"
                  type="number"
                  value={params.price}
                  step="0.01"
                  id="validationCustomPrice"
                  onChange={handleChange}
                  required
                />
              </CCol>
              <CCol md={6}>
                <CFormLabel htmlFor="validationCustomStock">Stock</CFormLabel>
                <CFormInput
                  name="stock"
                  type="number"
                  value={params.stock}
                  id="validationCustomStock"
                  onChange={handleChange}
                  required
                />
              </CCol>
              <CCol md={6}>
                <CFormLabel htmlFor="validationCustomCategory">Category</CFormLabel>
                <CFormSelect
                  id="validationCustomCategory"
                  name="category_id"
                  onChange={handleChange}
                  required
                >
                  <option>Select category</option>
                  {categories.map((value, index) => {
                    return (
                      <option
                        key={index}
                        value={value.id}
                        selected={value.id === params.category_id}
                      >
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

export default EditProduct
