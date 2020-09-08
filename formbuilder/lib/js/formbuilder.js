function buildform(myform = "", data = "") {
  const json = JSON.parse(data);
  let form = json["form"];
  var formats = {},
    sldt = {},
    tagform = document.getElementById(myform);
  tagform.innerHTML +=
    '<div class="formhead"><h2 id="judulform">' +
    json["judul"] +
    '</h2><div id="deskripsiform">' +
    json["deskripsi"] +
    '</div><br><span class="wajib">* Wajib</span></div>';

  let content = document.createElement("div");
  content.setAttribute("class", "formcontent");
  for (var k in form) {
    //console.log("> " + k + " = " + form[k]["pertanyaan"]);
    let tag = k.split("-");

    let wrap = document.createElement("div");
    let label;
    if (tag[0] == "judul") {
      label = document.createElement("h3");
      wrap.setAttribute("class", "subjudul");
    } else {
      label = document.createElement("label");
      wrap.setAttribute("class", "form-group");
    }
    label.setAttribute("class", "pertanyaan");
    label.innerHTML =
      form[k]["pertanyaan"] +
      (form[k]["wajib"] ? ' <span class="wajib">*</span>' : "");
    wrap.appendChild(label);

    let fname = form[k]["pertanyaan"].replace(/ /g, "_");
    let deskripsi = document.createElement("p");
    deskripsi.innerHTML = form[k]["deskripsi"];
    deskripsi.setAttribute("class", "deskripsi");
    wrap.appendChild(deskripsi);

    if (form[k]["data"].length === 0 || tag[0] == "select") {
      let input;
      if (tag[0] == "text") {
        input = document.createElement("input");
        input.setAttribute("name", fname);
        input.setAttribute("id", fname.replace(/ /g, "_"));
        input.setAttribute("type", "text");
        input.setAttribute("placeholder", "Jawaban Anda");
        input.setAttribute("class", "form-control");
      } else if (tag[0] == "textarea") {
        input = document.createElement("textarea");
        input.setAttribute("name", fname);
        input.setAttribute("id", fname.replace(/ /g, "_"));
        input.setAttribute("placeholder", "Jawaban Anda");
        input.setAttribute("class", "form-control");
      } else if (tag[0] == "select") {
        input = document.createElement("input");
        input.setAttribute("name", fname);
        input.setAttribute("id", fname.replace(/ /g, "_"));
        input.setAttribute("class", "form-select");
        input.setAttribute("placeholder", "Pilih Jawaban");
        sldt[tag[1]] = [];
        for (var i in form[k]["data"]) {
          sldt[tag[1]][i] = {
            id: form[k]["data"][i],
            text: form[k]["data"][i]
          };
        }
        if (!form[k]["wajib"]) {
          sldt[tag[1]].push({
            id: "Kosong",
            text: "Kosong"
          });
        }
        $(function() {
          $("#" + fname.replace(/ /g, "_")).select2({
            data: sldt[tag[1]]
          });
        });
      }
      if (form[k]["wajib"]) {
        input.setAttribute("required", "required");
      }
      wrap.appendChild(input);
    } else {
      let input;
      if (tag[0] == "opsi") {
        let btlopt = document.createElement("span");
        btlopt.setAttribute("id", "btlopsi-" + tag[1]);
        btlopt.setAttribute("class", "btn btlopt");
        btlopt.setAttribute("style", "display:none;");
        btlopt.innerHTML = "Batalkan pilihan";
        btlopt.addEventListener("click", function() {
          this.style.display = "none";
          let ck = document.querySelectorAll('input[name="' + fname + '"]');
          for (let c = 0; c < ck.length; c++) {
            ck[c].checked = false;
          }
        });
        wrap.appendChild(btlopt);
      }
      for (var i in form[k]["data"]) {
        if (tag[0] == "opsi") {
          input = document.createElement("input");
          input.setAttribute("name", fname);
          input.setAttribute("type", "radio");
          input.setAttribute("value", form[k]["data"][i]);
          input.addEventListener("click", function() {
            if (!form["opsi-" + tag[1]]["wajib"]) {
              document.getElementById("btlopsi-" + tag[1]).style.display =
                "block";
            }
          });
        } else if (tag[0] == "check") {
          input = document.createElement("input");
          input.setAttribute("name", fname + "[]");
          input.setAttribute("type", "checkbox");
          input.setAttribute("value", form[k]["data"][i]);
          input.addEventListener("click", function() {
            let ck = document.querySelectorAll('input[name="' + fname + '[]"]');
            let jmlck = 0;
            for (let c = 0; c < ck.length; c++) {
              ck[c].removeAttribute("required");
              if (ck[c].checked) {
                jmlck++;
              }
            }
            if (jmlck == 0) {
              ck[0].setAttribute("required", "required");
            }
          });
        } else if (tag[0] == "tanggal") {
          input = document.createElement("div");
          input.setAttribute("class", "input-group tanggal");
          input.setAttribute("id", "tanggal" + tag[1]);
          input.innerHTML =
            '<input type="text" class="form-control intanggal" name="' +
            fname +
            '" value="" placeholder="' +
            form[k]["data"][i] +
            '" ' +
            (form[k]["wajib"] ? 'required="required"' : "") +
            '/><span class="input-group-addon"><span class="glyphicon glyphicon-calendar"></span></span>';
          formats[tag[1]] = form[k]["data"][i];
          $(function() {
            $("#tanggal" + tag[1]).datetimepicker({
              viewMode: "years",
              format: formats[tag[1]]
            });
          });
        } else if (tag[0] == "waktu") {
          input = document.createElement("div");
          input.setAttribute("class", "input-group jam");
          input.setAttribute("id", "waktu" + tag[1]);
          input.innerHTML =
            '<input type="text" class="form-control injam" name="' +
            fname +
            '" value="" placeholder="' +
            form[k]["data"][i] +
            '" ' +
            (form[k]["wajib"] ? 'required="required"' : "") +
            '/><span class="input-group-addon"><span class="glyphicon glyphicon-time"></span></span>';
          formats[tag[1]] = form[k]["data"][i];
          $(function() {
            $("#waktu" + tag[1]).datetimepicker({
              format: formats[tag[1]]
            });
          });
        } else if (tag[0] == "judul") {
          input = document.createElement("span");
          input.innerHTML = form[k]["data"][i];
        }
        if (form[k]["wajib"]) {
          input.setAttribute("required", "required");
        }

        let labelp = document.createElement("label");
        labelp.setAttribute("class", "pilihan");
        labelp.appendChild(input);
        if (tag[0] === "opsi" || tag[0] === "check") {
          let span = document.createElement("span");
          span.innerHTML = form[k]["data"][i];
          labelp.appendChild(span);
        }
        wrap.appendChild(labelp);
      }
    }
    content.appendChild(wrap);
  }

  tagform.appendChild(content);

  let submit = document.createElement("input");
  submit.setAttribute("type", "submit");
  submit.setAttribute("value", "Kirim");
  submit.setAttribute("class", "btn btn-info send");
  tagform.appendChild(submit);
}
