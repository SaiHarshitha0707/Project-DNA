const $ = (selector) => document.querySelector(selector);

// COMPONENT DATA WITH REAL PHOTO URLS
const components = [
    {
        id: 1,
        name: "Arduino Uno R3",
        type: "Microcontroller",
        description: "A dependable starting point for your next build.",
        stock: 12,
        project: "Smart irrigation",
        image: "https://commons.wikimedia.org/wiki/Special:FilePath/Arduino_Uno_-_R3.jpg"
    },
    {
        id: 2,
        name: "Raspberry Pi",
        type: "Single-board computer",
        description: "A compact computer for creative projects.",
        stock: 4,
        project: "Gesture-controlled robot",
        image: "https://commons.wikimedia.org/wiki/Special:FilePath/Raspberry_Pi_3_B%2B_%2839906369025%29.png"
    },
    {
        id: 3,
        name: "Ultrasonic Sensor HC-SR04",
        type: "Sensor",
        description: "Measure distance using sound waves.",
        stock: 8,
        project: "Obstacle avoiding bot",
        image: "https://commons.wikimedia.org/wiki/Special:FilePath/HC_SR04_Ultrasonic_sensor_1480319_20_21_HDR_Enhancer.jpg"
    },
    {
        id: 4,
        name: "DC Motor",
        type: "Motor",
        description: "Reliable motion for robotics projects.",
        stock: 6,
        project: "Line-following robot",
        image: "https://commons.wikimedia.org/wiki/Special:FilePath/DC_Motor_working_with_Arduino_Servo_Example.jpg"
    },
    {
        id: 5,
        name: "Servo Motor",
        type: "Motor",
        description: "Precise angle control for prototypes.",
        stock: 5,
        project: "Robotic arm",
        image: "https://commons.wikimedia.org/wiki/Special:FilePath/Tower_Pro_SG90_micro_servo_motor.jpg"
    },
    {
        id: 6,
        name: "Breadboard",
        type: "Prototyping",
        description: "Build circuits without soldering.",
        stock: 15,
        project: "LED circuit",
        image: "https://commons.wikimedia.org/wiki/Special:FilePath/Breadboard.jpg"
    },
    {
        id: 7,
        name: "Jumper Wires",
        type: "Connection",
        description: "Flexible connections for your circuit.",
        stock: 20,
        project: "Smart irrigation",
        image: "https://commons.wikimedia.org/wiki/Special:FilePath/A_few_Jumper_Wires.jpg"
    }
];

let requests = [];
let currentPage = "dashboard";
let selectedComponent = 1;


// LOGIN

$("#loginForm").addEventListener("submit", function (event) {
    event.preventDefault();

    const email = $("#email").value.trim();
    const password = $("#password").value;

    if (!email || password.length < 4) {
        $("#loginMessage").textContent =
            "Enter a valid email and password of at least 4 characters.";
        return;
    }

    const username = email.split("@")[0];

    $("#userName").textContent = username;
    $(".avatar").textContent = username.charAt(0).toUpperCase();

    $("#loginPage").classList.add("hidden");
    $("#app").classList.remove("hidden");

    go("dashboard");
});


// SHOW / HIDE PASSWORD

$("#togglePassword").addEventListener("click", function () {
    const password = $("#password");

    if (password.type === "password") {
        password.type = "text";
        this.textContent = "Hide";
    } else {
        password.type = "password";
        this.textContent = "Show";
    }
});


// FORGOT PASSWORD

$("#forgotPassword").addEventListener("click", function () {
    toast("Please contact your library administrator to reset your password.");
});


// CREATE ACCOUNT

$("#createAccount").addEventListener("click", function () {
    toast("Account creation will be connected to the backend later.");
});


// LOGOUT

$("#logoutBtn").addEventListener("click", function () {
    $("#app").classList.add("hidden");
    $("#loginPage").classList.remove("hidden");

    $("#loginForm").reset();
    $("#loginMessage").textContent = "";

    $("#userName").textContent = "Alex Kim";
    $(".avatar").textContent = "A";
});


// NAVIGATION

function go(page) {
    currentPage = page;
    render();

    document.querySelectorAll(".nav-link").forEach(button => {
        button.classList.toggle(
            "active",
            button.dataset.page === page
        );
    });

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
}


// COMPONENT IMAGE
// Uses a real photo URL instead of the old SVG illustration.

function componentArt(component) {
    return `
        <div class="component-art">

            <span class="part-label">
                COMPONENT / ${component.id}
            </span>

            <img
                src="${component.image}"
                alt="${component.name}"
                loading="lazy"
                onerror="this.onerror=null; this.src='https://placehold.co/400x300/f0f4ee/17613f?text=Component+Photo';"
            />

        </div>
    `;
}


// COMPONENT CARD

function componentCard(component) {
    return `
        <article class="component-card">

            ${componentArt(component)}

            <div class="component-info">

                <h3>${component.name}</h3>

                <p>
                    ${component.type} ·
                    ${component.stock} available
                </p>

                <span class="status">
                    Available
                </span>

                <div class="component-actions">

                    <button data-open="${component.id}">
                        View Details →
                    </button>

                    <button data-borrow="${component.id}">
                        + Request
                    </button>

                </div>

            </div>

        </article>
    `;
}


// PAGE HEADING

function pageHead(title, description) {
    return `
        <div class="page-head">

            <div>

                <span class="eyebrow">
                    PROJECT DNA / COMPONENT LIBRARY
                </span>

                <h2>${title}</h2>

                <p>${description}</p>

            </div>

        </div>
    `;
}


// DASHBOARD

function dashboard() {
    return `
        ${pageHead(
            "Welcome back, Alex.",
            "Your ideas need the right components to get started."
        )}

        <div class="toolbar">

            <input
                id="dashboardSearch"
                placeholder="Search for your next component"
            >

            <button
                class="primary-btn"
                id="dashboardSearchButton"
            >
                Search →
            </button>

        </div>

        <div class="stats">

            <div class="stat">
                <span class="label">Total Components</span>
                <strong>248</strong>
                <small>Across 8 categories</small>
            </div>

            <div class="stat">
                <span class="label">Available Components</span>
                <strong>186</strong>
                <small>Ready for your next build</small>
            </div>

            <div class="stat">
                <span class="label">Currently Borrowed</span>
                <strong>03</strong>
                <small>Across 2 projects</small>
            </div>

            <div class="stat">
                <span class="label">Pending Requests</span>
                <strong>${requests.length.toString().padStart(2, "0")}</strong>
                <small>Awaiting approval</small>
            </div>

        </div>

        <div class="dashboard-grid">

            <section>

                <div class="section-title">
                    <h3>Recently Added Components</h3>

                    <button data-page="explore">
                        Explore all →
                    </button>
                </div>

                <div class="component-grid">
                    ${components.slice(0, 3).map(componentCard).join("")}
                </div>

                <div class="section-title">
                    <h3>Recently Used Components</h3>

                    <button data-page="history">
                        View history →
                    </button>
                </div>

                ${componentTable(components.slice(0, 4))}

            </section>

            <aside class="side-card">

                <h3>Quick Actions</h3>

                ${quickAction(
                    "▦",
                    "Explore components",
                    "Find the right part for your idea",
                    "explore"
                )}

                ${quickAction(
                    "↗",
                    "Request to borrow",
                    "Make a component request",
                    "requests"
                )}

                ${quickAction(
                    "◷",
                    "Track my borrowing",
                    "See what is being used",
                    "requests"
                )}

                ${quickAction(
                    "↻",
                    "Usage history",
                    "View your previous projects",
                    "history"
                )}

            </aside>

        </div>

        <div class="notice">
            <strong>✳ Every build leaves a story.</strong>
            <span>Keep your component history up to date.</span>
        </div>
    `;
}


// QUICK ACTION

function quickAction(icon, title, description, page) {
    return `
        <div class="quick-action" data-page="${page}">

            <span class="quick-icon">
                ${icon}
            </span>

            <div>
                <strong>${title}</strong>
                <small>${description}</small>
            </div>

        </div>
    `;
}


// EXPLORE COMPONENTS

function explore() {
    return `
        ${pageHead(
            "Explore Components",
            "Find the right component for your next project."
        )}

        <div class="toolbar">

            <input
                id="componentSearch"
                placeholder="Search by component name or type"
            >

            <select id="categoryFilter">

                <option value="all">All Categories</option>
                <option value="Microcontroller">Microcontroller</option>
                <option value="Sensor">Sensor</option>
                <option value="Motor">Motor</option>
                <option value="Prototyping">Prototyping</option>
                <option value="Connection">Connection</option>
                <option value="Single-board computer">Single-board computer</option>

            </select>

        </div>

        <div class="component-grid" id="catalog">
            ${components.map(componentCard).join("")}
        </div>

        <div class="notice">

            <strong>
                ✳ Request a component and build something amazing.
            </strong>

            <button data-page="requests">
                View my requests →
            </button>

        </div>
    `;
}


// COMPONENT DETAILS

function detail() {
    const component = components.find(
        item => item.id === selectedComponent
    );

    if (!component) {
        return `
            ${pageHead(
                "Component not found",
                "Please return to the component library."
            )}

            <button class="primary-btn" data-page="explore">
                Back to Components
            </button>
        `;
    }

    return `
        ${pageHead(
            "Component Details",
            "Explore specifications and availability."
        )}

        <div class="detail-layout">

            <div class="detail-art">
                ${componentArt(component)}
            </div>

            <div class="detail-copy">

                <span class="status">
                    Available
                </span>

                <h2>${component.name}</h2>

                <p class="muted">
                    ${component.description}
                </p>

                <div class="spec-row">
                    <span>Category</span>
                    <strong>${component.type}</strong>
                </div>

                <div class="spec-row">
                    <span>Available quantity</span>
                    <strong>${component.stock} units</strong>
                </div>

                <div class="spec-row">
                    <span>Condition</span>
                    <strong>Good</strong>
                </div>

                <div class="spec-row">
                    <span>Typical use</span>
                    <strong>${component.project}</strong>
                </div>

                <button
                    class="primary-btn full"
                    data-borrow="${component.id}"
                >
                    Request to Borrow →
                </button>

                <p class="muted">
                    Your request will be sent to the library
                    administrator for approval.
                </p>

            </div>

        </div>

        <div class="section-title">
            <h3>Recent Usage History</h3>
            <button data-page="history">View all →</button>
        </div>

        ${componentTable([component])}
    `;
}


// COMPONENT TABLE

function componentTable(items) {
    return `
        <div class="table-wrap">

            <table class="data-table">

                <thead>
                    <tr>
                        <th>COMPONENT</th>
                        <th>PROJECT</th>
                        <th>DATE</th>
                        <th>STATUS</th>
                    </tr>
                </thead>

                <tbody>

                    ${items.map(component => `
                        <tr>

                            <td>
                                <div class="table-component">

                                    <img
                                        class="mini-photo"
                                        src="${component.image}"
                                        alt="${component.name}"
                                        loading="lazy"
                                        onerror="this.onerror=null; this.src='https://placehold.co/60x60/f0f4ee/17613f?text=Part';"
                                    />

                                    <strong>${component.name}</strong>

                                </div>
                            </td>

                            <td>${component.project}</td>

                            <td>Oct 31, 2026</td>

                            <td>
                                <span class="status">
                                    Returned
                                </span>
                            </td>

                        </tr>
                    `).join("")}

                </tbody>

            </table>

        </div>
    `;
}


// MY REQUESTS

function requestsPage() {
    return `
        ${pageHead(
            "My Requests",
            "Track your component requests and borrowing activity."
        )}

        <div class="stats">

            <div class="stat">
                <span class="label">Pending Approval</span>
                <strong>${requests.length.toString().padStart(2, "0")}</strong>
            </div>

            <div class="stat">
                <span class="label">Ready to Pick Up</span>
                <strong>01</strong>
            </div>

            <div class="stat">
                <span class="label">Currently Borrowed</span>
                <strong>03</strong>
            </div>

            <div class="stat">
                <span class="label">Returned</span>
                <strong>08</strong>
            </div>

        </div>

        <div class="table-wrap">

            <table class="data-table">

                <thead>
                    <tr>
                        <th>COMPONENT</th>
                        <th>PROJECT</th>
                        <th>REQUEST DATE</th>
                        <th>STATUS</th>
                    </tr>
                </thead>

                <tbody>

                    ${requests.length === 0 ? `
                        <tr>
                            <td colspan="4">
                                No requests yet.
                                Explore components to request one.
                            </td>
                        </tr>
                    ` : requests.map(request => `
                        <tr>

                            <td>
                                <div class="table-component">

                                    <img
                                        class="mini-photo"
                                        src="${request.image}"
                                        alt="${request.name}"
                                        loading="lazy"
                                        onerror="this.onerror=null; this.src='https://placehold.co/60x60/f0f4ee/17613f?text=Part';"
                                    />

                                    <strong>${request.name}</strong>

                                </div>
                            </td>

                            <td>${request.project}</td>

                            <td>Nov 02, 2026</td>

                            <td>
                                <span class="status pending">
                                    Pending
                                </span>
                            </td>

                        </tr>
                    `).join("")}

                </tbody>

            </table>

        </div>

        <div class="notice">

            <strong>
                ✳ Your borrowing history stays with you.
            </strong>

            <button data-page="history">
                View Usage History →
            </button>

        </div>
    `;
}


// USAGE HISTORY

function historyPage() {
    return `
        ${pageHead(
            "Usage History",
            "A record of what you've built, borrowed, and brought back."
        )}

        <div class="toolbar">

            <input
                id="historySearch"
                placeholder="Search components or projects"
            >

            <select id="historyFilter">

                <option value="all">All Return Statuses</option>
                <option value="Returned">Returned</option>
                <option value="Borrowed">Borrowed</option>

            </select>

        </div>

        <div id="historyTable">
            ${componentTable(components.slice(0, 5))}
        </div>

        <div class="notice">

            <strong>
                ✳ Every build leaves a story.
            </strong>

            <span>
                Your past projects inspire the next one.
            </span>

        </div>
    `;
}


// PAGE RENDERING

function render() {
    const main = $("#mainContent");

    if (currentPage === "dashboard") {
        main.innerHTML = dashboard();
    } else if (currentPage === "explore") {
        main.innerHTML = explore();
    } else if (currentPage === "detail") {
        main.innerHTML = detail();
    } else if (currentPage === "requests") {
        main.innerHTML = requestsPage();
    } else if (currentPage === "history") {
        main.innerHTML = historyPage();
    }

    wirePage();
}


// PAGE INTERACTIONS

function wirePage() {
    document.querySelectorAll("[data-page]").forEach(button => {
        button.onclick = () => {
            go(button.dataset.page);
        };
    });

    document.querySelectorAll(".component-card").forEach(card => {
        card.onclick = () => {
            const openButton = card.querySelector("[data-open]");

            if (openButton) {
                selectedComponent = Number(openButton.dataset.open);
                go("detail");
            }
        };
    });

    document.querySelectorAll("[data-open]").forEach(button => {
        button.onclick = event => {
            event.stopPropagation();

            selectedComponent = Number(button.dataset.open);
            go("detail");
        };
    });

    document.querySelectorAll("[data-borrow]").forEach(button => {
        button.onclick = event => {
            event.stopPropagation();

            const component = components.find(
                item => item.id === Number(button.dataset.borrow)
            );

            if (!component) return;

            requests.push(component);

            toast(
                component.name + " request submitted successfully!"
            );

            go("requests");
        };
    });

    const search = $("#componentSearch");

    if (search) {
        search.oninput = filterComponents;
    }

    const category = $("#categoryFilter");

    if (category) {
        category.onchange = filterComponents;
    }

    const dashboardSearch = $("#dashboardSearch");
    const dashboardSearchButton = $("#dashboardSearchButton");

    function openSearchResults() {
        const searchValue = dashboardSearch.value.trim();

        go("explore");

        const componentSearch = $("#componentSearch");

        if (componentSearch) {
            componentSearch.value = searchValue;
            filterComponents();
        }
    }

    if (dashboardSearch) {
        dashboardSearch.onkeydown = event => {
            if (event.key === "Enter") {
                event.preventDefault();
                openSearchResults();
            }
        };
    }

    if (dashboardSearchButton) {
        dashboardSearchButton.onclick = openSearchResults;
    }

    const historySearch = $("#historySearch");

    if (historySearch) {
        historySearch.oninput = filterHistory;
    }

    const historyFilter = $("#historyFilter");

    if (historyFilter) {
        historyFilter.onchange = filterHistory;
    }
}


// SEARCH COMPONENTS

function filterComponents() {
    const searchElement = $("#componentSearch");
    const categoryElement = $("#categoryFilter");
    const catalog = $("#catalog");

    if (!searchElement || !categoryElement || !catalog) return;

    const search = searchElement.value.toLowerCase();
    const category = categoryElement.value;

    const filtered = components.filter(component => {
        const matchesSearch =
            component.name.toLowerCase().includes(search) ||
            component.type.toLowerCase().includes(search);

        const matchesCategory =
            category === "all" ||
            component.type === category;

        return matchesSearch && matchesCategory;
    });

    catalog.innerHTML = filtered.length
        ? filtered.map(componentCard).join("")
        : "<p>No components found.</p>";

    wirePage();
}


// SEARCH HISTORY

function filterHistory() {
    const searchElement = $("#historySearch");
    const filterElement = $("#historyFilter");

    if (!searchElement || !filterElement) return;

    const search = searchElement.value.toLowerCase();
    const status = filterElement.value;

    document.querySelectorAll("#historyTable tbody tr").forEach(row => {
        const matchesSearch =
            row.textContent.toLowerCase().includes(search);

        const matchesStatus =
            status === "all" ||
            row.textContent.includes(status);

        row.style.display =
            matchesSearch && matchesStatus ? "" : "none";
    });
}


// TOAST MESSAGE

function toast(message) {
    const element = $("#toast");

    element.textContent = message;
    element.classList.add("show");

    setTimeout(() => {
        element.classList.remove("show");
    }, 2500);
}


// Initial render is performed at the end, after all page data and role variables are initialized.

/* =========================================================
   PROJECT DNA - ADDITIONAL STUDENT + ADMIN FRONTEND PAGES
   Frontend demo only: data is stored in browser memory.
   ========================================================= */

let activeRole = "student";
let profileData = { name: "Alex Kim", email: "alex@college.edu", studentId: "STU2026", department: "Computer Science", year: "2nd Year" };
let notices = [
    { title: "Welcome to Project DNA", detail: "Explore the component library and find parts for your next build.", time: "Just now", unread: true },
    { title: "Lab reminder", detail: "Remember to update your component usage after completing a project.", time: "Today", unread: true }
];
let usageRecords = [
    { component: "Arduino Uno R3", project: "Smart irrigation", date: "Oct 31, 2026", status: "Returned" },
    { component: "Ultrasonic Sensor HC-SR04", project: "Obstacle avoiding bot", date: "Oct 25, 2026", status: "Returned" },
    { component: "DC Motor", project: "Line-following robot", date: "Oct 18, 2026", status: "Borrowed" }
];
let adminRequests = [
    { id: 101, student: "Alex Kim", studentId: "STU2026", componentId: 1, project: "Smart irrigation", purpose: "Prototype development", date: "Nov 02, 2026", due: "Nov 09, 2026", status: "Pending" },
    { id: 102, student: "Maya Rao", studentId: "STU2024", componentId: 3, project: "Obstacle avoiding bot", purpose: "Sensor testing", date: "Nov 01, 2026", due: "Nov 08, 2026", status: "Approved" }
];
let users = [
    { name: "Alex Kim", id: "STU2026", email: "alex@college.edu", role: "Student", department: "Computer Science", status: "Active" },
    { name: "Maya Rao", id: "STU2024", email: "maya@college.edu", role: "Student", department: "Electronics", status: "Active" },
    { name: "Lab Staff", id: "LAB001", email: "lab@college.edu", role: "Admin", department: "Central Lab", status: "Active" }
];
let editingComponentId = null;

const studentNav = [
    ["dashboard", "Dashboard"], ["explore", "Explore Components"],
    ["smartFinder", "Smart Component Finder"], ["requests", "My Requests"],
    ["history", "Usage History"], ["notifications", "Notifications"], ["profile", "My Profile"]
];
const adminNav = [
    ["adminDashboard", "Dashboard"], ["manageComponents", "Manage Components"],
    ["manageRequests", "Borrowing Requests"], ["adminHistory", "Usage History"],
    ["manageUsers", "Manage Users"], ["notifications", "Notifications"], ["profile", "Profile"]
];

function setNavigation() {
    const nav = $("#mainNav");
    if (!nav) return;
    const links = activeRole === "admin" ? adminNav : studentNav;
    nav.innerHTML = links.map(([page, label]) =>
        `<button data-page="${page}" class="nav-link ${currentPage === page ? "active" : ""}">${label}</button>`
    ).join("");
}

function go(page) {
    currentPage = page;
    setNavigation();
    render();
    document.querySelectorAll(".nav-link").forEach(button => {
        button.classList.toggle("active", button.dataset.page === page);
    });
    window.scrollTo({ top: 0, behavior: "smooth" });
}

function pageHead(title, description) {
    return `<div class="page-head"><div><span class="eyebrow">PROJECT DNA / ${activeRole === "admin" ? "LAB MANAGEMENT" : "COMPONENT LIBRARY"}</span><h2>${title}</h2><p>${description}</p></div></div>`;
}

function statusPill(status) {
    const cls = String(status).toLowerCase().replace(/\s+/g, "-");
    return `<span class="status status-${cls}">${status}</span>`;
}

function smartFinderPage() {
    return `${pageHead("Smart Component Finder", "Identify an engineering component by name or image and explore what you can build with it.")}
      <section class="finder-panel finder-panel-new">
        <div class="finder-icon">✳</div>
        <h3>What component do you want to know about?</h3>
        <p class="muted">Enter its name or upload a clear photo. The AI will identify it and explain its uses.</p>
        <label class="finder-label" for="finderComponentName">Component name</label>
        <input id="finderComponentName" class="finder-name-input" type="text" placeholder="e.g. Arduino Uno, LDR sensor, motor driver">
        <div class="finder-or"><span>OR</span></div>
        <div class="finder-upload" id="finderDropArea">
          <input id="finderImageInput" type="file" accept="image/*" hidden>
          <div id="finderImagePlaceholder"><span class="upload-symbol">↑</span><strong>Upload component image</strong><small>Click to choose an image (JPG, PNG, WEBP)</small></div>
          <img id="finderImagePreview" class="finder-image-preview" alt="Selected component preview" hidden>
          <button type="button" class="text-btn" id="removeFinderImage" hidden>Remove image</button>
        </div>
        <div class="finder-actions"><button class="primary-btn" id="analyzeComponent">✦ Analyse Component</button><span class="muted small">Use a name, an image, or both.</span></div>
        <p class="finder-error" id="finderError" role="alert" hidden></p>
      </section>
      <section id="finderResults" class="finder-results" aria-live="polite">
        <div class="empty-state"><span>✧</span><h3>Your component analysis will appear here</h3><p>Submit a component name or image to get started.</p></div>
      </section>`;
}

function renderFinderResult(result, sourceImage) {
    const safe = value => String(value || "").replace(/[&<>\"]/g, ch => ({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[ch]));
    const list = value => Array.isArray(value) ? value : (value ? [value] : []);
    const name = result.name || result.component_name || "Component not identified";
    const category = result.category || result.sector || result.type || "Not specified";
    const description = result.description || "No description was returned.";
    const applications = list(result.applications || result.sectors);
    const projects = list(result.project_ideas || result.possible_projects || result.projects);
    const confidence = result.confidence ? `<span class="finder-confidence">Confidence: ${safe(result.confidence)}</span>` : "";
    const image = result.image_url || sourceImage;
    return `<article class="finder-result-card">
      <div class="finder-result-top">${image ? `<img src="${image}" alt="Analysed component">` : `<div class="finder-result-placeholder">✳</div>`}
        <div><span class="eyebrow">AI COMPONENT ANALYSIS</span><h3>${safe(name)}</h3><span class="finder-category">${safe(category)}</span>${confidence}</div>
      </div>
      <div class="finder-result-section"><h4>About this component</h4><p>${safe(description)}</p></div>
      <div class="finder-result-columns">
        <section class="finder-result-section"><h4>Sectors & applications</h4>${applications.length ? `<ul>${applications.map(x=>`<li>${safe(x)}</li>`).join("")}</ul>` : `<p class="muted">No applications provided.</p>`}</section>
        <section class="finder-result-section"><h4>Project ideas</h4>${projects.length ? `<ol>${projects.map(x=>`<li>${safe(x)}</li>`).join("")}</ol>` : `<p class="muted">No project ideas provided.</p>`}</section>
      </div>
      ${result.notes ? `<p class="finder-note">${safe(result.notes)}</p>` : ""}
    </article>`;
}

function demoIdentifyComponent(name) {
    const q = name.toLowerCase();
    const match = components.find(c => c.name.toLowerCase() === q || c.name.toLowerCase().includes(q) || q.includes(c.name.toLowerCase()));
    if (!match) return null;
    const info = {
      "Arduino Uno R3": {category:"Microcontroller board",description:"A programmable development board based on the ATmega328P microcontroller. It reads inputs from sensors and controls outputs such as motors, LEDs and displays.",applications:["Embedded systems","Robotics","Internet of Things (IoT)","Automation and prototyping"],project_ideas:["Obstacle-avoiding robot","Smart irrigation system","Home automation","Automatic street light"]},
      "Raspberry Pi": {category:"Single-board computer",description:"A small computer that can run an operating system and software, connect to peripherals and support hardware projects through its GPIO pins.",applications:["IoT","Computing and networking","Robotics","Computer vision"],project_ideas:["Smart surveillance system","IoT weather station","Face-recognition attendance prototype","Mini web server"]},
      "Ultrasonic Sensor HC-SR04": {category:"Distance sensor",description:"An ultrasonic module that estimates distance by sending a sound pulse and measuring the time taken for its echo to return.",applications:["Robotics","Automation","Smart vehicles","Obstacle detection"],project_ideas:["Obstacle-avoiding robot","Smart parking system","Automatic dustbin","Distance measurement device"]},
      "DC Motor": {category:"Actuator / Motor",description:"An electric motor that converts direct-current electrical energy into rotational motion.",applications:["Robotics","Electromechanical systems","Automation","Small vehicles"],project_ideas:["Bluetooth-controlled car","Line-following robot","Mini conveyor belt","Automated door prototype"]},
      "Servo Motor": {category:"Actuator / Motor",description:"A motor with position feedback that can be commanded to move to a specific angle within its operating range.",applications:["Robotics","Automation","Mechatronics","Control systems"],project_ideas:["Robotic arm","Automatic lid opener","Solar panel tracker","Pan-and-tilt camera mount"]},
      "Breadboard": {category:"Prototyping platform",description:"A reusable board that lets you build and test electronic circuits without soldering components together.",applications:["Electronics prototyping","Circuit design","Embedded systems education"],project_ideas:["LED and resistor circuits","Sensor testing setup","555 timer circuit","Arduino prototype circuit"]},
      "Jumper Wires": {category:"Circuit connection accessory",description:"Insulated wires with connector ends used to make temporary electrical connections between boards and electronic components.",applications:["Electronics prototyping","Arduino projects","Robotics","Circuit testing"],project_ideas:["Sensor-to-Arduino connection setup","Breadboard LED circuit","Robotics controller wiring"]}
    };
    return {name:match.name,...(info[match.name] || {category:match.type,description:match.description,applications:[match.type,"Electronics prototyping"],project_ideas:[match.project]}) ,notes:"Demo result from the sample component catalogue. Connect the FastAPI AI endpoint for real text and image analysis."};
}

async function analyzeFinderComponent() {
    const name = $("#finderComponentName")?.value.trim() || "";
    const file = $("#finderImageInput")?.files?.[0];
    const error = $("#finderError"), results = $("#finderResults"), button = $("#analyzeComponent");
    if (error) { error.hidden = true; error.textContent = ""; }
    if (!name && !file) { if(error){error.textContent="Enter a component name or upload an image.";error.hidden=false;} return; }
    button.disabled = true; button.textContent = "Analysing…";
    results.innerHTML = `<div class="empty-state"><h3>Analysing your component…</h3><p>Identifying the component and preparing its applications and project ideas.</p></div>`;
    let preview = "";
    if (file) preview = await new Promise(resolve => { const reader=new FileReader(); reader.onload=()=>resolve(reader.result); reader.onerror=()=>resolve(""); reader.readAsDataURL(file); });
    try {
      const form = new FormData();
      if (name) form.append("component_name", name);
      if (file) form.append("image", file);
      const response = await fetch("/api/smart-finder/analyze", {method:"POST",body:form});
      if (!response.ok) throw new Error(`AI service returned ${response.status}`);
      const result = await response.json();
      results.innerHTML = renderFinderResult(result, preview);
    } catch (err) {
      // Keep the UI testable before the FastAPI service is connected; do not pretend this is a real AI result.
      const demo = !file && name ? demoIdentifyComponent(name) : null;
      if (demo) results.innerHTML = renderFinderResult(demo, preview);
      else results.innerHTML = `<div class="finder-connection-message"><strong>AI analysis service is not connected yet.</strong><p>The screen is ready, but image recognition and AI analysis require the FastAPI endpoint <code>/api/smart-finder/analyze</code>.${file ? " Image analysis cannot be simulated reliably in the browser." : " Try a sample component name such as Arduino Uno R3 to preview the result layout."}</p></div>`;
    } finally { button.disabled=false; button.textContent="✦ Analyse Component"; }
}

function profilePage() {
    return `${pageHead("My Profile", "Manage your account information.")}
      <div class="profile-layout"><div class="profile-avatar-large">${(profileData.name || "U").charAt(0).toUpperCase()}</div>
      <form id="profileForm" class="form-card"><h3>Personal information</h3>
        <label>Full name<input id="profileName" value="${profileData.name}" required></label>
        <label>College email<input id="profileEmail" type="email" value="${profileData.email}" required></label>
        <label>${activeRole === "admin" ? "Staff ID" : "Student ID"}<input value="${profileData.studentId}" disabled></label>
        <label>Department<input id="profileDepartment" value="${profileData.department}"></label>
        ${activeRole === "student" ? `<label>Year of study<input id="profileYear" value="${profileData.year}"></label>` : ""}
        <button class="primary-btn" type="submit">Save Changes</button>
      </form></div>`;
}

function notificationsPage() {
    return `${pageHead("Notifications", "Updates about requests, returns and the component library.")}
      <div class="notification-list">${notices.map((n,i)=>`<article class="notification-item ${n.unread ? "unread" : ""}"><span class="notification-dot"></span><div><strong>${n.title}</strong><p>${n.detail}</p><small>${n.time}</small></div><button class="text-btn" data-read="${i}">${n.unread ? "Mark read" : "Read"}</button></article>`).join("") || `<div class="empty-state">You're all caught up.</div>`}</div>`;
}

function adminDashboard() {
    const available = components.reduce((sum,c)=>sum+c.stock,0);
    const pending = adminRequests.filter(r=>r.status==="Pending").length;
    return `${pageHead("Lab Overview", "Manage the component library and keep student projects moving.")}
      <div class="stats">
        <div class="stat"><span class="label">Component Types</span><strong>${components.length}</strong><small>Registered in inventory</small></div>
        <div class="stat"><span class="label">Available Units</span><strong>${available}</strong><small>Across all components</small></div>
        <div class="stat"><span class="label">Borrowing Requests</span><strong>${adminRequests.length}</strong><small>All request statuses</small></div>
        <div class="stat"><span class="label">Pending Approval</span><strong>${pending}</strong><small>Needs your attention</small></div>
      </div>
      <div class="dashboard-grid"><section><div class="section-title"><h3>Recent borrowing requests</h3><button data-page="manageRequests">View all →</button></div>${adminRequestTable(adminRequests.slice(0,4))}</section>
      <aside class="side-card"><h3>Quick actions</h3>${quickAction("+","Add a component","Register a new inventory item","addComponent")}${quickAction("▤","Manage inventory","Update stock and locations","manageComponents")}${quickAction("✓","Review requests","Approve or reject requests","manageRequests")}</aside></div>`;
}

function adminRequestTable(items) {
    return `<div class="table-wrap"><table class="data-table"><thead><tr><th>STUDENT</th><th>COMPONENT</th><th>PROJECT</th><th>STATUS</th></tr></thead><tbody>${items.map(r=>{const c=components.find(x=>x.id===r.componentId)||{};return `<tr><td><strong>${r.student}</strong><br><small>${r.studentId}</small></td><td>${c.name||"Component"}</td><td>${r.project}</td><td>${statusPill(r.status)}</td></tr>`}).join("")}</tbody></table></div>`;
}

function manageComponentsPage() {
    return `${pageHead("Manage Components", "Browse the inventory, view component photos, and update stock details.")}
      <div class="toolbar"><input id="adminComponentSearch" placeholder="Search by component name or ID"><select id="adminStockFilter"><option value="all">All availability</option><option value="available">Available</option><option value="out">Out of stock</option></select><button class="primary-btn" data-page="addComponent">+ Add Component</button></div>
      <div class="inventory-grid" id="adminComponentRows">${components.map(adminComponentRow).join("")}</div>`;
}

function adminComponentRow(c) {
    return `<article class="inventory-card" data-component-row="${c.id}">
      <div class="inventory-photo-wrap"><span class="inventory-number">COMPONENT / ${String(c.id).padStart(2,"0")}</span><img class="inventory-photo" src="${c.image || "https://placehold.co/600x400?text=Component"}" alt="${c.name}" onerror="this.src='https://placehold.co/600x400?text=Image+Unavailable'"></div>
      <div class="inventory-card-body"><h3>${c.name}</h3><p>${c.type} · ${c.stock} available</p><span class="inventory-status ${c.stock > 0 ? "in-stock" : "out-stock"}">${c.stock > 0 ? "Available" : "Out of stock"}</span>
        <div class="inventory-card-actions"><span class="inventory-location">${c.location || "Central Lab · Shelf A"}</span><div><button class="small-btn" data-edit-component="${c.id}">Edit</button> <button class="small-btn danger-btn" data-delete-component="${c.id}">Remove</button></div></div>
      </div></article>`;
}

function componentFormPage() {
    const c = components.find(x=>x.id===editingComponentId);
    return `${pageHead(c ? "Edit Component" : "Add Component", "Keep the inventory information accurate and easy to find.")}
      <form id="componentForm" class="form-card wide-form">
        <div class="form-grid">
          <label>Component name<input id="newName" value="${c?.name||""}" required></label>
          <label>Category<select id="newType"><option ${c?.type==="Microcontroller"?"selected":""}>Microcontroller</option><option ${c?.type==="Sensor"?"selected":""}>Sensor</option><option ${c?.type==="Motor"?"selected":""}>Motor</option><option>Prototyping</option><option>Connection</option><option>Single-board computer</option><option>Power Supply</option></select></label>
          <label>Available quantity<input id="newStock" type="number" min="0" value="${c?.stock??1}" required></label>
          <label>Storage location<input id="newLocation" value="${c?.location||"Central Lab · Shelf A"}"></label>
          <div class="full-field image-upload-field"><label for="newImageFile">Component image</label>
            <div class="image-upload-layout"><div class="image-preview-box"><img id="componentImagePreview" src="${c?.image||"https://placehold.co/500x350?text=Component+Preview"}" alt="Component image preview"></div>
              <div class="image-upload-controls"><input id="newImageFile" type="file" accept="image/*"><small>Choose a photo from your device (JPG, PNG, WEBP). A clear image helps students identify the component.</small>
                <label class="image-url-label">Or paste an image URL<input id="newImage" type="url" value="${c?.image && !c.image.startsWith("data:") ? c.image : ""}" placeholder="https://..."></label></div></div>
          </div>
          <label class="full-field">Description<textarea id="newDescription" rows="3">${c?.description||""}</textarea></label>
          <label class="full-field">Typical project use<input id="newProject" value="${c?.project||""}"></label>
        </div>
        <div class="form-actions"><button type="button" class="secondary-btn" data-page="manageComponents">Cancel</button><button class="primary-btn" type="submit">Save Component</button></div>
      </form>`;
}

function manageRequestsPage() {
    return `${pageHead("Borrowing Requests", "Review student requests and update component issue and return status.")}
      <div class="toolbar"><select id="requestStatusFilter"><option value="all">All statuses</option><option>Pending</option><option>Approved</option><option>Rejected</option><option>Issued</option><option>Returned</option></select></div>
      <div id="adminRequestList">${adminRequests.length ? adminRequests.map(r=>{const c=components.find(x=>x.id===r.componentId)||{};return `<article class="admin-request-card"><div><span class="eyebrow">REQUEST #${r.id}</span><h3>${c.name||"Component"}</h3><p>${r.student} · ${r.studentId} · ${r.project}</p><p class="muted">${r.purpose} · Requested ${r.date} · Due ${r.due}</p></div><div class="request-controls">${statusPill(r.status)}<div>${r.status==="Pending"?`<button class="small-btn approve-btn" data-request-action="Approved" data-request-id="${r.id}">Approve</button><button class="small-btn danger-btn" data-request-action="Rejected" data-request-id="${r.id}">Reject</button>`:""}${r.status==="Approved"?`<button class="small-btn approve-btn" data-request-action="Issued" data-request-id="${r.id}">Mark Issued</button>`:""}${r.status==="Issued"?`<button class="small-btn approve-btn" data-request-action="Returned" data-request-id="${r.id}">Mark Returned</button>`:""}</div></div></article>`}).join("") : `<div class="empty-state">No requests yet.</div>`}</div>`;
}

function adminHistoryPage() {
    const rows = usageRecords.map(r=>`<tr><td>${r.component}</td><td>${r.project}</td><td>${r.date}</td><td>${statusPill(r.status)}</td></tr>`).join("");
    return `${pageHead("Usage Records", "Review component usage across student projects.")}
      <div class="toolbar"><input id="adminHistorySearch" placeholder="Search component or project"></div>
      <div class="table-wrap"><table class="data-table"><thead><tr><th>COMPONENT</th><th>PROJECT</th><th>DATE</th><th>STATUS</th></tr></thead><tbody id="adminHistoryRows">${rows}</tbody></table></div>`;
}

function manageUsersPage() {
    return `${pageHead("Manage Users", "View student and staff accounts registered on Project DNA.")}
      <div class="toolbar"><input id="userSearch" placeholder="Search by name, ID or email"></div>
      <div class="table-wrap"><table class="data-table"><thead><tr><th>NAME</th><th>ID</th><th>EMAIL</th><th>DEPARTMENT</th><th>ROLE</th><th>STATUS</th></tr></thead><tbody id="userRows">${users.map(u=>`<tr><td><strong>${u.name}</strong></td><td>${u.id}</td><td>${u.email}</td><td>${u.department}</td><td>${u.role}</td><td>${statusPill(u.status)}</td></tr>`).join("")}</tbody></table></div>`;
}

function render() {
    const main = $("#mainContent");
    setNavigation();
    const pages = {
        dashboard, explore, detail, requests: requestsPage, history: historyPage,
        smartFinder: smartFinderPage, profile: profilePage, notifications: notificationsPage,
        adminDashboard, manageComponents: manageComponentsPage,
        addComponent: componentFormPage, editComponent: componentFormPage,
        manageRequests: manageRequestsPage, adminHistory: adminHistoryPage,
        manageUsers: manageUsersPage
    };
    main.innerHTML = (pages[currentPage] || (activeRole === "admin" ? adminDashboard : dashboard))();
    wirePage();
}

function wirePage() {
    document.querySelectorAll("[data-page]").forEach(el => {
        el.onclick = () => {
            if (el.dataset.page === "addComponent") editingComponentId = null;
            go(el.dataset.page);
        };
    });
    document.querySelectorAll("[data-open]").forEach(el => el.onclick = e => { e.stopPropagation(); selectedComponent = Number(el.dataset.open); go("detail"); });
    document.querySelectorAll("[data-borrow]").forEach(el => el.onclick = e => {
        e.stopPropagation();
        const c = components.find(x=>x.id===Number(el.dataset.borrow));
        if (!c) return;
        requests.push({...c, project:"Student project", status:"Pending"});
        adminRequests.push({id:Date.now(),student:profileData.name,studentId:profileData.studentId,componentId:c.id,project:"Student project",purpose:"Project development",date:new Date().toLocaleDateString(),due:"To be confirmed",status:"Pending"});
        notices.unshift({title:"Borrowing request submitted",detail:`Your request for ${c.name} is pending lab approval.`,time:"Just now",unread:true});
        toast(`${c.name} request submitted successfully!`);
        go("requests");
    });
    const search = $("#componentSearch"); if (search) search.oninput = filterComponents;
    const cat = $("#categoryFilter"); if (cat) cat.onchange = filterComponents;
    const ds = $("#dashboardSearch"), db = $("#dashboardSearchButton");
    const openSearch = () => { const value=ds?.value.trim()||""; go("explore"); const input=$("#componentSearch"); if(input){input.value=value;filterComponents();} };
    if(ds) ds.onkeydown=e=>{if(e.key==="Enter"){e.preventDefault();openSearch();}};
    if(db) db.onclick=openSearch;
    const hs=$("#historySearch"); if(hs) hs.oninput=filterHistory;
    const hf=$("#historyFilter"); if(hf) hf.onchange=filterHistory;
    const analyzeButton=$("#analyzeComponent"); if(analyzeButton) analyzeButton.onclick=analyzeFinderComponent;
    const finderInput=$("#finderImageInput"), finderDrop=$("#finderDropArea"), finderPreview=$("#finderImagePreview"), finderPlaceholder=$("#finderImagePlaceholder"), removeFinderImage=$("#removeFinderImage");
    if(finderDrop && finderInput) finderDrop.onclick=e=>{if(e.target.closest("button"))return;finderInput.click();};
    if(finderInput) finderInput.onchange=()=>{const file=finderInput.files?.[0];if(!file)return;if(!file.type.startsWith("image/")){toast("Please choose an image file.");finderInput.value="";return;}const reader=new FileReader();reader.onload=()=>{finderPreview.src=reader.result;finderPreview.hidden=false;finderPlaceholder.hidden=true;removeFinderImage.hidden=false;};reader.readAsDataURL(file);};
    if(removeFinderImage) removeFinderImage.onclick=()=>{finderInput.value="";finderPreview.src="";finderPreview.hidden=true;finderPlaceholder.hidden=false;removeFinderImage.hidden=true;};
    const pf=$("#profileForm"); if(pf) pf.onsubmit=e=>{e.preventDefault();profileData.name=$("#profileName").value;profileData.email=$("#profileEmail").value;profileData.department=$("#profileDepartment").value;profileData.year=$("#profileYear")?.value||profileData.year;$("#userName").textContent=profileData.name;toast("Profile updated.");};
    document.querySelectorAll("[data-read]").forEach(b=>b.onclick=()=>{notices[Number(b.dataset.read)].unread=false;render();});
    const imageFileInput=$("#newImageFile"), imagePreview=$("#componentImagePreview"), imageUrlInput=$("#newImage");
    let selectedImageData = "";
    if(imageFileInput) imageFileInput.onchange=()=>{const file=imageFileInput.files?.[0];if(!file)return;if(!file.type.startsWith("image/")){toast("Please choose an image file.");imageFileInput.value="";return;}const reader=new FileReader();reader.onload=()=>{selectedImageData=reader.result;imagePreview.src=selectedImageData;if(imageUrlInput)imageUrlInput.value="";};reader.readAsDataURL(file);};
    if(imageUrlInput) imageUrlInput.oninput=()=>{if(imagePreview&&imageUrlInput.value.trim()){selectedImageData="";imagePreview.src=imageUrlInput.value.trim();}};
    const cf=$("#componentForm"); if(cf) cf.onsubmit=e=>{e.preventDefault();const save=image=>{const data={name:$("#newName").value,type:$("#newType").value,stock:Number($("#newStock").value),location:$("#newLocation").value,image:image||"https://placehold.co/600x400?text=Component",description:$("#newDescription").value,project:$("#newProject").value};if(editingComponentId){Object.assign(components.find(x=>x.id===editingComponentId),data);toast("Component updated.");}else{data.id=Math.max(0,...components.map(x=>x.id))+1;components.push(data);toast("Component added to inventory.");}editingComponentId=null;go("manageComponents");};const existing=components.find(x=>x.id===editingComponentId)?.image;save(selectedImageData||imageUrlInput?.value.trim()||existing||"");};
    document.querySelectorAll("[data-edit-component]").forEach(b=>b.onclick=()=>{editingComponentId=Number(b.dataset.editComponent);go("editComponent");});
    document.querySelectorAll("[data-delete-component]").forEach(b=>b.onclick=()=>{const id=Number(b.dataset.deleteComponent);const i=components.findIndex(c=>c.id===id);if(i>=0){components.splice(i,1);toast("Component removed.");render();}});
    const acs=$("#adminComponentSearch"), asf=$("#adminStockFilter");
    const filterAdminComponents=()=>{const q=(acs?.value||"").toLowerCase(),f=asf?.value||"all";document.querySelectorAll("[data-component-row]").forEach(row=>{const c=components.find(x=>x.id===Number(row.dataset.componentRow));row.style.display=c && (c.name.toLowerCase().includes(q)||String(c.id).includes(q)) && (f==="all"||(f==="available"&&c.stock>0)||(f==="out"&&c.stock===0))?"":"none";});};
    if(acs) acs.oninput=filterAdminComponents;if(asf) asf.onchange=filterAdminComponents;
    document.querySelectorAll("[data-request-action]").forEach(b=>b.onclick=()=>{const r=adminRequests.find(x=>x.id===Number(b.dataset.requestId));if(r){r.status=b.dataset.requestAction;const c=components.find(x=>x.id===r.componentId);if(r.status==="Issued"&&c)c.stock=Math.max(0,c.stock-1);if(r.status==="Returned"&&c)c.stock+=1;notices.unshift({title:`Request ${r.status.toLowerCase()}`,detail:`${c?.name||"Component"} request for ${r.student} is now ${r.status.toLowerCase()}.`,time:"Just now",unread:true});toast(`Request marked ${r.status.toLowerCase()}.`);render();}});
    const rsf=$("#requestStatusFilter");if(rsf)rsf.onchange=()=>{document.querySelectorAll(".admin-request-card").forEach(card=>{card.style.display=rsf.value==="all"||card.textContent.includes(rsf.value)?"":"none";});};
    const ahs=$("#adminHistorySearch");if(ahs)ahs.oninput=()=>document.querySelectorAll("#adminHistoryRows tr").forEach(row=>row.style.display=row.textContent.toLowerCase().includes(ahs.value.toLowerCase())?"":"none");
    const us=$("#userSearch");if(us)us.oninput=()=>document.querySelectorAll("#userRows tr").forEach(row=>row.style.display=row.textContent.toLowerCase().includes(us.value.toLowerCase())?"":"none");
}

$("#loginForm").addEventListener("submit", function () {
    activeRole = $("#userRole")?.value || "student";
    currentPage = activeRole === "admin" ? "adminDashboard" : "dashboard";
    setTimeout(() => {
        $("#userName").textContent = activeRole === "admin" ? "Lab Staff" : profileData.name;
        $(".avatar").textContent = (activeRole === "admin" ? "L" : profileData.name.charAt(0)).toUpperCase();
        go(currentPage);
    }, 0);
});

$("#logoutBtn").addEventListener("click", function () {
    activeRole = "student";
    currentPage = "dashboard";
    setNavigation();
});

render();
