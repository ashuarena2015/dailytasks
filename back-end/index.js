const express = require('express')
const cors = require('cors')
const mysql = require('mysql')

const app = express()

const SELECT_ALL_USER_QUERY = 'SELECT * FROM users'

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'mydaily',
    socketPath: '/Applications/MAMP/tmp/mysql/mysql.sock'
})

// console.log(connection);
connection.connect(err => {
    console.log('errro found', err);
    if(err) {
        return err;
    }
})

app.use(cors())
app.use(express.urlencoded());
app.use(express.json());

app.get('/', (req, res) =>{
    res.send('Welcome to node backend')
})

app.get('/user', (req, res) => {
    connection.query(SELECT_ALL_USER_QUERY, (err, resultados) => {
        if(err) {
            return res.send(err)
        } else {
            return res.json({
                data: resultados
            })
        }
    })
})

app.post('/user/add', (req, res) => {
    const{ user_fn, user_mobile, user_email, user_password } = req.body;
    const INSERT_USER_QUERY = `INSERT INTO users(full_name, mobile, email, password) VALUES('${user_fn}', '${user_mobile}', '${user_email}', '${user_password}')`
    if(user_fn && user_mobile && user_email && user_password) {
        connection.query(INSERT_USER_QUERY, (err, resultados) => {
            if(err) {
                return res.send(err)
            } else {
                return res.send('User has been added successfully.')
            }
        });
    } else {
        return res.status(400).json(`Something went wrong, please try again.`);
    }
})

app.post('/login', (req, res) => {
    const{ login_email, login_password } = req.body;
    const FETCH_LOGIN_QUERY = `SELECT * FROM users WHERE email='${login_email}' and password='${login_password}'`;
    connection.query(FETCH_LOGIN_QUERY, (err, resultados) => {
        const userId = resultados[0] && resultados[0].id;
        if(err) {
            return res.send(err);
        } else {
            return userId ? (res.json({ data: resultados[0] })) : res.status(400).json(`User doesn't exist`);
        }
    })
})

app.get('/daily-task/category', (req, res) => {
    const FETCH_DAILY_TASK_QUERY = `SELECT * FROM daily_tasks_category`;
    connection.query(FETCH_DAILY_TASK_QUERY, (err, resultados) => {
        if(err) {
            return res.send(err);
        } else {
            return res.json({ data: resultados });
        }
    })
})

app.post('/add/daily-task/category', (req, res) => {
    const{ taskName, unit, multi_item_val } = req.body;
    const INSERT_DAILY_TASK_QUERY = `INSERT INTO daily_tasks_category (category, unit, multi_item) values('${taskName}', '${unit}', '${multi_item_val}')`;
    connection.query(INSERT_DAILY_TASK_QUERY, (err, resultados) => {
        if(err) {
            return res.send(err);
        } else {
            return res.json({ data: resultados[0] });
        }
    })
})

app.post('/update/daily-task/category', (req, res) => {
    const{ payload: { taskId, date, taskUpdateStatus, timeHours,
        timeMinutes, taskUpdateUnit, taskUpdateQty, multi_item_title, multi_item_purchase_amount } } = req.body;
    const CHECK_EXISTING_DATA = `SELECT * FROM daily_tasks_update WHERE date='${date}' and task=${taskId}`;
    connection.query(CHECK_EXISTING_DATA, (err, resultados) => {
        if(err) {
            return res.send(err);
        }
        if (resultados.length === 0) {
            const INSERT_DAILY_TASK_QUERY = `INSERT INTO daily_tasks_update (task, status, date, time, unit, qty) VALUES('${taskId}', ${taskUpdateStatus}, '${date}', '${timeHours}:${timeMinutes}', '${taskUpdateUnit}', '${taskUpdateQty}')`;
            const INSERT_DAILY_TASK_QUERY_MULTI_ITEM = `INSERT INTO daily_tasks_update (task, status, time, date, unit, qty, multi_item_title, multi_item_purchase_amount) VALUES('${taskId}', 0, '', '${date}', '', '', '${multi_item_title}', '${parseFloat(multi_item_purchase_amount)}')`;
            connection.query(multi_item_title ? INSERT_DAILY_TASK_QUERY_MULTI_ITEM : INSERT_DAILY_TASK_QUERY, (err, resultados) => {
                if(err) {
                    return res.send(err);
                } else {
                    return res.json({ data: resultados.insertId });
                }
            })
        } else {
            return res.json({ data: 0 });
        }
    })    
})

app.post('/daily-task/report', (req, res) => {
    const{ taskId } = req.body;
    const FETCH_DATA_REPORT = `SELECT * FROM daily_tasks_category as dtc INNER JOIN daily_tasks_update as dtu WHERE dtc.id=dtu.task and dtu.task=${taskId};`;
    console.log(FETCH_DATA_REPORT);
    connection.query(FETCH_DATA_REPORT, (err, resultados) => {
        if(err) {
            return res.send(err);
        } else {
            return res.json({ data: resultados });
        }
    })    
})

app.post('/daily-task/delete', (req, res) => {
    const{ rowId } = req.body;
    const DELETE_DAILY_TASK_ROW = `DELETE * FROM daily_tasks_update WHERE id=${rowId};`;
    connection.query(DELETE_DAILY_TASK_ROW, (err, resultados) => {
        if(err) {
            return res.send(err);
        } else {
            return res.json({ data: resultados });
        }
    })    
})


app.listen(4000, () => {
    console.log('Listening on  4000')
})