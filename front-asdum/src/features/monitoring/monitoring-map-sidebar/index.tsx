import cx from 'classnames';
import React from 'react';
import {useTranslation} from 'react-i18next';

import {SideBar} from '@components/SideBar';
import {useMonitoringTreeModel} from '@features/monitoring_tree';
import RightSideWrapper from '@features/RightSideWrapper';
import {SvgGenerator} from '@shared/components';
import DataLoading from '@shared/hoc/DataLoading';

import {ReactComponent as bus} from './assets/sidebar-bus.svg';
import s from './index.module.scss';
import {useMSidebarOperations} from './lib/useMSidebarOperations';
import {StatusSelect} from './ui/status-select';

export const MonitoringMapSidebar = () => {
    const {t} = useTranslation();
    const {showStatus, handleEdit, handleCancel, handleSubmit} =
        useMSidebarOperations();
    const [isOpen, selectedBus, toggle] = useMonitoringTreeModel((s) => [
        s.isSidebarOpen,
        s.sidebarSelectedBus,
        s.toggleSidebar,
    ]);

    const gosNumber = selectedBus?.gos_no.split('/') || [];
    return (
        <SideBar
            topInner
            maxWidth="410px"
            onOutSideClick={() => null}
            // onOutSideClick={outsideClick}
            isOpen={isOpen}
        >
            <form onSubmit={handleSubmit} className={s.form}>
                <RightSideWrapper
                    title={t('transport_info')}
                    editText={t('edit_status')}
                    onEdit={handleEdit}
                    handleClose={() => toggle(false)}
                    isEditable={showStatus}
                    handleCancel={handleCancel}
                >
                    <DataLoading
                        loading={false}
                        data={Object.keys(selectedBus || {})}
                    >
                        <div className={s.stationImg}>
                            <SvgGenerator className={s.sidebarImg} Icon={bus} />
                        </div>
                        <div className={cx(s.element, s.busGos)}>
                            <div>
                                <span>
                                    {
                                        (gosNumber as [])[
                                            (gosNumber as []).length - 1
                                        ]
                                    }
                                </span>
                            </div>
                            {showStatus ? <StatusSelect /> : null}
                        </div>
                        <div className={s.element}>
                            <span className={s.elementTitle}>
                                {t('autopark')}
                            </span>
                            <div className="roundedBlue">
                                <span>{selectedBus?.gos_no}</span>
                            </div>
                        </div>

                        <div className={s.element}>
                            <span className={s.elementTitle}>{t('route')}</span>
                            <div className="roundedBlue">
                                <span>Route name</span>
                            </div>
                        </div>

                        <div className={s.element}>
                            <span className={s.elementTitle}>
                                {t('transport_model')}
                            </span>
                            <div className="roundedBlue">
                                <span>Model</span>
                            </div>
                        </div>

                        <div className={s.element}>
                            <span className={s.elementTitle}>{t('speed')}</span>
                            <div className="roundedBlue">
                                <span>{selectedBus?.speed} км/ч</span>
                            </div>
                        </div>

                        <div className={s.element}>
                            <span className={s.elementTitle}>
                                {t('location')}
                            </span>
                            <div className="roundedBlue">
                                <span>Широта: {selectedBus?.lat}</span>
                                <br />
                                <span>Долгота: {selectedBus?.lng}</span>
                            </div>
                        </div>

                        <div className={s.element}>
                            <span className={s.elementTitle}>{t('time')}</span>
                            <div className="roundedBlue">
                                <span>{selectedBus?.reg_date}</span>
                            </div>
                        </div>

                        <div className={s.element}>
                            <span className={s.elementTitle}>
                                {t('driver_fio')}
                            </span>
                            <div className="roundedBlue">
                                <span>Driver</span>
                            </div>
                        </div>

                        <div className={s.element}>
                            <span className={s.elementTitle}>
                                {t('tab_number')}
                            </span>
                            <div className="roundedBlue">
                                <span>Tab number</span>
                            </div>
                        </div>

                        <div className={s.element}>
                            <span className={s.elementTitle}>
                                {t('tel_number')}
                            </span>
                            <div className="roundedBlue">
                                <span>Tel number</span>
                            </div>
                        </div>

                        {/*<div className={s.sidebarButton}>*/}
                        {/*    <LoadingButton loading={false}>*/}
                        {/*        {t('change_status')}*/}
                        {/*    </LoadingButton>*/}
                        {/*</div>*/}
                    </DataLoading>
                </RightSideWrapper>
            </form>
        </SideBar>
    );
};
