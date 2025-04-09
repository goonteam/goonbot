import { ActivityType, Client, Events, PresenceUpdateStatus } from "discord.js";

let activitiesList = [ // list of statuses, i think i should add some more
    {
        name: "special lebron clips",
        type: ActivityType.Watching
    },
    {
        name: "lebron gooning competition",
        type: ActivityType.Competing
    },
    {
        name: "indoctrination videos",
        type: ActivityType.Listening
    },
    {
        name: "srb2 using goonsrb2launcher",
        type: ActivityType.Playing
    },
    {
        name: "touchcreator coding stream (TOTALLY REAL)",
        type: ActivityType.Streaming
    },
    {
        name: "youtube",
        type: ActivityType.Watching
    },
    {
        name: "cracked geometry dash from some malware website",
        type: ActivityType.Playing
    },
    {
        name: "a super hard contest, i recomend you dont join",
        type: ActivityType.Competing
    }
]

module.exports = {
    name: Events.ClientReady,
    once: true,
    async execute(bot: Client) {
        console.log(`logged in as ${bot.user?.tag}!`);


        setInterval(() => {
            let randomActivityNumber = Math.floor(Math.random() * activitiesList.length); // generate a random status id

            bot.user?.setPresence({
                status: PresenceUpdateStatus.Idle,
                activities: [activitiesList[randomActivityNumber]] // sets the status
            })
        }, 30 * 1000); // every 30 seconds
        
    }
}