import express from 'express';
import { dbConnection } from './db/dbConnection.js';
import mongoose from 'mongoose';
import { userRoutes } from './src/modules/user/user.route.js';


const app = express();

app.use(userRoutes);


dbConnection;



app.listen(process.env.PORT, () => {
    console.log('Server is running on port 5000');
});