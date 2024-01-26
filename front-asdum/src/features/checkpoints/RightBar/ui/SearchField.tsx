import React, {FC, useEffect, useState} from 'react';

import {useSearchedData} from '@src/shared/api/stations_list/hooks';
import SearchComponent from '@src/shared/components/SearchComponent';

import {NameIdModel} from '@models/name_id_model';

type Props = {
    handleClick: (item: NameIdModel) => void;
    visible?: boolean;
    setVisible: (visible: boolean) => void;
};

const SearchField: FC<Props> = ({handleClick, visible = true, setVisible}) => {
    const [searchValue, setSearchValue] = useState('');
    const [activeSide, setActiveSide] = useState(1);

    const searchTerm = activeSide === 1 ? 'name' : 'unique_id';
    const {searchedData, isLoading} = useSearchedData(searchTerm, searchValue);

    useEffect(() => setVisible(true), [searchValue]);

    const handleSearchChange = (e: any) => {
        const value = e.target.value;
        console.log(parseInt(value));
        if (value && !!parseInt(value)) {
            setActiveSide(2);
        } else {
            setActiveSide(1);
        }
        setSearchValue(e.target.value);
    };

    const handleSearch = (value: number) => setActiveSide(value);

    return (
        <SearchComponent
            isLoading={isLoading}
            value={searchValue}
            options={searchedData}
            activeSide={activeSide}
            handleActive={handleSearch}
            handleChange={handleSearchChange}
            firstText="stations"
            secondText="ID"
            handleItem={handleClick}
            visible={visible}
        />
    );
};

export default SearchField;
