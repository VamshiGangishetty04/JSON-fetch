const URL = "http://localhost:3000/students";
async function saveData() {
    let input1 = document.getElementById("name");
    let input2 = document.getElementById("email");
    let input3 = document.getElementById("cellno");
    let options = {
        "method": "POST",
        "headers": {
            "Content-Type": "application/json"
        },
        "body": JSON.stringify({
            "name": input1.value,
            "email": input2.value,
            "cell_no": input3.value
        })
    }
    let response = await fetch(URL, options);
    if (response.ok) {
        input1.value = '';
        input2.value = '';
        input3.value = '';
        getData();
    }
}

async function getData() {
    let response = await fetch(URL);
    let students = await response.json();
    displayData(students);
}

function displayData(students) {
    let container = document.getElementById("container");
    container.innerHTML = ``;
    students.forEach(student => {
        let item = document.createElement("div");
        item.innerHTML = `
            <p><b>ID : </b>${student.id} </p>
            <p><b>NAME : </b>${student.name}</p>
            <p><b>CELLNO. : </b>${student.cell_no}</p>
            <p><b>EMAIL : </b>${student.email}</p>

            <button onclick='deleteData("${student.id}")'>Delete</button>
        `;
        container.appendChild(item);
    });
}
async function deleteData(id) {
    let options = {
        "method": "DELETE"
    }
    let response = await fetch(`http://localhost:3000/students/${id}`, options);
    if (response.ok) {
        console.log("Deleted");
        getData();
    }
}

async function deleteAllData() {
    let response = await fetch(URL, { method: "GET" });
    let students = await response.json();
    students.forEach(student => deleteData(student.id));
}


getData()