var dragSrcEl = null,
  no = 0,
  jenis = 0,
  opsi = [],
  check = [],
  select = [];
let json = {};
var items = document.querySelectorAll(".container .box");

function handleDragStart(e) {
  this.style.opacity = "0.4";

  dragSrcEl = this;

  e.dataTransfer.effectAllowed = "move";
  e.dataTransfer.setData("text/html", this.innerHTML);
}

function handleDragOver(e) {
  if (e.preventDefault) {
    e.preventDefault();
  }

  e.dataTransfer.dropEffect = "move";

  return false;
}

function handleDragEnter(e) {
  this.classList.add("over");
}

function handleDragLeave(e) {
  this.classList.remove("over");
}

function handleDrop(e) {
  if (e.stopPropagation) {
    e.stopPropagation(); // stops the browser from redirecting.
  }

  if (dragSrcEl != this) {
    dragSrcEl.innerHTML = this.innerHTML;
    this.innerHTML = e.dataTransfer.getData("text/html");
  }

  return false;
}

function handleDragEnd(e) {
  this.style.opacity = "1";

  items = document.querySelectorAll(".container .box");
  items.forEach(function(item) {
    item.classList.remove("over");
  });
}

function addform(pertanyaan = "", deskripsi = "", checked = "") {
  $("#formcont").append(
    '<div draggable="true" class="dragcontent box" id="dragaable-' +
      no +
      '"><div class="rmr" onclick="this.parentNode.parentNode.removeChild(this.parentNode);" style="position: absolute;right: 0px;top: 0px;border-top-right-radius: 0px;">&times;</div><br/><input type="text" id="pertanyaan-' +
      no +
      '" class="input pertanyaan" value="' +
      pertanyaan +
      '" placeholder="Pertanyaan" onkeyup="this.setAttribute(\'value\',this.value);"/><input type="text" placeholder="Deskripsi (opsional)" id="deskripsi-' +
      no +
      '" class="input deskripsi" value="' +
      deskripsi +
      '" onkeyup="this.setAttribute(\'value\',this.value);"/><div class="item" name="item-' +
      no +
      '" id="item-' +
      no +
      '"></div><select class="form-control jnsper" name="jnsper-' +
      no +
      '" id="jnsper-' +
      no +
      '" style="width:160px;" onchange="setjns(\'' +
      no +
      '\')"><option value="input">Jawaban Singkat</option><option value="textarea">Paragraf</option><option value="radio">Pilihan Ganda</option><option value="checkbox">Kotak Centang</option><option value="select">Drop-down</option><option value="tanggal">Tanggal</option><option value="waktu">Waktu</option><option value="file">File</option><option value="password">Password</option><option disabled>────────────</option><option value="judul">Tambahkan Judul</option></select><div class="wajibisi" id="wajibisi-' +
      no +
      '">Wajib diisi <label class="switch"><input type="checkbox" class="wajib" id="wajib-' +
      no +
      '" onchange=\'(this.checked?this.setAttribute("checked","checked"):this.removeAttribute("checked"));\' ' +
      checked +
      '><span class="slider round"></span></label></div></div>'
  );

  var item = document.getElementById("dragaable-" + no);
  item.addEventListener("dragstart", handleDragStart, false);
  item.addEventListener("dragenter", handleDragEnter, false);
  item.addEventListener("dragover", handleDragOver, false);
  item.addEventListener("dragleave", handleDragLeave, false);
  item.addEventListener("drop", handleDrop, false);
  item.addEventListener("dragend", handleDragEnd, false);
  setjns(no, "1");
  no++;
}

function setjns(no, n = "") {
  let se = document.getElementById("jnsper-" + no);
  for (var i = 0; i < se.options.length; i++) {
    se.options[i].removeAttribute("selected");
  }
  if (n != "") {
    se.options[jenis].setAttribute("selected", "true");
  } else {
    se.options[se.selectedIndex].setAttribute("selected", "true");
    jenis = se.selectedIndex;
  }

  makeInput(no, se.value);
}
function makeInput(no, inp) {
  let tag = "";
  opsi[no] = 0;
  check[no] = 0;
  select[no] = 0;

  document
    .getElementById("pertanyaan-" + no)
    .setAttribute("placeholder", "Pertanyaan");
  document
    .getElementById("deskripsi-" + no)
    .setAttribute("style", "display:block;");
  document
    .getElementById("wajibisi-" + no)
    .setAttribute("style", "display:block;");
  switch (inp) {
    case "input":
      tag =
        '<div class="jawabansingkat" id="text-' +
        no +
        '">Teks jawaban singkat</div>';
      break;
    case "file":
      tag = '<div id="file-' + no + '"><input type="file" disabled/></div>';
      break;
    case "password":
      tag =
        '<div class="jawabansingkat" id="password-' +
        no +
        '">Masukan Password</div>';
      break;
    case "textarea":
      tag =
        '<div class="jawabanpanjang" id="textarea-' +
        no +
        '">Teks jawaban panjang</div>';
      break;
    case "radio":
      opsi[no] = 1;
      tag =
        '<div class="radios" id="opsi-' +
        no +
        '"><div style="display:block;position:relative;"><input type="radio" name="opsi' +
        no +
        '" disabled/><input type="text" class="input rdval" value="Opsi ' +
        opsi[no] +
        '" onkeyup="this.setAttribute(\'value\',this.value);"/><div class="rmr" onclick="opsi[' +
        no +
        ']--;this.parentNode.parentNode.removeChild(this.parentNode);">&times;</div></div></div><a href="javascript:addopsi(' +
        no +
        ')">Tambahkan opsi</a>';
      break;
    case "checkbox":
      check[no] = 1;
      tag =
        '<div class="checks" id="check-' +
        no +
        '"><div style="display:block;position:relative;"><input type="checkbox" name="check' +
        no +
        '" disabled/><input type="text" class="input rdval" value="Opsi ' +
        check[no] +
        '" onkeyup="this.setAttribute(\'value\',this.value);"/><div class="rmr" onclick="check[' +
        no +
        ']--;this.parentNode.parentNode.removeChild(this.parentNode);">&times;</div></div></div><a href="javascript:addcheck(' +
        no +
        ')">Tambahkan opsi</a>';
      break;
    case "select":
      select[no] = 1;
      tag =
        '<ol class="selects" id="select-' +
        no +
        '"><li style="position:relative;"><input type="text" class="input rdval" value="Opsi ' +
        select[no] +
        '" onkeyup="this.setAttribute(\'value\',this.value);"/><div class="rmr" onclick="select[' +
        no +
        ']--;this.parentNode.parentNode.removeChild(this.parentNode);">&times;</div></li></ol><a href="javascript:addselect(' +
        no +
        ')">Tambahkan opsi</a>';
      break;
    case "tanggal":
      tag =
        '<div class="input-group tanggal" id="tanggal-' +
        no +
        '"><input type="text" class="form-control readopen" id="intanggal-' +
        no +
        '" value="DD-MM-YYYY" readonly/><span class="input-group-addon"><span class="glyphicon glyphicon-calendar"></span></span></div>';
      break;
    case "waktu":
      tag =
        '<div class="input-group jam" id="waktu-' +
        no +
        '"><input type="text" class="form-control readopen" id="inwaktu-' +
        no +
        '" value="HH:mm" readonly/><span class="input-group-addon"><span class="glyphicon glyphicon-time"></span></span></div><label style="font-weight:normal;"><input type="checkbox" id="chwaktu-' +
        no +
        '" onchange=\'if(this.checked){this.setAttribute("checked","checked");document.getElementById("inwaktu-' +
        no +
        '").setAttribute("value","HH:mm:ss");}else{this.removeAttribute("checked");document.getElementById("inwaktu-' +
        no +
        '").setAttribute("value","HH:mm");}\'/> Tambahkan detik</label>';
      break;
    case "judul":
      document
        .getElementById("pertanyaan-" + no)
        .setAttribute("placeholder", "Judul");
      document
        .getElementById("deskripsi-" + no)
        .setAttribute("style", "display:none;");
      document
        .getElementById("wajibisi-" + no)
        .setAttribute("style", "display:none;");
      tag =
        '<div class="input-group" style="width:100%;" id="judul-' +
        no +
        '"><input type="text" value="" style="display:none;" id="injudul-' +
        no +
        '"/><div class="jawabanpanjang editableDiv" contentEditable="true" placeholder="Deskripsi (opsional)" onkeyup=\'document.getElementById("injudul-' +
        no +
        '").setAttribute("value",this.innerHTML);\'></div></div>';
      break;
    default:
      tag = '<div class="jawabansingkat">Teks jawaban singkat</div>';
  }

  $("#item-" + no).html(tag);
}

function addopsi(no) {
  opsi[no]++;
  $("#opsi-" + no).append(
    '<div style="display:block;position:relative;"><input type="radio" name="opsi' +
      no +
      '" disabled/><input type="text" class="input rdval" value="Opsi ' +
      opsi[no] +
      '" id="pin-' +
      no +
      "-" +
      opsi[no] +
      '" onkeyup="this.setAttribute(\'value\',this.value);"/><div class="rmr" onclick="opsi[' +
      no +
      ']--;this.parentNode.parentNode.removeChild(this.parentNode);">&times;</div></div>'
  );
}

function addcheck(no) {
  check[no]++;
  $("#check-" + no).append(
    '<li style="display:block;position:relative;"><input type="checkbox" disabled/><input type="text" class="input rdval" value="Opsi ' +
      check[no] +
      '" id="pin-' +
      no +
      "-" +
      check[no] +
      '" onkeyup="this.setAttribute(\'value\',this.value);"/><div class="rmr" onclick="check[' +
      no +
      ']--;this.parentNode.parentNode.removeChild(this.parentNode);">&times;</div></li>'
  );
}

function addselect(no) {
  select[no]++;
  $("#select-" + no).append(
    '<li style="position:relative;"><input type="text" class="input rdval" value="Opsi ' +
      select[no] +
      '" id="pin-' +
      no +
      "-" +
      select[no] +
      '" onkeyup="this.setAttribute(\'value\',this.value);"/><div class="rmr" onclick="select[' +
      no +
      ']--;this.parentNode.parentNode.removeChild(this.parentNode);">&times;</div></li>'
  );
}

document.addEventListener(
  "mousedown",
  function(event) {
    var clickedElem = event.target;
    if (!clickedElem.classList.contains("dragcontent")) {
      if (clickedElem.classList.value != null) {
        var elms = document.getElementsByClassName("dragcontent");
        for (var i = 0; i < elms.length; i++) {
          elms[i].setAttribute("draggable", false);
        }
      }
    } else {
      clickedElem.setAttribute("draggable", true);
    }
  },
  false
);

function tojson() {
  json = {};
  json["judul"] = document.getElementById("ftitle").value;
  json["deskripsi"] = document.getElementById("fdeskripsi").innerHTML;
  json["form"] = [];
  let nj = 0;
  let p = document.querySelectorAll(".pertanyaan");
  p.forEach(function(i) {
    let n = i.id.split("-");
    let pertanyaan = document.getElementById("pertanyaan-" + n[1]).value;
    let deskripsi = document.getElementById("deskripsi-" + n[1]).value;
    let wajib = document.getElementById("wajib-" + n[1]).checked;
    let iditem = document.getElementById("item-" + n[1]).firstChild.id;
    let item = iditem.split("-");
    json["form"][nj] = {};
    json["form"][nj]["type"] = item[0];
    json["form"][nj]["pertanyaan"] = pertanyaan;
    json["form"][nj]["deskripsi"] = deskripsi;
    json["form"][nj]["wajib"] = wajib;
    json["form"][nj]["data"] = [];
    let c = document.querySelectorAll("#" + iditem + " input[type=text]");
    c.forEach(function(j) {
      json["form"][nj]["data"].push(j.value);
    });
    nj++;
  });

  // console.log(json);
  // console.log(JSON.stringify(json));

  document.getElementById("modaljson").value = JSON.stringify(json);
  return JSON.stringify(json);
}

// ADD FORM
addform();
// EDIT MODE ========================================

function loadform() {
  no = 0;
  jenis = 0;
  opsi = [];
  check = [];
  select = [];
  document.getElementById("formcont").innerHTML = "";
  let data = document.getElementById("modaljson").value;
  editing(data);
}

function editing(data = "") {
  const djson = JSON.parse(data);

  document.getElementById("ftitle").value = djson["judul"];
  document.getElementById("fdeskripsi").innerHTML = djson["deskripsi"];
  let form = djson["form"];
  var formats = {};

  for (var k in form) {
    let tag = form[k]["type"];
    let checkbx = form[k]["wajib"] ? "checked" : "";
    if (tag == "text") {
      jenis = 0;
    } else if (tag == "textarea") {
      jenis = 1;
    } else if (tag == "opsi") {
      jenis = 2;
    } else if (tag == "check") {
      jenis = 3;
    } else if (tag == "select") {
      jenis = 4;
    } else if (tag == "tanggal") {
      jenis = 5;
    } else if (tag == "waktu") {
      jenis = 6;
    } else if (tag == "file") {
      jenis = 7;
    } else if (tag == "password") {
      jenis = 8;
    } else if (tag == "judul") {
      jenis = 10;
    }
    addform(form[k]["pertanyaan"], form[k]["deskripsi"], checkbx);

    if (tag == "opsi") {
      opsi[k] = 0;
      document.getElementById("opsi-" + k).innerHTML = "";
      for (var i in form[k]["data"]) {
        addopsi(k);
        document
          .getElementById("pin-" + k + "-" + (parseInt(i) + 1))
          .setAttribute("value", form[k]["data"][i]);
      }
    } else if (tag == "check") {
      check[k] = 0;
      document.getElementById("check-" + k).innerHTML = "";
      for (var i in form[k]["data"]) {
        addcheck(k);
        document
          .getElementById("pin-" + k + "-" + (parseInt(i) + 1))
          .setAttribute("value", form[k]["data"][i]);
      }
    } else if (tag == "select") {
      select[k] = 0;
      document.getElementById("select-" + k).innerHTML = "";
      for (var i in form[k]["data"]) {
        addselect(k);
        document
          .getElementById("pin-" + k + "-" + (parseInt(i) + 1))
          .setAttribute("value", form[k]["data"][i]);
      }
    } else if (tag == "waktu") {
      if (form[k]["data"][0].length == 8) {
        document
          .getElementById("chwaktu-" + k)
          .setAttribute("checked", "checked");
        document
          .getElementById("inwaktu-" + k)
          .setAttribute("value", form[k]["data"][0]);
      }
    }
  }
}

function viewform() {
  let form = btoa(tojson());
  window.open("preview.html#" + form, "_blank");
}
