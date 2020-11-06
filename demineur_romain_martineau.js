var scanf = require('scanf');
//var Color = require('color');
var gride = [
    [0, 1, 1, 1, 0],
    [0, 2, 'M', 2, 0],
    [0, 2, 'M', 2, 0],
    [0, 1, 1, 1, 0],
    [0, 0, 0, 0, 0]
];

var inGame = Boolean(false);
let maxFlag = 0;
let nombreMine = 2;
var x = 0;
var y = 0;

class Cellule {
    constructor() {
        this.flagged = false;
        this.hidden = true;
        this.value;
    }
}

class Mine extends Cellule {
    constructor() {
        super();
        this.mine = 'M';
    }
}

class Nombre extends Cellule {
    constructor(nombre) {
        super();
        this.nombre = nombre;
    }
}

class Demineur {

    constructor() {
        this.initJeu();
        this.grid = [
            [new Nombre(0), new Nombre(1), new Nombre(1), new Nombre(1), new Nombre(0)],
            [new Nombre(0), new Nombre(2), new Mine('M'), new Nombre(2), new Nombre(0)],
            [new Nombre(0), new Nombre(2), new Mine('M'), new Nombre(2), new Nombre(0)],
            [new Nombre(0), new Nombre(1), new Nombre(1), new Nombre(1), new Nombre(0)],
            [new Nombre(0), new Nombre(0), new Nombre(0), new Nombre(0), new Nombre(0)],
        ];
        this.valeur = this.grid.length * this.grid[0].length;
    }

    display() {
        console.log("");
        let afficher = "";
        if (inGame === false) {
            afficher = ("DEMINEUR en cours..\n\n");
        } else {
            afficher = ("DEMINEUR terminé\n\n")
        }
        for (let i = 0; i < this.grid.length; i++) {
            for (let j = 0; j < this.grid.length; j++) {
                if (this.grid[i][j].hidden === true) {
                    if (this.grid[i][j].flagged === true) {
                        afficher += 'F ';
                    } else {
                        afficher += "X" + " ";
                    }
                } else {
                    if (this.grid[i][j] instanceof Nombre) {
                        afficher += this.grid[i][j].nombre + " ";
                    } else if (this.grid[i][j] instanceof Mine) {
                        afficher += this.grid[i][j].mine + " ";
                    }
                }
            }
            afficher += "\n";
        }
        console.log(afficher);
        console.log("Nombre de Flag " + maxFlag + " /2");
    }

    choixCase() {
        x = -1;
        y = -1;
        while (x < 0 || x >= this.grid[0].length) {
            console.log("Quelle case voulez-vous click à la verticale ?");
            x = scanf('%d');
        }
        while (y < 0 || y >= this.grid.length) {
            console.log("Et à l'horizontale ?");
            y = scanf('%d');
        }
    }

    flag() {
        this.choixCase();
        if (this.grid[x][y].flagged === true) {
            this.grid[x][y].flagged = false;
            maxFlag--;
        } else if (maxFlag < 2) {
            this.grid[x][y].flagged = true;
            maxFlag++;
        } else {
            console.log("Plus de drapeau");
        }
        //console.clear();
        this.display();
    }

    click() {
        this.choixCase();

        if (this.grid[x][y].flagged === true) {
            console.log("Il y a un drapeau");
        } else if (this.grid[x][y].flagged === false && this.grid[x][y].hidden === true) {
            this.grid[x][y].hidden = false;
            this.valeur--;
        }

        if (this.grid[x][y].flagged === true) {
            console.log("Attention au drapeau");
        } else if (this.grid[x][y].mine === "M") {
            console.log("\nC'est Perdu");
            inGame = true;
        }

        if (inGame !== true) {
            if (this.valeur === nombreMine) {
                console.log("\nVous avez gagné !");
                inGame = true;
            }
        }

        if (this.grid[x][y].nombre === 0) {
            jeu.verifZero(x, y);
        }

        //console.clear();
        this.display();
        //console.log(this.valeur);
    }

    initJeu() {
        console.log("");
        console.log("Bienvenue sur le demineur");
        console.log("");
        console.log("Que souhaitez-vous faire ?");
        console.log("Jouer (1) ou Quitter (2)");
        let choix = scanf("%d");
        switch (choix) {
            case 1 :
                console.clear();
                break;
            case 2 :
                console.log("Fin du jeu");
                process.exit();
                break;
            default :
                console.log("Invalide");
                process.exit();
                break;
        }
    }

    game() {
        while (inGame === false) {
            console.log("");
            console.log("Click (1) ou Flag (2) ?");
            let choix = scanf("%d");
            switch (choix) {
                case 1 :
                    this.click();
                    break;
                case 2:
                    this.flag();
                    break;
                default:
                    console.log("Incorrect");
                    break;
            }
        }
    }

    verifZero(x, y) {

        if ([x + 1] < this.grid[0].length) {
            if (this.grid[x + 1][y].hidden === true) {
                if (this.grid[x + 1][y].nombre === 0) {
                    this.grid[x + 1][y].hidden = false;
                    this.verifZero(x + 1, y);
                }
                this.grid[x + 1][y].hidden = false;
                this.valeur--;
            }
        }

        if ([x - 1] >= 0) {
            if (this.grid[x - 1][y].hidden === true) {
                if (this.grid[x - 1][y].nombre === 0) {
                    this.grid[x - 1][y].hidden = false;
                    this.verifZero(x - 1, y);
                }
                this.grid[x - 1][y].hidden = false;
                this.valeur--;
            }
        }

        if ([y + 1] < this.grid.length) {
            if (this.grid[x][y + 1].hidden === true) {
                if (this.grid[x][y + 1].nombre === 0) {
                    this.grid[x][y + 1].hidden = false;
                    this.verifZero(x, y + 1);
                }
                this.grid[x][y + 1].hidden = false;
                this.valeur--;
            }
        }

        if ([y - 1] >= 0) {
            if (this.grid[x][y - 1].hidden === true) {
                if (this.grid[x][y - 1].nombre === 0) {
                    this.grid[x][y - 1].hidden = false;
                    this.verifZero(x, y - 1);
                }
                this.grid[x][y - 1].hidden = false;
                this.valeur--;
            }
        }

        if ((((x + 1) < this.grid[0].length) && ((y + 1) < this.grid.length))) {
            if (this.grid[x + 1][y + 1].hidden === true) {
                if (this.grid[x + 1][y + 1].nombre === 0) {
                    this.grid[x + 1][y + 1].hidden = false;
                    this.verifZero(x + 1, y + 1);
                }
                this.grid[x + 1][y + 1].hidden = false;
                this.valeur--;
            }
        }

        if ((((x - 1) >= 0) && ((y + 1) < this.grid.length))) {
            if (this.grid[x - 1][y + 1].hidden === true) {
                if (this.grid[x - 1][y + 1].nombre === 0) {
                    this.grid[x - 1][y + 1].hidden = false;
                    this.verifZero(x - 1, y + 1);
                }
                this.grid[x - 1][y + 1].hidden = false;
                this.valeur--;
            }
        }

        if ((((x + 1) < this.grid[0].length) && ((y - 1) >= 0))) {
            if (this.grid[x + 1][y - 1].hidden === true) {
                if (this.grid[x + 1][y - 1].nombre === 0) {
                    this.grid[x + 1][y - 1].hidden = false;
                    this.verifZero(x + 1, y - 1);
                }
                this.grid[x + 1][y - 1].hidden = false;
                this.valeur--;
            }
        }

        if ((((x - 1) >= 0) && ((y - 1) >= 0))) {
            if (this.grid[x - 1][y - 1].hidden === true) {
                if (this.grid[x - 1][y - 1].nombre === 0) {
                    this.grid[x - 1][y - 1].hidden = false;
                    this.verifZero(x - 1, y - 1);
                }
                this.grid[x - 1][y - 1].hidden = false;
                this.valeur--;
            }
        }
    }
}

let jeu = new Demineur();
jeu.display();
jeu.game();