/* ================= NAVBAR ================= */

const navbar = document.getElementById("navbar");

window.addEventListener("scroll", function () {

    if (window.scrollY > 50) {
        navbar.classList.add("scrolled");
    } else {
        navbar.classList.remove("scrolled");
    }

});


/* ================= MOBILE MENU ================= */

const menuButton = document.getElementById("menuButton");
const navLinks = document.getElementById("navLinks");

menuButton.addEventListener("click", function () {

    navLinks.classList.toggle("mobile-open");

});


document.querySelectorAll(".nav-links a").forEach(function (link) {

    link.addEventListener("click", function () {

        navLinks.classList.remove("mobile-open");

    });

});


/* ================= WORK FILTER ================= */

const filterButtons = document.querySelectorAll(".work-filter");
const workItems = document.querySelectorAll(".work-card");

filterButtons.forEach(function (button) {

    button.addEventListener("click", function () {

        filterButtons.forEach(function (btn) {
            btn.classList.remove("active");
        });

        button.classList.add("active");

        const filter = button.dataset.filter;

        workItems.forEach(function (item) {

            const category = item.dataset.category;

            if (filter === "all" || category === filter) {

                item.classList.remove("hidden");

            } else {

                item.classList.add("hidden");

            }

        });

    });

});


/* ================= TESTIMONIALS ================= */

const testimonials = [

    {
        text: "DIAM understood our vision and transformed it into an experience that exceeded our expectations.",
        name: "Alex M.",
        role: "Marketing Manager"
    },

    {
        text: "The team was creative, professional and incredibly easy to work with. Our event was unforgettable.",
        name: "Sarah K.",
        role: "Event Director"
    },

    {
        text: "They helped us turn our brand into something people could actually connect with.",
        name: "Daniel R.",
        role: "Business Owner"
    }

];


let testimonialIndex = 0;

const testimonialText = document.getElementById("testimonialText");
const testimonialName = document.getElementById("testimonialName");
const testimonialRole = document.getElementById("testimonialRole");
const testimonialCounter = document.getElementById("testimonialCounter");

function showTestimonial(index) {

    const testimonial = testimonials[index];

    testimonialText.textContent = testimonial.text;
    testimonialName.textContent = testimonial.name;
    testimonialRole.textContent = testimonial.role;

    testimonialCounter.textContent =
        `0${index + 1} / 0${testimonials.length}`;

}


document
    .getElementById("nextTestimonial")
    .addEventListener("click", function () {

        testimonialIndex++;

        if (testimonialIndex >= testimonials.length) {
            testimonialIndex = 0;
        }

        showTestimonial(testimonialIndex);

    });


document
    .getElementById("previousTestimonial")
    .addEventListener("click", function () {

        testimonialIndex--;

        if (testimonialIndex < 0) {
            testimonialIndex = testimonials.length - 1;
        }

        showTestimonial(testimonialIndex);

    });


/* ================= CONTACT FORM ================= */

const contactForm = document.getElementById("contactForm");
const formMessage = document.getElementById("formMessage");

contactForm.addEventListener("submit", function (event) {

    event.preventDefault();

    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const message = document.getElementById("message").value.trim();

    if (!name || !email || !message) {

        formMessage.textContent =
            "Please complete all required fields.";

        formMessage.className = "form-message error";

        return;
    }
    const formData = new FormData(contactForm);

    fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData
    })
    .then(function (response) {
        return response.json();
    })    
    .then(function (data) {

        if (data.success) {

            formMessage.textContent =
                `Thank you, ${name}. Your message has been sent successfully.`;

            formMessage.className = "form-message success";

            contactForm.reset();

        } else {

            formMessage.textContent =
                "Sorry, something went wrong. Please try again.";

            formMessage.className = "form-message error";

        }

    })
    .catch(function () {

        formMessage.textContent =
            "Unable to send your message. Please check your connection and try again.";

        formMessage.className = "form-message error";

    });

    formMessage.textContent =
        `Thank you, ${name}. Your message has been received. We'll get back to you shortly.`;

    formMessage.className = "form-message success";

    contactForm.reset();

});


/* ================= CHATBOT ================= */

const chatButton = document.getElementById("chatButton");
const chatWindow = document.getElementById("chatWindow");
const closeChat = document.getElementById("closeChat");
const chatForm = document.getElementById("chatForm");
const chatInput = document.getElementById("chatInput");
const chatMessages = document.getElementById("chatMessages");
let chatStep = "";


chatButton.addEventListener("click", function () {

    chatWindow.classList.add("open");

    chatInput.focus();

});


closeChat.addEventListener("click", function () {

    chatWindow.classList.remove("open");

});


function addMessage(text, type) {

    const message = document.createElement("div");

    message.className = `message ${type}`;

    const span = document.createElement("span");

    span.textContent = text;

    message.appendChild(span);

    chatMessages.appendChild(message);

    chatMessages.scrollTop = chatMessages.scrollHeight;

}


function botReply(userMessage) {

    const message = userMessage.toLowerCase().trim();

    let response =
        "I'd love to help. Tell me a little more about what you're looking to achieve, and the DIAM team will guide you from there.";


    /* ================= EVENT CONVERSATION ================= */

    if (chatStep === "event_type") {

        chatStep = "event_date";

        response =
            "That sounds great. When is the event planned to take place?";

    }

    else if (chatStep === "event_date") {

        chatStep = "event_location";

        response =
            "Perfect. Where will the event take place?";

    }

    else if (chatStep === "event_location") {

        chatStep = "event_details";

        response =
            "Great. Tell us a little about what you'd like DIAM to handle for the event.";

    }


    /* ================= GENERAL QUESTIONS ================= */

    else if (
        message.includes("service") ||
        message.includes("services") ||
        message.includes("what do you do") ||
        message.includes("offer")
    ) {

        response =
            "DIAM offers digital marketing, social media management, branding, events & activations, photography & videography, content creation, creative strategy and campaign marketing.";

    }


    else if (
        message.includes("event") ||
        message.includes("activation") ||
        message.includes("launch")
    ) {

        chatStep = "event_type";

        response =
            "Absolutely. DIAM can help with corporate events, product launches and brand activations. What type of event are you planning?";

    }


    else if (
        message.includes("brand") ||
        message.includes("branding") ||
        message.includes("logo")
    ) {

        response =
            "Our branding work can include brand identity, visual direction, logo development and creative materials designed to give your business a strong and consistent presence.";

    }


    else if (
        message.includes("social media") ||
        message.includes("instagram") ||
        message.includes("facebook") ||
        message.includes("content")
    ) {

        response =
            "We help brands build their digital presence through social media management, content creation, creative campaigns and digital marketing.";

    }


    else if (
        message.includes("photo") ||
        message.includes("photography") ||
        message.includes("video") ||
        message.includes("videography")
    ) {

        response =
            "DIAM provides photography, videography and promotional content designed to help brands communicate their story visually.";

    }


    else if (
        message.includes("price") ||
        message.includes("pricing") ||
        message.includes("cost") ||
        message.includes("how much")
    ) {

        response =
            "Project pricing depends on the scope and requirements. Tell us what you're planning, and our team can discuss the right solution for your project.";

    }


    else if (
        message.includes("contact") ||
        message.includes("phone") ||
        message.includes("email") ||
        message.includes("reach")
    ) {

        response =
            "You can reach DIAM at 0710 748 657 or diammarkerting@gmail.com. We're based in Dar es Salaam, Tanzania.";

    }


    else if (
        message.includes("location") ||
        message.includes("where are you") ||
        message.includes("dar es salaam")
    ) {

        response =
            "DIAM Creative & Marketing is based in Dar es Salaam, Tanzania.";

    }


    else if (
        message.includes("hours") ||
        message.includes("open") ||
        message.includes("working hours")
    ) {

        response =
            "Our business hours are Monday to Friday, 08:00–17:00, and Saturday, 09:00–13:00.";

    }


    else if (
        message === "hello" ||
        message === "hi" ||
        message === "hey"
    ) {

        response =
            "Hello! 👋 Welcome to DIAM. I'm the DIAM Assistant. What can we help you create today?";

    }


    setTimeout(function () {

        addMessage(response, "bot");

    }, 600);

}   
chatForm.addEventListener("submit", function (event) {

    event.preventDefault();

    const text = chatInput.value.trim();

    if (!text) {
        return;
    }

    addMessage(text, "user");

    chatInput.value = "";

    botReply(text);

});


document.querySelectorAll(".quick-replies button").forEach(function (button) {

    button.addEventListener("click", function () {

        const text = button.dataset.message;

        addMessage(text, "user");

        botReply(text);

    });

});


/* ================= VIDEO LIGHTBOX ================= */

const lightbox = document.getElementById("lightbox");
const videoButton = document.getElementById("videoButton");
const watchButton = document.getElementById("watchButton");
const lightboxClose = document.getElementById("lightboxClose");


function openVideo() {

    lightbox.classList.add("open");

    document.body.classList.add("no-scroll");

}


function closeVideo() {

    lightbox.classList.remove("open");

    document.body.classList.remove("no-scroll");

}


videoButton.addEventListener("click", openVideo);

watchButton.addEventListener("click", openVideo);

lightboxClose.addEventListener("click", closeVideo);


lightbox.addEventListener("click", function (event) {

    if (event.target === lightbox) {
        closeVideo();
    }

});


/* ================= SCROLL REVEAL ================= */

const revealElements = document.querySelectorAll(
    ".service-card, .work-card, .process-item, .testimonial-card, .about-content, .about-image, .contact-info, .contact-form-wrapper"
);


const revealObserver = new IntersectionObserver(

    function (entries) {

        entries.forEach(function (entry) {

            if (entry.isIntersecting) {

                entry.target.classList.add("reveal", "visible");

                revealObserver.unobserve(entry.target);

            }

        });

    },

    {
        threshold: 0.12
    }

);


revealElements.forEach(function (element) {

    element.classList.add("reveal");

    revealObserver.observe(element);

});
/* ================= PROJECT MODAL ================= */

const projectModal = document.getElementById("projectModal");
const projectModalClose = document.getElementById("projectModalClose");

const projectModalCategory =
    document.getElementById("projectModalCategory");

const projectModalTitle =
    document.getElementById("projectModalTitle");

const projectModalDescription =
    document.getElementById("projectModalDescription");

const projectModalClient =
    document.getElementById("projectModalClient");

const projectModalService =
    document.getElementById("projectModalService");

const projectModalYear =
    document.getElementById("projectModalYear");

const projectModalChallenge =
    document.getElementById("projectModalChallenge");

const projectModalApproach =
    document.getElementById("projectModalApproach");

const projectModalResult =
    document.getElementById("projectModalResult"); 

const projectModalImage =
    document.getElementById("projectModalImage");

const projectModalCTA = 
    document.getElementById("projectModalCTA");

const projects = {

    "The Golden Hour": {

        category: "EVENTS & ACTIVATIONS",
        image: "/My%20website/images/golden-hour-web.jpg",
        description:
            "A luxury brand launch experience designed to create a memorable and visually powerful experience for guests.",

        client: "Golden Hour",

        service: "Events & Activations",

        year: "2026",

        challenge:
            "The brand needed a launch experience that would feel premium, memorable and strong enough to create lasting impressions.",

        approach:
            "We developed a cinematic event concept combining creative direction, atmosphere, guest experience and visual storytelling.",

        result:
            "The experience created a strong emotional connection between the brand and its guests while delivering a distinctive launch moment."

    },


    "Nuru Collective": {

        category: "BRANDING",
        image: "/My%20website/images/nuru-collective-web.jpg",
        description:
            "A complete visual identity created to give a modern African lifestyle brand a distinctive and recognizable presence.",

        client: "Nuru Collective",

        service: "Branding & Design",

        year: "2026",

        challenge:
            "Nuru Collective needed a visual identity that could communicate modern African creativity while remaining premium and recognizable.",

        approach:
            "We created a refined visual language built around typography, identity systems, visual consistency and contemporary African-inspired creative direction.",

        result:
            "The new identity gave the brand a stronger visual presence and a more consistent way to connect with its audience."

    },


    "Urban Pulse": {

        category: "DIGITAL",
        image: "/My%20website/images/urban-pulse.jpg",

        description:
            "A digital campaign designed to increase brand awareness, audience engagement and online visibility.",

        client: "Urban Pulse",

        service: "Digital Marketing",

        year: "2026",

        challenge:
            "The brand needed to increase its digital visibility and create stronger engagement with its target audience.",

        approach:
            "We developed a creative digital campaign combining content strategy, social media storytelling and audience-focused messaging.",

        result:
            "The campaign strengthened the brand's online presence and created more meaningful interactions with its audience."

    },


    "Mlimani Experience": {

        category: "EVENTS",

        image: "/My%20website/images/mlimani-experience-web.jpg",
        description:
            "A corporate event experience combining professional production, creative direction and memorable guest engagement.",

        client: "Mlimani Experience",

        service: "Event Production",

        year: "2026",

        challenge:
            "The event needed to feel professional and polished while still creating an engaging experience for every guest.",

        approach:
            "We combined creative event direction, production planning, visual details and guest experience design to create a cohesive environment.",

        result:
            "The final experience delivered a professional event atmosphere while keeping guests engaged from arrival to conclusion."

    },


    "AfriNova": {

        category: "BRAND STRATEGY",
        
        image: "/My%20website/images/afrinova.jpg",
        description:
            "A complete brand transformation focused on creating a stronger identity, clearer positioning and a more memorable customer experience.",

        client: "AfriNova",

        service: "Brand Strategy",

        year: "2026",

        challenge:
            "AfriNova needed clearer positioning and a stronger brand identity that could differentiate it in a competitive market.",

        approach:
            "We worked around brand positioning, strategic direction, identity development and customer experience to create a clearer brand story.",

        result:
            "The transformation gave AfriNova a stronger strategic foundation and a more memorable identity for its audience."

    }

};

document.querySelectorAll(".project-view-btn").forEach(function (button) {

    button.addEventListener("click", function (event) {

        event.preventDefault();

        const projectCard = button.closest(".work-card");

        const projectTitle =
            projectCard.querySelector("h3").textContent.trim();     

        const project = projects[projectTitle];

        if (!project) {
            return;
        }

        projectModalCategory.textContent = project.category;
        projectModalTitle.textContent = projectTitle;
        projectModalDescription.textContent = project.description;
        projectModalImage.src = project.image;
        projectModalClient.textContent = project.client;
        projectModalService.textContent = project.service;
        projectModalYear.textContent = project.year;
        projectModalChallenge.textContent = project.challenge;
        projectModalApproach.textContent = project.approach;
        projectModalResult.textContent = project.result;
        
        projectModal.classList.add("open");

        document.body.classList.add("no-scroll");

    });

});


projectModalClose.addEventListener("click", function () {

    projectModal.classList.remove("open");

    document.body.classList.remove("no-scroll");

});


projectModal.addEventListener("click", function (event) {

    if (
        event.target === projectModal ||
        event.target.classList.contains("project-modal-overlay")
    ) {

        projectModal.classList.remove("open");

        document.body.classList.remove("no-scroll");

    }

});
projectModalCTA.addEventListener("click", function () {

    projectModal.classList.remove("open");
    document.body.classList.remove("no-scroll");

});