const units = require('./units.js');

let defeatedEnemies = 0;

const battle = (character) => {
	const timer = setInterval(() => {
		const { name, health } = character;
		let {
			damage, criticalChance,
		} = character;
		const names = ['terminator', 'robocop', 'goku', 'godzilla', 'wolverine'];
		const enemies = names.filter(unit => unit !== character.name.toLowerCase() && units[unit].health > 0);
		const randomEnemy = enemies[Math.floor(Math.random() * enemies.length)];
		const chosenEnemy = units[randomEnemy];
		const randomCritical = Math.floor((Math.random() * 100));

		if (health < 0) {
			console.log(`${name} is defeated`);
			defeatedEnemies += 1;
			clearInterval(timer);
		} else if (defeatedEnemies === 3) {
			console.log(`${name} is a winner`);
			clearInterval(timer);
		} else {
			criticalChance = 10 - (health / 10);
			damage = randomCritical > criticalChance ? (health / 100) : ((health / 100) * 2);
			chosenEnemy.health -= damage;
			console.log(`${name}(${health.toFixed(2)}) deals ${damage.toFixed(2)} damage to ${chosenEnemy.name}(${chosenEnemy.health.toFixed(2)})`);
			character.rechargeTime = 1000 * (health / 100);
		}
	}, character.rechargeTime);
};

battle(units.terminator);
battle(units.robocop);
battle(units.goku);
battle(units.godzilla);
battle(units.wolverine);
