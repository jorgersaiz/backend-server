const express = require("express");
const app = express();
let cors = require("cors");
const axios = require('axios');

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());

const mongoose = require("mongoose");
const uri = "mongodb+srv://jorger01:Merlincillo921.@cluster0.gs0ud.mongodb.net/lolData"
mongoose.connect(uri,{ useNewUrlParser: true, useUnifiedTopology: true });

let port = process.env.PORT || 3000;
const MatchSchema = new mongoose.Schema({
    champ1Team1: String,
    champ2Team1: String,
    champ3Team1: String,
    champ4Team1: String,
    champ5Team1: String,
    champ1Team2: String,
    champ2Team2: String,
    champ3Team2: String,
    champ4Team2: String,
    champ5Team2: String,
    team1Win: Boolean,
    team2Win: Boolean
});



let MatchModel = mongoose.model("Match", MatchSchema, "matches");






// app.get("/riot/match", function (req, res){
    
    let matchIds = [
        "EUW1_5191234702",
        "EUW1_5191117262",
        "EUW1_5190415390",
        "EUW1_5189583659",
        "EUW1_5189405866",
        "EUW1_5189371312",
        "EUW1_5189125248",
        "EUW1_5186381444",
        "EUW1_5185348988",
        "EUW1_5185322802",
        "EUW1_5185242625",
        "EUW1_5185177183",
        "EUW1_5184562104",
        "EUW1_5179840889",
        "EUW1_5177568699",
        "EUW1_5177601363",
        "EUW1_5175778873",
        "EUW1_5166897649",
        "EUW1_5166851544",
        "EUW1_5164832704",
        "EUW1_5164737209",
        "EUW1_5164649606",
        "EUW1_5164650615",
        "EUW1_5164553597",
        "EUW1_5164378942",
        "EUW1_5164382571",
        "EUW1_5164325113",
        "EUW1_5164098769",
        "EUW1_5162631533",
        "EUW1_5162465417",
        "EUW1_5162300341",
        "EUW1_5159977511",
        "EUW1_5159447675",
        "EUW1_5159297673",
        "EUW1_5159285856",
        "EUW1_5152889971",
        "EUW1_5151021696",
        "EUW1_5150895069",
        "EUW1_5150668814",
        "EUW1_5150702003",
        "EUW1_5149603456",
        "EUW1_5149518415",
        "EUW1_5149427826",
        "EUW1_5148755037",
        "EUW1_5148329985",
        "EUW1_5141210776",
        "EUW1_5139040428",
        "EUW1_5138964638",
        "EUW1_5137234435",
        "EUW1_5137174015",
        "EUW1_5136337300",
        "EUW1_5136292703",
        "EUW1_5136096270",
        "EUW1_5135566005",
        "EUW1_5135377403",
        "EUW1_5135122880",
        "EUW1_5134867561",
        "EUW1_5134870858",
        "EUW1_5134773532",
        "EUW1_5131425539",
        "EUW1_5131335524",
        "EUW1_5127622175",
        "EUW1_5125768954",
        "EUW1_5123798907",
        "EUW1_5123147862",
        "EUW1_5123142008",
        "EUW1_5123094289",
        "EUW1_5122998870",
        "EUW1_5122974453",
        "EUW1_5121701637",
        "EUW1_5121567006",
        "EUW1_5121508878",
        "EUW1_5121294264",
        "EUW1_5121237187",
        "EUW1_5118138338",
        "EUW1_5118097501",
        "EUW1_5118031333",
        "EUW1_5112352412",
        "EUW1_5112282388",
        "EUW1_5109974227",
        "EUW1_5109867110",
        "EUW1_5109851366",
        "EUW1_5109771368",
        "EUW1_5106015869",
        "EUW1_5105907817",
        "EUW1_5105809855",
        "EUW1_5105793547",
        "EUW1_5105677091",
        "EUW1_5095638106",
        "EUW1_5095661050",
        "EUW1_5095490427",
        "EUW1_5093191916",
        "EUW1_5093123235",
        "EUW1_5091681901",
        "EUW1_5091315165",
        "EUW1_5091174970",
        "EUW1_5081761387",
        "EUW1_5081634502",
        "EUW1_5081465623",
        "EUW1_5078810179"
    ]

    

    for ( let id of matchIds){

        let urlDataMatch = `https://europe.api.riotgames.com/lol/match/v5/matches/${id}?api_key=RGAPI-6157fab1-89f5-4638-a028-00be02b18bd2`

        axios.get((urlDataMatch))
        .then((data) => {


            let participants = []
            for (let participant of data.data.info.participants){
                participants.push(participant.championName)

            }

            let obj1 = {
                champ1Team1: "",
                champ2Team1: "",
                champ3Team1: "",
                champ4Team1: "",
                champ5Team1: "",
                champ1Team2: "",
                champ2Team2: "",
                champ3Team2: "",
                champ4Team2: "",
                champ5Team2: ""
            }

            let i = 0
            for (let key in obj1){

                obj1[key] = participants[i]
                i++
            }

            for (let i = 0; i < data.data.info.teams.length; i++){
                if(i == 0){
                    obj1.team1Win = data.data.info.teams[i].win
                } else {
                    obj1.team2Win = data.data.info.teams[i].win
                }
            }

            console.log(obj1);

            let matchOk = new MatchModel(obj1)
            matchOk.save()
        })
        .catch((e) => {
            console.log(e);
        })

    }
    


    // {
    //     accountId: request.body.accountId,
    //     id: request.body.id,
    //     name: request.body.name,
    //     profileIconId:request.body.profileIconId,
    //     puuid: request.body.puuid,
    //     revisionDate: request.body.revisionDate,
    //     summonerLevel: request.body.summonerLevel,
    //     nReported: request.body.nReported
    // }
// })



app.listen(port)