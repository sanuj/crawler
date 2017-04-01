import axios from 'axios'

import logger from '../logger'

axios.interceptors.request.use(config => {
  logger.info(`${config.method} ${config.url}`)

  return config
})

if (process.env.NODE_ENV !== 'production') {
  axios.interceptors.response.use(response => {
    return response
  }, error => {
    logger.error(error)

    return error
  })
}
