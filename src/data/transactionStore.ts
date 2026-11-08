import { useSyncExternalStore } from "react";
import { TODAY, transactions, type Transaction } from "./transaction";

let current: Transaction[] = [...transactions];
const listeners = new Set<() => void>();

const emit = () => {
  listeners.forEach((listener) => listener());
};

const subscribe = (listener: () => void) => {
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
};

const getSnapshot = () => current;

export const useTransactions = () =>
  useSyncExternalStore(subscribe, getSnapshot, getSnapshot);

export type NewTransaction = Pick<
  Transaction,
  "icon" | "title" | "category" | "method" | "amount"
>;

export const addTransaction = (input: NewTransaction) => {
  const now = new Date();
  const time = `${String(now.getHours()).padStart(2, "0")}:${String(now.getMinutes()).padStart(2, "0")}`;
  current = [
    ...current,
    { ...input, id: `trx-${now.getTime()}`, date: TODAY, time },
  ];
  emit();
};

export const removeTransaction = (id: string) => {
  current = current.filter((trx) => trx.id !== id);
  emit();
};
