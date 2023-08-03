import {
  Filter,
  LogicalAndFilter,
  LogicalOrFilter,
  UnaryFilter,
} from "@cubejs-client/core";
import { CubeOperatorType } from "./enums";
import {
  transformCubeFilterToJsFilter,
  transformCubeFiltersToJsFilter,
} from "./index"; // Update the import path based on your file structure

describe("transformCubeFilterToJsFilter", () => {
  it("should handle CubeOperatorType.EQUALS correctly", () => {
    const filter: Filter = {
      member: "field",
      operator: CubeOperatorType.EQUALS,
      values: ["value"],
    };
    const filterFunction = transformCubeFilterToJsFilter(filter);
    expect(filterFunction({ field: "value" })).toBe(true);
    expect(filterFunction({ field: "otherValue" })).toBe(false);
  });

  it("should handle CubeOperatorType.EQUALS correctly with multiple values", () => {
    const filter: Filter = {
      member: "field",
      operator: CubeOperatorType.EQUALS,
      values: ["value", "otherValue"],
    };
    const filterFunction = transformCubeFilterToJsFilter(filter);
    expect(filterFunction({ field: "value" })).toBe(true);
    expect(filterFunction({ field: "otherValue" })).toBe(true);
  });

  it("should handle CubeOperatorType.NOT_EQUALS correctly", () => {
    const filter: Filter = {
      member: "field",
      operator: CubeOperatorType.NOT_EQUALS,
      values: ["value"],
    };
    const filterFunction = transformCubeFilterToJsFilter(filter);
    expect(filterFunction({ field: "value" })).toBe(false);
    expect(filterFunction({ field: "otherValue" })).toBe(true);
  });

  it("should handle CubeOperatorType.NOT_EQUALS correctly with multiple values", () => {
    const filter: Filter = {
      member: "field",
      operator: CubeOperatorType.NOT_EQUALS,
      values: ["value", "otherValue"],
    };
    const filterFunction = transformCubeFilterToJsFilter(filter);
    expect(filterFunction({ field: "value" })).toBe(false);
    expect(filterFunction({ field: "otherValue" })).toBe(false);
  });

  it("should handle CubeOperatorType.CONTAINS correctly", () => {
    const filter: Filter = {
      member: "field",
      operator: CubeOperatorType.CONTAINS,
      values: ["value"],
    };
    const filterFunction = transformCubeFilterToJsFilter(filter);
    expect(filterFunction({ field: "value" })).toBe(true);
    expect(filterFunction({ field: "otherValue" })).toBe(false);
  });

  it("should handle CubeOperatorType.CONTAINS correctly with multiple values", () => {
    const filter: Filter = {
      member: "field",
      operator: CubeOperatorType.CONTAINS,
      values: ["value", "otherValue"],
    };
    const filterFunction = transformCubeFilterToJsFilter(filter);
    expect(filterFunction({ field: "value" })).toBe(true);
    expect(filterFunction({ field: "otherValue" })).toBe(true);
  });

  it("should handle CubeOperatorType.NOT_CONTAINS correctly", () => {
    const filter: Filter = {
      member: "field",
      operator: CubeOperatorType.NOT_CONTAINS,
      values: ["value"],
    };
    const filterFunction = transformCubeFilterToJsFilter(filter);
    expect(filterFunction({ field: "value" })).toBe(false);
    expect(filterFunction({ field: "otherValue" })).toBe(true);
  });

  it("should handle CubeOperatorType.NOT_CONTAINS correctly with multiple values", () => {
    const filter: Filter = {
      member: "field",
      operator: CubeOperatorType.NOT_CONTAINS,
      values: ["value", "otherValue"],
    };
    const filterFunction = transformCubeFilterToJsFilter(filter);
    expect(filterFunction({ field: "value" })).toBe(false);
    expect(filterFunction({ field: "otherValue" })).toBe(false);
  });

  it("should handle CubeOperatorType.STARTS_WITH correctly", () => {
    const filter: Filter = {
      member: "field",
      operator: CubeOperatorType.STARTS_WITH,
      values: ["val"],
    };
    const filterFunction = transformCubeFilterToJsFilter(filter);
    expect(filterFunction({ field: "va" })).toBe(false);
    expect(filterFunction({ field: "valuetest" })).toBe(true);
  });

  it("should handle CubeOperatorType.STARTS_WITH correctly with multiple values", () => {
    const filter: Filter = {
      member: "field",
      operator: CubeOperatorType.STARTS_WITH,
      values: ["val", "va"],
    };
    const filterFunction = transformCubeFilterToJsFilter(filter);
    expect(filterFunction({ field: "va" })).toBe(true);
    expect(filterFunction({ field: "valuetest" })).toBe(true);
  });

  it("should handle CubeOperatorType.NOT_STARTS_WITH correctly", () => {
    const filter: Filter = {
      member: "field",
      operator: CubeOperatorType.NOT_STARTS_WITH,
      values: ["val"],
    };
    const filterFunction = transformCubeFilterToJsFilter(filter);
    expect(filterFunction({ field: "va" })).toBe(true);
    expect(filterFunction({ field: "valuetest" })).toBe(false);
  });

  it("should handle CubeOperatorType.NOT_STARTS_WITH correctly with multiple values", () => {
    const filter: Filter = {
      member: "field",
      operator: CubeOperatorType.NOT_STARTS_WITH,
      values: ["val", "va"],
    };
    const filterFunction = transformCubeFilterToJsFilter(filter);
    expect(filterFunction({ field: "va" })).toBe(false);
    expect(filterFunction({ field: "valuetest" })).toBe(false);
  });

  it("should handle CubeOperatorType.ENDS_WITH correctly", () => {
    const filter: Filter = {
      member: "field",
      operator: CubeOperatorType.ENDS_WITH,
      values: ["ue"],
    };
    const filterFunction = transformCubeFilterToJsFilter(filter);
    expect(filterFunction({ field: "values" })).toBe(false);
    expect(filterFunction({ field: "testvalue" })).toBe(true);
  });

  it("should handle CubeOperatorType.ENDS_WITH correctly with multiple values", () => {
    const filter: Filter = {
      member: "field",
      operator: CubeOperatorType.ENDS_WITH,
      values: ["ue", "es"],
    };
    const filterFunction = transformCubeFilterToJsFilter(filter);
    expect(filterFunction({ field: "es" })).toBe(true);
    expect(filterFunction({ field: "testvalue" })).toBe(true);
  });

  it("should handle CubeOperatorType.NOT_ENDS_WITH correctly", () => {
    const filter: Filter = {
      member: "field",
      operator: CubeOperatorType.NOT_ENDS_WITH,
      values: ["ue"],
    };
    const filterFunction = transformCubeFilterToJsFilter(filter);
    expect(filterFunction({ field: "values" })).toBe(true);
    expect(filterFunction({ field: "testvalue" })).toBe(false);
  });

  it("should handle CubeOperatorType.NOT_ENDS_WITH correctly with multiple values", () => {
    const filter: Filter = {
      member: "field",
      operator: CubeOperatorType.NOT_ENDS_WITH,
      values: ["ue", "es"],
    };
    const filterFunction = transformCubeFilterToJsFilter(filter);
    expect(filterFunction({ field: "es" })).toBe(false);
    expect(filterFunction({ field: "testvalue" })).toBe(false);
  });

  it("should handle CubeOperatorType.GT correctly", () => {
    const filter: Filter = {
      member: "field",
      operator: CubeOperatorType.GT,
      values: ["5"],
    };
    const filterFunction = transformCubeFilterToJsFilter(filter);
    expect(filterFunction({ field: 10 })).toBe(true);
    expect(filterFunction({ field: 3 })).toBe(false);
  });

  it("should handle CubeOperatorType.GTE correctly", () => {
    const filter: Filter = {
      member: "field",
      operator: CubeOperatorType.GTE,
      values: ["5"],
    };
    const filterFunction = transformCubeFilterToJsFilter(filter);
    expect(filterFunction({ field: 10 })).toBe(true);
    expect(filterFunction({ field: 5 })).toBe(true);
    expect(filterFunction({ field: 3 })).toBe(false);
  });

  it("should handle CubeOperatorType.LT correctly", () => {
    const filter: Filter = {
      member: "field",
      operator: CubeOperatorType.LT,
      values: ["5"],
    };
    const filterFunction = transformCubeFilterToJsFilter(filter);
    expect(filterFunction({ field: 3 })).toBe(true);
    expect(filterFunction({ field: 7 })).toBe(false);
  });

  it("should handle CubeOperatorType.LTE correctly", () => {
    const filter: Filter = {
      member: "field",
      operator: CubeOperatorType.LTE,
      values: ["5"],
    };
    const filterFunction = transformCubeFilterToJsFilter(filter);
    expect(filterFunction({ field: 3 })).toBe(true);
    expect(filterFunction({ field: 5 })).toBe(true);
    expect(filterFunction({ field: 7 })).toBe(false);
  });

  it("should handle CubeOperatorType.IN_DATE_RANGE correctly", () => {
    const filter: Filter = {
      member: "field",
      operator: CubeOperatorType.IN_DATE_RANGE,
      values: ["2023-01-01", "2023-12-31"],
    };
    const filterFunction = transformCubeFilterToJsFilter(filter);
    expect(filterFunction({ field: "2023-06-15" })).toBe(true);
    expect(filterFunction({ field: "2022-06-15" })).toBe(false);
  });

  it("should handle CubeOperatorType.NOT_IN_DATE_RANGE correctly", () => {
    const filter: Filter = {
      member: "field",
      operator: CubeOperatorType.NOT_IN_DATE_RANGE,
      values: ["2023-01-01", "2023-12-31"],
    };
    const filterFunction = transformCubeFilterToJsFilter(filter);
    expect(filterFunction({ field: "2023-06-15" })).toBe(false);
    expect(filterFunction({ field: "2022-06-15" })).toBe(true);
  });

  it("should handle CubeOperatorType.BEFORE_DATE correctly", () => {
    const filter: Filter = {
      member: "field",
      operator: CubeOperatorType.BEFORE_DATE,
      values: ["2023-01-01"],
    };
    const filterFunction = transformCubeFilterToJsFilter(filter);
    expect(filterFunction({ field: "2022-06-15" })).toBe(true);
    expect(filterFunction({ field: "2023-06-15" })).toBe(false);
  });

  it("should handle CubeOperatorType.AFTER_DATE correctly", () => {
    const filter: Filter = {
      member: "field",
      operator: CubeOperatorType.AFTER_DATE,
      values: ["2023-01-01"],
    };
    const filterFunction = transformCubeFilterToJsFilter(filter);
    expect(filterFunction({ field: "2022-06-15" })).toBe(false);
    expect(filterFunction({ field: "2023-06-15" })).toBe(true);
  });

  it("should handle CubeOperatorType.SET correctly", () => {
    const filter: UnaryFilter = {
      member: "field",
      operator: CubeOperatorType.SET,
    };
    const filterFunction = transformCubeFilterToJsFilter(filter);
    expect(filterFunction({ field: null })).toBe(false);
    expect(filterFunction({ field: "someValue" })).toBe(true);
  });

  it("should handle CubeOperatorType.NOT_SET correctly", () => {
    const filter: UnaryFilter = {
      member: "field",
      operator: CubeOperatorType.NOT_SET,
    };
    const filterFunction = transformCubeFilterToJsFilter(filter);
    expect(filterFunction({ field: null })).toBe(true);
    expect(filterFunction({ field: "someValue" })).toBe(false);
  });

  it("should handle LogicalAndFilter correctly", () => {
    const filter: LogicalAndFilter = {
      and: [
        {
          member: "field1",
          operator: CubeOperatorType.EQUALS,
          values: ["value1"],
        },
        {
          member: "field2",
          operator: CubeOperatorType.EQUALS,
          values: ["value2"],
        },
      ],
    };
    const filterFunction = transformCubeFilterToJsFilter(filter);
    expect(filterFunction({ field1: "value1", field2: "value2" })).toBe(true);
    expect(filterFunction({ field1: "value1", field2: "wrongValue" })).toBe(
      false
    );
  });

  it("should handle LogicalOrFilter correctly", () => {
    const filter: LogicalOrFilter = {
      or: [
        {
          member: "field1",
          operator: CubeOperatorType.EQUALS,
          values: ["value1"],
        },
        {
          member: "field2",
          operator: CubeOperatorType.EQUALS,
          values: ["value2"],
        },
      ],
    };
    const filterFunction = transformCubeFilterToJsFilter(filter);
    expect(filterFunction({ field1: "value1" })).toBe(true);
    expect(filterFunction({ field2: "value2" })).toBe(true);
    expect(filterFunction({ field1: "wrongValue", field2: "value2" })).toBe(
      true
    );
    expect(filterFunction({ field1: "wrongValue", field2: "wrongValue" })).toBe(
      false
    );
  });
});

describe("transformCubeFiltersToJsFilter", () => {
  it("should handle multiple filters with AND logic correctly", () => {
    const filters: Filter[] = [
      {
        member: "field1",
        operator: CubeOperatorType.EQUALS,
        values: ["value1"],
      },
      {
        member: "field2",
        operator: CubeOperatorType.EQUALS,
        values: ["value2"],
      },
    ];
    const filterFunction = transformCubeFiltersToJsFilter(filters);
    expect(filterFunction({ field1: "value1", field2: "value2" })).toBe(true);
    expect(filterFunction({ field1: "value1", field2: "wrongValue" })).toBe(
      false
    );
    expect(filterFunction({ field1: "wrongValue", field2: "value2" })).toBe(
      false
    );
  });

  it("should handle nested AND and OR filters correctly", () => {
    const filters: Filter[] = [
      {
        and: [
          {
            member: "field1",
            operator: CubeOperatorType.EQUALS,
            values: ["value1"],
          },
          {
            member: "field2",
            operator: CubeOperatorType.EQUALS,
            values: ["value2"],
          },
        ],
      },
      {
        or: [
          {
            member: "field3",
            operator: CubeOperatorType.EQUALS,
            values: ["value3"],
          },
          {
            member: "field4",
            operator: CubeOperatorType.EQUALS,
            values: ["value4"],
          },
        ],
      },
    ];
    const filterFunction = transformCubeFiltersToJsFilter(filters);
    expect(
      filterFunction({
        field1: "value1",
        field2: "value2",
        field3: "wrongValue",
      })
    ).toBe(false);
    expect(
      filterFunction({ field1: "value1", field2: "value2", field3: "value3" })
    ).toBe(true);
    expect(
      filterFunction({
        field1: "value1",
        field2: "value2",
        field4: "value4",
      })
    ).toBe(true);
    expect(
      filterFunction({
        field1: "wrongValue",
        field2: "value2",
        field3: "wrongValue",
      })
    ).toBe(false);
  });
});
