// Fetching the image
const baseUrl = "https://dog.ceo/api";

async function fetchDog() {
	try {
		const res = await fetch(`${baseUrl}/breeds/image/random`);
		const { message } = await res.json();

		return message;
	} catch (e) {
		return Promise.reject("Error fetching the dog.\n", e);
	}
}

// Updating the src of the img
const img = document.querySelector(".img");

async function updateImage() {
	try {
		const src = await fetchDog();
		img.setAttribute("src", src);
	} catch (e) {
		console.log(e);
	}
}

// Main
updateImage();

let interval;
const button = document.querySelector(".button");
button.focus();
button.addEventListener("click", () => {
	updateImage();

	if (interval) {
		clearInterval(interval);
		interval = setInterval(updateImage, 5 * 1000);
	}
});

const checkbox = document.querySelector("#autofetch");
checkbox.addEventListener("change", (e) => {
	if (e.target.checked) interval = setInterval(updateImage, 5 * 1000);
	else {
		clearInterval(interval);
		interval = undefined;
	}
});
