class Atm {
    constructor() {
        this.balance = 0;
        this.moneyVault = {
            1000: 0,
            500: 0,
            200: 0,
            100: 0,
            50: 0
        };
    }

    showBalance() {
        let res = [];
        for (const nominal in this.moneyVault) {
            if (this.moneyVault[nominal] > 0) {
                for (let i = 1; i <= this.moneyVault[nominal]; i++) {
                    res.push(nominal);
                }
            }
        }
        console.log(this.balance, res);
    }

    addMoney(sum, moneyList) {
        const validBankNote = [50, 100, 200, 500, 1000];

        for (let i = 0; i < moneyList.length; i++) {
            if (validBankNote.indexOf(moneyList[i]) === -1) {
                return 'Have fake banknotes';
            }
        }

        const addSum = moneyList.reduce(function (a, b) {
            return (a + b)
        });

        if (sum === addSum) {
            this.balance += sum;
            for (let i = 0; i < moneyList.length; i++) {
                this.moneyVault[moneyList[i]] += 1;
            }
            let a = `ATM replenished in the amount of ${sum}`;
            return a;
        } else {
            return 'The amount of the bank notes differs from the amount needed to replenish it';
        }
    }

    withdrawCash(card, sum) {
        const tempSum = sum;

        if (card.balance < sum) {
            return 'There is not enough money on the card';
        }
        if (this.balance < sum) {
            return 'There is not enough money at the ATM';
        }
        if (sum % 50 !== 0) {
            return 'Enter a sum multiple of 50';
        }

        let moneyVaultTemp = {
            1000: 0,
            500: 0,
            200: 0,
            100: 0,
            50: 0
        };

        if (this.moneyVault["1000"] !== 0) {
            const quantity = Math.floor(sum / 1000);
            if (this.moneyVault["1000"] >= quantity) {
                sum -= 1000 * quantity;
                moneyVaultTemp["1000"] = quantity;
            } else {
                sum -= 1000 * this.moneyVault["1000"];
                moneyVaultTemp["1000"] = this.moneyVault["1000"];
            }
        }

        if (this.moneyVault["500"] !== 0) {
            const quantity = Math.floor(sum / 500);
            if (this.moneyVault["500"] >= quantity) {
                sum -= 500 * quantity;
                moneyVaultTemp["500"] = quantity;
            } else {
                sum -= 500 * this.moneyVault["500"];
                moneyVaultTemp["500"] = this.moneyVault["500"];
            }
        }

        if (this.moneyVault["200"] !== 0) {
            const quantity = Math.floor(sum / 200);
            if (this.moneyVault["200"] >= quantity) {
                sum -= 200 * quantity;
                moneyVaultTemp["200"] = quantity;
            } else {
                sum -= 200 * this.moneyVault["200"];
                moneyVaultTemp["200"] = this.moneyVault["200"];
            }
        }

        if (this.moneyVault["100"] !== 0) {
            const quantity = Math.floor(sum / 100);
            if (this.moneyVault["100"] >= quantity) {
                sum -= 100 * quantity;
                moneyVaultTemp["100"] = quantity;
            } else {
                sum -= 100 * this.moneyVault["100"];
                moneyVaultTemp["100"] = this.moneyVault["100"];
            }
        }

        if (this.moneyVault["50"] !== 0) {
            const quantity = Math.floor(sum / 50);
            if (this.moneyVault["50"] >= quantity) {
                sum -= 50 * quantity;
                moneyVaultTemp["50"] = quantity;
            } else {
                sum -= 50 * this.moneyVault["50"];
                moneyVaultTemp["50"] = this.moneyVault["50"];
            }
        }

        let money = '';
        for (const nominal in moneyVaultTemp) {
            if (moneyVaultTemp[nominal] > 0) {
                for (let i = 1; i <= moneyVaultTemp[nominal]; i++) {
                    money += ` ${nominal}`;
                }
            }
        }

        if ((sum === 0)) {
            this.moneyVault["1000"] -= moneyVaultTemp["1000"];
            this.moneyVault["500"] -= moneyVaultTemp["500"];
            this.moneyVault["200"] -= moneyVaultTemp["200"];
            this.moneyVault["100"] -= moneyVaultTemp["100"];
            this.moneyVault["50"] -= moneyVaultTemp["50"];
            card.balance -= tempSum;
            this.balance -=tempSum;
            return `Great, here is your money ${money}`;
        } else {
            return 'Enter another summ';
        }
    }
}

class Card {
    constructor() {
        this.balance = 0;
    }

    showBalance() {
        return this.balance;
    }

    addMoney(val) {
        this.balance += val;
    }
}

let atm = new Atm();
let creditCard = new Card();

const screen = document.querySelector('.field-output');
const fieldInput = document.querySelector('.field-input');
let textScreen = '';
const btnShowBalance = document.querySelector('#showBalance');
const btnAddMoney = document.querySelector('#addMoney');
const btnAddMoneyATM = document.querySelector('#atmAddMoney');
const btnWithdrawCash = document.querySelector('#withdrawCash');
const btnEnter = document.querySelector('#enter');
const btnCancel = document.querySelector('#cancel');
const btnClear = document.querySelector('#clear');
const blockBtnNumbers = document.querySelector('.block-btn-numbers');

btnShowBalance.addEventListener('click', function () {
    fieldInput.classList.add('d-none');
    textScreen = `Your card balance ${creditCard.showBalance()}`;
    screen.innerHTML = textScreen;
});

btnAddMoney.addEventListener('click', function () {
    let tempVal = '';
    textScreen = `What amount to deposit on your card`;
    screen.innerHTML = textScreen;
    fieldInput.classList.remove('d-none');
    buttonBlock(false);

    let isButton = function (e) {
        if (e.target.tagName === 'BUTTON') {
            tempVal += e.target.value;
            fieldInput.value = tempVal;
        }
    };

    blockBtnNumbers.addEventListener('click', isButton, false);

    btnEnter.addEventListener('click', function () {
        creditCard.addMoney(Number(tempVal));
        tempVal = '';
        blockBtnNumbers.removeEventListener('click', isButton, false);
        fieldInput.value = '';
        screen.innerHTML = '';
        fieldInput.classList.add('d-none');
        buttonBlock(true);
    });

    btnClear.addEventListener('click', function () {
        tempVal = '';
        fieldInput.value = tempVal;
    });

    btnCancel.addEventListener('click', function () {
        tempVal = '';
        blockBtnNumbers.removeEventListener('click', isButton, false);
        fieldInput.value = '';
        screen.innerHTML = '';
        fieldInput.classList.add('d-none');
        buttonBlock(true);
    });
});

btnWithdrawCash.addEventListener('click', function () {
    let tempVal = '';
    textScreen = `How much do you want to withdraw from the card?`;
    screen.innerHTML = textScreen;
    fieldInput.classList.remove('d-none');
    buttonBlock(false);

    let isButton = function (e) {
        if (e.target.tagName === 'BUTTON') {
            tempVal += e.target.value;
            fieldInput.value = tempVal;
        }
    };

    blockBtnNumbers.addEventListener('click', isButton, false);

    btnEnter.addEventListener('click', function () {
        const res = atm.withdrawCash(creditCard, Number(tempVal));
        tempVal = '';
        blockBtnNumbers.removeEventListener('click', isButton, false);
        fieldInput.value = '';
        screen.innerHTML = res;
        fieldInput.classList.add('d-none');
        buttonBlock(true);
    });

    btnClear.addEventListener('click', function () {
        tempVal = '';
        fieldInput.value = tempVal;
    });

    btnCancel.addEventListener('click', function () {
        tempVal = '';
        blockBtnNumbers.removeEventListener('click', isButton, false);
        fieldInput.value = '';
        screen.innerHTML = '';
        fieldInput.classList.add('d-none');
        buttonBlock(true);
    });
});

buttonBlock(true);

function buttonBlock(state) {
    const btns = document.getElementsByClassName('disabled');
    for (let i = 0; i < btns.length; i++) {
        btns[i].disabled = state;
    }
}

btnAddMoneyATM.addEventListener('click', function () {
    const btnEnterATM = document.querySelector('#enterATM');
    const btnCancelATM = document.querySelector('#cancelATM');
    const btnClearATM = document.querySelector('#clearATM');
    const btn50 = document.querySelector('#banknote50');
    const btn100 = document.querySelector('#banknote100');
    const btn200 = document.querySelector('#banknote200');
    const btn500 = document.querySelector('#banknote500');
    const btn1000 = document.querySelector('#banknote1000');
    const btnClearBanknote = document.querySelector('#clearBanknote');
    const btnEnterBanknote = document.querySelector('#enterBanknote');
    const btnBanknoteControl = document.querySelector('.block-btn-banknote-control');
    const fieldForBanknote = document.querySelector('.for-banknote');
    const btns1 = document.querySelector('.block-btn-control');
    const btns2 = document.querySelector('.block-btn-control-atm');

    btns1.classList.add('d-none');
    btns2.classList.remove('d-none');
    let tempVal = '';
    let tempBanknote = [];
    textScreen = `What amount to deposit on ATM`;
    screen.innerHTML = textScreen;
    fieldInput.classList.remove('d-none');
    buttonBlock(false);

    let isButton = function (e) {
        if (e.target.tagName === 'BUTTON') {
            tempVal += e.target.value;
            fieldInput.value = tempVal;
        }
    };

    blockBtnNumbers.addEventListener('click', isButton, false);

    btnEnterATM.addEventListener('click', function () {
        textScreen = `what bills`;
        blockBtnNumbers.removeEventListener('click', isButton, false);
        fieldInput.value = '';
        screen.innerHTML = textScreen;
        fieldInput.classList.add('d-none');
        buttonBlock(true);
        btnBanknoteControl.classList.remove('d-none');
        btns1.classList.remove('d-none');
        btns2.classList.add('d-none');
    });

    btnClearATM.addEventListener('click', function () {
        tempVal = '';
        fieldInput.value = tempVal;
    });

    btnCancelATM.addEventListener('click', function () {
        tempVal = '';
        blockBtnNumbers.removeEventListener('click', isButton, false);
        fieldInput.value = '';
        screen.innerHTML = '';
        fieldInput.classList.add('d-none');
        buttonBlock(true);
    });

    btn50.addEventListener('click', function () {
        tempBanknote.push(50);
        fieldForBanknote.innerHTML = tempBanknote;
    });

    btn100.addEventListener('click', function () {
        tempBanknote.push(100);
        fieldForBanknote.innerHTML = tempBanknote;
    });

    btn200.addEventListener('click', function () {
        tempBanknote.push(200);
        fieldForBanknote.innerHTML = tempBanknote;
    });

    btn500.addEventListener('click', function () {
        tempBanknote.push(500);
        fieldForBanknote.innerHTML = tempBanknote;
    });

    btn1000.addEventListener('click', function () {
        tempBanknote.push(1000);
        fieldForBanknote.innerHTML = tempBanknote;
    });

    btnClearBanknote.addEventListener('click', function () {
        tempBanknote = [];
        fieldForBanknote.innerHTML = tempBanknote;
    });

    btnEnterBanknote.addEventListener('click', function () {
        fieldForBanknote.innerHTML = tempBanknote;
        screen.innerHTML = atm.addMoney(Number(tempVal), tempBanknote);
        tempVal = '';
        tempBanknote = [];
        fieldForBanknote.innerHTML = '';
        btnBanknoteControl.classList.add('d-none');
    });
});