import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { BackendURL } from "./component/backendURL";
import { Home } from "./pages/home.jsx";
import injectContext from "./store/appContext";
import { Footer } from "./component/footer";
import { RegistroWorker } from "./pages/form-register-worker.jsx";
import { RegistroLawyer } from "./pages/form-register-lawyer.jsx"
import { Login } from "./pages/login-users.jsx";
import { Profile } from "./pages/profile-worker.jsx";
import { RegisterCompany } from "./pages/form-register-company.jsx";
import { CompanyProfile } from "./pages/company-profile.jsx";
import { LawyerProfile } from "./pages/lawyer-profile.jsx";
import { AllLawyers } from "./pages/all-lawyers.jsx";
import { AllCompanies } from "./pages/all-companies.jsx";
import { Register } from "./pages/register.jsx";
import { EditProfileLawyer} from "./pages/edit-profile-lawyer.jsx"
import { EditProfileCompany} from "./pages/edit-profile-company.jsx"
import { EditProfileWorker} from "./pages/edit-profile-worker.jsx"
import ContactUs from "./pages/contactUs.jsx";
import Privacy from "./pages/privacy.jsx";


const Layout = () => {
    //the basename is used when your project is published in a subdirectory and not in the root of the domain
    // you can set the basename on the .env file located at the root of this project, E.g: BASENAME=/react-hello-webapp/
    const basename = process.env.BASENAME || "";

    if(!process.env.BACKEND_URL || process.env.BACKEND_URL == "") return <BackendURL/ >;

    return (
        <div>
            <BrowserRouter basename={basename}>           
                  
                    <Routes>
                        <Route element={<Home/>} path="/" />    
                        <Route element={<Profile />} path="/worker/profile" />   
                        <Route element={<Profile />} path="/worker/:id" />                    
                        <Route element={<CompanyProfile />} path="/company/:id" /> 
                        <Route element={<CompanyProfile />} path="/company/profile" />
                        <Route element={<AllCompanies />} path="/companies" />
                        <Route element={<LawyerProfile />} path="/lawyer/:id" /> 
                        <Route element={<LawyerProfile />} path="/lawyer/profile" />
                        <Route element={<AllLawyers />} path="/lawyers" />
                        <Route element={<Register/>} path="/register" />
                        <Route element={<RegistroWorker />} path="/register/worker" />
                        <Route element={<RegisterCompany />} path="/register/company" />
                        <Route element={<RegistroLawyer />} path="/register/lawyer" />
                        <Route element={<Login />} path="/login" />
                        <Route element={<EditProfileLawyer />} path="/edit/profile-lawyer" />
                        <Route element={<EditProfileCompany />} path="/edit/profile-company" />
                        <Route element={<EditProfileWorker />} path="/edit/profile-worker" />
                        <Route element={<ContactUs />} path="/contact" />
                        <Route element={<Privacy />} path="/privacy" />
                        <Route element={<h1>Not found!</h1>} />
                    </Routes>
                    <Footer />
                    
            </BrowserRouter>
        </div>
    );
};

export default injectContext(Layout);
