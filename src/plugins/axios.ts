import axios from 'axios';

import { get } from '../config';

export default axios.create({
  baseURL: get('REACT_APP_BACKEND_BASE_PATH'),
});
