//variable global
const UNCOMPLETED_BOOK_READ_ID = "incompleteBookshelfList";  //nama sebuah class yang add di html yaang nanti akan diisi
const COMPLETED_BOOK_READ_ID = "completeBookshelfList"; //sama seperti diatas
const BOOK_ITEMID = "itemId";
const BOOK_ITEMNAME = "itemName";


function putBook(bName, bAuthor, bYear, isCompleted) {
 
    const booksTitle = document.createElement("h3");
    booksTitle.innerText = bName;

    const bookAuthor = document.createElement("p");
    bookAuthor.classList.add("author");
    bookAuthor.innerText = bAuthor;
    bookAuthor.style.textTransform='capitalize';

    const bookYear = document.createElement("p");
    bookYear.classList.add("year");
    bookYear.innerText = bYear;
 
    
    const container = document.createElement("article");
    container.classList.add("book_item") //"item shadow" adalah name class dari div yang dibuat
    container.append(booksTitle, bookAuthor, bookYear); //memasukan element2 ke dalam div yang dbuat (tectContainer)
    
    const buttonContainer = document.createElement("div");
    buttonContainer.classList.add("action") //"book_item" adalah name Class dari div yang dibuat
    if(isCompleted){
        const greenButton = createUndoButton(container);
        greenButton.innerText="Mark As Unreaded";
        
        buttonContainer.append(greenButton);
    } else {
        const greenButton = createFinishButton(container);
        greenButton.innerText="Mark as Readed";

        buttonContainer.append(greenButton);
    }

    const redButton = createTrashButton(container);
    redButton.innerText = "Delete Book";
    buttonContainer.append(redButton);
    container.append(buttonContainer);

    return container;
}

function addBook(check) {
    const uncompletedBookRead = document.getElementById(UNCOMPLETED_BOOK_READ_ID );
    const CompletedBookRead = document.getElementById(COMPLETED_BOOK_READ_ID);
    
    const bookName = document.getElementById("inputBookTitle").value;
    const bookAuthor = "Penulis: " + document.getElementById("inputBookAuthor").value;

    
    const bookYear = "Tahun Terbit: "+ document.getElementById("inputBookYear").value;
   
    const book = putBook(bookName, bookAuthor, bookYear, check);

    const bookObject = composeBooksObject(bookName, bookAuthor, bookYear, check);
    
    book[BOOK_ITEMID] = bookObject.id;
    book[BOOK_ITEMNAME] = bookObject.bName;
     
    books.push(bookObject);
  
    if(check == true){
        CompletedBookRead.append(book);   
    }else{ 
        uncompletedBookRead.append(book);  
    }
    
    updateDataToStorage();
    //mengupdate data
}

function createButton(buttonTypeClass , eventListener) {
    const button = document.createElement("button");
    button.classList.add(buttonTypeClass);
    button.addEventListener("click", function (event) {
        eventListener(event);
    });
    return button;
}

function addBookToCompleted(taskElement) {
    const listCompleted = document.getElementById(COMPLETED_BOOK_READ_ID);
    
    const bookTitle = taskElement.querySelector("h3").innerText;
    const bookAuthor = taskElement.querySelector(".author").innerText;
    const bookYear = taskElement.querySelector(".year").innerText;
 
    const newBook = putBook(bookTitle, bookAuthor, bookYear, true);
    
    const book = findBook(taskElement[BOOK_ITEMID]);
    book.isCompleted = true;
    newBook[BOOK_ITEMID] = book.id;
 
    listCompleted.append(newBook);
    taskElement.remove();

    updateDataToStorage();
} 

function createFinishButton(parentElm) {
    return createButton("green", function(event){ 
         addBookToCompleted(parentElm); 
    });
}

function undoTaskBookCompleted(taskElement){
    const listUncompleted = document.getElementById(UNCOMPLETED_BOOK_READ_ID);
    const bookTitle = taskElement.querySelector("h3").innerText;
    const bookAuthor = taskElement.querySelector(".author").innerText;
    const bookYear = taskElement.querySelector(".year").innerText;
 
    const newBook = putBook(bookTitle, bookAuthor, bookYear, false);
    
    const book = findBook(taskElement[BOOK_ITEMID]);
    book.isCompleted = false;
    newBook[BOOK_ITEMID] = book.id;
    newBook[BOOK_ITEMNAME]= book.bName;
    
 
    listUncompleted.append(newBook);
    taskElement.remove();

    updateDataToStorage();
}

function removeBook(taskElement) {
    const todoPosition = findBookIndex(taskElement[BOOK_ITEMID]);
    books.splice(todoPosition, 1);
   
    taskElement.remove();
    updateDataToStorage();

}

function createTrashButton(parentElm) {
    return createButton("red", function(event){
        if(confirm("Delete book from bookshelf ?")== true){
            removeBook(parentElm);
        }
    });
}
function createUndoButton(parentElm) {
    return createButton("green", function(event){
        undoTaskBookCompleted(parentElm);
    });
}

function refreshDataFromBooks() {
    const listUncompleted = document.getElementById(UNCOMPLETED_BOOK_READ_ID);
    let listCompleted = document.getElementById(COMPLETED_BOOK_READ_ID);
  
  
    for(book of books){
        const bewBook = putBook(book.bName, book.bAuthor, book.bYear, book.isCompleted);
        bewBook[BOOK_ITEMID] = book.id;  
  
        if(book.isCompleted){
            listCompleted.append(bewBook);
        } else {
            listUncompleted.append(bewBook);
        }
    }
 }

 //fungsi pencarian buku
 function searchBook(){
     const theBooks = document.getElementsByClassName("book_item");
     const searchedBook = document.getElementById("searchBookTitle").value.toUpperCase();
     
     for(let i=0 ; i<theBooks.length ; i++){
        let book = theBooks[i].getElementsByTagName("h3")[0];
        let inText = book.textContent || book.innerText;
        
        if (inText.toUpperCase().indexOf(searchedBook)>-1){
            theBooks[i].style.display =null;
        } else{
            theBooks[i].style.display = "none";
        }
     }
 }