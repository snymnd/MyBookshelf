document.addEventListener("DOMContentLoaded", function () {
 
    const submitForm = document.getElementById("inputBook");
    const checkForm = document.getElementById("inputBookIsComplete");
    
    submitForm.addEventListener("submit", function (event) {
        event.preventDefault();
        if(checkForm.checked){
            addBook(true);
        }else{
            addBook(false);
        }
   
    });
    if(isStorageExist()){
        loadDataFromStorage();
    }
});

document.addEventListener("ondatasaved", () => {
    console.log("Data berhasil disimpan.");
});

document.addEventListener("ondataloaded", () => {
    refreshDataFromBooks();
});
