<?php
//echo json_encode($_POST);
?>
<!DOCTYPE html>
<html lang="en">

<head>
  <title>Form Builder</title>
  <meta charset="utf-8" />
  <meta http-equiv="X-UA-Compatible" content="IE=edge" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <link href="lib/css/bootstrap.min.css" rel="stylesheet" />
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
    const data = '{"judul":"Judul Formulir","deskripsi":"Deskripsi Formulir","form":{"text-0":{"pertanyaan":"Nama Lengkap","deskripsi":"Masukkan Nama Lengkap Anda","wajib":true,"data":[]},"select-1":{"pertanyaan":"Jenis Kelamin","deskripsi":"","wajib":true,"data":["Laki - laki","Perempuan"]},"tanggal-2":{"pertanyaan":"Tanggal Lahir","deskripsi":"","wajib":true,"data":["DD-MM-YYYY"]},"waktu-3":{"pertanyaan":"Jam Lahir","deskripsi":"","wajib":false,"data":["HH:mm"]},"textarea-4":{"pertanyaan":"Alamat","deskripsi":"","wajib":false,"data":[]},"waktu-5":{"pertanyaan":"Jam Tidur","deskripsi":"","wajib":true,"data":["HH:mm:ss"]},"check-6":{"pertanyaan":"Makanan Kesukaan","deskripsi":"","wajib":true,"data":["Nasi Goreng","Mie Goreng","Ayam Goreng"]},"opsi-7":{"pertanyaan":"Kamu Memilih Siapa","deskripsi":"","wajib":false,"data":["Aku","Dia"]},"opsi-8":{"pertanyaan":"Kamu Memilih Mana","deskripsi":"","wajib":true,"data":["Surga","Neraka"]}}}';

    $(document).ready(function() {
      buildform("formbuilder", data);
    });
  </script>
  <script src="lib/js/formbuilder.js"></script>
  <script src="lib/js/bootstrap.min.js"></script>
  <script src="lib/js/datetimepicker.js"></script>
</body>

</html>