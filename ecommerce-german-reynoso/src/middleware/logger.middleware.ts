import { Request, Response, NextFunction } from 'express';

export function loggerGlobal(req: Request, res: Response, next: NextFunction) {
    console.log(`Se ejecuto el controlador con el metodo ${req.method} en la ruta ${req.url}, a la hora ${new Date().getHours()}:${new Date().getMinutes()}`);
    next(); // Esto permite que la solicitud continúe
}
