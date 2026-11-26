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
            ["method", "Payment method", "select", 1, ["Cash", "Card"]],
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



async function loadData() {
    try {
        const saved = JSON.parse(
            localStorage.getItem(storeKey) || "null"
        );

        Object.keys(schema).forEach(key => {
            db[key] = saved && Array.isArray(saved[key])
                ? saved[key]
                : JSON.parse(JSON.stringify(seed[key] || []));
        });

        // Load departments directly from Oracle
        const response = await fetch("/api/departments");

        if (!response.ok) {
            throw new Error("Could not load departments from the server.");
        }

        db.departments = (await response.json()).map(item => ({
            id: item.DEPARTMENT_ID,
            name: item.DEPARTMENT_NAME,
            location: item.LOCATION
        }));

        // Load patients directly from Oracle
        const patientResponse = await fetch("/api/patients");

        if (!patientResponse.ok) {
            throw new Error("Could not load patients from the server.");
        }

        db.patients = (await patientResponse.json()).map(item => ({
            id: item.PATIENT_ID,
            name: item.FULL_NAME,
            gender: item.GENDER,
            dob: String(item.DATE_OF_BIRTH).slice(0, 10),
            phone: item.PHONE_NUMBER,
            address: item.ADDRESS,
            blood: item.BLOOD_GROUP
        }));


        // Load doctors directly from Oracle
        const doctorResponse = await fetch("/api/doctors");

        if (!doctorResponse.ok) {
            throw new Error("Could not load doctors from the server.");
        }

        db.doctors = (await doctorResponse.json()).map(item => ({
            id: item.doctorId,
            name: item.doctorName,
            specialty: item.specialization,
            phone: item.phoneNumber,
            email: item.email,
            departmentId: item.departmentId
        }));


        // Load appointments directly from Oracle
        const appointmentResponse = await fetch("/api/appointments");

        if (!appointmentResponse.ok) {
            throw new Error("Could not load appointments from the server.");
        }

        db.appointments = (await appointmentResponse.json()).map(item => ({
            id: item.appointmentId,
            patientId: item.patientId,
            doctorId: item.doctorId,
            date: item.appointmentDate,
            time: item.appointmentTime,
            status: item.status
        }));



        // Load prescriptions directly from Oracle
        const prescriptionResponse = await fetch("/api/prescriptions");

        if (!prescriptionResponse.ok) {
            throw new Error("Could not load prescriptions from the server.");
        }

        db.prescriptions = (await prescriptionResponse.json()).map(item => ({
            id: item.prescriptionId,
            patientId: item.patientId,
            doctorId: item.doctorId,
            date: String(item.prescriptionDate).slice(0, 10)
        }));



        // Load medicines directly from Oracle
        const medicineResponse = await fetch("/api/medicines");

        if (!medicineResponse.ok) {
            throw new Error("Could not load medicines from the server.");
        }

        db.medicines = (await medicineResponse.json()).map(item => ({
            id: item.medicineId,
            name: item.medicineName,
            quantity: item.quantity,
            price: item.unitPrice,
            expiry: String(item.expiryDate).slice(0, 10)
        }));



        // Load prescription medicines from Oracle
        const prescriptionMedicinesResponse = await fetch(
            "/api/prescription-medicines"
        );

        if (!prescriptionMedicinesResponse.ok) {
            throw new Error("Failed to load prescription medicines");
        }

        const prescriptionMedicinesData =
            await prescriptionMedicinesResponse.json();

        db.prescriptionMedicines = prescriptionMedicinesData.map(
            (item, index) => ({
                id: index + 1,
                prescriptionId: item.prescriptionId,
                medicineId: item.medicineId,
                quantity: item.quantity,
                instructions: item.instructions || ""
            }));




        // Load payments directly from Oracle
        const paymentResponse = await fetch("/api/payments");

        if (!paymentResponse.ok) {
            throw new Error("Failed to load payments from Oracle.");
        }

        db.payments = (await paymentResponse.json()).map(item => ({
            id: item.paymentId,
            patientId: item.patientId,
            amount: item.amount,
            date: item.paymentDate,
            method: item.paymentMethod,
            status: item.paymentStatus
        }));


    } catch (error) {
        console.error("Data loading error:", error);
    }
}




async function saveDepartmentToAPI(record, isEditing, id) {
    const department = {
        departmentId: isEditing ? Number(id) : Number(record.id),
        departmentName: record.name,
        location: record.location
    };

    const url = isEditing
        ? `/api/departments/${id}`
        : "/api/departments";

    const response = await fetch(url, {
        method: isEditing ? "PUT" : "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(department)
    });

    if (!response.ok) {
        const message = await response.text();
        throw new Error(message || "Department operation failed.");
    }

    return true;
}


async function savePatientToAPI(record, isEditing, id) {
    const patient = {
        patientId: isEditing ? Number(id) : Number(record.id),
        fullName: record.name,
        gender: record.gender,
        dateOfBirth: record.dob,
        phoneNumber: record.phone,
        address: record.address,
        bloodGroup: record.blood
    };

    const url = isEditing
        ? `/api/patients/${id}`
        : "/api/patients";

    const response = await fetch(url, {
        method: isEditing ? "PUT" : "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(patient)
    });

    if (!response.ok) {
        const message = await response.text();
        throw new Error(message || "Patient operation failed.");
    }

    return true;
}



async function saveDoctorToAPI(record, isEditing, id) {
    const doctor = {
        doctorId: isEditing ? Number(id) : Number(record.id),
        doctorName: record.name,
        specialization: record.specialty,
        phoneNumber: record.phone,
        email: record.email,
        departmentId: Number(record.departmentId)
    };

    const url = isEditing
        ? `/api/doctors/${id}`
        : "/api/doctors";

    const response = await fetch(url, {
        method: isEditing ? "PUT" : "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(doctor)
    });

    if (!response.ok) {
        const message = await response.text();
        throw new Error(message || "Doctor operation failed.");
    }

    return true;
}



async function saveAppointmentToAPI(record, isEditing, id) {
    const appointment = {
        appointmentId: isEditing ? Number(id) : Number(record.id),
        patientId: Number(record.patientId),
        doctorId: Number(record.doctorId),
        appointmentDate: record.date,
        appointmentTime: record.time,
        status: record.status
    };

    const url = isEditing
        ? `/api/appointments/${id}`
        : "/api/appointments";

    const response = await fetch(url, {
        method: isEditing ? "PUT" : "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(appointment)
    });

    if (!response.ok) {
        const message = await response.text();
        throw new Error(message || "Appointment operation failed.");
    }

    return true;
}


async function savePrescriptionToAPI(record, isEditing, id) {
    const prescription = {
        prescriptionId: isEditing ? Number(id) : Number(record.id),
        patientId: Number(record.patientId),
        doctorId: Number(record.doctorId),
        prescriptionDate: record.date
    };

    const url = isEditing
        ? `/api/prescriptions/${id}`
        : "/api/prescriptions";

    const response = await fetch(url, {
        method: isEditing ? "PUT" : "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(prescription)
    });

    if (!response.ok) {
        const message = await response.text();
        throw new Error(message || "Prescription operation failed.");
    }

    return true;
}



async function saveMedicineToAPI(record, isEditing, id) {
    const medicine = {
        medicineId: isEditing ? Number(id) : Number(record.id),
        medicineName: record.name,
        quantity: Number(record.quantity),
        unitPrice: Number(record.price),
        expiryDate: record.expiry
    };

    const url = isEditing
        ? `/api/medicines/${id}`
        : "/api/medicines";

    const response = await fetch(url, {
        method: isEditing ? "PUT" : "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(medicine)
    });

    if (!response.ok) {
        const message = await response.text();
        throw new Error(message || "Medicine operation failed.");
    }

    return true;
}


async function savePrescriptionMedicineToAPI(
    record,
    isEditing,
    existingRecord = null
) {
    const payload = {
        prescriptionId: Number(record.prescriptionId),
        medicineId: Number(record.medicineId),
        quantity: Number(record.quantity),
        instructions: record.instructions || null
    };

    let url = "/api/prescription-medicines";
    let method = "POST";

    if (isEditing) {
        url += `/${existingRecord.prescriptionId}/${existingRecord.medicineId}`;
        method = "PUT";
    }

    const response = await fetch(url, {
        method,
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(payload)
    });

    if (!response.ok) {
        const error = await response.text();
        throw new Error(error || "Failed to save prescription medicine");
    }

    return response.text();
}



async function savePaymentToAPI(record, isEditing, id) {
    const payment = {
        paymentId: isEditing ? Number(id) : Number(record.id),
        patientId: Number(record.patientId),
        amount: Number(record.amount),
        paymentDate: record.date,
        paymentMethod: record.method,
        paymentStatus: record.status
    };

    const url = isEditing
        ? `/api/payments/${id}`
        : "/api/payments";

    const response = await fetch(url, {
        method: isEditing ? "PUT" : "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(payment)
    });

    if (!response.ok) {
        throw new Error(
            await response.text() || "Payment operation failed."
        );
    }

    return true;
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
                person(item.name, item.email),
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

async function deleteRecord(bucket, id) {
    if (!get(bucket, id)) {
        toast("Record not found. Refresh the page and try again.");
        return;
    }

    const tree = bucket === "prescriptions"
    ? [{ bucket, id: Number(id) }]
    : collectDeleteTree(bucket, id);

    const linkedCount = tree.length - 1;

    const message = linkedCount
        ? "This will delete the selected " + schema[bucket].singular
          + " and " + linkedCount + " linked record(s).\n\n"
          + "This cannot be undone. Continue?"
        : "Delete this " + schema[bucket].singular
          + "? This cannot be undone.";

    if (!window.confirm(message)) return;

        if (bucket === "departments") {
        try {
            const response = await fetch(`/api/departments/${id}`, {
                method: "DELETE"
            });

            if (!response.ok) {
                throw new Error(await response.text() || "Department deletion failed.");
            }

            db.departments = db.departments.filter(
                item => Number(item.id) !== Number(id)
            );

            render();
            toast("Department deleted successfully.");
        } catch (error) {
            console.error(error);
            toast("Department delete failed: " + error.message);
        }
        return;
    }


    if (bucket === "patients") {
    try {
        const response = await fetch(`/api/patients/${id}`, {
            method: "DELETE"
        });

        if (!response.ok) {
            throw new Error(
                await response.text() || "Patient deletion failed."
            );
        }

        db.patients = db.patients.filter(
            item => Number(item.id) !== Number(id)
        );

        render();
        toast("Patient deleted successfully.");

    } catch (error) {
        console.error(error);
        toast("Patient delete failed: " + error.message);
    }

    return;
}



    // Delete doctors directly from Oracle
    if (bucket === "doctors") {
        try {
            const response = await fetch(`/api/doctors/${id}`, {
                method: "DELETE"
            });

            if (!response.ok) {
                throw new Error(
                    await response.text() || "Doctor deletion failed."
                );
            }

            db.doctors = db.doctors.filter(
                item => Number(item.id) !== Number(id)
            );

            render();
            toast("Doctor deleted successfully.");

        } catch (error) {
            console.error(error);
            toast("Doctor delete failed: " + error.message);
        }

        return;
    }



    // Delete appointments directly from Oracle
    if (bucket === "appointments") {
        try {
            const response = await fetch(`/api/appointments/${id}`, {
                method: "DELETE"
            });

            if (!response.ok) {
                throw new Error(
                    await response.text() || "Appointment deletion failed."
                );
            }

            db.appointments = db.appointments.filter(
                item => Number(item.id) !== Number(id)
            );

            render();
            toast("Appointment deleted successfully.");

        } catch (error) {
            console.error(error);
            toast("Appointment delete failed: " + error.message);
        }

        return;
    }


    // Delete prescriptions directly from Oracle
if (bucket === "prescriptions") {
    try {
        const response = await fetch(`/api/prescriptions/${id}`, {
            method: "DELETE"
        });

        if (!response.ok) {
            throw new Error(
                await response.text() || "Prescription deletion failed."
            );
        }

        db.prescriptions = db.prescriptions.filter(
            item => Number(item.id) !== Number(id)
        );

        render();
        toast("Prescription deleted successfully.");

    } catch (error) {
        console.error(error);
        toast("Prescription delete failed: " + error.message);
    }

    return;
}




// Delete prescription medicines directly from Oracle
if (bucket === "prescriptionMedicines") {
    const item = get(bucket, id);

    try {
        const response = await fetch(
            `/api/prescription-medicines/${item.prescriptionId}/${item.medicineId}`,
            { method: "DELETE" }
        );

        if (!response.ok) {
            throw new Error(
                await response.text() ||
                "Prescription medicine deletion failed."
            );
        }

        const refreshResponse = await fetch(
            "/api/prescription-medicines"
        );

        if (!refreshResponse.ok) {
            throw new Error("Could not refresh prescription medicines.");
        }

        const data = await refreshResponse.json();

        db.prescriptionMedicines = data.map((item, index) => ({
            id: index + 1,
            prescriptionId: item.prescriptionId,
            medicineId: item.medicineId,
            quantity: item.quantity,
            instructions: item.instructions || ""
        }));

        render();
        toast("Prescription medicine deleted successfully.");

    } catch (error) {
        console.error(error);
        toast("Delete failed: " + error.message);
    }

    return;
}



// Delete payments directly from Oracle
if (bucket === "payments") {
    try {
        const response = await fetch(`/api/payments/${id}`, {
            method: "DELETE"
        });

        if (!response.ok) {
            throw new Error(
                await response.text() || "Payment deletion failed."
            );
        }

        const refreshResponse = await fetch("/api/payments");

        if (!refreshResponse.ok) {
            throw new Error("Could not refresh payments.");
        }

        db.payments = (await refreshResponse.json()).map(item => ({
            id: item.paymentId,
            patientId: item.patientId,
            amount: item.amount,
            date: item.paymentDate,
            method: item.paymentMethod,
            status: item.paymentStatus
        }));

        render();
        toast("Payment deleted successfully.");

    } catch (error) {
        console.error(error);
        toast("Payment delete failed: " + error.message);
    }

    return;
}



// Delete medicines directly from Oracle
if (bucket === "medicines") {
    // Prevent deletion if the medicine is used in prescriptions
    const isUsed = db.prescriptionMedicines.some(
        item => Number(item.medicineId) === Number(id)
    );

    if (isUsed) {
        toast("Cannot delete this medicine because it is used in prescriptions.");
        return;
    }

    try {
        const response = await fetch(`/api/medicines/${id}`, {
            method: "DELETE"
        });

        if (!response.ok) {
            throw new Error(
                await response.text() || "Medicine deletion failed."
            );
        }

        const refreshResponse = await fetch("/api/medicines");

        if (!refreshResponse.ok) {
            throw new Error("Could not refresh medicines.");
        }

        const medicines = await refreshResponse.json();

        db.medicines = medicines.map(item => ({
            id: item.medicineId,
            name: item.medicineName,
            quantity: item.quantity,
            price: item.unitPrice,
            expiry: String(item.expiryDate).slice(0, 10)
        }));

        save();
        render();
        toast("Medicine deleted successfully.");

    } catch (error) {
        console.error(error);
        toast("Medicine delete failed: " + error.message);
    }

    return;
}


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

$("recordForm").addEventListener("submit", async event => {
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



    // Save departments directly through Java API to Oracle
    if (key === "departments") {
        const isEditing = Boolean(editing);

        if (!isEditing) {
            record.id = Math.max(
                0,
                ...db.departments.map(item =>
                    Number(item.id) || 0
                )
            ) + 1;
        }

        try {
            await saveDepartmentToAPI(
                record,
                isEditing,
                editing?.id
            );

            const response = await fetch("/api/departments");

            if (!response.ok) {
                throw new Error("Could not refresh departments.");
            }

            db.departments = (await response.json()).map(item => ({
            id: item.DEPARTMENT_ID,
            name: item.DEPARTMENT_NAME,
            location: item.LOCATION
            }));

            closeForm();
            render();

            toast(isEditing
                ? "Department updated successfully."
                : "Department created successfully.");

        } catch (error) {
            console.error(error);
            toast("Department save failed: " + error.message);
        }

        return;
    }


    // Save patients directly through Java API to Oracle
if (key === "patients") {
    const isEditing = Boolean(editing);

    if (!isEditing) {
        record.id = Math.max(
            0,
            ...db.patients.map(item => Number(item.id) || 0)
        ) + 1;
    }

    try {
        await savePatientToAPI(
            record,
            isEditing,
            editing?.id
        );

        const response = await fetch("/api/patients");

        if (!response.ok) {
            throw new Error("Could not refresh patients.");
        }

        db.patients = (await response.json()).map(item => ({
            id: item.PATIENT_ID,
            name: item.FULL_NAME,
            gender: item.GENDER,
            dob: String(item.DATE_OF_BIRTH).slice(0, 10),
            phone: item.PHONE_NUMBER,
            address: item.ADDRESS,
            blood: item.BLOOD_GROUP
        }));

        closeForm();
        render();

        toast(isEditing
            ? "Patient updated successfully."
            : "Patient created successfully.");

    } catch (error) {
        console.error(error);
        toast("Patient save failed: " + error.message);
    }

    return;
}



// Save doctors directly through Java API to Oracle
if (key === "doctors") {
    const isEditing = Boolean(editing);

    if (!isEditing) {
        record.id = Math.max(
            0,
            ...db.doctors.map(item => Number(item.id) || 0)
        ) + 1;
    }

    try {
        await saveDoctorToAPI(
            record,
            isEditing,
            editing?.id
        );

        const response = await fetch("/api/doctors");

        if (!response.ok) {
            throw new Error("Could not refresh doctors.");
        }

        db.doctors = (await response.json()).map(item => ({
            id: item.doctorId,
            name: item.doctorName,
            specialty: item.specialization,
            phone: item.phoneNumber,
            email: item.email,
            departmentId: item.departmentId
        }));

        closeForm();
        render();

        toast(isEditing
            ? "Doctor updated successfully."
            : "Doctor created successfully.");

    } catch (error) {
        console.error(error);
        toast("Doctor save failed: " + error.message);
    }

    return;
}



// Save appointments directly through Java API to Oracle
if (key === "appointments") {
    const isEditing = Boolean(editing);

    if (!isEditing) {
        record.id = Math.max(
            0,
            ...db.appointments.map(item => Number(item.id) || 0)
        ) + 1;
    }

    try {
        await saveAppointmentToAPI(
            record,
            isEditing,
            editing?.id
        );

        const response = await fetch("/api/appointments");

        if (!response.ok) {
            throw new Error("Could not refresh appointments.");
        }

        db.appointments = (await response.json()).map(item => ({
            id: item.appointmentId,
            patientId: item.patientId,
            doctorId: item.doctorId,
            date: item.appointmentDate,
            time: item.appointmentTime,
            status: item.status
        }));

        closeForm();
        render();

        toast(isEditing
            ? "Appointment updated successfully."
            : "Appointment created successfully.");

    } catch (error) {
        console.error(error);
        toast("Appointment save failed: " + error.message);
    }

    return;
}


// Save prescriptions directly through Java API to Oracle
if (key === "prescriptions") {
    const isEditing = Boolean(editing);

    if (!isEditing) {
        record.id = Math.max(
            0,
            ...db.prescriptions.map(item => Number(item.id) || 0)
        ) + 1;
    }

    try {
        await savePrescriptionToAPI(
            record,
            isEditing,
            editing?.id
        );

        const response = await fetch("/api/prescriptions");

        if (!response.ok) {
            throw new Error("Could not refresh prescriptions.");
        }

        db.prescriptions = (await response.json()).map(item => ({
            id: item.prescriptionId,
            patientId: item.patientId,
            doctorId: item.doctorId,
            date: String(item.prescriptionDate).slice(0, 10)
        }));

        closeForm();
        render();

        toast(isEditing
            ? "Prescription updated successfully."
            : "Prescription created successfully.");

    } catch (error) {
        console.error(error);
        toast("Prescription save failed: " + error.message);
    }

    return;
}



// Save medicines directly through Java API to Oracle
if (key === "medicines") {
    const isEditing = Boolean(editing);

    if (!isEditing) {
        record.id = Math.max(
            0,
            ...db.medicines.map(item => Number(item.id) || 0)
        ) + 1;
    }

    try {
        await saveMedicineToAPI(
            record,
            isEditing,
            editing?.id
        );

        const response = await fetch("/api/medicines");

        if (!response.ok) {
            throw new Error("Could not refresh medicines.");
        }

        db.medicines = (await response.json()).map(item => ({
            id: item.medicineId,
            name: item.medicineName,
            quantity: item.quantity,
            price: item.unitPrice,
            expiry: String(item.expiryDate).slice(0, 10)
        }));

        closeForm();
        render();

        toast(isEditing
            ? "Medicine updated successfully."
            : "Medicine created successfully.");

    } catch (error) {
        console.error(error);
        toast("Medicine save failed: " + error.message);
    }

    return;
}



// Save prescription medicines directly through Oracle
if (key === "prescriptionMedicines") {
    const isEditing = Boolean(editing);

    const existingRecord = isEditing
        ? get(key, editing.id)
        : null;

    try {
        await savePrescriptionMedicineToAPI(
            record,
            isEditing,
            existingRecord
        );

        const response = await fetch(
            "/api/prescription-medicines"
        );

        if (!response.ok) {
            throw new Error(
                "Could not refresh prescription medicines."
            );
        }

        const data = await response.json();

        db.prescriptionMedicines = data.map((item, index) => ({
            id: index + 1,
            prescriptionId: item.prescriptionId,
            medicineId: item.medicineId,
            quantity: item.quantity,
            instructions: item.instructions || ""
        }));

        closeForm();
        render();

        toast(isEditing
            ? "Prescription medicine updated successfully."
            : "Prescription medicine created successfully.");

    } catch (error) {
        console.error(error);
        toast("Prescription medicine save failed: " + error.message);
    }

    return;
}



// Save payments directly through Java API to Oracle
if (key === "payments") {
    const isEditing = Boolean(editing);

    if (!isEditing) {
        record.id = Math.max(
            0,
            ...db.payments.map(item => Number(item.id) || 0)
        ) + 1;
    }

    try {
        await savePaymentToAPI(
            record,
            isEditing,
            editing?.id
        );

        const response = await fetch("/api/payments");

        if (!response.ok) {
            throw new Error("Could not refresh payments.");
        }

        db.payments = (await response.json()).map(item => ({
            id: item.paymentId,
            patientId: item.patientId,
            amount: item.amount,
            date: item.paymentDate,
            method: item.paymentMethod,
            status: item.paymentStatus
        }));

        closeForm();
        render();

        toast(isEditing
            ? "Payment updated successfully."
            : "Payment created successfully.");

    } catch (error) {
        console.error(error);
        toast("Payment save failed: " + error.message);
    }

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

/* =========================================================
   NovaX Authentication
   Oracle-based staff login
   ========================================================= */


/* =========================================================
   NovaX Authentication
   Oracle-based staff login and registration
   ========================================================= */

const authSessionKey = "novax_auth_session_v1";

function showAuthMessage(message, type = "error") {
    const box = $("authMessage");
    box.textContent = message;
    box.className = "auth-message " + type;
}

// Switch between Sign In and Create Account
function setAuthMode(mode = "login") {
    const isLogin = mode === "login";

    $("loginForm").hidden = !isLogin;
    $("registerForm").hidden = isLogin;

    $("loginTab").classList.toggle("active", isLogin);
    $("registerTab").classList.toggle("active", !isLogin);

    $("authTitle").textContent =
        isLogin ? "Welcome back" : "Create your account";

    $("authSubtitle").textContent = isLogin
        ? "Sign in to continue to your hospital workspace."
        : "Register your staff account to access NovaX.";

    showAuthMessage("");
}


async function startAuthenticatedSession(user) {
    sessionStorage.setItem(authSessionKey, JSON.stringify(user));

    $("authScreen").classList.add("auth-hidden");
    $("mainApp").classList.remove("app-locked");

    updateUserAvatar(user);
    populateProfile(user);

    if (!window.novaxAppInitialized) {
        window.novaxAppInitialized = true;

        await loadData();
        buildPages();
        render();
    }
}


function getCurrentAuthUser() {
    try {
        return JSON.parse(
            sessionStorage.getItem(authSessionKey) || "null"
        );
    } catch (error) {
        return null;
    }
}

function updateUserAvatar(user) {
    const avatar = $("userAvatar");
    if (!avatar) return;

    avatar.replaceChildren();
    avatar.textContent = initials(user.fullName || user.username);

    avatar.title = user.username + " · " + user.role;
    avatar.setAttribute(
        "aria-label",
        "Open profile for " + user.username
    );
}

function populateProfile(user) {
    if (!user) return;

    $("profileName").value =
        user.fullName || user.username || "";

    $("profileEmail").value = user.email || "";
    $("profileEmail").readOnly = true;

    $("profileCreatedAt").textContent = "Oracle staff account";
    $("profileAccountId").textContent = String(user.userId || "—");

    renderProfilePhoto(null, user.fullName || user.username);

    $("profileSaveMessage").textContent =
        "Your account information is managed by the hospital administrator.";
}

function renderProfilePhoto(photo, name) {
    const preview = $("profilePhotoPreview");
    if (!preview) return;

    preview.replaceChildren();

    if (photo) {
        const image = document.createElement("img");
        image.src = photo;
        image.alt = "Profile picture";
        preview.appendChild(image);
    } else {
        preview.textContent = initials(name || "NX");
    }
}

function endAuthenticatedSession() {
    sessionStorage.removeItem(authSessionKey);

    $("mainApp").classList.add("app-locked");
    $("authScreen").classList.remove("auth-hidden");

    $("loginForm").reset();
    $("registerForm").reset();

    setAuthMode("login");
}

$("userAvatar").addEventListener("click", () => go("profile"));

$("profileForm").addEventListener("submit", event => {
    event.preventDefault();

    $("profileSaveMessage").textContent =
        "Profile changes must be managed by the hospital administrator.";
});

$("profilePhotoInput").disabled = true;
$("removeProfilePhoto").disabled = true;

// Authentication tabs
$("loginTab").addEventListener("click", () => setAuthMode("login"));
$("registerTab").addEventListener("click", () => setAuthMode("register"));

// Links below the forms
document.querySelectorAll("[data-switch-auth]").forEach(button => {
    button.hidden = false;

    button.addEventListener("click", () => {
        setAuthMode(button.dataset.switchAuth);
    });
});

// Show/hide password buttons
document.querySelectorAll("[data-toggle-password]").forEach(button => {
    button.addEventListener("click", () => {
        const input = $(button.dataset.togglePassword);

        input.type =
            input.type === "password" ? "text" : "password";

        button.setAttribute(
            "aria-label",
            input.type === "password" ? "Show password" : "Hide password"
        );
    });
});

// =========================
// ORACLE STAFF REGISTRATION
// =========================

$("registerForm").addEventListener("submit", async event => {
    event.preventDefault();

    const fullName = $("registerName").value.trim();
    const username = $("registerUsername").value.trim();
    const email = $("registerEmail").value.trim();
    const password = $("registerPassword").value;
    const confirmPassword = $("registerConfirm").value;

    if (password !== confirmPassword) {
        showAuthMessage("Passwords do not match.");
        return;
    }

    const submit = event.submitter;

    if (submit) {
        submit.disabled = true;
        submit.classList.add("is-loading");
    }

    try {
        const response = await fetch("/api/auth/register", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                fullName,
                username,
                email,
                password,
                confirmPassword
            })
        });

        const result = await response.json();

        if (!response.ok) {
            throw new Error(
                result.detail || result.message ||
                "Registration failed."
            );
        }

        // Automatically sign in the newly registered staff member.
        startAuthenticatedSession(result);

        event.target.reset();

        toast("Welcome to NovaX, " + result.fullName + "!");

    } catch (error) {
        showAuthMessage(
            error.message || "Could not connect to the hospital server."
        );
    } finally {
        if (submit) {
            submit.disabled = false;
            submit.classList.remove("is-loading");
        }
    }
});

// =========================
// ORACLE STAFF LOGIN
// =========================

$("loginForm").addEventListener("submit", async event => {
    event.preventDefault();

    const username = $("loginUsername").value.trim();
    const password = $("loginPassword").value;

    const submit = event.submitter;

    if (submit) {
        submit.disabled = true;
        submit.classList.add("is-loading");
    }

    try {
        const response = await fetch("/api/auth/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                username,
                password
            })
        });

        const result = await response.json();

        if (!response.ok) {
            throw new Error(
                result.detail || result.message ||
                "Invalid username or password."
            );
        }

        startAuthenticatedSession(result);

        event.target.reset();

        toast("Welcome, " + result.username + "!");

    } catch (error) {
        showAuthMessage(
            error.message || "Could not connect to the hospital server."
        );
    } finally {
        if (submit) {
            submit.disabled = false;
            submit.classList.remove("is-loading");
        }
    }
});

// Logout
$("logoutButton").addEventListener("click", () => {
    endAuthenticatedSession();
    toast("You have been signed out.");
});

// Restore an existing browser session
function restoreAuthSession() {
    const user = getCurrentAuthUser();

    if (user && user.userId && user.username) {
        startAuthenticatedSession(user);
        return true;
    }

    $("mainApp").classList.add("app-locked");
    $("authScreen").classList.remove("auth-hidden");

    return false;
}

restoreAuthSession();
setAuthMode("login");
