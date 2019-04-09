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
    imageValidFormats: ["image/png"]
}
export default Config