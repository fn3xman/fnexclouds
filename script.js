document.addEventListener("DOMContentLoaded", function() {
    const elements = {
        startBtn: document.querySelector('.start-btn'),
        popupInfo: document.querySelector('.popup-info'),
        exitBtn: document.querySelector('.exit-btn'),
        main: document.querySelector('.main'),
        quiz: document.querySelector('.quiz'),
        continueBtn: document.querySelector('.continue-btn'),
        quizSection: document.querySelector('.quiz-section'),
        quizBox: document.querySelector('.quiz-box'),
        resultBox: document.querySelector('.result-box'),
        tryAgainBtn: document.querySelector('.tryAgain-btn'),
        goHomeBtn: document.querySelector('.goHome-btn'),
        form: document.querySelector("form"),
        fullName: document.getElementById("name"),
        email: document.getElementById("email"),
        phone: document.getElementById("phone"),
        subject: document.getElementById("subject"),
        msg: document.getElementById("message"),
        nextBtn: document.querySelector('.next-btn'),
        optionList: document.querySelector('.option-list')
    };

    elements.startBtn.onclick = () => {
        elements.popupInfo.classList.add('active');
        elements.main.classList.add('active');
    };

    elements.quiz.onclick = () => {
        elements.popupInfo.classList.add('active');
        elements.main.classList.add('active');
    };

    elements.exitBtn.onclick = () => {
        elements.popupInfo.classList.remove('active');
        elements.main.classList.remove('active');
    };

    elements.continueBtn.onclick = () => {
        elements.quizSection.classList.add('active');
        elements.popupInfo.classList.remove('active');
        elements.main.classList.remove('active');
        elements.quizBox.classList.add('active');

        showQuestion(0);
        questionCounter(1);
        headerScore();
    };

    elements.tryAgainBtn.onclick = () => {
        elements.quizBox.classList.add('active');
        elements.nextBtn.classList.remove('active');
        elements.resultBox.classList.remove('active');

        questionCount = 0;
        questionNumb = 1;
        userScore = 0;
        showQuestion(questionCount);
        questionCounter(questionNumb);

        headerScore();
    };

    elements.goHomeBtn.onclick = () => {
        elements.quizSection.classList.remove('active');
        elements.nextBtn.classList.remove('active');
        elements.resultBox.classList.remove('active');

        questionCount = 0;
        questionNumb = 1;
        userScore = 0;
        showQuestion(questionCount);
        questionCounter(questionNumb);
    };

    let questionCount = 0;
    let questionNumb = 1;
    let userScore = 0;

    elements.nextBtn.onclick = () => {
        if (questionCount < questions.length - 1) {
            questionCount++;
            showQuestion(questionCount);

            questionNumb++;
            questionCounter(questionNumb);

            elements.nextBtn.classList.remove('active');
        } else {
            showResultBox();
        }
    };

    function showQuestion(index) {
        const questionText = document.querySelector('.question-text');
        questionText.textContent = `${questions[index].numb}. ${questions[index].question}`;

        let optionTag = `<div class="option"><span>${questions[index].options[0]}</span></div>
            <div class="option"><span>${questions[index].options[1]}</span></div>
            <div class="option"><span>${questions[index].options[2]}</span></div>
            <div class="option"><span>${questions[index].options[3]}</span></div>`;

        elements.optionList.innerHTML = optionTag;

        const option = document.querySelectorAll('.option');
        option.forEach((item) => {
            item.addEventListener('click', () => {
                optionSelected(item);
            });
        });
    }

    function optionSelected(answer) {
        let userAnswer = answer.textContent;
        let correctAnswer = questions[questionCount].answer;
        let allOptions = elements.optionList.children.length;

        if (userAnswer === correctAnswer) {
            answer.classList.add('correct');
            userScore += 1;
            headerScore();
        } else {
            answer.classList.add('incorrect');
            for (let i = 0; i < allOptions; i++) {
                if (elements.optionList.children[i].textContent === correctAnswer) {
                    elements.optionList.children[i].classList.add('correct');
                }
            }
        }

        for (let i = 0; i < allOptions; i++) {
            elements.optionList.children[i].classList.add('disabled');
        }

        elements.nextBtn.classList.add('active');
    }

    function questionCounter(index) {
        const questionTotal = document.querySelector('.question-total');
        questionTotal.textContent = `${index} of ${questions.length} Questions`;
    }

    function headerScore() {
        const headerScoreText = document.querySelector('.header-score');
        headerScoreText.textContent = `Score: ${userScore} / 10`;
    }

    function showResultBox() {
        elements.quizBox.classList.remove('active');
        elements.resultBox.classList.add('active');

        const scoreText = document.querySelector('.score-text');
        scoreText.textContent = `Your Score: ${userScore} / ${questions.length}`;

        const circularProgress = document.querySelector('.circular-progress');
        const progressValue = document.querySelector('.progress-value');
        let progressStartValue = -1;
        let progressEndValue = (userScore / questions.length) * 100;
        let speed = 20;

        let progress = setInterval(() => {
            progressStartValue++;

            progressValue.textContent = `${progressStartValue}%`;
            circularProgress.style.background = `conic-gradient(#c40094 ${progressStartValue * 3.6}deg, rgba(255, 255, 255, .1) 0deg)`;

            if (progressStartValue === progressEndValue) {
                clearInterval(progress);
            }
        }, speed);
    }
});
