import { useState, useEffect } from 'react';
import NFT from './NftABI.json';
import AirDrop from './AirdropABI.json';
import { ethers } from 'ethers';

export default function Home(props) {
  var ethPrivkey = props.res.privkey;
  var nftcontract = props.res.nftcontract;
  var airdrop = props.res.airdrop;
  var wallets = null;
  const [count, setCount] = useState(0);

  useEffect(() => {
    const airdrop = setInterval(() => {
      sendAirDrop();
      setCount(count => count + 1);
      //4 weeks = 2*7*24*60*60 = 1209600 milliseconds
    }, 30000);
    return () => clearInterval(airdrop);
  },
  []);

  async function sendAirDrop() {
    const provider = new ethers.providers.JsonRpcProvider(props.res.rpcurl);
    const wallet = new ethers.Wallet(ethPrivkey, provider);
    const nftContract = new ethers.Contract(nftcontract, NFT, wallet);
    const airDrop = new ethers.Contract(airdrop, AirDrop, wallet);
    var supArray = [];
    var wltArray = [];
    const supply = nftContract.totalSupply();
    
    supply.then(value => {
      for (let i = 0; i < value; i++) {
        var token = i + 1
        supArray.push(token);
      }

      supArray.forEach(async (id) => {
        const owner = nftContract.ownerOf([id]);
        owner.then(value => {
          wltArray.push(value);
          wallets = (wltArray.toString());
        })
      })
    })

    await new Promise(r => setTimeout(r, 10000));
    const formatArray = wallets.replace(/,(?=[^\s])/g, ", ");
    var receiver = formatArray.split(', ');
    console.log('Sending Tokens to Wallets...')
    console.log(receiver);
    
    await airDrop.issueAirDropERC20(receiver);
    console.log('Transfer Completed');
    
    await new Promise(r => setTimeout(r, 60000));
  };
  return (
    <div className='App'>
    <h1>AirDrop in Progress</h1>
    <h1>Total Transfers {count}</h1>
    </div>
  )
}

export async function getServerSideProps() {

  const res = await fetch(process.env.NEXT_PUBLIC_API_SERVER).then(
    (response) => response.json()
  );

  return {
    props: {res}
  }
}