import React, { Component } from 'react'
import LoadScreen from './loadScreen.js'
import congrats from '../png/congrats.png';
import '../main.css'

setTimeout(() => {
    var loaderDiv = document.getElementById('loaderDiv')
    loaderDiv.classList.add('animateLoadScreen')
}, 1500)


export default class Form extends Component {

    constructor(props) {
        super(props)
        this.state = {email: ''}
    
        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
      }
    
      handleChange(event) {
        this.setState({email: event.target.value})
      }
     

      async validate (errorDiv, inputField, submitBtn) {
          
        if(this.state.email === ''){
       
            errorDiv.innerText = 'You need to enter an email address! 😏'
            inputField.style.border = '1.5px solid red'
            submitBtn.classList.add('hover:blur-[1.5px]')
            submitBtn.disabled = true

            setTimeout(() => {errorDiv.innerText = '' 
            inputField.style.border = 'none'
            submitBtn.classList.remove('hover:blur-[1.5px]')
            
            submitBtn.disabled = false

            }, 1400)
        } else {
            var _email = this.state.email.toLowerCase()
            var _realEmail = String(_email)
            const _valid = /^(([^<>()[\]\\.,:\s@"]+(\.[^<>()[\]\\.,:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

            if(_valid.test(_realEmail) !== true){
                errorDiv.innerText = 'That is not a VALID email address! 🤕'
                setTimeout(() => errorDiv.innerText = '', 3500)
            }
            else {
                submitBtn.disabled = true
                submitBtn.classList.add('hover:blur-[1.5px]')
                submitBtn.innerText = 'Loading...'
                var emailJson = _email.trim()
                const response = await fetch(`https://frikax-waitlist-api.herokuapp.com/user/add`, {
                    method: 'POST',
                    mode: 'cors',
                    headers: {
                      'Content-Type': 'application/json'        
                    },
                    body: JSON.stringify({ email: emailJson})
                })
                
                  if(response.status !== 201){
                    errorDiv.innerText = 'Oops! eMail is already on the list 😬'
                    inputField.style.border = '1.5px solid red'   
                    submitBtn.innerText = 'Join Waitlist'                 
        
                    setTimeout(() => {errorDiv.innerText = '' 
                    inputField.style.border = 'none'
                    submitBtn.classList.remove('hover:blur-[1.5px]')
                    submitBtn.disabled = false
                    }, 1600)
                  } else {
                    var mainBody = document.getElementById('mainBody')
                    var successMsg = document.getElementById('successMsg')

                    successMsg.classList.remove('opacity-0')
                    successMsg.classList.add('successMessage')
                    mainBody.classList.add('mainBody')
                    

                    setTimeout(() => {
                        successMsg.classList.remove('successMessage')
                        successMsg.classList.add('successMessage__Out')
                    }, 5000)
                    setTimeout(() => {
                        mainBody.classList.remove('mainBody')
                        mainBody.classList.add('mainBody__Out')
                        
                    }, 5400)
                        successMsg.classList.remove('successMessage__Out')
                        successMsg.classList.add('opacity-0')
                        mainBody.classList.remove('mainBody__Out')
                        submitBtn.innerText = 'Join Waitlist'
                        submitBtn.disabled = false
                  }
                
            }
        }
      }

      handleSubmit(event) {
        event.preventDefault()

        const errorDiv = document.getElementById('errorDiv')
        const inputField = document.getElementById('inputField')
        const submitBtn = document.getElementById('submitBtn')

        this.validate(errorDiv, inputField, submitBtn)

      }
      
    render() {
    return(
        <div className="lg:w-5/6 mx-auto">
        <LoadScreen />


            <div className="absolute flex w-screen h-screen align-middle justify-center items-center z-0 opacity-0 " id="successMsg">
                <div className="bg-zinc-800 rounded-xl p-2 py-16 w-5/6 lg:w-2/6 flex-column" >
                    <center>
                    <img src={congrats} alt="Done" className="w-2/5"/>
        
                  
                    <h2 className="text-white text-[18px] font-semibold pt-3">You are now on the VIP list! 🎉</h2>
                    <h3 className="text-gray-300 text-[9px] font-normal pt-2">Don't forget to follow us on Twitter <span className="text-orange-400 font-bold">@frikax</span></h3>
                    </center>
                </div>
            </div>


        <div className="z-[-1] box-border" id="mainBody">

<div className="flex flex-row h-16 justify-between items-center mt-7 p-5">
<div className="flex items-center logoHeader" id="logoHeader">
    <img src="/assets/png/logo.png" className="h-6" alt="logo"/>
    <div className="text-white font-semibold text-xl ml-1">Frikax</div>
</div>

<div className="p-1 mr-2 twitterHeader">
<a href="https://twitter.com/frikax" title="Follow us on Twitter" target="_blank" rel="noreferrer"><i className="fa fa-twitter text-orange-500 bg-orange-900 py-1 px-2.5 rounded-lg text-lg hover:bg-orange-200"></i></a>
</div>
</div>

    <center>
<div className="text-white md:columns-2 columns-1 p-4 sm:mt-8 mx-5 md:mt-16 md:mx-7 mt-9 align-middle text-left lg:px-9"> 

    <div className="col-span-1 md:mt-20 xl:mr-28">
        <p className="text-sm text-zinc-200 font-medium mb-1 leading-5 welcome">Welcome Geek! &#128526;</p>

            <h1 className="mb-4 xl:text-5xl 2xl:text-6xl text-4xl md:font-semibold font-semibold formHead">By <span className="text-orange-500">Techies</span>, For <span className="text-orange-500">Techies</span></h1>
        
        <p className="text-xs text-zinc-200 font-medium mt-0 intro leading-5">Discover new things, meet other Techies and be discovered by employers and other Techies. <span className="text-orange-500">Join the waitlist</span> if you want to be one of the first people to know when we're live!</p>

        <form onSubmit={this.handleSubmit} className="formDiv" id="formDiv">

            <input name="email" type="email" value={this.state.email} onChange={this.handleChange} className="block text-zinc-400 focus:outline-none sm:inline p-3 md:p-5 px-4 bg-zinc-800 mt-6 md:mt-4 rounded-lg w-full lg:w-2/4 font-medium text-sm md:w-3/5 text-center lg:text-left mb-1 md:mb-0 focus:bg-zinc-800" placeholder="Enter email address..." id="inputField"/>
            
            <button type="submit" id="submitBtn" className="inline lg:mx-3 focus:outline-none bg-orange-500 mt-2 text-sm text-white p-3 md:p-5 px-6 font-medium rounded-lg w-full md:w-auto lg:hover:bg-white lg:hover:text-orange-500 ">Join Waitlist</button>
            
            <div className="text-red-500 font-normal lg:text-sm text-[12px] p-2 mt-2" id="errorDiv"></div>
        </form>
     
    </div>
   
    <div className="col-span-1 xl:ml-28">
        <div className='absolute circle hidden'></div>
        <img src="assets/png/wait-list-img.png" className="imgHead w-full lg:float-right"  alt="mockup"/>
        
    </div>
</div>

<div className='star2 hidden lg:inline-block'></div><div className='star hidden lg:inline-block'></div>
   </center>
   </div>

   </div>
   )
  }
}