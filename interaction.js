const dragHandle = document.getElementById('drag-handle');
const editorPane = document.querySelector('.editor-pane');

let isDragging = false;

dragHandle.addEventListener('mousedown', (e) => {
  isDragging = true;
  document.body.style.cursor = 'col-resize';
});

document.addEventListener('mousemove', (e) => {
  if (!isDragging) return;
  
  // Calculate width based on mouse position relative to the container
  const containerOffset = document.querySelector('.studio-viewport').offsetLeft;
  const newWidth = e.clientX - containerOffset - 212; // Adjusted for TextPane
  
  if (newWidth > 100 && newWidth < (window.innerWidth - 400)) {
    editorPane.style.flex = `0 0 ${newWidth}px`;
  }
});

document.addEventListener('mouseup', () => {
  isDragging = false;
  document.body.style.cursor = 'default';
});
