
import React from 'react'
import {motion} from 'framer-motion';

const LandingScreen = () => {
  return (
   <motion.div initial={{opacity:0,y:90}} animate={{opacity:1,y:0}} transition={{delay:0.2, duration:0.6,type: "spring", damping: 36, stiffness: 200,}} classNameName = "landingpage">
    
    <div className="conatiner landingpage">
      <div className="row">
        <div className="col-lg-4">
          <div className="md-5 Heading">
         <h2 style={{color: 'white', fontWeight: 'bolder',margin: '20px',fontSize: '3rem'}}>Interact&Learn</h2>
      </div>
      <div class="timeline-learning">
   <div class="line">
     <div class="line-content">
       <div class="content">
         <h1>Interactive Learning</h1>
       </div>

       <div class="content">
        <h1>Solve your doubt <br/>instantly</h1>
      </div>
      
      <div class="content">
        <h1>Get the peer-motivation</h1>
      </div>
       
      <div class="content">
         <h1>Blockchain based<br/> certification</h1>
       </div>
     </div>
   </div>
 </div>

    </div>
    <div className=" col-lg-4 code-gif position-absolute  right-0 height-full home-codespaces-illo events-none">
      <img className="code-gif" src='https://github.githubassets.com/images/modules/site/home/codespaces-vscode-1.webp' alt='code'></img>
      </div>
      </div>

      <div className="tech-stack container">
        <div className="row m-5">
          <div className="col m-2" style={{width: "100%" ,height: '100%'}}><h1>The Tech stack we used<br/> and simple technologies</h1></div>
          <div className="col m-2" style={{width: "50%",height: '100%'}}>
            <div className="flex-2 m-2">
            <div class="small card">
            <div class="content">
              <strong>ReactJS</strong>
            </div>
            </div>
            </div>
            <div className="flex-2 m-2">
            <div class="small card">
            <div class="content">
              <strong>MongoDB</strong>
            </div>
            </div>
            <div class="small card">
            <div class="content">
              <strong>ExpressJS</strong>
            </div>
            </div>
            </div>
            <div className="flex-2 m-2">
            <div class="small card">
            <div class="content">
              <strong>NodeJS</strong>
            </div>
            </div>
            <div class="small card">
            <div class="content">
              <strong>Python</strong>
            </div>
            </div>
            <div class="small card">
            <div class="content">
              <strong>Heroku</strong>
            </div>
            </div>
            </div>
            </div>
        </div>
      </div>
      <div className="conatiner">
        <div className=" play-card row">

        <div class="cardLearning card--dark col-4">
         <h2 class="card__title">INTERACTIVE CLASSROOM IN VIDEO!</h2>
         <p class="card__body">Providing Students with Tutorials, that allow Students to make Changes in Instructors screen, and then Continue watching the tutoria</p>
        </div>

        <div class="cardLearning card--dark col-4">
         <h2 class="card__title">YOUR SKILLS MATTER, NOT THE PLATFORM</h2>
         <p class="card__body">We Provide you with BlockChain Powered Certification, giving you security that it can't be forged hence increasing value of your Skills</p>
        </div>

        <div class="cardLearning card--dark col-4">
         <h2 class="card__title">YOUR LEARNING MATTERS, NOT YOUR INTERNET SPEED</h2>
         <p class="card__body">Our Platform Uses approch that not makes videos Interactive but also drastically reduces size. So, Providing you with High Quality Video in a very low bandwidth.</p>
        </div>

        <div class="cardLearning card--dark col-4">
         <h2 class="card__title">NO DOUBTS, WE PROMISE</h2>
         <p class="card__body">Even after watching video you have doubt you can ask the instructor in a Live ScreenCast</p>
        </div>

        <div class="cardLearning card--dark col-4">
         <h2 class="card__title">ARE YOU A WEBDEV?</h2>
         <p class="card__body">We have a tool that can convert your drawing to website</p>
        </div>

        </div>
      </div>
      </div>
   </motion.div>
  )
}

export default LandingScreen
