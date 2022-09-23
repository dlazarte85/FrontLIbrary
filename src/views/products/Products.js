import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import Api from './../../services/Api'

import {
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CRow,
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
  CButton,
} from '@coreui/react'

const Products = () => {
  const navigate = useNavigate()
  const [products, setProducts] = useState([])

  const getProducts = async () => {
    try {
      const response = await Api.get('/products')
      setProducts(response.data.data)
    } catch (error) {
      console.log(error)
    }
  }

  const editProduct = (id) => {
    navigate('/products/edit/' + id)
  }

  const deleteProduct = (id) => {
    console.log(id)
  }

  useEffect(() => {
    getProducts()
  }, [])

  return (
    <CRow>
      <CCol xs={12}>
        <CCard className="mb-4">
          <CCardHeader>
            <strong>Products</strong>
          </CCardHeader>
          <CCardBody>
            <CTable bordered>
              <CTableHead>
                <CTableRow>
                  <CTableHeaderCell scope="col">#</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Name</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Price</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Stock</CTableHeaderCell>
                  <CTableHeaderCell scope="col" colSpan="2">
                    Action
                  </CTableHeaderCell>
                </CTableRow>
              </CTableHead>
              <CTableBody>
                {products.map((value, index) => {
                  return (
                    <CTableRow key={index}>
                      <CTableHeaderCell scope="row">{value.id}</CTableHeaderCell>
                      <CTableDataCell>{value.name}</CTableDataCell>
                      <CTableDataCell>{value.price}</CTableDataCell>
                      <CTableDataCell>{value.stock}</CTableDataCell>
                      <CTableDataCell>
                        <CButton color="primary" onClick={() => editProduct(value.id)}>
                          Edit
                        </CButton>
                      </CTableDataCell>
                      <CTableDataCell>
                        <CButton color="danger" onClick={() => deleteProduct(value.id)}>
                          Delete
                        </CButton>
                      </CTableDataCell>
                    </CTableRow>
                  )
                })}
              </CTableBody>
            </CTable>
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  )
}

export default Products
