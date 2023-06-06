import React from "react";
import { Link } from "react-router-dom";
import "../../styles/home.css";
import { Navbar } from "../component/navbar.js";


export const Home = () => {


	return (
		<React.Fragment>
			
			<Navbar />
			<div className="container-fluid d-flex" id="container">
				<div className="w3-sidebar w3-light-grey w3-bar-block" id="side-bar">

					<div className="row">
						<div className="col mt-5 text-center">
							<img className="logo"  src={"https://res.cloudinary.com/dcgc2tppo/image/upload/v1685178940/logoweb_np1qti.png"}></img>
						</div>
					</div>
					<div className="row">
						<div className="col mt-5 mb-2">
							<h3  className="titulo-side-bar text-center mt-5">- ¿Qué es Jobs Hood? -</h3>
							<p  className="texto-side-bar m-5">Jobs Hood es una página web que se enfoca en proporcionar opiniones y reseñas de empresas, con el objetivo de ayudar a los usuarios a tomar decisiones informadas sobre dónde trabajar y en que condiciones.<br></br>
							<br></br>
							Además, Jobs Hood ofrece una función de contacto con abogados para ayudar a los usuarios a obtener asesoramiento legal en caso de necesitarlo.</p>
						</div>
					</div>
				</div>
				<div className="menu">
					<div className="row my-5">
						<div className="col">
							<div className=" cartas-home card mb-3">
								<div className="row g-0">
									<div className="col-md-4">
										<img src="https://res.cloudinary.com/dcgc2tppo/image/upload/v1685537829/istockphoto-1358416956-612x612_deqwra.jpg" className="img-fluid rounded-start" alt="..." />
									</div>
									<div className="col-md-8">
										<div className="card-body">
											<h5 className=" titulo-cards-home card-title">Empresas</h5>
											<p className="texto-carta card-text my-3" >La página web cuenta con una amplia variedad de empresas registradas, desde pequeñas empresas locales hasta grandes corporaciones.</p>

											<Link to="/companies">
												<button type="button" className="btn btn-success btn-sm"> Más Información</button>
											</Link>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
					<div className="row my-5">
						<div className="col">
							<div className="cartas-home card mb-3">
								<div className="row g-0">
									<div className="col-md-4">
										<img src="https://res.cloudinary.com/dcgc2tppo/image/upload/v1685537659/istockphoto-1448686771-612x612_xgdwex.jpg" className="img-fluid rounded-start" alt="..." />
									</div>
									<div className="col-md-8">
										<div className="card-body">
											<h5 className="titulo-cards-home card-title">Abogados</h5>
											<p className="texto-carta card-text my-3 "> Conéctate con abogados especializados en tu área de interés, podrás consultar cualquier problema legal que pueda surgirte.</p>

											<Link to="/lawyers">
												<button type="button" className="btn btn-success btn-sm">Más Información</button>
											</Link>

										</div>
									</div>
								</div>
							</div>
						</div>
					</div>

				</div>
			</div>
			
		</React.Fragment>
	);
};
