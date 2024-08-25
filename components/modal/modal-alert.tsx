import React from "react";
import { Alert } from "@mui/material";

export function ModalAlert({ validate, message, severity }: { validate: boolean, message: string, severity: 'error' | 'warning' | 'info' | 'success' }) {
    return (
        <>
            {validate && <Alert severity={severity}>{message}</Alert>}
        </>
    );
}