import React, {useState} from 'react'
import { Button } from 'react-bootstrap'
import './css/App.css'

function Item(props) {
    const [loadingTransaction, setLoadingTransaction] = useState(false)

    let {buyer, seller, name, price, state, sku} = props.item
    let {buyItem, shipItem, receiveItem} = props.web3.contract.methods
    let {accounts} = props.web3

    // Create shorthand notation for buyer
    let buyer_shorthand = buyer.substr(0, 5) + '...' + buyer.substr(buyer.length - 3)

    // Create shorthand notation for seller
    let seller_shorthand = seller.substr(0, 5) + '...' + seller.substr(seller.length - 3)

    let purchaseItem = async () => {
        try {
            setLoadingTransaction(true)
            await buyItem(sku).send({from: accounts[0], value: price})
            props.itemUpdated(true)
        } catch (e) {
            alert('Purchase unsuccesful')
            console.log(e)
        } finally {
            setLoadingTransaction(false)
        }
    }

    let sendItem = async () => {
        try {
            setLoadingTransaction(true)
            await shipItem(sku).send({from: accounts[0]})
            props.itemUpdated(true)
        } catch (e) {
            alert('Shipment unsuccesful')
            console.log(e)
        } finally {
            setLoadingTransaction(false)
        }
    }

    let acceptItem = async () => {
        try {
            setLoadingTransaction(true)
            await receiveItem(sku).send({from: accounts[0]})
            props.itemUpdated(true)
        } catch (e) {
            alert('Unable to receive item')
            console.log(e)
        } finally {
            setLoadingTransaction(false)
        }
    }

    return(
        <div className="item__div">
        <img src={require('./images/Shoppingcart.png')} alt="Item Image"/>
        <div>
        <p>Name: {name}</p>
        <p>Price: {price} WEI</p>
        <p>Buyer: {parseInt(buyer) ? buyer_shorthand: 'None'}</p>
        <p>Seller: {seller_shorthand}</p>
        </div>
            {state === "0" ? !(accounts[0] === seller) ? !loadingTransaction ? <Button variant="success" onClick={purchaseItem}>Buy</Button> : <Button variant="success">...</Button> : <Button variant="warning">Your Item</Button> : null}
            {state === "1" ? accounts[0] === seller ? !loadingTransaction ? <Button variant="success" onClick={sendItem}>Ship</Button> : <Button variant="success">...</Button> : <Button variant="warning">Waiting for Seller To Ship</Button> : null}
            {state === "2" ? !(accounts[0] === seller) ? !loadingTransaction ?  <Button variant="success" onClick={acceptItem}>Receive</Button> : <Button variant="success">...</Button> : <Button variant="warning">Waiting for Buyer To Receive</Button> : null}
        </div>
    )
}

export default Item