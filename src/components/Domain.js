import { useEffect, useState } from 'react'
import { ethers } from 'ethers'

const Domain = ({ domain, dappDazzler, provider, id }) => {
  const [owner, setOwner] = useState(null)
  const [hasSold, setHasSold] = useState(false)

  const getOwner = async () => {
    if (domain.isOwned || hasSold) {
      const owner = await dappDazzler.ownerOf(id)
      setOwner(owner)
    }
  }

  const buyHandler = async () => {
    const signer = await provider.getSigner();
    const connectedAccounts = await signer.provider.listAccounts();

  // Check if there are no connected accounts
  if (connectedAccounts.length === 0) {
    alert("No Ethereum account detected. Please connect your wallet.");
    return;
  }

  // Get the balance of the connected wallet
  const balance = await signer.getBalance();

  if (balance.lt(domain.cost)) {
    // Insufficient funds, show an alert
    alert("Insufficient funds to buy the domain.");
    return;
  }

  const transaction = await dappDazzler.connect(signer).mint(id, { value: domain.cost });
  await transaction.wait();

  setHasSold(true);
  }

  useEffect(() => {
    getOwner()
  }, [hasSold])

  return (
    <div className='card'>
      <div className='card__info'>
        <h3>
          {domain.isOwned || owner ? (
            <del>{domain.name}</del>
          ) : (
            <>{domain.name}</>
          )}
        </h3>

        <p>
          {domain.isOwned || owner ? (
            <>
              <small>
                Owned by:<br />
                <span>
                  {owner && owner.slice(0, 6) + '...' + owner.slice(38, 42)}
                </span>
              </small>
            </>
          ) : (
            <>
              <strong>
                {ethers.utils.formatUnits(domain.cost.toString(), 'ether')}
              </strong>
              ETH
            </>
          )}
        </p>
      </div>

      {!domain.isOwned && !owner && (
        <button
          type="button"
          className='card__button'
          onClick={() => buyHandler()}
        >
          Buy It
        </button>
      )}
    </div>
  );
}

export default Domain;