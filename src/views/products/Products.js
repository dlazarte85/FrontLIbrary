import React, { useCallback, useState, useEffect } from 'react'
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
  CModal,
  CModalBody,
  CModalHeader,
  CModalTitle,
  CModalFooter,
  CPagination,
  CPaginationItem,
} from '@coreui/react'

const Products = () => {
  const navigate = useNavigate()
  const [products, setProducts] = useState([])
  const [visible, setVisible] = useState(false)
  const [product, setProduct] = useState(null)

  const getProducts = useCallback(async () => {
    try {
      const response = await Api.get('/products')
      setProducts(response.data.data)
    } catch (error) {
      console.log(error)
    }
  }, [])

  useEffect(() => {
    getProducts()
  }, [getProducts])

  const createProduct = () => {
    navigate('/products/create')
  }

  const editProduct = (id) => {
    navigate('/products/edit/' + id)
  }

  const deleteProduct = async () => {
    const response = await Api.delete('/products/' + product)
    if (response.status === 200) {
      getProducts()
    }
    setVisible(false)
  }

  const showModal = (id) => {
    setProduct(id)
    setVisible(!visible)
  }

  return (
    <CRow>
      <CCol xs={12}>
        <CCard className="mb-4">
          <CCardHeader>
            <strong>Products</strong>
          </CCardHeader>
          <CCardBody>
            <CCard className="mb-4">
              <CButton color="success" onClick={() => createProduct()}>
                Create Product
              </CButton>
            </CCard>
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
                      <CTableHeaderCell scope="row">{++index}</CTableHeaderCell>
                      <CTableDataCell>{value.name}</CTableDataCell>
                      <CTableDataCell>{value.price}</CTableDataCell>
                      <CTableDataCell>{value.stock}</CTableDataCell>
                      <CTableDataCell>
                        <CButton color="primary" onClick={() => editProduct(value.id)}>
                          Edit
                        </CButton>
                      </CTableDataCell>
                      <CTableDataCell>
                        <CButton color="danger" onClick={() => showModal(value.id)}>
                          Delete
                        </CButton>
                      </CTableDataCell>
                    </CTableRow>
                  )
                })}
              </CTableBody>
            </CTable>
            <CPagination className="justify-content-end" aria-label="Page navigation example">
              <CPaginationItem disabled>Previous</CPaginationItem>
              <CPaginationItem>1</CPaginationItem>
              <CPaginationItem>2</CPaginationItem>
              <CPaginationItem>3</CPaginationItem>
              <CPaginationItem>Next</CPaginationItem>
            </CPagination>
          </CCardBody>
        </CCard>
      </CCol>
      <CModal visible={visible} onClose={() => setVisible(false)}>
        <CModalHeader>
          <CModalTitle>Delete</CModalTitle>
        </CModalHeader>
        <CModalBody>Are you sure you want to delete the product?</CModalBody>
        <CModalFooter>
          <CButton color="secondary" onClick={() => setVisible(false)}>
            Close
          </CButton>
          <CButton color="danger" onClick={() => deleteProduct()}>
            Acept
          </CButton>
        </CModalFooter>
      </CModal>
    </CRow>
  )
}

export default Products
