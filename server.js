const ex = require('express')
const mysql = require('mysql2')
const cors = require('cors')
const bodyParser = require('body-parser')

const app = ex()
const PORT = 3000

// midleware
// memberikan akses dari frontend & json
app.use(cors())
app.use(bodyParser.json())

//DB
const db = mysql.createConnection({
    host:'localhost',
    user: 'root',
    password: '',
    database: 'verinejs'
})

db.connect((error)=>{
    if(error){
        console.error('Gagal Koneksi', error)
        return
    }
    console.log('Terhubung ke Mysql')
})

// routing
app.get('/api/mahasiswa', (req, res) => {
    const sql = 'SELECT * FROM mahasiswa'
    db.query(sql, (error, results) => {
        if(error) return res.status(500).json({ error: error.message })
        res.json(results)
    })
})

// create
app.post('/api/mahasiswa',(req,res)=>{
    const{nama, nim, fakultas} = req.body
    const sql = 'INSERT INTO mahasiswa (nama, nim, fakultas) VALUES (?,?,?)'

    db.query(sql, [nama, nim, fakultas], (error, results)=>{
        if (error) return res.status(500).json({error:error.message})
            res.json({message : 'Data berhasil ditambahkan', id:results.insertId})
    })
})

// update
app.put('/api/mahasiswa/:id', (req,res)=>{
    const {id} = req.params
    const{nama, nim, fakultas} = req.body;
    const sql ='UPDATE mahasiswa SET nama = ?, nim = ?, fakultas =? WHERE id =?'

    db.query(sql,[nama, nim, fakultas, id], (error, results)=>{
        if(error) return res.status(500).json({error:error.message}) 
        res.json({message:'Data berhasil di update'})
    })
})

// delete
app.delete('/api/mahasiswa/:id', (req, res)=>{
    const {id} = req.params
    const sql ='DELETE FROM mahasiswa WHERE id =?'

    db.query(sql, [id], (error, results)=>{
        if(error) return res.status(500).json({error:error.message})
        res.json({message:'Data berhasil dihapus'})
    })
})

// jalankan server
app.listen(PORT, ()=> {
    console.log(`Server API berjalan di http://localhost:${PORT}`)
})