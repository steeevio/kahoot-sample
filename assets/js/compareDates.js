export default function compareDates () {
  const result = document.getElementById('result')
  const dob = '29/09/1983'
  const msDay = (1000 * 3600 * 24)
  let dobTense = 'past'

  // format dob for date object
  const dobArray = dob.split('/')
  const dobMonth = dobArray[1] - 1
  const dobDate = new Date(dobArray[2], dobMonth, dobArray[0])

  const dateNow = new Date()

  // get both dates as time strings in ms
  const dateNowTime = dateNow.getTime()
  const dobDateTime = dobDate.getTime()

  // calculate days differnce using ms per day
  const difference = dateNowTime - dobDateTime
  let daysDifference = difference / msDay
  daysDifference = Math.round(daysDifference)

  if (dobDateTime > dateNowTime) {
    dobTense = 'future'
  }

  // calculate next birthday
  // has this day past this year?
  const birthdayDay = dobDate.getDate()
  const birthdayMonth = dobDate.getMonth()
  const currentDay = dateNow.getDate()
  const currentMonth = dateNow.getMonth()
  const currentYear = dateNow.getFullYear()

  // birthday is next year if month has already past or it's the same month but the day has past
  // if it's today its still this year
  let nextBirthdayYear = currentYear
  if ((currentMonth > birthdayMonth) || (birthdayMonth === currentMonth && currentDay > birthdayDay)) {
    nextBirthdayYear = currentYear + 1
  }

  // get next birthday as a string and calculate the difference
  const nextBirthdayTime = new Date(nextBirthdayYear, birthdayMonth, birthdayDay).getTime()
  const birthdayDifference = nextBirthdayTime - dateNowTime
  let daysBirthdayDifference = birthdayDifference / msDay
  daysBirthdayDifference = Math.round(daysBirthdayDifference)

  const output = `Born ${daysDifference} days in the ${dobTense}, Next birthday: ${daysBirthdayDifference} days in the future`
  const text = document.createTextNode(output)
  result.appendChild(text)
}
