//#region Initialisers
// CACHE BUSTER v1.4 - Check entrancepos == 0 to trigger reset
let CurrentSeason;
let CurrentChallenge;
let CurrentEpisode;

let villain = false;
let hero = false;

let songschosen = "";
let premreform = false;

let howmanp = 0;
let premstep = 0;

let songcharts = [];

let shouldactivateepisode = false;
let selectedChallengeType = null;

let groupmaking = false;

let entrancepos = 0;
let organized = 0;

let firstpex = false;
let secondpex = false;

let secondGroupEntrancesShown = false;

let CustomCast = [];

let customqueens = [];
if(localStorage.getItem("customqueens") == undefined)
  localStorage.setItem("customqueens", JSON.stringify(customqueens));

let done = false;

let doublewin = false;
let firstwinner = false;
let threewayls = false;

let SlayedChallenge = [];
let GreatChallenge = [];
let GoodChallenge = [];
let BadChallenge = [];
let FloppedChallenge = [];

let SlayedRunway = [];
let GreatRunway = [];
let GoodRunway = [];
let BadRunway = [];
let FloppedRunway = [];

let Tops = [];
let Bottoms = [];
let Safes = [];
let Critiqued = [];
let Steps = 0;
let CritiquesChoice = 0;
let BottomQueens = [];
let TopsQueens = [];
let randomtop;
let randombtm;

let lsc1 = [];
let lsc2 = [];

let firstprem = [];
let secondprem = [];

let as7cast = [];

let top4 = [];
let temp = [];

let originaltop = [];

let starscount = [];

// Badonka Dunk twist variables
let badonkaDunkLoser = null;
let badonkaDunkPulledLever = null;

let riggingQueens = [];
let riggingEpisodeIndex = null;
let riggingLastEpisodeIndex = -1;
let riggingActive = false;
let riggingReturnCallback = null;
let riggingEpisodeOutcomes = {};


let rateAQueenState = {
  active: false,
  seasonKey: null,
  lastEpisodeResults: null,
  displayedEpisodeIndex: null,
  carryOverQueen: null,
  pendingShowdown: false,
  showdownQueens: null,
  showdownActive: false,
  lowestByEpisode: {}
};


let reads = [
  ", you\'re so old you\'re still on MySpace.com.",
  "Sweetie, I\'m sorry! If you don\'t have a wrist band you can\'t be in here for the meet and greet!"
];

let rusicalcastsizes =
[
 11,
 10,
 9,
 7
];
class Screen {
  constructor() {
      this.MainScreen = document.querySelector("div.MainArea");
  }

  clean() {
      this.MainScreen.innerHTML = '';
}

let lipsyncssongs = [];

//#endregion
//#region Classes
class StoryLine{
  constructor(Queens, Type, Desc, EpS, EpE)
  {
    this.queens = Queens;
    this.type = Type;
    this.description = Desc
    this.started = EpS;
    this.ended = EpE;
  }
}
class Animal{
  constructor(Name, Acting, Improv, Comedy, Dance, Design, Runway, Lipsync, Branding, Charisma, Kindness, Shadyness, Image = "noimage", IsCustom = false)
  {
      this.name = Name;
      this.acting = Acting;
      this.improv = Improv;
      this.comedy = Comedy;
      this.dance = Dance;
      this.design = Design;
      this.runway = Runway;
      this.lipsync = Lipsync;
      this.branding = Branding;
      this.charisma = Charisma;
      this.kindness = Kindness;
      this.shadyness = Shadyness;

      if(IsCustom==false)
      {
        this.image = "Images/Queens/Animals/"+Image+".webp";
      }
      else
      {
        this.image = Image;
      }

      if(Image=="noimage")
      {

      }
  }
}

class LipsyncSong{
  constructor(Queens, Song, Episode, type, loser)
  {
    this.queens = Queens;
    this.song = Song;
    this.ep = Episode;
    this.type = type;
    this.winnnerorloser = loser;
  }
}

class Season {
  constructor(Name, Cast, Host, Finale, LC, Lipsync, Premiere, Country)
  {
    this.seasonname = Name;
    this.fullCast = Cast;

    this.orgfullcast = [];
    if(this.orgfullcast.length==0)
      for(let i =0; i < this.fullCast.length; i++)
      {
        this.orgfullcast.push(this.fullCast[i]);
      }

    this.currentCast = [];
    if(this.currentCast.length==0)
      for(let i =0; i < this.fullCast.length; i++)
      {
        
        this.currentCast.push(this.fullCast[i]);
      }

    this.lipsyncs = [];
    this.lastchallenge = LC;
    this.eliminatedCast = [];
    this.episodes = [];
    this.doubleShantay = false;
    this.doubleSashay = false;
    this.enableSaves = true;
    this.host = Host;
    this.finaleformat = Finale;
    this.lipsyncformat = Lipsync;
    this.premiereformat = Premiere;
    this.country = Country;

    this.storylines = [];

    this.events = [];

    this.snatchgamecharacter;

    this.rusicalrole;
    
    this.actingchallenges = 0;
    this.balls = 0;
    this.choreochallenges = 0;
    this.commercialchallenges = 0;
    this.designchallenges = 0;
    this.improvchallenges = 0;
    this.makeoverchallenges = 0;
    this.rusicals = 0;
    this.standupchallenges = 0;
    this.snatchgame = 0;

    this.immunity = false;
    this.animals = false;

    // Badonka Dunk twist (S17) - losing queen pulls lever to try to save themselves
    this.badonkaDunk = false;
    this.badonkaDunkEndEpisode = 6; // Episode where twist ends (0-indexed)
    this.badonkaDunkLevers = [true, false, false, false, false, false, true]; // Levers 1 and 7 save (index 0 and 6)
    this.badonkaDunkPulledLevers = []; // Track which levers have been pulled
  }

  checkTwists(Twists){
    if(Twists.indexOf("Immunities")!= -1)
      this.immunity = true;
    if(Twists.indexOf("Animals")!= -1)
      this.animals = true;
    if(Twists.indexOf("BadonkaDunk")!= -1)
      this.badonkaDunk = true;
  }

  getFullCast()
  {
    return(this.fullCast);
  }

  PushEvent(Event){
    this.events.push(Event);
  }
}

class Episode{
  constructor(Name, Type)
  {
    this.name = Name;
    this.type = Type;
  }
}

class Relation {

  constructor(FirstQ, SecondQ)
  {
    this.points = 0;
    this.status = "Neutral";
    this.fqueen = FirstQ;
    this.squeen = SecondQ;;
    this.color = "#F5EBF5";
  }

  SetRelation(points)
  {
    this.points = this.points + parseInt(points);
  }

  GetRelation()
  {
    return(this.points);
  }

  UpdateStatus()
  {
    if(this.points <=10 && this.points >= -10)
    {
      this.status = "Neutral";
      this.color = "#F5EBF5";
    }
    else if(this.points > 10 && this.points <= 30)
    {
      this.status = "Friendly";
      this.color = "#9bcacc";
    }
    else if(this.points > 30 && this.points<=50)
    {
      this.status = "Friends";
      this.color = "#7ccc9a";
    }
    else if(this.points > 50)
    {
      this.status = "Best Friends";
      this.color = "#9fc985";
    }

    else if(this.points < -10 && this.points >= -30)
    {
      this.status = "Hostile";
      this.color = "#d9a0a0";
    }
    else if(this.points < -30 && this.points >= -50)
    {
      this.status = "Ennemies";
      this.color = "#d66d6d";
    }
    else if(this.points < -50)
    {
      this.status = "Worst Ennemies";
      this.color = "#d13838";
    }
  }

  Sabotage()
  {
    if(getRandomInt(this.points,100)<0)
    {
      return(true);
    }
    else
    {
      return(false);
    }
  }
}

class Events {
  constructor(FirstQ, SecondQ, WhatHappenned, PN, episode)
  {
    this.fqueen = FirstQ;
    this.squeen = SecondQ;
    this.event = WhatHappenned;
    this.pn = PN;
    this.ep = episode;
  }
}

class Queen {

  constructor(Name, Acting, Improv, Comedy, Dance, Design, Runway, Lipsync, Branding, Charisma, Kindness, Shadyness, Image = "noimage", Promo = "nopromo", OriginalSeason = "noseason", IsCustom = false)
  {
      this.storylines = [];
      this.name = Name;
      this.acting = Acting;
      this.improv = Improv;
      this.comedy = Comedy;
      this.dance = Dance;
      this.design = Design;
      this.runway = Runway;
      this.lipsync = Lipsync;
      this.branding = Branding;
      this.charisma = Charisma;
      this.kindness = Kindness;
      this.shadyness = Shadyness;

      this.chocolate = false;

      this.stars = 0;
      this.blocked = [false, "NONE"];
      this.starsperepisode = [];

      this.ballfirlook = 0;
      this.ballseclook = 0;
      this.ballthilook = 0;

      this.favoritism = 0;

      this.lipstick;

      this.premieregroup = "NONE";

      this.relationsships = [];

      this.miniwinner = false;
      this.miniwon = [];

      this.immune = [];

      this.trackrecord = [];

      this.snatchgamecharacter;
      this.rusicalrole;

      this.ppe = 0;
      this.episodeson = 0;

      this.wins = 0;
      this.highs = 0;
      this.safes = 0;
      this.lows = 0;
      this.bottoms = 0;

      this.lipsyncscore = 0;

      this.animal = "";

      this.minichallengeswins = 0;

      this.ogseason = OriginalSeason;
      this.iscustom = IsCustom;
      this.placement = 0;


      if(this.iscustom==false)
      {
        this.image = "Images/Queens/"+this.ogseason+"/"+Image+".webp";
        this.promo = "Images/Promos/"+this.ogseason+"/"+Promo+".webp";
      }
      else
      {
        this.image = Image;
        this.promo = Promo;
      }

      this.perfomancescore = 0;
      this.runwayscore = 0;
      this.finalscore = 0;
      this.finalescore = 0;
      this.lipsyncscore = 0;
      this.oglipsyncscore = 0;
  }

  GetScore(min, max, stat = 0)
  {
    return((getRandomInt(min,max))-stat);
  }

  GetName()
  {
    return(this.name);
  }

  GetPlacement()
  {
    return(this.placement);
  }

  GetLipsync()
  {
    this.lipsyncscore = this.GetScore(0,this.lipsync,0);
    if(this.animal != "")
    {
      this.lipsyncscore += this.animal.lipsync;
    }
    this.oglipsyncscore = this.lipsyncscore;
    this.lipsyncscore = this.lipsyncscore + this.favoritism;
  }

  GetASLipsync()
  {
    this.lipsyncscore = this.GetScore(0,this.lipsync,0);
    if(this.animal != "")
    {
      this.lipsyncscore += this.animal.lipsync;
    }
  }

  ChangeRelation(Queen,points)
  {
    let finalpoint = points;
    finalpoint = finalpoint - (Queen.shadyness - Queen.kindness) ;
    for (let index = 0; index < this.relationsships.length; index++) {
      if(this.relationsships[index].squeen === Queen)
      {
        this.relationsships[index].SetRelation(finalpoint);
      }
    }
  }

  GetSabotage(Queen)
  {
    for (let index = 0; index < this.relationsships.length; index++) {
      if(this.relationsships[index].squeen === Queen)
      {
        return(this.relationsships[index].Sabotage());
      }
    }
  }

  GetPoints(Queen)
  {
    for (let index = 0; index < this.relationsships.length; index++) {
      if(this.relationsships[index].squeen === Queen)
      {
        return(this.relationsships[index].points);
      }
    }
  }

  GetAS7Lipsync()
  {
    this.lipsyncscore = this.GetScore(0,this.lipsync,0)+this.stars;
    if(this.animal != "")
    {
      this.lipsyncscore -= this.animal.lipsync;
    }
  }

  GetMakeover()
  {
    this.perfomancescore = this.GetScore(25,45,this.branding+this.runway);
    if(this.animal != "")
    {
      this.perfomancescore -= this.animal.branding;
      this.perfomancescore -= this.animal.runway;
    }
  }

  GetCommercial()
  {
    this.perfomancescore = this.GetScore(45,65,this.branding+this.charisma+this.acting+this.improv);
    if(this.animal != "")
    {
      this.perfomancescore -= this.animal.branding;
      this.perfomancescore -= this.animal.charisma;
      this.perfomancescore -= this.animal.acting;
      this.perfomancescore -= this.animal.improv;
    }
  }

  GetImprov()
  {
    this.perfomancescore = this.GetScore(15,45,this.improv);
    if(this.animal != "")
    {
      this.perfomancescore -= this.animal.improv;
    }

  }

  GetStandUp()
  {
    this.perfomancescore = this.GetScore(25,55,this.comedy+this.charisma);
    if(this.animal != "")
    {
      this.perfomancescore -= this.animal.comedy;
      this.perfomancescore -= this.animal.charisma;
    }
  }

  GetActing()
  {
    this.perfomancescore = this.GetScore(15,45,this.acting);
    if(this.animal != "")
    {
      this.perfomancescore -= this.animal.acting;
    }
  }

  GetDancing()
  {
    this.perfomancescore = this.GetScore(15,45,this.dance);
    if(this.animal != "")
    {
      this.perfomancescore -= this.animal.dance;
    }
  }

  GetSnatchGame()
  {
    this.perfomancescore = this.GetScore(35,65,this.comedy+this.acting+this.improv);
    if(this.animal != "")
    {
      this.perfomancescore -= this.animal.comedy;
      this.perfomancescore -= this.animal.acting;
      this.perfomancescore -= this.animal.improv;
    }
  }

  GetRusical()
  {
    this.perfomancescore = this.GetScore(35,55,this.dance+this.charisma+this.acting);
    if(this.animal != "")
    {
      this.perfomancescore -= this.animal.dance;
      this.perfomancescore -= this.animal.charisma;
      this.perfomancescore -= this.animal.acting;
    }
  }

  GetRumix()
  {
    this.perfomancescore = this.GetScore(35,65,this.charisma+this.dance+this.branding);
    if(this.animal != "")
    {
      this.perfomancescore -= this.animal.charisma;
      this.perfomancescore -= this.animal.dance;
      this.perfomancescore -= this.animal.branding;
    }
  }

  GetTalentShow()
  {
    this.perfomancescore = this.GetScore(85,100,this.acting+this.improv+this.comedy+this.dance+this.lipsync+this.charisma+this.branding+this.design);
    if(this.animal != "")
    {
      this.perfomancescore -= this.animal.acting;
      this.perfomancescore -= this.animal.improv;
      this.perfomancescore -= this.animal.comedy;
      this.perfomancescore -= this.animal.dance;
      this.perfomancescore -= this.animal.lipsync;
      this.perfomancescore -= this.animal.charisma;
      this.perfomancescore -= this.animal.branding;
      this.perfomancescore -= this.animal.design;
    }
  }

  GetMusicV()
  {
    this.perfomancescore = this.GetScore(15,45,this.dance);
    if(this.animal != "")
    {
      this.perfomancescore -= this.animal.dance;
    }
  }

  getFinalScore()
  {
    this.finalescore = this.GetScore(0,this.lipsync,0);
    if(this.animal != "")
    {
      this.finalescore += this.animal.lipsync;
    }
    this.finalescore = this.finalescore + this.favoritism;
  }

  getRunway() {
    this.runwayscore = this.GetScore(0, this.runway+2);
    this.runwayscore = this.runwayscore+(this.runway*0.3);
    if(this.animal != "")
    {
      this.perfomancescore += this.animal.runway;
    }
  }

  getBall() {
    this.ballfirlook = this.GetScore(0, this.runway+2);
    this.ballfirlook = this.ballfirlook+(this.runway*0.3);

    this.ballseclook = this.GetScore(0, this.runway+2);
    this.ballseclook = this.ballseclook+(this.runway*0.3);

    this.ballthilook = this.GetScore(15,35,this.design);

    if(this.animal != "")
    {
      this.ballthilook -= this.animal.design;
      this.ballseclook += this.animal.runway;
      this.ballfirlook += this.animal.runway;
    }

    this.finalscore = this.ballthilook+(17-this.ballfirlook)+(17-this.ballseclook);
  }

  GetDesignScore(bonus = 0)
  {
    if(getRandomInt(0,1)==0 && this.miniwinner == true)
    {
      this.perfomancescore = this.GetScore(15,45,this.design+bonus);
      if(this.animal != "")
      {
        this.perfomancescore -= this.animal.design;
      }
      this.finalscore = this.perfomancescore;
    }
    else
    {
      this.perfomancescore = this.GetScore(15,45,this.design);
      if(this.animal != "")
      {
        this.perfomancescore -= this.animal.design;
      }
      this.finalscore = this.perfomancescore;
    }
  }
}

  createTrackRecords(){
    console.log("=== CREATE TRACK RECORDS TABLE ===");
    console.log("Episodes count:", CurrentSeason.episodes.length);

    // Validate and fix track record lengths BEFORE rendering
    console.log("\n🔍 Validating track record lengths before rendering:");
    for(let q = 0; q < CurrentSeason.currentCast.length; q++)
    {
      let queen = CurrentSeason.currentCast[q];
      if(queen.trackrecord)
      {
        console.log(`   ${queen.name}: track record length ${queen.trackrecord.length}, episodes ${CurrentSeason.episodes.length}`);
        if(queen.trackrecord.length > CurrentSeason.episodes.length)
        {
          console.error(`   ❌ ERROR: ${queen.name} has ${queen.trackrecord.length} entries but only ${CurrentSeason.episodes.length} episodes!`);
          console.error(`   This would create ${queen.trackrecord.length - CurrentSeason.episodes.length} duplicate column(s)!`);
          console.error(`   TRIMMING to correct length...`);
          queen.trackrecord = queen.trackrecord.slice(0, CurrentSeason.episodes.length);
          console.log(`   ✅ Fixed: new length = ${queen.trackrecord.length}`);
        }
      }
    }
    for(let q = 0; q < CurrentSeason.eliminatedCast.length; q++)
    {
      let queen = CurrentSeason.eliminatedCast[q];
      if(queen.trackrecord)
      {
        console.log(`   ${queen.name}: track record length ${queen.trackrecord.length}, episodes ${CurrentSeason.episodes.length}`);
        if(queen.trackrecord.length > CurrentSeason.episodes.length)
        {
          console.error(`   ❌ ERROR: ${queen.name} has ${queen.trackrecord.length} entries but only ${CurrentSeason.episodes.length} episodes!`);
          console.error(`   TRIMMING to correct length...`);
          queen.trackrecord = queen.trackrecord.slice(0, CurrentSeason.episodes.length);
          console.log(`   ✅ Fixed: new length = ${queen.trackrecord.length}`);
        }
      }
    }

    let putincenter = document.createElement("center");
    let table = document.createElement("table");
    table.setAttribute("id","TR");
    let thead = document.createElement("thead");

    table.setAttribute("class","tr");

    let tbody = document.createElement("tbody");

    let treps = document.createElement("tr");

    let thq = document.createElement("th");
    thq.innerHTML = "Queens";

    thq.setAttribute("class","tr");
    thq.setAttribute("style","width: 100px;")

    treps.append(thq);

    let photos = document.createElement("th");
    photos.innerHTML = "Photos";

    photos.setAttribute("class","tr");
    photos.setAttribute("style","width: 75px;")

    treps.append(photos);

    console.log(`\n📊 Creating ${CurrentSeason.episodes.length} episode header columns`);
    for(let i = 0; i < CurrentSeason.episodes.length; i++)
    {
      let thep = document.createElement("th");
      let episode = CurrentSeason.episodes[i];
      let episodeType = episode && episode.type ? episode.type.toString().trim() : "";
      if(episodeType === "")
      {
        episodeType = "EP " + (i + 1);
      }
      let typeLabel = episodeType.toUpperCase();
      thep.innerHTML = `<span style="display: block; font-size: 12px; letter-spacing: 0.08em;">${typeLabel}</span>`;
      thep.setAttribute("class","tr");
      thep.setAttribute("style","width: 72px; min-width: 72px; max-width: 72px; text-align: center;");
      treps.append(thep);
    }

    console.log("\n📝 Rendering current cast rows:");
    for(let q = 0; q < CurrentSeason.currentCast.length; q++)
    {
      let queen = CurrentSeason.currentCast[q];
      console.log(`   ${queen.name}: rendering ${queen.trackrecord.length} cells`);

      let track = document.createElement("tr");

      let qname = document.createElement("td");

      qname.innerHTML = queen.GetName();

      if(CurrentSeason.animals == true){
        qname.innerHTML += "<br><small>("+queen.animal.name+")</small>";
      }

      qname.setAttribute("class","trq");

      qname.setAttribute("style","height : 50px;");

      track.append(qname);

      let td = document.createElement("td");

      td.setAttribute("style", "background: url("+ queen.image +"); background-size: 102px 102px; background-position: center;");

      track.append(td);

      // CRITICAL: Only render cells up to CurrentSeason.episodes.length
      let maxCells = Math.min(queen.trackrecord.length, CurrentSeason.episodes.length);
      for(let t = 0; t < maxCells; t++)
      {
        let trtr = document.createElement("td");

        let placementValue = queen.trackrecord[t];
        if(placementValue == null)
        {
          placementValue = "";
        }

        let trimmedPlacement = applyTrackRecordPlacementStyle(trtr, placementValue);

        if(trimmedPlacement !== "")
        {
          // Mini challenge winner removed to prevent cell size changes

          if(queen.immune.indexOf(t+1)!=-1)
          {
            trtr.style.background = "magenta";
            trtr.style.color = "#000000";
            trtr.style.fontWeight = "bold";
          }
        }

        track.append(trtr);
      }

      // Add PPE or Stars column at the end
      let ppeCell = document.createElement("td");
      ppeCell.setAttribute("class","tr");
      ppeCell.setAttribute("style","text-align: center; font-weight: bold;");
      if(CurrentSeason.lipsyncformat=="AS7")
      {
        ppeCell.innerHTML = queen.stars || 0;
      }
      else
      {
        ppeCell.innerHTML = queen.ppe.toFixed(2);
      }
      track.append(ppeCell);

      tbody.append(track);
    }
    console.log("=== TRACK RECORDS TABLE COMPLETE ===\n");

    console.log("\n📝 Rendering eliminated cast rows:");
    for(let q = 0; q < CurrentSeason.eliminatedCast.length; q++)
    {
      let queen = CurrentSeason.eliminatedCast[q];
      let track = document.createElement("tr");

      let qname = document.createElement("td");

      qname.innerHTML = queen.GetName();

      if(CurrentSeason.animals == true){
        qname.innerHTML += "<br><small>("+queen.animal.name+")</small>";
      }

      qname.setAttribute("class","trq");

      qname.setAttribute("style","height : 50px;");

      track.append(qname);

      let td = document.createElement("td");

      td.setAttribute("style", "background: url("+ queen.image +"); background-size: 102px 102px; background-position: center;");

      track.append(td);

      // Pad track record with empty strings if too short
      while(queen.trackrecord.length < CurrentSeason.episodes.length)
      {
        queen.trackrecord.push('');
      }

      // Trim track record if too long
      if(queen.trackrecord.length > CurrentSeason.episodes.length)
      {
        console.error(`   ❌ ${queen.name} track record too long (${queen.trackrecord.length}), trimming to ${CurrentSeason.episodes.length}`);
        queen.trackrecord = queen.trackrecord.slice(0, CurrentSeason.episodes.length);
      }

      console.log(`   ${queen.name}: rendering ${queen.trackrecord.length} cells`);

      // CRITICAL: Only render cells up to CurrentSeason.episodes.length
      let maxCells = Math.min(queen.trackrecord.length, CurrentSeason.episodes.length);
      for(let t = 0; t < maxCells; t++)
      {
        let trtr = document.createElement("td");

        let placementValue = queen.trackrecord[t];
        if(placementValue == null)
        {
          placementValue = "";
        }

        let trimmedPlacement = applyTrackRecordPlacementStyle(trtr, placementValue);

        if(trimmedPlacement !== "")
        {
          // Mini challenge winner removed to prevent cell size changes

          if(queen.immune.indexOf(t+1)!=-1)
          {
            trtr.style.background = "magenta";
            trtr.style.color = "#000000";
            trtr.style.fontWeight = "bold";
          }
        }

        track.append(trtr);
      }

      // Add PPE or Stars column at the end
      let ppeCell = document.createElement("td");
      ppeCell.setAttribute("class","tr");
      ppeCell.setAttribute("style","text-align: center; font-weight: bold;");
      if(CurrentSeason.lipsyncformat=="AS7")
      {
        ppeCell.innerHTML = queen.stars || 0;
      }
      else
      {
        ppeCell.innerHTML = queen.ppe.toFixed(2);
      }
      track.append(ppeCell);

      tbody.append(track);
    }

    if(CurrentSeason.lipsyncformat=="AS7")
    {
      let thq = document.createElement("th");
      thq.innerHTML = "Stars";
      
      thq.setAttribute("class","tr");
      thq.setAttribute("style","width: 45px;")
      treps.append(thq);
    }
    else
    {
      let thq = document.createElement("th");
      thq.innerHTML = "PPE";
      
      thq.setAttribute("class","tr");
      thq.setAttribute("style","width: 45px;")
      treps.append(thq);
    }
    thead.append(treps);
    table.append(thead);
    table.append(tbody);

    let br = document.createElement("br");
    putincenter.append(table);

    this.MainScreen.append(putincenter);
    this.MainScreen.append(br);
  }
  createPromoTable(){

      if(CurrentSeason.episodes.length == 0)
      {
        for (let index = 0; index < CurrentSeason.fullCast.length; index++) {
          
          for (let q = 0; q < CurrentSeason.fullCast.length; q++) {
            CurrentSeason.fullCast[index].relationsships.push(new Relation(CurrentSeason.fullCast[index], CurrentSeason.fullCast[q]));
          }
        }
      }

      if(CurrentSeason.premiereformat=="NORMAL")
      {
        CurrentSeason.fullCast.sort((a, b) => a.placement - b.placement);
        let putincenter = document.createElement("center");
        let table = document.createElement("table");
        table.setAttribute("style", "border-spacing: 15px 12px");
        let thead = document.createElement("thead");

        let tbody = document.createElement("tbody");

        let rows = ~~(CurrentSeason.fullCast.length/4);
        let rest = CurrentSeason.fullCast.length%4;

        if(rest!=0)
        {
          rows++;
        }
        for(let i = 0; i < rows; i++)
        {
          let tr = document.createElement("tr");
          if(i!=rows-1 || rest==0)
          {
            for(let q = 0; q<4;q++)
            {
              let td = document.createElement("td");
              if(CurrentSeason.eliminatedCast.indexOf(CurrentSeason.fullCast[q+(i*4)])!=-1)
              {
                td.setAttribute("style", "background: url("+ CurrentSeason.fullCast[q+(i*4)].promo +"); background-size: 200px 200px; background-position: center; height: 190px; width: 190px; -webkit-filter: grayscale(100%);filter: grayscale(100%);")
              }
              else
              {
              td.setAttribute("style", "background: url("+ CurrentSeason.fullCast[q+(i*4)].promo +"); background-size: 200px 200px; background-position: center; height: 190px; width: 190px;");
              }
              td.setAttribute("class","promos");
              tr.append(td);
            }
            tbody.append(tr);
            let tr2 = document.createElement("tr");
            for(let q = 0; q<4;q++)
            {
              let td = document.createElement("td");
              let name = document.createElement("p");
              name.setAttribute("style","font-weight: bold; font-size: 15px;");
              let placement = document.createElement("p");
              switch(CurrentSeason.fullCast[q+(i*4)].GetPlacement())
              {
                case 0:
                  placement.innerHTML = "TBA";
                  break;
                case 1:
                  placement.innerHTML = "1st";
                  break;
                case 2:
                  placement.innerHTML = "2nd";
                  break;
                case 3:
                  placement.innerHTML = "3rd";
                  break;
                default:
                  placement.innerHTML = CurrentSeason.fullCast[q+(i*4)].GetPlacement()+"th";
                  break;
              }
              name.innerHTML = CurrentSeason.fullCast[q+(i*4)].GetName();
              td.append(name);
              td.append(placement);
              td.setAttribute("class","promos");
              tr2.append(td);
            }
            tbody.append(tr2);
          }
          else
          {
            for(let q = 0; q<rest; q++)
            {
              let td = document.createElement("td");
              if(CurrentSeason.eliminatedCast.indexOf(CurrentSeason.fullCast[q+(i*4)])!=-1)
              {
                td.setAttribute("style", "background: url("+ CurrentSeason.fullCast[q+(i*4)].promo +"); background-size: 200px 200px; background-position: center; height: 190px; width: 190px; -webkit-filter: grayscale(100%);filter: grayscale(100%);")
              }
              else
              {
              td.setAttribute("style", "background: url("+ CurrentSeason.fullCast[q+(i*4)].promo +"); background-size: 200px 200px; background-position: center; height: 190px; width: 190px;");
              }
              td.setAttribute("class","promos");
              tr.append(td);
            }
            let tr2 = document.createElement("tr");
            tbody.append(tr);
            for(let q = 0; q<rest;q++)
            {
              let td = document.createElement("td");
              let name = document.createElement("p");
              name.setAttribute("style","font-weight: bold; font-size: 15px;");
              let placement = document.createElement("p");
              switch(CurrentSeason.fullCast[q+(i*4)].GetPlacement())
              {
                case 0:
                  placement.innerHTML = "TBA";
                  break;
                case 1:
                  placement.innerHTML = "1st";
                  break;
                case 2:
                  placement.innerHTML = "2nd";
                  break;
                case 3:
                  placement.innerHTML = "3rd";
                  break;
                default:
                  placement.innerHTML = CurrentSeason.fullCast[q+(i*4)].GetPlacement()+"th";
                  break;
              }
              name.innerHTML = CurrentSeason.fullCast[q+(i*4)].GetName();
              td.append(name);
              td.append(placement);
              td.setAttribute("class","promos");
              tr2.append(td);
            }
            tbody.append(tr2);
          }
        }
        table.append(thead);
        table.append(tbody);
        let br = document.createElement("br");
        putincenter.append(table);
        this.MainScreen.append(putincenter);
        this.MainScreen.append(br);
    }
    else
    {
      if(CurrentSeason.premiereformat == "S6" || CurrentSeason.premiereformat == "S12")
      {
        if(CurrentSeason.episodes.length < 3  && premstep < 2)
        {
          firstprem.sort((a, b) => a.placement - b.placement);
          let putincenter = document.createElement("center");
          let table = document.createElement("table");
          table.setAttribute("style", "border-spacing: 15px 12px");
          let thead = document.createElement("thead");

          let tbody = document.createElement("tbody");

          let rows = ~~(firstprem.length/4);
          let rest = firstprem.length%4;

          if(rest!=0)
          {
            rows++;
          }
          for(let i = 0; i < rows; i++)
          {
            let tr = document.createElement("tr");
            if(i!=rows-1 || rest==0)
            {
              for(let q = 0; q<4;q++)
              {
                let td = document.createElement("td");
                if(CurrentSeason.eliminatedCast.indexOf(firstprem[q+(i*4)])!=-1)
                {
                  td.setAttribute("style", "background: url("+ firstprem[q+(i*4)].promo +"); background-size: 200px 200px; background-position: center; height: 190px; width: 190px; -webkit-filter: grayscale(100%);filter: grayscale(100%);")
                }
                else
                {
                td.setAttribute("style", "background: url("+ firstprem[q+(i*4)].promo +"); background-size: 200px 200px; background-position: center; height: 190px; width: 190px;");
                }
                td.setAttribute("class","promos");
                tr.append(td);
              }
              tbody.append(tr);
              let tr2 = document.createElement("tr");
              for(let q = 0; q<4;q++)
              {
                let td = document.createElement("td");
                let name = document.createElement("p");
                name.setAttribute("style","font-weight: bold; font-size: 15px;");
                let placement = document.createElement("p");
                switch(firstprem[q+(i*4)].GetPlacement())
                {
                  case 0:
                    placement.innerHTML = "TBA";
                    break;
                  case 1:
                    placement.innerHTML = "1st";
                    break;
                  case 2:
                    placement.innerHTML = "2nd";
                    break;
                  case 3:
                    placement.innerHTML = "3rd";
                    break;
                  default:
                    placement.innerHTML = firstprem[q+(i*4)].GetPlacement()+"th";
                    break;
                }
                name.innerHTML = firstprem[q+(i*4)].GetName();
                td.append(name);
                td.append(placement);
                td.setAttribute("class","promos");
                tr2.append(td);
              }
              tbody.append(tr2);
            }
            else
            {
              for(let q = 0; q<rest; q++)
              {
                let td = document.createElement("td");
                if(CurrentSeason.eliminatedCast.indexOf(firstprem[q+(i*4)])!=-1)
                {
                  td.setAttribute("style", "background: url("+ firstprem[q+(i*4)].promo +"); background-size: 200px 200px; background-position: center; height: 190px; width: 190px; -webkit-filter: grayscale(100%);filter: grayscale(100%);")
                }
                else
                {
                td.setAttribute("style", "background: url("+ firstprem[q+(i*4)].promo +"); background-size: 200px 200px; background-position: center; height: 190px; width: 190px;");
                }
                td.setAttribute("class","promos");
                tr.append(td);
              }
              let tr2 = document.createElement("tr");
              tbody.append(tr);
              for(let q = 0; q<rest;q++)
              {
                let td = document.createElement("td");
                let name = document.createElement("p");
                name.setAttribute("style","font-weight: bold; font-size: 15px;");
                let placement = document.createElement("p");
                switch(firstprem[q+(i*4)].GetPlacement())
                {
                  case 0:
                    placement.innerHTML = "TBA";
                    break;
                  case 1:
                    placement.innerHTML = "1st";
                    break;
                  case 2:
                    placement.innerHTML = "2nd";
                    break;
                  case 3:
                    placement.innerHTML = "3rd";
                    break;
                  default:
                    placement.innerHTML = firstprem[q+(i*4)].GetPlacement()+"th";
                    break;
                }
                name.innerHTML = firstprem[q+(i*4)].GetName();
                td.append(name);
                td.append(placement);
                td.setAttribute("class","promos");
                tr2.append(td);
              }
              tbody.append(tr2);
            }
          }
          table.append(thead);
          table.append(tbody);
          let br = document.createElement("br");
          putincenter.append(table);
          this.MainScreen.append(putincenter);
          this.MainScreen.append(br);
          
          for (let index = 0; index < firstprem.length; index++) {
            if(CurrentSeason.eliminatedCast.indexOf(firstprem[index])!=-1)
            {
              firstprem.splice(index);
            }
          }

          if(firstpex == false)
          {
            CurrentSeason.currentCast = [];
            for (let index = 0; index < firstprem.length; index++) {
              CurrentSeason.currentCast.push(firstprem[index]);
            }

            for (let index = 0; index < secondprem.length; index++) {
              secondprem[index].trackrecord.push('');
            }
            firstpex = true;
          }
        }
        else if(CurrentSeason.episodes.length <3  && premstep < 4)
        {
          secondprem.sort((a, b) => a.placement - b.placement);
          let putincenter = document.createElement("center");
          let table = document.createElement("table");
          table.setAttribute("style", "border-spacing: 15px 12px");
          let thead = document.createElement("thead");

          let tbody = document.createElement("tbody");

          let rows = ~~(secondprem.length/4);
          let rest = secondprem.length%4;

          if(rest!=0)
          {
            rows++;
          }
          for(let i = 0; i < rows; i++)
          {
            let tr = document.createElement("tr");
            if(i!=rows-1 || rest==0)
            {
              for(let q = 0; q<4;q++)
              {
                let td = document.createElement("td");
                if(CurrentSeason.eliminatedCast.indexOf(secondprem[q+(i*4)])!=-1)
                {
                  td.setAttribute("style", "background: url("+ secondprem[q+(i*4)].promo +"); background-size: 200px 200px; background-position: center; height: 190px; width: 190px; -webkit-filter: grayscale(100%);filter: grayscale(100%);")
                }
                else
                {
                td.setAttribute("style", "background: url("+ secondprem[q+(i*4)].promo +"); background-size: 200px 200px; background-position: center; height: 190px; width: 190px;");
                }
                td.setAttribute("class","promos");
                tr.append(td);
              }
              tbody.append(tr);
              let tr2 = document.createElement("tr");
              for(let q = 0; q<4;q++)
              {
                let td = document.createElement("td");
                let name = document.createElement("p");
                name.setAttribute("style","font-weight: bold; font-size: 15px;");
                let placement = document.createElement("p");
                switch(secondprem[q+(i*4)].GetPlacement())
                {
                  case 0:
                    placement.innerHTML = "TBA";
                    break;
                  case 1:
                    placement.innerHTML = "1st";
                    break;
                  case 2:
                    placement.innerHTML = "2nd";
                    break;
                  case 3:
                    placement.innerHTML = "3rd";
                    break;
                  default:
                    placement.innerHTML = secondprem[q+(i*4)].GetPlacement()+"th";
                    break;
                }
                name.innerHTML = secondprem[q+(i*4)].GetName();
                td.append(name);
                td.append(placement);
                td.setAttribute("class","promos");
                tr2.append(td);
              }
              tbody.append(tr2);
            }
            else
            {
              for(let q = 0; q<rest; q++)
              {
                let td = document.createElement("td");
                if(CurrentSeason.eliminatedCast.indexOf(secondprem[q+(i*4)])!=-1)
                {
                  td.setAttribute("style", "background: url("+ secondprem[q+(i*4)].promo +"); background-size: 200px 200px; background-position: center; height: 190px; width: 190px; -webkit-filter: grayscale(100%);filter: grayscale(100%);")
                }
                else
                {
                td.setAttribute("style", "background: url("+secondprem[q+(i*4)].promo +"); background-size: 200px 200px; background-position: center; height: 190px; width: 190px;");
                }
                td.setAttribute("class","promos");
                tr.append(td);
              }
              let tr2 = document.createElement("tr");
              tbody.append(tr);
              for(let q = 0; q<rest;q++)
              {
                let td = document.createElement("td");
                let name = document.createElement("p");
                name.setAttribute("style","font-weight: bold; font-size: 15px;");
                let placement = document.createElement("p");
                switch(secondprem[q+(i*4)].GetPlacement())
                {
                  case 0:
                    placement.innerHTML = "TBA";
                    break;
                  case 1:
                    placement.innerHTML = "1st";
                    break;
                  case 2:
                    placement.innerHTML = "2nd";
                    break;
                  case 3:
                    placement.innerHTML = "3rd";
                    break;
                  default:
                    placement.innerHTML = secondprem[q+(i*4)].GetPlacement()+"th";
                    break;
                }
                name.innerHTML = secondprem[q+(i*4)].GetName();
                td.append(name);
                td.append(placement);
                td.setAttribute("class","promos");
                tr2.append(td);
              }
              tbody.append(tr2);
            }
          }
          table.append(thead);
          table.append(tbody);
          let br = document.createElement("br");
          putincenter.append(table);
          this.MainScreen.append(putincenter);
          this.MainScreen.append(br);

          for (let index = 0; index < secondprem.length; index++) {
            if(CurrentSeason.eliminatedCast.indexOf(secondprem[index])!=-1)
            {
              secondprem.splice(index);
            }
          }

          if(secondpex == false)
          {
            CurrentSeason.currentCast = [];
            for (let index = 0; index < secondprem.length; index++) {
              CurrentSeason.currentCast.push(secondprem[index]);
            }

            for (let index = 0; index < firstprem.length; index++) {
              firstprem[index].trackrecord.push('');
            }
            secondpex = true;
          }
        }
        else
        {
        CurrentSeason.fullCast.sort((a, b) => a.placement - b.placement);
        let putincenter = document.createElement("center");
        let table = document.createElement("table");
        table.setAttribute("style", "border-spacing: 15px 12px");
        let thead = document.createElement("thead");

        let tbody = document.createElement("tbody");

        let rows = ~~(CurrentSeason.fullCast.length/4);
        let rest = CurrentSeason.fullCast.length%4;

        if(rest!=0)
        {
          rows++;
        }
        for(let i = 0; i < rows; i++)
        {
          let tr = document.createElement("tr");
          if(i!=rows-1 || rest==0)
          {
            for(let q = 0; q<4;q++)
            {
              let td = document.createElement("td");
              if(CurrentSeason.eliminatedCast.indexOf(CurrentSeason.fullCast[q+(i*4)])!=-1)
              {
                td.setAttribute("style", "background: url("+ CurrentSeason.fullCast[q+(i*4)].promo +"); background-size: 200px 200px; background-position: center; height: 190px; width: 190px; -webkit-filter: grayscale(100%);filter: grayscale(100%);")
              }
              else
              {
              td.setAttribute("style", "background: url("+ CurrentSeason.fullCast[q+(i*4)].promo +"); background-size: 200px 200px; background-position: center; height: 190px; width: 190px;");
              }
              td.setAttribute("class","promos");
              tr.append(td);
            }
            tbody.append(tr);
            let tr2 = document.createElement("tr");
            for(let q = 0; q<4;q++)
            {
              let td = document.createElement("td");
              let name = document.createElement("p");
              name.setAttribute("style","font-weight: bold; font-size: 15px;");
              let placement = document.createElement("p");
              switch(CurrentSeason.fullCast[q+(i*4)].GetPlacement())
              {
                case 0:
                  placement.innerHTML = "TBA";
                  break;
                case 1:
                  placement.innerHTML = "1st";
                  break;
                case 2:
                  placement.innerHTML = "2nd";
                  break;
                case 3:
                  placement.innerHTML = "3rd";
                  break;
                default:
                  placement.innerHTML = CurrentSeason.fullCast[q+(i*4)].GetPlacement()+"th";
                  break;
              }
              name.innerHTML = CurrentSeason.fullCast[q+(i*4)].GetName();
              td.append(name);
              td.append(placement);
              td.setAttribute("class","promos");
              tr2.append(td);
            }
            tbody.append(tr2);
          }
          else
          {
            for(let q = 0; q<rest; q++)
            {
              let td = document.createElement("td");
              if(CurrentSeason.eliminatedCast.indexOf(CurrentSeason.fullCast[q+(i*4)])!=-1)
              {
                td.setAttribute("style", "background: url("+ CurrentSeason.fullCast[q+(i*4)].promo +"); background-size: 200px 200px; background-position: center; height: 190px; width: 190px; -webkit-filter: grayscale(100%);filter: grayscale(100%);")
              }
              else
              {
              td.setAttribute("style", "background: url("+ CurrentSeason.fullCast[q+(i*4)].promo +"); background-size: 200px 200px; background-position: center; height: 190px; width: 190px;");
              }
              td.setAttribute("class","promos");
              tr.append(td);
            }
            let tr2 = document.createElement("tr");
            tbody.append(tr);
            for(let q = 0; q<rest;q++)
            {
              let td = document.createElement("td");
              let name = document.createElement("p");
              name.setAttribute("style","font-weight: bold; font-size: 15px;");
              let placement = document.createElement("p");
              switch(CurrentSeason.fullCast[q+(i*4)].GetPlacement())
              {
                case 0:
                  placement.innerHTML = "TBA";
                  break;
                case 1:
                  placement.innerHTML = "1st";
                  break;
                case 2:
                  placement.innerHTML = "2nd";
                  break;
                case 3:
                  placement.innerHTML = "3rd";
                  break;
                default:
                  placement.innerHTML = CurrentSeason.fullCast[q+(i*4)].GetPlacement()+"th";
                  break;
              }
              name.innerHTML = CurrentSeason.fullCast[q+(i*4)].GetName();
              td.append(name);
              td.append(placement);
              td.setAttribute("class","promos");
              tr2.append(td);
            }
            tbody.append(tr2);
          }
        }
        table.append(thead);
        table.append(tbody);
        let br = document.createElement("br");
        putincenter.append(table);
        this.MainScreen.append(putincenter);
        this.MainScreen.append(br);
        }
        premstep++;
      }
    }
  }
}
