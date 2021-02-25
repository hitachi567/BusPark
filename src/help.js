const tables = new Map();

tables.set('all', [
    'employees',
    'positions',
    'employmentContracts',
    'authorization',
    'stops',
    'routes',
    'stopsOfRoutes',
    'servicePrice',
    'adOffers',
    'vehicles',
    'travelSchedule',
    'waybill'
]);

tables.set('positions.status', 4);
tables.set('authorization.status', 4);
tables.set('employees.status', 3);
tables.set('employmentContracts.status', 3);
tables.set('stops.status', 3);
tables.set('routes.status', 3);
tables.set('stopsOfRoutes.status', 3);
tables.set('servicePrice.status', 3);
tables.set('travelSchedule.status', 3);
tables.set('adOffers.status', 3);
tables.set('vehicles.status', 2);
tables.set('waybill.status', 2);

tables.set('employees.employmentContractNumber', 'int');
tables.set('employees.fields', [
    'employmentContractNumber',
    'surname',
    'name',
    'patronym',
    'birth',
    'phone',
    'email',
    'address'
]);
tables.set('positions.salary', 'int');
tables.set('positions.fields', [
    'position',
    'departament',
    'salary',
    'accessLevel'
]);
tables.set('employmentContracts.employmentContractNumber', 'int');
tables.set('employmentContracts.fields', [
    'employmentContractNumber',
    'position',
    'dateOfConclusionOfEC',
    'dateOfTerminationOfEC',
    'drivingLicenseCategory'
]);
tables.set('authorization.employmentContractNumber', 'int');
tables.set('authorization.accessLevel', 'int');
tables.set('authorization.isAllowedAccess', 'boolean');
tables.set('authorization.fields', [
    'employmentContractNumber',
    'login',
    'accessLevel',
    'isAllowedAccess'
]);
tables.set('stops.number', 'int');
tables.set('stops.fields', [
    'number',
    'stop',
    'address'
]);
tables.set('stops.number', 'int');
tables.set('stops.startPoint', 'int');
tables.set('stops.endPoint', 'int');
tables.set('stops.routeLength', 'int');
tables.set('routes.fields', [
    'number',
    'route',
    'startPoint',
    'endPoint',
    'countOfStops',
    'routeLength'
]);
tables.set('stopsOfRoutes.routeNumber', 'int');
tables.set('stopsOfRoutes.stopNumber', 'int');
tables.set('stopsOfRoutes.fields', [
    'routeNumber',
    'stopNumber'
]);
tables.set('servicePrice.price', 'int');
tables.set('servicePrice.stopNumber', 'int');
tables.set('servicePrice.fields', [
    'service',
    'price',
    'routeNumber'
]);
tables.set('adOffers.number', 'int');
tables.set('adOffers.fields', [
    'number',
    'service',
    'company',
    'dateOfConclusion',
    'terminationDate'
]);
tables.set('vehicles.vehiclesPassportNumber', 'int');
tables.set('vehicles.leaseСontractNumber', 'int');
tables.set('vehicles.rentPrice', 'int');
tables.set('vehicles.fields', [
    'vehiclesPassportNumber',
    'model',
    'enginesType',
    'plateNumber',
    'dateOfIssueOfVP',
    'manufacturer',
    'yearOfManufacture',
    'owner',
    'leaseСontractNumber',
    'dateOfConclusionOfLC',
    'dateOfTerminationOfLC',
    'rentPrice',
]);
tables.set('travelSchedule.number', 'int');
tables.set('travelSchedule.routeID', 'int');
tables.set('travelSchedule.busID', 'int');
tables.set('travelSchedule.driverID', 'int');
tables.set('travelSchedule.conductorID', 'int');
tables.set('travelSchedule.fields', [
    'number',
    'routeID',
    'busID',
    'driverID',
    'conductorID',
    'date',
    'plannedDeparture',
    'plannedArrival'
]);
tables.set('waybill.number', 'int');
tables.set('waybill.quantityPassengers', 'int');
tables.set('waybill.dispatcherID', 'int');
tables.set('waybill.mechanicID', 'int');
tables.set('waybill.departureFuel', 'int');
tables.set('waybill.issuedFuel', 'int');
tables.set('waybill.arrivalFuel', 'int');
tables.set('waybill.fields', [
    'number',
    'quantityPassengers',
    'dispatcherID',
    'actualDeparture',
    'actualArrival',
    'mechanicID',
    'departureFuel',
    'issuedFuel',
    'arrivalFuel'
]);

// tables.set('travelSchedule.references', {
//     routeID: ['routes', 'routeNumber'],
//     busID: ['vehicles', 'vehiclesPassportNumber'],
//     driverID: ['employees', 'employmentContractNumber'],
//     conductorID: ['employees', 'employmentContractNumber']
// });
// tables.set('waybill.references', {
//     waybillNumber: ['travelSchedule', 'travelNumber'],
//     dispatcherID: ['employees', 'employmentContractNumber'],
//     mechanicID: ['employees', 'employmentContractNumber']
// });
// tables.set('employmentContracts.references', {
//     employmentContractNumber: ['employees', 'employmentContractNumber'],
//     position: ['positions', 'position']
// });
// tables.set('authorization.references', {
//     ECN: ['employees', 'employmentContractNumber']
// });
// tables.set('routes.references', {
//     startPoint: ['stops', 'stopNumber'],
//     endPoint: ['stops', 'stopNumber']
// });
// tables.set('stopsOfRoutes.references', {
//     routeNumber: ['routes', 'routeNumber'],
//     stopNumber: ['stops', 'stopNumber']
// });
// tables.set('servicePrice.references', { routeNumber: ['routes', 'routeNumber'] });
// tables.set('adOffers.references', { service: ['servicePrice', 'service'] });

const russianName = new Map();

russianName.set('employees', '👥 Сотрудники');
russianName.set('positions', '👥 Должности');
russianName.set('employmentContracts', '📃 Трудовые договоры');
russianName.set('authorization', '👤 Пользователи');
russianName.set('routes', '🗺 Маршруты');
russianName.set('stops', '🚏 Остановки');
russianName.set('stopsOfRoutes', '🚏 Остановки на маршрутах');
russianName.set('servicePrice', '💲 Цены на услуги');
russianName.set('travelSchedule', '📄 График поездок');
russianName.set('adOffers', '🏢 Рекламные предложения');
russianName.set('vehicles', '🗃 Транспортные средства');
russianName.set('waybill', '🚍 Путевой лист'); //
russianName.set('employmentContractNumber', '№ т/д');
russianName.set('surname', 'Фамилия');
russianName.set('name', 'Имя');
russianName.set('patronym', 'Отчество');
russianName.set('birth', 'Дата рождения');
russianName.set('phone', 'Телефон');
russianName.set('email', 'E-mail');
russianName.set('address', 'Адрес'); //
russianName.set('position', 'Должность');
russianName.set('departament', 'Департамент');
russianName.set('salary', 'Оклад');
russianName.set('accessLevel', 'Уровень доступа'); //
russianName.set('dateOfConclusionOfEC', 'Заключен т/д');
russianName.set('dateOfTerminationOfEC', 'Дата окончания т/д');
russianName.set('drivingLicenseCategory', 'Категория вождения'); //
russianName.set('login', 'Логин');
russianName.set('accessLevel', 'Уровень доступа');
russianName.set('isAllowedAccess', 'Доступ к системе'); //
russianName.set('number', '№');
russianName.set('stop', 'Остановка');
russianName.set('route', 'Маршрут');
russianName.set('startPoint', 'Начальная остановка');
russianName.set('endPoint', 'Конечная остановка');
russianName.set('countOfStops', 'Количество остановок');
russianName.set('routeLength', 'Длина маршрута'); //
russianName.set('vehiclesPassportNumber', '№ паспорта т/с');
russianName.set('model', 'Модель');
russianName.set('enginesType', 'Тип двигателя');
russianName.set('plateNumber', 'Гос. номер');
russianName.set('dateOfIssueOfVP', 'Дата выдачи');
russianName.set('manufacturer', 'Производитель');
russianName.set('yearOfManufacture', 'Год выпуска');
russianName.set('owner', 'Владелец');
russianName.set('leaseСontractNumber', '№ договора аренды');
russianName.set('dateOfConclusionOfLC', 'Заключен договор');
russianName.set('dateOfTerminationOfLC', 'Окончен договор');
russianName.set('rentPrice', 'Цена аренды'); //
russianName.set('date', 'Дата');
russianName.set('plannedDeparture', 'Выезд (по плану)');
russianName.set('plannedArrival', 'Возвращение (по плану)');
russianName.set('actualDeparture', 'Выезд (фактически)');
russianName.set('actualArrival', 'Возвращение (фактически)');
russianName.set('quantityPassengers', 'Количество пассажиров');
russianName.set('issuedFuel', 'Выданно топлива');
russianName.set('departureFuel', 'Топливо при выезде');
russianName.set('arrivalFuel', 'Топливо при возвращении');


const sqlSchema = [

    `CREATE TABLE "employees" (
        "employmentContractNumber" INTEGER UNIQUE,        
        "surname" TEXT,
        "name" TEXT,
        "patronym" TEXT,
        "birth" TEXT,
        "phone" TEXT,
        "email" TEXT,
        "address" TEXT,
        "ID" INTEGER UNIQUE,
        PRIMARY KEY("ID" AUTOINCREMENT)
    );`,
    `CREATE TABLE "positions" (
        "position" TEXT UNIQUE,
        "departament" TEXT,
        "salary" INTEGER DEFAULT 12030,
        "accessLevel" INTEGER,
        "ID" INTEGER UNIQUE,
        PRIMARY KEY("ID" AUTOINCREMENT)
    );`,
    `CREATE TABLE "employmentContracts" (
        "employmentContractNumber" INTEGER UNIQUE,
        "position" TEXT,
        "dateOfConclusionOfEC" TEXT,
        "dateOfTerminationOfEC" TEXT,
        "drivingLicenseCategory" TEXT,
        "ID" INTEGER UNIQUE,
        FOREIGN KEY("position") REFERENCES "positions"("position") ON UPDATE CASCADE ON DELETE CASCADE,
        FOREIGN KEY("employmentContractNumber") REFERENCES "employees"("employmentContractNumber") ON UPDATE CASCADE ON DELETE CASCADE,
        PRIMARY KEY("ID" AUTOINCREMENT)
    );`,

    `CREATE TABLE "authorization" (
        "employmentContractNumber" INTEGER UNIQUE,
        "login" TEXT UNIQUE,
        "password" TEXT,
        "accessLevel" INTEGER DEFAULT 0,
        "isAllowedAccess" BLOB DEFAULT 0,
        "ID" INTEGER UNIQUE,
        PRIMARY KEY("ID" AUTOINCREMENT),
        FOREIGN KEY("employmentContractNumber") REFERENCES "employees"("employmentContractNumber") ON UPDATE CASCADE ON DELETE CASCADE
    );`,

    `CREATE TABLE "stops" (
        "number" INTEGER UNIQUE,
        "stop" TEXT,
        "address" TEXT,
        "ID" INTEGER UNIQUE,
        PRIMARY KEY("ID" AUTOINCREMENT)
    );`,

    `CREATE TABLE "routes" (
        "number" INTEGER UNIQUE,
        "route" TEXT,
        "startPoint" INTEGER,
        "endPoint" INTEGER,
        "countOfStops" INTEGER,
        "routeLength" INTEGER,
        "ID" INTEGER UNIQUE,
        PRIMARY KEY("ID" AUTOINCREMENT),
        FOREIGN KEY("startPoint") REFERENCES "stops"("number") ON UPDATE CASCADE ON DELETE SET NULL,
        FOREIGN KEY("endPoint") REFERENCES "stops"("number") ON UPDATE CASCADE ON DELETE SET NULL
    );`,

    `CREATE TABLE "stopsOfRoutes" (
        "routeNumber" INTEGER,
        "stopNumber" INTEGER,
        "ID" INTEGER UNIQUE,
        PRIMARY KEY("ID" AUTOINCREMENT),
        FOREIGN KEY("routeNumber") REFERENCES "routes"("number") ON UPDATE CASCADE ON DELETE CASCADE,
        FOREIGN KEY("stopNumber") REFERENCES "stops"("number") ON UPDATE CASCADE ON DELETE CASCADE
    );`,

    `CREATE TABLE "servicePrice" (
        "service" TEXT UNIQUE,
        "price" INTEGER,
        "routeNumber" INTEGER,
        "ID" INTEGER UNIQUE,
        PRIMARY KEY("ID" AUTOINCREMENT),
        FOREIGN KEY("routeNumber") REFERENCES "routes"("number") ON UPDATE CASCADE ON DELETE CASCADE
    );`,

    `CREATE TABLE "adOffers" (
        "number" INTEGER UNIQUE,
        "service" TEXT,
        "company" TEXT,
        "dateOfConclusion" TEXT,
        "terminationDate" TEXT,
        "ID" INTEGER UNIQUE,
        PRIMARY KEY("ID" AUTOINCREMENT),
        FOREIGN KEY("service") REFERENCES "servicePrice"("service") ON UPDATE CASCADE ON DELETE SET NULL
    );`,

    `CREATE TABLE "vehicles" (
        "vehiclesPassportNumber" INTEGER UNIQUE,
        "model" TEXT,
        "enginesType" TEXT,
        "plateNumber" TEXT UNIQUE,
        "dateOfIssueOfVP" TEXT,
        "manufacturer" TEXT,
        "yearOfManufacture" TEXT,
        "owner" TEXT DEFAULT 'BusPark & Co',
        "leaseСontractNumber" INTEGER UNIQUE,
        "dateOfConclusionOfLC" TEXT,
        "dateOfTerminationOfLC" TEXT,
        "rentPrice" INTEGER DEFAULT 150000,
        "ID" INTEGER UNIQUE,
        PRIMARY KEY("ID" AUTOINCREMENT)
    );`,

    `CREATE TABLE "travelSchedule" (
        "number" INTEGER UNIQUE,
        "routeID" INTEGER,
        "busID" INTEGER,
        "driverID" INTEGER,
        "conductorID" INTEGER,
        "date" TEXT,
        "plannedDeparture" TEXT,
        "plannedArrival" TEXT,
        "ID" INTEGER UNIQUE,
        PRIMARY KEY("ID" AUTOINCREMENT),
        FOREIGN KEY("routeID") REFERENCES "routes"("routeNumber") ON UPDATE CASCADE ON DELETE CASCADE,
        FOREIGN KEY("busID") REFERENCES "vehicles"("vehiclesPassportNumber") ON UPDATE CASCADE ON DELETE SET NULL,
        FOREIGN KEY("driverID") REFERENCES "employees"("employmentContractNumber") ON UPDATE CASCADE ON DELETE SET NULL,
        FOREIGN KEY("conductorID") REFERENCES "employees"("employmentContractNumber") ON UPDATE CASCADE ON DELETE SET NULL
    );`,

    `CREATE TABLE "waybill" (
        "number" INTEGER UNIQUE,
        "quantityPassengers" INTEGER,
        "dispatcherID" INTEGER,
        "actualDeparture" TEXT,
        "actualArrival" TEXT,
        "mechanicID" INTEGER,
        "issuedFuel" INTEGER,
        "departureFuel" INTEGER,
        "arrivalFuel" INTEGER,
        "ID" INTEGER UNIQUE,
        PRIMARY KEY("ID" AUTOINCREMENT),
        FOREIGN KEY("number") REFERENCES "travelSchedule"("number") ON UPDATE CASCADE ON DELETE CASCADE,
        FOREIGN KEY("dispatcherID") REFERENCES "employees"("employmentContractNumber") ON UPDATE CASCADE ON DELETE SET NULL,
        FOREIGN KEY("mechanicID") REFERENCES "employees"("employmentContractNumber") ON UPDATE CASCADE ON DELETE SET NULL
    );`,

    `INSERT INTO positions (position, departament, accessLevel)
    VALUES ('senior manager', 'administration', 4);`,
    `INSERT INTO positions (position, departament, accessLevel)
    VALUES ('senior accountant', 'bookkeeping', 4);`,
    `INSERT INTO positions (position, departament, accessLevel)
    VALUES ('IT manager', 'control room', 4);`,
    `INSERT INTO positions (position, departament, accessLevel)
    VALUES ('HR manager', 'administration', 3);`,
    `INSERT INTO positions (position, departament, accessLevel)
    VALUES ('accountant', 'bookkeeping', 2);`,
    `INSERT INTO positions (position, departament, accessLevel)
    VALUES ('advertising manager', 'administration', 2);`,
    `INSERT INTO positions (position, departament, accessLevel)
    VALUES ('garage manager', 'garage', 2);`,
    `INSERT INTO positions (position, departament, accessLevel)
    VALUES ('senior dispatcher', 'control room', 2);`,
    `INSERT INTO positions (position, departament, accessLevel)
    VALUES ('senior mechanic', 'garage', 2);`,
    `INSERT INTO positions (position, departament, accessLevel)
    VALUES ('cashier', 'bookkeeping', 1);`,
    `INSERT INTO positions (position, departament, accessLevel)
    VALUES ('conductor', 'bookkeeping', 1);`,
    `INSERT INTO positions (position, departament, accessLevel)
    VALUES ('dispatcher', 'control room', 1);`,
    `INSERT INTO positions (position, departament, accessLevel)
    VALUES ('driver', 'garage', 1);`,
    `INSERT INTO positions (position, departament, accessLevel)
    VALUES ('mechanic', 'garage', 1);`,

    `INSERT INTO employees(employmentContractNumber)
    VALUES (1)`,
    `INSERT INTO employees(employmentContractNumber)
    VALUES (2)`,
    `INSERT INTO employees(employmentContractNumber)
    VALUES (3)`,
    `INSERT INTO authorization(employmentContractNumber, login, password, accessLevel, isAllowedAccess)
    VALUES (1, 'admin', 'error', 4, 1);`,
    `INSERT INTO authorization(employmentContractNumber, login, password, accessLevel, isAllowedAccess)
    VALUES (2, '1234', 'red', 4, 1);`

];

const colors_CSS = `
#win {
    background-color: #d6dbe0;
}
#header {
    background-color: #9bc4e2;
}
#workspace {
    background-color: white;
}

QPushButton {
    border: 1px solid white;
    background-color: white;
}
QPushButton:hover {
    border: 1px solid #eaeded;
    background-color: #eaeded;
}
QPushButton:hover:pressed {
    border: 1px solid #b2babb;
    background-color: qlineargradient(
        x1: 0, y1: 0, x2: 0.5, y2: 0.5,
        stop: 0 #eaeded, stop: 1 #b2babb
    );
}

#blue {
    border: 1px solid #9bc4e2;  
    background-color: #9bc4e2;
}
#blue:hover {
    border: 1px solid #81a9c5;
    background-color: #81a9c5;
}
#blue:hover:pressed {
    border: 1px solid #6d90a8;
    background-color: qlineargradient(
        x1: 0, y1: 0, x2: 0.5, y2: 0.5,
        stop: 0 #81a9c5, stop: 1 #6d90a8
    );
}

QLineEdit,
QComboBox {
    border: 1px solid gray;
    background-color: #e4ecf5;
}
QLineEdit:focus,
QComboBox:focus {
    border: 2px solid gray;
    background-color: white;
}
QLineEdit:focus:hover,
QComboBox:focus:hover {
    border: 1px solid gray;
}

QComboBox::drop-down { 
    border: 0;
}
QComboBox QAbstractItemView {
    selection-background-color: #c9cfd6;
    selection-color: black;
}
`;
const fontAndMarkup_CSS = `
QLabel,
QPushButton,
QLineEdit,
QComboBox,
QCheckBox {
    font-family: 'Trebuchet MS', 'Verdana';
    font-size: 15px;
}
#header > QLabel {
    font-size: 25px;
}
QLineEdit {
    padding-left: 3px;
}
QComboBox {
    padding-left: 5px;
}
`;
const sizes_CSS = `
#men, #tab {
    min-width: 600px;
    min-height: 550px;
}

#header {
    max-height: 70px;
}
#header > QPushButton {
    max-width: 100px;
}
QPushButton {
    min-height: 35px;
    max-height: 150px;    
}
QLineEdit,
QComboBox {
    min-height: 30px;
    max-height: 30px;
}
`;

const tableCSS = `
QTableWidget {
    selection-background-color: qlineargradient(
        x1: 0, y1: 0, x2: 0.5, y2: 0.5,
        stop: 0 #9bc4e2, stop: 1 #eff5fa
    );
}

QTableWidget QTableCornerButton::section {
    background: #eff5fa;
    border: 2px solid #eff5fa;
}

QTableWidget::indicator {
    background-color: red
}
`;

const cascadingStyleSheets = sizes_CSS + fontAndMarkup_CSS + colors_CSS + tableCSS;

function alertMsg(msg = '', title = 'Внимание') {
    const { QMessageBox, QPushButton } = require('@nodegui/nodegui');

    const alert = new QMessageBox();
    const accept = new QPushButton();

    alert.setWindowTitle(`${title}`);
    alert.setText(`${msg}`);
    accept.setText(`OK`);
    alert.addButton(accept);
    alert.exec();
}

function confirmAlertMsg(msg = '', callback = () => {}) {
    const { QMessageBox, QPushButton } = require('@nodegui/nodegui');

    const alert = new QMessageBox();
    const accept = new QPushButton();

    accept.setText(`OK`);
    alert.setWindowTitle(`Внимание`);
    alert.setText(`${msg}`);
    alert.addButton(accept);
    accept.addEventListener('clicked', () => callback());
    alert.exec();
}

function intValidation(input = new QLineEdit(), text = '') {
    let str = text.replace(/[^\d]/g, '');
    str == '' ? input.clear() : input.setText(`${str}`);
    return str;
}

module.exports = {
    tables,
    russianName,
    sqlSchema,
    cascadingStyleSheets,
    alertMsg,
    confirmAlertMsg,
    intValidation,
};