const { alertMsg } = require(`./help`);
const {
    QWidget,
    QGridLayout,
    QMessageBox,
    QTableWidget,
    QLabel,
    QLineEdit,
    QPushButton,
    QComboBox,
    QCheckBox,
    QSize
} = require('@nodegui/nodegui'); // destruction assignment

const page = {
    win: new QWidget(),
    div: new QWidget(),
    type: 'aut',
    size: new Map(),
    pos: new Map(),
    open(whatToOpen = 'aut') {
        this.initialization(whatToOpen);
        this.show(this.size);
    },
    initialization(whatToOpen = 'aut') {
        this.win = new QWidget();
        this.div = new QWidget();
        this.type = whatToOpen;
        let header, workspace;
        switch (whatToOpen) {
            case 'aut':
                this.win.setWindowTitle('BusPark & Co - Авторизация');
                this.win.setFixedSize(500, 300);
                header = autHeader();
                workspace = autWorkspace();
                break;
            case 'reg':
                this.win.setWindowTitle('BusPark & Co - Регистрация');
                this.win.setFixedSize(700, 420);
                header = regHeader();
                workspace = regWorkspace();
                break;
            case 'men':
                this.win.setWindowTitle('BusPark & Co');
                header = menHeader();
                workspace = menWorkspace();
                break;
            case 'tab':
                const title = buffer.availableTable.get(buffer.currentView);
                this.win.setWindowTitle(`BusPark & Co - ${title}`);
                header = tabHeader(title);
                workspace = tabWorkspace(buffer.currentView);
                break;
        }

        this.div.setLayout(new QGridLayout());
        this.div.layout.addWidget(header, 0, 0);
        this.div.layout.addWidget(workspace, 1, 0);
    },
    show() {
        const { cascadingStyleSheets } = require(`./help`);
        const size = this.size.get(this.type);
        const pos = this.pos.get(this.type);

        this.win.setLayout(new QGridLayout());
        this.win.layout.addWidget(this.div, 0, 0);
        this.win.setObjectName(this.type);
        this.win.setStyleSheet(cascadingStyleSheets);
        if (size != undefined) {
            if (size.width() > 1200 || size.height() > 900) {
                this.win.showMaximized();
            } else {
                this.win.show();
                this.win.resize(size.width(), size.height());

                if (pos != undefined) {
                    this.win.move(pos.x, pos.y);
                }
            }
        } else {
            this.win.show();
        }

    },
    close(callback = () => {}) {
        this.size.set(this.type, this.win.size());
        this.pos.set(this.type, this.win.pos());
        this.win.hide();
        this.win.layout.removeWidget(this.div);

        callback();
    },
}

const buffer = {
    user: {
        getData(data = new Object()) {
            this.login = data.login;
            this.employmentContractNumber = data.employmentContractNumber;
            this.accessLevel = data.accessLevel;
            this.authorization_ID = data.authorization_ID;
            this.employees_ID = data.employees_ID;
        }
    },
    freeAccount: [new String()],
    currentView: new String(),
    availableTable: new Map(),
    getAvailableTables() {
        const { tables, russianName } = require('./help');
        const array = tables.get('all');

        for (let i = 0; i < array.length; i++) {
            if (this.user.accessLevel >= tables.get(`${array[i]}.status`)) {
                this.availableTable.set(array[i], russianName.get(array[i]));
            }
        }
    }
}

main();

function main() {
    programFilesCheck(() => page.open('aut'));
    global.page = page;
}

function autHeader() {
    const header = new QWidget();
    const title = new QLabel();

    title.setText('Автобусный парк');
    header.setObjectName('header');

    header.setLayout(new QGridLayout);
    header.layout.addWidget(title, 0, 0);

    return header;
}

function regHeader() {
    return anyHeader('Назад', 'Добро пожаловать!', 'aut');
}

function menHeader() {
    return anyHeader('Выйти', 'Автобусный парк', 'aut');
}

function tabHeader(currentView = '') {
    return anyHeader('Назад', currentView, 'men');
}

function anyHeader(back_text = '', title_text = '', whatToOpen = '') {
    const header = new QWidget();
    const back_button = new QPushButton();
    const title_label = new QLabel();

    back_button.setText(back_text);
    title_label.setText(`| ${title_text}`);

    header.setObjectName(`header`);
    back_button.setObjectName(`blue`);

    header.setLayout(new QGridLayout);
    header.layout.addWidget(back_button, 0, 0);
    header.layout.addWidget(title_label, 0, 1);

    back_button.addEventListener('clicked', () => {
        page.close(() => page.open(whatToOpen));
    });
    return header;
}

function autWorkspace() {
    const workspace = new QWidget();
    const login = new QLineEdit();
    const passw = new QLineEdit();
    const logIn_button = new QPushButton();
    const toReg_button = new QPushButton();

    login.setPlaceholderText(`Логин`);
    passw.setPlaceholderText(`Пароль`);
    logIn_button.setText(`Войти`);
    toReg_button.setText(`Зарегистрироваться`);

    passw.setEchoMode(2);
    workspace.setObjectName('workspace');
    logIn_button.setObjectName('blue');
    toReg_button.setObjectName('blue');

    workspace.setLayout(new QGridLayout);
    workspace.layout.addWidget(login, 0, 0);
    workspace.layout.addWidget(passw, 1, 0);
    workspace.layout.addWidget(logIn_button, 2, 0);
    workspace.layout.addWidget(toReg_button, 3, 0);

    logIn_button.addEventListener('clicked', () => {
        checkAuthorization(login.text(), passw.text());
    });
    toReg_button.addEventListener(`clicked`, () => {
        checkFreeAccount();
    });
    return workspace;
}

function regWorkspace() {
    const workspace = new QWidget();
    const mainDiv = new QWidget();
    const submitDiv = new QWidget();
    const empID_label = new QLabel();
    const login_label = new QLabel();
    const passw_label = new QLabel();
    const passR_label = new QLabel();
    const empID = new QComboBox();
    const login = new QLineEdit();
    const passw = new QLineEdit();
    const passR = new QLineEdit();
    const information_label = new QLabel();
    const submit_button = new QPushButton();

    const infoText = 'После прохождения верификации вы сможете войти в систему.\n' +
        'Если вы потеряете доступ к системе, обратитесь к системному администратору.';
    empID_label.setText('Номер т/д:');
    login_label.setText('Логин:');
    passw_label.setText('Пароль:');
    passR_label.setText('Повторите пароль:');
    empID.addItems(buffer.freeAccount);
    login.setPlaceholderText(`Логин`);
    passw.setPlaceholderText(`Пароль`);
    passR.setPlaceholderText(`Повторите пароль`);
    information_label.setText(infoText);
    submit_button.setText(`Зарегистрироваться`);

    workspace.setObjectName(`workspace`);
    submit_button.setObjectName(`blue`);
    passw.setEchoMode(2);
    passR.setEchoMode(2);

    mainDiv.setLayout(new QGridLayout());
    mainDiv.layout.addWidget(empID_label, 0, 0);
    mainDiv.layout.addWidget(login_label, 1, 0);
    mainDiv.layout.addWidget(passw_label, 2, 0);
    mainDiv.layout.addWidget(passR_label, 3, 0);
    mainDiv.layout.addWidget(empID, 0, 1);
    mainDiv.layout.addWidget(login, 1, 1);
    mainDiv.layout.addWidget(passw, 2, 1);
    mainDiv.layout.addWidget(passR, 3, 1);

    submitDiv.setLayout(new QGridLayout());
    submitDiv.layout.addWidget(information_label, 0, 0);
    submitDiv.layout.addWidget(submit_button, 1, 0);

    workspace.setLayout(new QGridLayout());
    workspace.layout.addWidget(mainDiv, 0, 0);
    workspace.layout.addWidget(submitDiv, 1, 0);

    submit_button.addEventListener('clicked', () => {
        checkRegistration(login.text(), passw.text(), passR.text(), empID.currentText());
    });

    return workspace;
}

function menWorkspace() {
    const workspace = new QWidget();
    workspace.setLayout(new QGridLayout());
    workspace.setObjectName('workspace');

    let i = 0;
    buffer.availableTable.forEach((value, key) => {
        const button = new QPushButton();

        button.setText(value);
        button.setObjectName('blue');
        button.setInlineStyle('font-size: 20px;');

        workspace.layout.addWidget(button, i++, 0);

        button.addEventListener('clicked', () => {
            buffer.currentView = key;
            page.close(() => page.open('tab'));
        });
    });

    return workspace;
}

function tabWorkspace() {
    const { table } = require('./table');
    const workspace = new QWidget();
    const buttons_div = new QWidget();
    const table_div = new QWidget();
    const refreshButton = new QPushButton();
    const sortingButton = new QPushButton();
    const showColumnButton = new QPushButton();
    const deleteRowButton = new QPushButton();

    refreshButton.setText(`Обновить`);
    showColumnButton.setText(`Поля`);
    sortingButton.setText(`Сортировка`);
    deleteRowButton.setText(`Удалить`);
    workspace.setObjectName('workspace');

    buttons_div.setLayout(new QGridLayout());
    buttons_div.layout.addWidget(refreshButton, 0, 0);
    buttons_div.layout.addWidget(showColumnButton, 0, 1);
    buttons_div.layout.addWidget(sortingButton, 0, 2);
    buttons_div.layout.addWidget(deleteRowButton, 0, 3);

    table_div.setLayout(new QGridLayout());
    table.initialization(buffer.currentView, table_div);

    workspace.setLayout(new QGridLayout());
    workspace.layout.addWidget(buttons_div, 0, 0);
    workspace.layout.addWidget(table_div, 1, 0);

    refreshButton.addEventListener(`clicked`, () => {
        table.initialization(buffer.currentView, table_div);
    });

    showColumnButton.addEventListener(`clicked`, () => {
        table.addHiding();
    });

    sortingButton.addEventListener(`clicked`, () => {
        table.addSorting();
    });

    deleteRowButton.addEventListener(`clicked`, () => {
        table.addDelete();
    });

    return workspace;
}

function programFilesCheck(callback = () => {}) {
    const fs = require('fs');

    fs.access(`${process.env.APPDATA}/BusPark/`, fs.F_OK, (err) => {
        if (err) {
            fs.mkdirSync(`${process.env.APPDATA}/BusPark/`);
        }
        const { getAnyData, fill_db } = require(`./sqlInj`);

        getAnyData((result) => {
            if (result == 0) {
                const { sqlSchema } = require('./help');
                fill_db(sqlSchema, () => callback());
            } else {
                callback();
            }
        });
    });
}

function checkAuthorization(login = '', password = '') {
    const { getAuthorizationData } = require('./sqlInj');

    if (login == '' || password == '') {
        return alertMsg(`Не оставляйте поля пустыми!`);
    }

    getAuthorizationData(login, password, (rows) => {
        buffer.user.getData(rows[0]);
        buffer.getAvailableTables();
        page.close(() => page.open('men'));
    });
}

function checkFreeAccount() {
    const { getFreeAccount } = require('./sqlInj');

    getFreeAccount((result) => {
        buffer.freeAccount = result;
        page.close(() => page.open('reg'));
    });
}

function checkRegistration(login = '', password = '', passwordRep = '', empID = '') {
    const { getRegistrationData, insertUser } = require('./sqlInj');

    if (login == '' || password == '' || passwordRep == '') {
        return alertMsg(`Не оставляйте поля пустыми!`);
    }
    if (passwordRep != password) {
        return alertMsg(`Пароли не совпадают!`);
    }

    getRegistrationData(login, () => {
        insertUser(login, password, empID, () => {
            page.close(() => page.open('aut'));
        });
    });
}