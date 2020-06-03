import { todoListReducer } from './todoListReducer';

export function todoListReducer(payload) {
    return {type: 'add_list', payload}
}