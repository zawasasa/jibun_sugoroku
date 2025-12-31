// ===== ゲーム状態 =====
let gameState = {
    players: [],
    currentPlayerIndex: 0,
    board: [],
    isGameOver: false,
    winner: null,
    currentEvent: null,
    soundEnabled: true,
    isMoving: false, // コマ移動中フラグ
    finishedPlayers: [] // ゴールしたプレイヤーの順位リスト
};

// ===== プレイヤー絵文字 =====
const playerEmojis = ['🚀', '🎯', '⭐', '🎨'];

// ===== 音声システム =====
let audioContext = null;

function initAudioContext() {
    if (!audioContext) {
        audioContext = new (window.AudioContext || window.webkitAudioContext)();
    }
    return audioContext;
}

async function playSound(type) {
    if (!gameState.soundEnabled) return;

    // AudioContextを初期化（スマホ対応）
    const context = initAudioContext();

    // ブラウザの制限により停止している場合は再開
    if (context.state === 'suspended') {
        await context.resume();
    }

    const oscillator = context.createOscillator();
    const gainNode = context.createGain();

    oscillator.connect(gainNode);
    gainNode.connect(context.destination);

    const now = context.currentTime;

    switch (type) {
        case 'dice':
            // サイコロ音: カラカラカラという振る音
            for (let i = 0; i < 5; i++) {
                const osc = context.createOscillator();
                const gain = context.createGain();
                osc.connect(gain);
                gain.connect(context.destination);

                osc.type = 'square';
                osc.frequency.setValueAtTime(100 + Math.random() * 200, now + i * 0.08);
                gain.gain.setValueAtTime(0.15, now + i * 0.08);
                gain.gain.exponentialRampToValueAtTime(0.01, now + i * 0.08 + 0.05);
                osc.start(now + i * 0.08);
                osc.stop(now + i * 0.08 + 0.05);
            }
            break;

        case 'move':
            // 移動音: ポップ音
            oscillator.frequency.setValueAtTime(600, now);
            gainNode.gain.setValueAtTime(0.2, now);
            gainNode.gain.exponentialRampToValueAtTime(0.01, now + 0.05);
            oscillator.start(now);
            oscillator.stop(now + 0.05);
            break;

        case 'card':
            // イベントカード出現音: ジャジャーン!
            const cardFreqs = [392, 523, 659]; // G, C, E
            cardFreqs.forEach((freq, index) => {
                const osc = context.createOscillator();
                const gain = context.createGain();
                osc.connect(gain);
                gain.connect(context.destination);

                osc.frequency.setValueAtTime(freq, now + index * 0.1);
                gain.gain.setValueAtTime(0.25, now + index * 0.1);
                gain.gain.exponentialRampToValueAtTime(0.01, now + index * 0.1 + 0.4);
                osc.start(now + index * 0.1);
                osc.stop(now + index * 0.1 + 0.4);
            });
            break;

        case 'positive':
            // ポジティブイベント: キラキラ上昇音
            const posFreqs = [523, 659, 784, 1047]; // C, E, G, C (高)
            posFreqs.forEach((freq, index) => {
                const osc = context.createOscillator();
                const gain = context.createGain();
                osc.connect(gain);
                gain.connect(context.destination);

                osc.type = 'sine';
                osc.frequency.setValueAtTime(freq, now + index * 0.08);
                gain.gain.setValueAtTime(0.2, now + index * 0.08);
                gain.gain.exponentialRampToValueAtTime(0.01, now + index * 0.08 + 0.3);
                osc.start(now + index * 0.08);
                osc.stop(now + index * 0.08 + 0.3);
            });
            break;

        case 'negative':
            // ネガティブイベント: デデデデーン(下降音)
            const negFreqs = [392, 349, 294, 262]; // G, F, D, C (下降)
            negFreqs.forEach((freq, index) => {
                const osc = context.createOscillator();
                const gain = context.createGain();
                osc.connect(gain);
                gain.connect(context.destination);

                osc.type = 'sawtooth';
                osc.frequency.setValueAtTime(freq, now + index * 0.12);
                gain.gain.setValueAtTime(0.25, now + index * 0.12);
                gain.gain.exponentialRampToValueAtTime(0.01, now + index * 0.12 + 0.35);
                osc.start(now + index * 0.12);
                osc.stop(now + index * 0.12 + 0.35);
            });
            break;

        case 'neutral':
            // ニュートラルイベント: 中性的な音
            oscillator.frequency.setValueAtTime(500, now);
            gainNode.gain.setValueAtTime(0.2, now);
            gainNode.gain.exponentialRampToValueAtTime(0.01, now + 0.2);
            oscillator.start(now);
            oscillator.stop(now + 0.2);
            break;

        case 'goal':
            // ゴール音: ファンファーレ風
            const goalFreqs = [523, 659, 784, 1047]; // C, E, G, C
            goalFreqs.forEach((freq, index) => {
                const osc = context.createOscillator();
                const gain = context.createGain();
                osc.connect(gain);
                gain.connect(context.destination);

                osc.frequency.setValueAtTime(freq, now + index * 0.15);
                gain.gain.setValueAtTime(0.2, now + index * 0.15);
                gain.gain.exponentialRampToValueAtTime(0.01, now + index * 0.15 + 0.3);
                osc.start(now + index * 0.15);
                osc.stop(now + index * 0.15 + 0.3);
            });
            break;
    }
}

function toggleSound() {
    gameState.soundEnabled = !gameState.soundEnabled;
    const soundBtn = document.getElementById('soundToggleBtn');
    soundBtn.textContent = gameState.soundEnabled ? '🔊' : '🔇';
    soundBtn.title = gameState.soundEnabled ? '音声をOFFにする' : '音声をONにする';
}

// ===== DOM要素 =====
const elements = {
    setupScreen: document.getElementById('setupScreen'),
    gameScreen: document.getElementById('gameScreen'),
    endScreen: document.getElementById('endScreen'),
    playerCount: document.getElementById('playerCount'),
    playerInputs: document.getElementById('playerInputs'),
    startGameBtn: document.getElementById('startGameBtn'),
    resetBtn: document.getElementById('resetBtn'),
    board: document.getElementById('board'),
    playerStatus: document.getElementById('playerStatus'),
    currentPlayerName: document.getElementById('currentPlayerName'),
    dice: document.getElementById('dice'),
    diceResult: document.getElementById('diceResult'),
    rollDiceBtn: document.getElementById('rollDiceBtn'),
    eventModal: document.getElementById('eventModal'),
    eventType: document.getElementById('eventType'),
    eventText: document.getElementById('eventText'),
    eventEffect: document.getElementById('eventEffect'),
    executeEventBtn: document.getElementById('executeEventBtn'),
    winnerInfo: document.getElementById('winnerInfo'),
    playAgainBtn: document.getElementById('playAgainBtn'),
    soundToggleBtn: document.getElementById('soundToggleBtn')
};

// ===== 初期化 =====
function init() {
    setupEventListeners();
    generatePlayerInputs();
}

// ===== イベントリスナー設定 =====
function setupEventListeners() {
    elements.playerCount.addEventListener('change', generatePlayerInputs);
    elements.startGameBtn.addEventListener('click', startGame);
    elements.rollDiceBtn.addEventListener('click', rollDice);
    elements.executeEventBtn.addEventListener('click', executeEvent);
    elements.resetBtn.addEventListener('click', resetGame);
    elements.playAgainBtn.addEventListener('click', resetGame);
    elements.soundToggleBtn.addEventListener('click', toggleSound);
}

// ===== プレイヤー入力フィールド生成 =====
function generatePlayerInputs() {
    const count = parseInt(elements.playerCount.value);
    const defaultNames = ['プレイヤー1', 'プレイヤー2', 'プレイヤー3', 'プレイヤー4'];

    elements.playerInputs.innerHTML = '';

    for (let i = 0; i < count; i++) {
        const div = document.createElement('div');
        div.className = 'player-input-group';
        div.innerHTML = `
            <h3>${defaultNames[i]}</h3>
            <div class="input-row">
                <input type="text" class="text-input player-name-input"
                       placeholder="名前を入力" value="${defaultNames[i]}" data-player="${i}">
            </div>
        `;
        elements.playerInputs.appendChild(div);
    }
}

// ===== ゲーム開始 =====
function startGame() {
    const count = parseInt(elements.playerCount.value);
    gameState.players = [];
    const fixedColors = ['red', 'blue', 'green', 'yellow'];

    // プレイヤー情報取得
    for (let i = 0; i < count; i++) {
        const nameInput = document.querySelector(`.player-name-input[data-player="${i}"]`);

        gameState.players.push({
            name: nameInput.value || `プレイヤー${i + 1}`,
            color: fixedColors[i], // 色を固定で割り当て
            emoji: playerEmojis[i], // 絵文字を追加
            position: 0,
            rank: null, // 順位（null = まだゴールしていない）
            isFinished: false // ゴール済みフラグ
        });
    }

    // ボード生成
    generateBoard();

    // 画面切り替え
    elements.setupScreen.style.display = 'none';
    elements.gameScreen.style.display = 'block';
    elements.resetBtn.style.display = 'block';

    // UI更新
    updatePlayerStatus();
    updateBoard();
    updateCurrentTurn();
}

// ===== ボード生成 =====
function generateBoard() {
    const totalCells = 61; // 0(スタート)〜60(ゴール)
    gameState.board = [];

    // スタート
    gameState.board.push({ type: 'start' });

    // 中間マス(1〜59)
    const middleCells = [];
    // 新しい比率: ポジティブ15個、ネガティブ8個、ニュートラル4個、通常32個、ストップ3個(計59)
    // 通常マスを増やしてゲームバランスを改善
    for (let i = 0; i < 15; i++) middleCells.push({ type: 'positive' });
    for (let i = 0; i < 8; i++) middleCells.push({ type: 'negative' });
    for (let i = 0; i < 4; i++) middleCells.push({ type: 'neutral' });
    for (let i = 0; i < 32; i++) middleCells.push({ type: 'normal' });

    // シャッフル
    for (let i = middleCells.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [middleCells[i], middleCells[j]] = [middleCells[j], middleCells[i]];
    }

    // ストップマスを固定位置(15, 30, 45)に挿入
    // middleCellsの中身を調整した後に挿入するので、全体のインデックスに注意
    gameState.board.push(...middleCells);

    // 0がスタートなので、15, 30, 45マス目をストップに強制上書き
    [15, 30, 45].forEach(pos => {
        gameState.board[pos] = { type: 'stop' };
    });

    // ゴール
    gameState.board.push({ type: 'goal' });

    // ボードHTML生成
    elements.board.innerHTML = '';
    gameState.board.forEach((cell, index) => {
        const cellDiv = document.createElement('div');
        cellDiv.className = `cell cell-${cell.type}`;
        cellDiv.dataset.position = index;

        let icon = '';
        if (cell.type === 'start') icon = '🏁';
        else if (cell.type === 'goal') icon = '🎯';
        else if (cell.type === 'positive') icon = '🟢';
        else if (cell.type === 'negative') icon = '🔴';
        else if (cell.type === 'neutral') icon = '🟡';
        else if (cell.type === 'stop') icon = '🛑';
        else icon = '⚪';

        cellDiv.innerHTML = `
            <span class="cell-number">${index}</span>
            <span class="cell-icon">${icon}</span>
            <div class="cell-players"></div>
        `;

        elements.board.appendChild(cellDiv);
    });
}

// ===== プレイヤーステータス更新 =====
function updatePlayerStatus() {
    elements.playerStatus.innerHTML = '';

    gameState.players.forEach((player, index) => {
        const div = document.createElement('div');
        div.className = `player-info ${index === gameState.currentPlayerIndex ? 'active' : ''}`;
        div.innerHTML = `
            <div class="player-name">
                <span class="player-marker" style="background: #${getColorHex(player.color)}">${player.emoji}</span>
                ${player.name}
            </div>
            <div class="player-position">${player.position}マス目</div>
        `;
        elements.playerStatus.appendChild(div);
    });
}

// ===== ボード更新 =====
function updateBoard() {
    // 全マスのプレイヤー表示をクリア
    document.querySelectorAll('.cell-players').forEach(el => el.innerHTML = '');

    // 各プレイヤーの位置にマーカー表示
    gameState.players.forEach(player => {
        const cell = document.querySelector(`[data-position="${player.position}"] .cell-players`);
        if (cell) {
            const marker = document.createElement('div');
            marker.className = 'cell-player-marker';
            marker.style.background = `#${getColorHex(player.color)}`;
            marker.textContent = player.emoji; // 絵文字を表示
            cell.appendChild(marker);
        }
    });
}

// ===== 現在のターン表示更新 =====
function updateCurrentTurn() {
    const currentPlayer = gameState.players[gameState.currentPlayerIndex];
    elements.currentPlayerName.textContent = currentPlayer.name;
    elements.currentPlayerName.style.color = `#${getColorHex(currentPlayer.color)}`;

    // 背景色を現在のプレイヤーの色に変更
    document.body.className = `turn-${currentPlayer.color}`;
}

// ===== サイコロを振る =====
async function rollDice() {
    if (gameState.isMoving) return;

    // AudioContextを初期化・再開（スマホ対応）
    const context = initAudioContext();
    if (context.state === 'suspended') {
        await context.resume();
    }

    elements.rollDiceBtn.disabled = true;
    elements.dice.classList.add('rolling');

    // アニメーション
    let count = 0;
    const interval = setInterval(async () => {
        elements.dice.textContent = Math.floor(Math.random() * 6) + 1;
        count++;
        if (count > 10) {
            clearInterval(interval);
            const result = Math.floor(Math.random() * 6) + 1;
            elements.dice.textContent = result;
            elements.diceResult.textContent = `${result}が出た!`;
            elements.dice.classList.remove('rolling');
            await playSound('dice'); // サイコロ音

            // コマ移動
            setTimeout(() => movePlayer(result), 500);
        }
    }, 100);
}

// ===== プレイヤー移動 (段階的アニメーション) =====
async function movePlayer(steps, skipEvent = false) {
    if (steps === 0) return;

    // 移動中フラグのチェック
    if (gameState.isMoving && steps > 0) return;
    gameState.isMoving = true;

    const currentPlayer = gameState.players[gameState.currentPlayerIndex];
    const direction = steps > 0 ? 1 : -1;
    const absSteps = Math.abs(steps);

    for (let i = 0; i < absSteps; i++) {
        const nextPos = currentPlayer.position + direction;

        // 後退の場合は0未満にならないようにする
        if (nextPos < 0) break;

        // ゴールを超える場合は一旦60まで進む
        if (nextPos > 60) {
            // 残りのステップを計算
            const remainingSteps = absSteps - i;
            const overshoot = nextPos - 60;

            // 60まで進む
            currentPlayer.position = 60;
            updateBoard();
            await playSound('move');

            const marker60 = document.querySelector(`[data-position="60"] .cell-player-marker`);
            if (marker60) {
                marker60.classList.add('jumping');
                await new Promise(r => setTimeout(r, 300));
                marker60.classList.remove('jumping');
            } else {
                await new Promise(r => setTimeout(r, 300));
            }

            // 超えた分だけ引き返す
            for (let j = 0; j < overshoot; j++) {
                currentPlayer.position--;
                if (currentPlayer.position < 0) {
                    currentPlayer.position = 0;
                    break;
                }
                updateBoard();
                await playSound('move');

                const markerBack = document.querySelector(`[data-position="${currentPlayer.position}"] .cell-player-marker`);
                if (markerBack) {
                    markerBack.classList.add('jumping');
                    await new Promise(r => setTimeout(r, 300));
                    markerBack.classList.remove('jumping');
                } else {
                    await new Promise(r => setTimeout(r, 300));
                }
            }
            break;
        }

        currentPlayer.position = nextPos;
        updateBoard();
        await playSound('move'); // 移動音

        // 跳ねるアニメーション
        const marker = document.querySelector(`[data-position="${nextPos}"] .cell-player-marker`);
        if (marker) {
            marker.classList.add('jumping');
            await new Promise(r => setTimeout(r, 300));
            marker.classList.remove('jumping');
        } else {
            await new Promise(r => setTimeout(r, 300));
        }

        // ストップマス判定 (イベント移動中でない場合、かつそのマスがストップマスの場合は強制停止)
        if (!skipEvent && gameState.board[nextPos].type === 'stop') {
            break;
        }
    }

    gameState.isMoving = false;
    updatePlayerStatus();

    // ゴール判定（ピッタリ60の場合のみゴール）
    if (currentPlayer.position === 60 && !currentPlayer.isFinished) {
        await playSound('goal'); // ゴール音

        // プレイヤーをゴール済みにする
        currentPlayer.isFinished = true;
        currentPlayer.rank = 1; // 1位

        // 残りのプレイヤーを位置（ゴールに近い順）で順位付け
        const remainingPlayers = gameState.players.filter(p => !p.isFinished);
        remainingPlayers.sort((a, b) => b.position - a.position); // 位置が大きい順
        remainingPlayers.forEach((player, index) => {
            player.rank = index + 2; // 2位から順位付け
            player.isFinished = true;
        });

        // 優勝モーダルを表示
        setTimeout(() => showWinnerModal(currentPlayer), 1000);
        return;
    }

    // イベントスキップ判定 (イベント移動後のマスのイベントは無視)
    if (skipEvent) {
        setTimeout(() => nextTurn(), 1000);
        return;
    }

    // イベント判定
    const cell = gameState.board[currentPlayer.position];
    if (cell.type === 'positive' || cell.type === 'negative' || cell.type === 'neutral' || cell.type === 'stop') {
        // イベントカード出現音「ジャジャーン」
        await playSound('card');

        // 少し待ってからイベントを表示
        setTimeout(() => showEvent(cell.type), 500);
    } else {
        // 次のプレイヤーへ
        setTimeout(() => nextTurn(), 1000);
    }
}

// ===== イベント表示 =====
async function showEvent(eventType) {
    let randomEvent;
    let typeLabel = '';
    let typeClass = '';

    if (eventType === 'positive') {
        randomEvent = events.positive[Math.floor(Math.random() * events.positive.length)];
        typeLabel = '🟢 ポジティブイベント';
        typeClass = 'positive';
        // ポジティブイベント音を再生
        await playSound('positive');
    } else if (eventType === 'negative') {
        randomEvent = events.negative[Math.floor(Math.random() * events.negative.length)];
        typeLabel = '🔴 ネガティブイベント';
        typeClass = 'negative';
        // ネガティブイベント音を再生（デデデデーン）
        await playSound('negative');
    } else if (eventType === 'neutral') {
        randomEvent = events.neutral[Math.floor(Math.random() * events.neutral.length)];
        typeLabel = '🟡 ニュートラルイベント';
        typeClass = 'neutral';
        // ニュートラルイベント音を再生
        await playSound('neutral');
    } else if (eventType === 'stop') {
        randomEvent = {
            text: '🛑 ストップ！\nどんな出目でも、このマスで一度止まらなければなりません。',
            effect: { type: 'stop', value: 0 }
        };
        typeLabel = '🛑 ストップマス';
        typeClass = 'stop';
        // ストップマス音を再生
        await playSound('neutral');
    }

    gameState.currentEvent = randomEvent;

    elements.eventType.textContent = typeLabel;
    elements.eventType.className = `event-type ${typeClass}`;
    elements.eventText.textContent = randomEvent.text;

    // イベント効果の表示とボタン設定
    if (randomEvent.effect.type === 'stop') {
        // ストップマス
        elements.eventEffect.textContent = '次のターンからまた進めます。';
        elements.executeEventBtn.textContent = '了解';
        elements.executeEventBtn.style.display = 'block';
        // 選択肢ボタンを非表示
        const choiceButtons = document.getElementById('choiceButtons');
        if (choiceButtons) choiceButtons.style.display = 'none';
    } else if (randomEvent.effect.type === 'move') {
        // シンプルな移動イベント
        const direction = randomEvent.effect.value > 0 ? '進む' : '戻る';
        elements.eventEffect.textContent = `→ ${Math.abs(randomEvent.effect.value)}マス${direction}!`;
        elements.executeEventBtn.textContent = 'イベント実行';
        elements.executeEventBtn.style.display = 'block';
        // 選択肢ボタンを非表示
        const choiceButtons = document.getElementById('choiceButtons');
        if (choiceButtons) choiceButtons.style.display = 'none';
    } else if (randomEvent.effect.type === 'dice') {
        // サイコロ判定型
        elements.eventEffect.textContent = 'サイコロを振って結果を決めよう!';
        elements.executeEventBtn.textContent = 'サイコロを振る';
        elements.executeEventBtn.style.display = 'block';
        const choiceButtons = document.getElementById('choiceButtons');
        if (choiceButtons) choiceButtons.style.display = 'none';
    } else if (randomEvent.effect.type === 'choice') {
        // 選択肢型
        elements.eventEffect.textContent = 'どちらを選ぶ?';
        elements.executeEventBtn.style.display = 'none';

        // 選択肢ボタンを表示
        let choiceButtons = document.getElementById('choiceButtons');
        if (!choiceButtons) {
            choiceButtons = document.createElement('div');
            choiceButtons.id = 'choiceButtons';
            choiceButtons.className = 'choice-buttons';
            elements.eventEffect.parentElement.appendChild(choiceButtons);
        }

        choiceButtons.innerHTML = '';
        choiceButtons.style.display = 'flex';

        randomEvent.effect.options.forEach((option, index) => {
            const btn = document.createElement('button');
            btn.className = 'choice-btn';
            btn.textContent = option.label;
            btn.onclick = () => executeChoice(index);
            choiceButtons.appendChild(btn);
        });
    }

    elements.eventModal.classList.add('show');
}

// ===== イベント実行 =====
function executeEvent() {
    const effect = gameState.currentEvent.effect;

    if (effect.type === 'stop') {
        // ストップマス: モーダルを閉じて次のターンへ
        elements.eventModal.classList.remove('show');
        setTimeout(() => nextTurn(), 500);
    } else if (effect.type === 'move') {
        // シンプルな移動
        applyMoveEffect(effect.value);
    } else if (effect.type === 'dice') {
        // サイコロ判定型
        executeDiceEvent();
    }
}

// ===== サイコロ判定型イベント実行 =====
function executeDiceEvent() {
    // サイコロを振る
    elements.executeEventBtn.disabled = true;
    const diceResult = Math.floor(Math.random() * 6) + 1;

    elements.eventEffect.textContent = `サイコロ: ${diceResult}が出た!`;

    setTimeout(() => {
        const effect = gameState.currentEvent.effect;
        const conditions = effect.conditions;
        let moveValue = 0;
        let message = '';

        if (conditions.six && diceResult === 6) {
            moveValue = conditions.six.value;
            message = conditions.six.message;
        } else if (conditions.even && diceResult % 2 === 0) {
            moveValue = conditions.even.value;
            message = conditions.even.message;
        } else if (conditions.odd && diceResult % 2 === 1) {
            moveValue = conditions.odd.value;
            message = conditions.odd.message;
        } else if (conditions.other) {
            moveValue = conditions.other.value;
            message = conditions.other.message;
        }

        elements.eventEffect.textContent = `${message} → ${Math.abs(moveValue)}マス${moveValue > 0 ? '進む' : '戻る'}!`;

        setTimeout(() => {
            applyMoveEffect(moveValue);
        }, 1500);
    }, 1000);
}

// ===== 選択肢型イベント実行 =====
function executeChoice(choiceIndex) {
    const option = gameState.currentEvent.effect.options[choiceIndex];
    const moveValue = option.effect.value;
    const message = option.message;

    elements.eventEffect.textContent = `${message} → ${Math.abs(moveValue)}マス${moveValue > 0 ? '進む' : moveValue < 0 ? '戻る' : '移動なし'}!`;

    // 選択肢ボタンを非表示
    const choiceButtons = document.getElementById('choiceButtons');
    if (choiceButtons) choiceButtons.style.display = 'none';

    setTimeout(() => {
        applyMoveEffect(moveValue);
    }, 1500);
}

// ===== 移動効果適用 =====
async function applyMoveEffect(moveValue) {
    // モーダルを閉じる
    elements.eventModal.classList.remove('show');

    // 移動がある場合のみ移動処理を実行
    if (moveValue !== 0) {
        // 第二引数に true を渡し、移動先でのイベントをスキップする
        await movePlayer(moveValue, true);
    } else {
        // 移動がない場合は直接次のターンへ
        setTimeout(() => nextTurn(), 1000);
    }

    elements.executeEventBtn.disabled = false;
}

// ===== 優勝モーダル表示 =====
async function showWinnerModal(winner) {
    // ファンファーレを鳴らす
    await playSound('goal');

    elements.eventType.textContent = '🏆 優勝！';
    elements.eventType.className = 'event-type positive';
    elements.eventText.textContent = `優勝🏆は${winner.name}です！\nおめでとうございます！`;
    elements.eventEffect.textContent = '';
    elements.executeEventBtn.textContent = '結果発表へ';
    elements.executeEventBtn.style.display = 'block';

    // 選択肢ボタンを非表示
    const choiceButtons = document.getElementById('choiceButtons');
    if (choiceButtons) choiceButtons.style.display = 'none';

    // モーダルを表示
    elements.eventModal.classList.add('show');

    // ボタンクリック時の処理を変更
    elements.executeEventBtn.onclick = () => {
        elements.eventModal.classList.remove('show');
        setTimeout(() => endGame(), 500);
        // イベントリスナーを元に戻す
        elements.executeEventBtn.onclick = null;
    };
}

// ===== 次のターン =====
function nextTurn() {
    // 次のプレイヤーを探す（ゴール済みのプレイヤーはスキップ）
    let nextIndex = (gameState.currentPlayerIndex + 1) % gameState.players.length;
    let attempts = 0;

    // ゴールしていないプレイヤーを探す
    while (gameState.players[nextIndex].isFinished && attempts < gameState.players.length) {
        nextIndex = (nextIndex + 1) % gameState.players.length;
        attempts++;
    }

    // すべてのプレイヤーがゴールしている場合はゲーム終了
    if (attempts >= gameState.players.length) {
        endGame();
        return;
    }

    gameState.currentPlayerIndex = nextIndex;
    updatePlayerStatus();
    updateCurrentTurn();
    elements.rollDiceBtn.disabled = false;
    elements.diceResult.textContent = '';
}

// ===== ゲーム終了 =====
function endGame() {
    gameState.isGameOver = true;

    // 1位のプレイヤーを取得
    const winner = gameState.players.find(p => p.rank === 1);
    gameState.winner = winner;

    // 背景色をデフォルトに戻す
    document.body.className = '';

    elements.gameScreen.style.display = 'none';
    elements.endScreen.style.display = 'block';

    // 順位でソート（rankがnullの場合は最下位）
    const sortedPlayers = [...gameState.players].sort((a, b) => {
        if (a.rank === null) return 1;
        if (b.rank === null) return -1;
        return a.rank - b.rank;
    });

    let rankingsHTML = '';
    sortedPlayers.forEach((player) => {
        const rank = player.rank || gameState.players.length;
        const medal = rank === 1 ? '🏆' : rank === 2 ? '🥈' : rank === 3 ? '🥉' : '🎖️';
        const rankClass = rank === 1 ? 'rank-1' : rank === 2 ? 'rank-2' : rank === 3 ? 'rank-3' : 'rank-other';
        rankingsHTML += `
            <div class="ranking-item ${rankClass}">
                <span class="rank-medal">${medal}</span>
                <span class="player-marker" style="background: #${getColorHex(player.color)}">${player.emoji}</span>
                <span class="rank-name">${player.name}</span>
                <span class="rank-position">${rank}位 (${player.position}マス)</span>
            </div>
        `;
    });

    elements.winnerInfo.innerHTML = `
        <div class="winner-trophy">🎉</div>
        <div class="winner-title">優勝: ${winner.name}!</div>
        <div class="winner-marker">
            <span class="player-marker" style="background: #${getColorHex(winner.color)};
                  width: 60px; height: 60px; display: flex; align-items: center; justify-content: center; border-radius: 50%; font-size: 30px;">
                ${winner.emoji}
            </span>
        </div>
        <div class="rankings-title">最終順位</div>
        <div class="rankings">
            ${rankingsHTML}
        </div>
    `;
}

// ===== ゲームリセット =====
function resetGame() {
    const soundEnabled = gameState.soundEnabled;
    gameState = {
        players: [],
        currentPlayerIndex: 0,
        board: [],
        isGameOver: false,
        winner: null,
        currentEvent: null,
        soundEnabled: soundEnabled,
        isMoving: false,
        finishedPlayers: []
    };

    elements.setupScreen.style.display = 'block';
    elements.gameScreen.style.display = 'none';
    elements.endScreen.style.display = 'none';
    elements.resetBtn.style.display = 'none';
    elements.diceResult.textContent = '';
    elements.rollDiceBtn.disabled = false;

    // 背景色をデフォルトに戻す
    document.body.className = '';

    generatePlayerInputs();
}

// ===== ユーティリティ: 色コード取得 =====
function getColorHex(color) {
    const colors = {
        red: 'ff6b6b',
        blue: '4dabf7',
        green: '51cf66',
        yellow: 'ffd43b'
    };
    return colors[color] || 'cccccc';
}

// ===== アプリ起動 =====
init();
