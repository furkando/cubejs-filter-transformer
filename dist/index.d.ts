import { Filter } from "@cubejs-client/core";
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
export declare const transformCubeFilterToJsFilter: <T>(filter: Filter) => FilterFunction<T>;
export declare const transformCubeFiltersToJsFilter: <T>(filters: Filter[]) => FilterFunction<T>;
export {};
