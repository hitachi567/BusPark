const { alertMsg } = require(`./help`);

// exporting sqlite3 module
const sqlite3 = require('sqlite3');
const databasePath = `${process.env.APPDATA}/BusPark/db2.db`;
// connecting to database
const db = new sqlite3.Database(databasePath, sqlite3.OPEN_READWRITE | sqlite3.OPEN_CREATE);

// SQL-injections

module.exports = {
    getAnyData,
    fill_db,
    getAuthorizationData,
    getFreeAccount,
    getRegistrationData,
    insertUser,
    getTable,
    getTableWithSearch,
    updateRow,
    addRow,
    deleteRow
};

// database check
function getAnyData(callback = (result = 1) => {}) {
    const sql = `
        SELECT
            count(*)
        FROM
            sqlite_master
        WHERE
            type ='table' AND name = 'authorization'`;
    db.all(sql, (error, rows) => {
        if (error) {
            return alertMsg(error);
        }
        if (rows[0]['count(*)'] == 0) {
            return callback(0);
        }
        callback(1);
    });
}

function fill_db(sqlSchema, callback = () => {}, i = 0) {
    if (i == sqlSchema.length - 1) {
        callback();
    } else {
        db.run(sqlSchema[i], (err) => {
            if (err) {
                return alertMsg(err);
            }

            fill_db(sqlSchema, callback, ++i);
        });
    }
}

// authorization
function getAuthorizationData(login = '', password = '', callback = (rows) => {}) {
    const sql1 = `
        SELECT
            login,
            isAllowedAccess
        FROM
            authorization
        WHERE
            login = $login AND password = $password`;
    const sql2 = `
        SELECT 
            authorization.accessLevel,
            authorization.login,
            authorization.employmentContractNumber,            
            authorization.ID AS authorization_ID,
            employees.ID AS employees_ID
        FROM
            authorization, employees
        WHERE
            login = $login AND password = $password AND
            authorization.employmentContractNumber = employees.employmentContractNumber`;
    db.all(sql1, { $login: login, $password: password }, (error, rows) => {
        if (error) {
            return alertMsg(`Ошибка получения авторизационных данных\n${error}`, 'Ошибка');
        }
        if (rows.length == 0) {
            return alertMsg(`Неверный логин или пароль`);
        }
        if (!rows[0].isAllowedAccess) {
            return alertMsg(`Доступ закрыт!\nОбратитесь к старшему сотруднику`);
        }
        db.all(sql2, { $login: login, $password: password }, (error, rows) => {
            if (error) {
                return alertMsg(`Ошибка получения данных пользователя\n${error}`, 'Ошибка');
            }
            callback(rows);
        });
    });
}

// registration
function getFreeAccount(callback = (result = ['']) => console.log(result)) {
    db.all(`SELECT employmentContractNumber as employees_empID FROM employees`, (error, employees = []) => {
        if (error) {
            return alertMsg(error);
        }
        db.all(`SELECT employmentContractNumber as authorization_empID FROM authorization`, (error, authorization = []) => {
            if (error) {
                return alertMsg(error);
            }

            const result = [];
            for (let i = 0; i < employees.length; i++) {
                const employees_empID = employees[i].employees_empID;

                let check = 0;
                for (let j = 0; j < authorization.length; j++) {
                    const authorization_empID = authorization[j].authorization_empID;

                    if (employees_empID == authorization_empID) {
                        check++;
                    }
                }

                if (check == 0 && employees_empID != null) {
                    result.push(`${employees_empID}`);
                }
            }

            if (result.length == 0) {
                return alertMsg(`На данный момент новых сотрудников нет!`);
            }

            callback(result);
        });
    });
}

function getRegistrationData(login = '', callback = () => {}) {
    const sql = `
        SELECT
            login
        FROM
            authorization
        WHERE
            login = $login`;
    db.all(sql, { $login: login }, (error, rows) => {
        if (error) {
            return alertMsg(error);
        }
        if (rows.length != 0) {
            return alertMsg(`Такой логин занят!`);
        }
        callback();
    });
}

function insertUser(login = '', password = '', empID = '', callback = () => {}) {
    const sql = `INSERT INTO authorization(login, password, employmentContractNumber) VALUES(?, ?, ?)`;
    db.run(sql, [login, password, empID], (error) => {
        if (error) {
            return alertMsg(`Ошибка при регистрации:\n${error}`);
        }
        alertMsg(`Успешно!`);
        callback();
    });
}

function getTable(sql = '', callback = (rows) => {}) {
    db.all(sql, (error, rows) => {
        if (error) {
            return alertMsg(`Ошибка при получения данных:\n${error}`);
        }
        callback(rows);
    });
}

function getTableWithSearch(sql = '', obj = {}, callback = (rows) => {}) {
    db.all(sql, obj, (error, rows) => {
        if (error) {
            alertMsg(`${error}`);
        } else {
            callback(rows);
        }
    });
}

function updateRow(tableName = '', field = '', rowID = 0, value, callback = () => {}) {
    const sql = `UPDATE ${tableName} SET ${field} = ? WHERE ID = ?`;
    db.run(sql, [value, rowID], (error) => {
        if (error) {
            return alertMsg(error);
        }
        callback();
    });
}

function addRow(tableName, data, callback = (_ID) => {}) {
    db.run(`INSERT INTO ${tableName}(ID) VALUES(?)`, (error) => {
        if (error) {
            return alertMsg(`${error}`);
        }
        db.all(`SELECT ID FROM ${tableName}`, (error, rows = []) => {
            if (error) {
                return alertMsg(`${error}`);
            }
            let result = 0;
            for (let i = 0; i < rows.length; i++) {
                let check = 0;
                for (let j = 0; j < data.length; j++) {
                    if (rows[i].ID == data[j].ID) {
                        check++;
                    }
                }
                if (check == 0) {
                    result == i;
                }
            }

            callback(rows[result].ID);
        });
    });
}

function deleteRow(tableName, ID, callback = (error) => {}) {
    db.run(`DELETE FROM ${tableName} WHERE ID = ?;`, ID, (error) => {
        callback(error);
    });
}