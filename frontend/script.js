"use strict";

const today = new Date().toISOString().slice(0, 10);

const schema = {
    patients: {
        title: "Patients",
        singular: "patient",
        fields: [
            ["name", "Full name", "text", 1],
            ["gender", "Gender", "select", 1, ["Female", "Male"]],
            ["dob", "Date of birth", "date", 1],
            ["phone", "Phone number", "tel", 1],
            ["address", "Address", "text", 1],
            ["blood", "Blood group", "select", 0,
                ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"]]
        ]
    },

    doctors: {
        title: "Doctors",
        singular: "doctor",
        fields: [
            ["name", "Doctor name", "text", 1],
            ["specialty", "Specialization", "text", 1],
            ["phone", "Phone number", "tel", 1],
            ["email", "Email", "email", 1],
            ["departmentId", "Department", "ref:departments", 1]
        ]
    },

    departments: {
        title: "Departments",
        singular: "department",
        fields: [
            ["name", "Department name", "text", 1],
            ["location", "Location", "text", 1]
        ]
    },

    appointments: {
        title: "Appointments",
        singular: "appointment",
        fields: [
            ["patientId", "Patient", "ref:patients", 1],
            ["doctorId", "Doctor", "ref:doctors", 1],
            ["date", "Appointment date", "date", 1],
            ["time", "Appointment time", "time", 1],
            ["status", "Status", "select", 1,
                ["Scheduled", "Completed", "Cancelled"]]
        ]
    },

    prescriptions: {
        title: "Prescriptions",
        singular: "prescription",
        fields: [
            ["patientId", "Patient", "ref:patients", 1],
            ["doctorId", "Doctor", "ref:doctors", 1],
            ["date", "Prescription date", "date", 1]
        ]
    },

    medicines: {
        title: "Medicines",
        singular: "medicine",
        fields: [
            ["name", "Medicine name", "text", 1],
            ["quantity", "Quantity", "number", 1],
            ["price", "Unit price (AFN)", "number", 1],
            ["expiry", "Expiry date", "date", 1]
        ]
    },

    prescriptionMedicines: {
        title: "Prescription Medicines",
        singular: "prescription medicine",
        fields: [
            ["prescriptionId", "Prescription", "ref:prescriptions", 1],
            ["medicineId", "Medicine", "ref:medicines", 1],
            ["quantity", "Quantity prescribed", "number", 1],
            ["instructions", "Instructions / dosage", "text", 0]
        ]
    },

    payments: {
        title: "Payments",
        singular: "payment",
        fields: [
            ["patientId", "Patient", "ref:patients", 1],
            ["amount", "Amount (AFN)", "number", 1],
            ["date", "Payment date", "date", 1],
            ["method", "Payment method", "select", 1, ["Cash", "Card", "Bank Transfer"]],
            ["status", "Payment status", "select", 1,
                ["Paid", "Pending"]]
        ]
    },

    expenses: {
        title: "Expenses",
        singular: "expense",
        fields: [
            ["category", "Expense category", "select", 1, [
                "Staff Salaries", "Medicine Purchases", "Medical Supplies",
                "Electricity", "Water", "Internet and Telephone",
                "Hospital Rent", "Equipment Purchase",
                "Equipment Maintenance", "Building Maintenance",
                "Cleaning Services", "Transportation", "Office Supplies",
                "Food and Kitchen Expenses", "Security Services", "Other"
            ]],
            ["description", "Description", "text", 1],
            ["amount", "Amount (AFN)", "number", 1],
            ["date", "Expense date", "date", 1],
            ["method", "Payment method", "select", 1,
                ["Cash", "Card", "Bank transfer"]],
            ["status", "Payment status", "select", 1,
                ["Paid", "Pending", "Failed"]],
            ["userId", "Recorded by user", "ref:users", 1]
        ]
    },

    users: {
        title: "Staff & Users",
        singular: "user",
        fields: [
            ["username", "Username", "text", 1],
            ["role", "Role", "select", 1,
                ["Admin", "Receptionist", "Doctor"]]
        ]
    }
};

const seed = {
    patients: [
        {id:1,name:"Amina Rahimi",gender:"Female",dob:"1998-04-12",phone:"0700 123 456",address:"Kandahar",blood:"O+"},
        {id:2,name:"Farid Ahmad",gender:"Male",dob:"1985-09-23",phone:"0701 234 567",address:"Kandahar",blood:"A+"},
        {id:3,name:"Laila Safi",gender:"Female",dob:"2002-01-08",phone:"0702 345 678",address:"Spin Boldak",blood:"B+"}
    ],

    departments: [
        {id:1,name:"Cardiology",location:"Block A · Floor 2"},
        {id:2,name:"Emergency",location:"Ground floor"},
        {id:3,name:"Pediatrics",location:"Block B · Floor 1"},
        {id:4,name:"General Medicine",location:"Block A · Floor 1"}
    ],

    doctors: [
        {id:1,name:"Ahmad Wali",specialty:"Cardiology",phone:"0703 111 222",email:"ahmad@example.com",departmentId:1},
        {id:2,name:"Maryam Azizi",specialty:"Emergency",phone:"0703 222 333",email:"maryam@example.com",departmentId:2},
        {id:3,name:"Omar Sediqi",specialty:"Pediatrics",phone:"0703 333 444",email:"omar@example.com",departmentId:3}
    ],

    appointments: [
        {id:1,patientId:1,doctorId:1,date:today,time:"09:00",status:"Scheduled"},
        {id:2,patientId:2,doctorId:2,date:today,time:"10:30",status:"Scheduled"},
        {id:3,patientId:3,doctorId:3,date:today,time:"11:00",status:"Completed"},
        {id:4,patientId:1,doctorId:2,date:today,time:"14:00",status:"Cancelled"}
    ],

    prescriptions: [
        {id:1,patientId:1,doctorId:1,date:today},
        {id:2,patientId:2,doctorId:2,date:today}
    ],

    medicines: [
        {id:1,name:"Paracetamol 500mg",quantity:240,price:2.5,expiry:"2027-06-30"},
        {id:2,name:"Amoxicillin 250mg",quantity:85,price:8,expiry:"2027-03-31"},
        {id:3,name:"Ibuprofen 200mg",quantity:120,price:4,expiry:"2027-01-15"},
        {id:4,name:"Oral Rehydration Salts",quantity:18,price:3,expiry:"2027-08-30"}
    ],

    prescriptionMedicines: [
        {id:1,prescriptionId:1,medicineId:1,quantity:2,instructions:"Take as directed by doctor"}
    ],

    payments: [
        {id:1,patientId:1,amount:1500,date:today,method:"Cash",status:"Paid"},
        {id:2,patientId:2,amount:2200,date:today,method:"Card",status:"Paid"},
        {id:3,patientId:3,amount:800,date:today,method:"Cash",status:"Pending"}
    ],

    users: [
        {id:1,username:"admin",role:"Admin"},
        {id:2,username:"reception01",role:"Receptionist"},
        {id:3,username:"doctor01",role:"Doctor"}
    ],

    expenses: [
        {id:1,category:"Medical Supplies",description:"Bandages and gloves",amount:4500,date:today,method:"Cash",status:"Paid",userId:1}
    ]
};

const storeKey = "novax_hospital_records_v2";

let db = {};
let currentPage = "dashboard";
let editing = null;

const $ = id => document.getElementById(id);

const esc = value =>
    String(value ?? "—").replace(/[&<>"']/g, char => ({
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
        "'": "&#39;"
    })[char]);

const fmt = value =>
    Number(value || 0).toLocaleString("en-US", {
        maximumFractionDigits: 2
    });

function loadData() {
    try {
        const saved = JSON.parse(
            localStorage.getItem(storeKey) || "null"
        );

        Object.keys(schema).forEach(key => {
            db[key] = saved && Array.isArray(saved[key])
                ? saved[key]
                : JSON.parse(JSON.stringify(seed[key] || []));
        });
    } catch (error) {
        Object.keys(schema).forEach(key => {
            db[key] = JSON.parse(JSON.stringify(seed[key] || []));
        });
    }
}

function save() {
    try {
        localStorage.setItem(storeKey, JSON.stringify(db));
        return true;
    } catch (error) {
        toast("Could not save. Check browser storage permissions.");
        return false;
    }
}

function get(bucket, id) {
    return (db[bucket] || []).find(
        item => Number(item.id) === Number(id)
    );
}

function refLabel(bucket, id) {
    const item = get(bucket, id);

    return item
        ? (item.name || item.username || ("ID " + id))
        : "Missing record";
}

function initials(value) {
    return String(value || "?")
        .split(/\s+/)
        .map(part => part[0])
        .slice(0, 2)
        .join("")
        .toUpperCase();
}

function person(name, subtitle) {
    return `
        <div class="person">
            <div class="personicon">${esc(initials(name))}</div>
            <div>${esc(name)}<small>${esc(subtitle)}</small></div>
        </div>`;
}

function statusPill(value) {
    const status = String(value || "");

    const type =
        /paid|completed|admin/i.test(status) ? "good" :
        /pending|scheduled|doctor|receptionist/i.test(status) ? "warn" :
        /cancel|failed/i.test(status) ? "bad" : "";

    return `<span class="pill ${type}">${esc(status)}</span>`;
}

function description(key) {
    return {
        patients: "Manage patient details and contact information.",
        doctors: "Manage doctors and their departments.",
        departments: "Manage hospital departments and locations.",
        appointments: "Manage appointments, dates and statuses.",
        prescriptions: "Manage prescriptions linked to patients and doctors.",
        medicines: "Manage medicine stock, prices and expiry dates.",
        prescriptionMedicines: "Link prescribed medicines to prescriptions.",
        payments: "Manage patient payments and payment status.",
        expenses: "Track hospital expenses and staff records.",
        users: "Manage staff usernames and roles."
    }[key];
}

function headers(key) {
    return {
        patients: ["Patient", "Patient ID", "Gender", "Date of birth", "Phone", "Blood group", "Address"],
        doctors: ["Doctor", "Doctor ID", "Specialization", "Department", "Phone", "Email"],
        departments: ["Department ID", "Department", "Location"],
        appointments: ["Appointment ID", "Patient", "Doctor", "Date", "Time", "Status"],
        prescriptions: ["Prescription ID", "Patient", "Doctor", "Date"],
        medicines: ["Medicine ID", "Medicine", "Quantity", "Unit price", "Expiry date", "Stock status"],
        prescriptionMedicines: ["Record ID", "Prescription ID", "Medicine", "Quantity", "Instructions"],
        payments: ["Payment ID", "Patient", "Amount (AFN)", "Date", "Method", "Status"],
        expenses: ["Expense ID", "Category", "Description", "Amount (AFN)", "Date", "Method", "Status", "Recorded by"],
        users: ["User ID", "Username", "Role", "Access"]
    }[key];
}

function buildPages() {
    $("dataPages").innerHTML = Object.entries(schema).map(([key, config]) => `
        <section class="page" id="page-${key}">
            <div class="intro">
                <div>
                    <div class="eyebrow">NovaX · Record management</div>
                    <h1>${config.title}</h1>
                    <p>${description(key)}</p>
                </div>
                <button class="btn primary" onclick="openForm('${key}')">
                    ＋ Add ${config.singular}
                </button>
            </div>

            <div class="panel tablepanel">
                <div class="panelhead">
                    <div>
                        <h2>${config.title} directory</h2>
                        <div class="sub">Create, view, edit, search and delete records</div>
                    </div>
                    <div class="tools">
                        <input class="input local-search"
                            data-table="${key}Table"
                            placeholder="Search ${config.title.toLowerCase()}...">
                    </div>
                </div>

                <div class="tablewrap">
                    <table>
                        <thead>
                            <tr>
                                ${headers(key).map(header => `<th>${header}</th>`).join("")}
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody id="${key}Table"></tbody>
                    </table>
                </div>
            </div>
        </section>
    `).join("");
}

function rowCells(key, item) {
    switch (key) {
        case "patients":
            return [
                person(item.name, "Patient record"),
                "PT-" + String(item.id).padStart(3, "0"),
                esc(item.gender),
                esc(item.dob),
                esc(item.phone),
                statusPill(item.blood || "Not set"),
                esc(item.address)
            ];

        case "doctors":
            return [
                person("Dr. " + item.name, item.email),
                "DR-" + String(item.id).padStart(3, "0"),
                esc(item.specialty),
                esc(refLabel("departments", item.departmentId)),
                esc(item.phone),
                esc(item.email)
            ];

        case "departments":
            return [
                "DP-" + String(item.id).padStart(3, "0"),
                esc(item.name),
                esc(item.location)
            ];

        case "appointments":
            return [
                "AP-" + String(item.id).padStart(3, "0"),
                esc(refLabel("patients", item.patientId)),
                esc(refLabel("doctors", item.doctorId)),
                esc(item.date),
                esc(item.time),
                statusPill(item.status)
            ];

        case "prescriptions":
            return [
                "PR-" + String(item.id).padStart(3, "0"),
                esc(refLabel("patients", item.patientId)),
                esc(refLabel("doctors", item.doctorId)),
                esc(item.date)
            ];

        case "medicines":
            return [
                "MD-" + String(item.id).padStart(3, "0"),
                esc(item.name),
                fmt(item.quantity),
                fmt(item.price) + " AFN",
                esc(item.expiry),
                statusPill(Number(item.quantity) < 25 ? "Low stock" : "In stock")
            ];

        case "prescriptionMedicines":
            return [
                "PM-" + String(item.id).padStart(3, "0"),
                "PR-" + String(item.prescriptionId).padStart(3, "0"),
                esc(refLabel("medicines", item.medicineId)),
                fmt(item.quantity),
                esc(item.instructions || "—")
            ];

        case "payments":
            return [
                "PY-" + String(item.id).padStart(3, "0"),
                esc(refLabel("patients", item.patientId)),
                fmt(item.amount),
                esc(item.date),
                esc(item.method),
                statusPill(item.status)
            ];

        case "expenses":
            return [
                "EX-" + String(item.id).padStart(3, "0"),
                esc(item.category),
                esc(item.description),
                fmt(item.amount),
                esc(item.date),
                esc(item.method),
                statusPill(item.status),
                esc(refLabel("users", item.userId))
            ];

        case "users":
            return [
                "US-" + String(item.id).padStart(3, "0"),
                person(item.username, "Staff account"),
                statusPill(item.role),
                statusPill("Active")
            ];
    }

    return [];
}

function render() {
    Object.keys(schema).forEach(key => {
        const body = $(key + "Table");
        if (!body) return;

        body.innerHTML = db[key].map(item => `
            <tr>
                ${rowCells(key, item).map(value => `<td>${value ?? "—"}</td>`).join("")}
                <td>
                    <div style="display:flex;gap:6px">
                        <button class="btn small"
                            onclick="editRecord('${key}',${item.id})">✎ Edit</button>
                        <button class="btn danger small"
                            onclick="deleteRecord('${key}',${item.id})">Delete</button>
                    </div>
                </td>
            </tr>
        `).join("") || `
            <tr>
                <td class="empty" colspan="${headers(key).length + 1}">
                    No records yet. Add a new record to get started.
                </td>
            </tr>`;
    });

    $("sPatients").textContent = db.patients.length;
    $("sDoctors").textContent = db.doctors.length;
    $("sAppointments").textContent = db.appointments.length;
    $("sMedicines").textContent = db.medicines.length;

    const counts = {
        Scheduled: 0,
        Completed: 0,
        Cancelled: 0
    };

    db.appointments.forEach(appointment => {
        if (counts[appointment.status] !== undefined) {
            counts[appointment.status]++;
        }
    });

    $("apptTotal").textContent = db.appointments.length;
    $("cScheduled").textContent = counts.Scheduled;
    $("cCompleted").textContent = counts.Completed;
    $("cCancelled").textContent = counts.Cancelled;

    $("dashAppointments").innerHTML = db.appointments
        .slice()
        .sort((a, b) =>
            (a.date + a.time).localeCompare(b.date + b.time)
        )
        .slice(0, 5)
        .map(item => `
            <tr>
                <td>AP-${String(item.id).padStart(3, "0")}</td>
                <td>${person(refLabel("patients", item.patientId), "Patient record")}</td>
                <td>${esc(refLabel("doctors", item.doctorId))}</td>
                <td>${esc(item.date)} · ${esc(item.time)}</td>
                <td>${statusPill(item.status)}</td>
                <td>
                    <button class="btn small"
                        onclick="editRecord('appointments',${item.id})">Edit</button>
                    <button class="btn danger small"
                        onclick="deleteRecord('appointments',${item.id})">Delete</button>
                </td>
            </tr>
        `).join("") || `
            <tr><td colspan="6" class="empty">No appointments recorded.</td></tr>`;

    document.querySelectorAll(".local-search").forEach(filterTable);
}

function go(page) {
    currentPage = page;

    document.querySelectorAll(".page").forEach(section => {
        section.classList.toggle("active", section.id === "page-" + page);
    });

    document.querySelectorAll("#nav button").forEach(button => {
        button.classList.toggle("active", button.dataset.page === page);
    });

    $("crumb").textContent =
        page === "dashboard" ? "Dashboard" : page === "profile" ? "My Profile" : schema[page]?.title || page;

    $("globalSearch").value = "";

    if (page === "profile") {
        const user = getCurrentAuthUser();
        if (user) populateProfile(user);
    }

    window.scrollTo({ top: 0, behavior: "smooth" });
}

$("nav").addEventListener("click", event => {
    const button = event.target.closest("[data-page]");
    if (button) go(button.dataset.page);
});

function filterTable(input) {
    if (!input) return;

    const body = $(input.dataset.table);
    if (!body) return;

    const query = input.value.toLowerCase();

    [...body.rows].forEach(row => {
        row.style.display =
            row.innerText.toLowerCase().includes(query) ? "" : "none";
    });
}

document.addEventListener("input", event => {
    if (event.target.matches(".local-search")) {
        filterTable(event.target);
    }
});

$("globalSearch").addEventListener("input", event => {
    const input = document.querySelector(
        "#page-" + currentPage + " .local-search"
    );

    if (input) {
        input.value = event.target.value;
        filterTable(input);
    } else if (currentPage === "dashboard") {
        [...$("dashAppointments").rows].forEach(row => {
            row.style.display = row.innerText.toLowerCase()
                .includes(event.target.value.toLowerCase()) ? "" : "none";
        });
    }
});

function optionsFor(bucket) {
    return (db[bucket] || []).map(item => ({
        value: item.id,
        label: (item.name || item.username || schema[bucket].singular)
            + " (#" + item.id + ")"
    }));
}

function openForm(key, id = null) {
    editing = id === null ? null : { key, id };

    const config = schema[key];
    if (!config) return;

    $("modalTitle").textContent =
        (id === null ? "Create " : "Update ") + config.singular;

    $("fields").innerHTML = config.fields.map(field => {
        const [name, label, type, required, options] = field;
        const value = id === null ? "" : (get(key, id)?.[name] ?? "");
        let control;

        if (type.startsWith("ref:")) {
            const bucket = type.slice(4);

            control = `
                <select class="input" name="${name}" ${required ? "required" : ""}>
                    <option value="">Choose ${label.toLowerCase()}...</option>
                    ${optionsFor(bucket).map(option => `
                        <option value="${option.value}"
                            ${String(value) === String(option.value) ? "selected" : ""}>
                            ${esc(option.label)}
                        </option>
                    `).join("")}
                </select>`;
        } else if (type === "select") {
            control = `
                <select class="input" name="${name}" ${required ? "required" : ""}>
                    <option value="">Choose...</option>
                    ${options.map(option => `
                        <option value="${esc(option)}"
                            ${String(value) === option ? "selected" : ""}>
                            ${esc(option)}
                        </option>
                    `).join("")}
                </select>`;
        } else {
            control = `
                <input class="input" name="${name}" type="${type}"
                    value="${esc(value)}"
                    ${type === "number" ? 'min="0" step="any"' : ""}
                    ${required ? "required" : ""}>`;
        }

        return `
            <div class="field">
                <label>${esc(label)}${required ? " *" : ""}</label>
                ${control}
            </div>`;
    }).join("");

    $("modal").classList.add("show");
}

function closeForm() {
    $("modal").classList.remove("show");
    editing = null;
}

function editRecord(key, id) {
    openForm(key, id);
}

function toast(message) {
    $("toast").textContent = message;
    $("toast").classList.add("show");

    clearTimeout(window.novaxToast);

    window.novaxToast = setTimeout(() => {
        $("toast").classList.remove("show");
    }, 2700);
}

const dependentLinks = {
    patients: [
        ["appointments", "patientId"],
        ["prescriptions", "patientId"],
        ["payments", "patientId"]
    ],
    doctors: [
        ["appointments", "doctorId"],
        ["prescriptions", "doctorId"]
    ],
    departments: [
        ["doctors", "departmentId"]
    ],
    prescriptions: [
        ["prescriptionMedicines", "prescriptionId"]
    ],
    medicines: [
        ["prescriptionMedicines", "medicineId"]
    ],
    users: [
        ["expenses", "userId"]
    ]
};

function collectDeleteTree(bucket, id, seen = new Set(), result = []) {
    const key = bucket + ":" + Number(id);

    if (seen.has(key)) return result;
    seen.add(key);

    (dependentLinks[bucket] || []).forEach(([childBucket, field]) => {
        (db[childBucket] || [])
            .filter(item => Number(item[field]) === Number(id))
            .forEach(item => {
                collectDeleteTree(childBucket, item.id, seen, result);
            });
    });

    result.push({ bucket, id: Number(id) });
    return result;
}

function deleteRecord(bucket, id) {
    if (!get(bucket, id)) {
        toast("Record not found. Refresh the page and try again.");
        return;
    }

    const tree = collectDeleteTree(bucket, id);
    const linkedCount = tree.length - 1;

    const message = linkedCount
        ? "This will delete the selected " + schema[bucket].singular
          + " and " + linkedCount + " linked record(s).\n\n"
          + "This cannot be undone. Continue?"
        : "Delete this " + schema[bucket].singular
          + "? This cannot be undone.";

    if (!window.confirm(message)) return;

    const previousData = JSON.stringify(db);

    tree.forEach(entry => {
        db[entry.bucket] = db[entry.bucket].filter(
            item => Number(item.id) !== entry.id
        );
    });

    if (!save()) {
        db = JSON.parse(previousData);
        render();
        return;
    }

    render();

    toast(linkedCount
        ? "Deleted successfully, including " + linkedCount + " linked record(s)."
        : "Record deleted successfully.");
}

$("recordForm").addEventListener("submit", event => {
    event.preventDefault();

    const key = editing?.key || currentPage;
    const config = schema[key];

    if (!config) return;

    const formData = new FormData(event.target);
    const record = {};

    config.fields.forEach(([name, label, type]) => {
        let value = formData.get(name);

        if (type === "number" || type.startsWith("ref:")) {
            value = value === "" ? null : Number(value);
        }

        record[name] = value;
    });

    for (const [name, label, type, required] of config.fields) {
        if (required && (record[name] === null || record[name] === "")) {
            toast("Please complete " + label + ".");
            return;
        }

        if (type === "number" && Number(record[name]) < 0) {
            toast(label + " cannot be negative.");
            return;
        }
    }

    if (key === "doctors" &&
        !get("departments", record.departmentId)) {
        toast("Choose an existing department.");
        return;
    }

    if (["appointments", "prescriptions"].includes(key) &&
        (!get("patients", record.patientId) ||
         !get("doctors", record.doctorId))) {
        toast("Choose an existing patient and doctor.");
        return;
    }

    if (key === "prescriptionMedicines" &&
        (!get("prescriptions", record.prescriptionId) ||
         !get("medicines", record.medicineId))) {
        toast("Choose an existing prescription and medicine.");
        return;
    }

    if (key === "payments" && !get("patients", record.patientId)) {
        toast("Choose an existing patient.");
        return;
    }

    if (key === "expenses" && !get("users", record.userId)) {
        toast("Choose an existing staff user.");
        return;
    }

    const previousData = JSON.stringify(db);

    if (editing) {
        Object.assign(get(key, editing.id), record);
    } else {
        record.id = Math.max(
            0,
            ...db[key].map(item => Number(item.id) || 0)
        ) + 1;

        db[key].push(record);
    }

    if (!save()) {
        db = JSON.parse(previousData);
        render();
        return;
    }

    closeForm();
    render();

    toast(editing
        ? "Record updated successfully."
        : "Record created successfully.");
});

$("modal").addEventListener("click", event => {
    if (event.target === $("modal")) closeForm();
});


/* =========================================================
   NovaX Authentication
   Browser-only demo authentication; production requires a
   trusted server, database, HTTPS and server-side sessions.
   ========================================================= */
const authUsersKey = "novax_auth_users_v1";
const authSessionKey = "novax_auth_session_v1";

function readAuthUsers() {
    try {
        const users = JSON.parse(localStorage.getItem(authUsersKey) || "[]");
        return Array.isArray(users) ? users : [];
    } catch (error) {
        return [];
    }
}

function showAuthMessage(message, type = "error") {
    const box = $("authMessage");
    box.textContent = message;
    box.className = "auth-message " + type;
}

function setAuthMode(mode) {
    const registering = mode === "register";
    $("loginForm").hidden = registering;
    $("registerForm").hidden = !registering;
    $("loginTab").classList.toggle("active", !registering);
    $("registerTab").classList.toggle("active", registering);
    $("authTitle").textContent = registering ? "Create your account" : "Welcome back";
    $("authSubtitle").textContent = registering
        ? "Set up your personal access to the NovaX workspace."
        : "Sign in to continue to your hospital workspace.";
    showAuthMessage("");
}

function bytesToBase64(bytes) {
    return btoa(String.fromCharCode(...new Uint8Array(bytes)));
}

function base64ToBytes(value) {
    return Uint8Array.from(atob(value), char => char.charCodeAt(0));
}

async function derivePasswordHash(password, salt) {
    if (!window.crypto || !window.crypto.subtle) {
        throw new Error("Secure password processing is unavailable. Open this project through localhost or HTTPS (for example, VS Code Live Server).");
    }

    const encoder = new TextEncoder();
    const key = await crypto.subtle.importKey(
        "raw", encoder.encode(password), "PBKDF2", false, ["deriveBits"]
    );
    const bits = await crypto.subtle.deriveBits({
        name: "PBKDF2",
        salt,
        iterations: 210000,
        hash: "SHA-256"
    }, key, 256);

    return bytesToBase64(bits);
}

function createSalt() {
    const salt = new Uint8Array(16);
    crypto.getRandomValues(salt);
    return salt;
}

function startAuthenticatedSession(user) {
    sessionStorage.setItem(authSessionKey, JSON.stringify({
        id: user.id,
        name: user.name,
        email: user.email
    }));

    $("authScreen").classList.add("auth-hidden");
    $("mainApp").classList.remove("app-locked");
    updateUserAvatar(user);
    populateProfile(user);
    showAuthMessage("");

    if (!window.novaxAppInitialized) {
        loadData();
        buildPages();
        render();
        window.novaxAppInitialized = true;
    }
}

// ---------------------------------------------------------
// MY PROFILE: picture, name and email for the signed-in user
// ---------------------------------------------------------
let pendingProfilePhoto = undefined;

function getCurrentAuthUser() {
    try {
        const session = JSON.parse(sessionStorage.getItem(authSessionKey) || "null");
        if (!session) return null;
        return readAuthUsers().find(account => account.id === session.id) || null;
    } catch (error) {
        return null;
    }
}

function updateUserAvatar(user) {
    const avatar = $("userAvatar");
    if (!avatar) return;
    avatar.replaceChildren();
    if (user.profilePhoto) {
        const image = document.createElement("img");
        image.src = user.profilePhoto;
        image.alt = "Profile picture";
        avatar.appendChild(image);
        avatar.classList.add("has-photo");
    } else {
        avatar.textContent = initials(user.name);
        avatar.classList.remove("has-photo");
    }
    avatar.title = user.name + " · " + user.email + " · Open profile";
    avatar.setAttribute("aria-label", "Open profile for " + user.name);
}

function populateProfile(user) {
    if (!user) return;
    $("profileName").value = user.name || "";
    $("profileEmail").value = user.email || "";
    $("profileCreatedAt").textContent = user.createdAt
        ? new Date(user.createdAt).toLocaleDateString(undefined, { year: "numeric", month: "short", day: "numeric" })
        : "Not available";
    $("profileAccountId").textContent = String(user.id || "—").slice(0, 18);
    renderProfilePhoto(user.profilePhoto || null, user.name);
    pendingProfilePhoto = undefined;
    $("profilePhotoInput").value = "";
    $("profileSaveMessage").textContent = "";
}

function renderProfilePhoto(photo, name) {
    const preview = $("profilePhotoPreview");
    preview.replaceChildren();
    if (photo) {
        const image = document.createElement("img");
        image.src = photo;
        image.alt = "Your profile picture";
        preview.appendChild(image);
    } else {
        preview.textContent = initials(name || "NX");
    }
}

function resizeProfileImage(file) {
    return new Promise((resolve, reject) => {
        if (!file.type.match(/^image\/(jpeg|png|webp)$/)) {
            reject(new Error("Choose a JPG, PNG or WEBP image."));
            return;
        }
        if (file.size > 5 * 1024 * 1024) {
            reject(new Error("The image must be smaller than 5 MB."));
            return;
        }
        const reader = new FileReader();
        reader.onerror = () => reject(new Error("Could not read that image."));
        reader.onload = () => {
            const image = new Image();
            image.onerror = () => reject(new Error("That image could not be opened."));
            image.onload = () => {
                const maxSide = 512;
                const scale = Math.min(1, maxSide / Math.max(image.width, image.height));
                const canvas = document.createElement("canvas");
                canvas.width = Math.max(1, Math.round(image.width * scale));
                canvas.height = Math.max(1, Math.round(image.height * scale));
                const context = canvas.getContext("2d");
                context.drawImage(image, 0, 0, canvas.width, canvas.height);
                resolve(canvas.toDataURL("image/jpeg", 0.84));
            };
            image.src = reader.result;
        };
        reader.readAsDataURL(file);
    });
}

$("userAvatar").addEventListener("click", () => go("profile"));

$("profilePhotoInput").addEventListener("change", async event => {
    const file = event.target.files && event.target.files[0];
    if (!file) return;
    try {
        pendingProfilePhoto = await resizeProfileImage(file);
        renderProfilePhoto(pendingProfilePhoto, $("profileName").value);
        $("profileSaveMessage").textContent = "Photo selected. Save profile changes to keep it.";
    } catch (error) {
        event.target.value = "";
        $("profileSaveMessage").textContent = error.message;
    }
});

$("removeProfilePhoto").addEventListener("click", () => {
    pendingProfilePhoto = "";
    renderProfilePhoto(null, $("profileName").value);
    $("profilePhotoInput").value = "";
    $("profileSaveMessage").textContent = "Photo will be removed when you save.";
});

$("profileName").addEventListener("input", () => {
    if (pendingProfilePhoto === undefined) {
        const current = getCurrentAuthUser();
        renderProfilePhoto(current && current.profilePhoto ? current.profilePhoto : null, $("profileName").value);
    } else if (pendingProfilePhoto === "") {
        renderProfilePhoto(null, $("profileName").value);
    }
});

$("profileForm").addEventListener("submit", event => {
    event.preventDefault();
    const current = getCurrentAuthUser();
    if (!current) return;

    const name = $("profileName").value.trim();
    const email = $("profileEmail").value.trim().toLowerCase();
    if (name.length < 2) {
        $("profileSaveMessage").textContent = "Please enter your full name.";
        return;
    }
    if (!email) {
        $("profileSaveMessage").textContent = "Please enter a valid email address.";
        return;
    }

    const users = readAuthUsers();
    if (users.some(account => account.id !== current.id && account.email === email)) {
        $("profileSaveMessage").textContent = "That email address is already used by another account.";
        return;
    }

    const user = users.find(account => account.id === current.id);
    if (!user) return;
    user.name = name;
    user.email = email;
    if (pendingProfilePhoto !== undefined) {
        if (pendingProfilePhoto) user.profilePhoto = pendingProfilePhoto;
        else delete user.profilePhoto;
    }

    try {
        localStorage.setItem(authUsersKey, JSON.stringify(users));
        sessionStorage.setItem(authSessionKey, JSON.stringify({
            id: user.id, name: user.name, email: user.email
        }));
        updateUserAvatar(user);
        populateProfile(user);
        $("profileSaveMessage").textContent = "Profile updated successfully.";
        toast("Your profile has been updated.");
    } catch (error) {
        $("profileSaveMessage").textContent = "Could not save. Browser storage may be full.";
    }
});

function endAuthenticatedSession() {
    sessionStorage.removeItem(authSessionKey);
    $("mainApp").classList.add("app-locked");
    $("authScreen").classList.remove("auth-hidden");
    $("loginForm").reset();
    $("registerForm").reset();
    setAuthMode("login");
}

$("loginTab").addEventListener("click", () => setAuthMode("login"));
$("registerTab").addEventListener("click", () => setAuthMode("register"));

document.querySelectorAll("[data-switch-auth]").forEach(button => {
    button.addEventListener("click", () => setAuthMode(button.dataset.switchAuth));
});

document.querySelectorAll("[data-auth-mode]").forEach(button => {
    button.addEventListener("click", () => setAuthMode(button.dataset.authMode));
});

document.querySelectorAll("[data-toggle-password]").forEach(button => {
    button.addEventListener("click", () => {
        const input = $(button.dataset.togglePassword);
        input.type = input.type === "password" ? "text" : "password";
        button.setAttribute("aria-label", input.type === "password" ? "Show password" : "Hide password");
    });
});

$("registerForm").addEventListener("submit", async event => {
    event.preventDefault();

    const name = $("registerName").value.trim();
    const email = $("registerEmail").value.trim().toLowerCase();
    const password = $("registerPassword").value;
    const confirm = $("registerConfirm").value;

    if (name.length < 2) return showAuthMessage("Please enter your full name.");
    if (password.length < 8) return showAuthMessage("Your password must contain at least 8 characters.");
    if (password !== confirm) return showAuthMessage("The passwords do not match.");

    const users = readAuthUsers();
    if (users.some(user => user.email === email)) {
        return showAuthMessage("An account with this email already exists. Please sign in.");
    }

    const submit = event.submitter;
    if (submit) {
        submit.disabled = true;
        submit.classList.add("is-loading");
    }

    try {
        const salt = createSalt();
        const passwordHash = await derivePasswordHash(password, salt);
        const user = {
            id: (crypto.randomUUID ? crypto.randomUUID() : String(Date.now())),
            name,
            email,
            salt: bytesToBase64(salt),
            passwordHash,
            createdAt: new Date().toISOString()
        };

        users.push(user);
        localStorage.setItem(authUsersKey, JSON.stringify(users));
        startAuthenticatedSession(user);
        event.target.reset();
        toast("Your NovaX account has been created.");
    } catch (error) {
        showAuthMessage(error.message || "Could not create your account. Please try again.");
    } finally {
        if (submit) {
            submit.disabled = false;
            submit.classList.remove("is-loading");
        }
    }
});

$("loginForm").addEventListener("submit", async event => {
    event.preventDefault();

    const email = $("loginEmail").value.trim().toLowerCase();
    const password = $("loginPassword").value;
    const user = readAuthUsers().find(account => account.email === email);

    if (!user) return showAuthMessage("No account was found for this email. Create an account first.");

    const submit = event.submitter;
    if (submit) {
        submit.disabled = true;
        submit.classList.add("is-loading");
    }

    try {
        const hash = await derivePasswordHash(password, base64ToBytes(user.salt));
        if (hash !== user.passwordHash) {
            return showAuthMessage("Incorrect password. Please try again.");
        }

        startAuthenticatedSession(user);
        event.target.reset();
        toast("Welcome back, " + user.name + ".");
    } catch (error) {
        showAuthMessage(error.message || "Sign in failed. Please try again.");
    } finally {
        if (submit) {
            submit.disabled = false;
            submit.classList.remove("is-loading");
        }
    }
});

$("logoutButton").addEventListener("click", () => {
    endAuthenticatedSession();
    toast("You have been signed out.");
});

function restoreAuthSession() {
    try {
        const session = JSON.parse(sessionStorage.getItem(authSessionKey) || "null");
        const user = session && readAuthUsers().find(account =>
            account.id === session.id && account.email === session.email
        );

        if (user) {
            startAuthenticatedSession(user);
            return true;
        }
    } catch (error) {
        // Invalid or expired browser session: show the sign-in screen.
    }

    $("mainApp").classList.add("app-locked");
    $("authScreen").classList.remove("auth-hidden");
    return false;
}

restoreAuthSession();
setAuthMode("login");
