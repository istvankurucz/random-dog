// Fetching
const baseUrl = "https://dog.ceo/api";

async function fetchBreeds() {
	try {
		const res = await fetch(`${baseUrl}/breeds/list/all`);
		const { message } = await res.json();

		return Object.keys(message);
	} catch (e) {
		return Promise.reject("Error fetching the breeds.\n", e);
	}
}

async function fetchRandomDog(breed = "") {
	try {
		const res = await fetch(
			`${baseUrl}/breed${breed !== "" ? "" : "s"}${breed ? `/${breed}` : ""}/image${breed !== "" ? "s" : ""}/random`
		);
		const { message } = await res.json();

		return message;
	} catch (e) {
		return Promise.reject("Error fetching the dog.\n", e);
	}
}

// Adding the breeds to the datalist
async function fillDatalist(breeds) {
	const datalist = document.querySelector("#breeds");

	breeds.forEach((breed) => {
		const option = document.createElement("option");
		option.setAttribute("value", breed);
		option.innerText = breed;

		datalist.appendChild(option);
	});
}

// Updating the src of the img
async function updateImage(breed = "") {
	try {
		const src = await fetchRandomDog(breed);
		img.setAttribute("src", src);
	} catch (e) {
		console.log(e);
	}
}

// Main
const breeds = await fetchBreeds();
let breed = "";

const img = document.querySelector(".img");
updateImage(breed);

fillDatalist(breeds);

let interval;
const button = document.querySelector(".button");
button.focus();
button.addEventListener("click", () => {
	updateImage(breed);

	if (interval) {
		clearInterval(interval);
		interval = setInterval(() => updateImage(breed), 5 * 1000);
	}
});

const autofetch = document.querySelector("#autofetch");
autofetch.addEventListener("change", (e) => {
	if (e.target.checked) interval = setInterval(() => updateImage(breed), 5 * 1000);
	else {
		clearInterval(interval);
		interval = undefined;
	}
});

const breedList = document.querySelector(".breeds-list");
const selectedbreed = document.querySelector("#selectedbreed");
const selectbreed = document.querySelector("#selectbreed");
selectbreed.addEventListener("change", (e) => {
	if (e.target.checked) breed = selectedbreed.value;
	else breed = "";

	breedList.classList.toggle("show");
});

selectedbreed.addEventListener("change", (e) => {
	if (breeds.includes(e.target.value)) breed = e.target.value;
});
