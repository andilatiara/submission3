function cekDatabase(idb) {
    var dbPromised = idb.open("premier-league", 1, function(upgradeDb) {
        if (!upgradeDb.objectStoreNames.contains(storeName_Grup)) {
            var teamsObjectStore = upgradeDb.createObjectStore(storeName_Grup, {
                keypath: "id"
            });
            teamsObjectStore.createIndex("team_name", "name", {
                unique: false
            });
        }
        if (!upgradeDb.objectStoreNames.contains(storeName_Jadwal)) {
            var matchObjectStore = upgradeDb.createObjectStore(storeName_Jadwal, {
                keypath: "id"
            });
            matchObjectStore.createIndex("home_team", "match.homeTeam.name", {
                unique: false
            });
            matchObjectStore.createIndex("away_team", "match.awayTeam.name", {
                unique: false
            });
        }
        if (!upgradeDb.objectStoreNames.contains(storeName_Pemain)) {
            var playerObjectStore = upgradeDb.createObjectStore(storeName_Pemain, {
                keypath: "id"
            });
            playerObjectStore.createIndex("player_name", "name", {
                unique: false
            });
        }
    });
    return dbPromised;
}

function cekData(id, storeName) {
    return new Promise(function (resolve, reject) {
        cekDatabase(idb)
            .then(function (db) {
                var tx = db.transaction(storeName, "readonly");
                var store = tx.objectStore(storeName);
                return store.get(id);
            })

            .then(function (data) {
                if (data != undefined) {
                    resolve("Data adalah Favorite")
                } else {
                    reject("Bukan Data Favorite")
                }
            });
    });
}

function getById(id, storeName) {
    return new Promise(function(resolve, reject) {
        cekDatabase(idb)
            .then(function(db) {
                var tx = db.transaction(storeName, "readonly");
                var store = tx.objectStore(storeName);

                return store.get(id);
            })
            .then(function(data) {
                resolve(data);
            });
    });
}

function getDataById(dataType) {
    // Ambil nilai query parameter (?id=)
    var urlParams = new URLSearchParams(window.location.search);
    var idParam = Number(urlParams.get("id"));

    if (dataType == "team") {
        var dataSquadHTML = ''
        var tabelSquadHTML = ''
        let number = 1;
        getById(idParam, "favorite_team").then(function (team) {
            // Menyusun komponen card artikel secara dinamis
            getResultDetailGrupJSON(team)
            dataTeamJSON = team;
            team.squad.forEach(function (squad) {
                dataSquadJSON = squad;
                dataSquadHTML += `
                  <tr>
                       <td class="center-align">${number}</td>
                       <td>${squad.name}</td>
                       <td class="center-align">${squad.position}</td>
                       <td class="center-align"><a href="./detailpemainliga.html?id=${squad.id}">Detail</a></td>
                   </tr>
        `
            number++;
            });

            tabelSquadHTML += `<table> <tbody> ${dataSquadHTML}  </tbody> </table>`

            document.getElementById("squad").innerHTML = tabelSquadHTML;
        })
    } else if (dataType == "player") {
        getById(idParam, "favorite_player").then(function (player) {
            getResultDetailPemainJSON(player);
        });
    } else if (dataType == "match") {
        getById(idParam, "favorite_match").then(function (match) {
            getResultDetailJadwalJSON(match);
        });
    }
}

function addFav(data, storeName) {
    var dataPrimaryKey;
      if (storeName == storeName_Grup) {
          dataPrimaryKey = data.id;
      }
      else if (storeName == storeName_Jadwal) {
          dataPrimaryKey = data.match.id;
      }
      else if (storeName == storeName_Pemain) {
          dataPrimaryKey = data.id;
      }

    cekDatabase(idb)
        .then(function(db) {
            var tx = db.transaction(storeName, "readwrite");
            var store = tx.objectStore(storeName);
            store.put(data, dataPrimaryKey);
            return tx.complete;
        })
        .then(function() {
            M.toast({
                html: "Berhasil ditambah ke Favorite",
            });
        });
      location.reload();
}

function delFav(id, storeName) {
    console.log(id + " " + storeName);
    cekDatabase(idb)
        .then(function(db) {
            var tx = db.transaction(storeName, "readwrite");
            var store = tx.objectStore(storeName);
            store.delete(id);
            return tx.complete;
        })
        .then(function() {
            M.toast({
                html: "Berhasil dihapus dari Favorite",
            });
        });
      location.reload();
}

function getAllFav(storeName) {
    return new Promise(function(resolve, reject) {
        cekDatabase(idb)
            .then(function(db) {
                var tx = db.transaction(storeName, "readonly");
                var store = tx.objectStore(storeName);

                return store.getAll();
            })
            .then(function(data) {
                resolve(data);
            });
    });
}
