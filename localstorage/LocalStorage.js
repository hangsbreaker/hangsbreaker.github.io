// CREATE TABLE
function createTable(table) {
  localStorage.setItem(table, "[]");
  localStorage.setItem("inc_" + table, 0);
}
// DELETE TABLE
function dropTable(table) {
  localStorage.removeItem(table);
  localStorage.removeItem("inc_" + table);
}
// GET ID
function getById(table, rid) {
  var obj = getData(table);
  var dt = obj.find(function(item) {
    return item.id == rid;
  });
  return dt;
}
// GET LAST ID
function getLastId(table) {
  id = getData("inc_" + table);
  return id;
}

// GET DATA
function getData(table) {
  return localStorage.getItem(table) == null
    ? null
    : JSON.parse(localStorage.getItem(table));
}

// INSERT
function insertData(table, dataObj) {
  var obj = getData(table);
  var inc = localStorage.getItem("inc_" + table);
  inc = parseInt(inc) + 1;
  dataObj.id = inc;
  obj.push(dataObj);
  localStorage.setItem(table, JSON.stringify(obj));
  localStorage.setItem("inc_" + table, inc);
  return obj;
}

// UPDATE
function updateData(table, rid, dataObj) {
  var obj = getData(table);
  var dt = obj.find(function(item) {
    return item.id == rid;
  });
  // for(k in dt){if(k != 'id'){delete dt[k];}}
  if (obj.length > 0) {
    for (let k in dataObj) {
      dt[k] = dataObj[k];
    }
    localStorage.setItem(table, JSON.stringify(obj));
    return obj;
  } else {
    return "Not Found";
  }
}

// DELETE
function deleteData(table, rid) {
  var obj = getData(table);
  var dt = obj.filter(function(item, index) {
    return item.id != rid;
  });
  localStorage.setItem(table, JSON.stringify(dt));
  return dt;
}
// DELETE COLUMN
function deleteColumn(table, rid, idx) {
  var obj = getData(table);
  var dt = obj.find(function(item) {
    return item.id == rid;
  });
  if (obj.length > 0) {
    delete dt[idx];
    localStorage.setItem(table, JSON.stringify(obj));
    return obj;
  } else {
    return "Not Found";
  }
}

// FIND
function findData(tableObj, keyword) {
  keyword = keyword + "";
  var filtered = tableObj.filter(function(item, index) {
    let any = false,
      cols = "";
    for (let i in item) {
      cols = cols + " " + item[i].toString().toLowerCase();
    }

    if (cols.includes(keyword.toLowerCase())) {
      any = true;
    }

    return any;
  });

  return filtered;
}

// GET WHERE
function getWhere(tableObj, idx, value) {
  var obj = tableObj;
  var dt = obj.filter(function(item, index) {
    if (item.hasOwnProperty(idx)) {
      return (
        item[idx].toString().toLowerCase() == value.toString().toLowerCase()
      );
    } else {
      return "";
    }
  });
  return dt;
}
// GET LIKE
function getLike(tableObj, idx, value) {
  var obj = tableObj;
  var dt = obj.filter(function(item, index) {
    if (item.hasOwnProperty(idx)) {
      return item[idx]
        .toString()
        .toLowerCase()
        .includes(value.toString().toLowerCase());
    } else {
      return "";
    }
  });
  return dt;
}
