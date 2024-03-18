import { GoogleSpreadsheet } from 'google-spreadsheet'

const doc = new GoogleSpreadsheet(process.env.SHEET_DOC_ID)

export const docConfig = async () => {
    await doc.useServiceAccountAuth({
        client_email: process.env.SHEET_CLIENT_EMAIL,
        private_key: process.env.SHEET_PRIVATE_KEY,
    })
    await doc.loadInfo()

    return doc
}