import { Api } from "../api/api"

class AdministrationRepository {
  public static loadAdministrationMenu = async (): Promise<string[]> => {
    const response: Response = await Api.post('/administration/loadMenu', {})

    const data = await response.json()

    return data['collections'] as string[]
  }

  public static loadAdministrationTableData = async (collection: string, index: number, rowsPerPage: number): Promise<any> => {
    const response: Response = await Api.post('/administration/loadTableData', {
      collection: collection,
      index: index,
      rowsPerPage: rowsPerPage
    })

    const data = await response.json()

    return {
      tableData: data['tableData'],
      allData: data['allData']
    }
  }

  public static loadAdministrationTableColumns = async (collection: string): Promise<string[]> => {
    const response: Response = await Api.post('/administration/loadTableColumns', {
      collection: collection
    })

    const data = await response.json()

    return data['columns']
  }
}

export { AdministrationRepository }

