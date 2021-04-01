import React, { Component } from 'react';
import Web3 from 'web3'
import './App.css';
import ad from '../capsulead.png'
import gif from '../fasterr.gif'
import anim from '../ideaanim.gif'
import logo from '../logo.png'
import logosm from '../logosm.png'
import Color from '../abis/capsulecorp.json'
import images from '../components/images'




 function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}








class App extends Component {

//add for images
//style={{ backgroundImage: `url(${logosm})` }}


  async componentWillMount() {
    await this.loadWeb3()
    await this.loadBlockchainData()
  }

  async loadWeb3() {
    if (window.ethereum) {
      window.web3 = new Web3(window.ethereum)
      await window.ethereum.enable()
    }
    else if (window.web3) {
      window.web3 = new Web3(window.web3.currentProvider)
    }
    else {
      window.alert('Non-Ethereum browser detected. You should consider trying MetaMask!')
    }
  }

 



  async loadBlockchainData() {
    const web3 = window.web3
    // Load account
    const accounts = await web3.eth.getAccounts()
    this.setState({ account: accounts[0] })

    const networkId = await web3.eth.net.getId()
    const networkData = Color.networks[networkId]
    if(networkData) {
      const abi = Color.abi
      const address = networkData.address
      const contract = new web3.eth.Contract(abi, address)
      this.setState({ contract })
      const totalSupply = await contract.methods.totalSupply().call()
      this.setState({ totalSupply })
      // Load Colors
      for (var i = 1; i <= totalSupply; i++) {
        const color = await contract.methods.showTimedMessage(i-1).call()
        this.setState({
          colors: [...this.state.colors, color]
        })
      }
    } else {
      window.alert('Smart contract not deployed to detected network.')
    }
  }

  mint = (color, mins) => {
    this.state.contract.methods.mint(color,mins).send({ from: this.state.account })
    .once('receipt', (receipt) => {
      this.setState({
        colors: [...this.state.colors, color]
      })
    })
  }

  constructor(props) {
      var today = new Date(),

    time =    today.getHours() + ':' + today.getMinutes();


    super(props)
    this.state = {
      account: '',
      contract: null,
      totalSupply: 0,
       currentTime: time,
      colors: []
    }
  }

  render() {
    return (
      <div>
        <nav className="navbar navbar-dark fixed-top bg-dark flex-md-nowrap p-0 shadow">
          <a
            className="navbar-brand col-sm-3 col-md-2 mr-0"
            href=""
            target="_blank"
            rel="noopener noreferrer"
          >
            CapsuleCorp
          </a>
          <ul className="navbar-nav px-3">
            <li className="nav-item text-nowrap d-none d-sm-none d-sm-block">
              <small className="text-white"><span id="account">{this.state.account}</span></small>
            </li>
          </ul>
        </nav>


        <div className="container-fluid mt-5 text-center">
        
         <img src={ad}  width = '500' height = '200'/>
          <div className="row">
            <main role="main" className="col-lg-12 d-flex text-center">

           
        

               



              <div className="content mr-auto ml-auto">
                <h1></h1>
                <form onSubmit={(event) => {
                  event.preventDefault()
                  const color = this.color.value
                  const mins = this.mins.value
                  this.mint(color, mins)
                }}>
                  <textarea
                    type='text'
                 
                    maxlength='1000'
                    
                    className='form-control mb-1'
                    placeholder='Secret message - 1000 character limit'
                    ref={(input) => { this.color = input }}
                  />
                   <input
                    type='number'
                    min = '0'
                    
                    className='form-control mb-1 '
                    placeholder='minutes'
                    ref={(time) => { this.mins = time}}
                  />
                  <input
                    type='submit'
                    className='btn btn-block btn-primary'
                    value='Create'
                  />
                </form>
              </div>
            </main>
          </div>
          <hr/>
          <div className="row text-center">
            { this.state.colors.map((color, key) => {
              return(
                <div key={key} className="col-md-2 mb-2">
                  <div className="token"   style={{ backgroundImage: `url(${images[getRandomInt(3)]})` }}  ></div>
                  <div>Capsule {key}</div>
                   


                   <div>
                   <div data-tip data-for="registersecret">
                   <button  className="ownerbutton text-white" style={{ backgroundColor:"#C2C0C4" }} onClick={value => alert("Message: "+ color )}>
             Message
        </button>
      </div>
      
    </div>

    

                </div>





              )
            })}
          </div>




        </div>
      </div>
    );
  }
}

export default App;
