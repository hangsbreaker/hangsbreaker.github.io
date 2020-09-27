// STEMMING ========================
function dasar(kata) {
  if (
    (kata.substr(-3) == "kah" && kata.length > 7) ||
    (kata.length > 5 && kata.substr(-3) == "lah") ||
    kata.substr(-3) == "pun"
  ) {
    kata = kata.substr(0, kata.length - 3);
  }
  //langkah 2 - hapus possesive pronoun
  if (kata.length > 4) {
    if (kata.substr(-2) == "ku" || kata.substr(-2) == "mu") {
      kata = kata.substr(0, kata.length - 2);
    } else {
      if (kata.substr(-5) == "annya") {
        kata = kata.substr(0, kata.length - 5);
      } else {
        if (kata.substr(-3) == "nya") {
          kata = kata.substr(0, kata.length - 3);
        }
      }
    }
  }
  //langkah 3 hapus first order prefiks (awalan pertama)
  if (kata.substr(0, 2) == "me") {
    if (kata.substr(0, 3) == "mem") {
      if (
        kata.substr(3, 1) == "a" ||
        kata.substr(3, 1) == "i" ||
        kata.substr(3, 1) == "e" ||
        kata.substr(3, 1) == "u" ||
        kata.substr(3, 1) == "o"
      ) {
        if (
          //(kata.substr(4, 1) == "s" && kata.substr(5, 1) != "t") ||
          kata.substr(4, 1) == "l" ||
          kata.substr(4, 1) == "k"
        ) {
          kata = "m" + kata.substr(3, kata.length);
        } else {
          kata = "p" + kata.substr(3, kata.length);
        }
      } else {
        kata = kata.substr(3, kata.length);
      }
    } else {
      if (kata.substr(0, 3) == "men") {
        if (kata.substr(3, 1) == "e") {
          kata = "t" + kata.substr(3, kata.length);
        } else if (kata.substr(3, 1) == "i") {
          kata = "n" + kata.substr(3, kata.length);
        } else {
          if (kata.substr(0, 4) == "meng") {
            if (
              kata.substr(4, 1) == "a" ||
              kata.substr(4, 1) == "e" ||
              kata.substr(4, 1) == "o" ||
              kata.substr(4, 1) == "u"
            ) {
              if (suffix(kata.substr(4, kata.length)).length > 4) {
                kata = "k" + kata.substr(4, kata.length);
              } else {
                kata = kata.substr(4, kata.length);
              }
            } else {
              kata = kata.substr(4, kata.length);
            }
          } else {
            if (kata.substr(0, 4) == "meny") {
              kata = "s" + kata.substr(4, kata.length);
            } else {
              kata = kata.substr(3, kata.length);
            }
          }
        }
      } else {
        if (kata.length > 5) {
          kata = kata.substr(0, 2);
        }
      }
    }
  } else {
    if (kata.substr(0, 4) == "peng") {
      if (kata.substr(4, 1) == "e") {
        kata = "k" + kata.substr(4, kata.length);
      } else {
        kata = kata.substr(4, kata.length);
      }
    } else {
      if (kata.substr(0, 3) == "pem") {
        if (kata.substr(6, 1) != "r") {
          if (
            kata.substr(3, 1) == "a" ||
            kata.substr(3, 1) == "i" ||
            kata.substr(3, 1) == "e" ||
            kata.substr(3, 1) == "u" ||
            kata.substr(3, 1) == "o"
          ) {
            kata = "p" + kata.substr(3, kata.length);
          } else {
            kata = kata.substr(3, kata.length);
          }
        } else {
          kata = "m" + kata.substr(3, kata.length);
        }
      } else {
        if (kata.substr(0, 3) == "pen") {
          if (
            kata.substr(3, 1) == "a" ||
            kata.substr(3, 1) == "i" ||
            kata.substr(3, 1) == "e" ||
            kata.substr(3, 1) == "u" ||
            kata.substr(3, 1) == "o"
          ) {
            kata = "t" + kata.substr(3, kata.length);
          } else {
            kata = kata.substr(3, kata.length);
          }
        } else {
          if (kata.substr(0, 4) == "peny") {
            kata = "s" + kata.substr(4, kata.length);
          } else {
            if (kata.substr(0, 2) == "di") {
              kata = kata.substr(2, kata.length);
            } else {
              if (kata.substr(0, 3) == "ter") {
                kata = kata.substr(3, kata.length);
              } else {
                if (kata.substr(0, 2) == "ke") {
                  if (kata.substr(2, 1) == "m") {
                    //$kata = substr($kata,3);
                  } else {
                    if (kata.substr(2, 1) != "n") {
                      kata = kata.substr(2, kata.length);
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  }
  //langkah 4 hapus second order prefiks (awalan kedua)
  if (kata.substr(0, 2) == "be") {
    if (kata.substr(2, 1) == "k") {
      kata = kata.substr(2, kata.length);
    } else {
      if (kata.substr(0, 3) == "bel") {
        kata = kata.substr(3, kata.length);
      } else {
        if (kata.substr(0, 3) == "ber") {
          if (
            kata.substr(3, 3) == "sih" ||
            kata.substr(3, 3) == "ani" ||
            kata.substr(3, 4) == "ikan"
          ) {
          } else {
            if (kata.substr(3, 1) == "i") {
              kata = kata.substr(2, kata.length);
            } else {
              kata = kata.substr(3, kata.length);
            }
          }
        }
      }
    }
  } else {
    if (kata.substr(0, 3) == "per" && kata.substr(3, kata.length).length > 5) {
      kata = kata.substr(3, kata.length);
    } else {
      if (kata.substr(0, 3) == "pel" && kata.length > 5) {
        kata = kata.substr(3, kata.length);
      } else {
        if (kata.substr(0, 2) == "se" && kata.length > 5) {
          if (kata.substr(2, 1) == "t") {
            kata = kata.substr(2, kata.length);
          }
        } else {
          if (kata.substr(0, 2) == "pe" && kata.substr(0, 2).length > 5) {
            if (kata.substr(2, 1) == "r" && kata.substr(0, 3).length > 5) {
              kata = kata.substr(3, kata.length);
            } else {
              if (kata.substr(2, 1) == "l" && kata.length > 5) {
                if (kata.substr(4, 1) == "y") {
                  kata = kata.substr(2, kata.length);
                } else {
                  kata = kata.substr(3, kata.length);
                }
              } else {
                if (suffix(kata.substr(2, kata.length)).length > 4) {
                  kata = kata.substr(2, kata.length);
                }
              }
            }
          }
        }
      }
    }
  }
  kata = suffix(kata);
  ////langkah 5 hapus kalau cuma 1 karakter
  if (kata.length == 1) {
    kata = "";
  }
  return kata;
}

function suffix(kata) {
  ////langkah 5 hapus suffiks

  var prefix = {
    kah: "",
    lah: "",
    pun: "",
    me: "",
    mem: "",
    men: "",
    meng: "",
    meny: "",
    peng: "",
    pem: "",
    pen: "",
    peny: "",
    di: "",
    ter: "",
    ke: "",
    kem: "",
    ken: "",
    be: "",
    bek: "",
    bel: "",
    ber: "",
    per: "",
    pel: "",
    se: ""
  };
  var str = kata;
  var RE = new RegExp(Object.keys(prefix).join("|"), "gi");
  str = str.replace(RE, function(matched) {
    return prefix[matched];
  });

  if (kata.substr(-1) == "i") {
    if (str.length > 5) {
      if (kata.substr(kata.length - 3, 2) != "rt") {
        kata = kata.substr(0, kata.length - 1);
      }
    }
  } else {
    if (kata.substr(-2) == "an") {
      if (kata.substr(-3) != "ian") {
        if (kata.substr(-3) == "kan") {
          if (kata.substr(-4) == "ikan") {
            if (kata.substr(-4, 1) == "p") {
              kata = kata.substr(-3) + "an";
            } else {
              if (kata.substr(-4, 1) == "l") {
                kata = kata.substr(0, kata.length - 3);
              } else {
                kata = kata.substr(0, kata.length - 3);
              }
            }
          } else {
            kata = kata.substr(0, kata.length - 3);
          }
        } else {
          kata = kata.substr(0, kata.length - 2);
        }
      }
    }
  }
  return kata;
}

function stem(kalimat = "") {
  if (kalimat != "") {
    var str = "";
    var ark = kalimat
      .replace(/[^0-9a-zA-Z]/g, " ")
      .toLowerCase()
      .split(" ");
    for (kata in ark) {
      str = str + " " + dasar(ark[kata]);
    }
    return str.trim();
  }
  return;
}
