import calendar from "./svg/calendar.svg";
import braking_bad from "./svg/braking_bad.svg";
import people from "./svg/people.png";
import randomUser from "./svg/random_user.svg";
import anime from "./svg/anime.svg";
import api from "./svg/api.svg";
import joke from "./svg/joke.svg";
import trivia from "./svg/trivia.svg";

export default [
  {
    id: "breakingbadapi",
    API: "Breaking Bad API",
    Description: "A free API to retrieve some quotes of Breaking Bad, bitch!",
    Endpoint: "/api/breakingbad",
    Category: "Films",
    Path: null,
    Img: braking_bad,
  },
  {
    id: "randomusergenerator",
    API: "Random User Generator",
    Description: "API for generating random user data.",
    Endpoint: "https://randomuser.me/api/?results=10",
    Category: "People",
    Path: 'results',
    Img: randomUser,
  },
  {
    id: "nagerdate",
    API: "Nager.Date",
    Description: "Public holidays for Russia in 2019",
    Endpoint: "/api/nagerdate",
    Category: "Calendar",
    Path: null,
    Img: calendar,
  },
  {
    id: "trivia",
    API: "Trivia",
    Description: "Free to use, user-contributed trivia question database.",
    Endpoint: "/api/trivia",
    Category: "Quizzes",
    Path: "results",
    Img: trivia,
  },
  {
    id: "reqres",
    API: "ReqRes",
    Description: "API for generating multiple random users with basic data.",
    Endpoint: "https://reqres.in/api/users?page=1",
    Category: "People",
    Path: "data",
    Img: people,
  },
  {
    id: "publicapis",
    API: "Public APIs",
    Description:
      "A collective list of free APIs for use in software and web development.",
    Endpoint: "/api/publicapis",
    Category: "API",
    Path: "entries",
    Img: api,
  },
  {
    id: "jokeapi",
    API: "JokeAPI",
    Description: "Programming Jokes",
    Endpoint: "https://v2.jokeapi.dev/joke/Programming",
    Category: "Funny",
    Path: null,
    Img: joke,
  },
  {
    id: "anime",
    API: "Jikan API",
    Description:
      "Jikan (時間) is an open-source API for the “most active online anime + manga community” — MyAnimeList.net",
    Endpoint: "/api/jikanapi",
    Category: "Anime",
    Path: "data",
    Img: anime,
  },
];
