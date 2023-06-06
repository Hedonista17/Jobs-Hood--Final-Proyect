import React from "react";
import { FaFacebookF } from "react-icons/fa";
import { FaTwitter } from "react-icons/fa"; /* Para tener acceso a React-icons ejecutamos "npm install react-icons --save" */
import { FaLinkedin } from "react-icons/fa";
import { FaGithub } from "react-icons/fa";
import {Link} from "react-router-dom";
import "../../styles/footer.css";



export const Footer = () => (
	
<footer className="sticky-bottom">
		<div className="d-flex pt-4 pb-4 footer_body">
			<div className="social">
				<div className="icon-circle text-center d-flex gap-3">
					<a href="#"><FaFacebookF className="ico facebook"/></a>
					<a href="#"><FaTwitter className="ico twitter"/></a>
					<a href="#"><FaLinkedin className="ico linkedin"/></a>
					<a target="_blank" href="https://github.com/Apacheco82/Jobs-Hood"><FaGithub className="ico github"/></a>
				</div>				
			</div>

			<div className="priv_contact">
				<div className="privacy">
					<Link to="/privacy">
						<h6>Política de privacidad</h6> 
					</Link>
				</div>

				<div className="contact">
					<Link to="/contact">
						<h6>Contacto</h6>  
					</Link>
				</div>
			</div>
		</div>
</footer>

	
);
