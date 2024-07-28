import { Stack, Button, ProgressBar,Card } from "react-bootstrap";
import { currencyFormater } from "../utils"

export default function BudgetCard({name, amount, max, gray, onClickAddExpense, hideButtons, onClickViewExpense}){


    function setCardBackground(){
       if(amount > max) { return "bg-danger bg-opacity-10"}
       if(gray) { return "bg-light"}
       else return 'bg-white'
    }

    return(
        <Card className ={setCardBackground()}>
            
            <Card.Body>
                <Card.Title className="d-flex justify-content-between align-items-baseline fw-normal mb-3" >
                   <div className="me-2">{name}</div>
                   <div className="d-flex align-items-baseline"> 
                    {currencyFormater.format(amount)} { max && (<span className="text-muted fs-6 ms-1">/ {currencyFormater.format(max)} </span>)} 
                    </div>
                </Card.Title>
                {max && (<ProgressBar variant= {getProgressBarVariant(amount, max)} now={amount} max={max} min={0} className="rounded-pill"/>)}
                { !hideButtons && (<Stack direction="horizontal" className="mt-4" gap="2">
                    <Button className="ms-auto" variant='outline-primary' onClick={onClickAddExpense} >Add Expense</Button>
                    <Button variant='outline-secondary' onClick={onClickViewExpense}>View Expenses</Button>
                </Stack>)}
            </Card.Body>
        </Card>
    )

    function getProgressBarVariant(amount, max){
        const ratio = amount / max
        if(ratio < .5) return "primary"
        if(ratio < .75) return "warning"
        return "danger"
    }
}