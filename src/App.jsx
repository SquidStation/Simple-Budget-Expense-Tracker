import Container from 'react-bootstrap/Container'
import { Button, Stack } from 'react-bootstrap'
import BudgetCard from './components/BudgetCard'
import { useState } from 'react'
import AddBudgetModal from './components/AddBudgetModal'
import { UNCATEGORIZED_BUDGET_ID, useBudgets } from './contexts/BudgetsContext'
import AddExpenseModal from './components/AddExpenseModal'
import UncategorizedBudgetCard from './components/UncategorizedBudgetCard'
import TotalBudgetCard from './components/TotalBudgetCard'
import ViewExpensesModal from './components/ViewExpensesModal'

export default function App() {

  const [showAddBudgetModal, setShowAddBudgetModal] = useState(false)
  const [showAddExpenseModal, setShowAddExpenseModal] = useState(false)
  const [addExpenseModalBudgetId, setAddExpenseModalBudgetId] = useState()
  const [addViewExpenseModalBudgetId, setViewExpenseModalBudgetId] = useState()
  const { budgets, getBudgetExpenses } = useBudgets()

  function openExpenseModal(budgetId){
    setShowAddExpenseModal(true)
    setAddExpenseModalBudgetId(budgetId)
  }

  function openViewExpenseModal(budgetId){
    setViewExpenseModalBudgetId(budgetId)
  }

  return (
    <>
      <Container className='my-4'>
      <Stack direction='horizontal' gap='2' className='mb-4'>
        <h1 className='me-auto'>Budgets</h1>
        <Button variant='primary' onClick = { () => setShowAddBudgetModal(true)}>Add Budget</Button>
        <Button variant='outline-primary' onClick={openExpenseModal}>Add Expense</Button>
      </Stack>

      <div style={ {display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
         alignItems: 'flex-start',
        gap: '1rem'}}>
        
        {
          budgets.map( budget =>  { 
          const amount=getBudgetExpenses(budget.id).reduce((total, expense) => total + expense.amount, 0) 

          return (<BudgetCard key={budget.id} name= {budget.name} amount={amount} max={budget.max} onClickAddExpense={ () => openExpenseModal(budget.id)} onClickViewExpense={ () => openViewExpenseModal(budget.id)} />)} )
        }

        <UncategorizedBudgetCard onClickAddExpense={openExpenseModal} onClickViewExpense={ () => openViewExpenseModal(UNCATEGORIZED_BUDGET_ID)} />
        <TotalBudgetCard />
        
      </div>
    </Container>

    <AddBudgetModal show={showAddBudgetModal} handleClose={() => setShowAddBudgetModal(false)} /> 
    <AddExpenseModal show={showAddExpenseModal} handleClose={ () => setShowAddExpenseModal(false)} defaultBudgetId={addExpenseModalBudgetId} />
    <ViewExpensesModal budgetId={addViewExpenseModalBudgetId} handleClose={ () => setViewExpenseModalBudgetId() }/>
    </>

  )
}


