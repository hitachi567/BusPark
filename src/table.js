const { alertMsg, confirmAlertMsg, cascadingStyleSheets } = require(`./help`);
const {
    QWidget,
    QGridLayout,
    QTableWidget,
    QLabel,
    QLineEdit,
    QPushButton,
    QComboBox,
    QCheckBox,
} = require('@nodegui/nodegui'); // destruction assignment

const table = {
    name: '',
    fields: [''],
    type: new Map(),
    view: new Map(),
    hidden: new Map(),
    sorting: new Map(),
    data: [new Object()],
    widget: new QTableWidget(1, 1),
    parentWidget: new QWidget(),
    position: new Map(),
    search: new Map(),
    deletedIDs: [new Number()],
    map: new Map(),

    initialization(name = '', parentWidget = new QWidget()) {
        const { tables, russianName } = require('./help');
        this.name = name;
        this.fields = tables.get(`${name}.fields`);
        this.type = new Map();
        this.view = new Map();
        this.hidden = new Map();
        this.sorting = new Map();
        this.position = new Map();
        this.search = new Map();
        this.map = new Map();
        this.deletedIDs = [new Number()];
        this.parentWidget = parentWidget;
        for (let i = 0; i < this.fields.length; i++) {
            const element = this.fields[i];
            const view = russianName.has(element) ? russianName.get(element) : element;

            this.view.set(element, view);
            this.hidden.set(element, 2);
            this.sorting.set(element, 2);

            if (tables.has(`${table.name}.${element}`)) {
                const type = tables.get(`${table.name}.${element}`)
                this.type.set(element, type);
            }
        }

        const { getTable } = require('./sqlInj');
        getTable(`SELECT * FROM ${name}`, (rows) => {
            this.data = rows;
            this.widget = new QTableWidget(rows.length + 2, this.fields.length);
            setHeaderLabels(rows.length);
            this.setParent(parentWidget);
            createTable(rows);
        });
    },
    reinitialization() {
        this.initialization(this.name, this.parentWidget);
    },
    refresh(rows = [new Object]) {
        this.data = rows;
        this.widget.hide();
        this.widget = new QTableWidget(rows.length + 2, this.fields.length);
        setHeaderLabels(rows.length);
        this.setParent(this.parentWidget);
        createTable(rows);

        this.hidden.forEach((value, key) => {
            if (value == 0) this.hideColumn(key);
        });
    },
    hideColumn(field = '') {
        this.widget.hideColumn(this.position.get(field));
    },
    showColumn(field = '') {
        this.widget.showColumn(this.position.get(field));
    },
    sortByColumn(field = '', order = 0) {
        this.widget.sortByColumn(this.position.get(field), order)
    },
    setParent(parentWidget = new QWidget()) {
        parentWidget.layout.addWidget(this.widget, 0, 0);
    },
    addSorting() {
        sortingForm();
    },
    addHiding() {
        displayedFieldsForm();
    },
    addDelete() {
        identificationRows(() => {
            createConfirmMsg(() => {
                deleteRows(() => {
                    table.reinitialization();
                });
            });
        });
    }
}

module.exports = {
    table
};

function setHeaderLabels(countRows = 0) {
    const horizontal = [];
    const vertical = [];

    table.view.forEach(value => horizontal.push(value));

    vertical.push('');
    for (let i = 0; i < countRows; i++) {
        vertical.push(`${i + 1}`);
    }
    vertical.push('');

    table.widget.setHorizontalHeaderLabels(horizontal);
    table.widget.setVerticalHeaderLabels(vertical);
}

function createTable() {
    const fields = table.fields;

    for (let i = 0; i < table.data.length; i++) {
        for (let j = 0; j < fields.length; j++) {
            const this_data = (table.data[i][fields[j]] == null) ? '' : `${table.data[i][fields[j]]}`;
            const cell = new QLabel();
            const cellView = new QWidget();
            cellView.setLayout(new QGridLayout());
            cell.setText(this_data);
            cell.setAlignment(`AlignCenter`);
            cellView.layout.addWidget(cell);
            table.widget.setCellWidget(i + 1, j, cellView);

            table.map.set(`${i},${j}`, {
                ID: table.data[i].ID,
                field: fields[j]
            });
        }
    }

    for (let j = 0; j < fields.length; j++) {
        const voidSpace = new QLabel();
        voidSpace.setText(`Click for add`);
        voidSpace.setAlignment(`AlignCenter`);
        voidSpace.setInlineStyle(`color: gray;`);

        table.widget.setCellWidget(0, j, search(fields[j]));
        table.widget.setCellWidget(table.data.length + 1, j, voidSpace);
        table.position.set(fields[j], j);
    }

    table.widget.resizeColumnsToContents();
    table.widget.resizeRowsToContents();

    doubleClickListener();
}

function doubleClickListener() {
    table.widget.addEventListener('cellDoubleClicked', (row, column) => {
        if (row != 0 && row == table.data.length + 1) {
            const { addRow } = require('./sqlInj');
            addRow(table.name, table.data, () => {
                table.reinitialization();
            });

        } else if (row != 0 && row < table.data.length + 1) {
            const currentRow = table.data[row - 1];
            const currentCell = table.map.get(`${row - 1},${column}`);
            editForm(currentRow, currentCell, () => {
                table.reinitialization();
            });
        }
    });
}

// hide fields
function displayedFieldsForm() {
    const { fields } = table;
    const form = new QWidget();
    form.setMinimumSize(200, 350);
    // form.setWindowFlag(9, true);
    form.setLayout(new QGridLayout);

    for (let i = 0; i < fields.length; i++) {
        const element = fields[i];
        const label = new QLabel();
        const checkBox = new QCheckBox();

        label.setText(table.view.get(element));
        checkBox.setCheckState(table.hidden.get(element));

        form.layout.addWidget(label, i, 0);
        form.layout.addWidget(checkBox, i, 1);

        checkBox.addEventListener('stateChanged', (state) => {
            table.hidden.set(element, state);
            if (state == 0) {
                table.hideColumn(element);
            } else {
                table.showColumn(element);
            }
        });
    }

    form.setStyleSheet(cascadingStyleSheets);
    form.show();
    global.form = form;
}

// search
function search(field = '') {
    const search = new QLineEdit();
    search.setPlaceholderText(`Поиск`);

    const currentSearch = table.search.get(field);
    if (currentSearch == '') {
        search.clear();
    } else if (currentSearch != null) {
        search.setText(currentSearch);
    }

    search.addEventListener(`textEdited`, (text) => {
        let str = text;
        if (table.type.get(field) == 'int') {
            const { intValidation } = require('./help');
            str = intValidation(search, text);
        }
        table.search.set(field, str);
        if (str == '' || str == ' ') {
            table.search.delete(field);
        }
        generationQuery();
    });
    return search;
}

// sorting
function sortingForm() {
    const { fields } = table;
    const form = new QWidget();
    form.setMinimumSize(200, 350);
    // form.setWindowFlag(9, true);
    form.setLayout(new QGridLayout);

    for (let i = 0; i < fields.length; i++) {
        const element = fields[i];
        const label = new QLabel();
        const comboBox = new QComboBox();

        label.setText(table.view.get(element));
        comboBox.addItems(['По возростанию', 'По убыванию', '(нет)']);
        comboBox.setCurrentIndex(table.sorting.get(element));

        form.layout.addWidget(label, i, 0);
        form.layout.addWidget(comboBox, i, 1);

        comboBox.addEventListener('currentIndexChanged', (index) => {
            table.sorting.set(element, index);
            generationQuery();
        });
    }
    form.setStyleSheet(cascadingStyleSheets);
    form.show();
    global.form = form;
}

// refresh
function generationQuery() {
    let sql = 'SELECT * FROM ' + table.name;
    const sorting = sortingMap();

    if (table.search.size != 0) {
        sql += search();
    }
    if (sorting.size != 0) {
        sql += order(sorting);
    }

    if (table.search.size != 0) {
        const { getTableWithSearch } = require('./sqlInj');
        let obj = new Object();
        table.search.forEach((value, key) => {
            obj[`$${key}`] = `%${value}%`;
        });
        getTableWithSearch(sql, obj, (rows) => {
            table.refresh(rows);
        });
    } else {
        const { getTable } = require('./sqlInj');
        getTable(sql, (rows) => {
            table.refresh(rows);
        });
    }

    function search(i = 0) {
        let result = '\nWHERE ';
        table.search.forEach((value, key) => {
            result += key + ' LIKE $' + key;
            result += i < table.search.size - 1 ? ' AND ' : '';
            i++;
        });
        return result;
    }

    function sortingMap() {
        const sortingMap = new Map();
        table.sorting.forEach((value, key) => {
            if (value == 0) {
                sortingMap.set(key, 'ASC');
            } else if (value == 1) {
                sortingMap.set(key, 'DESC');
            }
        });
        return sortingMap;
    }

    function order(sortingMap = new Map(), i = 0) {
        let result = '\nORDER BY ';
        sortingMap.forEach((value, key) => {
            result += key + ' ' + value;
            result += i < sortingMap.size - 1 ? ', ' : '';
            i++;
        });
        return result;
    }
}

// edit
function editForm(row = new Object(), cell = { ID: 0, field: '' }, callbackInit = () => {}) {
    const { fields } = table;
    const changedMap = new Map();

    const form = new QWidget();
    const workspace = new QWidget();
    const saveButton = new QPushButton();
    saveButton.setText(`Сохранить`);
    form.setLayout(new QGridLayout());
    workspace.setLayout(new QGridLayout());
    form.layout.addWidget(workspace, 0, 0);
    form.layout.addWidget(saveButton, 1, 0);

    for (let i = 0; i < fields.length; i++) {
        const label = new QLabel();
        const input = new QLineEdit();
        workspace.layout.addWidget(label, i, 0);
        workspace.layout.addWidget(input, i, 1);

        label.setText(`${table.view.get(fields[i])}: `);
        input.setPlaceholderText(`${table.view.get(fields[i])}`);

        if (fields[i] == cell.field) {
            input.setFocus(0);
        }
        if (row[fields[i]] != null) {
            input.setText(`${row[fields[i]]}`);
        }

        input.addEventListener(`textEdited`, (text) => {
            if (table.type.get(fields[i]) == 'int') {
                const { intValidation } = require('./help');
                changedMap.set(fields[i], Number(intValidation(input, text)));
            } else {
                changedMap.set(fields[i], text);
            }
        });
    }

    saveButton.addEventListener(`clicked`, () => {
        if (changedMap.size == 0) {
            alertMsg(`Изменений нет`);
            callbackInit();
        } else {
            startUpdate(changedMap, cell, () => callbackInit());
        }
        form.close();
    });
    form.setStyleSheet(cascadingStyleSheets);
    form.show();
    global.form = form;
}

function startUpdate(changedMap = new Map(), cell = { ID: 0, field: '' }, end = () => {}) {
    confirmAlert(changedMap, () => {
        const { updateRow } = require('./sqlInj');
        const index = {
            _i: 0,
            listen: (val) => {},
            get i() { return this._i; },
            set i(val) {
                this._i = val;
                this.listen(val);
            },
            eventListener: function(listen) {
                this.listen = listen;
            }
        }

        index.eventListener((val) => {
            if (val == changedMap.size) end();
        });

        changedMap.forEach((value, key) => {
            updateRow(table.name, key, cell.ID, value, () => {
                index.i = index.i + 1;
            });
        });
    });
}

function confirmAlert(changedMap = new Map(), callback = () => {}) {
    let changed = '';
    changedMap.forEach((value, key) => {
        changed += table.view.get(key) + ': ' + value + ';\n';
    });
    const text = `Вы точно хотете внести изменения?\n{\n${changed}}`
    confirmAlertMsg(text, () => callback());
}

// delete
function identificationRows(callback = () => {}) {
    if (table.widget.selectedRanges().length != 0) {
        let { topRow, bottomRow } = table.widget.selectedRanges()[0];
        if (topRow != table.data.length + 1 && bottomRow != 0) {

            if (topRow == 0) topRow++;
            if (bottomRow == table.data.length + 1) bottomRow--;

            const count = bottomRow - topRow + 1;
            const rowID = [];

            for (let i = topRow - 1; i < bottomRow; i++) {
                rowID.push(table.data[i].ID);
            }

            if (rowID.length == count) {
                table.deletedIDs = rowID;
                callback();
            } else {
                alertMsg(`Ошибка при идентификации записей`);
            }

        } else {
            alertMsg(`Для удаления выделите нужные записи`);
        }
    } else {
        alertMsg(`Для удаления выделите нужные записи`);
    }
}

function createConfirmMsg(callback = () => {}) {
    let alertString = '';
    for (let i = 0; i < table.data.length; i++) {
        for (let j = 0; j < table.deletedIDs.length; j++) {

            const element = table.data[i];
            const ID = table.deletedIDs[j];

            if (element.ID == ID) {
                list(element, ID);
            }
        }
    }

    const text = `Вы точно хотите удалить записи (${table.deletedIDs.length})?\n${alertString}`
    confirmAlertMsg(text, () => callback());

    function list(element = new Object(), ID = 0) {
        alertString += '(' + ID + '): ';
        const fields = table.fields;

        for (let i = 0; i < fields.length; i++) {
            let buffer = element[fields[i]];
            if (buffer != null) {
                alertString += buffer;
            }
            const cond = i != fields.length - 1;
            alertString += cond ? ', ' : ';\n';
        }
    }
}

function deleteRows(callback = () => {}) {
    let logs = '';
    table.deletedIDs.forEach((ID, index) => {
        const { deleteRow } = require('./sqlInj');
        deleteRow(table.name, ID, (error) => {
            if (error != null) {
                logs += `${index + 1}) Запись (${ID}) НЕ была удалена:/n${error}\n`;
            } else {
                logs += `${index + 1}) Запись (${ID}) была удалена.\n`;
            }

            if (index == table.deletedIDs.length - 1) {
                alertMsg(`Результаты:\n${logs}`);
                callback();
            }
        });
    });
}