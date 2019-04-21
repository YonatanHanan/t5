
export const stringToRows = (context, string, WIDTH_MARGIN) => {
    let rows = [];
    const width = context.canvas.width;
    const splitString = string.split(" ");
    let end = splitString.length;
    let start = end - 1;
  
    let row = splitString.slice(start, end).join(" ");
    let rowWidth = context.measureText(row).width + WIDTH_MARGIN;
  
    while (end > 0 && start > -1) {
      while (rowWidth < width && start > -1 && end > 0) {
        let temprow = splitString.slice(start, end).join(" ");
        rowWidth = context.measureText(temprow).width + WIDTH_MARGIN;
        if (rowWidth < width && start > -1 && end > 0) {
          row = temprow;
          start--;
        }
      }
      rows.push(row);
      end = start + 1;
      rowWidth = 0;
      row = "";
    }
    return rows;
  };