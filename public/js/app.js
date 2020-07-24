console.log("Client Side JScript loaded")

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
    fetch("http://localhost:3000/weather?address='"+location+"'").then((response) =>{
        response.json().then((data) =>{
            if (data.error) msg1.textContent=data.error
            else{
                msg1.textContent=data.location
                let val1 = "Temperature outside is "+data.temperature+" & It feel likes "+data.feeltemp+" degrees"+
                      " degrees out. Rain Forecase is "+data.temperature+"% "+
                      "Weather is "+data.weather
                msg2.textContent=val1
            } 

        })
    })
})