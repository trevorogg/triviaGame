$(document).ready(function () {

    // Variables for start screen and question HTML
    var startQuiz;
    var HTML;

    // Arrays for questions, answers, and correct answers
    var questions = ["How many Google searches are there each day?",
        "At it's peak, AOL signed up a new user every:",
        "Every second, twitter users type out: ",
        "The most popular web browser is: ",
        "The country with the fastest internet speeds is: ",
        "In what year did the Facebook overtake Myspace as the most popular social network?",
        "How many songs are streamed on Spotify every day?"];

    var answers = [['1.8 billion', '3.5 billion', '500 million', '6 billion'],
    ['0.5 seconds', '6 seconds', '30 seconds', 'Two minutes'],
    ['250 tweets', '5000 tweets', '1000 tweets', '6000 tweets'],
    ['Google Chrome', 'Firefox', 'Internet Explorer', 'Safari'],
    ['France', 'United States', 'Brazil', 'South Korea'],
    ['2003', '2008', '2011', '2015'],
    ['25 million', '250 million', '1 billion', '10 billion']];
    
    var correctAnswers = ['B. 3.5 billion', 'B. 6 seconds', 'D. 6000 tweets', 'A. Google Chrome', 'D. South Korea', 'B. 2008', 'C. 1 billion'];

    var answerInfo = ['There are 3.5 billion Google searches every day, with an average of 40,000 every second!',
    'During the peak of AOL, a new user signed up every six seconds. The company distributed over 1 billion trial CDs across the world.',
    'There have been an estimated 146 billion tweets created since Twitter was founded on March 21st, 2006.',
    'Google chrome overtook Internet Explorer as the most popular web browser in Early 2012. Currently an estimated 57% of internet users choose Google chrome.',
    'South Koreans enjoy the fastest internet speeds in the world, with an average connection speed of 28.6 Mb/s',
    'The number of Facebook users surpassed Myspace users in 2008, there are now over 2.2 active Facebook accounts worldwide',
    'Spotify users stream 1 billion songs every day, Spotify delivers over half of the worlds streaming music at any given time.'];

    var images = ['google.jpg'];

    // Variable to track which question 
    var numQuestion = 0;

    // Timer variable
    var secondsLeft = 30;
    var gameClock;

    // Initialize variables for number correct, incorrect, and skipped. Set all to zero.
    var numCorrect = 0;
    var numIncorrect = 0;
    var numSkipped = 0;

    // variable for user answer
    var userAns;


    function startScreen() {
        startQuiz = "<p class='text-center'> <a class='btn btn-primary btn-lg startButton'> Start Quiz </a></p>";
        $('.mainArea').html(startQuiz);
    }

    // Function that generates the question and answers pulling from arrays using numQuestion
    function generateHTML() {
        HTML = "<p class='timer-p'><span class='timer'>30</span></p><p>" + questions[numQuestion] + "</p><p class='answer rounded'>A. " + answers[numQuestion][0] + "</p><p class='answer rounded'>B. " + answers[numQuestion][1] + "</p><p class='answer rounded'>C. " + answers[numQuestion][2] + "</p><p class='answer rounded'>D. " + answers[numQuestion][3] + "</p>";
        $('.mainArea').html(HTML);
    }

    function runTimer() {
        gameClock = setInterval(thirtySeconds, 1000);
        function thirtySeconds() {
            if (secondsLeft == 0) {
                clearInterval(gameClock);
                noAns();
            }
            else if (secondsLeft > 0) {
                secondsLeft--;
            }
            $('.timer').html(secondsLeft);
        }
    }

    function wait() {
        if (numQuestion < 6) {
            numQuestion++;
            generateHTML();
            secondsLeft = 30;
            runTimer();
        }

        else {
            endGame();
        }
    }

    function correctAns() {
        HTML = '<p>Correct!</p>' + '<p>' + answerInfo[numQuestion] + '</p>';
        $('.mainArea').html(HTML);
        setTimeout(wait, 4000);
        numCorrect++;
    }

    function incorrectAns() {
        HTML = '<p>Incorrect!</p>' + '<p>The correct answer was: ' + correctAnswers[numQuestion];
        $('.mainArea').html(HTML);
        setTimeout(wait, 4000);
        numIncorrect++;
    }

    function noAns() {
        HTML = "<p> Time's up!</p><p>Correct answer was: " + correctAnswers[numQuestion] + "</p>";
        $('.mainArea').html(HTML);
        setTimeout(wait, 4000);
        numSkipped++;
    }

    function endGame() {
        HTML = '<p>Number correct: ' + numCorrect + '</p>' + '<p>Number incorrect: ' + numIncorrect + '</p>' + '<p>Number skipped: ' + numSkipped + '</p>' + "<p class='text-center'> <a class='btn btn-primary btn-lg newGame'> Try again? </a></p>";
        $('.mainArea').html(HTML);
    }

    function newGame() {
        numQuestion = 0;
        numCorrect = 0;
        numIncorrect = 0;
        numSkipped = 0;
        timer = 30;
        generateHTML();
        runTimer();
    }


    startScreen();

    // Start quiz event
    $('body').on('click', '.startButton', function (event) {
        event.preventDefault();
        generateHTML();
        runTimer();
    });

    // Answer selected event
    $('body').on('click', '.answer', function (event) {
        userAns = $(this).text();
        if (userAns == correctAnswers[numQuestion]) {
            clearInterval(gameClock);
            correctAns();
        }

        else {
            clearInterval(gameClock);
            incorrectAns();
        }

    });

    $('body').on('click', '.newGame', function (event) {
        newGame();
    });







});