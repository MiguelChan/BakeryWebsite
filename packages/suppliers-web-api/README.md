### Overview

WebAPI Module for the SuppliersWebsite.

### How to Install?

In order to install this Module you need to:

1. Update your `package.json` file and add this module as a dependency:

```
{
  ...
  "dependencies": {
    "@mgl/suppliers-web-api": "1.0.0"
  }
}
```

1. Now, in your main application instantiate the Module:

```
...
import express from 'express';
import SuppliersWebApiModule from '@mgl/suppliers-web-api';
...

const app = express();

const webApiModule: SuppliersWebApiModule = new SuppliersWebApiModule(app, 'SuppliersUrl');
webApiModule.installModule();
```