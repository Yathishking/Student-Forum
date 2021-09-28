import React from 'react';
import {Link} from 'react-router-dom';
import TwitterIcon from '@material-ui/icons/Twitter';
import FacebookIcon from '@material-ui/icons/Facebook';
import InstagramIcon from '@material-ui/icons/Instagram';
import HelpIcon from '@material-ui/icons/Help';
import QuestionAnswerIcon from '@material-ui/icons/QuestionAnswer';



const Footer = () => {
    const appSocialMediaLinks = [
        {'name': 'Twitter', 'url': 'https://twitter.com/REVAUniversity?ref_src=twsrc%5Egoogle%7Ctwcamp%5Eserp%7Ctwgr%5Eauthor', 'icon': <TwitterIcon/>},
        {'name': 'Facebook', 'url': 'https://www.facebook.com/REVAUniversity/', 'icon': <FacebookIcon/>},
        {'name': 'Instagram', 'url': 'https://www.instagram.com/reva_university/?hl=en', 'icon': <InstagramIcon />}
    ] 

    const FAQ_HELP = [
        {'name': 'FAQ', 'url': '/forum/soon', 'icon': <QuestionAnswerIcon />},
        {'name': 'Help', 'url': '/forum/soon', 'icon': <HelpIcon /> },
    ]
    return(
        <React.Fragment>
            <footer>
                <div className="app-footer-links">
                    <div className="app-socialMedia-links">
                        <ul>
                            {appSocialMediaLinks.map((smlink, index)=>{
                                return(
                                    <li key={index}>
                                        <a href={smlink.url} title={smlink.name}><span>{smlink.icon}</span>&nbsp;&nbsp;{smlink.name}</a>
                                    </li>
                                );
                            })}
                        </ul>
                    </div>
                    <div className="app-faqhelp">
                        <ul>
                            {FAQ_HELP.map((fhlink, index)=>{
                                return(
                                    <li key={index}>
                                        <Link to={fhlink.url} title={fhlink.name}><span>{fhlink.icon}</span>&nbsp;&nbsp;{fhlink.name}</Link>    
                                    </li> 
                                );
                            })}
                        </ul>
                    </div>
                </div>
                <div className="app-copyright-declaration">
                        <h5>&copy;All rights reserved; 2019-2023.</h5>
                        <p>Powered by KID2KING.</p>
                </div>
            </footer>
        </React.Fragment>
    );
};

export default Footer;