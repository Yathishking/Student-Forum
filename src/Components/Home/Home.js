import Aos from 'aos';
import React, { useEffect } from 'react';
import FeatureCard from '../Custom/Feature-card';
import "aos/dist/aos.css";


const HomePage = () => {
   const featureCardsInfo = [
       {'title': 'Simple, Easy to use Forum', 'description': 'A Forum built for easier user interaction and efficient usage with finding answers to any question from the members of different school/\'s or from  peers.'},
       {'title': 'File Attachment', 'description': 'File attachment with multimedia insertion for each discussion is a key feature of the Forum. '},
       {'title': 'Include code in discussion.', 'description': 'Include the code for problems related to Programming.'}
    ]

useEffect(()=>{
    Aos.init({
        duration: 2000,
    });
    Aos.refresh();
}, [])
    return(
        <div className="app-main-container">
            <div className="app-main-header">
                <div className="app-brand-logo-container" data-aos='zoom-out'>
                    <div id="app-brand-logo">
                        <div className="leaf-blade"></div>
                        <h1>&nbsp;SF</h1>
                    </div>
                    <p>Student Forum</p>
                </div>
                <div className="app-header-welcome-text" data-aos="fade-up">
                        <h1>Welcome to the Student Forum.</h1>
                        <p>
                        “The Student Forum is a chance for students to engage with the Faculty<br/> and 
                        other peers in a productive dialogue <br/>
                        that is focused on improving the student experience and knowledge.”
                        </p>
                </div>
            </div>
            <div className="app-main-features container-fluid" data-aos="fade-right">
                <h2 className="app-features-heading">Features: </h2>
                <div className="app-features-grid">
                        {featureCardsInfo.map((eachCardInfo, index)=>{
                            return(
                                <FeatureCard key={index}  props= {eachCardInfo} />
                            );
                        })}
                </div>
            </div>
            <div className="container app-main-sponsor" data-aos="fade-right">
            <h2 className="title pb-2">About University</h2>
            <div id="carouselExampleCaptions" className="carousel slide " data-bs-ride="carousel">
                <div className="carousel-indicators">
                    <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="0" className="active" aria-current="true" aria-label="Slide 1"></button>
                    <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="1" aria-label="Slide 2"></button>
                    <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="2" aria-label="Slide 3"></button>
                </div>
                <div className="carousel-inner text-warp" style={{color: 'slateblue'}}>
                    <div className="carousel-item active text-center">
                    <p className='carousel-text' >REVA University has a global outlook towards education to match the international standards of education. 
                        The quality education offered by REVA has created a wave among
                        various organisations and honoured with rankings and awards in different categories.</p>
                    </div>
                    <div className="carousel-item text-center">
                        <p className='carousel-text'>
                            REVA’s B.Tech in Electronics and Computer Engineering B. Tech (ECM) program is 
                            designed to provide quality education imparting skills on both Electronics hardware, 
                            software and IT development. Electronics and Computer Engineering is a branch of Electronics 
                            Engineering that deals with the effects of electrons 
                            to build components, devices, systems, or equipment.
                        </p>
                    </div>
                    <div className="carousel-item text-center">
                    <p className='carousel-text'>The Forum is accessible by everyone and it gives basic 
                        functionality like Registering, Login and creating threads(questions/thought views) 
                        and to update those views. The Forum also provides many UI features for including the 
                        multimedia, codes and also hyperlinks for best user experience..
                    </p>
                    </div>
                </div>
            </div>
            </div>
            <div className="subscribe-email-container">

            </div>
        </div>
    );

};

export default HomePage;
