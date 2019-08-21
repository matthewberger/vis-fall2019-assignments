# Assignment 0

## Objectives

* Ensure you are able to access assignments for the course via GitHub.
* Very light introduction to web-based programming.
* Obtain basic understanding of the Document Object Model (DOM), and how this relates to what is rendered in the document.

## Description

The purpose of this assignment is to make sure you have access to the assignments GitHub repository for the course, to provide a very light introduction to developing visualizations for the web, and to fill out an informal survey.

The very first thing you need to do is [clone the repository](https://help.github.com/en/articles/cloning-a-repository). This will make it convenient for future assignments, as you only need pull the GitHub project each time a new assignment is available.

Now, the fact that you are reading this suggests that you are on GitHub and have access to assignments. Yay!

Next, we will walk through how we will develop visualization applications for the web.

* First, it is necessary to run a local server on your computer, so that you may safely access local files when developing. The simplest way to do this is using Python. Installing Python on your machine should be fairly standard, depending on your preferred OS, so I will not go over this.
* Next, let's run a local server. Fire up your application-of-choice for using Python, and go to the top-level directory of the assignments repository, it should be named **vis-fall2019-assignments**. If you renamed it when you cloned the repository, then you should use that name. If you are running python2.x, then issue: `python -m SimpleHTTPServer` in your application. If you are running python3.x, then issue: `python -m http.server`. You will now be running a local server on your machine.
* Fire up your **Google Chrome** browser. Note: _we will be using Chrome for all assignments in the course_. Now, go to the following url: [http://localhost:8000/assignment0](http://localhost:8000/assignment0). You should now see the survey that you will need to fill out. Hurrah!
* Open up `index.html` with your favorite text editor or IDE, and you will see a set of `question` and `answer` variables. Please fill in the `answer` variables with your responses. Remember to include the escape character should you choose to use any special characters.
* Refresh the webpage, and you will see your responses. Next, in the web browser, issue through the keyboard `Command`+`Shift`+**C**, or alternatively, right click in the document on some empty space, and click `Inspect`. You should see, on the right-hand side, a set of views that are intended for debugging web-based development. The tab that should be selected is **Elements**; if not, click on this tab. You will now see the **Document Object Model**, a representation of the HTML document. In particular, note the questions, and your answers! These are represented by **paragraph** elements (note the `<p`) in the DOM. Furthermore, hover over individual question/answer `<p>` elements in the DOM, and you will see that their locations, and spatial boundaries, are highlighted in the document. HTML is not so mysterious! For developing data visualizations, we will use certain DOM elements to create graphical representations of data. The `Inspect` view of the DOM will prove indispensable for helping you understand where your development is going right, and where it is going wrong.
* To prove that you actually did the above, please take a screenshot of your browser, showing the rendered document on the left, and the Elements view on the right, and save the image to the `assignment0` directory.
* Zip up the `assignment0` directory, and submit it to Brightspace.

## Grading Criteria

* Clone GitHub repository (30%)
* Provide answers for questionnaire (35%)
* Take screenshot of resulting webpage and the view of the DOM elements (35%)
