import http from 'axios'
import { default as AmazonAsinPage, BASE } from './asin-page'

export const fetch = async (asin) => {
  const url = `${BASE}/dp/${asin}`
  const {data} = await http.get(url)

  return new AmazonAsinPage(data).buyBox
}
