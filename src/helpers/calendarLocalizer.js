import { format, parse, startOfWeek, getDay } from 'date-fns'
import esES from 'date-fns/locale/es'
import { dateFnsLocalizer } from 'react-big-calendar'
import { registerLocale } from 'react-datepicker'

registerLocale('es', esES)

const locales = {
  es: esES,
}

export const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales,
})
