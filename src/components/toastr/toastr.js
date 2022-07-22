import toastr from 'toastr'

toastr.options = {
    "closeButton": true,
    "debug": false,
    "newestOnTop": false,
    "progressBar": true,
    "positionClass": "toast-top-right",
    "preventDuplicates": false,
    "onclick": null,
    "showDuration": "300",
    "hideDuration": "1000",
    "timeOut": "5000",
    "extendedTimeOut": "1000",
    "showEasing": "swing",
    "hideEasing": "linear",
    "showMethod": "fadeIn",
    "hideMethod": "fadeOut"
}

export function mostrarMensagem(message, tipo) {
    toastr[tipo](message)
}

export function mensagemErro(message) {
    mostrarMensagem(message, 'error')
}

export function mensagemSucesso(message) {
    mostrarMensagem(message, 'success')
}

export function mensagemAlert(message) {
    mostrarMensagem(message, 'warning')
}