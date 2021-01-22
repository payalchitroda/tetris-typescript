export const STAGE_WIDTH: number = 12;
export const STAGE_HEIGHT: number = 20;



interface point {
    x: number
    y: number
}

interface IPlayer {
    pos: point
    tetromino: (string | number)[][],
    collided: boolean,
}


export const createStage = ():Array<Array<Array<string | number>>>=> {
var stage:Array<Array<Array<string | number>>>= new Array(STAGE_HEIGHT);
    for (var i = 0; i < stage.length; i++) {
        stage[i] = new Array(STAGE_WIDTH).fill([0, 'clear'])
    }
    return stage

}

export const checkCollision = (player:IPlayer, stage:Array<Array<Array<string | number>>>,moveX:number,moveY:number ) => {
    for (let y = 0; y < player.tetromino.length; y += 1) {
      for (let x = 0; x < player.tetromino[y].length; x += 1) {
        if (player.tetromino[y][x] !== 0) {
          if (!stage[y + player.pos.y + moveY] ||
            !stage[y + player.pos.y + moveY][x + player.pos.x + moveX] ||
            stage[y + player.pos.y + moveY][x + player.pos.x + moveX][1] !=='clear') {
            return true;
          }
        }
      }
    }
    return false
  };
