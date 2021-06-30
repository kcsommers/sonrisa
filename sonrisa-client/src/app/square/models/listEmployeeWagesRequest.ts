import { Schema } from '../schema';
/** A request for a set of `EmployeeWage` objects */
export interface ListEmployeeWagesRequest {
    /** Filter wages returned to only those that are associated with the specified employee. */
    employeeId?: string;
    /**
     * Maximum number of Employee Wages to return per page. Can range between
     * 1 and 200. The default is the maximum at 200.
     */
    limit?: number;
    /** Pointer to the next page of Employee Wage results to fetch. */
    cursor?: string;
}
export declare const listEmployeeWagesRequestSchema: Schema<ListEmployeeWagesRequest>;
