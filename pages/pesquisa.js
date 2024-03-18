import React, { useState } from 'react'
import PageTitle from '../components/PageTitle'

const Pesquisa = () => {
    const [form, setForm] = useState({
       Nome: '',
       Email: '',
       Whatsapp: '',
       Nota: 5
    })
    const notas = [1, 2, 3, 4 ,5]
    const [success, setSuccess] = useState(false)
    const [retorno, setRetorno] = useState({})
    const [errosForm, setErrosForm] = useState([{
        Campo: '',
        Erro: ''
    }])

    const onChange = evt => {
        const value = evt.target.value
        const key = evt.target.name

        setForm(old => ({
            ...old,
            [key]: value
        }))

        console.log(form)
    }

    const save = async () => {
        try {

            if (form.Nome === '' && errosForm.findIndex(erro => erro.Campo === 'Nome') < 0) {
                setErrosForm(old => [...old, { Campo: 'Nome', Erro: 'Obrigatorio' }])
            }
    
            if (form.Email === '' && errosForm.findIndex(erro => erro.Campo === 'Nome') < 0) {
                setErrosForm(old => [...old, { Campo: 'Email', Erro: 'Obrigatorio' }])
            }
    
            if (form.Whatsapp === '' && errosForm.findIndex(erro => erro.Campo === 'Whatsapp') < 0) {
                setErrosForm(old => [...old, { Campo: 'Whatsapp', Erro: 'Obrigatorio' }])
            }

            if (errosForm.length > 0) return

            const resp = await fetch('/api/save', {
                method: 'POST',
                body: JSON.stringify(form)
            })
            const data = await resp.json()
    
            if (data && data.showCupom) {
                setSuccess(true)
                setRetorno(data)
            }
        } catch (err) {
            console.log(err)
        }
    }

    const mostrarErro = (campo) => {
        const erro = errosForm.find(erro => erro.Campo === campo)

        if (erro) return true

        return false
    }

    const buscarErro = (campo) => {
        const erro = errosForm.find(erro => erro.Campo === campo)

        if (erro) return erro.Erro

        return ''
    }

    return (
        <div className='pt-6'>
            <PageTitle title='Pesquisa' />
            <h1 className='text-center font-bold my-4 text-2xl'>Críticas e sugestões</h1>
            <p className='text-center font-bold mb-6'>O restaurante X sempre busca por atender melhor seus clientes.<br /> 
                Por isso, estamos sempre abertos a ouvir a sua opinião.</p>

            { !success &&
                <div className='w-1/5 mx-auto'>
                <label className='font-bold'>Seu nome:</label>
                <input name='Nome' type="text" className='p-4 block shadow bg-blue-100 my-2 rounded w-full' placeholder='Nome' onChange={onChange} value={form.Nome}/>
                { mostrarErro('Nome') && <span className='block mb-4 text-red-600'>{buscarErro('Nome')}</span> }
                <label className='font-bold'>Seu E-mail:</label>
                <input name='Email' type="text" className='p-4 block shadow bg-blue-100 my-2 rounded w-full' placeholder='Email' onChange={onChange} value={form.Email}/>
                { mostrarErro('Email') && <span className='block mb-4 text-red-600'>{buscarErro('Email')}</span> }
                <label className='font-bold'>Seu Whatsapp:</label>
                <input name='Whatsapp' type="text" className='p-4 block shadow bg-blue-100 my-2 rounded w-full' placeholder='Whatsapp' onChange={onChange} value={form.Whatsapp}/>
                { mostrarErro('Whatsapp') && <span className='block mb-4 text-red-600'>{buscarErro('Whatsapp')}</span> }
                <label className='font-bold mt-6'>Nota:</label>
                <div className='flex w-full mb-6'>
                    { notas.map(nota => {
                        return (
                            <label className='w-1/6 text-center'>
                                {nota} <br />
                                <input type='radio' name='Nota' value={nota}  onChange={onChange}/>
                            </label>)
                    }) }
                </div>
                <button
                    className='bg-blue-400 px-6 py-4 font-bold rounded-lg shadow-lg hover:bg-blue-200 text-white w-full'
                    onClick={save}
                >
                    Salvar
                </button>
            </div> }
            { success && <div className='w-1/5 mx-auto'>
                <p className='mb-6 bg-blue-100 border-b border-blue-500 text-blue-700 px-4 py-3 text-center' role='alert'>Obrigado por contribuir com sua sugestão ou crítica</p>
                {
                    retorno.showCupom && <div className='text-center border p-4 mb-4'>
                        Seu cupom: <br />
                        <span className='font-bold text-2xl'>{retorno.Cupom}</span>
                    </div>
                }
                {
                    retorno.showCupom && <div className='text-center border p-4 mb-4'>
                        <span className='font-bold block mb-2'>{retorno.Promo}</span>
                        <br />
                        <span className='italic'>Tire um print ou foto desta tela e apresente ao garçom</span>
                    </div>
                }
            </div> }
        </div>
    )
}

export default Pesquisa