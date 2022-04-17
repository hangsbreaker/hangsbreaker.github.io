let lang = {
  id: [
    "Wajib",
    "Jawaban Anda",
    "Pilih Jawaban",
    "Kosong",
    "Batalkan pilihan",
    "Kirim"
  ],
  en: [
    "Required",
    "Your Answer",
    "Choose an answer",
    "Blank",
    "Cancel selection",
    "Send"
  ]
};
function buildform(myform = "", data = "", lg = "en") {
  lg = lg.toLowerCase();
  const json = typeof data == "string" ? JSON.parse(data) : data;
  let form = json["form"];
  var formats = {},
    sldt = {},
    tagform = document.getElementById(myform);
  tagform.innerHTML +=
    '<div class="formhead"><h2 id="titleform">' +
    json["title"] +
    '</h2><div id="descriptionform">' +
    linkify(json["description"]) +
    '</div><br><span class="required">* ' +
    lang[lg][0] +
    "</span></div>";

  let content = document.createElement("div");
  content.setAttribute("class", "formcontent");
  var tagn = 0;
  for (var k in form) {
    let tag = [];
    tag[1] = tagn;
    tag[0] = form[tagn]["type"];
    let fname = form[tag[1]]["question"].replace(/[^A-Za-z0-9!?]/g, "");

    let wrap = document.createElement("div");
    let label;
    if (tag[0] == "title") {
      label = document.createElement("h3");
      wrap.setAttribute("class", "subtitle");
    } else {
      label = document.createElement("label");
      wrap.setAttribute("class", "form-group");
      wrap.setAttribute("id", "fg-" + fname);
    }
    label.setAttribute("class", "question");
    label.setAttribute("id", "q-" + fname);
    label.innerHTML =
      '<span id="l-' +
      fname +
      '">' +
      form[tag[1]]["question"] +
      "</span>" +
      (form[tag[1]]["required"] ? ' <span class="required">*</span>' : "");
    wrap.appendChild(label);

    let description = document.createElement("p");
    description.innerHTML = linkify(form[tag[1]]["description"]);
    description.setAttribute("class", "description");
    description.setAttribute("id", "des-" + fname);
    wrap.appendChild(description);

    if (form[tag[1]]["data"].length === 0 || tag[0] == "select") {
      let input;
      if (tag[0] == "text") {
        input = document.createElement("input");
        input.setAttribute("name", fname);
        input.setAttribute("id", fname);
        input.setAttribute("type", "text");
        input.setAttribute("placeholder", lang[lg][1]);
        input.setAttribute("class", "form-control");
      } else if (tag[0] == "password") {
        input = document.createElement("input");
        input.setAttribute("name", fname);
        input.setAttribute("id", fname);
        input.setAttribute("type", "password");
        input.setAttribute("placeholder", lang[lg][1]);
        input.setAttribute("class", "form-control");
      } else if (tag[0] == "file") {
        input = document.createElement("input");
        input.setAttribute("name", fname);
        input.setAttribute("id", fname);
        input.setAttribute("type", "file");
        input.setAttribute("class", "form-control");
      } else if (tag[0] == "textarea") {
        input = document.createElement("textarea");
        input.setAttribute("name", fname);
        input.setAttribute("id", fname);
        input.setAttribute("placeholder", lang[lg][1]);
        input.setAttribute("class", "form-control");
      } else if (tag[0] == "select") {
        input = document.createElement("input");
        input.setAttribute("name", fname);
        input.setAttribute("id", fname);
        input.setAttribute("class", "form-select");
        input.setAttribute("placeholder", lang[lg][2]);
        sldt[tag[1]] = [];
        for (var i in form[tag[1]]["data"]) {
          sldt[tag[1]][i] = {
            id: form[tag[1]]["data"][i],
            text: form[tag[1]]["data"][i]
          };
        }
        if (!form[tag[1]]["required"]) {
          sldt[tag[1]].push({
            id: lang[lg][3],
            text: lang[lg][3]
          });
        }
        $(function() {
          $("#" + fname).select2({
            data: sldt[tag[1]]
          });
        });
      }
      if (form[tag[1]]["required"]) {
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
        btlopt.innerHTML = lang[lg][4];
        btlopt.addEventListener("click", function() {
          this.style.display = "none";
          let ck = document.querySelectorAll('input[name="' + fname + '"]');
          for (let c = 0; c < ck.length; c++) {
            ck[c].checked = false;
          }
        });
        wrap.appendChild(btlopt);
      }
      for (var i in form[tag[1]]["data"]) {
        if (tag[0] == "opsi") {
          input = document.createElement("input");
          input.setAttribute("name", fname);
          input.setAttribute("id", fname + i);
          input.setAttribute("type", "radio");
          input.setAttribute("value", form[tag[1]]["data"][i]);
          input.addEventListener("click", function() {
            if (!form[tag[1]]["required"]) {
              document.getElementById("btlopsi-" + tag[1]).style.display =
                "block";
            }
          });
        } else if (tag[0] == "check") {
          input = document.createElement("input");
          input.setAttribute("name", fname + "[]");
          input.setAttribute("id", fname + i);
          input.setAttribute("type", "checkbox");
          input.setAttribute("value", form[tag[1]]["data"][i]);
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
        } else if (tag[0] == "date") {
          input = document.createElement("div");
          input.setAttribute("class", "input-group date");
          input.setAttribute("id", "date" + tag[1]);
          input.innerHTML =
            '<input type="text" class="form-control indate" name="' +
            fname +
            '" id="' +
            fname +
            '" value="" placeholder="' +
            form[tag[1]]["data"][i] +
            '" ' +
            (form[tag[1]]["required"] ? 'required="required"' : "") +
            '/><span class="input-group-addon"><span class="glyphicon glyphicon-calendar"></span></span>';
          formats[tag[1]] = form[tag[1]]["data"][i];
          $(function() {
            $("#date" + tag[1]).datetimepicker({
              viewMode: "years",
              format: formats[tag[1]]
            });
          });
        } else if (tag[0] == "time") {
          input = document.createElement("div");
          input.setAttribute("class", "input-group time");
          input.setAttribute("id", "time" + tag[1]);
          input.innerHTML =
            '<input type="text" class="form-control intime" name="' +
            fname +
            '" id="' +
            fname +
            '" value="" placeholder="' +
            form[tag[1]]["data"][i] +
            '" ' +
            (form[tag[1]]["required"] ? 'required="required"' : "") +
            '/><span class="input-group-addon"><span class="glyphicon glyphicon-time"></span></span>';
          formats[tag[1]] = form[tag[1]]["data"][i];
          $(function() {
            $("#time" + tag[1]).datetimepicker({
              format: formats[tag[1]]
            });
          });
        } else if (tag[0] == "title") {
          input = document.createElement("span");
          input.innerHTML = form[tag[1]]["data"][i];
        }
        if (form[tag[1]]["required"]) {
          input.setAttribute("required", "required");
        }

        let labelp = document.createElement("label");
        labelp.setAttribute("class", "selection");
        labelp.appendChild(input);
        if (tag[0] === "opsi" || tag[0] === "check") {
          let span = document.createElement("span");
          span.innerHTML = form[tag[1]]["data"][i];
          labelp.appendChild(span);
        }
        wrap.appendChild(labelp);
      }
    }
    content.appendChild(wrap);
    tagn++;
  }

  tagform.appendChild(content);

  let wrpsubmit = document.createElement("div");
  wrpsubmit.setAttribute("id", "wrpsubmit");
  tagform.appendChild(wrpsubmit);

  let submit = document.createElement("input");
  submit.setAttribute("type", "submit");
  submit.setAttribute("name", "submit");
  submit.setAttribute("id", "submit");
  submit.setAttribute("value", lang[lg][5]);
  submit.setAttribute("class", "btn btn-info send");
  wrpsubmit.appendChild(submit);
}

function linkify(inputText) {
  var replacedText, replacePattern1, replacePattern2, replacePattern3;
  replacePattern1 = /(\b(https?|ftp):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/gim;
  replacedText = inputText.replace(
    replacePattern1,
    '<a href="$1" target="_blank">$1</a>'
  );
  replacePattern2 = /(^|[^\/])(www\.[\S]+(\b|$))/gim;
  replacedText = replacedText.replace(
    replacePattern2,
    '$1<a href="http://$2" target="_blank">$2</a>'
  );
  replacePattern3 = /(([a-zA-Z0-9\-\_\.])+@[a-zA-Z\_]+?(\.[a-zA-Z]{2,6})+)/gim;
  replacedText = replacedText.replace(
    replacePattern3,
    '<a href="mailto:$1">$1</a>'
  );

  return replacedText;
}
