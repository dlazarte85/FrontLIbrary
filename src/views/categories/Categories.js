import React, { useCallback, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
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
} from '@coreui/react'
import Api from 'src/services/Api'

const Categories = () => {
  const navigate = useNavigate()
  const [categories, setCategories] = useState([])
  const [visible, setVisible] = useState(false)
  const [category, setCategory] = useState(null)

  const getCategories = useCallback(async () => {
    try {
      const response = await Api.get('/categories')
      setCategories(response.data.data)
    } catch (error) {
      console.log(error)
    }
  }, [])

  useEffect(() => {
    getCategories()
  }, [getCategories])

  const createCategory = () => {
    navigate('/categories/create')
  }

  const editCategory = (id) => {
    navigate('/categories/edit/' + id)
  }

  const deleteCategory = async () => {
    const response = await Api.delete('/categories/' + category)
    if (response.status === 200) {
      getCategories()
    }
    setVisible(false)
  }

  const showModal = (id) => {
    setCategory(id)
    setVisible(!visible)
  }

  return (
    <CRow>
      <CCol xs={12}>
        <CCard className="mb-4">
          <CCardHeader>
            <strong>Categories</strong>
          </CCardHeader>
          <CCardBody>
            <CCard className="mb-4">
              <CButton color="success" onClick={() => createCategory()}>
                Create Category
              </CButton>
            </CCard>
            <CTable bordered>
              <CTableHead>
                <CTableRow>
                  <CTableHeaderCell scope="col">#</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Name</CTableHeaderCell>
                  <CTableHeaderCell scope="col" colSpan="2">
                    Action
                  </CTableHeaderCell>
                </CTableRow>
              </CTableHead>
              <CTableBody>
                {categories.map((value, index) => {
                  return (
                    <CTableRow key={index}>
                      <CTableHeaderCell scope="row">{++index}</CTableHeaderCell>
                      <CTableDataCell>{value.name}</CTableDataCell>
                      <CTableDataCell>
                        <CButton color="primary" onClick={() => editCategory(value.id)}>
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
          </CCardBody>
        </CCard>
      </CCol>
      <CModal visible={visible} onClose={() => setVisible(false)}>
        <CModalHeader>
          <CModalTitle>Delete</CModalTitle>
        </CModalHeader>
        <CModalBody>Are you sure you want to delete the category?</CModalBody>
        <CModalFooter>
          <CButton color="secondary" onClick={() => setVisible(false)}>
            Close
          </CButton>
          <CButton color="danger" onClick={() => deleteCategory()}>
            Acept
          </CButton>
        </CModalFooter>
      </CModal>
    </CRow>
  )
}

export default Categories
