// STEMMING ========================
function dasar(kata) {
  if (
    (kata.substring(kata.length - 3, kata.length) == "kah" &&
      kata.length > 7) ||
    (kata.length > 5 &&
      kata.substring(kata.length - 3, kata.length) == "lah") ||
    kata.substring(kata.length - 3, kata.length) == "pun"
  ) {
    kata = kata.substring(0, kata.length - 3);
  }
  //langkah 2 - hapus possesive pronoun
  if (kata.length > 4) {
    if (
      kata.substring(kata.length - 2, kata.length) == "ku" ||
      kata.substring(kata.length - 2, kata.length) == "mu"
    ) {
      kata = kata.substring(0, kata.length - 2);
    } else {
      if (kata.substring(kata.length - 5, kata.length) == "annya") {
        kata = kata.substring(0, kata.length - 5);
      } else {
        if (kata.substring(kata.length - 3, kata.length) == "nya") {
          kata = kata.substring(0, kata.length - 3);
        }
      }
    }
  }
  //langkah 3 hapus first order prefiks (awalan pertama)
  if (kata.substring(0, 2) == "me") {
    if (kata.substring(0, 3) == "mem") {
      if (
        kata.substring(3, 1) == "a" ||
        kata.substring(3, 1) == "i" ||
        kata.substring(3, 1) == "e" ||
        kata.substring(3, 1) == "u" ||
        kata.substring(3, 1) == "o"
      ) {
        if (
          kata.substring(6, 1) == "h" ||
          (kata.substring(4, 1) == "s" && kata.substring(5, 1) != "t") ||
          kata.substring(4, 1) == "l" ||
          kata.substring(4, 1) == "k"
        ) {
          kata = "m" + kata.substring(3, kata.length);
        } else {
          kata = "p" + kata.substring(3, kata.length);
        }
      } else {
        kata = kata.substring(0, 3);
      }
    } else {
      if (kata.substring(0, 3) == "men") {
        if (kata.substring(3, 1) == "e") {
          kata = "t" + kata.substring(3, kata.length);
        } else {
          if (kata.substring(0, 4) == "meng") {
            if (
              kata.substring(4, 1) == "a" ||
              kata.substring(4, 1) == "e" ||
              kata.substring(4, 1) == "o" ||
              kata.substring(4, 3) == "ura"
            ) {
              kata = "k" + kata.substring(4, kata.length);
            } else {
              kata = kata.substring(4, kata.length);
            }
          } else {
            if (kata.substring(0, 4) == "meny") {
              kata = "s" + kata.substring(4, kata.length);
            } else {
              kata = kata.substring(3, kata.length);
            }
          }
        }
      } else {
        if (kata.length > 5) {
          kata = kata.substring(0, 2);
        }
      }
    }
  } else {
    if (kata.substring(0, 4) == "peng") {
      if (kata.substring(4, 1) == "e") {
        kata = "k" + kata.substring(4, kata.length);
      } else {
        kata = kata.substring(4, kata.length);
      }
    } else {
      if (kata.substring(0, 3) == "pem") {
        if (kata.substring(6, 1) != "r") {
          if (
            kata.substring(3, 1) == "a" ||
            kata.substring(3, 1) == "i" ||
            kata.substring(3, 1) == "e" ||
            kata.substring(3, 1) == "u" ||
            kata.substring(3, 1) == "o"
          ) {
            kata = "p" + kata.substring(3, kata.length);
          } else {
            kata = kata.substring(3, kata.length);
          }
        } else {
          kata = "m" + kata.substring(3, kata.length);
        }
      } else {
        if (kata.substring(0, 3) == "pen") {
          if (
            kata.substring(3, 1) == "a" ||
            kata.substring(3, 1) == "i" ||
            kata.substring(3, 1) == "e" ||
            kata.substring(3, 1) == "u" ||
            kata.substring(3, 1) == "o"
          ) {
            kata = "t" + kata.substring(3, kata.length);
          } else {
            kata = kata.substring(3, kata.length);
          }
        } else {
          if (kata.substring(0, 4) == "peny") {
            kata = "s" + kata.substring(4, kata.length);
          } else {
            if (kata.substring(0, 2) == "di") {
              kata = kata.substring(2, kata.length);
            } else {
              if (kata.substring(0, 3) == "ter") {
                kata = kata.substring(3, kata.length);
              } else {
                if (kata.substring(0, 2) == "ke") {
                  if (kata.substring(2, 1) == "m") {
                    //$kata = substr($kata,3);
                  } else {
                    if (kata.substring(2, 1) != "n") {
                      kata = kata.substring(2, kata.length);
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
  if (kata.substring(0, 2) == "be") {
    if (kata.substring(2, 1) == "k") {
      kata = kata.substring(2, kata.length);
    } else {
      if (kata.substring(0, 3) == "bel") {
        kata = kata.substring(3, kata.length);
      } else {
        if (kata.substring(0, 3) == "ber") {
          if (
            kata.substring(3, 3) == "sih" ||
            kata.substring(3, 3) == "ani" ||
            kata.substring(3, 4) == "ikan"
          ) {
          } else {
            if (kata.substring(3, 1) == "i") {
              kata = kata.substring(2, kata.length);
            } else {
              kata = kata.substring(3, kata.length);
            }
          }
        }
      }
    }
  } else {
    if (kata.substring(0, 3) == "per" && kata.length > 5) {
      kata = kata.substring(3, kata.length);
    } else {
      if (kata.substring(0, 3) == "pel" && kata.length > 5) {
        kata = kata.substring(3, kata.length);
      } else {
        if (kata.substring(0, 2) == "se" && kata.length > 5) {
          if (kata.substring(2, 1) == "t") {
            kata = kata.substring(2, kata.length);
          }
        } else {
          if (kata.substring(0, 2) == "pe" && kata.length > 5) {
            if (kata.substring(2, 1) == "r" && kata.length > 5) {
              kata = kata.substring(0, 3);
            } else {
              if (kata.substring(2, 1) == "l" && kata.length > 5) {
                if (kata.substring(4, 1) == "y") {
                  kata = kata.substring(2, kata.length);
                } else {
                  kata = kata.substring(3, kata.length);
                }
              } else {
                kata = kata.substring(2, kata.length);
              }
            }
          }
        }
      }
    }
  }
  ////langkah 5 hapus suffiks
  if (kata.substring(kata.length - 1, kata.length) == "i") {
    if (kata.length > 4) {
      if (kata.substring(kata.length - 3, kata.length - 1) != "rt") {
        kata = kata.substring(0, kata.length - 1);
      }
    }
  } else {
    if (kata.substring(kata.length - 2, kata.length) == "an") {
      if (kata.substring(kata.length - 3, kata.length) != "ian") {
        if (kata.substring(kata.length - 3, kata.length) == "kan") {
          if (kata.substring(kata.length - 4, kata.length) == "ikan") {
            if (kata.substring(kata.length - 4, kata.length - 5) == "p") {
              kata = kata.substring(kata.length - 3, kata.length) + "an";
            } else {
              if (kata.substring(kata.length - 4, kata.length - 5) == "l") {
                kata = kata.substring(0, kata.length - 3);
              } else {
                kata = kata.substring(0, kata.length - 3);
              }
            }
          } else {
            kata = kata.substring(0, kata.length - 3);
          }
        } else {
          kata = kata.substring(0, kata.length - 2);
        }
      }
    }
  }

  ////langkah 5 hapus kalau cuma 1 karakter
  if (kata.length == 1) {
    kata = "";
  }
  return kata;
}

function stem(kalimat) {
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
