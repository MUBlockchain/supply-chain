import React, {useState} from 'react'
import { Button, Modal } from 'react-bootstrap'
import './css/App.css'

function AddItemModal(props) {
    const [loading, setLoading] = useState(false)

    let addItem = async (event) => {
        event.preventDefault()
        let name = event.target.name.value
        let price = event.target.price.value
        try {
            setLoading(true)
            await props.web3.contract.methods.addItem(name, price).send({from: props.web3.accounts[0]})
        } catch (e) {
            alert("Could not add item. Ensure network is up and running and that input data is an integer.")
            console.log(e)
        } finally {
            props.itemAdded(true)
            props.onHide()
            setLoading(false)
        }
    }

    return (
        <>
            <Modal show={props.show} onHide={props.onHide}>
                <Modal.Header closeButton>
                    <Modal.Title>Add Item</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form id="item__form" onSubmit={addItem}>
                    <div id="addItemModal__inputFields">
                    <p>Name: </p> <input type="text" name="name" required/>
                    <br/>
                    <p>Price: </p> <input type="text" name="price" required/>
                    </div>
                    </form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={props.onHide}>
                        Close
                    </Button>
                    <Button form="item__form" variant="primary" type="submit">
                        {loading ? '...' : 'Add Item'}
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}

export default AddItemModal