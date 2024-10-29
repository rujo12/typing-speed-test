const RANDOM_QUOTE_API_URL = 'http://api.quotable.io/random'
const quotedisplayelement  = document.getElementById("quoteDisplay")
const quotevalueinput= document.getElementById("quoteInput")
const timerelement= document.getElementById("timer")


quotevalueinput.addEventListener('input', () => {
  const arrayQuote = quotedisplayelement.querySelectorAll('span')
  const arrayValue = quotevalueinput.value.split('')
  
  if (!timerStarted && arrayValue.length > 0) {
    starttimer()
    timerStarted = true
  }

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
    if (correct && arrayQuote.length === arrayValue.length) {
      clearInterval(Intervalvalid)
      renderNewQuote()
      timerStarted = false 
    }
  })

})
function getRandomQuote() {
    return fetch(RANDOM_QUOTE_API_URL)
      .then(response => response.json())
      .then(data => data.content)

  }
  async function renderNewQuote() {
    const quote = await getRandomQuote()
    quotedisplayelement.innerHTML = ''
    quote.split('').forEach(character => {
      const characterSpan = document.createElement('span')
      characterSpan.innerText = character
      quotedisplayelement.appendChild(characterSpan)
    })
    quotevalueinput.value=null
    timerelement.innerText = 0
  timerStarted = false  
   

}


let startTime
function starttimer(){
  timerelement.innerText=0
  startTime =new Date()
  Intervalvalid=setInterval(() =>{
    
timerelement.innerText=gettimertime()
  },1000)
}
function gettimertime(){
  return Math.floor((new Date()-startTime)/1000)
}

renderNewQuote()



