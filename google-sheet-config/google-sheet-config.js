import { GoogleSpreadsheet } from 'google-spreadsheet'
import credentials from './credentials.json'

const doc = new GoogleSpreadsheet('16Ef3lPhr2ZNVbbj8j0DtzuC6guIEk_nrV7QHuyn6O9Q')

export const docConfig = async () => {
    await doc.useServiceAccountAuth(credentials)
    await doc.loadInfo()

    return doc
}