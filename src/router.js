/**
 * Based on Minh Turi's article:
 * https://medium.com/swlh/simple-svelte-3-app-with-router-44fe83c833b6
 */
import { writable } from 'svelte/store';
import Budgets from './Budgets.svelte';
import Budget from './Budget.svelte';
import Categories from './Categories.svelte';
import Transactions from './Transactions.svelte';

const router = {
  '/': Budgets,
  '/budget': Budget,
  '/categories': Categories,
  '/transactions': Transactions
};

export default router;
export const currentRoute = writable('/');
