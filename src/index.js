let friendsInfo = []; // เก็บข้อมูลเพื่อนในตัวแปร global

function generateFriendsInfo() {
    const numFriends = Math.floor(Math.random() * 9) + 1; // สุ่มจำนวนเพื่อนระหว่าง 1 ถึง 9
    const friendInputsContainer = document.getElementById("friendInputs");
    friendInputsContainer.innerHTML = ""; // ล้างข้อมูลที่แสดงอยู่เดิม

    for (let i = 0; i < numFriends; i++) {
        const friendDiv = document.createElement("div");
        friendDiv.innerHTML = `
    <label for="nickname${i}">ชื่อเล่นของเพื่อนที่ ${i + 1}:</label>
    <input type="text" id="nickname${i}" name="nickname${i}" onchange="upperCase()">

    <label for="age${i}">อายุของเพื่อนที่ ${i + 1}:</label>
    <input type="number" id="age${i}" name="age${i}" min="1" max="120">
`;
        friendInputsContainer.appendChild(friendDiv);
    }
}

function upperCase() {
    const inputs = document.querySelectorAll("input[type='text']");

    inputs.forEach(input => {
        input.value = input.value.toUpperCase();
    });
}


function submitFriendsInfo() {
    const friendInputsContainer = document.getElementById("friendInputs");
    const inputs = friendInputsContainer.querySelectorAll("input");
    friendsInfo = [];

    let isComplete = true; // ตัวแปรเพื่อตรวจสอบว่าข้อมูลถูกต้องหรือไม่

    inputs.forEach(input => {
        const id = input.id;
        const value = input.value.trim();

        if (value !== "") {
            const type = id.includes("age") ? "age" : "nickname";
            const index = parseInt(id.replace(/\D/g, ""));
            if (!friendsInfo[index]) {
                friendsInfo[index] = {};
            }
            friendsInfo[index][type] = value;
        } else {
            isComplete = false; // ถ้ามีช่องที่ว่าง กำหนด isComplete เป็น false
        }
    });

    // ตรวจสอบความครบถ้วนของข้อมูล
    if (isComplete && friendsInfo.length === inputs.length / 2) {
        console.log("ข้อมูลเพื่อนทั้งหมด:");
        console.log(friendsInfo);
        alert("รับข้อมูลเพื่อนเรียบร้อยแล้ว");
        document.getElementById("displayTotalAgeBtn").style.display = "inline-block";
        document.getElementById("displayTotalAvgBtn").style.display = "inline-block";
        document.getElementById("displayYoungestFriendsBtn").style.display = "inline-block";
        document.getElementById("displayOldestFriendsBtn").style.display = "inline-block";
        document.getElementById("displayResetBtn").style.display = "inline-block";
    } else {
        alert("โปรดใส่ชื่อเล่นและอายุของเพื่อนให้ครบทุกคน");
        document.getElementById("displayTotalAgeBtn").style.display = "none";
        document.getElementById("displayTotalAvgBtn").style.display = "none";
        document.getElementById("displayYoungestFriendsBtn").style.display = "none";
        document.getElementById("displayOldestFriendsBtn").style.display = "none";
        document.getElementById("displayResetBtn").style.display = "none";
    }
}

function calculateAge() {
    let totalage = 0;

    friendsInfo.forEach(friend => {
        totalage += parseInt(friend.age);
    });

    return totalage;
}
function displayTotalAge() {
    const totalAge = calculateAge();
    const friendInfoContainer = document.getElementById("friendInfoContainer");
    friendInfoContainer.innerHTML = `<p>อายุรวมของเพื่อนทั้งหมด: ${totalAge}</p>`;
}
function displayTotalAvg() {
    const totalAge = calculateAge();
    const totalAvg = totalAge / friendsInfo.length;
    const friendInfoContainer = document.getElementById("friendInfoContainer");
    friendInfoContainer.innerHTML = `<p>ค่าเฉลี่ยอายุของเพื่อนทั้งหมด: ${totalAvg.toFixed(2)}</p>`;
}
function findYoungestFriends() {
    let minAge = Infinity;
    let youngestFriends = [];

    friendsInfo.forEach(friend => {
        const age = parseInt(friend.age);
        if (age < minAge) {
            minAge = age;
            youngestFriends = [{ name: friend.nickname, age: age }];
        } else if (age === minAge) {
            youngestFriends.push({ name: friend.nickname, age: age });
        }
    });

    return youngestFriends;
}
function displayYoungestFriends() {
    const youngestFriends = findYoungestFriends();
    const friendInfoContainer = document.getElementById("friendInfoContainer");

    if (youngestFriends.length === 1) {
        friendInfoContainer.innerHTML = `<p>เพื่อนที่มีอายุน้อยที่สุด: ${youngestFriends[0].name} (อายุ ${youngestFriends[0].age})</p>`;
    } else {
        let html = "<p>เพื่อนที่มีอายุน้อยที่สุด:</p>";
        youngestFriends.forEach(friend => {
            html += `<p>${friend.name} (อายุ ${friend.age})</p>`;
        });
        friendInfoContainer.innerHTML = html;
    }
}
function findOldestFriends() {
    let maxAge = -Infinity;
    let oldestFriends = [];

    friendsInfo.forEach(friend => {
        const age = parseInt(friend.age);
        if (age > maxAge) {
            maxAge = age;
            oldestFriends = [{ name: friend.nickname, age: age }];
        } else if (age === maxAge) {
            oldestFriends.push({ name: friend.nickname, age: age });
        }
    });

    return oldestFriends;
}
function displayOldestFriends() {
    const oldestFriends = findOldestFriends();
    const friendInfoContainer = document.getElementById("friendInfoContainer");

    if (oldestFriends.length === 1) {
        friendInfoContainer.innerHTML = `<p>เพื่อนที่มีอายุมากที่สุด: ${oldestFriends[0].name} (อายุ ${oldestFriends[0].age})</p>`;
    } else {
        let html = "<p>เพื่อนที่มีอายุมากที่สุด:</p>";
        oldestFriends.forEach(friend => {
            html += `<p>${friend.name} (อายุ ${friend.age})</p>`;
        });
        friendInfoContainer.innerHTML = html;
    }
}
function resetPage() {
    document.getElementById("friendInputs").innerHTML = "";
    document.getElementById("friendInfoContainer").innerHTML = "";
    document.getElementById("displayTotalAgeBtn").style.display = "none";
    document.getElementById("displayTotalAvgBtn").style.display = "none";
    document.getElementById("displayYoungestFriendsBtn").style.display = "none";
    document.getElementById("displayOldestFriendsBtn").style.display = "none";
    document.getElementById("displayResetBtn").style.display = "none";
    generateFriendsInfo();
}