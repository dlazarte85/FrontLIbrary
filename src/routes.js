import React from 'react'

const Dashboard = React.lazy(() => import('./views/dashboard/Dashboard'))
const Products = React.lazy(() => import('./views/products/Products'))
const CreateProduct = React.lazy(() => import('./views/products/CreateProduct'))
const EditProduct = React.lazy(() => import('./views/products/EditProduct'))
const Categories = React.lazy(() => import('./views/categories/Categories'))
const CreateCategory = React.lazy(() => import('./views/categories/CreateCategory'))
const EditCategory = React.lazy(() => import('./views/categories/EditCategory'))
const routes = [
  { path: '/', exact: true, name: 'Home' },
  { path: '/dashboard', name: 'Dashboard', element: Dashboard },
  { path: '/products', name: 'Products', element: Products },
  { path: '/products/create', name: 'Create', element: CreateProduct },
  { path: '/products/edit/:id', name: 'Edit', element: EditProduct },
  { path: '/categories', name: 'Categories', element: Categories },
  { path: '/categories/create', name: 'Create', element: CreateCategory },
  { path: '/categories/edit/:id', name: 'Edit', element: EditCategory },
]

export default routes
