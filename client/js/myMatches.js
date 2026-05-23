const matchesList = document.getElementById("matchesList");

async function fetchMyMatches(){

    const token = localStorage.getItem("token");

    if(!token){

        window.location.href = "login.html";

        return;

    }

    try {

        const response = await fetch(

            "http://localhost:5000/api/tournaments/my-matches",

            {
                headers: {
                    "authorization": token
                }
            }

        );

        const tournaments = await response.json();

        matchesList.innerHTML = "";

        tournaments.forEach(tournament => {

            const card = document.createElement("div");

            card.classList.add("tournament-card");

            card.innerHTML = `

                <img src="${tournament.bannerImage}" />

                <div class="card-content">

                    <h2 class="title">${tournament.title}</h2>

                    <div class="details">

                        <div class="detail-box">
                            ${tournament.date}
                        </div>

                        <div class="detail-box">
                            ${tournament.time}
                        </div>

                    </div>

                    <div class="details">

                        <div class="detail-box">
                            Room ID:
                            ${tournament.roomId || "Not Released"}
                        </div>

                        <div class="detail-box">
                            Password:
                            ${tournament.roomPassword || "Not Released"}
                        </div>

                    </div>

                </div>

            `;

            matchesList.appendChild(card);

        });

    } catch(error){

        console.log(error);

    }

}

fetchMyMatches();