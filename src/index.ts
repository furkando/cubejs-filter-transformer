import {
  Filter,
  LogicalAndFilter,
  LogicalOrFilter,
  UnaryFilter,
} from "@cubejs-client/core";
import moment from "moment";
import { CubeFilterFieldType, CubeOperatorType } from "./enums";

type FilterFunction<T> = (item: T) => boolean;

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
export function transformCubeFilterToJsFilter<T>(
  filter: Filter
): FilterFunction<T> {
  if (CubeFilterFieldType.VALUES in filter) {
    const { member, operator, values } = filter;

    switch (operator) {
      case CubeOperatorType.EQUALS:
        return (item: T) =>
          values.some((v) => item[member]?.toString() === v.toString());
      case CubeOperatorType.NOT_EQUALS:
        return (item: T) =>
          values.every((v) => item[member]?.toString() !== v.toString());
      case CubeOperatorType.CONTAINS:
        return (item: T) =>
          values.some((v) => item[member]?.includes(v.toString()));
      case CubeOperatorType.NOT_CONTAINS:
        return (item: T) =>
          values.every((v) => !item[member]?.includes(v.toString()));
      case CubeOperatorType.STARTS_WITH:
        return (item: T) =>
          values.some((v) => item[member]?.startsWith(v.toString()));
      case CubeOperatorType.NOT_STARTS_WITH:
        return (item: T) =>
          values.every((v) => !item[member]?.startsWith(v.toString()));
      case CubeOperatorType.ENDS_WITH:
        return (item: T) =>
          values.some((v) => item[member]?.endsWith(v.toString()));
      case CubeOperatorType.NOT_ENDS_WITH:
        return (item: T) =>
          values.every((v) => !item[member]?.endsWith(v.toString()));
      case CubeOperatorType.GT:
        return (item: T) =>
          values.some((v) => Number(item[member]) > Number(v));
      case CubeOperatorType.GTE:
        return (item: T) =>
          values.some((v) => Number(item[member]) >= Number(v));
      case CubeOperatorType.LT:
        return (item: T) =>
          values.some((v) => Number(item[member]) < Number(v));
      case CubeOperatorType.LTE:
        return (item: T) =>
          values.some((v) => Number(item[member]) <= Number(v));
      case CubeOperatorType.IN_DATE_RANGE:
        const [start, end] = values;
        return (item: T) =>
          moment(item[member]).isBetween(moment(start), moment(end));
      case CubeOperatorType.NOT_IN_DATE_RANGE:
        const [notStart, notEnd] = values;
        return (item: T) =>
          !moment(item[member]).isBetween(moment(notStart), moment(notEnd));
      case CubeOperatorType.BEFORE_DATE:
        return (item: T) => moment(item[member]).isBefore(moment(values[0]));
      case CubeOperatorType.AFTER_DATE:
        return (item: T) => moment(item[member]).isAfter(moment(values[0]));
      default:
        throw new Error(`Unsupported operator: ${operator}`);
    }
  }

  if (CubeFilterFieldType.OPERATOR in filter) {
    const { member, operator } = filter as UnaryFilter;

    switch (operator) {
      case CubeOperatorType.SET:
        return (item: T) => item[member] !== null;
      case CubeOperatorType.NOT_SET:
        return (item: T) => item[member] === null;
      default:
        throw new Error(`Unsupported operator: ${operator}`);
    }
  }

  if (CubeFilterFieldType.AND in filter) {
    const { and } = filter as LogicalAndFilter;
    const filterFunctions = and.map((f) => transformCubeFilterToJsFilter<T>(f));
    return (item: T) => filterFunctions.every((fn) => fn(item));
  }

  if (CubeFilterFieldType.OR in filter) {
    const { or } = filter as LogicalOrFilter;
    const filterFunctions = or.map((f) => transformCubeFilterToJsFilter<T>(f));
    return (item: T) => filterFunctions.some((fn) => fn(item));
  }

  throw new Error(`Unsupported filter type: ${JSON.stringify(filter)}`);
}

export function transformCubeFiltersToJsFilter<T>(
  filters: Filter[]
): FilterFunction<T> {
  const filterFunctions = filters.map((f) =>
    transformCubeFilterToJsFilter<T>(f)
  );
  return (item: T) => filterFunctions.every((fn) => fn(item));
}
