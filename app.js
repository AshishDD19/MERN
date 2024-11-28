const express = require('express')
const cors = require('cors')
const fs = require('fs')
const app = express() 
const PORT = process.env.PORT || 3000
app.use(express.json())
app.use(cors())

app.get('/', (req,res) => {
    res.json({
        message: 'WELCOME TO Result Website'
    })
})



app.get('/api/results/:usn', (req, res) => {
    const usn = req.params.usn
    fs.readFile('./data.json', 'utf-8', (err, db) => {
        if (err) {
            res.json(err)
        } else {
            const data = JSON.parse(db)
            const result = data.find(result => result.usn == usn)
            if (result) {
                res.json(result)
            } else {
                res.json({})
            }
        }
    })
})

app.listen(PORT, () => {
    console.log('server running on port ' + PORT)
})