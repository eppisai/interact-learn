
import React from 'react'
import {motion} from 'framer-motion';

import "../css/Custom.css"

const VideoScreen = ({ match, location, history }) => {
  return (
   <motion.div initial={{opacity:0,y:90}} animate={{opacity:1,y:0}} transition={{delay:0.2, duration:0.6,type: "spring", damping: 36, stiffness: 200,}} className = "videoplayer">
    <div className="container_vid">
    <h1>Create your Interactive Tutorial Here!</h1>
<p className="zoom-area"><b>Record</b> Your optimized screencast with audio on our platform!  </p>
<div className="link-container">
  <a target="_blank" href="https://one111111.herokuapp.com/" class="more-link">Click Here To make A tutorial!</a>
</div>
      <div className="steps">
        <div className="container">
        <div className="row">
          <div className="col-12 text-center m-5">
            <h1 style={{color: "white"}}>Lets walk through process</h1>
          </div>
        </div>
        </div>
          <div className="timeline">
          
            <div className="circle-container">
              <section className="tl no-border"></section>
              <section className="tr no-border"></section>
              <div className="flex">
                <span className="circle">Step 1</span>
              </div>
              <section className="bl"></section>
              <section className="br"></section>
            </div>
            <section className="info no-border">
              <h2 style={{color: "white"}}>Record</h2>
              <span style={{color: "white"}}>This includes recording your idea and way to teach on our platform to avoid any hustel. by using our platform you will be able to provide good content in lesser data in better quality.</span>
            </section>
            <section></section>
            
            <section></section>
            <section className="info">
              <h2 style={{color: "white"}} className="mt-3">  check</h2>
              <span style={{color: "white"}} className="mt-3">Cross check the video and content provided for learning to avoid conflits later.</span>
            </section>
            <div className="circle-container">
              <section className="tl"></section>
              <section className="tr"></section>
              <div className="flex">
                <span style={{color: "white"}} className="circle">Step 2</span>
              </div>
              <section className="bl"></section>
              <section className="br"></section>
            </div>
         

            <div className="circle-container">
              <section className="tl"></section>
              <section className="tr"></section>
              <div className="flex">
                <span style={{color: "white"}} className="circle">Step 3</span>
              </div>
              <section style={{color: "white"}} className="bl"></section>
              <section style={{color: "white"}} className="br"></section>
            </div>
            <section className="info">
            <h2 style={{color: "white"}} >Making of certificate</h2>
              <span style={{color: "white"}} >Providing an certificate with blockchain technology we assure its validity and authenticity. It reduce the forging or faking of certificate.</span>
            </section>
            <section></section>
            
            <section></section>
            <section className="info">
              <h2 style={{color: "white"}} >Complete</h2>
              <span style={{color: "white"}} >Here, we complete a perfect course with verfication and human experience. </span>
            </section>
            <div className="circle-container">
              <section className="tl"></section>
              <section className="tr"></section>
              <div className="flex">
                <span style={{color: "white"}} className="circle">Step 4</span>
              </div>
              <section className="bl no-border"></section>
              <section className="br no-border"></section>
            </div>
          </div>   
      </div>
      <div className="container">
        <div className="row">
          <div className="col-12 d-flex text-center course">
          <a href="https://one111111.herokuapp.com/" className="click-button" style={{color: "white"}}>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          Click to make course
        </a>
          </div>
        </div>
      </div>
    </div>
   </motion.div>
  )
}

export default VideoScreen
