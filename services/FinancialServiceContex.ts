import { FinancialModeEnum } from "~/enums/FinancialModeEnum";
import type { FinancialServiceInterface } from "./FinancialServiceInterface";
import { expensesService } from "./expensesService";
import { incomesService } from "./incomesService";
import { repeatableService } from "./repeatableService";
import { subscriptionsService } from "./subscriptionsService";

export const FinancialServiceContex = (mode: FinancialModeEnum | undefined): FinancialServiceInterface => {
    switch (mode) {
        case FinancialModeEnum.Incomes:
            return incomesService();
        case FinancialModeEnum.Expenses:
            return expensesService();
        case FinancialModeEnum.RepeatableExpenses:
            return subscriptionsService();
        case FinancialModeEnum.RepeatableIncomes:
            return repeatableService();
        default:
            throw new Error("Invalid mode provided");
    }
}
