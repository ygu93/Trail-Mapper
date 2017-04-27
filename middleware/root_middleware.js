import {applyMiddleware} from 'redux';
import TrailDataMiddleware from './trail_data_middleware';

const RootMiddleware = applyMiddleware(TrailDataMiddleware);

export default RootMiddleware;
