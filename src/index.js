const { app, BrowserWindow, ipcMain } = require("electron");
const url = require("url");
const path = require("path");
const sql = require("mssql");
var mainWindow = null;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1920,
    height: 1280,
    webPreferences: {
      nodeIntegration: true,
      nodeIntegrationInWorker: true,
    },
  });
  mainWindow.loadFile("components/propertyList/propertyList.html").catch((e) => {
    console.log(e);
  });
}
app.whenReady().then(createWindow);

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});
app.on("activate", () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});

/*
ipcMain.on("changeWindow", (e, args) => {
  console.log("changeW");
  mainWindow.loadFile("components/unit/unit.html").catch((e) => {
    console.log(e);
  });
});


*/
const config = {
  user: "wkb6",
  password: "wkb6",
  server: "134.108.190.89", // You can use 'localhost\\instance' to connect to named instance
  database: "Infosys",
};

sql.on("error", (err) => {
  // ... error handler
});


//InsertTenant(2, 'Angelo', 'Mertel', '5642250', '249862')

  // -- InsertTenant --
  // if returnValue -1, tenant already exists
function InsertTenant(unitNo, firstname, lastname, phoneNo, bankDetails){
  sql.connect(config, err => {

    new sql.Request()
      .input('unitNo', sql.Int, unitNo)
      .input('firstname', sql.VarChar(12), firstname)
      .input('lastname', sql.VarChar(12), lastname)
      .input('phoneNo', sql.VarChar(11), phoneNo)
      .input('bankDetails', sql.VarChar(16), bankDetails)
      .execute('group6_InsertTenant2', (err, result) => {
        // ... error checks

        console.dir(result)
        console.log(result)
    })
  })

  sql.on('error', err => {
      // ... error handler
  })
}

//ModifyTenant(100000010, 'Jensi', 'Spahni', '0000000', '-5555555')

// Modify tenants data (without address, balance) 
function ModifyTenant(tenantNo, firstname, lastname, phoneNo, bankDetails){
  sql.connect(config, err => {

    new sql.Request()
      .input('tenantNo', sql.Int, tenantNo)
      .input('firstname', sql.VarChar(12), firstname)
      .input('lastname', sql.VarChar(12), lastname)
      .input('phoneNo', sql.VarChar(11), phoneNo)
      .input('bankDetails', sql.VarChar(16), bankDetails)
      .execute('group6_ModifyTenant', (err, result) => {
        // ... error checks

        console.dir(result)
        console.log(result)
    })
  })

  sql.on('error', err => {
      // ... error handler
  })
}

//DeleteTenant(100000010)

// Deletes tenant by tenantNo
function DeleteTenant(tenantNo){
  sql.connect(config, err => {

    new sql.Request()
      .input('tenantNo', sql.Int, tenantNo)
      .execute('group6_DeleteTenant', (err, result) => {
        // ... error checks

        console.dir(result)
        console.log(result)
    })
  })

  sql.on('error', err => {
      // ... error handler
  })
}

getPropertyList()

function getPropertyList(){
  sql.connect(config)
    .then((pool) => {
      // Query
      return pool.request().query("SELECT * FROM group6_ProperyList");
    })
    .then((result) => {
      console.dir(result);
      console.log('PropertyList\n' + result)
    })
    .catch((err) => {
      console.log(err);
  });
}

getUnitList()

function getUnitList(){
  sql.connect(config)
    .then((pool) => {
      // Query
      return pool.request().query("SELECT * FROM group6_UnitList");
    })
    .then((result) => {
      console.dir(result);
      console.log('UnitList\n' + result)
    })
    .catch((err) => {
      console.log(err);
  });
}

getUnitDetails()

function getUnitDetails(){
  sql.connect(config)
    .then((pool) => {
      // Query
      return pool.request().query("SELECT * FROM group6_UnitDetails");
    })
    .then((result) => {
      console.dir(result);
      console.log('UnitDetails' + result)
    })
    .catch((err) => {
      console.log(err);
  });
}

getTenantWithNegativeBalance()

function getTenantWithNegativeBalance(){
  sql.connect(config)
    .then((pool) => {
      // Query
      return pool.request().query("SELECT * FROM group6_NegativeBalance");
    })
    .then((result) => {
      console.dir(result);
      console.log('TenantWithNegativeBalance' + result)
    })
    .catch((err) => {
      console.log(err);
  });
}