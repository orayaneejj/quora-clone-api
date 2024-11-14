[![Contributors][contributors-shield]][contributors-url]
[![Forks][forks-shield]][forks-url]
[![Stargazers][stars-shield]][stars-url]
[![Issues][issues-shield]][issues-url]
[![MIT License][license-shield]][license-url]
[![LinkedIn][linkedin-shield]][linkedin-url]

<h3 align="center">Quora Clone API</h3>

  <p align="center">
API for a platform similar to Quora
  </p>
</div>

<!-- ABOUT THE PROJECT -->

## About The Project

This is an API for a platform similar to Quora, where users can ask questions, provide answers, and vote on both questions and answers. It allows for the management of questions and answers, as well as user interactions through voting.

### Built With

- ![Express](https://img.shields.io/badge/express-000000?style=for-the-badge&logo=express&logoColor=white)
- ![Node.js](https://img.shields.io/badge/node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)
- ![Swagger](https://img.shields.io/badge/swagger-85EA2D?style=for-the-badge&logo=swagger&logoColor=white)
- ![PostgreSQL](https://img.shields.io/badge/postgresql-336791?style=for-the-badge&logo=postgresql&logoColor=white)

<!-- GETTING STARTED -->

## Getting Started

Follow these steps to set up and run the project locally. This guide will help you clone the repository, install dependencies, and start the server.

### Installation

1. Clone the repository:
   ```sh
   git clone git@github.com:orayaneejj/quora-clone-api.git
   ```
2. Navigate into the project directory:
   ```sh
   cd repo_name
   ```
3. Initialize a new Node.js project (if not done already):
   ```sh
   npm init -y
   ```
4. Install dependencies:
   ```sh
   npm install
   npm install cors express nodemon pg
   ```
5. Start the server:
   ```sh
   npm run start
<!-- USAGE EXAMPLES -->

## Usage

This project provides a set of API endpoints for creating, retrieving, updating, and deleting questions and answers, similar to Quora. Below are some examples of how to use the API.
_For more examples, please refer to the [API Documentation](http://localhost:4000/api-docs)_

### Get all questions

To fetch all questions, use the following `GET` request:

#### Request:

`GET /questions`

#### Response:

```json
[
  {
    "id": 1,
    "title": "What is the meaning of life?",
    "description": "A philosophical question about purpose.",
    "category": "Philosophy"
  },
  {
    "id": 2,
    "title": "How does the internet work?",
    "description": "A technical question about the internet.",
    "category": "Technology"
  },
  ...
]
```

### Create a new question

To create a new question, use the following `POST` request:

#### Request:

`POST /questions`

#### Request Body:

```json
{
    "id": 1,
    "title": "What is the meaning of life?",
    "description": "A philosophical question about purpose.",
    "category": "Philosophy"
  },
```

#### Response:

```json
{
  "message": "Question created successfully"
}
```

### Vote on an answer

To vote on a specific answer (upvote or downvote), use the following POST request:

#### Request:

`POST /answers/{answerId}/vote`

#### Request Body:

```json
{
  "vote": -1
}
```

#### Response:

```json
{
  "message": "Vote on the answer has been recorded successfully."
}
```

<!-- Swagger Documentation -->

## Swagger Documentation:

`Swagger UI: http://localhost:4000/api-docs`

<!-- CONTRIBUTING -->

## Contributing

Contributions are what make the open source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

If you have a suggestion that would make this better, please fork the repo and create a pull request. You can also simply open an issue with the tag "enhancement".
Don't forget to give the project a star! Thanks again!

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

### Top contributors:

<a href="https://github.com/orayaneejj/quora-clone-api/graphs/contributors">
  <img src="https://contrib.rocks/image?repo=orayaneejj/quora-clone-api" alt="contributors image" />
</a>

<!-- LICENSE -->

## License

Distributed under the MIT License. See `LICENSE.txt` for more information.

<!-- CONTACT -->

## Contact

- Email: orayaneejj@gmail.com
- Linkedin: [https://www.linkedin.com/in/orayanee-janjaeng](https://www.linkedin.com/in/orayanee-janjaeng/)
- Project Link: [https://github.com/orayaneejj/quora-clone-api](https://github.com/orayaneejj/quora-clone-api)

<!-- ACKNOWLEDGMENTS -->

## Acknowledgments

- [Node.js](https://nodejs.org/en)
- [Express.js](https://expressjs.com/)
- [PostgreSQL](https://www.postgresql.org/)
- [Swagger](https://swagger.io/)

<!-- MARKDOWN LINKS & IMAGES -->

[contributors-shield]: https://img.shields.io/github/contributors/orayaneejj/quora-clone-api.svg?style=for-the-badge
[contributors-url]: https://github.com/orayaneejj/quora-clone-api/graphs/contributors
[forks-shield]: https://img.shields.io/github/forks/orayaneejj/quora-clone-api.svg?style=for-the-badge
[forks-url]: https://github.com//orayaneejj/quora-clone-api/network/members
[stars-shield]: https://img.shields.io/github/stars/orayaneejj/quora-clone-api.svg?style=for-the-badge
[stars-url]: https://github.com/github_orayaneejj/quora-clone-api/stargazers
[issues-shield]: https://img.shields.io/github/issues/orayaneejj/quora-clone-api.svg?style=for-the-badge
[issues-url]: https://github.com/orayaneejj/quora-clone-api/issues
[license-shield]: https://img.shields.io/github/license/orayaneejj/quora-clone-api.svg?style=for-the-badge
[license-url]: https://github.com/orayaneejj/quora-clone-api/blob/main/LICENSE.txt
[linkedin-shield]: https://img.shields.io/badge/-LinkedIn-black.svg?style=for-the-badge&logo=linkedin&colorB=555
[linkedin-url]: https://linkedin.com/in/orayanee-janjaeng
[product-screenshot]: images/screenshot.png
[Express]: https://img.shields.io/badge/express-000000?style=for-the-badge&logo=express&logoColor=white
[Node.js]: https://img.shields.io/badge/node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white
[Swagger]: https://img.shields.io/badge/swagger-85EA2D?style=for-the-badge&logo=swagger&logoColor=white
[PostgreSQL]: https://img.shields.io/badge/postgresql-336791?style=for-the-badge&logo=postgresql&logoColor=white
