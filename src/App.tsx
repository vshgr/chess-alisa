import React, {useEffect, useState} from 'react';
import "./App.css";
import BoardComponent from "./components/BoardComponent";
import {Board} from "./models/Board";
import {Player} from "./models/Player";
import {Titles} from "./models/Titles";
import {Colors} from "./models/Colors";
import LostFigures from "./components/LostFigures";

const App = () => {
        const [whitePlayer, setWhitePlayer] = useState(new Player(Colors.WHITE, "Белый игрок", "White Player"))
        const [blackPlayer, setBlackPlayer] = useState(new Player(Colors.BLACK, "Чёрный игрок", "Black Player"))
        const [redPlayer, setRedPlayer] = useState(new Player(Colors.RED, "Красный игрок", "Red Player"))
        const [greenPlayer, setGreenPlayer] = useState(new Player(Colors.GREEN, "Зелёный игрок", "Green Player"))
        const [waiting, setWaiting] = useState(new Player(Colors.BLACK, "ожидается...", "waiting..."))
        const [currentPlayer, setCurrentPlayer] = useState<Player | null>(null);
        const [restartTitle, setRestartTitle] = useState(Titles.restartRUS)
        const [skipTitle, setSkipTitle] = useState(Titles.skipRUS)
        const [winTitle, setWinTitle] = useState(Titles.winRUS)
        const [winner, setWinner] = useState(waiting)
        const [board, setBoard] = useState(new Board(whitePlayer))

        useEffect(() => {
            restart()
            setCurrentPlayer(whitePlayer);
        }, [])

        function restart() {
            const newBoard = new Board(whitePlayer);
            newBoard.initCells()
            newBoard.addFigures()
            setCurrentPlayer(whitePlayer)
            setBoard(newBoard)
        }

        function swapPlayer() {
            setCounts()
            let player = checkWin()
            if (player !== undefined) {
                setWinTitle(Titles.winRUS)
            } else {
                switch (currentPlayer?.color) {
                    case Colors.WHITE:
                        setCurrentPlayer(redPlayer)
                        board.currentPlayer = redPlayer
                        break
                    case Colors.RED:
                        setCurrentPlayer(greenPlayer)
                        board.currentPlayer = greenPlayer
                        break
                    case Colors.GREEN:
                        setCurrentPlayer(blackPlayer)
                        board.currentPlayer = blackPlayer
                        break
                    case Colors.BLACK:
                        setCurrentPlayer(whitePlayer)
                        board.currentPlayer = whitePlayer
                }
            }
        }

        function setCounts() {
            let count = 0
            for (let i = 0; i < 6; i++) {
                for (let j = 0; j < 6; j++) {
                    if (board.cells[i][j].figure && board.cells[i][j].figure?.color == Colors.BLACK) {
                        count++
                    }
                }
            }
            blackPlayer.figuresCount = count
            count = 0
            for (let i = 0; i < 6; i++) {
                for (let j = 0; j < 6; j++) {
                    if (board.cells[i][j].figure && board.cells[i][j].figure?.color == Colors.WHITE) {
                        count++
                    }
                }
            }
            whitePlayer.figuresCount = count
            count = 0
            for (let i = 0; i < 6; i++) {
                for (let j = 0; j < 6; j++) {
                    if (board.cells[i][j].figure && board.cells[i][j].figure?.color == Colors.RED) {
                        count++
                    }
                }
            }
            redPlayer.figuresCount = count
            count = 0
            for (let i = 0; i < 6; i++) {
                for (let j = 0; j < 6; j++) {
                    if (board.cells[i][j].figure && board.cells[i][j].figure?.color == Colors.GREEN) {
                        count++
                    }
                }
            }
            greenPlayer.figuresCount = count
        }


        function checkWin(): Player | undefined {
            if (whitePlayer.figuresCount > 0 && redPlayer.figuresCount == 0
                && greenPlayer.figuresCount == 0 && blackPlayer.figuresCount == 0) {
                setWinner(whitePlayer)
                return whitePlayer
            }
            if (redPlayer.figuresCount > 0 && whitePlayer.figuresCount == 0
                && greenPlayer.figuresCount == 0 && blackPlayer.figuresCount == 0) {
                setWinner(redPlayer)
                return redPlayer
            }
            if (greenPlayer.figuresCount > 0 && whitePlayer.figuresCount == 0
                && redPlayer.figuresCount == 0 && blackPlayer.figuresCount == 0) {
                setWinner(greenPlayer)
                return greenPlayer
            }
            if (blackPlayer.figuresCount > 0 && whitePlayer.figuresCount == 0
                && redPlayer.figuresCount == 0 && greenPlayer.figuresCount == 0) {
                setWinner(blackPlayer)
                return blackPlayer
            }
            return undefined
        }

        function setENG() {
            setRestartTitle(Titles.restartENG)
            setSkipTitle(Titles.skipENG)
            setWinTitle(Titles.winENG)
            whitePlayer.currentTitle = whitePlayer.engTitle
            redPlayer.currentTitle = redPlayer.engTitle
            blackPlayer.currentTitle = blackPlayer.engTitle
            greenPlayer.currentTitle = greenPlayer.engTitle
            winner.currentTitle = winner.engTitle
        }

        function setRUS() {
            setRestartTitle(Titles.restartRUS)
            setSkipTitle(Titles.skipRUS)
            setWinTitle(Titles.winRUS)
            whitePlayer.currentTitle = whitePlayer.rusTitle
            redPlayer.currentTitle = redPlayer.rusTitle
            blackPlayer.currentTitle = blackPlayer.rusTitle
            greenPlayer.currentTitle = greenPlayer.rusTitle
            winner.currentTitle = winner.rusTitle
        }

        return (
            <div className="app">
                <div className="system">
                    <button className="restartButton" onClick={restart}>{restartTitle}</button>
                    <button className="restartButton" onClick={swapPlayer}>{skipTitle}</button>
                    <div>
                        <button className="languageButton" onClick={setENG}>ENG</button>
                        <button className="languageButton" onClick={setRUS}>РУС</button>
                    </div>
                </div>
                <div>
                    <BoardComponent
                        board={board}
                        setBoard={setBoard}
                        currentPlayer={currentPlayer}
                        swapPlayer={swapPlayer}
                    />
                    <div className="win">{winTitle} {winner.currentTitle}</div>
                </div>

                <LostFigures
                    title={whitePlayer.currentTitle}
                    figures={board.lostWhitePlayer}
                />
                <LostFigures
                    title={redPlayer.currentTitle}
                    figures={board.lostRedPlayer}
                />
                <LostFigures
                    title={greenPlayer.currentTitle}
                    figures={board.lostGreenPlayer}
                />
                <LostFigures
                    title={blackPlayer.currentTitle}
                    figures={board.lostBlackPlayer}
                />
            </div>
        );
    }
;

export default App;
