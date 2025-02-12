import express from 'express';
import cors from 'cors';
import swaggerUi from 'swagger-ui-express';
import swaggerDocs from './swagger/swagger.js';
// Routes
import user from './routes/user.js';
import pacient from './routes/pacientRoutes.js';
import log from './routes/log.js';
import evolution from './routes/evolutionRoutes.js';
import { checkPermission } from './controller/authGuard.js';
import exam from './routes/exam.js';
import surgery from './routes/surgery.js';
import treatment from './routes/treatment.js';
import receipt from './routes/receiptRoutes.js';
import appointment from './routes/appointment.js';
import medication from './routes/medications.js';
import homeRouter from './routes/homeRouter.js';

const app = express();

const port = 3001;

app.use(express.json());
app.use(
    cors({
        origin: '*',
        methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
        allowedHeaders: ['Content-Type', 'Authorization'],
    })
);

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));
app.use('/', log);
app.use('/home', homeRouter);
app.use('*', checkPermission);
app.use('/user', user);
app.use('/pacient', pacient);
app.use('/evolution', evolution);
app.use('/exam', exam);
app.use('/surgery', surgery);
app.use('/treatment', treatment)
app.use('/receipt', receipt);
app.use('/appointment', appointment);
app.use('/medication', medication);

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
