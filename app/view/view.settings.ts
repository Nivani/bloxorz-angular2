export const viewSettings = {
    TILE_SIZE: 50,
    TILE_HEIGHT: 5,

    modelXToRealX: function modelXToRealX(x) {
        return (-2.5 + x) * viewSettings.TILE_SIZE;
    },

    modelZToRealZ: function modelZToRealZ(z) {
        return (-2.5 + z) * viewSettings.TILE_SIZE;
    }
};