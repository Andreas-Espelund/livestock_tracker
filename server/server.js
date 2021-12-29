require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const app = express()
const db = require('./db')
app.use(express.json())


// get all individuals
app.get('/api/v1/individuals',async (req, res) => {
    try{
        const result = await db.query("select * from bapp.individuals;")
        console.log(result)
        res.status(200).json({
            status:"success",
            results: result.rows.length,
            data: {
                individuals: result.rows
            }   
        })
    }catch (err){
        console.log(err)
    }
})

// get one individual
app.get('/api/v1/individuals/:id', async (req, res) => {
    try{
        const result = await db.query('select * from bapp.individuals where id = $1;', [req.params.id])
        console.log(result)
        res.status(200).json({
            status:"success",
            data:{
                individual: result.rows[0]
            }
    })
    }catch (err){
        console.log(err)
    }
    
})

// create individual
app.post('/api/v1/individuals/:id', async (req, res) => {
    try {
        const result = await db.query('INSERT INTO bapp.individuals(id, birthdate, gender, status, weight, bottle, field) VALUES ($1, $2, $3, $4, $5, $6, $7) returning *;',[req.body.id, req.body.birthdate, req.body.gender, req.body.status, req.body.weight, req.body.bottle, req.body.field])

        console.log(result)
        res.status(201).json({
            status:"success",
            data:{
                individual: result.rows[0]
            }
        })
        
    } catch (err) {
        console.log(err)
    }
    
})

// update individual

app.put('/api/v1/individuals/:id', async(req, res) =>{
    try {
        const result = await db.query('UPDATE bapp.individuals SET birthdate = $1, gender = $2, status = $3, weight = $4, bottle = $5, field = $6 WHERE id = $7 returning *;',[req.body.birthdate, req.body.gender, req.body.status, req.body.weight, req.body.bottle, req.body.field, req.params.id])
        console.log(result)
        res.status(200).json({
            status:"success",
            data:{
                individual: result.rows[0]
            }
        })  
    } catch (err) {
        console.log(err)
    }
    
})

// delete individual

app.delete('/api/v1/individuals/:id', async (req, res) =>{
    try {
        const result = await db.query('DELETE from bapp.individuals WHERE id = $1',[req.params.id])
        console.log(`Deleted ${req.params.id}`)
        res.status(204).json({
            status:"success"
        })
    } catch (err) {
        console.log(err)
    }
    
})


const port = process.env.PORT || 3001
app.listen(port, () =>{
    console.log(`Server running and listening on port ${port}`)
})


