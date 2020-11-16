const base_url = "https://api.football-data.org/v2";
const api_token = "ef52fd1b35144553a85c610750b80cd1";
const id_liga = 2015;

const endpoint_klasmen = `${base_url}/competitions/${id_liga}/standings?standingType=TOTAL`;
const endpoint_jadwal = `${base_url}/competitions/${id_liga}/matches?status=SCHEDULED`;
const endpoint_detailGrup = `${base_url}/teams/`;
const endpoint_detailJadwal = `${base_url}/matches/`;
const endpoint_detailPemain = `${base_url}/players/`;

const type_grup = "team";
const type_jadwal = "match";
const type_pemain = "player";

const storeName_Grup = "favorite_team";
const storeName_Jadwal = "favorite_match";
const storeName_Pemain = "favorite_player";

function status(response) {
    if (response.status !== 200) {
        console.log("Error : " + response.status);
        return Promise.reject(new Error(response.statusText));
    } else {
        return Promise.resolve(response);
    }
}
function json(response) {
    return response.json();
}

function error(error) {
    console.log("Error : " + error);
}

function fetchAPI(endpoint) {
    return fetch(endpoint, {
        headers: {
            "X-Auth-Token": api_token
        }
    });
}

function getKlasmen() {
    return new Promise(function(resolve, reject) {
        if ("caches" in window) {
            caches.match(endpoint_klasmen).then(function(response) {
                if (response) {
                    response.json().then(function(data) {
                        getResultKlasmenJSON(data);
                        resolve(data);
                    });
                }
            });
        }

        fetchAPI(endpoint_klasmen)
            .then(status)
            .then(json)
            .then(function(data) {
                getResultKlasmenJSON(data);
                resolve(data);
            })

        .catch(error);
    });
}

function getJadwal() {
    return new Promise(function(resolve, reject) {
        if ("caches" in window) {
            caches.match(endpoint_jadwal).then(function(response) {
                if (response) {
                    response.json().then(function(data) {
                        getResultJadwalJSON(data);
                        resolve(data);
                    });
                }
            });
        }

        fetchAPI(endpoint_jadwal)
            .then(status)
            .then(json)
            .then(function(data) {
                getResultJadwalJSON(data);
                resolve(data);
            })
        .catch(error);
    });
}

function getDetailJadwal(matchID) {
    return new Promise(function(resolve, reject) {
        if ("caches" in window) {
            caches.match(endpoint_detailJadwal + matchID).then(function(response) {
                if (response) {
                    response.json().then(function(data) {
                        getResultDetailJadwalJSON(data);
                        resolve(data);
                    });
                }
            });
        }

        fetchAPI(endpoint_detailJadwal + matchID)
            .then(status)
            .then(json)
            .then(function(data) {
                getResultDetailJadwalJSON(data);
                resolve(data);
            })
        .catch(error);
    });
}

function getDetailGrup(teamID) {
    return new Promise(function(resolve, reject) {
        if ("caches" in window) {
            caches.match(endpoint_detailGrup + teamID).then(function(response) {
                if (response) {
                    response.json().then(function(data) {
                        getResultDetailGrupJSON(data);
                        resolve(data);
                    });
                }
            });
        }

        fetchAPI(endpoint_detailGrup + teamID)
            .then(status)
            .then(json)
            .then(function(data) {
                getResultDetailGrupJSON(data);
                resolve(data);
            })
        .catch(error);
    });
}

function getDetailPemain(playerID) {
    return new Promise(function(resolve, reject) {
        if ("caches" in window) {
            caches.match(endpoint_detailPemain + playerID).then(function(response) {
                if (response) {
                    response.json().then(function(data) {
                        getResultDetailPemainJSON(data);
                        resolve(data);
                    });
                }
            });
        }

        fetchAPI(endpoint_detailPemain + playerID)
            .then(status)
            .then(json)
            .then(function(data) {
                getResultDetailPemainJSON(data);
                resolve(data);
            })
        .catch(error);
    });
}

function tabFav(type) {
    if (type == type_jadwal) {
        getAllFav(storeName_Jadwal).then(function(data) {
            getResultJadwalFavJSON(data);
        });
    }
    else if(type == type_grup) {
        getAllFav(storeName_Grup).then(function(data) {
            getResultGrupFavJSON(data);
        });
    }
    else if(type == type_pemain) {
        getAllFav(storeName_Pemain).then(function(data) {
            getResultPlayerFavJSON(data);
        });
    }
}
