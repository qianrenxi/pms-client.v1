"use strict";
/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
Object.defineProperty(exports, "__esModule", { value: true });
const rxjs_1 = require("rxjs");
const portfinder = require('portfinder');
function checkPort(port, host, basePort = 49152) {
    return new rxjs_1.Observable(obs => {
        portfinder.basePort = basePort;
        // tslint:disable:no-any
        portfinder.getPort({ port, host }, (err, foundPort) => {
            if (err) {
                obs.error(err);
            }
            else if (port !== foundPort && port !== 0) {
                // If the port isn't available and we weren't looking for any port, throw error.
                obs.error(`Port ${port} is already in use. Use '--port' to specify a different port.`);
            }
            else {
                // Otherwise, our found port is good.
                obs.next(foundPort);
                obs.complete();
            }
        });
    });
}
exports.checkPort = checkPort;
//# sourceMappingURL=check-port.js.map