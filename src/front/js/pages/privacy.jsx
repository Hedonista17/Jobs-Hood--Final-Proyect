import React from "react";
import { HiArrowUpTray } from 'react-icons/hi2';
import "../../styles/privacy.css";
import {Navbar} from "../component/navbar.js";

const Privacy = () => {

    return (
        <>
        <div className="content">
            <Navbar/>
            <h1 className="text-center">Política de privacidad</h1>
            <div className="apartado">
                JobsHood, (en adelante, Responsable), es el responsable del tratamiento de los datos personales del Usuario y le informa que estos datos serán tratados de conformidad con lo dispuesto en <span className="ley">el Reglamento (UE) 2016/679 de 27 de abril (GDPR) y la Ley Orgánica 3/2018 de 5 de diciembre (LOPDGDD)</span>, por lo que se le facilita la siguiente información del tratamiento:
                
                los datos personales recabados por JobsHood mediante los formularios extendidos en sus páginas quedarán incorporados y serán tratados en nuestros ficheros con el fin de poder facilitar, agilizar y cumplir los compromisos establecidos entre JobsHood y el usuario o el mantenimiento de la relación que se establezca en los formularios que este rellene, o para atender una solicitud o consulta del mismo. Asimismo, de conformidad con lo previsto en el RGPD y la LOPD-GDD, salvo que sea de aplicación la excepción prevista en el artículo 30.5 del RGPD, se mantiene un registro de actividades de tratamiento que especifica, según sus finalidades, las actividades de tratamiento llevadas a cabo y las demás circunstancias establecidas en el RGPD.
            </div>
            <div className="apartado">
                <h3>Base legal para el tratamiento de los datos personales </h3>
                <p>La base legal para el tratamiento de los datos personales es el consentimiento. JobsHood se compromete a recabar el consentimiento expreso y verificable del usuario para el tratamiento de sus datos personales para uno o varios fines específicos.
                En las ocasiones en las que el usuario deba o pueda facilitar sus datos a través de formularios para realizar consultas, solicitar información o por motivos relacionados con el contenido del sitio web, se le informará en caso de que la cumplimentación de alguno de ellos sea obligatoria debido a que los mismos sean imprescindibles para el correcto desarrollo de la operación realizada.</p>
            </div>
            <div className="apartado">
                <h3>Bases jurídicas del tratamiento </h3>
                <ul>
                    <li>El Usuario ha dado su consentimiento.</li>
                    <li>Para respetar una obligación contractual con el Usuario.</li>
                    <li>Para cumplir las obligaciones legales.</li>
                    <li>Para cumplir la obligación legal a la que JobsHood está sujeto para con las reglas de la Internet Corporation for Assigned Names and Numbers ("ICANN"): <a href="https://www.icann.org/resources/pages/approved-with-specs-2013-09-17-en">https://www.icann.org/resources/pages/approved-with-specs-2013-09-17-en</a></li>
                </ul>
            </div>
            <div className="apartado">
                <h3>Derechos que asisten al Usuario</h3>

                <ul>
                    <li>Derecho a retirar el consentimiento en cualquier momento.</li>
                    <li>Derecho de acceso, rectificación, portabilidad y supresión de sus datos y a la limitación u oposición al su tratamiento.</li>
                    <li>Derecho a presentar una reclamación ante la autoridad de control (www.aepd.es) si considera que el tratamiento no se ajusta a la normativa vigente.</li>
                </ul>
            </div>
            <div className="apartado">
                <h3>Datos de contacto para ejercer sus derechos</h3>
                <p>Puede ejercer los derechos expuestos, mediante escrito, enviando un correo electrónico a ayuda@jobshood.es, o una carta a la dirección: JobsHood, S.L. Calle Pepe Pepito (Madrid) acompañando una copia de un documento legal que lo identifique.</p>
            </div>
            <div className="apartado">
                <h3>Criterios de conservación de los datos</h3>
                <p>Se conservarán durante no más tiempo del necesario para mantener el fin del tratamiento y cuando ya no sea necesario para tal fin, se suprimirán con medidas de seguridad adecuadas para garantizar la seudonimización de los datos o la destrucción total de los mismos.
                En cumplimiento de las disposiciones de la Ley 25/2007, de 18 de octubre, de conservación de datos relativos a las comunicaciones electrónicas y a las redes públicas de comunicaciones, JobsHood deberá de retener determinados datos generados o tratados por los mismos, con el fin de posibilitar que dispongan de ellos los agentes facultados.
                </p>
            </div>
            <div className="scroll-container">
                <a href="#top"><HiArrowUpTray/></a>
            </div>
        </div>
        </>
    )
};

export default Privacy;