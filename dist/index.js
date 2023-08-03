"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.transformCubeFiltersToJsFilter = exports.transformCubeFilterToJsFilter = void 0;
var moment_1 = __importDefault(require("moment"));
var enums_1 = require("./enums");
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
var transformCubeFilterToJsFilter = function (filter) {
    if (enums_1.CubeFilterFieldType.VALUES in filter) {
        var member_1 = filter.member, operator = filter.operator, values_1 = filter.values;
        switch (operator) {
            case enums_1.CubeOperatorType.EQUALS:
                return function (item) {
                    return values_1.some(function (v) { var _a; return ((_a = item[member_1]) === null || _a === void 0 ? void 0 : _a.toString()) === v.toString(); });
                };
            case enums_1.CubeOperatorType.NOT_EQUALS:
                return function (item) {
                    return values_1.every(function (v) { var _a; return ((_a = item[member_1]) === null || _a === void 0 ? void 0 : _a.toString()) !== v.toString(); });
                };
            case enums_1.CubeOperatorType.CONTAINS:
                return function (item) {
                    return values_1.some(function (v) { var _a; return (_a = item[member_1]) === null || _a === void 0 ? void 0 : _a.includes(v.toString()); });
                };
            case enums_1.CubeOperatorType.NOT_CONTAINS:
                return function (item) {
                    return values_1.every(function (v) { var _a; return !((_a = item[member_1]) === null || _a === void 0 ? void 0 : _a.includes(v.toString())); });
                };
            case enums_1.CubeOperatorType.STARTS_WITH:
                return function (item) {
                    return values_1.some(function (v) { var _a; return (_a = item[member_1]) === null || _a === void 0 ? void 0 : _a.startsWith(v.toString()); });
                };
            case enums_1.CubeOperatorType.NOT_STARTS_WITH:
                return function (item) {
                    return values_1.every(function (v) { var _a; return !((_a = item[member_1]) === null || _a === void 0 ? void 0 : _a.startsWith(v.toString())); });
                };
            case enums_1.CubeOperatorType.ENDS_WITH:
                return function (item) {
                    return values_1.some(function (v) { var _a; return (_a = item[member_1]) === null || _a === void 0 ? void 0 : _a.endsWith(v.toString()); });
                };
            case enums_1.CubeOperatorType.NOT_ENDS_WITH:
                return function (item) {
                    return values_1.every(function (v) { var _a; return !((_a = item[member_1]) === null || _a === void 0 ? void 0 : _a.endsWith(v.toString())); });
                };
            case enums_1.CubeOperatorType.GT:
                return function (item) {
                    return values_1.some(function (v) { return Number(item[member_1]) > Number(v); });
                };
            case enums_1.CubeOperatorType.GTE:
                return function (item) {
                    return values_1.some(function (v) { return Number(item[member_1]) >= Number(v); });
                };
            case enums_1.CubeOperatorType.LT:
                return function (item) {
                    return values_1.some(function (v) { return Number(item[member_1]) < Number(v); });
                };
            case enums_1.CubeOperatorType.LTE:
                return function (item) {
                    return values_1.some(function (v) { return Number(item[member_1]) <= Number(v); });
                };
            case enums_1.CubeOperatorType.IN_DATE_RANGE:
                var start_1 = values_1[0], end_1 = values_1[1];
                return function (item) {
                    return (0, moment_1.default)(item[member_1]).isBetween((0, moment_1.default)(start_1), (0, moment_1.default)(end_1));
                };
            case enums_1.CubeOperatorType.NOT_IN_DATE_RANGE:
                var notStart_1 = values_1[0], notEnd_1 = values_1[1];
                return function (item) {
                    return !(0, moment_1.default)(item[member_1]).isBetween((0, moment_1.default)(notStart_1), (0, moment_1.default)(notEnd_1));
                };
            case enums_1.CubeOperatorType.BEFORE_DATE:
                return function (item) { return (0, moment_1.default)(item[member_1]).isBefore((0, moment_1.default)(values_1[0])); };
            case enums_1.CubeOperatorType.AFTER_DATE:
                return function (item) { return (0, moment_1.default)(item[member_1]).isAfter((0, moment_1.default)(values_1[0])); };
            default:
                throw new Error("Unsupported operator: ".concat(operator));
        }
    }
    if (enums_1.CubeFilterFieldType.OPERATOR in filter) {
        var _a = filter, member_2 = _a.member, operator = _a.operator;
        switch (operator) {
            case enums_1.CubeOperatorType.SET:
                return function (item) { return item[member_2] !== null; };
            case enums_1.CubeOperatorType.NOT_SET:
                return function (item) { return item[member_2] === null; };
            default:
                throw new Error("Unsupported operator: ".concat(operator));
        }
    }
    if (enums_1.CubeFilterFieldType.AND in filter) {
        var and = filter.and;
        var filterFunctions_1 = and.map(function (f) { return (0, exports.transformCubeFilterToJsFilter)(f); });
        return function (item) { return filterFunctions_1.every(function (fn) { return fn(item); }); };
    }
    if (enums_1.CubeFilterFieldType.OR in filter) {
        var or = filter.or;
        var filterFunctions_2 = or.map(function (f) { return (0, exports.transformCubeFilterToJsFilter)(f); });
        return function (item) { return filterFunctions_2.some(function (fn) { return fn(item); }); };
    }
    throw new Error("Unsupported filter type: ".concat(JSON.stringify(filter)));
};
exports.transformCubeFilterToJsFilter = transformCubeFilterToJsFilter;
var transformCubeFiltersToJsFilter = function (filters) {
    var filterFunctions = filters.map(function (f) {
        return (0, exports.transformCubeFilterToJsFilter)(f);
    });
    return function (item) { return filterFunctions.every(function (fn) { return fn(item); }); };
};
exports.transformCubeFiltersToJsFilter = transformCubeFiltersToJsFilter;
