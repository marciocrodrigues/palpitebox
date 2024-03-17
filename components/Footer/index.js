import React from "react"

const Footer = () => {
    return (
        <div className="bg-gray-700 p-4">
            <div className="container mx-auto text-center font-bold text-white">
                Projeto desenvolvido por: {' '}
                <a className="hover:underline" href="#">Marcio C Rodrigues</a> / {' '}
                <a className="hover:underline" href="#">Linkedin</a> / {' '}
                <a className="hover:underline" href="#">Github</a>
                <div className="mt-4">
                    <img className="inline h-20 p-4" src="/logo_semana_fsm.png" alt="" />
                    <img className="inline h-20 p-4" src="/logo_devpleno.png" alt="" />
                </div>
            </div>
        </div>
    )
}

export default Footer