let friendsInfo = []; // เก็บข้อมูลเพื่อนในตัวแปร global

// ดักจับการคลิกปุ่ม "สุ่มจำนวนเพื่อน" และเรียกฟังก์ชันสุ่มเพื่อน
document.getElementById("randomizeBtn").addEventListener("click", generateFriendsInfo);

// ดักจับการคลิกปุ่ม "ยืนยันข้อมูลเพื่อน" และเรียกฟังก์ชันยืนยันข้อมูลเพื่อน
document.getElementById("submitBtn").addEventListener("click", submitFriendsInfo);

// ดักจับการคลิกปุ่ม "แสดงจำนวนอายุรวมของเพื่อน" และเรียกฟังก์ชันแสดงอายุรวมของเพื่อนทั้งหมด
document.getElementById("displayTotalAgeBtn").addEventListener("click", displayTotalAge);

// ดักจับการคลิกปุ่ม "แสดงจำนวนอายุเฉลี่ยของเพื่อน" และเรียกฟังก์ชันแสดงอายุเฉลี่ยของเพื่อนทั้งหมด
document.getElementById("displayTotalAvgBtn").addEventListener("click", displayTotalAvg);

// ดักจับการคลิกปุ่ม "แสดงเพื่อนที่มีอายุน้อยที่สุด" และเรียกฟังก์ชันแสดงอายุเพื่อนที่มีอายุน้อยสุดทั้งหมด
document.getElementById("displayYoungestFriendsBtn").addEventListener("click", displayYoungestFriends);

// ดักจับการคลิกปุ่ม "แสดงเพื่อนที่มีอายุมากที่สุด" และเรียกฟังก์ชันแสดงอายุเพื่อนที่มีอายุมากสุดทั้งหมด
document.getElementById("displayOldestFriendsBtn").addEventListener("click", displayOldestFriends);

// ดักจับการคลิกปุ่ม "Reset" และเรียกฟังก์ชัน resetPage
document.getElementById("resetBtn").addEventListener("click", resetPage);

// ฟังก์ชันสำหรับสุ่มจำนวนเพื่อนและแสดงช่องป้อนข้อมูล
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

// ฟังก์ชันเปลี่ยนตัวอักษรในช่องป้อนข้อมูลเป็นตัวพิมพ์ใหญ่ทั้งหมด
function upperCase() {
    const inputs = document.querySelectorAll("input[type='text']");

    inputs.forEach(input => {
        input.value = input.value.toUpperCase();
    });
}

// ฟังก์ชันสำหรับยืนยันข้อมูลเพื่อน
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
        document.getElementById("resetBtn").style.display = "inline-block";
    } else {
        alert("โปรดใส่ชื่อเล่นและอายุของเพื่อนให้ครบทุกคน");
        document.getElementById("displayTotalAgeBtn").style.display = "none";
        document.getElementById("displayTotalAvgBtn").style.display = "none";
        document.getElementById("displayYoungestFriendsBtn").style.display = "none";
        document.getElementById("displayOldestFriendsBtn").style.display = "none";
        document.getElementById("resetBtn").style.display = "none";
    }
}

// ฟังก์ชันคำนวณอายุรวมของเพื่อนทั้งหมด
function calculateAge() {
    let totalage = 0;

    friendsInfo.forEach(friend => {
        totalage += parseInt(friend.age);
    });

    return totalage;
}

// ฟังก์ชันแสดงอายุรวมของเพื่อนทั้งหมด
function displayTotalAge() {
    const totalAge = calculateAge();
    const friendInfoContainer = document.getElementById("friendInfoContainer");
    friendInfoContainer.innerHTML = `<p>อายุรวมของเพื่อนทั้งหมด: ${totalAge}</p>`;
}
// ฟังก์ชันแสดงอายุรวมของเพื่อนทั้งหมด
function displayTotalAvg() {
    const totalAge = calculateAge();
    const totalAvg = totalAge / friendsInfo.length;
    const friendInfoContainer = document.getElementById("friendInfoContainer");
    friendInfoContainer.innerHTML = `<p>ค่าเฉลี่ยอายุของเพื่อนทั้งหมด: ${totalAvg.toFixed(2)}</p>`;
}
// ฟังก์ชันหาเพื่อนที่มีอายุน้อยที่สุด
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
// ฟังก์ชันแสดงเพื่อนที่มีอายุน้อยที่สุด
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
// ฟังก์ชันหาเพื่อนที่มีอายุมากที่สุด
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
// ฟังก์ชันแสดงเพื่อนที่มีอายุมากที่สุด
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

// ฟังก์ชันสำหรับล้างข้อมูลทั้งหมด
function resetPage() {
    document.getElementById("friendInputs").innerHTML = "";
    document.getElementById("friendInfoContainer").innerHTML = "";
    document.getElementById("displayTotalAgeBtn").style.display = "none";
    document.getElementById("displayTotalAvgBtn").style.display = "none";
    document.getElementById("displayYoungestFriendsBtn").style.display = "none";
    document.getElementById("displayOldestFriendsBtn").style.display = "none";
    document.getElementById("resetBtn").style.display = "none";
    generateFriendsInfo();
}
