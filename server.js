const express = require('express')
const fs = require('fs')
const app = express()

if (!fs.existsSync('savings.json')) {
    fs.writeFileSync('savings.json', '{"savings":0}')
}

app.use(express.json())
app.use(express.static('public'))

app.get('/expenses', (req, res) => {
    const data = fs.readFileSync('data.json', 'utf8')
    res.send(data)
})

app.post('/expenses', (req, res) => {
    const data = fs.readFileSync('data.json', 'utf8')
    const expenses = JSON.parse(data)
    const newExpense = {
        id: Date.now(),
        name: req.body.name,
        amount: req.body.amount
    }
    expenses.push(newExpense)
    fs.writeFileSync('data.json', JSON.stringify(expenses))
    res.send({ success: true })
})

app.delete('/expenses/:id', (req, res) => {
    const data = fs.readFileSync('data.json', 'utf8')
    const expenses = JSON.parse(data)
    const newExpenses = expenses.filter(e => 
        e.id != req.params.id
    )
    fs.writeFileSync('data.json', JSON.stringify(newExpenses))
    res.send({ success: true })
})

app.get('/savings', (req, res) => {
    const data = fs.readFileSync('savings.json', 'utf8')
    res.send(data)
})

app.post('/savings', (req, res) => {
    fs.writeFileSync('savings.json', JSON.stringify({ savings: req.body.savings }))
    res.send({ success: true })
})

app.delete('/savings', (req, res) => {
    fs.writeFileSync('savings.json', JSON.stringify({ savings: 0 }))
    res.send({ success: true })
})

app.listen(3000, () => {
    console.log('Server is running!')
})