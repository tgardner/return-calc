import { StorageService } from './storage.service';
import { EnvService } from '../config/env.service';
import { HttpClient } from '@angular/common/http';
import { JsonService } from './json.service';
import { JsonbinService } from './jsonbin.service';
import { SheetService } from './sheet.service';

export const StorageServiceFactory = (env: EnvService, http: HttpClient) => {
    const storageProvider = env.get('storageProvider').toUpperCase();
    const providers = {
        JSON: JsonService,
        JSONBIN: JsonbinService,
        SHEET: SheetService
    };

    if (!providers.hasOwnProperty(storageProvider)) {
        throw new Error(`Invalid storageProvider: ${env.get('storageProvider')}`);
    }

    const service = providers[storageProvider];
    const locationService: StorageService = new service(http, env);
    return locationService;
};

export const StorageServiceProvider = {
    provide: StorageService,
    useFactory: StorageServiceFactory,
    deps: [EnvService, HttpClient],
};
