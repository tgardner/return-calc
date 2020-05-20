import { LocationService } from './location.service';
import { EnvService } from '../config/env.service';
import { HttpClient } from '@angular/common/http';
import { JsonService } from './json.service';
import { JsonbinService } from './jsonbin.service';
import { SheetService } from './sheet.service';

export const LocationServiceFactory = (env: EnvService, http: HttpClient) => {
    const storageProvider = env.get("storageProvider").toUpperCase();
    const providers = {
        JSON: JsonService,
        JSONBIN: JsonbinService,
        SHEET: SheetService
    };

    if (!providers.hasOwnProperty(storageProvider)) {
        throw new Error(`Invalid storageProvider: ${env.get("storageProvider")}`);
    }

    var service = providers[storageProvider];
    var locationService: LocationService = new service(http, env);
    return locationService;
};

export const LocationServiceProvider = {
    provide: LocationService,
    useFactory: LocationServiceFactory,
    deps: [EnvService, HttpClient],
};