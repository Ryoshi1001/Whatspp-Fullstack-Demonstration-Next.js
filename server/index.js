// https://www.youtube.com/watch?v=keYFkLycaDg 
// 2:44 mins
import dotenv from 'dotenv'
dotenv.config()
import express from 'express'
import cors from 'cors'

//importing routes
import AuthRoutes from './routes/AuthRoute.js'

const app = express(); 

//more detailed cors
// // app.use(cors())
// const corsOptions = {
//   origin: 'http://localhost:3000', // assuming your React app runs on port 3000
//   credentials: true,
//   optionsSuccessStatus: 200
// };

app.use(cors());

//more detailed cors
// app.use(cors({
//   origin: 'http://localhost:3000', // or whatever your client's URL is
//   methods: ['GET', 'POST'],
//   credentials: true
// }));

app.use(express.json())

//use routes in app
app.use('/api/auth', AuthRoutes)

const PORT = process.env.PORT; 

const server = app.listen(PORT, () => {
  console.log(`SERVER RUNNING ON PORT:${PORT}`)
})