"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CubeFilterFieldType = exports.CubeOperatorType = void 0;
var CubeOperatorType;
(function (CubeOperatorType) {
    CubeOperatorType["EQUALS"] = "equals";
    CubeOperatorType["NOT_EQUALS"] = "notEquals";
    CubeOperatorType["CONTAINS"] = "contains";
    CubeOperatorType["NOT_CONTAINS"] = "notContains";
    CubeOperatorType["STARTS_WITH"] = "startsWith";
    CubeOperatorType["NOT_STARTS_WITH"] = "notStartsWith";
    CubeOperatorType["ENDS_WITH"] = "endsWith";
    CubeOperatorType["NOT_ENDS_WITH"] = "notEndsWith";
    CubeOperatorType["GT"] = "gt";
    CubeOperatorType["GTE"] = "gte";
    CubeOperatorType["LT"] = "lt";
    CubeOperatorType["LTE"] = "lte";
    CubeOperatorType["IN_DATE_RANGE"] = "inDateRange";
    CubeOperatorType["NOT_IN_DATE_RANGE"] = "notInDateRange";
    CubeOperatorType["BEFORE_DATE"] = "beforeDate";
    CubeOperatorType["AFTER_DATE"] = "afterDate";
    CubeOperatorType["SET"] = "set";
    CubeOperatorType["NOT_SET"] = "notSet";
})(CubeOperatorType || (exports.CubeOperatorType = CubeOperatorType = {}));
var CubeFilterFieldType;
(function (CubeFilterFieldType) {
    CubeFilterFieldType["AND"] = "and";
    CubeFilterFieldType["OR"] = "or";
    CubeFilterFieldType["VALUES"] = "values";
    CubeFilterFieldType["OPERATOR"] = "operator";
    CubeFilterFieldType["MEMBER"] = "member";
})(CubeFilterFieldType || (exports.CubeFilterFieldType = CubeFilterFieldType = {}));
//# sourceMappingURL=enums.js.map