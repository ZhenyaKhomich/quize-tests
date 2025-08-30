(function () {
    const Result = {
        watchRightAnswers: null,
        init() {
            const that = this;
            const url = new URL(location.href);
            document.getElementById('result-score').innerHTML = url.searchParams.get('score') + '/' + url.searchParams.get('total');
            this.watchRightAnswers = document.getElementById('watchRightAnswers').onclick =  this.watchAnswers.bind(this);
        },
        watchAnswers() {
            console.log(location.search)
            location.href = '../pages/answers.html' + location.search;
        }
    }
    Result.init();
})()