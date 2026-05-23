const tournamentList = document.getElementById("tournamentList");

async function fetchTournaments(){

    try {

        const response = await fetch(
            "http://localhost:5000/api/tournaments"
        );

        const tournaments = await response.json();

        tournamentList.innerHTML = "";

        tournaments.forEach(tournament => {

            const percentage =
                (tournament.joinedPlayers / tournament.maxPlayers) * 100;

            const card = document.createElement("div");

            card.classList.add("tournament-card");

            card.innerHTML = `

                <img src="${tournament.bannerImage}" />

                <div class="card-content">

                    <div class="card-top">

                        <span class="tag">${tournament.mode}</span>

                        <span class="tag">${tournament.map}</span>

                    </div>

                    <h2 class="title">${tournament.title}</h2>

                    <div class="details">

                        <div class="detail-box">
                            Prize ₹${tournament.prizePool}
                        </div>

                        <div class="detail-box">
                            Kill ₹${tournament.perKill}
                        </div>

                        <div class="detail-box">
                            Entry ₹${tournament.entryFee}
                        </div>

                        <div class="detail-box">
                            ${tournament.time}
                        </div>

                    </div>

                    <div class="progress-container">

                        <div class="progress-bar"
                            style="width:${percentage}%">
                        </div>

                    </div>

                    <p>
                        ${tournament.joinedPlayers}
                        / ${tournament.maxPlayers} Players
                    </p>

                    <button class="join-btn"
                        onclick="joinTournament('${tournament._id}')">
                        Join Match
                    </button>

                </div>

            `;

            tournamentList.appendChild(card);

        });

    } catch(error){

        console.log(error);

    }

}

fetchTournaments();

async function joinTournament(tournamentId){

    const token = localStorage.getItem("token");

    if(!token){

        alert("Please login first");

        window.location.href = "login.html";

        return;

    }

    try {

        const response = await fetch(

            `http://localhost:5000/api/tournaments/join/${tournamentId}`,

            {
                method: "POST",

                headers: {
                    "Content-Type": "application/json",
                    "authorization": token
                }
            }

        );

        const data = await response.json();

        alert(data.message);

        fetchTournaments();

    } catch(error){

        console.log(error);

    }

}