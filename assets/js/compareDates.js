export default function compareDates () {
  let dobTense = 'past'
  const result = document.getElementById('result')
  const dob = '29/09/1983'
  const msDay = (1000 * 3600 * 24)

  const dobArray = dob.split('/')
  const dobMonth = dobArray[1] - 1
  const dobDate = new Date(dobArray[2], dobMonth, dobArray[0])
  const dobDateTime = dobDate.getTime()

  const dateNow = new Date()
  const dateNowTime = dateNow.getTime()

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

  let nextBirthdayYear = currentYear
  if (currentMonth > birthdayMonth) {
    nextBirthdayYear = currentYear + 1
  } else if (birthdayMonth === currentMonth && currentDay > birthdayDay) {
    nextBirthdayYear = currentYear
  }

  const nextBirthdayTime = new Date(nextBirthdayYear, birthdayMonth, birthdayDay).getTime()

  const birthdayDifference = nextBirthdayTime - dateNowTime
  let daysBirthdayDifference = birthdayDifference / msDay
  daysBirthdayDifference = Math.round(daysBirthdayDifference)

  const output = `Born ${daysDifference} days in the ${dobTense}, Next birthday: ${daysBirthdayDifference} days in the future`
  const text = document.createTextNode(output)
  result.appendChild(text)
}
