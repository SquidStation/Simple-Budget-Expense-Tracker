import { Modal, Form, Button } from 'react-bootstrap'
import { useRef } from 'react'
import { useBudgets } from '../contexts/BudgetsContext'
import { UNCATEGORIZED_BUDGET_ID } from '../contexts/BudgetsContext'

export default function AddExpenseModal({show, handleClose, defaultBudgetId}){

    const descriptionRef = useRef()
    const amountRef = useRef()
    const budgetIdRef= useRef()
    
    const { addExpense, budgets} = useBudgets()

    function handleSubmit(e){
        e.preventDefault()

        addExpense( { description: descriptionRef.current.value, amount: parseFloat(amountRef.current.value), budgetId:budgetIdRef.current.value } )

        handleClose()
    }

    return(
        <Modal show={show} onHide={handleClose}>
            <Form onSubmit={handleSubmit}>
                <Modal.Header closeButton>
                    <Modal.Title> New Expense</Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    <Form.Group controlId='description' className='mb-3'>
                        <Form.Label>Description</Form.Label>
                        <Form.Control ref={descriptionRef} className='rounded-pill' type='text' required/>
                    </Form.Group>
                    <Form.Group controlId='amount' className='mb-3'>
                        <Form.Label>Amount</Form.Label>
                        <Form.Control ref={amountRef} className='rounded-pill' type='number' required min={0} step={0.01}/>
                    </Form.Group>
                    <Form.Group controlId='budget' className='mb-3'>
                        <Form.Label>Budget</Form.Label>
                        <Form.Select className='rounded-pill' ref={budgetIdRef} defaultValue={defaultBudgetId} >
                            <option id={UNCATEGORIZED_BUDGET_ID}>{UNCATEGORIZED_BUDGET_ID}</option>
                            { budgets.map( budget =>  <option key={budget.id} value={budget.id}>{budget.name}</option> ) }
                        </Form.Select>
                    </Form.Group>
                    <div className='d-flex justify-content-end'>
                        <Button variant='primary' type='submit'>Add</Button>
                    </div>
                </Modal.Body>
            </Form>
        </Modal>
    )
}