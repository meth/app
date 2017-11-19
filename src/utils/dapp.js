import { parse } from 'url'

export const createDappId = ({ url }) => parse(url).host
