import React from 'react'
import Link from 'next/link'
import PageTitle from '../components/PageTitle'

const Contato = () => {
    return (
        <div>
            <PageTitle title='Contato' />
            <div className="flex flex-col items-center justify-center">
                <h1 className="font-bold">Contato</h1>
                <div className='text-justify'>
                    <p>Nome: Teste da Silva Souza</p>
                    <p>Telefone: (11) 99999-9999</p>
                    <p>E-mail: teste@teste.com.br</p>
                </div>
            </div>
        </div>
    )
}

export default Contato