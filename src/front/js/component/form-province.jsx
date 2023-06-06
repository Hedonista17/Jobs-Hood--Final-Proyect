import React from "react";

export const provincias = ['Álava', 'Albacete', 'Alicante', 'Almería', 'Asturias', 'Avila', 'Badajoz', 'Barcelona', 'Burgos', 'Cáceres',
    'Cádiz', 'Cantabria', 'Castellón', 'Ciudad Real', 'Córdoba', 'La Coruña', 'Cuenca', 'Gerona', 'Granada', 'Guadalajara',
    'Guipúzcoa', 'Huelva', 'Huesca', 'Islas Baleares', 'Jaén', 'León', 'Lérida', 'Lugo', 'Madrid', 'Málaga', 'Murcia', 'Navarra',
    'Orense', 'Palencia', 'Las Palmas', 'Pontevedra', 'La Rioja', 'Salamanca', 'Segovia', 'Sevilla', 'Soria', 'Tarragona',
    'Santa Cruz de Tenerife', 'Teruel', 'Toledo', 'Valencia', 'Valladolid', 'Vizcaya', 'Zamora', 'Zaragoza']

export const Province = (props) => {

    return (
        <>
            <div className="row">
                <div className="col">
                    <select value={props.value}  name ={props.name} className="form-control" onChange ={props.handleChange} >
                        <option value="" disabled selected>
                            Seleccione una provincia
                        </option>
                        {provincias.map((provincia,index) => (
                            <option key={index} value={provincia}>
                                {provincia}
                            </option>
                        ))}
                    </select>

            </div>
        </div >
        </>
    )
}