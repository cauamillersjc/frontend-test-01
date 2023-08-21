const initialState = {
    filter: "",
    widgets: [],
    lastId: 0,
};

// Função responsável por salvar um widget novo ou um já cadastrado.
const saveWidget = (state, action) => {
    const indexId = state.widgets.findIndex((widget) => widget.id === action.payload.id);

    if (indexId === -1) {
        const newWidget = {
            ...action.payload,
            id: state.lastId + 1,
        };

        return {
            ...state,
            widgets: [...state.widgets, newWidget],
            lastId: state.lastId + 1,
        };
    }

    const updatedWidgets = [...state.widgets];
    updatedWidgets[indexId] = { ...action.payload };

    return {
        ...state,
        widgets: updatedWidgets,
    };
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case "SAVE_WIDGET":
            return saveWidget(state, action);
        case "DELETE_WIDGET":
            const updatedWidgets = state.widgets.filter(widget => widget.id !== action.payload);
            return {
                ...state,
                widgets: updatedWidgets,
            };
        default:
            return state;
    }
}

export default reducer;