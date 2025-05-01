import { formatDistanceToNow, isToday, isYesterday } from 'date-fns'
import { es } from 'date-fns/locale'

const formatedDate = (date) => {
  let timeAgoText = ''

  if (isToday(date)) {
    timeAgoText = formatDistanceToNow(date, {
      addSuffix: true,
      locale: es,
    })
  } else if (isYesterday(date)) {
    timeAgoText = 'Ayer'
  } else {
    timeAgoText = formatDistanceToNow(date, {
      addSuffix: true,
      locale: es,
    })
  }

  return timeAgoText
}

export default { formatedDate }
