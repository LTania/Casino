class GameMachine {
	constructor(number) {
    	this.number = number;
  	}

	getMoney() {
    	return this.number;
  	}
	
	takeMoney(sum){
		if(this.number >= sum) {
			this.number -=sum;
			return sum;
		}
		
		else {
			alert("We haven`t money, sorry");
			return 0;
		}
	}
	
	addMoney(sum){
		this.number+=sum;
	}
	
	play(sum){
		if(sum < 0){
			alert("Sorry, you need money");
			return 0;
		} else if(this.number <= 3*sum){
			alert("Please choose another game machine or give less money");
			return sum;
		} else{
			const max = 999;
			const min = 100;
			let randomNum = Math.floor(Math.random() * (max - min + 1)) + min;
			alert(randomNum);
			let digits = [];
			while (randomNum > 0) {
    			digits[digits.length] = randomNum % 10;
    			randomNum = parseInt(randomNum/10);
			}
			if(digits[0]==digits[1] && digits[0]==digits[2]) {
				alert("You are so lucky!");
				this.number-=3*sum;
				return 3*sum;
			}else if(digits[0]==digits[1] || digits[0]==digits[2] || digits[1]==digits[2]){
				alert("Congratulations!");
				this.number-=2*sum;
				return 2*sum;
			}else{
				alert("Sorry! Try again!");
				this.number+=sum;
				return 0;
			}
		}
	}
}

class Casino {
	constructor(name) {
    	this.name = name;
		this.gameMaschines = [];
  	}
	
	getMachineCount(){
		return this.gameMaschines.length;
	}
	
	getAllMoney(){
		let sumMoney=0;
		for(let i = 0; i<this.gameMaschines.length; i++){
			sumMoney+=this.gameMaschines[i].getMoney();
		}
		return sumMoney;
	}		
}

class User {
	constructor(name, money) {
		if(money<0) alert("You don`t have money!!!");
		else {
			this.name = name;
			this.money = money;
		}
  	}
	
	play(gameMach, sum){
		if(sum>this.money)alert("Sorry. You don`t have enough money");
		else{
			this.money -=sum;
			this.money += gameMach.play(sum);
		}
	}
}

class SuperUser extends User{
	constructor(name, money) {
		if(money<0) alert("You don`t have money!!!");
		else {
			super(name, money);
			this.casino = new Casino("Default");
			this.casinos = [];
			this.casinos.push(this.casino);
		}
  	}
	
	createCasino(name){
		this.casino = new Casino(name);
		this.casinos.push(this.casino);
	}
	
	addGameMashine(num){
		if(num>this.money || num<0) alert("Sorry. You dont`have enough money");
		else{
			let newMachine = new GameMachine(num);
			this.money-=num;
			this.casino.gameMaschines.push(newMachine);
		}
	}
	
	deleteGameMashine(indx){
		if(indx>this.casino.getMachineCount()){
			alert("It is better to create game machine with your index and then try deleting :)");
		} else{
			let tempSum = this.casino.gameMaschines[indx].getMoney();
			this.casino.gameMaschines.splice(indx,1);
			let partTempSum = tempSum/this.casino.getMachineCount();
			for(let i=0; i<this.casino.getMachineCount(); i++){
				this.casino.gameMaschines[i].addMoney(partTempSum);
			}
		}
	}
	
	addMoneyToCasino(num){
		if(num>this.money){
			alert("You don`t have enough money:(");
		}else{
			let partNum = num/this.casino.getMachineCount();
			for(let i=0; i<this.casino.getMachineCount(); i++){
				this.casino.gameMaschines[i].addMoney(partNum);
			}
		}
	}
	
	addMoneyToMaschine(indx, num){
		let countMachines = this.casino.getMachineCount();
		if(indx > countMachines) alert("It is better to create game machine with your index and then try adding money to it :)");
		else if(num > this.money) alert("You don`t have enough money:(");
		else{
			this.casino.gameMaschines[indx].addMoney(num);
		}
	}
	
	takeCasinoMoney(sum){
		if(sum>=this.casino.getAllMoney())alert("Sorry. We don`t have enough money");
		else{
			this.casino.gameMaschines.sort(function (a, b){
				if(a.getMoney()>b.getMoney()) {
					return -1;
				}
				if(a.getMoney()<b.getMoney()) {
					return 1;
				}
				return 0;
			});
			let tempSum = 0;
			let i = 0;
			while (tempSum<sum){ 
				if(sum-tempSum > this.casino.gameMaschines[i].getMoney()){
					tempSum+=this.casino.gameMaschines[i].takeMoney(this.casino.gameMaschines[i].getMoney());
				}
				else tempSum+=this.casino.gameMaschines[i].takeMoney(sum-tempSum);
				i++;
			}
			this.money+=tempSum;
		}
	}
	
	
}


//let g = new GameMachine(500);
//let u = new User("RR", 1000);
//u.play(g, 100);
//console.log(u.money);
//let s = new SuperUser("d", 1000);

function PlayCasino(){
	let paragraph = document.getElementById("infoAboutGame");
	
	let superUs = new SuperUser("Tania", 10000);
	superUs.createCasino("777 Casino");
	
	paragraph.innerHTML="We created SuperUser " + superUs.name + " with " + superUs.money + "$.";

	let sumForMashines = [100, 500, 270, 50]
	for(let i = 0; i < sumForMashines.length; i++){
		superUs.addGameMashine(sumForMashines[i]);
	}
	
    paragraph.appendChild(document.createTextNode(" Then user added 4 Game Mashines (100, 500, 270, 50) and now he has "+ superUs.money + "$."));
	superUs.deleteGameMashine(2);
	console.log(superUs.casino.gameMaschines);
	
	paragraph.appendChild(document.createTextNode(" Then user deleted third Game Mashine and now we have 3 Game Mashines: "+ superUs.casino.gameMaschines[0].getMoney() + "$, " + superUs.casino.gameMaschines[1].getMoney() + "$, " + superUs.casino.gameMaschines[2].getMoney() + "$."));
	
	superUs.addMoneyToCasino(600);
	superUs.addMoneyToMaschine(0, 150);
	
	paragraph.appendChild(document.createTextNode(" Then user added 600$ to casino (200$ for every Game Mashine) and 150$ to first Game Mashine. So now we have 3 Game Mashines: "+ superUs.casino.gameMaschines[0].getMoney() + "$, " + superUs.casino.gameMaschines[1].getMoney() + "$, " + superUs.casino.gameMaschines[2].getMoney() + "$."));

	superUs.takeCasinoMoney(850);
	paragraph.appendChild(document.createTextNode(" Then user took 600$ from Casino. So now we have 3 Game Mashines: "+ superUs.casino.gameMaschines[0].getMoney() + "$, " + superUs.casino.gameMaschines[1].getMoney() + "$, " + superUs.casino.gameMaschines[2].getMoney() + "$."));
	
	
	
	let paragraph2 = document.getElementById("infoAboutUser");
	let g = new GameMachine(500);
	let u = new User("John Snow", 500);
	paragraph2.innerHTML="We created User " + u.name + " with " + u.money + "$ " + "and Game Mashine with 500$.";
	u.play(g, 100)
	paragraph2.appendChild(document.createTextNode("He played it with 100$. So now he has " + u.money + "$, and game mashine: " + g.getMoney() + "$."));

}

