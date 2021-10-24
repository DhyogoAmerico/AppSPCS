import { EventEmitter } from '@angular/core';

export class EventEmitterService {

    private static emit: {
        [nomeEvento: string]: EventEmitter<any>
    } = {}

    static get (nomeEvento:string): EventEmitter<any> {
        if (!this.emit[nomeEvento])
            this.emit[nomeEvento] = new EventEmitter<any>();
        return this.emit[nomeEvento];
    }

}