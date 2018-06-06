const fs = require('fs');

function postInstall()  {
  deleteNgxBootstrapDatepickerCss();
}

function deleteNgxBootstrapDatepickerCss() {
  filepaths = [
    './node_modules/ngx-bootstrap/datepicker/utils/scss/mixins.css',
    './node_modules/ngx-bootstrap/datepicker/utils/scss/variables.css'
  ]
  deleteFiles(filepaths);
};

function deleteFiles(filepaths) {
  for (let filepath of filepaths) {
    try {
      fs.unlinkSync(filepath);
    } catch (error) {
      console.error(error);
    }
  }
}

postInstall();