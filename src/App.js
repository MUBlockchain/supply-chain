import React, {useEffect, useState} from 'react';
import { Button } from "react-bootstrap";
import './css/App.css';
import ItemContainer from './ItemContainer';
import AddItemModal from "./AddItemModal";
import SupplyChainContract from './contracts/SupplyChain.json'
import getWeb3 from './getWeb3';
import Item from "./Item";

function App() {
    const [web3Data, setWeb3Data] = useState()
    const [items, setItems] = useState([])
    const [showItemModal, setShowItemModal] = useState(false)
    const [itemUpdated, setItemUpdated] = useState(false)

    /*  Listen for MetaMask account change and refresh page when one is detected */
    window.ethereum.on('accountsChanged', (accounts) => {
        if(!web3Data) return
        window.location.reload()
    })


    /* Load initial Web3 object */
    let initiateWeb3 = async () => {
        try {
            // Get network provider and web3 instance.
            const web3 = await getWeb3()
            // Use web3 to get the user's accounts.
            const accounts = await web3.eth.getAccounts()

            // Get the contract instance.
            const networkId = await web3.eth.net.getId()
            const deployedNetwork = SupplyChainContract.networks[networkId];
            const instance = new web3.eth.Contract(
                SupplyChainContract.abi,
                deployedNetwork && deployedNetwork.address,
            )

            // Contract data to state object
            setWeb3Data({web3: web3, accounts: accounts, contract: instance})
            window.web3 = web3
        } catch (e) {
            // Catch any errors for any of the above operations.
            alert(
                'Failed to load web3 accounts. Check to ensure MetaMask is configured correctly',
            );
            console.error(e);
        }
    }

    /*  Load items existing on blockchain. Sort them into their respective categories based on state */
    let loadItems = async () => {
        let {skuCount, fetchItem} = web3Data.contract.methods
        let forSale, sold, shipped, received
        forSale = []
        sold = []
        shipped = []
        received = []
        let itemLength = await skuCount().call()
        for(let i = 0; i < itemLength; i++) {
            let item =  await fetchItem(i).call()
            switch (item.state) {
                case "0":
                    forSale.push(<><Item web3={web3Data} item={item} itemUpdated={setItemUpdated} /></>)
                    break
                case "1":
                    sold.push(<><Item web3={web3Data} item={item} itemUpdated={setItemUpdated} /></>)
                    break
                case "2":
                    shipped.push(<><Item web3={web3Data} item={item} itemUpdated={setItemUpdated} /></>)
                    break
                case "3":
                    received.push(<><Item web3={web3Data} item={item} itemUpdated={setItemUpdated} /></>)
                    break
                default:
                    break
            }
        }
        setItems({forSale: forSale, sold: sold, shipped: shipped, received: received})
    }

    /* Load Web3 data on initial load */
    useEffect(() => {
        initiateWeb3()
    }, [])

    /*  Load items when initial web3 data is collected and when an update is made to the state of an item */
    useEffect(() => {
        if(!web3Data) return
        loadItems()
    }, [web3Data, itemUpdated])


  return (
    <div className="App">
      <h1>Supply Chain Front-End Integration</h1>
        <br/>
        <p>Note: If you are running your development blockchain for the first time or have reset it then there will not be any items visible immediately.
        Please add items to make them appear.</p>
        <Button variant="primary" className="app__add__item" onClick={() => setShowItemModal(true)}>Add Item</Button>
        <ItemContainer web3={web3Data} items={items}/>
        <AddItemModal web3={web3Data} itemAdded={setItemUpdated} show={showItemModal} onHide={() => setShowItemModal(false)}/>
    </div>
  )
}

export default App;
