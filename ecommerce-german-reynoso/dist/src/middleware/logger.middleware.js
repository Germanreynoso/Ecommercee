"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.loggerGlobal = loggerGlobal;
function loggerGlobal(req, res, next) {
    console.log(`Se ejecuto el controlador con el metodo ${req.method} en la ruta ${req.url}, a la hora ${new Date().getHours()}:${new Date().getMinutes()}`);
    next();
}
//# sourceMappingURL=logger.middleware.js.map