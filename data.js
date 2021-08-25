const STORAGE_KEY = "BSHELF_APPS";
 
let books = [];
 
function isStorageExist() /* boolean */ {
   if(typeof(Storage) === undefined){
       alert("Browser kamu tidak mendukung local storage");
       return false
   }
   return true;
}
 
function saveData() {
   const parsed = JSON.stringify(books);
   localStorage.setItem(STORAGE_KEY, parsed);
   document.dispatchEvent(new Event("ondatasaved"));
}
 
function loadDataFromStorage() {
   const serializedData = localStorage.getItem(STORAGE_KEY);
   
   let data = JSON.parse(serializedData);
   
   if(data !== null)
       books = data;
 
   document.dispatchEvent(new Event("ondataloaded"));
}
 
function updateDataToStorage() {
   if(isStorageExist())
       saveData();
}
 
function composeBooksObject(bName, bAuthor, bYear, isCompleted) {
   return {
       id: +new Date(),
       bName,
       bAuthor,
       bYear,
       isCompleted
   };
}
 
function findBook(bookId) {
   for(book of books){
       if(book.id === bookId)
           return book;
   }
   return null;
}
 
 
function findBookIndex(bookIdx) {
   let index = 0
   for (book of books) {
       if(book.id === bookIdx)
           return index;
 
       index++;
   }
 
   return -1;
}

