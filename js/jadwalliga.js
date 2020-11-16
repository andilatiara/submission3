function getResultJadwalJSON(data) {
  var dataJadwalHTML = ''
  data.matches.forEach(function (match) {
    dataJadwalHTML += `
        <div class="col s12 m6 l6">
          <div class="card">
            <div class="card-content">
              <div center-align>
                <h5 class="center-align">Matchday : ${match.matchday}</h5>
                  <div class="center-align">Kick Off : ${convertDate(new Date(match.utcDate))}</div>

                  <div class="row" style="margin:20px">
                    <div class="col s5 truncate right-align">
                      <span class="blue-text">  ${match.homeTeam.name}</span>
                  </div>
                  <div class="col s2 ">
                    VS
                  </div>
                  <div class="col s5 truncate left-align">
                    <span class="blue-text">  ${match.awayTeam.name}</span>
                  </div>
                </div>
                <div class="center-align">
                  <a class="blue waves-effect waves-light btn" href="./detailjadwalliga.html?id=${match.id}">Lihat Detail</a>
                </div>
              </div>
            </div>
          </div>
        </div>`
  });
  document.getElementById("matches").innerHTML = dataJadwalHTML;
}

function getResultDetailJadwalJSON(data) {
    var tableDetailJadwalHtml = "";
    match = data.match;
    h2h = data.head2head;

    tableDetailJadwalHtml += `
        <div class="left-align">Matchday: ${match.matchday}</div>
        <div class="left-align">
            Kick Off: ${convertDate(new Date(match.utcDate).toLocaleDateString())}
            -
            ${new Date(match.utcDate).toLocaleTimeString()}
        </div>

        <div class="row">
            <div class="col s5 m5 l5 center-align"> <h5> <a href="./detailgrupliga.html?id=${match.homeTeam.id}">${match.homeTeam.name}</a> </h5> </div>
            <div class="col s2 m2 l2 center-align"> <h5> - </h5> </div>
            <div class="col s5 m5 l5 center-align"> <h5> <a href="./detailgrupliga.html?id=${match.awayTeam.id}">${match.awayTeam.name}</a> </h5> </div>
        </div>

        <h6 class="center-align">${match.venue}</h6>
        <hr>
        <div class="center-align">Number of Matches: ${h2h.numberOfMatches}</div>
        <div class="center-align">Total Goals: ${h2h.totalGoals}</div>

        <table class="responsive-table striped centered" style="margin-top: 30px; margin-bottom: 30px;">
            <thead></thead>
            <tbody>
                <tr>
                    <td>${h2h.homeTeam.wins}</td>
                    <td style="font-weight: bold;">Wins</td>
                    <td>${h2h.awayTeam.wins}</td>
                </tr>
                <tr>
                    <td>${h2h.homeTeam.draws}</td>
                    <td style="font-weight: bold;">Draws</td>
                    <td>${h2h.awayTeam.draws}</td>
                </tr>
                <tr>
                    <td>${h2h.homeTeam.losses}</td>
                    <td style="font-weight: bold;">Loses</td>
                    <td>${h2h.awayTeam.losses}</td>
                </tr>
            </tbody>
        </table>

        <div class="right-align" style="font-size: 12px;">Last Updated: ${convertDate(new Date(match.lastUpdated).toLocaleDateString())}</div>
    `;
    document.getElementById("preloader").innerHTML = "";
    document.getElementById("tableDetailJadwal").innerHTML = tableDetailJadwalHtml;
}

function getResultJadwalFavJSON(data) {
    var tableJadwalFavHtml = "";
    let number = 1;

    tableJadwalFavHtml += `
      <table class="responsive-table striped centered">
            <thead>
                <tr>
                    <th>Num</th>
                    <th>Match Date</th>
                    <th>Teams</th>
                    <th>Detail</th>
                    <th>Action</th>
                </tr>
            </thead>
            <tbody>
    `;

    data.forEach(function(match) {
        tableJadwalFavHtml += `
            <tr>
                <td>${number}</td>
                <td>${convertDate(new Date(match.match.utcDate).toLocaleDateString())}</td>
                <td>${match.match.homeTeam.name} - ${match.match.awayTeam.name}
                </td>
                <td><a href="./detailjadwalliga.html?id=${match.match.id}&saved=true">Detail</a></td>
                <td>
                    <a class="waves-effect waves-light btn-small red" onclick="delFav(${match.match.id}, 'favorite_match')">
                        <i class="large material-icons">delete</i>
                    </a>
                </td>
            </tr>
        `;

        number++;
    });

    tableJadwalFavHtml += `
            </tbody>
        </table>
    `;
    document.getElementById("favorite-item").innerHTML = tableJadwalFavHtml;
}
