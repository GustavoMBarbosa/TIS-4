export interface Alert {
    title?: string,
    message: string,
    type?: "info" | "success" | "warning" | "error",
    top?: boolean,
    bottom?: boolean,
    right?: boolean,
    left?: boolean,
    timeout: number,
}