import React, { useContext, useState } from 'react'
import { v4 as uuidV4 } from 'uuid'
import useLocalStorage from '../hooks/useLocalStorage'

const BudgetsContext = React.createContext()

export const UNCATEGORIZED_BUDGET_ID = "Uncategorized"

export function useBudgets(){
    return useContext(BudgetsContext)
}

//adding an expense id, budgetId, description, amount
//adding a budget id, name, max


export const BudgetsProvider = ({children}) => { 

    const [expenses, setExpenses] = useLocalStorage('expenses', [])
    const [budgets, setBudgets] = useLocalStorage('budgets', [])

    function getBudgetExpenses(budgetId){
       return expenses.filter((expense) => (expense.budgetId === budgetId) )
    }
    
    function addExpense({description, amount, budgetId}){
        setExpenses( prevExpenses => {
            return [...prevExpenses, { id: uuidV4(), budgetId, description, amount}]
        })
    }
    
    function addBudget({name, max}){
        setBudgets( prevBudgets => {
            if(prevBudgets.find(budget => budget.name === name)){
                return prevBudgets
            }

            return [...prevBudgets, { id: uuidV4(), name, max}]
        })
    }
    
    function deleteBudget({id}){

        //TODO: Move deleted expenses from budget category to uncategorized card
        setExpenses( prevExpenses => {
            return prevExpenses.map( expense => {
                if (expense.budgetId !== id) return expense //make sure its the correct expense to be deleted
                return {...expense, budgetId: UNCATEGORIZED_BUDGET_ID}
            } )
        })

        //delete budgets
        setBudgets(prevBudgets => {
            return prevBudgets.filter( budget => budget.id !== id)
        })
    }
    
    function deleteExpense({id}){
        setExpenses(prevExpenses => {
            return prevExpenses.filter( expense => expense.id !== id)
        })
    }
    

    return(
        <BudgetsContext.Provider value={{
            budgets,
            expenses,
            getBudgetExpenses,
            addExpense,
            addBudget,
            deleteBudget,
            deleteExpense
        }}>
            {children}
        </BudgetsContext.Provider>
    )
}