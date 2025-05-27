import { LoggerService, UrlReaderService as UrlReader } from '@backstage/backend-plugin-api';
import { Config } from '@backstage/config';
import { PluginEndpointDiscovery, TokenManager } from '@backstage/backend-common';
export interface PluginEnvironment {
    logger: LoggerService;
    config: Config;
    reader: UrlReader;
    discovery: PluginEndpointDiscovery;
    tokenManager: TokenManager;
    identity: {
        getIdentity: () => Promise<{
            type: string;
            userEntityRef: string;
            ownershipEntityRefs: string[];
        }>;
    };
}
