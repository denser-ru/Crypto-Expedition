function checkAnswers() {
    // Эта функция будет искать переменные correctAnswers и explanations
    // которые должны быть определены на самой HTML-странице.
    if (typeof correctAnswers === 'undefined' || typeof explanations === 'undefined') {
        console.error("Данные для викторины (correctAnswers или explanations) не найдены!");
        return;
    }

    let score = 0;
    const totalQuestions = Object.keys(correctAnswers).length;
    const form = document.getElementById('quizForm');

    for (const question in correctAnswers) {
        const selectedOption = form.elements[question] ? form.elements[question].value : null;
        const feedbackEl = document.getElementById('feedback-' + question);
        
        if (!feedbackEl) continue;

        feedbackEl.style.display = 'block';

        if (selectedOption === correctAnswers[question]) {
            score++;
            feedbackEl.textContent = explanations[question];
            feedbackEl.className = 'feedback correct-feedback';
        } else {
            const defaultExplanation = explanations[question] || "Правильный ответ не указан.";
            feedbackEl.textContent = 'Неверно. ' + defaultExplanation;
            feedbackEl.className = 'feedback incorrect-feedback';
        }
    }

    const resultsEl = document.getElementById('results');
    resultsEl.style.display = 'block';
    resultsEl.textContent = `Ваш результат: ${score} из ${totalQuestions} правильных ответов.`;
}