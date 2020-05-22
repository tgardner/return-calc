import { EnvService } from './env.service';

export const EnvServiceFactory = () => {
    // Read environment variables from browser window
    const browserWindow = window || {};
    const browserWindowEnv = browserWindow['__env'] || {};

    const env = new EnvService(browserWindowEnv);
    return env;
};

export const EnvServiceProvider = {
    provide: EnvService,
    useFactory: EnvServiceFactory,
    deps: [],
};
