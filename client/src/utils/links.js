const toPublic = slug => `/${slug}`;


const Auth = {
  forgottenPassword: toPublic('forgot/password'),
  login: toPublic('login'),
  register: toPublic('register'),
  registerComplete: toPublic('register/complete')
};

const Private={
  myDocs: toPublic('my/documents'),
  upload: toPublic('create/document')
}


const Public = {
  home: toPublic(''),

};

export { Auth, Public,Private };
