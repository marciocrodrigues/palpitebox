import moment from "moment"
import { docConfig } from "../../google-sheet-config/google-sheet-config"

const genCupom = () => {
    const code = parseInt(moment().format('YYMMDDHHMMSSSSS')).toString(16).toUpperCase() //Gera o cupom usando a data e passando para hexadecimal
    return `${code.substring(0, code.length - 8)}-${code.substring(4, code.length - 4)}-${code.substring(8, code.length)}` // Cupom separado em grupo de 4 caracteres
}

export default async(req, res) => {

    const data = JSON.parse(req.body)

    try {
        const doc = await docConfig()

        const sheetConfig = await doc.sheetsByIndex[2]
        await sheetConfig.loadCells('A3:B3')

        const mostrarPromocaoCell = sheetConfig.getCell(2, 0)
        const textoCell = sheetConfig.getCell(2, 1)

        let Cupom = ''
        let Promo = ''

        if (mostrarPromocaoCell.value === 'VERDADEIRO') {
            Cupom = genCupom()
            Promo = textoCell.value
        }

        const sheet = doc.sheetsByIndex[1]
        await sheet.addRow({
            Nome: data.Nome,
            Email: data.Email,
            Whatsapp: data.Whatsapp,
            Nota: data.Nota,
            'Data Preenchimento': moment().format('DD/MM/YYYY HH:MM:SS'),
            Cupom,
            Promo
        })
        res.end(JSON.stringify({
            showCupom: Cupom !== '',
            Cupom,
            Promo
        }))
    } catch (error) {
        console.log(error)
        res.end(error)
    }
}