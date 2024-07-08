new Vue({
    el: '#app',
    data: {
      info: {
        title: 'Matador de Monstros',
        description: 'Teste suas habilidades para vencer o monstro.',
        challenge: 'Será que você ganha esse duelo?'
      },
      actions: {
        attack: 'Atacar',
        special: 'Ataque Especial',
        heal: 'Cura',
        giveUp: 'Desistir',
      },
      images: {
        monster: 'assets/images/img-monstro.png',
        player: 'assets/images/player.png',
        playerDie: 'assets/images/player-die.png',
        monsterDie: 'assets/images/img-monstro-die.png',
        monsterWin: 'https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Smilies/Crying%20Face.png',
        playerWin: 'https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Smilies/Beaming%20Face%20with%20Smiling%20Eyes.png'
      },
      running: false,
      playerLife: 100,
      monsterLife: 100,
      logs: []
    },
    computed: {
        hasResult(){
            return this.playerLife == 0 || this.monsterLife == 0;
        }
    },
    methods: {
        startGame(){
            this.running = true;
            this.playerLife = 100;
            this.monsterLife= 100;
            this.logs = [];
        },

        attack(especial){
            this.hurt('monsterLife', 5, 10, especial, 'Jogador', 'Monstro', 'player')
            if(this.monsterLife > 0 ){
                this.hurt('playerLife', 7, 12, false, 'Monstro', 'Jogador', 'monster');
            }
            
        },

        hurt(atr, min, max, especial, sourcer, target, cls){
            const plus = especial ? 5 : 0;
            const hurt = this.getRandom(min + plus, max + plus)

            this[atr] = Math.max(this[atr] - hurt, 0)
            this.registerLog(`${sourcer} atingiu ${target} com ${hurt}.`, cls)
        },

        healAndHurt(){
            this.heal(10, 15);
            this.hurt('playerLife', 7, 12, false, 'Monstro', 'Jogador', 'monster')
        },

        heal(min, max){
            const heal = this.getRandom(min, max);
            this.playerLife = Math.min(this.playerLife + heal, 100)
            this.registerLog(`Jogador ganhou força de ${heal}.`, 'player')
        },
        getRandom(min, max){
            const value = Math.random() * (max - min) + min
            return Math.round(value)
        },
        registerLog(text, cls){
            this.logs.unshift({ text, cls })
        }
    }, 
    watch: {
        hasResult(value) {
            if (value) this.running = false;
        }
    }
   
})