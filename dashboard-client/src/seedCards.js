import calendar from './svg/calendar.svg';
import braking_bad from './svg/braking_bad.svg';
import people from './svg/people.png';
import randomUser from './svg/random_user.svg';
import job from './svg/job.svg';
import api from './svg/api.svg';
import joke from './svg/joke.svg';
import trivia from './svg/trivia.svg';

export default [
  {
    id: 'breakingbadapi',
    API: "Breaking Bad API",
    Description: "Retrieve information from all characters.",
    Endpoint: "https://breakingbadapi.com/api/characters",
    Category: "Films",
    Path: null,
    Img: braking_bad
  },
  {
    id: 'randomusergenerator',
    API: "Random User Generator",
    Description: "API for generating random user data.",
    Endpoint: "https://randomuser.me/api/",
    Category: "People",
    Path: 'results',
    Img: randomUser
  },
  {
    id: 'nagerdate',
    API: "Nager.Date",
    Description: "Public holidays for Russia in 2019",
    Endpoint: "/nagerdate",
    Category: "Calendar",
    Path: null,
    Img: calendar
  },
  {
    id: 'trivia',
    API: "Trivia",
    Description: "Free to use, user-contributed trivia question database.",
    Endpoint: "/trivia",
    Category: "Quizzes",
    Path: 'results',
    Img: trivia
  },
  {
    id: 'reqres',
    API: "ReqRes",
    Description: 'API for generating multiple random users with basic data.',
    Endpoint: "https://reqres.in/api/users?page=2",
    Category: "People",
    Path: 'data',
    Img: people
  },
  {
    id: 'publicapis',
    API: "Public APIs",
    Description: "A collective list of free APIs for use in software and web development.",
    Endpoint: "/publicapis",
    Category: "API",
    Path: 'entries',
    Img: api
  },
  {
    id: 'jokeapi',
    API: "JokeAPI",
    Description: "Programming Jokes",
    Endpoint: "https://sv443.net/jokeapi/category/Programming",
    Category: "Funny",
    Path: null,
    Img: joke
  },
  {
    id: 'githubjobs',
    API: "Github Jobs",
    Description: "Github jobs for JavaScript developers",
    Endpoint: "/githubjobs",
    Category: "Jobs",
    Img: job
  }
]