const Config = {
    session: {
        direction: "userXXI"
    },
    timeoutServices: 5000,
    commonHeaders: { 'X-Custom-Header': 'foobar' },
    AuthHeader: "XXIToken",
    AlertTimeout: 5000,
    formSesionLimit: 0,
    sesionCloseLimit: 3000000,
    fileMaxSize: 5000000,
    validFileFormats: ["image/png", "application/pdf"],
    imageValidFormats: ["image/png"],
    inputMaxCharacters: 80,
    penalId: "ES2",
    regexps: {
        email: /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/,
        number: /^[0-9]+$/
    }
}
export default Config