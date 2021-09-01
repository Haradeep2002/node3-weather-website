const input = document.querySelector("input")
const button = document.querySelector("button")
const p = document.querySelector(".text")
button.addEventListener('click',() => {
    const val = input.value
    p.innerHTML = "<i>loading...</i>"
    fetch('http://localhost:3000/weather?address='+val).then( (response) => {
        response.json().then((data) => {
            if(data.error){
                p.innerHTML = "<b>Result:</b><br><br><i>"+data.error+".Try again!!</i>"
            }
            else{
                p.innerHTML = "<b>Result:</b><br><br><i>Entered data:</i> "+data.location + "<br><i>Forecast:</i> " +data.forecast +"<br><i>Address:</i> " +data.address
            }
        })
    })
    input.value = ""
})