const form = document.getElementById("tournamentForm");

const token = localStorage.getItem("token");

const user = JSON.parse(localStorage.getItem("user"));

if(!token || user.role !== "admin"){

    alert("Admin access only");

    window.location.href = "login.html";

}

form.addEventListener("submit", async (e) => {

    e.preventDefault();

    const tournamentData = {

        title:
            document.getElementById("title").value,

        game:
            document.getElementById("game").value,

        mode:
            document.getElementById("mode").value,

        map:
            document.getElementById("map").value,

        date:
            document.getElementById("date").value,

        time:
            document.getElementById("time").value,

        prizePool:
            document.getElementById("prizePool").value,

        perKill:
            document.getElementById("perKill").value,

        entryFee:
            document.getElementById("entryFee").value,

        maxPlayers:
            document.getElementById("maxPlayers").value,

        bannerImage:
            document.getElementById("bannerImage").value
    };

    try {

        const response = await fetch(

            "http://https://global-esports-api.onrender.com/api/tournaments/create",

            {
                method: "POST",

                headers: {
                    "Content-Type": "application/json",
                    "authorization": token
                },

                body: JSON.stringify(tournamentData)
            }

        );

        const data = await response.json();

        alert(data.message);

        form.reset();

    } catch(error){

        console.log(error);

    }

});
