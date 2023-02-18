if (typeof window === 'undefined') {
  // for node env
  const fs = require('fs');
  const path = require('path');
  const cwd = process.cwd();
  const { JSDOM } = require('jsdom');
  const { expect } = require('chai');
  require('mocha');

  const myLibrary = fs.readFileSync(path.join(cwd, '/script.js'), {
    encoding: 'utf-8',
  });
  const html = fs.readFileSync(path.join(cwd, '/calculator.html'));

  let window;
  window = new JSDOM(html, { runScripts: 'dangerously' }).window;
  const script = window.document.createElement('script');
  script.textContent = myLibrary;

  window.document.body.appendChild(script);

  test(window, expect);
} else {
  // for browser env
  var expect = chai.expect;
  test(window, expect);
}

function test(window, expect) {
  describe('bare minimum test', function () {
    bare(window, expect);
  });
  // ! for Advanced Challenge test, Nightmare test release below annotation.
  // describe('Advanced Challenge test', function () {
  //   advanced(window, expect);
  // });
  // describe('Nightmare test', function () {
  //   nightmare(window, expect);
  // });
}

function bare(window, expect) {
  describe('pass bare minimum requirement.', function () {
    afterEach(function () {
      clearButton.dispatchEvent(clickEvent);
    });

    const getButtonBy = function (text, buttons) {
      const result = buttons.filter(function (button) {
        return button.textContent === text;
      });

      if (result.length > 1) {
        throw new Error('no extra buttons allowed');
      } else if (result.length < 1) {
        throw new Error('no button');
      }

      return result[0];
    };

    const clickEvent = new window.MouseEvent('click', {
      bubbles: true,
      cancelable: true,
      view: window,
    });

    // const numbers = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0'];
    const numberButtons = [...window.document.querySelectorAll('.number')];
    // const operators = ['+', '-', '*', '/'];
    const operatorButtons = [...window.document.querySelectorAll('.operator')];
    const decimalButton = window.document.querySelector('.decimal');
    const clearButton = window.document.querySelector('.clear');
    const enterButton = window.document.querySelector('.calculate');
    const allButtons = [
      clearButton,
      enterButton,
      decimalButton,
      ...numberButtons,
      ...operatorButtons,
    ];

    it('after press clear button, screen show according to the order of 0, +, 0, =, 0 .', function (done) {
      const clearButton = window.document.querySelector('.clear');
      const firstOperend = window.document.querySelector(
        '.calculator__operend--left'
      );
      const operator = window.document.querySelector('.calculator__operator');
      const secondOperend = window.document.querySelector(
        '.calculator__operend--right'
      );
      const calculatedResult = window.document.querySelector(
        '.calculator__result'
      );
      clearButton.dispatchEvent(clickEvent);

      expect(firstOperend.textContent).to.be.equal('0');
      expect(operator.textContent).to.be.equal('+');
      expect(secondOperend.textContent).to.be.equal('0');
      expect(calculatedResult.textContent).to.be.equal('0');

      done();
    });

    it('when you press number firstly, number should appear first screen.', function (done) {
      const test = ['7', '7'];
      const clicks = test.slice(0, -1);
      const expected = test.slice(-1)[0];
      const firstOperend = window.document.querySelector(
        '.calculator__operend--left'
      );
      clicks.forEach(function (click) {
        const button = getButtonBy(click, allButtons);
        button.dispatchEvent(clickEvent);
      });
      expect(firstOperend.textContent).to.equal(expected);
      done();
    });

    it('press number and after operator, first number, second screen should show operator.', function (done) {
      const clicks = ['7', '+'];
      const expected = ['7', '+'];
      const firstOperend = window.document.querySelector(
        '.calculator__operend--left'
      );
      const operator = window.document.querySelector('.calculator__operator');
      clicks.forEach(function (click) {
        const button = getButtonBy(click, allButtons);
        button.dispatchEvent(clickEvent);
      });
      expect(firstOperend.textContent).to.be.equal(expected[0]);
      expect(operator.textContent).to.be.equal(expected[1]);
      done();
    });

    it('press number, operator, number, should show those according to the order.', function (done) {
      const clicks = ['7', '+', '5'];
      const expected = ['7', '+', '5'];
      const firstOperend = window.document.querySelector(
        '.calculator__operend--left'
      );
      const operator = window.document.querySelector('.calculator__operator');
      const secondOperend = window.document.querySelector(
        '.calculator__operend--right'
      );
      clicks.forEach(function (click) {
        const button = getButtonBy(click, allButtons);
        button.dispatchEvent(clickEvent);
      });
      expect(firstOperend.textContent).to.be.equal(expected[0]);
      expect(operator.textContent).to.be.equal(expected[1]);
      expect(secondOperend.textContent).to.be.equal(expected[2]);
      done();
    });

    it('press number, operator, number and Enter , screen should show those according to the order.', function (done) {
      const clicks = ['7', '+', '5', 'Enter'];
      const expected = ['7', '+', '5', '12'];
      const firstOperend = window.document.querySelector(
        '.calculator__operend--left'
      );
      const operator = window.document.querySelector('.calculator__operator');
      const secondOperend = window.document.querySelector(
        '.calculator__operend--right'
      );
      const calculatedResult = window.document.querySelector(
        '.calculator__result'
      );
      clicks.forEach(function (click) {
        const button = getButtonBy(click, allButtons);
        button.dispatchEvent(clickEvent);
      });
      expect(firstOperend.textContent).to.be.equal(expected[0]);
      expect(operator.textContent).to.be.equal(expected[1]);
      expect(secondOperend.textContent).to.be.equal(expected[2]);
      expect(calculatedResult.textContent).to.be.equal(expected[3]);
      done();
    });

    it('operating should use calculate function of script.js.', function (done) {
      const clicks = ['7', '+', '5', 'Enter'];
      const expected = ['7', '+', '5', '12'];
      const firstOperend = window.document.querySelector(
        '.calculator__operend--left'
      );
      const operator = window.document.querySelector('.calculator__operator');
      const secondOperend = window.document.querySelector(
        '.calculator__operend--right'
      );
      const calculatedResult = window.document.querySelector(
        '.calculator__result'
      );
      clicks.forEach(function (click) {
        const button = getButtonBy(click, allButtons);
        button.dispatchEvent(clickEvent);
      });

      const firstNum = firstOperend.textContent;
      const operatorContent = operator.textContent;
      const secondNum = secondOperend.textContent;

      const stringInputResult = window.calculate(
        firstNum,
        operatorContent,
        secondNum
      );
      const numberInputResult = window.calculate(
        Number(firstNum),
        operatorContent,
        Number(secondNum)
      );
      const isPassed =
        Boolean(stringInputResult === expected[3]) ||
        Boolean(numberInputResult === expected[3]);

      expect(firstOperend.textContent).to.be.equal(expected[0]);
      expect(operator.textContent).to.be.equal(expected[1]);
      expect(secondOperend.textContent).to.be.equal(expected[2]);
      expect(calculatedResult.textContent).to.be.equal(expected[3]);
      expect(isPassed).to.be.true;
      done();
    });

    it('when press clear, screen should show 0, +, 0, =, 0', function (done) {
      const clicks = ['7', '+', '5', 'Enter'];
      const expected = ['7', '+', '5', '12'];
      const firstOperend = window.document.querySelector(
        '.calculator__operend--left'
      );
      const operator = window.document.querySelector('.calculator__operator');
      const secondOperend = window.document.querySelector(
        '.calculator__operend--right'
      );
      const calculatedResult = window.document.querySelector(
        '.calculator__result'
      );

      clicks.forEach(function (click) {
        const button = getButtonBy(click, allButtons);
        button.dispatchEvent(clickEvent);
      });

      expect(firstOperend.textContent).to.be.equal(expected[0]);
      expect(operator.textContent).to.be.equal(expected[1]);
      expect(secondOperend.textContent).to.be.equal(expected[2]);
      expect(calculatedResult.textContent).to.be.equal(expected[3]);

      const clearButton = window.document.querySelector('.clear');
      clearButton.dispatchEvent(clickEvent);

      expect(firstOperend.textContent).to.be.equal('0');
      expect(operator.textContent).to.be.equal('+');
      expect(secondOperend.textContent).to.be.equal('0');
      expect(calculatedResult.textContent).to.be.equal('0');

      done();
    });
  });
}

function advanced(window, expect) {
  describe('pass Advanced Challenge', function () {
    afterEach(function () {
      clearButton.dispatchEvent(clickEvent);
    });

    const getButtonBy = function (text, buttons) {
      const result = buttons.filter(function (button) {
        return button.textContent === text;
      });

      if (result.length > 1) {
        throw new Error('no extra buttons allowed');
      } else if (result.length < 1) {
        throw new Error('no button');
      }

      return result[0];
    };

    const clickEvent = new window.MouseEvent('click', {
      bubbles: true,
      cancelable: true,
      view: window,
    });

    // const numbers = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0'];
    const numberButtons = [...window.document.querySelectorAll('.number')];
    // const operators = ['+', '-', '*', '/'];
    const operatorButtons = [...window.document.querySelectorAll('.operator')];
    const decimalButton = window.document.querySelector('.decimal');
    const clearButton = window.document.querySelector('.clear');
    const enterButton = window.document.querySelector('.calculate');
    const allButtons = [
      clearButton,
      enterButton,
      decimalButton,
      ...numberButtons,
      ...operatorButtons,
    ];

    describe('Step 1 - press number button and put it to screen', function () {
      it('when press number button, screen should show number.', function (done) {
        const test = ['7', '7'];
        const clicks = test.slice(0, -1);
        const expected = test.slice(-1)[0];
        const display = window.document.querySelector(
          '.calculator__display--for-advanced'
        );
        clicks.forEach(function (click) {
          const button = getButtonBy(click, allButtons);
          button.dispatchEvent(clickEvent);
        });
        expect(display.textContent).to.equal(expected);
        done();
      });

      it('when press number multiple times, screen should show number continuously(concatenation).', function (done) {
        const test = ['7', '0', '0', '0', '7000'];
        const clicks = test.slice(0, -1);
        const expected = test.slice(-1)[0];
        const display = window.document.querySelector(
          '.calculator__display--for-advanced'
        );
        clicks.forEach(function (click) {
          const button = getButtonBy(click, allButtons);
          button.dispatchEvent(clickEvent);
        });
        expect(display.textContent).to.equal(expected);
        done();
      });
    });

    describe('Step 2 - calculate with Enter key and AC should Reset', function () {
      it('when press operator calculator should memory the number and ready to compute.', function (done) {
        const test = ['7', '0', '0', '0', '*', '7000'];
        const clicks = test.slice(0, -1);
        const expected = test.slice(-1)[0];
        const display = window.document.querySelector(
          '.calculator__display--for-advanced'
        );
        clicks.forEach(function (click) {
          const button = getButtonBy(click, allButtons);
          button.dispatchEvent(clickEvent);
        });
        expect(display.textContent).to.equal(expected);
        done();
      });

      it('when press Enter button the current number and memorized number should operate together and show the result.', function (done) {
        const test = ['7', '0', '0', '0', '*', '6', 'Enter', '42000'];
        const clicks = test.slice(0, -1);
        const expected = test.slice(-1)[0];
        const display = window.document.querySelector(
          '.calculator__display--for-advanced'
        );
        clicks.forEach(function (click) {
          const button = getButtonBy(click, allButtons);
          button.dispatchEvent(clickEvent);
        });
        expect(display.textContent).to.equal(expected);
        done();
      });

      describe('test AC button.', function () {
        afterEach(function () {
          clearButton.dispatchEvent(clickEvent);
        });

        it(`AC button should reset.`, function (done) {
          const display = window.document.querySelector(
            '.calculator__display--for-advanced'
          );
          display.textContent = 'Something strange';
          const clearButton = window.document.querySelector('.clear');
          clearButton.dispatchEvent(clickEvent);

          expect(display.textContent).to.equal('0');
          done();
        });
      });
    });
  });

  describe('inspect calculate fuction.', function () {
    describe('test integer number operation.', function () {
      const calculateFuncTest = function (testValue) {
        const { firstNum, operator, displayedNum, result } = testValue;

        it(`sum of ${firstNum} and ${displayedNum} should be ${result}.`, function (done) {
          const stringInputResult = window.calculate(
            firstNum,
            operator,
            displayedNum
          );
          const numberInputResult = window.calculate(
            Number(firstNum),
            operator,
            Number(displayedNum)
          );
          const isPassed =
            Boolean(stringInputResult === result) ||
            Boolean(numberInputResult === result);
          expect(isPassed).to.be.true;
          done();
        });
      };

      describe('test addition operation', function () {
        const testArr = [
          { firstNum: '1', operator: '+', displayedNum: '2', result: '3' },
          {
            firstNum: '9492',
            operator: '+',
            displayedNum: '848946',
            result: '858438',
          },
          {
            firstNum: '1028',
            operator: '+',
            displayedNum: '1231',
            result: '2259',
          },
          {
            firstNum: '100',
            operator: '+',
            displayedNum: '1100',
            result: '1200',
          },
        ];

        testArr.forEach(calculateFuncTest);
      });

      describe('test substraction operation', function () {
        const testArr = [
          { firstNum: '1', operator: '-', displayedNum: '2', result: '-1' },
          {
            firstNum: '9492',
            operator: '-',
            displayedNum: '9492',
            result: '0',
          },
          {
            firstNum: '1111',
            operator: '-',
            displayedNum: '1100',
            result: '11',
          },
          {
            firstNum: '1100',
            operator: '-',
            displayedNum: '1000',
            result: '100',
          },
        ];

        testArr.forEach(calculateFuncTest);
      });

      describe('test multiplication operation', function () {
        const testArr = [
          { firstNum: '1', operator: '*', displayedNum: '2', result: '2' },
          {
            firstNum: '9492',
            operator: '*',
            displayedNum: '231',
            result: '2192652',
          },
          {
            firstNum: '100',
            operator: '*',
            displayedNum: '100',
            result: '10000',
          },
          { firstNum: '100', operator: '*', displayedNum: '1', result: '100' },
        ];

        testArr.forEach(calculateFuncTest);
      });

      describe('test division operation', function () {
        const testArr = [
          { firstNum: '4', operator: '/', displayedNum: '2', result: '2' },
          { firstNum: '100', operator: '/', displayedNum: '10', result: '10' },
          {
            firstNum: '2048',
            operator: '/',
            displayedNum: '1024',
            result: '2',
          },
          {
            firstNum: '28972456',
            operator: '/',
            displayedNum: '2323',
            result: '12472',
          },
        ];
        testArr.forEach(calculateFuncTest);
      });
    });
  });

  describe('test calculator operation.', function () {
    const clickEvent = new window.MouseEvent('click', {
      bubbles: true,
      cancelable: true,
      view: window,
    });

    const getButtonBy = function (text, buttons) {
      const result = buttons.filter(function (button) {
        return button.textContent === text;
      });

      if (result.length > 1) {
        throw new Error('no extra buttons allowed');
      } else if (result.length < 1) {
        throw new Error('no button');
      }

      return result[0];
    };

    const numbers = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0'];
    const numberButtons = [...window.document.querySelectorAll('.number')];
    // const operators = ['+', '-', '*', '/'];
    const operatorButtons = [...window.document.querySelectorAll('.operator')];
    const decimalButton = window.document.querySelector('.decimal');
    const clearButton = window.document.querySelector('.clear');
    const enterButton = window.document.querySelector('.calculate');
    const allButtons = [
      clearButton,
      enterButton,
      decimalButton,
      ...numberButtons,
      ...operatorButtons,
    ];

    afterEach(function () {
      clearButton.dispatchEvent(clickEvent);
    });

    describe('test number button.', function () {
      numbers.forEach(function (number) {
        it(`pressing number button should show the number.`, function (done) {
          const button = getButtonBy(number, numberButtons);
          const display = window.document.querySelector(
            '.calculator__display--for-advanced'
          );
          display.textContent = '0';
          button.dispatchEvent(clickEvent);

          expect(display.textContent).to.equal(number);
          done();
        });
      });
    });

    describe('test Ac button.', function () {
      it(`AC button should reset.`, function (done) {
        const display = window.document.querySelector(
          '.calculator__display--for-advanced'
        );
        display.textContent = 'Something strange';
        const clearButton = window.document.querySelector('.clear');
        clearButton.dispatchEvent(clickEvent);

        expect(display.textContent).to.equal('0');
        done();
      });
    });

    describe('test basic fuction of calculator.', function () {
      const bareRequirementTests = [
        ['1', '1', '+', '1', 'Enter', '12'],
        ['1', '1', '-', '1', 'Enter', '10'],
        ['1', '5', '*', '4', 'Enter', '60'],
        ['9', '0', '/', '3', 'Enter', '30'],
        ['0', '+', '0', 'Enter', '0'],
      ];

      bareRequirementTests.forEach(function (test) {
        const clicks = test.slice(0, -1);
        const expected = test.slice(-1)[0];
        it(`press ${clicks} should show  ${expected} on screen.`, function (done) {
          const display = window.document.querySelector(
            '.calculator__display--for-advanced'
          );
          clicks.forEach(function (click) {
            const button = getButtonBy(click, allButtons);
            button.dispatchEvent(clickEvent);
          });
          expect(display.textContent).to.equal(expected);
          done();
        });
      });
    });
  });
}

function nightmare(window, expect) {
  describe('inspect calculate fuction.', function () {
    describe('test decimal operation.', function () {
      const calculateFuncTest = function (testValue) {
        const { firstNum, operator, displayedNum, result } = testValue;

        it(`sum of ${firstNum} and  ${displayedNum} should be ${result}.`, function (done) {
          const stringInputResult = window.calculate(
            firstNum,
            operator,
            displayedNum
          );
          const numberInputResult = window.calculate(
            Number(firstNum),
            operator,
            Number(displayedNum)
          );
          const isPassed =
            Boolean(stringInputResult === result) ||
            Boolean(numberInputResult === result);
          expect(isPassed).to.be.true;
          done();
        });
      };

      describe('test addition operation', function () {
        const testArr = [
          {
            firstNum: '0.2341324',
            operator: '+',
            displayedNum: '0.91723',
            result: '1.1513624',
          },
          {
            firstNum: '0.1',
            operator: '+',
            displayedNum: '0.2',
            result: '0.30000000000000004',
          },
        ];

        testArr.forEach(calculateFuncTest);
      });

      describe('test subtraction operation', function () {
        const testArr = [
          {
            firstNum: '3.3',
            operator: '-',
            displayedNum: '3',
            result: '0.2999999999999998',
          },
          {
            firstNum: '120984.1',
            operator: '-',
            displayedNum: '0.12',
            result: '120983.98000000001',
          },
        ];
        testArr.forEach(calculateFuncTest);
      });

      describe('test multiplication operation', function () {
        const testArr = [
          {
            firstNum: '0.124',
            operator: '*',
            displayedNum: '12.1231',
            result: '1.5032644000000002',
          },
          {
            firstNum: '12.13',
            operator: '*',
            displayedNum: '123.42',
            result: '1497.0846000000001',
          },
        ];
        testArr.forEach(calculateFuncTest);
      });

      describe('test division operation', function () {
        const testArr = [
          {
            firstNum: '1.5032644000000002',
            operator: '/',
            displayedNum: '0.124',
            result: '12.1231',
          },
          {
            firstNum: '1497.0846000000001',
            operator: '/',
            displayedNum: '12.13',
            result: '123.42',
          },
        ];
        testArr.forEach(calculateFuncTest);
      });
    });
  });

  describe('test calculator operation.', function () {
    const getButtonBy = function (text, buttons) {
      const result = buttons.filter(function (button) {
        return button.textContent === text;
      });

      if (result.length > 1) {
        throw new Error('no extra buttons allowed');
      } else if (result.length < 1) {
        throw new Error('no button');
      }

      return result[0];
    };

    const clickEvent = new window.MouseEvent('click', {
      bubbles: true,
      cancelable: true,
      view: window,
    });

    // const numbers = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0'];
    const numberButtons = [...window.document.querySelectorAll('.number')];
    // const operators = ['+', '-', '*', '/'];
    const operatorButtons = [...window.document.querySelectorAll('.operator')];
    const decimalButton = window.document.querySelector('.decimal');
    const clearButton = window.document.querySelector('.clear');
    const enterButton = window.document.querySelector('.calculate');
    const allButtons = [
      clearButton,
      enterButton,
      decimalButton,
      ...numberButtons,
      ...operatorButtons,
    ];

    afterEach(function () {
      clearButton.dispatchEvent(clickEvent);
    });

    describe('edge case operation test.', function () {
      const consecutiveEnterTests = [
        ['3', '*', '3', 'Enter', 'Enter', 'Enter', 'Enter', '243'],
        ['3', '-', '3', 'Enter', 'Enter', 'Enter', 'Enter', '-9'],
        ['3', '+', '3', 'Enter', 'Enter', 'Enter', 'Enter', '15'],
        [
          '3',
          '/',
          '3',
          'Enter',
          'Enter',
          'Enter',
          'Enter',
          '0.037037037037037035',
        ],
        ['3', 'Enter', 'Enter', 'Enter', '*', '3', 'Enter', '9'],
        ['3', 'Enter', 'Enter', 'Enter', '-', '3', 'Enter', '0'],
        ['3', 'Enter', 'Enter', 'Enter', '+', '3', 'Enter', '6'],
        ['3', 'Enter', 'Enter', 'Enter', '/', '3', 'Enter', '1'],
      ];

      const consecutiveOperatorTests = [
        ['3', '*', '*', '*', '*', '3', 'Enter', '9'],
        ['3', '-', '-', '-', '-', '3', 'Enter', '0'],
        ['3', '+', '+', '+', '+', '3', 'Enter', '6'],
        ['3', '/', '/', '/', '/', '3', 'Enter', '1'],
        ['3', '+', '-', '*', '/', '3', 'Enter', '1'],
        ['3', '/', '+', '-', '*', '3', 'Enter', '9'],
        ['3', '/', '/', '+', '-', '3', 'Enter', '0'],
        ['3', '*', '/', '-', '+', '3', 'Enter', '6'],
        ['3', '*', '3', 'Enter', '*', '*', '*', '9'],
        ['3', '-', '3', 'Enter', '-', '-', '-', '0'],
      ];

      const noSecondOperandTests = [
        ['3', '*', 'Enter', '9'],
        ['3', '-', 'Enter', '0'],
        ['7', '4', '2', '+', 'Enter', '1484'],
        ['8', '9', '1', '2', '/', 'Enter', '1'],
      ];

      const consecutiveDecimalTests = [
        ['3', '.', '.', '.', '.', '.', '2', '+', '3', 'Enter', '6.2'],
        [
          '3',
          '.',
          '.',
          '.',
          '.',
          '.',
          '2',
          '-',
          '2',
          'Enter',
          '1.2000000000000002',
        ],
        [
          '3',
          '.',
          '2',
          '1',
          '2',
          '4',
          '+',
          '2',
          '.',
          '1',
          '1',
          '2',
          '3',
          'Enter',
          '5.3247',
        ],
        [
          '6',
          '2',
          '3',
          '.',
          '1',
          '2',
          '9',
          '3',
          '8',
          '/',
          '1',
          '2',
          '4',
          'Enter',
          '5.02523693548387',
        ],
        [
          '1',
          '2',
          '.',
          '.',
          '.',
          '1',
          '2',
          '3',
          '8',
          '*',
          '2',
          '3',
          'Enter',
          '278.8474',
        ],
      ];

      const operatorDecimalTests = [
        ['5', '1', '-', '.', '1', '2', 'Enter', '50.88'],
        ['1', '0', '0', '/', '.', '5', 'Enter', '200'],
        ['1', '0', '0', '+', '.', '.', '5', 'Enter', '100.5'],
        ['1', '0', '0', '*', '.', '.', '5', 'Enter', '50'],
      ];

      // eslint-disable-next-line prettier/prettier
      const complicateConsecutiveCalculationTests = [
        [
          '1',
          '0',
          '0',
          '.',
          '.',
          '1',
          '2',
          '5',
          '2',
          '+',
          '1',
          '2',
          '+',
          '1',
          '5',
          '-',
          '-',
          '2',
          '3',
          '-',
          '1',
          '4',
          '4',
          '2',
          '/',
          '2',
          '3',
          '/',
          '/',
          '1',
          '2',
          '*',
          '2',
          '3',
          'Enter',
          '-111.48956666666668',
        ],
      ];

      const advancedTests = [
        ...consecutiveEnterTests,
        ...consecutiveOperatorTests,
        ...noSecondOperandTests,
        ...operatorDecimalTests,
        ...consecutiveDecimalTests,
        ...complicateConsecutiveCalculationTests,
      ];

      advancedTests.forEach(function (test) {
        const clicks = test.slice(0, -1);
        const displayedResult = test.slice(-1)[0];
        it(`input ${clicks} continously ${displayedResult} should appear`, function (done) {
          const display = window.document.querySelector(
            '.calculator__display--for-advanced'
          );
          clicks.forEach(function (click) {
            const button = getButtonBy(click, allButtons);
            button.dispatchEvent(clickEvent);
          });
          expect(display.textContent).to.equal(displayedResult);
          done();
        });
      });
    });
  });
}
