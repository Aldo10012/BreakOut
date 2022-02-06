// Index.js
import Game from './Game.js';

// **********************************************************************
// DOM Reference
// **********************************************************************

const canvas = document.getElementById('myCanvas');
const ctx = canvas.getContext('2d');

// **********************************************************************
// Game settup
// **********************************************************************

const game = new Game(canvas, ctx);
