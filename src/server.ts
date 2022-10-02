process.env['NODE_CONFIG_DIR'] = __dirname + '/configs';

import 'dotenv/config';
import App from '@/app';
import AuthRoute from '@routes/auth.route';
import IndexRoute from '@routes/index.route';
import UsersRoute from '@routes/users.route';
import validateEnv from '@utils/validateEnv';
import ItemRoute from './routes/item.route';
import CartRoute from './routes/cart.route';

validateEnv();

const app = new App([new IndexRoute(), new UsersRoute(), new ItemRoute(), new CartRoute(), new AuthRoute()]);

app.listen();
