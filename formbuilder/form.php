<?php
echo json_encode($_POST);
?>
<!DOCTYPE html>
<html lang="en">

<head>
  <title>Form Builder</title>
  <meta charset="utf-8" />
  <meta http-equiv="X-UA-Compatible" content="IE=edge" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <link href="lib/css/bootstrap.min.css" rel="stylesheet" />
  <link href="lib/css/select2.css" rel="stylesheet" />
  <link href="lib/css/datetimepicker.min.css" rel="stylesheet" />
  <link href="lib/css/formbuilder.css" rel="stylesheet" />
  <script src="lib/js/jquery.1.12.4.min.js"></script>
</head>
<style>
  #formbuilder {
    margin-top: 50px;
    margin-bottom: 50px;
  }

  body {
    background-color: #eceef8;
  }
</style>

<body>

  <div class="container">
    <form id="formbuilder" method="post" action=""></form>
  </div>

  <script>
    const data = '{"title":"Judul Formulir","description":"Description Formulir","form":[{"type":"text","question":"Nama Lengkap","description":"Masukkan Nama Lengkap Anda","required":true,"data":[]},{"type":"select","question":"Jenis Kelamin","description":"","required":true,"data":["Laki - laki","Perempuan"]},{"type":"date","question":"Tanggal Lahir","description":"","required":true,"data":["DD-MM-YYYY"]},{"type":"time","question":"Jam Lahir","description":"","required":false,"data":["HH:mm"]},{"type":"textarea","question":"Alamat","description":"","required":false,"data":[]},{"type":"time","question":"Jam Tidur","description":"","required":true,"data":["HH:mm:ss"]},{"type":"check","question":"Makanan Kesukaan","description":"","required":true,"data":["Nasi Goreng","Mie Goreng","Ayam Goreng"]},{"type":"opsi","question":"Kamu Memilih Siapa","description":"","required":false,"data":["Aku","Dia"]},{"type":"opsi","question":"Kamu Memilih Mana","description":"","required":true,"data":["Surga","Neraka"]}]}';

    $(document).ready(function() {
      buildform("formbuilder", data);
    });
  </script>
  <script src="lib/js/formbuilder.js"></script>
  <script src="lib/js/bootstrap.min.js"></script>
  <script src="lib/js/select2.min.js"></script>
  <script src="lib/js/datetimepicker.js"></script>
</body>

</html>