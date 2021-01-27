import { searchQuery } from '../../apollo/client';
import updateSearchState from './updateSearchState';

const gistMutations = {
    search: updateSearchState(searchQuery),
}

export default gistMutations;