import moment from "moment";
import { CubeFilterFieldType, CubeOperatorType } from "./enums";
/**
 * Transforms a Cube.js filter to a JS filter function.
 * @param filter The Cube.js filter to transform.
 * @returns A JS filter function.
 * @example
 * const filter = {
 * member: 'Orders.status',
 * operator: 'equals',
 * values: ['shipped'],
 * };
 * const filterFunction = transformCubeFilterToJsFilter(filter, true);
 * const data = [
 * { status: 'shipped' },
 * { status: 'pending' },
 * { status: 'shipped' },
 * ];
 * const filteredData = data.filter(filterFunction);
 * console.log(filteredData);
 * // [{ status: 'shipped' }, { status: 'shipped' }]
 */
export function transformCubeFilterToJsFilter(filter) {
    if (CubeFilterFieldType.VALUES in filter) {
        const { member, operator, values } = filter;
        switch (operator) {
            case CubeOperatorType.EQUALS:
                return (item) => values.some((v) => { var _a; return ((_a = item[member]) === null || _a === void 0 ? void 0 : _a.toString()) === v.toString(); });
            case CubeOperatorType.NOT_EQUALS:
                return (item) => values.every((v) => { var _a; return ((_a = item[member]) === null || _a === void 0 ? void 0 : _a.toString()) !== v.toString(); });
            case CubeOperatorType.CONTAINS:
                return (item) => values.some((v) => { var _a; return (_a = item[member]) === null || _a === void 0 ? void 0 : _a.includes(v.toString()); });
            case CubeOperatorType.NOT_CONTAINS:
                return (item) => values.every((v) => { var _a; return !((_a = item[member]) === null || _a === void 0 ? void 0 : _a.includes(v.toString())); });
            case CubeOperatorType.STARTS_WITH:
                return (item) => values.some((v) => { var _a; return (_a = item[member]) === null || _a === void 0 ? void 0 : _a.startsWith(v.toString()); });
            case CubeOperatorType.NOT_STARTS_WITH:
                return (item) => values.every((v) => { var _a; return !((_a = item[member]) === null || _a === void 0 ? void 0 : _a.startsWith(v.toString())); });
            case CubeOperatorType.ENDS_WITH:
                return (item) => values.some((v) => { var _a; return (_a = item[member]) === null || _a === void 0 ? void 0 : _a.endsWith(v.toString()); });
            case CubeOperatorType.NOT_ENDS_WITH:
                return (item) => values.every((v) => { var _a; return !((_a = item[member]) === null || _a === void 0 ? void 0 : _a.endsWith(v.toString())); });
            case CubeOperatorType.GT:
                return (item) => values.some((v) => Number(item[member]) > Number(v));
            case CubeOperatorType.GTE:
                return (item) => values.some((v) => Number(item[member]) >= Number(v));
            case CubeOperatorType.LT:
                return (item) => values.some((v) => Number(item[member]) < Number(v));
            case CubeOperatorType.LTE:
                return (item) => values.some((v) => Number(item[member]) <= Number(v));
            case CubeOperatorType.IN_DATE_RANGE:
                const [start, end] = values;
                return (item) => moment(item[member]).isBetween(moment(start), moment(end));
            case CubeOperatorType.NOT_IN_DATE_RANGE:
                const [notStart, notEnd] = values;
                return (item) => !moment(item[member]).isBetween(moment(notStart), moment(notEnd));
            case CubeOperatorType.BEFORE_DATE:
                return (item) => moment(item[member]).isBefore(moment(values[0]));
            case CubeOperatorType.AFTER_DATE:
                return (item) => moment(item[member]).isAfter(moment(values[0]));
            default:
                throw new Error(`Unsupported operator: ${operator}`);
        }
    }
    if (CubeFilterFieldType.OPERATOR in filter) {
        const { member, operator } = filter;
        switch (operator) {
            case CubeOperatorType.SET:
                return (item) => item[member] !== null;
            case CubeOperatorType.NOT_SET:
                return (item) => item[member] === null;
            default:
                throw new Error(`Unsupported operator: ${operator}`);
        }
    }
    if (CubeFilterFieldType.AND in filter) {
        const { and } = filter;
        const filterFunctions = and.map((f) => transformCubeFilterToJsFilter(f));
        return (item) => filterFunctions.every((fn) => fn(item));
    }
    if (CubeFilterFieldType.OR in filter) {
        const { or } = filter;
        const filterFunctions = or.map((f) => transformCubeFilterToJsFilter(f));
        return (item) => filterFunctions.some((fn) => fn(item));
    }
    throw new Error(`Unsupported filter type: ${JSON.stringify(filter)}`);
}
export function transformCubeFiltersToJsFilter(filters) {
    const filterFunctions = filters.map((f) => transformCubeFilterToJsFilter(f));
    return (item) => filterFunctions.every((fn) => fn(item));
}
//# sourceMappingURL=index.js.map