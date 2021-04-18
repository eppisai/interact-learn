import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Row, Col, ListGroup, Card, Button, Form, Collapse} from 'react-bootstrap'
import Rating from '../components/Rating'
import Message from '../components/Message'
import Loader from '../components/Loader'
import Meta from '../components/Meta'
import {listProductDetails,createProductReview} from '../actions/productActions'
import { PRODUCT_CREATE_REVIEW_RESET } from '../constants/productConstants'
import ReactPlayer from 'react-player/youtube'
import '../css/ProductScreen.css';
import play_icon from "../assets/play-button.svg";
import traingle from "../assets/bleach.svg";

const ProductScreen = ({ history, match }) => {
  const [qty, setQty] = useState(1)
  const [rating, setRating] = useState(0)
  const [comment, setComment] = useState('')
  const [open1, setOpen1] = useState(false);
  const [open2, setOpen2] = useState(false);
  const [open3, setOpen3] = useState(false);
  const [open4, setOpen4] = useState(false);
  const [open5, setOpen5] = useState(false);
  const [open6, setOpen6] = useState(false);
  const [open7, setOpen7] = useState(false);


  const dispatch = useDispatch()

  const productDetails = useSelector((state) => state.productDetails)
  const { loading, error, product } = productDetails

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  const productReviewCreate = useSelector((state) => state.productReviewCreate)
  const {
    success: successProductReview,
    loading: loadingProductReview,
    error: errorProductReview,
  } = productReviewCreate

  useEffect(() => {
    if (successProductReview) {
      setRating(0)
      setComment('')
    }
    if (!product._id || product._id !== match.params.id) {
      dispatch(listProductDetails(match.params.id))
      dispatch({ type: PRODUCT_CREATE_REVIEW_RESET })
    }
  }, [dispatch, match, successProductReview])

  const addToCartHandler = () => {
    history.push(`/cart/${match.params.id}?qty=${qty}`)
  }

  const submitHandler = (e) => {
    e.preventDefault()
    dispatch(
      createProductReview(match.params.id, {
        rating,
        comment,
      })
    )
  }

  return (
    <div className="container-fluid p-0 m-0">
      <Link className='btn btn-light my-3 ml-3' to='/'>
        Go Back
      </Link>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>{error}</Message>
      ) : (
        <div className="container-fluid m-0 p-0">
          <Meta title={product.name} />
          <div className="container-fluid row">
            <Col md={6} className="d-flex flex-row align-items-center justify-content-center">
              <ReactPlayer url="https://youtu.be/0Vg5Ba57enM" />
            </Col>
            <Col md={3}>
              <ListGroup variant='flush'>
                <ListGroup.Item>
                  <h3>{product.name}</h3>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Rating
                    value={product.rating}
                    text={`${product.numReviews} reviews`}
                  />
                </ListGroup.Item>
                <ListGroup.Item>Price: ${product.price}</ListGroup.Item>
                <ListGroup.Item>
                  Description: {product.description}
                </ListGroup.Item>
              </ListGroup>
            </Col>
            <Col md={2}>
              <Card>
                <ListGroup variant='flush'>
                  <ListGroup.Item>
                    <Row>
                      <Col>Price:</Col>
                      <Col>
                        <strong>${product.price}</strong>
                      </Col>
                    </Row>
                  </ListGroup.Item>

                  <ListGroup.Item>
                    <Row>
                      <Col>Status:</Col>
                      <Col>
                        {product.countInStock > 0 ? 'In Stock' : 'Out Of Stock'}
                      </Col>
                    </Row>
                  </ListGroup.Item>

                  {product.countInStock > 0 && (
                    <ListGroup.Item>
                      <Row>
                        <Col className="align-items-center" >Qty:</Col>
                        <Col>
                          <Form.Control
                            className="m-0 p-0"
                            as='select'
                            value={qty}
                            onChange={(e) => setQty(e.target.value)}
                          >
                            {[...Array(product.countInStock).keys()].map(
                              (x) => (
                                <option key={x + 1} value={x + 1}>
                                  {x + 1}
                                </option>
                              )
                            )}
                          </Form.Control>
                        </Col>
                      </Row>
                    </ListGroup.Item>
                  )}

                  <ListGroup.Item>
                    <Button
                      onClick={addToCartHandler}
                      className='btn-block m-0 p-0'
                      style={{'height':'45px'}}
                      type='button'
                      disabled={product.countInStock === 0}
                    >
                      Add To Cart
                    </Button>
                  </ListGroup.Item>
                </ListGroup>
              </Card>
            </Col>
          </div>
          <div className="container-fluid row m-0 mt-5 p-0 d-flex justify-content-between">
            <Col md={5} className="m-0 ml-5 p-0 pl-4">
              <h2 className="white">Reviews</h2>
              {product.reviews.length === 0 && <Message>No Reviews</Message>}
              <ListGroup variant='flush'>
                {product.reviews.map((review) => (
                  <ListGroup.Item key={review._id}>
                    <strong>{review.name}</strong>
                    <Rating value={review.rating} />
                    <p>{review.createdAt.substring(0, 10)}</p>
                    <p>{review.comment}</p>
                  </ListGroup.Item>
                ))}
                <ListGroup.Item>
                  <h2>Write a Customer Review</h2>
                  {successProductReview && (
                    <Message variant='success'>
                      Review submitted successfully
                    </Message>
                  )}
                  {loadingProductReview && <Loader />}
                  {errorProductReview && (
                    <Message variant='danger'>{errorProductReview}</Message>
                  )}
                  {userInfo ? (
                    <Form onSubmit={submitHandler}>
                      <Form.Group controlId='rating'>
                        <Form.Label>Rating</Form.Label>
                        <Form.Control
                          as='select'
                          value={rating}
                          onChange={(e) => setRating(e.target.value)}
                        >
                          <option value=''>Select...</option>
                          <option value='1'>1 - Poor</option>
                          <option value='2'>2 - Fair</option>
                          <option value='3'>3 - Good</option>
                          <option value='4'>4 - Very Good</option>
                          <option value='5'>5 - Excellent</option>
                        </Form.Control>
                      </Form.Group>
                      <Form.Group controlId='comment'>
                        <Form.Label>Comment</Form.Label>
                        <Form.Control
                          as='textarea'
                          row='3'
                          value={comment}
                          onChange={(e) => setComment(e.target.value)}
                        ></Form.Control>
                      </Form.Group>
                      <Button
                        disabled={loadingProductReview}
                        type='submit'
                        variant='primary'
                      >
                        Submit
                      </Button>
                    </Form>
                  ) : (
                    <Message>
                      Please <Link to='/login'>sign in</Link> to write a review{' '}
                    </Message>
                  )}
                </ListGroup.Item>
              </ListGroup>
            </Col>
            <Col md={6} className="m-0 p-0 ">
              <h2 style={{color: "white"}}>What's inside</h2>
              <p style={{color: "white"}}>This course contains 128 interactive screencasts spread across 9 modules.</p>
              <div className="col-10 my-2">
                <Button
                  className="col-10 collapse-button mb-1 px-5 d-flex align-items-center justify-content-between"
                  onClick={() => setOpen1(!open1)}
                  aria-controls="example-collapse-text"
                  aria-expanded={open1}
                  style={{color: "white !important"}}
                >
                  1. Introduction <img className="triangle-product-screen" src={traingle} />
                </Button>
                <Collapse in={open1}>
                  <div className="col-10 mt-1" id="example-collapse-text">
                    <a href = "https://one111111.herokuapp.com//user/">
                    <img className="collapse-play-icon" src={play_icon} />
                    <span className="ml-3" style={{color: "white"}}>1. Course Introduction and Overview</span>
                    </a>
                  </div>
                </Collapse>
                <Collapse in={open1}>
                  <div className="col-10 mt-1" id="example-collapse-text">
                    <a href = "https://one111111.herokuapp.com//user/">
                    <img className="collapse-play-icon" src={play_icon} />
                    <span className="ml-3" style={{color: "white"}}>2. Setting the stage with modern javascript features</span>
                    </a>
                  </div>
                </Collapse>
                <Collapse in={open1}>
                  <div className="col-10 mt-1" id="example-collapse-text">
                    <a href = "https://one111111.herokuapp.com//user/">
                    <img className="collapse-play-icon" src={play_icon} />
                    <span className="ml-3" style={{color: "white"}}>3. React.Fragment</span>
                    </a>
                  </div>
                </Collapse>
                <Collapse in={open1}>
                  <div className="col-10 mt-1" id="example-collapse-text">
                    <a href = "https://one111111.herokuapp.com//user/">
                    <img className="collapse-play-icon" src={play_icon} />
                    <span className="ml-3" style={{color: "white"}}>4. Default Props</span>
                    </a>
                  </div>
                </Collapse>
                <Collapse in={open1}>
                  <div className="col-10 mt-1" id="example-collapse-text">
                    <a href = "https://one111111.herokuapp.com//user/">
                    <img className="collapse-play-icon" src={play_icon} />
                    <span className="ml-3" style={{color: "white"}}>5. Prop Types</span>
                    </a>
                  </div>
                </Collapse>
                <Collapse in={open1}>
                  <div className="col-10 mt-1" id="example-collapse-text">
                    <a href = "https://one111111.herokuapp.com//user/">
                    <img className="collapse-play-icon" src={play_icon} />
                    <span className="ml-3" style={{color: "white"}}>6. defaultProps and propTypes Practice</span>
                    </a>
                  </div>
                </Collapse>
                <Collapse in={open1}>
                  <div className="col-10 mt-1" id="example-collapse-text">
                    <a href = "https://one111111.herokuapp.com//user/">
                    <img className="collapse-play-icon" src={play_icon} />
                    <span className="ml-3" style={{color: "white"}}>7. Feedback - Intro</span>
                    </a>
                  </div>
                </Collapse>
              </div>
              <div className="col-10 my-2">
                <Button
                  className="col-10 collapse-button mb-1 px-5 d-flex align-items-center justify-content-between"
                  onClick={() => setOpen2(!open2)}
                  aria-controls="example-collapse-text"
                  aria-expanded={open2}
                  style={{color: "white"}}
                >
                  2. Reusability <img className="triangle-product-screen" src={traingle} />
                </Button>
                <Collapse in={open2}>
                  <div className="col-10 mt-1" id="example-collapse-text">
                    <a href = "https://one111111.herokuapp.com//user/">
                    <img className="collapse-play-icon" src={play_icon} />
                    <span className="ml-3" style={{color: "white"}}>1. Course Introduction and Overview</span>
                    </a>
                  </div>
                </Collapse>
                <Collapse in={open2}>
                  <div className="col-10 mt-1" id="example-collapse-text">
                    <a href = "https://one111111.herokuapp.com//user/">
                    <img className="collapse-play-icon" src={play_icon} />
                    <span className="ml-3" style={{color: "white"}}>2. Setting the stage with modern javascript features</span>
                    </a>
                  </div>
                </Collapse>
                <Collapse in={open2}>
                  <div className="col-10 mt-1" id="example-collapse-text">
                    <a href = "https://one111111.herokuapp.com//user/">
                    <img className="collapse-play-icon" src={play_icon} />
                    <span className="ml-3" style={{color: "white"}}>3. React.Fragment</span>
                    </a>
                  </div>
                </Collapse>
                <Collapse in={open2}>
                  <div className="col-10 mt-1" id="example-collapse-text">
                    <a href = "https://one111111.herokuapp.com//user/">
                    <img className="collapse-play-icon" src={play_icon} />
                    <span className="ml-3" style={{color: "white"}}>4. Default Props</span>
                    </a>
                  </div>
                </Collapse>
                <Collapse in={open2}>
                  <div className="col-10 mt-1" id="example-collapse-text">
                    <a href = "https://one111111.herokuapp.com//user/">
                    <img className="collapse-play-icon" src={play_icon} />
                    <span className="ml-3" style={{color: "white"}}>5. Prop Types</span>
                    </a>
                  </div>
                </Collapse>
                <Collapse in={open2}>
                  <div className="col-10 mt-1" id="example-collapse-text">
                    <a href = "https://one111111.herokuapp.com//user/">
                    <img className="collapse-play-icon" src={play_icon} />
                    <span className="ml-3" style={{color: "white"}}>6. defaultProps and propTypes Practice</span>
                    </a>
                  </div>
                </Collapse>
                <Collapse in={open2}>
                  <div className="col-10 mt-1" id="example-collapse-text">
                    <a href = "https://one111111.herokuapp.com//user/">
                    <img className="collapse-play-icon" src={play_icon} />
                    <span className="ml-3" style={{color: "white"}}>7. Feedback - Intro</span>
                    </a>
                  </div>
                </Collapse>
              </div>
              <div className="col-10 my-2">
                <Button
                  className="col-10 collapse-button mb-1 px-5 d-flex align-items-center justify-content-between"
                  onClick={() => setOpen3(!open3)}
                  aria-controls="example-collapse-text"
                  aria-expanded={open3}
                >
                  3. Performance <img className="triangle-product-screen" src={traingle} />
                </Button>
                <Collapse in={open3}>
                  <div className="col-10 mt-1" id="example-collapse-text">
                    <a href = "https://one111111.herokuapp.com//user/">
                    <img className="collapse-play-icon" src={play_icon} />
                    <span className="ml-3" style={{color: "white"}}>1. Course Introduction and Overview</span>
                    </a>
                  </div>
                </Collapse>
                <Collapse in={open3}>
                  <div className="col-10 mt-1" id="example-collapse-text">
                    <a href = "https://one111111.herokuapp.com//user/">
                    <img className="collapse-play-icon" src={play_icon} />
                    <span className="ml-3" style={{color: "white"}}>2. Setting the stage with modern javascript features</span>
                    </a>
                  </div>
                </Collapse>
                <Collapse in={open3}>
                  <div className="col-10 mt-1" id="example-collapse-text">
                    <a href = "https://one111111.herokuapp.com//user/">
                    <img className="collapse-play-icon" src={play_icon} />
                    <span className="ml-3" style={{color: "white"}}>3. React.Fragment</span>
                    </a>
                  </div>
                </Collapse>
                <Collapse in={open3}>
                  <div className="col-10 mt-1" id="example-collapse-text">
                    <a href = "https://one111111.herokuapp.com//user/">
                    <img className="collapse-play-icon" src={play_icon} />
                    <span className="ml-3" style={{color: "white"}}>4. Default Props</span>
                    </a>
                  </div>
                </Collapse>
                <Collapse in={open3}>
                  <div className="col-10 mt-1" id="example-collapse-text">
                    <a href = "https://one111111.herokuapp.com//user/">
                    <img className="collapse-play-icon" src={play_icon} />
                    <span className="ml-3" style={{color: "white"}}>5. Prop Types</span>
                    </a>
                  </div>
                </Collapse>
                <Collapse in={open3}>
                  <div className="col-10 mt-1" id="example-collapse-text">
                    <a href = "https://one111111.herokuapp.com//user/">
                    <img className="collapse-play-icon" src={play_icon} />
                    <span className="ml-3" style={{color: "white"}}>6. defaultProps and propTypes Practice</span>
                    </a>
                  </div>
                </Collapse>
                <Collapse in={open3}>
                  <div className="col-10 mt-1" id="example-collapse-text">
                    <a href = "https://one111111.herokuapp.com//user/">
                    <img className="collapse-play-icon" src={play_icon} />
                    <span className="ml-3" style={{color: "white"}}>7. Feedback - Intro</span>
                    </a>
                  </div>
                </Collapse>
              </div>
              <div className="col-10 my-2">
                <Button
                  className="col-10 collapse-button mb-1 px-5 d-flex align-items-center justify-content-between"
                  onClick={() => setOpen4(!open4)}
                  aria-controls="example-collapse-text"
                  aria-expanded={open4}
                >
                  4. React Context <img className="triangle-product-screen" src={traingle} />
                </Button>
                <Collapse in={open4}>
                  <div className="col-10 mt-1" id="example-collapse-text">
                    <a href = "https://one111111.herokuapp.com//user/">
                    <img className="collapse-play-icon" src={play_icon} />
                    <span className="ml-3" style={{color: "white"}}>1. Course Introduction and Overview</span>
                    </a>
                  </div>
                </Collapse>
                <Collapse in={open4}>
                  <div className="col-10 mt-1" id="example-collapse-text">
                    <a href = "https://one111111.herokuapp.com//user/">
                    <img className="collapse-play-icon" src={play_icon} />
                    <span className="ml-3" style={{color: "white"}}>2. Setting the stage with modern javascript features</span>
                    </a>
                  </div>
                </Collapse>
                <Collapse in={open4}>
                  <div className="col-10 mt-1" id="example-collapse-text">
                    <a href = "https://one111111.herokuapp.com//user/">
                    <img className="collapse-play-icon" src={play_icon} />
                    <span className="ml-3" style={{color: "white"}}>3. React.Fragment</span>
                    </a>
                  </div>
                </Collapse>
                <Collapse in={open4}>
                  <div className="col-10 mt-1" id="example-collapse-text">
                    <a href = "https://one111111.herokuapp.com//user/">
                    <img className="collapse-play-icon" src={play_icon} />
                    <span className="ml-3" style={{color: "white"}}>4. Default Props</span>
                    </a>
                  </div>
                </Collapse>
                <Collapse in={open4}>
                  <div className="col-10 mt-1" id="example-collapse-text">
                    <a href = "https://one111111.herokuapp.com//user/">
                    <img className="collapse-play-icon" src={play_icon} />
                    <span className="ml-3" style={{color: "white"}}>5. Prop Types</span>
                    </a>
                  </div>
                </Collapse>
                <Collapse in={open4}>
                  <div className="col-10 mt-1" id="example-collapse-text">
                    <a href = "https://one111111.herokuapp.com//user/">
                    <img className="collapse-play-icon" src={play_icon} />
                    <span className="ml-3" style={{color: "white"}}>6. defaultProps and propTypes Practice</span>
                    </a>
                  </div>
                </Collapse>
                <Collapse in={open4}>
                  <div className="col-10 mt-1" id="example-collapse-text">
                    <a href = "https://one111111.herokuapp.com//user/">
                    <img className="collapse-play-icon" src={play_icon} />
                    <span className="ml-3" style={{color: "white"}}>7. Feedback - Intro</span>
                    </a>
                  </div>
                </Collapse>
              </div>
              <div className="col-10 my-2">
                <Button
                  className="col-10 collapse-button mb-1 px-5 d-flex align-items-center justify-content-between"
                  onClick={() => setOpen5(!open5)}
                  aria-controls="example-collapse-text"
                  aria-expanded={open5}
                >
                  5. React Hooks <img className="triangle-product-screen" src={traingle} />
                </Button>
                <Collapse in={open5}>
                  <div className="col-10 mt-1" id="example-collapse-text">
                    <a href = "https://one111111.herokuapp.com//user/">
                    <img className="collapse-play-icon" src={play_icon} />
                    <span className="ml-3" style={{color: "white"}}>1. Course Introduction and Overview</span>
                    </a>
                  </div>
                </Collapse>
                <Collapse in={open5}>
                  <div className="col-10 mt-1" id="example-collapse-text">
                    <a href = "https://one111111.herokuapp.com//user/">
                    <img className="collapse-play-icon" src={play_icon} />
                    <span className="ml-3" style={{color: "white"}}>2. Setting the stage with modern javascript features</span>
                    </a>
                  </div>
                </Collapse>
                <Collapse in={open5}>
                  <div className="col-10 mt-1" id="example-collapse-text">
                    <a href = "https://one111111.herokuapp.com//user/">
                    <img className="collapse-play-icon" src={play_icon} />
                    <span className="ml-3" style={{color: "white"}}>3. React.Fragment</span>
                    </a>
                  </div>
                </Collapse>
                <Collapse in={open5}>
                  <div className="col-10 mt-1" id="example-collapse-text">
                    <a href = "https://one111111.herokuapp.com//user/">
                    <img className="collapse-play-icon" src={play_icon} />
                    <span className="ml-3" style={{color: "white"}}>4. Default Props</span>
                    </a>
                  </div>
                </Collapse>
                <Collapse in={open5}>
                  <div className="col-10 mt-1" id="example-collapse-text">
                    <a href = "https://one111111.herokuapp.com//user/">
                    <img className="collapse-play-icon" src={play_icon} />
                    <span className="ml-3" style={{color: "white"}}>5. Prop Types</span>
                    </a>
                  </div>
                </Collapse>
                <Collapse in={open5}>
                  <div className="col-10 mt-1" id="example-collapse-text">
                    <a href = "https://one111111.herokuapp.com//user/">
                    <img className="collapse-play-icon" src={play_icon} />
                    <span className="ml-3" style={{color: "white"}}>6. defaultProps and propTypes Practice</span>
                    </a>
                  </div>
                </Collapse>
                <Collapse in={open5}>
                  <div className="col-10 mt-1" id="example-collapse-text">
                    <a href = "https://one111111.herokuapp.com//user/">
                    <img className="collapse-play-icon" src={play_icon} />
                    <span className="ml-3" style={{color: "white"}}>7. Feedback - Intro</span>
                    </a>
                  </div>
                </Collapse>
              </div>
              <div className="col-10 my-2">
                <Button
                  className="col-10 collapse-button mb-1 px-5 d-flex align-items-center justify-content-between"
                  onClick={() => setOpen6(!open6)}
                  aria-controls="example-collapse-text"
                  aria-expanded={open6}
                >
                  6. React Router <img className="triangle-product-screen" src={traingle} />
                </Button>
                <Collapse in={open6}>
                  <div className="col-10 mt-1" id="example-collapse-text">
                    <a href = "https://one111111.herokuapp.com//user/">
                    <img className="collapse-play-icon" src={play_icon} />
                    <span className="ml-3" style={{color: "white"}}>1. Course Introduction and Overview</span>
                    </a>
                  </div>
                </Collapse>
                <Collapse in={open6}>
                  <div className="col-10 mt-1" id="example-collapse-text">
                    <a href = "https://one111111.herokuapp.com//user/">
                    <img className="collapse-play-icon" src={play_icon} />
                    <span className="ml-3" style={{color: "white"}}>2. Setting the stage with modern javascript features</span>
                    </a>
                  </div>
                </Collapse>
                <Collapse in={open6}>
                  <div className="col-10 mt-1" id="example-collapse-text">
                    <a href = "https://one111111.herokuapp.com//user/">
                    <img className="collapse-play-icon" src={play_icon} />
                    <span className="ml-3" style={{color: "white"}}>3. React.Fragment</span>
                    </a>
                  </div>
                </Collapse>
                <Collapse in={open6}>
                  <div className="col-10 mt-1" id="example-collapse-text">
                    <a href = "https://one111111.herokuapp.com//user/">
                    <img className="collapse-play-icon" src={play_icon} />
                    <span className="ml-3" style={{color: "white"}}>4. Default Props</span>
                    </a>
                  </div>
                </Collapse>
                <Collapse in={open6}>
                  <div className="col-10 mt-1" id="example-collapse-text">
                    <a href = "https://one111111.herokuapp.com//user/">
                    <img className="collapse-play-icon" src={play_icon} />
                    <span className="ml-3" style={{color: "white"}}>5. Prop Types</span>
                    </a>
                  </div>
                </Collapse>
                <Collapse in={open6}>
                  <div className="col-10 mt-1" id="example-collapse-text">
                    <a href = "https://one111111.herokuapp.com//user/">
                    <img className="collapse-play-icon" src={play_icon} />
                    <span className="ml-3" style={{color: "white"}}>6. defaultProps and propTypes Practice</span>
                    </a>
                  </div>
                </Collapse>
                <Collapse in={open6}>
                  <div className="col-10 mt-1" id="example-collapse-text">
                    <a href = "https://one111111.herokuapp.com//user/">
                    <img className="collapse-play-icon" src={play_icon} />
                    <span className="ml-3" style={{color: "white"}}>7. Feedback - Intro</span>
                    </a>
                  </div>
                </Collapse>
              </div>
              <div className="col-10 my-2">
                <Button
                  className="col-10 collapse-button mb-1 px-5 d-flex align-items-center justify-content-between"
                  onClick={() => setOpen7(!open7)}
                  aria-controls="example-collapse-text"
                  aria-expanded={open7}
                >
                  7. Redux <img className="triangle-product-screen" src={traingle} />
                </Button>
                <Collapse in={open7}>
                  <div className="col-10 mt-1" id="example-collapse-text">
                    <a href = "https://one111111.herokuapp.com//user/">
                    <img className="collapse-play-icon" src={play_icon} />
                    <span className="ml-3" style={{color: "white"}}>1. Course Introduction and Overview</span>
                    </a>
                  </div>
                </Collapse>
                <Collapse in={open7}>
                  <div className="col-10 mt-1" id="example-collapse-text">
                    <a href = "https://one111111.herokuapp.com//user/">
                    <img className="collapse-play-icon" src={play_icon} />
                    <span className="ml-3" style={{color: "white"}}>2. Setting the stage with modern javascript features</span>
                    </a>
                  </div>
                </Collapse>
                <Collapse in={open7}>
                  <div className="col-10 mt-1" id="example-collapse-text">
                    <a href = "https://one111111.herokuapp.com//user/">
                    <img className="collapse-play-icon" src={play_icon} />
                    <span className="ml-3" style={{color: "white"}}>3. React.Fragment</span>
                    </a>
                  </div>
                </Collapse>
                <Collapse in={open7}>
                  <div className="col-10 mt-1" id="example-collapse-text">
                    <a href = "https://one111111.herokuapp.com//user/">
                    <img className="collapse-play-icon" src={play_icon} />
                    <span className="ml-3" style={{color: "white"}}>4. Default Props</span>
                    </a>
                  </div>
                </Collapse>
                <Collapse in={open7}>
                  <div className="col-10 mt-1" id="example-collapse-text">
                    <a href = "https://one111111.herokuapp.com//user/">
                    <img className="collapse-play-icon" src={play_icon} />
                    <span className="ml-3" style={{color: "white"}}>5. Prop Types</span>
                    </a>
                  </div>
                </Collapse>
                <Collapse in={open7}>
                  <div className="col-10 mt-1" id="example-collapse-text">
                    <a href = "https://one111111.herokuapp.com//user/">
                    <img className="collapse-play-icon" src={play_icon} />
                    <span className="ml-3" style={{color: "white"}}>6. defaultProps and propTypes Practice</span>
                    </a>
                  </div>
                </Collapse>
                <Collapse in={open7}>
                  <div className="col-10 mt-1" id="example-collapse-text">
                    <a href = "https://one111111.herokuapp.com//user/">
                    <img className="collapse-play-icon" src={play_icon} />
                    <span className="ml-3" style={{color: "white"}}>7. Feedback - Intro</span>
                    </a>
                  </div>
                </Collapse>
              </div>
            </Col>
          </div>
        </div>
      )}
    </div>
  )
}

export default ProductScreen
