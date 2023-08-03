"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var enums_1 = require("./enums");
var index_1 = require("./index"); // Update the import path based on your file structure
describe("transformCubeFilterToJsFilter", function () {
    it("should handle CubeOperatorType.EQUALS correctly", function () {
        var filter = {
            member: "field",
            operator: enums_1.CubeOperatorType.EQUALS,
            values: ["value"],
        };
        var filterFunction = (0, index_1.transformCubeFilterToJsFilter)(filter);
        expect(filterFunction({ field: "value" })).toBe(true);
        expect(filterFunction({ field: "otherValue" })).toBe(false);
    });
    it("should handle CubeOperatorType.EQUALS correctly with multiple values", function () {
        var filter = {
            member: "field",
            operator: enums_1.CubeOperatorType.EQUALS,
            values: ["value", "otherValue"],
        };
        var filterFunction = (0, index_1.transformCubeFilterToJsFilter)(filter);
        expect(filterFunction({ field: "value" })).toBe(true);
        expect(filterFunction({ field: "otherValue" })).toBe(true);
    });
    it("should handle CubeOperatorType.NOT_EQUALS correctly", function () {
        var filter = {
            member: "field",
            operator: enums_1.CubeOperatorType.NOT_EQUALS,
            values: ["value"],
        };
        var filterFunction = (0, index_1.transformCubeFilterToJsFilter)(filter);
        expect(filterFunction({ field: "value" })).toBe(false);
        expect(filterFunction({ field: "otherValue" })).toBe(true);
    });
    it("should handle CubeOperatorType.NOT_EQUALS correctly with multiple values", function () {
        var filter = {
            member: "field",
            operator: enums_1.CubeOperatorType.NOT_EQUALS,
            values: ["value", "otherValue"],
        };
        var filterFunction = (0, index_1.transformCubeFilterToJsFilter)(filter);
        expect(filterFunction({ field: "value" })).toBe(false);
        expect(filterFunction({ field: "otherValue" })).toBe(false);
    });
    it("should handle CubeOperatorType.CONTAINS correctly", function () {
        var filter = {
            member: "field",
            operator: enums_1.CubeOperatorType.CONTAINS,
            values: ["value"],
        };
        var filterFunction = (0, index_1.transformCubeFilterToJsFilter)(filter);
        expect(filterFunction({ field: "value" })).toBe(true);
        expect(filterFunction({ field: "otherValue" })).toBe(false);
    });
    it("should handle CubeOperatorType.CONTAINS correctly with multiple values", function () {
        var filter = {
            member: "field",
            operator: enums_1.CubeOperatorType.CONTAINS,
            values: ["value", "otherValue"],
        };
        var filterFunction = (0, index_1.transformCubeFilterToJsFilter)(filter);
        expect(filterFunction({ field: "value" })).toBe(true);
        expect(filterFunction({ field: "otherValue" })).toBe(true);
    });
    it("should handle CubeOperatorType.NOT_CONTAINS correctly", function () {
        var filter = {
            member: "field",
            operator: enums_1.CubeOperatorType.NOT_CONTAINS,
            values: ["value"],
        };
        var filterFunction = (0, index_1.transformCubeFilterToJsFilter)(filter);
        expect(filterFunction({ field: "value" })).toBe(false);
        expect(filterFunction({ field: "otherValue" })).toBe(true);
    });
    it("should handle CubeOperatorType.NOT_CONTAINS correctly with multiple values", function () {
        var filter = {
            member: "field",
            operator: enums_1.CubeOperatorType.NOT_CONTAINS,
            values: ["value", "otherValue"],
        };
        var filterFunction = (0, index_1.transformCubeFilterToJsFilter)(filter);
        expect(filterFunction({ field: "value" })).toBe(false);
        expect(filterFunction({ field: "otherValue" })).toBe(false);
    });
    it("should handle CubeOperatorType.STARTS_WITH correctly", function () {
        var filter = {
            member: "field",
            operator: enums_1.CubeOperatorType.STARTS_WITH,
            values: ["val"],
        };
        var filterFunction = (0, index_1.transformCubeFilterToJsFilter)(filter);
        expect(filterFunction({ field: "va" })).toBe(false);
        expect(filterFunction({ field: "valuetest" })).toBe(true);
    });
    it("should handle CubeOperatorType.STARTS_WITH correctly with multiple values", function () {
        var filter = {
            member: "field",
            operator: enums_1.CubeOperatorType.STARTS_WITH,
            values: ["val", "va"],
        };
        var filterFunction = (0, index_1.transformCubeFilterToJsFilter)(filter);
        expect(filterFunction({ field: "va" })).toBe(true);
        expect(filterFunction({ field: "valuetest" })).toBe(true);
    });
    it("should handle CubeOperatorType.NOT_STARTS_WITH correctly", function () {
        var filter = {
            member: "field",
            operator: enums_1.CubeOperatorType.NOT_STARTS_WITH,
            values: ["val"],
        };
        var filterFunction = (0, index_1.transformCubeFilterToJsFilter)(filter);
        expect(filterFunction({ field: "va" })).toBe(true);
        expect(filterFunction({ field: "valuetest" })).toBe(false);
    });
    it("should handle CubeOperatorType.NOT_STARTS_WITH correctly with multiple values", function () {
        var filter = {
            member: "field",
            operator: enums_1.CubeOperatorType.NOT_STARTS_WITH,
            values: ["val", "va"],
        };
        var filterFunction = (0, index_1.transformCubeFilterToJsFilter)(filter);
        expect(filterFunction({ field: "va" })).toBe(false);
        expect(filterFunction({ field: "valuetest" })).toBe(false);
    });
    it("should handle CubeOperatorType.ENDS_WITH correctly", function () {
        var filter = {
            member: "field",
            operator: enums_1.CubeOperatorType.ENDS_WITH,
            values: ["ue"],
        };
        var filterFunction = (0, index_1.transformCubeFilterToJsFilter)(filter);
        expect(filterFunction({ field: "values" })).toBe(false);
        expect(filterFunction({ field: "testvalue" })).toBe(true);
    });
    it("should handle CubeOperatorType.ENDS_WITH correctly with multiple values", function () {
        var filter = {
            member: "field",
            operator: enums_1.CubeOperatorType.ENDS_WITH,
            values: ["ue", "es"],
        };
        var filterFunction = (0, index_1.transformCubeFilterToJsFilter)(filter);
        expect(filterFunction({ field: "es" })).toBe(true);
        expect(filterFunction({ field: "testvalue" })).toBe(true);
    });
    it("should handle CubeOperatorType.NOT_ENDS_WITH correctly", function () {
        var filter = {
            member: "field",
            operator: enums_1.CubeOperatorType.NOT_ENDS_WITH,
            values: ["ue"],
        };
        var filterFunction = (0, index_1.transformCubeFilterToJsFilter)(filter);
        expect(filterFunction({ field: "values" })).toBe(true);
        expect(filterFunction({ field: "testvalue" })).toBe(false);
    });
    it("should handle CubeOperatorType.NOT_ENDS_WITH correctly with multiple values", function () {
        var filter = {
            member: "field",
            operator: enums_1.CubeOperatorType.NOT_ENDS_WITH,
            values: ["ue", "es"],
        };
        var filterFunction = (0, index_1.transformCubeFilterToJsFilter)(filter);
        expect(filterFunction({ field: "es" })).toBe(false);
        expect(filterFunction({ field: "testvalue" })).toBe(false);
    });
    it("should handle CubeOperatorType.GT correctly", function () {
        var filter = {
            member: "field",
            operator: enums_1.CubeOperatorType.GT,
            values: ["5"],
        };
        var filterFunction = (0, index_1.transformCubeFilterToJsFilter)(filter);
        expect(filterFunction({ field: 10 })).toBe(true);
        expect(filterFunction({ field: 3 })).toBe(false);
    });
    it("should handle CubeOperatorType.GTE correctly", function () {
        var filter = {
            member: "field",
            operator: enums_1.CubeOperatorType.GTE,
            values: ["5"],
        };
        var filterFunction = (0, index_1.transformCubeFilterToJsFilter)(filter);
        expect(filterFunction({ field: 10 })).toBe(true);
        expect(filterFunction({ field: 5 })).toBe(true);
        expect(filterFunction({ field: 3 })).toBe(false);
    });
    it("should handle CubeOperatorType.LT correctly", function () {
        var filter = {
            member: "field",
            operator: enums_1.CubeOperatorType.LT,
            values: ["5"],
        };
        var filterFunction = (0, index_1.transformCubeFilterToJsFilter)(filter);
        expect(filterFunction({ field: 3 })).toBe(true);
        expect(filterFunction({ field: 7 })).toBe(false);
    });
    it("should handle CubeOperatorType.LTE correctly", function () {
        var filter = {
            member: "field",
            operator: enums_1.CubeOperatorType.LTE,
            values: ["5"],
        };
        var filterFunction = (0, index_1.transformCubeFilterToJsFilter)(filter);
        expect(filterFunction({ field: 3 })).toBe(true);
        expect(filterFunction({ field: 5 })).toBe(true);
        expect(filterFunction({ field: 7 })).toBe(false);
    });
    it("should handle CubeOperatorType.IN_DATE_RANGE correctly", function () {
        var filter = {
            member: "field",
            operator: enums_1.CubeOperatorType.IN_DATE_RANGE,
            values: ["2023-01-01", "2023-12-31"],
        };
        var filterFunction = (0, index_1.transformCubeFilterToJsFilter)(filter);
        expect(filterFunction({ field: "2023-06-15" })).toBe(true);
        expect(filterFunction({ field: "2022-06-15" })).toBe(false);
    });
    it("should handle CubeOperatorType.NOT_IN_DATE_RANGE correctly", function () {
        var filter = {
            member: "field",
            operator: enums_1.CubeOperatorType.NOT_IN_DATE_RANGE,
            values: ["2023-01-01", "2023-12-31"],
        };
        var filterFunction = (0, index_1.transformCubeFilterToJsFilter)(filter);
        expect(filterFunction({ field: "2023-06-15" })).toBe(false);
        expect(filterFunction({ field: "2022-06-15" })).toBe(true);
    });
    it("should handle CubeOperatorType.BEFORE_DATE correctly", function () {
        var filter = {
            member: "field",
            operator: enums_1.CubeOperatorType.BEFORE_DATE,
            values: ["2023-01-01"],
        };
        var filterFunction = (0, index_1.transformCubeFilterToJsFilter)(filter);
        expect(filterFunction({ field: "2022-06-15" })).toBe(true);
        expect(filterFunction({ field: "2023-06-15" })).toBe(false);
    });
    it("should handle CubeOperatorType.AFTER_DATE correctly", function () {
        var filter = {
            member: "field",
            operator: enums_1.CubeOperatorType.AFTER_DATE,
            values: ["2023-01-01"],
        };
        var filterFunction = (0, index_1.transformCubeFilterToJsFilter)(filter);
        expect(filterFunction({ field: "2022-06-15" })).toBe(false);
        expect(filterFunction({ field: "2023-06-15" })).toBe(true);
    });
    it("should handle CubeOperatorType.SET correctly", function () {
        var filter = {
            member: "field",
            operator: enums_1.CubeOperatorType.SET,
        };
        var filterFunction = (0, index_1.transformCubeFilterToJsFilter)(filter);
        expect(filterFunction({ field: null })).toBe(false);
        expect(filterFunction({ field: "someValue" })).toBe(true);
    });
    it("should handle CubeOperatorType.NOT_SET correctly", function () {
        var filter = {
            member: "field",
            operator: enums_1.CubeOperatorType.NOT_SET,
        };
        var filterFunction = (0, index_1.transformCubeFilterToJsFilter)(filter);
        expect(filterFunction({ field: null })).toBe(true);
        expect(filterFunction({ field: "someValue" })).toBe(false);
    });
    it("should handle LogicalAndFilter correctly", function () {
        var filter = {
            and: [
                {
                    member: "field1",
                    operator: enums_1.CubeOperatorType.EQUALS,
                    values: ["value1"],
                },
                {
                    member: "field2",
                    operator: enums_1.CubeOperatorType.EQUALS,
                    values: ["value2"],
                },
            ],
        };
        var filterFunction = (0, index_1.transformCubeFilterToJsFilter)(filter);
        expect(filterFunction({ field1: "value1", field2: "value2" })).toBe(true);
        expect(filterFunction({ field1: "value1", field2: "wrongValue" })).toBe(false);
    });
    it("should handle LogicalOrFilter correctly", function () {
        var filter = {
            or: [
                {
                    member: "field1",
                    operator: enums_1.CubeOperatorType.EQUALS,
                    values: ["value1"],
                },
                {
                    member: "field2",
                    operator: enums_1.CubeOperatorType.EQUALS,
                    values: ["value2"],
                },
            ],
        };
        var filterFunction = (0, index_1.transformCubeFilterToJsFilter)(filter);
        expect(filterFunction({ field1: "value1" })).toBe(true);
        expect(filterFunction({ field2: "value2" })).toBe(true);
        expect(filterFunction({ field1: "wrongValue", field2: "value2" })).toBe(true);
        expect(filterFunction({ field1: "wrongValue", field2: "wrongValue" })).toBe(false);
    });
});
describe("transformCubeFiltersToJsFilter", function () {
    it("should handle multiple filters with AND logic correctly", function () {
        var filters = [
            {
                member: "field1",
                operator: enums_1.CubeOperatorType.EQUALS,
                values: ["value1"],
            },
            {
                member: "field2",
                operator: enums_1.CubeOperatorType.EQUALS,
                values: ["value2"],
            },
        ];
        var filterFunction = (0, index_1.transformCubeFiltersToJsFilter)(filters);
        expect(filterFunction({ field1: "value1", field2: "value2" })).toBe(true);
        expect(filterFunction({ field1: "value1", field2: "wrongValue" })).toBe(false);
        expect(filterFunction({ field1: "wrongValue", field2: "value2" })).toBe(false);
    });
    it("should handle nested AND and OR filters correctly", function () {
        var filters = [
            {
                and: [
                    {
                        member: "field1",
                        operator: enums_1.CubeOperatorType.EQUALS,
                        values: ["value1"],
                    },
                    {
                        member: "field2",
                        operator: enums_1.CubeOperatorType.EQUALS,
                        values: ["value2"],
                    },
                ],
            },
            {
                or: [
                    {
                        member: "field3",
                        operator: enums_1.CubeOperatorType.EQUALS,
                        values: ["value3"],
                    },
                    {
                        member: "field4",
                        operator: enums_1.CubeOperatorType.EQUALS,
                        values: ["value4"],
                    },
                ],
            },
        ];
        var filterFunction = (0, index_1.transformCubeFiltersToJsFilter)(filters);
        expect(filterFunction({
            field1: "value1",
            field2: "value2",
            field3: "wrongValue",
        })).toBe(false);
        expect(filterFunction({ field1: "value1", field2: "value2", field3: "value3" })).toBe(true);
        expect(filterFunction({
            field1: "value1",
            field2: "value2",
            field4: "value4",
        })).toBe(true);
        expect(filterFunction({
            field1: "wrongValue",
            field2: "value2",
            field3: "wrongValue",
        })).toBe(false);
    });
});
