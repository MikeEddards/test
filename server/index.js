require('dotenv').config()
process.env['NODE_TLS_REJECT_UNAUTHORIZED'] = '0';
const express = require('express');
const pgp = require('pg-promise')()
const { DATABASE_URL} = process.env
const db = pgp(DATABASE_URL)

db.connect().then(res=>{
    console.log(res.client.serverVersion)
    res.done()
}).catch(err=>{
    console.log(err)
})


const app = express();
app.use(express.json())
app.get('/', (req,res)=>{
	res.send("<h1>_Hello There_</h1>")
});
app.post('/api/scanned',async (req,res)=>{
	let {data}=req.body
	await db.any('INSERT INTO public.data_test (data) VALUES($1);',[data])
	console.log(`Storing ${data}`)
})

app.listen(process.env.PORT || 3000, function() {
	console.log('Express app running on port ' + (process.env.PORT || 3000))
});
