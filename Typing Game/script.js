const RANDOM_QUOTE_API_URL = 'http://api.quotable.io/random'
const quoteDisplayElement = document.getElementById('quoteDisplay')
const quoteInputElement = document.getElementById('quoteInput')
const minuteElement = document.getElementById('minutes')
const secondElement = document.getElementById('seconds')

quoteInputElement.addEventListener('input', () => {
  const arrayQuote = quoteDisplayElement.querySelectorAll('span')
  const arrayValue = quoteInputElement.value.split('')

  let correct = true
  arrayQuote.forEach((characterSpan, index) => {
    const character = arrayValue[index]
    if (character == null) {
      characterSpan.classList.remove('correct')
      characterSpan.classList.remove('incorrect')
      correct = false
    } else if (character === characterSpan.innerText) {
      characterSpan.classList.add('correct')
      characterSpan.classList.remove('incorrect')
    } else {
      characterSpan.classList.remove('correct')
      characterSpan.classList.add('incorrect')
      correct = false
    }
  })

  if (correct) renderNewQuote()
})

function getRandomQuote() {
  return fetch(RANDOM_QUOTE_API_URL)
    .then(response => response.json())
    .then(data => data.content)
}

async function renderNewQuote() {
  const quote = await getRandomQuote()
  quoteDisplayElement.innerHTML = ''
  quote.split('').forEach(character => {
    const characterSpan = document.createElement('span')
    characterSpan.innerText = character
    quoteDisplayElement.appendChild(characterSpan)
  })
  quoteInputElement.value = null;
  startTimer();
}

let startTime;
function startTimer() {
  minuteElement.innerText = 0
  secondElement.innerText = 0
  startTime = new Date()
  setInterval(function() {
    totalsecond = Math.floor((new Date() - startTime)/1000);
    // math
    let hour = Math.floor(totalsecond/3600);
    let minutes = Math.floor((totalsecond - hour*3600)/60);
    let seconds = totalsecond - (hour * 3600 + minutes * 60);
    minuteElement.innerText = minutes
    secondElement.innerText = seconds

  }, 1000);
}

renderNewQuote()