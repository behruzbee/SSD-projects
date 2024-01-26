import {NormalizedSchema, normalize, schema} from 'normalizr';

import {Override} from '@models/_helperTypes';

import {IMappedTree} from '../../lib/types';

interface Entities {
    buses: 'buses';
    routes: 'routes';
    parks: 'parks';
}

type NormalizedData = Override<IMappedTree, {children: number[]}>;

export type NormalizedDataSchema = NormalizedSchema<
    {[P in keyof Entities]: {[key: string]: NormalizedData} | undefined},
    any
>;

const entities: Entities = {
    buses: 'buses',
    routes: 'routes',
    parks: 'parks',
};

const bus = new schema.Entity(entities.buses, {});

const route = new schema.Entity(entities.routes, {
    children: [bus],
});

const park = new schema.Entity(entities.parks, {
    children: [route],
});

export const normalizeData = (data: IMappedTree[]): NormalizedDataSchema =>
    normalize(data, [park]);
