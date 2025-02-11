let xp = 0;
let health = 100;
let gold = 50;
let currentWeapon = 0;
let fighting;
let monsterHealth;
let inventory = ["palo"];

const button1 = document.querySelector('#button1');
const button2 = document.querySelector("#button2");
const button3 = document.querySelector("#button3");
const inventoryDisplay = document.getElementById("inventory-list");
const text = document.querySelector("#text");
const xpText = document.querySelector("#xpText");
const healthText = document.querySelector("#healthText");
const goldText = document.querySelector("#goldText");
const monsterStats = document.querySelector("#monsterStats");
const monsterName = document.querySelector("#monsterName");
const monsterHealthText = document.querySelector("#monsterHealth");
const weapons = [
  { name: 'palo', power: 5 },
  { name: 'daga', power: 30 },
  { name: 'espada', power: 50 },
  { name: 'espada magica', power: 100 }
];
const monsters = [
  {
    name: "goblin",
    level: 2,
    health: 15
  },
  {
    name: "Orco",
    level: 8,
    health: 60
  },
  {
    name: "Nidhogg",
    level: 20,
    health: 300
  }
]
const locations = [
  {
    name: "Plaza Valhalla",
    "button text": ["Ir al almacen", "Entra a la caverna", "Pelea con Jörmungandr"],
    "button functions": [goStore, goCave, fightDragon],
    text: "Estas en la Plaza Valhalla.<br><br><br>Ves un letrero que dice \"Almacen\"."
  },
  {
    name: "almacen",
    "button text": ["10 de vida (10 de plata)", "Compra arma (30 plata)", "Ir a Plaza Valhalla"],
    "button functions": [buyHealth, buyWeapon, goTown],
    text: "Entras al almacen"
  },
  {
    name: "caverna",
    "button text": ["Pelear con el goblin", "Pelea con el Orco", "volver a Plaza Valhalla"],
    "button functions": [fightSlime, fightBeast, goTown],
    text: "Entras a la cueva,<br><br><br> ves unos monstruos."
  },
  {
    name: "fight",
    "button text": ["Ataca", "Esquiva", "Huir"],
    "button functions": [attack, dodge, goTown],
    text: "Estas peleando."
  },
  {
    name: "kill monster",
    "button text": ["Ir a Plaza Valhalla", "Ir a Plaza Valhalla", "Plaza Valhalla"],
    "button functions": [goTown, goTown, easterEgg],
    text: 'Lo has derrotado!<br><br><br> encuentras PLATA y ganas puntos de experiencia.'
  },
  {
    name: "lose",
    "button text": ["Reiniciar?", "Reiniciar?", "Reiniciar?"],
    "button functions": [restart, restart, restart],
    text: "HAS MUERTO. &#x2620;"
  },
  { 
    name: "win", 
    "button text": ["REPLAY?", "REPLAY?", "REPLAY?"], 
    "button functions": [restart, restart, restart], 
    text: "Derrotaste a el legendario Jörmungandr,<br><br><br> GANASTE EL JUEGO &#x1F389;" 
  },
  {
    name: "easter egg",
    "button text": ["2", "8", "ir a Plaza Valhalla?"],
    "button functions": [pickTwo, pickEight, goTown],
    text: "Encontraste un juego escondido!<br><br><br> diez numeros se generaran al azar y si el numero que escoges se encuentra entre estos 10 numeros: ganas."
  }
];

// initialize buttons
button1.onclick = goStore;
button2.onclick = goCave;
button3.onclick = fightDragon;

function update(location) {
  monsterStats.style.display = "none";
  button1.innerText = location["button text"][0];
  button2.innerText = location["button text"][1];
  button3.innerText = location["button text"][2];
  button1.onclick = location["button functions"][0];
  button2.onclick = location["button functions"][1];
  button3.onclick = location["button functions"][2];
  text.innerHTML = location.text;
  //pop.innerHTML = "En tu inventario tienes:\n" + inventory;
}
function updateInventory() {
  if (inventory.length === 0) {
    inventoryDisplay.innerHTML = "Inventario vacío";
  } else {
    inventoryDisplay.innerHTML = "Inventario<br><br>";
    inventoryDisplay.innerHTML += inventory.map(item => `🗡️ ${item}`).join("<br>");
  }
}
document.getElementById("inv").addEventListener("click", updateInventory);

function goTown() {
  update(locations[0]);
}

function goStore() {
  update(locations[1]);
}

function goCave() {
  update(locations[2]);
}

function buyHealth() {
  if (gold >= 10) {
    gold -= 10;
    health += 10;
    goldText.innerText = gold;
    healthText.innerText = health;
  } else {
    text.innerText = "No tienes suficiente Plata para comprar Vida";
  }
}

function buyWeapon() {
  if (currentWeapon < weapons.length - 1) {
    if (gold >= 30) {
      
      gold -= 30;
      currentWeapon++;
      goldText.innerText = gold;
      let newWeapon = weapons[currentWeapon].name;
      text.innerText = "Ahora tu tienes una " + newWeapon + ".";
      inventory.push(newWeapon);
      text.innerText += " En tu inventario tienes: " + inventory;
    } else {
      text.innerText = "No tienes suficiente Plata para comprar Armas.";
    }
  } else {
    text.innerText = "Ya tienes el arma mas poderosa de la Tienda!";
    button2.innerText = "Vende tu arma por 15 de plata";
    button2.onclick = sellWeapon;
  }
}

function sellWeapon() {
  if (inventory.length > 1) {
    gold += 15;
    goldText.innerText = gold;
    let currentWeapon = inventory.shift();
    text.innerText = "Vendiste una " + currentWeapon + ".";
    text.innerText += " En tu inventario tienes: " + inventory;
  } else {
    text.innerText = "No vendas tu unica arma!";
  }
}

function fightSlime() {
  fighting = 0;
  goFight();
}

function fightBeast() {
  fighting = 1;
  goFight();
}

function fightDragon() {
  fighting = 2;
  goFight();
}

function goFight() {
  update(locations[3]);
  monsterHealth = monsters[fighting].health;
  monsterStats.style.display = "block";
  monsterName.innerText = monsters[fighting].name;
  monsterHealthText.innerText = monsterHealth;
}

function attack() {
  text.innerText = "El " + monsters[fighting].name + " ataca.";
  text.innerText += " Lo atacas con tu " + weapons[currentWeapon].name + ".";
  health -= getMonsterAttackValue(monsters[fighting].level);
  if (isMonsterHit()) {
    monsterHealth -= weapons[currentWeapon].power + Math.floor(Math.random() * xp) + 1;    
  } else {
    text.innerText += " Fallaste.";
  }
  healthText.innerText = health;
  monsterHealthText.innerText = monsterHealth;
  if (health <= 0) {
    lose();
  } else if (monsterHealth <= 0) {
    if (fighting === 2) {
      winGame();
    } else {
      defeatMonster();
    }
  }
  if (Math.random() <= .1 && inventory.length !== 1) {
    text.innerText += " Tu " + inventory.pop() + " se rompe.";
    currentWeapon--;
  }
}

function getMonsterAttackValue(level) {
  const hit = (level * 5) - (Math.floor(Math.random() * xp));
  console.log(hit);
  return hit > 0 ? hit : 0;
}

function isMonsterHit() {
  return Math.random() > .2 || health < 20;
}

function dodge() {
  text.innerText = "Esquivas el ataque de el " + monsters[fighting].name;
}

function defeatMonster() {
  gold += Math.floor(monsters[fighting].level * 6.7);
  xp += monsters[fighting].level;
  goldText.innerText = gold;
  xpText.innerText = xp;
  update(locations[4]);
}

function lose() {
  update(locations[5]);
}

function winGame() {
  update(locations[6]);
}

function restart() {
  xp = 0;
  health = 100;
  gold = 50;
  currentWeapon = 0;
  inventory = ["palo"];
  goldText.innerText = gold;
  healthText.innerText = health;
  xpText.innerText = xp;
  goTown();
}

function easterEgg() {
  update(locations[7]);
}

function pickTwo() {
  pick(2);
}

function pickEight() {
  pick(8);
}

function pick(guess) {
  const numbers = [];
  while (numbers.length < 10) {
    numbers.push(Math.floor(Math.random() * 11));
  }
  text.innerText = "Escogiste " + guess + ". \nEstos son los numeros aleatrios generados:\n";
  for (let i = 0; i < 10; i++) {
    text.innerText += numbers[i] + "\n";
  }
  if (numbers.includes(guess)) {
    text.innerText += "\nAcertaste! ganas 20 de plata.";
    gold += 20;
    goldText.innerText = gold;
  } else {
    text.innerText += "\nPerdiste! pierdes 10 de vida.";
    health -= 10;
    healthText.innerText = health;
    if (health <= 0) {
      lose();
    }
  }
}