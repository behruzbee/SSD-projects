import {TreeItem} from '@mui/lab';
import React, {FC} from 'react';

import {busStatusStyles} from '../lib/helperStyles';
import {IMappedTree} from '../lib/types';
import NameAndStatusWithChbx from './NameAndStatusWithChbx';

interface Props {
    nodes: IMappedTree;
    isLoading: boolean;
}

export const RenderTree: FC<Props> = React.memo(({nodes, isLoading}) => {
    return (
        <TreeItem
            id={`id${nodes?.unique_id}`}
            nodeId={nodes?.unique_id}
            sx={busStatusStyles(nodes)}
            label={
                <NameAndStatusWithChbx nodes={nodes} isLoading={isLoading} />
            }
        >
            {Array.isArray(nodes?.children)
                ? nodes.children.map((node) => (
                      <RenderTree
                          key={node.unique_id}
                          nodes={node}
                          isLoading={isLoading}
                      />
                  ))
                : null}
        </TreeItem>
    );
});
