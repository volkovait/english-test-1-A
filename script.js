(function () {
  'use strict';

  const ANSWERS = {
    grammar1: ['m', 'm', 'are', 'm', 'are', 'm', 'm', 'are'],
    grammar2: ['is', "isn't", 'is', 'is', 'is', "isn't", 'is'],
    grammar3: ['an', 'has', 'glasses', 'have', 'an'],
    readingTf: ['T', 'T', 'F', 'T', 'F'],
    readingMatch: ['C', 'A', 'D', 'E', 'B']
  };

  const MAX_SCORE = 30;

  const toastEl = document.getElementById('result-toast');
  const checkBtn = document.getElementById('check-btn');

  function showToast(message, type) {
    toastEl.textContent = message;
    toastEl.className = 'toast ' + (type || 'info');
    toastEl.classList.remove('hidden');
    setTimeout(function () {
      toastEl.classList.add('hidden');
    }, 5000);
  }

  function normalizeText(s) {
    return (s || '').trim().toLowerCase();
  }

  function clearFeedback() {
    document.querySelectorAll('.test-section input, .test-section select').forEach(function (el) {
      el.classList.remove('correct', 'incorrect');
    });
    document.querySelectorAll('.tf-list li').forEach(function (li) {
      li.classList.remove('correct', 'incorrect');
    });
  }

  function setFeedback(selector, correct) {
    const el = document.querySelector(selector);
    if (el) {
      el.classList.add(correct ? 'correct' : 'incorrect');
    }
  }

  function checkGrammar1() {
    let score = 0;
    for (let i = 0; i < 8; i++) {
      const select = document.querySelector('select[name="g1-' + (i + 1) + '"]');
      const value = select ? select.value : '';
      const correct = value === ANSWERS.grammar1[i];
      if (correct) score++;
      if (select) select.classList.add(correct ? 'correct' : 'incorrect');
    }
    return score;
  }

  function checkGrammar2() {
    let score = 0;
    for (let i = 0; i < 7; i++) {
      const input = document.querySelector('input[name="g2-' + (i + 1) + '"]');
      const value = normalizeText(input ? input.value : '');
      const expected = ANSWERS.grammar2[i].toLowerCase();
      const correct = value === expected;
      if (correct) score++;
      if (input) input.classList.add(correct ? 'correct' : 'incorrect');
    }
    return score;
  }

  function checkGrammar3() {
    let score = 0;
    for (let i = 0; i < 5; i++) {
      const input = document.querySelector('input[name="g3-' + (i + 1) + '"]');
      const value = normalizeText(input ? input.value : '');
      const expected = ANSWERS.grammar3[i].toLowerCase();
      const correct = value === expected;
      if (correct) score++;
      if (input) input.classList.add(correct ? 'correct' : 'incorrect');
    }
    return score;
  }

  function checkReadingTf() {
    let score = 0;
    for (let i = 0; i < 5; i++) {
      const name = 'tf-' + (i + 1);
      const checked = document.querySelector('input[name="' + name + '"]:checked');
      const value = checked ? checked.value : '';
      const correct = value === ANSWERS.readingTf[i];
      if (correct) score++;
      const li = document.querySelector('.tf-list li:nth-child(' + (i + 1) + ')');
      if (li) li.classList.add(correct ? 'correct' : 'incorrect');
    }
    return score;
  }

  function checkReadingMatch() {
    let score = 0;
    for (let i = 0; i < 5; i++) {
      const select = document.querySelector('select[name="match-' + (i + 1) + '"]');
      const value = select ? select.value : '';
      const correct = value === ANSWERS.readingMatch[i];
      if (correct) score++;
      if (select) select.classList.add(correct ? 'correct' : 'incorrect');
    }
    return score;
  }

  function checkAll() {
    clearFeedback();

    const s1 = checkGrammar1();
    const s2 = checkGrammar2();
    const s3 = checkGrammar3();
    const s4 = checkReadingTf();
    const s5 = checkReadingMatch();

    const total = s1 + s2 + s3 + s4 + s5;
    const pct = Math.round((total / MAX_SCORE) * 100);

    let msg = 'Результат: ' + total + ' из ' + MAX_SCORE + ' баллов (' + pct + '%). ';
    if (total === MAX_SCORE) {
      msg += 'Отлично!';
      showToast(msg, 'success');
    } else if (pct >= 70) {
      msg += 'Хороший результат.';
      showToast(msg, 'success');
    } else {
      msg += 'Проверьте подсвеченные ошибки.';
      showToast(msg, 'info');
    }
  }

  if (checkBtn) {
    checkBtn.addEventListener('click', checkAll);
  }
})();
