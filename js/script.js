const ApiKey = "bddfa27a7df1414ea77e14e3216076dc";
const baseUrl = "https://api.football-data.org/v2/";
const leagueId = "2021";
const baseEndPoin = `${baseUrl}competitions/${leagueId}`;
const teamEndPoin = `${baseUrl}competitions/${leagueId}/teams`;
const standingEndPoin = `${baseUrl}competitions/${leagueId}/standings`;
const matchEndPoin = `${baseUrl}competitions/${leagueId}/matches`;

const contents = document.querySelector("#content-list");
const title = document.querySelector(".card-title");
const fetchHeader = {
    headers: {
        'X-Auth-Token': ApiKey
    }
};

function getListTeams() {
    title.innerHTML = "English Premier League Team List"
    fetch(teamEndPoin, fetchHeader)
        .then(response => response.json())
        .then(resJson => {
            console.log(resJson.teams);
            let teams = "";
            resJson.teams.forEach(team => {
                teams += `
                <li class="collection-item">
                    <div class="row">
                        <div class="col m2 s12 center">
                            <br>
                            <img src="${team.crestUrl}" width="100px" class="responsive-img">
                        </div>
                        <div class="col m10 s12">
                            <h5>${team.name}</h5>
                            <p>
                                Founded&emsp;&emsp;: ${team.founded}<br>
                                Venue &emsp;&emsp;&emsp;: ${team.venue}<br>
                                Website &emsp; &emsp;: ${team.website}<br>
                                Club Colors&emsp;: ${team.clubColors}
                            <a href="#!" data-id="${team.id}" class="secondary-content"><i class="material-icons purple-text right" data-id="${team.id}">group</i></a>
                            </p>
                        </div>
                    </div>
                </li>
                `
            });
            contents.innerHTML = '<ul class="collection">' + teams + '</ul>'
            const detil = document.querySelectorAll('.secondary-content');
            detil.forEach(btn=>{
                btn.onclick=(event)=>{
                    ShowTeamInfo(event.target.dataset.id);
                }
            })
        }).catch(err => {
            console.error(err);
        })
}

function ShowTeamInfo(id){
    title.innerHTML = "Squad Team";
    let url = baseUrl + "teams/" + id;
    fetch(url, fetchHeader)
        .then(response => response.json())
        .then(resJson => {
            console.log(resJson.squad);
            let squad = "";
            resJson.squad.forEach(personil => {
                squad += `
                <tr>
                    <td class="center">${personil.name}</td>
                    <td class="center">${personil.position}</td>
                    <td class="center">${personil.countryOfBirth}</td>
                    <td class="center">${personil.nationality}</td>
                </tr>
                `
            });
            contents.innerHTML = `
                <div class="card">
                    <table class="striped responsive-table">
                        <thead>
                            <th class="center">Name</th>
                            <th class="center">Position</th>
                            <th class="center">Country of Birth</th>
                            <th class="center">Nationality</th>
                        </thead>
                        <tbody>
                            ${squad}
                        </tbody>
                    </table>
                </div>
            `;
        }).catch(err => {
            console.error(err);
        })
}

function getListStandings() {
    title.innerHTML = "Standings";
    fetch(standingEndPoin, fetchHeader)
        .then(response => response.json())
        .then(resJson => {
            console.log(resJson.standings[0]);
            let teams = "";
            let i = 1;
            resJson.standings[0].table.forEach(team => {
                teams += `
                <tr>
                    <td style="padding-left:20px;" class="center">${i}.</td>
                    <td><img src="${team.team.crestUrl}" alt="${team.team.name}" width="30px">&emsp;${team.team.name}</td>
                    <td class="center">${team.playedGames}</td>
                    <td class="center">${team.won}</td>
                    <td class="center">${team.draw}</td>
                    <td class="center">${team.lost}</td>
                    <td class="center">${team.points}</td>
                </tr>
                `;
                i++;
            });
            contents.innerHTML = `
                <div class="card">
                    <table class="striped responsive-table">
                        <thead>
                            <th class="center">Club</th>
                            <th></th>
                            <th class="center">MP</th>
                            <th class="center">W</th>
                            <th class="center">D</th>
                            <th class="center">L</th>
                            <th class="center">Pts</th>
                        </thead>
                        <tbody>
                            ${teams}
                        </tbody>
                    </table>
                </div>
            `;
        }).catch(err => {
            console.error(err);
        })
}

function getListMatches() {
    title.innerHTML = "Matches";
    fetch(matchEndPoin, fetchHeader)
        .then(response => response.json())
        .then(resJson => {
            console.log(resJson.matches);
            let matchs = "";
            let i = 1;
            resJson.matches.forEach(match => {
                let d = new Date(match.utcDate).toLocaleDateString("id");
                let scoreHomeTeam = (match.score.fullTime.homeTeam == null ? 0 : match.score.fullTime.homeTeam);
                let scoreAwayTeam = (match.score.fullTime.awayTeam == null ? 0 : match.score.fullTime.awayTeam);
                matchs += `
                <tr>
                    <td style="padding-left:20px;" class="center">${i}.</td>
                    <td>${match.homeTeam.name} vs ${match.awayTeam.name}</td>
                    <td class="center">${d}</td>
                    <td class="center">${scoreHomeTeam}:${scoreAwayTeam}</td>
                </tr>
                `;
                i++;

            });
            contents.innerHTML = `
                <div class="card">
                    <table class="striped responsive-table">
                        <thead>
                            <th></th>
                            <th>Club</th>
                            <th class="center">Date</th>
                            <th class="center">Full Time</th>
                        </thead>
                        <tbody>
                            ${matchs}
                        </tbody>
                    </table>
                </div>
            `;
        }).catch(err => {
            console.error(err);
        })
}

function loadPage(page) {
    switch (page) {
        case "teams":
            getListTeams();
            break;
        case "standings":
            getListStandings();
            break;
        case "matches":
            getListMatches();
            break;
    }
}

document.addEventListener('DOMContentLoaded', function () {
    var elems = document.querySelectorAll('.sidenav');
    var instances = M.Sidenav.init(elems);

    document.querySelectorAll(".sidenav a, .topnav a").forEach(elm => {
        elm.addEventListener("click", evt => {
            let sideNav = document.querySelector(".sidenav");
            M.Sidenav.getInstance(sideNav).close();
            page = evt.target.getAttribute("href").substr(1);
            loadPage(page);
        })
    })
    var page = window.location.hash.substr(1);
    if (page === "" || page === "!") page = "teams";
    loadPage(page);
});