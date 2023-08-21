export const selectWidgetByTitle = (state, text) => {
    return state.widgets.filter(widget => widget.title.toLowerCase().includes(text.toLowerCase()));
}