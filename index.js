import characterData from './data.js'
import Character from './Character.js'

let monstersArray = ["orc", "goblin", "demon"]
let isWaiting = false

function getNewMonster() {
    const nextMonsterData = characterData[monstersArray.shift()]
    return nextMonsterData ? new Character(nextMonsterData) : {}
}

/*
Challenge
1. Disable the user's ability to attack when a monster dies.
2. Reneable the user's ability to attack when a new monster
loads.
3. When the game is over, disable the user's ability to attack.
**hint.md for help!!**
*/


function attack() {
    if(!isWaiting){
        wizard.getDiceHtml()
        monster.getDiceHtml()
        wizard.takeDamage(monster.currentDiceScore)
        monster.takeDamage(wizard.currentDiceScore)
        render()
        
        if(wizard.dead){
            endGame()
        }
        else if(monster.dead){
            isWaiting = true
            if(monstersArray.length > 0){
                setTimeout(()=>{
                    monster = getNewMonster()
                    render()
                    isWaiting = false
                },1500)
            }
            else{
                endGame()
            }
        }    
    }

}

function endGame() {
    isWaiting = true
    const endMessage = wizard.health === 0 && monster.health === 0 ?
        "No victory here today... both good and evil have been defeated" :
        wizard.health > 0 ? "The Wizard has fought with courage and determination... Evil has been defeated this day" :
            "Evil has demonstrated the existence Victory this day"

    const endEmoji = wizard.health > 0 ? "🔮" : "☠️"
    const endpicture = wizard.health > 0 ? "wiz-victory" : "monster-victory"
        setTimeout(()=>{
            document.body.innerHTML = `
                <div class="end-game ${endpicture}">
                    <h2>the war has been waged... </h2> 
                    <h3>${endMessage}</h3>
                    <p class="end-emoji">${endEmoji}</p>
                    <button onclick="location.reload()">Dare to try Again?</button>
                </div>
                `
        }, 1500)
}

document.getElementById("attack-button").addEventListener('click', attack)

function render() {
    document.getElementById('hero').innerHTML = wizard.getCharacterHtml()
    document.getElementById('monster').innerHTML = monster.getCharacterHtml()
}
function reload(){
    location.reload();
}
const wizard = new Character(characterData.hero)
let monster = getNewMonster()
render()
