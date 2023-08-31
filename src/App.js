import { useEffect, useState } from 'react'
import { ethers } from 'ethers'

// Components
import Navigation from './components/Navigation'
import Search from './components/Search'
import Domain from './components/Domain'

// ABIs
import DappDazzler from './abis/DappDazz.json'

// Config
// import config from './config.json';

function App() {
  const [provider, setProvider] = useState(null)
  const [account, setAccount] = useState(null)

  const [dappDazzler, setDappDazzler] = useState(null)
  const [domains, setDomains] = useState([])

  const loadBlockchainData = async () => {
    const provider = new ethers.providers.Web3Provider(window.ethereum)
    setProvider(provider)

    const network = await provider.getNetwork();
  if (network.chainId !== 11155111) { // Goerli chain ID
    alert("Please switch to the Sepolia test network on your wallet and refresh the page to use this application.");
    return;
  }
    const dappDazzler = new ethers.Contract("0xC6aB449633513980F1F7F60e3c7F2D3e9833c698", DappDazzler, provider)
    console.log(dappDazzler);
    setDappDazzler(dappDazzler)
//0xE3C4411Ae20062342e30ef9Cfd34a5944C65B6a0 --- goerli
//0xC6aB449633513980F1F7F60e3c7F2D3e9833c698 --- sepolia
    const maxSupply = await dappDazzler.maxSupply()
    const domains = []

    for (var i = 1; i <= maxSupply; i++) {
      const domain = await dappDazzler.getDomain(i)
      domains.push(domain)
    }

    setDomains(domains)

    window.ethereum.on('accountsChanged', async () => {
      const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
      const account = ethers.utils.getAddress(accounts[0])
      setAccount(account);
    })
  }

  useEffect(() => {
    loadBlockchainData()
  }, [])

  return (
    <div>
      <Navigation account={account} setAccount={setAccount} />

      <Search />

      <div className='cards__section'>
        <h2 className='cards__title'>Claim Your Digital Identity</h2>
        <p className='cards__description'>
        Unleash Your Unique Username, Seamless Across Services,
         and Elevate Your Online Presence with Avatars and More.
        </p>

        <hr />

        <div className='cards'>
          {domains.map((domain, index) => (
            <Domain domain={domain} dappDazzler={dappDazzler} provider={provider} id={index + 1} key={index} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;