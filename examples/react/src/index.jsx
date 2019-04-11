import * as synctractor from 'synctractor';
synctractor.init();
synctractor.monitorFetch();
synctractor.monitorTimeout((_, t) => t !== 12345);

import * as React from 'react';
import { render } from 'react-dom';
import { App } from './app.jsx'; 

render(<App/>, document.getElementById('app'));