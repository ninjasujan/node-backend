import { Database } from '@providers/Database';
import Express from '@providers/Express';

class App {
    static init(): void {
        /** Initialize express server */
        Express.init();

        /** Connect  MongoDB database */
        Database.init();
    }
}

/** Entry point to start server and Database */
App.init();
