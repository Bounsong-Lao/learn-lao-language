document.addEventListener('DOMContentLoaded', () => {
    const quizQuestionElem = document.getElementById('quiz-question');
    const quizOptionsElem = document.getElementById('quiz-options');
    const quizFeedbackElem = document.getElementById('quiz-feedback');
    const startQuizBtn = document.getElementById('start-quiz-btn');
    const nextQuestionBtn = document.getElementById('next-question-btn');

    let currentQuestionIndex = 0;
    let quizActive = false;

    // Quiz questions for Lao consonants/words
    const quizQuestions = [
        { letter: "ກ", correct: "ໄກ່", options: ["ໄກ່", "ປາ", "ງູ", "ໝາ"] },
        { letter: "ຂ", correct: "ໄຂ່", options: ["ໄຂ່", "ຄວາຍ", "ຄົນ", "ຈອກ"] },
        { letter: "ຄ", correct: "ຄົນ", options: ["ຄົນ", "ເງິນ", "ເຈົ້າ", "ຊ້າງ"] },
        { letter: "ງ", correct: "ງູ", options: ["ງູ", "ຍຸງ", "ດອກ", "ຕາ"] },
        { letter: "ຈ", correct: "ຈອກ", options: ["ຈອກ", "ສໍ", "ຊິມ", "ຍິ້ມ"] },
        // ເພີ່ມຄຳຖາມສຳລັບຕົວອັກສອນອື່ນໆທີ່ນີ້...
        // ຕົວຢ່າງ:
        // { letter: "ດ", correct: "ດອກ", options: ["ດອກ", "ຕີນ", "ຖົງ", "ທຸງ"] },
        // { letter: "ລ", correct: "ລົດ", options: ["ລົດ", "ເຮືອນ", "ໂຮງຮຽນ", "ໂຕະ"] },
        // ...
    ];

    function shuffleArray(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
    }

    function initializeQuiz() {
        currentQuestionIndex = 0;
        shuffleArray(quizQuestions); // Shuffle questions each time
        quizFeedbackElem.textContent = '';
        quizFeedbackElem.className = '';
        startQuizBtn.style.display = 'block';
        nextQuestionBtn.style.display = 'none';
        quizQuestionElem.textContent = 'ກົດປຸ່ມ "ເລີ່ມແບບຝຶກຫັດ" ເພື່ອເລີ່ມຕົ້ນ!';
        quizOptionsElem.innerHTML = ''; // Clear options
        quizActive = false;
    }

    function displayQuestion() {
        if (currentQuestionIndex < quizQuestions.length) {
            const questionData = quizQuestions[currentQuestionIndex];
            quizQuestionElem.textContent = `ຄຳສັບໃດປະກອບມີພະຍັນຊະນະ: "${questionData.letter}"?`; // Changed question text
            quizFeedbackElem.textContent = '';
            quizFeedbackElem.className = '';
            
            quizOptionsElem.innerHTML = ''; // Clear old options
            shuffleArray(questionData.options); // Shuffle options for the current question
            questionData.options.forEach(option => {
                const button = document.createElement('button');
                button.textContent = option;
                button.dataset.value = option;
                button.addEventListener('click', handleAnswer);
                quizOptionsElem.appendChild(button);
            });

            quizActive = true;
        } else {
            quizQuestionElem.textContent = 'ຈົບແບບຝຶກຫັດແລ້ວ! ຍິນດີດ້ວຍ!';
            quizOptionsElem.style.display = 'none';
            nextQuestionBtn.style.display = 'none';
            startQuizBtn.textContent = 'ເລີ່ມແບບຝຶກຫັດໃໝ່';
            startQuizBtn.style.display = 'block';
            quizActive = false;
        }
    }

    function handleAnswer(event) {
        if (!quizActive) return;

        const selectedOption = event.target.dataset.value;
        const correctOption = quizQuestions[currentQuestionIndex].correct;

        disableOptions(true); // Disable options after selection
        quizActive = false;

        if (selectedOption === correctOption) {
            quizFeedbackElem.textContent = 'ຖືກຕ້ອງ!';
            quizFeedbackElem.classList.add('correct');
        } else {
            quizFeedbackElem.textContent = `ຜິດ! ຄໍາຕອບທີ່ຖືກຕ້ອງແມ່ນ: "${correctOption}".`;
            quizFeedbackElem.classList.add('incorrect');
        }

        if (currentQuestionIndex < quizQuestions.length - 1) {
            nextQuestionBtn.style.display = 'block';
        } else {
            startQuizBtn.textContent = 'ເລີ່ມແບບຝຶກຫັດໃໝ່';
            startQuizBtn.style.display = 'block';
            nextQuestionBtn.style.display = 'none';
        }
    }

    function disableOptions(disabled) {
        Array.from(quizOptionsElem.children).forEach(button => {
            if (disabled) {
                button.classList.add('disabled');
                button.removeEventListener('click', handleAnswer);
            } else {
                button.classList.remove('disabled');
                button.addEventListener('click', handleAnswer); // Re-add listener if enabling
            }
        });
    }

    // Event Listeners
    startQuizBtn.addEventListener('click', () => {
        currentQuestionIndex = 0;
        quizOptionsElem.style.display = 'flex'; // Ensure options are visible
        startQuizBtn.style.display = 'none';
        shuffleArray(quizQuestions); // Shuffle questions for a fresh quiz
        displayQuestion();
    });

    nextQuestionBtn.addEventListener('click', () => {
        currentQuestionIndex++;
        nextQuestionBtn.style.display = 'none';
        displayQuestion();
    });

    initializeQuiz();
});
