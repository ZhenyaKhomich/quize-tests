(function () {
    const Answers = {
        backMyResults: null,
        name: null,
        lastName: null,
        email: null,
        id: null,
        authorInfoElement: null,
        testName: null,
        test: null,
        optionsElement: null,
        answersAuthor: null,
        rightAnswers: null,
        init() {
            const url = new URL(location.href);
            this.name = url.searchParams.get("name");
            this.lastName = url.searchParams.get("lastName");
            this.email = url.searchParams.get("email");
            this.id = url.searchParams.get("id");
            this.backMyResults = document.getElementById('back-my-results');
            this.backMyResults.onclick = this.backResult.bind(this);
            this.authorInfoElement = document.getElementById('answers-author');
            this.testName = document.getElementById('test-name');
            this.optionsElement = document.getElementById('options');
            this.answersAuthor = sessionStorage.getItem('answers');
            this.answersAuthor = JSON.parse(this.answersAuthor).map(el => el.chosenAnswerId);

            this.showRightQuestions();

            const xhr = new XMLHttpRequest();
            xhr.open('GET', 'https://testologia.ru/get-quiz?id=' + this.id, false);
            xhr.send();

            if (xhr.status === 200 && xhr.responseText) {
                try {
                    this.test = JSON.parse(xhr.responseText);
                } catch (e) {
                    location.href = '../../index.html';
                }
                this.showQuestions();
            } else {
                location.href = '../../index.html';
            }

            this.showAuthorInfo();
        },
        showAuthorInfo() {
            this.authorInfoElement.innerHTML = `Тест выполнил  <span>${this.name} ${this.lastName}, ${this.email}</span>`;
        },
        showQuestions() {
            this.testName.innerHTML = this.test.name;

            for (let i = 0; i < this.test.questions.length; i++) {
                const variantsElements = this.test.questions;
                const answers = variantsElements[i].answers;

                const itemElement = document.createElement('div');
                itemElement.classList.add('answers-option');

                const itemNumberElement = document.createElement('div');
                itemNumberElement.classList.add('answers-number');
                itemNumberElement.innerHTML = `<span>Вопрос ` + `${i + 1}: </span> ${variantsElements[i].question}`;

                itemElement.appendChild(itemNumberElement);

                const itemVariants = document.createElement('div');
                itemVariants.classList.add('answers-variants');

                for (let t = 0; t < answers.length; t++) {
                    const asnswerId = answers[t].id;

                    const itemVariant = document.createElement('div');
                    itemVariant.classList.add('answers-variant');

                    if (this.answersAuthor.includes(asnswerId)) {
                        if(this.rightAnswers.includes(asnswerId)) {
                            itemVariant.classList.add('right');
                        } else {
                            itemVariant.classList.add('wrong');
                        }
                    }

                    const itemVariantCyrcle = document.createElement('div');
                    itemVariantCyrcle.classList.add('answers-circle');

                    const itemVariantText = document.createElement('div');
                    itemVariantText.classList.add('answer-variant-text');
                    itemVariantText.innerText = answers[t].answer;

                    itemVariant.appendChild(itemVariantCyrcle);
                    itemVariant.appendChild(itemVariantText);

                    itemVariants.appendChild(itemVariant);
                }

                itemElement.appendChild(itemVariants);
                itemElement.appendChild(itemVariants);

                this.optionsElement.appendChild(itemElement);

            }
        },
        showRightQuestions() {
            const xhr = new XMLHttpRequest();
            xhr.open('GET', 'https://testologia.ru/get-quiz-right?id=' + this.id, false);
            xhr.send();

            if (xhr.status === 200 && xhr.responseText) {
                this.rightAnswers = JSON.parse(xhr.responseText);
            }
        },
        backResult() {
            location.href = '../pages/result.html' + location.search;
        }
    }
    Answers.init();
})()