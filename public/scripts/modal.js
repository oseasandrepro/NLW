export default function Modal(){

    const modalWarapper = document.querySelector('.modal-wrapper')

    const cancelButton = document.querySelector('.button.cancel')

    cancelButton.addEventListener("click", close)

    function open(){
        //funcionalidade de atribuir a classe active para a modal
        modalWarapper.classList.add("active")
    }
    function close(){
        //funcionalidade de remover a classe active da modal
        modalWarapper.classList.remove("active");
    }
    
    return {
        open,
        close
    }
}