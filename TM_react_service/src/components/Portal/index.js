import { createPortal } from 'react-dom';

export default ({ children }) => createPortal(children, document.body);
