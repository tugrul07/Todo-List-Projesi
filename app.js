
//? GEREKSİNİMLERE README KLASÖRÜÜNDEN ULAŞABİLİRSİNİZ

//------------------------------BAŞLAYALIM----------------------------------


//GEREKLİ TÜM ELEMENTLER BURDA SEÇİLSİN
const formAdd = document.querySelector("#todoAddForm");
const inputAdd = document.querySelector("#todoName");
const todoList = document.querySelector(".list-group");
const cardBody1 = document.querySelectorAll(".card-body")[0];
const btnDelete = document.querySelector("#clearButton");
const cardBody2 = document.querySelectorAll(".card-body")[1];
const inputSearch = document.querySelector("#todoSearch");

//TÜM EVENTLERİ ÇALIŞTIRMA
runEvents();

function runEvents() {
    formAdd.addEventListener("submit", addTodo);
    document.addEventListener("DOMContentLoaded", pageLoaded);
    btnDelete.addEventListener("click", deleteAllTodosEverywhere);
    cardBody2.addEventListener("click", deleteSelectedTodoEveryWhere)
    inputSearch.addEventListener("keyup", filtersTodo)
}

//ARAYÜZDEKİ TODOLARI FİLTRELEME
function filtersTodo(e) {
    const getValue = e.target.value.trim().toLowerCase();
    // const allTodos = document.querySelectorAll(".list-group-item");
    const arrayofTodo = Array.from(todoList.children);
    if (arrayofTodo.length > 0) {
        arrayofTodo.forEach(function (todo) {
            if (todo.textContent.toLowerCase().trim().includes(getValue)) {
                todo.setAttribute("style", "display : block")
            }
            else {
                todo.setAttribute("style", "display : none !important");
            }
        })


    } else {
        showAlert("warning", "Lütfen arama yapabilmeniz için en az bir todo ekleyiniz.")
    }
}

//SAYFAM HER AÇILDIĞINDA
function pageLoaded() {
    //local storage taki değerler silinmediği için ordaki todoları alıcaz
    //parametre olarak addTodo fonksıyonuna koyucaz.
    checkToLocalStorage();
    todos.forEach(function (todo) {
        addTodoUserInterface(todo);
    })

}

//ALERT EKLEME
function showAlert(type, text) {
    /*
     <div class="alert alert-primary" role="alert">
 This is a primary alert—check it out!
</div>
     */
    const div = document.createElement("div");
    div.className = `alert alert-${type}`;
    div.textContent = text;
    cardBody1.appendChild(div);

    // bu alert ekranda 1 sn dursun
    //setTimeout() :  belirli bir süre gecikme sonunda bir işlevin veya bir kod bloğunun çalıştırılmasını sağlar
    setTimeout(function run() {
        div.remove();
    }, 1000)

}


//--------------------------------EKLEME İŞLEMLERİ--------------------------


//ARAYÜZDEKİ TODO EKLEYIN BUTONUNA HER BASIŞTA
function addTodo(e) {
    const inputText = inputAdd.value.trim();
    if (inputText == "") {
        showAlert("warning", "Hatalı tuşlama yaptınız!")
    } else {
        // arayüze ekleme
        addTodoUserInterface(inputText);
        // local Storage'a ekleme
        addTodoLocalStorage(inputText);
        showAlert("success", "Ekleme işlemi başarılı.")
    }

    e.preventDefault(); // BU ÖNEMLİ : prevent default olayların varsayılan davranıslarını engeller.
    // submıt : Form gönderildiğinde sayfa yenilenir veya başka bir sayfaya yönlendirme yapılır.
}

//ARAYÜZE TODO EKLEME
function addTodoUserInterface(newTodo) {
    /*
    <li class="list-group-item d-flex justify-content-between">Todo 1
    <a href="#" class="delete-item">
    <i class="fa fa-remove"></i>
    </a>
    </li> 
    */

    const li = document.createElement("li");
    const a = document.createElement("a");
    const i = document.createElement("i");

    li.className = "list-group-item d-flex justify-content-between";
    li.textContent = newTodo;
    a.href = "#";
    a.className = "delete-item";
    i.className = "fa fa-remove";

    a.appendChild(i);
    li.appendChild(a);
    todoList.appendChild(li);

    inputAdd.value = "";
}

//LOCAL STORAGE'A TODO EKLEME
function addTodoLocalStorage(newTodo) {
    checkToLocalStorage();
    todos.push(newTodo);
    localStorage.setItem("todos", JSON.stringify(todos));
}

// local storage a eklmemden once local storage ın durumunu kontrol edmeliyiz
// global scope ta bir dizi oluşturup eğer l.s. boşsa todos dizesinin aynen kalmasını
// değilse oraya yeni yazılan todoyu ekleticem
let todos = [];
function checkToLocalStorage() {
    const getLSData = JSON.parse(localStorage.getItem("todos"));
    if (getLSData === null) {
        todos = [];
    } else {
        todos = getLSData;
    }
}


//-----------------------------------SİLME İŞLEMLERİ-------------------------


//TÜM TODOLARI HERYERDEN TEMİZLEME (TÜM TODOLARI TEMIZLE BUTONUNA BASTIGINDA)
function deleteAllTodosEverywhere() {
    checkToLocalStorage();
    // const arrayofLi = Array.from(todoList.children);
    // if (arrayofLi.length>0) {
    //     arrayofLi.forEach(function (li) {
    //         li.remove();
    //     })
    // } 
    const allTodos = document.querySelectorAll(".list-group-item")
    if (allTodos.length > 0) {
        allTodos.forEach(function (todo) {
            todo.remove();
            showAlert("success", "Silme işlemi başarılı");
        })
    }
    else {
        showAlert("warning", "Silme işlemi için lütfen önce bir todo ekleyiniz.")
    }
    localStorage.removeItem("todos");
}

//SEÇİLEN BİR TODOYU SİLME (YANINDAKİ ÇARPI İKONUNA BASTIGINDA)
function deleteSelectedTodoEveryWhere(e) {
    if (e.target.className === "fa fa-remove") {
        // arayüzden kaldırma
        const selectedTodo = e.target.parentElement.parentElement;
        selectedTodo.remove();
        // storage'dan kaldırma
        deleteSelectedTodofromLS(selectedTodo.textContent)

    }

}

//ARAYUZDEN SİLİNEN TODOYU LOCAL STORAGEDAN SİLME
function deleteSelectedTodofromLS(selectedTodo) {
    checkToLocalStorage();
    let indexNo = todos.indexOf(selectedTodo);

    todos.splice(indexNo, 1);
    localStorage.setItem("todos", JSON.stringify(todos));

}
