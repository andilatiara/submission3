function getResultDetailGrupJSON(data) {
    data = JSON.parse(JSON.stringify(data).replace(/^http:\/\//i, 'https://'));
    var tableOverviewHtml = "";
    var tableSquadHtml = "";

    tableOverviewHtml += `
        <tr>
            <td style="font-weight: bold;">Name</td>
            <td>${data.name}</td>
        </tr>
        <tr>
            <td style="font-weight: bold;">Short Name</td>
            <td>${data.shortName}</td>
        </tr>
        <tr>
            <td style="font-weight: bold;">Founded</td>
            <td>${data.founded}</td>
        </tr>
        <tr>
            <td style="font-weight: bold;">Three Letter Abbreviation</td>
            <td>${data.tla}</td>
        </tr>
        <tr>
            <td style="font-weight: bold;">Address</td>
            <td>${data.address}</td>
        </tr>
        <tr>
            <td style="font-weight: bold;">Phone</td>
            <td>${data.phone}</td>
        </tr>
        <tr>
            <td style="font-weight: bold;">Website</td>
            <td><a href="${data.website}" target="_blank">${data.website}</a></td>
        </tr>
        <tr>
            <td style="font-weight: bold;">Email</td>
            <td><a href="mailto:${data.email}">${data.email}</a></td>
        </tr>
        <tr>
            <td style="font-weight: bold;">Club Colors</td>
            <td>${data.clubColors}</td>
        </tr>
        <tr>
            <td style="font-weight: bold;">Venue</td>
            <td>${data.venue}</td>
        </tr>
    `;

    let number = 1;
    data.squad.forEach(function (squad) {
        tableSquadHtml += `
            <tr>
                <td class="center-align">${number}</td>
                <td>${squad.name}</td>
                <td class="center-align">${squad.position}</td>
                <td class="center-align"><a href="./detailpemainliga.html?id=${squad.id}">Detail</a></td>
            </tr>
        `;
        number++;
    });
    document.getElementById("crestUrl").src = data.crestUrl;
    document.getElementById("nameHeader").innerHTML = data.name;
    document.getElementById("preloader").innerHTML = "";
    document.getElementById("tableOverview").innerHTML = tableOverviewHtml;
    document.getElementById("tableSquad").innerHTML = tableSquadHtml;
}

function getResultGrupFavJSON(data) {
    data = JSON.parse(JSON.stringify(data).replace(/^http:\/\//i, 'https://'));
    var tableGrupFavHtml = "";
    let number = 1;

    tableGrupFavHtml += `
        <table class="responsive-table striped centered">
            <thead>
                <tr>
                    <th>Num</th>
                    <th>Team Name</th>
                    <th>Action</th>
                </tr>
            </thead>
            <tbody>
    `;

    data.forEach(function(team) {
        tableGrupFavHtml += `
            <tr>
                <td>${number}</td>
                <td><a href="./detailgrupliga.html?id=${team.id}&saved=true">${team.name}</a></td>
                <td>
                    <a class="waves-effect waves-light btn-small red" onclick="delFav(${team.id}, 'favorite_team')">
                        <i class="large material-icons">delete</i>
                    </a>
                </td>
            </tr>
        `;

        number++;
    });

    tableGrupFavHtml += `
            </tbody>
        </table>
    `;
    document.getElementById("favorite-item").innerHTML = tableGrupFavHtml;
}

function getResultDetailPemainJSON(data) {
    var tableDetailPemainHtml = "";

    tableDetailPemainHtml += `
        <table class="responsive-table striped">
            <thead></thead>
            <tbody>
                <tr>
                    <td style="font-weight: bold;">Name</td>
                    <td>${data.name}</td>
                </tr>
                <tr>
                    <td style="font-weight: bold;">First Name</td>
                    <td>${data.firstName}</td>
                </tr>
                <tr>
                    <td style="font-weight: bold;">Last Name</td>
                    <td>${data.lastName}</td>
                </tr>
                <tr>
                    <td style="font-weight: bold;">Country of Birth</td>
                    <td>${data.countryOfBirth}</td>
                </tr>
                <tr>
                    <td style="font-weight: bold;">Date of Birth</td>
                    <td>${data.dateOfBirth}</td>
                </tr>
                <tr>
                    <td style="font-weight: bold;">Nationality</td>
                    <td>${data.nationality}</td>
                </tr>
                <tr>
                    <td style="font-weight: bold;">Position</td>
                    <td>${data.position}</td>
                </tr>
                <tr>
                    <td style="font-weight: bold;">Shirt Number</td>
                    <td>${data.shirtNumber}</td>
                </tr>
            </tbody>
        </table>

        <div class="right-align" style="font-size: 12px;">Last Updated: ${convertDate(new Date(data.lastUpdated).toLocaleDateString())}</div>
    `;
    document.getElementById("preloader").innerHTML = "";
    document.getElementById("tableDetailPemain").innerHTML = tableDetailPemainHtml;
}

function getResultPlayerFavJSON(data) {
    var tablePlayerFavHtml = "";
    let number = 1;

    tablePlayerFavHtml += `
        <table class="responsive-table striped centered">
            <thead>
                <tr>
                    <th>Num</th>
                    <th>Player Name</th>
                    <th>Action</th>
                </tr>
            </thead>
            <tbody>
    `;

    data.forEach(function(player) {
        tablePlayerFavHtml += `
            <tr>
                <td>${number}</td>
                <td><a href="./detailpemainliga.html?id=${player.id}&saved=true">${player.name}</a></td>
                <td>
                    <a class="waves-effect waves-light btn-small red" onclick="delFav(${player.id}, 'favorite_player')">
                        <i class="large material-icons">delete</i>
                    </a>
                </td>
            </tr>
        `;

        number++;
    });

    tablePlayerFavHtml += `
            </tbody>
        </table>
    `;
    document.getElementById("favorite-item").innerHTML = tablePlayerFavHtml;
}
