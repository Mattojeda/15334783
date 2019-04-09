export default class Alert {
    text: string;
    show: boolean = true;
    timeout?: number;
    color: "success" | "info" | "error" | "warning";
    constructor(text: string, color: "success" | "info" | "error" | "warning", timeout = undefined) {
        this.text = text
        this.timeout = timeout
        this.color = color
    }
}