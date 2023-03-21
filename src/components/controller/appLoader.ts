import { apiKey, apiUrl } from '../../constants/appLink';
import Loader from './loader';

class AppLoader extends Loader {
  constructor() {
    super(apiUrl, {
      apiKey,
    });
  }
}

export default AppLoader;
