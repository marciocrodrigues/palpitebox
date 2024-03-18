import { docConfig } from "../../google-sheet-config/google-sheet-config"

export default async(req, res) => {
    const doc = await docConfig()

    const sheet = await doc.sheetsByIndex[2]
    await sheet.loadCells('A3:B3')
    const mostrarPromocaoCell = sheet.getCell(2, 0)
    const textoCell = sheet.getCell(2, 1)

    res.end(JSON.stringify({
        showCoupon: mostrarPromocaoCell.value === 'VERDADEIRO',
        message: textoCell.value
    }))        
}