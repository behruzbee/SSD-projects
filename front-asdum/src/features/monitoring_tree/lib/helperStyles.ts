import {IMappedTree} from './types';

export const busStatusStyles = (data: IMappedTree) =>
    typeof data.status == 'string'
        ? {
              '& > div': {
                  p: '0 11px',
                  '& .MuiTreeItem-iconContainer': {
                      display: 'none !important',
                  },
              },
          }
        : undefined;
