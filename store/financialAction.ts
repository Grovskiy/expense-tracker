// TODO: draft idea for general comoponents in side panel, which allow edit and add fincancial items 

import { defineStore } from 'pinia';
import { CategoryTypeEnum } from '~/enums/CategoryTypeEnum';

export interface FinancialActionInterface {
    isOpen?: boolean,
    isEdit?: boolean | undefined,
    mode?: CategoryTypeEnum | undefined,
    id?: string | undefined,
    notes: string | undefined,
    value: number | undefined,
    tax?: number | undefined,
    date: string | undefined,
    categoryId: string | undefined,
    currencyId: string | undefined,
  }

export const useFinancialActionStore = defineStore('financialAction', {
  state: () => ({
    isOpen: true,
    isEdit: undefined,
    mode: undefined,
    id: undefined,
    notes: undefined,
    value: undefined,
    tax: undefined,
    date: undefined,
    categoryId: undefined,
    currencyId: undefined,
  } as FinancialActionInterface),
  actions: {
    openEditFinancialAction(data: FinancialActionInterface) {
        this.isOpen = true;
        this.isEdit = true;
        this.mode = data.mode;
        this.id = data.id;
        this.notes = data.notes;
        this.value = data.value;
        if (data.mode === CategoryTypeEnum.Income) this.tax = data.tax;
        this.date = data.date;
        this.categoryId = data.categoryId;
        this.currencyId = data.currencyId;
    }
  },
});