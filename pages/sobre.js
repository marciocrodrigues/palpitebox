import React from "react"
import Link from "next/link"
import PageTitle from "../components/PageTitle"

const Sobre = () => {
    return (
        <div className="flex flex-col items-center justify-center">
            <PageTitle title='Sobre' />
            <h1 className="font-bold">Sobre</h1>
            <p>Projeto criado no curso de fullstack da DevPleno</p>
        </div>
    )
}

export default Sobre