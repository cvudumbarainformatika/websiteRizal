import { date } from 'quasar'

const dateDbFormat = (val) => {
  return date.formatDate(val, 'YYYY-MM-DD')
}
const dateHuman = (val) => {
  return date.formatDate(val, 'DD-MMMM-YYYY')
}
const dateClock = (val) => {
  return date.formatDate(val, 'DD MMM YYYY, hh:mm')
}
const dateWeb = (val) => {
  return date.formatDate(val, 'DD MMMM YYYY')
}

export { dateDbFormat, dateHuman, dateClock, dateWeb }
