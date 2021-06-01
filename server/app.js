require("dotenv").config();
const Express = require('express');
const app = Express();
const dbConnection = require("./db");

const controllers = require("./controllers");

app.use(Express.json());

app.use("/workout", controllers.workoutControllers);

app.use(require("./middleware/validate-jwt"));
app.use("/user", controllers.userController);

dbConnection.authenticate()
    .then(() => dbConnection.sync())
    .then(() => {
        app.listen(4000, () => {
            console.log(`[Server]: App is listening on 4000`);
        });
    })
    .catch((err) => {
        console.log(`[Server]: Server crasher. Error = ${err}`);
    });

// app.use('/test', (req, res) => {
//     res.send('This is a message from the test endpoint on the server!')
// });

app.listen(4000, () => {
    console.log(`[Server]: app is listening on 4000.`);
});