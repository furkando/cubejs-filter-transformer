export enum CubeOperatorType {
  EQUALS = "equals",
  NOT_EQUALS = "notEquals",
  CONTAINS = "contains",
  NOT_CONTAINS = "notContains",
  STARTS_WITH = "startsWith",
  NOT_STARTS_WITH = "notStartsWith",
  ENDS_WITH = "endsWith",
  NOT_ENDS_WITH = "notEndsWith",
  GT = "gt",
  GTE = "gte",
  LT = "lt",
  LTE = "lte",
  IN_DATE_RANGE = "inDateRange",
  NOT_IN_DATE_RANGE = "notInDateRange",
  BEFORE_DATE = "beforeDate",
  AFTER_DATE = "afterDate",
  SET = "set",
  NOT_SET = "notSet",
}

export enum CubeFilterFieldType {
  AND = "and",
  OR = "or",
  VALUES = "values",
  OPERATOR = "operator",
  MEMBER = "member",
}
