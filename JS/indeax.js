var bookmarkName = document.getElementById('bookmarkName');
var bookmarkURL = document.getElementById('bookmarkURL');

var bookMarkContainer = [];

if (localStorage.getItem("bookMark") !== null) {
    bookMarkContainer = JSON.parse(localStorage.getItem("bookMark"));
    display();
}

function addBookMark() {
    if (!validateBookMarkName() || !validateBookMarkUrl()) {
        return;
    }

    if (isInserted()) {
        Swal.fire({
            icon: 'warning',
            title: 'مكرر',
            text: 'هذا الموقع تم تسجيله بالفعل.',
        });
        return;
    }

    var bookMark = {
        bookmarkName: bookmarkName.value,
        bookmarkURL: bookmarkURL.value
    };

    bookMarkContainer.push(bookMark);
    localStorage.setItem("bookMark", JSON.stringify(bookMarkContainer));
    display();
    clearInputs();
};



function display() {
    var container = ``;
    for (var i = 0; i < bookMarkContainer.length; i++) {
        container += `
            <tr>
                <td>${i + 1}</td>
                <td>${bookMarkContainer[i].bookmarkName}</td>
                <td><a class="btn btn-outline-main" href="${bookMarkContainer[i].bookmarkURL}" target="_blank"><i class="fa-solid fa-eye"></i> Visit</a></td>
                <td><button class="btn btn-outline-main" onclick="deleteBookmark(${i});"><i class="fa-solid fa-trash-can"></i> Delete</button></td>
            </tr>
        `;
    }
    
    document.getElementById('bookmarkContainer').innerHTML = container;
};

function deleteBookmark(index) {
    bookMarkContainer.splice(index, 1);
    localStorage.setItem("bookMark", JSON.stringify(bookMarkContainer));
    display();
};

function clearInputs() {
    bookmarkName.value = "";
    bookmarkURL.value = "";
    bookmarkName.classList.remove('is-valid');
    bookmarkURL.classList.remove('is-valid');

};

function validateBookMarkName() {
    var rejex = /^[A-Z]\w{3,}(\s+\w+)*$/;
    var trem = bookmarkName.value;
    var errorMsg = document.getElementById("nameError");

    if (rejex.test(trem)) {
        bookmarkName.classList.add('is-valid');
        bookmarkName.classList.remove('is-invalid');
        errorMsg.classList.add("d-none");
        return true;
    } else {
        bookmarkName.classList.add('is-invalid');
        bookmarkName.classList.remove('is-valid');
        errorMsg.classList.remove("d-none");
        return false;
    }
}

function validateBookMarkUrl() {
    var rejex = new RegExp(
        "^(https?:\\/\\/)?" +
        "((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|((\\d{1,3}\\.){3}\\d{1,3}))" +
        "(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*" +
        "(\\?[;&a-z\\d%_.~+=-]*)?" +
        "(\\#[-a-z\\d_]*)?$",
        "i"
    );
    var trem = bookmarkURL.value;
    var errorMsg = document.getElementById("urlError");

    if (rejex.test(trem)) {
        bookmarkURL.classList.add('is-valid');
        bookmarkURL.classList.remove('is-invalid');
        errorMsg.classList.add("d-none");
        return true;
    } else {
        bookmarkURL.classList.add('is-invalid');
        bookmarkURL.classList.remove('is-valid');
        errorMsg.classList.remove("d-none");
        return false;
    }
}

function isInserted() {
    var name = bookmarkName.value.toLowerCase();
    var url = bookmarkURL.value.toLowerCase();

    for (var i = 0; i < bookMarkContainer.length; i++) {
        if (
            bookMarkContainer[i].bookmarkName.toLowerCase() === name ||
            bookMarkContainer[i].bookmarkURL.toLowerCase() === url
        ) {
            return true;
        }
    }

    return false;
}



