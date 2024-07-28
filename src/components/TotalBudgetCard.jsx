import { useBudgets } from "../contexts/BudgetsContext";
import BudgetCard from "./BudgetCard";

export default function TotalBudgetCard(){
    const { expenses, budgets} = useBudgets()

    //reduce callaback function:
    //function sumofarray(sum, num){ return sum + Math.round(num)};
    const amount = expenses.reduce((total, expense) => total + expense.amount, 0 ) 
    const max = budgets.reduce((total, budget) => total + budget.max, 0 ) 

    if( max===0) return null

    return(
        <BudgetCard name="Total" amount={amount} max={max} gray hideButtons />
    )
}