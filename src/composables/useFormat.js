export function useFormat() {
  function formatDate(dateString) {
    const date = new Date(dateString)

    if (isNaN(date)) {
      return 'Invalid Date'
    }

    const day = String(date.getDate()).padStart(2, '0')
    const month = String(date.getMonth() + 1).padStart(2, '0')
    const year = date.getFullYear()
    return `${day}.${month}.${year}`
  }
  function getBodyStart(inputString) {
    const trimmedString = inputString.trimStart()

    return trimmedString.slice(0, 9)
  }

  return { formatDate, getBodyStart }
}
