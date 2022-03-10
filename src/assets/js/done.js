import React, { Component } from 'react';
import congrats from '../png/congrats.png';
import '../main.css';

export default class Done extends Component {
  render() {
    return (<div>
        <div class="absolute w-screen h-screen bg-black opacity-20 blur-sm z-0 successBlur"></div>
            <div class="flex w-screen h-screen align-middle justify-center items-center z-0 ">
                <div class="bg-zinc-800 rounded-xl p-2 py-12 w-4/6 lg:w-2/6 flex-column successMessage">
                    <center>
                    <img src={congrats} alt="Done" class="w-2/5"/>
        
                  
                    <h2 class="text-white text-[18px] font-semibold pt-3">You are now on the VIP list! 🎉</h2>
                    <h3 class="text-gray-300 text-[10px] font-semibold pt-2">Don't forget to follow us on Twitter <span class="text-orange-400 font-bold">@frikax</span></h3>
                    </center>
                </div>
            </div>
        
    </div>);
  }
}
