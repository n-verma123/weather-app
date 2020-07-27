//console.log("Client Side JScript loaded")

// fetch("http://puzzle.mead.io/puzzle").then((response) => {
//     response.json().then((data) => {
//         console.log(data)
//     })
// })

const addressForm=document.querySelector('form')

const search = document.querySelector('input')

const msg1 = document.querySelector('#msg1')
const msg2 = document.querySelector('#msg2')


addressForm.addEventListener('submit',(e)=>{
    e.preventDefault()
    msg1.textContent="Loading...."
    msg2.textContent=""
    const location = search.value
    console.log('Input Value : '+location)
    fetch("/weather?address='"+location+"'").then((response) =>{
        response.json().then((data) =>{
            if (data.error) msg1.textContent=data.error
            else{
                msg1.textContent=data.location
                let val1 = "Weather is "+data.weather+". It is currently "+data.temperature+" degree out & It feel likes "+data.feeltemp+
                      " degrees. Rain Forecase is "+data.rain+"% and humidity is "+data.humidity+"%"

                      //" Today temprature would be between "+data.mintemp+" - "+data.maxtemp
                
                console.log(data)
                msg2.textContent=val1
            } 

        })
    })
})