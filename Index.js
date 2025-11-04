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
}

//#endregion
//#region Helper Functions

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function applyTrackRecordPlacementStyle(cell, placement) {
  let trimmed = placement.toString().trim();
  cell.innerHTML = trimmed;

  switch(trimmed) {
    case 'WIN':
      cell.style.background = '#FFD700';
      cell.style.color = '#000';
      cell.style.fontWeight = 'bold';
      break;
    case 'HIGH':
      cell.style.background = '#90EE90';
      cell.style.color = '#000';
      break;
    case 'SAFE':
      cell.style.background = '#87CEEB';
      cell.style.color = '#000';
      break;
    case 'LOW':
      cell.style.background = '#FFA500';
      cell.style.color = '#000';
      break;
    case 'BTM2':
      cell.style.background = '#FF6347';
      cell.style.color = '#fff';
      cell.style.fontWeight = 'bold';
      break;
    case 'ELIM':
      cell.style.background = '#000';
      cell.style.color = '#fff';
      break;
    default:
      cell.style.background = 'transparent';
  }

  return trimmed;
}

//#endregion
//#region Pokémon Queens Data

// Female Pokémon Queens with stats and sprites
const pokemonQueens = [
  new Queen("Gardevoir", 9, 8, 7, 8, 6, 9, 8, 8, 9, 8, 5,
    "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/282.png",
    "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/282.png",
    "Pokemon", false),

  new Queen("Lopunny", 7, 8, 7, 9, 7, 8, 7, 8, 8, 9, 4,
    "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/428.png",
    "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/428.png",
    "Pokemon", false),

  new Queen("Milotic", 8, 6, 5, 7, 6, 10, 7, 9, 9, 9, 3,
    "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/350.png",
    "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/350.png",
    "Pokemon", false),

  new Queen("Primarina", 8, 7, 6, 8, 7, 8, 9, 8, 9, 8, 4,
    "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/730.png",
    "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/730.png",
    "Pokemon", false),

  new Queen("Tsareena", 6, 7, 6, 9, 5, 8, 6, 7, 7, 6, 7,
    "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/763.png",
    "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/763.png",
    "Pokemon", false),

  new Queen("Salazzle", 7, 8, 8, 7, 6, 7, 7, 7, 8, 5, 8,
    "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/758.png",
    "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/758.png",
    "Pokemon", false),

  new Queen("Vespiquen", 6, 6, 5, 6, 7, 7, 6, 8, 7, 7, 6,
    "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/416.png",
    "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/416.png",
    "Pokemon", false),

  new Queen("Nidoqueen", 7, 7, 6, 7, 6, 7, 7, 6, 7, 7, 6,
    "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/31.png",
    "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/31.png",
    "Pokemon", false),

  new Queen("Jynx", 9, 8, 8, 8, 5, 7, 8, 7, 8, 6, 7,
    "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/124.png",
    "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/124.png",
    "Pokemon", false),

  new Queen("Florges", 7, 6, 5, 6, 8, 9, 6, 8, 8, 9, 3,
    "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/671.png",
    "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/671.png",
    "Pokemon", false),

  new Queen("Mismagius", 8, 8, 7, 7, 6, 8, 7, 7, 8, 6, 7,
    "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/429.png",
    "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/429.png",
    "Pokemon", false),

  new Queen("Froslass", 7, 7, 6, 8, 7, 8, 7, 7, 7, 6, 5,
    "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/478.png",
    "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/478.png",
    "Pokemon", false)
];

//#endregion
//#region Simulator State

let currentPhase = 'CAST_SELECTOR';
let selectedQueens = [];
let currentEpisodeNum = 1;
let episodeResults = [];
let currentChallengeType = null;

// Episode placements will follow: 1 WIN, 2 HIGH, remaining SAFE except 1 LOW and 2 BTM2
const challengeTypes = [
  { type: 'Acting Challenge', description: 'Show us your best acting skills in this dramatic scene!' },
  { type: 'Design Challenge', description: 'Create a stunning look from unconventional materials!' },
  { type: 'Snatch Game', description: 'Impersonate a celebrity and make us laugh!' },
  { type: 'Rusical', description: 'Sing and dance in our original musical production!' },
  { type: 'Stand-Up Comedy', description: 'Write and perform your own stand-up routine!' },
  { type: 'Ball Challenge', description: 'Serve three runway looks for the ultimate ball!' },
  { type: 'Improv Challenge', description: 'Think on your feet in this improv comedy challenge!' },
  { type: 'Makeover Challenge', description: 'Transform your partner into a glamazon!' }
];

//#endregion
//#region Phase Functions

// CAST SELECTOR PHASE
function showCastSelector() {
  const screen = new Screen();
  screen.clean();

  const container = document.querySelector('.MainArea');

  const title = document.createElement('h1');
  title.className = 'phase-title';
  title.textContent = 'SELECT YOUR CAST';
  container.appendChild(title);

  const subtitle = document.createElement('p');
  subtitle.style.textAlign = 'center';
  subtitle.style.fontSize = '1.2rem';
  subtitle.style.marginBottom = '20px';
  subtitle.textContent = `Select ${pokemonQueens.length} queens for the competition`;
  container.appendChild(subtitle);

  const castGrid = document.createElement('div');
  castGrid.className = 'cast-selector';

  pokemonQueens.forEach((queen, index) => {
    const card = document.createElement('div');
    card.className = 'queen-card selected';
    card.dataset.index = index;

    const img = document.createElement('img');
    img.src = queen.image;
    img.alt = queen.name;
    img.onerror = function() {
      this.src = 'https://via.placeholder.com/150/667eea/ffffff?text=' + queen.name;
    };

    const name = document.createElement('div');
    name.className = 'queen-name';
    name.textContent = queen.name;

    card.appendChild(img);
    card.appendChild(name);

    card.addEventListener('click', () => {
      card.classList.toggle('selected');
    });

    castGrid.appendChild(card);
  });

  container.appendChild(castGrid);

  selectedQueens = [...pokemonQueens];
}

// ENTRANCES PHASE
let entranceIndex = 0;

function showEntrances() {
  const screen = new Screen();
  screen.clean();

  const container = document.querySelector('.MainArea');

  if (entranceIndex >= selectedQueens.length) {
    entranceIndex = 0;
    currentPhase = 'PROMO_TABLE';
    return;
  }

  const queen = selectedQueens[entranceIndex];

  const title = document.createElement('h1');
  title.className = 'phase-title';
  title.textContent = 'QUEEN ENTRANCE';
  container.appendChild(title);

  const entranceDiv = document.createElement('div');
  entranceDiv.className = 'entrance-container entrance-queen';

  const img = document.createElement('img');
  img.src = queen.image;
  img.alt = queen.name;
  img.onerror = function() {
    this.src = 'https://via.placeholder.com/300/667eea/ffffff?text=' + queen.name;
  };

  const name = document.createElement('h2');
  name.textContent = queen.name;
  name.style.fontSize = '2.5rem';
  name.style.textShadow = '0 0 20px #ff00ff';

  const quotes = [
    "I'm here to snatch the crown!",
    "Watch out world, here I come!",
    "Eleganza extravaganza!",
    "I didn't come to play, I came to slay!",
    "Category is: PERFECTION!",
    "Serving looks and taking names!",
    "The competition is officially over!",
    "I'm about to show you what TALENT looks like!"
  ];

  const quote = document.createElement('p');
  quote.className = 'entrance-quote';
  quote.textContent = `"${quotes[getRandomInt(0, quotes.length - 1)]}"`;

  entranceDiv.appendChild(img);
  entranceDiv.appendChild(name);
  entranceDiv.appendChild(quote);

  container.appendChild(entranceDiv);

  entranceIndex++;
}

// CHALLENGE ANNOUNCEMENT PHASE
function showChallengeAnnouncement() {
  const screen = new Screen();
  screen.clean();

  const container = document.querySelector('.MainArea');

  // Select random challenge
  currentChallengeType = challengeTypes[getRandomInt(0, challengeTypes.length - 1)];

  const title = document.createElement('h1');
  title.className = 'phase-title';
  title.textContent = `EPISODE ${currentEpisodeNum}`;
  container.appendChild(title);

  const announcementDiv = document.createElement('div');
  announcementDiv.className = 'challenge-announcement';

  const challengeTitle = document.createElement('h2');
  challengeTitle.className = 'challenge-type';
  challengeTitle.textContent = currentChallengeType.type;

  const description = document.createElement('p');
  description.className = 'challenge-description';
  description.textContent = currentChallengeType.description;

  announcementDiv.appendChild(challengeTitle);
  announcementDiv.appendChild(description);

  container.appendChild(announcementDiv);
}

// PERFORMANCES PHASE
function showPerformances() {
  const screen = new Screen();
  screen.clean();

  const container = document.querySelector('.MainArea');

  const title = document.createElement('h1');
  title.className = 'phase-title';
  title.textContent = 'PERFORMANCES';
  container.appendChild(title);

  const perfGrid = document.createElement('div');
  perfGrid.className = 'performance-grid';

  // Calculate scores for each queen
  episodeResults = [];

  selectedQueens.forEach(queen => {
    let score = 0;

    // Calculate score based on challenge type
    if (currentChallengeType.type.includes('Acting')) {
      score = getRandomInt(0, queen.acting) + getRandomInt(0, 20);
    } else if (currentChallengeType.type.includes('Design')) {
      score = getRandomInt(0, queen.design) + getRandomInt(0, 20);
    } else if (currentChallengeType.type.includes('Snatch Game')) {
      score = getRandomInt(0, queen.comedy) + getRandomInt(0, queen.acting) + getRandomInt(0, 10);
    } else if (currentChallengeType.type.includes('Rusical')) {
      score = getRandomInt(0, queen.dance) + getRandomInt(0, queen.charisma) + getRandomInt(0, 10);
    } else if (currentChallengeType.type.includes('Stand-Up')) {
      score = getRandomInt(0, queen.comedy) + getRandomInt(0, queen.charisma) + getRandomInt(0, 10);
    } else if (currentChallengeType.type.includes('Ball')) {
      score = getRandomInt(0, queen.runway) + getRandomInt(0, queen.design) + getRandomInt(0, 10);
    } else if (currentChallengeType.type.includes('Improv')) {
      score = getRandomInt(0, queen.improv) + getRandomInt(0, 20);
    } else {
      score = getRandomInt(0, queen.branding) + getRandomInt(0, queen.runway) + getRandomInt(0, 10);
    }

    episodeResults.push({ queen: queen, score: score });

    const card = document.createElement('div');
    card.className = 'performance-card';

    const img = document.createElement('img');
    img.src = queen.image;
    img.alt = queen.name;
    img.onerror = function() {
      this.src = 'https://via.placeholder.com/120/667eea/ffffff?text=' + queen.name;
    };

    const name = document.createElement('h3');
    name.textContent = queen.name;

    const scoreDiv = document.createElement('div');
    scoreDiv.className = 'performance-score';
    scoreDiv.textContent = score;

    card.appendChild(img);
    card.appendChild(name);
    card.appendChild(scoreDiv);

    perfGrid.appendChild(card);
  });

  container.appendChild(perfGrid);
}

// PRODUCTION RIGGING PHASE
function showProductionRigging() {
  // Sort results by score
  episodeResults.sort((a, b) => b.score - a.score);

  // Assign initial placements: 1 WIN, 2 HIGH, 1 LOW, 2 BTM2, rest SAFE
  episodeResults.forEach((result, index) => {
    if (index === 0) {
      result.placement = 'WIN';
    } else if (index === 1 || index === 2) {
      result.placement = 'HIGH';
    } else if (index === episodeResults.length - 1 || index === episodeResults.length - 2) {
      result.placement = 'BTM2';
    } else if (index === episodeResults.length - 3) {
      result.placement = 'LOW';
    } else {
      result.placement = 'SAFE';
    }
  });

  // Show rigging modal
  const modal = document.getElementById('riggingModal');
  const riggingControls = document.getElementById('riggingControls');
  riggingControls.innerHTML = '';

  const title = document.createElement('h3');
  title.textContent = 'Adjust placements as you wish:';
  title.style.marginBottom = '20px';
  riggingControls.appendChild(title);

  episodeResults.forEach((result, index) => {
    const row = document.createElement('div');
    row.className = 'rigging-row';

    const img = document.createElement('img');
    img.src = result.queen.image;
    img.alt = result.queen.name;
    img.onerror = function() {
      this.src = 'https://via.placeholder.com/60/667eea/ffffff?text=' + result.queen.name;
    };

    const name = document.createElement('span');
    name.textContent = result.queen.name;
    name.style.flex = '1';
    name.style.fontSize = '1.1rem';

    const scoreSpan = document.createElement('span');
    scoreSpan.textContent = `Score: ${result.score}`;
    scoreSpan.style.marginRight = '15px';

    const select = document.createElement('select');
    select.dataset.index = index;

    const placements = ['WIN', 'HIGH', 'SAFE', 'LOW', 'BTM2'];
    placements.forEach(p => {
      const option = document.createElement('option');
      option.value = p;
      option.textContent = p;
      if (p === result.placement) {
        option.selected = true;
      }
      select.appendChild(option);
    });

    row.appendChild(img);
    row.appendChild(name);
    row.appendChild(scoreSpan);
    row.appendChild(select);

    riggingControls.appendChild(row);
  });

  modal.style.display = 'block';

  // Handle modal close
  const closeBtn = document.querySelector('.close');
  closeBtn.onclick = function() {
    modal.style.display = 'none';
    currentPhase = 'RESULTS';
  };

  // Handle apply button
  const applyBtn = document.getElementById('applyRigging');
  applyBtn.onclick = function() {
    // Get all selects and update placements
    const selects = riggingControls.querySelectorAll('select');
    selects.forEach(select => {
      const index = parseInt(select.dataset.index);
      episodeResults[index].placement = select.value;
    });

    modal.style.display = 'none';
    currentPhase = 'RESULTS';
  };
}

// RESULTS PHASE
function showResults() {
  const screen = new Screen();
  screen.clean();

  const container = document.querySelector('.MainArea');

  const title = document.createElement('h1');
  title.className = 'phase-title';
  title.textContent = 'RESULTS';
  container.appendChild(title);

  const resultsDiv = document.createElement('div');
  resultsDiv.className = 'results-container';

  // Sort by placement order
  const placementOrder = { 'WIN': 1, 'HIGH': 2, 'SAFE': 3, 'LOW': 4, 'BTM2': 5 };
  episodeResults.sort((a, b) => placementOrder[a.placement] - placementOrder[b.placement]);

  episodeResults.forEach(result => {
    const row = document.createElement('div');
    row.className = `result-row ${result.placement.toLowerCase()}`;

    const img = document.createElement('img');
    img.src = result.queen.image;
    img.alt = result.queen.name;
    img.onerror = function() {
      this.src = 'https://via.placeholder.com/80/667eea/ffffff?text=' + result.queen.name;
    };

    const name = document.createElement('div');
    name.style.flex = '1';
    name.style.fontSize = '1.3rem';
    name.style.fontWeight = 'bold';
    name.textContent = result.queen.name;

    const placement = document.createElement('div');
    placement.className = `result-placement ${result.placement.toLowerCase()}`;
    placement.textContent = result.placement;

    row.appendChild(img);
    row.appendChild(name);
    row.appendChild(placement);

    resultsDiv.appendChild(row);

    // Update queen's track record
    result.queen.trackrecord.push(result.placement);

    // Update stats
    if (result.placement === 'WIN') result.queen.wins++;
    if (result.placement === 'HIGH') result.queen.highs++;
    if (result.placement === 'SAFE') result.queen.safes++;
    if (result.placement === 'LOW') result.queen.lows++;
    if (result.placement === 'BTM2') result.queen.bottoms++;
  });

  container.appendChild(resultsDiv);
}

// ELIMINATION PHASE
function showElimination() {
  const screen = new Screen();
  screen.clean();

  const container = document.querySelector('.MainArea');

  // Find bottom 2 queens
  const bottom2 = episodeResults.filter(r => r.placement === 'BTM2');

  if (bottom2.length >= 2) {
    // Lipsync - random winner for now
    const loser = bottom2[getRandomInt(0, bottom2.length - 1)];

    const title = document.createElement('h1');
    title.className = 'phase-title';
    title.textContent = 'ELIMINATION';
    container.appendChild(title);

    const elimDiv = document.createElement('div');
    elimDiv.className = 'elimination-container';

    const queenDiv = document.createElement('div');
    queenDiv.className = 'eliminated-queen';

    const img = document.createElement('img');
    img.src = loser.queen.image;
    img.alt = loser.queen.name;
    img.onerror = function() {
      this.src = 'https://via.placeholder.com/250/667eea/ffffff?text=' + loser.queen.name;
    };

    const message = document.createElement('h2');
    message.className = 'elimination-message';
    message.textContent = `${loser.queen.name}, sashay away...`;

    queenDiv.appendChild(img);
    queenDiv.appendChild(message);
    elimDiv.appendChild(queenDiv);

    container.appendChild(elimDiv);

    // Remove from selected queens
    selectedQueens = selectedQueens.filter(q => q !== loser.queen);

    // Add ELIM to track record
    loser.queen.trackrecord[loser.queen.trackrecord.length - 1] = 'ELIM';
  } else {
    // No elimination this episode
    currentPhase = 'TRACK_RECORD';
  }
}

// TRACK RECORD PHASE
function showTrackRecord() {
  // Setup current season with selected queens
  if (!CurrentSeason) {
    CurrentSeason = new Season(
      "Pokémon Drag Race Season 1",
      [...pokemonQueens],
      "RuPaul",
      "NORMAL",
      "Normal",
      "NORMAL",
      "NORMAL",
      "USA"
    );

    // Add episodes
    for (let i = 0; i < currentEpisodeNum; i++) {
      CurrentSeason.episodes.push(new Episode(`Episode ${i + 1}`, challengeTypes[i % challengeTypes.length].type));
    }

    CurrentSeason.currentCast = [...selectedQueens];
  } else {
    // Add new episode
    CurrentSeason.episodes.push(new Episode(`Episode ${currentEpisodeNum}`, currentChallengeType.type));
    CurrentSeason.currentCast = [...selectedQueens];
  }

  const screen = new Screen();
  screen.clean();

  const container = document.querySelector('.MainArea');

  const title = document.createElement('h1');
  title.className = 'phase-title';
  title.textContent = 'TRACK RECORD';
  container.appendChild(title);

  screen.createTrackRecords();
}

//#endregion
//#region Main Flow

// Next button handler
document.addEventListener('DOMContentLoaded', () => {
  const nextBtn = document.getElementById('nextBtn');

  nextBtn.addEventListener('click', () => {
    switch(currentPhase) {
      case 'CAST_SELECTOR':
        // Get selected queens
        const selected = document.querySelectorAll('.queen-card.selected');
        selectedQueens = Array.from(selected).map(card => {
          const index = parseInt(card.dataset.index);
          return pokemonQueens[index];
        });

        if (selectedQueens.length === 0) {
          selectedQueens = [...pokemonQueens];
        }

        currentPhase = 'ENTRANCES';
        showEntrances();
        break;

      case 'ENTRANCES':
        if (entranceIndex < selectedQueens.length) {
          showEntrances();
        } else {
          currentPhase = 'PROMO_TABLE';
          showPromoTable();
        }
        break;

      case 'PROMO_TABLE':
        currentPhase = 'CHALLENGE_ANNOUNCEMENT';
        showChallengeAnnouncement();
        break;

      case 'CHALLENGE_ANNOUNCEMENT':
        currentPhase = 'PERFORMANCES';
        showPerformances();
        break;

      case 'PERFORMANCES':
        currentPhase = 'PRODUCTION_RIGGING';
        showProductionRigging();
        break;

      case 'PRODUCTION_RIGGING':
        // Handled by modal buttons
        break;

      case 'RESULTS':
        currentPhase = 'ELIMINATION';
        showElimination();
        break;

      case 'ELIMINATION':
        currentPhase = 'TRACK_RECORD';
        showTrackRecord();
        break;

      case 'TRACK_RECORD':
        if (selectedQueens.length > 4) {
          // Continue to next episode
          currentEpisodeNum++;
          currentPhase = 'CHALLENGE_ANNOUNCEMENT';
          showChallengeAnnouncement();
        } else {
          // Finale
          alert('FINALE! Top 4 Queens: ' + selectedQueens.map(q => q.name).join(', '));
        }
        break;
    }
  });

  function showPromoTable() {
    const screen = new Screen();
    screen.clean();

    const container = document.querySelector('.MainArea');

    const title = document.createElement('h1');
    title.className = 'phase-title';
    title.textContent = 'MEET THE QUEENS';
    container.appendChild(title);

    screen.createPromoTable();
  }

  // Start the simulator
  showCastSelector();
});

//#endregion
