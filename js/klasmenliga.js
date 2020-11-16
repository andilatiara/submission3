function getResultKlasmenJSON(data) {
    var tableKlasmenHtml = "";
    data.standings.forEach(function (standing) {
        var tableDataKlasmen = "";
        standing.table.forEach(function (data) {
            data = JSON.parse(JSON.stringify(data).replace(/^http:\/\//i, 'https://'));

            tableDataKlasmen += `
                <tr>
                    <td class="center-align">${data.position}</td>
                    <td>
                        <a href="./detailgrupliga.html?id=${data.team.id}">
                            <p style="display: flex; align-items: center;">
                                <img class="materialboxed" style="float:left; margin-right:20px" width="50" height="50" src="${data.team.crestUrl}">
                                ${data.team.name}
                            </p>
                        </a>
                    </td>
                    <td class="center-align">${data.playedGames}</td>
                    <td class="center-align">${data.won}</td>
                    <td class="center-align">${data.draw}</td>
                    <td class="center-align">${data.lost}</td>
                    <td class="center-align">${data.points}</td>
                    <td class="center-align">${data.goalsFor}</td>
                    <td class="center-align">${data.goalsAgainst}</td>
                    <td class="center-align">${data.goalDifference}</td>
                </tr>
            `;
        })

        tableKlasmenHtml += `
            <div class="card">
                <div class="card-content">
                  <div class="right-align" style="font-size: 12px;">Last Updated: ${convertDate(new Date(data.competition.lastUpdated).toLocaleDateString())}</div>
                    <table class="responsive-table striped centered">
                        <thead>
                            <tr>
                                <th class="center-align">Position</th>
                                <th class="center-align">Team</th>
                                <th class="center-align">Played</th>
                                <th class="center-align">Won</th>
                                <th class="center-align">Draw</th>
                                <th class="center-align">Lost</th>
                                <th class="center-align">Points</th>
                                <th class="center-align">Goals For</th>
                                <th class="center-align">Goals Against</th>
                                <th class="center-align">Goals Difference</th>
                            </tr>
                        </thead>

                        <tbody>
                            ` + tableDataKlasmen + `
                        </tbody>
                    </table>
                </div>
            </div>
        `;
    });
    document.getElementById("standings").innerHTML = tableKlasmenHtml;
}
