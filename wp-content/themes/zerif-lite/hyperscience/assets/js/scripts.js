// Global Vars
const prefersReducedMotion = window.matchMedia(`(prefers-reduced-motion: reduce)`) === true || window.matchMedia(`(prefers-reduced-motion: reduce)`).matches === true;


// Helper function to add scripts/styles to page after load and return promise
async function loadScripts(scriptURLS) {
	const load = (scriptURL) => {
		return new Promise(function(resolve, reject) {
			let existingScript = document.querySelector(`[src*="${scriptURL}"]`)
			let existingStyle = document.querySelector(`[href*="${scriptURL}"]`)

			if (!!existingScript || !!existingStyle) {
				resolve();
			} else {
				if (!!scriptURL.includes('.js')) {
					// <script> creation
					let script = document.createElement('script');
					script.onload = resolve;
					script.type = 'text/javascript';
					script.src = scriptURL;
					document.body.appendChild(script);
				} else {
					// <link style> creation
					let style = document.createElement('link');
					style.rel = 'stylesheet';
					style.type = 'text/css';
					style.href = scriptURL;
					style.media = 'all';
					document.body.appendChild(style);
				}
			}
		});
	}
	let promises = [];
	for (const scriptURL of scriptURLS) {
		promises.push(load(scriptURL));
	}
	await Promise.all(promises);
	for (const scriptURL of scriptURLS) {
		loadScripts.loaded.add(scriptURL);
	}
}
loadScripts.loaded = new Set();


// Lazy loaded images
const lazyImgs = document.querySelectorAll('img[data-src]:not([data-src=""]')
const lazyImgsObserverOptions = {
  rootMargin: '200px', //RootMargin declares where it will trigger the observer (optional). e.g. 200px means when you scroll to within 200px of the image
};
if (!!lazyImgs.length) {
	let observer = new IntersectionObserver(function(entries, observer) {
		entries.forEach(function(entry) {
			if (entry.isIntersecting) {
				let el = entry.target;
				observer.unobserve(el);

				el.dataset.src ? el.src = el.dataset.src : '';
				el.dataset.srcset ? el.srcset = el.dataset.srcset : '';
				el.dataset.sizes ? el.sizes = el.dataset.sizes : '';
			}
		});
	}, lazyImgsObserverOptions);

	for (let img of lazyImgs) {
		observer.observe(img);
	}
}

// Lazy loaded background images
const lazyBkgEls = document.querySelectorAll('*[data-bkg]:not([data-bkg=""]')
const lazyBkgElsObserverOptions = {
  rootMargin: '200px', //RootMargin declares where it will trigger the observer (optional). e.g. 200px means when you scroll to within 200px of the image
};
if (!!lazyBkgEls.length) {
	let observer = new IntersectionObserver(function(entries, observer) {
		entries.forEach(function(entry) {
			if (entry.isIntersecting) {
				let el = entry.target;
				observer.unobserve(el);

				el.dataset.bkg ? el.style.backgroundImage = `url("${el.dataset.bkg}")` : '';
			}
		});
	}, lazyBkgElsObserverOptions);

	for (let el of lazyBkgEls) {
		observer.observe(el);
	}
}

// Reveal Element Listeners
const revealEls = document.querySelectorAll('*[class*="reveal-"]');
if (!!prefersReducedMotion) {
	for (const revealEl of revealEls) {
		revealEl.classList.add('revealed');
	}
} else {
	const revealElsObserverOptions = {
		threshold: '0.75'
	};
	let observer = new IntersectionObserver(function(entries, observer) {
		entries.forEach(function(entry) {
			if (entry.isIntersecting) {
				let revealEl = entry.target;
				observer.unobserve(revealEl);

				revealEl.classList.add('revealed');
			}
		});
	}, revealElsObserverOptions);

	for (const revealEl of revealEls) {
		observer.observe(revealEl);
	}
}


// Hero - Particles.js
window.addEventListener('DOMContentLoaded', () => {
	if (!prefersReducedMotion) {
		(async () => {
			await loadScripts([
				'//cdn.jsdelivr.net/npm/gsap@3.12.5/dist/gsap.min.js',
				'//cdn.jsdelivr.net/npm/particles.js@2.0.0/particles.min.js'
			]);

			particlesJS.load('section-hero-bkg', '/wp-content/themes/zerif-lite/hyperscience/assets/js/particlesjs-config.json', () => {
				gsap.to('#section-hero-bkg', {opacity:0.25, delay:0.5})
			});
		})();
	}
})


// How it Works
window.addEventListener('DOMContentLoaded', () => {
	const loadHowItWorks = () => {
		gsap.registerPlugin(ScrollTrigger);

		let panels = gsap.utils.toArray(".howitworks-panel");
		let scrollTween = gsap.to(panels, {
			xPercent: -100 * (panels.length - 1),
			ease: "none", // <-- IMPORTANT!
			scrollTrigger: {
				trigger: ".section-howitworks",
				pin: true,
				scrub: 0.1,
				end: "+=3000"
			}
		});
	}

	if (!prefersReducedMotion) {
		(async () => {
			await loadScripts([
				'//cdn.jsdelivr.net/npm/gsap@3.12.5/dist/gsap.min.js',
				'//cdn.jsdelivr.net/npm/gsap@3.12.5/dist/ScrollTrigger.min.js'
			]);

			setTimeout( function(){
				loadHowItWorks()
			}, 1000)
		})();
	}
})