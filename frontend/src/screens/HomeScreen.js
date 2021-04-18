import React, { useEffect } from 'react'
import {motion} from "framer-motion";
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Row, Col } from 'react-bootstrap'
import Product from '../components/Product'
import Message from '../components/Message'
import Loader from '../components/Loader'
import Paginate from '../components/Paginate'
import ProductCarousel from '../components/ProductCarousel'
import Meta from '../components/Meta'
import { listProducts } from '../actions/productActions'

const HomeScreen = ({ match }) => {
  const keyword = match.params.keyword

  const pageNumber = match.params.pageNumber || 1

  const dispatch = useDispatch()

  const productList = useSelector((state) => state.productList)
  const { loading, error, products, page, pages } = productList

  useEffect(() => {
    dispatch(listProducts(keyword, pageNumber))
  }, [dispatch, keyword, pageNumber])

  return (
    <motion.div initial= {{opacity:0, scale: 0.6 }} animate={{opacity:1, scale: 1}} transition= {{duration: 0.6}}>
      <Meta />
      {!keyword ? (
        <ProductCarousel />
      ) : (
        <Link to='/' className='btn btn-light'>
          Go Back
        </Link>
      )}
      <motion.div initial={{opacity:0,y:90}} animate={{opacity:1,y:0}} transition={{delay:0.6, duration:0.6,type: "spring", damping: 16, stiffness: 200,}} className="container-fluid m-0 p-4">
        <h1>Latest courses</h1>
        {loading ? (
          <Loader />
        ) : error ? (
          <Message variant='danger'>{error}</Message>
        ) : (
          <>
            <Row style={{alignItems: 'center',justifyContent: 'center'}}>
              {products.map((product) => (
                <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                  <Product product={product} />
                </Col>
              ))}
            </Row>
            <Paginate
              pages={pages}
              page={page}
              keyword={keyword ? keyword : ''}
            />
          </>
        )}
      </motion.div>
    </motion.div>
  )
}

export default HomeScreen
