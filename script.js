const elForm = document.querySelector("#form-post");
const elCards = document.querySelector(".cards");
const elSelect = document.querySelector("#types-select");
const elSearch = document.querySelector("#search");
const searchId = document.querySelector("#searchid");
let filteredPosts = [];
let searchMovies = [];

let posts = [
  {
    id: 1,
    title: "Cristiano Ronaldo",
    description:
      "“I’m so proud to make this big decision in my life, in football. As you mentioned before, in Europe my work, it’s done. I won everything,” the five-time Ballon d’Or winner said. “I played the most important clubs in Europe and for me now, it’s a new challenge.”",
    image: "./images/al-nasr.jpg",
    date: new Date(),
    genres: ["sport", "uzbekiston"],
  },
  {
    id: 2,
    title: "Suiiii",
    description:
      "“I had many opportunities in Europe, many clubs, in Brazil, in Australia, US, even in Portugal. Many clubs tried to sign me but I give the word to this club for the opportunity,” he said.",
    image: "https://picsum.photos/200/300",
    date: new Date(),
    genres: ["Sport"],
  },
  {
    id: 3,
    title: "HalaRonaldo",
    description:
      "Cristiano Ronaldo ‘proud’ of move to Al Nassr and says his work in Europe is ‘done’",
    image: "https://picsum.photos/200/300",
    date: new Date(),
    genres: ["uzbekiston"],
  },
  {
    id: 4,
    title: "Cristiano",
    description: 
    `Portuguese superstar Cristiano Ronaldo was officially unveiled by his new Saudi Arabian club Al Nassr on Tuesday in Riyadh, explaining he made the move having “won everything” in Europe..`,
    image: "https://picsum.photos/200/300",
    date: new Date(),
    genres: ["sport", "siyosat"],
  },
  {
    id: 5,
    title: "Ronaldo",
    description:
      "Ronaldo will earn an estimated $200 million a year with Al Nassr, according to Saudi state-owned media.",
    image: "https://picsum.photos/200/300",
    date: new Date(),
    genres: ["sport", "uzbekiston"],
  },
];

elSelect.addEventListener("change", () => {
  const type = elSelect.value;

  filteredPosts = [];

  if (type === "all") {
    renderPosts(posts);
  } else {
    posts.forEach((post) => {
      post.genres.forEach((genre) => {
        if (genre.toLowerCase() === type.toLowerCase()) {
          filteredPosts.push(post);
        }
      });
    });

    renderPosts(filteredPosts);
  }
});

function generateDate(date) {
  const year = date.getFullYear();
  const month =
    date.getMonth() + 1 < 10
      ? "0" + (date.getMonth() + 1)
      : date.getMonth() + 1;

  const day = date.getDate() < 10 ? "0" + date.getDate() : date.getDate();

  const hours = date.getHours() < 10 ? "0" + date.getHours() : date.getHours();

  const minutes =
    date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes();

  return `📅 ${hours}:${minutes} / ${day}.${month}.${year}`;
}

elCards.addEventListener("click", (evt) => {
  const target = evt.target;

  let newPosts = [];
  if (target.className.includes("delete-btn")) {
    const id = Number(target.dataset.id);

    posts.forEach((post) => {
      if (post.id !== id) {
        newPosts.push(post);
      }
    });
    posts = newPosts;
    renderPosts(posts);
  }
});

const renderPosts = (array, element = elCards) => {
  element.innerHTML = "";

  array.forEach((post) => {
    const newCard = document.createElement("div");

    const resultDate = generateDate(post.date);

    const newUl = document.createElement("ul");

    post.genres.forEach((element) => {
      const newLi = document.createElement("li");
      newLi.className = "list-group-item";
      newLi.textContent = element;
      newUl.appendChild(newLi);
    });

    newCard.className = "card col-12 col-sm-5 col-md-3";
    newCard.innerHTML = `
                    <img
						class="card-img-top mt-2"
						src="./images/suii.webp" alt="" srcset="./images/suii.webp 1x, ./images/suii.webp" width="210" height="165"
						// alt="${post.title}"
					/>
					<div class="card-body">
						<h3 class="card-title">
							${post.title}
						</h3>
						<p class="card-text">
							${post.description}
						</p>
                        ${newUl.outerHTML}
						<p class="card-date">${resultDate}</p>
						<div class="d-flex justify-content-between">
							<button data-id="${post.id}" class="btn btn-danger delete-btn"> Delete </button>
							<button data-id="${post.id}" class="btn btn-info"> Edit </button>
						</div>
					</div>
    `;

    element.appendChild(newCard);
  });
};

renderPosts(posts);

elForm.addEventListener("submit", (evt) => {
  evt.preventDefault();

  const title = evt.target.title.value;
  const description = evt.target.description.value;
  const image = evt.target.image.value;
  const genresElement = evt.target.genres;

  const genres = [];

  for (let i = 0; i < genresElement.length; i++) {
    const element = genresElement[i];

    if (element.checked) {
      genres.push(element.value);
    }
  }

  const newPost = {
    id: posts.length > 0 ? posts[posts.length - 1].id + 1 : 1,
    title: title,
    description: description,
    image: image,
    date: new Date(),
    genres: genres,
  };

  posts.push(newPost);

  renderPosts(posts);

  elForm.reset();
});


// search
searchId.addEventListener("input", (evt) => {
 searchMovies = [];
 evt.preventDefault();
 let elSearchVAl = elSearch.value
 posts.forEach((evt) => {
    if (evt.title.toLowerCase().includes(elSearchVAl.toLowerCase())) {
      searchMovies.push(evt);
    }
  });
  renderPosts(searchMovies);
});