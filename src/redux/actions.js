export const saveWidget = (widget) => {
    return{
        type: "SAVE_WIDGET",
        payload: widget,
    };
}

export const deleteWidget = (id) => {
    return {
        type: "DELETE_WIDGET",
        payload: id,
    };
};