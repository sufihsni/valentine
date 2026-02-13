const envelopeScene = document.getElementById("envelopeScene");
const sealButton = document.getElementById("sealButton");
const lanternsContainer = document.getElementById("lanterns");
const heartsContainer = document.getElementById("hearts");
const noButton = document.getElementById("noButton");
const panelActions = document.getElementById("panelActions");
const valentinePanel = document.querySelector(".valentine-panel");

console.log("Script loaded!");
console.log("Seal button:", sealButton);
console.log("Envelope scene:", envelopeScene);

let isOpen = false;

const createLantern = (index) => {
	const lantern = document.createElement("div");
	lantern.className = "lantern";
	const left = Math.random() * 100;
	const duration = 14 + Math.random() * 10;
	const delay = Math.random() * 8;
	const scale = 0.6 + Math.random() * 0.8;
	lantern.style.left = `${left}%`;
	lantern.style.animationDelay = `${delay}s`;
	lantern.style.setProperty("--float-duration", `${duration}s`);
	lantern.style.setProperty("--scale", scale.toFixed(2));
	lantern.style.opacity = `${0.6 + Math.random() * 0.4}`;
	lanternsContainer.appendChild(lantern);
};

const createHeart = () => {
	const heart = document.createElement("div");
	heart.className = "heart";
	const left = Math.random() * 100;
	const duration = 7 + Math.random() * 8;
	const delay = Math.random() * 5;
	const scale = 0.5 + Math.random() * 1.2;
	heart.style.left = `${left}%`;
	heart.style.animationDelay = `${delay}s`;
	heart.style.setProperty("--fall-duration", `${duration}s`);
	heart.style.setProperty("--scale", scale.toFixed(2));
	if (Math.random() > 0.6) {
		heart.style.background = "#ff7aa6";
	}
	heartsContainer.appendChild(heart);
};

const initBackgroundEffects = () => {
	const lanternCount = 10;
	const heartCount = 28;

	for (let i = 0; i < lanternCount; i += 1) {
		createLantern(i);
	}

	for (let i = 0; i < heartCount; i += 1) {
		createHeart();
	}
};

const moveNoButton = () => {
	if (!panelActions || !noButton) {
		return;
	}

	const containerRect = panelActions.getBoundingClientRect();
	const buttonRect = noButton.getBoundingClientRect();
	const maxLeft = Math.max(containerRect.width - buttonRect.width, 0);
	const maxTop = Math.max(containerRect.height - buttonRect.height, 0);
	const nextLeft = Math.random() * maxLeft;
	const nextTop = Math.random() * maxTop;

	noButton.style.left = `${nextLeft}px`;
	noButton.style.top = `${nextTop}px`;
};

if (sealButton) {
	sealButton.addEventListener("click", () => {
		console.log("LOVE button clicked!");
		if (isOpen) {
			return;
		}
		isOpen = true;
		envelopeScene.classList.add("open");
		document.body.classList.add("is-open");
		
		const introSection = document.querySelector(".intro-section");
		const envelopeLetterContainer = document.querySelector(".envelope-letter-container");
		
		if (introSection) {
			introSection.classList.add("show-intro");
		}
		
		const somethingSection = document.querySelector(".something-section");
		
		// Hide intro after 2 seconds
		setTimeout(() => {
			if (introSection) {
				introSection.style.opacity = "0";
				introSection.style.transition = "opacity 0.6s ease";
			}
		}, 2000);
		
		// Show "I need to say something..." after intro fades (2.8 seconds)
		setTimeout(() => {
			if (somethingSection) {
				somethingSection.classList.add("show-something");
			}
		}, 2800);
		
		// Hide "I need to say something..." after 3 seconds (at 5.8s)
		setTimeout(() => {
			if (somethingSection) {
				somethingSection.style.opacity = "0";
				somethingSection.style.transition = "opacity 0.6s ease";
			}
		}, 5800);
		
		if (valentinePanel) {
			// Show valentine panel after something-section fades (6.4 seconds)
			setTimeout(() => {
				valentinePanel.classList.add("show-panel");
				document.body.classList.add("show-panel");
			}, 6400);
		}
	});
} else {
	console.error("Seal button not found!");
}

let noButtonClickCount = 0;

if (noButton) {
	noButton.addEventListener("mouseenter", () => {
		if (noButtonClickCount >= 2) {
			moveNoButton();
		}
	});
	noButton.addEventListener("focus", () => {
		if (noButtonClickCount >= 2) {
			moveNoButton();
		}
	});
	noButton.addEventListener("pointerdown", (event) => {
		if (noButtonClickCount >= 2) {
			moveNoButton();
		}
	});
	noButton.addEventListener("click", (event) => {
		event.preventDefault();
		noButtonClickCount++;
		
		if (noButtonClickCount === 1) {
			// First click - show dare page
			const darePage = document.querySelector(".dare-page");
			if (darePage) {
				darePage.classList.add("show-dare");
			}
		} else if (noButtonClickCount === 2) {
			// Second click - show hate page
			const hatePage = document.querySelector(".hate-page");
			if (hatePage) {
				hatePage.classList.add("show-hate");
			}
		}
		// Third click onwards - button will just move on hover
	});
}

const backButton = document.getElementById("backButton");
if (backButton) {
	backButton.addEventListener("click", () => {
		const darePage = document.querySelector(".dare-page");
		if (darePage) {
			darePage.classList.remove("show-dare");
		}
	});
}

const backButtonHate = document.getElementById("backButtonHate");
if (backButtonHate) {
	backButtonHate.addEventListener("click", () => {
		const hatePage = document.querySelector(".hate-page");
		if (hatePage) {
			hatePage.classList.remove("show-hate");
		}
	});
}

const yesButton = document.getElementById("yesButton");
const letterPage = document.querySelector(".letter-page");

console.log("yesButton:", yesButton);
console.log("letterPage:", letterPage);

if (yesButton && letterPage) {
	yesButton.addEventListener("click", () => {
		console.log("Yes button clicked!");
		console.log("Adding show-letter class...");
		letterPage.classList.add("show-letter");
		console.log("Current classes:", letterPage.className);
	});
} else {
	console.error("Elements not found:", { yesButton, letterPage });
}

// Create rain drops for hate page
const createRainDrops = () => {
	const rainContainer = document.querySelector('.rain-container');
	if (!rainContainer) return;
	
	const dropCount = 50;
	
	for (let i = 0; i < dropCount; i++) {
		const drop = document.createElement('div');
		drop.className = 'rain-drop';
		
		const left = Math.random() * 100;
		const duration = 0.5 + Math.random() * 1;
		const delay = Math.random() * 2;
		const opacity = 0.3 + Math.random() * 0.4;
		
		drop.style.left = `${left}%`;
		drop.style.animationDuration = `${duration}s`;
		drop.style.animationDelay = `${delay}s`;
		drop.style.opacity = opacity;
		
		rainContainer.appendChild(drop);
	}
};

// Initialize rain when hate page is shown
const hatePage = document.querySelector('.hate-page');
if (hatePage) {
	const observer = new MutationObserver((mutations) => {
		mutations.forEach((mutation) => {
			if (mutation.target.classList.contains('show-hate')) {
				createRainDrops();
				observer.disconnect();
			}
		});
	});
	
	observer.observe(hatePage, { attributes: true, attributeFilter: ['class'] });
}

initBackgroundEffects();
