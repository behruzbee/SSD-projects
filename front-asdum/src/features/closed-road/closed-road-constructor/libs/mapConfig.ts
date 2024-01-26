import L from 'leaflet';

export const mapConfig = () => {
    const stationsLayer = new L.FeatureGroup();
    const polylineLayer = new L.FeatureGroup();

    const drawControl = new L.Control.Draw({
        position: 'topright',
        edit: {
            featureGroup: polylineLayer,
            remove: false,
        },
        draw: {
            marker: false,
            polyline: {
                shapeOptions: {
                    color: 'red',
                    weight: 4,
                },
            },
            rectangle: false,
            circle: false,
            circlemarker: false,
            polygon: false,
        },
    });

    L.drawLocal.draw.toolbar.buttons.polyline = 'Рисовать маршрут';
    L.drawLocal.draw.toolbar.actions.title = 'Отменить все изменения';
    L.drawLocal.draw.toolbar.actions.text = 'Отменить';
    L.drawLocal.draw.toolbar.finish.title = 'Завершить рисования маршрута';
    L.drawLocal.draw.toolbar.finish.text = 'Завершить';
    L.drawLocal.draw.toolbar.undo.title = 'Удалить последнюю точку';
    L.drawLocal.draw.toolbar.undo.text = 'Удалить последнюю точку';

    L.drawLocal.edit.toolbar.buttons.edit = 'Изменить слой';
    L.drawLocal.edit.toolbar.buttons.editDisabled =
        'Нет слоя для редактирования';
    L.drawLocal.edit.toolbar.buttons.remove = 'Удалить слой';
    L.drawLocal.edit.toolbar.buttons.removeDisabled = 'Нет слоя для удаления';
    L.drawLocal.edit.toolbar.actions.save = {
        text: 'Сохранить',
        title: 'Сохранить',
    };
    L.drawLocal.edit.toolbar.actions.cancel = {
        text: 'Отменить',
        title: 'Отменить',
    };
    L.drawLocal.edit.toolbar.actions.clearAll = {
        text: 'Очистить всё',
        title: 'Очистить всё',
    };

    return {stationsLayer, polylineLayer, drawControl};
};
