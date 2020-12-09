import { EnvService } from './env.service';
import { environment } from './../../environments/environment';

export const EnvServiceFactory = () => {
    // Read environment variables from browser window
    const env = new EnvService(environment);
    return env;
};

export const EnvServiceProvider = {
    provide: EnvService,
    useFactory: EnvServiceFactory,
    deps: [],
};
