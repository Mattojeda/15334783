export class Theme {
    [k: string]: any;
    primary = '#388E3c'
    secondary = '#B25709'
    accent = '#B2004B'
    error = '#FF5252'
    info = '#2196F3'
    success = '#4CAF50'
    warning = '#FFC107'
    white = "#ffffff"
    lightGrey = "#fafafa"

    constructor(obj: {
        primary?: string
        secondary?: string
        accent?: string
        error?: string
        info?: string
        success?: string
        warning?: string
        white?: string
        lightGrey?: string
    }) {
        this.primary = obj.primary ? obj.primary : this.primary;
        this.secondary = obj.secondary ? obj.secondary : this.secondary;
        this.accent = obj.accent ? obj.accent : this.accent;
        this.error = obj.error ? obj.error : this.error;
        this.info = obj.info ? obj.info : this.info;
        this.success = obj.success ? obj.success : this.success;
        this.warning = obj.warning ? obj.warning : this.warning;
        this.white = obj.white ? obj.white : this.white;
        this.lightGrey = obj.lightGrey ? obj.lightGrey : this.lightGrey;
    }
}
const themes: {
    [name: string]: Theme
} = {
    green: new Theme({}),
    grey: new Theme({
        white: "#e2e2e2",
        lightGrey: "#d7d7d7"
    }),
    night: new Theme({
        primary: '#e2e2e2',
        secondary: '#fafafa',
        accent: '#e2e2e2',
    }),
    yellowBlack: new Theme({
        primary: '#ff0',
        secondary: '#ff0',
        accent: '#ff0',
        error: '#ff0',
        info: '#ff0',
        success: '#ff0',
        warning: '#ff0',
    }),
    blackYellow: new Theme({
        primary: '#000',
        secondary: '#000',
        accent: '#000',
        error: '#000',
        info: '#000',
        success: '#000',
        warning: '#000',
        white: "#ff0",
        lightGrey: "#ff0"
    }),
}

export type Contrast = {
    text: string
    icon: string
    class: string
    theme: Theme
    dark: boolean
}

export const theme = themes.green
export const Constrasts: Contrast[] = [
    {
        text: "Amarrilo y negro",
        icon: "remove_red_eye",
        class: "yellow black--text",
        dark: false,
        theme: themes.blackYellow
    },
    {
        text: "Negro y amarillo",
        icon: "remove_red_eye",
        class: "black yellow--text",
        dark: true,
        theme: themes.yellowBlack,
    },
    {
        text: "Nocturno",
        icon: "brightness_3",
        class: "black white--text",
        dark: true,
        theme: themes.night
    },
    {
        text: "Descanso visual",
        icon: "brightness_4",
        class: "grey white--text",
        dark: false,
        theme: themes.grey
    },
    {
        text: "Normal",
        icon: "brightness_7",
        class: "white black--text",
        dark: false,
        theme: theme
    }

]
