import {IconButton} from '@mui/material';
import React from 'react';
import {Control, Path} from 'react-hook-form';
import shallow from 'zustand/shallow';

import WhiteTrashIcon from '@src/images/svgs/WhiteTrashIcon';
import {useStationsListStore} from '@src/shared/store/stations_list';

import {ISubmitStation} from '../../lib';
import AddibleRoutes from '../../modules';

type Props = {
    control: Control<ISubmitStation, Path<ISubmitStation>>;
};

const RoutesWrapper: React.FC<Props> = ({control}) => {
    const {isEditable, routes, setRoutes} = useStationsListStore(
        (state) => state,
        shallow,
    );
    const handleRemove = (route: string) =>
        setRoutes(routes?.filter((item) => item !== route));

    return (
        <div className="routesWrapper">
            {routes?.length && routes[0]
                ? routes?.map((route) =>
                      isEditable ? (
                          <div className="roundedTrash" key={route}>
                              <span>{route}</span>
                              <IconButton
                                  sx={{padding: 0}}
                                  size="small"
                                  onClick={() => handleRemove(route)}
                              >
                                  <div className="trashDiv">
                                      <WhiteTrashIcon className="trashIcon" />
                                  </div>
                              </IconButton>
                          </div>
                      ) : (
                          <div className="roundedGray" key={route}>
                              <span>{route}</span>
                          </div>
                      ),
                  )
                : null}

            {isEditable && <AddibleRoutes control={control} />}
        </div>
    );
};

export default RoutesWrapper;
