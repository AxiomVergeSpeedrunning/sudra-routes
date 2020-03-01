const resources = root => ({
  root,
  create: `${root}create/`,
  view: `${root}view/`,
  edit: `${root}edit/`,
});

const urls = {
  home: '/',
  tutorials: resources('/tutorials/'),
  categories: resources('/categories/'),
  routes: resources('/routes/'),
  race: '/race/',
  streams: '/streams/',
  dictionary: '/dictionary/',
  login: '/login/',
  register: '/register/',
  account: '/account/',
  discordAuth: '/discord-auth/',
};

export default urls;
